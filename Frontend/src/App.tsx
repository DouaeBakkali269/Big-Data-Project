import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ElementDetailsPage from "./pages/ElementDetailsPage";
import Dashboard from "./pages/Dashboard";
import LassqatPage from "./pages/LassqatPage";
import LassqatPlanningPage from "./pages/LassqatPlanningPage";
import SessionDetailsPage from "./pages/SessionDetailsPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lassqat" element={<LassqatPage />} />
          <Route path="/lassqat-planning" element={<LassqatPlanningPage />} />
          <Route path="/session/:id" element={<SessionDetailsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/element/:year/:major/:level/:module/:element" element={<ElementDetailsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
