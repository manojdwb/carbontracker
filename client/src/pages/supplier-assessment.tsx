import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupplierAssessment() {
  return (
    <>
      <Header
        title="Supplier Assessment"
        subtitle="Evaluate supplier environmental performance"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-handshake mr-3 text-primary"></i>
                Supplier ESG Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <i className="fas fa-users text-6xl mb-4 block"></i>
                <h3 className="text-xl font-semibold mb-2">Supplier Assessment</h3>
                <p>Assess and track the environmental impact of your supply chain partners.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
