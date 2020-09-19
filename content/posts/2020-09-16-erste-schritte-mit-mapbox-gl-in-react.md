---
date: 2020-09-16
title: 'Erste Schritte mit Mapbox GL in React'
template: post
thumbnail: '../thumbnails/react.png'
slug: erste-schritte-mit-mapbox-gl-in-react
categories:
  - Code
  - Popular
tags:
  - JavaScript
  - SPA
  - Bibliothek
  - Framework
  - React
  - MapBox
---

Geografische Daten haben mich schon immer fasziniert. Ich verwende [LeafletJs](https://leafletjs.com/), zur Zeit in Kombination mit [Joomla](https://www.joomla.de/). Parallel arbeite ich mich in [React](https://reactjs.org/) und [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) ein.

Ich habe beschlossen, eine Anwendung mit React- und Mapbox GL neu zu erstellen. Obwohl ich kein Mapbox-Experte bin, teile ich einige meiner Erkenntnisse in der Hoffnung, dass dies für jemanden hilfreich ist.

#### Voraussetzungen

In diesem Artikel gehe ich davon aus, dass du Erfahrung mit React hast und Mapbox GL neu für dich ist.

#### Ziel

- Erfahre wie du MapBox GL zusammen mit React anwendest.

Sieh dir hier den Code und eine Demo des Endergebnisses an.

- [Quellcode auf GitHub anzeigen](https://github.com/astridx/react-mapbox-example/)
- [Projekt Demo ansehen](https://astridx.github.io/react-mapbox-example/)

## Warum MapBox GL?

Mapbox GL ist ein leistungsstarkes und vielseitiges Tool zum Erstellen interaktiver Karten und zum Visualisieren von geografischen Daten, genau wie LeafletJS und Mapbox JS (ohne GL). Unzählige seriöse Unternehmen setzen es für eine Vielzahl von Anwendungsfällen ein. Bei Basiskarten zeigen Mapbox JS und LeafletJS PNG- und JPEG-Dateien (Raster Kacheln) an, mithilfe von HTML und CSS. Mapbox GL JS nutzt [Vektorkacheln](https://en.wikipedia.org/wiki/Vector_tiles) und zeigt sie mithilfe der Programmierschnittstelle [WebGL](https://de.wikipedia.org/wiki/WebGL) an.

## Einrichtung und Installation

Wir erstellen eine interaktive Karte, die einige Daten basierend auf dem Mittelpunkt abruft und die Ergebnisse anzeigt. Jedes Mal, wenn sich das Zentrum ändert, wird die Karte neu dargestellt. Dabei verwenden wir zufällige Pseudodaten.

### React Anwendung

Erstellen wir zunächst eine neue React-App und installieren Sie `mapbox-gl` als Abhängigkeit:

```bash
npx create-react-app react-mapbox-example
cd react-mapbox-example
yarn add mapbox-gl
```

Erstelle als Nächstes ein kostenloses Mapbox-Konto und erhalte ein API-Zugriffstoken [hier](https://account.mapbox.com/). Lege im Stammverzeichnis deines Projekts eine `.env.local`-Datei an und füge das Token hinzu:

```bash
/* .env.local */
REACT_APP_MAPBOX_ACCESS_TOKEN=DEIN_TOKEN
```

Füge dann die Mapbox-CSS-Datei im `<head>` der Datei `Public / index.html`-Datei hinzu. In deinem Fall ist die Versionsnummer unter Umständen eine andere. Passe diese dann an.

```html
/* public/index.html */
<link
  href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
  rel="stylesheet"
/>
```

### Erstelle die Karte

Vor Kurzem habe ich mitgeholfen, die bis dahin auf Klassen basierenden [Mapbox Beispiel](https://github.com/mapbox/mapbox-react-examples) in funktionale Komponenten umzubauen. Bei der Verwendung von Funktionskomponenten sind einige wichtige Unterschiede zu beachten:

- Die Map wird mit dem Hook `useEffect` initialisiert, gefolgt von einem leeren Abhängigkeitsarray, das das funktionale Äquivalent von `componentDidMount` darstellt.
- Der `useRef`-Hook ist nützlich, da die Karte durch erneutes Rendern über die gesamte Lebensdauer der Komponente existiert.

Um die Karte hinzuzufügen, ersetze ich den Inhalt von `src/App.js` durch den folgenden Code:

```jsx
import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import './App.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const App = () => {
  const mapContainerRef = useRef(null)

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-104.9876, 39.7405],
      zoom: 12.5,
    })

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    // clean up on unmount
    return () => map.remove()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />
}

export default App
```

Um die Karte zu formatieren, ersetze ich den Inhalt von `src/Apps.css` durch:

```css
.map-container {
  Position: absolut;
  oben: 0;
  unten: 0;
  links: 0;
  rechts: 0;
}}
```

Voilà! Wenn du die App jetzt lokal aufrufst, wird dir über den vollständigen Bildschirm eine Karte angezeigt.

### Hinzufügen von geografischen Daten

Mapbox unterstützt verschiedenen Datenformate. In diesem Beispiel nutzen wir GeoJSON. Es ist kein Problem, wenn du mit [GeoJSON](https://geojson.org/) nicht vertraut bist. Im Moment reicht es aus, zu wissen, dass eine GeoJSON FeatureCollection so ​​aussieht, wie im nachfolgenden Codebeispiel. Jedes Element im Array stellt einen separaten Punkt auf der Karte dar.

```javascript
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [0, 0] // longitude, latitude
      },
      "properties": {
        "name": "Meine Position"
      }
    }
  ]
}
```

Wir erstellen eine Datei namens `src/api/fetchFakeData.js`. Über diese geben wir eine Liste mit 20 Koordinaten zurück, die basierend auf dem Kartenmittelpunkt zufällig generiert werden.

```jsx
const fetchFakeData = (centerCoordinates) => {
  const newFeaturesList = []
  for (let i = 0; i < 20; i++) {
    const id = i
    const { longitude, latitude } = getRandomCoordinate(centerCoordinates)
    newFeaturesList.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      properties: {
        id,
        name: `Random Point #${id}`,
        description: `description for Random Point #${id}`,
      },
    })
  }

  return Promise.resolve({
    type: 'FeatureCollection',
    features: newFeaturesList,
  })
}

const getRandomCoordinate = ({ longitude: centerLon, latitude: centerLat }) => {
  const r = 0.025 * Math.sqrt(Math.random())
  const theta = Math.random() * 2 * Math.PI
  const latitude = centerLat + r * Math.cos(theta)
  const longitude = centerLon + r * Math.sin(theta)
  return { longitude, latitude }
}

export default fetchFakeData
```

Zunächst plante ich, die Punkte mit [Markern](https://docs.mapbox.com/mapbox-gl-js/api/markers/) darzustellen. Ich habe mich später für einen Layer entschieden. Diese sind im Wesentlichen Sammlungen von Daten, die Gemeinsamkeiten haben. Mapbox unterstützt verschiedene Datentypen, die als [Sources](https://docs.mapbox.com/mapbox-gl-js/api/sources/) bezeichnet und über eine Ebene angezeigt werden.

Zurück in `src/App.js` fügen wir zunächst unmittelbar nach der Initialisierung der Map innerhalb des `useEffect`-Hooks einen Ereignis-Listener hinzu, der auf das Laden der Map wartet, und dann die Datenquelle und den Layer.

```jsx
...
map.on("load", () => {
  map.addSource("random-points-data", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: []
    }
  });
  map.addLayer({
    id: "random-points-layer",
    source: "random-points-data",
    type: "symbol",
    layout: {
      // https://labs.mapbox.com/maki-icons
      "icon-image": "marker-15",
      "icon-padding": 1,
      "icon-allow-overlap": true
    }
  });
});
...
```

Die Daten sind bisher nicht auf der Karte zu sehen. Es fehlt ein Ereignis-Listener, der diese mit den aktualisierten Mittelkoordinaten abruft. Dazu aktualisieren wir die Datenquelle. Dazu importieren wir die Funktion `fetchFakeData` und erstellen einen weiteren Listener:

```jsx
...
map.on("moveend", async () => {
  const { lng, lat } = map.getCenter();
  const results = await fetchFakeData({ longitude: lng, latitude: lat });
  map.getSource("random-points-data").setData(results);
});
...
```

Wenn die Karte beweg wird, erscheinen Marker-Symbole.

> Wenn wir Marker verwendet hätten, dann wäre es notwendig, alle in einem Array abzulegen und zu durchlaufen.

### Marker versus Layer

Marker eignen sich meiner Meinung nach für statische Daten, die du manuell verwaltest - beispielsweise der aktuelle Standort des Benutzers. Marker lassen sich leichter mit individuellen SVGs oder Bildern über CSS stylen. Dafür sind sie in großer Anzahl schwieriger zu verwalten.

Größere, dynamische Datensätze lassen sich mit Ebenen besser verwalten. Sie sind meiner Meinung nach etwas schwieriger zu stylen aber unkomplizierter zu organisieren. Füge der Karte Ereignis-Listener hinzufügen, die anhand einer eindeutigen ID einen Layer adressieren und auf Features in diesem zugreifen, ohne die Daten manuell zu verwalten.

### Popup

Um die Karte interaktiver zu gestalten, fügen wir ein Popup-Feld hinzu. Dieses zeigt Details an, wenn Benutzer auf eine Funktion klicken. Zunächst erstelle ich eine neue React-Komponente in der Datei `src/components/Popup.js`:

```jsx
import React from 'react'

