import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImprovementPlan() {
  return (
    <>
      <Header
        title="Improvement Plan"
        subtitle="Develop strategies to reduce emissions"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-bullseye mr-3 text-primary"></i>
                Emission Reduction Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <i className="fas fa-target text-6xl mb-4 block"></i>
                <h3 className="text-xl font-semibold mb-2">Improvement Planning</h3>
                <p>Create and track action plans to reduce your organization's carbon footprint.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
