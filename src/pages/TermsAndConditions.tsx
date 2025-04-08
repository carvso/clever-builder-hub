
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="min-h-screen bg-dark"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-secondary rounded-2xl p-8 shadow-lg text-white"
        >
          <h1 className="text-3xl font-bold mb-6 text-white">Termini e Condizioni</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Accettazione dei termini</h2>
              <p>
                Questi Termini e Condizioni ("Termini") regolano l'utilizzo del sito web edilp2.it ("Sito") 
                e i servizi offerti da EdilP2 S.r.l. ("noi", "nostro/a" o "la Società"). Utilizzando il nostro 
                Sito, accetti di essere vincolato da questi Termini. Se non sei d'accordo con questi Termini, 
                non utilizzare il nostro Sito.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Modifiche ai termini</h2>
              <p>
                Ci riserviamo il diritto di modificare o aggiornare questi Termini in qualsiasi momento. 
                Le modifiche entrano in vigore immediatamente dopo la pubblicazione sul Sito. L'uso continuato 
                del Sito dopo tali modifiche costituisce l'accettazione dei nuovi Termini.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Utilizzo del sito</h2>
              <p>
                Ti concediamo un diritto limitato, non esclusivo e non trasferibile di accedere e utilizzare 
                il Sito per scopi personali e non commerciali. Non puoi:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Utilizzare il Sito in modo illegale o fraudolento</li>
                <li>Raccogliere dati degli utenti dal Sito</li>
                <li>Utilizzare robot, spider o altri mezzi automatici per accedere al Sito</li>
                <li>Modificare, adattare, tradurre o decodificare qualsiasi parte del Sito</li>
                <li>Rimuovere copyright, marchi o altre note proprietarie dal Sito</li>
                <li>Utilizzare il Sito in modo da sovraccaricare l'infrastruttura</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Account e registrazione</h2>
              <p>
                Alcune funzionalità del Sito possono richiedere la registrazione di un account. Sei responsabile 
                del mantenimento della riservatezza delle tue credenziali e di tutte le attività che avvengono 
                sotto il tuo account. Ci riserviamo il diritto di disattivare qualsiasi account in qualsiasi 
                momento e per qualsiasi motivo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Prodotti e servizi</h2>
              <p>
                I prodotti e servizi sono disponibili solo per clienti in Italia. I prezzi visualizzati sul Sito 
                possono essere soggetti a modifiche senza preavviso. Ci riserviamo il diritto di limitare le 
                quantità di qualsiasi prodotto o servizio offerto.
              </p>
              <p className="mt-2">
                Le immagini dei prodotti sono solo a scopo illustrativo e potrebbero non riflettere esattamente 
                il prodotto reale. Tutte le descrizioni dei prodotti e i prezzi sono soggetti a errori e omissioni.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Preventivi e ordini</h2>
              <p>
                La richiesta di un preventivo non costituisce un contratto di vendita. I preventivi sono 
                validi per 30 giorni dalla data di emissione, salvo diversa indicazione. Ci riserviamo il 
                diritto di accettare o rifiutare qualsiasi ordine a nostra discrezione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Proprietà intellettuale</h2>
              <p>
                Tutti i contenuti presenti sul Sito, inclusi ma non limitati a testi, grafica, logo, icone, 
                immagini, clip audio, download digitali e compilazioni di dati, sono di proprietà di EdilP2 S.r.l. 
                o dei suoi fornitori di contenuti e sono protetti dalle leggi sul copyright e sulla proprietà 
                intellettuale.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Limitazione di responsabilità</h2>
              <p>
                In nessun caso EdilP2 S.r.l., i suoi funzionari, direttori, dipendenti o agenti saranno 
                responsabili per qualsiasi danno diretto, indiretto, incidentale, speciale o consequenziale 
                derivante dall'uso o dall'impossibilità di utilizzare il Sito o i suoi contenuti.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">9. Legge applicabile</h2>
              <p>
                Questi Termini sono regolati e interpretati in conformità con le leggi italiane. 
                Qualsiasi controversia relativa a questi Termini sarà soggetta alla giurisdizione 
                esclusiva dei tribunali di Siracusa, Italia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">10. Contatti</h2>
              <p>
                Per domande riguardanti questi Termini, contattaci a:<br />
                Email: paolomangiafico29@gmail.com<br />
                Telefono: +39 389 231 0650<br />
                Indirizzo: Via Vittorio Veneto, 114, 96010 Solarino (SR)
              </p>
            </section>

            <p className="text-sm text-gray-400 mt-8">Ultimo aggiornamento: 08/04/2025</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
