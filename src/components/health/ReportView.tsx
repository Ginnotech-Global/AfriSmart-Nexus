import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Brain,
  FileText
} from "lucide-react";

interface Report {
  id: string;
  document_upload_id: string;
  report_status: string;
  ai_confidence_score: number;
  executive_summary: string;
  detailed_analysis: any;
  critical_observations: string[];
  high_risk_areas: string[];
  recommendations: string;
  herbal_recommendations: string;
  mineral_deficiencies: any;
  created_at: string;
}

interface ReportViewProps {
  reportId: string;
  onBack: () => void;
}

export const ReportView = ({ reportId, onBack }: ReportViewProps) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_reports')
        .select('*')
        .eq('id', reportId)
        .single();

      if (error) throw error;
      setReport(data);
    } catch (error: any) {
      toast({
        title: "Error fetching report",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: "Download started",
      description: "Your report will be downloaded shortly.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Report not found</p>
          <Button onClick={onBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Report Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Health Analysis Report</h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Brain className="h-3 w-3" />
                AI Confidence: {report.ai_confidence_score}%
              </Badge>
              <Badge variant={report.report_status === 'completed' ? 'default' : 'secondary'}>
                {report.report_status}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground">
            Generated on {new Date(report.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Executive Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {report.executive_summary || "AI analysis in progress. Detailed insights will be available once processing is complete."}
                </p>
              </CardContent>
            </Card>

            {/* Critical Observations */}
            {report.critical_observations && report.critical_observations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    Critical Observations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {report.critical_observations.map((observation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{observation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.recommendations && (
                    <div>
                      <h4 className="font-medium mb-2">General Recommendations</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.recommendations}
                      </p>
                    </div>
                  )}
                  
                  {report.herbal_recommendations && (
                    <div>
                      <h4 className="font-medium mb-2">Herbal & Natural Remedies</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {report.herbal_recommendations}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* High Risk Areas */}
            {report.high_risk_areas && report.high_risk_areas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">High Risk Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {report.high_risk_areas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mineral Deficiencies */}
            {report.mineral_deficiencies && Object.keys(report.mineral_deficiencies).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mineral Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(report.mineral_deficiencies).map(([mineral, level]: [string, any]) => (
                      <div key={mineral} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{mineral}</span>
                        <Badge variant={level === 'deficient' ? 'destructive' : level === 'low' ? 'secondary' : 'default'}>
                          {level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Report Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownload} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Share Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};