---
date: 2019-08-01
title: 'ECMAScript 6 - Gueltigkeitsbereiche von Variablen'
template: post
thumbnail: '../thumbnails/js.png'
slug: gueltigkeitsbereiche-von-variablen
langKey: de
categories:
  - JavaScript
tags:
  - ecmascript
  - javascript
---


In diesem Teil geht es um Gültigkeitsbereiche von Variablen, um `let`, `const` und `var`.

## Motivation

Die Variablendeklarationen mithilfe von `var` in JavaScript geschieht bevor Programmcode ausgeführt wird. So ist das Deklarieren an einer beliebigen Stelle im Programm das gleiche, als würde sie am Anfang eingeführt. Eine Variable ist nutzbar, bevor sie im Programmcode deklariert wurde! Dieser Umstand wird `hoisting` genannt und ist meiner Meinung nach nicht intuitiv und verwirrend. 

ES6 bietet Strukturen, die den Überblick über Gültigkeitsbereiche vereinfachen. Diese stelle ich im Folgenden vor. Nebenbei erläutere ich Best Praxis Konzepte. 

## Bevor es losgeht

JavaScript wird oft als Spielzeug abgewertet. Dabei besitzt die Skriptsprache neben ihrer Einfachheit bedeutende Sprachfunktionen. JavaScript wird von wichtigen Anwendungen verwendet. Darum ist es für jeden Web- und Mobil-Entwickler, sich mit JavaScript auszukennen!

