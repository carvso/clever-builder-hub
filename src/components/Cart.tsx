
import React from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("€/pz", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence>
        {state.items.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-0 bg-gray-800 z-10 pb-4 pt-2 mb-4 border-b border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-white">Elementi: <span className="font-bold text-lg">{state.items.length}</span></span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full py-6 text-base bg-primary hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Procedi al preventivo</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {state.items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <p className="text-gray-400 mb-4">Il tuo carrello è vuoto</p>
            <Link to="/catalogo">
              <Button variant="outline" className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white">
                Sfoglia il catalogo
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 overflow-y-auto max-h-[70vh] pr-1"
          >
            {state.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gray-600 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.name}</h4>
                  <p className="text-sm text-gray-400">{item.category}</p>
                  <p className="text-primary font-medium">{item.price || "Su preventivo"}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 border border-gray-600 rounded bg-gray-800">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-0.5 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0.5 text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
