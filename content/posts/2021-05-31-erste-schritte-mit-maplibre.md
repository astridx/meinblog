---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-05-31
title: 'Erste Schritte mit react-map-gl und MapLibre'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: erste-schritte-mit-maplibre
langKey: de
categories:
  - Tipp
tags:
  - Maps
  - Maplibre
---

## Einrichten der Umgebung

Zu Beginn richten wir die React-Anwendung ein und besorgen uns alle notwendigen Abhängigkeiten. Dazu führen wir die folgenden Befehle aus, die ich nachfolgend erkläre.

```js
npx create-react-app maplibre-app
cd maplibre-app
npm install
npm install maplibre-gl
npm install react-map-gl
npm install react-app-rewired --save-dev
```

### Details zur Einrichtung

#### npx create-react-app maplibre-app

```js
npx create-react-app maplibre-app
cd maplibre-app
...
...
...
```

Mit dem Befehl `npx create-react-app maplibre-app` erstellen wir eine React Anwendung mit dem Namen `maplibre-app`.
[`create-react-app`](https://github.com/facebook/create-react-app) ermöglicht das Erstellen einer React-Applikation über die Eingabe eines einzelnen Befehls. Eine auf diese Weise erstellte App verfügt bereits über viele Entwicklerwerkzeuge wie Webpack, ESLint oder Babel. Du kannst dich somit voll auf die eigentliche Programmieraufgabe konzentrieren.

> Was ist `NPX`? An dieser Stelle möchte ich kurz erklären, was `Node` und `NPM` sind. `Node` ermöglicht es uns, JavaScript außerhalb eines Browsers auszuführen. Es ermöglicht uns auch, JavaScript auf der Server-Seite auszuführen. `NPM` steht für _Node Package Manager_ und ist ein Tool, mit dem wir Node-Pakete als Abhängigkeiten installieren und verwalten können. `NPX` ist ein NPM-Package-Runner mit dem vereinfacht ausgedrückt Node-Pakete ausführbar sind, ohne sie installieren zu müssen. Warum [NPX](https://www.npmjs.com/package/npx) verwenden? Zum einen ist es mit `NPX` nicht erforderlich, Software zu installieren, die man nur einmal benötigt. Zum anderen greift man so jederzeit auf die aktuellste Version zu.

#### npm install maplibre-gl

```js
...
...
npm install maplibre-gl
...
...
```

[MapLibre GL](https://maplibre.org/maplibre-gl-js-docs/example/) ist ein von der Community geführter Fork, der von [mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/api/) abgeleitet wurde, bevor diese zu einer [Nicht-OSS-Lizenz](https://github.com/mapbox/mapbox-gl-js/blob/main/LICENSE.txt) wechselten.

#### npm install react-map-gl

```
...
...
...
npm install react-map-gl
...
```

[`react-map-gl`](https://github.com/visgl/react-map-gl) ist eine Suite von [React](http://facebook.github.io/react/)-Komponenten, die entwickelt wurde, um eine React-API für [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js)-kompatible Bibliotheken bereitzustellen.

Mit v2.0 und höher ist es nicht mehr erlaubt `mapbox-gl` ohne _Mapbox Token_ zu verwenden. Auch dann nicht, wenn man eine eigene Karte verwendet. Eine Alternative: Verwende einen freien Fork von `mapbox-gl`, zum Beispiel [maplibre-gl](https://www.npmjs.com/package/maplibre-gl). In der [Dokumentation](https://github.com/visgl/react-map-gl/blob/master/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork) ist beschrieben, was dabei zu beachten ist. Im Grunde genommen reicht es aus, einen Alias zu erstellen, der `mapbox-gl` in `maplibre-gl` verändert. Falls du diesem Beispiel folgst, reicht die im nächsten Schritt beschriebene Konfiguration mit `react-app-rewired` aus.

#### npm install react-app-rewired --save-dev

> `--save-dev` wird als Parameter von [npm install](https://docs.npmjs.com/cli/v7/commands/npm-install) verwendet, um das Paket `react-app-rewired` ausschließlich für die Entwicklung zu speichern.

```
...
...
...
...
npm install react-app-rewired --save-dev
```

Der Vorteil der `create-react-app` ist, dass die Konfiguration der Werkzeuge für uns übernommen wird. Als Nachteil nehmen wir in Kauf, dass die Einstellungen nicht einfach individuell anpassbar sind. Alles ist aber überschreibbar. Hierfür nutzen wir [`react-app-rewired`](https://github.com/timarney/react-app-rewired#readme).

Erstelle im Stammverzeichnis deiner Anwendung eine Datei mit dem Namen `config-overrides.js` und folgendem Inhalt.

```js {numberLines: -2}
// https://raw.githubusercontent.com/astridx/maplibre-app/main/config-overrides.js
module.exports = function override(config, env) {
  config.module.rules.push({
    resolve: {
      alias: {
        ...config.resolve.alias,
        'mapbox-gl': 'maplibre-gl',
      },
    },
  })

  return config
}
```

Passe als nächstes die Skripte in der Datei `package.json` so an, dass dein Override mithilfe von `react-app-rewired` verwendet wird.

```js {diff}
package.json
...
  "scripts": {
+    "start": "react-app-rewired start",
+    "build": "react-app-rewired build",
+    "test": "react-app-rewired test",
-    "start": "react-scripts start",
-    "build": "react-scripts build",
-    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
...
```

Die Konfiguration ist fertig. Im nächsten Schritt löschen wir Inhalte, die wir nicht benötigen.

### Entfernen nicht benötigter Inhalte

Wir räumen auf. Dazu löschen wir alle Inhalte im `src`-Ordner, mit Ausnahme der Datei `index.js`. Den Inhalt der Datei `index.js` minimieren wir auf die nachfolgenden zwei Zeilen.

```js {numberLines: -2}
// https://raw.githubusercontent.com/astridx/maplibre-app/main/src/index.js

import React from 'react'
\
import ReactDOM from 'react-dom'
ReactDOM.render(<></>, document.getElementById('root'))
```

Jetzt ist die Anwendung starklar.

### Anwendung starten

Starte nun die Anwendung.

```
npm start
```

Im Browser siehst du unter `http://localhost:3000/` noch keine Ausgabe. Dies ändert sich im im nächsten Kapitel.

> Den fertigen Code zu diesem ersten Abschnitt findest du auf [Github](https://github.com/astridx/maplibre-app/tree/main).

## Einrichten der MapLibre-Karte

### Die Karte integrieren

Lege im `src`-Ordner die Datei `Map.js` an, die wir für die Anzeige der Karte verwenden:

```js {numberLines: -2}
// Map.js

import React from 'react'
import ReactMapGL from 'react-map-gl'

export const Map = () => {
  return (
    <ReactMapGL mapStyle="https://api.maptiler.com/maps/streets/style.json?key=my_key"></ReactMapGL>
  )
}
```

Ich nutze ein [Maptiler Token](https://cloud.maptiler.com/account/keys) in diesem Tutorial an der Stelle `https://api.maptiler.com/maps/streets/style.json?key=my_key`, und implementiere die Karte mit MapLibre und MapTiler. Wenn du das Beispiel selbst nachvollziehen möchtest, erstelle dir bitte einen eigenen [Zugangsschlüssel](https://cloud.maptiler.com/account/keys).

> Hinweis: Zum Lernen, ist das Einfügen des Token in den Quellcode eine Vereinfachung. In einem Echtsystem sollte es nicht im Quellcode zu sehen sein. Integriere dieses per [Umgebungsvariable](https://create-react-app.dev/docs/adding-custom-environment-variables/).

### Karte integrieren

Importiere die Komponente, welche die Karte anzeigt, in der Datei `index.js`.

```js {diff}
// index.js
import React from "react";
import ReactDOM from "react-dom";
-ReactDOM.render(<></>, document.getElementById('root'));
+import { Map } from "./Map";
+
+ReactDOM.render(<Map />, document.getElementById("root"));
```

### Status der Karte

Bisher siehst du noch keine Karte. In `react-map-gl` wird der Kartenstatus über das Viewport-Objekt verwaltet. Es enthält alle Informationen zum Zustand der Karte wie Koordinaten, Zoom, Neigung, Größe im Browser. Um dies zu verwalten, nutzen wir den `useState`-Hook von React.

```js {diff}
// Map.js
-import React from "react";
+import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export const Map = () => {
+  const [mapViewport, setMapViewport] = useState({
+    height: "100vh",
+    width: "100wh",
+    longitude: 7.571606,
+    latitude: 50.226913,
+    zoom: 4
+  });

  return (
    <ReactMapGL
+      {...mapViewport}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=my_key"
+      onViewportChange={setMapViewport}
    ></ReactMapGL>
  );
};
```

Jedes Mal, wenn sich einer der Viewport-Werte in der Karte ändert, wird `onViewportChange` ausgelöst, wodurch unsere Statuswerte aktualisiert werden.

> Den fertigen Code zu diesem Abschnitt findest du auf [Github](https://github.com/astridx/maplibre-app/tree/1_maplibre-map).

## Marker auf der MapLibre-Karte

### Hooks

In diesem Beispiel werden wir die Hooks `useContext`, `useReducer` und `createContext` nutzen. Zunächst implementieren wir diese in der Datei `src/hooks/mapHook.js` an.

```js
// mapHook.js
import React, { createContext, useContext, useReducer } from "react";

const MapStateContext = createContext();
const MapDispatchContext = createContext();

export const MapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MapReducer, { markers: [] });
  return (
    <MapStateContext.Provider value={state}>
      <MapDispatchContext.Provider value={dispatch}>
        {children}
      </MapDispatchContext.Provider>
    </MapStateContext.Provider>
  );
};

export const useStateMap = () => {
  const context = useContext(MapStateContext);

  if (context === undefined) {
    throw new Error("useStateMap must be used within a MapProvider");
  }
  return context;
};

export const useDispatchMap = () => {
  const context = useContext(MapDispatchContext);

  if (context === undefined) {
    throw new Error("useDispatchMap must be used within a MapProvider");
  }
  return context;
};

export const MapReducer = (state, action) => {
  ...
  return state;
};
```

Der komplizierte Aufbau ermöglicht es uns, während der Laufzeit ein erneutes Laden der Karte zu minimieren.

> [Wie man React Context effektiv nutzt](http://bit.ly/3gZjYIa) erklärt der verlinkte Beitrag.

### Reducer

In unserer Anwendung werden wir Marker zur Karte hinzufügen und entfernen. Folgerichtig erstellen wir zwei Aktionen für unseren Reducer `ADD_MARKER` und `REMOVE_MARKER`.

```js
// mapHook.js
export const MapReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        ...state,
        markers: [...state.markers, action.payload.marker],
      }
    case 'REMOVE_MARKER':
      return {
        ...state,
        markers: [
          ...state.markers.filter(
            (x) =>
              x[0] !== action.payload.marker[0] &&
              x[1] !== action.payload.marker[1]
          ),
        ],
      }
  }
  return state
}
```

### Einbinden in die Anwendung

Es fehlt noch die Integration in die Anwendung. Diese implementieren wir, indem wir die `Map`-Komponente als Kind-Komponente in `MapProvider` integrieren.

```js {diff}
//index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Map } from './Map'
import { MapProvider } from './hooks/mapHook'

ReactDOM.render(
  +(
    <MapProvider>
      <Map />+{' '}
    </MapProvider>
  ),
  document.getElementById('root')
)
```

### Marker dynamisch verwalten

In unserer Anwendung wollen wir `ADD_MARKER` jedes Mal aufrufen, wenn der Benutzer mit der linken Maustaste auf die Karte klickt.

```js {diff}
//map.js
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

export const Map = () => {
  const [mapViewport, setMapViewport] = useState({
    height: "100vh",
    width: "100wh",
    longitude: 7.571606,
    latitude: 50.226913,
    zoom: 4
  });

  return (
    <ReactMapGL
      {...mapViewport}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=YymZPIGfniu7apIvln6X"
      onViewportChange={setMapViewport}
+      onClick={x => {
+        x.srcEvent.which === 1 &&
+          mapDispatch({ type: "ADD_MARKER", payload: { marker: x.lngLat } });
+      }}
    >
        <MarkerList />
    </ReactMapGL>
  );
};
```

Der nächste Schritt ist die Darstellung der Markern an den gespeicherten Koordinaten. Erstellen wir hierfür die zwei neuen Komponenten `Marker` und `MarkerList`.

```js {numberLines: -2}
//Marker/marker.js

import React from 'react'
import { Marker as MapMarker } from 'react-map-gl'

export const Marker = ({ marker, handleRemove }) => {
  return (
    <MapMarker
      offsetTop={-48}
      offsetLeft={-24}
      latitude={marker[1]}
      longitude={marker[0]}
    >
      <img
        onContextMenu={(x) => {
          x.preventDefault()
          handleRemove()
        }}
        src="https://img.icons8.com/color/48/000000/marker.png"
      />
    </MapMarker>
  )
}
```

```js {numberLines: -2}
//Marker/markerList.js

import React from 'react'
import { Marker } from './Marker'
import { useStateMap, useDispatchMap } from '../hooks/mapHook'

export const MarkerList = () => {
  const { markers } = useStateMap()
  const mapDispatch = useDispatchMap()
  return (
    <>
      {markers?.map((marker, index) => (
        <Marker
          key={index}
          marker={marker}
          handleRemove={() =>
            mapDispatch({ type: 'REMOVE_MARKER', payload: { marker } })
          }
        />
      ))}
    </>
  )
}
```

Standardmäßig werden Marker in der linken oberen Ecke verankert. Praktischerweise gibt es die Eigenschaften für den Marker-Offset, so dass wir die Marker wenn erforderlich etwas verschieben können.

```js
offsetTop={-48}}
offsetLeft={-24}
```

Nun ist die Anzeige in der Karte mittels `<MarkerList />` möglich.

> Den fertigen Code zu diesem Abschnitt findest du auf [Github](https://github.com/astridx/maplibre-app/tree/2_context).
