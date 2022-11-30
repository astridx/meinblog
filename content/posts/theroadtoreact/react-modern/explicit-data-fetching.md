---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Explizite Datenabrufe in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-explizite-datenabrufe
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Explizite Datenabrufe in React

Das erneute Abrufen aller Daten bei jeder Eingabe in das Eingabefeld ist nicht optimal. Wir verwenden hierzu eine Drittanbieter-API, deren Interna nicht in unserem Einflussbereich ist. Wenn wir Pech haben, wird uns aufgrund einer [Durchsatzratenbegrenzung](https://de.wikipedia.org/wiki/Durchsatzratenbegrenzung), anstelle der Daten eine Fehlermeldung zurückgeben.

Um dieses Problem zu lösen, verändern wir die Art des Datenabrufs von implizit zu explizit. Mit anderen Worten, die Anwendung ruft Daten nur dann ab, wenn jemand auf eine Bestätigungsschaltfläche klickt. Fügen wir zunächst ein Schaltflächenelement für die Bestätigung mittels JSX zu unserer Benutzeroberfläche hinzu:

```js
const App = () => {
  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
# start-insert
        onInputChange={handleSearchInput}
# end-insert
      >
        <strong>Search:</strong>
      </InputWithLabel>

# start-insert
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>
# end-insert

      ...
    </div>
  );
};
```

Im Anschluss daran implementieren wir bei den Ereignis-Handlern alles Notwendige, um den Status der Komponente zu aktualisieren. Der Eingabefeld-Handler aktualisiert weiterhin den `searchTerm`. Der Schaltflächen-Handler setzt die `url`, die sich aus dem *aktuellen* `searchTerm` und der hartcodierten statischen API-URL ableitet, als neuen Status:

```js
const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

# start-insert
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );
# end-insert

  ...

# start-insert
  const handleSearchInput = event => {
# end-insert
    setSearchTerm(event.target.value);
  };

# start-insert
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };
# end-insert

  ...
};
```

Am Ende wird der Seiten-Effekt des Datenabrufs nicht mehr bei jeder Änderung von `searchTerm` aufgerufen. Anstelle davon verwenden wir die `url` um die Liste zu aktualisieren. Diese wird vom Benutzer festgelegt, wenn er die Suche über die neue Schaltfläche bestätigt:

```js
const App = () => {
  ...

  const handleFetchStories = React.useCallback(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

# start-insert
    fetch(url)
# end-insert
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
# start-insert
  }, [url]);
# end-insert

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  ...
};
```

`searchTerm` hatte bisher zwei Aufgaben: Zum einen war die Variable für die Aktualisierung des Status des Eingabefelds zuständig. Zum andere war sie für den Abruf der Daten verantwortlich --- sie löste den Seiten-Effekt aus. Dies war kein idealer Programmierstil, weil die [Zuständigkeiten nicht getrennt](https://wiki.selfhtml.org/index.php?title=Separation_of_concerns&oldid=66463) waren. Jetzt wird `searchTerm` nur für die Aktualisierung des Eingabefelds verwendet. Eine zweite Variable namens `url` wurde eingeführt, um den Seiten-Effekt beim Abrufen von Daten auszulösen. Dieser tritt nur dann auf, wenn ein Benutzer auf die Bestätigungsschaltfläche klickt.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Explicit-Data-Fetching-with-React).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Memoized-Handler-in-React...hs/Explicit-Data-Fetching-with-React?expand=1).
* Warum wird `useState` anstelle von `useSemiPersistentState` für die `url`-Statusverwaltung verwendet?
* Die Suche nach einem leeren `searchTerm` wird nicht mehr explizit verhindert. Warum haben wir `if (!searchTerm) return;` in der Funktion `handleFetchStories` entfernt?
<img src="https://vg02.met.vgwort.de/na/e62dac3ab50b455d9f7c086a18ce3668" width="1" height="1" alt="">
