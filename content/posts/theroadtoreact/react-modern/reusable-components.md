---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Wiederverwendbare Komponenten in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-wiederverwendbare-komponenten
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Wiederverwendbare Komponenten in React

Schaue dir die Suchkomponente genauer an. Das Label-Element hat den Text "Search: ". Das `id/htmlFor-Attribut` hat die Kennung `search`. Der Wert heißt `search` und der Callback-Handler hat den Namen `onSearch`. Du siehst: Die Komponente ist in hohem Maße mit der Suchfunktion gekoppelt. Das macht sie für den Rest der Anwendung und für nichtsuchbezogene Aufgaben wertlos. Außerdem besteht die Gefahr, dass Fehler auftreten, wenn zwei dieser Suchkomponenten nebeneinander gerendert werden, da die Kombination aus `htmlFor` und `id` dupliziert wird. Im Übrigen wird der Fokus nicht immer korrekt gesetzt, wenn der Benutzer auf eines der Labels klickt.

Probiere es aus, um dir dies praktisch anzusehen:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />

# start-insert
	  <Search search={searchTerm} onSearch={handleSearch} />
# end-insert
		  
    </div>
  );

  ...
};
```

Da die Suchkomponente keine tatsächliche "Such"-Funktionalität hat, ist sie leicht verallgemeinerbar. In einer allgemeineren Form wäre sie für den Rest der Anwendung besser wiederverwendbar. Deshalb geben wir der Suchkomponente zusätzlich die Eigenschaften (Props) `id` und `label` und benennen den Wert, den Callback-Handler und die Komponente um. Wir geben allen einen allgemeineren Namen:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

# start-insert
      <InputWithLabel
        id="search"
        label="Search"
# end-insert
        value={searchTerm}
# start-insert
        onInputChange={handleSearch}
# end-insert
      />

      ...
    </div>
  );
};

# start-insert
const InputWithLabel = ({ id, label, value, onInputChange }) => (
# end-insert
  <>
# start-insert
    <label htmlFor={id}>{label}</label>
    &nbsp;
# end-insert
    <input
# start-insert
      id={id}
# end-insert
      type="text"
      value={value}
# start-insert
      onChange={onInputChange}
# end-insert
    />
  </>
);
```

Unsere Komponente ist in Bezug auf die Wiederverwendbarkeit weiterhin verbesserungsfähig. Falls wir ein Eingabefeld für [Daten](https://developer.mozilla.org/de/docs/Web/HTML/Element/input#Arten_des_%3Cinput%3E-Elements) wie eine E-Mail-Adresse (`email`) oder eine Telefonnummer (`tel`) wünschen, ist es notwendig, dass das Attribut `type` des Eingabefelds von außen zugänglich ist:

```js
const InputWithLabel = ({
  id,
  label,
  value,
# start-insert
  type = 'text',
# end-insert
  onInputChange,
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input
      id={id}
# start-insert
      type={type}
# end-insert
      value={value}
      onChange={onInputChange}
    />
  </>
);
```

Von der App-Komponente wird keine `type`-Eigenschaft (Props) an InputWithLabel übergeben, sodass dies nicht von außen festgelegt ist. Das Eingabefeld übernimmt den [Standard-Funktionsparameter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/Default_parameters), den wir statisch in der Funktionssignatur eingefügt haben.

Mit nur wenigen Änderungen haben wir eine spezialisierte Suchkomponente in eine wiederverwendbarere Komponente verwandelt. Wir haben die Namen verallgemeinert und die API erweitert. So werden alle erforderlichen Informationen von außen bereitgestellt. Wir verwenden die Komponente bisher an keiner anderen Stelle. Ab jetzt wäre dies unkompliziert möglich, weil alle notwendigen Voraussetzungen gegeben sind.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Reusable-React-Component).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Fragments...hs/Reusable-React-Component?expand=1).
* Lese mehr zum Thema [Wiederverwendebare Komponenten in React](https://www.robinwieruch.de/react-reusable-components).
* Ist es dir aufgefallen: Bisher haben wir den Text "Search:" mit einem ":" verwendet. Welche Möglichkeiten haben wir jetzt mit der wiederverwendbareren Version der Komponente? Würdest du `label="Search:"` als Eigenschaft (Props) an InputWithLabel übergeben oder den Doppelpunkt in InputWithLabel mit `<label htmlFor={id}>{label}:</label>` fest codieren? Wir werden diese Frage später im Buch erneut aufgreifen.
<img src="https://vg01.met.vgwort.de/na/d915a12655ee4c1f80f39e30b9f39085" width="1" height="1" alt="">
