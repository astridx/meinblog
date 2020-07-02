---
date: 2019-12-02
title: 'Joomla Update und Change Log einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-update-und-change-logeinrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Du wirst deine Ihre Komponente weiterentwickeln. Wie stellst du sicher, dass die User immer die neueste Version verwenden? Woher wissen sie von einem Update? Jetzt, wo das Grundgerüst der Erweiterung fertig ist, ist es wichtig das deine Anwender von Weiterentwicklungen erfahren.

In diesem Kapitel erläutere ich dir, wie du einen Update-Server für deine Komponente erstellst und ausführst.

Update Server klingt etwas kompliziert, im Grunde ist es nur eine URL zu einer XML-Datei, die in der XML-Installationsdatei angegeben ist. Diese XML enthält eine Reihe von Details, einschließlich der neuen Version und der Download-URL. Wenn Joomla! eine Aktualisierung findet, wird dies im Administrationsbereich angezeigt.

![Joomla Update Server](/images/j4x2x3.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1...t1b) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus Teil 1 weiter.

2. Als Nächstes erstellst du eine weitere Version. Ändere dazu die Versionsnummer im Manifest oder bearbeite den nächsten Teil. Vorher ist nicht möglich, den Update Server zu testen. Es gibt bisher keine Aktualisierung. Ich schreibe dir hier aber schon einmal, was genau nach dem Erstellen der nächsten Version passiert.

3. Wenn alles funktioniert siehst du nach der Installation diese Anzeigen vor dir.

![Joomla Update Server](/images/j4x2x1.png)

4. Öffne System Update Extension. Hier wird dir die Aktualisierung für deine Komponente angeboten. Falls dies nicht der Fall ist, klicke auf die Schaltfläche `Find Updates`.

5. Beim ersten Öffnen siehst du den Hinweis `The Download Key` is missing, weil du das Element `dlid` im Manifest eingetragen hast.

6. Füge einen Download Key über `System | Update Sites` hinzu. Klicke hierzu auf den Namen deiner Komponente. Dann siehst du das Textfeld, in das du einen beliebigen Wert einträgst. Zum jetzigen Zeitpunkt wird dieser beim Abruf des Updates nicht geprüft. Speichere den Wert.

![Joomla Update Sites](/images/j4x2x2.png)

5. Wenn du zurück zu System Update Extension navigierst, ist es dir möglich, eine Aktualisierung anzustoßen und dir das Changelog anzusehen.

![Joomla Update Server](/images/j4x2x3.png)

## Geänderte Dateien

Die Änderungen, die das Changelog und den Joomla Update Server betreffen, zeige ich nur hier. In jedem weiteren Kapitel ist erforderlich, dass du die Nummern anpasst. Das ist kein Hexenwerk. Wenn ich dies immer wieder neu beschrieb, langweilte dich das nicht nur - es blähte diesen Text unnötig auf.

### Übersicht
