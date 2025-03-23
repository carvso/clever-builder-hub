import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogHeader from "@/components/BlogHeader";
import BlogPostCard from "@/components/BlogPostCard";
import BlogSidebar from "@/components/BlogSidebar";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <BlogHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark">
                {activeCategory === "all" 
                  ? "Tutti gli articoli" 
                  : `Articoli su ${activeCategory}`}
              </h2>
              <p className="text-gray-600">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'articolo trovato' : 'articoli trovati'}
              </p>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-12 text-center">
                <h3 className="text-xl font-medium text-gray-600 mb-4">
                  Nessun articolo trovato
                </h3>
                <p className="text-gray-500 mb-6">
                  Prova a modificare i filtri o la ricerca per trovare quello che stai cercando.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg transition-colors hover:bg-primary/90"
                >
                  Mostra tutti gli articoli
                </button>
              </div>
            )}
          </div>
          
          <BlogSidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </main>
    </div>
  );
}
