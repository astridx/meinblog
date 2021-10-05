---
date: 2021-03-04
title: 'Ein Tutorial zur Verwendung des Cassiopeia-Templates für Joomla 4 - Warum Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: warum-cassiopeia
langKey: de
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

## Sollte ich Cassiopeia oder eine Joomla-Vorlage eines Drittanbieters verwenden?

Das Cassiopeia Template ist das Frontend-Template, das standardmäßig in einer Joomla 4-Installation enthalten ist. Cassiopeia ist eine unkomplizierte Vorlage. Es ist responsiv. Das bedeutet, dass es den Inhalt auf verschiedenen Geräten korrekt anzeigt. Außerdem ist es barrierefrei.

Wer Joomla 4 installiert, steht vor der Wahl, entweder dieses mitgelieferte Template für das Frontend zu verwenden oder ein Template eines Drittanbieters zu installieren. Dies ist eine Entscheidung, die während der Entwicklung einer Website getroffen werden sollte. Zwar sind in Joomla das Design und der Inhalt getrennt und der Wechsel des Templates ist jederzeit möglich. Aber: Verschiedene Joomla-Templates stellen Inhalte auf sehr unterschiedliche Weise dar. Das hat Auswirkungen auf den Inhalt. Wenn dein Template zum Beispiel Bilder in den Vordergrund stellt, wirst du den Text sicherlich kürzer und präziser halten und mehr Wert auf die Auswahl der Bilder legen. Dies ist häufig bei Vorlagen für Fotografen oder für Präsentationen der Fall. Wenn du eine Vorlage hast, bei der die Texte den Hauptteil ausmachen, dann gehst du beim Hinzufügen des Inhalts den umgekehrten Weg.

Cassiopeia ist ein guter Ausgangspunkt, wenn dir die Standardansicht von Joomla 4 gefällt und du nur ein paar Änderungen am Aussehen und der Funktionalität vornehmen möchtest. Außerdem findest du in den Joomla-Foren die meiste Unterstützung für dieses Template.

### Cassiopeia als Basis für ein eigenes Joomla Template

Das Cassiopeia-Template kann so angepasst werden, dass es genau so aussieht, wie wir es wünschen. Es beinhaltet die grundlegenden Komponenten von Joomla. Änderungen an den Dateien innerhalb von Cassiopeia können vorgenommen werden, um eine Website zu erstellen, die den speziellen Anforderungen entspricht.

#### Erscheinungsbild

Wir können das grundlegende Erscheinungsbild von Cassiopeia relativ einfach verändern, wenn wir die CSS-Stylesheets verstehen. Wir können Farben, Schriftarten, Hintergründe und Spaltenbreiten einfach durch Hinzufügen oder Bearbeiten von Zeilen in einem Stylesheet namens `user.css` ändern. Ändere nicht die Datei `template.css`, die mit Cassiopeia geliefert wird, da Ihre Änderungen bei einem Upgrade von Joomla überschrieben werden.

#### Layout

Es ist möghlich größere Änderungen am Layout vorzunehmen oder Modulpositionen hinzuzufügen. Dazu bearbeitet man die Dateien `index.php` und eventuell die `templateDetails.xml`. Um Änderungen auf dieser Ebene vorzunehmen, sollten wir ein gutes Verständnis von HTML-Markup haben. Die Datei `index.php` ist ein PHP-Skript, das für das ordnungsgemäße Laden der Website unerlässlich ist. Wir sollten zumindest genug wissen, um grundlegende Konzepte von PHP zu verstehen.

#### Funktionalität

Wenn wir ein Verständnis der Joomla-API haben, können wir Cassiopeia ändern. Wir können Änderungen an der `index.php` vornehmen und Template Overrides hinzufügen. Die Joomla-API ist die Schnittstelle, die Informationen aus den Kerndateien bietet, um die Webseite zu erstellen.

#### Was wichtig ist: Joomla-Updates

