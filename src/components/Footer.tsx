
export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-bold text-xl mb-6">EdilPro</h3>
            <p className="text-gray-400">
              Leader nella fornitura di materiali edili e noleggio macchinari per il movimento terra.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Prodotti</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Materiali da Costruzione</li>
              <li>Noleggio Macchinari</li>
              <li>Attrezzature</li>
              <li>Sicurezza</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Azienda</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Chi Siamo</li>
              <li>Lavora con Noi</li>
              <li>Contatti</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Contatti</h4>
            <ul className="space-y-4 text-gray-400">
              <li>info@edilpro.it</li>
              <li>+39 02 1234567</li>
              <li>Via Roma 123, Milano</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 EdilPro. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
