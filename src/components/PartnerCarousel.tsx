
const partners = [
  "https://www.friendlymaterials.com/media/brands/115/KeraKoll_logo_v1.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX9w80l7xgFsvDkkdEW_TyNnAxg3sdAgmGw&s",
  "https://confepi.it/wp-content/uploads/2019/07/buffa-industria-per-l-edilizia.jpg",
  "https://yesilhaber.net/wp-content/uploads/2022/06/Ytong_Logo-e1655723255515-jpg.webp",
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
