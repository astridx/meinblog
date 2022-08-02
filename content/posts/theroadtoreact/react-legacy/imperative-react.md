---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Reacts Legacy: Imperative'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-legacy-imperativ
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Reacts Legacy: Imperative

In einer Funktionskomponente verwendet man hauptsächlich den `useRef`-Hook für die imperative Programmierung. `Refs`, und ihre Anwendung, wurden im Laufe der Zeit einige Male überarbeitet:

* String Refs (veraltet)
* Callback Refs
* `createRef` Refs (exklusiv für Klassenkomponenten)
* `useRef` Hook Refs (exklusiv für Funktionskomponenten)

Mit [React 16.3](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) hat das React-Team die Funktion `createRef` eingeführt. Diese ist ein Äquivalent zum `useRef`-Hook einer Funktionskomponente, welche später in React integriert wurde:

```
class InputWithLabel extends React.Component {
  constructor(props) {
    super(props);

# start-insert
    this.inputRef = React.createRef();
# end-insert
  }

  componentDidMount() {
    if (this.props.isFocused) {
# start-insert
      this.inputRef.current.focus();
# end-insert
    }
  }

  render() {
    ...

    return (
      <>
        ...
        <input
# start-insert
          ref={this.inputRef}
# end-insert
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
      </>
    );
  }
}
```

Die Referenz `this.inputRef` wird im Konstruktor der Klasse erstellt und in einer Lebenszyklusmethode verwendet. Der Verweis ist an anderen Stelle verwendbar, beispielsweise um das Eingabefeld aufgrund eines Schaltflächenklick zu fokussieren.

Während `createRef` in den Klassenkomponenten von React verwendet wird, wird der `useRef`-Hook in Funktionskomponenten genutzt. Da Letztere vermehrt eingesetzt werden, ist der `useRef`-Hook heutzutage die gängige Funktion zum Verwalten von Referenzen.

### Übungen:

* Lese mehr zu den [verschiedenen Ref-Techniken in React](https://de.reactjs.org/docs/refs-and-the-dom.html).
<img src="https://vg07.met.vgwort.de/na/993d7167efef4d4297187c9ec242b482" width="1" height="1" alt="">
