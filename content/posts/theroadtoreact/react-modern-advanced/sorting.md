---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'React in der Praxis (fortgeschrittene Anleitung)'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-advanced-praxis
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

# React in der Praxis (fortgeschrittene Anleitung)

Wir haben in den vorausgehenden Kapiteln die Grundlagen von React erarbeitet. Nebenbei haben wir in der Vergangenheit genutzte Funktionen und Techniken zur Wartung behandelt. Jetzt ist es Zeit, dass wir uns mit der Entwicklung realer Anwendungen befassen. Jeder der folgenden Abschnitte enthält eine Aufgabe. Versuche, diese ohne die *optionalen Hinweise* zu lösen. Vieles ist nicht trivial. Du wirst dich herausgefordert fühlen. So lernst du am meisten. Verwende die *optionalen Hinweise*, um deinen Lösungsweg mit meinem abzugleichen --- oder, wenn du Hilfe benötigst.

## Sortierung

**Aufgabe:** Das Arbeiten mit einer Liste von Elementen beinhalte in der Regel Funktionen, die einem Benutzer den Zugriff auf die Daten erleichtern. Bisher wird jeder Artikel aufgelistet. Erweitern wir die Benutzerfreundlichkeit, indem wir eine Sortierung ermöglichen. Je nachdem welche Eigenschaft dem Benutzer wichtig ist, wird die Liste nach Titel, Autor, Kommentaren oder Punkten sortiert. Fürs Erste reicht es, wenn du die Sortierung in eine Richtung implementierst. Im nächsten Kapitel ermöglichen wir es, diese umzukehren.

**Optionale Hinweise:**

