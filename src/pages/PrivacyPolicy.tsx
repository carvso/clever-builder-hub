
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Introduzione</h2>
              <p>
                EdilP2 S.r.l. ("noi", "nostro/a" o "la Società") rispetta la privacy dei visitatori 
                del nostro sito web edilp2.it ("Sito"). Questa Privacy Policy descrive come raccogliamo, 
                utilizziamo e condividiamo le informazioni personali quando visiti o effettui acquisti 
                sul nostro Sito.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Informazioni raccolte</h2>
              <p>
                Raccogliamo diverse tipologie di informazioni quando interagisci con il nostro Sito:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Informazioni personali:</strong> Nome, indirizzo email, numero di telefono, 
                  indirizzo di fatturazione e altre informazioni che fornisci quando compili moduli sul nostro Sito.
                </li>
                <li>
                  <strong>Informazioni sulle transazioni:</strong> Dettagli sui prodotti o servizi che 
                  hai richiesto attraverso il nostro Sito.
                </li>
                <li>
                  <strong>Informazioni di utilizzo:</strong> Dati su come interagisci con il nostro Sito, 
                  inclusi i tempi di accesso, le pagine visualizzate, e altre statistiche.
                </li>
                <li>
                  <strong>Informazioni del dispositivo:</strong> Dettagli sul dispositivo utilizzato 
                  per accedere al nostro Sito, inclusi modello hardware, sistema operativo e browser web.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Come utilizziamo le informazioni</h2>
              <p>Utilizziamo le informazioni che raccogliamo per:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Fornire, mantenere e migliorare il nostro Sito</li>
                <li>Processare e gestire le richieste di preventivo</li>
                <li>Comunicare con te riguardo ai prodotti, servizi, offerte e eventi</li>
                <li>Rispondere alle tue domande e richieste di assistenza</li>
                <li>Monitorare e analizzare tendenze, utilizzo e attività relative al nostro Sito</li>
                <li>Prevenire frodi e abusi e proteggere la sicurezza del nostro Sito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Condivisione delle informazioni</h2>
              <p>
                Possiamo condividere le informazioni raccolte nelle seguenti circostanze:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Fornitori di servizi:</strong> Con terze parti che ci forniscono servizi come 
                  hosting web, analisi dei dati, elaborazione pagamenti e supporto clienti.
                </li>
                <li>
                  <strong>Conformità legale:</strong> Quando riteniamo in buona fede che la divulgazione 
                  sia necessaria per rispettare la legge, proteggere i nostri diritti o la sicurezza di altri.
                </li>
                <li>
                  <strong>Transazioni aziendali:</strong> In relazione a una fusione, acquisizione, 
                  vendita di attività o altre transazioni aziendali.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. I tuoi diritti</h2>
              <p>
                Hai il diritto di accedere, correggere o cancellare le tue informazioni personali. 
                Puoi anche opporti o limitare il trattamento dei tuoi dati o richiedere la portabilità 
                dei dati. Per esercitare questi diritti, contattaci a paolomangiafico29@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Sicurezza dei dati</h2>
              <p>
                Adottiamo misure di sicurezza ragionevoli per proteggere le tue informazioni personali 
                da perdita, uso improprio e accesso non autorizzato, divulgazione, alterazione e distruzione.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Modifiche alla Privacy Policy</h2>
              <p>
                Potremo aggiornare questa Privacy Policy di tanto in tanto. Ti informeremo di qualsiasi 
                cambiamento pubblicando la nuova Privacy Policy su questa pagina e, se le modifiche sono 
                significative, forniremo un avviso più evidente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">8. Contattaci</h2>
              <p>
                Se hai domande sulla nostra Privacy Policy, contattaci a:<br />
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
