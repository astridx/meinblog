---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Projektstruktur'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-maintenance-projektstruktur
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Projektstruktur

Wenn du schon länger programmierst, fragst du dich gewiss, warum wir bisher alle Komponenten in der Datei *src/App.js* implementierten. Üblich ist es, denn Programmcode aufzuteilen. Wir haben diese Möglichkeit bisher nicht genutzt, weil es zum Lernen praktischer ist, alle Inhalte kompakt in einer Datei zu bearbeiten. In der Realität hat es sich dagegen bewährt, eine Anwendung übersichtlich in mehrere Module aufzuteilen. In diesem Abschnitt zeige ich dir eine etablierte Methode, um dein Projekt zu strukturieren.

Vergegenwärtige dir die [Import- und Exportanweisungen in JavaScript](https://www.robinwieruch.de/javascript-import-export), bevor du das Umstrukturieren in Angriff nimmst. Das Importieren und Exportieren von Dateien ist ein grundlegendes Konzept in JavaScript. Da das in React eine große Rolle spielt, ist es wichtig, dass du es beherrschst. In diesem Kapitel zeige ich dir anhand der Beispielanleitung exemplarisch, wie du eine Anwendung strukturierst. Vieles von dem was ich hier schreibe, ist nicht in Stein gemeißelt. Jedes Projekt ist individuell und deshalb ist eine Struktur nicht fix vorgegeben. Sie ergibt sich im Laufe der Entwicklung quasi von selbst. 

Überarbeiten wir die Ordner-/Dateistruktur des Projekts, um erste Erfahrungen im Strukturierungsprozess zu sammeln. Danach teile ich mit dir meinen Erfahrungshintergrund und Best Practices bei der Umstrukturierung von React-Projekten.

Öffne über die Befehlszeile den Ordner *src/* im Rootverzeichnis des Beispielprojektes und erstelle drei Dateien:

{title="Command Line",lang="text"}
```
cd src
touch List.js InputWithLabel.js SearchForm.js
```

Verschiebe jede Komponente in eine eigene Datei, mit Ausnahme von Item. Diese teilt mit List die Datei *src/List.js*. Stelle dann überall sicher, dass du React importierst und wichtige Inhalte exportierst. Zum Beispiel in *src/List.js*:

{title="src/List.js",lang="javascript"}
```
# start-insert
import React from 'react';
# end-insert

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <button type="button" onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);

# start-insert
export default List;
# end-insert
```

Da nur List die Item-Komponente verwendet, speichern wir beide in derselben Datei. Wenn sich dies ändert, weil Item zusätzlich an einer anderen Stelle genutzt wird, erstellen wir dann eine eigene Datei. Jetzt ist dies nicht absehbar. SearchForm importiert InputWithLabel. Es wäre möglich, beide zusammen in *src/SearchForm.js* zu speichern. Unser Ziel ist es, InputWithLabel später mit anderen Komponenten wieder zu verwendbar. Die Änderung ist somit absehbar. Deshalb speichern wir beide in separaten Dateien und schaffen so schon jetzt die Voraussetzungen dafür.

{title="src/SearchForm.js",lang="javascript"}
```
# start-insert
import React from 'react';
# end-insert

# start-insert
import InputWithLabel from './InputWithLabel';
# end-insert

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);

# start-insert
export default SearchForm;
# end-insert
```

App importiert fast alle Komponenten, um diese zu rendern. InputWithLabel importieren wir hier nicht. Dies ist nur in SearchForm erforderlich, da das Label ausschließlich dort verwendet wird.

```js
import React from 'react';
import axios from 'axios';

# start-insert
import SearchForm from './SearchForm';
import List from './List';
# end-insert

...

const App = () => {
  ...
};

export default App;
```

Alle Komponenten, die von anderen verwendet werden, verfügen jetzt über eine eigene Datei. Nur wenn eine einer zugeordnet ist, wird sie in derselben gespeichert --- beispielsweise Item und List. Wenn eine Komponente als wiederverwendbare geplant ist, wird sie schon zu Beginn in einer eigenen Datei implementiert --- beispielsweise InputWithLabel. Es gibt verschiedene Strategien, um die Dateihierarchie aufzubauen. Ein Szenario ist, für jede Komponente einen eigenen Ordner zu erstellen:

{title="Project Structure",lang="text"}
```
- List/
-- index.js
- SearchForm/
-- index.js
- InputWithLabel/
-- index.js
```

Bei einer komplexen Komponente ist es so leicht möglich, die einzelnen Aufgaben weiter in separate Teile zu gliedern. Die Datei *index.js* ist der Einstiegspunkt in die Komponente. Dies ist historisch begründet. *index.js* ist der traditionelle Startpunkt für alle [Node-Apps](https://nodejs.org/dist/latest-v7.x/docs/api/modules.html#modules_folders_as_modules). In React beinhaltet *index.js* in erster Linie Code, der festlegt, was wo gerendert wird. Die anderen Dateien im selben Ordner haben ebenfalls ihre Verantwortlichkeiten, sie kümmern sich beispielsweise um CSS-Styles, Tests und Typprüfung:

{title="Project Structure",lang="text"}
```
- List/
-- index.js
-- style.css
-- test.js
-- types.js
```

Falls du CSS-in-JS verwendest, benötigst du keine CSS-Datei. Unter Umständen existiert eine separate *style.js* für alle gestalteten Komponenten:

{title="Project Structure",lang="text"}
```
- List/
-- index.js
# start-insert
-- style.js
# end-insert
-- test.js
-- types.js
```

Wenn das Projekt wächst, ist es mitunter hilfreich, von einer **technisch orientierten Ordnerstruktur** zu einer **domänenorientierten** zu wechseln. Der universelle Ordner *shared/* ist für domänenspezifische Komponenten freigegeben:

{title="Project Structure",lang="text"}
```
- Messages.js
- Users.js
- shared/
-- Button.js
-- Input.js
```

Es ist vorstellbar, beide Varianten zu kombinieren. Wende die technische Vorgehensweise auf die domänenorientierte Ordnerstruktur an --- in diesem Fall eine Ebene tiefer. Jetzt hat jede Komponente in ihrer Domäne einen eigenen Ordner:

{title="Project Structure",lang="text"}
```
- Messages/
-- index.js
-- style.css
-- test.js
-- types.js
- Users/
-- index.js
-- style.css
-- test.js
-- types.js
- shared/
-- Button/
--- index.js
--- style.css
--- test.js
--- types.js
-- Input/
--- index.js
--- style.css
--- test.js
--- types.js
```

Es gibt viele Möglichkeiten, zur Strukturierung deines Projekts: flache bis komplexe Ordnerstruktur; Verschachtelung oder alle Dateien auf einer Ebene; dedizierte Ordner für CSS, Typprüfung und Tests neben der Implementierungslogik. Bestimme du selbst den idealen Aufbau, es gibt keine feste Regel.

Die Anforderungen eines Projekts ändern sich im Laufe der Zeit, ebenso wie seine Struktur. Wenn du dich produktiv dabei fühlst, alle Assets in einer Datei zu speichern, gibt es nichts, was dagegen spricht. Einen Tipp gebe ich dir: Versuche, die Verschachtelungsebene flach zu halten. Ansonsten besteht die Gefahr, dass du in der Tiefe die Übersicht verlierst.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Folder-Structure).
  * Reflektiere die [Änderungen Änderungen gegenüber dem Stand am Ende des ersten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/React-Folder-Structure?expand=1).
* Lese mehr zu JavaScript-Import- und Exportanweisungen([1](https://www.robinwieruch.de/javascript-import-export), [2](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/import), [3](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/export)).
* Lese mehr zur Ordnerstrukturen in React([1](https://www.robinwieruch.de/react-folder-structure), [2](https://de.reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes)).
* Im Weiteren werden wir die Beispielanwendung allein in der Datei *src/App.js* weiterentwickeln. Dir steht es frei, mit dem umstrukturierten Projekt fortfahren.
<img src="https://vg07.met.vgwort.de/na/22f56b6e963043f3a483808fb3b05280" width="1" height="1" alt="">
