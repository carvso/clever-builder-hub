
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Customer } from "@/types/order";
import { motion } from "framer-motion";
import { Product } from "@/components/catalog/ProductCard";

export default function Checkout() {
  const { checkout } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsVisible(true);
    // Get selected product from sessionStorage if it exists
    const storedProduct = sessionStorage.getItem('selectedProduct');
    if (storedProduct) {
      setSelectedProduct(JSON.parse(storedProduct));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'notes') {
      setNotes(value);
    } else {
      setCustomerInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Prepare notes with product info if available
      let fullNotes = notes;
      if (selectedProduct) {
        fullNotes = `Richiesta preventivo per: ${selectedProduct.name}\n\n${notes}`;
      }
      
      const result = await checkout(customerInfo, fullNotes);
      
      toast({
        title: "Richiesta inviata",
        description: "La tua richiesta è stata inviata con successo! Ti contatteremo a breve.",
      });
      
      // Clear the stored product
      sessionStorage.removeItem('selectedProduct');
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-dark"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al catalogo
          </Link>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary rounded-2xl p-6 shadow-lg"
          >
            <h1 className="text-2xl font-bold text-white mb-6">
              {selectedProduct ? `Richiedi preventivo per ${selectedProduct.name}` : "Richiedi preventivo"}
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-lg font-semibold mb-4 text-white">
                    Informazioni di Contatto
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl bg-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl bg-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl bg-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Note aggiuntive
                      </label>
                      <textarea
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 rounded-xl bg-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder={selectedProduct ? `Scrivi qui dettagli specifici sulla richiesta per ${selectedProduct.name}...` : "Scrivi qui i dettagli della tua richiesta..."}
                      />
                    </div>
                  </div>
                </motion.div>

                {selectedProduct && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-dark/50 p-4 rounded-xl"
                  >
                    <h3 className="font-medium text-white mb-2">Prodotto selezionato:</h3>
                    <div className="flex items-center gap-3">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-white font-medium">{selectedProduct.name}</p>
                        <p className="text-sm text-gray-400">{selectedProduct.category}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      "Invia richiesta"
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
