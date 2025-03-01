
const partners = [
  "https://www.friendlymaterials.com/media/brands/115/KeraKoll_logo_v1.png",
  "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/eh40cbto1sq1yh0pvaet",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4palDARTuNvU0ZGue-Bem_nnWOfWFLks-dA&s",
  "https://yesilhaber.net/wp-content/uploads/2022/06/Ytong_Logo-e1655723255515-jpg.webp",
  "https://www.vbedilizia.it/wp-content/uploads/2018/01/Knauf-Logo.jpg",
  "https://www.edilportale.com/upload/aziende/produttori/logo/20230104031651682_logo-san-marco-group.jpg",
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
                bgimage= {}
                className="flex-shrink-0 w-48 h-24 bg-light rounded-lg flex items-center justify-center text-gray-500"
                style={{
                  backgroundImage: `url(${partner})`,
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
