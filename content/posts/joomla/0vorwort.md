---
date: 2019-11-30
title: 'Vowort'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tutorial-vorwort
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wenn du neu bei Joomla! bist, lese bitte [Absolute Grundlagen der Funktionsweise einer Komponente](https://docs.joomla.org/Special:MyLanguage/Absolute_Basics_of_How_a_Component_Functions).

Dieses Tutorial ist für Joomla 4 gedacht. Informationen zum Erstellen einer Komponente für Joomla® 3 findest du unter [Entwickeln einer Model-View-Controller-Komponente / 3.x](https://docs.joomla.org/J3.x:Developing_an_MVC_Component%7C).

Du brauchst Joomla! 4.x für dieses Tutorial (zum Zeitpunkt des Schreibens von Joomla! 4.0.0-alpha11-dev). Sie können Joomla! 4 unter [GitHub](https://github.com/joomla/joomla-cms/tree/4.0-dev) auf der [Entwickler-Website](https://developer.joomla.org/nightly-builds.html) oder erstelle eine kostenlose Website unter [https://launch.joomla.org](https://launch.joomla.org).

## Für wen ist dieses Tutorial?

Dieses Tutorial erstellt kein praktisches Beispiel. Ich habe absichtlich alles allgemein gehalten. Mein Hauptanliegen ist es, dir zu zeigen, wie Joomla! funktioniert - und es dabei selbst besser zu verstehen. Am Ende ersetzt du den Namen "foo" in allen Dateien durch den Namen deiner Komponente und erweiterst diese um deine besonderen Anforderungen. 

> Daher ist dieses Tutorial in erster Linie für Programmierer gedacht, die eine neue Komponente erstellen möchten.
Das Tutorial ist auch eine Hilfe für Programmierer einer Joomla! 3 Komponente, wenn diese Ihre Komponente für Joomla! 4 erweitern. Wenn du beispielsweise an der Validierung arbeiten deiner Joomla 3 Komponente arbeiten möchtest, findest du in Kapitel 11 das, was du benötigst - nicht mehr und nicht weniger.

## Die Struktur dieses Tutorials

Jedes Kapitel baut auf den vorherigen Builds auf. Wenn du dich jedoch für ein bestimmtes Thema interessierst, sieh dir gerne ein separates Kapitel an.

Es gibt viele Beispiele für Komponenten im Standard Joomla!. Beispielsweise
* com_content
* com_banner
* com_tags oder
* com_contact

In jeder Komponente siehst du bestimmte Implementierungen. Jede Komponente ist komplex und das Finden und Trennen bestimmter Elemente der Implementierung, wie z. B. Seitennummerierung, benutzerdefinierte Felder ..., ist mühsam und umständlich.

> Mit diesem Tutorial erstellst du eine Komponente für Joomla! 4, unter Verwendung der vielen integrierten Joomla-Implementierungen. Du erfindest das Rad nicht bei allem neu. Joomla! bietet eine ganze Reihe von Standardfunktionen.

Wenn du sofort loslegen möchtst, blätter zu ["Die erste Ansicht im Backend"](/die-erste-ansicht-im-backend). Nachfolgend findest du einige Dinge zu Joomla! 4, die du für die Bearbeitung nicht zwingend benötigst. Manches davon ist aber *gut zu Wissen*.

# Nebensächlich aber *Gut zu wissen*

## Die Datei autoload_psr4.php

Während der Installation werden Einträge in der `/library/autoload_psr4.php` vorgenommen. Das ist neu in Joomla 4. Falls auf du merkwürdige Probleme stößt, lösche diese Datei. Sie wird beim nächsten Laden neu erstellt. Manchmal löst sich so ein Problem.

## Namespace

Beachte das Namespace-Tag oben in jeder Datei

`Namespace Joomla\Component\Foos\Administrator\View\Foos;`

und als Tag in der Manifestdatei

`<Namespace>Joomla\Component\Foos</ Namespace>`.

Warum Namespaces verwenden?
* Klassen werden so in einer definierten Struktur organisiert und
* automatisch über den `Classloader` geladen.
* Beispiel "ContentModelArticles" wird zu "\Joomla\Component\Content\Administrator\Model\ArticlesModel"
* `JLoader` kann die Namespaces automatisch verarbeiten
* Wir können zwischen Front-End- und Back-End-Klassen unterscheiden
* Dateien mit Namespaces findest du unter [`/src`](https://github.com/joomla/joomla-cms/pull/27687)

## Großschreibung von Ordnernamen

Du wirst vielleicht bemerken, dass einige der Joomla! 4.x Ordner- und Dateinamen mit Großbuchstaben und andere mit Kleinbuchstaben beginen. Auf den ersten Blick scheint dies chaotisch. Auf den zweiten Blick macht dies Sinn.

Die Ordner in Großbuchstaben enthalten PHP-Klassen mit Namespace. Diejenigen in Kleinbuchstaben enthalten XML-Dateien, Templatedateien, usw. . Es gibt einige Ordner mit Kleinbuchstaben die PHP-Dateien enthalten (aufgrund von Rückwärtskompatibilität) wie die Helfer-Dateien.

Weitere Informationen findest du unter: [https://github.com/joomla/joomla-cms/issues/22990](https://github.com/joomla/joomla-cms/issues/22990)

## Die Klassen erhalten aussagekräftigere Namen

Die Komponenten-MVC-Klassen haben in Joomla 4 aussagekräftigere Namen. Beispielsweise haben die Controller jetzt Controller als Suffix für ihren Klassennamen. So wird "Joomla\Component\Foos\Administrator\Controller\Foos" zu "Joomla\Component\Foos\Administrator\Controller\FoosController".

Zusätzlich erhält der Standard-Controller, der in Joomla 3 nur Controller heißt, den Namen "DisplayController", um besser zu reflektieren, was die Klasse tut.

Siehe: https://github.com/joomla/joomla-cms/pull/17624


## Benötigst du in jedem Ordner deiner Komponente eine leere Datei "index.html"?

Die `index.html` ist nicht mehr erforderlich, da das Verzeichnislisten [in der Standardkonfiguration nicht zulässig](https://github.com/joomla/joomla-cms/pull/4171) ist.
Wenn du weiter interessiert bist: Hier ist die Diskussion zum Thema in einer [Google Group](https://groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s) zu finden.

## Technische Anforderungen

Weißt du wie die Verantwortlichen bei Joomla entscheiden, welche Funktionen unterstützt werden und was nicht weiter verfolgt wird? Dafür gibt es das [Statistik-Plugin](https://developer.joomla.org/about/stats.html). Dank der Benutzer, die diese Erweiterung aktivieren, fließen wichtige Informationen in die Entwicklung ein.

## Alternative Syntax für Kontrollstrukturen

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
Auf diese Art und Weise ist eine einzelne Zeile ins ich geschlossen und HTML-Code ist trotzdem übersichtlich strukturiert.

## Datenbanktabellenpräfix

Erweiterungsentwickler, die die Datenbank verwenden, entwickeln die Erweiterung so, dass das Präfix variable ist. Sie nutzen die Zeichenkette `#__`, um immer den korrekten String wiederzugeben. Dies wird zur Laufzeit von Joomla durch die passende Zeichenfolge ersetzt.

## Wo lege ich JavaScript-, CSS- und Bilddateien ab, die zu meiner Komponente gehören?

Speichere diese Daten im Verzeichnis `media` im Joomla-Wurzelverzeichnis. So ist es möglich, diese zu überschreiben. Dies ist insbesondere bei CSS-Dateien vorteilhaft. Um das Design einheitlich zu gestalten. Die [Best Praxis Richtlinien](https://docs.joomla.org/Development_Best_Practices) empfehlen dies ebenfalls.

