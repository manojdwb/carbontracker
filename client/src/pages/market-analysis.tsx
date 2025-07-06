import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketAnalysis() {
  return (
    <>
      <Header
        title="Market Analysis"
        subtitle="Market trends and competitive analysis"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-line mr-3 text-primary"></i>
                Market Analysis Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <i className="fas fa-chart-area text-6xl mb-4 block"></i>
                <h3 className="text-xl font-semibold mb-2">Market Analysis Module</h3>
                <p>Analyze market trends and competitive landscape for ESG initiatives.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}