const Popup = ({ feature }) => {
  const { id, name, description } = feature.properties

  return (
    <div id={`popup-${id}`}>
      <h3>{name}</h3>
      {description}
    </div>
  )
}

export default Popup
```

Zurück in `src/App.js` importieren wir die gerade erstellte Komponente sowie `ReactDOM` aus `react-dom`. Damit dieses Popup, genau wie die Karte, während der gesamten Lebensdauer der `App`-Komponente erhalten bleibt füge ich unmittelbar nach dem `mapContainerRef` ein `popUpRef` hinzu:

```jsx
...
const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
...
```

Um den Inhalt des Popups festzulegen und es anzuzeigen, füge ich einen Ereignis-Listener zur Ebene hinzu, welcher auf Klick Events reagiert:

```jsx
...
map.on("click", "random-points-layer", e => {
  if (e.features.length) {
    const feature = e.features[0];
    // Popup-Knoten erstellen
    const popupNode = document.createElement("div");
    ReactDOM.render(<Popup feature={feature} />, popupNode);
    // Popup-Knoten hinzufügen
    popUpRef.current
      .setLngLat(feature.geometry.coordinates)
      .setDOMContent(popupNode)
      .addTo(map);
  }
});
...
```

Jetzt wird das Popup per Klick angezeigt. Um die Karte benutzerfreundlicher zu gestalten, ändern wir zuletzt den Maus-Zeiger, wenn er den Mauszeiger darüber bewegt mithilfe eines Ereignisses.

```jsx
...
// Ändere den Cursor in einen Zeiger, wenn der Benutzer mit der Maus über eine anklickbare Funktion fährt
map.on("mouseenter", "random-points-layer", e => {
  if (e.features.length) {
    map.getCanvas().style.cursor = "pointer";
  }
});

