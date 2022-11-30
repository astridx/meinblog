---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Async/Await in React (fortgeschrittene Anleitung)'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-async-await
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Async/Await in React (fortgeschrittene Anleitung)

Wirst du häufig mit asynchronen Daten arbeiten? Dann ist es hilfreich, wenn du die alternative Syntax für die Behandlung von Promise-Objekten kennst: async/await. Aus diesem Grund habe ich die Funktion `handleFetchStories` in unserem Beispiel überarbeitet. Mein [Refactoring](https://de.wikipedia.org/wiki/Refactoring) zeigt dir, wie du idealerweise vorgehst. Eine Fehlerbehandlung lasse ich im ersten Schritt der Übersicht halber außen vor:

```js
const App = () => {
  ...

# start-insert
  const handleFetchStories = React.useCallback(async () => {
# end-insert
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

# start-insert
    const result = await axios.get(url);
# end-insert

# start-insert
    dispatchStories({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits,
    });
# end-insert
  }, [url]);

  ...
};
```

Unsere Funktion verwendet das Schlüsselwort `async`. Dies schafft die Grundlage für die Verwendung von async/await. Sobald du `await` einsetzt, verhält sich alles analog zu synchronem Code. Die Anweisungen, die hinter `await` steht, werden erst aufgerufen, wenn das (in axios gekapselte) Promise-Objekt aufgelöst wurde und somit sein Ergebnis vorliegt. Dies bedeutet, dass der Code wartet --- wie das Wort `await` vermuten lässt.

```js
const App = () => {
  ...

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

# start-insert
    try {
# end-insert
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
# start-insert
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
# end-insert
  }, [url]);

  ...
};
```

Mithilfe von `try` und `catch` haben wir im zweiten Schritt die Fehlerbehandlung integriert. Wenn im `try`-Block etwas nicht korrekt abläuft, springt der Code in den` catch`-Block. Der Code hier ist einzig und allein dazu da, den Fehler abzufangen --- ihn zu korrigieren. Neben [async/await mit try/catch-Blöcken](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Kontrollfluss_und_Fehlerbehandlung#try-catch) ist [die then()-Methode](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) für die Behandlung von Fehlern in asynchronen Daten möglich.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Async-Await-in-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Third-Party-Libraries-in-React...hs/Async-Await-in-React?expand=1).
* Informiere dich über [Data-Fetching in React](https://www.robinwieruch.de/react-hooks-fetch-data).
* Lese mehr zu [async/await in JavaScript](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/async_function).
<img src="https://vg07.met.vgwort.de/na/be00f7cd4c4a42889547c107302b34a2" width="1" height="1" alt="">