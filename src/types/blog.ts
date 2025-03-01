
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  category: string;
  location: string;
  featured: boolean;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}
