
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Building, Calendar, Construction, User, Truck, Package } from "lucide-react";
import { Link } from "react-router-dom";
import NoleggioCtaSection from "@/components/NoleggioCtaSection";
import CatalogoCtaSection from "@/components/CatalogoCtaSection";

// Progetti example data
const projects = [
  {
    id: 1,
    title: "Demolizione palazzo storico",
    description: "Demolizione controllata di una struttura storica con preservazione della facciata principale. Utilizzo di escavatori idraulici specializzati per minimizzare l'impatto sulle strutture adiacenti.",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    category: "Demolizione",
    date: "Gennaio 2023",
    client: "Comune di Milano",
    services: ["Escavatore idraulico", "Martello demolitore", "Autocarro con gru"],
    materials: ["Calcestruzzo riciclato", "Smaltimento controllato rifiuti"],
    featured: true
  },
  {
    id: 2,
    title: "Costruzione edificio residenziale",
    description: "Realizzazione di un complesso residenziale di 6 piani con tecniche di costruzione sostenibile. Utilizzo di gru a torre per il sollevamento dei materiali fino ai piani alti.",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
    category: "Costruzione",
    date: "Marzo 2023",
    client: "Immobiliare Verde Srl",
    services: ["Gru a torre", "Betoniera", "Rullo compressore"],
    materials: ["Mattoni isolanti", "Cemento Portland", "Pannelli isolanti"],
    featured: true
  },
  {
    id: 3,
    title: "Scavo e fondazioni centro commerciale",
    description: "Scavo e preparazione fondazioni per un nuovo centro commerciale. Movimentazione di oltre 5000m³ di terra e preparazione di fondazioni speciali resistenti al sisma.",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    category: "Scavo",
    date: "Giugno 2023",
    client: "Retail Development SpA",
    services: ["Escavatore cingolato", "Bulldozer", "Autocarro"],
    materials: ["Calcestruzzo armato", "Barre di rinforzo"],
    featured: true
  },
  {
    id: 4,
    title: "Ristrutturazione ponte storico",
    description: "Intervento di consolidamento e restauro di un ponte storico con mantenimento delle caratteristiche architettoniche originali. Utilizzo di macchinari specializzati per l'accesso alle aree difficili.",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
    category: "Restauro",
    date: "Settembre 2023",
    client: "Provincia di Torino",
    services: ["Piattaforme elevabili", "Gru mobile", "Attrezzature speciali"],
    materials: ["Mattoni recuperati", "Malta speciale", "Resine consolidanti"],
    featured: false
  },
  {
    id: 5,
    title: "Pavimentazione autostrada A14",
    description: "Rifacimento del manto stradale di un tratto di 15km della autostrada A14. Lavoro eseguito in tempi record grazie all'utilizzo di macchinari specializzati per asfalto.",
    image: "/lovable-uploads/8e9b834c-cad6-4dcd-9118-61a742d74b56.png",
    category: "Asfalto",
    date: "Ottobre 2023",
    client: "Autostrade per l'Italia",
    services: ["Fresa per asfalto", "Rullo compressore", "Finitrice stradale"],
    materials: ["Asfalto drenante", "Stabilizzato"],
    featured: false
  },
  {
    id: 6,
    title: "Montaggio torre eolica",
    description: "Installazione di una torre eolica di ultima generazione in un parco energetico. Utilizzo di gru speciali per il sollevamento dei componenti ad altezze elevate.",
    image: "/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png",
    category: "Energia",
    date: "Novembre 2023",
    client: "Green Energy Srl",
    services: ["Gru telescopica", "Mezzi trasporto eccezionale"],
    materials: ["Componenti torre eolica", "Cemento speciale per fondazioni"],
    featured: false
  }
];

// Project categories for filtering
const categories = ["Tutti", "Demolizione", "Costruzione", "Scavo", "Restauro", "Asfalto", "Energia"];

