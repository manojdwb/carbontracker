import { useState } from "react";
import Header from "@/components/layout/header";
import MainLayout from "@/components/layout/main-layout";
import DataEntryForm from "@/components/dashboard/data-entry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";

export default function Data() {
  const [activeMainTab, setActiveMainTab] = useState("data");
  const [activeDataLogTab, setActiveDataLogTab] = useState("companywide");
  const [currentPage, setCurrentPage] = useState(1);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [filters, setFilters] = useState({
    component: "",
    plantName: "",
    profitCenter: "",
    operationSite: "",
    businessCenter: "",
    audited: ""
  });
  const totalPages = 3;

  // Generate random data for tables
  const companywideData = [
    { no: 1, date: "25-4-2025", plant: "Mumbai", profit: "Maharashtra", operation: "West", business: "India", status: "80/110 forms filled" },
    { no: 2, date: "24-4-2025", plant: "Dahej", profit: "Gujarat", operation: "West", business: "India", status: "65/110 forms filled" },
    { no: 3, date: "23-4-2025", plant: "Pune", profit: "Maharashtra", operation: "West", business: "India", status: "90/110 forms filled" },
    { no: 4, date: "22-4-2025", plant: "Ahmedabad", profit: "Gujarat", operation: "West", business: "India", status: "45/110 forms filled" },
    { no: 5, date: "21-4-2025", plant: "Bangalore", profit: "Karnataka", operation: "South", business: "India", status: "70/110 forms filled" },
    { no: 6, date: "20-4-2025", plant: "Chennai", profit: "Tamil Nadu", operation: "South", business: "India", status: "55/110 forms filled" },
    { no: 7, date: "19-4-2025", plant: "Hyderabad", profit: "Telangana", operation: "South", business: "India", status: "85/110 forms filled" },
    { no: 8, date: "18-4-2025", plant: "Kolkata", profit: "West Bengal", operation: "East", business: "India", status: "60/110 forms filled" },
    { no: 9, date: "17-4-2025", plant: "Delhi", profit: "Delhi", operation: "North", business: "India", status: "75/110 forms filled" },
    { no: 10, date: "16-4-2025", plant: "Gurgaon", profit: "Haryana", operation: "North", business: "India", status: "50/110 forms filled" },
    { no: 11, date: "15-4-2025", plant: "Noida", profit: "Uttar Pradesh", operation: "North", business: "India", status: "95/110 forms filled" },
    { no: 12, date: "14-4-2025", plant: "Jaipur", profit: "Rajasthan", operation: "West", business: "India", status: "40/110 forms filled" },
    { no: 13, date: "13-4-2025", plant: "Lucknow", profit: "Uttar Pradesh", operation: "North", business: "India", status: "65/110 forms filled" },
    { no: 14, date: "12-4-2025", plant: "Bhopal", profit: "Madhya Pradesh", operation: "Central", business: "India", status: "80/110 forms filled" },
    { no: 15, date: "11-4-2025", plant: "Indore", profit: "Madhya Pradesh", operation: "Central", business: "India", status: "70/110 forms filled" },
    { no: 16, date: "10-4-2025", plant: "Nagpur", profit: "Maharashtra", operation: "Central", business: "India", status: "55/110 forms filled" },
    { no: 17, date: "09-4-2025", plant: "Surat", profit: "Gujarat", operation: "West", business: "India", status: "85/110 forms filled" },
    { no: 18, date: "08-4-2025", plant: "Vadodara", profit: "Gujarat", operation: "West", business: "India", status: "60/110 forms filled" },
    { no: 19, date: "07-4-2025", plant: "Coimbatore", profit: "Tamil Nadu", operation: "South", business: "India", status: "75/110 forms filled" },
    { no: 20, date: "06-4-2025", plant: "Kochi", profit: "Kerala", operation: "South", business: "India", status: "90/110 forms filled" }
  ];

  const plantWiseData = [
    { no: 1, date: "24-4-2025", component: "Coal", plant: "Mumbai", profit: "Maharashtra", operation: "West", business: "India", completion: "100%", owner: "Pooja", verifier: "Arun", approver: "Priya", assurer: "Narendra", audited: "Yes" },
    { no: 2, date: "20-4-2025", component: "Natural Gas", plant: "Dahej", profit: "Gujarat", operation: "West", business: "India", completion: "50%", owner: "Pooja", verifier: "Arun", approver: "Priya", assurer: "Narendra", audited: "No" },
    { no: 3, date: "19-4-2025", component: "Electricity", plant: "Pune", profit: "Maharashtra", operation: "West", business: "India", completion: "85%", owner: "Rahul", verifier: "Sneha", approver: "Amit", assurer: "Vijay", audited: "Yes" },
    { no: 4, date: "18-4-2025", component: "Diesel", plant: "Ahmedabad", profit: "Gujarat", operation: "West", business: "India", completion: "75%", owner: "Priya", verifier: "Rohit", approver: "Neha", assurer: "Kiran", audited: "Yes" },
    { no: 5, date: "17-4-2025", component: "Coal", plant: "Bangalore", profit: "Karnataka", operation: "South", business: "India", completion: "60%", owner: "Ankit", verifier: "Meera", approver: "Suresh", assurer: "Deepak", audited: "No" },
    { no: 6, date: "16-4-2025", component: "Natural Gas", plant: "Chennai", profit: "Tamil Nadu", operation: "South", business: "India", completion: "90%", owner: "Kavya", verifier: "Ravi", approver: "Sunita", assurer: "Prakash", audited: "Yes" },
    { no: 7, date: "15-4-2025", component: "Electricity", plant: "Hyderabad", profit: "Telangana", operation: "South", business: "India", completion: "45%", owner: "Vikash", verifier: "Shreya", approver: "Manoj", assurer: "Rajesh", audited: "No" },
    { no: 8, date: "14-4-2025", component: "Diesel", plant: "Kolkata", profit: "West Bengal", operation: "East", business: "India", completion: "80%", owner: "Nitesh", verifier: "Pooja", approver: "Sanjay", assurer: "Dinesh", audited: "Yes" },
    { no: 9, date: "13-4-2025", component: "Coal", plant: "Delhi", profit: "Delhi", operation: "North", business: "India", completion: "65%", owner: "Manish", verifier: "Rekha", approver: "Ashok", assurer: "Ramesh", audited: "Yes" },
    { no: 10, date: "12-4-2025", component: "Natural Gas", plant: "Gurgaon", profit: "Haryana", operation: "North", business: "India", completion: "55%", owner: "Swati", verifier: "Ajay", approver: "Usha", assurer: "Hemant", audited: "No" },
    { no: 11, date: "11-4-2025", component: "Electricity", plant: "Noida", profit: "Uttar Pradesh", operation: "North", business: "India", completion: "95%", owner: "Gaurav", verifier: "Nisha", approver: "Vikas", assurer: "Mukesh", audited: "Yes" },
    { no: 12, date: "10-4-2025", component: "Diesel", plant: "Jaipur", profit: "Rajasthan", operation: "West", business: "India", completion: "70%", owner: "Divya", verifier: "Sunil", approver: "Ritu", assurer: "Yogesh", audited: "Yes" },
    { no: 13, date: "09-4-2025", component: "Coal", plant: "Lucknow", profit: "Uttar Pradesh", operation: "North", business: "India", completion: "40%", owner: "Akash", verifier: "Jyoti", approver: "Pankaj", assurer: "Naveen", audited: "No" },
    { no: 14, date: "08-4-2025", component: "Natural Gas", plant: "Bhopal", profit: "Madhya Pradesh", operation: "Central", business: "India", completion: "85%", owner: "Shilpa", verifier: "Mohan", approver: "Geeta", assurer: "Sachin", audited: "Yes" },
    { no: 15, date: "07-4-2025", component: "Electricity", plant: "Indore", profit: "Madhya Pradesh", operation: "Central", business: "India", completion: "60%", owner: "Tushar", verifier: "Kavita", approver: "Harish", assurer: "Bhushan", audited: "Yes" },
    { no: 16, date: "06-4-2025", component: "Diesel", plant: "Nagpur", profit: "Maharashtra", operation: "Central", business: "India", completion: "75%", owner: "Vandana", verifier: "Deepak", approver: "Smita", assurer: "Anil", audited: "No" },
    { no: 17, date: "05-4-2025", component: "Coal", plant: "Surat", profit: "Gujarat", operation: "West", business: "India", completion: "50%", owner: "Rohit", verifier: "Megha", approver: "Vivek", assurer: "Shankar", audited: "Yes" },
    { no: 18, date: "04-4-2025", component: "Natural Gas", plant: "Vadodara", profit: "Gujarat", operation: "West", business: "India", completion: "90%", owner: "Priyanka", verifier: "Kiran", approver: "Rajiv", assurer: "Mahesh", audited: "Yes" },
    { no: 19, date: "03-4-2025", component: "Electricity", plant: "Coimbatore", profit: "Tamil Nadu", operation: "South", business: "India", completion: "65%", owner: "Arjun", verifier: "Seema", approver: "Anand", assurer: "Lalit", audited: "No" },
    { no: 20, date: "02-4-2025", component: "Diesel", plant: "Kochi", profit: "Kerala", operation: "South", business: "India", completion: "80%", owner: "Neeta", verifier: "Aman", approver: "Preeti", assurer: "Gopal", audited: "Yes" }
  ];

  const handleRedItemClick = (entry: any) => {
    setSelectedEntry(entry);
    setShowApprovalDialog(true);
  };

  const handleDownloadCompany = () => {
    // Create CSV content
    const headers = ["No.", "Date", "Plant Name", "Profit Center", "Operation Site", "Business Center", "Completion Status"];
    const csvContent = [
      headers.join(","),
      ...companywideData.map(row => [
        row.no, row.date, row.plant, row.profit, row.operation, row.business, `"${row.status}"`
      ].join(","))
    ].join("\n");
    
    // Download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPlant = () => {
    // Create CSV content
    const headers = ["No.", "Date", "Component Name", "Plant Name", "Profit Center", "Operation Site", "Business Center", "Completion Status", "Data Owner", "Data Verifier", "Data Approver", "Data Assurer", "Data Audited YES/NO"];
    const csvContent = [
      headers.join(","),
      ...plantWiseData.map(row => [
        row.no, row.date, row.component, row.plant, row.profit, row.operation, row.business, row.completion, row.owner, row.verifier, row.approver, row.assurer, row.audited
      ].join(","))
    ].join("\n");
    
    // Download file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plant_data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <Header
        title="Emission Data"
        subtitle="Manage and view all emission entries"
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Tabs */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={activeMainTab === "data" ? "default" : "outline"}
              onClick={() => setActiveMainTab("data")}
              className="px-8"
            >
              Data
            </Button>
            <Button
              variant={activeMainTab === "datalog" ? "default" : "outline"}
              onClick={() => setActiveMainTab("datalog")}
              className="px-8"
            >
              Data Log
            </Button>
          </div>

          {activeMainTab === "data" ? (
            <div id="data-entry-form">
              <DataEntryForm />
            </div>
          ) : (
            /* Data Log Section */
            <Card>
              <CardHeader>
                <CardTitle>Data Log</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={activeDataLogTab === "companywide" ? "default" : "outline"}
                    onClick={() => setActiveDataLogTab("companywide")}
                    className="px-6"
                  >
                    Company
                  </Button>
                  <Button
                    variant={activeDataLogTab === "plantwise" ? "default" : "outline"}
                    onClick={() => setActiveDataLogTab("plantwise")}
                    className="px-6"
                  >
                    Plant
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activeDataLogTab === "companywide" ? (
                  <div>
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
                        {companywideData.slice((currentPage - 1) * 7, currentPage * 7).map((row) => (
                          <TableRow key={row.no}>
                            <TableCell>{row.no}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.plant}</TableCell>
                            <TableCell>{row.profit}</TableCell>
                            <TableCell>{row.operation}</TableCell>
                            <TableCell>{row.business}</TableCell>
                            <TableCell>{row.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Download Button */}
                    <div className="flex justify-end mt-4 mb-2">
                      <Button onClick={handleDownloadCompany} variant="outline" className="flex items-center space-x-2">
                        <Download size={16} />
                        <span>Download</span>
                      </Button>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-4 mt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-2"
                      >
                        <span>‹</span>
                        <span>Previous</span>
                      </Button>
                      
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <span>›</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex justify-end mb-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center space-x-2"
                        onClick={() => setShowFilterDialog(true)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="4" y1="21" x2="4" y2="14"></line>
                          <line x1="4" y1="10" x2="4" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="12"></line>
                          <line x1="12" y1="8" x2="12" y2="3"></line>
                          <line x1="20" y1="21" x2="20" y2="16"></line>
                          <line x1="20" y1="12" x2="20" y2="3"></line>
                          <line x1="1" y1="14" x2="7" y2="14"></line>
                          <line x1="9" y1="8" x2="15" y2="8"></line>
                          <line x1="17" y1="16" x2="23" y2="16"></line>
                        </svg>
                        <span>Filter</span>
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
                        {plantWiseData.slice((currentPage - 1) * 7, currentPage * 7).map((row) => (
                          <TableRow key={row.no}>
                            <TableCell>{row.no}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.component}</TableCell>
                            <TableCell>{row.plant}</TableCell>
                            <TableCell>{row.profit}</TableCell>
                            <TableCell>{row.operation}</TableCell>
                            <TableCell>{row.business}</TableCell>
                            <TableCell>{row.completion}</TableCell>
                            <TableCell className={row.completion === "100%" || parseInt(row.completion) >= 70 ? "text-green-600" : "text-orange-600"}>{row.owner}</TableCell>
                            <TableCell className={row.completion === "100%" || parseInt(row.completion) >= 70 ? "text-green-600" : "text-orange-600"}>{row.verifier}</TableCell>
                            <TableCell 
                              className={row.audited === "Yes" ? "text-green-600" : "text-red-600 cursor-pointer hover:underline"}
                              onClick={() => row.audited === "No" && handleRedItemClick(row)}
                            >
                              {row.approver}
                            </TableCell>
                            <TableCell 
                              className={row.audited === "Yes" ? "text-green-600" : "text-red-600 cursor-pointer hover:underline"}
                              onClick={() => row.audited === "No" && handleRedItemClick(row)}
                            >
                              {row.assurer}
                            </TableCell>
                            <TableCell 
                              className={row.audited === "Yes" ? "text-green-600" : "text-red-600 cursor-pointer hover:underline"}
                              onClick={() => row.audited === "No" && handleRedItemClick(row)}
                            >
                              {row.audited}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Download Button */}
                    <div className="flex justify-end mt-4 mb-2">
                      <Button onClick={handleDownloadPlant} variant="outline" className="flex items-center space-x-2">
                        <Download size={16} />
                        <span>Download</span>
                      </Button>
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-4 mt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-2"
                      >
                        <span>‹</span>
                        <span>Previous</span>
                      </Button>
                      
                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-2"
                      >
                        <span>Next</span>
                        <span>›</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Multi-level Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-6 gap-4">
            {/* Main Filter Menu */}
            <div className="space-y-2">
              <h3 className="font-medium">Main Filter Menu</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">Component</Button>
                <Button variant="outline" className="w-full justify-start text-left">Plant Name</Button>
                <Button variant="outline" className="w-full justify-start text-left">Profit Center</Button>
                <Button variant="outline" className="w-full justify-start text-left">Operation Site</Button>
                <Button variant="outline" className="w-full justify-start text-left">Business Center</Button>
                <Button variant="outline" className="w-full justify-start text-left">Audited Y/N</Button>
              </div>
            </div>

            {/* Component Filter */}
            <div className="space-y-2">
              <h3 className="font-medium">Component Filter</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">Coal</Button>
                <Button variant="outline" className="w-full justify-start text-left">Diesel</Button>
                <Button variant="outline" className="w-full justify-start text-left">Natural Gas</Button>
                <Button variant="outline" className="w-full justify-start text-left">Electricity</Button>
              </div>
            </div>

            {/* Plant Name Filter */}
            <div className="space-y-2">
              <h3 className="font-medium">Plant Name Filter</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">Mumbai</Button>
                <Button variant="outline" className="w-full justify-start text-left">Dahej</Button>
                <Button variant="outline" className="w-full justify-start text-left">Surat</Button>
                <Button variant="outline" className="w-full justify-start text-left">Indore</Button>
              </div>
            </div>

            {/* Profit Center Filter */}
            <div className="space-y-2">
              <h3 className="font-medium">Profit Center Filter</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">Maharashtra</Button>
                <Button variant="outline" className="w-full justify-start text-left">Gujarat</Button>
                <Button variant="outline" className="w-full justify-start text-left">Madhya Pradesh</Button>
              </div>
            </div>

            {/* Operation Site Filter */}
            <div className="space-y-2">
              <h3 className="font-medium">Operation Site Filter</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">West</Button>
                <Button variant="outline" className="w-full justify-start text-left">South</Button>
                <Button variant="outline" className="w-full justify-start text-left">North</Button>
                <Button variant="outline" className="w-full justify-start text-left">East</Button>
              </div>
            </div>

            {/* Audited Y/N Filter */}
            <div className="space-y-2">
              <h3 className="font-medium">Audited Y/N Filter</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left">Yes</Button>
                <Button variant="outline" className="w-full justify-start text-left">No</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowFilterDialog(false)}>Apply Filter</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Entry Number #{selectedEntry?.no || "1890871"}</DialogTitle>
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Bill_Sep2025.pdf</span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Business Center</Label>
                <Select defaultValue="India">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Plant Name</Label>
                <Select defaultValue="Mumbai">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Emission Category</Label>
                <Select defaultValue="Scope 1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scope 1">Scope 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Quantity</Label>
                <div className="flex space-x-2">
                  <Input defaultValue="10" />
                  <Select defaultValue="Metric Ton">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Metric Ton">Metric Ton</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Emission Factor</Label>
                <div className="flex space-x-2">
                  <Input defaultValue="94.6" />
                  <Select defaultValue="tC/GJ">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tC/GJ">tC/GJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Calculated Emissions in tCO2</Label>
                <Input defaultValue="22.7 tCO2" readOnly className="bg-gray-50" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Operation Site</Label>
                <Select defaultValue="West">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="West">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Component Name</Label>
                <Select defaultValue="Coal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coal">Coal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Start Date</Label>
                <Input type="date" defaultValue="2025-09-01" />
              </div>
              
              <div>
                <Label>Cost (INR)</Label>
                <Input defaultValue="68,900" />
              </div>
              
              <div>
                <Label>Calorific Value</Label>
                <div className="flex space-x-2">
                  <Input defaultValue="28.2" />
                  <Select defaultValue="GJ/tonnes">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GJ/tonnes">GJ/tonnes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Profit Center</Label>
                <Select defaultValue="Maharashtra">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Date of Entry</Label>
                <Input type="date" defaultValue="2025-10-06" />
              </div>
              
              <div>
                <Label>End Date</Label>
                <Input type="date" defaultValue="2025-09-30" />
              </div>
              
              <div>
                <Label>Vendor's Name</Label>
                <Input defaultValue="Acme Labs" />
              </div>
              
              <div>
                <Label>Density</Label>
                <div className="flex space-x-2">
                  <Input defaultValue="NA" />
                  <Select defaultValue="kilogram/litre">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kilogram/litre">kilogram/litre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label>Remarks</Label>
            <Textarea 
              defaultValue="Operating Fuel for boilers inside the plant."
              className="mt-2"
              rows={3}
            />
          </div>

          <div className="flex justify-center mt-6">
            <Button className="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}