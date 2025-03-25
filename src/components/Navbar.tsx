import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cart from "./Cart";
import { useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catalogo", href: "/catalogo" },
  { name: "Servizi", href: "/servizi" },
  { name: "Progetti", href: "/progetti" },
  { name: "Blog", href: "/blog" },
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <span className="text-white font-bold text-xl">E2</span>
          </div>
          <span className="text-xl font-bold text-dark">Edil<span className="text-primary">P2</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 relative">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {state.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {state.items.length}
                    </span>
                  )}
                </div>
                <span className="font-medium text-gray-700 hidden sm:inline ml-2">
                  Carrello
                </span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-lg p-0">
              <div className="h-full flex flex-col">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle>Carrello</SheetTitle>
                  <SheetDescription>
                    Articoli nel tuo carrello.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  {isMounted ? <Cart /> : null}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-500 hover:text-primary focus:outline-none focus:text-primary transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white border-t`}
      >
        <nav className="container mx-auto px-4 py-3 flex flex-col space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-gray-700 hover:text-primary transition-colors block py-2 px-4 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
