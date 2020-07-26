---
date: 2019-12-16
title: 'Veröffentlichen und Verstecken'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-veröeffentlichen-und-erstecken
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wenn du mit Joomla! arbeitetest, kennst du es aus anderen Komponenten: Elemente haben einen Status, der veränderbar ist. Dieser Abschnitt zeigt dir, wie du Items versteckst, veröffentlichst, terminierst, archivierst und löschst.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t12...t13) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

####

### Geänderte Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/13.0.0.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-87ec143942c0f306b40e69e84076afef)

####  [src/administrator/components/com_foos/src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-83275f4e46bde5a95cd61ce239609370)

####  [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t12...t13#diff-262e27353fbe755d3813ea2df19cd0ed)

####  [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t12...t13#diff-896f245bc8e493f91277fd33913ef974)

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-38764f2b1343234561c0d02cd2991ea1)

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-2daf62ad6c51630353e31eaa3cc28626)

#### [src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-19bf55010e1963bede0668355cebb307)

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-1637778e5f7d1d56dd1751af1970f01b)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t12...t13#diff-3186af99ea4e3321b497b86fcd1cd757)



## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist wieder geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Deinstallieren und Neuinstallieren ist aufwendig. Deshalb verrate ich dir eine einfachere Methode.

3. Öffne den Bereich `System | Information | Database`.

![Joomla! Published](/images/j4x16x1.png)

4. Wähle deine Komponente aus und klicke auf `Update Structure`. Das war es! Damit hast du die Datenbank auf den neuesten Stand gebracht.

5. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass du hier eine Spalte die mit Status überschrieben ist, siehst. Klicke auf das Symbol in dieser und wechsele so den Zustand von `veröffentlicht` in `versteckt` und umgekehrt.

![Joomla! Published](/images/j4x16x2.png)

6. Öffne ein Element und sieh, dass der Status in dieser Ansicht ebenfalls editierbar ist. Außerdem ist es möglich, ein Datum anzugeben, zu das Item veröffentlich und/oder versteckt wird.

![Joomla! Validierung](/images/j4x16x3.png)

## Geänderte Dateien

### Übersicht
