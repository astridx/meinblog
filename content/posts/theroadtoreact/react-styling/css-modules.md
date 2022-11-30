---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'CSS-Module in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-styling-css-module-in-react
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## CSS-Module in React

CSS-Module sind ein fortschrittlicher **CSS-in-CSS**-Ansatz. Die CSS-Datei bleibt grundsätzlich unverändert. Es kommen nur Funktion hinzu. Verwende sie, um normales CSS zu schreiben, oder nutze Techniken wie Sass. Im nachfolgenden erkläre ich dir, wie du CSS-Module zusammen mit React-Komponenten verwendest. Benenne als Erstes die Datei *src/App.css* in *src/App.module.css* um. So aktivierst du CSS-Module in der *Create React App*. Öffne dazu das Projekt-Verzeichnis über die Befehlszeile des Betriebssystems. Führe folgende Anweisung aus:

{title="Command Line",lang="text"}
```
mv src/App.css src/App.module.css
```

In die umbenannte Datei *src/App.module.css* fügst du deine CSS-Klassendefinitionen ein, genauso ich es im vorhergehenden Kapitel für *src/App.css* beschrieben habe:

{title="src/App.module.css",lang="css"}
```
.container {
  height: 100vw;
  padding: 20px;

  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
}

.headlinePrimary {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
}
```

Importiere die Datei *src/App.module.css* mithilfe eines relativen Pfades. Dieses Mal geschieht der Import als JavaScript-Objekt, wobei die Wahl des Namens (hier `styles`) dir überlassen bleibt:

```js
import React from 'react';
import axios from 'axios';

# start-insert
import styles from './App.module.css';
# end-insert
```

Anstatt den `className` als eine Zeichenfolge zu definieren, die einer CSS-Datei zugeordnet ist, greifst du direkt über das Objekt `styles` auf die CSS-Klasse zu. Diese weist du dann einem Element mit einem *JavaScript in JSX-Ausdruck* zu. Das hört sich kompliziert an. Hier siehst du, dass es unkompliziert ist:

```js
const App = () => {
  ...

  return (
# start-insert
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>My Hacker Stories</h1>
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

Es gibt verschiedene Möglichkeiten, mehrere CSS-Klassen mithilfe von `styles` zu einem `className`-Attribut hinzuzufügen. Nachfolgend verwenden wir Template-Strings. Außerdem siehst du hier, wie es ist möglich, ist Inline-Stile als dynamischere Styles in JSX hinzufügen:

```js
const Item = ({ item, onRemoveItem }) => (
# start-insert
  <div className={styles.item}>
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
        className={`${styles.button} ${styles.buttonSmall}`}
# end-insert
      >
        Dismiss
      </button>
    </span>
  </div>
);
```

Mit CSS-Modulen ist die Verwendung von CSS-Erweiterungen wie Sass möglich. Da hier das Hinzufügen von CSS-Modulen zu einer React-Anwendung Hauptaugenmerk ist, bleiben wir bei nativem CSS:

{title="src/App.module.css",lang="css"}
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

Dann implementieren wir die CSS-Klassen für die Schaltfläche in der Datei *src/App.module.css*:

{title="src/App.module.css",lang="css"}
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

.buttonSmall {
  padding: 5px;
}

.buttonLarge {
  padding: 10px;
}
```

