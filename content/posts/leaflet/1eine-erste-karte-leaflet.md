---
date: 2018-12-13
title: 'Eine erste Karte'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: eine-erste-karte-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Zunächst zeige ich Ihnen, wie Sie in vier einfachen Schritten eine _digitale Karte_ mit Leaflet in ein HTML Dokument einbinden.

Mit Leaflet müssen Sie dafür nicht wissen, was geografische Koordinaten sind und wie die Bilddateien für die Karten erstellt werden. Da dies aber als Hintergrundwissen bei einer eventuellen Fehlersuche hilfreich sein kann, habe ich einen Theorie-Teil in dieses Kapitel eingefügt. Hier erkläre ich Ihnen alles Wichtige zum Thema geografische Koordinaten und die übliche Vorgehensweise beim Erstellen und Zuordnen der Imagedateien für diese Karten – die _Kachel-Technik_. Zum Abschluss lernen Sie dann noch eine Alternative zur Kachel-Technik kennen, den _Web-Map-Service_.

## Wir beginnen mit einer einfachen Karte

Um eine Karte mit Leaflet auf einer Internetseite anzuzeigen, reichen wenige Schritte aus:

1. Integrieren Sie die notwendigen JavaScript und Cascading Style Sheet Dateien (CSS).
2. Erstellen Sie ein HTML-Element – üblicherweise ein `<div>`-Element – in dem Ihre Karte angezeigt werden soll.
3. Erstellen Sie das JavaScript Karten-Objekt.
4. Fügen Sie eine Schicht mit Kacheln – einen Tile-Layer – zum Karten-Objekt hinzu.

Noch vor Schritt 1 erstellen wir eine einfache HTML-Datei. Diese Datei ist die Grundlage für die Beispiele hier im Buch. Den Programmcode für die einfache HTML-Datei sehen Sie im nachfolgenden Programmcodebeispiel. Fügen Sie diesen Programmcode in eine Datei ein und speichern diese Datei ab.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_999.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
  </head>
  <body></body>
</html>

```

Ein Aufruf dieser Datei in Ihrem Browser öffnet zunächst nur ein leeres Browser-Fenster. Nur der Titel der Seite ist in der Titelleiste des Browsers abzulesen. In den nächsten vier Kapiteln erfahren Sie, wie Sie die digitale Landkarte in das Fenster bekommen. Vier Kapitel hört sich aufwendig an. Das ist es aber nicht. Fangen Sie an und Sie werden sehen, dass Sie schon in wenigen Minuten die Karte präsentieren können.

### Integrieren Sie die notwendigen JavaScript und Cascading Style Sheet Dateien

Sie haben zwei Möglichkeiten die notwendigen Dateien in Ihr HTML-Dokument zu integrieren.

1. Binden Sie die Dateien über ein CDN in Ihr HTML-Dokument ein.
2. Kopieren Sie die Dateien und binden Sie die lokale Kopie in Ihr HTML-Dokument ein.

> Ein [Content Delivery Network](https://de.wikipedia.org/w/index.php?title=Content_Delivery_Network)[^de.wikipedia.org/w/index.php?title=Content_Delivery_Network] oder Content _Distribution_ Network (CDN) ist ein Netz von Servern, das über das Internet verbundenen ist. Die Server in diesem Netzwerk bieten Inhalte zum Download an.

#### Leaflet über ein Content Delivery Network einbinden

Sie können Leaflet mithilfe eines CDN nutzen. So müssen Sie die Dateien nicht selbst herunterladen. Es ist lediglich eine Verlinkung nötig. Mit der richtigen Verlinkung wird Leaflet automatisch über das CDN heruntergeladen, wenn ein Website Besucher Ihre Website aufruft. Im nachfolgenden Programmcodebeispiel sehen Sie den Text für die Verlinkung zur Leaflet-Version 1.2.0.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_998.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
    />
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
  </head>
  <body></body>
</html>

```

> Welche Leaflet-Versionen Ihnen über das CDN zur Verfügung stehen, können Sie jederzeit unter der Adresse http://leafletjs.com/download.html nachlesen.

Auch wenn die Dateien der Leaflet Bibliothek nun automatisch über das CDN heruntergeladen werden: Ein Aufruf Ihrer Datei in Ihrem Browser öffnet immer noch ein leeres Browser-Fenster. Erst im letzten Schritt, im Kapitel _Fügen Sie eine Schicht mit Kacheln – einen Tile-Layer – zum Karten-Objekt hinzu_, wird die Karte sichtbar.

