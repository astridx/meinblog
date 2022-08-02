---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Seitenbezogener Datenabruf'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-advanced-seitenbezogener-datenabruf
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Seitenbezogener Datenabruf

Die Suche nach beliebten Artikeln über die Hacker News API ist nur ein Schritt in die Richtung zu einer benutzerfreundlichen Suchfunktion. Schaue dir die Datenstruktur genauer an. Bemerkenswert finde ich, wie [die Hacker News API](https://hn.algolia.com/api) mehr als eine Liste von `hits` zurückgibt.

Insbesondere wird eine paginierte Liste zurückgegeben. Verwende die Seiteneigenschaft, um eine paginierte Listen als Ergebnisse abzurufen. Diese Eigenschaft ist in der ersten Antwort `0`. Übergib die nächste Seite mit demselben Suchbegriff an die API.

![](../images/paginated-list.png)

Im Folgenden zeige ich dir, wie du einen paginierten Abruf mithilfe der Hacker News-Datenstruktur implementierst. Meist sieht man eine Reihe von Schaltflächen, beispielsweise von 1-10, wobei die aktuell ausgewählte Seite hervorgehoben ist. Zum Beispiel so: 1-[3]-10. Wenn du auf eine der Schaltflächen klickst, dann wird die passende Teilmenge von Daten abgerufen und angezeigt.

![](../images/pagination.png)

Im Gegensatz dazu werden wir die Funktion als **unendliche Paginierung** implementieren. Anstatt eine einzelne paginierte Liste mit einem Klick abzurufen, rendern wir *alle als eine Liste* mit *einer* Schaltfläche. Jede weitere wird am Ende verkettet.

![](../images/infinite-pagination.png)

**Aufgabe:** Erweitere die Funktionalität zum Abrufen nachfolgender Seiten, anstatt nur die erste einer Liste abzurufen. Implementiere dies als unendliche Paginierung beim Klicken auf die Schaltfläche.

**Optionale Hinweise:**

* Erweitere `API_ENDPOINT` mit den Parametern, die für den paginierten Abruf benötigt werden.
* Speichere `page` aus `result` als Status nach dem Abrufen der Daten.
* Hole dir bei jeder Suche die erste Seite (`0`) der Daten.
* Rufe die nachfolgende Seite ( `page + 1`) für jede zusätzliche Anforderung ab, die mit einer neuen HTML-Schaltfläche ausgelöst wird.

Erweitere zunächst die API-Konstante, um später mit paginierten Daten zu arbeiten. Wir werden eine Konstante ...

```js
const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const getUrl = searchTerm => `${API_ENDPOINT}${searchTerm}`;
```

... in eine zusammensetzbare API-Konstante mit ihren Parametern verwandeln:

```js
# start-insert
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
# end-insert

// careful: notice the ? in between
# start-insert
const getUrl = searchTerm =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
# end-insert
```

Glücklicherweise ist es nicht erforderlich, den API-Endpunkt anzupassen, da wir die gemeinsame Funktion `getUrl` dafür haben. Bei einem Punkt kommen wir hingegen nicht um eine Anpassung umhin:

```js
const extractSearchTerm = url => url.replace(API_ENDPOINT, '');
```

In den nächsten Schritten reicht es nicht aus, die Basis des API-Endpunkts zu ersetzen, die nicht mehr in unserem Code enthalten ist. Mit mehr Parametern für den API-Endpunkt wird die URL komplexer. Die URL ändert sich von X nach Y:

```js
// X
https://hn.algolia.com/api/v1/search?query=react

// Y
https://hn.algolia.com/api/v1/search?query=react&page=0
```

Es ist besser, den Suchbegriff zu untersuchen, indem du alles zwischen `?` und `&` herausfilterst. Beachte, dass der Parameter `query` direkt hinter `?` steht und alle anderen wie `page` beginnend mit `&` darauf folgen.

```js
# start-insert
const extractSearchTerm = url =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'));
# end-insert
```

Der Schlüssel (`query=`) muss ebenfalls ersetzt werden, wobei nur der Wert (`searchTerm`) übrig bleibt:

```js
const extractSearchTerm = url =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'));
# start-insert
    .replace(PARAM_SEARCH, '');
# end-insert
```

Im Wesentlichen kürzen wir die Zeichenfolge, bis nur der Suchbegriff übrig bleibt:

```js
// url
https://hn.algolia.com/api/v1/search?query=react&page=0

// url after  substring
query=react

// url after replace
react
```

Das von der Hacker News API zurückgegebene Ergebnis liefert uns die Daten der Seiten `page`:

```js
const App = () => {
  ...

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
# start-insert
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
# end-insert
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [urls]);

  ...
};
```

Wir speichern diese Daten, um später paginierte Abrufe auszuführen:

```js
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      ...
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
# start-insert
        data: action.payload.list,
        page: action.payload.page,
# end-insert
      };
    case 'STORIES_FETCH_FAILURE':
      ...
    case 'REMOVE_STORY':
      ...
    default:
      throw new Error();
  }
};

const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
# start-insert
    { data: [], page: 0, isLoading: false, isError: false }
# end-insert
  );

  ...
};
```

Erweitere den API-Endpunkt mit dem neuen Parameter `page`. Diese Änderung wurde durch unsere vorzeitigen Optimierungen früher abgedeckt, als wir den Suchbegriff aus der URL extrahierten.

```js
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
# start-insert
const PARAM_PAGE = 'page=';
# end-insert

// careful: notice the ? and & in between
# start-insert
const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
# end-insert
```

Als Nächstes passen wir alle `getUrl`-Aufrufe an, indem wir das Argument `page` einsetzen. Da bei der ersten und letzten Suche immer die Seite (`0`) abgerufen wird, übergeben wir diese als Argument an die Funktion zum Abrufen der entsprechenden URL:

```js
const App = () => {
  ...

# start-insert
  const [urls, setUrls] = React.useState([getUrl(searchTerm, 0)]);
# end-insert

  ...

  const handleSearchSubmit = event => {
# start-insert
    handleSearch(searchTerm, 0);
# end-insert

    event.preventDefault();
  };

  const handleLastSearch = searchTerm => {
    setSearchTerm(searchTerm);

# start-insert
    handleSearch(searchTerm, 0);
# end-insert
  };

# start-insert
  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
# end-insert
    setUrls(urls.concat(url));
  };

  ...
};
```

Um die nächste Seite abzurufen, erhöhst du das Argument `page` im neuen Handler, wenn auf eine Schaltfläche geklickt wird:

```js
const App = () => {
  ...

# start-insert
  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };
# end-insert

  ...

  return (
    <div>
      ...

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}

# start-insert
      <button type="button" onClick={handleMore}>
        More
      </button>
# end-insert
    </div>
  );
};
```


Wir haben das Abrufen von Daten mit dem dynamischen Argument `page` implementiert. Bei der ersten und letzten Suche wird immer die Seite (`0`) verwendet, und bei jedem Abruf mit der Schaltfläche "More" eine inkrementierte. Beim Ausprobieren der Funktion gibt es einen entscheidenden Fehler: Die neuen Abfragen erweitern die vorherige Liste nicht, sondern ersetzen sie vollständig.

![](../images/concat.png)

Wir lösen dies im Reduzierer, indem wir vermeiden, aktuelle `data` durch neue `data` zu ersetzen und die paginierten Listen verketten:

```js
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      ...
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
# start-insert
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
# end-insert
        page: action.payload.page,
      };
    case 'STORIES_FETCH_FAILURE':
      ...
    case 'REMOVE_STORY':
      ...
    default:
      throw new Error();
  }
};
```

Die angezeigte Liste wird vergrößert, nachdem mit der neuen Schaltfläche weitere Einträge abgerufen wurden. Dabei flimmert die Anzeige kurz. Der Grund hierfür ist, dass beim Abrufen paginierter Daten die Liste für einen Moment verschwindet, da die Ladeanzeige eingeblendet wird.

![](../images/flicker.png)

Gewünschtes Verhalten ist das Folgende: Die Liste ist am Anfang leere und die Schaltfläche "More" inklusive Ladeanzeige wird nur für ausstehende Anforderungen durch die Ladeanzeige ersetzt. Dies ist ein übliches Refactoring/Umarbeiten er Benutzeroberfläche für das bedingte Rendern, wenn sich die Ausgabe von einer einzelnen Liste hin zu paginierten verändert.

```js
const App = () => {
  ...

  return (
    <div>
      ...

# start-insert
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
# end-insert

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
# start-insert
        <button type="button" onClick={handleMore}>
          More
        </button>
# end-insert
      )}
    </div>
  );
};
```

Es ist jetzt möglich, laufende Daten für beliebte Items abzurufen. Wenn du mit APIs von Drittanbietern arbeitest, ist es immer sinnvoll, die Grenzen zu erkunden. Jede Remote-API gibt unterschiedliche Datenstrukturen zurück, sodass ihre Funktionen variieren.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Paginated-Fetch).
  * Reflektiere die [Änderungen gegenüber dem letzten Kapitel](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Remember-Last-Searches...hs/Paginated-Fetch?expand=1).
  * Besuche die [Hacker News API-Dokumentation](https://hn.algolia.com/api) erneut und kläre folgende Frage: Gibt es eine Möglichkeit, weitere Elemente in einer Liste für eine Seite abzurufen, indem du dem API-Endpunkt Parameter hinzufügst?
* Gehe zurück zu dem Anfang dieses Abschnitts, in dem ich Paginierung erklärte. Wie implementierst du eine normale Paginierungs-Komponente mit Schaltflächen von 1- [3] -10, bei der ein Klick auf jede einzelne nur die Items einer Seite der Liste abruft und anzeigt?
* Wie implementierst du anstelle von "More" eine unendliche Paginierung mit einer Bildlauftechnik? Anstatt auf eine Schaltfläche zum expliziten Abrufen zu klicken, ruft der unendliche Bildlauf die nächste Seite ab, sobald das Ansichtsfenster des Browsers den unteren Rand der angezeigten Liste erreicht.
<img src="https://vg01.met.vgwort.de/na/8833811703b4439c91bfe22f3a0df63f" width="1" height="1" alt="">