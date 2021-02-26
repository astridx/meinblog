---
date: 2020-07-28
title: 'Grundlegendes zu Ereignisschleifen (Event Loop), Rückruffunktionen (Callback), Promises und Async/Await in JavaScript'
template: post
thumbnail: '../thumbnails/js.png'
slug: ereignisschleifen-rueckruffunktionen-promises-und-async-await-in-javascript
langKey: de
categories:
  - Code
  - Popular
tags:
  - JavaScript
---

Vor nicht allzulanger Zeit bestanden eine Website in der Regel aus statischen Daten in einer HTML-Datei. Dies hat sich rasant verändert. Eine Webanwendung ist heute interaktive und dynamisch. Meist ist es unerlässlich, externe Netzwerkanforderungen über eine Schnittstelle durchzuführen. Im Falle von JavaScript sind dann _asynchrone_ Programmiertechniken erforderlich.

Standardmäßig wird ein Skript innerhalb eines Browsers in Form eines einzigen Threads abgearbeitet. Eine Aktion wie das Anfordern einer Datei über eine API nimmt eine unbestimmte Zeit in Anspruch. Sie ist abhängig von der Größe der angeforderten Daten, der Geschwindigkeit der Netzwerkverbindung und anderen Faktoren. Wenn API-Aufrufe ausschließlich synchron abliefen, wäre es nicht möglich gleichzeitig Benutzereingaben wie Scrollen oder Klicken auf eine Schaltfläche zu verarbeiten. In einem Singlethread-Programm wird die Benutzeroberfläche _blockiert_, während andere Berechnungen ablaufen.

Um eine Blockierung zu verhindern, verfügt die Browserumgebung über Web-APIs die _asynchron_ sind und auf die JavaScript zugreift. Dies bedeutet, dass diese parallel zu anderen Vorgängen – anstatt nacheinander – ablaufen und es dem Benutzer gleichzeitig möglich ist, Eingaben zu tätigen.

Als JavaScript-Entwickler arbeitet man mit den asynchronen Web-APIs und behandelt potenzielle Fehler. Ich habe mir Ereignisschleifen, Rückruffunktionen, Promises und die moderne Praxis – sprich der Verwendung von „async/await“ – genauer angesehen.

> **Hinweis**: Dieser Artikel konzentriert sich auf clientseitiges JavaScript in der Browserumgebung.

## Die Ereignisschleife (Event Loop)

Thema des ersten Teils ist, wie JavaScript mit asynchronem Code in der Ereignisschleife umgeht. Wir sehen uns eine simple Schleife an. Dabei unterscheiden wir die beiden Hauptelemente: den Stapel und die Warteschlange.

JavaScript-Code, der keine asynchronen Web-APIs verwendet, läuft synchron ab - einzeln nacheinander. Dies demonstriert der nachstehende Beispielcode. Dieser ruft drei Funktionen auf, die jeweils eine Nummer in der Konsole ausgeben.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Titel</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script>
      function eins() {
        console.log(1)
      }

      function zwei() {
        console.log(2)
      }

      function drei() {
        console.log(3)
      }
      eins()
      zwei()
      drei()
    </script>
  </body>
</html>
```

In diesem Code definierst du drei Funktionen, die Zahlen mit `console.log()` drucken und rufst diese auf.

Die Ausgabe basiert auf der Reihenfolge, in der die Funktionen aufgerufen wurden:

```text
1
2
3
```

Wird eine asynchrone Schnittstelle verwendet, ist das Ganze komplizierter. Nutzen wir die Funktion `setTimeout()`, um uns dies zu verdeutlichen. `setTimeout()` setzt einen Timer fest und führt nach einer festgelegten Zeit eine Aktion aus. `setTimeout` ist asynchron, ansonsten würde das Skript nicht weiterlaufen.

Fügen wir der Funktion `zwei()` `setTimeout()` hinzu, um eine asynchrone Anforderung zu simulieren:

```javascript
...
function eins() {
	console.log(1);
}

