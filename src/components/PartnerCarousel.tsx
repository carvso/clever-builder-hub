import { useEffect, useRef, useState } from "react";

const partners = [
  "https://premix.it/wp-content/uploads/2024/09/Logo-1-300x88.png",
  "https://www.maurer.ferritalia.it/personal/images/logo-maurer.png",
  "https://www.friendlymaterials.com/media/brands/115/KeraKoll_logo_v1.png",
  "https://aedhhl.infiniteuploads.cloud/2022/08/C-BuzziUnicem.max-500x500-1.png",
];

export default function PartnerCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Clone the partners for seamless looping
    const scrollWidth = scrollElement.scrollWidth / 2;
    let scrollPosition = 0;

    const scroll = () => {
      if (!isAnimating || !scrollElement) return;
      
      scrollPosition += 0.5;
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
        scrollElement.style.transform = `translateX(0px)`;
      } else {
        scrollElement.style.transform = `translateX(-${scrollPosition}px)`;
      }
      
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    // Pause animation when hovering
    scrollElement.addEventListener("mouseenter", () => setIsAnimating(false));
    scrollElement.addEventListener("mouseleave", () => setIsAnimating(true));

    return () => {
      cancelAnimationFrame(animationId);
      scrollElement.removeEventListener("mouseenter", () => setIsAnimating(false));
      scrollElement.removeEventListener("mouseleave", () => setIsAnimating(true));
    };
  }, [isAnimating]);

  return (
    <div className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Collaborazioni
          </span>
          <h2 className="text-3xl font-bold text-dark">
            I nostri partner
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Collaboriamo con i migliori produttori di materiali edili per garantire qualità e affidabilità
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex space-x-12"
              style={{ willChange: "transform" }}
            >
              {/* Double the partners array for seamless looping */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-24 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow p-4"
                  style={{
                    backgroundImage: partner ? `url(${partner})` : 'none',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
