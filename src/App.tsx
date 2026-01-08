import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useSmoothScroll from "@/hooks/use-smooth-scroll";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  useSmoothScroll();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/book" element={<Book />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/contact" element={<Contact />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
