import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, X } from "lucide-react";

interface DocumentUploadProps {
  onUploadComplete: (uploadId: string) => void;
}

export const DocumentUpload = ({ onUploadComplete }: DocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    sex: "",
    additionalInfo: "",
  });
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 5,
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one document.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      for (const file of files) {
        // Upload file to storage
        const fileName = `${Date.now()}-${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(`${user.id}/${fileName}`, file);

        if (uploadError) throw uploadError;

        // Save document record
        const { data: documentData, error: dbError } = await supabase
          .from('document_uploads')
          .insert({
            user_id: user.id,
            file_name: file.name,
            file_path: uploadData.path,
            file_size: file.size,
            patient_name: patientData.name || null,
            patient_age: patientData.age ? parseInt(patientData.age) : null,
            patient_weight: patientData.weight ? parseFloat(patientData.weight) : null,
            patient_height: patientData.height ? parseFloat(patientData.height) : null,
            patient_sex: patientData.sex || null,
            additional_info: patientData.additionalInfo || null,
            upload_status: 'completed',
          })
          .select()
          .single();

        if (dbError) throw dbError;

        onUploadComplete(documentData.id);
      }

      toast({
        title: "Upload successful!",
        description: "Your documents have been uploaded and are being processed.",
      });

      // Reset form
      setFiles([]);
      setPatientData({
        name: "",
        age: "",
        weight: "",
        height: "",
        sex: "",
        additionalInfo: "",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Medical Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-primary">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-muted-foreground mb-2">
                  Drag & drop medical documents here, or click to select
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, PNG, JPG (Max 5 files)
                </p>
              </div>
            )}
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files:</Label>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={patientData.name}
                onChange={(e) => setPatientData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientAge">Age</Label>
              <Input
                id="patientAge"
                type="number"
                placeholder="Age in years"
                value={patientData.age}
                onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientWeight">Weight (kg)</Label>
              <Input
                id="patientWeight"
                type="number"
                step="0.1"
                placeholder="Weight in kg"
                value={patientData.weight}
                onChange={(e) => setPatientData(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientHeight">Height (cm)</Label>
              <Input
                id="patientHeight"
                type="number"
                step="0.1"
                placeholder="Height in cm"
                value={patientData.height}
                onChange={(e) => setPatientData(prev => ({ ...prev, height: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientSex">Sex</Label>
              <select
                id="patientSex"
                className="w-full px-3 py-2 border border-input rounded-md"
                value={patientData.sex}
                onChange={(e) => setPatientData(prev => ({ ...prev, sex: e.target.value }))}
              >
                <option value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              placeholder="Any additional medical history or notes..."
              value={patientData.additionalInfo}
              onChange={(e) => setPatientData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={uploading || files.length === 0}>
            {uploading ? "Uploading..." : "Upload & Analyze Documents"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};