---
date: 2020-09-24
title: 'Erste Schritte mit visuellem Design'
template: post
thumbnail: '../thumbnails/css.png'
slug: erste-schritte-mit-visuellem-design
categories:
  - Code
  - Popular
tags:
  - Grundlagen
  - CSS
  - HTML
---

Design in der Webentwicklung ist ein breites Thema. Es kombiniert

- Typografie,
- Farbtheorie,
- Grafiken,
- Animation
- und Seitenlayout.

  Grundsätzlich bieten die meisten Webinhalte einem Benutzer Informationen.
  Das visuelle Design beeinflusst die Benutzererfahrung.
  In der Webentwicklung verleiht **HTML** dem Inhalt einer Seite Struktur und Semantik,
  und **CSS** steuert das Layout und das Erscheinungsbild.

  Hier beschreibe Dinge, die als wichtig ansehe.

#### Voraussetzungen

Interesse an meiner Sammlung.

#### Ziel

Ein Überblick.

## Webdesign

### Gleichgewicht mithilfe der Textausrichtungseigenschaft

Text ist oft ein großer Teil des Webinhalts.
CSS bietet verschiedene Optionen zum Ausrichten.

- `text-align: justify;` bewirkt, dass alle Textzeilen mit Ausnahme der letzten Zeile den linken und rechten Rand des Zeilenfelds treffen.
- `text-align: center;` zentriert den Text
- `text-align: right;` richtet den Text rechsts aus
- und `text-align: left;` (die Standardeinstellung), richtet den Text links aus.

### Die Breite und Höhe eines Elements

Gib die Breite eines Elements mithilfe der Eigenschaft `width` in
CSS an und die Höhe mit `height`.
Gib die Werte in relativen Längeneinheiten (wie z. B. em), absoluten
Längeneinheiten (wie z. B. px) oder als Prozentsatz des enthaltenen
übergeordneten Elements an. Hier ist ein Beispiel, das die Breite und die Höhe eines
Bildes auf 200 Pixel ändert:

```
img {
  width: 200px;
  height: 200px;
}

```

### Das `strong`-Tag hebt Text hervor

Das Tag `strong` wird verwendet, um Text hervorzuheben.
Mit dem Tag `strong` wendet der Browser das CSS `font-weight: bold;`
auf das Element an.

```
<strong>Wichtiger Text</strong>
```

### Das `u`-Tag stellt Text unterstrichen dar

Um Text zu unterstreichen, gibt `u`-Tag. Mit dem Tag `u` wendet der Browser das
CSS `text-decoration: underline;` auf das Element an.

```
<u>Unterstrichener Text</u>
```

### Das `em`-Tag stellt Text kursiv dar

Um Text inhaltlich wichtig zu markieren, gibt das `em`-Tag. Mit dem Tag `em` wendet der Browser das
CSS `font-style: italic;` auf das Element an.

```
<em>kursiver Text</em>
```

### Das `a`-Tag stellt Text druchgestrichen dar

Um Text durchzustreichen, gibt das `s`-Tag. Mit dem Tag `s` wendet der Browser das
CSS `text-decoration: line-through;` auf das Element an.

```
<s>Durchgesricherner Text</s>
```

### Das `hr`-Tag stellt eine horizontale Linie dar

Um eine horizontale Linie zu zeichnen, gibt das `hr`-Tag.

> `hr`-Tag ist ein selbstschließendes Tag.

```
<hr />
```

### Hintergrundfarbe

Anstatt Ihren Gesamthintergrund oder die Farbe des Textes anzupassen,
um den Vordergrund gut lesbar zu machen, ist es möglich dem Element,
das den Text enthält,
den du hervorheben möchtest, eine Hintergrundfarbe hinzufügen.

> rgba steht für: r = rot - g = grün - b = blau a = Alpha / Deckkraft

Die RGB-Werte können zwischen 0 und 255 liegen.
Der Alpha-Wert kann zwischen 1 (vollständig undurchsichtig oder einfarbig) und
0 (vollständig transparent oder klar) liegen.
`rgba()` eignet sich hervorragend für diesen Fall, da Sie die Deckkraft anpassen können. Dies bedeutet, dass Sie den Hintergrund nicht vollständig ausblenden müssen.

