---
date: 2019-12-17
title: 'Custom Fields im Backend integrieren'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-backend-integrieren
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Custom Fields in Joomla! sind in aller Munde. Sie bieten viele zusätzliche Möglichkeiten. Deshalb unterstützt unsere Komponente die benutzerdefinierten Felder.

Dieser Teil zeigt dir, wie du die Unterstützung im Administrationsbereich programmierst. Im nächsten Kapitel zeigen wir den Inhalt der Custom Fields im Frontend an.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t13...t14a) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e2ec43fec6e2c22254228beb71e9c787)


### Geänderte Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e5dfd09c647ca1e552c9016cf918acf3)

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9be56d6cedb2c832265e47642f0afb25)

#### [src/administrator/components/com_foos/src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-83275f4e46bde5a95cd61ce239609370)

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-8e3d37bbd99544f976bf8fd323eb5250)

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-1637778e5f7d1d56dd1751af1970f01b)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-3186af99ea4e3321b497b86fcd1cd757)



## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Du siehst eine weitere Seitenleiste. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text`.

4. Überzeuge dich davon, dass du dieses Feld beim Edieren eines Foo-Items ebenfalls editieren zum Bearbeiten angeboten bekommst.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x2.png)

## Geänderte Dateien

### Übersicht
