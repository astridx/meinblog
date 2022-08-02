---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Mach dich mit einer anderen React-Komponente bekannt'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-eine-andere-komponente
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Mach dich mit einer anderen React-Komponente bekannt

Bisher haben wir ausschließlich die App-Komponente zum Erstellen unserer Anwendungen genutzt. Du hast die App im letzten Abschnitt verwendet, um alles abzuwickeln, was zum Rendern einer Liste in JSX erforderlich ist. Klar ist, dass die App mit ihren Anforderungen wächst. Damit die App bei komplexeren Aufgaben übersichtlich bleibt, teilen wir die Hauptkomponente in Unterkomponenten auf. Wir erstellen eine eigenständige Komponente für die Liste:

```js
const list = [ ... ];

function App() { ... }

# start-insert
function List() {
  return list.map(function(item) {
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });
}
# end-insert
```

Optional: Verwende ein umgebendes HTML-Element, wenn die Komponente seltsam auf dich wirkt, weil der äußerste Teil des zurückgegebenen JSX JavaScript-Syntax ähnelt. Im weiteren Verlauf werde ich dessen ungeachtet die vorherige Version nutzen.

```js
function List() {
# start-insert
  return (
    <div>
      {list.map(function(item) {
# end-insert
        return (... );
# start-insert
      })}
    </div>
  );
# end-insert
}
```

Verwende jetzt die neue List-Komponente in der App-Komponente:

```js
function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr />

# start-insert
      <List />
# end-insert
    </div>
  );
}
```

Voilà! Du hast deine erste React-Komponente erstellt! Das Beispiel gibt dir einen kleinen Einblick wie komplexe Aufgaben in größeren React-Anwendungen umgesetzt werden.

![](../images/component-tree.png)

Komplexe React-Anwendungen verfügen über **Komponentenhierarchien** oder **Komponentenbäume**. Es gibt normalerweise eine **Einstiegspunktkomponente** (zum Beispiel App), die einen Baum darunter überspannt. Die App ist die **übergeordnete Komponente** von List. Andersherum ist List eine **untergeordnete Komponente** der App. In einem Komponentenbaum ist die App normalerweise die **Stammkomponente**. Komponenten, die keine anderen rendern, werden als **Blattkomponenten** (zum Beispiel Item) bezeichnet. Es ist möglich, dass eine mehrere unter sich hat. In der Beispielanwendung hat die App zwei untergeordnete Komponenten. Diese bezeichnen wir als **Geschwisterkomponenten**. In unserem Beispiel sind dies List und Search.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Meet-another-React-Component).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Lists-in-React...hs/Meet-another-React-Component?expand=1).
* Erweitere den Komponentenbaum der am Ende dieses Kapitels abgedruckt ist mit möglichen Komponenten. Versuche herauszufinden, welche anderen Teile als eigenständige Komponenten integrierbar sind.
* Wenn eine Suchkomponente in der App-Komponente verwendet wird, welche Vorteile hat es, dass diese eine Geschwisterkomponente der Listenkomponente ist und keine Eltern- oder Kindkomponente?
* Frage dich, welche Probleme auftreten, wenn wir `list` weiterhin als globale Variable behandeln. Wie wir diese lösen ist Thema in den nächsten Kapiteln.
<img src="https://vg01.met.vgwort.de/na/ecfb8d248bee4303b973eabf8ee34b39" width="1" height="1" alt="">