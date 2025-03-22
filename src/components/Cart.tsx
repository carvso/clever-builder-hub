import React from "react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { state, removeItem, updateQuantity } = useCart();

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("€/pz", ""));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="flex flex-col h-full">
      {state.items.length > 0 && (
        <div className="sticky top-0 bg-white z-10 pb-4 pt-2 mb-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Totale: <span className="font-bold text-lg">{calculateTotal().toFixed(2)}€</span></span>
          </div>
          <Link to="/checkout" className="block">
            <Button className="w-full py-6 text-base">
              <ShoppingBag className="mr-2 h-5 w-5" /> Procedi all'ordine
            </Button>
          </Link>
        </div>
      )}
      
      <div className="flex-1 overflow-auto py-2">
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Il tuo carrello è vuoto</p>
            <Link to="/catalogo">
              <Button variant="outline">Sfoglia il catalogo</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-primary font-medium">{item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1 border border-gray-200 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-0.5 text-gray-500 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-0.5 text-gray-500 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