> `rgba(45, 45, 45, 0.1)` erzeugt eine dunkelgraue Farbe,
> die bei dem niedrigen Opazitätswert von 0,1 nahezu transparent ist.

```
background-color: rgba(45, 45, 45, 0.1);
```

### Schriftgröße

Die Schriftgröße von Header-Tags (`h1` bis `h6`) sollte im Allgemeinen
größer sein als die Schriftgröße von Absatz-Tags.
Dies erleichtert dem Benutzer das visuelle Verständnis des Layouts
und der Wichtigkeit aller Elemente auf der Seite.
Mit der Eigenschaft `font-size` ist die Größe des Texts in einem Element anpassbar.

```
font-size: 27px;
```

### Schatten

Die Eigenschaft „Box-Shadow“ wendet einen oder mehrere Schatten auf ein Element an.

Die Eigenschaft `box-shadow` nimmt Werte für an

- `offset-x` (wie weit der Schatten horizontal vom Element entfernt ist),
- `offset-y` (wie weit der Schatten vertikal vom Element entfernt ist),
- `blur-radius` = Unschärferadius,
- `spread-radius` = Ausbreitungsradius und
- `color` = Farbe

in dieser Reihenfolge.

Die Werte für „Unschärferadius“ und „Ausbreitungsradius“ sind optional.

Mehrere Schatten werden mithilfe von Kommas getrennt.
Hier ist ein Beispiel für das CSS, um mehrere Schatten mit einigen Unschärfen in größtenteils transparenten schwarzen Farben zu erstellen:

```
box-shadow: 0 10px 20px rgba(0,0,0,0.21), 0 6px 6px rgba(0,0,0,0.25);
```

### Deckkraft

Die Eigenschaft `opacity` oder Deckkraft in CSS wird verwendet,
um die Deckkraft oder umgekehrt die Transparenz für ein Element anzupassen.

- Der Wert 1 ist undurchsichtig, was überhaupt nicht transparent ist.
- Ein Wert von 0,5 ist halb durchsichtig.
- Ein Wert von 0 ist vollständig transparent.

> Der angegebene Wert gilt für das gesamte Element,
> unabhängig davon, ob es sich um ein Bild mit einer gewissen Transparenz
> handelt oder um die Vordergrund- und Hintergrundfarben für einen Textblock.

```
opacity: 0.7;
```

### Texttransformation

Die Eigenschaft `text-transform` oder Texttransformation
in CSS wird verwendet, um das Erscheinungsbild von Text zu ändern.
Auf diese Weise ist es möglich sicherstellen, dass der Text auf
einer Webseite konsistent angezeigt wird, ohne den Textinhalt der
tatsächlichen HTML-Elemente ändern zu müssen.

Die folgende Tabelle zeigt, wie die verschiedenen Text-Transformations-Werte
den Beispieltext "Verwandle mich" ändern.

| Wert         | Ergebnis                                                               |
| ------------ | ---------------------------------------------------------------------- |
| `lowercase`  | "verwandle mich"                                                       |
| `uppercase`  | "VERWANDELE MICH"                                                      |
| `capitalize` | "Verwandle mich"                                                       |
| `initial`    | Verwenden Sie den Standardwert                                         |
| `inherit`    | Verwenden Sie den Wert "text-transform" aus dem übergeordneten Element |
| `none`       | **Standard:** Verwenden Sie den Originaltext                           |

```
text-transform: uppercase;
```

### Zeilenabstand

`line-height` bestimmt den Zeilenabstand.

```
line-height: 25px;
```

### Pseudoklassen

Eine Pseudoklasse ist ein Schlüsselwort, das Selektoren hinzugefügt werden kann,
um einen bestimmten Status des Elements auszuwählen.

