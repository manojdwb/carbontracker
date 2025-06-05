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

  // Mock project data based on your images
  const companywideProjects = [
    { name: "Mumbai Plant", status: "15 out of 30 forms pending", owner: "ABC", progress: 50 },
    { name: "Gujarat Plant", status: "15 out of 30 forms pending", owner: "XYZ", progress: 50 },
    { name: "Karnataka Plant 3", status: "15 out of 30 forms pending", owner: "PNQ", progress: 50 },
  ];

  const projectWiseData = [
    { name: "Boiler 1", status: "15/30 forms pending", uploadedBy: "ABC", approvedBy: "X" },
    { name: "Boiler 2", status: "15/30 forms pending", uploadedBy: "XYZ", approvedBy: "Y" },
    { name: "Boiler 3", status: "15/30 forms pending", uploadedBy: "PNQ", approvedBy: "Z" },
  ];

  return (
    <>
      <Header
        title="Emissions Data"
        subtitle="Manage and view all emission entries"
        onExport={handleExport}
        onAddEntry={handleAddEntry}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div id="data-entry-form">
            <DataEntryForm />
          </div>
          
          {/* Project Status Section */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "companywide" ? "default" : "outline"}
                  onClick={() => setActiveTab("companywide")}
                  className="px-6"
                >
                  Companywide
                </Button>
                <Button
                  variant={activeTab === "projectwise" ? "default" : "outline"}
                  onClick={() => setActiveTab("projectwise")}
                  className="px-6"
                >
                  Project Wise
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeTab === "companywide" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Owner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companywideProjects.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">{project.status}</div>
                            <Progress value={project.progress} className="w-32" />
                          </div>
                        </TableCell>
                        <TableCell>{project.owner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Uploaded by</TableHead>
                      <TableHead>Approved by</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projectWiseData.map((project, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{project.status}</span>
                        </TableCell>
                        <TableCell>{project.uploadedBy}</TableCell>
                        <TableCell>{project.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <EmissionsTable />
        </div>
      </main>
    </>
  );
}
