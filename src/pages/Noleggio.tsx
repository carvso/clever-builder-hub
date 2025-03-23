import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Truck, Clock, ShieldCheck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";

interface NoleggioMezzo {
  id: string;
  nome: string;
  descrizione: string;
  prezzoGiornaliero: number;
  prezzoSettimanale: number;
  prezzoMensile: number;
  immagine: string;
  disponibile: boolean;
  categoria: string;
}

export default function Noleggio() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [mezzi, setMezzi] = useState<NoleggioMezzo[]>([]);
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
    const fetchMezzi = async () => {
      try {
        const response = await fetch("/api/mezzi");
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei mezzi");
        }
        const data = await response.json();
        setMezzi(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Errore sconosciuto");
      } finally {
        setLoading(false);
      }
    };

    fetchMezzi();
  }, []);

  const mezziFiltrati = mezzi.filter(mezzo => {
    const matchCategoria = categoriaSelezionata === "tutti" || mezzo.categoria === categoriaSelezionata;
    const matchRicerca = mezzo.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
                        mezzo.descrizione.toLowerCase().includes(ricerca.toLowerCase());
    return matchCategoria && matchRicerca;
  });

  const categorie = ["tutti", ...new Set(mezzi.map(mezzo => mezzo.categoria))];

  const handleNoleggio = (mezzo: NoleggioMezzo) => {
    addToCart({
      id: mezzo.id,
      nome: mezzo.nome,
      prezzo: mezzo.prezzoGiornaliero,
      tipo: "noleggio",
      quantita: 1,
    });
    toast({
      title: "Mezzo aggiunto al carrello",
      description: `${mezzo.nome} è stato aggiunto al carrello per il noleggio giornaliero.`,
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
          Noleggio Mezzi per Costruzioni
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Soluzioni complete per il noleggio di mezzi e attrezzature per cantieri.
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
        {mezziFiltrati.map((mezzo) => (
          <motion.div key={mezzo.id} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <img
                  src={mezzo.immagine}
                  alt={mezzo.nome}
                  className="w-full h-full object-cover"
                />
                {!mezzo.disponibile && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Non disponibile</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{mezzo.nome}</h3>
                <p className="text-gray-600 mb-4">{mezzo.descrizione}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Giornaliero: €{mezzo.prezzoGiornaliero}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Settimanale: €{mezzo.prezzoSettimanale}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Mensile: €{mezzo.prezzoMensile}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleNoleggio(mezzo)}
                  disabled={!mezzo.disponibile}
                >
                  Noleggia ora
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
        <h2 className="text-2xl font-bold mb-4">Perché scegliere il nostro noleggio?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Consegna Rapida</h3>
              <p className="text-sm text-gray-600">Consegna in cantiere entro 24 ore</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Mezzi Certificati</h3>
              <p className="text-sm text-gray-600">Tutti i mezzi sono regolarmente revisionati</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Prezzi Competitivi</h3>
              <p className="text-sm text-gray-600">Tariffe vantaggiose per noleggi lunghi</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 