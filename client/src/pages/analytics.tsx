import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <>
      <Header
        title="Analytics"
        subtitle="Analyze emissions trends and patterns"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-bar mr-3 text-primary"></i>
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <i className="fas fa-chart-line text-6xl mb-4 block"></i>
                <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
                <p>Advanced analytics and reporting features will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
