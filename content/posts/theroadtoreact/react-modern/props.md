---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Eigenschaften (Props) in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-props
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Eigenschaften (Props) in React

Wir verwenden derzeit `list` als globale Variable in der Beispiel-Anwendung. `list` benutzen wir in der List-Komponente und in der App. Das funktioniert, wenn du nur eine Variable nutzt. Wenn zahlreiche über mehrere Komponenten genutzt werden, wirst du an Grenzen stoßen. Eine Lösungsmöglichkeit ist die Verwendung von Eigenschaften (Props).

Mithilfe von Eigenschaften übergeben wir Variablen als Informationen von einer Komponente an eine andere. Damit alles seine Ordnung hat und die liste `list` weiß wo sie hingehört und wer sie ist, verschieben wir sie aus dem globalen Bereich in die App-Komponente und geben ihr einen passenden Namen. Wir nennen sie `stories`:

```js
const App = () => {
# start-insert
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
# end-insert

  const handleChange = event => { ... };

  return ( ... );
};
```

Jetzt verwenden wir **React Eigenschaften (Props)**, um das Array `stories` an die List-Komponente zu übergeben:

```js
const App = () => {
  const stories = [ ... ];

  const handleChange = event => { ... };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <hr />

# start-insert
      <List list={stories} />
# end-insert
    </div>
  );
};
```

Die Variable heißt in der App-Komponente `stories` und wird unter diesem Namen an List übergeben. Beim Instanziieren der List-Komponente wird sie dem Attribut `list` zugewiesen. Wir greifen als `list` über das `props`-Objekt in der Funktionssignatur der Listenkomponente darauf zu:

```js
# start-insert
const List = props =>
  props.list.map(item => (
# end-insert
    <div key={item.objectID}>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  ));
```

So haben wir verhindert, dass die Variable `list`/`stories` den globalen Bereich unnötig belegt. Sie ist jetzt innerhalb der App positioniert. `stories` wird nicht direkt in der App verwendet. Sie wird in der untergeordneten List-Komponenten eingesetzt. Deshalb übergeben wir die Variable an diese. Dort greifen wir über das erste Argument der Funktionssignatur namens `props` darauf zu.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Props).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Handler-Function-in-JSX...hs/React-Props?expand=1).
* Lese mehr zum Thema: [Eigenschaften (Props) in React an Komponenten übergeben](https://www.robinwieruch.de/react-pass-props-to-component).
<img src="https://vg01.met.vgwort.de/na/4b778dd8618a4791b1d605038bd0ba5a" width="1" height="1" alt="">