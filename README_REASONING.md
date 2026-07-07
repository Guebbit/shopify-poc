# Ragionamento durante la creazione del progetto

### E' un po' lungo come commentario ma ho voluto aggiungerlo come bonus, può essere saltato

Premessa: in questi giorni mi trovo in viaggio ed il tempo o gli strumenti per lavorare sono ridotti al minimo (vale a dire mini portatile, pessima connessione che spesso salta, lavoro nei ritagli di tempo) quindi temo che la qualità del codice non sarà al mio massimo.

---

Detto questo, faccio una piccola panoramica su come mi sono mosso più che sulle features in se.
Anche se si tratta di una piccola proof of concept, ho voluto trattarla come un'applicazione completa e quindi ho applicato la mia struttura tipica per intero (attraverso un boilerplate che già avevo e che ho adattato alla situazione).
Ovvero un approccio contract driven attraverso openapi.yaml che definisce tutta la struttura del servizio.

Mi rendo conto che graphQL non è "domabile" per intero in questo modo, ma facendo qualche ricerca ho imparato che è possibile una soluzione ibrida ed essa è uno standard. Crea un "anti-corruption layer" e concettualizza il "single source of truth" come "single source of truth PER SYSTEM" (consente di mantenere l'indipendenza del FE e di non inquinarlo eccessivamente con il BE, così da poter eventuali cambiamenti del BE più facili da gestire).
Non si finisce mai di imparare.

---

Per i test mi sono limitato a smoke tests e test minori, sia unit che e2e, costruiti principalmente con l'AI (anche se segue i binari del mio boilerplate) per mancanza di tempo.
In ottica di sviluppo di un'applicazione reale può essere un buon approccio a meno di star cercando un bug specifico o star lavorando su una feature particolarmente importante o fragile. Perché i test fatti con l'AI sono ottimi e decisamente meglio che nessun test.
Questo approccio è perfettamente valido anche nello use case di un prodotto reale.

---

Ho scelto Apollo per "gestire" graphQL perché era lo strumento che si utilizzava in un vecchio progetto in cui avevo lavorato ed essendo industry standard ho preferito rimanere lì.
Decisamente under utilizzato e c'erano soluzioni piu leggere, ma ho preferito questa strada visto che sto trattando questa poc come un'applicazione completa.
Questa parte è da trattare come uno stub da revisionare ed espandere in un secondo momento per raggiungere il suo completo potenziale.

---

Non ho potuto inserire un caching system decente perché il mio toolkit preposto è in fase di revisione e rework (è un wrapper di Tanstack query).
La soluzione attuale è funzionale ma non ottimale: lasciare che se ne occupi il caching di Nuxt.
Questo ci lascia completa libertà futura di rivedere ed espandere questa parte senza sforzo (magari utilizzando il caching di Apollo per prendere 2 piccioni con 1 fava)

---

Nota sulle AI.
Ho usato l'AI per chiedere consigli sulle migliori strategie, per controllare le SOLID e DRY violations e per guidarmi nell'implementazione e nello studio di tecnologie che conosco un po' meno (storefront e graphql)
Ho usato l'AI anche per superare il "dilemma del foglio bianco", ovvero creare una struttura iniziale e poi andarla a modificare manualmente.
Ad esempio l'AI ha creato alcune parti in automatico, come gli schemi GraphQL, funzionavano al 1° colpo ma per sicurezza ho ricercato a mano dove shopify esponesse il proprio schema graphql e ho controllato a mano che andasse tutto bene.

Ho usato un approccio che forse a breve sarà già "vecchio", ma esso consiste sostialmente di creare una piccola documentazione che "racconti" l'applicazione (e magari metta il focus su alcuni aspetti critici o teoreticamente interessanti). Questo consente ad un essere umano di entrare in un progetto molto più facilmente E ad una AI di acquisire contesto più velocemente.
La documentazione funge come una sorta di source of truth "logica" (non ufficiale).

Prima di partire per il viaggio mi stavo studiando una nuova strategia simile ma molto più potente. L'approccio "llm-wiki" di Karpathy e l'uso di alcuni altri tool per creare sempre una wikipedia "umana" ma anche una "wikipedia" per l'AI ed un knowledge graph che collegasse tutte le varie feature, le logiche ed il codice. Qualcosa che in teoria consente di far risparmiare molti più token all'AI nella gestione del contesto E la mantiene focused. Una sorta di mini RAG.

---

Note: La mia connessione è piuttosto debole, non riesco a testare i container docker perché il download dell'immagine ci mette troppo e salta spesso.