* Führe einen Sortierstatus in die App- oder Listenkomponente ein.
* Implementiere für jede Eigenschaft (`title`, `author`, `points`, `num_comments`) eine HTML-Schaltfläche, die den Sortierstatus festlegt.
* Verwende den Sortierstatus, um eine entsprechende Sortierfunktion auf die Liste anzuwenden.
* Verwende eine externe Bibliothek wie [Lodash](https://lodash.com/) um die Funktion  `sortBy` zu implementieren.

![](../images/sort.png)

Wir behandeln die Liste wie eine Tabelle. Jede Zeile repräsentiert ein Element und jede Spalte die Eigenschaften. Die Überschriften der Spalten sind Orientierungshilfen:

```js
# start-insert
const List = ({ list, onRemoveItem }) => (
  <div>
    <div style={{ display: 'flex' }}>
      <span style={{ width: '40%' }}>Title</span>
      <span style={{ width: '30%' }}>Author</span>
      <span style={{ width: '10%' }}>Comments</span>
      <span style={{ width: '10%' }}>Points</span>
      <span style={{ width: '10%' }}>Actions</span>
    </div>

    {list.map(item => (
# end-insert
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
# start-insert
    ))}
  </div>
);
# end-insert
```

Wir verwenden der Einfachheit halber Inline-CSS. Gib den Zeilen in der Item-Komponente ein Layout, um dieses mit den Kopfzeilen abzugleichen:

```js
const Item = ({ item, onRemoveItem }) => (
# start-insert
  <div style={{ display: 'flex' }}>
    <span style={{ width: '40%' }}>
# end-insert
      <a href={item.url}>{item.title}</a>
    </span>
# start-insert
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
# end-insert
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);
```

In der laufenden Implementierung werden ich der Übersicht halber die Inline-CSS-Stilattribute entfernen. Behalte du diese aber gerne in deiner Anwendung bei.

Die List-Komponente verwaltet den Sortierstatus. Dieser wird mit dem Status `'NONE'` initialisiert, so werden die Listenelemente in der Reihenfolge angezeigt, in der sie die API ausgibt. Außerdem habe ich einen neuen Handler hinzugefügt, um den Sortierstatus mit einem spezifischen Schlüssel festzulegen.

```js
# start-insert
const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState('NONE');

  const handleSort = sortKey => {
    setSort(sortKey);
  };

  return (
# end-insert
    ...
# start-insert
  );
};
# end-insert
```

Lege in der Kopfzeile der List-Komponente mithilfe der Schaltflächen den Sortierstatus für jede Eigenschaft fest. Ein Inline-Handler wird verwendet, um den spezifischen Schlüssel (`sortKey`) einzugeben. Wenn du auf die Schaltfläche für die Spalte "Title" klickst, wird `'TITLE'` zum neuen Sortierstatus.

```js
const List = ({ list, onRemoveItem }) => {
  ...

  return (
    <div>
      <div>
        <span>
# start-insert
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
# end-insert
        </span>
        <span>
# start-insert
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
# end-insert
        </span>
        <span>
# start-insert
          <button type="button" onClick={() => handleSort('COMMENT')}>
            Comments
          </button>
# end-insert
        </span>
        <span>
# start-insert
          <button type="button" onClick={() => handleSort('POINT')}>
            Points
          </button>
# end-insert
        </span>
        <span>Actions</span>
      </div>

      {list.map(item => ... )}
    </div>
  );
};
```

Die Statusverwaltung für die neue Funktion ist implementiert, aber wir sehen keine Änderung, wenn wir auf eine Schaltfläche klicken. Dies ist so, weil der Sortiermechanismus nicht auf `list` angewendet wird.

Das Sortieren eines Arrays mit JavaScript ist nicht trivial, da jedes JavaScript-Grundelement (z. B. Zeichenfolge, Boolescher Wert, Zahl) Besonderheiten vorweist. Deshalb erfinden wir das Rad nicht neu, sondern verwenden eine vorhandene Lösung: [Lodash](https://lodash.com/). Installiere die externe Bibliothek über die Befehlszeile:

{title="Command Line",lang="text"}
```
npm install lodash
```

Importiere dann die Funktion:

```js
import React from 'react';
import axios from 'axios';
# start-insert
import { sortBy } from 'lodash';
# end-insert

...
```

Erstelle danach ein JavaScript-Objekt mit allen möglichen Zuordnungen von `sortKey` zu einer Suchfunktion. Jeder Sortierschlüssel ist einer Funktion zugeordnet, welche `list` sortiert. Durch Sortieren nach `'NONE'` wird die unsortierte Liste zurückgegeben. Beim Sortieren nach `'POINT'` wird die Liste anhand der Eigenschaft `points` sortiert zurückgegeben.

```js
# start-insert
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENT: list => sortBy(list, 'num_comments').reverse(),
  POINT: list => sortBy(list, 'points').reverse(),
};
# end-insert

const List = ({ list, onRemoveItem }) => {
  ...
};
```

Mit dem Status `sort` (`sortKey`) und den Sortiervariationen `SORTS` sortieren wir die Liste, bevor wir sie der Item-Komponente zuordnen:

```js
const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = React.useState('NONE');

  const handleSort = sortKey => {
    setSort(sortKey);
  };

# start-insert
  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);
# end-insert

  return (
    <div>
      ...

# start-insert
      {sortedList.map(item => (
# end-insert
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};
```

Fertig! Was haben wir genau umgesetzt? Zuerst erstellten wir die Sortierfunktion mithilfe eines `sortKey` (Status). Anschließend wendeten wir die Funktion auf die Liste an, bevor wir sie zum Rendern jedem Item zuordneten. Der anfängliche Sortierstatus ist `'NONE'`, was bedeutet, dass nichts sortiert wird.

Wir haben Schaltflächen inklusive Implementierungsdetails erstellt, um unseren Benutzern die Interaktion zu ermöglichen. Dabei verwenden wir den Sortierstatus, um die Liste zu sortieren.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Sort).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des ersten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/Sort?expand=1).
* Lese mehr über [Lodash](https://lodash.com/).
* Warum verwenden wir bei der Sortierung von numerischen Eigenschaften wie `points` und `num_comments` die umgekehrte Reihenfolge?
* Zeige dem Benutzer, welche Sortierung aktiv ist. Implementiere dies auf eine unkomplizierte Art und Weise. Beispielsweise reichte es aus, der zuletzt angeklickten Schaltfläche eine andere Farbe zuzuweisen.
<img src="https://vg01.met.vgwort.de/na/dc595af270434557a7710b4637d9affd" width="1" height="1" alt="">