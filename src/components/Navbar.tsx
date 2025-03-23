import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
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
  { name: "Materiali", href: "/materiali" },
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
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
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

        {/* Cart - Moved above mobile menu button */}
        <div className="relative z-50 flex items-center">
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
            <SheetContent side="right" className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Carrello</SheetTitle>
                <SheetDescription>
                  Articoli nel tuo carrello.
                </SheetDescription>
              </SheetHeader>
              {isMounted ? <Cart /> : null}
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-500 hover:text-primary focus:outline-none focus:text-primary transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/noleggio" className="text-gray-600 hover:text-primary transition-colors">
            Noleggio Mezzi
          </Link>
          <Link to="/catalogo" className="text-gray-600 hover:text-primary transition-colors">
            Materiali
          </Link>
          <Link to="/progetti" className="text-gray-600 hover:text-primary transition-colors">
            Progetti
          </Link>
          <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">
            Blog
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-50 py-4`}
      >
        <nav className="flex flex-col items-center space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-gray-700 hover:text-primary transition-colors block py-2"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
