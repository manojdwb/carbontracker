import { useState } from "react";
import Header from "@/components/layout/header";
import DataEntryForm from "@/components/dashboard/data-entry-form";
import EmissionsTable from "@/components/data/emissions-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Data() {
  const [activeTab, setActiveTab] = useState("companywide");

  const handleExport = () => {
    console.log("Export data clicked");
  };

  const handleAddEntry = () => {
    // Scroll to data entry form
    document.getElementById('data-entry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadTemplate = () => {
    console.log("Download template clicked");
  };

  const handleBulkUpload = () => {
    console.log("Bulk upload clicked");
  };

  // Project data
  const companywideProjects = [
    { name: "Mumbai Plant", status: "15/30 entries filed", owner: "ABC", progress: 50 },
    { name: "Gujarat Plant", status: "15/30 entries filed", owner: "XYZ", progress: 50 },
    { name: "Karnataka Plant 3", status: "15/30 entries filed", owner: "PNQ", progress: 50 },
  ];

  const projectWiseData = [
    { name: "Boiler 1", status: "15/30 entries filed", uploadedBy: "ABC", checkedBy: "Manager1", approvedBy: "X" },
    { name: "Boiler 2", status: "15/30 entries filed", uploadedBy: "XYZ", checkedBy: "Manager2", approvedBy: "Y" },
    { name: "Boiler 3", status: "15/30 entries filed", uploadedBy: "PNQ", checkedBy: "Manager3", approvedBy: "Z" },
  ];

  return (
    <>
      <Header
        title="Emission Data"
        subtitle="Manage and view all emission entries"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div id="data-entry-form">
            <DataEntryForm />
          </div>
          
          {/* Data Log Section */}
          <Card>
            <CardHeader>
              <CardTitle>Data Log</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "companywide" ? "default" : "outline"}
                  onClick={() => setActiveTab("companywide")}
                  className="px-6"
                >
                  Company Wide
                </Button>
                <Button
                  variant={activeTab === "projectwise" ? "default" : "outline"}
                  onClick={() => setActiveTab("projectwise")}
                  className="px-6"
                >
                  Plant Wise
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "companywide" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Plant Name</TableHead>
                      <TableHead>Profit Center</TableHead>
                      <TableHead>Operation Site</TableHead>
                      <TableHead>Business Center</TableHead>
                      <TableHead>Completion Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>25-4-2025</TableCell>
                      <TableCell>Mumbai</TableCell>
                      <TableCell>Maharashtra</TableCell>
                      <TableCell>West</TableCell>
                      <TableCell>India</TableCell>
                      <TableCell>80/110 forms filled</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <div className="relative">
                  <div className="flex justify-end mb-4">
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <span>Filter</span>
                      <i className="fas fa-filter"></i>
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Component Name</TableHead>
                        <TableHead>Plant Name</TableHead>
                        <TableHead>Profit Center</TableHead>
                        <TableHead>Operation Site</TableHead>
                        <TableHead>Business Center</TableHead>
                        <TableHead>Completion Status</TableHead>
                        <TableHead>Data Owner</TableHead>
                        <TableHead>Data Verifier</TableHead>
                        <TableHead>Data Approver</TableHead>
                        <TableHead>Data Assurer</TableHead>
                        <TableHead>Data Audited YES/NO</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>24-4-2025</TableCell>
                        <TableCell>Coal</TableCell>
                        <TableCell>Mumbai</TableCell>
                        <TableCell>Maharashtra</TableCell>
                        <TableCell>West</TableCell>
                        <TableCell>India</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell className="text-green-600">Pooja</TableCell>
                        <TableCell className="text-green-600">Arun</TableCell>
                        <TableCell className="text-green-600">Priya</TableCell>
                        <TableCell className="text-green-600">Narendra</TableCell>
                        <TableCell className="text-green-600">Yes</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>20-4-2025</TableCell>
                        <TableCell>Natural Gas</TableCell>
                        <TableCell>Dahej</TableCell>
                        <TableCell>Gujarat</TableCell>
                        <TableCell>West</TableCell>
                        <TableCell>India</TableCell>
                        <TableCell>50%</TableCell>
                        <TableCell className="text-green-600">Pooja</TableCell>
                        <TableCell className="text-green-600">Arun</TableCell>
                        <TableCell className="text-red-600">Priya</TableCell>
                        <TableCell className="text-red-600">Narendra</TableCell>
                        <TableCell className="text-red-600">No</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>


        </div>
      </main>
    </>
  );
}
