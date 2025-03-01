
import { Search } from "lucide-react";

type BlogHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function BlogHeader({ searchQuery, setSearchQuery }: BlogHeaderProps) {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
            Blog EdilP2: Materiali e Noleggio nel Siracusano
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Consigli, guide e aggiornamenti dal mondo dell'edilizia a Siracusa, Solarino, Floridia e provincia
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Cerca nel blog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-16 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-dark"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
