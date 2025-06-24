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
              {/* Main Category Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emissions in tCO2e by Category</CardTitle>
                  <div className="text-sm text-muted-foreground">All: 100</div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-80 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 text-white font-semibold">
                      <div className="text-center">
                        <div className="text-2xl mb-2">Scope 3 : 75</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg mb-2">Scope 1 : 20</div>
                        <div className="text-lg">Scope 2 : 5</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 1 Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 1 Emissions in tCO2e</CardTitle>
                  <div className="text-sm text-muted-foreground">All : 100%</div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-blue-400 to-blue-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2 h-full text-white text-sm">
                      <div className="bg-blue-500 rounded p-2 flex items-center justify-center">
                        <span>HSD : 30%</span>
                      </div>
                      <div className="bg-blue-400 rounded p-2 flex items-center justify-center">
                        <span>Natural Gas : 20%</span>
                      </div>
                      <div className="bg-blue-600 rounded p-2 flex items-center justify-center">
                        <span>Process CO2 Emissions : 30%</span>
                      </div>
                      <div className="grid grid-rows-2 gap-2">
                        <div className="bg-blue-300 rounded p-2 flex items-center justify-center">
                          <span>Biomass : 20%</span>
                        </div>
                        <div className="bg-blue-200 rounded p-2 flex items-center justify-center text-gray-700">
                          <span>Coal : 20%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 2 Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 2 Emissions in tCO2e</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-gradient-to-r from-blue-600 to-blue-300 rounded-lg flex items-center justify-center">
                    <div className="text-white font-semibold text-center">
                      <div className="text-xl">Electricity : 100,000</div>
                      <div className="text-lg mt-2">Steam : 20,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scope 3 Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Scope 3 Emissions in tCO2e</CardTitle>
                  <div className="text-sm text-muted-foreground">All : 100% | Scope 3 (Upstream) : 91.88%</div>
                </CardHeader>
                <CardContent>
                  <div className="h-60 bg-gradient-to-br from-blue-600 to-blue-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2 h-full text-white text-sm">
                      <div className="bg-blue-600 rounded p-2 flex items-center justify-center">
                        <span>Purchased Goods and Services : 55.25%</span>
                      </div>
                      <div className="bg-blue-400 rounded p-2 flex items-center justify-center">
                        <span>Capital Goods : 22.00%</span>
                      </div>
                      <div className="bg-blue-500 rounded p-2 flex items-center justify-center">
                        <span>Fuel & Energy Activities : 19.33%</span>
                      </div>
                      <div className="grid grid-rows-3 gap-1">
                        <div className="bg-blue-300 rounded p-1 flex items-center justify-center text-xs">
                          <span>Downstream</span>
                        </div>
                        <div className="bg-blue-200 rounded p-1 flex items-center justify-center text-xs text-gray-700">
                          <span>Employee</span>
                        </div>
                        <div className="bg-blue-100 rounded p-1 flex items-center justify-center text-xs text-gray-700">
                          <span>Business</span>
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
