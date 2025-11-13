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
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import AccountOverview from "./pages/AccountOverview";
import AccountHive from "./pages/AccountHive";
import AccountJobs from "./pages/AccountJobs";
import AccountApplications from "./pages/AccountApplications";
import AccountApplicationDetail from "./pages/AccountApplicationDetail";
import AccountMessages from "./pages/AccountMessages";
import AccountMessageDetail from "./pages/AccountMessageDetail";
import AccountSettings from "./pages/AccountSettings";
import JobApply from "./pages/JobApply";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import CompanyOverview from "./pages/company/CompanyOverview";
import CompanyJobs from "./pages/company/CompanyJobs";
import CompanyJobDetail from "./pages/company/CompanyJobDetail";
import CompanyApplicants from "./pages/company/CompanyApplicants";
import CompanyApplicantDetail from "./pages/company/CompanyApplicantDetail";
import CompanyMessages from "./pages/company/CompanyMessages";
import CompanyModules from "./pages/company/CompanyModules";
import CompanyModuleDetail from "./pages/company/CompanyModuleDetail";
import CompanyBilling from "./pages/company/CompanyBilling";
import CompanyTeam from "./pages/company/CompanyTeam";
import CompanySettings from "./pages/company/CompanySettings";

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
          <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />}>
          <Route index element={<AccountOverview />} />
          <Route path="hive" element={<AccountHive />} />
          <Route path="jobs" element={<AccountJobs />} />
          <Route path="applications" element={<AccountApplications />} />
          <Route path="applications/:id" element={<AccountApplicationDetail />} />
          <Route path="messages" element={<AccountMessages />} />
          <Route path="messages/:id" element={<AccountMessageDetail />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
        <Route path="/jobs/:id/apply" element={<JobApply />} />
          <Route path="/company" element={<CompanyOverview />} />
          <Route path="/company/jobs" element={<CompanyJobs />} />
          <Route path="/company/jobs/:jobId" element={<CompanyJobDetail />} />
          <Route path="/company/jobs/:jobId/applicants/:applicantId" element={<CompanyApplicantDetail />} />
          <Route path="/company/applicants" element={<CompanyApplicants />} />
          <Route path="/company/messages" element={<CompanyMessages />} />
          <Route path="/company/messages/:threadId" element={<CompanyMessages />} />
          <Route path="/company/modules" element={<CompanyModules />} />
          <Route path="/company/modules/:moduleId" element={<CompanyModuleDetail />} />
          <Route path="/company/billing" element={<CompanyBilling />} />
          <Route path="/company/team" element={<CompanyTeam />} />
          <Route path="/company/settings" element={<CompanySettings />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
