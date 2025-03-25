import { MapPin, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const locations = [
  {
    title: "Siracusa",
    description: "Servizio in tutta la città e provincia",
    icon: MapPin,
    link: "/contatti"
  },
  {
    title: "Orari di Apertura",
    description: "Lun-Sab: 7:30-19:00, Dom: Chiuso",
    icon: Clock,
    link: "/contatti"
  },
  {
    title: "Contattaci",
    description: "Assistenza telefonica 24/7",
    icon: Phone,
    link: "/contatti"
  }
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
            Dove Siamo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Serviamo l'intera provincia di Siracusa con materiali edili e noleggio macchinari
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <Link
              to={location.link}
              key={index}
              className={`group bg-light rounded-2xl p-8 transition-all duration-300 hover:bg-primary hover:text-white hover-lift ${
                isVisible ? `animate-fade-in delay-${index * 100}` : 'opacity-0'
              }`}
            >
              <location.icon className="w-12 h-12 mb-6 text-primary group-hover:text-white transition-colors" />
              <h3 className="text-xl font-semibold mb-4">{location.title}</h3>
              <p className="text-gray-600 group-hover:text-white/90 mb-6 transition-colors">
                {location.description}
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
