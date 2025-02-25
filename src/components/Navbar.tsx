
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            EdilP2
          </Link>

          {/* Search Bar and Navigation Links */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Cerca..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/ordina"
                className="text-dark hover:text-primary transition-colors font-medium"
              >
                Ordina
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
                Servizi
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
