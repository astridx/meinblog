---
date: 2020-12-27
title: 'Joomla 4.x Tutorial - Extension Development - Help'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-hilfe
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Eine selbsterklärende Software ist ideal. Aber welches Programm ist das schon? Eine Hilfe ist aus diesem Grund immer eine sinnvolle Ergänzung.

![Joomla Hilfelink](/images/j4x27x1.png)

## For impatient people

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t22...t23) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Step by step

### New files

In diesem Kapitel werden ausschließlich Dateien geändert.

### Geänderte Dateien

Zwei Zeilen pro Ansicht reichen aus, um rechts oben eine Schaltfläche anzuzeigen, die ein Fragezeichen enthält und eine beliebige Internetadresse als Linkziel hat. Ich habe unoriginell `http://joomla.org` als Beispiel gewählt. Das Prinzip ist klar. Du hast die Möglichkeit für jede `View` eine Hilfedatei unter einem einheitlichen Ressourcenzeiger (URL) abzulegen und in der Ansicht der Komponente zu verlinken - genau da, wo in der Regel Fragen auftauchen.

#### [administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t22...t23#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[administrator/components/com_foos/ src/ View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/af04f8493aa045e8bcb2a49b8b1f8a60a927d78a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
+

```

#### [administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t22...t23#diff-8e3d37bbd99544f976bf8fd323eb5250)

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/af04f8493aa045e8bcb2a49b8b1f8a60a927d78a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
+

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf den Hilfelink und vergewissere dich davon, dass du zu der von dir eingegebenen Hilfeseite weitergeleitet wirst.

![Joomla Hilfelink](/images/j4x27x1.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t22...t23

## Links
