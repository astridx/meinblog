---
date: 2021-03-04
title: 'Ein Tutorial zur Verwendung des Cassiopeia-Templates für Joomla 4 - Warum Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: warum-cassiopeia
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---


## Soll ich Cassiopeia oder ein 3rd Party Joomla Template verwenden?

Das Cassiopeia Template ist die Frontend-Vorlage, die in einer Joomla 4-Installation enthalten ist. Cassiopeia ist ein unkompliziertes Template, dabei es ist responsive für die korrekte Darstellung auf einer Vielzahl von Geräten und barrierefrei.

Wir haben die Wahl, diese mitgelieferten Template für das Frontend zu verwenden oder ein Template eines Drittanbieters zu installieren. Dies ist eine Entscheidung, die wir bereits bei der Entwicklung einer Website treffen sollten. Verschiedene Joomla Templates stellen Inhalt auf sehr unterschiedliche Weise dar.

Cassiopeia ist ein guter Ausgangspunkt, wenn wir nur ein paar Änderungen am Aussehen und an der Funktionalität der Website vornehmen möchten. 

### Cassiopeia als Basis für ein eigenes Joomla Template

Das Cassiopeia-Template kann so angepasst werden, dass es genau so aussieht, wie wir es wünschen. Es beinhaltet die grundlegenden Komponenten von Joomla. Änderungen an den Dateien innerhalb von Cassiopeia können vorgenommen werden, um eine Website zu erstellen, die den speziellen Anforderungen entspricht.

#### Erscheinungsbild

Wir können das grundlegende Erscheinungsbild von Cassiopeia relativ einfach verändern, wenn wir die CSS-Stylesheets verstehen. Wir können Farben, Schriftarten, Hintergründe und Spaltenbreiten einfach durch Hinzufügen oder Bearbeiten von Zeilen in einem Stylesheet namens `user.css` ändern. Ändere nicht die Datei `template.css`, die mit Cassiopeia geliefert wird, da Ihre Änderungen bei einem Upgrade von Joomla überschrieben werden.

#### Layout

Es ist möghlich größere Änderungen am Layout vorzunehmen oder Modulpositionen hinzuzufügen. Dazu bearbeitet man die Dateien `index.php` und eventuell die `templateDetails.xml`. Um Änderungen auf dieser Ebene vorzunehmen, sollten wir ein gutes Verständnis von HTML-Markup haben. Die Datei `index.php` ist ein PHP-Skript, das für das ordnungsgemäße Laden der Website unerlässlich ist. Wir sollten zumindest genug wissen, um grundlegende Konzepte von PHP zu verstehen.

#### Funktionalität

Wenn wir ein Verständnis der Joomla-API haben, können wir Cassiopeia ändern. Wir können Änderungen an der `index.php` vornehmen und Template Overrides hinzufügen. Die Joomla-API ist die Schnittstelle, die Informationen aus den Kerndateien bietet, um die Webseite zu erstellen.

#### Joomla Aktualisierungen

Wenn wir Änderungen am Cassiopeia Template vornehmen, laufen wir Gefahr, diese Änderungen zu verlieren, wenn wir Joomla aktualisieren. Deshalb müssen wir entsprechende Vorsichtsmaßnahmen treffen. Fügen wir ein benutzerdefiniertes Stylesheet hinzu und führen wir ein Protokoll und kommentieren wir alle Änderungen, die wir an den Template-Dateien vornehmen. Wir können die modifizierte Cassiopeia-Vorlage kopieren und umbenennen oder ein [Child Template](https://github.com/joomla/joomla-cms/discussions/32442) erstellen, damit Joomla-Upgrades die Dateien nicht überschreiben.

### Verwendung von 3rd Party Templates für Ihre Joomla-Seite

Templates von Drittanbietern sind Templates, die sofort einsatzbereit sind. Wir müssen kein Styling vornehmen. Wir können einfach anfangen, unseren eigenen Inhalt hinzuzufügen. Es gibt kostenlose Templates und solche, die kostenpflichtig sind.

Drittanbietertemplates können einfach oder ziemlich kompliziert sein. Sie können viele Einstellungen haben, um die Seite einzigartig aussehen zu lassen. Diese Einstellungen unmfassen die Wahl der Schriftart, der Farben, des Layouts und der Hintergründe. Diese Templates bieten teilweise eine große Auswahl an Positionen für Module oder andere spezielle Möglichkeiten zur Darstellung des Inhalts.

#### Es gibt Vor- und Nachteile bei der Verwendung von Drittanbietertemplates.

##### Pros

- das Template ist sofort einsatzbereit, wir verbringen keine Zeit mit dem Styling
- Drittanbietertemplates können sehr schöne Funktionen oder Optionen haben, die die Attraktivität der Website erhöhen
- Drittanbietertemplates können speziell für die Zusammenarbeit mit anderen Erweiterungen, wie beispielsweise Shops, Social, Foren usw., konzipiert sein

##### Kontra

- das Template kann kostenpflichtig sein, oder wir müssen andere kostenpflichtige Erweiterungen hinzufügen, um die gewünschte Funktionalität zu erhalten.
- das Template ist möglicherweise nicht für das nächste große Upgrade für Joomla verfügbar
- Drittanbietertemplates können ziemlich kompliziert anpassbar sein
- die Kerndateien können umfangreiche Überschreibungen haben, die später Probleme mit einigen Joomla-Funktionen verursachen
- wir verlassen sich auf das Fachwissen und die Fähigkeiten anderer Entwickler
- Drittanbietertemplates können Sicherheitsrisiken oder andere Schwachstellen hinzufügen

### Dinge, auf die Sie achten sollten, wenn Sie 3rd-Party-Templates verwenden

Informiere dich, bevor Sie Templates von Drittanbietern installieren.

- Wähle ausschließlich Templates aus zuverlässigen Quellen. 
- Vergewissere dich, dass das Template mit der neuesten Version von Joomla funktioniert.
- Schaue dir die  Bewertungen für das Template an.
- Mache eine Suche im [Joomla-Forum](https://forum.joomla.de/), um zu sehen, ob es viele Beiträge mit Problemen im Zusammenhang mit dem Tamplate gibt.
- Gibt es Support für das Template?
- Gibt es ein Forum, um zu recherchieren oder Fragen zu stellen?
- Wird der Template-Anbieter mit neuen Versionen von Joomla Schritt halten?