function zwei() {
	setTimeout(() => {
		console.log(2)
	}, 0)
}

function drei() {
	console.log(3);
}
eins();
zwei();
drei();
...
```

Bei einem auf 0 gesetzten `setTimeout()` erwartet man, dass der Aufruf dieser drei Funktionen weiterhin die Zahlen aufeinanderfolgend ausgibt. Dies ist aber nicht so:

```text
1
3
2
```

Dies liegt daran, dass die JavaScript-Umgebung, in diesem Fall der Browser, ein Konzept namens _Ereignisschleife_ oder _Event Loop_ verwendet, um parallele Ereignisse zu verarbeiten. JavaScript ist sequentiell und ruft jeweils nur eine Anweisung auf. Deshalb wird ein Speichermodell verwendet, bei dem drei wichtige Bereiche zum Einsatz kommen: der Stack (Stapel), die Queue (Warteschlange) und der Heap (Haufen).

### Heap (Haufen)

Der Heap ist ein größerer Speicher, in dem Variablen, Funktionen und Objekte, die du mit deinem JavaScript erzeugst, gespeichert werden.

### Stack (Stapel)

Im Stack werden die zur aktuellen Ausführung benötigten Funktionen abgelegt und verarbeitet. Jede beinhaltet einen Zeiger zum Heap und den jeweils dazugehörigen Objekten, sprich: den Status der aktuell ausgeführten Funktion. JavaScript führt den aktuellen Funktionsaufruf im Stapel aus, entfernt ihn dann und fährt mit dem nächsten fort.

Führst du beispielsweise den oben stehenden synchronen Code aus, passiert Folgendes:

- Füge `eins()` zum Stapel hinzu, führe `eins()` aus, und entferne `eins()` vom Stapel.
- Füge `zwei()` zum Stapel hinzu, führe `zwei()` aus und entferne `zwei()` vom Stapel.
- Füge `drei()` zum Stapel hinzu, führe `drei()` aus und entferne `drei()`vom Stapel.

Das Beispiel mit `setTimout` sieht so aus:

- Füge `eins()` zum Stapel hinzu, führe `eins()` aus und entferne `eins()` vom Stapel.
- Füge `zwei()` zum Stapel hinzu und führe `zwei()` aus.
- Füge dem Stapel `setTimeout()` hinzu, führe `setTimeout()` aus (welche einen Timer aufruft und die anonyme Funktion zur _ Warteschlange _ hinzufügt) und entferne `setTimeout()` vom dem Stapel.
- entferne `zwei()` vom Stapel.
- Füge `drei()` zum Stapel hinzu, führe `drei()` aus und entferne `drei()`vom Stapel.
- Die Ereignisschleife überprüft die Warteschlange auf ausstehende Nachrichten und findet die anonyme Funktion von `setTimeout()`, fügt diese dem Stapel hinzu und entfernt sie vom Stapel.

Jetzt ist die Warteschlange in Spiel gekommen, die wir uns als Nächstes ansehen.

### Queue (Warteschlange)

Die Warteschlange ist ein Wartebereich für Funktionen. Die Queue enthält alle JavaScript-Befehle die zur Verarbeitung anstehen. Wenn du eine Funktion aufrufst, wird sie zusammen mit weiteren Dazugehörigen in der Queue abgelegt. Der Stack arbeitet die Queue in der gegebenen Reihenfolge ab.

> [First In – First out](https://de.wikipedia.org/w/index.php?title=First_In_%E2%80%93_First_Out&oldid=199843383) bezeichnet Verfahren der Speicherung, bei denen diejenigen Elemente, die zuerst gespeichert wurden, als erstes wieder aus dem Speicher entnommen werden. Eine solche Datenstruktur wird als Warteschlange bezeichnet.

Im Beispiel `setTimeout` wird die anonyme nach den anderen Funktionen aufgerufen. Sie wartete in der Queue. Der festgelegte Zeitwert ist die Minimum-Zeit und keine Garantie-Zeit bis zur Ausführung.

## Rückruffunktionen (Callback)

Im Beispiel `setTimeout` wurde die Funktion mit dem Timeout am Ende des Skriptes aufgerufen. Manchmal ist es wichtig, dass Aufruf am Ende geschieht. Dann greifen wir auf asynchrone Codierungsmethoden zu. Zum Beispiel auf Rückruffunktionen. Diese haben keine spezielle Syntax. Sie sind nichts weiter als eine Funktion, die als Argument an eine andere übergeben wird. Die andere heißt dabei _Funktion höherer Ordnung_. Jede ist eine Rückruffunktion, wenn sie als Argument eingesetzt wird. Rückrufe sind von Natur aus nicht asynchron, werden aber für diesen Zweck verwendet.

Zur Veranschaulichung ein Codebeispiel:

```javascript
...
function eineFunktion() {
	console.log('Eine Funktion')
}

