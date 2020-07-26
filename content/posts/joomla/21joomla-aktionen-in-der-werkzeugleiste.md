---
date: 2019-12-21
title: 'Aktionen in der Werkzeugleiste'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-aktionen-in-der-werkzeugleiste
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Du entwickelst die Erweiterung nicht zum Selbstzweck. Sie hilft dabei, Aufgaben zu erledigen. Damit die Menschen, die mit der Komponente arbeiten, immer den Überblick über die möglichen Arbeitsschritte haben, empfiehlt sich eine Werkzeugleiste. In diesem Teil der Tutorialserie ergänzen wir die Standardaktionen. Hierbei greifen wir auf eine Vielzahl vorgefertigter Methoden zu. Wieder ist es nicht nötig, das Rad selbst zu erfinden.

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t16...t17) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

Wir ändern in diesem Kapitel lediglich Dateien, es kommt keine neue hinzu.

### Geänderte Dateien

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-8e3d37bbd99544f976bf8fd323eb5250)

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen.

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x1.png)

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x.png)

## Geänderte Dateien

### Übersicht
