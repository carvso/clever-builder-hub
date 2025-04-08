
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CookiePolicy() {
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
          <h1 className="text-3xl font-bold mb-6 text-white">Cookie Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. Cosa sono i cookie</h2>
              <p>
                I cookie sono piccoli file di testo che vengono memorizzati sul tuo computer o dispositivo 
                mobile quando visiti un sito web. I cookie sono ampiamente utilizzati per far funzionare 
                i siti web o per farli funzionare in modo più efficiente, così come per fornire 
                informazioni ai proprietari del sito.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. Come utilizziamo i cookie</h2>
              <p>
                Il nostro sito web edilp2.it ("Sito") utilizza cookie per diversi scopi, tra cui:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>Cookie essenziali:</strong> Necessari per il funzionamento del Sito. 
                  Senza questi cookie, alcune funzionalità come l'accesso a aree sicure 
                  non sarebbero possibili.
                </li>
                <li>
                  <strong>Cookie analitici/di prestazione:</strong> Ci permettono di riconoscere e 
                  contare il numero di visitatori e vedere come i visitatori navigano nel nostro Sito. 
                  Questo ci aiuta a migliorare il funzionamento del Sito.
                </li>
                <li>
                  <strong>Cookie di funzionalità:</strong> Utilizzati per riconoscerti quando torni 
                  sul nostro Sito. Questo ci permette di personalizzare i nostri contenuti per te.
                </li>
                <li>
                  <strong>Cookie di targeting:</strong> Registrano la tua visita al nostro Sito, le 
                  pagine che hai visitato e i link che hai seguito. Utilizziamo queste informazioni 
                  per rendere il nostro Sito e la pubblicità visualizzata più rilevanti ai tuoi interessi.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. Cookie di terze parti</h2>
              <p>
                In alcuni casi speciali utilizziamo anche cookie forniti da terze parti affidabili. 
                La seguente sezione descrive quali cookie di terze parti potresti incontrare attraverso questo Sito.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Questo Sito utilizza Google Analytics, uno dei servizi di analisi web più diffusi, 
                  che ci aiuta a comprendere come gli utenti utilizzano il Sito e come possiamo migliorare la loro esperienza.
                </li>
                <li>
                  Possiamo anche utilizzare pulsanti di social media e/o plugin che consentono di 
                  connetterti con i tuoi social network in vari modi. Affinché questi funzionino, i 
                  siti dei social media impostano cookie attraverso il nostro Sito.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. Controllo dei cookie</h2>
              <p>
                Puoi controllare e/o eliminare i cookie come desideri. Puoi eliminare tutti i cookie 
                già presenti sul tuo computer e puoi impostare la maggior parte dei browser in modo 
                da bloccare l'installazione di cookie. Tuttavia, se fai questo, potresti dover regolare 
                manualmente alcune preferenze ogni volta che visiti un sito e alcune funzionalità 
                potrebbero non funzionare correttamente.
              </p>
              <p className="mt-2">
                Per ulteriori informazioni sui cookie e su come gestirli, visita aboutcookies.org o 
                consulta la guida del tuo browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. Cookie specifici utilizzati</h2>
              <p>
                Di seguito è riportato un elenco dei principali cookie utilizzati dal nostro Sito e 
                la loro funzione:
              </p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2 bg-gray-700">Cookie</th>
                      <th className="text-left p-2 bg-gray-700">Tipo</th>
                      <th className="text-left p-2 bg-gray-700">Durata</th>
                      <th className="text-left p-2 bg-gray-700">Scopo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-600">
                      <td className="p-2">_ga</td>
                      <td className="p-2">Analitico</td>
                      <td className="p-2">2 anni</td>
                      <td className="p-2">Utilizzato da Google Analytics per distinguere gli utenti</td>
                    </tr>
                    <tr className="border-t border-gray-600">
                      <td className="p-2">_gid</td>
                      <td className="p-2">Analitico</td>
                      <td className="p-2">24 ore</td>
                      <td className="p-2">Utilizzato da Google Analytics per distinguere gli utenti</td>
                    </tr>
                    <tr className="border-t border-gray-600">
                      <td className="p-2">_gat</td>
                      <td className="p-2">Analitico</td>
                      <td className="p-2">1 minuto</td>
                      <td className="p-2">Utilizzato da Google Analytics per limitare la frequenza delle richieste</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. Modifiche alla Cookie Policy</h2>
              <p>
                Potremo aggiornare la nostra Cookie Policy di tanto in tanto. Ti invitiamo a rivedere periodicamente 
                questa pagina per eventuali modifiche. Le modifiche entrano in vigore immediatamente dopo essere state 
                pubblicate sulla pagina.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. Contattaci</h2>
              <p>
                Se hai domande sulla nostra Cookie Policy, contattaci a:<br />
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
