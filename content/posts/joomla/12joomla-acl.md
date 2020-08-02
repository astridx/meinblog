---
date: 2019-12-12
title: 'ACL'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-acl
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel ist es, dass nicht jeder das Recht hat, alles zu bearbeiten. Dazu bietet Joomla! eine Zugriffskontrollliste, die ACL. Mit dieser handhabst du Benutzerrechte in deiner Komponente.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t9...t10) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-e5dfd09c647ca1e552c9016cf918acf3)

[]()
```

```

#### [src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql](https://github.com/astridx/boilerplate/compare/t9...t10#diff-887ce564d59a60e62da6554aa4e91cd7)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-9be56d6cedb2c832265e47642f0afb25)

[]()
```

```

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-1ff20be1dacde6c4c8e68e90161e0578)

[]()
```

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-262e27353fbe755d3813ea2df19cd0ed)

[]()
```

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t9...t10#diff-896f245bc8e493f91277fd33913ef974)

[]()
```

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-2daf62ad6c51630353e31eaa3cc28626)

[]()
```

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-8e3d37bbd99544f976bf8fd323eb5250)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Erstelle in deiner Komponente ein neues Item. Überzeuge dich davon, dass dir ein Auswahlfeld für das Speichern einer Berechtigung angeboten wird. Der Wert, den du hier eingibst, wird mit dem Element gespeichert und ist bei der Anzeige in einer Liste abfragbar.

![Joomla! Konfiguration](/images/j4x12x1.png)

3. Zur besseren Übersicht wird der Wert in der Hauptansicht angezeigt.

![Joomla! Konfiguration](/images/j4x12x2.png)

4. Öffne die Optionen. Hier hast du die Möglichkeit, die Berechtigungen für die Nutzung der Komponente selbst zu setzten.

![Joomla! Konfiguration](/images/j4x12x3.png)

Spiele mit den Einstellungen herum. Erlaube einmal nur dem Super Admin, neue Elemente in deiner Erweiterung zu erstellen. Melde dich dann als Administrator an und sieh, dass die Schaltfläche `New` verschwunden ist.

## Geänderte Dateien

### Übersicht
