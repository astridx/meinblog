---
date: 2019-12-30
title: 'Frontend Editing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-frontend-editing
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Es gibt mehrere Gründe dafür, einem Anwender das Editieren im Frontend zu ermöglichen. Zum einen finden Nutzer das benutzerfreundlicher. Oder, einem Administrator ist es wichtig, den Zugriff auf den Administrationsbereich nicht freigeben. Deshalb statten wir unsere Komponente im nächsten Schritt mit der Möglichkeit aus, Items im Frontend zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24b...t25) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Erstelle einen Menüpunkt

![Joomla! Frontend Bearbeitung](/images/j4x30x1.png)

3. Öffne den Menüpunkt im Frontend

![Joomla! Frontend Bearbeitung](/images/j4x30x2.png)

4. Stelle sicher, dass du das Icon zum Editieren bei der Detailanszeige eines Elements siehst.

![Joomla! Frontend Bearbeitung](/images/j4x30x3.png)

## Geänderte Dateien

### Übersicht

https://github.com/joomla/joomla-cms/pull/24311/files
