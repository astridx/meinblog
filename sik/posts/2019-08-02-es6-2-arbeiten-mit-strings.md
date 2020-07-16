---
date: 2019-08-01
title: 'ECMAScript 6 - Arbeiten mit Strings'
template: post
thumbnail: '../thumbnails/js.png'
slug: arbeiten-mit-strings
categories:
  - JavaScript
tags:
  - ecmascript
  - javascript
---

In diesem Teil geht es um Strings und reguläre Ausdrücke

## Motivation

Strings sind einer der wichtigsten Datentypen in der Programmierung. Sie kommen in fast jeder Programmiersprache vor. Das effektive Arbeiten mit ihnen ist für Entwickler von grundlegender Bedeutung, um nützliche Programme zu erstellen.

Reguläre Ausdrücke bieten Developern zusätzliche Möglichkeiten, Zeichenfolgen zu verwenden.
ES6 bietet neue und verbesserte Funktionen, um Strings und reguläre Ausdrücke effektiver zu nutzen. Dieses Kapitel gibt einen Überblick.

## Bevor es losgeht

todo

## Verbesserte Unicode-Unterstützung

### UTF-16

Der JavaScript-Standard ECMAScript 5 entstand, als 16 Bit ausreichten, um alle vorhandene Unicode-Zeichen abzubilden. Später wurde Unicode um weitere Zeichen erweitert. Dies hat zur Folge, dass 16 Bit nicht mehr ausreichen, um alle möglichen Unicode-Zeichen darzustellen.

> Das Ziel von Unicode ist es, alle in Gebrauch befindlichen Schriftsysteme und Zeichen zu kodieren. Der Zeichenumfang ist dazu in 17 Ebenen (englisch planes) gegliedert. Sechs dieser Ebenen werden verwendet, die restlichen sind für die spätere Nutzung reserviert. Die ursprünglichen 16 Bit sind unter dem Namen _Basic Multilingual Plane_ (BMP; deutsch „Mehrsprachige Basis-Ebene“ oder Plane 0) bekannt.

UTF-16 speichert die ursprünglichen Unicode-Zeichen in der BMP weiterhin in 16 Bit ab, damit diese in der Zukunft problemlos anwendbar sind. Alle neuen Unicode-Zeichen werden hingegen in 32 Bit gespeichert, ergo in zwei 16-Bit-Werten. Die beiden 16-Bit-Werte bezeichnet man als _Ersatzpaar_ (englisch surrogate pair). Streng genommen wird ein Unicode-Zeichen außerhalb der BMP in einer _UTF-16-Codeeinheit_ anstelle eines _Unicode-Zeichens_ gespeichert.

So ist es möglich, alle Methoden die auf 16 Bit begrenzt sind weiterhin zu nutzen. Vorausgesetzt, dass Sie keine der neuen Unicode-Zeichen benötigen.

Wenn Sie eine vollständige Unicode-Unterstützung benötigen, führt die Verwendung der alten Methoden unter Umständen zu versteckten Fehlern.

