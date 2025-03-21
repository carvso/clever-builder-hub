
import { Building, Truck, User, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const categories = [
  {
    title: "Materiali da Costruzione",
    description: "Cemento, mattoni, e tutto per le fondamenta",
    icon: Building,
    link: "/catalogo"
  },
  {
    title: "Noleggio Macchinari",
    description: "Escavatori, gru e attrezzature specializzate",
    icon: Truck,
    link: "/servizi"
  },
  {
    title: "Mezzi con Conducente",
    description: "Personale qualificato per grandi lavori",
    icon: User,
    link: "/servizi"
  },
  {
    title: "Consulenza Tecnica",
    description: "Supporto specializzato per il tuo progetto",
    icon: PenTool,
    link: "/servizi"
  },
];

export default function ProductCategories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h2 className="text-3xl font-semibold text-dark mb-4">
            Le Nostre Categorie
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri la nostra vasta gamma di prodotti e servizi per il tuo cantiere
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className={`group bg-light rounded-2xl p-8 transition-all duration-300 hover:bg-primary hover:text-white hover-lift ${
                isVisible ? `animate-fade-in delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <category.icon className="w-12 h-12 mb-6 text-primary group-hover:text-white transition-colors" />
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <p className="text-gray-600 group-hover:text-white/90 mb-6 transition-colors">
                {category.description}
              </p>
              <span className="inline-block px-6 py-2 bg-primary text-white rounded-xl group-hover:bg-white group-hover:text-primary transition-colors">
                Scopri di più
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
