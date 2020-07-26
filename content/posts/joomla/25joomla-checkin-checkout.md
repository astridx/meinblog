---
date: 2019-12-25
title: 'Checkin und Checkout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-checkin-checkout
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Durch die Checkout-Funktion werden unerwartete Ergebnisse vermieden, die auftreten, wenn zwei Benutzer denselben Datensatz gleichzeitig editieren. Das Auschecken sperrt ein Item, wenn ein Anwender dieses zu Bearbeitung öffnet. Beim Speichern und Schließen wird es dann wieder freigegeben. Eine sinnvolle Funktion, die wir in dem Teil der Artikelserie integrieren.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t20...t21) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/21.0.0.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-5646e047332531426be00a18128422a6)


### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t20...t21#diff-262e27353fbe755d3813ea2df19cd0ed)

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-896f245bc8e493f91277fd33913ef974)

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-2daf62ad6c51630353e31eaa3cc28626)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-3186af99ea4e3321b497b86fcd1cd757)


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne ein Item in der Bearbeitungsansicht.

4. Wechsele in einen anderen Browser und versuche, das Item erneut zu bearbeiten.

5. Vergewissere dich, dass du ein Symbol siehst, dass dich darauf hinweist, dass dieses Item gesperrt ist.

![Joomla! Sperren/Freigeben](/images/j4x25x1.png)

## Geänderte Dateien

### Übersicht
