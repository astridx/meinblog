---
date: 2019-12-07
title: 'Eine Joomla-Datenbank für deine Erweiterung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: eine-joomla-datenbank-fuer-deine-erweiterung
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Deine Ansicht im Administrationsbereich enthält in der Regel nicht nur statischen Text. Du zeigst hier Daten an, die dynamisch sind. So arbeiten zumindest die meisten Erweiterungen. Deshalb legen wir in diesem Teil eine Datenbank für deine Komponente an.

In der Datenbank speichern wir bei der Einrichtung drei Datensätze und zeigen diese im Administrationsbereich an. Es wird eine statische Liste ausgegeben. Änderbar sind die einzelnen Einträge über das Backend nicht. Daran arbeiten wir im nächsten Teil.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t5...t6) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! erstellt bei der Installation die Datenbank für dich.

2. Teste als Nächstes, ob du die Ansicht im Administrationsbereich für deine Komponente fehlerfrei angezeigt bekommst. Siehst du drei Einträge? Diese hatten wir beim Einrichten der Datenbank als Beispieldaten angelegt.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## Geänderte Dateien

### Übersicht
