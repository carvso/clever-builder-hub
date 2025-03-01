
import { TagIcon, Bookmark, TrendingUp } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

type BlogSidebarProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
};

export default function BlogSidebar({ 
  activeCategory, 
  setActiveCategory,
  setSearchQuery 
}: BlogSidebarProps) {
  // Get all categories from blog posts
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);
  
  // Get unique locations
  const locations = Array.from(new Set(blogPosts.map(post => post.location)));

  return (
    <aside className="space-y-8">
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-primary" />
          Categorie
        </h3>
        
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {category === "all" ? "Tutte le categorie" : category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-primary" />
          Articoli in Evidenza
        </h3>
        
        <div className="space-y-4">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
                // Navigate to the blog post (would be implemented later)
              }}
              className="flex gap-3 cursor-pointer group"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Zone di Servizio
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSearchQuery(location)}
              className="px-3 py-1 bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary rounded-lg text-sm transition-colors"
            >
              {location}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-3">Hai un progetto da realizzare?</h3>
        <p className="mb-4 text-white/90">
          Contatta i nostri esperti per una consulenza sui materiali e macchinari più adatti alle tue esigenze.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.href = "/catalogo"}
            className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors font-medium"
          >
            Catalogo
          </button>
          <button 
            onClick={() => window.location.href = "/servizi"}
            className="px-4 py-2 bg-primary/20 text-white rounded-lg hover:bg-primary/30 transition-colors font-medium"
          >
            Noleggio
          </button>
        </div>
      </div>
    </aside>
  );
}