JavaScript wurde im Jahr 1995 entworfen und 1996 mit Netscape 2 veröffentlicht. Die Sprache ist somit recht etabliert. Ebenfalls im letzten Jahrhundert übergab Netscape JavaScript an [Ecma International](https://www.ecma-international.org/), eine europäische Standardisierungsorganisation. Im selben Jahr wurde die erste Version des ECMAScript Standards publiziert. Dieser hält sich seither stabil. Hier im Buch spielen die Neuerungen in der sechsten Edition  – ES2015 oder ES6 – die Hauptrolle, welche im Juni 2015 veröffentlicht wurde.

Neue Browserversionen decken einen großen Teil der Funktionen in ES2015 ab. Leider aber nicht alle. Eine Website zum Verbreitungsstand einzelner Features ist [caniuse.com](https://caniuse.com/)   .  

> Sie nutzen eine Funktion, die nicht vollständig von Browsern unterstützt wird? Dafür gibt es Transpiler. Dies ist ein Thema für ein separates Buch. 

Ich erkläre alles in kleinen Schritten nacheinander. Ich hoffe, dass Ihnen meine Art zu schreiben gefällt. Ich persönlich hätte mir ein solches Buch zum Start mit ES6 gewünscht.

Ich gehe davon aus, dass Sie HTML kennen und über JavaScript Grundlagen verfügen. Ich arbeite mit Firefox und beziehe meine Erklärungen auf diesen Webbrowser. Texte von Fehlerausgaben variieren in anderen Browsern leicht. 


Alle Beispiele finden Sie auf [Github](https://github.com/astridx/es6_beispieldateien_zum_Buch).

## var - Deklaration und Hoisting

Die Deklaration einer Variablen geschieht 
- m globalen Kontext, wenn sie außerhalb oder am Anfang einer Funktion deklariert wurde oder 
- ganz am Anfang einer Funktion.  
 
Konkret bedeutet das, dass das Deklarieren einer Variable an einer beliebigen Stelle im Programmcode das Gleiche ist, als würde sie am Anfang deklariert. Sie ist nutzbar, bevor sie im Code eingeführt wurde. Dies nennt man `hoisting`.  

### Exkurs: Der Unterschied zwischen instanziieren, deklarieren und initialisieren  

#### Variable instanziieren

Der Begriff Instanziieren meint das Erzeugen eines neuen Objekts, einer Instanz, aus einer Klasse.

``` 
Objekt o = new Objekt();
// o ist Instanz der Klasse Objekt
``` 

#### Variable deklarieren

Stellen Sie sich unter „deklarieren einer Variablen“ das erste *Erwähnen der Variablen* vor. So weiß der Compiler, dass es sie gibt, und ihm ist es möglich, sie anzusprechen. Der Wert selbst wird bei der Deklaration nicht festgelegt.

``` 
int var;
// var als Variable des Typs int deklariert
``` 

#### Variable initialisieren

Eine Initialisierung ist das erste Zuweisen eines Wertes zu einer Variablen. Hier zu ist es erforderlich, dass der Speicher allokiert ist.

``` 
var = 0;
// var mit Wert 0 initialisiert
``` 

Sehen wir uns `hoisting` an einem Beispiel genauer an.

### Beispiele

#### Beispiel 1

Sehen Sie sich die nachfolgende Funktion kurz an. 

```
function getValue() {
    if (false) {
        var value = "Prima";
        return value;
    } else {
        return value; // gibt "undefined" oder "" aus, abhängig vom Browser.
    }
}
<!--index_999a.html-->
```

Wenn Sie nicht vertraut mit JavaScript sind, erwarten Sie, dass die Variable `value` nur erstellt wird, wenn die Bedingung in der `if`-Anweisung `true` ist. In der Realität ist es so, dass die Variable in jedem Fall kreiert wird.

Im Hintergrund verändert JavaScipt den Programmcode. Der [Interpreter](https://de.wikipedia.org/w/index.php?title=Interpreter&oldid=182588640) macht daraus konkret den folgenden Aufruf. Im Code habe ich die wesentliche Zeile für Sie mit einem Stern markiert.

```
 function getValue() {
*    var value;
     if (false) {
         var value = "Prima";
         return value;
     } else {
         return value; // gibt "undefined" oder "" aus, abhängig vom Browser.
     }
     // die Variable value existiert auch hier
 }
<!--index_999a.html aus Sicht des Interpeters-->
```

Die Deklaration der Variablen `value` wird an den Anfang der Funktion verschoben. Die Initialisierung geschieht im gleichen Gültigkeitsbereich. Dadurch ist es möglich im `else`-Block auf die Variablen `value` zuzugreifen. Da die `value` im `else`-Block mit keinem Wert belegt ist, ist die Ausgabe bei einem Zugriff `undefined` anstelle von `ReferenceError: value is not defined`, wie im nachfolgenden Beispiel. 

```
 function getValue() {
     if (false) {
         var value = "Prima";
         return value;
     } else {
*        return myvalue; // gibt "ReferenceError: myvalue is not defined" aus
     }
 }
<!--index_999c.html -->
```

`Hoisting` führt oft zu Missverständnissen. Für viele Entwickler ist es befremdend, dass eine Variable nicht an der Stelle erstellt wird, an der sie im Programmcode steht. Deshalb wurde mit ECMAScript 6 die Möglichkeit eingeführt, Variablen im Gültigkeitsbereich des lokalen Blocks zu deklarieren.

## Gültigkeitsbereich (Scope) im Block

In vielen Programmiersprachen gibt es den Block Scope – alle Variablen, die innerhalb eines Blocks deklariert werden, gelten nur in ihm. Diese nennt man lokale Variablen.

Was genau ist ein Block? Ein Block ist entweder 
- der Bereich innerhalb einer Funktion oder
- ein Bereich der mit geschweiften Klammern - `{` und `}` - umgeben ist. 

Variablen, die mit `let` oder `const` angelegt werden, gelten ausschließlich innerhalb ihres Blocks. Es verhindert viele schwer aufzudeckende Fehler und ist meiner Meinung nach intuitiv. 

### Block Scope mit let

Mit ECMAScript 6 wurde `let` eingeführt. Eine mit `let` deklarierte Variable hat einen eingeschränkten Gültigkeitsbereich. Sie ist einzig und allein innerhalb des Blocks gültig, in dem sie deklariert wurde. 
Die Deklaration einer Variablen mit `let` geschieht auf die gleiche Art wie die Deklaration einer Variablen mit `var`.  

Was wäre, wenn die Variable im vorherigen Beispiel anstelle von `var` mit `let` deklariert worden wäre? Genau dies zeigt Ihnen der nachfolgende Code.

```
 function getValue() {
     if (true) {
         let value = "Prima";
     } else {
*        return value; // Würde "ReferenceError: value is not defined" ausgeben.
     }
*    return value; // Gibt "ReferenceError: value is not defined" aus.
}
<!--index_998d.html -->
```

Haben Sie den Programmcode ausprobiert oder gedanklich nachvollzogen? Dann stimmen Sie sicher mit mir überein, das die Ausgabe der Datei `998d.html` intuitiver ist als die das Ergebnis von `999a.html`. 

Weil wir die Variable `value` mit `let` deklariert haben, wird die Deklaration nicht im Hintergrund vom Interpreter an den Anfang der Funktion verschoben. Ein Zugriff auf sie ist außerhalb der `if`-Anweisung nicht gegeben. Da `value` nur deklariert wird, wenn die Bedingung der `if`-Anweisung erfüllt ist, ist es nicht möglich, im `else`-Block auf sie zuzugreifen. 

Das nächste Beispiel zeigt Ihnen, dass die Deklaration der Variablen `value` weiterhin am Anfang des Blocks geschieht, in dem diese gültig ist. Es ist aber erst möglich, auf sie zuzugreifen, nachdem sie deklariert wurde. Einen Unterschied gibt es: Die Fehlermeldung innerhalb des Blocks, indem die Variable deklariert wird, ist eine andere. 

```
function getValue() {
    if (true) {
        return value; // gibt "ReferenceError: can't access lexical 
                      //declaration `value' before initialization" ausgeben.
        let value = "Prima";
    } else {
        return value; // würde "ReferenceError: value is not defined" ausgeben.
    }
}
<!--index_998e.html -->
```

### Keine Mehrfachverwendung

Die Mehrfachverwendung einer mit `let` deklarierten Variablen innerhalb eines Blocks ist nicht möglich. Falls Sie dies versehentlich doch versuchen, wird der JavaScript Interpreter Ihnen den Fehler `SyntaxError: redeclaration of let value` melden.

```
 function getValue() {
     var value = "Prima";
*    let value = "Prima";  // SyntaxError: redeclaration of let value
 }
<!--index_997.html -->
```

Im vorhergehenden Beispiel wurde die Variable `value` zweimal deklariert. Beim ersten Mal mit `var` und beim zweiten Mal mit `let`. Weil diese beiden Variablendeklarationen im selben Gültigkeitsbereich liegen, tritt ein Fehler auf. 

Im Umkehrschluss ist es möglich, eine Variable mit dem gleichen Namen in einem untergeordneten oder übergeordneten Gültigkeitsbereich zu deklarieren.

```
function getValue() {
    var value = "Prima";
    if (true) {
        let value = "Prima";
    }   
    return true;
}
<!--index_997d.html -->
```

Im Beispiel der Datei `997d.html` tritt kein Fehler auf. Die Variable mit dem Namen `value` wird in der `if`-Anweisung neu deklariert. Die Deklaration passiert genau an der Stelle, an der der Programmierer sie in den Programmcode einfügt. Sie wird nicht, wie im Falle von `var`, vom Interpreter an den Beginn des umgebenden Blocks gesetzt. 

### Block Scope mit const

Die Deklaration einer Variablen mit dem Schlüsselwort `const` erstellt eine Konstante. Der Gültigkeitsbereich einer mit `const` deklarierten Variablen ist, genau wie bei einer mit `let` deklarierten Variable, auf den lokalen Block begrenzt. Der Wert einer Konstanten ist bei der Deklaration anzugeben. Es ist nicht möglich, diesen später zu setzten.

```
function getValue() {
    const value1 = "Prima";
    const value2; // SyntaxError: missing = in const declaration
}
<!--index_996.html -->
```

Im vorherigen Beispiel wird die Variable `value1` korrekt deklariert und initialisiert. Die Deklaration von `value2` ist nicht möglich. Es wird ein Fehler angezeigt, weil `value2` beim Anlegen nicht initialisiert wurde.

#### Konstante versus Variablendeklaration mit let

Genau wie im Falle von `let` ist eine mit `const` deklarierte Variable ausschließlich innerhalb eines Blocks gültig.

```
function getValue() {
    if (true) {
        const value = "Prima";
    }   
    return value; //ReferenceError: value is not defined
}
<!--index_995.html -->
```

Eine weitere Gemeinsamkeit von `let` und `const` ist die nicht mögliche 
Mehrfachverwendung.

```
function getValue() {
    var value1 = "Prima";
    let value2 = "Super";
    const value1 = "Prima"; // SyntaxError: redeclaration of var value1
    const value2 = "Super"; // SyntaxError: redeclaration of var value2
    return true;
}
<!--index_994.html -->
```

Abgesehen von diesen Gemeinsamkeiten gibt es einen bedeutenden Unterschied. Anders als bei einer mit `let` deklarierten Variablen ist es nicht möglich, den Wert einer Konstanten im Nachhinein zu ändern.

```
function getValue() {
    let value1 = "Prima";
    const value2 = "Super";
    value1 = "Toll";
    value2 = "Schön"; // TypeError: invalid assignment to const `value2'
    return true;
}
<!--index_993.html -->
```

#### Objektdeklaration mit const

Erklärungsbedürftig ist die Behandlung von Konstanten in JavaScript, wenn ein Objekt als Konstante deklariert wurde. In diesem Falle ist nur das Objekt selbst konstant. Die Eigenschaften des Objektes sind veränderbar. Theoretisch hört sich dies nicht schlüssig an. Sehen Sie sich das nächste Beispiel an, dann wird es klar.

```
function getValue() {
    const stadt = {
        name: "Koblenz"
    }
    stadt.name = "Bonn"; // Mögliche Neuzuweisung
    stadt.fluss = "Rhein"; // Mögliche Neuzuweisung
    
    const stadt = { // SyntaxError: redeclaration of const stadt
        name: "Bonn" 
    } 
    return true;
}
<!--index_992.html -->
```

Im vorhergehenden Beispiel wurde eine Konstante mit dem Namen Stadt erstellt. Diese ist nicht veränderbar. Bemerkenswert ist, dass die Eigenschaften `name` und `fluss` änderbar sind.

### Die vorübergehend tote Zone

Variablen, die mit `let` oder `const` angelegt werden, gelten nur innerhalb ihres Blocks. Dies führt in JavaScript zu einem Zustand, der sich gefährlich anhört: *Der vorübergehend toten Zone*. Der englische Ausdruck dafür ist *Temporal Dead Zone (TDZ)*. 

Die *vorübergehend toten Zone* ist der Bereich innerhalb eines Blocks, der vor einer Variablendeklaration liegt. Vorausgesetzt die Variable wird mit `let` oder `const` deklariert. 

In der *vorübergehend toten Zone* tritt beim Zugriff auf eine später deklarierte Variable, ein Fehler auf. Verhängnisvoll ist, dass dieser Fehler ebenfalls auftritt, wenn eine vermeintlich sichere Methode wie `typeof` verwendet wird.

```
function getValue() {
    console.log(typeof value1); // Ausgabe: undefined
    console.log(typeof value2); // ReferenceError: can't access lexical declaration
                                // `value2' before initialization
    let value2 = "Prima"; 

    return true;
}
<!--index_991.html -->
```

Im vorhergehenden Beispiel wird auf die Variablen `value1` und `value2` mithilfe von `typeof` zugegriffen. Im Falle von `value1` ist dies kein Problem. Bei `value2` tritt hingegen ein Fehler auf, weil `value2` im gleichen Gültigkeitsbereich später erneut mit `let` deklariert wird. 

Die gleiche Deklaration in einem anderen Gültigkeitsbereich wäre kein Problem, wie Beispiel `index_991c.html` zeigt.  

```
function getValue() {
    console.log(typeof value1); // Ausgabe: undefined
    console.log(typeof value2); // Ausgabe: undefined

    if (true) {
        let value2 = "Prima";
    }
        
    return true;
}
<!--index_991c.html -->
```

> Die Bezeichnung *Temporal Dead Zone (TDZ)* sucht man in der Spezifikation *ECMAScript 6* vergeblich. Der Begriff wird aber häufig zur Erklärung eingesetzt. Die TDZ entsteht, weil der JavaScript-Interpreter sich einen Block schon beim Einlesen vollständig ansieht. Wenn er auf mit `var` deklarierte Variable trifft, dann setzt er die Deklaration an den Beginn der Funktion oder in den globalen Gültigkeitsbereich. Findet der Interpreter eine mit `let` oder `const` deklarierte Variable, dann setzt er diese in die TDZ - solange, bis die eigentliche Deklaration vonstattengeht. 

```
function getValue() {
     console.log(typeof value); // Ausgabe: undefined
*    if (true) {
*        let value = "Prima";
*        console.log(typeof value); // Ausgabe: String
*    }
     console.log(typeof value); // Ausgabe: undefined
     return true;
 }
<!--index_991a.html -->
```

Die Variable `value` ist beim Aufruf des Befehls `console.log(typeof value)` nicht in der TDZ. Das bedeutet konkret: Die Variable ist zwar `undefinded`  aber frei.

> Die Beispiele zur TDZ verwenden hier ausschließlich mithilfe von `let` deklarierte Variablen. Das Gleiche gilt analog für Variablen, die mit `const` erstellt wurden.

## Gültigkeitsbereich (Scope) in Schleifen

Eine weitere Besonderheit von JavaScript ist der Gültigkeitsbereich innerhalb von Schleifen. Beim Durchlaufen von Schleifen bringt es viele Vorteile, wenn die Gültigkeitsbereiche der Variablen übersichtlich und getrennt sind. In einer Schleife wird häufig eine Variable als Zähler verwendet. Das nächste Beispiel zeigt Ihnen, dass der Gültigkeitsbereich einer solchen Zählervariablen alles andere als übersichtlich und getrennt ist, wenn diese Variable mit `var` deklariert wird. 

```
function getValue() {
    for (var i = 0; i < 5; i++) {
        // tue etwas ...
    }
    console.log(i); // Ausgabe: 5
    return true;
}
<!--index_990.html -->
```

Nachdem der Schleifendurchlauf abgeschlossen ist und der Block verlassen wurde, ist die Variable `i` weiterhin gültig. Der letzte Wert der Variablen wird mittels `console.log(i)` ausgegeben. Dies ist ein Verhalten, das nicht erwünscht ist. Die Zählervariable `i` wird in der Regel nur lokal in der Schleife benötigt und es wäre wünschenswert, wenn sie nur hier ihren Gültigkeitsbereich hätte. Aber, Sie wissen es schon: Bei der Verwendung von `var` zur Deklaration wird diese Deklaration aufgrund von [Hosting](https://de.wikipedia.org/w/index.php?title=Hoisting&oldid=166784898) an den Anfang der Funktion verschoben und ist somit innerhalb des vollständigen Blocks gültig.

Das nächste Beispiel nutzt anstelle von `var` eine mit `let` deklarierte Variable als Zähler. Das Ergebnis ist das erwartete Verhalten.

```
function getValue() {
    for (let i = 0; i < 5; i++) {
        console.log(i); // Ausgabe: 0 1 2 3 4
    }
    console.log(i); // ReferenceError: i is not defined
    return true;
}
<!--index_989.html -->
```

Das Beispiel der Datei `index_989.html` demonstriert das gewünschte Verhalten. Die Variable `i` existiert nur innerhalb der Schleife. Nachdem die Schleife abgearbeitet ist, ist es nicht mehr möglich auf `i` zuzugreife. Die Variable `i` stiftet so keine Verwirrung mehr außerhalb der Schleife.

### Funktionen in Schleifen

Hosting und das Verhalten von `var` bewirken, das dass Arbeiten mit Funktionen in Schleifen unvorhersehbar ist. Das nächste Beispiel zeigt Ihnen, auf was ich genau abziele.

```
function getValue() {
    var funktionen = [];
    for (var i = 0; i < 5; i++) {
        funktionen.push(function() {
            console.log(i);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: Fünfmal die Zahl "5"
    });
    return true;
}
<!--index_988.html -->
```

Haben Sie die Ausgabe `0 1 2 3 4` erwartet? Anstelle davon wurde `5 5 5 5 5` ausgegeben. Der Grund hierfür ist, dass dieselbe Variable `i` über alle Iterationen der Schleife hinweg geteilt wird. Aufgrund von Hoisting wurde die Variable `i` außerhalb der Schleife deklariert. Alle Funktionen, die in der Schleife erstellt wurden, halten eine Referenz auf dieselbe Variable `i`. Diese Variable `i` hat den Wert `5`, wenn alle Schleifendurchläufe beendet sind. Wenn `console.log(i)` aufgrund von 
```
funktionen.forEach(function(funktion){
    funktion(); 
});
```
fünfmal ausgeführt wird, wird der Wert `5` fünfmal ausgegeben.  

Eine Lösung für dieses Problem ist [IIFE](https://wiki.selfhtml.org/index.php?title=IIFE&oldid=59916). *IIFE* steht für *Immediately-invoked Function Expression*. Mit anderen Worte bedeutet dies: ein sofort ausgeführter Funktionsausdruck. Das hört sich kompliziert an und das ist es meiner Meinung nach auch. Ich habe *IIFE* hier der Vollständigkeit halber aufgenommen. Im nächsten Kapitel finden Sie eine einfachere Lösung, seit ECMAScript 6.  

```
function getValue() {
    var funktionen = [];
    for (var i = 0; i < 5; i++) {
        funktionen.push((function(value) {
            return function (){
                console.log(value);
            }
        }(i)));
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: 0 1 2 3 4 
    });
    return true;
}
<!--index_987.html -->
```

Das Beispiel in der Datei `index_987.html` verwendet IIFE. Das Grundgerüst 
einer IIFE finden Sie im nächsten Programmcodebeispiel.

```
(function (foo) {
    //...
})(foo);
```

Dieses Grundgerüst sieht soweit recht unkompliziert aus. Beispiel `index_987.html` wirkt hingegen kompliziert. Deshalb sehen wir uns die relevanten Teile genauer an.  

Die Variable `i` wird im Beispiel `index_987.html` an die IIFE übergeben. Im nachfolgenden Programmcodebeispiel habe ich die IIFE des Beispiel `index_987.html` für sich alleine eingefügt.

```
...
...(function(value) {
       return function (){
           console.log(value);
       }
   }(i))...
...
```

Die IIFE speichert die Variable `i` in einer eigenen Kopie. In unserem Beispiel erhält diese Kopie den Namen `value`. Die Kopie der Variablen `i`, ergo `value` , wird in der Funktion verwendet. 

Dies führt dazu, dass die Ausgabe der Schleife eher der Erwartung eines Programmierers entspricht, als die Ausgabe der Schleife in Beispiel `index_988.html`. 

Wie schon erwähnt bietet ECMAScript 6 glücklicherweise eine einfacherere Möglichkeit, diese Ausgabe zu erreichen. Diese Möglichkeit sehen wir uns im nächsten Kapitel an.

### let in Schleifen

Eine mit `let` deklarierte Variable `i` in der Schleifenbedingung vereinfacht die Arbeit mit der Schleife ungemein. Bei jedem Schleifendurchlauf wird aufgrund von `let` eine neue Variable `i` erstellt und mit dem aktuellen Wert initialisiert. Das nächste Beispiel zeigt Ihnen, dass man so vollständig auf das komplizierte IIFE Konstrukt verzichten kann.

```
function getValue() {
    var funktionen = [];
    for (let i = 0; i < 5; i++) {
        funktionen.push(function() {
            console.log(i);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: 0 1 2 3 4
    });
    return true;
}
window.addEventListener("load", function () {
console.log(getValue());
});
<!--index_986.html -->
```

Das Beispiel der Datei `index_986.html` errechnet genau das, was das Beispiel 
der Datei `index_987.html` errechnete - allerdings auf eine wesentlich 
komfortable Art.

Überzeugen Sie sich mit dem Beispiel in der Datei `index_985.html` davon, dass das was ich für eine `forEach` Schleife beschrieben habe, gleichzeitig für `for-in` und `for-of` Schleifen gilt.

`for-of`:

```
function getValue() {
    var funktionen = [];
    var names = ['Astrid', 'Nina', 'Elmar'];
    
    for (let name of names) {
        funktionen.push(function() {
            console.log(name);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); 
    });
    return true;
}
<!--index_985.html -->
```

`for-in`:

```
function getValue() {
    var funktionen = [];
    var object = {
        1 : "a",
        2 : "b",
        3 : "c"
    };
    
    for (let key in object) {
        funktionen.push(function() {
            console.log(key);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); 
    });
    return true;
}
<!--index_984.html -->
```

In den Beispielen zur `for-in`-Schleife und zur `for-of`-Schleife wird bei jedem Schleifendurchlauf eine Kopie von `key` angelegt. Dies geschieht, weil `key` mit `let` deklariert wurde. Für die Ausgabe wird immer diese Kopier verwendet. Deshalb ist die Ausgabe im ersten Fall `Astrid Nina Elmar` und im zweiten Fall `1 2 3`. Wenn `key` mit `var` deklariert worden wäre, würde im ersten Fall dreimal `Elmar` ausgegeben und im zweiten Fall dreimal `3`.

### const in Schleifen

Die ECMAScript 6 Spezifikation verbietet die Verwendung von Konstanten als Schleifenbedingung nicht. Aber: Es empfiehlt sich, sich die Zusammenhänge vorher genau anzusehen, wenn man eine Konstante als Schleifenbedingung verwendet. Die `for-in`-Schleife und die `for-of`-Schleife wenden eine Konstante anders an, als eine normale `for`-Schleife es macht.  

Sehen wir uns die Zusammenhänge im Folgenden an.

#### For-Schleife

In einer For-Schleife ist es zwar erlaubt die Schleifenbedingung als Konstante zu initialisieren. Es ist aber in den meisten Fällen nicht sinnvoll. Denn: Bei der Ausführung der Schleife wird ein Fehler gemeldet, wenn der Wert der Konstanten geändert wird.

```
function getValue() {
    var funktionen = [];
    for (const i = 0; i < 5; i++) {
        funktionen.push(function() {
            console.log(i);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: TypeError: invalid assignment to const i
    });
    return true;
}
<!--index_983.html -->
```

Im vorhergehenden Beispiel wird die Variable `i` als Konstante deklariert. Der erste Schleifendurchlauf ist erfolgreich. Bei diesem ist der Wert von `i` gleich `0`. Beim nächsten Schleifendurchlauf tritt ein Fehler auf, wenn `i++` aufgerufen wird.
Die Fehlermeldung lautet im Browser Firefox `TypeError: invalid assignment to const i`. 

Der nächste Programmcode zeigt ein konstruiertes Beispiel. Im Beispiel wird in der Schleifenbedingung eine Konstante verwendet. Es tritt aber kein Fehler auf, weil die Schleife mit `break` abbricht, bevor `i++` an der Reihe ist.

```
function getValue() {
    var funktionen = [];
    for (const i = 0; i < 5;) {
        funktionen.push(function() {
            console.log(i);
        });
        break;
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: 0
    });
    return true;
}
<!--index_983c.html -->
```

#### For-in-Schleife und For-of-Schleife

In einer `for-in`-Schleife oder einer `for-of`-Schleife ist es möglich, mit einer Konstanten zu arbeiten. 

```
function getValue() {
    var funktionen = [];
    var names = ['Astrid', 'Nina', 'Elmar'];
    
    for (const name of names) {
        funktionen.push(function() {
            console.log(name);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: Astrid Nina Elmar
    });
    return true;
}
<!--index_983a.html -->
```

```
function getValue() {
    var funktionen = [];
    var object = {
        1 : "a",
        2 : "b",
        3 : "c"
    };
    
    for (const key in object) {
        funktionen.push(function() {
            console.log(key);
        });
    }
    funktionen.forEach(function(funktion){
        funktion(); // Ausgabe: 1 2 3
    });
    return true;
}
<!--index_983b.html -->
```

Warum in einer `for-in`-Schleife oder einer `for-of`-Schleife eine Konstante als Schleifenbedingung keinen Fehler erzeugt ist bei genauem Hinsehen offensichtlich. Beim Schleifendurchlauf wird der Konstanten nie ein anderer Wert zugeordnet. Es wird vielmehr die Zuordnung zur Konstanten `name` oder `key` geändert.

## Globaler Gültigkeitsbereich (Scope)

Im globalen Gültigkeitsbereich gibt es Unterschiede zwischen `var` und den ECMAScript 6- Neulingen `let` beziehungsweise `const`.  

Zum einen überschreibt eine im globalen Gültigkeitsbereich mit `var` deklarierte Variable die gleichnamige Eigenschaft im `window` Objekt. Das nachfolgende Beispiel verdeutlich das beschriebene. So hat JavaScript in der Vergangenheit immer gearbeitet. Das ist meiner Meinung nach eine gefährliche Fehlerquelle.

```
console.log(window.RegExp); // Ausgabe: function RegExp()
var RegExp = "Neuer Wert für RegExp";
console.log(window.RegExp); // Ausgabe: "Neuer Wert für RegExp"
<!--index_982.html -->
```

Wenn anstelle von `var` eine Variable im globalen Gültigkeitsbereich mit `let` beziehungsweise `const` deklariert wird, ist das `window` Objekt geschützt, es wird nicht verändert.

```
console.log(window.RegExp); // Ausgabe: function RegExp()
let RegExp = "Neuer Wert für RegExp";
console.log(window.RegExp); // Ausgabe: function RegExp()
console.log(RegExp); // Ausgabe: "Neuer Wert für RegExp"
<!--index_981.html -->
```

Dadurch, dass das globale `window`-Objekt im Falle von `let` beziehungsweise `const` nicht geändert wird, ist die Variablenzuweisung sicherer. Es ist nicht möglich, dass Eigenschaften im `window`-Objekt unbewusst überschrieben werden. 


> Die Verwendung von `var` kann zur Deklaration einer globalen Variablen dennoch sinnvoll sein. Den: Auf diese Art und Weise ist es möglich Variablen aus unterschiedlichen HTML-Dokumenten gleichzeitig zu verwenden.

## Erfolgsmethode - Best Practice

Während der Entwicklung von ECMAScript 6 herrschte weit verbreitete Überzeugung, dass man für die Variablendeklarationen standardmäßig `let` anstelle von `var` verwendet. Für viele JavaScript-Entwickler ist das Verhalten bei `let` genau so, wie sie es von `var` erwarten. Daher ist die direkte Ersetzung logisch. `const` wird nach dieser Überzeugung ausschließlich für Variablen verwenden, die einen Änderungsschutz benötigen.

Später wurde ein alternativer Ansatz immer beliebter: Verwenden Sie `const` standardmäßig und verwenden Sie `let` nur, wenn Sie wissen, dass sich der Wert einer Variablen ändert. Grundprinzip ist, das Variablen nur änderbar sind, wenn dies notwendig ist, da unerwartete Wertänderungen eine Fehlerquelle darstellen.


## Alles noch einmal zusammengefasst

`let` und `const` führen in JavaScript neue Gültigkeitsbereiche ein. Diese Deklarationen werden an den Anfang des Blocks verschoben. Es gibt kein `hoisting`. Sie existieren nur innerhalb des Blocks, in dem sie deklariert sind. Dieses Verhalten ist intuitiv und verhindert, dass unbeabsichtigte Fehler auftreten. Variablen werden jetzt genau dort deklariert, wo sie benötigt werden. Als Nebeneffekt ist es nicht möglich, dass sichere Operatoren wie `typeof` nicht auf Variablen zugreifen, bevor diese deklariert wurden. Der Versuch, vor ihrer Deklaration auf eine Variable zuzugreifen, führt zu einem Fehler, da die Bindung in der temporalen Totzone (TDZ) vorhanden ist.

In vielen Fällen verhalten sich `let` und `const` ähnlich wie `var`. Dies gilt nicht für Schleifen. Sowohl für `let` als auch für `const` erstellen For-in-Schleifen und For-of-Schleifen mit jeder Iteration eine neue Bindung. Das bedeutet, dass Funktionen, die innerhalb des Schleifenkörpers erstellt wurden, auf die Schleifenbindungswerte zugreifen können, wie sie während der aktuellen Iteration sind, und nicht wie nach der letzten Iteration der Schleife. So ist es bei der Verwendung von `var`. Gleiches gilt für `let`-Deklarationen in For-Schleifen, während der Versuch, `const`-Deklarationen in einer For-Schleife zu verwenden, in der Regel zu einem Fehler führt.

Die derzeitige bewährte Methode für Blockbindungen besteht darin, standardmäßig `const` zu verwenden und `let` nur zu verwenden, wenn Sie wissen, dass sich der Wert einer Variablen ändert. Dies stellt ein grundlegendes Maß an Unveränderlichkeit im Code sicher, das dazu beiträgt, Fehlern zu vermeiden.

## Referenzen und externe Links

[Interpreter](https://de.wikipedia.org/w/index.php?title=Interpreter&oldid=194689446)