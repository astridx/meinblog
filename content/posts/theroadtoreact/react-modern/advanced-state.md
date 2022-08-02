---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'React Status (fortgeschrittene Anleitung)'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-status
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## React Status (fortgeschrittene Anleitung)

Das Statusmanagement in unserer Anwendung verwendet den `useState`-Hook. Eine ausgefeilte Statusverwaltung nutzt zusätzlich unter Umständen den **useReducer-Hook**. Das Konzept der Reduzierungen in JavaScript wird kontrovers diskutiert. Auf die Diskussion werde ich hier nicht eingehen. Unbeachtet lasse ich das Thema aber ebenfalls nicht. Die Übungen am Ende dieses Abschnitts geben dir genug Material, um dir deine eigene Meinung zu bilden.

Wir werden die Statusverwaltung der `stories` vom `useState`-Hook in einen neuen Hook --- den `useReducer`-Hook verschieben. Führe zunächst eine Reduzierer-Funktion außerhalb der App-Komponenten ein. Eine solche empfängt immer einen `state` und eine `action`. Basierend auf diesen beiden Argumenten gibt ein Reduzierer einen neuen Status zurück:

```js
# start-insert
const storiesReducer = (state, action) => {
  if (action.type === 'SET_STORIES') {
    return action.payload;
  } else {
    throw new Error();
  }
};
# end-insert
```

`action` wird oft mit einem Typ `type` assoziiert. Wenn dieser Typ einer Bedingung im Reduzierer entspricht (zum Beispiel ` action.type === ‚SET_STORIES‘)`), dann führe eine Aktion aus. Wenn dies nicht so ist, dann gib einen Fehler aus. Mit Letzterem erinnerst du dich selbst daran, dass hier die Implementierung lückenhaft ist. Die Funktion `storiesReducer` prüft den Typ `type` und gibt daraufhin `payload` der eingehenden Aktion zurück. Dabei wird der aktuelle Status nicht zur Berechnung des neuen verwendet --- der neue ist `payload`.

Tausche in der App-Komponente `useState` gegen `useReducer` aus, um den Status von `stories` reduziert zu verwalten. Konkret löschst du die Zeile `const [stories, setStories] = React.useState([]);` und fügst dafür das nachfolgende Codebeispiel ein. Der neue Hook erhält eine Reduzierer-Funktion und einen Anfangszustand als Argumente und gibt ein Array mit zwei Elementen zurück. Das erste ist der *aktuelle Status*, beim zweiten handelt es sich um die *Statusaktualisierungsfunktion* (*Dispatcher*), welche wir später implementieren:

```js
const App = () => {
  ...

# start-insert
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    []
  );
# end-insert

  ...
};
```

Nachfolgend ersetzen wir die Funktion `setStories` mit `dispatchStories`. `setStories` wurde bisher von `useState` verwendet und hat den Status direkt zurückzugeben. `useReducer` gibt nichts explizit zurück, vielmehr löst es erst eine Aktion aus. Diese beinhaltet einen Typ und die optionalen Daten `payload`:

```js
const App = () => {
  ...

  React.useEffect(() => {
    setIsLoading(true);

    getAsyncStories()
      .then(result => {
# start-insert
        dispatchStories({
          type: 'SET_STORIES',
          payload: result.data.stories,
        });
# end-insert
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  ...

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

# start-insert
    dispatchStories({
      type: 'SET_STORIES',
      payload: newStories,
    });
# end-insert
  };

  ...
};
```

Wenn du die Anwendung im Browser öffnest, wirst du keinen Unterschied feststellen, obwohl ein Reduzierer und der `useReducer`-Hook von React jetzt den Status der `stories`-Liste verwalten. Auf den ersten Blick wirkt dies umständlich. Im weiteren Verlauf sehen wir uns an, wo dies nützlich ist. Analysieren wir als Nächstes mehr als einen Zustandsübergang.

`handleRemoveStory` aktualisiert die `stories`-Liste ebenfalls. Es ist möglich, diese Logik in die Reduzierer-Funktion zu verschieben. Dies ist ein weiteres Beispiel für deklarative Programmierung. Anstatt den Code selbst zu schreiben und dem Reduzierer zu beschreiben, *wie etwas zu erledigen ist*, teilen wir ihm mit *was zu erledigen ist*. Alle Implementierungsdetails sind im Reduzierer gekapselt.

```js
const App = () => {
  ...

  const handleRemoveStory = item => {
# start-insert
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
# end-insert
  };

  ...
};
```

Jetzt deckt die Reduzierer-Funktion diesen Fall in einem neuen bedingten Zustandsübergang ab. Wenn die Bedingung zum Entfernen eines Elementes erfüllt ist, verfügt der Reduzierer über alle notwendigen Implementierungsdetails. Die Aktion enthält alle Informationen, die Kennung eines Elements, um es aus dem aktuellen Status zu entfernen und eine neue Liste gefilterter `stories` als Status zurückzugeben.

```js
const storiesReducer = (state, action) => {
  if (action.type === 'SET_STORIES') {
    return action.payload;
# start-insert
  } else if (action.type === 'REMOVE_STORY') {
    return state.filter(
      story => action.payload.objectID !== story.objectID
    );
  } else {
# end-insert
    throw new Error();
  }
};
```

Wenn du mehr Zustandsübergänge zur Reduzierer-Funktion hinzufügst, werden `if`-Anweisungen unübersichtlich. Verbessere die Lesbarkeit, indem du in deinem Code `switch`-Anweisung für alle Statusübergänge verwendest:

```js
const storiesReducer = (state, action) => {
# start-insert
  switch (action.type) {
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter(
        story => action.payload.objectID !== story.objectID
      );
    default:
      throw new Error();
  }
# end-insert
};
```

In diesem Abschnitt haben wir in das JavaScript Reduzierer-Konzept hineingeschnuppert. Wir implementierten zwei Zustandsübergängen und probierten aus, wie der aktuelle Zustand mithilfe einer Aktion in einen neuen umgewandelt wird. Als Beispiel diente die `stories`-Liste. Am Ende dieses Abschnitts legen wir eine `stories`-Liste für die asynchron ankommenden Daten fest und entfernen ein Element aus dieser, wobei die Logik für die Aktualisierung des Status mithilfe der Aktion an einer Stelle implementiert ist: dem `useReducer`-Hook.

Sieh dir die in den Übungen verlinkten Websites an, um das Reduzierer-Konzept in JavaScript und die Verwendung von **Reacts useReducer Hook** vollends zu verstehen.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Advanced-State).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Conditional-Rendering...hs/React-Advanced-State?expand=1).
* Lese mehr zum Thema [Reduzierer in JavaScript](https://www.robinwieruch.de/javascript-reducer).
* Lese mehr zu Reduzierern and dem `useReducer`-Hook in React ([0](https://www.robinwieruch.de/react-usereducer-hook), [1](https://de.reactjs.org/docs/hooks-reference.html#usereducer)).
<img src="https://vg01.met.vgwort.de/na/9aae1a4d0358463d8a1f23cfa7b08527" width="1" height="1" alt="">
