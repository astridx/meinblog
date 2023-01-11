---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-03-02
title: 'Joomla Standardtemplate Cassiopeia - CSS Schnipsel'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-css-schnipsel
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Du möchtest das Cassiopeia Templates in Joomla in der Darstellung geringfügig abändern? Dieses Ziel kann mithilfe der Datei `user.css` erreicht werden. In diesem Beitrag findest du Codeschnipsel für unkomplizierte Anwendungsfälle. 

### Den Nach-oben-Link in Cassiopeia so konfigurieren, dass dieser immer sichtbar ist

Füge den nachfolgenden Code in die Datei `user.css` ein, wenn es dein Ziel ist, den `Nach-oben-Link` in Cassiopeia so zu konfigurieren, dass dieser immer sichtbar ist und nicht erst am Ende der Seite.<!-- \index{CSS!back to top} --><!-- \index{back to top} --><!-- \index{Nach-oben-Link} -->

```css
#back-top { position: fixed; }
```

### Silbentrennung

#### Normale Silbentrennung

Die Silbentrennung aktiviert man per CSS mit der Eigenschaft `hyphens`. Die Silbentrennung nutzt die Regeln der Sprache, die im [HTML-Language Code](http://www.w3schools.com/tags/ref_language_codes.asp)[^w3schools.com/tags/ref_language_codes.asp] angegeben ist. 

```css
body {
  hyphens: auto;
}
```

Weitere Informationen: [hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)[developer.mozilla.org/en-US/docs/Web/CSS/hyphens] und [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)[^developer.mozilla.org/en-US/docs/Web/CSS/word-break]

> Vielleicht hilfreich: `<wbr>` Word Break: Das Wort wird ohne Bindestrich umgebrochen, wenn nicht ausreichend Platz zur Verfügung steht. Beispiel: `Hunde<wbr>leine`. `&shy;` Soft Hyphen: Das Wort wird mit Bindestrich umgebrochen, wenn nicht ausreichend Platz zur Verfügung steht. Beispiel: `Hunde&shy;leine`. `&nbsp;` Non Breaking Space: Wenn der Zeilenumbruch zwischen zwei Wörtern verhindert werden soll, muss ein geschütztes Leerzeichen eingefügt werden. Beispiel: `3&nbsp;cm`.

#### Trennung erzwingen

Die Eigenschaft `overflow-wrap` gibt an, ob der Browser Zeilen mit langen Wörtern umbrechen kann, wenn diese über den Container hinaus laufen. Gerade in der mobilen Ansicht, ist ein solches Hinausragen nicht benutzerfreundlich. Beim Wischen verschiebt sich die gesamte Ansicht. Mit dem Wert `anywhere` wird ein Umbruch erzwungen. Weitere Informationen bei [selfhtml.org](https://wiki.selfhtml.org/wiki/CSS/Eigenschaften/overflow-wrap)[^wiki.selfhtml.org/wiki/CSS/Eigenschaften/overflow-wrap]

```css
body {
  overflow-wrap: anywhere;
}
```



