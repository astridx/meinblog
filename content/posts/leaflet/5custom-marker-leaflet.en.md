---
date: 2018-12-17
title: 'Custom Markers'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: en/custom-markers-leaflet
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

Sie wissen nun wie Sie die unterschiedlichsten Geodaten auf Ihrer Karte anzeigen können und auch wie Sie mit den Geodaten ein Thema visualisieren können.

## In diesem Kapitel werden wir …

In diesem Kapitel werden wir über die reine Anzeige hinaus noch einen Schritt weiter gehen. Nun geht es darum, der Karte eine individuelle Note zu geben. Wir sehen uns an, wie Sie Marker beliebig gestalten können. Außerdem sehen wir uns Plugins an, die Sie bei dieser Arbeit unterstützen.

## Ein individueller Marker auf Ihrer Karte

Wenn Leaflet einen Marker auf einer Karte anzeigt, werden gleich zwei Bilddateien angezeigt. Zunächst wird das eigentliche Bild an die passende Stelle auf die Karte gelegt. Danach wird ein Schatten zu diesem Bild hinzugefügt. Mit einem passenden Schatten fallen die Marker eher ins Auge. Der Schatten verleiht einem Marker eine Tiefe. So hebt dieser sich besser von der Karte ab.

Wenn Sie die Dateien zu Leaflet, wie im Kapitel _Eine lokale Leaflet-Kopie einbinden_ beschrieben, auf Ihren Rechner kopiert haben,
sehen Sie unter den kopierten Daten einen Unterordner mit dem Namen `images`. In den Beispieldateien zu diesem Buch befindet sich ebenfalls eine Leaflet Kopie in der der Ordner `images` enthalten ist. Dieser Ordner `images` enthält die Imagedateien die angezeigt werden, wenn kein individuelles Image angegeben ist. Ich habe die Bilder hier nachfolgend abgedruckt. Wenn Sie dieses Buch bisher durchgearbeitet haben, kommen Ihnen die Bilder sicher teilweise bekannt vor.

![(Bilder, die standardmäßig in Leaflet verwendet werden.)](/images/978.png)

Oft ist es so, dass das Bekannte vertraut ist und man sich deshalb damit sicher und wohl fühlt. Manchmal möchte man aber aus der Reihen tanzen. Wenn Sie auf Ihrer Karte außergewöhnliche Stellen mit einem Marker markieren möchten, dann sollten diese Marker vielleicht aus der Reihe tanzen. Wenn Sie an einer besonderen Stelle keine blaue Einheitsgrafik anzeigen möchten, dann zeigen Sie doch Ihre eigene Grafik an!

Haben Sie schon eine schöne Grafik für Ihren Marker und den passenden Schatten dazu? Wie Sie ein eigenes Image mit einem Grafikprogramm erstellen, gehört nicht zum Thema dieses Buches. Hier möchte ich Ihnen nur ein paar Punkte aufzählen, die Sie beim Erstellen des Images für einen Leaflet Marker beachten sollten.

