import { Shield, Truck, HeadphonesIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const features = [
  {
    title: "Qualità Certificata",
    description: "Soluzioni testate per ogni progetto",
    icon: Shield,
    variant: "white",
  },
  {
    title: "Consegna Rapida",
    description: "Materiali sempre disponibili e spediti in tempi record",
    icon: Truck,
    variant: "primary",
  },
  {
    title: "Supporto Specializzato",
    description: "Il nostro team è pronto a guidarti nella scelta",
    icon: HeadphonesIcon,
    variant: "white",
  },
];

export default function Showcase() {
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
    <section ref={sectionRef} className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl transition-all duration-300 hover-lift hover-glow flex flex-col items-center text-center ${
                feature.variant === "primary"
                  ? "bg-primary text-white"
                  : "bg-dark text-white"
              } ${isVisible ? `animate-fade-in delay-${index * 200}` : 'opacity-0'}`}
            >
              <div className="flex justify-center">
                <feature.icon
                  className={`w-12 h-12 mb-6 ${
                    feature.variant === "primary"
                      ? "text-white"
                      : "text-primary"
                  } ${isVisible ? 'animate-scale-in' : ''}`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className={`${feature.variant === "primary" ? "text-white/90" : "text-gray-400"} max-w-xs mx-auto`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
