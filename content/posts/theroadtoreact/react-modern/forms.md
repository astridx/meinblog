---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Formulare in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-forms
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Formulare in React

In unserem Beispiel gibt es eine Schaltfläche, mit der Daten per Klick abgerufen werden. Nachfolgend verbessern wir diese mithilfe eines HTML-Formulars, welches die Schaltfläche vom Eingabefeld für den Suchbegriff abkapselt.

Formulare unterscheiden sich in JSX nicht wesentlich von denen in purem HTML. Wir implementieren in diesem Abschnitt alles Notwendige in zwei Schritten. Integrieren wir als erstes das Eingabefeld und die Schaltfläche in ein HTML-Formular:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

# start-insert
      <form onSubmit={handleSearchSubmit}>
# end-insert
        <InputWithLabel
          id="search"
          value={searchTerm}
          isFocused
          onInputChange={handleSearchInput}
        >
          <strong>Search:</strong>
        </InputWithLabel>

# start-insert
        <button type="submit" disabled={!searchTerm}>
# end-insert
          Submit
        </button>
# start-insert
      </form>
# end-insert

      <hr />

      ...
    </div>
  );
};
```

Was ist anders? Wir übergeben die Funktion `handleSearchSubmit` an das neue Formularelement und nicht mehr direkt an die Schaltfläche. Die erhält dafür das, mit dem Wert `submit` belegte `type`-Attribut. Das verdeutlicht zusätzlich, dass das Formular das Klickereignis verarbeitet und nicht die Schaltfläche.

Da `handleSearchSubmit` für das Formularereignis verwendet wird, ergänzen wir `preventDefault`. Hiermit unterbinden wir das natürliche Verhalten des HTML-Formulars. Ohne `preventDefault` würde die Seite bei jedem Klick neu geladen.

```js
const App = () => {
  ...

# start-insert
  const handleSearchSubmit = event => {
# end-insert
    setUrl(`${API_ENDPOINT}${searchTerm}`);

# start-insert
    event.preventDefault();
# end-insert
  };

  ...
};
```

Das war es schon: Führe jetzt die Suchfunktion aus, indem du die Enter-Taste deiner Tastatur klickst, nachdem du das Suchwort im Textfeld eingefügt hast. Die nächsten beiden Schritte sind Strukturverbesserungen des Codes. Wir erstellen eine eigenständige Komponente für das Suchformular:

```js
# start-insert
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
# end-insert
```

Die neue Komponente wird von der App verwendet. App verwaltet weiterhin den Status für das Formular. Dieser wird hier genutzt, um Daten `story.data` abzurufen, die als Eigenschaften (Props) an die List-Komponente übergeben werden:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

# start-insert
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
# end-insert

      <hr />

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

Wie gesagt: Formulare unterscheiden sich in React nicht wesentlich von denen in HTML. Wenn wir Formularfelder und eine Schaltfläche zum Übermitteln von Daten nutzen, verleihen wir unserem Dokument mehr Struktur, indem wir es in ein Formularelement einschließen. Die Schaltfläche, die die Übermittlung ausführt, benötigt ein `type`-Attribut, welches mit dem Wert `submit` belegt ist.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Forms-in-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Async-Await-in-React...hs/Forms-in-React?expand=1).
* Teste den Code ohne `preventDefault`.
* Lese mehr zum Thema [`preventDefault` für Ereignisse in React](https://www.robinwieruch.de/react-preventdefault).
* Lese mehr zum Thema [React Component Composition](https://www.robinwieruch.de/react-component-composition).
<img src="https://vg02.met.vgwort.de/na/c23fe2dd40e0406b8ada9dcc345086d5" width="1" height="1" alt="">
