---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2018-12-11
title: 'Erstellen Sie Ihr erstes Leaflet-Layer-Plugin - Ein Tutorial für Anfänger'
template: post
thumbnail: '../thumbnails/leaflet.png'
slug: leaflet-layer-plugin-first-steps
langKey: de
categories:
  - Leaflet
tags:
  - geografische Daten
  - Leaflet
---

In diesem Beitrag erkläre ich Ihnen, wie Sie ein Plugin für [LeafletJs](http://leafletjs.com/) erstellen. Ganz genau zeige ich Ihnen, wie Sie ein Layer-Plugin programmieren. Ein Layer-Plugin ermöglicht es Ihnen, Daten auf der Leaflet-Karte anzuzeigen.

Sie können zum Beispiel

- Marker,
- geometrische Formen,
- Symbole oder ganz einfach
- Text

auf der Leaflet-Karte mithilfe von Koordinaten platzieren.

In diesem Text konzentriere ich mich darauf, die Struktur und den Lebenszyklus von Leaflet-Plugins zu erklären. Meine Vorlage für die Erstellung von Leaflet Control- und Layer-Plugins habe ich auf [Github](https://github.com/astridx/leafletjs-plugin-boilerplate) veröffentlicht.

### Leaflet Layer-Plugins

Während [Control-Plugin](/leaflet-control-plugin-first-steps)s Leaflet um neue Funktionen erweitern, ermöglichen es Layer-Plugins, neue Arten von Inhalten auf der Karte anzuzeigen. Beispielsweise gibt es Layer-Plugins, um

- [Marker zu gruppieren](https://github.com/Leaflet/Leaflet.markercluster),
- [Polygone zu zeichnen](https://github.com/Leaflet/Leaflet.draw) und
- [Daten zu visualisieren](https://github.com/Leaflet/Leaflet.heat).

### So erstellen Sie ein Leaflet-Layer-Plugin

Bevor ich mit Ihnen praktisch einen Layer erstelle, hier die recht langweilig klingende Definition: Layer-Plugins sind JavaScript-Klassen, die die [Leaflet Klasse](http://leafletjs.com/reference.html#class) [`L.Layer`](https://leafletjs.com/reference.html#layer) erweitern. Üblicherweise wird der Name des Layer-Plugins zum Namensraum von Leaflet, also zu `L`, hinzugefügt.

Im nächsten Beispiel zeige ich Ihnen, wie Sie ein Layer-Plugin mit dem Namen `L.LeafletLayerExample` erstellen. Hier zunächst der JavaScript-Code.

```js
    L.LeafletLayerExample = L.Layer.extend({
      …
    )}
```

Das Standardmuster für die Erstellung eines Leaflet-Plugins, implementiert eine [Factory-Methode](https://de.wikipedia.org/wiki/Fabrikmethode), mit der die Erstellung des Plugins mit anderen Methodenaufrufen verkettet werden kann. Das ist ganz praktisch. Deshalb sollte jedes Leaflet-Plugin diese Factory-Methode enthalten. Schreiben Sie dazu ganz ans Ende der Datei den folgenden Text.

```js
L.leafletLayerExample = function (options) {
  return new L.LeafletLayerExample(options)
}
```

Nun können sie Ihr Plugin ganz einfach in einer Zeile erstellen und zur Karte hinzufügen – wenn es fertig ist. Im Beispiel würde das wie folgt aussehen:

```js
L.leafletLayerExample().addTo(map)
```

Auch hier gilt: Üblicherweise wird die Factory-Methode nach der Klasse des Steuerelement-Plugins benannt. Nur der erste Buchstaben wird mit einem kleinen Buchstaben geschrieben, anstelle eines großen.

### Der Lebenszyklus des Leaflet Layer-Plugins

Leaflet ruft die folgenden Methoden eines Layer-Plugins auf, wenn der Layer zu einer Leaflet-Karte hinzugefügt wird.

- `initialize()`
- `onAdd()`

Leaflet ruft die `initialize`\-Methode auf, wenn eine neue Instanz eines Layer-Plugins erstellt wird, indem `new` direkt aufgerufen wird oder wenn die Factory-Methode verwendet wird:

- `L.leafletLayerExample()`
- `new L.LeafletLayerExample()`

Ein übliches Layer-Plugin-Muster besteht darin, die Koordinaten des Layers als Schlüssel-Wert-Paar des Optionsparameters zu übergeben. Der Optionsparameter wird dazu an die Initialisierungsmethode übergeben. Durch das Festlegen der Position der Ebene kann das Plugin die Ebene korrekt aktualisieren, wenn die Karte vergrößert, verkleinert oder verschoben wird.

```js
    …
    initialize: function(options) {
      this._latLng = options.latLng;
      // Initialisierung des Layer-Plugins.
    }
    …
```

Nach dem Setzen des Wertes für `this._latLng` kann der `initialize`\-Methode weiterer Code zur Initialisierung des Layers hinzugefügt werden.

Leaflet ruft die `onAdd`\-Methode auf, wenn der Layer mit den folgenden Methodenaufrufen zur Karte hinzugefügt wird:

- `layer.addTo(Karte);`
- `map.addLayer(Layer);`

Bisher war das Erstellen eines Leaflet-Ebenen-Plugins dem Erstellen eines Control-Plugins sehr ähnlich. Der Hauptunterschied zwischen Layer- und Steuerelement-Plugins liegt in der Menge der Arbeit, die die `onAdd`\-Methode ausführen muss. Idealerweise erstellt man hier zunächst einen Verweis auf die Karte (`this._map = map;`), um später bei der Verarbeitung von Ereignissen leicht auf diese zugreifen zu können.

```js
    …
    onAdd: function(map) {
      this._map = map;

      var layerElementTag = 'div';
      var layerElementClasses = ' leaflet-layer-example leaflet-zoom-hide';
      this._layerElement = L.DomUtil.create(layerElementTag, layerElementClasses);

      // Continue implementing the layer here.

      map.getPanes().overlayPane.appendChild(this._layerElement);
      map.on('viewreset', this._updatePosition, this);
      this._updatePosition();
    }
    …
```

Nachdem der Verweise auf die Karte fertig ist, erstellt die `onAdd`\-Methode das DOM-Element, das zur Anzeige der Ebenen-Inhalte genutzt werden soll. (`var layerElementTag = 'div';`).

Es ist wichtig, die CSS-Klasse `leaflet-zoom-hide` zum Element hinzuzufügen (`var layerElementClasses = '.my-leaflet-layer leaflet-zoom-hide';`). Elemente der Klasse `leaflet-zoom-hide` werden in Leaflet ausgeblendet, während die Karte vergrößert oder verkleinert wird. Dies bringt Performance-Vorteile.

Im Gegensatz zu einem Control-Plugin, das mit dem Aufruf von `map.addControl(Steuerelement)` automatisch zur Leaflet-Karte hinzugefügt wird, muss sich ein Layer-Plugin selbst um die Anzeige kümmern (`map.getPanes().overlayPane.appendChild(this._layerElement);`).

Nachdem Sie es zu einer Leaflet-Karte hinzugefügt haben, muss ein Layer-Plugin das `viewreset`\-Ereignis der Leaflet-Karte verfolgen (`map.on('viewreset', this._updatePosition, this);`). Leaflet löst ein `viewreset`\-Ereignis aus, wenn der Benutzer die Karte vergrößert oder verkleinert. Die Methode `_updatePosition` ist dafür verantwortlich, den Layer neu zu positionieren, wenn die Karte vergrößert oder verkleinert wird.

Da die Methode `_updatePosition` die Berechnung zum korrekten Positionieren des Layers auf der Karte durchführt, führen wir sie am Ende der `onAdd()`\-Methode aus, um dem Layer die korrekte Ausgangsposition zu geben (`this._updatePosition();`).

Wenn die Karte vergrößert oder verkleinert wird, haben die Breiten- und Längengrade der Ebene (festgelegt, als die Ebene erstellt wurde) unterschiedliche Koordinaten auf dem Bildschirm. Um die Ebene nach einem Zoom neu zu positionieren, berechnet die Methode `_updatePosition` zunächst die Bildschirmkoordinaten der Ebene mit der Methode `latLngToLayerPoint`  
(`var position = this._map.latLngToLayerPoint(this._latLng);`) neu. Als Nächstes werden die Bildschirmkoordinaten des DOM-Elements der Ebene mit den neuen Bildschirmkoordinaten (`L.DomUtil.setPosition(this._layerElement, position);`) aktualisiert.

```js
    …
    _updatePosition: function() {
      var position = this._map.latLngToLayerPoint(this._latLng);
      L.DomUtil.setPosition(this._layerElement, position);
    }
    …
```

Leaflet ruft eine dritte Layer-Plugin-Methode auf. Diese Methode heißt `onRemove`. Die Methode `onRemove` wird - wie der Name schon sagt - aufgerufen, wenn der Layer aus der Karte entfernt wird.

1.  `layer.removeFrom`(Karte);\`
2.  `map.removeLayer(Layer);`

Genau wie die `onRemove`\-Methode eines Leaflet-Control-Plugins ist die `onRemove`\-Methode eines Layer-Plugins der Ort, an dem aufgeräumt wird. Entfernen Sie hier die DOM-Elemente und Ereignis-Listener. Darüber hinaus sollte sich die Ebene aus dem Overlay-Fensterbereich der Leaflet Karte  
entfernen (`map.getPanes().overlayPane.removeChild(this._layerElement);`) und sie sollte die Überwachung von `viewreset`\-Ereignissen (`map.off('viewreset', this._updatePosition, this);`) beenden.

```js
    …
    onRemove: function(map) {
      map.getPanes().overlayPane.removeChild(this._layerElement);
      map.off('viewreset', this._updatePosition, this);
    }
    …
```

### Styling

Leaflet Layer können Sie wie jedes andere DOM-Element mit CSS gestalten. Hier füge ich der CSS-Klasse `leaflet-layer-example` Stilregeln hinzu. Naja, bisher füge ich nur drei Punkte hinzu. Sie haben sicher etwas mehr Fantasie. Zur Erinnerung: Das `div`\-Element mit der Klasse `leaflet-layer-example` haben wir in der `onAdd`\-Methode hinzugefügt.

```js
    …
    .leaflet-layer-example {
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
<img src="https://vg07.met.vgwort.de/na/e8bf6a025736498481c4c649c58c3062" width="1" height="1" alt="">
