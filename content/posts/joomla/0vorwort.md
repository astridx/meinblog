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

Wenn du neu bei Joomla bist, lese bitte [_Absolute Grundlagen der Funktionsweise einer Komponente_](https://docs.joomla.org/Special:MyLanguage/Absolute_Basics_of_How_a_Component_Functions)[^docs.joomla.org/absolute_basics_of_how_a_component_functions/de].

Dieses Tutorial ist für Joomla 4 gedacht. Informationen zum Erstellen einer Komponente für Joomla 3 findest du unter [Entwickeln einer Model-View-Controller-Komponente / 3.x](https://docs.joomla.org/J3.x:Developing_an_MVC_Component/de)[^docs.joomla.org/j3.x:developing_an_mvc_component/de].

Du benötigst Joomla 4.x für dieses Tutorial. Joomla 4 findest du bei [GitHub](https://github.com/joomla/joomla-cms/)[^github.com/joomla/joomla-cms] auf der [Entwickler-Website](https://developer.joomla.org/nightly-builds.html)[^developer.joomla.org/nightly-builds.html] oder erstelle eine kostenlose Website unter [launch.joomla.org](https://launch.joomla.org).

## Ziel dieses Tutorial?

Dieses Tutorial erstellt kein praktisches Beispiel. Ich habe absichtlich alles allgemein gehalten. Mein Hauptanliegen ist es, dir zu zeigen, wie Joomla funktioniert - und es dabei selbst besser zu verstehen. Am Ende ersetzt du den Namen `foo` in allen Dateien durch den Namen deiner Komponente und erweiterst diese um deine besonderen Anforderungen. Wenn du magst, kannst du das Skript [github.com/astridx/boilerplate/blob/ t43/duplicate.sh](https://github.com/astridx/boilerplate/blob/t43/duplicate.sh) hierfür verwenden.

> Daher ist dieses Tutorial in erster Linie für Programmierer gedacht, die eine neue Komponente erstellen möchten und Joomla bisher nicht kennen. Das Tutorial ist weiterhin eine Hilfe für Programmierer einer Joomla 3 Komponente, wenn diese Ihre Komponente für Joomla 4 erweitern. Wenn du beispielsweise an der Validierung deiner Joomla 3 Komponente arbeitest, findest du in den Kapiteln über die serverseitige und die clientseitige Validierung das, was du benötigst - nicht mehr und nicht weniger.

## Die Struktur dieses Tutorials

Jedes Kapitel baut auf dem vorherigen auf. Wenn du dich für ein bestimmtes Thema interessierst, sieh dir gerne ein separates Kapitel an. Sei dir dabei aber bewusst, dass eventuell Elemente nötig sind, die in einem vorherigen Kapitel integriert wurden.

Warum diese Struktur? Es gibt viele Beispiele für Komponenten im Standard Joomla. Beispielsweise

- com_content
- com_banner
- com_tags oder
- com_contact

In jeder Komponente siehst du Implementierungsdetails im Zusammenhang. Jede ist komplex und das Finden und Trennen bestimmter Elemente, wie beispielsweise Seitennummerierung oder eigene Felder, ist mühsam. Dieses Tutorial konzentriert sich pro Kapitel auf ein Detail.

> Du erstellst eine Komponente für Joomla 4, unter Wiederverwendung der vielen bereits vorhandenen Implementierungen in Joomla. Du erfindest das Rad nicht neu. Joomla bietet eine ganze Reihe von Standardfunktionen.

Wenn du sofort loslegen möchtest, blätter zu _Die erste Ansicht im Backend_. Nachfolgend findest du einige Dinge zu Joomla 4, die du für die Bearbeitung nicht zwingend benötigst. Manches davon ist aber _gut zu Wissen_.

## Basics

### Joomla 4 bietet fünf Arten von Erweiterungen

- [Komponenten](https://docs.joomla.org/Special:MyLanguage/Component/de):
  Eine Komponente füllt den Hauptinhalt der Site. In der Regel nutzt diese Daten, die in der Datenbank gespeichert werden.
- [Module](https://docs.joomla.org/Special:MyLanguage/Module/de):
  Ein Modul ist ein Add-On zur Site, das die Funktionalität erweitert. Es nimmt einen sekundären Teil der Webseite ein und wird an verschiedenen Positionen angezeigt. Auf welchen aktiven Menüelementen es ausgegeben wird ist wählbar. Module sind leichte und flexible Erweiterungen. Man verwendet sie für kleine Teile der Seite, die weniger komplex sind und über verschiedene Komponenten hinweg angezeigt werden.
- [Plugins](https://docs.joomla.org/Special:MyLanguage/Plugin/de):
  Ein Plugin bearbeitet die Ausgabe, die vom System generiert wurde. Es wird normalerweise nicht als separater Teil der Site aufgerufen. Es nimmt Daten aus anderen Quellen und manipuliert diese vor der Ausgabe. Ein Plugin arbeitet im Hintergrund.
- [Sprachen](https://docs.joomla.org/Language/de):
  Die grundlegendsten Erweiterungen sind Sprachen. Im Wesentlichen bestehen die Sprachpaketdateien aus Schlüssel/Wert-Paaren, die die Übersetzung statischer Textzeichenfolgen im Joomla Quellcode ermöglichen.
- [Templates](https://docs.joomla.org/Special:MyLanguage/Templates/de):
  Ein Template bestimmt das Design deiner Joomla Website.

### Joomla 4 besteht aus fünf verschiedenen Anwendungen

- Installation (wird für die Installation von Joomla verwendet und muss nach der Installation gelöscht werden);
- Administrator (Backend - zum Verwalten von Inhalten);
- Website (Frontend - zur Anzeige von Inhalten);
- CLI (wird für den Zugriff auf Joomla über die Befehlszeile und für Cron-Jobs verwendet);
- API (Webdienste - zum Erstellen von APIs für maschinenzugängliche Inhalte);

## Basiswissen

### Entwicklungsumgebung

In diesem Text ist der Joomla Code Thema. Es geht nicht um die neuesten Werkzeuge für Entwickler. Ein paar Dinge sind allerdings essentiell.

#### Testumgebung

Du möchtest eine Erweiterung für Joomla programmieren und benötigst deshalb eine Umgebung in der Joomla installiert ist. Meiner Meinung nach ist ein [XAMPP-Serverpaket](https://www.apachefriends.org/index.html)[^https://www.apachefriends.org/index.html] auf einem lokalen Arbeitsrechner eine ideale Voraussetzung zur Entwicklung neuer Erweiterungen. Der direkte Zugriff auf die Dateien von Joomla im lokalen Dateisystem erleichtert die Handhabe.

#### Code-Editoren oder IDE

Zwingend ist ebenfalls ein guter Editor. Dies sollte einer sein, mit dem du dich wohlfühlst. Wikipedia führt eine Liste mit [Editoren.](https://de.wikipedia.org/wiki/Liste_von_Texteditoren)[^de.wikipedia.org/wiki/liste_von_texteditoren]

Mehr Bequemlichkeit bietet eine integrierte Entwicklungsumgebung [IDE](https://de.wikipedia.org/wiki/Liste_von_integrierten_Entwicklungsumgebungen)[^https://de.wikipedia.org/wiki/liste_von_integrierten_entwicklungsumgebungen]. Mit Bequemlichkeit meine ich Funktionen wie

- Versionierung: Integration von [GIT](https://de.wikipedia.org/wiki/Git)[^de.wikipedia.org/wiki/git]
- Codevervollständigung: Benutzereingabe sinnvoll ergänzen
- Syntax-Highlighting: farbliche Hervorhebung von Variablen, Klassennamen oder Anweisungen.
- Coding Standards: Beachten von Regeln
- Debugging: Auffinden von Fehlern

Auch zu IDEs kannst du dir bei Wikipedia anhand einer [Liste mit IDEs](https://de.wikipedia.org/wiki/Liste_von_integrierten_Entwicklungsumgebungen)[^de.wikipedia.org/wiki/liste_von_integrierten_entwicklungsumgebungen] einen Überblick verschaffen.

In der Joomla-Community ist die kostenpflichtige IDE [PHPStorm](https://www.jetbrains.com/phpstorm/)[^https://www.jetbrains.com/phpstorm/] beliebt. Immer häufiger trifft man auf Nutzer von [Visual Studio Code](https://code.visualstudio.com/)[^code.visualstudio.com/]. Nennenswert sind daneben [NetBeans](https://netbeans.org) und [Eclipse](https://eclipse.org).

Sucht du nach einer Anleitung, zur Einrichtung der Entwicklungsumgebung? Joomla mit Visual Studio Code findest du in der [Joomla Dokumentation](https://docs.joomla.org/Visual_Studio_Code)[^docs.joomla.org/visual_studio_code]. Für PHPStorm bietet Jetbrains eine [Beschreibung](https://www.jetbrains.com/help/phpstorm/joomla-specific-coding-assistance.html).

> Wenn du magst, kannst du meine ersten Schritte mit Visual Studio Code unter [blog.astrid-guenther.de/ubuntu-vscode-docker-lamp](https://blog.astrid-guenther.de/ubuntu-vscode-docker-lamp) lesen.

### Joomla 3 und Joomla 4 im Vergleich

#### Neues in Joomla 4

##### Frontend und Backend barrierefrei und mit Bootstrap 5

Joomla 4 integriert Bootstrap 5 in den Joomla-Kern. Dabei sind die mitgelieferten Templates zugänglich und entsprechen der Stufe AA der WCAG 2.1. Die WCAG 2.1 ergänzt die WCAG 2.0 und ist der Webstandard für digitale Barrierefreiheit, der in der Europäischen Union für öffentliche Stellen verbindlich ist. Als Erweiterungsentwickler ist es nicht zwingend, dass du Bootstrap 5 verwendest. Technisch sollte sie aber die neuesten Standards einhalten. Es wäre schade die gute Vorlage die Joomla bietet, nicht zu nutzen.

##### Optimierte Web Assets

Mit einem einzigen Aufruf ist es Developern mithilfe der Web Assets möglich, mehrere Javascript- und CSS-Dateien in einer festgelegten Reihenfolge zu laden. Verwendet ein Erweiterungsentwickler beispielsweise Styles, die davon abhängen, dass Font Awesome zuerst geladen wird und er weiß, dass Joomla 4 das Icon-Font-Set verwendet, kommen Web Assets ins Spiel. Web Assets werden in diesem Tutorial an mehreren Stellen beschrieben.

##### Webservices ermöglichen einen automatisierten Datenaustausch

Joomla 4 Webdienste machen Inhalte für andere Websites oder mobile Anwendungen zugänglich. Was ist ein Webservice? Unterschiedliche Definitionen sorgen für Verwirrung. Die SOAP-Standards werden als Webdienste bezeichnet. Andere kennen diese unter dem Begriff REST-API. Das W3C definiert einen Webservice allgemein als eine Schnittstelle für die automatisierte Kommunikation über Rechnernetze. Die API-Integration in Joomla 4 implementiert eine solche im Core des CMS unter Zuhilfenahme von REST. In dem Beispiel, dass wir in diesem Text aufbauen, unterstützen wir die Joomla API ebenfalls.

##### Workflow

Mit der neuen Komponente Workflow ist es möglich, Websiteinhalte mit einem Arbeitsablauf zu verknüpfen. Thirt Party Erweiterungen können mithifle der Kernerweiterung ebenfalls einen Arbeitsablauf anbieten. Auf diese Funktion ist hier im Buch noch nicht aufgenommen.

##### Viele weitere Änderungen und Verbesserungen

Joomla 4 beinhaltet neue Sicherheitsfunktionen wie die Unterstützung von vorbereiteten Anweisungen für Datenbanksysteme. So wird ein SQL-Injection verhindert, da die Datenbank die Gültigkeit von Parametern prüft. Außerdem wurde die Codebasis Restrukturierung. Der Code wurde gründlich bereinigt, veraltete Funktionen entfernt und PHP-Namespaces eingeführt.

#### Rückwärtskompatibilität zu Joomla 3

Dieser Text richtet sich in erster Linie an Entwickler, die eine neue Erweiterung in Angriff nehmen. Nichtsdestotrotz sind Probleme in Bezug auf die Kompatibilität mit Joomla 3 interessant. Eine [Seite in der Joomla Dokumentation](https://docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4/de)[^docs.joomla.org/potential_backward_compatibility_issues_in_joomla_4/de] fasst die wichtigen Punkte zusammen.

### Ändere niemals die Kerndateien.

Der Zweck von Joomla-Erweiterungen ist es, ein System zu haben, das erweitert werden kann. So ist es möglich, dass dein Code und der Joomla Core Code unabhängig voneinander mit neuen Funktionen versehen werden können.

Wenn du Änderungen an Joomla selbst vornimmst, werden diese mit dem nächsten Update überschrieben.

Du hast das Gefühl, dass deine Funktion nur mit einem Core-Hack umgesetzt werden kann? Dein Gefühl trügt dich! Es gibt immer eine Lösung, die die Systemdateien unangetastet lässt.

### Lerne von den Kerndateien

Dass du die Systemdateien nicht verändern solltest, heißt nicht, dass du sie gar nicht erst ansiehst. Ganz im Gegenteil! Beim Lesen wirst du auf viel Code stoßen, der nirgendwo dokumentiert ist. Wenn du dir nicht sicher bist, wie du eine Funktion am besten implementierst, stöbere im Joomla-Code. Die Lösung findet sich oft im Herzen von Joomla.

### Die Datei autoload_psr4.php

Während der Installation werden Einträge in der Datei `/administrator/ cache/autoload_psr4.php` vorgenommen. Das ist neu in Joomla 4. Falls du auf merkwürdige Probleme stößt, lösche diese Datei. Sie wird beim nächsten Laden neu erstellt. Manchmal löst sich so ein Problem.<!-- \index{autoload_psr4.php} -->

> Der nachfolgende Text wurde in englischer Sprache mit dem [PR 28436](https://github.com/joomla/joomla-cms/pull/28436/files)[^github.com/joomla/joomla-cms/pull/28436/files] in die [README auf Github](https://github.com/joomla/joomla-cms/blob/4.0-dev/README.md)[^github.com/joomla/joomla-cms/blob/4.0-dev/readme.md] eingefügt: "Joomla erstellt einen Cache der Namespaces seiner Erweiterungen in `JOOMLA_ROOT/administrator/cache/ autoload_psr4.php`. Wenn Erweiterungen in Git erstellt, gelöscht oder entfernt werden, muss diese Datei neu erstellt werden. Sie können die Datei einfach löschen und sie wird beim nächsten Aufruf von Joomla neu erstellt."

### Namespace<!-- \index{Namespace} -->

Beachte den Namespace Eintrag im oberen Bereich der meisten PHP-Dateien

`Namespace FooNamespace\ Component\Foos\Administrator\View\Foos;`

und als Tag in der Manifestdatei

`<Namespace>FooNamespace\ Component\Foos</ Namespace>`.

> Denke daran, dass du den Parameter `path="src"` mitgibst, falls du die Dateien mit Namespace im Unterverzeichnis `src` speicherst. Dies ist in Joomla üblich und die in diesem Tutorial erstellten Beispiel-Erweiterungen [verwenden dieses Verzeichnis ebenfalls](https://github.com/astridx/boilerplate/blob/62a970704ee2899addd3922e88c918b7f6af72a2/src/administrator/components/com_foos/foos.xml#L12)[^github.com/astridx/boilerplate/blob/62a970704ee2899addd3922e88c918b7f6af72a2/src/administrator/components/com_foos/foos.xml#L12].

Warum Namespaces verwenden? Alle PHP-Klassen werden so in einer definierten Struktur organisiert und automatisch über den `Classloader` geladen. Dabei wird `ContentModelArticles` zu `Joomla\Component\Content\ Administrator\Model\ArticlesModel`.

`JLoader` kann die Namespaces automatisch verarbeiten und unterscheidet zwischen Front-End- und Back-End-Klassen.

> Dateien mit Namespaces findest du im Verzeichnis [`/src`](https://github.com/joomla/joomla-cms/pull/27687)[^github.com/joomla/joomla-cms/pull/27687]

### Großschreibung von Ordner- und Dateinamen

Du wirst bemerken, dass einige der Joomla 4 Ordner- und Dateinamen mit Großbuchstaben und andere mit Kleinbuchstaben beginnen. Auf den ersten Blick scheint dies unstrukturiert. Auf den zweiten Blick macht es Sinn.

Die Ordner in Großbuchstaben enthalten PHP-Klassen mit Namespace. Diejenigen in Kleinbuchstaben enthalten XML-Dateien, Template-Dateien. Es gibt einige einige Ordner mit Kleinbuchstaben die PHP-Dateien enthalten. Diese sind notwendig, um Kompatibilität mit Joomla 3 zu gewährleisten. Oft sind dies Helferdateien.

> Weitere Informationen findest du unter: [github.com/joomla/joomla-cms/issues/22990](https://github.com/joomla/joomla-cms/issues/22990).

### Aussagekräftige Namen

Die Komponenten-MVC-Klassen haben in Joomla 4 aussagekräftigere Namen. Beispielsweise führen die Controller jetzt `Controller` als Suffix beim Klassennamen. So wird `FooNamespace\Component\Foos\ Administrator\Controller\Foos` zu `FooNamespace\Component\Foos\ Administrator\Controller\ FoosController`.

Zusätzlich erhält der Standard-Controller, der in Joomla 3 nur Controller heißt, den Namen `DisplayController`, um besser zu reflektieren, was die Klasse tut. Siehe: [PR 17624](https://github.com/joomla/joomla-cms/pull/17624)[^github.com/joomla/joomla-cms/pull/17624]

### index.html?<!-- \index{index.html} -->

Benötigst du in jedem Ordner deiner Komponente eine leere Datei mit dem Namen `index.html`? Die `index.html` ist nicht mehr erforderlich, da das Auflisten von Verzeichnissen [in der Standardkonfiguration von Joomla nicht zulässig](https://github.com/joomla/joomla-cms/pull/4171)[^github.com/joomla/joomla-cms/pull/4171] ist.
Wenn du weiter interessiert bist lese die Diskussion zum Thema in einer [Google Group](https://groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s)[^groups.google.com/forum/#!topic/joomla-dev-cms/en1g7qouw2s].

### Technische Anforderungen<!-- \index{Technische Anforderungen} -->

Weißt du wie die Verantwortlichen bei Joomla entscheiden, welche Funktionen unterstützt werden und was nicht weiter verfolgt wird? Dafür gibt es das [Statistik-Plugin](https://developer.joomla.org/about/stats.html)[^developer.joomla.org/about/stats.html]. Dank der Benutzer, die diese Erweiterung aktivieren, fließen wichtige Informationen in die Entwicklung ein.

### PHP

#### PHP-Operatoren für Gleichheit (== zwei Gleichheitszeichen) und Identität (=== drei Gleichheitszeichen)<!-- \index{PHP!Vergleichsoperator} -->

Der [Vergleichsoperator](https://www.php.net/manual/de/language.operators.comparison.php#language.operators.comparison)[^php.net/manual/de/language.operators.comparison.php#language.operators.comparison] `==` vergleicht zwischen zwei verschiedenen Typen, wenn diese unterschiedlich sind, während der Operator `===` einen typensicheren Vergleich durchführt. Das bedeutet, dass er nur dann `wahr` zurückgibt, wenn beide Operanden denselben Typ und denselben Wert haben. Beispiele:

`1 === 1`: wahr
`1 == 1`: wahr
`1 === "1"`: falsch // 1 ist eine Ganzzahl, "1" ist ein String
`1 == "1"`: true // "1" wird in eine ganze Zahl umgewandelt
`"foo" === "foo"`: true // beide Operanden sind Strings und haben den gleichen Wert

Achtung: Zwei Instanzen derselben Klasse mit gleichwertigen Elementen werden vom Operator mit drei Gleichheitszeichen`===` mit `false` ausgewertet. Beispiel:

```
$a = new stdClass();
$a->foo = "bar";
$b = clone $a;
var_dump($a === $b); // bool(false)
```

In Joomla nutzen wir wann immer möglich den typsicheren Vergleich, weil dieser genauer ist.

#### Einfache Anführungszeichen und doppelte Anführungszeichen<!-- \index{PHP!Anführungszeichen} -->

##### Einfache Anführungszeichen `'`

Die einfachste Art, eine Zeichenkette anzugeben, ist, sie in einfache Anführungszeichen einzuschließen. Einfache Anführungszeichen sind im Allgemeinen schneller, und alles, was in Anführungszeichen steht, wird als einfache Zeichenkette behandelt. Beispiel:

```
echo 'Beginne mit einer einfachen Zeichenkette';
echo 'String mit einem Apostroph';
echo 'String mit einer php-Variablen'.$name;
```

##### Doppelte Anführungszeichen `"`

Verwende doppelte Anführungszeichen in PHP, um beim Trennen die Verwendung eines Punktes zu vermeiden. Verwende geschweifte Klammern {} in Strings, um Variablen einzuschließen, wenn du den Verkettungsoperator (.) nicht verwenden magst. Beispiel:

```
var $name = "Peter";
echo "Hello {$name}";
```

In Joomla nutzen wir wenn möglich einfache Anführungszeichen. Die Verwendung einfacher Anführungszeichen ist etwas schneller. PHP benötigt keine zusätzliche Verarbeitung, um zu interpretieren, was sich innerhalb des einfachen Anführungszeichens befindet. Wenn du doppelte Anführungszeichen verwendest, muss PHP prüfen, ob sich in der Zeichenkette irgendwelche Variablen befinden.

Weitere Informationen dazu und die Beschreibung von zwei weitern Möglichkeiten Strings in PHP zu verwneden findest du auf der Website [php.net](https://www.php.net/manual/de/language.types.string.php)[^php.net/manual/de/language.types.string.php].

#### Alternative Syntax für Kontrollstrukturen<!-- \index{PHP!Alternative Syntax PHP} -->

PHP bietet eine [weitere Schreibweise](https://www.php.net/manual/de/control-structures.alternative-syntax.php) für Kontrollstrukturen an. Diese ist praktisch, wenn man größere Blöcke HTML direkt ausgibt - ohne `echo` zu benutzen. Nutze diese in Template-Dateien. So bleiben die übersichtlich.

Verwende

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

Auf diese Art und Weise ist eine einzelne Zeile in sich geschlossen und der HTML-Code ist trotzdem übersichtlich strukturiert.

### Datenbanktabellenpräfix<!-- \index{Datenbank!Präfix} -->

Als Erweiterungsentwickler entwickelt man seine Erweiterung idealerweise so, dass das Präfix der Datenbank variable ist. Dazu nutzt man die Zeichenkette `#__`. Der String `#__` wird zur Laufzeit von Joomla mit dem passenden Präfix ersetzt.

### JavaScript-, CSS- und Bilddateien?

Wo speicherst du am besten JavaScript-, CSS- und Bilddateien? Speichere diese Daten im Verzeichnis `media` im Joomla-Wurzelverzeichnis. So ist es möglich, diese zu überschreiben. Dies ist besonders bei CSS-Dateien von Vorteil, um das Design der gesamten Joomla-Website einheitlich zu gestalten. Die [Best Praxis Richtlinien](https://docs.joomla.org/Development_Best_Practices)[^docs.joomla.org/development_best_practices] empfehlen dies ebenfalls.

### Fontawesome Icons<!-- \index{Fontawesome} -->

Du möchtest Icons einsetzen aber keine eigene Bibliothek hinzufügen. Dann nutze im Frontend und im Backend die freien Icons der Seite [fontawesome.com/icons](https://fontawesome.com/icons). Zumindest wenn du die Standardtemplates _Cassiopeia_ und _Atum_ nutzt, funktioniert das. Falls dein Template FontAwesome nicht unterstützt, kannst du die Icons selbst über den WebassetManager nachladen. In Joomla wird Fontawesome mitgeliefert. Das Markieren als [Abhängigkeit](https://github.com/joomla/joomla-cms/blob/75ef0b10ee31a768d279f04e5278bafee3b23a78/templates/cassiopeia/joomla.asset.json#L14)[^templates/cassiopeia/joomla.asset.json] reicht aus.

> Achtung: In Joomla Core Dateien kann nicht einfach so abgeguckt werden, weil Joomla den Text `icon-` voran stellt. Das wird später mithilfe der Datei [`build/media_source/ system/scss/_icomoon.scss`](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/scss/_icomoon.scss)[^build/media_source/system/scss/_icomoon.scss] für Fontawesome umgewandelt. Auf diese Art funktionieren lediglich die Icons, die in der vorgenannten Datei aufgenommen sind. Warum verkompliziert Joomla die Auswahl von Font Awesome Icons? Der Grund hierfür ist folgender: So können Erweiterungen, weiterhin verwendet werden, die für Joomla 3 programmiert wurden.

Der HTML-Code

```css
<i class="fas fa-align-left"></i>
```

zeigt dann beispielsweise das Linkbündig-Zeichen an.
<img src="https://vg01.met.vgwort.de/na/be6e0f448d4442348d0275b49531a2b7" width="1" height="1" alt="">
