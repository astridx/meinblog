---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'CSS-Styling in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-styling-css-styling
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

# CSS-Styling in React

Es gibt viele Möglichkeiten, eine React-Anwendung zu gestalten, und es gibt ausgiebige Debatten über die effektivste **Styling-Strategie** und den unübertrefflichen **Styling-Ansatz**. Wir werden einige dieser Methoden durchgehen. Wie überall im Leben gibt es für jede Sichtweise Vor- und Nachteile. Bei meinen Ausführungen gehe ich nebenbei darauf ein, wie Entwickler und Teams herausfinde, was für sie am besten passt.

Wir fangen mit allgemeinem CSS an und sehen uns dann fortgeschrittene Alternativen an: **CSS-in-CSS** (**CSS Modules**) und **CSS-in-JS** (**Styled Components**). Dies sind nur zwei von vielen Techniken. Außerdem lernst du, wie du skalierbare Vektorgrafiken (SVGs) in deine React-Anwendung integrierst, zum Beispiel ein Logo oder Icons.

![](../images/css-style-strategies.png)

Wähle eine [beliebte Bibliothek](https://www.robinwieruch.de/react-libraries#styling-libraries-in-react), wenn du planst allgemeine UI-Komponenten (beispielsweise eine Schaltfläche, ein Dialog oder ein Auswahlfeld) nicht selbst einzufügen. Bedenke dabei aber: Du weißt was du hast und befindest dich auf einer soliden Basis, wenn diese Komponenten eigenhändig erstellst. Daher werden wir hier im Buch keine der UI-Komponentenbibliotheken nutzen.

![](../images/ui-library.png)

Die nachfolgenden Ansätze für das Styling sind in der *Create React App* vorkonfiguriert. Wenn du die Build-Tools (beispielsweise Webpack) selbst verwaltest, sind unter Umständen weitere Konfigurationsschritte erforderlich. Da wir die *Create React App* verwenden, nutzen wir alles als Assets.

## CSS in React

CSS in React ähnelt dem Standard-CSS. Webanwendungen nutzen `class`-Attribute in HTML-Elementen, welche später mit Eigenschaften konkretisiert werden. Dies ist in React ähnlich. Hier heißt dieses Attribut `className`.

```js
const App = () => {
  ...

  return (
# start-insert
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>
# end-insert

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};
```

Das HTML-Element `<hr />` haben ich entfernt, da CSS sich zukünftig um das Aussehen der Umrandung kümmern wird. In der Vergangenheit wurden Inhalte aus semantischen (bedeutungsmäßigen) und gestalterischen Gründen mittels [`<hr />`](https://wiki.selfhtml.org/index.php?title=HTML/Textstrukturierung/hr&oldid=55963) getrennt. Heute dienen HTML-Element ausschließlich er [semantischen Strukturierung](https://wiki.selfhtml.org/index.php?title=HTML&oldid=61624). Verwende immer CSS, um zwei Bereiche aus gestalterischen Gründen zu trennen. Importieren dazu die CSS-Datei, die in der *Create React App* für uns vorbereitet ist:

```js
import React from 'react';
import axios from 'axios';

# start-insert
import './App.css';
# end-insert
```

In der *src/App.css*-Datei definieren wir die CSS-Klassen, die wir später in der App-Komponente verwenden:

{title="src/App.css",lang="css"}
```
.container {
  height: 100vw;
  padding: 20px;

  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
}

.headline-primary {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
}
```

Öffne deine Anwendung im Browser und sieh dir an, wie die ersten Stile die Ausgabe verändern. Als Nächstes stylen wir die Item-Komponente. Einige ihrer Elemente erhalten das Attribut `className`. Beachte: Wir verwenden hier eine neue Styling-Technik:

```js
const Item = ({ item, onRemoveItem }) => (
# start-insert
  <div className="item">
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
      <button
        type="button"
        onClick={() => onRemoveItem(item)}
# start-insert
        className="button button_small"
# end-insert
      >
        Dismiss
      </button>
    </span>
  </div>
);
```

Wie du siehst, ist es möglich, das `style`-Attribut direkt bei einem HTML-Elemente einzufügen. JSX übergibt den Stil als Inline-Objekt. So definieren wir dynamisch Stileigenschaften in JavaScript anstatt statische in CSS. Dieser Ansatz wird als **Inline-Stil** bezeichnet. Verwende den Inline-Stil sparsam, da eine separate Stildefinition dein JSX präziser hält. Außerdem ist die Trennung von [Inhalt und Design](https://wiki.selfhtml.org/index.php?title=HTML/Tutorials/Trennung_von_Inhalt,_Pr%C3%A4sentation_und_Verhalten&oldid=64476) besserer Programmierstil.

Definiere in der Datei *src/App.css* die neuen CSS-Klassen. Erweiterte CSS-Funktionen --- beispielsweise Verschachtelung oder Sass --- sind in diesem Beispiel nicht enthalten. Hierbei handelt es sich um [optionale Konfigurationen](https://create-react-app.dev/docs/adding-a-sass-stylesheet/). 

{title="src/App.css",lang="css"}
```
.item {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
}

.item > span {
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item > span > a {
  color: inherit;
}
```

Der Stil für die Schaltflächen fehlt. Daher definieren wir einen Basisstil und zwei spezifische Stile (small und large). Einen verwenden wir im nächsten Schritt, den andere heben wir uns für später auf:

{title="src/App.css",lang="css"}
```
.button {
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;

  transition: all 0.1s ease-in;
}

.button:hover {
  background: #171212;
  color: #ffffff;
}

.button_small {
  padding: 5px;
}

.button_large {
  padding: 10px;
}
```

Neben den Styling-Ansätzen sind Namenskonventionen ([CSS-Richtlinien](https://developer.mozilla.org/de/docs/MDN/Contribute/Guidelines/Code_guidelines/CSS)) ein Thema. Das letzte CSS-Snippet folgte den [BEM](http://getbem.com/naming/)-Regeln. Dies erkennst du an den Unterstrichen (`_`). Wähle für dich die Namenskonvention, die zu dir und deinem Team passt. Dies ist subjektiv und individuell. Stylen wir die nächste React-Komponente:

```js
const SearchForm = ({ ... }) => (
# start-insert
  <form onSubmit={onSearchSubmit} className="search-form">
# end-insert
    <InputWithLabel ... >
      <strong>Search:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
# start-insert
      className="button button_large"
# end-insert
    >
      Submit
    </button>
  </form>
);
```

Es ist möglich das Attribut `className` als Eigenschaft (Props) an eine Komponente zu übergeben. Dies siehst du im nächsten Beispiel. Auf diese Art übergibst du SearchForm einen flexiblen Stil. Wähle dabei aus einer Anzahl von Klassen, die in der CSS-Datei vordefiniert sind. Abschließend formatieren wir InputWithLabel:

```js
const InputWithLabel = ({ ... }) => {
  ...

  return (
    <>
# start-insert
      <label htmlFor={id} className="label">
# end-insert
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
# start-insert
        className="input"
# end-insert
      />
    </>
  );
};
```

Ergänze die restlichen Klassen in der *src/App.css*-Datei:

{title="src/App.css",lang="css"}
```
.search-form {
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
}

.label {
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
}

.input {
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;

  font-size: 24px;
}
```

Der Einfachheit halber haben wir `label` und `input` einzeln in der Datei *src/App.css* gestylt. In einer realen Anwendung ist es besser, diese allgemeinen Elemente einmal global in *src/index.css* zu definieren. Da React-Komponenten normalerweise in mehrere Dateien aufgeteilt sind, erleichtert eine überlegte und strukturierte gemeinsame Verwendung von Stilen die Verwaltung der Website auf lange Sicht enorm.

Soweit zum grundlegenden CSS, das die meisten von uns kennen und das ich hier mit einem dynamischeren Inline-Stil kombiniert habe. Aus eigener Erfahrung weiß ich, dass die Arbeit mit komplexen Websites ohne erweiterte Techniken wie [Sass](https://sass-lang.com/)(Syntactically Awesome Style Sheets) aufwendig ist, da pures CSS Vereinfachungen wie Verschachtelung nicht unterstützt. Im folgenden gehe ich deshalb auf diese Techniken ein.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/CSS-in-React).
  * Reflektiere die [Änderungen](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/CSS-in-React?expand=1).
* Lese mehr zum Thema [CSS-Stylesheets in der Create React App](https://create-react-app.dev/docs/adding-a-stylesheet).
* Lese mehr zu [Sass in der Create React App](https://create-react-app.dev/docs/adding-a-sass-stylesheet) um erweiterte CSS-Funktionen wie das Verschachteln zu nutzen.
* Übergib die Eigenschaft `className` von der App an die SearchForm-Komponente. Verwende hierzu entweder den Wert `button_small` oder `button_large`. Setze diese als `className` für die Schaltfläche ein.
* Informiere dich weiter über [CSS in React](https://www.robinwieruch.de/react-css-styling).
<img src="https://vg01.met.vgwort.de/na/7f30e3c5befe48edb02ab9ab59007a5c" width="1" height="1" alt="">