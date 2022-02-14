---
description: 'desc'
shortTitle: 'short'
date: 2018-12-10
title: 'Erstellen Sie Ihr erstes Leaflet-Control-Plugin - Ein Tutorial für Anfänger'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: en/leaflet-control-plugin-first-steps
langKey: de
categories:
  - Leaflet English
tags:
  - geografische Daten
  - Leaflet
---

Erstellen Sie Ihr erstes Leaflet-Control-Plugin - Ein Tutorial für Anfänger.

In diesem Beitrag erkläre ich, wie Sie ein Plugin für LeafletJs erstellen. Ich zeige Ihnen, wie Sie ein Control-Plugin, somit ein Steuerelement für Ihre [Leaflet](http://leafletjs.com/) Karte programmieren.

In diesem Text konzentriere ich mich darauf, die Struktur und den Lebenszyklus von Leaflet-Plugins zu erklären. Meine Codebeispiel habe ich auf [Github](https://github.com/astridx/leafletjs-plugin-boilerplate) veröffentlicht.

## Leaflet Control-Plugins

Während [Layer-Plugins](/leaflet-layer-plugin-first-steps) die Karte mit Inhalten erweitern, fügen Control-Plugins Steuerelemente hinzu. Mithilfe dieser Elemente interagieren Sie mit der Karte. Beispiele für Steuerelemente sind die

- Zoomsteuerung und die
- Ebenensteuerung,

die links oben und rechts oben in der folgenden Abbildung angezeigt werden.

![](/images/leafletcontrollsundlayer.png)

## So erstellen Sie ein Leaflet Control-Plugin

Bevor ich mit Ihnen praktisch ein Control erstelle, hier die recht langweilig klingende Definition: Control-Plugins sind JavaScript-Klassen, die die Leaflet [Klasse](https://leafletjs.com/reference.html#class) [`L.Control`](https://leafletjs.com/reference.html#control) erweitern. Üblicherweise wird der Name des Plugins zum Namensraum von Leaflet, zu `L`, hinzugefügt.

Im nächsten Beispiel zeige ich Ihnen, wie Sie ein Control-Plugin mit dem Namen `L.LeafletControlExample` erstellen. Hier zunächst der JavaScript Code.

```js
L.LeafletControlExample = L.Control.extend({
  options: {
    position: ‚topright‘
  },
  …
}
```

Die Erweiterungsmethode `extend` der Klasse `L.Control` verwendet einen einzigen Parameter, der alle Eigenschaften und Methoden enthält, die das Plugin der `L.Control`-Unterklasse hinzufügt. Viele Control-Plugins verfügen über eine Reihe von Standardeinstellungen. Im obigen Code-Schnipsel enthält das Objekt `options` eine Standardeinstellung für die Position `position` des Steuerelements auf der Karte.

Das Standardmuster für die Erstellung eines Leaflet-Plugins, implementiert eine [Factory-Methode](https://de.wikipedia.org/wiki/Fabrikmethode), mit der die Erstellung des Plugins mit anderen Methoden-Aufrufen verkettet wird. Das ist praktisch. Deshalb enthält jedes Plugin diese Factory-Methode. Schreiben Sie dazu ans Ende der Datei den folgenden Text.

```js
L.leafletControlExample = function (options) {
  return new L.LeafletControlExample(options)
}
```

Erstellen Sie Ihr Plugin in einer Zeile und fügen es zur Karte hinzu. Im Beispiel würde das wie folgt aussehen:

```js
L.leafletControlExample({ position: ‚bottomright‘ }).addTo(map);
```

Üblicherweise wird die Factory-Methode nach der Klasse des Steuerelement-Plugins benannt. Nur der erste Buchstabe wird - anstelle eines große - mit einem kleinen geschrieben.

### Der Lebenszyklus des Leaflet Controll-Plugins

Leaflet ruft die folgenden Methoden eines Steuerelement-Plugins auf, wenn das Element zu einer Karte hinzugefügt wird.

- initialize()
- onAdd ()

Leaflet ruft die initialize-Methode auf, wenn eine neue Instanz eines Controll-Plugins erstellt wird, indem entweder new direkt aufgerufen wird oder wenn die Factory-Methode verwendet wird:

```js
L.leafletControlExample()
new L.LeafletControlExample()
```

In der folgenden `initialize`-Methode wird `L.Util.setOptions` aufgerufen, um die Werte der Standardeinstellungen zu setzten.

```js
…
initialize: function(options) {
  L.Util.setOptions(this, options);
  // Initialisierung des Control-Plugins.
 }
…
```

Nach dem Aufruf von setOptions fügen wir der `initialize`-Methode weiteren Code zur Initialisierung des Steuerelements hinzu.

Leaflet ruft die `onAdd`-Methode auf, wenn das Steuerelement mit einem der folgenden Methodenaufrufe zur Karte hinzugefügt wird:

- control.addTo(Karte);
- map.addControl(Steuerelement);

Ein Leaflet-Control-Plugins ist ein DOM-Element Element - in der Regel ein HTML-Element -, das auf der Karte angezeigt wird. Genauer ausgedrückt: Das Element wird auf einer Schicht oberhalb der eigentlichen Kartenschicht angezeigt. Wichtig: Die onAdd-Methode muss das DOM-Element zurückgeben.

In der folgenden `onAdd`-Methode erstellen wir ein div-Element. Diesem `div`-Element fügen wir danach die Klasse `leaflet-control-example` hinzu. So formatieren wir das Steuerelement später mit CSS problemlos.

```js
…
onAdd: function(map) {
  var controlElementTag = ‚div‘;
  var controlElementClass = ‚leaflet-control-example‘;
  var controlElement = L.DomUtil.create(controlElementTag, controlElementClass);

  // Hier können noch weitere Elemente hinzugefügt werden.
  // Außerdem können Sie hier einem Element Events hinzufügen.

  return controlElement;
},
…
```

Wenn alles fertig ist, geben Sie das DOM-Element mit return controlElement zurück.

Leaflet erwartet eine weitere Methode. Diese heißt `onRemove`. `onRemove` wird - wie der Name schon sagt - aufgerufen, wenn das Steuerelement von der Karte entfernt wird.

```js
control.removeFrom(Karte)
map.removeControl(Steuerelement)
```

Die onRemove-Methode ist der Ort, an dem aufgeräumt wird. Entfernen Sie hier die DOM-Elemente und Ereignis-Listener.

```js
…
onRemove: function(map) {
  // Tear down the control.
}
…
```

### Styling

Gestalten Sie Leaflet Steuerelemente wie jedes andere DOM-Element mit CSS. Hier füge ich der CSS-Klasse leaflet-control-example Stilregeln hinzu. Naja, bisher stehen hier drei Punkte. Sie haben sicher etwas mehr Fantasie. Zur Erinnerung: Das div-Element mit der Klasse leaflet-control-example haben wir in der onAdd-Methode hinzugefügt.

```js
…
.leaflet-control-example {
  …
}
…
```

### Lesen Sie weiter

Die Leaflet-Dokumentation enthält einen [Plugin-Authoring-Leitfaden](https://leafletjs.com/2013/06/28/leaflet-plugin-authoring-guide.html), in dem bewährte Vorgehensweisen zum

- Organisieren,
- Präsentieren und
- Demonstrieren

von Leaflet-Plugin-Code erläutert werden.

Auf der [Leaflet Website](https://leafletjs.com/plugins.html) werden verschiedene Plugins aufgelistet, die von der Leaflet-Community erstellt wurden. Die meisten Plugins sind [Open Source](https://de.wikipedia.org/wiki/Open_Source) und sind auf [GitHub](https://github.com/) verfügbar. Wer gerne mit Beispielen lernt, findet hier eine Fülle von Möglichkeiten, um das Erstellen eigenes Plugins zu lernen.
<img src="https://vg07.met.vgwort.de/na/f9c7f51656e74a0c89190295494b7e6f" width="1" height="1" alt="">
