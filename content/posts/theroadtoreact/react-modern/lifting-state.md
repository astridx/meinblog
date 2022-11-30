---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Den Status in der Hierarchie nach oben verschieben'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-status-in-der-hierarchie-nach-oben-verschieben
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Den Status in der Hierarchie nach oben verschieben

Die Search-Komponente verwaltet ihren internen Status selbst. Wir haben im letzten Abschnitt einen Callback-Handler eingerichtet, um Informationen an die App weiterzuleiten. Dies verwenden wir bisher nicht für die Filterung der Liste. Hierfür ist es erforderlich, dass der Status der Suchkomponente für andere freizugänglich ist.

Der Suchbegriff wird in der App benötigt, um die Liste zu filtern, bevor diese als Eigenschaft (Props) an die List-Komponente übergeben wird. Damit die App auf den Status --- und folglich auf die gefilterte Liste --- Zugriff hat, verschieben wir ihn von der Suchkomponente zur App-Komponente. Wir rücken **diesen in der Hierarchie nach oben**.

```js
const App = () => {
  const stories = [ ... ];

# start-insert
  const [searchTerm, setSearchTerm] = React.useState('');
# end-insert

  const handleSearch = event => {
# start-insert
    setSearchTerm(event.target.value);
# end-insert
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={stories} />
    </div>
  );
};

const Search = props => (
  <div>
    <label htmlFor="search">Search: </label>
# start-insert
    <input id="search" type="text" onChange={props.onSearch} />
# end-insert
  </div>
);
```

Wir haben uns im vorherigen Abschnitt die Rückruffunktion angesehen. Diese unterstützt uns dabei, eine Verbindung von der Search-Komponente zur App zu erstellen. Nach der letzten Änderung verwaltet die Suchkomponente ihren Status nicht mehr selbst. Die Aufgabe hat die App übernommen. Nachdem ein Text in das Eingabefeld eingegeben wird, gibt Search diese Information an App weiter. Es ist weiterhin möglich den `searchTerm` in der App und der Search-Komponente anzuzeigen, indem du ihn als Eigenschaft (Props) weitergibst.

Verwalte den Status immer mithilfe einer Komponente, die entweder selbst am Inhalt interessiert ist oder der alle anderen, die diesen verwenden, in der Hierarchie folgen. Im ersten Fall liest die Komponente den Status direkt aus, im zweiten Fall holt sie alle Informationen aus den Eigenschaften (Props). Damit es einer untergeordneten Komponente möglich ist, den Status zu aktualisieren, übergibst du einen Callback-Handler an sie (siehe Suchkomponente). Wenn diese den Status nicht verwaltet, sondern ausschließlich verwendet, zum Beispiel für die Anzeige am Bildschirm, reicht die Übergabe als Eigenschaft (Props) aus.

Mithilfe des Status der Suchfunktion in der App-Komponente filtern wir die Liste mit `searchTerm`, bevor wir `list` an die List-Komponente übergeben:

```js
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

# start-insert
  const searchedStories = stories.filter(function(story) {
    return story.title.includes(searchTerm);
  });
# end-insert

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />

# start-insert
      <List list={searchedStories} />
# end-insert
    </div>
  );
};
```

Nachfolgend verwenden wir zum verdeutlichen die [Filterfunktion des JavaScript-Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), um eine gefilterte Liste zu erstellen. Die Filterfunktion verwendet eine Funktion als Argument, die auf jedes Element im Array zugreift und `true` oder `false` zurückgibt. Wenn diese `true` erwidert, bedeutet das, dass die Bedingung erfüllt ist. In dem Fall bleibt das Element im neu erstellten Array. Gibt sie mit `false` zurück, wird es entfernt:

```
const words = [
  'spray',
  'limit',
  'elite',
  'exuberant',
  'destruction',
  'present'
];

const filteredWords = words.filter(function(word) {
  return word.length > 6;
});

console.log(filteredWords);
// ["exuberant", "destruction", "present"]
```

Kommen wir zurück auf unsere Beispielanwendung: Die Filterfunktion prüft, ob `searchTerm` im Titel des `story`-Elements vorkommt. Dabei ist Groß- und Kleinschreibung eine Beschwernis. Wenn wir nach "react" suchen, bleibt die Ergebnisliste leer, "React" wird gefunden. Um dieses Problem zu beheben, konvertieren wir den Titel des `story`-Elements und den `searchTerm` in Kleinbuchstaben. So ist die Schreibweise egal, gesucht und gefiltert wird ausschließlich mit kleinen Buchstaben.

```js
const App = () => {
  ...

  const searchedStories = stories.filter(function(story) {
# start-insert
    return story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
# end-insert
  });

  ...
};
```

Jetzt ist es möglich, nach "eact", "React" oder "react" zu suchen, um eines der zwei Elemente herauszufiltern. Glückwunsch! Du hast die Anwendung um die erste interaktive Funktion erweitert.

Der verbleibende Abschnitt enthält nichts Neues. Wir überarbeiten den aktuellen Codes. Bitte vollziehe diese Schritte nach, da wir im Weiteren die überarbeitete Version verwenden. Zunächst präzisieren wir die Funktion mithilfe einer Pfeilfunktion:

```js
const App = () => {
  ...

# start-insert
  const searchedStories = stories.filter(story => {
# end-insert
    return story.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
 });

  ...
};
```

Darüber hinaus könnten wir die Return-Anweisung in eine sofortige Rückgabe umwandeln, da keine andere Aufgabe anfällt:

```js
const App = () => {
  ...

# start-insert
  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
# end-insert

  ...
};
```

So weit zur Überarbeitung der Filterfunktion. Es gibt viele unterschiedliche Herangehensweisen --- und es ist nicht immer trivial zu entscheiden, wie das Gleichgewicht zwischen Übersichtlichkeit und Genauigkeit am besten ist. Ich tendiere dazu, den Code möglichst kurz zu belassen. Meiner Meinung nach bleibt er so überschaubar und deshalb optimal lesbar.

![](../images/component-communication.png)

Nach dieser Überarbeitung verwalten wir den Status über den Callback-Handler der Search-Komponente innerhalb der App. Der aktuelle Status wird als Filter für die Liste verwendet. Mit dem Callback-Handler verwenden wir Informationen aus der Search-Komponente in der App, um den gemeinsam genutzten Status zu verwalten. Indirekt nutzen wir die Informationen in der List-Komponente, um die gefilterte Liste auf dem neuesten Stand zu halten.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Lifting-State-in-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Callback-Handler-in-JSX...hs/Lifting-State-in-React?expand=1).
<img src="https://vg01.met.vgwort.de/na/ff3a283917b349ceb540649b4b2a7159" width="1" height="1" alt="">
