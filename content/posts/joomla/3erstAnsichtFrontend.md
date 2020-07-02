---
date: 2019-12-02
title: 'Die erste Ansicht im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-erste-ansicht-im-frontend
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Nachdem du ein funktionierendes Backend für deine Komponente hast, implementierst du das Frontend. Aktuell ist es mit der Erweiterung möglich, einen statischen Text anzuzeigen. Wir haben bisher keine dynamischen Daten. Aber das wird sich bald ändern. Zunächst bauen wir die grobe Struktur auf. Nachfolgend siehst du die simple Ansicht.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1b...t2) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla! Version 4, um sie zu testen:

Führe eine neue Installation durch. Dies ist erforderlich, da die neuen Dateien im Frontend sonst nicht erkannt werden. Deinstalliere hierzu deine bisherige Installation und Kopiere alle Dateien erneut.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! richtet bei der bei der Installation Namespaces für dich ein.

2. Öffne dann in einem Browser die Adresse `JOOMLA4/index.php?option=com_foos&view=foo`. Du siehst die eben erstelle Frontend-Ansicht.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

## Geänderte Dateien

Der Administrationsbereich unserer Komponente ist im Ordner com_foos unter /Administrator/component. Jetzt arbeiten wir am Frontend, das im im Ordner com_foos unter / components gespeichert ist.

### Übersicht
