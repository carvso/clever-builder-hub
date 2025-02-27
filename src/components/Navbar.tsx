
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { state } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("€/pz", ""));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <span className="text-white font-bold text-xl">E2</span>
            </div>
            <div>
              <span className="text-xl font-bold text-dark">Edil<span className="text-primary">P2</span></span>
              <span className="block text-xs text-gray-500 -mt-1">Dal 1998</span>
            </div>
          </Link>

          {/* Search Bar and Navigation Links */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Cerca..."
                className="w-full px-4 py-2 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/progetti"
                className="text-dark hover:text-primary transition-colors font-medium"
              >
                Progetti
              </Link>
              <Link
                to="/catalogo"
                className="text-dark hover:text-primary transition-colors font-medium"
              >
                Catalogo
              </Link>
              <Link
                to="/servizi"
                className="text-dark hover:text-primary transition-colors font-medium"
              >
                Noleggio
              </Link>
            </div>
          </div>

          {/* Mobile Menu and Cart */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-full relative"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {state.items.length}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                  onMouseEnter={() => setIsCartOpen(true)}
                  onMouseLeave={() => setIsCartOpen(false)}
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Il tuo carrello</h3>
                    {state.items.length === 0 ? (
                      <p className="text-gray-500 text-sm">Il carrello è vuoto</p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {state.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {item.quantity} x {item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm mb-4">
                            <span className="font-medium">Totale</span>
                            <span className="font-semibold">{calculateTotal().toFixed(2)}€</span>
                          </div>
                          <Link
                            to="/checkout"
                            className="block w-full py-2 px-4 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                          >
                            Vai al checkout
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-dark" />
              ) : (
                <Menu className="w-6 h-6 text-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-6 py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Cerca materiali o macchinari..."
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <div className="space-y-2">
              <Link
                to="/progetti"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-dark font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Progetti
              </Link>
              <Link
                to="/catalogo"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-dark font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catalogo Materiali
              </Link>
              <Link
                to="/servizi"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-dark font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Noleggio Macchinari
              </Link>
              <Link
                to="/checkout"
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-dark font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Checkout
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/catalogo"
                className="px-4 py-3 bg-primary text-white rounded-xl text-center font-medium hover:bg-primary/90 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Acquista Materiali
              </Link>
              <Link
                to="/servizi"
                className="px-4 py-3 bg-gray-100 text-dark rounded-xl text-center font-medium hover:bg-gray-200 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Noleggia Mezzi
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
