import { useState } from "react";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("category");

  const tabs = [
    { id: "category", label: "Emission by Category" },
    { id: "location", label: "Emissions by Location" },
    { id: "predictive", label: "Predictive Analysis" },
    { id: "roadmap", label: "Roadmap & Strategy" }
  ];

  return (
    <>
      <Header
        title="Analytics"
        subtitle="Emission analytics and insights"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="px-6"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Emission by Category Tab */}
          {activeTab === "category" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Category Chart - Treemap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emissions in tCO2e by Category</CardTitle>
                  <div className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">All : 100</div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      {/* Scope 3 - 75% width */}
                      <div className="bg-blue-600 flex items-center justify-center text-white font-medium text-lg" style={{ width: '75%' }}>
                        Scope 3 : 75
                      </div>
                      <div className="flex flex-col" style={{ width: '25%' }}>
                        {/* Scope 1 - 20/25 = 80% of remaining */}
                        <div className="bg-blue-400 flex items-center justify-center text-white font-medium" style={{ height: '80%' }}>
                          Scope 1 : 20
                        </div>
                        {/* Scope 2 - 5/25 = 20% of remaining */}
                        <div className="bg-blue-300 flex items-center justify-center text-white font-medium" style={{ height: '20%' }}>
                          Scope 2 : 5
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 1 Breakdown - Treemap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 1 Emissions in tCO2e</CardTitle>
                  <div className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">All : 100%</div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      {/* Left column - HSD (20%) and Process CO2 (20%) */}
                      <div className="flex flex-col" style={{ width: '40%' }}>
                        <div className="bg-blue-400 flex items-center justify-center text-white font-medium border-b border-white" style={{ height: '50%' }}>
                          HSD : 20%
                        </div>
                        <div className="bg-blue-600 flex items-center justify-center text-white font-medium" style={{ height: '50%' }}>
                          Process CO2 Emissions : 20%
                        </div>
                      </div>
                      
                      {/* Right column */}
                      <div className="flex flex-col" style={{ width: '60%' }}>
                        {/* Natural Gas (20%) - top half */}
                        <div className="bg-blue-500 flex items-center justify-center text-white font-medium border-b border-white" style={{ height: '33.33%' }}>
                          Natural Gas : 20%
                        </div>
                        
                        {/* Bottom half split between Biomass and Coal */}
                        <div className="flex" style={{ height: '66.67%' }}>
                          <div className="bg-blue-300 flex items-center justify-center text-white font-medium border-r border-white" style={{ width: '50%' }}>
                            Biomass : 20%
                          </div>
                          <div className="bg-blue-200 flex items-center justify-center text-gray-700 font-medium" style={{ width: '50%' }}>
                            Coal : 20%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 2 Chart - Treemap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 2 Emissions in tCO2e</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      {/* Electricity takes ~83% (100k out of 120k total) */}
                      <div className="bg-blue-600 flex items-center justify-center text-white font-medium border-r border-white" style={{ width: '83.33%' }}>
                        Electricity : 100,000
                      </div>
                      {/* Steam takes ~17% (20k out of 120k total) */}
                      <div className="bg-blue-300 flex items-center justify-center text-gray-700 font-medium" style={{ width: '16.67%' }}>
                        Steam : 20,000
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 3 Breakdown - Treemap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 3 Emissions in tCO2e</CardTitle>
                  <div className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                    All : 100% | Scope 3 (Upstream) : 91.88%
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-60 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      {/* Left side - Purchased Goods and Services (55.25%) */}
                      <div className="bg-blue-600 flex items-center justify-center text-white font-medium border-r border-white" style={{ width: '55.25%' }}>
                        Purchased Goods and Services : 55.25%
                      </div>
                      
                      {/* Right side split */}
                      <div className="flex flex-col" style={{ width: '44.75%' }}>
                        {/* Capital Goods (22%) */}
                        <div className="bg-blue-400 flex items-center justify-center text-white font-medium border-b border-white" style={{ height: '49.16%' }}>
                          Capital Goods : 22.00%
                        </div>
                        
                        {/* Fuel & Energy Activities (19.33%) */}
                        <div className="bg-blue-500 flex items-center justify-center text-white font-medium border-b border-white" style={{ height: '43.17%' }}>
                          Fuel & Energy Activities : 19.33%
                        </div>
                        
                        {/* Small sections at bottom */}
                        <div className="flex" style={{ height: '7.67%' }}>
                          <div className="bg-blue-300 flex items-center justify-center text-xs text-white border-r border-white" style={{ width: '40%' }}>
                            Down...
                          </div>
                          <div className="bg-blue-200 flex items-center justify-center text-xs text-gray-700 border-r border-white" style={{ width: '30%' }}>
                            Em...
                          </div>
                          <div className="bg-blue-100 flex items-center justify-center text-xs text-gray-700" style={{ width: '30%' }}>
                            Bus... Proce...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab === "location" && (
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <i className="fas fa-map-marker-alt text-6xl mb-4 block"></i>
                  <h3 className="text-xl font-semibold mb-2">Location Analytics</h3>
                  <p>Geographic breakdown of emissions across different facilities and regions.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "predictive" && (
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <i className="fas fa-crystal-ball text-6xl mb-4 block"></i>
                  <h3 className="text-xl font-semibold mb-2">Predictive Modeling</h3>
                  <p>AI-powered forecasting and trend analysis for emission reduction planning.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "roadmap" && (
            <Card>
              <CardHeader>
                <CardTitle>Roadmap & Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <i className="fas fa-route text-6xl mb-4 block"></i>
                  <h3 className="text-xl font-semibold mb-2">Strategic Planning</h3>
                  <p>Long-term emission reduction roadmap and strategic initiatives.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
