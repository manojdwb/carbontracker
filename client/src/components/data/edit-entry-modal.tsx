import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { EmissionEntry, InsertEmissionEntry } from "@shared/schema";

interface EditEntryModalProps {
  entry: EmissionEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditEntryModal({ entry, isOpen, onClose }: EditEntryModalProps) {
  const [formData, setFormData] = useState<Partial<InsertEmissionEntry>>({});
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize form data when entry changes
  React.useEffect(() => {
    if (entry) {
      setFormData({
        businessCenter: entry.businessCenter,
        operationSite: entry.operationSite,
        plantName: entry.plantName,
        componentType: entry.componentType,
        emissionScope: entry.emissionScope,
        quantity: entry.quantity,
        unit: entry.unit,
        emissionFactor: entry.emissionFactor,
        emissionFactorUnit: entry.emissionFactorUnit,
        calorificValue: entry.calorificValue,
        calorificValueUnit: entry.calorificValueUnit,
        density: entry.density,
        densityUnit: entry.densityUnit,
        cost: entry.cost,
        vendorName: entry.vendorName,
        date: entry.date,
        startDate: entry.startDate,
        endDate: entry.endDate,
        notes: entry.notes,
      });
      // Set default file if exists
      setAttachedFile("Bill_Sep2025.pdf");
    }
  }, [entry]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertEmissionEntry>) => {
      if (!entry) return;
      const response = await apiRequest("PUT", `/api/emissions/${entry.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Emission entry updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/emissions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/emissions/summary"] });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update emission entry",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof InsertEmissionEntry, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Entry Number #{entry.id}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Attachment Section */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <Label className="text-sm font-medium">Attach File</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse File
                </Button>
                {attachedFile && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded">
                    <span className="text-sm">{attachedFile}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields - First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="businessCenter">Business Center</Label>
              <Select
                value={formData.businessCenter}
                onValueChange={(value) => handleInputChange('businessCenter', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="operationSite">Operation Site</Label>
              <Select
                value={formData.operationSite}
                onValueChange={(value) => handleInputChange('operationSite', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select operation site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="profitCenter">Profit Center</Label>
              <Select
                value={formData.operationSite}
                onValueChange={(value) => handleInputChange('operationSite', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profit center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Form Fields - Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="plantName">Plant Name</Label>
              <Select
                value={formData.plantName}
                onValueChange={(value) => handleInputChange('plantName', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Nagpur">Nagpur</SelectItem>
                  <SelectItem value="Dahej">Dahej</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="componentType">Component Name</Label>
              <Select
                value={formData.componentType}
                onValueChange={(value) => handleInputChange('componentType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select component" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coal">Coal</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="natural-gas">Natural Gas</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date">Date of Entry</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
          </div>

          {/* Form Fields - Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emissionScope">Emission Category</Label>
              <Select
                value={formData.emissionScope}
                onValueChange={(value) => handleInputChange('emissionScope', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope-1">Scope 1</SelectItem>
                  <SelectItem value="scope-2">Scope 2</SelectItem>
                  <SelectItem value="scope-3">Scope 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </div>
          </div>

          {/* Form Fields - Fourth Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Select
                  value={formData.unit}
                  onValueChange={(value) => handleInputChange('unit', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric-ton">Metric Ton</SelectItem>
                    <SelectItem value="kg">Kilogram</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="cost">Cost (INR)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => handleInputChange('cost', parseFloat(e.target.value))}
              />
            </div>

            <div>
              <Label htmlFor="vendorName">Vendor's Name</Label>
              <Input
                value={formData.vendorName}
                onChange={(e) => handleInputChange('vendorName', e.target.value)}
                placeholder="Enter vendor name"
              />
            </div>
          </div>

          {/* Form Fields - Fifth Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emissionFactor">Emission Factor</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="0.01"
                  value={formData.emissionFactor}
                  onChange={(e) => handleInputChange('emissionFactor', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Select
                  value={formData.emissionFactorUnit}
                  onValueChange={(value) => handleInputChange('emissionFactorUnit', value)}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tCO2/GJ">tCO2/GJ</SelectItem>
                    <SelectItem value="kgCO2/unit">kgCO2/unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="calorificValue">Calorific Value</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="0.01"
                  value={formData.calorificValue}
                  onChange={(e) => handleInputChange('calorificValue', parseFloat(e.target.value))}
                  className="flex-1"
                />
                <Select
                  value={formData.calorificValueUnit}
                  onValueChange={(value) => handleInputChange('calorificValueUnit', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GJ/tonnes">GJ/tonnes</SelectItem>
                    <SelectItem value="MJ/kg">MJ/kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="density">Density</Label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  step="0.01"
                  value={formData.density}
                  onChange={(e) => handleInputChange('density', parseFloat(e.target.value))}
                  className="flex-1"
                  placeholder="NA"
                />
                <Select
                  value={formData.densityUnit}
                  onValueChange={(value) => handleInputChange('densityUnit', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kilogram/litre">kilogram/litre</SelectItem>
                    <SelectItem value="g/cm³">g/cm³</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Calculated Emissions Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Calculated Emissions in tCO2</Label>
              <div className="p-3 bg-gray-100 rounded border">
                {entry.co2Emissions ? `${entry.co2Emissions} tCO2` : '0 tCO2'}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Remarks</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Enter remarks"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}