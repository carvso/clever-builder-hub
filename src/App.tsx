import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Catalogo from "./pages/Catalogo";
import Checkout from "./pages/Checkout";
import Servizi from "./pages/Servizi";
import Progetti from "./pages/Progetti";
import Blog from "./pages/Blog";

// Ottieni il basename dal vite.config (in produzione sarà /${repoName}/)
const basename = import.meta.env.BASE_URL;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/progetti" element={<Progetti />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
