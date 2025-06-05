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
      componentType: "coal",
      scope: "scope-1",
      quantity: 0,
      date: new Date().toISOString().split('T')[0],
      calorificValue: 0,
      emissionFactor: 0,
      density: 0,
      costInr: 0,
      notes: "",
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
          <span>Add Emission Entry</span>
          <i className="fas fa-plus-circle text-primary"></i>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="componentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select component" />
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
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Scope</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scope" />
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter quantity"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const quantity = Number(e.target.value);
                          const emissionFactor = Number(form.getValues("emissionFactor"));
                          if (quantity && emissionFactor) {
                            setCalculatedCO2(calculateCO2(quantity, emissionFactor));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Density (kg/m³)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter density"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="calorificValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calorific Value (MJ/kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter calorific value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emissionFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emission Factor (kgCO2/unit)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.001"
                        placeholder="Enter emission factor"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          const emissionFactor = Number(e.target.value);
                          const quantity = Number(form.getValues("quantity"));
                          if (quantity && emissionFactor) {
                            setCalculatedCO2(calculateCO2(quantity, emissionFactor));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="costInr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost (INR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter cost in Indian Rupees"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Add any additional notes or context..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                <i className="fas fa-calculator mr-1"></i>
                Calculated CO2: <span className="font-semibold">{formatCO2(calculatedCO2)}</span>
              </div>
              <Button type="submit" disabled={mutation.isPending}>
                <i className="fas fa-save mr-2"></i>
                {mutation.isPending ? "Saving..." : "Save Entry"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
