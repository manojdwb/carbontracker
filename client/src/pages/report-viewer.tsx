import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReportViewer() {
  const [location] = useLocation();
  const reportType = new URLSearchParams(location.split('?')[1] || '').get('type') || 'brsr';
  
  const getReportTitle = (type: string) => {
    switch (type) {
      case 'brsr': return 'BRSR Report';
      case 'csrd': return 'CSRD Report';
      case 'ecovadis': return 'Ecovadis Reporting KPIs';
      case 'sp-global': return 'S&P Global KPIs';
      case 'custom': return 'Custom Report';
      case 'supplier': return 'Consolidated Supplier Report';
      default: return 'Report';
    }
  };

  return (
    <>
      <Header
        title={getReportTitle(reportType)}
        subtitle="View and manage your sustainability report"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* PDF Viewer Card */}
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-100 border rounded-lg" style={{ height: '70vh' }}>
                <iframe 
                  src="/attached_assets/Business responsibility and sustainability reporting by listed entitiesAnnexure1_p_1751810141674.pdf"
                  width="100%"
                  height="100%"
                  style={{ border: 'none', borderRadius: '0.5rem' }}
                  title={getReportTitle(reportType)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4">
                <Button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/attached_assets/Business responsibility and sustainability reporting by listed entitiesAnnexure1_p_1751810141674.pdf';
                    link.download = `${getReportTitle(reportType)}.pdf`;
                    link.click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <i className="fas fa-download mr-2"></i>
                  Download Report
                </Button>
                <Button variant="outline">
                  <i className="fas fa-edit mr-2"></i>
                  Edit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}