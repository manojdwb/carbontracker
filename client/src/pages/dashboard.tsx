import Header from "@/components/layout/header";
import EmissionsOverview from "@/components/dashboard/emissions-overview";
import RecentEntries from "@/components/dashboard/recent-entries";

export default function Dashboard() {
  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export data clicked");
  };

  return (
    <>
      <Header
        title="CO2 Emissions Dashboard"
        subtitle="Track and manage enterprise carbon emissions"
        onExport={handleExport}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <EmissionsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentEntries />
          </div>
        </div>
      </main>
    </>
  );
}
