---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Legacy-React Klassenkomponenten: Status'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-legacy-class-components-state
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Legacy-React Klassenkomponenten: Status

Vor der Einführung der React Hooks waren die Klassenkomponenten den Funktionskomponenten überlegen, da nur sie den Status verwalteten. Mit einem Klassenkonstruktor wird der Anfangszustand festgelegt. Außerdem gibt die Instanz der Komponente (`this`) jederzeit Zugriff auf den aktuellen Status (`this.state`) und die Statusaktualisierungsmethode der Komponente (`this.setState`):

```
class App extends React.Component {
  constructor(props) {
    super(props);

# start-insert
    this.state = {
      searchTerm: 'React',
    };
# end-insert
  }

  render() {
# start-insert
    const { searchTerm } = this.state;
# end-insert

    return (
      <div>
        <h1>My Hacker Stories</h1>

        <SearchForm
          searchTerm={searchTerm}
# start-insert
          onSearchInput={() => this.setState({
            searchTerm: event.target.value
          })}
# end-insert
        />
      </div>
    );
  }
}
```

Wenn der Status mehr als eine Eigenschaft in seinem Statusobjekt verwaltet, führt `setState` eine vereinfachte Aktualisierung durch. Nur die an `setState` übergebenen Eigenschaften werden aktualisiert. Alles andere bleibt, wie es ist. Für Frontend-Anwendungen ist die Statusverwaltung wichtig. Deshalb führte in der Vergangenheit ohne Hooks kein Weg an Klassenkomponenten vorbei.

In einer Klassenkomponente gibt es zur Statusverwaltung zwei dedizierte APIs: `this.state` und `this.setState`. In einer Funktionskomponente übernehmen heute die Hooks `useState` und `useReducer` diese Aufgabe. Verwandte Elemente werden in einen Hook gepackt, während eine Klassenkomponente nichts anderes als eine allgemeine Status-API verwendet. Dies war einer der Hauptgründe, Hooks einzuführen und sich von Klassenkomponenten zu verabschieden.

### Übungen:

* Erstelle eine statusbehaftete Klassenkomponente (beispielsweise ein Eingabefeld mit einem Label).
<img src="https://vg07.met.vgwort.de/na/d6bc8344d85642c795f658402a51daf8" width="1" height="1" alt="">
