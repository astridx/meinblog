---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Unmöglicher Status'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-nicht-moeglicher-status
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Unmöglicher Status

Hast du eine Diskrepanz zwischen den einzelnen Zuständen in der App-Komponente bemerkt? Diese scheinen aufgrund der `useState`-Hooks eine Einheit zu bilden. Technisch gesehen gehören alle Zustände, die sich auf die asynchronen Daten beziehen, zusammen. Womit ich nicht nur die `stories` als Echtdaten, sondern ebenfalls ihre Lade- und Fehlerzustände meine.

Mehrere `useState`-Hooks in einer React-Komponente stellen grundsätzlich kein Problem dar. Sei aber vorsichtig, bei kurz aufeinander folgenden Statusaktualisierungsfunktionen. Die bedingten Zustände führen unter Umständen zu **nicht möglichen Status** und unerwünschtem Verhalten in der Benutzeroberfläche. Ändere die Funktion zum Abrufen der Beispieldaten wie folgt, um eine Fehlerbehandlung zu simulieren:

```js
const getAsyncStories = () =>
  new Promise((resolve, reject) => setTimeout(reject, 2000));
```

Ein nicht möglicher Zustand tritt im Falle eines Fehlers beim Abruf der asynchronen Daten auf. Der Status für die Fehlermeldung wird festgelegt, aber der Status für die Ladeanzeige wird nicht widerrufen. In der Benutzeroberfläche führt dies zu einer unendlich langen Anzeige der Ladeinfo bei gleichzeitigem Einblenden des Fehlerhinweises. Korrekt wäre es, die Ladeanzeige auszublenden, wenn die Fehlermeldung eingeblendet wird. Nicht mögliche Zustände sind schwer zu erkennen. Deshalb verursachen sie nicht selten Fehler im Bereich der Benutzeroberfläche.

Glücklicherweise vermeiden wir viele Fehler, indem wir Zustände, die in mehreren `useState`- und `useReducer`-Hooks berechnet werden, in einem einzigen `useReducer`-Hook vereinen. Sieh dir diesbezüglich den nachfolgenden `useState`-Hook:

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  ...
};
```

Vereine die beiden `useState`-Hooks im `useReducer`-Hook. So erreichst du eine einheitliche Statusverwaltung und verfügst über ein komplexes Status-Objekt:

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
# start-insert
    { data: [], isLoading: false, isError: false }
# end-insert
  );

  ...
};
```

Alles, was mit dem asynchronen Datenabruf zusammenhängt, verwendet die Dispatch-Funktion für Statusübergänge:

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  React.useEffect(() => {
# start-insert
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
# end-insert

    getAsyncStories()
      .then(result => {
        dispatchStories({
# start-insert
          type: 'STORIES_FETCH_SUCCESS',
# end-insert
          payload: result.data.stories,
        });
      })
      .catch(() =>
# start-insert
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
# end-insert
      );
  }, []);

  ...
};
```

Da wir neue Typen für Zustandsübergänge eingeführt haben, behandeln wir diese in der Reduzier-Funktion `storiesReducer`:

```js
const storiesReducer = (state, action) => {
  switch (action.type) {
# start-insert
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
# end-insert
    default:
      throw new Error();
  }
};
```

In er jetzigen Version unserer Anwendung geben wir bei jedem Statusübergang ein *neues Status*-Objekt zurück. Dieses enthält alle Schlüssel/Wert-Paare des *aktuellen Status*-Objekts (über den [JavaScript-Spread-Operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_operator)) und die Möglichkeit, Eigenschaften zu überschreiben. Zum Beispiel setzt `STORIES_FETCH_FAILURE` die Variable `isLoading` zurück. Im Gegensatz dazu behält die booleschen Variable `isError` alle Zustände bei (zum Beispiel `stories`). So beheben wir den zuvor festgestellten Mangel, bei dem der Ladeindikator im Fehlerfall weiterhin angezeigt wurde.

Beachte, wie sich die Aktion `REMOVE_STORY` geändert hat. Sie nutzt `state.data`, anstelle von `state`. Der Status ist jetzt ein komplexes Objekt mit Daten-, Lade- und Fehlerzuständen. Vorher enthielt er nichts weiter als die Liste von Storys. Überarbeiten wir den restlichen Code im Hinblick auf diese Änderung:

```js
const App = () => {
  ...

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  ...

# start-insert
  const searchedStories = stories.data.filter(story =>
# end-insert
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      ...

# start-insert
      {stories.isError && <p>Something went wrong ...</p>}
# end-insert

# start-insert
      {stories.isLoading ? (
# end-insert
        <p>Loading ...</p>
      ) : (
        <List
          list={searchedStories}
          onRemoveItem={handleRemoveStory}
        />
      )}
    </div>
  );
};
```

Versuche erneut, die Funktion zu verwenden, und prüfe, ob jetzt alles wie erwartet funktioniert:

```js
const getAsyncStories = () =>
  new Promise((resolve, reject) => setTimeout(reject, 2000));
```

Perfekt! Wir haben unsere Anwendung insofern verbessert, dass wir unzuverlässige Zustandsübergänge mit mehreren `useState`-Hooks in vorhersehbare abgeändert haben. Hierzu haben wir Reacts useReducer-Hook eingesetzt. Das vom Reduzierer verwaltete Statusobjekt kapselt alles, was mit `stories` zusammenhängt, einschließlich Lade- und Fehlerstatus und Implementierungsdetails wie das Entfernen eines Elements aus der Liste. Wir haben nicht alle möglichen Zustände behandelt. Aber wir sind unserem Ziel einen Schritt näher gekommen und haben ein vorhersehbares Ereignis im Zustandsmanagement aufgenommen.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Impossible-States).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Advanced-State...hs/React-Impossible-States?expand=1).
* Lese die zuvor verlinkten Tutorials zu Reduzierern in JavaScript und React.
* Lese mehr zum Thema ["Wann sollte `useState` oder `useReducer` in React verwendet werden?"](https://www.robinwieruch.de/react-usereducer-vs-usestate).
<img src="https://vg01.met.vgwort.de/na/a7826e61fede401ea4d3c5c14efa07a7" width="1" height="1" alt="">
