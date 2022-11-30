---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'SVGs in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-styling-svg
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## SVGs in React

In einer modernen React-Anwendung sind SVG-Dateien heutzutage unumgänglich. Viele Elemente gestaltest du intuitiver mithilfe eines Symbols. Vorteil des SVG-Formates gegenüber anderen Grafikformaten sind die geringe Dateigröße, die Flexibilität und die Skalierbarkeit ohne Qualitätsverlust. In diesem Abschnitt verwenden wir eine [skalierbare Vektorgrafik](https://de.wikipedia.org/wiki/Scalable_Vector_Graphics) als Symbol in einer unserer Komponenten.

Wir nutzen hier als Ausgangsbasis den im Abschnitt **Styling in React** erstellten Code. 

Das Symbol, welches wir verwenden, stammt von [Flaticons Freepick](https://www.flaticon.com/authors/freepik). Viele der SVGs auf dieser Website sind frei verwendbar, wenn der Autor angeben wird. Downloade das Symbol von [hier](https://www.flaticon.com/free-icon/check_109748) als SVG und füge es unter dem Namen *src/check.svg* in dein Projekt ein. Ich empfehle dir, die Datei selbst herunterzuladen und alle Schritte nachzuvollziehen. Der Vollständigkeit halber gebe ich dir nachfolgend zusätzlich die SVG-Definition:

{title="Code Playground",lang="html"}
```
<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   viewBox="0 0 297 297" style="enable-background:new 0 0 297 297;" xml:space="preserve">
  <g>
    <path d="M113.636,272.638c-2.689,0-5.267-1.067-7.168-2.97L2.967,166.123c-3.956-3.957-3.956-10.371-0.001-14.329l54.673-54.703
      c1.9-1.9,4.479-2.97,7.167-2.97c2.689,0,5.268,1.068,7.169,2.969l41.661,41.676L225.023,27.332c1.9-1.901,4.48-2.97,7.168-2.97l0,0
      c2.688,0,5.268,1.068,7.167,2.97l54.675,54.701c3.956,3.957,3.956,10.372,0,14.328L120.803,269.668
      C118.903,271.57,116.325,272.638,113.636,272.638z M24.463,158.958l89.173,89.209l158.9-158.97l-40.346-40.364L120.803,160.264
      c-1.9,1.902-4.478,2.971-7.167,2.971c-2.688,0-5.267-1.068-7.168-2.97l-41.66-41.674L24.463,158.958z"/>
  </g>
</svg>
```

Da wir die **Create React App** App verwenden, ist es ohne weiteres möglich, SVGs (ähnlich wie CSS) als React-Komponenten zu importieren. Füge hierzu in die Datei *src/App.js* die folgende Anweisung ein:

```js
import React from 'react';
import axios from 'axios';

import './App.css';
# start-insert
import { ReactComponent as Check } from './check.svg';
# end-insert
```

Wir nutzen die importierte SVG-Datei für unsere Schaltfläche. Übergebe anstelle eines Textes die SVG-Komponente zusammen mit den Attributen `height` und `width`:

```js
const Item = ({ item, onRemoveItem }) => (
  <div className="item">
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <button
        type="button"
        onClick={() => onRemoveItem(item)}
        className="button button_small"
      >
# start-insert
        <Check height="18px" width="18px" />
# end-insert
      </button>
    </span>
  </div>
);
```

Unabhängig davon, welchen Styling-Ansatz du verwendest, ist es möglich, dem SVG-Symbol einen Hover-Effekt zuzuweisen. Im normalen CSS würde dies in der Datei *src/App.css* wie folgt aussehen:

{title="src/App.css",lang="css"}
```
.button:hover > svg > g {
  fill: #ffffff;
  stroke: #ffffff;
}
```

Die **Create React App** unterstützt dich bei der Verwendung von SVGs. Alles Notwendige ist in der App vorkonfiguriert. Wenn du ein React-Projekt mit Build-Tools wie Webpack von Grund auf selbst erstellst, hast du Mehraufwand. In jedem Fall werten SVGs deine Anwendung auf, da sie klein, flexibel und ohne Qualitätsverlust skalierbar sind. Verwende dieses Grafikformat, wann immer es möglich ist.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/CSS-in-React-SVG).
  * Reflektiere die [Änderungen gegenüber dem Abschnitt **Styling in React**](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/CSS-in-React...hs/CSS-in-React-SVG?expand=1).
* Lese mehr zum Thema [SVGs in der Create React App](https://create-react-app.dev/docs/adding-images-fonts-and-files).
* Lese mehr zum Thema [SVG-Hintergrundmuster in React](https://www.robinwieruch.de/react-svg-patterns).
* Integriere ein weiteres SVG-Symbol in deine Anwendung.
* Binde die Drittanbieter Bibliothek [react-fontawesome](https://github.com/FortAwesome/react-fontawesome) in deine Anwendung ein und verwende deren SVG-Symbole.
