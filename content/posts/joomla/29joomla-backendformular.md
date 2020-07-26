---
date: 2019-12-29
title: 'Backendformular aufräumen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-backendformular
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Der Administrationsbereich hat sich gefüllt. Die einzelnen Parameter habe ich bisher ohne Struktur eingefügt. Es ist benutzerfreundlich, wenn in einer Anwendung die Ansichten einheitlich sind. So findet sich jeder schnell zurecht. Es ist nicht erforderlich, dass man sich in jede neue Erweiterung einarbeitet. In diesem Teil des Tutorials räumen wir die Ansicht im Administrationsbereich. Dabei haben das Ziel die Darstellung an die Stand Standardansichten im Content Management System anzupassen. So sieht dein Backend aufgeräumt und `joomlamäßig` aus.

![Joomla! Ansicht im Backend](/images/j4x29x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24...t24b) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

Nichts Neues.

### Geänderte Dateien

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t24...t24b#diff-1637778e5f7d1d56dd1751af1970f01b)



## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Editiere ein Item und vergewissere dich davon, dass die Darstellung so ist, wie du es in Joomla! erwartest.

![Joomla! Ansicht im Backend](/images/j4x29x1.png)

## Geänderte Dateien

### Übersicht
