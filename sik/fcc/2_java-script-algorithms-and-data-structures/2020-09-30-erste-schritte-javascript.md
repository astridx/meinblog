---
date: 2020-09-30
title: 'Erste Schritte mit JavaScript'
template: post
thumbnail: '../thumbnails/css.png'
slug: erste-schritte-mit-javascript
categories:
  - Code
  - Popular
tags:
  - Grundlagen
  - CSS
  - HTML
---

JavaScript wird von allen modernen Webbrowsern unterstützt. Es ist neben HTML und CSS eine der Kerntechnologien des Webs. Hier sammele ich grundlegende Konzepte, die von Variablen und Arithmetik bis hin zu Objekten und Schleifen reichen.

#### Voraussetzungen

Interesse an meiner Sammlung.

#### Ziel

Ein Überblick.

## JavaScript

### Gleichgewicht mithilfe der Textausrichtungseigenschaft

Text ist oft ein großer Teil des Webinhalts.
CSS bietet verschiedene Optionen zum Ausrichten.

- `text-align: justify;` bewirkt, dass alle Textzeilen mit Ausnahme der letzten Zeile den linken und rechten Rand des Zeilenfelds treffen.
- `text-align: center;` zentriert den Text
- `text-align: right;` richtet den Text rechsts aus
- und `text-align: left;` (die Standardeinstellung), richtet den Text links aus.

### Kommentieren

Kommentare sind Codezeilen, die JavaScript absichtlich ignoriert. Dies ist eine Möglichkeit, sich selbst und anderen Personen Notizen zu hinterlassen.

Es gibt zwei Möglichkeiten, Kommentare in JavaScript zu schreiben:

Wenn wir // verwenden, wird JavaScript angewiesen, den Rest des Textes in der aktuellen Zeile zu ignorieren:

```
// Dies ist ein Inline-Kommentar.
```

Mehrzeiligen Kommentar schließen wir in `/*` und `*/` ein:

```
/* Das ist ein
mehrzeiliger Kommentar * /

```

### Variablen

JavaScript bietet acht verschiedene Datentypen: `undefined`, `null`, `boolean`, `string`, `symbol`, `bigint`, `number` und `object`.

Beispielsweise unterscheiden Computer zwischen numerischen Werten wie der Zahl 12 und Zeichenfolgen wie „12“, „Hund“ oder „123 Katzen“. Rechner führen mathematische Operationen mit Zahlen aus, nicht mit einer Zeichenfolge.

Wir weisen JavaScript an, eine Variable zu erstellen oder zu deklarieren, indem wir das Schlüsselwort var davor setzen:

```
var sami;
```

Der vorhergehende Code erstellt eine Variable namens `sami`. In JavaScript beenden wir Anweisungen mit Semikolons. Variablennamen können aus Zahlen, Buchstaben und den Zeichen `$` oder `_` bestehen. Leerzeichen oder eine Zahl an erster Stelle sind nicht erlaubt.

### Speichern von Werten mit dem Zuweisungsoperator

In JavaScript speichern wir mit dem Zuweisungsoperator `=` einen Wert in einer Variablen:

```
meineVariable = 5;
```

Dies weist der Variablen `meineVariable` den Zahlenwert `5` zu.

> Wenn rechts vom Operator `=` Berechnungen vorhanden sind, werden diese ausgeführt, bevor der Wert der Variablen links vom Operator zugewiesen wird.

```
var meineVariable;
meineVariable = 5;
```

Zunächst erstellt dieser Code eine Variable mit dem Namen `meineVariable`. Dann weist der Code `meineVariable` den Wert `5` zu. Wenn `meineVariable` wieder im Code erscheint, wird sie mit `5` gleichgesetzt.

### Zuweisen des Werts einer Variablen zu einer anderen

Nachdem einer Variablen mit dem Zuweisungsoperator ein Wert zugewiesen wurde, können Sie den Wert dieser Variablen mit dem Zuweisungsoperator einer anderen Variablen zuweisen.

```
var myVar;
myVar = 5;
var myNum;
myNum = myVar;


```

Das Obige deklariert eine myVar-Variable ohne Wert und weist ihr dann den Wert 5 zu. Als Nächstes wird eine Variable mit dem Namen myNum ohne Wert deklariert. Dann wird der Inhalt von myVar (5) der Variablen myNum zugewiesen. Jetzt hat myNum auch den Wert 5.

### 5Variablen mit dem Zuweisungsoperator initialisieren

Es ist üblich, eine Variable in derselben Zeile, in der sie deklariert ist, mit einem Anfangswert zu initialisieren.

```
var myVar = 0;

```

Erstellt eine neue Variable namens myVar und weist ihr den Anfangswert 0 zu.

### Grundlegendes zu nicht initialisierten Variablen

Wenn JavaScript-Variablen deklariert werden, haben sie den Anfangswert undefined. Wenn Sie eine mathematische Operation für eine undefinierte Variable ausführen, ist Ihr Ergebnis NaN, was "Keine Zahl" bedeutet. Wenn Sie eine Zeichenfolge mit einer undefinierten Variablen verketten, erhalten Sie eine Literalzeichenfolge mit der Bezeichnung "undefiniert".

### Grundlegendes zur Groß- und Kleinschreibung in Variablen

In JavaScript wird bei allen Variablen und Funktionsnamen zwischen Groß- und Kleinschreibung unterschieden. Dies bedeutet, dass die Kapitalisierung wichtig ist.

MYVAR ist nicht dasselbe wie MyVar oder myvar. Es ist möglich, mehrere unterschiedliche Variablen mit demselben Namen, aber unterschiedlichem Gehäuse zu haben.

> Es wird dringend empfohlen, diese Sprachfunktion aus Gründen der Übersichtlichkeit nicht zu verwenden.