function funktionHoehererOrndung(callback) {
	callback()
}

funktionHoehererOrndung(eineFunktion)
...
```

In diesem Code definieren wir zwei Funktionen. `eineFunktion` und `funktionHoehererOrndung`, die `callback` als Argument verwendet. Am Ende übergeben wir `eineFunktion` als Rückruf an `funktionHoehererOrndung`. Abstrahiert sieht der Einsatz einer Rückruffunktion simpel aus. Rufe den Code auf und die siehts Folgendes:

```text
Eine Funktion
```

Kehren wir zum ersten Beispiel zurück. Bisher haben wir folgenden Code:

```javascript
...
function eins() {
	console.log(1);
}

function zwei() {
	setTimeout(() => {
		console.log(2)
	}, 0)
}

function drei() {
	console.log(3);
}
eins();
zwei();
drei();
...
```

Ziel ist es, `drei()` dazu zu bringen, die Ausführung zu verzögern bis `zwei()` abgeschlossen ist. Hier kommen Rückrufe ins Spiel. Anstatt `eins`, `zwei` und `drei` auf der obersten Ausführungsebene auszuführen, übergeben wir `drei` als Argument an `zwei`. `zwei` führt den Rückruf aus, nachdem die eigene Aktion abgeschlossen ist.

Hier siehst du die drei Funktionen, auf die ein Rückruf angewendet wird:

```javascript
...
function eins() {
	console.log(1)
}

function zwei(callback) {
	setTimeout(() => {
		console.log(2);
		callback()
	}, 9000)
}

