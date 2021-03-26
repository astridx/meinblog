---
date: 2021-01-11
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Web Asset Manager'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-wa
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t38...t39) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

> Ich hatte bereits geschrieben, dass du Web Assets ebenfalls über die Datei `joomla.asset.json` integrieren kannst.  


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

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t36...t37.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)

auch mein scss plugin

https://docs.joomla.org/J4.x:Web_Assets/de



    {
      "name": "searchtools",
      "type": "style",
      "uri": "system/searchtools/searchtools.min.css"
    }
    falls fontentend editing


$wa  = $this->getWebAssetManager();
$wa->registerAndUseStyle('main', $templatePath . '/assets/css/main.css');
reicht wenn keine json datei