> Schreiben Sie Variablennamen in JavaScript in camelCase. In camelCase haben Variablennamen mit mehreren Wörtern das erste Wort in Kleinbuchstaben und der erste Buchstabe jedes nachfolgenden Wortes wird groß geschrieben.

Beispiele:

```
var someVariable;
var anotherVariableName;
var thisVariableNameIsSoLong;


```

### Fügen Sie mit JavaScript zwei Zahlen hinzu

Number ist ein Datentyp in JavaScript, der numerische Daten darstellt.

Versuchen wir nun, zwei Zahlen mit JavaScript hinzuzufügen.

JavaScript verwendet das Symbol + als Additionsoperator, wenn es zwischen zwei Zahlen steht.

Beispiel:

```
myVar = 5 + 10; // assigned 15

```

### Subtrahieren Sie eine Zahl von einer anderen mit JavaScript

Wir können auch eine Zahl von einer anderen subtrahieren.

JavaScript verwendet das Symbol - für die Subtraktion.

Beispiel

```
myVar = 12 - 6; // zugewiesen 6

```

### Multiplizieren Sie zwei Zahlen mit JavaScript

Wir können auch eine Zahl mit einer anderen multiplizieren.

JavaScript verwendet das Symbol \* zur Multiplikation zweier Zahlen.

Beispiel

```
myVar = 13 * 13; // zugewiesen 169
```

### Teilen Sie eine Zahl durch eine andere mit JavaScript

Wir können auch eine Zahl durch eine andere teilen.

JavaScript verwendet das Symbol / für die Division.

Beispiel

```
myVar = 16/2; // zugewiesen 8

```

### Inkrementieren Sie eine Zahl mit JavaScript

Mit dem Operator ++ können Sie eine Variable einfach inkrementieren oder hinzufügen.

```
i++;
```

ist das Äquivalent von

```
i = i + 1;
```

> Die gesamte Zeile wird zu i++;, wodurch das Gleichheitszeichen überflüssig wird.

Ändern Sie den Code, um den ++-Operator auf myVar zu verwenden.

var myVar = 87;

// Only change code below this line
myVar = myVar + 1;

Richtig:
var myVar = 87;

// Only change code below this line
myVar++;

### Inkrementieren Sie eine Zahl mit JavaScript

Mit dem Operator ++ können Sie eine Variable einfach inkrementieren oder hinzufügen.

Dekrementieren Sie eine Zahl mit JavaScript

Mit dem Operator - können Sie eine Variable einfach um eins dekrementieren oder verkleinern.

ich--;

ist das Äquivalent von

i = i - 1;

Hinweis
Die gesamte Linie wird zu i--;, wodurch die Notwendigkeit des Gleichheitszeichens entfällt.

Ändern Sie den Code, um den Operator - in myVar zu verwenden.

```

var myVar = 11;

// Only change code below this line
myVar = myVar - 1;

```

### Erstellen Sie Dezimalzahlen mit JavaScript

Wir können Dezimalzahlen auch in Variablen speichern. Dezimalzahlen werden manchmal als Gleitkommazahlen oder Gleitkommazahlen bezeichnet.

