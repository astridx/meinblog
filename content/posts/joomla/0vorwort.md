---
date: 2020-11-30
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Vorwort'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tutorial-vorwort
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wenn du neu bei Joomla bist, lese bitte [Absolute Grundlagen der Funktionsweise einer Komponente](https://docs.joomla.org/Special:MyLanguage/Absolute_Basics_of_How_a_Component_Functions)[^docs.joomla.org/Absolute_Basics_of_How_a_Component_Functions/de].

Dieses Tutorial ist für Joomla 4 gedacht. Informationen zum Erstellen einer Komponente für Joomla 3 findest du unter [Entwickeln einer Model-View-Controller-Komponente / 3.x](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/de)[^docs.joomla.org/J3.x:Developing_an_MVC_Component/de].

Du brauchst Joomla 4.x für dieses Tutorial. Joomla 4 findest du bei [GitHub](https://github.com/joomla/joomla-cms/)[^github.com/joomla/joomla-cms] auf der [Entwickler-Website](https://developer.joomla.org/nightly-builds.html)[^developer.joomla.org/nightly-builds.html] oder erstelle eine kostenlose Website unter [launch.joomla.org](https://launch.joomla.org).

## Ziel dieses Tutorial?

Dieses Tutorial erstellt kein praktisches Beispiel. Ich habe absichtlich alles allgemein gehalten. Mein Hauptanliegen ist es, dir zu zeigen, wie Joomla funktioniert - und es dabei selbst besser zu verstehen. Am Ende ersetzt du den Namen `foo` in allen Dateien durch den Namen deiner Komponente und erweiterst diese um deine besonderen Anforderungen. Wenn du magst, kannst du das Skript [github.com/astridx/boilerplate/blob/t43/duplicate.sh](https://github.com/astridx/boilerplate/blob/t43/duplicate.sh) hierfür verwenden.

> Daher ist dieses Tutorial in erster Linie für Programmierer gedacht, die eine neue Komponente erstellen möchten und Joomla bisher nicht kennen. Das Tutorial ist auch eine Hilfe für Programmierer einer Joomla 3 Komponente, wenn diese Ihre Komponente für Joomla 4 erweitern. Wenn du beispielsweise an der Validierung arbeiten deiner Joomla 3 Komponente arbeiten möchtest, findest du in Kapitel 11 das, was du benötigst - nicht mehr und nicht weniger.

## Die Struktur dieses Tutorials

Jedes Kapitel baut auf dem vorherigen auf. Wenn du dich jedoch für ein bestimmtes Thema interessierst, sieh dir gerne ein separates Kapitel an.

Es gibt viele Beispiele für Komponenten im Standard Joomla. Beispielsweise

- com_content
- com_banner
- com_tags oder
- com_contact

In jeder Komponente siehst du Implementierungsdetails im Zusammenhang. Jede ist komplex und das Finden und Trennen bestimmter Elemente, wie beispielsweise Seitennummerierung oder benutzerdefinierte Felder, ist mühsam. Dieses Tutorial konzentriert sich in einem Kapitel auf ein Detail.

> Du erstellst eine Komponente für Joomla 4, unter Verwendung der vielen integrierten Joomla-Implementierungen. Du erfindest das Rad nicht neu. Joomla bietet eine ganze Reihe von Standardfunktionen.

Wenn du sofort loslegen möchtest, blätter zu [Die erste Ansicht im Backend](/die-erste-ansicht-im-backend). Nachfolgend findest du einige Dinge zu Joomla 4, die du für die Bearbeitung nicht zwingend benötigst. Manches davon ist aber _gut zu Wissen_.

## Grundlagen

### Joomla 4 bietet fünf Arten von Erweiterungen

- [Komponenten](https://docs.joomla.org/Special:MyLanguage/Component/de):
  Eine Komponente ist der Hauptteil der Site. Eine Komponente übernimmt die Datenmanipulation sowie die Eingabe und Speicherung in die Datenbank. Eine Komponente auf den meisten Websites steht im Mittelpunkt der Seite.
- [Module](https://docs.joomla.org/Special:MyLanguage/Module/de):
  Ein Modul ist ein Add-On zur Site, das die Funktionalität erweitert. Es nimmt einen sekundären Teil der Webseite ein und wird nicht als primärer Fokus einer Seite betrachtet. Es wird an verschiedenen Positionen angezeigt und es ist auswählbar, auf welchen aktiven Menüelementen es ausgegeben wird. Module sind leichte und flexible Erweiterungen. Man verwendet sie für kleine Teile der Seite, die im Allgemeinen weniger komplex sind und über verschiedene Komponenten hinweg angezeigt werden.
- [Plugins](https://docs.joomla.org/Special:MyLanguage/Plugin/de):
  Ein Plugin bearbeitet die Ausgabe, die vom System generiert wurde. Es wird normalerweise nicht als separater Teil der Site aufgerufen. Es nimmt Daten aus anderen Quellen und bearbeitet diese vor dem Anzeigen. Ein Plugin funktioniert normalerweise hinter den Kulissen.
- [Sprachen](https://docs.joomla.org/Language/de):
  Die grundlegendsten Erweiterungen sind Sprachen. Im Wesentlichen bestehen die Sprachpaketdateien aus Schlüssel/Wert-Paaren, die die Übersetzung statischer Textzeichenfolgen im Joomla Quellcode ermöglichen.
- [Templates](https://docs.joomla.org/Special:MyLanguage/Templates/de):
  Ein Template ist das Design deiner Joomla Website.

### Joomla 4 besteht aus fünf verschiedenen Anwendungen

- Installation (wird für die Installation von Joomla verwendet und muss nach der Installation gelöscht werden);
- Administrator (Backend - zum Verwalten von Inhalten);
- Öffentlich oder Website (Frontend - zur Anzeige von Inhalten);
- CLI (wird für den Zugriff auf Joomla über die Befehlszeile und für Cron-Jobs verwendet);
- API (Webdienste - zum Erstellen von APIs für maschinenzugängliche Inhalte);

## Basiswissen

### Ändere niemals die Kerndateien.

Der Zweck von Joomla-Erweiterungen ist es, ein System zu haben, das erweitert werden kann. Es ist möglich, dass dein Code und der Joomla Core Code unabhängig voneinander mit neuen Funktionen versehen werden können.

Wenn du Änderungen an Joomla selbst vornimmst, werden diese mit dem nächsten Update überschrieben.

Du hast das Gefühl, dass deine Funktion nur mit einem Core-Hack umgesetzt werden kann? Ihr Gefühl ist falsch! Es gibt immer eine Lösung, die die Systemdateien unangetastet lässt.

### Lerne von den Kerndateien

Dass du die Systemdateien nicht verändern solltest, heißt nicht, dass du sie gar nicht erst ansiehst. Ganz im Gegenteil! Beim Lesen wirst du auf viel Code stoßen, der nirgends dokumentiert ist. Wenn du dir nicht sicher bist, wie du eine Funktion am besten implementierst, stöbere einfach im Joomla-Code herum. Die Lösung findet sich meist im Herzen von Joomla.

### Die Datei autoload_psr4.php

Während der Installation werden Einträge in der `/library/autoload_psr4.php` vorgenommen. Das ist neu in Joomla 4. Falls auf du merkwürdige Probleme stößt, lösche diese Datei. Sie wird beim nächsten Laden neu erstellt. Manchmal löst sich so ein Problem.

### Namespace

Beachte das Namespace-Tag oben in jeder Datei

`Namespace FooNamespace\Component\Foos\Administrator\View\Foos;`

und als Tag in der Manifestdatei

`<Namespace>FooNamespace\Component\Foos</ Namespace>`.

Warum Namespaces verwenden?

- Klassen werden so in einer definierten Struktur organisiert und
- automatisch über den `Classloader` geladen.
- Beispiel `ContentModelArticles` wird zu `Joomla\Component\Content\Administrator\Model\ArticlesModel`
- `JLoader` kann die Namespaces automatisch verarbeiten
- Wir können zwischen Front-End- und Back-End-Klassen unterscheiden
- Dateien mit Namespaces findest du unter [`/src`](https://github.com/joomla/joomla-cms/pull/27687)

### Großschreibung von Ordnernamen

Du wirst vielleicht bemerken, dass einige der Joomla 4.x Ordner- und Dateinamen mit Großbuchstaben und andere mit Kleinbuchstaben beginen. Auf den ersten Blick scheint dies chaotisch. Auf den zweiten Blick macht es Sinn.

Die Ordner in Großbuchstaben enthalten PHP-Klassen mit Namespace. Diejenigen in Kleinbuchstaben enthalten XML-Dateien, Templatedateien, usw. . Es gibt einige Ordner mit Kleinbuchstaben die PHP-Dateien enthalten (aufgrund von Rückwärtskompatibilität) wie die Helfer-Dateien.

Weitere Informationen findest du unter: [https://github.com/joomla/joomla-cms/issues/22990](https://github.com/joomla/joomla-cms/issues/22990)

### Die Klassen erhalten aussagekräftigere Namen

Die Komponenten-MVC-Klassen haben in Joomla 4 aussagekräftigere Namen. Beispielsweise haben die Controller jetzt Controller als Suffix für ihren Klassennamen. So wird `FooNamespace\Component\Foos\Administrator\Controller\Foos` zu `FooNamespace\Component\Foos\Administrator\Controller\FoosController`.

Zusätzlich erhält der Standard-Controller, der in Joomla 3 nur Controller heißt, den Namen `DisplayController`, um besser zu reflektieren, was die Klasse tut.

Siehe: https://github.com/joomla/joomla-cms/pull/17624

### Benötigst du in jedem Ordner deiner Komponente eine leere Datei index.html?

Die `index.html` ist nicht mehr erforderlich, da das Verzeichnislisten [in der Standardkonfiguration nicht zulässig](https://github.com/joomla/joomla-cms/pull/4171) ist.
Wenn du weiter interessiert bist: Hier ist die Diskussion zum Thema in einer [Google Group](https://groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s) zu finden.

### Technische Anforderungen

Weißt du wie die Verantwortlichen bei Joomla entscheiden, welche Funktionen unterstützt werden und was nicht weiter verfolgt wird? Dafür gibt es das [Statistik-Plugin](https://developer.joomla.org/about/stats.html). Dank der Benutzer, die diese Erweiterung aktivieren, fließen wichtige Informationen in die Entwicklung ein.

### Alternative Syntax für Kontrollstrukturen

PHP bietet eine [weitere Schreibweise](https://www.php.net/manual/de/control-structures.alternative-syntax.php) für Kontrollstrukturen an. Diese ist vor allem praktisch, wenn man größere Blöcke HTML direkt ausgibt - ohne `echo` zu benutzen. Nutze diese in Template-Dateien. So bleiben die übersichtlich.

```php
<?php foreach ($this->items as $i => $item) : ?>
<?php echo $item->name; ?>
</br>
<?php endforeach; ?>
```

anstelle von

```php
foreach ($this->items as $i => $item) {
	echo $item->name;
	echo '</br>';
}
```

Auf diese Art und Weise ist eine einzelne Zeile in sich geschlossen und HTML-Code ist trotzdem übersichtlich strukturiert.

### Datenbanktabellenpräfix

Erweiterungsentwickler, die die Datenbank verwenden, entwickeln die Erweiterung so, dass das Präfix variable ist. Sie nutzen die Zeichenkette `#__`, um immer den korrekten String wiederzugeben. Dies wird zur Laufzeit von Joomla durch die passende Zeichenfolge ersetzt.

### Wo lege ich JavaScript-, CSS- und Bilddateien ab, die zu meiner Komponente gehören?

Speichere diese Daten im Verzeichnis `media` im Joomla-Wurzelverzeichnis. So ist es möglich, diese zu überschreiben. Dies ist insbesondere bei CSS-Dateien vorteilhaft. Um das Design einheitlich zu gestalten. Die [Best Praxis Richtlinien](https://docs.joomla.org/Development_Best_Practices) empfehlen dies ebenfalls.

### Fontawesome Icons

Du möchtest Icons einsetzen aber keine eigene Bibliothek hinzufügen.

Nutze im Frontend und im Backend die freien Icons der Seite [fontawesome.com/icons](https://fontawesome.com/icons). Zumindest wenn du die Standardtemplates _Cassiopeia_ und _Atum_ nutzt, funktioniert das. Falls dein Template FontAwesome nicht unterstützt, kannst du die Icons selbst über den WebassetManager nachladen. In Joomla werden sie mitgeliefert. Das Markieren als [Abhängigkeit](https://github.com/joomla/joomla-cms/blob/75ef0b10ee31a768d279f04e5278bafee3b23a78/templates/cassiopeia/joomla.asset.json#L14) reicht aus.

> Achtung: In Joomla Core Dateien kann nicht einfach so abgeguckt, weil Joomla ein `icon-` davor setzt. Das wird später [hier](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/scss/_icomoon.scss)[^github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/scss/_icomoon.scss] für Fontawesome umgewandelt. Auf diese Art funktionieren lediglich die Icons, die in dieser Datei für das Mappen vorgesehen sind.

Der HTML-Code

```css
<i class="fas fa-align-left"></i>
```

zeigt dann beispielsweise das Linkbündig-Zeichen an.