function drei() {
	console.log(3)
}
eins();
zwei(drei);
...
```

Dieser Code bewirkt die Ausgabe, wobei 2 und 3 erst nach 9 Sekunden abgedruckt werden:

```text
1
2
3
```

Durch Übergeben einer Funktion als Rückruf haben wir die Reihenfolge der Ausführung verzögert. Die Rückruffunktion ist nicht asynchron. Mit einem Callback informieren wir vielmehr darüber, dass eine andere Aufgabe abgeschlossen ist.

### Verschachtelte Rückrufe und die Pyramide des Untergangs (Pyramid of Doom)

So unkompliziert wie dies in der übersichtlichen Form wirkt, ist die Codiertechnik nicht. Es gibt Fallstricke – beispielsweise beim Verschachteln.

Rückruffunktionen sind eine effektive Möglichkeit, um die verzögerte Ausführung einer Funktion sicherzustellen, bis eine andere abgeschlossen ist. Aufgrund der verschachtelten Natur von Rückrufen wird Code schnell unübersichtlich:

```javascript
...
function pyramideDesUntergangs() {
  setTimeout(() => {
    console.log(1)
    setTimeout(() => {
      console.log(2)
      setTimeout(() => {
        console.log(3)
      }, 500)
    }, 2000)
  }, 1000)
};
pyramideDesUntergangs();
...
```

In diesem Code ist jedes neue `setTimeout` in einer Funktion höherer Ordnung verschachtelt, wodurch eine Pyramidenform mit immer tieferen Rückrufen entsteht. Dieses Beispiel bewirkt folgende Ausgabe:

```text
1
2
3
```

In der Praxis ist Code komplizierter als in diesem Beispiel und Rückrufe führen zu schwer zu lesendem und zu wartenden Code. Aus dem Grund wurde das Konzept der [Promises](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise) in [ECMAScript 2015 oder ES6](https://developer.mozilla.org/de/docs/Web/JavaScript) eingeführt.

## Promise

Ein Promise steht für den Abschluss einer asynchronen Funktion. Es ist ein Objekt, welches in Zukunft einen Wert zurückgibt. Es erreicht das Gleiche wie eine Rückruffunktion – mit vielen zusätzlichen Funktionen und einer besser lesbaren Syntax.

### Ein Promise erstellen

Initialisiere ein Promise mit der Syntax `new Promise`. Die Funktion, die an ein Promise übergeben wird, hat die Parameter `resolve (auflösen)` und `reject (zurückweisen)`:

```javascript
...
const promise = new Promise((resolve, reject) => {})
...
```

Wenn du das Promise über die Konsole protokollierst `console.log(promise);`, siehst du `Promise { <state>: "pending" }`.

Testen wir das Promise, indem wir es erfüllen. Dazu weisen wir ihm einen Wert zu:

```javascript
...
const promise = new Promise((resolve, reject) => {
	  resolve('Aufgelöst!')
});
...
```

Wenn du das Promise über die Konsole protokollierst `console.log(promise);`, siehst du `Promise { <state>: "fulfilled", <value>: "Aufgelöst!" }`.

Es gibt drei mögliche Zustände: ausstehend, erfüllt und abgelehnt:

- Pending (ausstehend) - Anfangszustand
- Fulfilled (erfüllt) - erfolgreich, Promise ist gelöst
- Rejected abgelehnt) - fehlgeschlagen, Promise abgelehnt

### Ein Promise konsumieren

Die Promise im letzten Abschnitt wurde mit einem Wert erfüllt. Wie greifen wir auf diesen Wer zu? Hierfür gibt es die Methode `then`. Die gibt den Wert des Promises als Parameter zurück. Zum Beispiel so wie im folgenden Code:

```javascript
...
const promise = new Promise((resolve, reject) => {
	resolve('Aufgelöst!')
});
promise.then((response) => {
  console.log(response)
});
...
```

Unser Promise hat den Wert `Aufgelöst!`. Dieser wird in der Konsole abgedruckt.

```text
Aufgelöst!
```

Testen wir mit `setTimeout` das Verhalten im Falle einer asynchrone Anfrage:

```javascript
...
const promise = new Promise((resolve, reject) => {
	setTimeout(() => resolve('Aufgelöst!'), 3000)
});
promise.then((response) => {
  console.log(response)
});
...
```

Die Verwendung der `then`-Syntax stellt sicher, dass die Antwort `response` nur protokolliert wird, wenn die `setTimeout()`-Operation nach `3000` Millisekunden abgeschlossen ist. Nach drei Sekunden wird der Promise-Wert aufgelöst und ausgegeben.

Es ist möglich, ein Promise mit einer anderen zu verketten:

```javascript
...
const promise = new Promise((resolve, reject) => {
	resolve('aufgelöst!')
});
promise
	.then((eins) => {
		return 'Verkettung ' + eins
	})
	.then((zwei) => {
		console.log(zwei)
	});