> Nicht alle reellen Zahlen können im [Gleitkomma](https://de.wikipedia.org/wiki/Gleitkommazahl) genau dargestellt werden. Dies kann zu Rundungsfehlern führen.

Erstellen Sie eine Variable myDecimal und geben Sie ihr einen Dezimalwert mit einem Bruchteil (z. B. 5.7).

```

var ourDecimal = 5.7;

// Only change code below this line

```

### Multiplizieren Sie zwei Dezimalstellen mit JavaScript

In JavaScript können Sie ebenso wie ganze Zahlen Berechnungen mit Dezimalzahlen durchführen.

Multiplizieren wir zwei Dezimalstellen, um das Produkt zu erhalten.

Ändern Sie die 0.0 so, dass das Produkt 5.0 entspricht.

```
var product = 2.0 * 0.0;

```

### Teilen Sie eine Dezimalstelle durch eine andere mit JavaScript

Teilen wir nun eine Dezimalstelle durch eine andere.

Ändern Sie die 0.0 so, dass der Quotient gleich 2.2 ist.

```
var quotient = 0.0 / 2.0; // Change this line

```

### Rest in JavaScript finden

Der Restoperator `%` gibt den Rest der Division zweier Zahlen an.

Beispiel

```
     5% 2 = 1 weil
     Math.floor (5/2) = 2 (Quotient)
     2 * 2 = 4
     5 - 4 = 1 (Rest)
```

Verwendungszweck
In der Mathematik kann eine Zahl als gerade oder ungerade überprüft werden, indem der Rest der Division der Zahl durch 2 überprüft wird.

```
     17% 2 = 1 (17 ist ungerade)
     48% 2 = 0 (48 ist gerade)
```

> Der Restoperator wird manchmal fälschlicherweise als "Modul" -Operator bezeichnet. Es ist dem Modul sehr ähnlich, funktioniert aber mit negativen Zahlen nicht richtig.

Setzen Sie den Rest mit dem Operator rest (%) gleich dem Rest von 11 geteilt durch 3.

```
var remainder = 11 % 3

```

### Verbindungszuordnung mit erweiterter Zugabe

Bei der Programmierung werden häufig Zuweisungen verwendet, um den Inhalt einer Variablen zu ändern. Denken Sie daran, dass alles rechts vom Gleichheitszeichen zuerst ausgewertet wird, damit wir sagen können:

myVar = myVar + 5;

um 5 zu myVar hinzuzufügen. Da dies ein so häufiges Muster ist, gibt es Operatoren, die sowohl eine mathematische Operation als auch eine Zuweisung in einem Schritt ausführen.

Ein solcher Operator ist der Operator + =.

var myVar = 1;
myVar + = 5;
console.log (myVar); // Gibt 6 zurück

Konvertieren Sie die Zuweisungen für a, b und c, um den Operator + = zu verwenden.

```
var a = 3;
var b = 17;
var c = 12;

// Only change code below this line
a = a + 12;
b = 9 + b;
c = c + 7;

```

### Zusammengesetzte Zuordnung mit erweiterter Subtraktion

Wie der Operator + = subtrahiert - = eine Zahl von einer Variablen.

myVar = myVar - 5;

subtrahiert 5 von myVar. Dies kann wie folgt umgeschrieben werden:

myVar - = 5;

Konvertieren Sie die Zuweisungen für a, b und c, um den Operator - = zu verwenden.

```

var a = 11;
var b = 9;
var c = 3;

// Only change code below this line
a = a - 6;
b = b - 15;
c = c - 1;

->
var a = 11;
var b = 9;
var c = 3;

// Only change code below this line
a -= 6;
b -= 15;
c -= 1;
```

### Zusammengesetzte Zuordnung mit erweiterter Multiplikation

Der Operator \* = multipliziert eine Variable mit einer Zahl.

myVar = myVar \* 5;

multipliziert myVar mit 5. Dies kann wie folgt umgeschrieben werden:

myVar \* = 5;

Konvertieren Sie die Zuweisungen für a, b und c, um den Operator \* = zu verwenden.

```
 a = 5;
var b = 12;
var c = 4.6;

// Only change code below this line
a = a * 5;
b = 3 * b;
c = c * 10;

```

### Zusammengesetzte Zuordnung mit erweiterter Abteilung

Der Operator / = teilt eine Variable durch eine andere Zahl.

myVar = myVar / 5;

Teilt myVar durch 5. Dies kann wie folgt umgeschrieben werden:

myVar / = 5;

Konvertieren Sie die Zuweisungen für a, b und c, um den Operator / = zu verwenden.

```


```

### Zeichenfolgenvariablen deklarieren

Bisher haben wir den Code verwendet

var myName = "dein Name";

"Ihr Name" wird als String-Literal bezeichnet. Es ist eine Zeichenfolge, da es sich um eine Reihe von null oder mehr Zeichen handelt, die in einfache oder doppelte Anführungszeichen eingeschlossen sind.

Erstellen Sie zwei neue Zeichenfolgenvariablen: myFirstName und myLastName und weisen Sie ihnen die Werte Ihres Vor- bzw. Nachnamens zu.

```


```

### Flucht vor wörtlichen Zitaten in Strings

Wenn Sie eine Zeichenfolge definieren, müssen Sie mit einem einfachen oder doppelten Anführungszeichen beginnen und enden. Was passiert, wenn Sie ein wörtliches Zitat benötigen: "oder 'innerhalb Ihrer Zeichenfolge?

In JavaScript können Sie verhindern, dass ein Anführungszeichen als Anführungszeichen am Ende eines Strings betrachtet wird, indem Sie einen Backslash (\) vor das Anführungszeichen setzen.

var sampleStr = "Alan sagte:" Peter lernt JavaScript ".";

Dies signalisiert JavaScript, dass das folgende Anführungszeichen nicht das Ende der Zeichenfolge ist, sondern in der Zeichenfolge erscheinen sollte. Wenn Sie dies also auf die Konsole drucken würden, würden Sie Folgendes erhalten:

Alan sagte: "Peter lernt JavaScript".

Verwenden Sie umgekehrte Schrägstriche, um der myStr-Variablen eine Zeichenfolge zuzuweisen, sodass beim Drucken auf der Konsole Folgendes angezeigt wird:

Ich bin eine Zeichenfolge in doppelten Anführungszeichen in doppelten Anführungszeichen.

```
var myStr = "I am a \"double quoted\" string inside \"double quotes\"."; // Change this line


```

### Zeichenfolgen mit einfachen Anführungszeichen zitieren

Zeichenfolgenwerte in JavaScript können mit einfachen oder doppelten Anführungszeichen geschrieben werden, sofern Sie mit demselben Anführungszeichentyp beginnen und enden. Im Gegensatz zu einigen anderen Programmiersprachen funktionieren einfache und doppelte Anführungszeichen in JavaScript gleich.

doubleQuoteStr = "Dies ist eine Zeichenfolge";
singleQuoteStr = 'Dies ist auch eine Zeichenfolge';

Der Grund, warum Sie möglicherweise eine Art von Anführungszeichen über die andere verwenden möchten, ist, wenn Sie beide in einer Zeichenfolge verwenden möchten. Dies kann passieren, wenn Sie eine Konversation in einer Zeichenfolge speichern und die Konversation in Anführungszeichen setzen möchten. Eine andere Verwendung wäre das Speichern eines <a> -Tags mit verschiedenen Attributen in Anführungszeichen, alle innerhalb einer Zeichenfolge.

Konversation = 'Finn ruft Jake zu: "Algebraisch!"';

Dies wird jedoch zu einem Problem, wenn Sie die äußersten Anführungszeichen verwenden müssen. Denken Sie daran, dass eine Zeichenfolge am Anfang und am Ende dieselbe Art von Anführungszeichen hat. Wenn Sie jedoch irgendwo in der Mitte dasselbe Zitat haben, stoppt die Zeichenfolge vorzeitig und gibt einen Fehler aus.

goodStr = 'Jake fragt Finn: "Hey, lass uns auf ein Abenteuer gehen?"';
badStr = 'Finn antwortet: "Lass uns gehen!"'; // Wirft einen Fehler

Im obigen goodStr können Sie beide Anführungszeichen sicher verwenden, indem Sie den Backslash \ als Escape-Zeichen verwenden. Hinweis
Der Backslash \ sollte nicht mit dem Forward Slash / verwechselt werden. Sie machen nicht das Gleiche.

Ändern Sie die angegebene Zeichenfolge in eine Zeichenfolge mit einfachen Anführungszeichen am Anfang und Ende und ohne Escapezeichen.

Im Moment verwendet das <a> -Tag in der Zeichenfolge überall doppelte Anführungszeichen. Sie müssen die äußeren Anführungszeichen in einfache Anführungszeichen ändern, damit Sie die Escape-Zeichen entfernen können.

```
var myStr = "<a href=\"http://www.example.com\" target=\"_blank\">Link</a>";


var myStr = '<a href="http://www.example.com" target="_blank">Link</a>';


```

### Escape-Sequenzen in Strings

Anführungszeichen sind nicht die einzigen Zeichen, die innerhalb einer Zeichenfolge maskiert werden können. Es gibt zwei Gründe, Escapezeichen zu verwenden:

    Damit Sie Zeichen verwenden können, können Sie diese möglicherweise nicht eingeben, z. B. einen Wagenrücklauf.
    Damit Sie mehrere Anführungszeichen in einer Zeichenfolge darstellen können, ohne dass JavaScript Ihre Bedeutung falsch interpretiert.

Das haben wir in der vorherigen Herausforderung gelernt.

| Code | Output          |
| ---- | --------------- |
| `\'` | single quote    |
| `\"` | double quote    |
| `\\` | backslash       |
| `\n` | newline         |
| `\r` | carriage return |
| `\t` | tab             |
| `\b` | word boundary   |
| `\f` | form feed       |

Beachten Sie, dass der Backslash selbst maskiert werden muss, um als Backslash angezeigt zu werden.

Weisen Sie der einzelnen Variablen myStr mithilfe von Escape-Sequenzen die folgenden drei Textzeilen zu.

    Erste Linie
        \Zweite Reihe
    ThirdLine

Sie müssen Escape-Sequenzen verwenden, um Sonderzeichen korrekt einzufügen. Sie müssen auch den oben angegebenen Abstand einhalten, ohne Leerzeichen zwischen Escape-Sequenzen oder Wörtern.

Hier ist der Text mit den ausgeschriebenen Escape-Sequenzen.

"FirstLinenewlinetabbackslashSecondLinenewlineThirdLine"

```
var myStr = 'FirstLine\n\t\\SecondLine\nThirdLine'; // Change this line


```

### Verketten von Strings mit Plus Operator

Wenn in JavaScript der Operator + mit einem String-Wert verwendet wird, wird er als Verkettungsoperator bezeichnet. Sie können eine neue Zeichenfolge aus anderen Zeichenfolgen erstellen, indem Sie sie miteinander verketten.

Beispiel

"Mein Name ist Alan" + "Ich verkette."

Hinweis
Achten Sie auf Leerzeichen. Durch die Verkettung werden keine Leerzeichen zwischen verketteten Zeichenfolgen hinzugefügt. Sie müssen sie daher selbst hinzufügen.

Beispiel:

var ourStr = "Ich komme zuerst." + "Ich komme an zweiter Stelle.";
// ourStr ist "Ich komme zuerst. Ich komme an zweiter Stelle."

Erstellen Sie myStr aus den Zeichenfolgen "Dies ist der Anfang" und "Dies ist das Ende". mit dem Operator +.

```
var myStr = "This is the start. " + "This is the end."; // Only change this line


```

### Verketten von Strings mit dem Operator Plus Equals

Wir können auch den Operator + = verwenden, um eine Zeichenfolge an das Ende einer vorhandenen Zeichenfolgenvariablen zu verketten. Dies kann sehr hilfreich sein, um eine lange Zeichenfolge über mehrere Zeilen zu brechen.

Hinweis
Achten Sie auf Leerzeichen. Durch die Verkettung werden keine Leerzeichen zwischen verketteten Zeichenfolgen hinzugefügt. Sie müssen sie daher selbst hinzufügen.

Beispiel:

var ourStr = "Ich komme zuerst.";
ourStr + = "Ich komme an zweiter Stelle.";
// ourStr ist jetzt "Ich komme zuerst. Ich komme an zweiter Stelle."

Erstellen Sie myStr über mehrere Zeilen, indem Sie diese beiden Zeichenfolgen verketten: "Dies ist der erste Satz." Und "Dies ist der zweite Satz." mit dem Operator + =. Verwenden Sie den Operator + = ähnlich wie im Editor. Beginnen Sie, indem Sie myStr die erste Zeichenfolge zuweisen, und fügen Sie dann die zweite Zeichenfolge hinzu.

```

// Only change code below this line

var myStr = "This is the first sentence. ";
myStr += "This is the second sentence.";
```

### Erstellen von Zeichenfolgen mit Variablen

Manchmal müssen Sie eine Zeichenfolge im [Mad Libs-Stil](https://de.wikipedia.org/wiki/Mad_Libs) erstellen. Mit dem Verkettungsoperator (+) können Sie eine oder mehrere Variablen in eine Zeichenfolge einfügen, die Sie erstellen.

Beispiel:

var ourName = "freeCodeCamp";
var ourStr = "Hallo, unser Name ist" + unser Name + ", wie geht es dir?";
// ourStr ist jetzt "Hallo, unser Name ist freeCodeCamp, wie geht es dir?"

Setzen Sie myName auf eine Zeichenfolge, die Ihrem Namen entspricht, und erstellen Sie myStr mit myName zwischen den Zeichenfolgen "Mein Name ist" und "und mir geht es gut!".

```
// Only change code below this line
var myName = 'astrid';
var myStr = "My name is " + myName + " and I am well!";


```

### Anhängen von Variablen an Zeichenfolgen

So wie wir einen String über mehrere Zeilen aus String-Literalen erstellen können, können wir auch Variablen mit dem Operator plus equals (+ =) an einen String anhängen.

Beispiel:

var anAdjective = "fantastisch!";
var ourStr = "freeCodeCamp is";
ourStr + = anAdjective;
// ourStr ist jetzt "freeCodeCamp is awesome!"

Setzen Sie someAdjective und hängen Sie es mit dem Operator + = an myStr an.

```
/ Change code below this line

var someAdjective = 'schön';
var myStr = "Learning to code is ";
myStr += someAdjective

```

### Finden Sie die Länge eines Strings

Sie können die Länge eines String-Werts ermitteln, indem Sie .length nach der String-Variablen oder dem String-Literal schreiben.

"Alan Peter". Länge; // 10

Wenn wir beispielsweise eine Variable var firstName = "Charles" erstellt haben, können wir mithilfe der Eigenschaft firstName.length herausfinden, wie lang die Zeichenfolge "Charles" ist.

Verwenden Sie die Eigenschaft .length, um die Anzahl der Zeichen in der Variablen lastName zu zählen und sie lastNameLength zuzuweisen.

```
// Setup
var lastNameLength = 0;
var lastName = "Lovelace";

// Only change code below this line

lastNameLength = lastName.length;


```

### Verwenden Sie die Klammernotation, um das erste Zeichen in einer Zeichenfolge zu finden

Die Klammernotation ist eine Möglichkeit, ein Zeichen an einem bestimmten Index innerhalb einer Zeichenfolge abzurufen.

Die meisten modernen Programmiersprachen wie JavaScript zählen nicht wie Menschen bei 1. Sie beginnen bei 0. Dies wird als nullbasierte Indizierung bezeichnet.

Beispielsweise ist das Zeichen am Index 0 im Wort "Charles" "C". Wenn also var firstName = "Charles" ist, können Sie den Wert des ersten Buchstabens der Zeichenfolge mit firstName [0] abrufen.

Beispiel:

var firstName = "Charles";
var firstLetter = firstName [0]; // firstLetter ist "C"

Verwenden Sie die Klammernotation, um das erste Zeichen in der Variablen lastName zu finden und es firstLetterOfLastName zuzuweisen.

Tipp: Sehen Sie sich das obige Beispiel an, wenn Sie nicht weiterkommen.

```

// Setup
var firstLetterOfLastName = "";
var lastName = "Lovelace";

// Only change code below this line
firstLetterOfLastName = lastName[0]; // Change this line

```

### String-Unveränderlichkeit verstehen

In JavaScript sind Zeichenfolgenwerte unveränderlich. Dies bedeutet, dass sie nach ihrer Erstellung nicht mehr geändert werden können.

Zum Beispiel der folgende Code:

var myStr = "Bob";
myStr [0] = "J"; // not possible

Der Wert von myStr kann nicht in "Job" geändert werden, da der Inhalt von myStr nicht geändert werden kann. Beachten Sie, dass dies nicht bedeutet, dass myStr nicht geändert werden kann, sondern dass die einzelnen Zeichen eines Zeichenfolgenliteral nicht geändert werden können. Die einzige Möglichkeit, myStr zu ändern, besteht darin, es mit einer neuen Zeichenfolge wie folgt zuzuweisen:

var myStr = "Bob";
myStr = "Job";

Korrigieren Sie die Zuordnung zu myStr so, dass sie den Zeichenfolgenwert von Hello World enthält. Verwenden Sie dazu den im obigen Beispiel gezeigten Ansatz.

```
// Setup
var myStr = "Jello World";

// Only change code below this line

myStr = "Hello World" // Change this line
// Only change code above this line


```

### Verwenden Sie die Klammernotation, um das n-te Zeichen in einer Zeichenfolge zu finden

Sie können auch die Klammernotation verwenden, um das Zeichen an anderen Positionen innerhalb einer Zeichenfolge abzurufen.

Denken Sie daran, dass Computer bei 0 zu zählen beginnen, sodass das erste Zeichen tatsächlich das nullte Zeichen ist.

Beispiel:

var firstName = "Ada";
var secondLetterOfFirstName = firstName [1]; // secondLetterOfFirstName ist "d"

Versuchen wir, ThirdLetterOfLastName so zu setzen, dass er dem dritten Buchstaben der LastName-Variablen in Klammernotation entspricht.

Tipp: Sehen Sie sich das obige Beispiel an, wenn Sie nicht weiterkommen.

```
// Setup
var lastName = "Lovelace";

// Only change code below this line
var thirdLetterOfLastName = lastName[2]; // Change this line


```

### Verwenden Sie die Klammernotation, um das letzte Zeichen in einer Zeichenfolge zu finden

Um den letzten Buchstaben einer Zeichenfolge zu erhalten, können Sie einen von der Länge der Zeichenfolge abziehen.

Wenn beispielsweise var firstName = "Charles" ist, können Sie den Wert des letzten Buchstabens der Zeichenfolge mithilfe von firstName [firstName.length - 1] abrufen.

Beispiel:

var firstName = "Charles";
var lastLetter = firstName [firstName.length - 1]; // lastLetter ist "s"

Verwenden Sie die Klammernotation, um das letzte Zeichen in der Variablen lastName zu finden.

Tipp: Sehen Sie sich das obige Beispiel an, wenn Sie nicht weiterkommen.

```
// Setup
var lastName = "Lovelace";

// Only change code below this line
var lastLetterOfLastName = lastName[lastName.length-1]; // Change this line


```

### Verwenden Sie die Klammernotation, um das vorletzte Zeichen in einer Zeichenfolge zu finden

Sie können dasselbe Prinzip verwenden, mit dem wir gerade das letzte Zeichen in einer Zeichenfolge abgerufen haben, um das vorletzte Zeichen abzurufen.

Beispielsweise können Sie den Wert des vorletzten Buchstabens der Zeichenfolge var firstName = "Charles" mithilfe von firstName [firstName.length - 3] abrufen.

Beispiel:

var firstName = "Charles";
var ThirdToLastLetter = Vorname [Vorname.Länge - 3]; // ThirdToLastLetter ist "l"

Verwenden Sie die Klammernotation, um das vorletzte Zeichen in der Zeichenfolge lastName zu finden.

Tipp: Sehen Sie sich das obige Beispiel an, wenn Sie nicht weiterkommen.

```
// Setup
var lastName = "Lovelace";

// Only change code below this line
var secondToLastLetterOfLastName = lastName[lastName.length - 2]; // Change this line


```

### Wortrohlinge

Wir werden jetzt unser Wissen über Strings nutzen, um ein Wortspiel im "Mad Libs" -Stil zu erstellen, das wir "Word Blanks" nennen. Sie erstellen einen (optional humorvollen) Satz im Stil "Lücken füllen".

In einem "Mad Libs" -Spiel erhalten Sie Sätze mit einigen fehlenden Wörtern wie Substantiven, Verben, Adjektiven und Adverbien. Anschließend füllen Sie die fehlenden Teile so mit Wörtern Ihrer Wahl aus, dass der vollständige Satz sinnvoll ist.

Betrachten Sie diesen Satz - "Es war wirklich \_**\_, und wir \_\_** selbst \_\_\_\_". Dieser Satz enthält drei fehlende Teile - ein Adjektiv, ein Verb und ein Adverb, und wir können Wörter unserer Wahl hinzufügen, um ihn zu vervollständigen. Wir können dann den vollständigen Satz wie folgt einer Variablen zuordnen:

var satz = "Es war wirklich" + "heiß" + "und wir" + "lachten" + "uns selbst" + "albern" + ".";

In dieser Herausforderung stellen wir Ihnen ein Substantiv, ein Verb, ein Adjektiv und ein Adverb zur Verfügung. Sie müssen einen vollständigen Satz aus Wörtern Ihrer Wahl zusammen mit den von uns bereitgestellten Wörtern bilden.

Sie müssen den String-Verkettungsoperator + verwenden, um einen neuen String mit den angegebenen Variablen zu erstellen: myNoun, myAdjective, myVerb und myAdverb. Anschließend weisen Sie die gebildete Zeichenfolge der Variablen wordBlanks zu. Sie sollten die den Variablen zugewiesenen Wörter nicht ändern.

Sie müssen auch Leerzeichen in Ihrer Zeichenfolge berücksichtigen, damit der letzte Satz Leerzeichen zwischen allen Wörtern enthält. Das Ergebnis sollte ein vollständiger Satz sein.

```
var myNoun = "dog";
var myAdjective = "big";
var myVerb = "ran";
var myAdverb = "quickly";

// Only change code below this line
var myNoun = "dog";
var myAdjective = "big";
var myVerb = "ran";
var myAdverb = "quickly";

var wordBlanks = "The " + myAdjective + " " + myNoun + " " + myVerb + " " + myAdverb + "."; // Only change this line;// Change this line
// Only change code above this line


```

### Speichern Sie mehrere Werte in einer Variablen mithilfe von JavaScript-Arrays

Mit JavaScript-Array-Variablen können wir mehrere Daten an einem Ort speichern.

Sie beginnen eine Array-Deklaration mit einer öffnenden eckigen Klammer, beenden sie mit einer schließenden eckigen Klammer und setzen wie folgt ein Komma zwischen die einzelnen Einträge:

var Sandwich = ["Erdnussbutter", "Gelee", "Brot"].

Ändern Sie das neue Array myArray so, dass es sowohl eine Zeichenfolge als auch eine Zahl enthält (in dieser Reihenfolge).

Hinweis
Lesen Sie den Beispielcode im Texteditor, wenn Sie nicht weiterkommen.

```
// Only change code below this line
var myArray = ["kk", 5];


```

### Verschachteln Sie ein Array in einem anderen Array

Sie können Arrays auch in anderen Arrays verschachteln, wie unten:

[["Bulls", 23], ["White Sox", 45]]

Dies wird auch als mehrdimensionales Array bezeichnet.

Erstellen Sie ein verschachteltes Array mit dem Namen myArray.

```
// Only change code below this line
var myArray = [["Bulls", 23], ["White Sox", 45]];


```

### Zugriff auf Array-Daten mit Indizes

Wir können über Indizes auf die Daten in Arrays zugreifen.

Array-Indizes werden in derselben Klammer-Notation geschrieben, die Zeichenfolgen verwenden, außer dass sie anstelle eines Zeichens einen Eintrag im Array angeben. Wie Strings verwenden Arrays eine auf Null basierende Indizierung, sodass das erste Element in einem Array einen Index von 0 hat.

Beispiel

var array = [50,60,70];
Array [0]; // entspricht 50
var data = array [1]; // entspricht 60

Hinweis
Zwischen dem Array-Namen und den eckigen Klammern sollten keine Leerzeichen stehen, wie z. B. Array [0]. Obwohl JavaScript dies korrekt verarbeiten kann, kann dies andere Programmierer verwirren, die Ihren Code lesen.

Erstellen Sie eine Variable mit dem Namen myData und setzen Sie sie in Klammernotation auf den ersten Wert von myArray.

```
// Setup
var myArray = [50,60,70];
var myData=myArray[0];
// Only change code below this line


```

### Ändern Sie Array-Daten mit Indizes

Im Gegensatz zu Strings sind die Einträge von Arrays veränderlich und können frei geändert werden.

Beispiel

var ourArray = [50,40,30];
ourArray [0] = 15; // gleich [15,40,30]

Hinweis
Zwischen dem Array-Namen und den eckigen Klammern sollten keine Leerzeichen stehen, wie z. B. Array [0]. Obwohl JavaScript dies korrekt verarbeiten kann, kann dies andere Programmierer verwirren, die Ihren Code lesen.

Ändern Sie die im Index 0 von myArray gespeicherten Daten auf den Wert 45.

```
// Setup
var myArray = [18,64,99];
myArray[0] = 45;
// Only change code below this line


```

### Zugriff auf mehrdimensionale Arrays mit Indizes

Eine Möglichkeit, sich ein mehrdimensionales Array vorzustellen, ist ein Array von Arrays. Wenn Sie für den Zugriff auf Ihr Array Klammern verwenden, bezieht sich der erste Satz von Klammern auf die Einträge im äußersten Array (der ersten Ebene), und jedes zusätzliche Klammerpaar bezieht sich auf die nächste Ebene von Einträgen im Array.

Beispiel

var arr = [
[1,2,3],
[4,5,6],
[7,8,9],
[[10,11,12], 13, 14]
];
arr [3]; // entspricht [[10,11,12], 13, 14]
arr [3][0]; // gleich [10,11,12]
arr [3][0] [1]; // entspricht 11

Hinweis
Zwischen dem Array-Namen und den eckigen Klammern sollten keine Leerzeichen stehen, wie z. B. Array [0][0], und selbst dieses Array [0][0] ist nicht zulässig. Obwohl JavaScript dies korrekt verarbeiten kann, kann dies andere Programmierer verwirren, die Ihren Code lesen.

Wählen Sie mithilfe der Klammernotation ein Element aus myArray so aus, dass myData gleich 8 ist.

```
// Setup
var myArray = [[1,2,3], [4,5,6], [7,8,9], [[10,11,12], 13, 14]];

// Only change code below this line
var myData = myArray[2][1];


```

### Arrays mit push () bearbeiten

Eine einfache Möglichkeit, Daten an das Ende eines Arrays anzuhängen, ist die Funktion push ().

.push () nimmt einen oder mehrere Parameter und "schiebt" sie an das Ende des Arrays.

Beispiele:

var arr1 = [1,2,3];
arr1.push (4);
// arr1 ist jetzt [1,2,3,4]

var arr2 = ["Stimpson", "J", "cat"];
arr2.push (["glücklich", "Freude"]);
// arr2 ist jetzt gleich ["Stimpson", "J", "Katze", ["glücklich", "Freude"]]

Drücken Sie ["Hund", 3] auf das Ende der myArray-Variablen.

```

// Setup
var myArray = [["John", 23], ["cat", 2]];
myArray.push( ["dog", 3]);
// Only change code below this line

```

### Arrays mit pop bearbeiten ()

Eine andere Möglichkeit, die Daten in einem Array zu ändern, ist die Funktion .pop ().

.pop () wird verwendet, um einen Wert am Ende eines Arrays zu "platzen". Wir können diesen "abgesprungenen" Wert speichern, indem wir ihn einer Variablen zuweisen. Mit anderen Worten, .pop () entfernt das letzte Element aus einem Array und gibt dieses Element zurück.

Jede Art von Eintrag kann aus einem Array "herausgesprungen" werden - Zahlen, Zeichenfolgen, sogar verschachtelte Arrays.

var threeArr = [1, 4, 6];
var oneDown = threeArr.pop ();
console.log (oneDown); // Gibt 6 zurück
console.log (threeArr); // Gibt [1, 4] zurück

Verwenden Sie die Funktion .pop (), um das letzte Element aus myArray zu entfernen, und weisen Sie removeFromMyArray den Wert "popped off" zu.

```
// Setup
var myArray = [["John", 23], ["cat", 2]];

// Only change code below this line
var removedFromMyArray = myArray.pop();


```

### Arrays mit Shift bearbeiten ()

pop () entfernt immer das letzte Element eines Arrays. Was ist, wenn Sie die erste entfernen möchten?

Hier kommt .shift () ins Spiel. Es funktioniert genau wie .pop (), nur dass das erste Element anstelle des letzten entfernt wird.

Beispiel:

var ourArray = ["Stimpson", "J", ["cat"]];
var removeFromOurArray = ourArray.shift ();
// removeFromOurArray entspricht jetzt "Stimpson" und ourArray entspricht jetzt ["J", ["cat"]].

Verwenden Sie die Funktion .shift (), um das erste Element aus myArray zu entfernen, und weisen Sie removeFromMyArray den Wert "Shifted Off" zu.

```
// Setup
var myArray = [["John", 23], ["dog", 3]];

// Only change code below this line
var removedFromMyArray = myArray.shift();


```

### Arrays mit unshift bearbeiten ()

Sie können nicht nur Elemente vom Anfang eines Arrays verschieben, sondern auch Elemente an den Anfang eines Arrays verschieben, d. H. Elemente vor dem Array hinzufügen.

.unshift () funktioniert genau wie .push (), aber anstatt das Element am Ende des Arrays hinzuzufügen, fügt unshift () das Element am Anfang des Arrays hinzu.

Beispiel:

var ourArray = ["Stimpson", "J", "cat"];
ourArray.shift (); // ourArray ist jetzt gleich ["J", "cat"]
ourArray.unshift ("Happy");
// ourArray ist jetzt gleich ["Happy", "J", "cat"]

Fügen Sie ["Paul", 35] mit unshift () am Anfang der Variablen myArray hinzu.

```
// Setup
var myArray = [["John", 23], ["dog", 3]];
myArray.shift();

// Only change code below this line
myArray.unshift(["Paul",35]);

```

### Einkaufsliste

Erstellen Sie eine Einkaufsliste in der Variablen myList. Die Liste sollte ein mehrdimensionales Array sein, das mehrere Unterarrays enthält.

Das erste Element in jedem Unterarray sollte eine Zeichenfolge mit dem Namen des Elements enthalten. Das zweite Element sollte eine Zahl sein, die die Menge darstellt, d.h.

["Schokoriegel", 15]

Die Liste sollte mindestens 5 Sub-Arrays enthalten.

```
var myList = [
["Chocolate Bar", 15],
["Chocolate Bar", 15],
["Chocolate Bar", 15],
["Chocolate Bar", 15],
["Chocolate Bar", 15]
];


```

### Schreiben Sie wiederverwendbares JavaScript mit Funktionen

In JavaScript können wir unseren Code in wiederverwendbare Teile aufteilen, die als Funktionen bezeichnet werden.

Hier ist ein Beispiel für eine Funktion:

Funktion functionName () {
console.log ("Hallo Welt");
}}

Sie können diese Funktion aufrufen oder aufrufen, indem Sie ihren Namen gefolgt von Klammern wie folgt verwenden: functionName (); Bei jedem Aufruf der Funktion wird die Meldung "Hello World" auf der Entwicklungskonsole ausgedruckt. Der gesamte Code zwischen den geschweiften Klammern wird bei jedem Aufruf der Funktion ausgeführt.

     Erstellen Sie eine Funktion namens reusableFunction, die "Hi World" auf der Entwicklungskonsole druckt.
     Rufen Sie die Funktion auf.

```

function reusableFunction() {
  console.log("Hi World");
}
reusableFunction();
```

### Übergeben von Werten an Funktionen mit Argumenten

Parameter sind Variablen, die als Platzhalter für die Werte dienen, die beim Aufruf in eine Funktion eingegeben werden sollen. Wenn eine Funktion definiert ist, wird sie normalerweise zusammen mit einem oder mehreren Parametern definiert. Die tatsächlichen Werte, die beim Aufruf in eine Funktion eingegeben (oder "übergeben") werden, werden als Argumente bezeichnet.

Hier ist eine Funktion mit zwei Parametern, param1 und param2:

Funktion testFun (param1, param2) {
console.log (param1, param2);
}}

