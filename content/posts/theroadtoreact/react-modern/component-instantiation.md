---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Instanziierung einer Komponente in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-instanziierung-einer-komponente
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Instanziierung einer Komponente in React

Als Nächstes werde ich kurz auf JavaScript-Klassen eingehen. Dies ist hilfreich, um Komponenten in React besser einzuordnen. Technisch gesehen unterscheiden die beiden sich, was wichtig ist! Trotzdem bin ich der Meinung, dass die folgenden Erklärungen hilfreich sind, um eine React-Komponente vom Konzept her zu verstehen.

Klassen verwenden wir in der Regel in objektorientierten Programmiersprachen. JavaScript ermöglicht es funktional und objektorientiert zu programmieren. Sieh dir die folgende Klasse an, um dir die letztere Technik in JavaScript zu vergegenwärtigen:

```
class Developer {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

Jede Klasse verfügt über einen Konstruktor, der Argumente als Eingabe entgegen nimmt und diese der Klasseninstanz zuweist. Eine Klasse definiert Funktionen (beispielsweise `getName`), diese nennt man im objektorientierten Kontext **Methoden** oder **Klassenmethoden**.

Das einmalige Definieren der Klasse ist nur ein Teil, diese zu Instanziieren ist der anderer Teil, der im Ergebnis das Objekt erzeugt. Die Klassendefinition ist vereinfacht ausgedrückt die Blaupause ihrer Eigenschaften und Methoden. Wenn eine Instanz mit der Anweisung `new` erstellt wird, ergo wenn die Klasse instanziiert wird, wird diese angewendet. In der Definition weiß man, dass ein Developer die Eigenschaft `name` hat. Nachdem das Objekt instanziiert wurde, ist es möglich, *Dennis* und *Robin* zu unterscheiden:

```
// class definition
class Developer { ... }

// class instantiation
const robin = new Developer('Robin', 'Wieruch');

console.log(robin.getName());
// "Robin Wieruch"

// another class instantiation
const dennis = new Developer('Dennis', 'Wieruch');

console.log(dennis.getName());
// "Dennis Wieruch"
```

Wenn eine Klassendefinition vorhanden ist, ist es möglich *mehrere* Instanzen davon zu erstellt. Dies ähnelt einer React-Komponente, die nur *eine* Komponentendefinition, aber in der Regel *mehrere* Komponenteninstanzen hat:

```js
// definition of App component
function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />

      <hr />

      {/* creating an instance of List component */}
      <List />
      {/* creating another instance of List component */}
      <List />
    </div>
  );
}

// definition of List component
function List() { ... }
```

Sobald du eine **Komponente** definiert hast, ist es möglich diese wie ein HTML-**Element** überall in JSX zu verwenden. Das Element erzeugt eine **Komponenteninstanz** --- die Komponente wird "instanziiert". Es ist möglich, beliebig viele Komponenteninstanzen zu erstellen. Das "Instanziieren" unterscheidet sich nicht wesentlich von der Definition und Verwendung einer normalen Klasse.

### Übungen:

* Mache dich mit den Begriffen *Komponentendefinition*, *Komponenteninstanz* und *Element* vertraut.
* Experimentiere, indem du mehrere Komponenteninstanzen der List-Komponente erstellst.
* Überlege, wie es möglich ist, jeder List-Komponente eine eigene `list` zuzuordnen.
<img src="https://vg02.met.vgwort.de/na/d96f16455251429994be81236e7a94ab" width="1" height="1" alt="">
