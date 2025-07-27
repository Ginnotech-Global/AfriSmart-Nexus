import { useState, useRef } from "react";
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  treatment: string;
  prevention: string;
  organicTreatment?: string;
}

export const CropDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis - In production, this would call your AI service
    setTimeout(() => {
      // Mock diagnosis result
      const mockResults: DiagnosisResult[] = [
        {
          disease: "Late Blight (Phytophthora infestans)",
          confidence: 92,
          severity: "High",
          treatment: "Apply copper-based fungicide (Copper Hydroxide) every 7-10 days. Remove affected leaves and ensure proper plant spacing for air circulation.",
          prevention: "Plant resistant varieties, ensure proper drainage, avoid overhead watering, and apply preventive fungicide before rainy season.",
          organicTreatment: "Use Neem oil spray or Baking soda solution (1 tsp per liter). Apply early morning or evening."
        },
        {
          disease: "Healthy Plant",
          confidence: 87,
          severity: "Low",
          treatment: "No treatment needed. Continue current care routine.",
          prevention: "Maintain current watering schedule, ensure adequate sunlight, and monitor for early signs of stress.",
        },
        {
          disease: "Leaf Spot Disease",
          confidence: 78,
          severity: "Medium",
          treatment: "Apply fungicide containing Mancozeb or Chlorothalonil. Remove affected leaves and improve air circulation.",
          prevention: "Avoid wetting leaves during watering, ensure proper plant spacing, and remove plant debris regularly.",
          organicTreatment: "Spray with compost tea or garlic-based organic fungicide."
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${randomResult.disease} with ${randomResult.confidence}% confidence`,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Crop Disease Diagnosis</h2>
        <p className="text-lg text-gray-600">
          Upload a photo of your crop for instant AI-powered disease detection and treatment recommendations
        </p>
      </div>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-green-600" />
            <span>Upload Crop Image</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!selectedImage ? (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">Click to upload crop image</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG files up to 5MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt="Selected crop" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Different Image
                  </Button>
                  <Button 
                    onClick={analyzeCrop}
                    disabled={isAnalyzing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Leaf className="h-4 w-4 mr-2" />
                        Analyze Crop
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto" />
              <p className="text-lg font-medium">Analyzing your crop image...</p>
              <p className="text-sm text-gray-600">Our AI is examining the image for diseases, pests, and nutritional deficiencies</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  {result.disease === "Healthy Plant" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <span>Diagnosis Results</span>
                </span>
                <Badge className={getSeverityColor(result.severity)}>
                  {result.severity} Priority
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.disease}</h3>
                  <p className="text-gray-600">Confidence: {result.confidence}%</p>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This diagnosis is provided for informational purposes. For severe cases or persistent issues, 
                    consult with a local agricultural extension officer or plant pathologist.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Treatment Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Treatment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{result.treatment}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prevention Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{result.prevention}</p>
              </CardContent>
            </Card>
          </div>

          {/* Organic Treatment (if available) */}
          {result.organicTreatment && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span>Organic Treatment Alternative</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{result.organicTreatment}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={() => {
                setSelectedImage(null);
                setResult(null);
              }}
              variant="outline"
              className="flex-1"
            >
              Diagnose Another Crop
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              Save/Print Results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};