Dann können wir testFun aufrufen: testFun ("Hallo", "Welt"); Wir haben zwei Argumente übergeben, "Hallo" und "Welt". Innerhalb der Funktion ist param1 gleich "Hallo" und param2 gleich "Welt". Beachten Sie, dass Sie testFun mit verschiedenen Argumenten erneut aufrufen können und die Parameter den Wert der neuen Argumente annehmen.

     Erstellen Sie eine Funktion namens functionWithArgs, die zwei Argumente akzeptiert und ihre Summe an die Entwicklungskonsole ausgibt.
     Rufen Sie die Funktion mit zwei Zahlen als Argumente auf.

```
function functionWithArgs(param1, param2) {
  console.log(param1 + param2);
}
functionWithArgs(4,5);

```

### Globaler Umfang und Funktionen

In JavaScript bezieht sich der Bereich auf die Sichtbarkeit von Variablen. Variablen, die außerhalb eines Funktionsblocks definiert sind, haben einen globalen Gültigkeitsbereich. Dies bedeutet, dass sie überall in Ihrem JavaScript-Code angezeigt werden.

Variablen, die ohne das Schlüsselwort var verwendet werden, werden automatisch im globalen Bereich erstellt. Dies kann zu unbeabsichtigten Konsequenzen an anderer Stelle in Ihrem Code oder beim erneuten Ausführen einer Funktion führen. Sie sollten Ihre Variablen immer mit var deklarieren.

