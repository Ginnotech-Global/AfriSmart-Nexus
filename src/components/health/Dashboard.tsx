import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { DocumentUpload } from "./DocumentUpload";
import { ReportView } from "./ReportView";
import { 
  FileText, 
  Activity, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  User,
  LogOut
} from "lucide-react";

interface Upload {
  id: string;
  file_name: string;
  patient_name: string;
  upload_status: string;
  created_at: string;
}

interface Report {
  id: string;
  document_upload_id: string;
  report_status: string;
  ai_confidence_score: number;
  created_at: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
    fetchUploads();
    fetchReports();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('document_uploads')
        .select('id, file_name, patient_name, upload_status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUploads(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching uploads",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_reports')
        .select('id, document_upload_id, report_status, ai_confidence_score, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching reports",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleUploadComplete = (uploadId: string) => {
    fetchUploads();
    fetchReports();
    toast({
      title: "Analysis started",
      description: "Your document is being analyzed. Results will be available shortly.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (selectedReport) {
    return (
      <ReportView 
        reportId={selectedReport} 
        onBack={() => setSelectedReport(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Health Analysis Platform</h1>
                <p className="text-primary font-medium">wellness.gitech.africa</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <DocumentUpload onUploadComplete={handleUploadComplete} />
          </div>

          {/* Stats Cards */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Uploads</span>
                  <Badge variant="secondary">{uploads.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reports Generated</span>
                  <Badge variant="secondary">{reports.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <Badge variant="default">
                    {reports.filter(r => r.report_status === 'completed').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              {uploads.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No uploads yet. Upload your first document above.
                </p>
              ) : (
                <div className="space-y-3">
                  {uploads.slice(0, 5).map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{upload.file_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {upload.patient_name && `Patient: ${upload.patient_name} • `}
                          {new Date(upload.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(upload.upload_status)}
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(upload.upload_status)}`}></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Reports</CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No analysis reports yet. Upload documents to get started.
                </p>
              ) : (
                <div className="space-y-3">
                  {reports.slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Analysis Report</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {report.ai_confidence_score}% • 
                          {new Date(report.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {report.report_status === 'completed' ? (
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedReport(report.id)}
                          >
                            View
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(report.report_status)}
                            <span className={`w-2 h-2 rounded-full ${getStatusColor(report.report_status)}`}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};