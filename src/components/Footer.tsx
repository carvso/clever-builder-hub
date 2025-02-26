
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <span className="text-white font-bold text-xl">E2</span>
              </div>
              <span className="text-xl font-bold text-white">Edil<span className="text-primary">P2</span></span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Da oltre 25 anni, EdilP2 fornisce materiali e servizi di alta qualità nel settore edile.
              La nostra missione è sostenere l'eccellenza costruttiva attraverso prodotti certificati e 
              soluzioni innovative.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Prodotti</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-primary transition-colors">
                  Materiali da costruzione
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-primary transition-colors">
                  Cementi e malte
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-primary transition-colors">
                  Isolanti termici
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-primary transition-colors">
                  Inerti e sabbie
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-gray-400 hover:text-primary transition-colors">
                  Laterizi e blocchi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Servizi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors">
                  Noleggio macchinari
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors">
                  Mezzi con conducente
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors">
                  Consegna in cantiere
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors">
                  Consulenza tecnica
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-gray-400 hover:text-primary transition-colors">
                  Progettazione
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contatti</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">
                  Via delle Costruzioni, 42<br />
                  20100 Milano (MI)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+390123456789" className="text-gray-400 hover:text-primary transition-colors">
                  +39 01 2345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@edilp2.it" className="text-gray-400 hover:text-primary transition-colors">
                  info@edilp2.it
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} EdilP2 S.r.l. - P.IVA 01234567890 | Tutti i diritti riservati</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Termini e Condizioni</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
