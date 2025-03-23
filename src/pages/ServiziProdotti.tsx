import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Package, Search, Filter, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";

interface Materiale {
  id: string;
  nome: string;
  descrizione: string;
  prezzo: number;
  immagine: string;
  disponibile: boolean;
  categoria: string;
  unitaMisura: string;
}

export default function Materiali() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [materiali, setMateriali] = useState<Materiale[]>([]);
  const [categoriaSelezionata, setCategoriaSelezionata] = useState<string>("tutti");
  const [ricerca, setRicerca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animazioni
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    const fetchMateriali = async () => {
      try {
        const response = await fetch("/api/materiali");
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei materiali");
        }
        const data = await response.json();
        setMateriali(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriali();
  }, []);

  const materialiFiltrati = materiali.filter(materiale => {
    const matchCategoria = categoriaSelezionata === "tutti" || materiale.categoria === categoriaSelezionata;
    const matchRicerca = materiale.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
                        materiale.descrizione.toLowerCase().includes(ricerca.toLowerCase());
    return matchCategoria && matchRicerca;
  });

  const categorie = ["tutti", ...new Set(materiali.map(materiale => materiale.categoria))];

  const handleAggiungiAlCarrello = (materiale: Materiale) => {
    addToCart({
      id: materiale.id,
      nome: materiale.nome,
      prezzo: materiale.prezzo,
      tipo: "materiale",
      quantita: 1,
    });
    toast({
      title: "Materiale aggiunto al carrello",
      description: `${materiale.nome} è stato aggiunto al carrello.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Errore</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Materiali per Costruzioni
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ampia selezione di materiali edili di alta qualità per ogni esigenza costruttiva.
          Disponibilità immediata e prezzi competitivi.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1">
          <Label htmlFor="categoria">Categoria</Label>
          <Select value={categoriaSelezionata} onValueChange={setCategoriaSelezionata}>
            <SelectTrigger>
              <SelectValue placeholder="Seleziona categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorie.map((categoria) => (
                <SelectItem key={categoria} value={categoria}>
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-1">
          <Label htmlFor="ricerca">Cerca</Label>
          <Input
            id="ricerca"
            placeholder="Cerca per nome o descrizione..."
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {materialiFiltrati.map((materiale) => (
          <motion.div key={materiale.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={materiale.immagine}
                  alt={materiale.nome}
                  className="w-full h-full object-cover"
                />
                {!materiale.disponibile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Non disponibile</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{materiale.nome}</h3>
                <p className="text-gray-600 mb-4">{materiale.descrizione}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-primary" />
                    <span>Prezzo: €{materiale.prezzo} / {materiale.unitaMisura}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleAggiungiAlCarrello(materiale)}
                  disabled={!materiale.disponibile}
                >
                  Aggiungi al carrello
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Perché scegliere i nostri materiali?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Qualità Garantita</h3>
              <p className="text-sm text-gray-600">Materiali certificati e di alta qualità</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Consegna Rapida</h3>
              <p className="text-sm text-gray-600">Consegna in cantiere entro 24 ore</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Filter className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Ampia Selezione</h3>
              <p className="text-sm text-gray-600">Tutti i materiali necessari per il tuo progetto</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 