...
```

Die erfüllte Antwort sieht wie folgt aus:

```text
Verkettung aufgelöst!
```

Da `then` verkettet und nicht verschachtelt wird, ist er Code besser lesbar.

### Fehlerbehandlung

Bisher haben wir ein Promise nur in einem erfolgreichen Zustand verwendet. Bei asynchronen Anfragen kommt es häufig zu Fehlern. Simulieren wir eine solchen:

```javascript
...
const promise = new Promise((resolve, reject) => {
	if (true) {
		reject('Fehler!')
	} else {
		resolve('Aufgelöst!')
	}
});
promise
	.then((response) => {
		console.log(response)
	});
...
```

Die Ausgabe ist `Uncaught (in promise) Fehler!`. Den Fehler fangen wir mit der Methode `catch` ab:

```javascript
...
const promise = new Promise((resolve, reject) => {
	if (true) {
		reject('Fehler!')
	} else {
		resolve('Aufgelöst!')
	}
});
promise
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	});
...
```

Die Ausgabe ist nun `Fehler!`. Der Fehler ist nicht gelöst, aber wir haben in der Methode `catch` Handlungsmöglichkeiten.

Als Referenz eine Tabelle mit den Handler-Methoden für Promise-Objekte:

| Methode                                                                                                      | Beschreibung                                                     |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [`then()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)       | Behandelt eine `Lösung`.                                         |
| [`catch()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)     | Behandelt eine Ablehnung.                                        |
| [`finally()`](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) | Unabhängig, ob das Promise erfolgreich erfüllt wurde oder nicht. |

## Async-Funktionen mit `async/await`

### async

Mit der Funktion `async` behandeln wir asynchronen Code synchron, indem wir das Schlüsselwort `async` voranstellen:

```javascript
...
async function eins() {
	return "1";
}
console.log(eins());
...
```

Obwohl diese Funktion bisher nichts Asynchrones verarbeitet, verhält sie sich anders als eine herkömmliche. Wenn wir sie aufrufen, werden wir feststellen, dass sie ein Promise zurückgibt. Die Ausgabe ist:

```text
Promise { <state>: "fulfilled", <value>: undefined }
```

Dies bedeutet, dass eine `asynchrone` Funktion mit `then` anwendbar ist. Probiere dies mit folgendem Code aus:

```javascript
...
async function eins() {
	return "1";
}
eins().then((response) => console.log(response));
// oder kurz: eins().then(console.log);
...
```

Die Ausgabe ist:

```text
1
```

### await

Der wahre Vorteil von asynchronen Funktionen wird deutlich, wenn wir sie mit dem Schlüsselwort `await` kombinieren. `await` funktioniert nur in asynchronen Umgebungen.

Hier ist ein triviales Beispiel:

```javascript
...
function eins() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('1');
    }, 2000);
  });
}

async function f1() {
  var x = await eins();
  console.log(x);
  console.log('nach x');
}
f1();
...
```

Die Ausgabe ist:

```text
1
nach x
```

Zur Veranschaulichung ändern wir den Code wie folgt ab. Es fehlt nur das Wort `await`:

```javascript
...
function eins() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('1');
    }, 2000);
  });
}

async function f1() {
  var x = eins();
  console.log(x);
  console.log('nach x');
}
f1();
...
```

Jetzt wurde Auflösen des Promise nicht abgewartet. Die Ausgabe ist:

```text
Promise { <state>: "pending" }
nach x
```

## Fazit

Da Daten häufig ungleichzeitig bereitstehen, ist das Erlernen von asynchronen Aktionen ein wesentlicher Bestandteil eines JavaScript-Entwicklers. In diesem Beitrag hast du erfahren, wie Browser die Ereignisschleife (Event Loop) verwenden, um die Reihenfolge der Codeausführung mit dem Stack und der Queue zu handhaben. Außerdem haben wir drei Beispiele ausprobiert, um den Erfolg oder Misserfolg eines asynchronen Ereignisses mit Rückrufen (Callbacks), Promise (Versprechen) und der Syntax `async/await` zu behandeln.