> Fast alle modernen Browser unterstützen [Subresource Integrity (SRI)](https://en.wikipedia.org/w/index.php?title=Subresource_Integrity)[^en.wikipedia.org/w/index.php?title=Subresource_Integrity] und auch Leaflet verwendet diese Sicherheitsfunktion. SRI steht für die Überprüfung der Integrität von Dateien die im Internet verwendet werden. Mithilfe dieser Funktion können Sie sich davor schützen, dass nachträglich veränderte Dateien auf Ihrem Server ausgeführt werden. Die Dateien könnten beispielsweise bei der Übertragung im Internet verändert werden. Wenn Sie SRI nutzen, erhalten Sie immer exakt die Version, die Ihnen auch ausgeliefert werden sollte – oder eine Fehlermeldung. Dabei wird auf eine Prüfsumme – also einen Hash-Wert – zurückgegriffen. Diese Prüfsumme macht die Datei eindeutig erkennbar. Um potenzielle Sicherheitsprobleme zu vermeiden, empfehle ich Ihnen SRI zu nutzen, wenn Sie Leaflet über ein CDN einbinden. Informationen dazu, wie Sie dies genau handhaben, finden Sie unter der Adresse [leafletjs.com/download.html](http://leafletjs.com/download.html) .

#### Eine lokale Leaflet-Kopie einbinden

Eine zweite – vielleicht etwas kompliziertere – Möglichkeit ist, die Leaflet-Dateien selbst herunterzuladen. Die aktuellen Versionen finden Sie unter der Adresse http://leafletjs.com/download.html . Diese müssen Sie anschließend auf dem eigenen Server verfügbar machen und in Ihre Website einbinden. Diese Variante hat den _Vorteil_, dass Sie nicht von einem CDN Server abhängig sind. Somit haben Sie mehr Sicherheit. Sie wissen genau, welche Datei Sie auf Ihrem Server abgelegt haben und haben Einfluss auf die Konfiguration Ihres Servers. _Nachteilig_ ist dabei allerdings, dass Sie sich selbst um alles kümmern müssen. Sie müssen selbst die Dateien kopieren und sicherstellen, dass Sie die passende Version von Leaflet nutzen. Aktualisierungen müssen Sie selbst vornehmen.

Im nachfolgenden Codebeispiel sehen Sie das Einbinden von Leaflet unter der Annahme, dass Sie die heruntergeladenen Dateien - relativ zu Ihrem HTML-Dokument ein Verzeichnis höher - im Unterverzeichnis `/leaflet` auf Ihrem Webserver abgelegt haben.

> Wenn Sie mit [relativen Pfadangaben](https://de.wikipedia.org/w/index.php?title=Pfadname)[^de.wikipedia.org/w/index.php?title=Pfadname] arbeiten, setzen Sie die Links innerhalb eines Projektes mit Hilfe von Punkten. Der große Vorteil von relativen Pfadangaben ist, dass Sie ein Projekt jederzeit in ein anderes Verzeichnis kopieren können ohne Pfadangaben korrigieren zu müssen. Bei einer relativen Pfadangabe bedeuten die Punkte folgendes: Ein Punkt gefolgt von einem Schrägstrich (`./datei.html`) zeigt auf eine Datei, die sich im gleichen Verzeichnis befindet. Zwei Punkte gefolgt von einem Schrägstrich (`../datei.html`) zeigen auf eine Datei, die sich ein Verzeichnis höher befindet. Zweimal zwei Punkte gefolgt von einem Schrägstrich hintereinander (`../../datei.html`) zeigen auf eine Datei, die sich zwei Verzeichnisse höher befindet. Wenn Ihnen meine Erklärung nicht hilfreich erscheint sehen sich doch einfach alles im nächsten Beispiel an. Manchmal sagt ein Beispiel mehr als viele Worte. Nach meiner Erfahrung wird bei der praktischen Anwendung Vieles oft sehr schnell klarer.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_998a.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body></body>
</html>

```

Auch wenn Leaflet nun lokal geladen wird, zeigt ein Aufruf dieser Datei in Ihrem Browser immer noch ein leeres Browser-Fenster. Erst im letzten Schritt - im Kapitel _Fügen Sie eine Schicht mit Kacheln – einen Tile-Layer – zum Karten-Objekt hinzu_ wird die Karte sichtbar.

> Vielleicht fragen Sie sich, warum ich den Link zur CSS-Datei mithilfe eines selbst-schließenden Tags – also einem _unary_ Tag – geschrieben habe, aber für das Tag, in dem das Skript eingebunden wird, zwei separate Tags – also ein _binary_ Tag – verwendet habe. **`<link`** `rel="stylesheet" href="../leaflet/leaflet.css"`**`/>`**  **`<script`**`src="../leaflet/leaflet.js"`**`></script>`** [HTML unterscheidet](https://de.wikipedia.org/wiki/Hilfe:Tags)[^de.wikipedia.org/wiki/Hilfe:Tags] zwischen Tags, die nie Inhalt enthalten können – nämlich den _void_-Tags –, und solchen, die prinzipiell Inhalt enthalten können. Im ersten Fall muss ein selbst-schließendes _unary_ Tag verwendet werden. Hierzu gehört das `<link>`-Tag. Seit HTML5 kann sogar der abschließende Schrägstrich entfallen - muss aber nicht. Im zweiten Fall darf kein selbst-schließendes _unary_ Tag benutzt werden – auch dann nicht, wenn das Tag tatsächlich leer ist. Hierzu gehört das <script>-Tag.

#### Leaflet performant einbinden – defer oder async

In diesem Kapitel erkläre ich Ihnen, wie Sie Leaflet in Ihre Website einbinden können, ohne den Ladeprozess der Webseite zu unterbrechen. Falls Sie noch unsicher in der Anwendung von JavaScript sind und dieses Kapitel Sie eher verwirrt, dann dürfen sie es überspringen. Das Beachten der Performance können Sie auch erst angehen, wenn Sie die ersten Karten selbst erstellt haben. Lesen Sie in diesem Falle einfach im Kapitel _Erstellen Sie ein Element in dem Ihre Karte angezeigt werden soll_ weiter.

##### Was passiert genau, wenn eine Website geladen wird die im Kopfbereich ein Skript einbindet?

Sehen wir uns zunächst einmal an, was genau passiert, wenn ein Browser eine Website mit einem `<script>`-Tag lädt.

1. Als erstes lädt der Browser den Text der HTML-Seite.
2. Als nächstes beginnt er, den HTML-Code zu analysieren, also zu parsen.
3. Nun trifft der Parser auf das `<script>`-Tag, welches auf eine externe Skript-Datei verweist.
4. Der Browser fordert die Skript-Datei an. Einstweilen blockiert und stoppt der Parser seine Arbeit.
5. Je nach Größe der Datei ist das Skript nach einiger Zeit vollständig heruntergeladen und wird anschließend ausgeführt.
6. Nun endlich kann der Parser seine Arbeit fortsetzten und den Rest des
   HTML-Dokuments analysieren und am Ende im Browser anzeigen.

Wenn Sie sich diese Abfolge ansehen, können Sie sich vorstellen, dass Punkt vier das performante Laden der Website negativ beeinflusst. Der Ladevorgang der Website macht praktisch eine Pause. Solange bis alle Skripte heruntergeladen sind, passiert nichts mehr. Und wenn es eine Sache gibt, die Website-Besucher und Suchmaschinen nicht mögen, dann ist dies die Wartezeit beim Aufbau der Website.

##### Wie können Sie die Ladezeit positiv beeinflussen?

Um das im vorherigen Abschnitt beschriebene Problem zu umgehen wurde früher oft empfohlen, den JavaScript-Code möglichst nah am schließenden `<body>`-Tag in die Website zu integrieren. Zu dieser Empfehlung gibt es mit HTML5 zwei gute Alternativen – nämlich die Attribute [`defer`](https://wiki.selfhtml.org/wiki/HTML/Attribute/defer)[^https://wiki.selfhtml.org/wiki/HTML/Attribute/defer] und [`async`](https://wiki.selfhtml.org/wiki/HTML/Attribute/async)[^wiki.selfhtml.org/wiki/HTML/Attribute/async]. [^https://html.spec.whatwg.org/multipage/scripting.html#attr-script-defer]. 

Sofern Sie das Attribut `defer` verwenden, wird das Skript ausgeführt, wenn das HTML-Dokument geladen und für die Ansicht umgewandelt - also geparst - ist. Zum anderen können Sie das Attribut `async` einsetzten. Mit `async` wird Ihr Skript asynchron mit dem HTML-Dokument ausgeführt. Wenn Sie keines dieser Attribute explizit angegeben, wird erst das vollständige Skript geladen und ausgeführt und erst dann wird das Laden und Parsen des HTML-Dokuments fortgesetzt.

##### Was sollten Sie beim Einsatz von defer oder async mit Leaflet beachten?

Wenn Sie Ihre Karte auf Ihrer Website anzeigen, werden Sie nicht nur das Leaflet-Skript laden. Sie werden später noch eigenen JavaSript-Code schreiben. Dieser eigene Code setzt das Laden des Leaflet-Skripts voraus. Aus diesem Grund müssen Sie sicherstellen, dass die Leaflet Bibliothek vollständig geladen ist, bevor Ihr eigener Code ausgeführt wird. Dies können Sie mithilfe des _Eventhandlers_: `load`. Obwohl Ihr eigenes Skript voraussetzt, dass Leaflet vollständig geladen ist, können Sie das Attribut `async` verwenden. Sehen Sie selbst: Das folgende einfache Beispiel zeigt es Ihnen.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/mymap_99.html-->

<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
    />
  </head>
  <body>
    <div id="map" style="width: 600px; height: 400px"></div>
    <script src="mymap_99.js" async></script>
    <script
      src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"
      async
    ></script>
  </body>
</html>

```

In ihrem eigenen Skript `mymap_99.js` müssen Sie mithilfe von `window.addEventListener('load', function() … )` das Laden des vollständigen HTML-Dokuments abwarte.

```js
// https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/mymap_99.js

window.addEventListener(
  "load",
  function () {
    var map = L.map("map", {
      center: [50.27264, 7.26469],
      zoom: 10,
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
  },
  false
);

```

Alle weiteren Beispiele hier im Buch habe ich ohne das Attribut `async` erstellt, weil ich den Schwerpunkt auf die Verwendung von Leaflet selbst setzen wollte.

### Erstellen Sie ein Element in dem Ihre Karte angezeigt werden soll

Das Einfügen eines HTML-Elements in unser Grundgerüst dürfte für Sie kein Problem darstellen. Der Vollständigkeit halber habe ich diesen Schritt hier trotzdem eingefügt.

Setzen Sie ein `<div>`-Element mit einer bestimmten `ID` an die Stelle in Ihrem HTML-Dokument, an der Sie Ihre Karte anzeigen möchten. Stellen Sie dabei sicher, dass das `<div>`-Element, also der Kartencontainer, eine definierte Höhe hat.

> Der einfachste Weg einem HTML-Element eine feste Höhe zuzuordnen, ist das `style`-Attribut – also direkt im HTML-Element selbst. Weil hier im Buch _Leaflet_ das Hauptthema ist, verwende ich für das Einbinden von Stylesheets in den Beispielen diese einfache Methode. Durch das direkte Festlegen von
> Formaten gehen allerdings im praktischen Einsatz viele Vorteile verloren. Alternative Varianten zum Einbinden von Stylesheets finden Sie unter anderem unter der Adresse [https://wiki.selfhtml.org/wiki/CSS/alternative_Stylesheets](https://wiki.selfhtml.org/index.php?title=CSS/alternative_Stylesheets)[^wiki.selfhtml.org/wiki/HTML/Attribute/async].

Im nachfolgenden Programmcodeausschnitt sehen Sie die relevante Zeile `<div style="height: 180px;" id="mapid"></div>`.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_997.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 180px" id="mapid"></div>
  </body>
</html>

```

So, nun ist das HTML-Dokument bereit ein Leaflet Kartenobjekt zu initialisieren und interessante Dinge mit ihm anzustellen.

### Erstellen Sie das Karten-Objekt

Nun wird es spannend. Wir erstellen das Skript das die Karte anzeigen wird. Dabei beginnen wir mit dem Erstellen des Karten-Objektes. Im nachfolgenden Programmcodeausschnitt sehen Sie die erste Zeile des Skripts.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_996.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 180px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
    </script>
  </body>
</html>

```

Was haben wir genau gemacht? Wir haben mit dem Befehl `var mymap = L.map('mapid')` ein neues Objekt – oder eine neue Instanz – der Klasse `map` erstellt und dieser den Namen `mymap` gegeben.

> Sie frage sich nun vielleicht, wie wir eine neue Instanz ohne die Verwendung des Schlüsselwortes `new` erstellen konnten? Die Antwort ist einfach: Die Leaflet-Klassen sind mit einem Großbuchstaben – beispielsweise `L.Map` – benannt und diese müssen mit `new` erstellt werden. Es gibt aber Shortcuts mit Kleinbuchstaben – `L.map` – die aus Bequemlichkeitsgründen von den Leaflet-Programmierern für Sie erstellt wurden. Leaflet setzt hier das Entwurfsmuster [Fabrikmethode](https://de.wikipedia.org/w/index.php?title=Fabrikmethode)[^de.wikipedia.org/w/index.php?title=Fabrikmethode] ein. Das Muster beschreibt, wie ein Objekt durch Aufruf einer Methode anstatt durch direkten Aufruf eines Konstruktors erzeugt wird. Wollen Sie sich dies selbst ansehen? Die [Funktion `L.map()`](https://github.com/Leaflet/Leaflet/blob/7ed780cd35474f2acf0f17e7394807ff0973a031/src/map/Map.js#L1708)[^github.com/Leaflet/Leaflet/blob/7ed780cd35474f2acf0f17e7394807ff0973a031/src/map/Map.js#L1708] der Klasse `L.Map` finden Sie auf Github ganz am Ende in der Datei `map.js`. Ein weiteres Beispiel finden Sie zu Beginn des Kapitels _Custom Markers_.

Das Festlegen des Kartenmittelpunktes mithilfe der Koordinaten `[50.27264, 7.26469]` und der Methode `setView()` und die Angabe der Zoomstufe 13 ist optional. Ich empfehle Ihnen, diese Werte immer mitzugeben. Denn: Es ist für jeden ärgerlich eine Karte zu sehen, die die ganze Welt anzeigt – die relevanten Daten befinden sich aber alle in Gering, einem kleinen Dorf in der deutschen Eifel. Man muss somit erst einmal mehrmals auf die Schaltflächen zum Zoomen klicken.

> Sagen Ihnen die _Koordinaten_ in der Form [50.27264, 7.26469] nichts und möchten Sie gerne mehr zum Thema geografische Koordinaten erfahren? Dann lesen den Exkurs
> im Kapitel _Exkurs: Geographische Koordinaten_.

Sie verfügen nun über ein Leaflet Karten-Objekt, mit dem Sie eine Karte anzeigen können. Sie müssen dem _Karten-Objekt_ noch mitteilen, welches _Kartenbild_ - also welche Grafiken - es anzeigen soll. Dies tun Sie, indem Sie eine Schicht mit Kacheln, also einen _Tile-Layer_, zum Karten-Objekt hinzufügen. Wie Sie dies genau tun, zeige ich Ihnen im nächsten Kapitel.

### Fügen Sie eine Schicht mit Kacheln – einen Tile-Layer – zum Karten-Objekt hinzu

Der letzte Schritt beim Erstellen der Karte ist das Hinzufügen der Kachel-Schicht. Diese Schicht – oder dieser Layer – kann als eine Art Basiskarte angesehen werden.
Es handelt sich um die Grafiken, auf der die Geoobjekte, die wir hier im Buch erarbeiten, dargestellt werden. Also die Imagedateien.

Kacheln zum Anzeigen in einem digitalen Kartenobjekt werden als Service von unterschiedlichen Providern angeboten. Im nächsten Kapitel werde ich Ihnen genauer erläutert,
dass diese Kacheln normalerweise als 256 Pixel x 256 Pixel Images angeboten werden und warum die URL zum Aufruf der Kacheln die etwas kryptisch wirkenden Zeichen `/{z}/{x}/{y}.png` enthält.

Ich verwende hier das Angebot von http://www.openstreetmap.org zur Darstellung der Karte. Den Programmcode zum Einbinden der Imagedateien vom OpenStreetMap Tile-Server habe ich im nachfolgenden Programmcodebeispiel eingefügt. Es ist die Zeile `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);`. Die rechtlichen Voraussetzungen zur Verwendung der Kacheln des Openstreetmap-Servers finden Sie unter der Adresse `https://operations.osmfoundation.org/policies/tiles`.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_995.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 180px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(mymap);
    </script>
  </body>
</html>

```

Was haben wir genau gemacht? Wir haben ein `TileLayer`-Objekt erstellt und diesem die URL des OpenStreetMap-Servers übergeben. Außerdem haben wir die Methode `addTo()` aufgerufen und dieser Methode unser Karten-Objekt `mymap` als Parameter übergeben. So weiß Leaflet nun genau, welche Bilder es wo abrufen soll und kann die Kartenschicht zeichnen.

> Ich hatte es eben schon erwähnt: Leaflet ist so programmiert, dass Sie die verschiedenen Methoden verketten können. Dies ist möglich, weil die unterschiedlichen Methoden Objekte zurückgeben, die wieder Funktionen enthalten. Leaflet setzt das Entwurfsmuster [Fabrikmethode](https://de.wikipedia.org/w/index.php?title=Fabrikmethode)[^de.wikipedia.org/w/index.php?title=Fabrikmethode] ein. So konnten wir `.addTo(mymap)` einfach an `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')` anhängen. Alternativ hätten wir zuerst ein TileLayer Objekt erstellen müssen und hätten erst im nächsten Schritt die Methode `addTo()` aufrufen können.

```js
var x = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
x.addTo(mymap);
```

Fertig! Sie haben nun eine vollständige Karte erstellt. Zählen Sie nach: In diesen vier Schritten haben Sie gerade einmal fünf Zeilen Programmcode eingegeben.

Standardmäßig sind alle Maus- und Touch-Interaktionen auf der Karte aktiviert. Probieren Sie es aus – wir haben ja bisher noch keine Optionen übergeben – alles ist Standard. Sie können die Karte vergrößern und verkleinern und in der rechten unteren Ecke befindet sich ein Hinweis darauf, dass die Karte mit Leaflet erstellt wurde. Sie können nun die ganze Welt auf dieser Karte erkunden. In der nachfolgenden Abbildung sehen Sie diese Karte – so sollte diese bei Ihnen aussehen, wenn Sie meinem Beispiel gefolgt sind.

![Ein Screenshot der eine Landkarte mit Leaflet anzeigt.](/images/997.png)

Bevor wir die Karte nun weiter bearbeiten, sehen wir uns ein bisschen Theorie an. Falls Sie keine Theorie mögen, können sie sofort praktisch im Kapitel _Die Karte mit Daten bestücken_ weitermachen.

## Exkurs: Geographische Koordinaten

Mithilfe von Längen und Breitengraden können Sie die genaue Position eines jedes Punktes auf der Erdoberfläche angeben.

### Das Koordinatensystem der Erde

Das Grad-Netz der Erde ist ein gedachtes Koordinatensystem auf der Erdoberfläche mit sich rechtwinklig schneidenden Längen- und Breitenkreisen. Zum Aufbau dieses Koordinatensystems wird unser Erdball zunächst in 180 Breitenkreise und 360 Längenkreise eingeteilt.

- Die [Breitengrade](https://de.wikipedia.org/w/index.php?title=Geographische_Breite)[^de.wikipedia.org/w/index.php?title=Geographische_Breite] oder Breitenkreise verlaufen parallel zum Äquator.
- Die [Längengrade](https://de.wikipedia.org/w/index.php?title=Geographische_L%C3%A4nge)[^de.wikipedia.org/w/index.php?title=Geographische_L%C3%A4nge] oder Längenkreise verbinden Nord- und Südpol.

So entsteht ein [grobmaschiges Gitter](https://de.wikipedia.org/w/index.php?title=Geographische_Koordinaten)[^de.wikipedia.org/w/index.php?title=Geographische_Koordinaten], anhand dessen jeder die ungefähre Position auf der Erdoberfläche bestimmen kann.

![Das Gradnetz der Erde - By CIA, Niteowlneils (Public domain), via Wikimedia Commons](/images/964er.png)

Um die Genauigkeit zu erhöhen, wird jeder Breiten- und Längengrad weiter unterteilt.

#### Breitengrade

Die [Breitengrade](https://de.wikipedia.org/w/index.php?title=Geographische_Breite) verlaufen von Osten nach Westen. Vielleicht wissen Sie noch aus dem Erdkundeunterricht in der Schule, dass der Äquator im rechten Winkel zur Erdachse verläuft. Er liegt etwa in der Mitte zwischen Nord- und Südpol. Im geografischen Koordinatensystem gilt er als Ausgangspunkt für die Berechnung der Breitenkreise und ihm wird ein Winkel von 0° zugeordnet.

![Breitengrade (Latitude) - By Pearson Scott Foresman (Public domain), via Wikimedia Commons](/images/964br.png)

#### Längengrade

Die [Längengrade](https://de.wikipedia.org/w/index.php?title=Geographische_L%C3%A4nge)[^de.wikipedia.org/w/index.php?title=Geographische_L%C3%A4nge]
auf der Erde verlaufen von Norden nach Süden. Sie umspannen die Erde praktisch. Eine Längenkreishälfte wird als Meridian bezeichnet. Die Längenkreise haben keinen natürlichen Nullpunkt. Heute gilt der Meridan, der den Londoner Stadtteil Greenwich durchläuft, als Nullmeridian und somit als Ausgangspunkt für die Berechnung der Längengrade.

![Längengrade (Longitude) - By Pearson Scott Foresman (Public domain), via Wikimedia Commons](/images/964la.png)

### Schreibweisen von geografischen Koordinaten

Bei der Angabe von geographischen Koordinaten wird heute normalerweise eine von zwei Schreibweisen verwendet: Entweder das [Sexagesimalsystem](https://de.wikipedia.org/w/index.php?title=Sexagesimalsystem)[^de.wikipedia.org/w/index.php?title=Sexagesimalsystem], welches von Wikipedia verwendet wird, oder die Dezimalschreibweise, die von Computerprogrammen bevorzugt wird. Im Laufe unserer Geschichte haben sich allerdings eine Menge mehr unterschiedlicher Systeme entwickelt.

> Falls Sie einmal in die Verlegenheit kommen sollten und eine Koordinate von einem System in ein anderes umrechnen müssen, kann ich Ihnen die Website [https://www.deine-berge.de/Rechner/Koordinaten/Dezimal/51,10](https://www.deine-berge.de/Rechner/Koordinaten/Dezimal/51,10)[^16] empfehlen, weil diese das Umrechnen zwischen vielen verschiedenen Systemen unterstützt.

#### Das Sexagesimalsystem

Das [Sexagesimalsystem](https://de.wikipedia.org/w/index.php?title=Sexagesimalsystem)[^de.wikipedia.org/w/index.php?title=Sexagesimalsystem] ist die traditionelle Schreibweise. Dieses System heißt Sexagesimal, weil ein Grad eines Breitengrades 60 Minuten entspricht. Somit basiert das Sexagesimalsystem auf der Zahl 60. Und der lateinische Name der Zahl 60 ist _'sexagesimus'_.

Jeder Breiten- und Längengrad wird in 60 Minuten mit je 60 Sekunden unterteilt. Eine Koordinate besteht somit aus drei Teilen.

- Der erste Teil gibt die Längen- und Breitengrade als Winkel in Grad (°) an. Die Angabe ist ganzzahlig und liegt beim Längengrad zwischen -180 und +180 und beim Breitengrad zwischen -90 und +90. Dabei steht beim Breitengrad `-`90° für die Angabe 90° `Süd` und  `+`90° für die Angabe 90° `Nord`. Die Breite wird entsprechend in `-`180° bis `+`180° angegeben, anstelle von 180° `West` bis 180° `Ost`.
- Der zweite Teil gibt die Minuten an. Die Minuten werden durch eine Prime (′) gekennzeichnet. Jeder Grad hat 60 Minuten. Das bedeutet, dass diese Zahl nicht kleiner als 0 sein darf und kleiner als 60 sein muss. 
- Der dritte Teil gibt die Sekunden an. Jede Minute hat 60 Sekunden, die anhand einer Doppelprime (″) erkennbar sind. Genau wie bei den Minuten gilt also auch hier: Die Sekundenzahl darf nicht kleiner als 0 sein und muss kleiner als 60 sein.

Eine Breitenminute entspricht auf der Erdoberfläche einer Strecke von circa 1,852 Kilometern. Die Strecke, die einer Längenminute entspricht, beträgt am Äquator ebenfalls 1,852 Kilometer, verringert sich aber zum Pol hin auf 0 Kilometer. Bei der Positionsangabe eines Ortes, also der Angabe der geographischen Koordinaten, nennt man zuerst die Breite und dann die Länge. So liegt Koblenz bei 50° N (nördliche Breite) und 7° O (östliche Länge).

So hat beispielsweise die Zugspitze die Koordinaten `47°25′16″, 10°59′7″`. Einem Ort, der auf dem westlichen Teil der Südhalbkugel liegt, könnten die Koordinaten `-11°27′30″, -72°47′23″` zugeordnet werden.

#### Die Dezimalschreibweise

Parallel zum traditionell gebräuchlichen Sexagesimalsystem hat sich die Angabe der Koordinaten im Dezimalsystem etabliert. Das Dezimalsystem basiert auf der Zahl 10. Dieses System wird vor allem deshalb von Computern gerne benutzt, weil es sich damit recht unkompliziert rechnen lässt.

Die Genauigkeit einer Koordinate in der Dezimalschreibweise hängt sehr von der Anzahl der Nachkommastellen ab. Bei nur zwei Nachkommastellen ergibt sich eine mögliche Abweichung von bis zu einem Kilometer, bei vier Stellen nach dem Komma sind es nur noch zehn Meter Abweichung und sechs Nachkommastellen entsprechen einer Genauigkeit von einem Meter.

Orten auf der West- und Südhalbkugel wird in der Regel ein Minus (-) vorangestellt. Die Breite wird in Dezimalgrad von -90° bis +90° angegeben. Dabei steht `-`90° für die Angabe 90° `Süd` und `+`90° für die Angabe 90° `Nord`. Die Breite wird entsprechend in `-`180° bis `+`180° angegeben, anstelle von 180° `West` bis 180° `Ost`. Beispielsweise werden im Dezimalsystem die Koordinaten der Zugspitze mit `47.4211, 10.9852` angegeben. Einem Ort, der auf dem westlichen Teil der Südhalbkugel liegt, könnten die Koordinaten `-13.163333, -72.545556` zugeordnet werden.

## Exkurs: Wie werden Landkarten auf einer Website angezeigt?

Eine Karte ist im Grunde genommen nichts anderes als die Darstellung einer [Abbildung](https://de.wikipedia.org/w/index.php?title=Abbild)[^de.wikipedia.org/w/index.php?title=Abbild] oder [Grafik](https://de.wikipedia.org/w/index.php?title=Grafik)[^de.wikipedia.org/w/index.php?title=Grafik]. Abbildungen oder Grafiken müssen, damit sie von Computern verarbeitet werden können, in einem [Grafikformat](https://de.wikipedia.org/w/index.php?title=Grafikformat)[^de.wikipedia.org/w/index.php?title=Grafikformat] gespeichert werden. Bevor wir uns genau ansehen, wie die Grafiken für Landkarten erstellt werden, erkläre ich Ihnen nachfolgend kurz die wesentlichen Unterschiede dieser beiden Formate.

### Grafikformate: Vektoren und Rastergrafiken

Ein Grafikformat ist ein Dateiformat, das den Aufbau einer Bilddatei beschreibt. Bei den Grafikformaten können Sie alles in allem zwischen [Vektorgrafiken](https://de.wikipedia.org/w/index.php?title=Vektorgrafik)[^de.wikipedia.org/w/index.php?title=Vektorgrafik] und [Rastergrafiken](https://de.wikipedia.org/w/index.php?title=Rastergrafik)[^de.wikipedia.org/w/index.php?title=Rastergrafik] unterscheiden. Im nächsten Bild sehen Sie oben eine Vektorgrafik und unten eine Rastergrafik.

![Vektorgrafik und Rastergrafik](/images/930.png)

#### Vektoren

[Vektorgrafiken](https://de.wikipedia.org/w/index.php?title=Vektorgrafik)[^de.wikipedia.org/w/index.php?title=Vektorgrafik] basieren, im Gegensatz zu Rastergrafiken, nicht auf einem Pixelraster, indem jedem Bildpunkt ein Farbwert zugeordnet ist. Vektorgrafiken basieren auf einer Formel, die die Elemente, aus denen das Bild aufgebaut ist, genau beschreibt. Ein Kreis kann in einer Vektorgrafik anhand des Mittelpunktes, des Radiuses, der Linienstärke und der Farbe vollständig beschrieben werden. Deshalb müssen auch nur diese Parameter gespeichert werden. Je nach Bildgröße benötigen Vektorgrafiken daher oft weniger Speicherplatzbedarf als Rastergrafiken. Außerdem können sie im Gegensatz zur Rastergrafik stufenlos und verlustfrei skaliert, also vergrößert oder verkleinert werden.

#### Rastergrafiken

[Rastergrafiken](https://de.wikipedia.org/w/index.php?title=Rastergrafik)[^de.wikipedia.org/w/index.php?title=Rastergrafik] kennen Sie sicherlich auch unter dem Namen Pixelgrafik oder Bitmap. Dieses Format beschreibt die Bilder in Form einer Anordnung von Pixeln als Raster. Pixel sind im Grunde genommen nichts anderes als Bildpunkten, denen eine Farbe zugeordnet ist. Anders als bei Vektorgrafiken ist die Bildgröße – die Breite und Höhe gemessen in Pixeln – und die Farbtiefe – die maximale Anzahl an Farben – ein wesentliches Merkmal des Bildes. Eine Rastergrafik kann nicht stufenlos und verlustfrei vergrößert werden.

### Vektoren und Rastergrafiken für digitale Karten

Karten sollen intuitiv und einfach bedienbar sein. Idealerweise ist jeder Ausschnitt der Karte in jeder Auflösung schnell abrufbar.

Theoretisch ist dies für Vektorkarten möglich. Praktisch kostet es aber sehr viel Rechenzeit. Abgesehen von Satellitenaufnahmen oder Luftbildern, die nichts anderes als ein Foto sind, sind Karten in der Regel keine Rastergrafiken. Die Informationen anhand derer die Karte erstellt wird, werden als Daten gespeichert. Diese Daten entsprechen eher den Daten, mit denen Vektorgrafiken erstellt werden. Eine Straße wird beispielsweise mithilfe einer Anzahl von Punkten, die miteinander verbunden sind, dargestellt. Zusätzlich werden mit diesen Punkten Eigenschaften abgespeichert. Eine Eigenschaft kann der Straßenname sein – eine andere Eigenschaft kann der Straßenbelag sein.

Leider ist die Darstellung dieser Informationen auf einer Webseite in einem Vektorformat aber schwierig. Nicht alle Browser können gut mit Vektorgrafiken umgehen. Außerdem gibt es viele Geodaten, die große Bereiche auf der Erde abdecken. Diese müssen bei der Verwendung eines Vektorformates auch dann verarbeitet werden, wenn Sie sich nur einen kleinen Bereich in Deutschland ansehen möchten. Mit Rastergrafiken hat kein Browser Probleme. So ziemlich jeder Browser kann eine Rasterkarte anstandslos auf einem Bildschirm anzeigen.

Das Problem bei der Bereitstellung von geographischen Informationen als Rastergrafik ist, dass eine gute Bildqualität eine hohe Auflösung voraussetzt. Dies hat zur Folge, das die Grafikdateien sehr groß werden. Bilddateien, die über das Internet geladen und im Browser angezeigt werden, sollten aber so klein wie möglich sein.

Aus diesem Grund wird die Karte für kleine Ausschnitte im Vorfeld berechnet und in einem Rasterformat gespeichert. Als Rasterformat wird [PNG](https://de.wikipedia.org/w/index.php?title=Portable_Network_Graphics)[^de.wikipedia.org/w/index.php?title=Portable_Network_Graphics] verwendet. Wie dies genau gemacht wird, erkläre ich Ihnen im nächsten Kapitel.

### Wir unterteilen die Welt in Kacheln

Um eine Karte anzuzeigen, wird die Welt also in Ausschnitte, genau genommen in Quadrate zerlegt. Die Quadrate werden _'Tiles'_, das ist das englische Wort für _'Kacheln'_, genannt. Jedes Quadrat ist exakt 256 Pixel x 256 Pixel groß.

> Nicht nur OpenStreetMap, auch die Google Maps API unterteilt ihr Kartenbilder in Kacheln. Wenn Sie die Website https://www.google.de/maps aufrufen und eine andere Vergrößerungsstufe wählen, wird ermittelt, welche Daten erforderlich sind. Diese Daten werden dann in einen Satz mit Kacheln übersetzt und angezeigt. Dabei bildet die Zoom-Stufe 0 die ganze Welt auf ein Quadrat ab. Teilt man den Erdumfang von 40.038 Kilometern durch die 256 Pixel der Kachel sieht man im Ergebnis, dass ein Pixel 156,4 Kilometer darstellt. Das ist noch nicht sehr detailliert. Bis Zoom-Stufe 19 ändert sich eine ganze Menge. In der nachfolgenden Tabelle sehen Sie, dass bei Zoom-Stufe 19 ein Pixel einem Bereich von 0,3 Metern auf der Erde entspricht. Damit kann man schon etwas anfangen!

| Zoom-Stufe | Kachel-Anzahl  | Kachel-Breite entpricht | Ein Pixel entspricht |
| ---------- | -------------- | ----------------------- | -------------------- |
| 0          | 1              | 40.038 Kilometer        | 156 Kilometer        |
| 1          | 4              | 20.019 Kilometer        | 78 Kilometer         |
| 2          | 16             | 10.009 Kilometer        | 39 Kilometer         |
| 3          | 64             | 5.004 Kilometer         | 19,5 Kilometer       |
| 4          | 256            | 2.502 Kilometer         | 9,8 Kilometer        |
| …        | …            | …..                   | ….                 |
| 15         | 1 Milliarden   | 1.224 Meter             | 4,8 Meter            |
| 16         | 4 Milliarden   | 612 Meter               | 2,4 Meter            |
| 17         | 17 Milliarden  | 306 Meter               | 1,2 Meter            |
| 18         | 68 Milliarden  | 306 Meter               | 0,6 Meter            |
| 19         | 275 Milliarden | 76 Meter                | 0,3 Meter            |

Die vollständige Tabelle können Sie unter der Adresse [http://wiki.openstreetmap.org/wiki/Zoom_levels](https://wiki.openstreetmap.org/w/index.php?title=Zoom_levels)[^https://wiki.openstreetmap.org/w/index.php?title=Zoom_levels] mit weiteren Angaben im Internet abrufen.

> Vielleicht probieren Sie nun das Zoomen im vorangegangene Beispiel aus und wundern sich, dass Sie die Karte nur bis zur Zoom-Stufe 18 vergrößern können. Das liegt daran, dass bei dieser OpenStreeMap Karte standardmäßig die Option `maxZoom` mit 18 gesetzt ist. Sie können diese Option jedoch überschreiben. Wie das geht sehen Sie im nachfolgenden Programmcodebeispiel. Weitere Informationen finden Sie im Kapitel zur Karte von _Stamen_.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_995a.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 180px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        minZoom: 0,
        maxZoom: 19,
      }).addTo(mymap);
    </script>
  </body>
</html>

```

> Vielleicht sind Sie es gewohnt, bei der Darstellung von Landkarten in den Zahlen eines Maßstabs zu denken? Bei digitalen Karten gibt es keinen Maßstab im Sinne einer Papierkarte, weil die Druckauflösung nicht bekannt ist und ein Maßstab hiervon abhängt. Ein Maßstab kann immer nur relativ zur Auflösung angegeben werden.

### Wie weiß Leaflet welche der vielen Kacheln angezeigt werden sollen?

Nun haben wir jede Menge Kacheln und möchten mit diesen eine digitale Karte auf unserer Website anzeigen. Woher weiß Leaflet, welche Kacheln, also welche Bilddatei, es vom verlinkten Server laden und an welcher Stelle es diese anzeigen soll? Dazu sehen wir uns zunächst einmal an, wie die Kacheln genau erstellt werden.

Um ein Bild von einer Karte in kleine überschaubare Abschnitte zu teilen, unterscheidet der Server, der die Kacheln erzeugt, zwischen verschiedenen Zoom-Stufen und für jede Zoom-Stufe erstellt er ein eigenes Set von Kacheln – praktisch eine eigene Ebene. Da der Standard für die Größe der Kacheln 256 Pixel x 256 Pixel beträgt, ist bei der Zoom-Stufe 0 die gesamte Welt in einer einzigen 256 Pixel x 256 Pixel großen Kachel enthalten. In der Tabelle im vorherigen Kapitel konnten Sie ja schon erkennen, dass jede Erhöhung der Zoom-Stufe auch die Anzahl der anzuzeigenden Kacheln erhöht.

Um die Kacheln in der richtigen Weise zu benutzen, muss es ein Muster geben, das befolgt werden kann, um sicherzustellen, dass die richtigen Kacheln vom Server geladen werden und vom Browser des Clients an der richtigen Stelle angezeigt werden.

Im Kapitel _Fügen Sie eine Schicht mit Kacheln – einen Tile-Layer – zum Karten-Objekt hinzu_ hatten wir die URL für den Tile Server mit `http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` angegeben.

Der Teil `{z}/{x}/{y}` des Pfades zur PNG-Datei enthält Variablen aus denen der Namen der Bilddatei berechnet werden kann.

- `{z}` bezeichnet die zu ladende Zoom-Stufe.
- `{x}` bezeichnet die Position auf der x-Achse der Kachel.
- `{y}` bezeichnet die Position auf der y-Achse.
- `{s}` steht für eine optionale Subdomain.

Zum Beispiel wird das Bild für die niedrigste Zoom-Stufe – also das Bild welches den größten Bereich pro Pixel anzeigt – unter dem Dateinamen `0/0/0.png` abgespeichert.

![Das Bild für die niedrigste Zoom-Stufe `0/0/0.png`.](/images/998.png)

Die vollständige URL dieses Kachelbildes auf dem Openstreetmap Server ist `http://a.tile.openstreetmap.org/0/0/0.png`. Probieren Sie es, klicken Sie den Link an oder öffnen Sie selbst die Adresse http://a.tile.openstreetmap.org/0/0/0.png in Ihrem Internetbrowser.

> Tiefergehend können Sie das Thema auf der Website von OpenStreetMap, genau unter der Adresse [http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames](https://wiki.openstreetmap.org/w/index.php?title=Slippy_map_tilenames)[^wiki.openstreetmap.org/w/index.php?title=Slippy_map_tilenames], nachlesen. 

Bei der Zoom-Stufe 1 sind die Kacheln so angeordnet, wie in der nachfolgenden Grafik dargestellt.

![Ein Bild mit allen Kacheln für die zweitniedrigste Zoom-Stufe.](/images/998a.png)

Unter der Adresse [http://a.tile.openstreetmap.org/1/0/0.png](http://a.tile.openstreetmap.org/1/0/0.png) finden sie die Grafik, die sich in der Abbildung links oben befindet.

## Schöne Kartenlayer

Nachdem das Erstellen der ersten Karte so einfach vonstatten ging fragen Sie sich sicher, ob es genauso einfach ist eine alternative Darstellung – also Kacheln eines anderen Providers – zu verwenden. Die Antwort ist: Ja, meist ist es ist genauso einfach!

Ich zeige Ihnen dies hier anhand von zwei weiteren Providern, nämlich [thunderforest.com](https://www.thunderforest.com) und [stamen.com](https://stamen.com). Im Kapitel _ESRI - Environmental Systems Research Institute_ finden Sie weitere Beispiele.

> Mögen Sie die Karten von [GoogleMaps](https://www.google.com/maps)[^google.com/maps] und möchten Sie gerne die Kacheln von Google für Ihre digitale Karte nutzen? Wenn Sie dies zusammen mit Leaflet tun möchten, können Sie dies mithifle des Plugins [L.GridLayer.GoogleMutant](https://gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant)[^gitlab.com/IvanSanchez/Leaflet.GridLayer.GoogleMutant].

### Thunderforest

Thunderforest bietet Ihnen gleich neun verschiedene Kachel-Varianten. Sie erreichen die Kacheln alle über die gleiche URL, lediglich das Unterverzeichnis muss angepasst werden.

> Um Kacheln von Thunderforest zu verwenden, müssen Sie ein Zugriffstoken anfordern. Dieses Token können Sie über die Adresse [thunderforest.com/docs/apikeys](https://www.thunderforest.com/docs/apikeys) selbst erstellen. Wenn Sie ihre Karte erstellen, hängen Sie dieses Zugriffstoken einfach an das Ende der URL des Tile-Servers an. Zum Beispiel so: `https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YourApiKey`

Die Kacheln der OpenCyclemap finden Sie beispielsweise unter der Adresse

`https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=YourApiKey`

abgelegt. Die Transportvariante finden Sie unter der Adresse

`https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YourApiKey.`

---

Nachfolgende Übersicht zeigt Ihnen die verschiedenen Kartenstile von Thunderforest.

![pioneer](/images/997pioneer.png)

---

![cycle](/images/997cycle.png)

---

![transport](/images/997transport.png)

---

![outdoors](/images/997outdoors.png)

---

![transport-dark](/images/997transportdark.png)

---

![mobile-atlas](/images/997mobileatlas.png)

---

![neigborhood](/images/997neigborhood.png)

---

Wenn Sie Thunderforest verwenden möchten, müssen Sie unser bisheriges Beispiel nun in einer Zeile abändern. Sie müssen als Tile Layer nur die im Beispiel zu sehende URL angeben. Der nachfolgende Programmcode zeigt Ihnen ein vollständiges Beispiel.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_994.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
      L.tileLayer(
        "https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=8db5bf38e3d841b6a57a7201f78cfbec"
      ).addTo(mymap);
    </script>
  </body>
</html>

```

### Stamen

Stamen legt den Schwerpunkt auf gutes Design. Informationen zu den Karten von Stamen finden Sie auf der Website [http://maps.stamen.com](http://maps.stamen.com). Die Übersicht zeigt Ihnen drei Kartenstile von Stamen.

![watercolor](/images/996watercolor.png)

---

![toner](/images/996toner.png)

---

![terraint](/images/996terrant.png)

---

Beim Einbinden einer Karte von Stamen müssen Sie zusätzlich eine JavaScript Datei verlinken. Wie Sie den `StamenTileLayer` genau nutzen, können Sie im nachfolgenden Programmcodebeispiel ablesen.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_993.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script
      type="text/javascript"
      src="http://maps.stamen.com/js/tile.stamen.js"
    ></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
      var layer = new L.StamenTileLayer("watercolor");
      mymap.addLayer(layer);
    </script>
  </body>
</html>

```

> _Achtung:_ Der `StamenTileLayer` unterstützt nicht alle Zoom-Stufen. Wenn Sie den Typ `watercolor` verwenden, sehen Sie zum Beispiel mit der Zoom-Stufe 19 eine leere graue Fläche. Um dies zu verhindern können Sie die Optionen des `StamenTileLayer` überschreiben.

- Setzten Sie dafür nach der Instanziierung die Options `maxZoom` auf 19. So bleibt die Zoom-Stufe 19 als Ebene auf der Karte erhalten.
- Setzen Sie dann aber die Option `maxNativeZoom` auf 18. Dies bewirkt, dass Leaflet nicht versucht, Kachel für eine Zoom-Stufe 19 zu laden. Stattdessen benutze Leaflet auch bei Zoom-Stufe 19 die Kacheln der Zoom-Stufe 18 – skaliert diese aber auf die Größe der Zoom-Stufe 19.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_993a.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script
      type="text/javascript"
      src="http://maps.stamen.com/js/tile.stamen.js"
    ></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 13);
      var layer = new L.StamenTileLayer("watercolor");
      layer.options.maxZoom = 19;
      layer.options.maxNativeZoom = 18;
      mymap.addLayer(layer);
    </script>
  </body>
</html>

```

ESRI ist ein weiterer Anbieter von Basiskarten. Was ESRI genau ist und wie Sie die Karten dieses Institius einbinden können erkläre ich Ihnen im Kapitel zu _ESRI_.

> Haben Sie noch nicht den Kartenstil gefunden, den Sie suchen oder sind Sie einfach nur neugierig, welche Karten sonst noch angeboten werden? Verweise auf weitere Tile-Server-Provider finden Sie unter der Adresse: [http://wiki.openstreetmap.org/wiki/Tiles](https://wiki.openstreetmap.org/w/index.php?title=Tiles)[^wiki.openstreetmap.org/w/index.php?title=Tiles].

## Images als Layer – Web-Map-Service

Sie haben eine gute Satellitenaufnahme und möchten diese als Schicht in Ihrer Karte anzeigen. Vielleicht denken Sie auch an die Wetterwarnkarten des Deutschen Wetterdienstes, die im Grunde genommen nur aus eingefärbten Polygonen bestehen. Ein Umwandeln dieser Grafikdateien in 275 Milliarden Kacheln, wie es im vorherigen Kapitel beschriebenen wurde, wäre zwar möglich – Sie können sich aber vorstellen, dass es für diese Aufgabenstellungen adäquatere Techniken gibt.

### Eine einfache Leaflet-Karte mithilfe des Web-Map-Services erstellen

Eine Alternative zur schon beschriebenen Kachel-Technik ist der Web-Map-Service (WMS)](https://de.wikipedia.org/w/index.php?title=Web_Map_Service)[^de.wikipedia.org/w/index.php?title=Web_Map_Service]. Der WMS ist ein Spezialfall eines [Web Services](https://de.wikipedia.org/w/index.php?title=Webservice)[^de.wikipedia.org/w/index.php?title=Webservice]. Dieser Service bietet Ihnen eine Schnittstelle zum Abrufen von Landkartenausschnitten über das Internet.

Todo und Vectortechnik

Ein WMS bietet drei Funktionen, die von einem Benutzer angefragt werden können. Die Funktionen `GetCapabilities` und `GetFeatureInfo` vernachlässigen wir hier. Diese sind für die Anzeige der Karte nicht relevant. Die Funktion `GetMap` ist die, die wir uns genauer ansehen und die von Leaflet angewendet wird. Bei einem Aufruf von `GetMap` liefert der WMS ein [georeferenziertes](https://de.wikipedia.org/w/index.php?title=Georeferenzierung)[^de.wikipedia.org/w/index.php?title=Georeferenzierung] Rasterbild.

> Bei einem [georeferenzierten](https://de.wikipedia.org/w/index.php?title=Georeferenzierung) Rasterbild handelt es sich um eine Bilddatei, der raumbezogene Informationen hinzugefügt wurden. Das hört sich zunächst einmal sehr theoretisch an. Praktisch können Sie sich den Vorgang der Georeferenzierung so veranschaulichen: Stellen Sie sich vor, dass das Bild auf einen Bereich auf der Erde gelegt wird. Gleichzeitig wird das Gradnetz der Erde dieses Bereichs mit dem Bild verbunden. Im Ergebnis wird also jedem Pixel des Bildes eine Koordinate – in Relation zum Gradnetz der Erde – zugewiesen. Georeferenzierung kennen Sie vielleicht auch unter dem Begriff Geokodierung, Geotagging oder Verortung.

Innerhalb des `GetMap` Aufrufs können Sie Optionen auswählen. Zum Beispiel können Sie angeben,

- welches Koordinatensystem zugrundelegt werden soll,
- welchen Kartenausschnitt Sie sehen möchten,
- wie groß der Kartenausschnitt sein soll oder
- welches Ausgabeformat Sie gerne hätten.

Mit folgendem URL-Abruf erhalten Sie beispielsweise ein speziell zusammengestelltes Bild vom GeoWebservice des [Deutschen Wetterdienstes](http://www.dwd.de/)[^dwd.de]: [`https://maps.dwd.de/geoserver/dwd/ows ?service=WMS&version=1.3 &request=GetMap &layers=dwd:Warnungen_Landkreise &bbox=6.15,51.76,14.90,55.01 &width=512&height=418 &srs=EPSG:4326 &format=image/jpeg &CQL_FILTER=EC_II%20IN%20(%2751%27,%2752%27)`](https://maps.dwd.de/geoserver/dwd/ows?service=WMS&version=1.3&request=GetMap&layers=dwd:Warnungen_Landkreise&bbox=6.15,51.76,14.90,55.01&width=512&height=418&srs=EPSG:4326&format=image/jpeg&CQL_FILTER=EC_II%20IN%20(%2751%27,%2752%27)).

`https://maps.dwd.de/geoserver/dwd/ows?service=WMS&version=1.3`  
`&request=GetMap`  
`&layers=dwd:Warnungen_Landkreise`  
`&bbox=6.15,51.76,14.90,55.01`  
`&width=512`  
`&height=418`  
`&srs=EPSG:4326`  
`&format=image%2Fjpeg`  
`&CQL_FILTER=EC_II%20IN%20('51','52')`

Probieren Sie es aus: Der Aufruf der URL im Browser produziert eine Karte mit allen momentan ausgegebenen gültigen Windwarnungen der Kategorie 51 (Windböen) und 52 (Sturmböen) für Norddeutschland. Ausgegeben im JPG-Format. Sie sehen allerdings nur dann ein Bild, wenn tatsächlich Wetterwarnungen vorhanden sind.

> Eine Anleitung zur Nutzung des GeoWebservices des Deutschen Wetterdienstes finden Sie unter der Adresse [https://www.dwd.de/DE/wetter/warnungen_aktuell/objekt_einbindung/einbindung_karten_geowebservice.pdf?\_\_blob=publicationFile&v=11](https://www.dwd.de/DE/wetter/warnungen_aktuell/objekt_einbindung/einbindung_karten_geowebservice.pdf?__blob=publicationFile&v=11).

Detaillierte technische Informationen zum Web Mapping Service (WMS) allgemein finden Sie unter der Adresse [http://www.opengeospatial.org/standards/wms](http://www.opengeospatial.org/standards/wms) im Internet. Ausführliche Informationen zu den möglichen Funktionen eines Geoservers finden Sie unter [http://docs.geoserver.org](http://docs.geoserver.org).

Ich möchte Sie hier an dieser Stelle nicht mit trockenen Dokumentationen von Web Services langweilen. Viel lieber zeige ich Ihnen ein praktisches Beispiel. Im nachfolgenden Programmcodeausschnitt sehen Sie die wesentlichen Zeilen.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_992.html-->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 7);
      var dwd = L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          layers: "dwd:bluemarble",
        })
        .addTo(mymap);
    </script>
  </body>
</html>

```

Wenn Sie dieses Beispiel mit dem Laden eines `L.tileLayer` ohne WMS vergleichen, ist eigentlich nur eine Zeile anders. Anstelle der Zeile

```js
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap);
```

haben wir

```js
L.tileLayer.wms("https://maps.dwd.de/geoserver/dwd/wms", {
layers:'dwd:bluemarble',
}).addTo(mymap);
```

eingefügt. Wir ergänzen also zusätzlich `.wms` hinter `L.tileLayer` und die Option `{layers:'dwd:bluemarble',}`.

Wichtig ist, dass Sie dem Aufruf `L.tileLayer.wms`

- die richtige Adresse zum WMS Service mitgeben und
- die Option `layers`

passend setzen.

Für alle anderen Parameter setzt Leaflet, oder der Service selbst, Standardwerte ein – falls Sie nichts Spezielles angeben. Möchten Sie wissen, was vom WMS-Service geliefert wird? Dann öffnen Sie doch die HTML-Datei des vorherigen Beispiels in Ihrem Browser. Mit dem Layer `dwd:bluemarble` können Sie ein Satellitenbild zu Ihrer Karte hinzufügen. Wie das genau aussieht, sehen Sie im nachfolgenden Bild.

![Ein Satellitenbild, das über einen WMS-Service geladen wurde.](/images/942.png)

### L.tileLayer.wms über L.tileLayer.wms

Das Schöne an WMS-Layern ist, das Sie diese übereinander legen können. Das nachfolgende Beispiel enthält Programmcode, der im Ergebnis gleichzeitig drei WMS-Layer übereinander anzeigt.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_991.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 7);
      L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          transparent: true,
          layers: "dwd:bluemarble",
        })
        .addTo(mymap);
      L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          format: "image/png",
          transparent: true,
          layers: "dwd:Warngebiete_Kreise",
        })
        .addTo(mymap);
      L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          format: "image/png",
          transparent: true,
          layers: "dwd:Warnungen_Gemeinden_vereinigt",
        })
        .addTo(mymap);
    </script>
  </body>
</html>

```

Dieses Beispiel ist meiner Meinung nach selbsterklärend. Wichtig ist, dass Sie die Option `transparent` mit `true` übergeben. Andernfalls sehen Sie nur einen – nämlich den obersten – Layer. Bereiche, die nicht mit Daten gefüllt sind, werden weiß gezeichnet. Außerdem müssen Sie die Option `format` mit `'image/png'` belegen. Leaflet lädt ansonsten automatisch das Format `'image/jpeg'` und dieses Format unterstützt keine Transparenz.

![Mehrere Layer, die über einen WMS-Service geladen wurde.](/images/994.png)

![Mehrere Layer, die über einen WMS-Service geladen wurde.](/images/994a.png)

### L.tileLayer.wms und L.tileLayer zusammen auf einer Karte

Das nachfolgende Beispiel zeigt Ihnen, wie Sie einen `L.tileLayer` mit einem `L.tileLayer.wms` kombinieren können.

```html
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/1/index_990.html -->

<!DOCTYPE html>
<html>
  <head>
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map("mapid").setView([50.27264, 7.26469], 7);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(mymap);
      L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          format: "image/png",
          transparent: true,
          layers: "dwd:Warngebiete_Kreise",
        })
        .addTo(mymap);
      L.tileLayer
        .wms("https://maps.dwd.de/geoserver/dwd/wms", {
          transparent: true,
          format: "image/png",
          layers: "dwd:Warnungen_Gemeinden_vereinigt",
        })
        .addTo(mymap);
    </script>
  </body>
</html>

```

Für dieses Beispiel gilt das, was ich im vorherigen Beispiel bezüglich Transparenz und Format geschrieben habe. Zusätzlich müssen Sie darauf achten, dass Sie den `L.tileLayer` nicht über die `L.tileLayer.wms.Layer` Schicht legen. Der `L.tileLayer` ist nicht transparent. Er würde die `L.tileLayer.wms.Layer` Schicht vollständig abdecken.

Die nachfolgende Abbildung zeigt Ihnen die zwei `L.tileLayer.wms` Layer über dem `L.tileLayer` Layer.

![Zwei `L.tileLayer.wms` Layer über dem `L.tileLayer` Layer.](/images/994b.png)

> **Achtung:** Wenn auf Ihrer Karte der Layer `dwd:Warnungen_Gemeinden_vereinigt` nicht angezeigt wird, kann es daran liegen, dass es zur Zeit keine Warnungen gibt. Dieser Layer enthält nur Daten, wenn aktuell Wetterwarnungen vorliegen. Die grünen Polygone – im Layer `dwd:Warngebiete_Kreise` – die die Landkreise darstellen, werden dahingegen immer eingeblendet.

## In diesem Kapitel haben wir …

In diesem Kapitel haben Sie auf unterschiedliche Arten eine Karte erstellt.

In den nächsten Kapiteln werden wir diese Karte mit Elementen und Informationen füllen.