Beispielsweise kann das Design eines Ankertags mithilfe des
Pseudoklassen-Selektors: `hover` für den Schwebezustand oder Mausover geändert werden.
Hier ist das CSS, mit dem die Farbe des Ankertags während des Schwebezustands
in Rot wechselt:

```
a:hover {
  color: red;
}
```

### Position (relative)

CSS behandelt jedes HTML-Element als eine eigene Box,
die als CSS-Box-Modell bezeichnet wird. Elemente auf Blockebene beginnen
automatisch in einer neuen Zeile (Überschriften, Absätze und Divs), während
Inline-Elemente im umgebenden Inhalt angezeigt werden.
Das Standardlayout wird als normaler Fluss eines Dokuments bezeichnet,
CSS bietet die Positionseigenschaft, um dies zu überschreiben.

Im folgenden Beispiel wird der Absatz 10 Pixel vom unteren Rand entfernt:

```
p {
  position: relative;
  bottom: 10px;
}
```

> Die CSS-Offsets `top`, `bottom`, `left` oder `right` geben dem Browser an,
> wie weit ein Element relativ zu dem Ort versetzt werden soll,
> an dem es sich im normalen Fluss des Dokuments befinden würde.

Wenn die Position eines Elements relativ ist, wird es nicht aus dem normalen
Ablauf entfernt.

> Es ist wichtig, darauf zu achten, dass unabhängig von der Position der
> Elemente das zugrunde liegende HTML-Markup organisiert und sinnvoll ist,
> wenn es von oben nach unten gelesen wird.
> Auf diese Weise greifen Benutzer mit Sehbehinderungen
> (die auf Hilfsmittel wie Bildschirmlesegeräte angewiesen sind)
> auf Ihre Inhalte zu.

### Position (absolut)

Mit absoluter Positionierung sperrt man ein Element an seinem übergeordneten Element.
Im Gegensatz zur relativen Position wird es dadurch aus dem normalen Fluss des
Dokuments entfernt, sodass umgebende Elemente es ignorieren.
Die CSS-Offset-Eigenschaften (`top`, `bottom`, `left` oder `right`) werden
zum Anpassen der Position verwendet.

```
position: absolute;
top: 50px;
right: 50px;
```

### Position (fixed)

Sperre ein Element mit fester Positionierung im Browserfenster.
Der folgende Code zeigt ein Element immer links oben an.

```
position:fixed;
top:0;
left: 0;
```

> Ein wesentlicher Unterschied zwischen der festen und der
> absoluten Position besteht darin, dass sich ein Element mit
> einer fixen Position beim Scrollen des Benutzers nicht bewegt.

### Float

Floating-Elemente werden aus dem normalen Fluss eines Dokuments entfernt
und entweder links oder rechts von ihrem übergeordneten Element verschoben.
Es wird häufig mit der Eigenschaft `width` verwendet, um anzugeben,
wie viel horizontalen Platz das schwebende Element benötigt.

```
float: right;
```

### z-index

Wenn Elemente so positioniert werden, dass sie sich überlappen,
wird das Element, das später im HTML-Markup angezeigt wird,
standardmäßig oben auf den anderen Elementen angezeigt.
Die Eigenschaft `z-index` kann die Reihenfolge angeben,
in der Elemente übereinander gestapelt werden.
Es muss eine Ganzzahl sein (keine Dezimalzahl), und höhere Werte für
die `z-index`-Eigenschaft eines Elements verschieben es im Stapel höher
als diejenigen mit niedrigeren Werten.

Im folgenden Beispiel liegt `z-index: 2` über `z-index: 1`.

```CSS
  .zwei {
    background-color: red;
    position: absolute;
    z-index: 2;

  }
  .eins {
    background-color: blue;
    position: absolute;
    left: 40px;
    top: 50px;
    z-index: 1;
  }
```

### Horizental Zentrieren mithilfe von `margin`

Eine andere Positionierungstechnik besteht darin,
ein Blockelement horizontal zu zentrieren.
Eine Möglichkeit, dies zu tun, besteht darin,
`margin` auf den Wert `auto` zu setzen.

```
margin:auto;
```

