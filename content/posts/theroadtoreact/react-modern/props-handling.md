---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Eigenschaften (Props) in React (fortgeschrittene Anleitung)'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-props-handling
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Eigenschaften (Props) in React (fortgeschrittene Anleitung)

Eigenschaften (Props) werden im Komponentenbaum von oben nach unten übergeben. Da wir Props verwenden, um Informationen von Komponente zu Komponente --- manchmal mithilfe anderer dazwischen liegender Komponenten --- zu transportieren, ist es hilfreich, einige Tricks zu kennen, die das Übergeben bequemer gestalten.

*Hinweis: Die nachfolgenden Tipps zur Überarbeitung zeige ich dir, damit du verschiedene JavaScript/React-Muster kennenlernst. Zum Erstellen einer React-Anwendungen sind diese keine Voraussetzung. Betrachte sie als fortgeschrittene Techniken, die deinen Quellcode verbessern.*

Props sind JavaScript-Objekte, andernfalls wäre es nicht möglich, in einer Komponente auf `props.list` oder `props.onSearch` zuzugreifen. Da eine Eigenschaft ein Objekt ist, das nur Informationen von einer Komponente an eine andere weitergibt, ist es möglich, JavaScript-Tricks darauf anwenden. Beispiel: Zugriff auf die Eigenschaften eines Objekts mithilfe von [JavaScript-Objekt Destrukturierung](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```
const user = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

// Ohne destrukturierende Zuweisung
const firstName = user.firstName;
const lastName = user.lastName;

console.log(firstName + ' ' + lastName);
// "Robin Wieruch"

// Mit destrukturierender Zuweisung
const { firstName, lastName } = user;

console.log(firstName + ' ' + lastName);
// "Robin Wieruch"
```

Wenn wir auf zwei oder mehr Eigenschaften eines Objekts zugreifen, ist die Verwendung einer Codezeile anstelle von mehreren Zeilen eleganter. Aus diesem Grund wird die Objekt-Destrukturierung in JavaScript gerne und häufig verwendet. Übertragen wir dieses Wissen auf die Eigenschaften in der Search-Komponente. Dazu verwandeln wir zuerst die Pfeilfunktion in Search vom prägnanten knappen Körper in den gewöhnlichen Blockkörper:

```js
# start-insert
const Search = props => {
  return (
# end-insert
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
    </div>
# start-insert
  );
};
# end-insert
```

Danach ist es möglich die Destrukturierung auf das `props`-Objekts im Funktionskörper der Komponente anzuwenden:

```js
const Search = props => {
# start-insert
  const { search, onSearch } = props;
# end-insert

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
# start-insert
        value={search}
        onChange={onSearch}
# end-insert
      />
    </div>
  );
};
```

Auf diese Weise ist es möglich, die Eigenschaften des Objekts bequem in der Komponente zu verwenden. Unumgänglich ist es, die Pfeilfunktion innerhalb von Search vom knappen prägnanten Körper in den gewöhnlichen Blockkörper umzugestalten, um auf die Eigenschaften von `props` mithilfe der Destrukturierung zuzugreifen. Eine große Vereinfachung ist dies somit nicht, da wir unsere Komponenten ständig umgestalten. Gehen wir deshalb einen Schritt weiter, indem wir das `props`-Objekt sofort in der Funktionssignatur unserer Komponente destrukturieren und den Blockkörper erneut weglassen:

```js
# start-insert
const Search = ({ search, onSearch }) => (
# end-insert
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={search}
      onChange={onSearch}
    />
  </div>
 # start-insert
);
# end-insert
```

`props` werden selten nur innerhalb der eigenen Komponente verwendet, sondern mit anderen geteilt. Indem wir das Objekt `props` sofort in der Funktionssignatur destrukurieren ist es möglich, bequem auf alle Informationen zuzugreifen, ohne `props` vorher zu bearbeiten. Das Erkennen und Verinnerlichen dieser Vereinfachung ist das Lernziel des Kapitels. Im Weiteren werden wir hierauf aufbauen und die Art und Weise, wie wir destrukturieren verbessern. 

Schauen wir uns ein anderes Szenario an, und tauchen dabei tiefer in die Welt der `props` ein: Hierzu erstellen wir als erstes eine neue Item-Komponente. Dann nutzen wir unser gelerntes Wissen und setzen dieses destrukturiert in `List` ein:

```js
# start-insert
const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);
# end-insert

# start-insert
const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);
# end-insert
```

`item` in der Item-Komponente hat etwas mit den zuvor besprochenen `props` gemeinsam: Beide sind JavaScript-Objekte. `item` wurde aus den `props` in der Funktionssignatur der Item-Komponente destrukturiert. Es wird nicht direkt in Item verwendet. `item` gibt seine Informationen (Eigenschaften) einzig und allein an andere Elemente weiter.

Wie du im Folgenden feststellen wirst, ist diese Lösung zweckmäßig. Dessen ungeachtet zeige ich dir zwei weitere Variationen, da du so nebenbei Vieles über JavaScript-Objekte lernst und es meiner Meinung nach nie schadet über den Tellerrand zu schauen. Sehen wir uns zunächst die *verschachtelte Destrukturierung* an:

```
const user = {
  firstName: 'Robin',
  pet: {
    name: 'Trixi',
  },
};

// Ohne Objekt Destrukturierung
const firstName = user.firstName;
const name = user.pet.name;

console.log(firstName + ' hat ein Haustier ' + name);
// "Robin hat ein Haustier namens Trixi"

// Mit verschachtelter Objekt Destrukturierung
const {
  firstName,
  pet: {
    name,
  },
} = user;

console.log(firstName + ' hat ein Haustier ' + name);
// "Robin hat ein Haustier namens Trixi"
```

Die verschachtelte Destrukturierung unterstützt uns beim Zugriff auf Eigenschaften, die vielschichtig sind. Im Beispiel wäre dies der Name des Haustiers. Da das Objekt "item" in der Item-Komponente niemals direkt verwendet wird, setzen wir in der Funktionssignatur die *verschachtelte Destrukturierung* ein:

```js
// Variante 1: Verschachtelte Destrukturierung

const Item = ({
# start-insert
  item: {
    title,
    url,
    author,
    num_comments,
    points,
  },
# end-insert
}) => (
  <div>
    <span>
# start-insert
      <a href={url}>{title}</a>
# end-insert
    </span>
# start-insert
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
# end-insert
  </div>
);
```

Wir sammeln mithilfe der verschachtelte Destrukturierung alle erforderlichen Informationen des Objekts "item" in der Funktionssignatur. So ist es möglich, diese unmittelbar der Komponente zu verwenden. Verschachtelte Destrukturierung führt unter Umständen zu Unordnung durch Einrückungen in der Funktionssignatur. Obwohl dies nicht die lesbarste Option ist, gibt es Szenarien, in denen sie nützlich ist.

Lass uns einen anderen Ansatz mit dem [Spread-Operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_syntax) und dem [Rest-Parameter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/rest_parameter) in JavaScript ansehen. Um unser Beispiel darauf vorzubereiten, werden wir die List- und die Item-Komponente umgestalten. Anstatt das Element `item` als Objekt von List an Item zu übergeben, reichen wir die Eigenschaften einzeln weiter:

```js
// Variante 2: Spread- und Rest-Parameter
// 1. Iteration

const List = ({ list }) =>
  list.map(item => (
    <Item
      key={item.objectID}
# start-insert
      title={item.title}
      url={item.url}
      author={item.author}
      num_comments={item.num_comments}
      points={item.points}
# end-insert
    />
  ));

# start-insert
const Item = ({ title, url, author, num_comments, points }) => (
# end-insert
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);
```
Die Funktionssignatur der Item-Komponente ist jetzt präziser. Dafür ist List unübersichtlicher, da jede Eigenschaft einzeln aufgeführt ist. Verbessern wir dies mithilfe des [JavaScript-Spread-Operators](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_syntax). Als Erstes sehen wir uns die Syntax unabhängig von unserer Beispielanwendung kurz an. Du siehst im nachfolgenden Beispiel drei Punkte. Welchen Zweck erfüllen die? Kurz und knapp: Die Spread-Syntax ermöglicht die Erweiterung eines Ausdrucks an Stellen, an denen mehrere Argumente erwartet werden.

```
const profile = {
  firstName: 'Robin',
  lastName: 'Wieruch',
};

const address = {
  country: 'Germany',
  city: 'Berlin',
  code: '10439',
};

const user = {
  ...profile,
  gender: 'male',
  ...address,
};

console.log(user);
// {
//   firstName: "Robin",
//   lastName: "Wieruch",
//   gender: "male"
//   country: "Germany,
//   city: "Berlin",
//   code: "10439"
// }
```

Mit dem Spread-Operator verteilen wir alle Schlüssel/Wert-Paare der Objekte `profil` und `address` auf `user`. Dies ist mithilfe von Reacts JSX möglich. Anstatt, wie zuvor, jede Eigenschaft einzeln über `props` von List an Item zu übergeben, verwenden wir den Spread-Operator, um alle Schlüssel/Wert-Paare eines Objekts auf einen Schlag als Attribut/Wert-Paare an ein JSX-Element zu übergeben:

```js
// Variante 2: Spread- und Rest-Parameter
// 2. Iteration

const List = ({ list }) =>
# start-insert
  list.map(item => <Item key={item.objectID} {...item} />);
# end-insert

const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);
```

Durch dieses Refactoring ist die Übergabe der Informationen von List an Item präziser. Im nächsten Schritt setzten wir [JavaScript-Restparameter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/rest_parameters) als Sahnehäubchen oben drauf. Der Rest-Parameter ist zwingend das letzte Argument in einer Signatur. Sieh dir zunächst die Syntax unabhängig von unserem Anwendungsbeispiel an:

```
const user = {
  id: '1',
  firstName: 'Robin',
  lastName: 'Wieruch',
  country: 'Germany',
  city: 'Berlin',
};

const { id, country, city, ...userWithoutAddress } = user;

console.log(userWithoutAddress);
// {
//   firstName: "Robin",
//   lastName: "Wieruch"
// }

console.log(id);
// "1"

console.log(city);
// "Berlin"
```

Obwohl beide eine ähnliche Syntax haben (drei Punkte) gibt es Unterschiede: Während der Rest-Parameter auf der rechten Seite einer Zuweisung steht, wird der Spread-Operator auf der linken eingefügt. Der Rest-Parameter wird verwendet, um ein Objekt von einigen seiner Eigenschaften zu trennen.

Verwenden wir den Rest-Parameter in unserer List-Komponente, um die `objectID` vom `item`-Element zu trennen, da diese nur als `key` verwendet wird. Das verbleibende (Rest-)Element wird wie zuvor als Attribut/Wert-Paar an die Item-Komponente übergeben:

```js
// Variante 2: Spread-Operator und Rest-Parameter (fertig)

const List = ({ list }) =>
# start-insert
  list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);
# end-insert

const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>
);
```

Diese letzte Variante ist die prägnanteste, enthält dabei aber erweiterte JavaScript-Funktionen, die relativ unbekannt und komplex sind.

Im aktuellen Kapitel haben wir etwas über die Destrukturieung von JavaScript-Objekten gelernt. Diese wird häufig für auf `props` angewendet. Wir haben verschachtelte Destrukturierung verwendet (Variante 1). Das hat in unserem Fall keine Vorteile gebracht. Last but not least hast du den Spread-Operator und den Rest-Parameter kennengelernt. Beide werden verwendet, um ein Objekt, in der Regel `props`, auf knappe und präzise Weise von einer Komponente an eine andere zu übergeben. Am Ende dieses Kapitels komme ich auf die ursprüngliche Version des Codes unserer Anwendung zurück, die wir im Weiteren nutzen werden:

```js
const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);
```

Diese Version ist nicht die prägnanteste, aber die einfachsten. Variante 1 mit ihrer verschachtelten Destrukturierung hat keinen Nutzen gebracht, und Variante 2 fügt zu viele erweiterte JavaScript-Funktionen (Spread-Operator, Rest-Parameter) hinzu, die nicht jedem bekannt sind. Alle haben ihre Vor- und Nachteile. Achte beim Refactoring einer Komponente immer auf Lesbarkeit, insbesondere wenn du in einem Team arbeitest, und stelle sicher, dass ein gemeinsamen React-Code-Stil verwendet wird.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Props-Handling).
  * Reflektiere die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/React-Controlled-Components...hs/Props-Handling?expand=1).
* Lese mehr zum Thema [JavaScript's destructuring assignment](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).
* Überlege, was genau der Unterschied zwischen der Destrukturierung von JavaScript-Arrays --- die wir für den `useState`-Hook von React verwendet haben --- und der Objekt-Destrukturierung ist.
* Lese mehr über den [JavaScript-Spread-Operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
* Lese mehr über den [JavaScript-Rest-Parameter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Functions/rest_parameters).
* Verteife dein Wissen in Bezug auf JavaScript (Spread-Operator, Rest-Parameter, Destrukturierung) und die Wechselwirkungen mit React --- beispielsweise den Eigenschaften (Props).
* Verwende weiterhin die Methode deiner Wahl, beim Arbeiten mit Eigenschaften (Props). Wenn du unentschlossen bist, nutze die Variante des vorherigen Abschnitts.
<img src="https://vg01.met.vgwort.de/na/a38bdffa57a44accb8c37907573b7b37" width="1" height="1" alt="">