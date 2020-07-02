---
date: 2019-12-04
title: 'Ein Menüpunkt'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: ein-menuepunkt
categories:
  - Code
tags:
  - CMS
  - Joomla
---

In diesem Artikel erfährst du, wie du einen Menüpunkt für die Frontend-Ansicht deiner Komponente erstellst, so dass du die Adresse nicht wissen brauchst und später Umwandlungen in suchmaschinenfreundliche URLs automatisch geschen.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t2...t3) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne den Menümanager, um einen Menüpunkt anzulegen. Klicke dazu in der linken Seitenleite auf `Menü` und dann auf `All Menu Items`.

Klicke danach auf die Schaltfläche `New` und fülle alle notwendigen Felder aus.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x1.png)

3. Den passenden `Menu Item Typ` findest du über die `Select` Schaltfläche.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)

4. Speichere den Menüpunkt.

5. Wechsele anschließend ins Frontend und überzeuge dich davon, dass der Menüpunkt korrekt angelegt ist und funktioniert.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x3.png)

## Geänderte Dateien

### Übersicht