> Populäre Beispiele für Unicode-Zeichen, die nicht im BMP enthalten sind, sind Emojis: Das lachende Gesicht 😀 [U + 1F600](https://unicode-table.com/de/#1F600) benötigt 32 Bit, ergo zwei Zeichen.

Was ich genau mit versteckten Fehler meine, verdeutlicht der nachfolgende Programmcode. Als Beispiel habe ich das Leerzeichen und das Emoji mit dem lachenden Gesicht gegenübergestellt. Die Unicode-Nummer des Emojis ist `U+1F600` und der HTML-Code dazu ist `&#128512;`. Die Unicode-Nummer das Ausrufezeichen ist `U+0021` und der HTML-Code dazu ist `&#33;`.

```
let text = "😀";
console.log(text.length); // Ausgabe: 2
console.log(/^.$/.test(text)); // Ausgabe: false
console.log(text.charAt(0)); // Ausgabe: �
console.log(text.charAt(1)); // Ausgabe: �
console.log(text.charCodeAt(0)); // Ausgabe: 55357
console.log(text.charCodeAt(1)); // Ausgabe: 56832

text = "!";
console.log(text.length); // Ausgabe: 1
console.log(/^.$/.test(text)); // Ausgabe: true
console.log(text.charAt(0)); // Ausgabe: "!"
console.log(text.charAt(1)); // Ausgabe: ""
console.log(text.charCodeAt(0)); // Ausgabe: 33
console.log(text.charCodeAt(1)); // Ausgabe: NaN
<!--index_980.html -->
```

Es wird kein Fehler angezeigt, aber anders als erwartet

- gibt `text.length` für das lachende Gesicht den Wert 2 anstelle von 1 zurück.
- wird das lachende Gesicht beim der Prüfung eines Regulären Ausdrucks nicht
  als ein Zeichen erkannt.
- es der `charAt()`-Methode nicht möglich ein Zeichen zurückzugeben.
- gibt die `charCodeAt()`-Methode für jedes der beiden Zeichen in der UTF-16-Codeeinheit
  das Unicode-Zeichen für die BMP aus.

Falls Sie mit Unicode-Zeichen oberhalb der BMP arbeiten sind die Methoden
`charAt()` und `charCodeAt()` nicht die richtige Wahl für Sie. Diese arbeiten
ausschließlich im BMP-Bereich korrekt. Und noch schlimmer: Bei Unicode-Zeichen
außerhalb der BMP melden diese keinen Fehler.

Mit ECMAScript 6 sind
Methoden hinzugekommen, die den neuen Bereich korrekt unterstützen.

> Die Unicode-Nummer ist ein hexadezimaler Wert. Der HTML-Code ist die
> ins Dezimalsystem umgerechnete Unicode-Nummer.
> Möchten Sie das Umrechnen von einem Zahlenformat in ein anderes Zahlenformat
> gerne selbst
> nachvollziehen. Falls Sie hierzu Hilfe benötigen ist die Website  
> https://www.arndt-bruenner.de/mathe/scripts/Zahlensysteme.htm vielleicht das
> Richtige für Sie.

### codePointAt()

Eine Methode, eine vollständige Unicode-Unterstützung bietet ist `codePointAt()`

```
let text = "😀";
console.log(text.codePointAt(0)); // Ausgabe: 128512
console.log(text.codePointAt(1)); // Ausgabe: 56832

text = "!";
console.log(text.codePointAt(0)); // Ausgabe: 33
console.log(text.codePointAt(1)); // Ausgabe: undefined
<!--index_979.html -->
```

Noch einmal zur Wiederholung: Die Unicode-Nummer des Emoji mit dem
lachenden Gesicht ist `U+1F600` und der HTML-Code dazu
ist `&#128512;`.
Die Unicode-Nummer das Ausrufezeichen ist `U+0021` und der HTML-Code dazu
ist `&#33;`. `codePointAt(0)` gibt nun also in beiden Fällen denn korrekten Wert
zurück.

> Bei der verwendung der `codePointAt()`-Method ist allerdings noch wichtig
> darauf zu achten, das auch hier die UTF-16-Codeeinheit zürckgegeben wird - also
> zwei Unicode-Zeichen. Sehen sich zur verdeutlichung nachfolgenden Programmcode an.

```
let text = "😀!";
console.log(text.codePointAt(0)); // Ausgabe: 128512
console.log(text.codePointAt(1)); // Ausgabe: 56832
console.log(text.codePointAt(2)); // Ausgabe: 33
console.log(text.codePointAt(1)); // Ausgabe: undefined
<!--index_979a.html -->
```

> Wenn Sie herausfinden möchten, ob Sie es mit einem Unicode-Zeichen oder einer
> UTF-16-Codeeinheit zu tun haben, können Sie die Methode `codePointAt(0)` zu Hilfe
> nehmen. Eine Möglichkeit zeigt Ihnen das nächste Codebeispiel.

```
console.log(is32Bit("😅")); // Ausgabe: true
console.log(is32Bit("!"));  // Ausgabe: false
function is32Bit(c){
    return c.codePointAt(0) > 0xFFFF;
}
<!--index_978.html -->
```

### String.fromCodePoint()

Im vorhergehenden Kapitel haben wir HTML-Code eines Zeichens ermittelt. In
diesem Kapitel machen wir das Gegenteil. Bisher war für die Errechnung eines
Zeichens aus einem HTML-Code die Methode
`fromCharCode()` das Mittel der Wahl. Genau wie `charCodeAt()` deckt `fromCharCode()`
außschließlich den BMP-Bereich korrekt ab. Analog zu `codePointAt()`
für `charCodeAt()` gibt es die fromCodePoint()-Methode als Pentant zu
`fromCharCode()`. `fromCodePoint()` bietet das gleiche Ergebnis
wie `fromCharCode()` bei einer vollständige Unicode-Unterstützung.

| BMP-Bereich    | vollständige Unicode-Unterstützung |
| -------------- | ---------------------------------- |
| fromCharCode() | fromCodePoint()                    |
| charCodeAt()   | codePointAt()                      |

### normalize()

Ein interessanter Aspekt beim Vergleichen oder beim Sortieren von Strings sind
die unterschiedlichen Möglichkeiten, mit denen das gleiche Zeichen dargestellt
werden kann.
Beispielsweise kann der Buchstabe `Ä` als einzelnes Unicode-Zeichen
`U + 00E4 LATIN SMALL LETIN A MIT DIAERESIS` oder als zwei Unicode-Zeichen
`U + 0061 LATIN SMALL LETIN A` and `U + 0308 COMBINING DIAERESIS` dargestellt werden.
Meistens wird die erste Form verwendet.
Wenn sie zwei Strings vergleiche, die den Buchstaben `Ä` auf unterschiedliche Art
speichern, dann kann dies beim Sortieren oder beim Vergleichen unerwarteten Ergebnissen
führen.

> Es gibt vier Normalformen:

- die kanonische Dekomposition (NFD),
- die kanonische Dekomposition gefolgt von einer kanonischen Komposition (NFC),
- die kompatible Dekomposition (NFKD) und
- die kompatible Dekomposition gefolgt von einer kanonischen Komposition (NFKC).

In JavaScript ist ein String standardmäßig in der Normalform NFC.

> Eine genaue Erklärung dieser Formen führt
> hier zu weit. Einen guten Einstieg zum Thema bietet Ihnen Wikpedia:
> https://de.wikipedia.org/w/index.php?title=Normalisierung_(Unicode)&oldid=178027174 .
> Was Sie sich auf jeden Fall merken sollten: Beim Vergleichen - beziehungsweise beim
> Sortieren - müssen beide zu vergleichenden Strings in der gleichen Normalform vorliegen.
> Andernfalls kann es Probleme geben.

Wie erreichen Sie, dass ein String in eine bestimmte Normalform überführt wird?
Seit ECMAScript 6 können Sie hierfür die Methode `normalize()` verwenden. Im nächsten
Beispiel sehen Sie beispielhaft, wie Sie die Methode `normalize()` praktisch einsetzen
können.

```
let eins = "Äpfel";
let zwei = "Äpfel";

let einsNFD = eins.normalize("NFD");
let zweiNFD = zwei.normalize("NFD");

let einsNFC = eins.normalize("NFC");
let zweiNFC = zwei.normalize("NFC");

console.log(eins===zwei); //true
console.log(eins===einsNFD); //false
console.log(eins===einsNFC); //true

console.log(eins===zweiNFD); //false
console.log(eins===zweiNFC); //true
<!--index_977.html -->
```

Das Programmcodebeispiel spricht für sich. Falls der String `Äpfel` in unterschiedlichen  
Normalformen vorliegt, schlägt eine Prüfung auf Gleichheit fehl.

Falls Sie bisher noch nie auf ein Problem mit unterschiedlichen Unicode Normalformen
gestoßen sind, dann ist es nicht wahrscheinlich, dass Sie diese Methode benötigen. Es
schade jedoch nie diese Methode für den Fall der Fälle im Hinterkopf zu behalten.

### u-Flag

#### Das u-Flag in Aktion

Im Beispiel 980.html hatte ich gezeigt, dass eine Prüfung eines regulären Ausdrucks
auf die Länge ein unerwartetes Ergebnis bringt, wenn das Zeichen im regulären Ausdruck
sich nicht im BMP Bereich befindet.
Ein Unicode-Zeichen außerhalb der BMP wird wie schon beschrieben in einer
_UTF-16-Codeeinheit_ anstelle eines _Unicode-Zeichens_ gespeichert.

ECMAScript 6 schafft hier mit dem u-Flag abhilfe. Wenn dieses Flag gesetzt ist,
wird der reguläre Ausdruck nicht anhand von _UTF-16-Codeeinheit_ interpretiert

```
let text = "😀";
console.log(text.length); // Ausgabe: 2
console.log(/^.$/.test(text)); // Ausgabe: false
console.log(/^.$/u.test(text)); // Ausgabe: false

text = "!";
console.log(text.length); // Ausgabe: 1
console.log(/^.$/.test(text)); // Ausgabe: true
console.log(/^.$/u.test(text)); // Ausgabe: false
<!--index_976.html -->
```

#### Codepoints zählen

```
function codePointLengthWithU(text){
    let sum = text.match(/[\s\S]/gu);
    return sum ? sum.length : 0;
}
function codePointLengthWithoutU(text){
    let sum = text.match(/[\s\S]/g);
    return sum ? sum.length : 0;
}
let text = "😀";
console.log(text.length); // Ausgabe: 2
console.log(codePointLengthWithU(text)); // Ausgabe: 1
console.log(codePointLengthWithoutU(text)); // Ausgabe: 2

text = "!";
console.log(text.length); // Ausgabe: 1
console.log(codePointLengthWithU(text)); // Ausgabe: 1
console.log(codePointLengthWithoutU(text)); // Ausgabe: 1
<!--index_975.html -->
```

#### Browserunterstüztung des u-Flags

```
function hasUFlag(){
    try {
        let pattern = new RegExp(".", "u");
        return true;
    } catch (ex) {
        return false;
    }
}
console.log(hasUFlag()); // Ausgabe true wenn das u-Flag vom Browser unterstüzt wird
<!--index_974.html -->
```

## Andere Verbesserungen im Zusammenhang mit Zeichenketten

Das Suchen von Zeichenketten innerhalb von Zeichenketten war bisher recht
aufwendig.

### Identifizieren

#### Zeichenketten in Zeichenketten

Um eine Zeichenkette innerhalb einer Zeichenkette zu finden, war bisher der Weg
über die `indexOf()`-Methode das Mittel der Wahl. Mit ECMAScript 6 gibt es nun
zusätzlich die Methoden

- `startsWith()`
- `endsWith()`
- `includes()`

```
let meinString = "ECMAScript 6 mit Beispielen lernen";

console.log(meinString.startsWith("E")); // Ausgabe true
console.log(meinString.endsWith("n")); // Ausgabe true
console.log(meinString.includes("i")); // Ausgabe true

console.log(meinString.startsWith("i")); // Ausgabe false
console.log(meinString.endsWith("lernen")); // Ausgabe true
console.log(meinString.includes("ä")); // Ausgabe false

console.log(meinString.startsWith("i", 7)); // Ausgabe true
console.log(meinString.endsWith("r", 7)); // Ausgabe true
console.log(meinString.includes("i", 22)); // Ausgabe true
console.log(meinString.includes("i", 23)); // Ausgabe false
<!--index_973.html -->
```

### repeat()

```
let meinString = "ECMAScript6;";
console.log(meinString.repeat(1)); // Ausgabe: ECMAScript6;
console.log(meinString.repeat(2)); // Ausgabe: ECMAScript6;ECMAScript6;
console.log(meinString.repeat(3)); // Ausgabe: ECMAScript6;ECMAScript6;ECMAScript6;
<!--index_972.html -->
```

## Andere Verbesserungen bei der Arbeite mit regulären Ausdrücken

Reguläre Ausdrücke spielen in JavaScript eine große Rolle.

### y-Flag

```

<!--index_971.html -->
```

https://stackoverflow.com/questions/4542304/what-does-regex-flag-y-do

### Duplizieren

> Das g-Flag steht für die globale Suche. Globale Suche bedeutet, dass alle
> Überenstimmungen gefunden werden - abhängig von der Groß- oder Kleinschreibung.
> Das i-Flag sucht Überenstimmungen unabhängig von der Groß- oder Kleinschreibung.

```
let rexWithi = /ab/i;
let rexWithg = new RegExp(rexWithi, "g");

console.log(rexWithi.toString()); // Ausgabe: /ab/i
console.log(rexWithg.toString()); // Ausgabe: /ab/g

console.log(rexWithi.test("ab")); // Ausgabe: true
console.log(rexWithg.test("ab")); // Ausgabe: true

console.log(rexWithi.test("AB")); // Ausgabe: true
console.log(rexWithg.test("AB")); // Ausgabe: false
<!--index_970.html -->
```

### Flag-Eigenschaften

```
let rex = /ab/iu;
console.log(rex.toString()); // Ausgabe: /ab/i

// ECMAScript 5
console.log(
        rex.toString().substring(
        rex.toString().lastIndexOf("/") + 1, rex.length
        )); // Ausgabe: iu

// ECMAScript 6
console.log(rex.source); // Ausgabe: ab
console.log(rex.flags); // Ausgabe: iu
<!--index_969.html -->
```

## Template-Strings

https://de.wikipedia.org/wiki/Dom%C3%A4nenspezifische_Sprache

### Syntax

Template-Strings sind anstelle von doppelten bzw. einfachen
Anführungszeichen in Back-Ticks (``) (grave accent) eingeschlossen.
Template-Strings können Platzhalter beinhalten, die durch
das Dollarsymbol gefolgt von geschweiften Klammern gekennzeichnet
sind (\${expression}).
https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/template_strings

```

<!--index_968.html -->
```

### Multiline

Vor ECMAScript 6 war es nur auf Umwegen möglich eine Zeichenkette auf
mehrere Zeilen zu verteilen.

```

<!--index_967.html -->
```

```

<!--index_966.html -->
```

### Ersetzungen

```

<!--index_965.html -->
```

### Tagged

```

<!--index_964.html -->
```

## Erfolgsmethode - Best Practice

## Alles noch einmal zusammengefasst

## Referenzen und externe Links

[Unicode](https://de.wikipedia.org/wiki/Unicode)
