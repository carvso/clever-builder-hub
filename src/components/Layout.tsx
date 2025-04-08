
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 w-full max-w-full overflow-x-hidden">
        {children}
      </div>
      <Footer />
    </div>
  );
} 
