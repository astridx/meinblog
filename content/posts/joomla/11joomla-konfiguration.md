---
date: 2019-12-11
title: 'Konfiguration'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-konfiguration
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Dinge, die du konfigurierbar anzubieten planst? Dann ist dieser Teil wichtig für dich. Hier zeige ich dir, wie du eine Konfiguration auf die Joomla! typische Art und Weise zu deiner Komponente hinzufügst.

![Joomla! Konfiguration](/images/j4x11x2.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t8...t9) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-9be56d6cedb2c832265e47642f0afb25)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-1ff20be1dacde6c4c8e68e90161e0578)

[]()
```

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-8e3d37bbd99544f976bf8fd323eb5250)

[]()
```

```

####  [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-599caddf64a6ed0c335bc9c9f828f029)

[]()
```

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-a33732ebd6992540b8adca5615b51a1f)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass dir rechts oben die Schaltfläche `Options` angezeigt wird.

![Joomla! Konfiguration](/images/j4x11x1.png)

3. Klicke auf `Options` und stelle die Anzeige des Labels nach deinen wünschen ein.

![Joomla! Konfiguration](/images/j4x11x2.png)

4. Öffne als Letztes, die Ansicht im Frontend. Verhält die Anzeige des Labels sich so, wie du das im Administrationsbereich eingestellt hast?

![Joomla! Konfiguration](/images/j4x11x3.png)

## Geänderte Dateien

### Übersicht