> Diese Methode funktioniert auch für Bilder. Bilder sind standardmäßig
> Inline-Elemente, können jedoch in Blockelemente geändert werden,
> wenn Sie die Anzeigeeigenschaft auf `block` setzen.

### Komplementärfarben

Die Farbtheorie und ihre Auswirkungen auf das Design sind ein komplexes Thema
das hier nur angeschnitten wird. Auf einer Website lenkt Farbe die Aufmerksamkeit
auf Inhalte, ruft Emotionen hervor oder erzeugt visuelle Harmonie.
Die Verwendung verschiedener Farbkombinationen verändert das Erscheinungsbild
einer Website.

Das Farbrad ist ein nützliches Werkzeug.
Wenn sich zwei Farben auf dem Rad gegenüberliegen, werden sie als
Komplementärfarben bezeichnet.

Einige Beispiele für Komplementärfarben mit ihren Hex-Codes sind:

- rot (#FF0000) und cyan (#00FFFF)
- grün (#00FF00) und magenta (#FF00FF)
- blau (#0000FF) und gelb (#FFFF00)

Dies unterscheidet sich von dem veralteten RYB-Farbmodell,
das vielen von uns in der Schule beigebracht wurde.
Die moderne Farbtheorie verwendet das additive RGB-Modell
(wie auf einem Computerbildschirm) und das subtraktive CMY(K)-Modell
(wie beim Drucken).

> Die Verwendung von Farbe ist eine leistungsstarke Methode,
> um einer Seite visuelles Interesse zu verleihen.
> Farbe allein ist nicht als einzige Möglichkeit zur Übermittlung
> wichtiger Informationen verwendbar, da Benutzer mit Sehbehinderungen
> diesen Inhalt unter Umständen nicht verstehen.

```
body {
  background-color: #FFFFFF;
}
.blue {
  background-color: #0000FF;
}
.yellow {
  background-color: #FFFF00;
}
```

### Tertiärfarben

Computermonitore und Gerätebildschirme erzeugen unterschiedliche Farben, indem sie rotes, grünes und blaues Licht kombinieren. Dies ist in der modernen Farbtheorie als additives RGB-Farbmodell bekannt. Rot (R), Grün (G) und Blau (B) werden als Primärfarben bezeichnet. Durch Mischen von zwei Primärfarben entstehen die Sekundärfarben Cyan (G + B), Magenta (R + B) und Gelb (R + G).

Tertiärfarben sind das Ergebnis der Kombination einer Primärfarbe mit einem ihrer Sekundärfarbennachbarn. Beispielsweise ergeben im RGB-Farbmodell Rot (primär) und Gelb (sekundär) Orange (tertiär). Dies fügt einem Farbkreis sechs weitere Farben hinzu.

Hier sind drei Farben, die mit dem Split-Complement-Schema erstellt wurden:

- orange #FF7F00
- cyan #00FFFF
- raspberry #FF007F

```
body {
  background-color: #FFFFFF;
}

.orange {
  background-color: #FF7F00;
}

.cyan {
  background-color: #00FFFF;
}

.raspberry {
  background-color: #FF007F;
}
```

### Farbton

Farben haben verschiedene Eigenschaften, einschließlich Farbton,
Sättigung und Helligkeit. CSS3 führte die Eigenschaft `hsl()` als alternative
Methode zur Auswahl einer Farbe ein, indem diese Eigenschaften direkt
angegeben wurden.

Farbton ist das, was man allgemein als "Farbe" betrachten.
Wenn man sich ein Farbspektrum vorstellz, das links mit Rot beginnt,
sich in der Mitte durch Grün und rechts durch Blau bewegt,
passt eine Farbe entlang dieser Linie zum Farbton. In `hsl()` verwendet `hue`
anstelle des Spektrums ein Farbradkonzept, bei dem der Winkel der Farbe
auf dem Kreis als Wert zwischen 0 und 360 angegeben wird.

Die Sättigung ist die Menge an Grau in einer Farbe.
Eine vollständig gesättigte Farbe enthält kein Grau,
und eine minimal gesättigte Farbe ist fast vollständig grau.
Dies wird als Prozentsatz angegeben, wobei 100% vollständig gesättigt sind.

Helligkeit ist die Menge an Weiß oder Schwarz in einer Farbe.
Es wird ein Prozentsatz angegeben, der von 0% (schwarz)
bis 100% (weiß) reicht, wobei 50% die normale Farbe ist.

Hier einige Beispiele für die Verwendung von `hsl()` mit vollständig
gesättigten Farben mit normaler Helligkeit:

| Farbe   | HSL                 |
| ------- | ------------------- |
| red     | hsl(0, 100%, 50%)   |
| yellow  | hsl(60, 100%, 50%)  |
| green   | hsl(120, 100%, 50%) |
| cyan    | hsl(180, 100%, 50%) |
| blue    | hsl(240, 100%, 50%) |
| magenta | hsl(300, 100%, 50%) |

### Linearer CSS-Verlaufsverlauf

Das Anwenden einer Farbe auf HTML-Elemente ist nicht auf einen
flachen Farbton beschränkt. CSS bietet die Möglichkeit,
Farbübergänge, auch als Farbverläufe bezeichnet, für Elemente zu verwenden.
Der Zugriff erfolgt über die Funktion `linear-gradient()` der Hintergrundeigenschaft.
Hier ist die allgemeine Syntax:

```
background: linear-gradient(gradient_direction, color 1, color 2, color 3, ...);
```

Das erste Argument gibt die Richtung an, aus der der Farbübergang beginnt -
es kann als Grad angegeben werden, wobei 90 Grad einen vertikalen Farbverlauf
bilden und 45 Grad wie ein Backslash abgewinkelt sind.
Die folgenden Argumente geben die Reihenfolge der im Verlauf verwendeten Farben an.

```
background: linear-gradient(90deg, red, yellow, rgb(204, 204, 255));
```

Du kannst einen gestreiften Hintergrund erstellen.

```
repeating-linear-gradient(
      90deg,
      yellow 0px,
      blue 40px,
      green 40px,
      red 80px
    );
```

### url()

Hier erstelle eine Textur, indem ich ein
Muster als Hintergrundbild mithilfe von `url()` hinzufüge.

```
body {
background: url(https://cdn-media-1.freecodecamp.org/imgr/MJAkxbh.png);
  }
```

### CSS-Transformationsskaleneigenschaft `scale()`

Um die Skalierung eines Elements zu ändern,
verfügt CSS über die Transformationseigenschaft und die
Funktion `scale()`. Das folgende Codebeispiel verdoppelt
die Größe aller Absatzelemente auf der Seite:

```
p {
  transform: scale(2);
}
```

Der nächste Code verändert die Größe beim Überrollen mit der Maus.

```
p:hover {
  transform: scale(2.1);
}
```

### CSS-Transformationsskaleneigenschaft `skewX()`

`skewX()` verzerrt das ausgewählte Element entlang seiner X-Achse
(horizontal) um einen bestimmten Gradwert.

```
p {
  transform: skewX(-32deg);
}
```

> skewY erledigt das gleiche entlang der Y-Achse: `transform: skewY(10deg);`.

### Formen

The moon.

```
.moon {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 25px 10px 0 0 yellow;
}
```

Eine der beliebtesten Formen der Welt ist die Herzform.
Wir verwenden die Pseudoelemente `::before` and `::after`,
um etwas vor oder nach einem ausgewählten Element hinzuzufügen.

```
<style>
  .heart {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: pink;
    height: 50px;
    width: 50px;
    transform: rotate(-45deg);
  }
  .heart::after {
    background-color: pink;
    content: "";
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0px;
    left: 25px;
  }
  .heart::before {
    content:"" ;
    background-color: pink;
    border-radius: 50%;
    position: absolute;
    width: 50px;
    height: 50px;
    top: -25px;
    left: 0px;
  }
</style>
<div class="heart"></div>
```

### CSS @keyframes- und Animationseigenschaften

Um ein Element zu animieren, gibt es die Animationseigenschaften und
die `@keyframes`-Regel.

Die Animationseigenschaften steuern, wie sich die Animation verhalten soll,
und die `@keyframes`-Regel steuert, was während dieser Animation geschieht.
Insgesamt gibt es acht Animationseigenschaften. Hier die beiden wichtigsten:

- `animation-name`: Animationsname legt den Namen der
  Animation fest, der später von `@keyframes` verwendet wird,
  um CSS mitzuteilen, welche Regeln zu welchen Animationen gehören.

- `animation-duration`: Animationsdauer legt die Zeitdauer für die Animation fest.

Mit `@keyframes` können wir genau angeben, was innerhalb der Animation
über die Dauer geschieht.
Dies erfolgt durch Angabe von CSS-Eigenschaften für bestimmte
"Frames" während der Animation mit Prozentsätzen zwischen 0% und 100%.
Wenn wir dies mit einem Film vergleichen, werden die CSS-Eigenschaften
für 0% so angezeigt, wie das Element in der Eröffnungsszene angezeigt wird.
Die CSS-Eigenschaften für 100% angegeben. Also wie das Element am Ende,
unmittelbar vor dem Abspann angezeigt wird.
Dann wendet CSS die Magie an, um das Element über die angegebene Dauer
zu überführen und die Szene zu spielen.
Hier ist ein Beispiel:

```
#anim {
  animation-name: colorful;
  animation-duration: 3s;
}

@keyframes colorful {
  0% {
    background-color: blue;
  }
  100% {
    background-color: yellow;
  }
}
```

Für das Element mit der ID `anim` setzt der obige Code
den Animationsnamen auf `colorful` und die Animationsdauer auf 3 Sekunden.
Anschließend wird die `@keyframes`-Regel mit dem `colorful` Namen auf
die Animationseigenschaften verlinkt.
Die Farbe wird zu Beginn der Animation auf Blau gesetzt (0%),
die am Ende der Animation auf Gelb übergeht (100%).
Sie sind nicht nur auf Übergänge vom Anfang bis zum Ende beschränkt,
sondern können Eigenschaften für das Element für einen beliebigen
Prozentsatz zwischen 0% und 100% festlegen.

Noch ein Beispiel:

```
<style>
  div {
    height: 40px;
    width: 70%;
    background: black;
    margin: 50px auto;
    border-radius: 5px;
  }

  #rect {
animation-name: rainbow;
  animation-duration: 4s;

  }

@keyframes rainbow {
  0% {
    background-color: blue;
  }
  0% {
    background-color: green;
  }  100% {
    background-color: yellow;
  }
}
</style>
<div id="rect"></div>
```

Hier ist ein Beispiel für das Ändern der Breite eines Bildes beim Hover:

```
<style>
  img:hover {
    animation-name: width;
    animation-duration: 500ms;
  }

  @keyframes width {
    100% {
      width: 40px;
    }
  }
</style>

<img src="https://bit.ly/smallgooglelogo" alt="Google's Logo" />
```

Verändern der Farbe einer Schalftläche beim Überrollen mit der Maus.

```
<style>
  button {
    border-radius: 5px;
    color: white;
    background-color: #0F5897;
    padding: 5px 10px 8px 10px;
  }

  button:hover {
    animation-fill-mode: forwards;
    animation-name: background-color;
    animation-duration: 500ms;
  }

@keyframes background-color {
    100% {
      background-color: #4791d0;
    }
    }

</style>

<button>Register</button>
```

> `animation-fill-mode: forwards;` = Die Schaltfläche bleibt hervorgehoben, wenn ein Benutzer mit der Maus darüber fährt.

Hüpfender Ball:

```
<style>

  #ball {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    position: relative;
    border-radius: 50%;
    background: linear-gradient(
      35deg,
      #ccffff,
      #ffcccc
    );
    animation-name: bounce;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes bounce{
    0% {
      top: 0px;
    }
    50% {
      top: 249px;
      width: 130px;
      height: 70px;
    }
    100% {
      top: 0px;
    }
  }
</style>
<div id="ball"></div>


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
