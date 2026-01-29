import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { MicrosoftClarity } from "./components/MicrosoftClarity";
import { OfferBanner } from "./components/OfferBanner";

// Eagerly load the main page for best LCP
import Index from "./pages/Index";

// Lazy load non-critical pages
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const BlogList = lazy(() => import("./pages/admin/blog/BlogList"));
const BlogEditor = lazy(() => import("./pages/admin/blog/BlogEditor"));
const Categories = lazy(() => import("./pages/admin/Categories"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Offers = lazy(() => import("./pages/admin/Offers"));

const Media = lazy(() => import("./pages/admin/Media"));
const Users = lazy(() => import("./pages/admin/Users"));
const SEO = lazy(() => import("./pages/admin/SEO"));
const ApiKeys = lazy(() => import("./pages/admin/ApiKeys"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const Privacy = lazy(() => import("./pages/legal/Privacy"));
const Refund = lazy(() => import("./pages/legal/Refund"));
const Shipping = lazy(() => import("./pages/legal/Shipping"));
const Legal = lazy(() => import("./pages/legal/Legal"));
const Contact = lazy(() => import("./pages/Contact"));
const KokapetGym = lazy(() => import("./pages/KokapetGym"));
const PersonalTrainingKokapet = lazy(() => import("./pages/PersonalTrainingKokapet"));
const GymMembershipKokapet = lazy(() => import("./pages/GymMembershipKokapet"));
const GymFinancialDistrict = lazy(() => import("./pages/GymFinancialDistrict"));
const GymNarsingi = lazy(() => import("./pages/GymNarsingi"));
const OffersIndex = lazy(() => import("./pages/offers/OffersIndex"));
const IPhoneOffer = lazy(() => import("./pages/offers/IPhoneOffer"));

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalytics />
          <MicrosoftClarity />
          <AuthProvider>
            <OfferBanner />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-posts" element={<Blog />} />
                <Route path="/blog-posts/" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey" element={<Contact />} />
                <Route path="/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/legal/" element={<Legal />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/refund" element={<Refund />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/kokapet-gym" element={<KokapetGym />} />
                <Route path="/personal-training-kokapet" element={<PersonalTrainingKokapet />} />
                <Route path="/gym-membership-kokapet" element={<GymMembershipKokapet />} />
                <Route path="/gym-financial-district" element={<GymFinancialDistrict />} />
                <Route path="/gym-narsingi" element={<GymNarsingi />} />
                <Route path="/offers" element={<OffersIndex />} />
                <Route path="/offers/" element={<OffersIndex />} />
                <Route path="/offers/iphone" element={<IPhoneOffer />} />
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
                    
                    <Route path="/admin/seo" element={<SEO />} />
                    <Route path="/admin/media" element={<Media />} />
                    <Route path="/admin/api-keys" element={<ApiKeys />} />
                    <Route path="/admin/users" element={<Users />} />
                  </Route>
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
