---
date: 2021-01-11
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Favicon'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-favicon
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

facicon https://realfavicongenerator.net/


Download your package:
Extract this package in the root of your web site. If your site is http://www.example.com, you should be able to access a file named http://www.example.com/favicon.ico.
Insert the following code in the <head> section of your pages:

<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">



## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t40...t41) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

#### Module

##### []()

```php

```

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Template Style Facile als aktiv.

3. Installiere die Beispieldaten für die Tests

4. Rufe die URL `joomla-cms4/index.php?tp=1` auf.

![Joomla Template erstellen - Favicon](/images/j4x46x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t36...t37.diff

## Links

[Favicon Generator](https://realfavicongenerator.net/)
