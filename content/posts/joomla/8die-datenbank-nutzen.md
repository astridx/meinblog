---
date: 2019-12-08
title: 'Die Datenbank nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-datenbank-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Im vorhergehenden Teil hatten wir eine Datenbank für deine Joomla!-Komponenten eingerichtet. In diesem Teil lernst du, wie du mithilfe eines Formulars im Administrationsbereich die Daten änderst oder ergänzt.

Am Ende enthält die Ansicht deiner Komponente im Administrationsbereich eine Schaltfläche zum Hinzufügen von neuen Elementen. Du änderst ein vorhandenes Item, indem du auf den Titel klickst.

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t6...t6b) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-262e27353fbe755d3813ea2df19cd0ed)

[]()
```

```

####  [src/administrator/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-181b1576846350fbb4a7a1a73291de4b)

[]()
```

```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-c1b8160bef2d2b36367dc59381d6bcb7)

[]()
```

```

####  [src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-19bf55010e1963bede0668355cebb307)

[]()
```

```

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1ff20be1dacde6c4c8e68e90161e0578)

[]()
```

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-8e3d37bbd99544f976bf8fd323eb5250)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne als Nächstes, die Ansicht im Administrationsbereich für deine Komponente. Sind die drei Einträge mit Links versehen? Siehst du eine Schaltfläche zum Anlegen eines neuen Items?

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

3. Klicke als Letztes auf die Schaltfläche `Neu` oder auf den Titel eines Elements. Siehst du das Formular zum Anlegen oder Bearbeiten der Items.

![Joomla Componente im Backend bearbeiten](/images/j4x8x2.png)

## Geänderte Dateien

### Übersicht
