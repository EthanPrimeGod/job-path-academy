import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import Hive from "./pages/Hive";
import HiveLeaderboards from "./pages/HiveLeaderboards";
import HiveModuleDetail from "./pages/HiveModuleDetail";
import HiveModulePractice from "./pages/HiveModulePractice";
import Account from "./pages/Account";
import AccountOverview from "./pages/AccountOverview";
import AccountHive from "./pages/AccountHive";
import AccountJobs from "./pages/AccountJobs";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/hive" element={<Hive />} />
          <Route path="/hive/leaderboards" element={<HiveLeaderboards />} />
          <Route path="/hive/:moduleId" element={<HiveModuleDetail />} />
          <Route path="/hive/:moduleId/start" element={<HiveModulePractice />} />
          <Route path="/account" element={<Account />}>
            <Route index element={<AccountOverview />} />
            <Route path="hive" element={<AccountHive />} />
            <Route path="jobs" element={<AccountJobs />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
