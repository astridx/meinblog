---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Legacy-React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-legacy-class-components
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---


React hat sich seit 2013 beachtenswert weiterentwickelt. Die Art und Weise, wie Anwendungen geschrieben werden, hat sich geändert --- und die Komponenten selbst. In der Vergangenheit wurden viele Applikationen anhand des damals gültigen Entwicklungsstandes erstellt. Diese entsprechen verständlicherweise nicht dem aktuellen Status Quo. Wenn du eine der älteren Apps ansiehst, wirst du auf den veralteten Code stoßen. Deshalb sehen wir uns hier jetzt historisch gewachsene React-Anwendungen an.

Ich werde nicht alles behandeln, was in React als Vermächtnis angesehen wird. Dies ist nicht sinnvoll, einige Funktionen wurden mehr als einmal überarbeitet. Mein Ziel ist es, dir ein generelles Verständnis für die Entwicklung von React zu vermitteln.

In diesem Abschnitt werden wir eine [moderne React-Anwendung](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-modern-final) mit einer [Legacy-Version](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-legacy) vergleichen. Wir werden dabei feststellen, dass die meisten Unterschiede zwischen modernen und älteren Anwendungen in Bezug auf Klassenkomponenten und Funktionskomponenten zu finden sind.

## Reacts Klassenkomponenten

Komponenten wurden in React häufig verändert --- von **createClass-Komponenten** über **Klassenkomponenten** bis hin zu **Funktionskomponenten**. Wenn du heute eine in der Vergangenheit erstellt React-Anwendung ansiehst, wirst du zweifelsohne Klassenkomponenten neben modernen Funktionskomponenten vorfinden.

Eine typische Klassenkomponente ist eine JavaScript-Klasse mit einer obligatorischen **Render-Methode**, welche JSX zurückgibt. Die Klasse erweitert `React.Component` um Funktionen (beispielsweise Status- und Lebenszyklusverwaltung, und Methoden für Seiten-Effekte) zu erben ([Klassenvererbung](https://de.wikipedia.org/wiki/Vererbung_(Programmierung)). Auf Eigenschaften (Props) wird über die Klasseninstanz (`this`) zugegriffen:

```
class InputWithLabel extends React.Component {
  render() {
    const {
      id,
      value,
      type = 'text',
      onInputChange,
      children,
    } = this.props;

    return (
      <>
        <label htmlFor={id}>{children}</label>
        &nbsp;
        <input
          id={id}
          type={type}
          value={value}
          onChange={onInputChange}
        />
      </>
    );
  }
}
```

Für eine Weile waren Klassenkomponenten die beliebte Wahl. Dann wurden Funktionskomponenten hinzugefügt, und beide existierten nebeneinander mit ihren unterschiedlichen Zwecken. Nachfolgend siehst du eine Funktionskomponente:

```
const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);
```

Vor 2018 --- vor der Einführung von React Hooks --- war es nicht möglich, mit einer Funktionskomponente Seiten-Effekte (`useEffect`-Hooks) oder einen Status (`useState`/`useReducer`-Hooks) zu verarbeiten. Deshalb bezeichnete man diese als **funktionale zustandslose Komponenten**. Sie wurden ausschließlich dazu verwendet, um Eigenschaften (Props) ein- und JSX auszugeben. Wenn man in einer Komponente einen Status oder Seiten-Effekte verwendete, war eine Klassenkomponente zwingend.

Seit der Einführung von Hooks funktionieren Funktionskomponenten genauso wie Klassenkomponenten --- einschließlich Status und Seiten-Effekten. Und da es keinen zweckdienlichen Unterschied mehr zwischen ihnen gibt, entschied sich die Community für Funktionskomponenten.

### Übungen:

* Lese mehr zum Thema [JavaScript Klassen](https://de.developer.mozilla.org/de/docs/Web/JavaScript/Reference/Classes).
* Lese mehr darüber, [wie man eine Klassenkomponente zu einer Funktionskomponente umarbeitet](https://www.robinwieruch.de/react-hooks-migration).
* Erfahre mehr über eine alternative [Syntax von Klassenkomponenten](https://github.com/the-road-to-learn-react/react-alternative-class-component-syntax), die nicht populär, aber effektiv ist.
* Verteife dein Wissen in Bezug auf die [Komponentenklasse `React.Component`](https://de.reactjs.org/docs/react-component.html).
* Lese mehr über [andere Komponententypen in React](https://www.robinwieruch.de/react-component-types).
<img src="https://vg04.met.vgwort.de/na/d2009390f8df4ac89a323d319bd1a167" width="1" height="1" alt="">
