
import { Shield, Truck, HeadphonesIcon } from "lucide-react";

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
  return (
    <section className="py-24 bg-light">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                feature.variant === "primary"
                  ? "bg-primary text-white"
                  : "bg-white text-dark"
              }`}
            >
              <feature.icon
                className={`w-12 h-12 mb-6 ${
                  feature.variant === "primary"
                    ? "text-white"
                    : "text-primary"
                }`}
              />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className={feature.variant === "primary" ? "text-white/90" : "text-gray-600"}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
