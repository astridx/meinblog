---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-02-13
title: 'Eine mehrsprachige Website'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-mehrsprachig
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Dieses Tutorial zeigt dir, wie du eine mehrsprachige Website in Joomla 4 mit dem Standardtemplate Cassiopeia einrichtest.<!-- \index{mehrsprachige Website} -->

Joomla ermöglicht es dir, auf einfache Weise eine mehrsprachige Website zu erstellen, ohne dass wir eine Erweiterung eines Drittanbieters installieren müssen.

Eine mehrsprachige Joomla-Website beginnt mit der Installation der Sprachen, der Erstellung verschiedener Inhaltselemente und endet mit der Veröffentlichung des Inhalts. Hier sind detaillierte Schritte zur Erstellung einer mehrsprachigen Website.

### Sprachen installieren

Es gibt zwei Möglichkeiten, um Sprachen auf einer Joomla-Website zu installieren. Ich wähle in der Regel die Installation über den Live-Server.

#### Sprachen installieren per Live Server

1. Dafür melde ich mich im Joomla-Administrationsbereich an und öffne das Menü `System > Installieren > Sprachen`.

![Joomla 4 | Mehrsprachige Website einrichten | Sprache per Live Server installieren](/images/multiling2.png)

2. Dann installiere ich die gewünschte Sprache, indem ich auf die Schaltfläche `Installieren` klicken.

![Joomla 4 | Mehrsprachige Website einrichten | Sprache installieren](/images/multiling3.png)

Dabei gibt es keine Begrenzung. Es ist möglich, alle Sprachen zu installieren, die als Joomla-Sprachpaket angeboten werden.

#### Sprachen manuell installieren

