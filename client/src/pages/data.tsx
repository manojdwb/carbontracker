import { useState } from "react";
import Header from "@/components/layout/header";
import DataEntryForm from "@/components/dashboard/data-entry-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Data() {
  const [activeMainTab, setActiveMainTab] = useState("data");
  const [activeDataLogTab, setActiveDataLogTab] = useState("companywide");
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <>
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
                    Company Wide
                  </Button>
                  <Button
                    variant={activeDataLogTab === "plantwise" ? "default" : "outline"}
                    onClick={() => setActiveDataLogTab("plantwise")}
                    className="px-6"
                  >
                    Plant Wise
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
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-4 mt-6">
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
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
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
                            <TableCell className={row.audited === "Yes" ? "text-green-600" : "text-red-600"}>{row.approver}</TableCell>
                            <TableCell className={row.audited === "Yes" ? "text-green-600" : "text-red-600"}>{row.assurer}</TableCell>
                            <TableCell className={row.audited === "Yes" ? "text-green-600" : "text-red-600"}>{row.audited}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    {/* Pagination */}
                    <div className="flex items-center justify-center space-x-4 mt-6">
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
    </>
  );
}