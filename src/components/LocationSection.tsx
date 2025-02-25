
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
                    Via Vittorio Veneto 114<br />
                    96010 Solarino (SR)<br />
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
                    Cell: +39 389 2310650
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d281.2745041980095!2d15.126434138104223!3d37.09898159043219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1313d7999f91a9e5%3A0xcb3c7fd09b9e1d4b!2serede%20di%20Mangiafico%20Paolo%20fornitura%20di%20materiale%20edile%2C%20lavori%20con%20gru%2C%20lavori%20di%20sbancamento%20e%20movimento%20terra!5e0!3m2!1sit!2ses!4v1740464220611!5m2!1sit!2ses"
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
