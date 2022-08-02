---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Handler in JSX'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-jsx-handler-function
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Handler in JSX

Unsere App-Komponente verfügt nach wie vor über das Eingabefeld inklusive Label, das wir bisher nur anzeigen und nicht verwenden --- wenn ein Text in das Feld eingegeben wird, wird dieser nicht von der App weiter verarbeitet. In HTML verfügen Eingabefelder üblicherweise über einen [`onChange`-Handler](https://developer.mozilla.org/de/docs/Web/API/GlobalEventHandlers/onchange). Ein solcher Handler wäre in JSX ebenfalls hilfreich. Deshalb sehen wir uns als Nächstes an, wie ein `onChange`-Handler mit JSX in einer React-Komponente angewendet wird. Überarbeite zunächst die App. Nutze anstelle des [knappen Körpers einen gewöhnlichen Blockkörper](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Pfeilfunktionen#Funktionsk%C3%B6rper), um dann im nächsten Schritt weitere Implementierungsdetails hinzufügen.

```js
# start-insert
const App = () => {
  // Führe eine beliebige Aufgabe aus

  return (
# end-insert
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr />

      <List />
    </div>
# start-insert
  );
};
# end-insert
```

Definiere jetzt eine Funktion, die aufgerufen wird, wenn sich der Wert im Eingabefeld ändert, sprich: wenn das Änderungsereignis des Felds ausgelöst wird. Verwende eine normale oder eine Pfeilfunktion --- je nachdem welche Variante du bevorzugst. In React wird eine solche Funktion als **(Ereignis-)Handler** bezeichnet. Übergib diese im nächsten Schritt an das Attribut `onChange` des Eingabefelds. Beachte: Bei `onChange` handelt es sich um JSX. Dies erkennst du an der Schreibweise in CamelCase.

```js
const App = () => {
# start-insert
  const handleChange = event => {
    console.log(event);
  };
# end-insert

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
# start-insert
      <input id="search" type="text" onChange={handleChange} />
# end-insert

      <hr />

      <List />
    </div>
  );
};
```

Öffne nach der vorhergehenden Änderung zunächst deine Anwendung in einem Webbrowser und wechsele danach in die Entwicklertools des Browsers. Gib daraufhin ein paar Zeichen in das Eingabefeld ein und prüfe, ob deine Eingaben mitprotokolliert werden. Dies wird als **synthetisches Ereignis** bezeichnet, welches vom JavaScript-Objekt definiert wird. Über dieses Objekt greifen wir auf den Wert des Eingabefelds zu:

```js
const App = () => {
  const handleChange = event => {
# start-insert
    console.log(event.target.value);
# end-insert
  };

  return ( ... );
};
```

Das [synthetische Ereignis](https://de.reactjs.org/docs/events.html) ist ein browserübergreifender Wrapper für das [native Eventobjekt des Browsers](https://developer.mozilla.org/de/docs/Web/Events). Es beinhaltet weitere Funktionen, die nützlich sind, um das Standardverhalten des nativen Browsers zu verhindern --- zum Beispiel das Aktualisieren einer Seite, nachdem der Benutzer auf die Schaltfläche zum Senden eines Formulars geklickt hat. Du wirst dieses Ereignis nicht immer nutzen. Je nach Anwendungsfall ist es aber sinnvoll.

Auf diese Weise erreichen wir es, dass HTML-Elemente über JSX-Handlerfunktionen auf Benutzerinteraktionen reagieren. Übergib immer die Funktion selbst an einen Handler und nicht den Rückgabewert --- es sei denn, bei diesem handelt es sich um eine Funktion:

```
// Bitte nicht so.
<input
  id="search"
  type="text"
# start-insert
  onChange={handleChange()}
# end-insert
/>

// Stattdessen
<input
  id="search"
  type="text"
# start-insert
  onChange={handleChange}
# end-insert
/>
```

HTML und JavaScript arbeiten in JSX zielführend zusammen. JavaScript zeigt Objekte mithilfe von HTML im Browser an, übergibt Grundelemente (zum Beispiel `<a>`) an HTML-Attribute (zum Beispiel `href`) und Funktionen an die Attribute eines Elements, um Ereignisse zu behandeln.

Ich bevorzuge Pfeilfunktionen aufgrund ihrer Prägnanz als Ereignishandler. In einer größeren React-Komponente verwende ich teilweise normale Funktionsanweisungen, da diese im Gegensatz zu anderen Variablendeklarationen im Hauptteil einer Komponente sichtbarer sind.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Handler-Function-in-JSX).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Component-Definition...hs/Handler-Function-in-JSX?expand=1).
* Lese mehr zu [SyntheticEvents in React](https://de.reactjs.org/docs/events.html).
<img src="https://vg01.met.vgwort.de/na/5e2d331c19814696b96f59cfcd202977" width="1" height="1" alt="">