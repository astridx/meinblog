---
date: 2021-05-31
title: 'First steps with react-map-gl and MapLibre'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: en/erste-schritte-mit-maplibre
langKey: en
categories:
  - Tipp
tags:
  - Maps
  - Maplibre
---

## Setting up the environment

To begin, we set up the React application and get all the necessary dependencies. To do this, we execute the following commands, which I explain next.

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

With the command `npx create-react-app maplibre-app` we create a React application named `maplibre-app`.
[`create-react-app`](https://github.com/facebook/create-react-app) allows you to create a React app by entering a single command. An app created in this way already has many developer tools such as Webpack, ESLint or Babel. You can therefore fully concentrate on the actual programming task.

> What is `NPX`? At this point I would like to explain briefly what `Node` and `NPM` are. `Node` allows us to run JavaScript outside of a browser. It also allows us to run JavaScript on the server side. `NPM` stands for _Node Package Manager_ and is a tool that allows us to install and manage node packages as dependencies. `NPX` is an NPM package runner with which, in simple terms, node packages can be executed without having to install them. Why use [NPX](https://www.npmjs.com/package/npx)? Firstly, with `NPX` it is not necessary to install software that is only needed once. On the other hand, you always have access to the latest version.

#### npm install maplibre-gl

```js
...
...
npm install maplibre-gl
...
...
```

[MapLibre GL](https://maplibre.org/maplibre-gl-js-docs/example/) is a community-led fork derived from [mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/api/) before they moved to a [non-OSS licence](https://github.com/mapbox/mapbox-gl-js/blob/main/LICENSE.txt).

#### npm install react-map-gl

```js
...
...
...
npm install react-map-gl
...
```

[`react-map-gl`](https://github.com/visgl/react-map-gl) is a suite of [React](http://facebook.github.io/react/) components designed to provide a React API for [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js)-compatible libraries.

With v2.0 and higher, it is no longer allowed to use `mapbox-gl` without _mapbox token_. Not even if you use your own map. An alternative: Use a free fork of `mapbox-gl`, for example [maplibre-gl](https://www.npmjs.com/package/maplibre-gl). In the [documentation](https://github.com/visgl/react-map-gl/blob/master/docs/get-started/get-started.md#using-with-a-mapbox-gl-fork) it is described what you have to consider. Basically, it is enough to create an alias that changes `mapbox-gl` to `maplibre-gl`. If you follow this example, the configuration with `react-app-rewired` described in the next step is sufficient.

#### npm install react-app-rewired --save-dev

> `--save-dev` wird als Parameter von [npm install](https://docs.npmjs.com/cli/v7/commands/npm-install) verwendet, um das Paket `react-app-rewired` ausschließlich für die Entwicklung zu speichern.

```js
...
...
...
...
npm install react-app-rewired --save-dev
```

The advantage of the `create-react-app` is that the configuration of the tools is done for us. As a disadvantage, we accept that the settings are not easily customisable. But everything can be overwritten. For this we use [`react-app-rewired`](https://github.com/timarney/react-app-rewired#readme).

In the root directory of your application, create a file with the name `config-overrides.js` and the following content.

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

Next, adjust the scripts in the `package.json` file to use your override using `react-app-rewired`.

```js {diff}
// https://raw.githubusercontent.com/astridx/maplibre-app/main/package.json
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

The configuration is finished. In the next step, we delete content that we do not need.

### Removing unneeded content

We clean up. To do this, we delete all content in the `src` folder, with the exception of the `index.js` file. We minimise the content of the `index.js` file to the following two lines.

```js {numberLines: -2}
// https://raw.githubusercontent.com/astridx/maplibre-app/main/src/index.js

import React from 'react'
\
import ReactDOM from 'react-dom'
ReactDOM.render(<></>, document.getElementById('root'))
```

Now the application is ready to run.

### Start application

Now start the application.

```js
npm start
```

You will not see any output in the browser at `http://localhost:3000/` yet. This will change in the next chapter.

> You can find the finished code for this first section on [Github](https://github.com/astridx/maplibre-app/tree/main).

## Setting up the MapLibre map

### Integrate the map

In the `src` folder, create the file `Map.js` that we will use to display the map.

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

I use a [maptiler token](https://cloud.maptiler.com/account/keys) in this tutorial at `https://api.maptiler.com/maps/streets/style.json?key=my_key`, and implement the map with MapLibre and MapTiler. If you want to follow the example yourself, please create your own [access key](https://cloud.maptiler.com/account/keys).

> Note: For learning, inserting the token into the source code is a simplification. In a real system, it should not be visible in the source code. Integrate this via [environment variable](https://create-react-app.dev/docs/adding-custom-environment-variables/).

### Integrate map

Import the component that displays the map into the file `index.js`.

```js {diff}
// index.js
import React from "react";
import ReactDOM from "react-dom";
-ReactDOM.render(<></>, document.getElementById('root'));
+import { Map } from "./Map";
+
+ReactDOM.render(<Map />, document.getElementById("root"));
```

### State of the map

So far you don't see a map. In `react-map-gl` the map status is managed via the viewport object. It contains all information about the state of the map like coordinates, zoom, pitch, size in the browser. To manage this, we use the `useState` hook of React.

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

Every time one of the viewport values in the map changes, `onViewportChange` is triggered, updating our status values.

> You can find the finished code for this section on [Github](https://github.com/astridx/maplibre-app/tree/1_maplibre-map).

## Markers on the MapLibre map

### Hooks

In this example we will use the hooks `useContext`, `useReducer` and `createContext`. First we implement them in the file `src/hooks/mapHook.js`.

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

The complicated structure allows us to minimise reloading of the map during runtime.

> [How to use React Context effectively](http://bit.ly/3gZjYIa) explains the linked post.

### Reducer

In our application, we will add and remove markers from the map. Consequently, we create two actions for our reducer `ADD_MARKER` and `REMOVE_MARKER`.

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

### Integrate into the application

The integration into the application is still missing. We implement this by integrating the `Map` component as a child component in `MapProvider`.

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

### Manage markers dynamically

In our application we want to call `ADD_MARKER` every time the user clicks on the map with the left mouse button.

```js {numberLines: -2}
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

The next step is to display the markers at the saved coordinates. For this we create the two new components `Marker` and `MarkerList`.

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

```js
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

By default, markers are anchored in the upper left corner. Conveniently, there are marker offset properties so that we can move the markers around a bit if necessary.

```js
offsetTop={-48}}
offsetLeft={-24}
```

Now we can display the markers on the map using `<MarkerList />`.

> You can find the finished code for this section on [Github](https://github.com/astridx/maplibre-app/tree/2_context).
