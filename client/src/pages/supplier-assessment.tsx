import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/layout/header";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";

export default function SupplierAssessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [activeTab, setActiveTab] = useState("vendor-list");
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      supplierInfo: {
        companyName: "",
        address: "",
        contactOfOperation: "",
        designation: "",
        email: "",
        phoneNumber: "",
      },
    }
  });

  const sections = [
    "Supplier Information",
    "Environmental Practices", 
    "Social Responsibility",
    "Governance"
  ];

  // Vendor data for the vendor list
  const vendorData = [
    { id: 1, name: "ChemNova Industries", sector: "Coal", esgScore: 10, category: "Red" },
    { id: 2, name: "Vardhan Chemtech", sector: "Diesel", esgScore: 65, category: "Orange" },
    { id: 3, name: "GreenLeaf Organics", sector: "Diesel", esgScore: 75, category: "Green" },
    { id: 4, name: "Triveni Chemical Co.", sector: "Coal", esgScore: 80, category: "Green" },
    { id: 5, name: "Zenith Chemtrade", sector: "Natural Gas", esgScore: 30, category: "Red" },
    { id: 6, name: "Shakti Petrochem", sector: "Diesel", esgScore: 22, category: "Red" },
    { id: 7, name: "Sigma Polymers & Chemicals", sector: "Natural Gas", esgScore: 55, category: "Orange" },
    { id: 8, name: "Narmada ChemCorp", sector: "Coal", esgScore: 65, category: "Orange" },
    { id: 9, name: "EcoBond Solutions", sector: "Diesel", esgScore: 43, category: "Red" },
    { id: 10, name: "BluePeak Organics", sector: "Coal", esgScore: 39, category: "Red" }
  ];

  const onSubmit = (data: any) => {
    console.log("Supplier assessment data:", data);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "green": return "text-green-600 bg-green-50";
      case "orange": return "text-orange-600 bg-orange-50";
      case "red": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <MainLayout>
      <Header
        title="Supplier Assessment"
        subtitle="Evaluate supplier environmental performance"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vendor-list">Vendor List</TabsTrigger>
              <TabsTrigger value="supplier-assessment">Supplier Assessment</TabsTrigger>
            </TabsList>

            {/* Vendor List Tab */}
            <TabsContent value="vendor-list">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Vendor List</CardTitle>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium">Sl. No.</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium">Vendor's Name</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium">Sector</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium">ESG Score</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-medium">Category</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendorData.map((vendor) => (
                          <tr key={vendor.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 text-sm">{vendor.id}</td>
                            <td className="border border-gray-300 px-4 py-3 text-sm font-medium">{vendor.name}</td>
                            <td className="border border-gray-300 px-4 py-3 text-sm">{vendor.sector}</td>
                            <td className="border border-gray-300 px-4 py-3 text-sm font-medium">{vendor.esgScore}</td>
                            <td className="border border-gray-300 px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(vendor.category)}`}>
                                {vendor.category}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Supplier Assessment Tab */}
            <TabsContent value="supplier-assessment">
              <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            {sections.map((section, index) => (
              <div key={section} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentSection ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${index <= currentSection ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {section}
                </span>
                {index < sections.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${index < currentSection ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Supplier Information */}
            {currentSection === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      {...register("supplierInfo.companyName", { required: true })}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea 
                      id="address" 
                      {...register("supplierInfo.address")}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactOfOperation">Contact of Operation</Label>
                    <Input 
                      id="contactOfOperation" 
                      {...register("supplierInfo.contactOfOperation")}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="designation">Designation</Label>
                    <Input 
                      id="designation" 
                      {...register("supplierInfo.designation")}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      {...register("supplierInfo.email")}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      {...register("supplierInfo.phoneNumber")}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Environmental Practices */}
            {currentSection === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Management</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="envManagement" />
                        <Label htmlFor="envManagement">Do you have an Environmental Management System (e.g., ISO 14001)?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="envAudit" />
                        <Label htmlFor="envAudit">Do you conduct regular environmental audits?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="envOfficer" />
                        <Label htmlFor="envOfficer">Is there an appointed environmental officer</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Emissions & Waste</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ghgEmissions" />
                        <Label htmlFor="ghgEmissions">Do you track GHG emissions (Scope 1 and 2)</Label>
                      </div>
                      <div>
                        <Label htmlFor="hazardousWasteDesc">Describe hazardous waste management</Label>
                        <Textarea 
                          id="hazardousWasteDesc" 
                          className="mt-2" 
                          rows={3}
                          placeholder="Describe your hazardous waste management practices"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mitigatePollution" />
                        <Label htmlFor="mitigatePollution">Are there measures to mitigate pollution?</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Resource Efficiency</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="trackUsage" />
                        <Label htmlFor="trackUsage">Do you track energy and water usage?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="renewable" />
                        <Label htmlFor="renewable">Do you use renewable energy sources?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="reduceMaterial" />
                        <Label htmlFor="reduceMaterial">Are there initiatives to reduce raw material consumption</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Sustainability</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sustainabilityInitiatives" />
                        <Label htmlFor="sustainabilityInitiatives">Do you have green chemistry initiatives?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="packaging" />
                        <Label htmlFor="packaging">Is recycled or eco-friendly packaging used?</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Responsibility */}
            {currentSection === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Social Responsibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Labor Practices</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="laborLaws" />
                        <Label htmlFor="laborLaws">Do you comply with applicable labor laws?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="childLabor" />
                        <Label htmlFor="childLabor">Do you prohibit child labor and forced labor?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="minimumWages" />
                        <Label htmlFor="minimumWages">Are employees paid at least minimum wages</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Emissions & Waste</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="safetySystem" />
                        <Label htmlFor="safetySystem">Do you have a Health & Safety Management System</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="workplaceAccidents">Number of workplace accidents in the past 12 months</Label>
                    <Input id="workplaceAccidents" placeholder="Enter number" className="mt-2" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="regularSafety" />
                      <Label htmlFor="regularSafety">Are regular safety trainings provided?</Label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Diversity & Community</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="diversityPolicies" />
                        <Label htmlFor="diversityPolicies">Do you have diversity & inclusion policies?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="csrInitiatives" />
                        <Label htmlFor="csrInitiatives">Do you engage in CSR or community initiatives</Label>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="csrDescription">If yes, please describe</Label>
                      <Textarea id="csrDescription" className="mt-2" rows={3} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Governance */}
            {currentSection === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Governance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Compliance & Ethics</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="antiCorruption" />
                        <Label htmlFor="antiCorruption">Do you have an anti-bribery & anti-corruption policy?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="codeConduct" />
                        <Label htmlFor="codeConduct">Is there a Code of Conduct for employees and suppliers?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="violations" />
                        <Label htmlFor="violations">Have there been any regulatory violations</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Transparency & Risk</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discloseESG" />
                        <Label htmlFor="discloseESG">Do you publicly disclose ESG data or reports?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="internalESG" />
                        <Label htmlFor="internalESG">Do you have internal ESG performance monitoring?</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="esgRiskAssessments" />
                        <Label htmlFor="esgRiskAssessments">Do you conduct ESG risk assessments</Label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Certifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="esgCertifications" />
                        <Label htmlFor="esgCertifications">List any ESG—related certifications held:</Label>
                      </div>
                    </div>
                    <Textarea className="mt-2" rows={2} placeholder="List your ESG-related certifications" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="thirdParty" />
                      <Label htmlFor="thirdParty">Are third-party ESG audits conducted?</Label>
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" placeholder="Enter frequency" className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

                {/* Navigation buttons */}
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevSection}
                    disabled={currentSection === 0}
                  >
                    Previous
                  </Button>
                  
                  {currentSection === sections.length - 1 ? (
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Submit
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={nextSection}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </MainLayout>
  );
}
