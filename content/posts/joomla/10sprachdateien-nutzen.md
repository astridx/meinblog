---
date: 2019-12-10
title: 'Sprachdateien nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: sprachdateien-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel war, dass deine Erweiterung mehrsprachig ist! Deshalb hast du die Texte, die im Frontend angezeigt werden, nicht direkt in den Programmcode eingegeben. Du hattest alles so vorbereitet, dass du spezielle Dateien nutzt, die austauschbar sind. Bisher hast du deshalb lange kryptische Texte gesehen. In diesem Teil übersetzten wir die unschönen Sprachstrings.

> Selbst wenn deine Zielgruppe die englisch Sprache spricht und du ausschließlich diese Sprache unterstützt ist es wichtig, eine Sprachdatei für den gesamten Text zu verwenden, den du im Front-End oder im Back-End der Komponente anzeigst. So ist es potentiellen Nutzern möglich, Texte zu überschreiben, ohne den Quellcode zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t7...t8) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cb357e383d05f82d66215fa10abf3bde)

[]()
```

```

#### [src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-0bb25b2f8499b27811f2a24af0dd3987)

[]()
```

```

####  [src/administrator/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cbdc0f2989570582624b6f9332e7c2f2)

[]()
```

```

####  [src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-2a376eb220cf55ce50bb756c0cd9bf59)

[]()
```

```

#### [src/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-9c71769b65375e899db729d95b37c96e)

[]()
```

```

#### [src/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-43a9aed65969ca2daddc1de76e8664a6)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t7...t8#diff-1ff20be1dacde6c4c8e68e90161e0578)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t7...t8#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()
```

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t7...t8#diff-a33732ebd6992540b8adca5615b51a1f)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und Frontend und überzeuge dich davon, dass die Texte lesbar und nicht mehr kryptisch sind.

![Joomla! Sprachdateien werden genutzt](/images/j4x10x1.png)

## Geänderte Dateien

### Übersicht
