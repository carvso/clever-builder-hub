import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/Catalogo";
import Checkout from "./pages/Checkout";
import Servizi from "./pages/Servizi";
import Progetti from "./pages/Progetti";
import Blog from "./pages/Blog";
import ServiziProdotti from "./pages/ServiziProdotti";

// Ottieni il basename dal vite.config (in produzione sarà /${repoName}/)
const basename = import.meta.env.BASE_URL;

const queryClient = new QueryClient();

// Layout condiviso con Navbar e Footer
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    {children}
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/servizi" element={<Layout><Servizi /></Layout>} />
            <Route path="/progetti" element={<Layout><Progetti /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/servizi-prodotti" element={<Layout><ServiziProdotti /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