// Setze den Cursor auf die Standardeinstellung zurück, wenn sich der Benutzer nicht mehr über einer anklickbaren Funktion befindet
map.on("mouseleave", "random-points-layer", () => {
  map.getCanvas().style.cursor = "";
});
...
```

Fertig!

### Fazit

Wie du siehst, ist Mapbox unkompliziert anpassbar. Ich ende hier jetzt. Wie überall, gibt es jede Menge zu verbessern.

Du wirst beispielsweise feststellen, dass das Vergrößern oder Verkleinern der Karte den Listener „moveend“ auslöst und neue Punkte generiert. Das macht nicht immer Sinn. Eine bessere Lösung besteht darin, den „moveend“-Listener zu verwenden, um die Koordinaten für den Status der Komponente zu aktualisieren und dann einen neuen „useEffect“-Hook zu erstellen, der nur aufgerufen wird, wenn sich die Mittelkoordinate ändert.
Hoffentlich war dies für dich genauso hilfreich wie für mich, als ich anfing, in Mapbox GL einzutauchen!

Ein Blogbeitrag informiert nicht allumfassend. Er gibt nur einen Eindruck. Ich hoffe, dass ich dir diesen vermittelt habe. Wenn du nun Lust hast, tiefer in React hinein zu blicken, dann ist das [Buch](https://github.com/the-road-to-learn-react/the-road-to-react-german) sicher etwas für dich.

- [Quellcode auf GitHub anzeigen](https://github.com/astridx/react-mapbox-example)
- [Projekt Demo ansehen](https://astridx.github.io/react-mapbox-example/)
