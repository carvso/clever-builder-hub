
import { ChevronDown, Filter, Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Type definitions for product variants
type ProductVariant = {
  id: string;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price?: string; // Optional now since we'll hide prices
  category: string;
  image: string;
  variants?: ProductVariant[]; // Optional variants
};

const products: Product[] = [
  {
    id: 1,
    name: "Cemento Portland Buzzi",
    description: "Cemento di alta qualità per costruzioni durevoli e resistenti",
    category: "Cementi",
    image: "https://www.amorelegnamistore.it/cdn/shop/files/CEMENTO-425-BUZZI-PORTLAND-25-KG-Amorelegnami-310.jpg?v=1683920067&width=950",
  },
  {
    id: 2,
    name: "Rasante grigio Kerakoll Rasofino",
    description: "Rasante professionale per finiture di alta qualità",
    category: "Rasanti",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQtXUpX0eqJnZ1DMVW0ebDQmBjIci6KXBBNw&s",
  },
  {
    id: 3,
    name: "Rasante bianco Kerakoll Rasofino",
    description: "Rasante bianco per finiture perfette e di pregio",
    category: "Rasanti",
    image: "https://www.lovebrico.com/695-large_default/rasante-kerakoll-rasobuild-eco-top-fino-25-kg-12047-bianco.jpg",
  },
  {
    id: 4,
    name: "Colla C1 Buffa Grigia",
    description: "Adesivo cementizio per piastrelle in interni",
    category: "Colle",
    image: "https://imes.me.it/wp-content/uploads/2016/09/DURABOND-UNIVERSALE.jpg",
  },
  {
    id: 5,
    name: "Colla C1 Buffa Bianca",
    description: "Adesivo cementizio bianco per piastrelle in interni",
    category: "Colle",
    image: "https://edilpiazza.com/cdn/shop/files/150756.jpg?v=1721292568",
  },
  {
    id: 6,
    name: "Forati da 12",
    description: "Mattoni forati da 12cm per pareti divisorie interne",
    category: "Mattoni",
    image: "https://www.danesilaterizi.it/wp-content/uploads/2020/01/Quattro-fori-8.12.24.jpg",
  },
  {
    id: 7,
    name: "Forati da 8",
    description: "Mattoni forati da 8cm per tramezzi e pareti divisorie",
    category: "Mattoni",
    image: "https://www.danesilaterizi.it/wp-content/uploads/2020/01/Quattro-fori-8.12.24.jpg",
  },
  {
    id: 8,
    name: "Forati da 6",
    description: "Mattoni forati da 6cm per pareti leggere",
    category: "Mattoni",
    image: "https://www.danesilaterizi.it/wp-content/uploads/2020/01/Quattro-fori-8.12.24.jpg",
  },
  {
    id: 9,
    name: "Forati da 4",
    description: "Mattoni forati piccoli da 4cm per rivestimenti",
    category: "Mattoni",
    image: "https://www.danesilaterizi.it/wp-content/uploads/2020/01/Quattro-fori-8.12.24.jpg",
  },
  {
    id: 10,
    name: "Mattoni Pressati",
    description: "Mattoni pressati per murature a vista ed estetiche",
    category: "Mattoni",
    image: "https://www.amicoflex.it/wp-content/uploads/2020/07/Ecobonus-110-e-mattoni-1200x900.jpeg",
  },
  {
    id: 11,
    name: "Gasbeton",
    description: "Blocchi in cemento cellulare per murature isolanti",
    category: "Mattoni",
    image: "https://www.tekneco.it/immagini/articoli/gasbeton.jpg",
  },
  {
    id: 12,
    name: "Blocchetti di tufo",
    description: "Blocchetti in tufo naturale per murature tradizionali",
    category: "Mattoni",
    image: "https://www.casacapitolatosupplies.it/data/photos/6767_1blocchi_tufacei_lisci_12x25x37.jpeg",
  },
  {
    id: 13,
    name: "Architrave",
    description: "Architrave prefabbricato per porte e finestre",
    category: "Strutture",
    image: "https://img.edilportale.com/product-thumbs/h_Gallotta_ARCHITRAVE-2x2x5_mcHgJrPOS8.jpeg",
  },
  {
    id: 14,
    name: "Sabbia Lavata",
    description: "Sabbia fine per massetti e miscele cementizie di qualità",
    category: "Inerti",
    image: "https://www.canzianinerti.it/wp-content/uploads/2023/05/aggregato-naturale-sabbia-frantoio-lavata-min.jpg",
  },
  {
    id: 15,
    name: "Sabbia Bianca",
    description: "Sabbia bianca fine per finiture e lavori di pregio",
    category: "Inerti",
    image: "https://cavechizzola.it/wp-content/uploads/2015/06/Sabbia-0-5-1030x773.jpg",
  },
  {
    id: 16,
    name: "Sabbione",
    description: "Sabbione per malte e intonaci a grana media",
    category: "Inerti",
    image: "https://images.ctfassets.net/j4m9q0fykyy4/7vBcsGChlMKJkMKoFRlEOC/a133824242e696055060f9a061a57b8d/2020-08-mortier-b_C3_A9ton.jpg",
  },
  {
    id: 17,
    name: "Rimacinato fino (Azolo)",
    description: "Inerte rimacinato fine per sottofondi e riempimenti",
    category: "Inerti",
    image: "https://files.synapp.it/87689/foto/prodotti/B/1522143826912_rimacinato_B.jpg",
  },
  {
    id: 18,
    name: "Pietrisco (Ghiaia)",
    description: "Pietrisco per drenaggi e calcestruzzi",
    category: "Inerti",
    image: "https://www.egap.it/EGAP/wp-content/uploads/2022/08/PH026-Pietrisco-Scelto-Grande.jpg",
  },
  {
    id: 19,
    name: "Misto",
    description: "Misto granulometrico per sottofondi stradali",
    category: "Inerti",
    image: "https://www.superbeton.it/kimg/640/misto_granulare_stab.jpg",
  },
  {
    id: 20,
    name: "Cemento Bianco",
    description: "Cemento bianco per lavori di pregio e finiture estetiche",
    category: "Cementi",
    image: "https://m.media-amazon.com/images/I/71IWkQU+HdL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 21,
    name: "Cemento Rapido",
    description: "Cemento a presa rapida per lavori che richiedono velocità",
    category: "Cementi",
    image: "https://www.fassabortolo.it/media/products/2020_GEOACTIVE_RAPID_5_25kg-640x640.png",
  },
  {
    id: 22,
    name: "Calce",
    description: "Calce idraulica naturale per intonaci e restauri",
    category: "Leganti",
    image: "https://caetani.com/wp-content/uploads/2021/06/calceacquasale.jpg",
  },
  {
    id: 23,
    name: "Polistirolo",
    description: "Pannelli in polistirolo per isolamento termico",
    category: "Isolanti",
    variants: [
      { id: "1cm", name: "1 cm" },
      { id: "2cm", name: "2 cm" },
      { id: "3cm", name: "3 cm" },
      { id: "4cm", name: "4 cm" },
      { id: "5cm", name: "5 cm" },
      { id: "6cm", name: "6 cm" },
      { id: "7cm", name: "7 cm" },
      { id: "8cm", name: "8 cm" },
    ],
    image: "https://www.isolconfort.it/image/cache/catalog/prodotti/POLICEM-1200x800.jpg",
  },
  {
    id: 24,
    name: "Rete per Cappotto",
    description: "Rete in fibra di vetro per sistemi a cappotto termico",
    category: "Accessori",
    image: "https://ecomerchant.co.uk/cdn/shop/files/Glass-Fibre-Mesh-Reinforcing-for-Render.png?v=1696937538&width=1000",
  },
  {
    id: 25,
    name: "Bacchette per Intonaco",
    description: "Bacchette per la realizzazione di spigoli su intonaci",
    category: "Accessori",
    image: "https://parisi.passepartout.cloud/upload/articoli/PU6PB_1_800.jpg",
  },
  {
    id: 26,
    name: "Angolari",
    description: "Angolari in PVC per la protezione di spigoli e angoli",
    category: "Accessori",
    image: "https://laspada1776.it/dati/images/prodotti/2021/04/profilato-angolare-pvc-intonaco.jpg",
  },
  {
    id: 27,
    name: "Gocciolatoi",
    description: "Profili con gocciolatoio per balconi e davanzali",
    category: "Accessori",
    image: "https://i.ebayimg.com/images/g/WPgAAOSwv0RkDIQV/s-l1600.jpg",
  },
  {
    id: 28,
    name: "Rete PVC",
    description: "Rete in PVC per recinzioni e protezioni temporanee",
    category: "Accessori",
    image: "https://m.media-amazon.com/images/I/81eRX9kDaZL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 29,
    name: "Rete Elettrosaldata",
    description: "Rete elettrosaldata per armature e rinforzi",
    category: "Strutture",
    image: "https://edilpiazza.it/wp-content/uploads/2022/07/rete-elettrosaldata-gruppo-ormea-edilpiazza.jpg",
  },
  {
    id: 30,
    name: "Tavole da Carpenteria",
    description: "Tavole in legno per carpenteria e casserature",
    variants: [
      { id: "5cm", name: "5 cm" },
      { id: "10cm", name: "10 cm" },
      { id: "12cm", name: "12 cm" },
    ],
    category: "Legname",
    image: "https://www.legnamipretagliatiroma.it/wp-content/uploads/2023/01/assi-di-legno.jpg",
  },
  {
    id: 31,
    name: "Caldarella",
    description: "Secchio da muratore per impasti e trasporto materiali",
    category: "Attrezzature",
    image: "https://www.kijiji.it/photo.php?bucket=12&p=18&geo=9030&photo=2312795118.jpg",
  },
  {
    id: 32,
    name: "Carriola",
    description: "Carriola per trasporto materiali in cantiere",
    category: "Attrezzature",
    image: "https://www.scuoladeisaberi.it/images/thumbnails/1110/750/detailed/151/0f12a1ab9c4f4bd6a142e4d33c5e16ec~2.png",
  },
  {
    id: 33,
    name: "Onduline Catramate",
    description: "Lastre ondulate bituminose per coperture e tettoie",
    category: "Coperture",
    image: "https://www.infobuild.it/wp-content/uploads/lastre-copertura-onduline.jpg",
  },
  {
    id: 34,
    name: "Chiodi in Acciaio",
    description: "Chiodi in acciaio per fissaggi resistenti alla corrosione",
    category: "Ferramenta",
    image: "https://www.unichiodi.it/31-large_default/2d-chiodi-in-acciaio-inox-aisi-304-punta-diamante.jpg",
  },
  {
    id: 35,
    name: "Chiodi da 6",
    description: "Chiodi comuni da 6 cm per lavori di carpenteria",
    category: "Ferramenta",
    image: "https://ilferramenta.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaWMvIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2fff6e0b8a0ad7edc3de01babb7d2ecec8b6ad0e/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9TY21WemFYcGxYM1J2WDJacGJHeGJCMmtDWkFOcEFuZ0Q2QjRjR0ZzWVhSZmQyaHBkR1VLWVFOcEFtZ0MiLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a7e9caa1af60e41d6b9ff2d5d7264b12ef52cdee/450-chiodi-stella-testa-larga-4x70mm.jpg?locale=it",
  },
  {
    id: 36,
    name: "Bobina Fil di Ferro",
    description: "Filo di ferro zincato in bobina per legature",
    category: "Ferramenta",
    image: "https://media.leroymerlin.it/media/high_res_images/88110/88110106_4.jpg?width=1170&amp;height=770",
  },
  {
    id: 37,
    name: "Bacchette di Ferro",
    description: "Barre di ferro per armature e rinforzi",
    variants: [
      { id: "8mm", name: "8 mm" },
      { id: "10mm", name: "10 mm" },
    ],
    category: "Strutture",
    image: "https://media.ideegreen.it/SXg6_-3nw0W-ZbzxsEYJu3UROAc=/600x450/https://media.ideegreen.it/1/t/tondino-di-ferro.jpg",
  },
  {
    id: 38,
    name: "Opere Morte",
    description: "Supporti e strutture temporanee per costruzioni",
    category: "Strutture",
    image: "https://www.tecnologica.it/wp-content/uploads/2020/12/passerelle-tecnologica.jpg",
  },
  {
    id: 39,
    name: "Guanti Maurer",
    description: "Guanti da lavoro resistenti per edilizia",
    category: "Sicurezza",
    image: "https://www.coltelleriamaurer.com/wp-content/uploads/2020/03/5C99D78F-00C6-42C1-8EB1-E0D89A88CED5-scaled.jpeg",
  },
  {
    id: 40,
    name: "Guaina Elastik",
    description: "Guaina elastomerica impermeabilizzante",
    variants: [
      { id: "5kg", name: "5 Kg" },
      { id: "10kg", name: "10 Kg" },
      { id: "20kg", name: "20 Kg" },
    ],
    category: "Impermeabilizzanti",
    image: "https://www.buffa.it/wp-content/uploads/2023/08/elastik-20-kg.png",
  },
  {
    id: 41,
    name: "Rotolo Guaina",
    description: "Rotolo di guaina bituminosa per impermeabilizzazioni",
    category: "Impermeabilizzanti",
    image: "https://m.media-amazon.com/images/I/41uH5Qx4cNL._AC_UF1000,1000_QL80_.jpg",
  },
];

const categories = [
  "Tutti", "Cementi", "Rasanti", "Colle", "Mattoni", "Inerti", "Coperture", 
  "Strutture", "Leganti", "Isolanti", "Accessori", "Legname", "Attrezzature", 
  "Ferramenta", "Sicurezza", "Impermeabilizzanti"
];

export default function CatalogoContent() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [selectedVariants, setSelectedVariants] = useState<Record<number, string>>({});

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tutti" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectVariant = (productId: number, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleAddToCart = (product: Product) => {
    // If product has variants, check if one is selected
    if (product.variants && product.variants.length > 0) {
      const selectedVariantId = selectedVariants[product.id];
      if (!selectedVariantId) {
        toast({
          title: "Seleziona una variante",
          description: "Per favore seleziona una variante prima di aggiungere al carrello",
          variant: "destructive",
        });
        return;
      }

      // Find the selected variant name
      const selectedVariant = product.variants.find(
        (v) => v.id === selectedVariantId
      );

      // Add product with variant info
      addItem({
        ...product,
        name: `${product.name} - ${selectedVariant?.name}`,
        id: parseInt(`${product.id}${selectedVariantId.replace(/\D/g, '')}`),
      });
    } else {
      // Add product without variants
      addItem(product);
    }

    toast({
      title: "Prodotto aggiunto al carrello",
      description: `${product.name} è stato aggiunto al carrello`,
    });
  };

  return (
    <div className="py-16 bg-dark text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-4">Catalogo Materiali</h1>
          <p className="text-gray-300">
            Scopri la nostra selezione di materiali edili di alta qualità
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-in-left">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca materiali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 text-white"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === category
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-300"
                } text-sm font-medium whitespace-nowrap transition-colors hover-lift`}
              >
                {category}
              </button>
            ))}
            <button 
              onClick={() => navigate("/checkout")}
              className="px-4 py-2 rounded-full border border-gray-700 hover:border-primary hover:bg-primary/10 text-gray-300 text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 hover-lift"
            >
              <ShoppingCart className="w-4 h-4" />
              Carrello
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-700 animate-fade-in hover-lift`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs text-primary font-medium mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {product.variants && product.variants.length > 0 ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600">
                          {selectedVariants[product.id]
                            ? `Variante: ${product.variants.find(v => v.id === selectedVariants[product.id])?.name}`
                            : "Seleziona variante"}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-gray-700 border-gray-600 text-gray-200">
                        {product.variants.map((variant) => (
                          <DropdownMenuItem
                            key={variant.id}
                            onClick={() => handleSelectVariant(product.id, variant.id)}
                            className="cursor-pointer hover:bg-gray-600"
                          >
                            {variant.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium w-full"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Richiedi preventivo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Noleggio CTA */}
        <NoleggioCtaSection />
      </div>
    </div>
  );
}
