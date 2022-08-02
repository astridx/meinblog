---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Inline-Handler in JSX'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-inline-handler-in-jsx
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Inline-Handler in JSX

Bei der `stories`-Liste handelt es sich um eine statuslose Variable. Wir filtern diese mit mithilfe der Suchfunktion. Dabei bleibt die Liste selbst erhalten. Wenn wir den Filter entfernen, werden erneut alle Elemente angezeigt. Dieser bewirkt nur eine vorübergehende Änderung der Anzeige.

Um die Kontrolle über die Liste zu haben, weisen wir ihr im nächsten Schritt einen Status zu. Hierzu verwenden wir den `useState`-Hook. Die zurückgegebenen Werte sind der aktuelle Status (`stories`) und die Statusaktualisierungsfunktion (`setStories`). Wir verwenden den benutzerdefinierten Hook `useSemiPersistentState` nicht, da wir die Liste nur innerhalb eines Aufrufs zwischenspeichern --- bei jedem neuen greifen wir auf die initiale zu.

```js
# start-insert
const initialStories = [
  {
    title: 'React',
    ...
  },
  {
    title: 'Redux',
    ...
  },
];
# end-insert

const useSemiPersistentState = (key, initialState) => { ... };

const App = () => {
  const [searchTerm, setSearchTerm] = ...

# start-insert
  const [stories, setStories] = React.useState(initialStories);
# end-insert

  ...
};
```

Die Anwendung verhält sich zunächst unverändert. Die jetzt von `useState` zurückgegebenen `stories` werden weiterhin in `searchedStories` gefiltert und angezeigt. Als Nächstes bearbeiten wir die Liste --- wir entfernen ein Element:

```js
const App = () => {
  ...

  const [stories, setStories] = React.useState(initialStories);

# start-insert
  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

    setStories(newStories);
  };
# end-insert

  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      ...

      <hr />

# start-insert
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
# end-insert
    </div>
  );
};
```

Der Callback-Handler `handleRemoveStory` in der App-Komponente empfängt ein Element, um es zu entfernen. Außerdem filtert er weiterhin die aktuelle Liste. Die zurückgegebenen `stories` werden dabei als neuer Status festgelegt. List übergibt die Funktion `onRemoveItem/ handleRemoveStory` an untergeordnete Komponenten --- genutzt wird `onRemoveItem` bisher nicht:

```js
# start-insert
const List = ({ list, onRemoveItem }) =>
# end-insert
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
# start-insert
      onRemoveItem={onRemoveItem}
# end-insert
    />
  ));
```

Letztendlich verwenden wir die Funktion `onRemoveItem` in der Item-Komponente. Auf diese Art und Weise wird das `item` über List an den Handler `handleRemoveStory` übergeben. Ausgelöst wird das eigentliche Ereignis über eine Schaltfläche:

```js
# start-insert
const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };
# end-insert

  return (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
# start-insert
      <span>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
# end-insert
    </div>
  );
};
```

Eine Alternative wäre es, nur die `objectID` des Elements zu übergeben. Das ist alles, was wir im Callback-Handler der App-Komponente momentan benötigen. Dies wäre aber nicht zukunftssicher. Unter Umständen benötigt der Handler später einmal mehr Informationen, um das zu löschende Item zu entfernen. Deshalb übergeben wir schon jetzt das vollständige Element und nicht nur die Kennung `objectID`, wenn wir den Handler `onRemoveItem` aufrufen.

Bisher haben wir Folgendes umgesetzt: Wir haben die Liste `stories` mithilfe des **useState-Hook** mit einem Status versehen, das Suchwort als Eigenschaft (Props) an die List-Komponente weitergegeben, einen Callback-Handler (`handleRemoveStory`) und die Funktion (`handleRemoveItem`) implementierte. Da ein Handler eine Funktion ist und in diesem Fall nichts zurückgibt, entfernen wir der Vollständigkeit halber den Blockkörper und nutzen die knappe Schreibweise.

```js
const Item = ({ item, onRemoveItem }) => {
# start-insert
  const handleRemoveItem = () =>
    onRemoveItem(item);
# end-insert

  ...
};
```

Die knappe Schreibweise verbessert den Quellcode an dieser Stelle nicht wesentlich. Manchmal überarbeite ich Handler in einer Funktionskomponente von einer Pfeilfunktion zurück zur normalen Blockansicht, um die Komponente weiterhin unkompliziert zu bearbeiten:

```js
const Item = ({ item, onRemoveItem }) => {
# start-insert
  function handleRemoveItem() {
    onRemoveItem(item);
  }
# end-insert

  ...
};
```

In diesem Abschnitt haben wir bisher Eigenschaften (Props), Handler, Callback-handler und Status angewendet. Soweit ist nichts Neues hinzugekommen. Kommen wir jetzt zum eigentlichen Thema des Abschnitts --- nachfolgend werden wir uns mit **Inline-Handlern** befassen. Mit diesen rufen wir eine Funktion direkt in JSX auf. Es gibt zwei Möglichkeiten, um `onRemoveItem` als Inline-Handler zu verwenden. Sehen wir uns zunächst die JavaScript-Methode `bind()` an:

```js
const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
# start-insert
      <button type="button" onClick={onRemoveItem.bind(null, item)}>
# end-insert
        Dismiss
      </button>
    </span>
  </div>
);
```

[`bind()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_objects/Function/bind) ermöglicht es uns, Argumente direkt an eine Funktion zu binden. Diese Argumente werden angewendet, wenn die Funktion aufgerufen wird. Die `bind()`-Methode gibt eine neue Funktion mit dem angehängten gebundenen Argument zurück.

Die zweite und beliebteste Alternative ist die Verwendung einer umgebenden Pfeilfunktion. Mit dieser ist es möglich, Argumente wie `item` zu übergeben:

```js
const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
# start-insert
      <button type="button" onClick={() => onRemoveItem(item)}>
# end-insert
        Dismiss
      </button>
    </span>
  </div>
);
```

Nachfolgend zeige ich dir eine vermeintlich schnelle Lösung. Es kommt vor, dass wir den knappen Funktionskörper einer Funktionskomponente nicht in einen Blockkörper umgestalten, um einen Handler zwischen Funktionssignatur und Return-Anweisung einzufügen. Diese Methode ist knapper. Das ist ein Vorteil. Nachteilig ist, dass sie schwieriger zu debuggen ist, denn die JavaScript-Logik ist unter Umständen im JSX verborgen. Dies wird in vollem Umfang deutlich, wenn die umgebende Pfeilfunktion mehr als eine Zeile kapselt, indem ein Blockkörper anstelle eines knappen Körpers verwendet wird. Vermeide dies:

```
const Item = ({ item, onRemoveItem }) => (
  <div>
    ...
    <span>
      <button
        type="button"
        onClick={() => {
          // Erledige eine Aufgabe

          // Hinweis: Vermeide die Verwendung komplexer Logik innerhalb von JSX

          onRemoveItem(item);
        }}
      >
        Dismiss
      </button>
    </span>
  </div>
);
```

Alle drei Handler-Versionen sind geeignete Lösungen. Der normale Handler nutzt für die Implementierungsdetails den Blockkörper der Funktionskomponente. Die beiden Inline-Handler verwenden JSX.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Inline-Handler-in-JSX).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Imperative-React...hs/Inline-Handler-in-JSX?expand=1).
* Lasse Handler, Callback-Handler und Inline-Handler Revue passieren --- gehe sie gedanklich durch.
<img src="https://vg01.met.vgwort.de/na/ae3679ec9cca4ae1ade25e174ab17f4a" width="1" height="1" alt="">