Falls Sie keine Grafiken besitzen und auch nicht selbst Hand anlegen möchten, dann können Sie entweder die Übungen mit den Beispielbildern des [Leaflet Tutorials](http://leafletjs.com/examples/custom-icons/)[^leafletjs.com/examples/custom-icons] durcharbeiten – oder Sie blättern direkt weiter zum nächsten Kapitel. Das Kapitel _Ein Marker Plugin_ bietet Ihnen einen Kompromiss. Sie benötigen keine eigenen Grafiken, können einem Marker aber trotzdem ein
anderes Aussehen verleihen.

> Sie möchten gerne selbst die Grafiken erstellen, wissen aber noch nicht genau wie und womit? Dann sehen Sie sich doch das Programm [GIMP](https://www.gimp.org)[^www.gimp.org] an. GIMP (GNU Image Manipulation Program) ist eine gute kostenlose Alternative zum Bildbearbeitungsprogramm [Photoshop von Adobe](http://www.adobe.com/de/products/photoshop.html)[^adobe.com/de/products/photoshop.html] und kommt mit zahlreichen professionellen Bearbeitungsfunktionen.

Wenn Sie zwei Bilder haben – also ein Bild, das Ihren Marker selbst darstellt und eines, das den Schatten zeigt – dann können wir diese beiden Bilder als Marker in Ihre Karte einbinden. Ich habe hier zum Ausprobieren die Bilddateien aus dem Leaflet Tutorial [Markers with Custom Icons](http://leafletjs.com/examples/custom-icons/)[^leafletjs.com/examples/custom-icons] verwenden.

![(Bilddateien aus dem Leaflet Tutorial [Markers with Custom Icons](http://leafletjs.com/examples/custom-icons/).)](/images/945.png)

Im nachfolgenden Beispiel sehen Sie den Text, der für die Anzeige des benutzerdefinierten Markers verantwortlich ist.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_955.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        10
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var greenIcon = L.icon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
        shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76],
      })
      L.marker([50.27264, 7.26469], { icon: greenIcon })
        .addTo(mymap)
        .bindPopup('Ich bin ein Marker mit einem individuellen Image.')
    </script>
  </body>
</html>
```

Sehen wir uns diese Zeilen genau an: Zunächst einmal sticht die Instanziierung des Bildes hervor.

```js
var greenIcon = L.icon({
  iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
  shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
})
```

Die Bedeutung der einzelnen Optionen habe ich in der nachfolgenden Abbildung veranschaulicht. Aber zunächst einmal sehen wir uns das Problem genauer an:

Die Schwierigkeit beim Positionieren des Bildes liegt darin, die Position des Icons mit der Stelle auf der Erde, die markiert werden soll, zu verbinden. Das Bild ist in der Regel größer als der zu markierende Punkt. Außerdem enthält das Bild oft eine Art Pfeil, dessen Spitze auf den zu markierenden Punkt zeigen sollte. Zudem gibt es meist noch ein Pop-up Fenster, das relativ zum Bild geöffnet werden sollte. Wie also nutzen Sie die Optionen, um das Bild an der passende Stelle auf der Karte anzuzeigen? Dies erkläre ich Ihnen nachfolgend.

Sie können mit der optionalen Option `iconSize: [38, 95]` die Größe des Bildes mitgeben. Mit der optionalen Option `shadowSize: [50, 64]` können Sie die Größe des Schattens beeinflussen. Wenn Sie die Werte für diese Option nicht setzten, wird die Originalgröße des Images verwendet. Die Option `iconAnchor: [22, 94]` gibt Ihnen nun die Möglichkeit, die Stelle, an der das Bild in die Karte eingefügt werden soll, zu definieren. Ohne ein Setzen dieser Option, würde die linke obere Ecke des Bildes an der Stelle, die markiert werden soll, beginnen. In der Regel ist es aber so, dass man das Bild mittig oder vielleicht sogar über dieser Stelle einfügen möchte. `iconAnchor: [22, 94]` fügt das Bild 22 Pixel weiter links und 94 Pixel oberhalb der zu markierenden Stelle ein. Wenn Sie sich die nachfolgende Abbildung ansehen, wird dies klar. Der rote Punkt stellt in der Abbildung die zu markierende Stelle dar. Für die Option `shadowAnchor: [4, 62]` gilt das gleiche wie für `iconAnchor`. Das Schattenbild wird 4 Pixel links und 76 Pixel oberhalb des roten Punktes, also der zu markierenden Stelle, eingefügt. Die Belegung der Wert in der Option `popupAnchor: [-3, -76]` ist meiner Meinung nach etwas verwirrend, weil im Gegensatz zu den anderen Optionen für die gleiche Wirkung ein Minuszeichen vorangestellt werden muss. Wenn Sie das Pop-up Fenster links obenhalb der zu markierenden Position öffnen möchten, müssen Sie bei der Option `popupAnchor` also ein Minuszeichen voran stellen!

![(Das Bild zu einem Marker auf einer Leaflet Karte positionieren.)](/images/928.png)

Im Kapitel _Die Karte mit Daten bestücken_ – genau im Unterkapitel _Punkte und Marker_ – haben wir schon Marker mit Optionen angelegt. Im nächsten Codeschnipsel sehen Sie nun, dass Sie auch das Bild zum Marker – also das Icon – als Option angeben können. Im Programmcode geben Sie dazu einfach den Namen des eben erstellen `L.Icon` Objektes an.

```js
L.marker([50.27264, 7.26469], { icon: greenIcon })
  .addTo(mymap)
  .bindPopup('Ich bin ein Marker mit einem individuellen Image.')
```

Wenn Sie das HTML Dokument dieses Beispiels im Browser öffnen, sehen Sie eine Karte auf der das grüne Icon als Marker an der festgelegten Koordinate – passend positioniert – erscheint.

![(Eine Karte mit einem benutzerdefinierten Icon als Marker.)](/images/977.png)

### Eigenschaften eines individuellen Marker

Ein eigenes Marker Bild erstellen Sie in Leaflet mithilfe der [Kasse `L.icon`](http://leafletjs.com/reference.html#icon)[^leafletjs.com/reference.html#icon]. Das haben Sie eben praktisch gesehen. Diese Klasse bietet Ihnen eine Menge Optionen.

- `iconUrl:` Die `iconUrl` müssen Sie auf alle Fälle angeben. Diese Option muss die Adresse zur Bilddatei enthalten – absolut oder relativ zu dem Verzeichnis, in dem Ihr Skript gespeichert ist.
- `iconRetinaUrl:` Die `iconRetinaUrl` bietet Ihnen optional die Möglichkeit, die Adresse einer für Retina Bildschirme optimierten Version des Bildes – absolut oder relativ zu dem Verzeichnis, in dem Ihr Skript gespeichert ist – anzugeben. Wie Leaflet dieses Bild genau optimiert, erkläre ich Ihnen im Anschluss an die Auflistung dieser Optionen.
- `iconSize:` Die optionale `iconSize` beeinflusst die Größe, mit der das Bild angezeigt wird.
- `IconAnchor:` Die Option `IconAnchor` beschreibt die Pixelkoordinate, an der das Bild eingefügt werden soll. Die Koordinate gibt die Pixelwerte relativ zu der Stelle an, die markiert werden soll. Achtung: Verwechseln Sie die Pixelkoordinat nicht mit der geografischen Koordinate.
- `PopupAnchor:` Die Option `PopupAnchor` beschreibt den Punkte, an dem ein Pop-up Fenster geöffent werden soll. Die Koordinate gibt die Pixelwerte relativ zu der Stelle an, die markiert werden soll. Wenn Sie das Pop-up Fenster links obenhalb der zu markierenden Position öffnen möchten, müssen Sie bei den Werten der Option `popupAnchor` ein Minuszeichen voran stellen! Sind die Werte positiv, öffnet sich das Pop-up rechts unterhalb zu markierenden Position.
- `ShadowUrl:` Die Option `ShadowUrl` enthält die Adresse zur Imagedatei, die den Schatten darstellen soll. Wenn nichts angegeben ist, wird kein Schattenbild erstellt.
- `ShadowRetinaUrl:` Mit der Option `ShadowRetinaUrl` können Sie ein Bild angeben, dass speziell für Retina Displays optimiert ist. Wie Leaflet dieses Bild genau optimiert, erkläre ich Ihnen im Anschluss an die Auflistung dieser Optionen.
- `shadowSize:` `shadowSize` beschreibt die Höhe und Breite des Bildes, dass den Schatten darstellen soll, in Pixeln.
- `shadowAnchor:` Die Pixel Koordinaten an der das Schattenbild eingefügt werden soll, können Sie mit der Option `ShadowAnchor` übergeben. Ansonsten gilt für diese Option das gleiche, was ich bei der Option `iconAnchor` geschrieben habe.
- `className:` Mit der Option `className` können Sie für beide Bilder - also dem Schattenbild und dem eigentlichen Marker Bild - den Namen einer CSS-Klasse definieren.

> Besonderheiten beim [Retina Display](https://de.wikipedia.org/w/index.php?title=Retina-Display)[^de.wikipedia.org/w/index.php?title=retina-display] Hochauflösende Displays haben eine höhere Pixeldichte als gewöhnliche Monitore. Auf der gleichen Fläche werden etwa viermal so viele Pixel dargestellt. Der Vorteil dieser Technologie liegt darin, dass die Pixel nun so klein sind, dass das menschliche Auge sie nicht mehr auflösen kann. Das Ergebnis sind sehr scharfe Grafiken und Texte. Damit das Bild nun auf einem HiDPI (High Dots Per Inch) Bildschirm, also einem Retina Display, scharf dargestellt wird, muss es mit mindestens zweifacher Breite und Höhe zur Verfügung gestellt werden. Denn: Eine Pixelgrafik, die bei gewöhnlicher Auflösung das ganze Display ausfüllt, würde auf einem Retina Display der gleichen Größe nur ein Viertel des Displays einnehmen. Ein Pixel der Grafik entspricht auch auf dem Retina-Display einem Pixel. Es werden aber auf der gleichen Fläche viermal so viele Pixel, nun allerdings nur mit einem Viertel der Größe, abgebildet. Damit die Pixelgrafiken nicht plötzlich alle zu klein dargestellt werden, rechnen die Geräte die Grafiken um. Dadurch geht Qualität verloren. Pixelgrafiken wirken auf dem Retina-Display daher teilweise unscharf. Um dieses Problem zu umgehen, prüft Leaflet die Auflösung des Anzeigegerätes. Anschließend werden die Marker Bilder – sofern eine Grafik mit hohere Auflösung vorhanden ist – in hoher Auflösung angezeigt.

### Die Klasse L.Icon erweitern

So, nun haben Sie einen benutzerdefinierten Marker erstellt und möchten weitere Marker kreiere. Schön, dass Leaflet objektorientiertes Arbeiten unterstützt. So können Sie sich das Erstellen von neuen Marker Objekten sehr einfach machen. Erweitern Sie einfach die Klasse `L.Icon` und geben alle gemeinsamen Eigenschaften hier einmal an. Ausschließlich die besonderen Eigenschaften des Markers müssen Sie separat für jeden Marker angeben. Das nachfolgende Codebeispiel zeigt Ihnen, wie Sie drei unterschiedliche Marker, die ein paar gemeinsame Eigenschaften haben, mithilfe von einer Eltern-Klasse erstellen können. So können die drei Marker von dem Elternteil die gemeinsamen Eigenschaften erben.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_954.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        8
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var LeafIcon = L.Icon.extend({
        options: {
          shadowUrl: 'leaf-shadow.png',
          iconSize: [38, 95],
          shadowSize: [50, 64],
          iconAnchor: [22, 94],
          shadowAnchor: [4, 62],
          popupAnchor: [-3, -76],
        },
      })
      var greenIcon = new LeafIcon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
      })
      var redIcon = new LeafIcon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
      })
      var orangeIcon = new LeafIcon({
        iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-orange.png',
      })
      L.marker([50.27264, 7.26469], { icon: greenIcon })
        .addTo(mymap)
        .bindPopup('Ich bin ein grüner Marker.')
      L.marker([50.27264, 6.26469], { icon: redIcon })
        .addTo(mymap)
        .bindPopup('Ich bin ein roter Marker.')
      L.marker([50.27264, 8.26469], { icon: orangeIcon })
        .addTo(mymap)
        .bindPopup('Ich bin ein oranger Marker.')
    </script>
  </body>
</html>
```

Dieser Programmcodeabschnitt hat Ähnlichkeit mit dem vorherigen Beispiel. Wenn Sie genau hinsehen, finden Sie aber Unterschiede. Wir erstellen im ersten Schritt kein neues `Icon` Objekt um dieses Anzuzeigen, sondern erweitern die Klasse `L:Icon` mit der Klasse `LeafIcon`. Wir legen nur die gemeinsamen Optionen für das Objekt `LeafIcon` fest. Die URL des Bildes ist die Option, die von Marker zu Marker unterschiedlich ist. Deshalb geben wir diese beim Erweitern der Klasse in den Optionen noch nicht an.

```js
var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
})
```

Im zweiten Schritt erstellen wir drei Instanzen des `LeafIcon`, also des erweiterten `L.Icon`.

```js
var greenIcon = new LeafIcon({
  iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-green.png',
})
var redIcon = new LeafIcon({
  iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-red.png',
})
var orangeIcon = new LeafIcon({
  iconUrl: 'http://leafletjs.com/examples/custom-icons/leaf-orange.png',
})
```

Und zu guter Letzt fügen wir die Marker mit dem zugehörigen Icon an die passende Stelle auf der Karte zum Kartenobjekt hinzu.

```js
L.marker([50.27264, 7.26469], { icon: greenIcon })
  .addTo(mymap)
  .bindPopup('Ich bin ein grüner Marker.')
L.marker([50.27264, 6.26469], { icon: redIcon })
  .addTo(mymap)
  .bindPopup('Ich bin ein roter Marker.')
L.marker([50.27264, 8.26469], { icon: orangeIcon })
  .addTo(mymap)
  .bindPopup('Ich bin ein oranger Marker.')
```

> Sie haben vielleicht bemerkt, dass wir das Schlüsselwort `new` für die Erstellung von `LeafIcon` Instanzen verwendet haben. Warum haben wir vorher alle Leafelt Objekte ohne das Schlüsselwort `new` erstellt? Die Antwort ist einfach: Die echten Leaflet Klassen sind mit einem Großbuchstaben – beispielsweise `L.Icon` – benannt und diese müssen mit `new` erstellt werden. Es gibt aber Shortcuts mit Kleinbuchstaben – `L.icon` – die aus Bequemlichkeitsgründen von den Leaflet-Programmierern für Sie erstellt wurden: `L.icon = function icon(options) {return new L.Icon(options);};` Die Funktion `L.icon` können Sie sich auf Github in der Datei [icon.js](https://github.com/Leaflet/Leaflet/blob/7ed780cd35474f2acf0f17e7394807ff0973a031/src/layer/marker/Icon.js#L153)[^github.com/leaflet/leaflet/blob/7ed780cd35474f2acf0f17e7394807ff0973a031/src/layer/marker/icon.js#l153] ansehen. Leaflet setzt hier das Entwurfsmuster [Fabrikmethode](https://de.wikipedia.org/w/index.php?title=Fabrikmethode)[^de.wikipedia.org/w/index.php?title=fabrikmethode] ein. Das Muster beschreibt, wie ein Objekt durch Aufruf einer Methode, anstatt durch direkten Aufruf eines Konstruktors, erzeugt wird. Dies hatte ich im Kapitel _Wir beginnen mit einer einfachen Karte_ schon einmal erwähnt.

Im nachfolgenden Bild sehen Sie das Ergebnis. Jeder Marker wird nun mit einem individuellen Icon erstellt. Die meisten Optionen sind gleich – allerdings hat jeder Marker seine eigene Farbe.

![(Drei Marker mit unterschiedlichen Icons, die mithilfe einer Elternklasse erstellt wurden.)](/images/976.png)

## Ein Marker Plugin

Sie wissen nun, wie Sie einen Marker mit einem standardisierten Aussehen einfügen und können einen Marker mit einem eigenen Image belegen. Leider haben Sie aber kein eigenes Image und haben auch nicht viel Erfahrung mit einem Grafikprogramm. Sie können kein professionell aussehendes individuelles Image hervorzaubern oder haben einfach nicht die Zeit dazu. Trotzdem möchten Sie Ihrer Karte ein besonderes Aussehen verleihen. In diesem Fall bietet Ihnen dieses Kapitel eine Lösung. Ich stelle Ihnen zwei Plugins vor, die Sie bei der Erstellung von individuellen Marker Objekten unterstützen.

### BeautifyMarker

[Leaflet.BeautifyMarker](https://github.com/marslan390/BeautifyMarker)[^github.com/marslan390/beautifymarker], ist ein einfaches Plugin, das bunte Marker ganz ohne eigene Grafik zu einer Leaflet-Karte hinzufügt. Trotzdem behalten Sie die volle Kontrolle über den Stil der Marker. Konkret heißt das: Sie können über unbegrenzte Farben und viele Eigenschaften verfügen. Das Plugin Leaflet.BeautifyIcon bietet auch die Möglichkeit, Schriftart und Glyphen, also die grafische Darstellung von Schriftzeichen, anzupassen.

![Marker, die mithilfe des Plugins [Leaflet.BeautifyMarker](https://github.com/marslan390/BeautifyMarker) erstellt wurden.](/images/974.png)

Damit Sie sich dieses besser vorstellen können, habe ich ein Beispiel erstellt.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_953.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
    />
    <link
      rel="stylesheet"
      href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="leaflet-beautify-marker-icon.css" />
    <script src="leaflet-beautify-marker-icon.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        8
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      L.marker([50.27264, 7.26469], {
        icon: L.BeautifyIcon.icon({ iconSize: [50, 50] }),
        draggable: true,
      })
        .addTo(mymap)
        .bindPopup('Ich bin ein beautify Marker')
      options = {
        icon: 'spinner',
        spin: 'true',
        borderColor: '#8A90B4',
        textColor: 'white',
        backgroundColor: '#8A90B4',
      }
      L.marker([50.27264, 6.26469], {
        icon: L.BeautifyIcon.icon(options),
        draggable: true,
      })
        .addTo(mymap)
        .bindPopup('Ich bin ein beautify Marker')
      options = {
        icon: 'plane',
        iconShape: 'marker',
        borderColor: '#8D208B',
        textColor: '#8D208B',
        backgroundColor: 'transparent',
      }
      L.marker([50.27264, 8.26469], {
        icon: L.BeautifyIcon.icon(options),
        draggable: true,
      })
        .addTo(mymap)
        .bindPopup('Ich bin ein beautify Marker')
    </script>
  </body>
</html>
```

Was müssen Sie tun, wenn Sie das [Plugin `Leaflet.BeautifyMarker`](https://github.com/marslan390/BeautifyMarker)[^github.com/marslan390/beautifymarker] verwenden möchten? Zunächst einmal müssen Sie die notwendigen Skripte und Stylesheet Dateien einbinden. Das ist zum einen das Skript und die CSS-Datei zum Plugin selbst. Diese Dateien können Sie über die Website [https://github.com/marslan390/BeautifyMarker](https://github.com/marslan390/BeautifyMarker) herunterladen. Zum anderen können Sie zusammen mit Leaflet.BeautifyMarker Drittdienste nutzen. Sie können [Font Awesome CSS](https://fontawesome.com/)[^fontawesome.com] und [Bootstrap CSS](https://getbootstrap.com/)[^getbootstrap.com] einbinden. Ich habe im Beispiel die CSS-Dateien von Font Awesome und von Boostrap eingebunden, um Ihnen dies zu demonstrieren. Für dieses Beispiel wäre nur die CSS-Datei von Font Awesome CSS notwendig gewesen.

Weiter müssen Sie nicht tun. Sie können sofort einen Marker mithilfe der Option `icon: L.BeautifyIcon.icon(options)` kreieren.

```js
L.marker([50.27264, 8.26469], {
  icon: L.BeautifyIcon.icon(options),
  draggable: true,
})
  .addTo(mymap)
  .bindPopup('Ich bin ein beautify Marker')
```

Sehen Sie sich die Optionen des Plugin `Leaflet.BeautifyMarker` an. Es macht Spaß diese zu erkunden. Wie die Optionen wirken, die ich verwendet haben, können Sie sich im nächsten Bild teilweise ansehen. Das sich eines der Icons dreht, erkennen Sie allerdings nur, wenn Sie die HTML Datei mit der Karte selbst im Browser öffnen.

![(Eine Leaflet Karte mit `Leaflet.BeautifyMarker`-Markern.)](/images/975.png)

> Ich hatte Ihnen ja schon geschrieben, dass es jede Menge Plugins für Leaflet gibt und dies gilt für den Bereich Marker besonders. Die meisten sind auf der Website von Leaflet aufgelistet. Diese Liste finden Sie unter der Adresse [https://leafletjs.com/plugins.html#markers--renderers](https://leafletjs.com/plugins.html#markers--renderers)[^leafletjs.com/plugins.html#markers--renderers].

## Cluster

Je nachdem welche Informationen Sie mit Ihrer Karte weitergeben möchten, kann es vorkommen, dass Sie sehr viele Marker benötigen. Wenn Sie mit vielen Marker Objekten arbeiten, sollten Sie beachten, dass diese das Laden der Karte verlangsamen. Außerdem kann es vorkommen, dass Marker nahe nebeneinander liegen und sich beim Zoomen überschneiden. Dies ist nicht benutzerfreundlich. Schön wäre es, wenn bei einer Detailansicht alle Marker zu sehen sind – diese aber beim Hineinzoomen in die Karte zu Clustern zusammengefasst werden. So hat der Benutzer alle Informationen passend zur Kartenanzeige.

In diesem Kapitel erfahren Sie, wie Sie das [Plugin `Leaflet.markercluster`](https://github.com/Leaflet/Leaflet.markercluster)[^github.com/leaflet/leaflet.markercluster] zum Clustern von Marker Objekten verwenden und so eine große Anzahl von Marker Objekten auf einer Karte benutzerfreundlich und übersichtlich darstellen können. Sehen Sie sich das nachfolgende Beispiel an, um zu verstehen, wie das Clustern von Marker Objekten funktioniert.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_952.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <link rel="stylesheet" href="MarkerCluster.css" />
    <link rel="stylesheet" href="MarkerCluster.Default.css" />
    <script src="leaflet.markercluster-src.js"></script>
    <script src="points.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.219264, 7.19469],
        13
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var markers = L
        .markerClusterGroup
        //{showCoverageOnHover : false, disableClusteringAtZoom: 17}
        ()
      for (var i = 0; i < points.length; i++) {
        var a = points[i]
        var title = a[2]
        var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title })
        marker.bindPopup(title)
        markers.addLayer(marker)
      }
      mymap.addLayer(markers)
    </script>
  </body>
</html>
```

Das haben wir gemacht: Als erstes haben wir die notwendigen Dateien zum [Plugin `Leaflet.markercluster`](https://github.com/Leaflet/Leaflet.markercluster)[^github.com/leaflet/leaflet.markercluster] eingebunden. Damit wir auch genug Marker zum Clustern zur Verfügung haben, haben wir dann Punkte über eine externe Datei eingebunden. Die Datei `points.js` enthält 380 Punkte und sieht auszugsweise wie folgt aus:

```js
var points = [
[50.2210922667, 7.2209316333, "2"],
[50.2210819833, 7.2213903167, "3"],
…
];
```

Zu guter Letzt haben wir mit

```js
var markers = L.markerClusterGroup()
```

ein Objekt vom Typ `markerClusterGroup` erzeugen und diesem Objekt jeden einzelnen Marker hinzufügen. Das Objekt `markerClusterGroup` übernimmt nun die ganze Arbeit für uns.

So wie in der nachfolgenden Abbildung zu sehen ist, könnte Ihre Karte aussehen.

![Viele Marker auf einer Leaflet Karte, die in Cluster gruppiert sind.](/images/952.png)

### Optionen, Methoden und Ereignisse

Sie können einem Cluster jede Menge Optionen mitgeben und sehr viele Methoden und Ereignisse nutzen. Zum Beispiel können sie die standardmäßig aktivierte Option `showCoverageOnHover` mit

```js
var markers = L.markerClusterGroup(`  
{->showCoverageOnHover : false<-}`)
```

ausschalten. Aktiviert bewirkt diese Option das Folgende: Wenn Sie die Maus über einen Cluster bewegen, blendet sich ein Polygon ein, dass die Grenzen des Bereichs in dem die Marker sich befinden, anzeigt. Alle Optionen, Methoden und Ereignisse finden Sie in der Dokumentation zum Plugin auf Github[^github.com/leaflet/leaflet.markercluster].

## Marker animieren

### Hüpfende Marker

Wenn Sie einen Marker animieren möchten, unterstützt Sie beispielsweise das [Plugin `leaflet.bouncemarker`](https://github.com/maximeh/leaflet.bouncemarker)[^github.com/maximeh/leaflet.bouncemarker]. Wie Sie den hüpfenden Marker in Ihre Karte einbinden, zeige ich Ihnen wieder anhand eines Beispiels.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_951.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="bouncemarker.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        12
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      L.marker([50.27264, 7.26469], {
        bounceOnAdd: true,
        bounceOnAddOptions: { duration: 5000, height: 100 },
        bounceOnAddCallback: function () {
          alert('Gelandet!')
        },
      }).addTo(mymap)
    </script>
  </body>
</html>
```

Als Ergebnis sehen Sie einen Marker, der sofort nachdem die Karte im Browser geladen ist, in die Karte spring und dann noch eine Weile auf und ab hüpft. Nach dem der Marker gelandet ist, öffnet sich ein Pop-up-Fenster mit der Meldung: Gelandet!.

### Animierte Marker

#### Ein Marker bewegt sich

Es gibt sehr viele spannende Ideen, die man mit einer Karte umsetzen kann. Möchten Sie vielleicht mit Ihrem Marker einen Weg beschreiben? Dann ist das [Plugin `Leaflet.AnimatedMarker`](https://github.com/openplans/Leaflet.AnimatedMarker)[^github.com/openplans/leaflet.animatedmarker] vielleicht etwas für Sie. Mit diesem Plugin können Sie einen Marker so animieren, dass er einer Linie folgt. Vielleicht möchten Sie einen Marker in Form eines Autos darstellen, das auf einer Straße fährt?

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_950.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="AnimatedMarker.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        9
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var line = L.polyline([
          [50.6851, 7.94136],
          [50.68576, 6.94149],
          [51.68649, 6.94165],
        ]),
        animatedMarker = L.animatedMarker(line.getLatLngs(), {
          distance: 2000,
          interval: 1000,
        })
      mymap.addLayer(animatedMarker)
    </script>
  </body>
</html>
```

#### Einen Marker in Bewegung versetzen und wieder stoppen

Wenn Sie die Bewegung des Markers beeinflussen möchten, unterstützt Sie das [Plugin `Leaflet.AnimatedMarker`](https://github.com/openplans/Leaflet.AnimatedMarker)[^github.com/openplans/leaflet.animatedmarker] auch. Bauen Sie zum Testen zwei Schaltenflächen ein, über die Sie den Maker anhalten oder starten können. `Leaflet.AnimatedMarker` bietet Ihnen Methoden mit passender Funktionalität. Sie müssen diese Methoden nur der passenden Schaltfläche zuordnen. Das nächste Beispiel will Ihnen eine Idee zur Umsetzung dieser Aufabenstellung geben.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_949.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="AnimatedMarker.js"></script>
  </head>
  <body>
    <button onclick="start()">Start</button>
    <button onclick="stop()">Stop</button>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.46469], 9)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var line = L.polyline([
          [50.6851, 7.94136],
          [50.6851, 7.84136],
          [50.6851, 7.74136],
          [50.6851, 7.64136],
          [50.6851, 7.5136],
          [50.6851, 7.44136],
          [50.6851, 7.34136],
          [50.6851, 7.24136],
        ]),
        animatedMarker = L.animatedMarker(line.getLatLngs(), {
          autoStart: false,
          distance: 200,
          interval: 100,
        })
      mymap.addLayer(animatedMarker)
      function start() {
        animatedMarker.start()
      }
      function stop() {
        animatedMarker.stop()
      }
    </script>
  </body>
</html>
```

Wie Sie sehen, können Sie die Funktionen `start()` und `stop()`, die Ihnen das Plugin `Leaflet.AnimatedMarker` zur Verfügung stellt, nutzen.

#### Plugins kombinieren

Und natürlich können Sie Plugins auch kombinieren. Ihrer Kreativität sind keine Grenzen gesteckt. Schon allein mit den beiden gerade gezeigten Plugins `Leaflet.AnimatedMarker` und `leaflet.bouncemarker` können Sie einen Marker auf der Karte Aktionen ausführen lassen und ihn am Schluss gekonnt aus dem Bild hüpfen lassen. Sehen Sie selbst, probieren Sie das nächste Beispiel aus!

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_948.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link rel="stylesheet" href="../leaflet/leaflet.css" />
    <script src="../leaflet/leaflet.js"></script>
    <script src="AnimatedMarker.js"></script>
    <script src="bouncemarker.js"></script>
  </head>
  <body>
    <button onclick="start()">Start</button>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', {}).setView([50.27264, 7.26469], 7)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      b = new L.Marker([51.68649, 6.94165], { bounceOnAdd: true })
      var line = L.polyline([
          [50.6851, 7.94136],
          [50.68576, 6.94149],
          [51.68649, 6.94165],
        ]),
        animatedMarker = L.animatedMarker(line.getLatLngs(), {
          autoStart: false,
          distance: 2000,
          interval: 10,
          onEnd: function () {
            b.addTo(mymap)
            b.bounce({ duration: 100, height: 50 })
            mymap.removeLayer(animatedMarker)
            setTimeout('mymap.removeLayer(b)', 900)
          },
        })
      mymap.addLayer(animatedMarker)
      function start() {
        animatedMarker.start()
      }
    </script>
  </body>
</html>
```

## Leaflet Data Visualization Framework (DVF)

Möchten Sie gerne mit Ihrer Karte Daten visualisieren. Heatmaps und Choroplethenkarten sind aber nicht das Richtige für Sie? Sie können Daten mithilfe von Markern in überzeugende Karten verwandeln. Hierbei unterstützt Sie das Plugin [Leaflet Data Visualization Framework (DVF)](https://github.com/humangeo/leaflet-dvf)[^github.com/humangeo/leaflet-dvf]. Leider ist dieses Plugin zu dem Zeitpunkt, zu dem ich dieses Kapitel geschrieben haben, nicht mit der neuesten Leaflet Version kompatibel. Deshalb verwende ich im Beispiel eine ältere Leaflet Version.

### Das Plugin Data Visualization Framework

Das erste Beispiel zeigt Ihnen, wie Sie Formen als Marker darstellen können. Hier geht es noch nicht um das Visualisieren von Daten, sondern eher darum, die Möglichkeiten diese Plugins zu sehen und ein Gefühl für die Anwendung zu bekommen.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_947.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link
      rel="stylesheet"
      href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css"
    />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script>
    <link rel="stylesheet" href="dvf.css" />
    <script src="leaflet-dvf.js"></script>
    <script src="leaflet-dvf.markers.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        7
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var marker = new L.MapMarker([50.27264, 7.26469], {
        radius: 30,
        fillOpacity: 0.5,
        fillColor: 'orange',
        color: 'purple',
        innerRadius: 7,
        numberOfSides: 4,
        rotation: 10,
      })
      mymap.addLayer(marker)
      var polygonmarker = new L.RegularPolygonMarker([50.27264, 6.26469], {
        numberOfSides: 3,
        rotation: 10,
        radius: 10,
        fillColor: 'green',
        fillOpacity: 1,
        opacity: 1,
        weight: 1,
        radius: 30,
      })
      mymap.addLayer(polygonmarker)
      var star = new L.StarMarker([50.27264, 8.26469], {
        numberOfPoints: 8,
        opacity: 1,
        weight: 2,
        fillOpacity: 0,
        radius: 30,
      })
      mymap.addLayer(star)
    </script>
  </body>
</html>
```

Die nächste Abbildung zeigt Ihnen die drei im vorherigen Beispiel erstellen Marker.

![Drei mithilfe des [Leaflet Data Visualization Framework (DVF)](https://github.com/humangeo/leaflet-dvf) erstellte Marker.](/images/972a.png)

### Diagramme als Marker

Das außergewöhnlichste an diesem Plugin ist meiner Meinung nach die Einfachheit, mit der Diagramme als Marker dargestellt werden können. Sehen sich dies im nachfolgenden Beispiel an.

```html {numberLines: -1}
<!-- https://raw.githubusercontent.com/astridx/leaflet_beispieldateien_zum_Buch/master/version3_2021/4/index_946.html-->

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Eine OSM Karte mit Leaflet</title>
    <link
      rel="stylesheet"
      href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css"
    />
    <script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script>
    <link rel="stylesheet" href="dvf.css" />
    <script src="leaflet-dvf.js"></script>
    <script src="leaflet-dvf.markers.js"></script>
  </head>
  <body>
    <div style="height: 700px" id="mapid"></div>
    <script>
      var mymap = L.map('mapid', { doubleClickZoom: false }).setView(
        [50.27264, 7.26469],
        7
      )
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(mymap)
      var options = {
        data: {
          data1: 20,
          data2: 50,
          data3: 10,
          data4: 20,
        },
        chartOptions: {
          data1: {
            fillColor: 'blue',
            minValue: 0,
            maxValue: 50,
            maxHeight: 30,
            displayText: function (value) {
              //return value.toFixed(2);
              return 'Mein Text'
            },
          },
          data2: {
            fillColor: 'red',
            minValue: 0,
            maxValue: 50,
            maxHeight: 30,
          },
          data3: {
            fillColor: 'green',
            minValue: 0,
            maxValue: 50,
            maxHeight: 30,
          },
          data4: {
            fillColor: 'yellow',
            minValue: 0,
            maxValue: 50,
            maxHeight: 30,
          },
        },
        weight: 1,
        color: '#000000',
        radius: 30,
        fillOpacity: 1,
      }
      var bar = new L.BarChartMarker([50.27264, 7.26469], options)
      mymap.addLayer(bar)
      var radial = new L.RadialBarChartMarker([50.27264, 8.26469], options)
      mymap.addLayer(radial)
      var pie = new L.PieChartMarker([50.27264, 6.26469], options)
      mymap.addLayer(pie)
      var cox = new L.CoxcombChartMarker([50.97264, 7.26469], options)
      mymap.addLayer(cox)
      var stack = new L.StackedRegularPolygonMarker(
        [50.97264, 8.26469],
        options
      )
      mymap.addLayer(stack)
      var radialmeter = new L.RadialMeterMarker([50.97264, 6.26469], options)
      mymap.addLayer(radialmeter)
    </script>
  </body>
</html>
```

Ich habe wenige Daten für dieses Beispiel künstlich erstellt. Diese Daten habe ich in einer Variable im Programmcode fix eingetragen. Dies ist nicht Sinn der Sache. In der Regel will man dynamische Daten visualisieren. Das Prinzip wird so aber meiner Meinung nach klar. Das Beispiel zeigt Ihnen, wie Sie Daten in Form eines Diagramms mithilfe des Leaflet Data Visualization Framework auf Ihrer Leaflet Karte einblenden können. Und das nachfolgende Bild zeigt Ihnen das Ergebnis.

![Mithilfe des [Leaflet Data Visualization Framework (DVF)](https://github.com/humangeo/leaflet-dvf) erstellte Marker, die Diagramme beinhalten.](/images/972.png)

## In diesem Kapitel haben wir …

In diesem Kapitel haben wir der Leaflet Karte eine individuelle Note gegeben. Wir haben uns angesehen, wie Sie Marker beliebig gestalten können. Dabei haben wir einen Ausflug in die objektorientierte Programmierung gemacht. Insbesondere bei der Erstellung von vielen individuellen Marker Objekten kann man sich durch eine mögliche Vererbung viel Arbeit und viele Programmcodezeilen sparen. Außerdem haben wir uns verschiedene Plugins angesehen – man muss ja nicht immer das Rad selbst neu erfinden.

Sie haben Ihre digitale Karte bereits im Griff. Sie können diese gestalten und Daten auf ihr visualisieren. Nun kann es sein, dass Sie selbst keine großen Datenbestände zum Anzeigen haben. Vielleicht bietet das ESRI Inc. (Environmental Systems Research Institute) Daten, die zum Thema Ihrer Website passen? Im nächsten Kapitel erfahren Sie, wie Sie Daten und Anwendungen dieses Institutes verwenden können.
<img src="https://vg07.met.vgwort.de/na/a3942a51c12e45f5b67299a8bcb3c7eb" width="1" height="1" alt="">