Deklarieren Sie mit var eine globale Variable namens myGlobal außerhalb einer Funktion. Initialisieren Sie es mit einem Wert von 10.

Weisen Sie in der Funktion fun1 oopsGlobal 5 zu, ohne das Schlüsselwort var zu verwenden.

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

###

```


```

Fertig!

## Fazit

x

1. Welche Möglichkeiten gibt es, den JavaScript Programmcode zu kommentieren?
2. Verwenden Sie das Schlüsselwort `var`, um eine Variable namens `meinName` zu erstellen.
3. Weisen Sie der Variablen `meinName` den Wert `sami` zu.
4. Ordnen Sie den Inhalt von a der Variablen b zu.
   var a;
   a = 7;
   var b;
5. Definieren Sie eine Variable a mit var und initialisieren Sie sie auf den Wert 9.
6. Initialisieren Sie die drei Variablen a, b und c mit 5, 10 und "Ich bin a", damit sie nicht undefiniert werden.
   // Only change code below this line
   var a...;
   var b = 10;
   var c = "I am a";
   // Only change code above this line

a = a + 1;
b = b + 5;
c = c + " String!";

7. Ändern Sie die vorhandenen Deklarationen und Zuweisungen so, dass ihre Namen camelCase verwenden.
   Erstellen Sie keine neuen Variablen.
   // Variable declarations
   var StUdLyCapVaR;
   var properCamelCase;
   var TitleCaseOver;

// Variable assignments
STUDLYCAPVAR = 10;
PRoperCAmelCAse = "A String";
tITLEcASEoVER = 9000;

8. Ändern Sie die 0 so, dass die Summe 20 entspricht.
   var sum = 10 + 0;

9. Ändern Sie die 0 so, dass die Difference 20 entspricht.
   var difference = 45 - 33;

10. Ändern Sie die 0 so, dass das Produkt gleich 80 ist.

11 Ändern Sie die 0 so, dass der Quotient gleich 2 ist.

12.
