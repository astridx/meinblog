---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Kontrollierte Komponenten in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-kontrollierte-komponenten
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Kontrollierte Komponenten in React

**Kontrollierte Komponenten** sind nicht zwingen React-Komponenten. Es handelt sich aber immer um HTML-Elemente. In diesem Abschnitt erfährst du, wie du Search und ihr Eingabefeld in eine kontrollierte Komponente umwandelst.

Lass uns ein Szenario durchdenken, das dir verdeutlicht, warum es sinnvoll ist, dass wir das Konzept der kontrollierten Komponenten in unserer gesamten Anwendung einsetzen. Sieh dir den nachfolgenden Code an: Erkennst du, was falsch ist, wenn du beim `searchTerm` einen Anfangszustand setzt?

```js
const App = () => {
  const stories = [ ... ];

# start-insert
  const [searchTerm, setSearchTerm] = React.useState('React');
# end-insert

 ...
};
```

Falsch, oder nicht intuitiv ist das Folgende: Während List anhand des anfänglich gesetzten Suchstrings gefiltert wurde, zeigt das Eingabefeld den `searchTerm` nicht an. Uns ist wichtig, dass das Feld jederzeit den aktuell in der Anzeige verwendeten `searchTerm` widerspiegelt. Nur so ist die Ausgabe konsistent und widerspruchsfrei. Beim ersten Aufruf wird die Liste nach der letzten Änderung anhand des `searchTerm` "React" gefiltert, aber das Eingabefeld bleibt leer. Die Ausgabe ist inkonsistent.

Um eine konsistente Ausgabe zu erreichen, verwandeln wir die Suchkomponente mit ihrem Eingabefeld in eine kontrollierte Komponente. Bisher weiß das Feld nichts über den `searchTerm`. Das Änderungsereignis wird nur für die Aktualisierung der Anzeige verwendet. Aber: Das Eingabefeld hat ein Attribut namens `value` welches wir nutzen werden.

```js
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('React');

  ...

  return (
    <div>
      <h1>My Hacker Stories</h1>

# start-insert
      <Search search={searchTerm} onSearch={handleSearch} />
# end-insert

      ...
    </div>
  );
};

const Search = props => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
# start-insert
      value={props.search}
# end-insert
      onChange={props.onSearch}
    />
  </div>
);
```

Jetzt zeigt das Eingabefeld beim Start der Anwendung den korrekten Anfangswert. Dabei verwendet es `searchTerm` aus dem React-Status. Wenn wir "searchTerm" ändern, erzwingen wir außerdem, dass das Eingabefeld den Wert aus dem React-Status verwendet (über Props). Zuvor verwaltete das Feld seinen Status nativ mit HTML.

![](../images/controlled-component.png)

In diesem Abschnitt haben wir kontrollierte Komponenten kennengelernt und ein neues Konzept entdeckt, das **unidirektionaler Datenfluss** genannt wird:

{title="Visualization",lang="javascript"}
```
UI -> Side-Effect -> State -> UI -> ...
```

Eine React-Anwendung und ihre Komponenten haben beim ersten Aufruf einen Anfangszustand, der gegebenenfalls als Eigenschaft (Props) an andere Komponenten weitergegeben wird. Beim ersten Aufruf wird eine Benutzeroberfläche gerendert. Sobald ein Ereignis wie zum Beispiel eine Benutzereingabe oder das Laden von Daten von einer Remote-API eintritt, wird die Änderung im Status erfasst. Wenn dann der Status geändert wurde, werden alle vom veränderten Status oder den implizit geänderten Eigenschaften (Props) betroffenen Komponenten erneut gerendert. Dies bedeutet, dass die Komponentenfunktionen nochmals aufgerufen werden.

In den vorherigen Abschnitten haben wir unter anderem den **Komponentenlebenszyklus** von React kennengelernt. Zunächst werden alle Komponenten von oben nach unten in der Komponentenhierarchie erstellt. Dies schließt alle Hooks (zum Beispiel `useState`) ein, die mit ihren Anfangswerten instanziiert werden. Ab dann wartet die Benutzeroberfläche auf Ereignisse wie Benutzerinteraktionen. Sobald der Status geändert wurde --- der aktuelle Status wurde beispielsweise über die Statusaktualisierungsfunktion von `useState` verändert --- werden alle von dem geänderten Status oder den geänderten Eigenschaften (Props) betroffenen Komponenten erneut gerendert.

Bei jedem erneuten Aufruf einer Komponente wird der *aktuelle Wert* (zum Beispiel der aktuelle Status) aus den Hooks entnommen und *nicht* ein weiteres Mal initialisiert. Erscheint dir das seltsam? Du meinst, es wäre intuitiv die Hook-Funktion `useState` mit ihrem Anfangswert erneut zu initialisiert? Das ist aber in Reacht nicht so! Hooks werden nur einmal initialisiert. Die Initialisierung geschieht, wenn die Komponente zum ersten Mal gerendert wird. Danach verfolgt React sie intern und aktualisiert so die Werte.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/React-Controlled-Components).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/Lifting-State-in-React...hs/React-Controlled-Components?expand=1).
* Lese mehr zum Thema [kontrollierte Komponenten in React](https://www.robinwieruch.de/react-controlled-components/).
* Experimentiere mit der Anweisung `console.log()` und beobachten dabei wie deine Eingaben gerendert werden --- anfangs und nach Änderungen im Eingabefeld.
<img src="https://vg02.met.vgwort.de/na/6c510bd1c2004d2287e0b8832acce273" width="1" height="1" alt="">