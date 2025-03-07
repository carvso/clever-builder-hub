
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, CustomerInfo } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Checkout() {
  const { state, removeItem, updateQuantity, checkout } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const calculateTotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price.replace("€/pz", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Errore",
        description: "Per favore, compila tutti i campi richiesti",
        variant: "destructive",
      });
      return;
    }

    // Submit order
    const success = await checkout(customerInfo);
    
    if (success) {
      // Redirect to homepage after successful checkout
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const total = calculateTotal();
  const iva = total * 0.22;
  const totalWithIva = total + iva;

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al catalogo
          </Link>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-dark mb-6">
              Conferma Ordine
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Informazioni di Contatto
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Riepilogo Ordine
                  </h2>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 bg-gray-200 rounded"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Prodotti</span>
                        <span>{total.toFixed(2)}€</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">IVA (22%)</span>
                        <span>{iva.toFixed(2)}€</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between font-semibold">
                          <span>Totale</span>
                          <span>{totalWithIva.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 rounded-xl p-4">
                    <p className="text-sm text-yellow-800">
                      Il pagamento verrà effettuato in sede al momento del ritiro.
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    disabled={state.items.length === 0 || state.isSubmitting}
                  >
                    {state.isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      "Conferma Ordine"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
