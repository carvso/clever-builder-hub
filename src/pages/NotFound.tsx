
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md mb-6">
        <AlertTitle className="text-2xl font-bold">404 - Page Not Found</AlertTitle>
        <AlertDescription>
          The page you are looking for does not exist or has been moved.
        </AlertDescription>
      </Alert>
      
      <p className="text-gray-600 mb-6">
        The requested path <span className="font-mono bg-gray-100 px-2 py-1 rounded">{location.pathname}</span> could not be found.
      </p>
      
      <Button asChild size="lg">
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-4 h-4" /> Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