export default function Progetti() {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger animations
    setIsPageLoaded(true);
  }, []);
  
  const filteredProjects = projects.filter(project => 
    selectedCategory === "Tutti" || project.category === selectedCategory
  );
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Navbar />
      
      {/* Banner superior per noleggio macchinari */}
      <div className={`bg-primary relative overflow-hidden ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-white" />
              <p className="text-white font-medium">
                EdilP2 offre noleggio macchinari professionali con o senza conducente
              </p>
            </div>
            <Link
              to="/servizi"
              className="px-4 py-2 bg-white text-primary rounded-full text-sm font-medium hover:bg-gray-100 transition-colors hover-lift flex items-center gap-2 whitespace-nowrap"
            >
              Esplora mezzi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      
      <main className="py-12">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-2xl mx-auto mb-12 ${isPageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              I Nostri Progetti
            </h1>
            <p className="text-lg text-gray-600">
              Scopri come i nostri macchinari e materiali hanno contribuito a realizzare progetti 
              di ogni tipo, dalle piccole ristrutturazioni alle grandi opere infrastrutturali.
            </p>
          </div>
          
          {/* Banner per materiali */}
          <div className={`mb-8 bg-gray-100 rounded-2xl overflow-hidden ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 relative h-full">
                <img 
                  src="/lovable-uploads/7dc003ab-aa4a-4e77-a0f4-a031f5755afd.png" 
                  alt="Materiali EdilP2" 
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                  <Package className="w-10 h-10 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">Materiali EdilP2</h3>
                </div>
              </div>
              <div className="p-6 md:p-8 md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Materiali di prima qualità per il tuo progetto
                </h3>
                <p className="text-gray-600 mb-6">
                  Tutti i materiali utilizzati nei nostri progetti sono disponibili nel nostro catalogo.
                  Offriamo cementi, rasanti, mattoni, inerti e tutto il necessario per costruzioni di qualità,
                  con consegna rapida direttamente in cantiere.
                </p>
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium hover-lift"
                >
                  Scopri i nostri materiali
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className={`bg-white rounded-xl shadow-sm p-4 mb-8 ${isPageLoaded ? 'animate-slide-in-left delay-100' : 'opacity-0'}`}>
            <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category 
                      ? "border-primary bg-primary/10 text-primary" 
                      : "border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
                  } transition-colors whitespace-nowrap text-sm font-medium hover-lift`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Featured Projects (larger layout) */}
          {selectedCategory === "Tutti" && (
            <div className={`mb-12 ${isPageLoaded ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progetti in evidenza</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                {projects.filter(p => p.featured).map((project) => (
                  <div 
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow hover-lift"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-white/90 text-sm">
                            <Calendar className="w-4 h-4" />
                            {project.date}
                          </span>
                          <span className="flex items-center gap-1 text-white/90 text-sm">
                            <Building className="w-4 h-4" />
                            {project.client}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-6">{project.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Construction className="w-4 h-4 text-primary" />
                            Macchinari utilizzati
                          </h4>
                          <ul className="space-y-1">
                            {project.services.map((service, idx) => (
                              <li key={idx} className="text-sm text-gray-600">• {service}</li>
                            ))}
                          </ul>
                          
                          <Link 
                            to="/servizi" 
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium mt-3"
                          >
                            Esplora il noleggio 
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Materiali impiegati
                          </h4>
                          <ul className="space-y-1">
                            {project.materials.map((material, idx) => (
                              <li key={idx} className="text-sm text-gray-600">• {material}</li>
                            ))}
                          </ul>
                          
                          <Link 
                            to="/catalogo" 
                            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium mt-3"
                          >
                            Esplora i materiali 
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow hover-lift ${
                  isPageLoaded ? `animate-fade-in delay-${Math.min(index * 100, 500)}` : 'opacity-0'
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Building className="w-4 h-4" />
                      {project.client}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between">
                    <Link 
                      to="/servizi" 
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Noleggia macchinari
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    
                    <Link 
                      to="/catalogo" 
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Acquista materiali
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA finale alla pagina di noleggio */}
          <div className={`mt-16 bg-primary/5 rounded-2xl p-8 border border-primary/10 ${isPageLoaded ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Realizziamo il tuo progetto insieme</h3>
                <p className="text-gray-600">
                  Hai un progetto simile? Metti a frutto la nostra esperienza e i nostri macchinari.
                  Contattaci per un preventivo personalizzato o scopri le nostre soluzioni di noleggio.
                </p>
              </div>
              <div className="flex gap-4">
                <Link 
                  to="/servizi" 
                  className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap hover-lift"
                >
                  Noleggia macchinari
                </Link>
                <Link 
                  to="/catalogo" 
                  className="px-6 py-3 bg-white border border-primary text-primary rounded-xl hover:bg-primary/5 transition-colors text-sm font-medium whitespace-nowrap hover-lift"
                >
                  Acquista materiali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Alternanza di CTA dedicate */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <NoleggioCtaSection />
            <CatalogoCtaSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
