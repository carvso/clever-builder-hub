
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/types/blog";

type BlogPostCardProps = {
  post: BlogPost;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const navigate = useNavigate();
  
  return (
    <article 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer hover-lift"
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-primary rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{post.location}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block text-primary font-medium group-hover:underline">
            Leggi l'articolo
          </span>
          
          {post.featured && (
            <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
              In Evidenza
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
