import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  Treemap,
  LineChart,
  Line
} from "recharts";
import type { EmissionEntry } from "@shared/schema";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("category");
  const [showMonitoringDropdown, setShowMonitoringDropdown] = useState(false);
  const [showEnergyDropdown, setShowEnergyDropdown] = useState(false);
  const [monitoringCategory, setMonitoringCategory] = useState("energy");
  const [monitoringSubCategory, setMonitoringSubCategory] = useState("electricity");
  const [selectedKPI, setSelectedKPI] = useState("scope1-emissions");

  // Fetch emissions data
  const { data: entries = [] } = useQuery<EmissionEntry[]>({
    queryKey: ["/api/emissions"],
  });

  // Sample data for analytics (replace with real data processing when available)
  const plantLocations = ["Nagpur", "Mumbai", "Dahej"];
  
  // Generate location-based analytics data
  const locationEmissionsData = plantLocations.map((location, index) => {
    const baseScope1 = 100 + (index * 20);
    const baseScope2 = 80 + (index * 15);
    const baseScope3 = 150 + (index * 25);
    
    return {
      location,
      scope1: baseScope1,
      scope2: baseScope2,
      scope3: baseScope3,
      total: baseScope1 + baseScope2 + baseScope3
    };
  });

  // Pie chart data for each scope by location
  const scope1PieData = locationEmissionsData.map((item, index) => ({
    name: item.location,
    value: item.scope1,
    color: `hsl(${210 + index * 30}, 70%, ${50 + index * 10}%)`
  }));

  const scope2PieData = locationEmissionsData.map((item, index) => ({
    name: item.location,
    value: item.scope2,
    color: `hsl(${120 + index * 30}, 70%, ${50 + index * 10}%)`
  }));

  const scope3PieData = locationEmissionsData.map((item, index) => ({
    name: item.location,
    value: item.scope3,
    color: `hsl(${30 + index * 30}, 70%, ${50 + index * 10}%)`
  }));

  // Treemap data for location emissions
  const treemapData = locationEmissionsData.map((item, index) => ({
    name: item.location,
    size: item.total,
    color: `hsl(${index * 120}, 60%, 50%)`
  }));

  // Heatmap data simulation
  const heatmapData = [
    { location: "Nagpur", month: "Jan", scope1: 85, scope2: 65, scope3: 120 },
    { location: "Nagpur", month: "Feb", scope1: 90, scope2: 70, scope3: 125 },
    { location: "Nagpur", month: "Mar", scope1: 95, scope2: 75, scope3: 130 },
    { location: "Mumbai", month: "Jan", scope1: 100, scope2: 80, scope3: 140 },
    { location: "Mumbai", month: "Feb", scope1: 105, scope2: 85, scope3: 145 },
    { location: "Mumbai", month: "Mar", scope1: 110, scope2: 90, scope3: 150 },
    { location: "Dahej", month: "Jan", scope1: 115, scope2: 95, scope3: 160 },
    { location: "Dahej", month: "Feb", scope1: 120, scope2: 100, scope3: 165 },
    { location: "Dahej", month: "Mar", scope1: 125, scope2: 105, scope3: 170 },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowMonitoringDropdown(false);
        setShowEnergyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const kpiOptions = [
    { value: "scope1-emissions", label: "Scope 1 Emissions" },
    { value: "scope2-emissions", label: "Scope 2 Emissions" },
    { value: "scope3-emissions", label: "Scope 3 Emissions" },
    { value: "scope1-intensity", label: "Scope 1 Emissions Intensity" },
    { value: "scope2-intensity", label: "Scope 2 Emissions Intensity" },
    { value: "scope3-intensity", label: "Scope 3 Emissions Intensity" },
    { value: "energy-intensity", label: "Energy Intensity per Rupee of Revenue" },
    { value: "electricity-consumption", label: "Total Electricity Consumption" },
    { value: "fuel-consumption", label: "Total Fuel Consumption" },
    { value: "renewable-energy-percent", label: "Renewable Energy Consumption as % of Total Electricity Consumption" },
    { value: "water-consumption", label: "Water Consumption" },
    { value: "water-intensity", label: "Water Intensity" }
  ];

  // Generate sample data for predictive analysis
  const generatePredictiveData = (kpi: string) => {
    const baseValue = Math.random() * 100 + 50;
    return Array.from({ length: 12 }, (_, i) => ({
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      historical: baseValue + Math.random() * 20 - 10,
      predicted: baseValue + Math.random() * 15 - 5,
      target: baseValue * 0.9 // Target is 10% reduction
    }));
  };

  return (
    <MainLayout>
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

          {/* Emissions by Location Tab */}
          {activeTab === "location" && (
            <div className="space-y-6">
              {/* Location Overview Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Emissions by Location (tCO2e)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={locationEmissionsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="scope1" stackId="a" fill="#1e40af" name="Scope 1" />
                      <Bar dataKey="scope2" stackId="a" fill="#3b82f6" name="Scope 2" />
                      <Bar dataKey="scope3" stackId="a" fill="#60a5fa" name="Scope 3" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Scope-wise Pie Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Scope 1 Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Scope 1 Emissions by Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={scope1PieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {scope1PieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Scope 2 Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Scope 2 Emissions by Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={scope2PieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {scope2PieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Scope 3 Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center text-lg">Scope 3 Emissions by Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={scope3PieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {scope3PieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Treemap for Total Emissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Emissions Treemap by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      {treemapData.map((item, index) => {
                        const widthPercentage = (item.size / treemapData.reduce((sum, d) => sum + d.size, 0)) * 100;
                        return (
                          <div
                            key={item.name}
                            className="flex items-center justify-center text-white font-medium text-lg border-r border-white last:border-r-0"
                            style={{ 
                              width: `${widthPercentage}%`,
                              backgroundColor: item.color
                            }}
                          >
                            {item.name}: {item.size}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heatmap Simulation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Emissions Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plantLocations.map((location) => (
                      <div key={location}>
                        <h4 className="font-medium mb-2">{location}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {["scope1", "scope2", "scope3"].map((scope) => (
                            <div key={scope} className="space-y-2">
                              <div className="text-sm font-medium capitalize">{scope.replace(/(\d)/, " $1")}</div>
                              <div className="grid grid-cols-3 gap-1">
                                {["Jan", "Feb", "Mar"].map((month) => {
                                  const dataPoint = heatmapData.find(d => d.location === location && d.month === month);
                                  const value = dataPoint ? dataPoint[scope as keyof typeof dataPoint] as number : 0;
                                  const intensity = Math.min(value / 200, 1); // Normalize to 0-1
                                  return (
                                    <div
                                      key={month}
                                      className="h-8 flex items-center justify-center text-xs text-white rounded"
                                      style={{
                                        backgroundColor: `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`
                                      }}
                                    >
                                      {value}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
              {/* Monitoring Navigation with Click Dropdowns */}
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg dropdown-container">
                {/* Monitoring Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowMonitoringDropdown(!showMonitoringDropdown);
                      setShowEnergyDropdown(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium text-gray-700"
                  >
                    <span>Monitoring</span>
                    <ChevronDown size={16} className={`transition-transform ${showMonitoringDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Main Categories Dropdown */}
                  {showMonitoringDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]">
                      {monitoringCategories.map((category) => (
                        <div
                          key={category.id}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                          onClick={() => {
                            setMonitoringCategory(category.id);
                            setMonitoringSubCategory(category.subcategories[0].id);
                            setShowMonitoringDropdown(false);
                          }}
                        >
                          {category.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <span className="text-gray-400">›</span>
                
                {/* Energy Dropdown */}
                {monitoringCategory === "energy" && (
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowEnergyDropdown(!showEnergyDropdown);
                        setShowMonitoringDropdown(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium text-blue-600"
                    >
                      <span>Energy</span>
                      <ChevronDown size={16} className={`transition-transform ${showEnergyDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Energy Subcategories Dropdown */}
                    {showEnergyDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]">
                        {monitoringCategories
                          .find(cat => cat.id === "energy")
                          ?.subcategories.map((subcat) => (
                            <div
                              key={subcat.id}
                              className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                              onClick={() => {
                                setMonitoringSubCategory(subcat.id);
                                setShowEnergyDropdown(false);
                              }}
                            >
                              {subcat.label}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Other Categories (non-dropdown) */}
                {monitoringCategory !== "energy" && (
                  <span className="font-medium text-blue-600">
                    {monitoringCategories.find(cat => cat.id === monitoringCategory)?.label}
                  </span>
                )}
                
                <span className="text-gray-400">›</span>
                
                {/* Current Subcategory */}
                <span className="font-medium text-blue-600">
                  {monitoringCategories
                    .find(cat => cat.id === monitoringCategory)
                    ?.subcategories.find(sub => sub.id === monitoringSubCategory)?.label}
                </span>
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
                  <div className="w-full">
                    <table className="w-full border-collapse border border-gray-300 table-auto">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-16">Sl. No.</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-24">Date of Entry</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-24">Start Date</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-24">End Date</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-20">No. of Days</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-32">Plant Name & Location</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-16">Scope</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-24">Vendor</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-16">Qty</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-16">Unit</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-20">Cost (INR)</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-20">Emissions (tCO2e)</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs">Remarks</th>
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs w-28">Attachments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-2 py-2 text-xs">1</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">10-02-2025</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">01-01-2025</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">31-01-2025</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">31</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">XYZ, Mumbai, India</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">2</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">Tata Power</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">1000</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">kWh</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">10,000</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">0.5</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">Used for Plant Operations</td>
                          <td className="border border-gray-300 px-2 py-2 text-xs">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">📄</span>
                              <span className="text-xs">Bill_Jan2025.pdf</span>
                            </div>
                          </td>
                        </tr>
                        {/* Empty rows for demonstration */}
                        {[...Array(8)].map((_, index) => (
                          <tr key={index + 2}>
                            <td className="border border-gray-300 px-2 py-2 text-xs">{index + 2}</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                            <td className="border border-gray-300 px-2 py-2 text-xs">-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Predictive Analysis Tab */}
          {activeTab === "predictive" && (
            <div className="space-y-6">
              {/* KPI Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select KPI</label>
                    <Select value={selectedKPI} onValueChange={setSelectedKPI}>
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Select a KPI to analyze" />
                      </SelectTrigger>
                      <SelectContent>
                        {kpiOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Predictive Chart */}
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generatePredictiveData(selectedKPI)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="historical" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          name="Historical Data"
                          dot={{ fill: '#3b82f6' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="predicted" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Predicted Values"
                          dot={{ fill: '#ef4444' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="target" 
                          stroke="#22c55e" 
                          strokeWidth={2}
                          name="Target Values"
                          dot={{ fill: '#22c55e' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* KPI Info */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {kpiOptions.find(opt => opt.value === selectedKPI)?.label} Analysis
                    </h4>
                    <p className="text-sm text-blue-700">
                      This predictive model uses historical data patterns to forecast future trends and performance against sustainability targets.
                      The blue line shows historical actual values, the red dashed line shows AI predictions, and the green line represents your reduction targets.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
    </MainLayout>
  );
}
