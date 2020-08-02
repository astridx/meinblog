---
date: 2019-12-28
title: 'Featured'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-featured
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Manche Items sind etwas Besonderes und für sie gibt es in Joomla! ein spezielles Attribut: `featured`. Dieser Teil der Artikelserie fügt `featured` zu unserer Komponente hinzu.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t23...t24) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql](https://github.com/astridx/boilerplate/compare/t23...t24#diff-adb53beac2e127edac496abfa3c7bb0c)

[]()
```

```

#### [src/components/com_foos/src/View/Featured/HtmlView.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-3b300f4a420f00b560f4d6563e755204)

[]()
```

```

#### [src/components/com_foos/tmpl/featured/default.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-12fc2f2fbc661ff6c184bde121707548)

[]()
```

```

#### [src/components/com_foos/tmpl/featured/default.xml](https://github.com/astridx/boilerplate/compare/t23...t24#diff-ed5a4e7e95701b93a85d2bb4a6cd0829)

[]()
```

```

#### [src/components/com_foos/tmpl/featured/default_items.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-e50432f32d93661fd61575d3789b75a4) 

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t23...t24#diff-262e27353fbe755d3813ea2df19cd0ed)

[]()
```

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t23...t24#diff-896f245bc8e493f91277fd33913ef974)

[]()
```

```

#### [src/administrator/components/com_foos/src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-83275f4e46bde5a95cd61ce239609370)

[]()
```

```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-c1b8160bef2d2b36367dc59381d6bcb7)

[]()
```

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-2daf62ad6c51630353e31eaa3cc28626)

[]()
```

```

#### [src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)

[]()
```

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-8e3d37bbd99544f976bf8fd323eb5250)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()
```

```

#### [src/components/com_foos/src/Model/FeaturedModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-37eef9f609bf1f517dc937af031f8641)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Die Liste enthält eine Spalte die mit `featured` überschrieben ist.

![Joomla! Featured](/images/j4x28x2.png)

3. Öffne ein Item in der Bearbeitungsansicht und überzeuge dich davon, dass du hier das Attribut `featured` zum Bearbeiten angeboten bekommst.

![Joomla! Featured](/images/j4x28x2.png)

4. Lege einen Menüpunkt vom Type `featured` an.

![Joomla! Featured](/images/j4x28x3.png)

5. Wechsele ins Frontend und stelle sicher, dass unter dem Menüpunkt `featured` ausschließlich Items angezeigt werden, bei denen das Attribut gesetzt ist.

![Joomla! Featured](/images/j4x28x4.png)

## Geänderte Dateien

### Übersicht
