import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reporting() {
  return (
    <>
      <Header
        title="Reporting"
        subtitle="Generate compliance and ESG reports"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-file-alt mr-3 text-primary"></i>
                ESG Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <i className="fas fa-file-chart-column text-6xl mb-4 block"></i>
                <h3 className="text-xl font-semibold mb-2">Reporting Module</h3>
                <p>Generate comprehensive ESG reports and compliance documentation.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
