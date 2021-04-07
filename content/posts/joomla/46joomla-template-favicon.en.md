---
date: 2021-01-15
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Favicon'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-favicon
langKey: en
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

A [favicon](https://de.wikipedia.org/wiki/Favicon is a small icon used to identify a website in a recognisable way. It is displayed on different devices when a website is saved as a favourite.

> The size and type of the favicon is expected to be different on different devices. I use the website [realfavicongenerator.net](https://realfavicongenerator.net/) to create the optimal type of my image for each device.

## For the impatient

Look at the changed programme code in the [diff view](https://github.com/astridx/boilerplate/compare/t40...t41) and transfer these changes into your development version.

## Step by step

In this section we create a recognisable image. In the first step, we choose an image. For the example, I chose a yellow PNG file. In the next step, we convert it into different formats using the website [realfavicongenerator.net](https://realfavicongenerator.net/).

### New files

The favicon generator creates 9 files which we copy into our template directory. I put all of them in the directory `templates/facile/ favicon_package`. These are exactly the files

1.  android-chrome-192x192.png
2.  android-chrome-512x512.png
3.  apple-touch-icon.png
4.  browserconfig.xml
5.  favicon-16x16.png
6.  favicon-32x32.png
7.  favicon.ico
8.  mstile-150x150.png
9.  site.webmanifest

### Modified files

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/b5c3e2d5113b6e5441f4a4dc079171daacf66bcb/src/templates/facile/index.php)

In order for the files to be found, new lines in the file `templates/facile/ index.php` are required. The variable `$templatePath` helps me to create the path.

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

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter. Vergewissere dich, dass die Favicons auf den jeweiligen Geräten korrekt angezeigt werden. Nachfolgend siehst du eine Darstellung im Browser Firefox.

![Joomla Template erstellen - Favicon](/images/j4x46x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t36...t37.diff

## Links

[Favicon Generator](https://realfavicongenerator.net/)

todo cassiopeia facicon überschreiben?
