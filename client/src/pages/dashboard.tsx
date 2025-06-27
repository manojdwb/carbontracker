import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Building2 } from "lucide-react";

export default function Dashboard() {
  const { data: emissions = [] } = useQuery({
    queryKey: ['/api/emissions'],
  });

  const { data: summary } = useQuery({
    queryKey: ['/api/emissions/summary'],
  });

  // Calculate scope data for pie chart
  const scopeData = [
    { name: 'Scope 1', value: (summary as any)?.scope1 || 70, color: '#1e3a8a' },
    { name: 'Scope 2', value: (summary as any)?.scope2 || 22, color: '#3b82f6' },
    { name: 'Scope 3', value: (summary as any)?.scope3 || 8, color: '#60a5fa' },
  ];

  // Historical trend data for bar chart
  const trendData = [
    { year: '2022', scope1: 45, scope2: 35, scope3: 20 },
    { year: '2023', scope1: 55, scope2: 40, scope3: 25 },
    { year: '2024', scope1: 70, scope2: 45, scope3: 30 },
  ];

  const reports = [
    { title: "BRSR Report 2024", type: "report" },
    { title: "CSDR Report 2024", type: "report" },
    { title: "Sustainability Report 2024", type: "report" },
    { title: "Renewable Energy Report", type: "report" },
  ];

  const news = [
    {
      title: "Larsen & Toubro lists India's first ESG bonds worth Rs. 500 crore on NSE...",
      type: "news"
    },
    {
      title: "India Launches New Regulations for Social, Sustainability, Sustainability-Linked Bonds...",
      type: "news"
    }
  ];

  return (
    <main className="flex-1 overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Company Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Aarti Industries Limited</h1>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart - Current Emission Status */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-center">Current Emission Status</CardTitle>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-900"></div>
                  <span className="text-sm text-gray-600">Scope 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Scope 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                  <span className="text-sm text-gray-600">Scope 1</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width={300} height={300}>
                <PieChart>
                  <Pie
                    data={scopeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={120}
                    dataKey="value"
                    label={({ value }) => `${value}`}
                    labelLine={false}
                  >
                    {scopeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bar Chart - Emission Trend */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium text-center">Emission Trend last 3 years</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Bar dataKey="scope1" stackId="a" fill="#1e3a8a" />
                  <Bar dataKey="scope2" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="scope3" stackId="a" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reports and News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reports Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-600">Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {report.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* News Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-blue-600">News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="text-blue-600 hover:underline cursor-pointer leading-relaxed">
                    {item.title}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
