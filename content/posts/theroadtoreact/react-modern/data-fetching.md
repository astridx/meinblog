---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Datenabruf mit React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-datenabruf
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Datenabruf mit React

In der Beispielanwendung verwenden wir Pseudodaten, die aus einem selbsterstellten Promise-Objekt stammen. Die bisherigen Lektionen zu asynchronem Datenmanagement und erweiterter Statusverwaltung stellend eine Grundlage für diesen Abschnitt dar. Als Nächstes rufen wir Daten von einer echten Drittanbieter-API ab. Dazu verwenden wir die zuverlässige und informative [Hacker News API](https://hn.algolia.com/api).

Anstatt das Array `initialStories` und die Funktion `getAsyncStories` zu verwenden, rufen wir die Daten direkt von der API ab.

```js
// A
# start-insert
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
# end-insert

const App = () => {
  ...

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

# start-insert
    fetch(`${API_ENDPOINT}react`) // B
      .then(response => response.json()) // C
# end-insert
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
# start-insert
          payload: result.hits, // D
# end-insert
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  ...
};
```

Zunächst rufen wir mit `API_ENDPOINT` (A) beliebte Tech-Storys ab. Dafür verwenden wir die [Fetch-API des nativen Browsers](https://developer.mozilla.org/de/docs/Web/API/Fetch_API). Weil es nahe liegt, wählen wir als Suchwort `React` (B). Die Daten werden über die API im Datenformat [JSON](https://developer.mozilla.org/de/docs/Learn/JavaScript/Objects/JSON) gesendet (C). Letztendlich senden wir das Ergebnis der Abfrage in der passenden Datenstruktur als `payload` an den Status (D).

Im Codebeispiel verwenden wir mit `${API_ENDPOINT}react` einen [Template-String](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Template_literals). Wäre diese Funktion in JavaScript nicht verfügbar, gäbe es eine Alternative: die klassische Konkatenation mit dem `+`-Operator: 

```
const greeting = 'Hello';

// + operator
const welcome = greeting + ' React';
console.log(welcome);
// Hello React

// template literals
const anotherWelcome = `${greeting} React`;
console.log(anotherWelcome);
// Hello React
```

Öffne die Anwendung im Browser, um die Änderungen zu begutachten. Da sich die Struktur der Daten nicht geändert hat, ist es weiterhin möglich, die Liste nach dem Abrufen mit der Suchfunktion zu filtern und Element zu entfernen. Wir werden diesen Zugriff auf die Drittanbieter-API in den nächsten Abschnitten wieder bearbeiten.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Data-Fetching-with-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Impossible-States...hs/Data-Fetching-with-React?expand=1).
* Informiere dich über [Hacker News](https://news.ycombinator.com/) und deren [API](https://hn.algolia.com/api).
* Lese mehr über die [Fetch API](https://developer.mozilla.org/de/docs/Web/API/Fetch_API) zum Herstellen einer Verbindung zu Remote-APIs.
* Lese mehr zu [Template-Strings](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Template_literals).
<img src="https://vg02.met.vgwort.de/na/ea70b58c8e184d39ad24b0914f236cf4" width="1" height="1" alt="">
