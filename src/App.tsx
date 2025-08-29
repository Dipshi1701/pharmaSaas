import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./portal/pages/Index";
import About from "./portal/pages/About";
import Services from "./portal/pages/Services";
import Research from "./portal/pages/Research";
import Contact from "./portal/pages/Contact";
import NotFound from "./pages/NotFound";
import BackofficeLayout from "./backoffice/BackofficeLayout";
import Dashboard from "./backoffice/pages/Dashboard";
import Users from "./backoffice/pages/Users";
import Settings from "./backoffice/pages/Settings";
import PortalLayout from "./portal/PortalLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Portal (public) routes */}
          <Route path="/" element={<PortalLayout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="research" element={<Research />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Backoffice (admin) routes */}
          <Route path="/admin" element={<BackofficeLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
