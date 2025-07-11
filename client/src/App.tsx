import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Data from "@/pages/data";
import Analytics from "@/pages/analytics";
import Reporting from "@/pages/reporting";
import SupplierAssessment from "@/pages/supplier-assessment";
import MarketAnalysis from "@/pages/market-analysis";
import ReportViewer from "@/pages/report-viewer";
import AccountDetails from "@/pages/account-details";
import Preferences from "@/pages/preferences";
import Sidebar from "@/components/layout/sidebar";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/data" component={Data} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/reporting" component={Reporting} />
          <Route path="/supplier-assessment" component={SupplierAssessment} />
          <Route path="/market-analysis" component={MarketAnalysis} />
          <Route path="/report-viewer" component={ReportViewer} />
          <Route path="/account-details" component={AccountDetails} />
          <Route path="/preferences" component={Preferences} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
