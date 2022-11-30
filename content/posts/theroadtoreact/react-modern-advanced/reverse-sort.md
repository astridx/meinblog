---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Umgekehrte Sortierung'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-advanced-umgekehrte-sortierung
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Umgekehrte Sortierung

**Aufgabe:** Die Sortierung funktioniert in eine Richtung. Erweitere diese Funktion. Wechsele zwischen aufsteigender und absteigender Sortierung, wenn jemand auf die Schaltfläche klickt.

**Optionale Hinweise:**

* Überlege, ob die umgekehrte Sortierung mithilfe eines Status realisierbar ist, beispielsweise `isReverse` neben `sortKey`.
* Setze den neuen Status im Handler `handleSort` basierend auf der vorherigen Sortierung.
* Verwende den neuen Status `isReverse`, um die Liste in zwei Richtungen zu sortieren.

Die anfängliche Sortierrichtung funktioniert für Zeichenfolgen und numerische Werte. Als Erstes brauchen wir einen weiteren Zustand, um zu verfolgen, ob die Sortierung umgekehrt oder normal ist:

```js
const List = ({ list, onRemoveItem }) => {
# start-insert
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });
# end-insert

  ...
};
```

Erweitere als Nächstes die Sortierlogik. Prüfe, ob normal oder entgegengesetzt sortiert wird. Wenn der `sortKey` mit dem im Status identisch ist, handelt es sich um eine umgekehrte Sortierung, wenn der Sortierstatus nicht vorher schon andersherum war:

```js
const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
# start-insert
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey: sortKey, isReverse: isReverse });
# end-insert
  };

# start-insert
  const sortFunction = SORTS[sort.sortKey];
# end-insert
  const sortedList = sortFunction(list);

  return (
    ...
  );
};
```

Wende abhängig vom neuen Status `isReverse` die Sortierfunktion mit oder ohne der JavaScript-Umkehrmethode an:

```js
const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

# start-insert
    setSort({ sortKey, isReverse });
# end-insert
  };

  const sortFunction = SORTS[sort.sortKey];

# start-insert
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);
# end-insert

  return (
    ...
  );
};
```

Die umgekehrte Sortierung ist jetzt bereit. Für das an die Statusaktualisierungsfunktion übergebene Objekt verwenden wir die **Objekt Initialisierer Kurzschreibweise**:

```js
const firstName = 'Robin';

const user = {
  firstName: firstName,
};

console.log(user);
// { firstName: "Robin" }
```

Lasse das Schlüssel/Wert-Paar weg, wenn der Eigenschaftsname im Objekt mit dem Variablennamen übereinstimmt. Nutze in dem Fall ausschließlich den Namen:

```js
const firstName = 'Robin';

const user = {
  firstName,
};

console.log(user);
// { firstName: "Robin" }
```

Lese mehr über [Objekt Initialisierer](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Object_initializer) falls du diese nicht kennst.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Reverse-Sort).
  * Reflektiere die [Änderungen gegenüber dem letzten Kapitel](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Sort...hs/Reverse-Sort?expand=1).
* Überlege, welche Nachteile es hat, den Sortierstatus in der Liste anstelle der App-Komponente zu behalten. Wenn du keine Idee hast, dann sortiere die Liste nach "Titel" und bestätige danach die Suche. Was ist anders, wenn der Sortierstatus in der App-Komponente verwaltet wird?
* Zeige dem Benutzer in welcher Form eine Sortierung aktiv ist. Verwende neben jeder aktiven Sortierschaltfläche einen [Pfeil](https://www.flaticon.com/packs/arrow-set-2), der die Richtung anzeigt.
<img src="https://vg01.met.vgwort.de/na/07956cc1742347729cba3fdf276d6684" width="1" height="1" alt="">
