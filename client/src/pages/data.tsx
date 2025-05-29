import Header from "@/components/layout/header";
import DataEntryForm from "@/components/dashboard/data-entry-form";
import EmissionsTable from "@/components/data/emissions-table";

export default function Data() {
  const handleExport = () => {
    console.log("Export data clicked");
  };

  const handleAddEntry = () => {
    // Scroll to data entry form
    document.getElementById('data-entry-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header
        title="Emissions Data"
        subtitle="Manage and view all emission entries"
        onExport={handleExport}
        onAddEntry={handleAddEntry}
      />
      
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div id="data-entry-form">
            <DataEntryForm />
          </div>
          <EmissionsTable />
        </div>
      </main>
    </>
  );
}
