---
date: 2019-12-19
title: 'Mehrsprachigkeit'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-mehrsprachigkeit
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Mit Joomla! ist es möglich, eine mehrsprachige Website einzurichten, ohne Erweiterungen von Dritten zu installieren. In diesem Tutorial zeige ich dir, wie du deine Komponente so programmierst, dass sie Sprachverknüpfungen unterstützt.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14b...t15a) an und übernimm diese Änderungen in deine Entwicklungsversion.

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Installiere über `System | Install | Languages` mindestens eine weitere Sprache.

4. Stelle über `System | Manage | Plugins` sicher, dass das Plugin `Sample Data - Multilingual` veröffentlicht ist.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x1.png)

5. Wechsele zurück zum `Home Dashboard` und installiere die Beispieldateien `Multilinguale Sample Data`.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x3.png)

6. Öffne die Ansicht eines Items deiner Komponente im Administrationsbereich und überzeuge dich davon, dass der Status `Language` änderbar ist. Ändere diesen von `All` in eine beliebige Sprache.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x2.png)

7. Spiele mit den Sprachverknüpfungen und überzeuge dich davon, dass alles korrekt verknüpft wird.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x4.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

8. Erweitere die Tests auf die Komponente `Multilingual Associations`. Diese unterstützt deine Erweiterung ebenfalls.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Geänderte Dateien

### Übersicht
