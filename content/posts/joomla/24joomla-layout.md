---
date: 2019-12-24
title: 'Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-layout
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Manchmal ist es erforderlich, die Darstellung im Frontend unterschiedlich zu gestalten. Hierfür ist grundsätzlich das Template zuständig. Eine Erweiterung ist für die Ausgabe von Inhalten verantwortlich, nicht mehr und nicht weniger. Trotzdem gibt es Anwendungsfälle für unterschiedliche Layouts. Wie du diese für eine Ansicht einbaust, ist Thema des folgenden Artikels.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t19...t20) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

####  [src/components/com_foos/tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-cf093e47c9ffd0b7b3b78ec39042ac8f)

####  [src/components/com_foos/tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-7176b16bc7f23a2478b1d0755d568b83)

#### [src/components/com_foos/tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-51b2e02f000a9a06e0fc5a6cfd9456c9)

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-262e27353fbe755d3813ea2df19cd0ed)

####  [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-599caddf64a6ed0c335bc9c9f828f029)

####  [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-c77adeff4ff9e321c996e0e12c54b656)

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und Kopiere alle Dateien erneut. In einem frisch installierten System ist die Erklärung der Layouts unkomplizierter.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Stelle bei einem Item ein spezielles Layout ein. Ich habe `withhead` bei dem Item mit der ID 2 gesetzt.

![Joomla! Layouts](/images/j4x24x1.png)

3. Sie dir die Ausgabe im Frontend an. Gibt dazu die URL `JOOMLA4/?option=com_foos&id=2&view=foo` in der Adresszeile des Browsers ein. Du siehst das ausgewählte Layout. Überzeuge dich davon, dass die Eingabe von `JOOMLA4/?option=com_foos&id=1&view=foo` das Standardlayout aufruft - sofern kein spezielles eingestellt ist.

4. Dieses Layout ist ebenfalls per Menüpunkt ansteuerbar.

![Joomla! Pagination](/images/j4x24x2.png)

> Ein Item ohne XML-Datei ist nicht im Administrationsbereich auswählbar. Trotzdem sind solche Layouts sinnvoll! Im Programmcode ist es an jeder Stelle möglich, dieses zuzuweisen: `$this->setLayout('withheadandfoot');`

> Da bei der Ansteuerung über einen Menüpunkt die Ansicht einheitlich erwartet wird, wird das im Menüitem eingestellte Layout bevorzugt.

### Übersicht
