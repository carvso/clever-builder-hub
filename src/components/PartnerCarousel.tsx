
const partners = [
  "https://www.friendlymaterials.com/media/brands/115/KeraKoll_logo_v1.png",
  "https://aedhhl.infiniteuploads.cloud/2022/08/C-BuzziUnicem.max-500x500-1.png",
  "https://www.rasoxplus.it/wp-content/uploads/2021/06/cropped-logo.png",
  "https://www.friendlymaterials.com/media/brands/115/KeraKoll_logo_v1.png",
  "https://aedhhl.infiniteuploads.cloud/2022/08/C-BuzziUnicem.max-500x500-1.png",
  "https://www.rasoxplus.it/wp-content/uploads/2021/06/cropped-logo.png",
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
  );
}
