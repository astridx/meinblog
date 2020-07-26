---
date: 2019-12-20
title: 'Filtern, Sortieren, Suchen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-filtern-sortieren-suchen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Filtern, Sortieren und Suchen - jetzt bringen wir Ordnung in deine Joomla! 4 Komponente! Joomla bietet Ansichtsfilter und Suchwerkzeuge, mit denen du die Anzahl der sichtbaren Items einschränkst. Wenn der Statusfilter entsprechend gesetzt ist, werden nur Elemente angezeigt, deren Status veröffentlicht ist. Neben dem Statusfilter bieten die Suchwerkzeuge die Suche nach Titel oder Inhalt und die Möglichkeit die Tabelle zu sortieren, sprich die Reihenfolge zu ändern.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t15a...t16) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/forms/filter_foos.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-680833320598887b6d6cc4feb95d4408)

#### [src/administrator/components/com_foos/sql/updates/mysql/16.0.0.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-49ec0cc94fa89db6f20d60195f94c0fe)

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-262e27353fbe755d3813ea2df19cd0ed)

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-896f245bc8e493f91277fd33913ef974)

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-2daf62ad6c51630353e31eaa3cc28626)

####  [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-8e3d37bbd99544f976bf8fd323eb5250)

####  [src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-00a681faa92b56a5268be6268afbe52f)

####  [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-3186af99ea4e3321b497b86fcd1cd757)

#### [src/administrator/components/com_foos/tmpl/foos/modal.php](https://github.com/astridx/boilerplate/compare/t15a...t16#diff-aeba8d42de72372f42f890d454bf928e)


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich und filter, sortiere und suche nach Items in deiner Komponente.

![Joomla! Filtern Sortieren und Suchen -Searchtools](/images/j4x20x1.png)

## Geänderte Dateien

### Übersicht