Neben der Installation über den Live Server ist eine manuelle Installation möglich. Öffne dazu die Website [Joomla Community Übersetzungspakete](https://community.joomla.org/translations.html)[^community.joomla.org/translations.html]. Hier gibt es für jede Sprache ein Zip-Paket, welches per `System > Installieren > Erweiterungen > Installationspaket hochladen` installierbar ist.

![Joomla 4 | Mehrsprachige Website einrichten | Sprache manuell installieren](/images/multiling1.png)

### Inhaltssprachen aktivieren

An dieser Stelle ist es meiner Meinung nach wichtig, den Unterschied zwischen Inhaltssprache und Systemsprache zu kennen. Die Systemsprache ist einfach ausgedrückt die, die die Menüpunkte im Backend übersetz oder im Frontend beschreibende Texte wie "Autor" oder "Erstellt am:" . Der Text eines Artikels ist im Gegensatz dazu der eigentliche Content, also der Inhalt. Damit die Inhalte der Website der richtigen Sprache zugeordnet werden und auch Maschinen einen Text in die korrekte Sprache einordnen, konfigurieren wir die Inhaltsprachen.

1. Das konfigurieren der Inhaltssprache geschieht im Menü `System > Verwalten > Sprachen > Inhaltssprachen`.

![Joomla 4 | Mehrsprachige Website einrichten | Inhaltssprache auswählen](/images/multiling4.png)

2. Wir wählen alle Sprachen aus, in denen wir Content oder Inhalte anbieten möchten. In der Regel stimmten die Inhaltssprachen mit den für das System installierten Sprachen überein.

![Joomla 4 | Mehrsprachige Website einrichten | Inhaltssprache installieren](/images/multiling5.png)

### Aktivieren der Sprach-Plugins

Im nächsten Schritt aktivieren wir zwei Plugins, die zum Betrieb der mehrsprachigen Website notwendig sind.

Das _System Language Filter_ Plugin hilft dir, den Inhalt auf der Grundlage der Sprachauswahl auf der Website anzuzeigen. Dieses Plugin muss aktiviert sein. Bei der Sprachenerkennung für neue Websitebesucher sind folgende Punkte entscheidend:

1. Das Cookie eines vorhergehenden Besuchs.
2. Die Einstellung "Sprachauswahl für neue Besucher" in diesem Plugin.
3. Gegebenenfalls die im Browser eingestellte Sprache.

Das _System Language Code_ Plugin hilft dir, den Sprachcode im HTML-Code der Website zu verstecken. Es spielt eine wichtige Rolle bei der Suchmaschinenoptimierung.

Hier die Schritte, um diese 2 Plugins zu aktivieren:

1. Gehe zu `System > Verwalten > Plugins`

![Joomla 4 | Mehrsprachige Website einrichten | Plugins öffnen](/images/multiling6.png)

2. Verwende Suchbegriffe in der Suchleiste, um die Plugins zu finden.

3. Aktiviere die beiden Plugins: `System - Sprachfilter` und `System - Sprachcode`.

![Joomla 4 | Mehrsprachige Website einrichten | Sprachplugins aktivieren](/images/multiling7.png)

### Mehrsprachiger Inhalt

Sobald die Sprach-Plugins aktiviert sind, können wir damit beginnen, neue Inhalte für jede Sprache hinzuzufügen. Als Beispiel haben ich auf der Demo-Website in diesem Tutorial die Sprachen Deutsch, Spanisch und Französisch zur schon vorinstallierten englischen Sprache hinzugefügt. Die meistgenutztesten Inhalte auf einer Joomla-Website sind Artikel, Kategorien und Module.

#### Neue Kategorien hinzufügen

Um den Inhalt der Website besser zu strukturieren Ich lege für jede Inhaltssprache ein Kategorie an. Um Inhalte in verschiedenen Sprachen zu erstellen, müssen wir für jede Sprache eine neue Kategorie hinzufügen.

1.  Rufe das Menü `Inhalt > Kategorien` auf und erstelle eine neue Kategorie.
2.  Wähle im rechten Bereich die Sprache für die Kategorie aus dem Auswahlfeld Sprache aus.
3.  Speichere die Kategorie wenn du alle Inhalte ergänzt hast
4.  Wiederhole diesen Vorgang für jede Inhaltssprache.

![Joomla 4 | Mehrsprachige Website einrichten | Kategorien](/images/multiling8b.png)

#### Neue Artikel hinzufügen

Artikel sind die wichtigste Inhaltskomponente der Website. Wie die meisten Inhaltstypen bieten sie die Möglichkeit, die Sprache festzulegen. Wenn als Sprache `All` ausgewählt wird, wird der Inhalt allen Inhaltssprachen zugeordnet.

![Joomla 4 | Mehrsprachige Website einrichten | Artikel](/images/multiling8a.png)

Um Artikelinhalte in verschiedenen Sprachen zu erstellen, fügen wir für jede Sprache einen neuen Artikel hinzufügen.

1.  Rufe das Menü `Inhalt > Artikel` auf und erstelle einen neuen Artikel
2.  Wähle im rechten Bereich die Sprache für den Artikel aus dem Auswahlfeld Sprache aus.
3.  Speichere den Artikel wenn du alle Inhalte ergänzt hast
4.  Wiederhole diesen Vorgang für jede Inhaltssprache.

#### Neue Module hinzufügen

Um einen Inhalt an einer bestimmten Position auf festgelegten Unterseiten der Website anzuzeigen nutzen wir Module. Ein Modul ist ebenfalls einer Inhaltssprache zuordenbar.

![Joomla 4 | Mehrsprachige Website einrichten | Module](/images/multiling8c.png)

Auf einer mehrsprachigen Website können wir für jede Sprache unterschiedliche Module anzeigen, je nachdem, welcher Sprache der Inhalt des Moduls zugewiesen ist. Praktisch nutzen wir dies später in diesem Text, um die zur Inhaltssprache passende Navigation anzuzeigen.

### Das Menüsystem für eine mehrsprachige Website einrichten

#### Menüs für jede Sprache hinzufügen

Bei einer mehrsprachigen Website legen wir für jede Sprache ein eigenes Menü an, um eine bessere Kontrolle über Navigation zu haben. Nachfolgend die Schritte im einzelnen:

1.  Navigiere zu `Menü > Manage` und erstelle ein neues Menü

![Joomla 4 | Mehrsprachige Website einrichten | Menü](/images/multiling9a.png)

2.  Wähle im rechten Bereich die Sprache für das Menü aus dem Auswahlfeld Sprache aus.
3.  Speichere das Menü
4.  Wiederhole diesen Vorgang für jede Inhaltssprache.

![Joomla 4 | Mehrsprachige Website einrichten | Für jede Sprache ein Menü](/images/multiling9b.png)

#### Ein Modul für jedes Menü anlegen

Ein Menü wird in Joomla in der Regel über ein Modul angezeigt. Unser Ziel ist es, dass das englische Menü - und nur dieses - angezeigt wird, wenn als Inhaltssprache die englische gewählt ist. Das gleiche gilt analog für jede weitere Inhaltssprache. Um unser Ziel zu erreichen installieren wir für jedes Menü ein Modul, also für jede Inhaltssprache. Dieses Modul ordnen wir der passenden Sprache zu:

1. Navigiere zu `Content | Site Module` und lege ein neues Menü Module an.

![Joomla 4 | Mehrsprachige Website einrichten | Ein Module für das Menü](/images/multiling11a.png)

2.  Wähle das passende Menü und im rechten Bereich die Sprache für das Module aus dem Auswahlfeld Sprache aus.

![Joomla 4 | Mehrsprachige Website einrichten | Das Module konfigurieren](/images/multiling11b.png)

3. Speichere das Modul
4. Wiederhole diesen Vorgang für jede Inhaltssprache.
5. Das Hauptmenü, welches bei der Installation von Joomla automatisch angelegt wurde, benötigen wir nicht mehr und deaktivieren es aus diesem Grund.

![Joomla 4 | Mehrsprachige Website einrichten | Module deaktivieren](/images/multiling11c.png)

6. Überzeuge dich davon, dass im Frontend jederzeit lediglich das zur Inhaltssprache passende Menü angezeigt wird.

![Joomla 4 | Mehrsprachige Website einrichten | Jederzeit das zur Inhaltsprache passende Menü](/images/multiling15.png)

#### Menüpunkte für jede Sprache hinzufügen

Sobald das Menü für jede Sprache erstellt ist, fügen wir neue Menüpunkte hinzu.

1. Öffne das englische Menü und klicke auf `Neuen Menüpunkt hinzufügen` in der Werkzeugleiste.
2. Wähle im rechten Bereich die Sprache für den Menüpunkt aus dem Auswahlfeld Sprache aus. Stelle sicher, dass das korrekte Menü selektiert ist. Lege den Menüpunkt als Standardmenüpunkt fest, falls du dies möchtest.

![Joomla 4 | Mehrsprachige Website einrichten | Für jede Sprache ein Menü](/images/multiling10a.png)

3. Speichere den Menüpunkt
4. Wiederhole diesen Vorgang für jede Inhaltssprache.

### Mehrsprachige Assoziationen

Mehrsprachige Assoziationen werden verwendet, um Artikel oder Menüpunkte einer Sprache in eine andere Sprache umzuleiten, wenn wir auf die Flagge für die Sprachumschaltung klicken. Websitebesucher erwarten, dass sie zur englischen Version eines Artikels gelangen, wenn sie die Inhaltssprache von deutsch auf englisch wechselen. Dies ist allerdings nur möglich, wenn Joomla weiß, welche Artikel oder Menüpunkte zueinander gehören. Sprachverknüpfungen teilen Joomla diese Information mit. Wenn wir die Sprachverknüpfungen nicht setzen, werden wir zum Standardmenünkt einer Sprache weitergeleitet, wenn wir die Inhaltssprache im Frontend wechselen. Dies ist nicht gewünscht und deshalb verknüpfen wir die Inhalte.

#### Assoziationen

Wenn wir einen Menüpunkt hinzufügen und diesem eine Sprache zuweisen, werden die Optionen für Assoziationen angezeigt. Wir finden diese auf der Registerkarte `Assoziationen`. Auswählbar sind die Menüpunkte anderer Inhaltssprachen.

![Joomla 4 | Mehrsprachige Website einrichten | Standardmenüpunkt pro Sprache](/images/multiling12.png)

`Assoziationen` finden wir auch bei anderen Joomla Elemente. Beispielsweise bei Artikeln.

#### Die Komponente Mehrsprachige Assoziationen - Sprachverknüpfungen

Die Komponente `Mehrsprachige Assoziationen` oder `Sprachverknüpfungen` ist ein Werkzeug, das es ermöglicht, assoziierte Elemente nebeneinander zu bearbeiten, ohne hin und her wechseln zu müssen. Sehr komfortabel ist es möglich, ein Element in mehreren Sprachen zu erstellen und gleichzeitig zu assoziieren. Die Side-by-Side-Ansicht ermöglicht es uns, die Elemente nach Auswahl eines Referenzelements zu bearbeiten.

![Joomla 4 | Mehrsprachige Website einrichten | Mehrsprachige Assoziationen - Sprachverknüpfungen - Side-by-Side-Ansicht](/images/multiling13b.png)

Um zu dieser Komponente zu gelangen, navigieren wir zu `Komponenten > Mehrsprachige Zuordnungen / Sprachverknüpfungen`.

![Joomla 4 | Mehrsprachige Website einrichten | Mehrsprachige Assoziationen - Sprachverknüpfungen](/images/multiling13a.png)

### Standardseite für jede Sprache festlegen

Die Standardseite ist die Startseite für jede Sprache. Lege in jedem Menü einen Standardmenüpunkt fest. Wenn du beispielsweise im englischen Hauptmenü auf den Menüpunkt _Home_ als Standard klickst, wird dieser zum Standardmenüpunkt für englischsprachige Seiten.

![Joomla 4 | Mehrsprachige Website einrichten | Standardmenüpunkt pro Sprache](/images/multiling10b.png)

1. Öffnen das englische Hauptmenü und klicke wir auf das Kreissymbol, um den Menüpunkt als Standard für diese Sprache festzulegen.

2. Wiederhole diesen Vorgang für jede Inhaltssprach

### Sprachumschalter-Modul

Dieses Modul zur Sprachumschaltung zeigt eine Liste der verfügbaren Inhaltssprachen an. So kann zwischen diesen hin und her gewechselt werden. Voraussetzung ist, dass Joomla als mehrsprachige Website eingesetzt wird und die Inhaltssprachen wie zurvor erklärt definiert und veröffentlicht wurden.

1. Um den Sprachumschalter einzurichten navigiere zu `Content | Site Module` und lege ein neues Language Switcher Module an.

![Joomla 4 | Mehrsprachige Website einrichten | Language Switcher Module einrichten](/images/multiling14a.png)

2. Ich ordne das Modul der Position languageswitcherload zu.

![Joomla 4 | Mehrsprachige Website einrichten | Language Switcher Module einrichten](/images/multiling14b.png)

3. Sobald das Modul veröffentlicht ist, können wir es im Frontend nutzen.

![Joomla 4 | Mehrsprachige Website einrichten | Language Switcher Module einrichten](/images/multiling14c.png)

Fertig!
<img src="https://vg06.met.vgwort.de/na/25906808dd0944738081d526457820fa" width="1" height="1" alt="">