---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Imperative Programmierung in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-imperative-programmierung
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Imperative Programmierung in React

React ist von Hause aus deklarativ. Das gilt für JSX genauso wie für die Hooks. In JSX teilen wir React mit, *was* und nicht *wie* etwas gerendert wird. Mit einem React-Seiten-Effekt (useEffect) drücken wir aus, *was* mit einem Ereignis erreicht wird, statt *wie* dies geschieht. Das ist so wie wir es in React erwarten. Aber: Es gibt Szenarien, in denen wir gerne auf imperative Art und Weise auf ein Element zugreifen. Zum Beispiel:

* Lese- / Schreibzugriff auf Elemente über die DOM-API:
  * Messen (Lesen) der Breite oder Höhe eines Elements
  * Einstellen (Schreiben) des Fokusstatus eines Eingabefelds
* Implementierung komplexerer Animationen:
  * Übergänge einstellen.
  * Übergängen aufeinander abstimmen.
* Integration von Bibliotheken von Drittanbietern:
  * [D3] (https://d3js.org/) ist eine beliebte imperative Bibliothek zur Bearbeitung von Diagrammen.

Die imperative Programmierung in React ist ausführlich und nicht immer intuitiv. In diesem Abschnitt durchdenken wir ein kleines Beispiel. Ziel ist es, den Fokus eines Eingabefelds zu setzen. Bei der deklarativen Methode reicht es auf den ersten Blick aus, das `autoFocus`-Attribut des Eingabefelds festzulegen:

```js
const InputWithLabel = ({ ... }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
# start-insert
      autoFocus
# end-insert
      onChange={onInputChange}
    />
  </>
);
```

Auf den zweiten Blick funktioniert dies nur, wenn eine Komponente einmal gerendert wird. Wenn die App aber beispielsweise zwei InputWithLabel rendert, erhält die zuletzt gerenderte Komponente den Autofokus. Dies korrigieren wir, indem wir eine Eigenschaft (Props) übergeben und den Entwickler entscheiden lassen, ob das Eingabefeld den Autofokus erhält oder nicht:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
# start-insert
        isFocused
# end-insert
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      ...
    </div>
  );
};
```

`isFocused` als Attribut entspricht `isFocused={true}`. Verwende innerhalb der Komponente die neue Eigenschaft (Props)  anstelle von `autoFocus` für das Eingabefeld:

```js
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
# start-insert
  isFocused,
# end-insert
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
# start-insert
      autoFocus={isFocused}
# end-insert
      onChange={onInputChange}
    />
  </>
);
```

Die Funktion erfüllt ihren Zweck, es handelt sich weiterhin um eine deklarative Implementierung. Wir teilen React mit, *was* zu erledigen ist und nicht *wie* es zu erledigen ist. Auch wenn dies mit dem deklarativen Ansatz möglich ist, gestalten wir dieses Szenario in eine imperative Version um. Denn: Unser Ziel ist es, die Methode `focus()` programmgesteuert über die DOM-API des Eingabefelds auszuführen, sobald dieses gerendert ist:

```js
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
# start-insert
  // A
  const inputRef = React.useRef();
# end-insert

# start-insert
  // C
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);
# end-insert

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
# start-insert
       {/* B */}
# end-insert
      <input
# start-insert
        ref={inputRef}
# end-insert
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};
```

Alle wesentlichen Punkte habe ich mit Kommentaren im obigen Codebeispiel gekennzeichnet und nachfolgend Schritt für Schritt erklärt:

* (A) Erstelle zuerst ein `ref`-Objekt mit Hilfe des **useRef-Hooks**. Dieses Objekt ist ein persistenter Wert, der über die Lebensdauer einer React-Komponente hinaus erhalten bleibt. Es kommt mit einer Eigenschaft namens `current`, die im Gegensatz zum `ref`-Objekt selbst änderbar ist.
* (B) Das `ref`-Objekt wird an das JSX-reservierte `ref`-Attribut des Eingabefelds übergeben (und die Elementinstanz wird der veränderbaren `current`-Eigenschaft zugewiesen).
* (C) Du hast jetzt die Option den **useRef-Hook** für den Lebenszyklus zu nutzen. Setzte den Fokus auf das Eingabefeld, wenn die Komponente gerendert wird (oder wenn sich ihre Abhängigkeiten ändern).
* (D) Da das `ref`-Objekt an das `ref`-Attribut des Eingabefelds übergeben wird, ermöglicht die `current`-Eigenschaft den Zugriff auf das Element. Setze den Fokus programmgesteuert als Seiten-Effekt, wenn `isFocused` festgelegt ist und die Eigenschaft `current` vorhanden ist.

Dies war ein Beispiel für den Wechsel von der deklarativen zur imperativen Programmierung in React. Es ist nicht immer möglich, den deklarativen Weg zu nutzen. Wenn der Fall eintritt, ist der imperative Ansatz unter Umständen eine gangbare Alternative. Dieser Abschnitt dient dazu, die DOM-API in React kennenzulernen.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Imperative-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Component-Composition...hs/Imperative-React?expand=1).
* Lese mehr über den [useRef-Hook](https://de.reactjs.org/docs/hooks-reference.html#useref).
<img src="https://vg01.met.vgwort.de/na/a6724d36ab444dd090ff1c7349fd190a" width="1" height="1" alt="">
