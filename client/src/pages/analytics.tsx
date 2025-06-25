import { useState } from "react";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("category");

  const [monitoringCategory, setMonitoringCategory] = useState("energy");
  const [monitoringSubCategory, setMonitoringSubCategory] = useState("electricity");

  const tabs = [
    { id: "category", label: "Emission by Category" },
    { id: "location", label: "Emissions by Location" },
    { id: "monitoring", label: "Monitoring" },
    { id: "predictive", label: "Predictive Analysis" },
    { id: "roadmap", label: "Roadmap & Strategy" }
  ];

  const monitoringCategories = [
    { 
      id: "energy", 
      label: "Energy", 
      subcategories: [
        { id: "electricity", label: "Electricity" },
        { id: "natural-gas", label: "Natural Gas" },
        { id: "renewable-energy", label: "Renewable Energy" },
        { id: "diesel", label: "Diesel" }
      ]
    },
    { 
      id: "water", 
      label: "Water", 
      subcategories: [
        { id: "consumption", label: "Water Consumption" },
        { id: "treatment", label: "Water Treatment" }
      ]
    },
    { 
      id: "waste", 
      label: "Waste", 
      subcategories: [
        { id: "solid", label: "Solid Waste" },
        { id: "liquid", label: "Liquid Waste" },
        { id: "hazardous", label: "Hazardous Waste" }
      ]
    }
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

          {/* Monitoring Tab */}
          {activeTab === "monitoring" && (
            <div className="space-y-6">
              {/* Monitoring Navigation with Hover Menus */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                {/* Monitoring Root */}
                <div className="relative group">
                  <span className="font-medium text-gray-700 cursor-pointer hover:text-blue-600">
                    Monitoring
                  </span>
                  
                  {/* Main Categories Popup */}
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {monitoringCategories.map((category) => (
                      <div key={category.id} className="relative group/sub">
                        <div
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-center justify-between"
                          onClick={() => {
                            setMonitoringCategory(category.id);
                            setMonitoringSubCategory(category.subcategories[0].id);
                          }}
                        >
                          <span>{category.label}</span>
                          <span className="text-gray-400">›</span>
                        </div>
                        
                        {/* Subcategories Popup */}
                        <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                          {category.subcategories.map((subcat) => (
                            <div
                              key={subcat.id}
                              className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                              onClick={() => {
                                setMonitoringCategory(category.id);
                                setMonitoringSubCategory(subcat.id);
                              }}
                            >
                              {subcat.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <span className="text-gray-400">›</span>
                
                {/* Current Navigation Path */}
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-blue-600">
                    {monitoringCategories.find(cat => cat.id === monitoringCategory)?.label}
                  </span>
                  <span className="text-gray-400">›</span>
                  <span className="font-medium text-blue-600">
                    {monitoringCategories
                      .find(cat => cat.id === monitoringCategory)
                      ?.subcategories.find(sub => sub.id === monitoringSubCategory)?.label}
                  </span>
                </div>
              </div>

              {/* Monitoring Data Table */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Monitoring › {monitoringCategories.find(cat => cat.id === monitoringCategory)?.label} › {
                      monitoringCategories
                        .find(cat => cat.id === monitoringCategory)
                        ?.subcategories.find(sub => sub.id === monitoringSubCategory)?.label
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Sl. No.</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Date of Entry</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Start Date</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">End Date</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">No. of Days</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Plant Name & Location</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Scope</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Vendor</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Qty</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Unit</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Cost (INR)</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Emissions (tCO2e)</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Remarks</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm">Attachments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 text-sm">1</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">10-02-2025</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">01-01-2025</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">31-01-2025</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">31</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">XYZ, Mumbai, India</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">2</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">Tata Power</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">1000</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">kWh</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">10,000</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">0.5</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">Used for Plant Operations</td>
                          <td className="border border-gray-300 px-3 py-2 text-sm">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">📄</span>
                              <span className="text-xs">Bill_Jan2025.pdf</span>
                            </div>
                          </td>
                        </tr>
                        {/* Empty rows for demonstration */}
                        {[...Array(5)].map((_, index) => (
                          <tr key={index + 2}>
                            <td className="border border-gray-300 px-3 py-2 text-sm">{index + 2}</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                            <td className="border border-gray-300 px-3 py-2 text-sm">-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
