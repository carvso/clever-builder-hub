
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
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

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Informazioni di Contatto
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome e Cognome
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Riepilogo Ordine
                </h2>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Prodotti</span>
                      <span>€240.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">IVA (22%)</span>
                      <span>€52.80</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Totale</span>
                        <span>€292.80</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    Il pagamento verrà effettuato in sede al momento del ritiro.
                  </p>
                </div>

                <button className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium">
                  Conferma Ordine
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
