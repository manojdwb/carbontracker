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
  const [selectedKPI, setSelectedKPI] = useState("scope1-intensity");
  const [targetReduced, setTargetReduced] = useState("0");
  const [targetUnit, setTargetUnit] = useState("tCO2e/Million INR");
  const [targetYear, setTargetYear] = useState("2040");
  
  // Multi-level filter states
  const [selectedMonitoringFilter, setSelectedMonitoringFilter] = useState("");
  const [selectedSubFilter, setSelectedSubFilter] = useState("");
  const [showMonitoringOptions, setShowMonitoringOptions] = useState(false);
  const [showSubOptions, setShowSubOptions] = useState(false);

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

  // Multi-level filter options
  const monitoringFilterOptions = [
    { id: "energy", label: "Energy" },
    { id: "water", label: "Water" },
    { id: "waste", label: "Waste" }
  ];

  const getSubFilterOptions = (category: string) => {
    switch (category) {
      case "energy":
        return [
          { id: "electricity", label: "Electricity" },
          { id: "natural-gas", label: "Natural Gas" },
          { id: "coal", label: "Coal" },
          { id: "diesel", label: "Diesel" }
        ];
      case "water":
        return [
          { id: "absolute-water", label: "Absolute Water Consumption" },
          { id: "water-intensity", label: "Water Intensity" }
        ];
      case "waste":
        return [
          { id: "waste-generated", label: "Waste Generated in US Tons" }
        ];
      default:
        return [];
    }
  };

  const kpiOptions = [
    { value: "scope1-intensity", label: "Scope 1 Intensity" },
    { value: "scope2-intensity", label: "Scope 2 Intensity" },
    { value: "scope3-intensity", label: "Scope 3 Intensity" },
    { value: "scope1-emissions", label: "Scope 1 Emissions" },
    { value: "scope2-emissions", label: "Scope 2 Emissions" },
    { value: "scope3-emissions", label: "Scope 3 Emissions" },
    { value: "energy-intensity", label: "Energy Intensity per Rupee of Revenue" },
    { value: "electricity-consumption", label: "Total Electricity Consumption" },
    { value: "fuel-consumption", label: "Total Fuel Consumption" },
    { value: "renewable-energy-percent", label: "Renewable Energy Consumption as % of Total Electricity Consumption" },
    { value: "water-consumption", label: "Water Consumption" },
    { value: "water-intensity", label: "Water Intensity" }
  ];

  const targetUnits = [
    { value: "tCO2e/Million INR", label: "tCO2e/Million INR" },
    { value: "kg CO2e/Million INR", label: "kg CO2e/Million INR" },
    { value: "tCO2e", label: "tCO2e" },
    { value: "kg CO2e", label: "kg CO2e" },
    { value: "kWh/Million INR", label: "kWh/Million INR" },
    { value: "liters/Million INR", label: "liters/Million INR" }
  ];

  const targetYears = [
    { value: "2030", label: "2030" },
    { value: "2035", label: "2035" },
    { value: "2040", label: "2040" },
    { value: "2045", label: "2045" },
    { value: "2050", label: "2050" }
  ];

  // Generate sample data for predictive analysis matching the chart
  const generatePredictiveData = () => {
    const years = [];
    const currentYear = 2020;
    const endYear = parseInt(targetYear);
    
    for (let year = currentYear; year <= endYear; year++) {
      years.push(year);
    }
    
    return years.map((year) => {
      // Target trend: starts at 45 in 2020, reaches 0 at 2030
      let targetTrend = 0;
      if (year <= 2030) {
        const targetProgress = (year - 2020) / (2030 - 2020);
        targetTrend = 45 - (targetProgress * 45); // Linear decrease from 45 to 0
      }
      
      // Current trend: starts at 45 in 2020, reaches 0 at 2038
      let currentTrend = 0;
      if (year <= 2038) {
        const currentProgress = (year - 2020) / (2038 - 2020);
        currentTrend = 45 - (currentProgress * 45); // Linear decrease from 45 to 0
      }
      
      return {
        year: year,
        currentTrend: Math.max(0, currentTrend),
        targetTrend: Math.max(0, targetTrend)
      };
    });
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
              {/* Multi-level Filter System */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-6">
                    {/* Primary Monitoring Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monitoring</label>
                      <button
                        onClick={() => {
                          setShowMonitoringOptions(!showMonitoringOptions);
                          setShowSubOptions(false);
                        }}
                        className="flex items-center justify-between w-48 px-4 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <span className="text-gray-700">
                          {selectedMonitoringFilter ? monitoringFilterOptions.find(opt => opt.id === selectedMonitoringFilter)?.label : "Select Category"}
                        </span>
                        <ChevronDown size={16} className={`transition-transform ${showMonitoringOptions ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showMonitoringOptions && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          {monitoringFilterOptions.map((option) => (
                            <div
                              key={option.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                              onClick={() => {
                                setSelectedMonitoringFilter(option.id);
                                setSelectedSubFilter("");
                                setShowMonitoringOptions(false);
                                setShowSubOptions(false);
                              }}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    {selectedMonitoringFilter && (
                      <div className="flex items-center pt-8">
                        <span className="text-gray-400 text-lg">→</span>
                      </div>
                    )}

                    {/* Secondary Sub-category Dropdown */}
                    {selectedMonitoringFilter && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {selectedMonitoringFilter === "energy" ? "Energy Type" :
                           selectedMonitoringFilter === "water" ? "Water Metric" :
                           selectedMonitoringFilter === "waste" ? "Waste Metric" : "Options"}
                        </label>
                        <button
                          onClick={() => setShowSubOptions(!showSubOptions)}
                          className="flex items-center justify-between w-56 px-4 py-2 text-left bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <span className="text-gray-700">
                            {selectedSubFilter ? getSubFilterOptions(selectedMonitoringFilter).find(opt => opt.id === selectedSubFilter)?.label : "Select Option"}
                          </span>
                          <ChevronDown size={16} className={`transition-transform ${showSubOptions ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showSubOptions && (
                          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            {getSubFilterOptions(selectedMonitoringFilter).map((option) => (
                              <div
                                key={option.id}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                onClick={() => {
                                  setSelectedSubFilter(option.id);
                                  setShowSubOptions(false);
                                }}
                              >
                                {option.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Monitoring Data Table */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedMonitoringFilter && selectedSubFilter ? (
                      `Monitoring › ${selectedMonitoringFilter.charAt(0).toUpperCase() + selectedMonitoringFilter.slice(1)} › ${
                        getSubFilterOptions(selectedMonitoringFilter).find(opt => opt.id === selectedSubFilter)?.label
                      }`
                    ) : (
                      "Monitoring Data - Select filters above"
                    )}
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
              {/* Three-field Menu */}
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-8">
                    {/* Choose KPI */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Choose KPI</label>
                      <Select value={selectedKPI} onValueChange={setSelectedKPI}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select KPI" />
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

                    {/* Enter Target Value */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Enter Target Value</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={targetReduced}
                          onChange={(e) => setTargetReduced(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                        <Select value={targetUnit} onValueChange={setTargetUnit}>
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {targetUnits.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Target Year */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Target Year</label>
                      <Select value={targetYear} onValueChange={setTargetYear}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {targetYears.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Chart */}
              <Card>
                <CardContent className="pt-6">
                  {/* Chart Title */}
                  <div className="mb-6 text-center">
                    <div className="inline-block px-4 py-2 bg-gray-100 border rounded-md">
                      <span className="text-sm font-medium">Scope 1 Intensity tCO2 e/Million INR</span>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generatePredictiveData()} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="year" 
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: '#9ca3af' }}
                          tickLine={{ stroke: '#9ca3af' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 10 }}
                          axisLine={{ stroke: '#9ca3af' }}
                          tickLine={{ stroke: '#9ca3af' }}
                          label={{ value: 'Scope 1 Intensity tCO2 e/Million INR', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #d1d5db',
                            borderRadius: '6px'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{ paddingTop: '20px' }}
                          iconType="line"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="currentTrend" 
                          stroke="#ea580c" 
                          strokeWidth={3}
                          name="Current Trend"
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="targetTrend" 
                          stroke="#1e40af" 
                          strokeWidth={3}
                          name="Target Trend"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Year label */}
                  <div className="text-center mt-2">
                    <span className="text-sm font-medium text-gray-700">Year</span>
                  </div>
                </CardContent>
              </Card>

              {/* Strategies Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Strategies for Scope 1 Intensity Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Implement energy-efficient technologies and equipment upgrades to reduce direct fuel consumption across all operations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Transition to cleaner fuel alternatives such as natural gas or biofuels to replace high-carbon fossil fuels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Optimize industrial processes through lean manufacturing principles and waste heat recovery systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Invest in on-site renewable energy generation to reduce dependency on carbon-intensive grid electricity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Establish carbon capture and storage technologies for high-emission industrial processes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Implement comprehensive energy management systems with real-time monitoring and optimization capabilities</span>
                    </li>
                  </ul>
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
