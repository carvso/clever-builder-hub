
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Dove Trovarci</h2>
          <p className="text-gray-600">Vieni a trovarci nel nostro magazzino</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-light rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-2">Il Nostro Magazzino</h3>
                  <p className="text-gray-600">
                    Via Roma 123<br />
                    00100 Roma (RM)<br />
                    Italia
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-2">Contatti</h3>
                  <p className="text-gray-600">
                    Tel: +39 06 1234567<br />
                    Cell: +39 333 1234567
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-dark mb-2">Email</h3>
                  <p className="text-gray-600">
                    info@edilp2.it<br />
                    supporto@edilp2.it
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11880.492291371716!2d12.4922309!3d41.8902102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1679907632203!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