Im Gegensatz zu `button_small` und `button_large` aus dem vorherigen Kapitel, nutzen wir hier eine Pseudo-BEM-Namenskonvention. Beim Import als CSS-Modul sind nicht alle CSS-Klassen in BEM gültige JavaScript-Bezeichner. Die Verwendung der [Klammernotation](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Property_Accessors#Klammernotation) wäre erforderlich: `styles['button_large']`. Das Gleiche gilt für CSS-Klassen, die mit einem Bindestrich (`-`) definiert sind. Deshalb verwenden wir jetzt `buttonLarge` und greifen mit `styles.buttonLarge` auf den Stil zu. Beispielsweise in der Item-Komponente:

```js
const SearchForm = ({ ... }) => (
# start-insert
  <form onSubmit={onSearchSubmit} className={styles.searchForm}>
# end-insert
    <InputWithLabel ... >
      <strong>Search:</strong>
    </InputWithLabel>

    <button
      type="submit"
      disabled={!searchTerm}
# start-insert
      className={`${styles.button} ${styles.buttonLarge}`}
# end-insert
    >
      Submit
    </button>
  </form>
);
```

Der SearchForm-Komponente ordnen wir ebenfalls zwei CSS-Klassen zu. Wie du siehst, ist es umständlich, zwei Stile in einem Element über Template-Strings zu verwenden. Eine praktischer alternative bietet die Bibliothek [**classnames**](https://github.com/JedWatson/classnames), mit der CSS-Klassen sich sogar [dynamisch und bedingt](https://github.com/JedWatson/classnames#usage-with-reactjs) zuordnen lassen. Installiere die Bibliothek im nächsten Schritt über die Befehlszeile als Projektabhängigkeit und verwende sie, um der Schaltfläche die CSS-Klassen zuzuordnen:

```js
import cs from 'classnames';

...

className={cs(styles.button, styles.buttonLarge)}
```

Ich habe erwähnt, dass die Bibliothek **classnames** bedingtes Styling bietet. Diese Funktion verdeutliche ich ebenfalls kurz mit einem Beispiel. Die linke Seite der Objekteigenschaft wird beim bedingten Styling als [berechneter Eigenschaftsname](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Object_initializer) verwendet und nur angewendet, wenn die rechte Seite den Wert `true` hat:

```js
import cs from 'classnames';

...

// Irgendwo in einem className-Attribut
className={cs(styles.button, { [styles.buttonLarge]: isLarge })}
```

Fahren wir mit unserem Beispiel fort, konkret mit der InputWithLabel-Komponente. Verwenden die Bibliothek **classnames**, um dieser das `className`-Attribut zuzuordnen:

```js
const InputWithLabel = ({ ... }) => {
  ...

  return (
    <>
# start-insert
      <label htmlFor={id} className={styles.label}>
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
        className={styles.input}
# end-insert
      />
    </>
  );
};
```

Ergänze abschließend die fehlenden Stile in der Datei *src/App.module.css*:

{title="src/App.module.css",lang="css"}
```
.searchForm {
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

Einiges von dem, was ich im vorhergehenden Kapitel geschrieben hatte, trifft ebenfalls auf CSS-Module zu: Beispielsweise: Stile wie `input` und `label` sind in einer globalen *src/index.css*-Datei unter Umständen effizienter zu verwenden. 

Wie jeder andere CSS-in-CSS-Ansatz unterstützen CSS-Module Sass, um CSS-Funktionen wie das Verschachteln zu verwenden. Nutze dies zur Strukturierung deiner Stile, ich habe dies hier im Abschnitt außen vor gelassen. Mein Ziel war es, dir die Anwendung von CSS-Modulen näher zu bringen. Die habe im Gegensatz zu purem CSS einen weiteren Vorteil: Jedes Mal, wenn ein verwendeter Stil nicht definiert ist, wird ein Fehler über die Konsole deines Browsers ausgegeben. Beim Standard-CSS-Ansatz bleibt ein solcher Tippfehler in der Regel unbemerkt und führt nicht selten einige Zeit später zu unerwartetem Verhalten und einer langwierigen Fehlersuche.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/CSS-Modules-in-React).
  * Reflektiere die [Änderungen](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/CSS-Modules-in-React?expand=1).
* Lese mehr zum Thema [CSS Modules in der Create React App](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet).
<img src="https://vg01.met.vgwort.de/na/39e09218967140e9bc1ffe7e2f5f7c8f" width="1" height="1" alt="">