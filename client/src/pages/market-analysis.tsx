import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MarketAnalysis() {
  const marketData = [
    { itemName: "Scope 1 Emissions", unit: "tCO2e", aartiInd: "1,245", tataChem: "2,890", alkali: "987", basf: "3,567" },
    { itemName: "Scope 2 Emissions", unit: "tCO2e", aartiInd: "892", tataChem: "1,567", alkali: "654", basf: "2,234" },
    { itemName: "Scope 3 Emissions", unit: "tCO2e", aartiInd: "4,567", tataChem: "8,234", alkali: "3,456", basf: "12,890" },
    { itemName: "Scope 1 Intensity", unit: "tCO2e/Million INR", aartiInd: "45.6", tataChem: "67.8", alkali: "34.2", basf: "78.9" },
    { itemName: "Scope 2 Intensity", unit: "tCO2e/Million INR", aartiInd: "32.7", tataChem: "36.8", alkali: "22.7", basf: "49.5" },
    { itemName: "Scope 3 Intensity", unit: "tCO2e/Million INR", aartiInd: "167.5", tataChem: "193.4", alkali: "119.8", basf: "285.7" },
    { itemName: "Energy Intensity per Rupee of revenue", unit: "GJ/million INR", aartiInd: "89.4", tataChem: "123.7", alkali: "67.2", basf: "156.8" },
    { itemName: "Total Electricity Consumption", unit: "GJ", aartiInd: "23,456", tataChem: "45,678", alkali: "12,890", basf: "67,234" },
    { itemName: "Total Fuel Consumption", unit: "GJ", aartiInd: "15,678", tataChem: "28,934", alkali: "9,567", basf: "42,156" },
    { itemName: "Renewable Energy Consumption as % of total Electricity", unit: "20%", aartiInd: "15%", tataChem: "25%", alkali: "12%", basf: "35%" },
    { itemName: "Water Consumption", unit: "KL", aartiInd: "145,678", tataChem: "267,890", alkali: "98,456", basf: "389,234" },
    { itemName: "Water Intensity", unit: "KL/Million INR", aartiInd: "5,345", tataChem: "6,287", alkali: "3,421", basf: "8,623" }
  ];

  return (
    <>
      <Header
        title="Market Analysis"
        subtitle="Add upto 5 Companies"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-10"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
                </div>
                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis Table */}
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Item Name</TableHead>
                      <TableHead className="min-w-[120px]">Unit</TableHead>
                      <TableHead className="min-w-[120px]">Aarti Ind</TableHead>
                      <TableHead className="min-w-[120px]">Tata Chem</TableHead>
                      <TableHead className="min-w-[120px]">Alkali</TableHead>
                      <TableHead className="min-w-[120px]">BASF</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.itemName}</TableCell>
                        <TableCell className="text-muted-foreground">{row.unit}</TableCell>
                        <TableCell>{row.aartiInd}</TableCell>
                        <TableCell>{row.tataChem}</TableCell>
                        <TableCell>{row.alkali}</TableCell>
                        <TableCell>{row.basf}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}