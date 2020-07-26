---
date: 2019-12-15
title: 'Kategorien im Backend einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-kategorien-im-backend-einrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Fast jede Website teilt ihre Inhalte in Kategorien ein. Joomla! bietet dieses nützliche Feature ebenfalls. Der aktuelle Teil des Tutorials zeigt dir, wie du Kategorien idealerweise in eine Joomla! Komponente integrierst. Erfinde das Rad nicht selbst neu. Nutze das, was Joomla! dir bietet.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t11b...t12) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/12.0.0.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-d7cb057651fb85156ba13996b6a045c8)


### Geänderte Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-e5dfd09c647ca1e552c9016cf918acf3)

####  [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1ff20be1dacde6c4c8e68e90161e0578)

####  [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-262e27353fbe755d3813ea2df19cd0ed)

####  [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-7aceee287e50092f4d9e6caaec3b8b40)

####  [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-896f245bc8e493f91277fd33913ef974)


#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-38764f2b1343234561c0d02cd2991ea1)

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-2daf62ad6c51630353e31eaa3cc28626)

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-1637778e5f7d1d56dd1751af1970f01b)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t11b...t12#diff-3186af99ea4e3321b497b86fcd1cd757)

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Öffne die Ansicht deiner Komponenten im Administrationsbereich.

3. In der Seitenleiste siehst du einen neuen Menüpunkt. Dieser bietet dir alles, was du zum Anlegen und Bearbeiten der Kategorien deiner Komponente benötigst.

![Joomla! Validierung](/images/j4x15x1.png)

4. Öffne als Nächstes ein Element. Überzeuge dich davon, dass es möglich ist, diesem eine Kategorie zuzuordnen.

![Joomla! Validierung](/images/j4x15x2.png)

Die Kategorien helfen dir, im Frontend deine Daten strukturiert anzuzeigen. Die Ansichten erstellen wir im weiteren Verlauf dieser Artikelserie.

## Geänderte Dateien

### Übersicht
