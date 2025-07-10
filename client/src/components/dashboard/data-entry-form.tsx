import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertEmissionEntrySchema, type InsertEmissionEntry } from "@shared/schema";
import { calculateCO2, formatCO2 } from "@/lib/utils";

export default function DataEntryForm() {
  const [calculatedCO2, setCalculatedCO2] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertEmissionEntry>({
    resolver: zodResolver(insertEmissionEntrySchema),
    defaultValues: {
      businessCenter: "",
      operationSite: "",
      profitCenter: "",
      plantName: "",
      componentName: "coal",
      dateOfEntry: new Date().toISOString().split('T')[0],
      scope: "scope-1",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      quantity: 0,
      costInr: 0,
      vendorName: "",
      emissionFactor: 0,
      calorificValue: 0,
      density: 0,
      remarks: "",
      completionStatus: "Pending",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertEmissionEntry) => {
      const response = await apiRequest("POST", "/api/emissions", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Emission entry added successfully",
      });
      form.reset();
      setCalculatedCO2(0);
      queryClient.invalidateQueries({ queryKey: ["/api/emissions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emissions/summary"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add emission entry",
        variant: "destructive",
      });
    },
  });

  const watchedValues = form.watch(["quantity", "emissionFactor"]);

  // Update calculated CO2 when quantity or emission factor changes
  useState(() => {
    const [quantity, emissionFactor] = watchedValues;
    if (quantity && emissionFactor) {
      setCalculatedCO2(calculateCO2(Number(quantity), Number(emissionFactor)));
    } else {
      setCalculatedCO2(0);
    }
  });

  const onSubmit = (data: InsertEmissionEntry) => {
    mutation.mutate(data);
  };

  return (
    <Card className="bg-card shadow-sm border border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Add New Entry</span>
          <i className="fas fa-plus-circle text-primary"></i>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="businessCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Center</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Business Center" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="operationSite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operation Site</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Business Center" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="west">West</SelectItem>
                        <SelectItem value="east">East</SelectItem>
                        <SelectItem value="north">North</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="profitCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profit Center</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Profit Center" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="plantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plant Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="dahej">Dahej</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="componentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Coal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="coal">Coal</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="natural-gas">Natural Gas</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfEntry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Entry</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Scope 1" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scope-1">Scope 1</SelectItem>
                        <SelectItem value="scope-2">Scope 2</SelectItem>
                        <SelectItem value="scope-3">Scope 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter Qty" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <Select defaultValue="metric-tons">
                        <SelectTrigger className="w-32 ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metric-tons">Metric Tons</SelectItem>
                          <SelectItem value="kg">Kilogram</SelectItem>
                          <SelectItem value="liters">Liters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="costInr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost (INR)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter Cost" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Vendor's Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Fifth Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="emissionFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Factor</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Default Emission Factor" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <Select defaultValue="terajoule-co2">
                        <SelectTrigger className="w-40 ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="terajoule-co2">TeraJoule/CO₂</SelectItem>
                          <SelectItem value="kg-co2">kg CO₂/unit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="calorificValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorific Value</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter Calorific Value" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <Select defaultValue="joules-gram">
                        <SelectTrigger className="w-32 ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joules-gram">Joules/gram</SelectItem>
                          <SelectItem value="mj-kg">MJ/kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Density</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Enter Density" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <Select defaultValue="kilogram-liter">
                        <SelectTrigger className="w-32 ml-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kilogram-liter">kilogram/liter</SelectItem>
                          <SelectItem value="g-ml">g/ml</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sixth Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Calculated Emissions in tCO2</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg border min-h-[100px] flex items-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {calculatedCO2.toFixed(2)} tCO2
                  </span>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter brief description here"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 px-8"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => form.reset()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                New Entry
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Download Template
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Bulk Upload
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}