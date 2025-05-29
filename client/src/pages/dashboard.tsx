import Header from "@/components/layout/header";
import EmissionsOverview from "@/components/dashboard/emissions-overview";
import DataEntryForm from "@/components/dashboard/data-entry-form";
import RecentEntries from "@/components/dashboard/recent-entries";
import EmissionsTable from "@/components/data/emissions-table";

export default function Dashboard() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export data clicked");
  };

  const handleAddEntry = () => {
    // TODO: Implement add entry modal or scroll to form
    console.log("Add entry clicked");
  };

  return (
    <>
      <Header
        title="CO2 Emissions Dashboard"
        subtitle="Track and manage enterprise carbon emissions"
        onExport={handleExport}
        onAddEntry={handleAddEntry}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <EmissionsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DataEntryForm />
            <RecentEntries />
          </div>

          <EmissionsTable />
        </div>
      </main>
    </>
  );
}
