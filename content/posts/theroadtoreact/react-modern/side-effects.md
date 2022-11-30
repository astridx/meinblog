---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Seiten-Effekte in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-site-effects
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Seiten-Effekte in React

Lasst uns jetzt unser Beispiel weiterentwickeln, und einen sogenannte Seiten-Effekte mithilfe des [useEffect()-Hooks](https://de.reactjs.org/docs/hooks-effect.html) implementieren. Ziel ist es, dass die Search-Komponente die vorherige Suche speichert, sodass diese letzte Aktion als Ist-Zustand bei einem neuen Aufruf im Browser geöffnet wird.

Verwende dafür zunächst das [lokale Storage-Objekt](https://developer.mozilla.org/de/docs/Web/API/Window/localStorage) des Browsers, um den `searchTerm` zu speichern. Nutze daraufhin diesen Wert, um den Anfangszustand festzulegen. Falls bis dato kein Wert gespeichert wurde, bleibt alles so, wie vorher --- bisher verwenden wir "React" als initialen Wert hartkodiert:

```js
const App = () => {
  ...

  const [searchTerm, setSearchTerm] = React.useState(
# start-insert
    localStorage.getItem('search') || 'React'
# end-insert
  );

  const handleSearch = event => {
    setSearchTerm(event.target.value);

# start-insert
    localStorage.setItem('search', event.target.value);
# end-insert
  };

  ...
);
```

Wenn du nach dieser Ergänzung im Eingabefeld einen Text eingibst und daraufhin die Ansicht in deinem Webbrowser aktualisieren wirst du feststellen, dass dein Browser sich den neuesten Suchbegriff gemerkt hat. Probiere es aus! Die Verwendung des lokalen Speichers stellt einen **Seiten-Effekt** dar, da wir mithilfe der API des Browsers außerhalb von React interagieren.

Es gibt leider ein Problem in unserer Anwendung. Die Handlerfunktion `useState` ist für die Aktualisierung des Status zuständig, hat aber jetzt einen Seiten-Effekt: Wenn wir die Funktion `setSearchTerm` an einer anderen Stelle in unserer Anwendung verwenden, wird der lokale Speicher unter Umständen nicht aktualisiert. Wir beheben diesen Mangel, indem wir den **useEffect()-Hook** verwenden. So erreichen wir, dass der Seiten-Effekt jedes Mal ausgelöst wird, wenn sich die Variable `searchTerm` ändert:

```js
const App = () => {
  ...

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

# start-insert
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);
# end-insert

# start-insert
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
# end-insert

  ...
);
```

Die grundlegende Syntax des `useEffect`-Hooks ist dabei folgende:

{title="Visualization",lang="javascript"}
```
useEffect(function, dependencyArray)
```

Der Hook verwendet zwei Argumente: Das erste ist eine Funktion, der Seiten-Effekt, der aufgerufen wird. In unserem Fall passiert dies, wenn der Benutzer "searchTerm" eingibt und dieser daraufhin im lokalen Speicher des Browsers abgelegt wird. Das optionale zweite Argument ist ein Array. Wenn sich eine Variable im Array ändert, löst dies die Funktion für den Seiten-Effekt ebenfalls aus. In unserem Fall wird diese jedes Mal aufgerufen, wenn sich `searchTerm` ändert --- und beim initialen Aufruf, wenn die Komponente zum ersten Mal gerendert wird.

Wenn du das zweite Argument (Array) weglässt, wird die Funktion für den Seiten-Effekt bei jedem Rendern der Komponente aufgerufen. Im Gegensatz dazu wird sie beim Komponentenstart nur einmal ausgelöst, wenn du ein leeres Array mitgibst. Mit dem Hook nehmen wir Einfluss auf den Komponentenlebenszyklus. Du hast es in der Hand, wann eine Aktualisierung ausgelöst wird, indem du das zweite Argument festlegst:
- (kein Wert) = immer
- [] = einmal beim Start der Komponente
- [x, y] = immer, wenn sich eine der Variablen ändert.

Durch die Verwendung von `useEffect` ist die Anwendung robuster. Immer *wenn* `searchTerm` über` setSearchTerm` aktualisiert wird, werden `searchTerm` und lokale Storage-Objekte synchronisiert --- egal *wo* die Aktualisierung ausgelöst wird.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Side-Effects).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Props-Handling...hs/React-Side-Effects?expand=1).
* Lese mehr zum `useEffect`-Hook([0](https://de.reactjs.org/docs/hooks-effect.html), [1](https://de.reactjs.org/docs/hooks-reference.html#useeffect)).
* Erweitere die Funktion im ersten Argument des `useEffect-Hooks` so, dass mithilfe von `console.log()` Ausgaben in der Konsole deines Browsers mitprotokolliert werden. Experimentiere mit dem Array. Was passiert, wenn du ein leeres oder gar keins verwendest?
<img src="https://vg01.met.vgwort.de/na/a4921a5f9bb64830b89e6c008a251b7f" width="1" height="1" alt="">
