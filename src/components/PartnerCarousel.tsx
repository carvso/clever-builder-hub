
const partners = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

export default function PartnerCarousel() {
  return (
    <div className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-2xl font-semibold text-dark mb-12">
          I nostri partner
        </h2>
        <div className="relative">
          <div className="flex space-x-12 animate-slide-left">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-24 bg-light rounded-lg flex items-center justify-center text-gray-500"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
