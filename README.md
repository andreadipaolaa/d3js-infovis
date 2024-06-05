# Infovis Consegna
"Crea un file json con dei dati multivariati: ci sono 10 data-cases e ogni data-case ha quattro variabili quantitative i cui valori sono tutti positivi. In base a questi dati disegna 10 casette (è sufficiente la silhouette) con diverse caratteristiche (altezza, larghezza, altezza del tetto, ecc) associando ogni caratteristica ad una variabile. Facendo click con il pulsante sinistro su una caratteristica di una casetta, tutte le casette si dispongono in un'ordine da sinistra a destra corrispondente al valore dei rispettivi data-case per la variabile associata a quella caratteristica. Fai in modo che i cambi di disposizione delle casette avvengano con un'animazione fluida. Usa le scale di D3.js per mappare il dominio delle variabili (che deve poter essere arbitrario) nel range dei valori che ti servono, che invece è determinato dalla tua interfaccia."

# InfoVis Mini-Project

Questo progetto è una visualizzazione interattiva che mostra una serie di casette con caratteristiche variabili (larghezza e altezza della casa e del tetto). Le casette possono essere ordinate in modo interattivo cliccando su una loro caratteristica (larghezza o altezza della casa o del tetto), con un'animazione fluida che mostra il cambiamento nell'ordinamento.

## Struttura del Progetto

- `index.html`: Il file HTML che contiene la struttura di base della pagina web.
- `script.js`: Il file JavaScript che utilizza D3.js per creare la visualizzazione e gestire l'interattività.
- `data.json`: Il file JSON che contiene i dati delle casette.
- `start_server.sh`: Uno script Bash per avviare un server web locale per visualizzare il progetto.
