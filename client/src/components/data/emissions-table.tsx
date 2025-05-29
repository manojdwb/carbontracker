import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { getComponentIcon, getComponentColor, formatCO2, getDateRange } from "@/lib/utils";
import type { EmissionEntry } from "@shared/schema";

export default function EmissionsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery<EmissionEntry[]>({
    queryKey: ["/api/emissions"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/emissions/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Emission entry deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/emissions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emissions/summary"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete emission entry",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this emission entry?")) {
      deleteMutation.mutate(id);
    }
  };

  // Filter entries based on search and date filter
  const filteredEntries = entries?.filter((entry) => {
    const matchesSearch = searchQuery === "" || 
      entry.componentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (dateFilter === "") return true;
    
    const { startDate, endDate } = getDateRange(dateFilter);
    return entry.date >= startDate && entry.date <= endDate;
  }) || [];

  if (isLoading) {
    return (
      <Card className="bg-card shadow-sm border border-border">
        <CardHeader>
          <CardTitle>Emissions Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card shadow-sm border border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Emissions Data</span>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search entries..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Time</SelectItem>
                <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <i className="fas fa-inbox text-4xl mb-4 block"></i>
            <p className="text-lg font-medium">No emission entries found</p>
            <p className="text-sm">
              {searchQuery || dateFilter ? "Try adjusting your filters" : "Add your first entry to get started"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Emission Factor</TableHead>
                    <TableHead>CO2 Emissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${getComponentColor(entry.componentType)}`}>
                            <i className={`${getComponentIcon(entry.componentType)} text-xs`}></i>
                          </div>
                          <span className="font-medium capitalize">
                            {entry.componentType.replace('-', ' ')}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{entry.date}</TableCell>
                      <TableCell>{entry.quantity} units</TableCell>
                      <TableCell className="text-muted-foreground">{entry.emissionFactor} kgCO2/unit</TableCell>
                      <TableCell className="font-semibold">{formatCO2(Number(entry.co2Emissions))}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-dark">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(entry.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredEntries.length} of {entries?.length || 0} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <i className="fas fa-chevron-left"></i>
                </Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
