import Header from "@/components/layout/header";
import EmissionsTable from "@/components/data/emissions-table";

export default function Data() {
  const handleExport = () => {
    console.log("Export data clicked");
  };

  return (
    <>
      <Header
        title="Emissions Data"
        subtitle="Manage and view all emission entries"
        onExport={handleExport}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <EmissionsTable />
        </div>
      </main>
    </>
  );
}
