import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Login />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/settings" element={<Settings />} />
                {/* Placeholder routes for future phases */}
                <Route path="/admin/blog" element={<div className="p-8">Blog Posts - Coming Soon</div>} />
                <Route path="/admin/categories" element={<div className="p-8">Categories & Tags - Coming Soon</div>} />
                <Route path="/admin/offers" element={<div className="p-8">Offers - Coming Soon</div>} />
                <Route path="/admin/content" element={<div className="p-8">Content - Coming Soon</div>} />
                <Route path="/admin/analytics" element={<div className="p-8">Analytics - Coming Soon</div>} />
                <Route path="/admin/media" element={<div className="p-8">Media - Coming Soon</div>} />
                <Route path="/admin/users" element={<div className="p-8">Users - Coming Soon</div>} />
              </Route>
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
