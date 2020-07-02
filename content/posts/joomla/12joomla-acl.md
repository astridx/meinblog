---
date: 2019-12-12
title: 'ACL'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-acl
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel ist es, dass nicht jeder das Recht hat, alles zu bearbeiten. Dazu bietet Joomla! eine Zugriffskontrollliste, die ACL. Mit dieser handhabst du Benutzerrechte in deiner Komponente.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t10...t11a) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Erstelle in deiner Komponente ein neues Item. Überzeuge dich davon, dass dir ein Auswahlfeld für das Speichern einer Berechtigung angeboten wird. Der Wert, den du hier eingibst, wird mit dem Element gespeichert und ist bei der Anzeige in einer Liste abfragbar.

![Joomla! Konfiguration](/images/j4x12x1.png)

3. Zur besseren Übersicht wird der Wert in der Hauptansicht angezeigt.

![Joomla! Konfiguration](/images/j4x12x2.png)

4. Öffne die Optionen. Hier hast du die Möglichkeit, die Berechtigungen für die Nutzung der Komponente selbst zu setzten.

![Joomla! Konfiguration](/images/j4x12x3.png)

Spiele mit den Einstellungen herum. Erlaube einmal nur dem Super Admin, neue Elemente in deiner Erweiterung zu erstellen. Melde dich dann als Administrator an und sieh, dass die Schaltfläche `New` verschwunden ist.

## Geänderte Dateien

### Übersicht