Wenn wir Änderungen am Cassiopeia Template direkt vornehmen, laufen wir Gefahr, dass diese Änderungen verloren gehen. Beim Aktualisieren von Joomla können Dateien überschrieben werden. Nur im Fall der `user.css` können wir sicher sein, dass sie erhalten bleibt. Daher ist es ratsam, Vorkehrungen zu treffen. Je nach Änderung ist es empfehlenswert, diese zu protokollieren. Am besten ist es allerdings, Cassiopeia zu kopieren, die Kopie der Vorlage umzubenennen und diese als Template zu verwenden. Der Nachteil in diesem Fall ist, dass Aktualisierungen von Cassiopeia selbst nicht automatisch in unsere Kopie übernommen werden.

> Vielleicht wird es in Zukunft möglich sein, [Child Templates](https://github.com/joomla/joomla-cms/pull/32896)[^https://github.com/joomla/joomla-cms/pull/32896] in Joomla zu verwenden. Wenn Sie diese Funktion verwenden, werden Aktualisierungen im Haupt-Template automatisch in die Kopien übernommen. Das Kind erbt vom Elternteil.

### Verwendung von Templates von Drittanbietern für deine Joomla-Website

Templates von Drittanbietern sind Templates, die sofort einsatzbereit sind, d.h. wir müssen kein Styling vornehmen, weil wir ein Template wählen, das unseren Anforderungen entspricht. Wir können direkt damit beginnen, unseren eigenen Inhalt hinzuzufügen. Es gibt kostenlose Templates und solche, die kostenpflichtig sind.

Templates von Drittanbietern können einfach oder recht kompliziert sein. Sie können viele Einstellungen beinhalten, um der Seite ein einzigartiges Aussehen zu verleihen. Zu diesen Einstellungen gehören die Wahl der Schriftarten, Farben, des Layouts und der Hintergründe. Diese Templates bieten teilweise eine große Auswahl an Positionen für Module oder andere spezielle Möglichkeiten zur Darstellung des Inhalts.

> Im deutschsprachigen Forum sind Links zu Template-Anbietern in [Joes Liste](https://forum.joomla.de/thread/69-template-gesucht-joe-s-liste/)[^forum.joomla.de/thread/69-template-searched-joe-s-liste/] gesammelt.

#### Die Verwendung von Drittanbieter-Templates hat ihre Vor- und Nachteile.

##### Vorteile

- Das Template ist sofort einsatzbereit, wir müssen keine Zeit mit dem Styling verbringen
- Templates von Drittanbietern können sehr nützliche Funktionen oder Optionen haben, die die Attraktivität der Website erhöhen
- Templates von Drittanbietern können speziell für die Zusammenarbeit mit anderen Erweiterungen wie Shops, Social Media, Foren usw. konzipiert sein.

##### Nachteile

- Das Template kann kostenpflichtig sein, oder wir müssen andere kostenpflichtige Erweiterungen hinzufügen, um die gewünschte Funktionalität zu erhalten.
- das Template ist möglicherweise bei der nächsten großen Aktualisierung von Joomla nicht mehr verwendbar.
- Templates von Drittanbietern können recht kompliziert in der Anpassung sein
- die Kerndateien können umfangreiche Overrides beinhalten, die später Probleme mit einigen Joomla-Funktionen verursachen
- wir sind auf das Fachwissen und die Fähigkeiten der Template-Entwickler angewiesen
- Templates von Drittanbietern können Sicherheitsrisiken oder andere Schwachstellen mit sich bringen

### Dinge, auf die du achten solltest, wenn du Templates von Drittanbietern verwendest.

Informiere dich, bevor du Templates von Drittanbietern installierst.

- Wähle ausschließlich Templates aus zuverlässigen Quellen.
- Stellen Sie sicher, dass das Template mit der neuesten Version von Joomla funktioniert.
- Schaue dir die Rezensionen für das Template an.
- Führe eine Suche im [Joomla-Forum](https://forum.joomla.org/)[^forum.joomla.org] durch, um zu sehen, ob es viele Beiträge mit Problemen im Zusammenhang mit dem Template gibt.
- Gibt es Support für das Template?
- Gibt es ein Forum zur Klärung etwaiger Probleme?
- Wird der Anbieter des Templates das Template an neue Versionen von Joomla anpassen?

<img src="https://vg04.met.vgwort.de/na/9f0eb5b645a94bca8af59b83e00c9f19" width="1" height="1" alt="">