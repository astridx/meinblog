---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-03-02
title: 'Joomla Standardtemplate Cassiopeia - CSS Schnipsel, WebAssetManager und nützliche Einstellungen'
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










## CSS

Du möchtest das Cassiopeia Templates in Joomla in der Darstellung geringfügig abändern? Dieses Ziel kann mithilfe der Datei `user.css` erreicht werden. In diesem Teil findest du Codeschnipsel für unkomplizierte Anwendungsfälle.<!-- \index{CSS} -->

### Linke Seiteleiste auf schmalen Displays oberhalb des Hauptinhalts anzeigen

Auf Bildschirmen, die schmaler als 992px sind, werden die Module der linken Seitenleiste unterhalb des Inhalts angezeigt. Mit dem folgenden Codeschnipsel kann man sie vor dem Hauptinhalt erscheinen lassen.

```css
@supports (display: grid) {
    .site-grid {
        grid-template-areas: ". banner banner banner banner ." ". top-a top-a top-a top-a ." ". top-b top-b top-b top-b ." ". side-l side-l side-l side-l ." ". comp comp comp comp ." ". side-r side-r side-r side-r ." ". bot-a bot-a bot-a bot-a ." ". bot-b bot-b bot-b bot-b .";
   }
   @media (min-width: 992px) {
    .site-grid {
      grid-template-areas: ". banner banner banner banner ." ". top-a top-a top-a top-a ." ". top-b top-b top-b top-b ." ". side-l comp comp side-r ." ". bot-a bot-a bot-a bot-a ." ". bot-b bot-b bot-b bot-b .";
    }
  }
}
```

### Den Nach-oben-Link in Cassiopeia so konfigurieren, dass dieser immer sichtbar ist

Füge den nachfolgenden Code in die Datei `user.css` ein, wenn es dein Ziel ist, den `Nach-oben-Link` in Cassiopeia so zu konfigurieren, dass dieser immer sichtbar ist und nicht erst am Ende der Seite.<!-- \index{CSS!back to top} --><!-- \index{back to top} --><!-- \index{Nach-oben-Link} -->

```css
#back-top { position: fixed; }
```

### Silbentrennung<!-- \index{CSS!Silbentrennung} -->

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

#### Module auf Positionen untereinander darstellen

Bei den [Modulpositionen](https://blog.astrid-guenther.de/cassiopeia-module-positionen/)[^blog.astrid-guenther.de/cassiopeia-module-positionen/] in Cassiopeia ist `display: flex` definiert. Deswegen werden die Module nebeneinander platziert. Wenn du in der Datei `/media/templates/site/cassiopeia/css/user.css` folgenden Code einfügst, werden die Module der Position `bottom-b` untereinander angezeigt.

```css
.container-bottom-b {
  display: block;
}
```

## WebAssetManager

Du hast ein Child Template oder eine Kopie von Cassiopeia angelegt und möchtest umfangreichere CSS-Änderungen vornehmen?<!-- \index{WebAssetManager} -->

> Die Dokumentation zum WebAssetManager findest du unter [docs.joomla.org](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets]

### joomla.asset.json

Du hast ein Childtemplate angelegt und möchtest die Datei `templates/cassiopeia/joomla.asset.json` verändern. Du kannst diese überschreiben. Wenn dein Template `cassiopeia_child` heißt, dann überschreibt die Datei `templates/cassiopeia_child/joomla.asset.json` mit `templates/cassiopeia/joomla.asset.json`.

### Zusätzliche CSS-Dateien laden

Im Childtemplate oder in einer Kopie von Cassiopeia, kannst du über den nachfolgenden Befehl die Datei `media/templates/site/cassiopeia_child/css/custom.css` laden. Trage den Befehl in der Datei `index.php` des kopierten oder erbenden Templates ein. 

```php
$wa->registerAndUseStyle('template.custom', 'custom.css', ['weight' => '500', 'dependencies' => ['template.active','template.active.language']]);
```

> Es gibt eine Option `weight`. Dies ist ein Mechanismus zur Sortierung der Reihenfolge der Assets. In der Datei `/libraries/src/WebAsset/WebAssetManager.php` findest du die Methode `calculateOrderOfActiveAssets()`, die sich auf [Kahn's_algorithm](https://en.wikipedia.org/wiki/Topological_sorting#Kahn.27s_algorithm) bezieht.

## Einstellungen

### Frontend Editing

#### Die Registerkarte "Bilder und Links" für die Bearbeitung im Frontend<!-- \index{Frontendbearbeitung!Bilder und Links} -->

Joomla 4 erlaubt autorisierten Benutzern, Artikel vom Frontend aus zu bearbeiten. Aber: standardmäßig sieht man die Registerkarte "Bilder und Links" nicht bei der Frontendbearbeitung. Wie erreicht man die Anzeige?
- Wechsele im Joomla 4 Administrator-Dashboard zu "System" > "Einrichtung" > "Globale Konfiguration".
- Klicke auf "Artikel" in der linken Spalte.
- Klicke in den Artikeloptionen auf die Registerkarte "Layout bearbeiten" und dann auf "Anzeigen". 
- Nach dem Speichern wird der Tabulator "Bilder und Links" bei der Frontendbearbeitung angezeigt.