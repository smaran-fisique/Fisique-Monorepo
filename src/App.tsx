import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Settings from "./pages/admin/Settings";
import BlogList from "./pages/admin/blog/BlogList";
import BlogEditor from "./pages/admin/blog/BlogEditor";
import Categories from "./pages/admin/Categories";
import Analytics from "./pages/admin/Analytics";
import Offers from "./pages/admin/Offers";
import Content from "./pages/admin/Content";
import Media from "./pages/admin/Media";
import Users from "./pages/admin/Users";
import SEO from "./pages/admin/SEO";
import ApiKeys from "./pages/admin/ApiKeys";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Refund from "./pages/legal/Refund";
import Shipping from "./pages/legal/Shipping";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-posts" element={<Blog />} />
              <Route path="/blog-posts/" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey" element={<Contact />} />
              <Route path="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refund" element={<Refund />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/admin/login" element={<Login />} />
              
              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="/admin/blog" element={<BlogList />} />
                  <Route path="/admin/blog/new" element={<BlogEditor />} />
                  <Route path="/admin/blog/:id/edit" element={<BlogEditor />} />
                  <Route path="/admin/categories" element={<Categories />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/offers" element={<Offers />} />
                  <Route path="/admin/content" element={<Content />} />
                  <Route path="/admin/seo" element={<SEO />} />
                  <Route path="/admin/media" element={<Media />} />
                  <Route path="/admin/api-keys" element={<ApiKeys />} />
                  <Route path="/admin/users" element={<Users />} />
                </Route>
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
