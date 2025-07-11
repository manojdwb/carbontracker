import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/layout/main-layout";

export default function Preferences() {
  return (
    <MainLayout>
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* First Row - 4 columns */}
              <div className="grid grid-cols-4 gap-8 mb-8">
                {/* Emission Factor - Energy Basis */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Emission Factor - Energy Basis</Label>
                  <Select defaultValue="tC/GJ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tC/GJ">tC/GJ</SelectItem>
                      <SelectItem value="kg CO2/GJ">kg CO2/GJ</SelectItem>
                      <SelectItem value="tCO2/GJ">tCO2/GJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calorific Value */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Calorific Value</Label>
                  <Select defaultValue="GJ/tonnes">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GJ/tonnes">GJ/tonnes</SelectItem>
                      <SelectItem value="MJ/kg">MJ/kg</SelectItem>
                      <SelectItem value="BTU/lb">BTU/lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Energy */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Energy</Label>
                  <Select defaultValue="kWh">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kWh">kWh</SelectItem>
                      <SelectItem value="MWh">MWh</SelectItem>
                      <SelectItem value="GWh">GWh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Waste */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Waste</Label>
                  <Select defaultValue="US Tons">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US Tons">US Tons</SelectItem>
                      <SelectItem value="Metric Tons">Metric Tons</SelectItem>
                      <SelectItem value="kg">kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - 4 columns */}
              <div className="grid grid-cols-4 gap-8 mb-8">
                {/* Emission Factor - Mass Basis */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Emission Factor - Mass Basis</Label>
                  <Select defaultValue="kg CO2/t">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg CO2/t">kg CO2/t</SelectItem>
                      <SelectItem value="tCO2/t">tCO2/t</SelectItem>
                      <SelectItem value="g CO2/kg">g CO2/kg</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Water */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Water</Label>
                  <Select defaultValue="kl">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kl">kl</SelectItem>
                      <SelectItem value="liters">liters</SelectItem>
                      <SelectItem value="gallons">gallons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Currency</Label>
                  <Select defaultValue="INR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emission Factor */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Emission Factor</Label>
                  <Select defaultValue="IEA">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IEA">IEA</SelectItem>
                      <SelectItem value="CEA">CEA</SelectItem>
                      <SelectItem value="IPCC">IPCC</SelectItem>
                      <SelectItem value="Defra">Defra</SelectItem>
                      <SelectItem value="India GHG">India GHG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Third Row - Data Base */}
              <div className="grid grid-cols-4 gap-8">
                {/* Data Base */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Data Base</Label>
                  <Select defaultValue="Ecoinvent">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ecoinvent">Ecoinvent</SelectItem>
                      <SelectItem value="GaBi">GaBi</SelectItem>
                      <SelectItem value="SimaPro">SimaPro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Empty cells to maintain grid layout */}
                <div></div>
                <div></div>
                <div></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
}