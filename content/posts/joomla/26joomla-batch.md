---
date: 2019-12-26
title: 'Stapelverarbeitung/Batch'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-batch
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Joomla! bietet eine Reihe von Funktionen, mit denen es Administratoren möglich ist, mehrere Items auf einen Schlag zu bearbeiten. Diese Stapelverarbeitung (englisch Batch) fügen wir jetzt zur Komponente hinzu. Darauf aufbauend ist dir möglich, eigenen Funktionen hinzuzufügen.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t21...t22) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/tmpl/foos/default_batch.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-65971ae28621cbc5d5d6f2b11fe2da7d)

#### [src/administrator/components/com_foos/tmpl/foos/default_batch_body.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-a9b2d92dcca8384605c7c4c4e7111093)

#### [src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-d653f1f236af4637ec0c4a7ff789bde1)


### Geänderte Dateien

#### [src/administrator/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-181b1576846350fbb4a7a1a73291de4b)

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-c1b8160bef2d2b36367dc59381d6bcb7)

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-8e3d37bbd99544f976bf8fd323eb5250)

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-1637778e5f7d1d56dd1751af1970f01b)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-3186af99ea4e3321b497b86fcd1cd757)

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen. Klicke den Eintrag `Batch`.

![Joomla! Stapelverarbeitung](/images/j4x26x1.png)

3. Teste die Stapelverarbeitung.

![Joomla! Stapelverarbeitung](/images/j4x26x2.png)

## Geänderte Dateien

### Übersicht
