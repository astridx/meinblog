---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Erste Schritte mit der React-Komponente'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-erste-schritte
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Erste Schritte mit der React-Komponente

Im vorherigen Kapitel hast du die *Create React App* eingerichtet. Hier sehen wir uns die zentrale Komponente der App an. Diese findest du in der Datei *src/App.js*. Der Code in deiner Version der App weicht unter Umständen geringfügig von meiner Beschreibung hier im Buch ab, da die Entwickler der [*Create React App*](https://github.com/facebook/create-react-app) von Zeit zu Zeit die Struktur der Standardkomponente aktualisieren.

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Sofern nicht anders angegeben, dreht sich hier alles um die Datei *src/App.js*. Als Erstes vereinfachen wir die Komponente, die in dieser implementiert ist. Andernfalls baust du dein Projekt mit unnötigem Boilerplate-Code auf. Hier konzentrieren wir uns auf das Wesentliche: 

```js
# start-insert
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
# end-insert
```

Bemerkenswert sind drei Punkte: Zum einen ist diese React-Komponente, die als App bezeichnet wird, nichts anderes als eine JavaScript-Funktion. Sie wird allgemein **Funktionskomponente** genannt, da es andersartige Variationen von React-Komponenten gibt (siehe **Komponententypen im Kapitel "Legacy-React"**). Zweitens enthält die App keine Parameter in ihrer Funktionssignatur (siehe **Eigenschaften (Props) in React**). Und drittens gibt die App-Komponente Code zurück, der HTML ähnelt und JSX heißt (siehe Kapitel **JSX**).

Wie jede andere JavaScript-Funktion verfügt die Funktionskomponente über Implementierungsdetails --- die Umsetzung eines Algorithmus. Du wirst diese während deines gesamten Ausflugs in die React-Welt praktisch anwenden:

```js
import React from 'react';

function App() {
# start-insert
  // Erledige eine Aufgabe (Implementierungsdetails).
# end-insert

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

Wie bei allen JavaScript-Funktionen werden die im Funktionskörper festlegten Variablen bei jeder Ausführung neu definiert:

```js
import React from 'react';

function App() {
# start-insert
  const title = 'React';
# end-insert

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

Da wir für die Variable "title" nichts von der App-Komponente benötigen --- zum Beispiel Parameter der Funktionssignatur --- definieren wir sie außerhalb:

```js
import React from 'react';

# start-insert
const title = 'React';
# end-insert

function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
```

Im nächsten Abschnitt verwenden wir diese Variable.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Meet-the-React-Component).
* Wenn du nicht sicher bist, wann du `const`, `let` oder `var` in JavaScript (oder React) für Variablendeklarationen verwendest, lese [meinen Text zu diesem Thema](https://www.robinwieruch.de/const-let-var).
  * Lese mehr zum [Schlüsselwort const](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/const).
  * Lese mehr zum [Schlüsselwort let](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/let).
* Überlege dir, wie du die Variable `title` im zurückgegebenen HTML-Code der App-Komponente anzeigst.
<img src="https://vg01.met.vgwort.de/na/06daf670f95548e294d27711af22cbd6" width="1" height="1" alt="">