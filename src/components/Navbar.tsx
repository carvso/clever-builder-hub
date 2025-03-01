
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
        <Link to="/" className="text-2xl font-bold text-primary">
          <img src="/logo.svg" alt="EdilP2 Logo" className="h-10" />
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

        {/* Cart */}
        <Sheet>
          <SheetTrigger className="flex items-center space-x-2 hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium text-gray-700">
              Carrello ({state.items.length})
            </span>
          </SheetTrigger>
          <SheetContent className="sm:max-w-lg">
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
