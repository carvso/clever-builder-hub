
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalogo", href: "/catalogo" },
  { name: "Mezzi", href: "/mezzi" },
  { name: "Progetti", href: "/progetti" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <span className="text-white font-bold text-xl">E2</span>
          </div>
          <span className="text-xl font-bold text-white">Edil<span className="text-primary">P2</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-gray-300 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-primary transition-colors" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </SheetTrigger>
            <SheetContent className="bg-gray-800 border-gray-700 text-white">
              <Cart />
            </SheetContent>
          </Sheet>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary border-t border-gray-700"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-medium text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
