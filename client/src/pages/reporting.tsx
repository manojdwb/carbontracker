import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reporting() {
  const [, navigate] = useLocation();
  
  const reports = [
    {
      title: "BRSR Report",
      description: "Business Responsibility and Sustainability Reporting",
      icon: "fas fa-file-alt",
      type: "brsr"
    },
    {
      title: "CSRD Report", 
      description: "Corporate Sustainability Reporting Directive",
      icon: "fas fa-file-alt",
      type: "csrd"
    },
    {
      title: "Ecovadis Reporting KPIs",
      description: "EcoVadis sustainability assessment metrics",
      icon: "fas fa-file-alt",
      type: "ecovadis"
    },
    {
      title: "S&P Global KPIs",
      description: "S&P Global sustainability indicators",
      icon: "fas fa-file-alt",
      type: "sp-global"
    },
    {
      title: "Custom Report",
      description: "Build your own custom sustainability report",
      icon: "fas fa-file-alt",
      type: "custom"
    },
    {
      title: "Consolidated Supplier Report",
      description: "Comprehensive supplier sustainability assessment",
      icon: "fas fa-file-alt",
      type: "supplier"
    }
  ];

  const handleReportClick = (reportType: string) => {
    if (reportType === 'brsr') {
      // For BRSR, directly open the PDF in a new tab
      window.open('/attached_assets/Business responsibility and sustainability reporting by listed entitiesAnnexure1_p_1751810445793.pdf', '_blank');
    } else {
      navigate(`/report-viewer?type=${reportType}`);
    }
  };

  return (
    <>
      <Header
        title="Reporting"
        subtitle="Generate compliance and ESG reports"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleReportClick(report.type)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <i className={`${report.icon} text-2xl text-primary`}></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {report.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
