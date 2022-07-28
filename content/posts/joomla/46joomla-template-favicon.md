---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-04
title: 'Template - Favicon'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-favicon
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Ein [Favicon](https://de.wikipedia.org/wiki/Favicon) ist ein kleines Symbol, das dazu dient, eine Website auf erkennbare Weise zu kennzeichnen. Es erscheint auf verschiedenen Geräten auf unterschiedliche Weise. Meistens sieht man es als Symbol in den Favoriten, wenn man die Website hier speichert, um in Zukunft schneller aufrufen zu können. Fast immer sind die Tabulatoren im Internet-Browser mit dem Symbol versehen.<!-- \index{Template!Favicon} -->

> Die Größe und der Typ des Favicon wird auf unterschiedlichen Geräten anders erwartet. Ich nutze die Website [realfavicongenerator.net](https://realfavicongenerator.net/), um die optimale Form meines Bildes für die jeweiligen Geräte zu erstellen. Ich sehe dieses Werkzeug als erprobt und am einfachsten in der Handhabung an. Es gibt allerdings eine alternative neuere Vorgehensweise. Diese wird vom Joomla Standardtemplate Cassiopeia verwendet. Falls du lieber das moderne SVG-Format mit einer ICO-Datei als Rückfallebene verwendest, findest du unter [Favicon im Joomla-Template](https://blog.astrid-guenther.de/cassiopeia-favicon) eine Lösung die besser zu dir passt.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t40...t41)[^github.com/astridx/boilerplate/compare/t40...t41] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt schaffen wir einen Wiedererkennungswert. Im ersten Schritt wählen wir ein Image. Für das Beispiel habe ich eine gelbe PNG-Datei gewählt. Im nächsten Schritt wandeln wir diese mithilfe der Website [realfavicongenerator.net](https://realfavicongenerator.net/) in unterschiedliche Formate.

> Tipp: Lösche den Browser-Cache, falls beim Entwickeln Änderungen des Favicons nicht sichtbar werden.

### Neue Dateien

Der Favicon-Generator erstellt 9 Datei, die wir in unser Template-Verzeichnis kopieren. Ich habe alle im Verzeichnis `templates/facile/ favicon_package` abgelegt. Es handelt sich dabei genau um die Files

1.  android-chrome-192x192.png
2.  android-chrome-512x512.png
3.  apple-touch-icon.png
4.  browserconfig.xml
5.  favicon-16x16.png
6.  favicon-32x32.png
7.  favicon.ico
8.  mstile-150x150.png
9.  site.webmanifest

### Geänderte Dateien

##### templates/facile/ index.php

Damit die Dateien gefunden werden, sind Einträge in der Datei `templates/facile/ index.php` erforderlich. Die Variable `$templatePath` hilft mir beim Erstellen des relativen Pfades.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/b5c3e2d5113b6e5441f4a4dc079171daacf66bcb/src/templates/facile/index.php)

```php {diff}
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <jdoc:include type="styles" />
     <jdoc:include type="scripts" />
+
+    <link rel="apple-touch-icon" sizes="180x180"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/apple-touch-icon.png">
+    <link rel="icon" type="image/png" sizes="32x32"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-32x32.png">
+    <link rel="icon" type="image/png" sizes="16x16"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-16x16.png">
+    <link rel="manifest" href="<?php echo $templatePath . '/favicon_package'; ?>/site.webmanifest">
+    <meta name="msapplication-TileColor" content="#da532c">
+    <meta name="theme-color" content="#ffffff">
+
     <script type="module" src="https://unpkg.com/dark-mode-toggle"></script>
 </head>
```

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen: Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter. Vergewissere dich, dass die Favicons auf den jeweiligen Geräten korrekt angezeigt werden. Nachfolgend siehst du eine Darstellung im Browser Firefox.

![Joomla Template erstellen - Favicon](/images/j4x46x1.png)

## Links

[Favicon Generator](https://realfavicongenerator.net/)[^realfavicongenerator.net]
<img src="https://vg08.met.vgwort.de/na/1630284284b44cfba6398486d1e8d599" width="1" height="1" alt="">
