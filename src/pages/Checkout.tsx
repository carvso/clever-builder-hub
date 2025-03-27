import { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Customer } from "@/types/order";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { state, removeItem, updateQuantity, checkout } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
  });
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d,.]/g, '').replace(',', '.'));
      return total + price * item.quantity;
    }, 0);
  };

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
      console.log("Submitting order with customer info:", customerInfo);
      
      const result = await checkout(customerInfo, notes);
      console.log("Order submission result:", result);
      
      setOrderId(result.orderId);
      
      toast({
        title: "Ordine Confermato",
        description: "Il tuo ordine è stato inviato con successo! Riceverai una email di conferma a breve.",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = calculateTotal();
  const iva = total * 0.22;
  const totalWithIva = total + iva;

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
              Conferma Ordine
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
                        placeholder="Eventuali specifiche sull'ordine..."
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-lg font-semibold mb-4 text-white">
                    Riepilogo Ordine
                  </h2>
                  <div className="space-y-4">
                    {state.items.length === 0 ? (
                      <div className="p-4 bg-dark/50 rounded-xl">
                        <p className="text-gray-300">Il tuo carrello è vuoto</p>
                      </div>
                    ) : (
                      state.items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-dark/50 rounded-xl"
                        >
                          <div>
                            <h3 className="font-medium text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 bg-dark rounded hover:bg-primary/20 transition-colors text-white"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-white">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-dark rounded hover:bg-primary/20 transition-colors text-white"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {state.items.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 bg-dark/50 rounded-xl p-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-300">Prodotti</span>
                          <span className="text-white">{total.toFixed(2)}€</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-300">IVA (22%)</span>
                          <span className="text-white">{iva.toFixed(2)}€</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-300">P.IVA</span>
                          <span className="text-white">02134040894</span>
                        </div>
                        <div className="border-t border-gray-700 pt-4">
                          <div className="flex items-center justify-between font-semibold">
                            <span className="text-white">Totale</span>
                            <span className="text-primary">{totalWithIva.toFixed(2)}€</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 bg-dark/50 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-300">
                      Il pagamento verrà effettuato in sede al momento del ritiro.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button 
                      type="submit"
                      className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                      disabled={state.items.length === 0 || isSubmitting || state.isSubmitting}
                    >
                      {isSubmitting || state.isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Invio in corso...
                        </>
                      ) : (
                        "Conferma Ordine"
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
