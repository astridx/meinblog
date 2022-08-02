---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Memoized Handler in React (fortgeschrittene Anleitung)'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-memoized
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Memoized Handler in React (fortgeschrittene Anleitung)

In den vorherigen Abschnitten hast du einiges über Handler allgemein, Callback-Handler und Inline-Handler erfahren. In diesem Kapitel stelle ich dir **Memoized Handler** vor. [Memoisation](https://de.wikipedia.org/wiki/Memoisation) ist eine Technik zur Beschleunigung von Software, indem Rückgabewerte von Funktionen zwischengespeichert anstatt neu berechnet werden. Wir verschieben die gesamte Datenabruflogik in eine eigenständige Funktion außerhalb des Seiten-Effekts (A). Umgeben diese mit einem `useCallback`-Hook (B) und rufen sie im `useEffect`-Hook (C) auf:

```js
const App = () => {
  ...

  // A
# start-insert
  const handleFetchStories = React.useCallback(() => { // B
# end-insert
    if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
# start-insert
  }, [searchTerm]); // E
# end-insert

  React.useEffect(() => {
# start-insert
    handleFetchStories(); // C
  }, [handleFetchStories]); // D
# end-insert

  ...
};
```

Das Verhalten der Anwendung ändert sich nicht. Ausschließlich die Implementierungslogik wurde überarbeitet. Vorher war die Datenabruflogik anonym als Seiten-Effekt implementiert. Jetzt ist sie als Funktion für die Anwendung verfügbar.

Untersuchen wir als Nächstes, ob der `useCallback`-Hook weiterhin benötigt wird. Dieser Hook erstellt jedes Mal eine `memoized`-Funktion, wenn sich das Abhängigkeitsarray (E) ändert. Als Folge dessen wird der `useEffect`-Hook erneut aufgerufen (C), da er von der neuen Funktion (D) abhängt:

{title="Visualization",lang="javascript"}
```
1. ändern: searchTerm
2. implizite Änderung: handleFetchStories
3. Aufruf: Seiten-Effekt
```

Wenn wir mit dem `useCallback`-Hook keine `memoized`-Funktion erstellten, würde bei jedem neuen Rendern der App-Komponente eine neue `handleFetchStories`-Funktion erstellt und im `useEffect`-Hook aufgerufen, um Daten abzurufen. Die abgerufenen Daten würden als Status in der Komponente gespeichert. Da sich der Status der Komponente geändert hat, würde diese neu gerendert und eine neue Funktion `handleFetchStories` erstellt. Der Seiten-Effekt würde ausgelöst, um Daten abzurufen, und wir finden uns in einer Endlosschleife wieder:

{title="Visualization",lang="javascript"}
```
1. definieren: handleFetchStories
2. Aufruf: Seiten-Effekt
3. Update: Status
4. rendern: Komponente
5. neu definieren: handleFetchStories
6. Aufruf: Seiten-Effekt
...
```

In diese Schleife geraten wir nicht, denn der `useCallback`-Hook erstellt nur dann eine neue `memoized`-Funktion, wenn sich der Suchbegriff ändert. In diesem Fall ist es uns wichtig, dass die Daten erneut abgerufen werden, damit die gerenderte Liste jederzeit zum Suchwort passt.

Durch Verschieben der Datenabruffunktion `handleFetchStories` an eine Stelle außerhalb des `useEffect`-Hook ist diese für andere Teile der Anwendung wiederverwendbar. Wir verwenden sie bisher nicht wieder, aber es wäre möglich. Der `useEffect`-Hook wird implizit aufgerufen, wenn sich `searchTerm` ändert, da `handleFetchStories` immer dann neu definiert wird. Da der `useEffect`-Hook von `handleFetchStories` abhängt, wird der Seiten-Effekt bei jedem Datenabruf aufgerufen.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Memoized-Handler-in-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Data-Re-Fetching-in-React...hs/Memoized-Handler-in-React?expand=1).
* Lese mehr über [Reacts useCallback Hook](https://de.reactjs.org/docs/hooks-reference.html#usecallback).
<img src="https://vg01.met.vgwort.de/na/0374a6a984dc441b85c7c7dd6e521f4e" width="1" height="1" alt="">