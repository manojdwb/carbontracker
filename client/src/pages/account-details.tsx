import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/main-layout";

export default function AccountDetails() {
  return (
    <MainLayout>
      <main className="flex-1 overflow-auto p-6 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome Arun Kumar</h1>
          </div>

          {/* Account Details Card */}
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Name</span>
                <span className="text-gray-500">Arun Kumar</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Email id</span>
                <span className="text-gray-500">arunkumar@aarti-industries.com</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Contact Info</span>
                <span className="text-gray-500">+91 1234567892</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Location (Cost Center)</span>
                <span className="text-gray-500">Mumbai, India</span>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Privacy</span>
                <span className="text-gray-500">Details</span>
              </div>
              
              <div className="flex justify-between items-center py-4">
                <span className="text-gray-700 font-medium">Connections</span>
                <span className="text-gray-500">Details</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </MainLayout>
  );
}