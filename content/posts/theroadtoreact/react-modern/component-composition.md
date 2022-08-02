---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Komponenten Komposition in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-komponenten-komposition
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Komponenten Komposition in React

In diesem Abschnitt lernst du, wie du ein Element in React auf dieselbe Weise wie in HTML verwendest --- mit einem öffnenden und schließenden Tag:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
# start-insert
      >
        Search:
      </InputWithLabel>
# end-insert

      ...
    </div>
  );
};
```

Im obigen Beispiel fügen wir den Text "Search" direkt zwischen die Tags der Komponente ein. In InputWithLabel hast du über die **React-Eigenschaft children** Zugriff auf diese Information. Verwende anstelle von `label` `children`, um alles, was von oben weitergegeben wird, an der gewünschten Stelle anzuzeigen. Wenn die Komponente mehrere Kinder hat, werden diese in einem Array übergeben. InputWithLabel hat nur ein Kind, das ist direkt verwendbar --- wir verwenden `children` anstelle von `children[0]`:

```js
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
# start-insert
  children,
# end-insert
}) => (
  <>
# start-insert
    <label htmlFor={id}>{children}</label>
# end-insert
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);
```

Jetzt verhalten sich die Elemente der React-Komponente ähnlich wie natives HTML. Alles, was innerhalb der Komponente eingefügt ist, ist als Kind `children` verwendbar und somit renderbar. Du wirst sehen, du freust dich bei der Verwendung einer React-Komponente oft über Einflussmöglichkeiten auf das, was in ihr passiert:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
# start-insert
        <strong>Search:</strong>
# end-insert
      </InputWithLabel>

      ...
    </div>
  );
};
```

Mit diesem Feature ist es möglich React-Komponenten je nach Wunsch zusammenzustellen. Im Beispiel nutzen wir einen JavaScript-String und einen String, der in ein HTML-Element `<strong>` eingeschlossen ist. Dies ist nur ein kleiner Ausblick auf das Machbare. Es ist möglich ganze Komponenten mithilfe von React-`children` zu übergeben.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Component-Composition).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Reusable-React-Component...hs/React-Component-Composition?expand=1).
* Lese mehr über die Komposition von Komponenten in React ([0](https://www.robinwieruch.de/react-component-composition), [1](https://de.reactjs.org/docs/composition-vs-inheritance.html)).
* Erstelle eine Komponente, die einen String rendert und übergib diese mittels `children` an  InputWithLabel.
<img src="https://vg07.met.vgwort.de/na/0029b94c6849494ca7d80a881611eff3" width="1" height="1" alt="">