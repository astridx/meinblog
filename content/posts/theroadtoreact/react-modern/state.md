---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Status-Management in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-state
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Status-Management in React

Eigenschaften (Props) werden in React verwendet, um Informationen innerhalb des Komponentenbaums weiterzugeben. Der **React Status (State)** dient dazu, eine Interaktion zu ermöglichen. Beispielsweise verändern wir die Anzeige im Browser, indem wir mit der Anwendung interagieren.

Zu Beginn ist es wichtig, dass du die Funktion `useState` kennst. Wir verwalten mit ihr in React den Status. `useState` wird als Hook bezeichnet. Es gibt mehr als einen **React Hook** und du wirst in den nächsten Abschnitten mehr über diese erfahren. Konzentrieren wir uns vorerst auf den **`useState`-Hook**:

```js
const App = () => {
  const stories = [ ... ];

# start-insert
  const [searchTerm, setSearchTerm] = React.useState('');
# end-insert

  ...
};
```

Der `useState`-Hook in React verwendet einen *Anfangszustand* als Argument und die Funktion gibt ein Array mit zwei Werten zurück. Wir verwenden als Anfangszustand eine leere Zeichenfolge. Der erste Wert (`searchTerm`) steht für den *aktuellen Zustand*; Der zweite Wert ist eine *Funktion zum Aktualisieren dieses Status* (`setSearchTerm`). Ich werde die Funktion *Statusaktualisierungsfunktion* nennen.

Lies bitte den Text [Destrukturierung von JavaScript-Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destrukturierende_Zuweisung)  wenn du mit der Syntax der beiden Werte aus dem zurückgegebenen Array nicht vertraut bist. Destrukturierung  wird verwendet, um ein Array gezielter auszulesen. Das nächste Beispiel verdeutlicht die Vorteile der  Array-Destrukturierung:

```
// Grundlegende Array-Definition
const list = ['a', 'b'];

// Keine Array-Destrukturierung
const itemOne = list[0];
const itemTwo = list[1];

// Array-Destrukturierung
const [firstItem, secondItem] = list;
```

Der React `useState`-Hook ist eine Funktion, die ein Array zurückgibt. Vergleiche diese mit dem folgenden JavaScript-Beispiel:

```
function getAlphabet() {
  return ['a', 'b'];
}

// Keine Array-Destrukturierung
const itemOne = getAlphabet()[0];
const itemTwo = getAlphabet()[1];

// Array-Destrukturierung
const [firstItem, secondItem] = getAlphabet();
```

Die Array-Destrukturierung ist nichts anderes als eine Kurzversion, mit der auf mehrere Elemente nacheinander zugegriffen wird. Wenn du das Gleiche ohne Destrukturierung schreibst, ist das Ergebnis unübersichtlicher:

```js
const App = () => {
  const stories = [ ... ];

  // Unübersichtlicher Version ohne Array-Destrukturierung
  const searchTermState = React.useState('');
  const searchTerm = searchTermState[0];
  const setSearchTerm = searchTermState[1];

  ...
};
```

Die React-Entwickler entschieden sich für die Array-Destrukturierung aufgrund der präzisen Syntax und der Fähigkeit, destrukturierte Variablen zu benennen. Das folgende Codefragment ist ein weiteres Beispiel:

```js
const App = () => {
  const stories = [ ... ];

# start-insert
  const [searchTerm, setSearchTerm] = React.useState('');
# end-insert

  ...
};
```

Wir haben den Status initialisiert und wir haben Zugriff auf den aktuellen Status und die Statusaktualisierungsfunktion. Jetzt verwenden wir diese Funktion, um den aktuellen Status anzuzeigen und ihn im Ereignis-Handler der App-Komponente zu aktualisieren:

```js
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
# start-insert
    setSearchTerm(event.target.value);
# end-insert
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

# start-insert
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
# end-insert

      <hr />

      <List list={stories} />
    </div>
  );
};
```

Wenn ein Benutzer eine Eingabe im Eingabefeld tätigt, wird die Änderung vom Handler erfasst. Dieser aktualisiert daraufhin mithilfe der Statusaktualisierungsfunktion den Status. Als Folge dessen wird die Komponente neu gerendert. Der neue Status tritt anstelle des aktuellen und wird im Browser angezeigt.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-State).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Props...hs/React-State?expand=1).
* Lese mehr zur [Destrukturierung von JavaScript-Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring).
* Lese mehr zu useState-Hooks ([0](https://www.robinwieruch.de/react-usestate-hook), [1](https://de.reactjs.org/docs/hooks-state.html)), da diese deine React-Komponente interaktiv machen.
<img src="https://vg01.met.vgwort.de/na/fc86686bf4a746628fa160b084d98a7b" width="1" height="1" alt="">
