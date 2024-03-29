---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2021-02-21
title: 'Vorwort'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-tutorial-vorwort
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Wenn du neu bei Joomla bist, lese bitte [_Absolute Grundlagen der Funktionsweise einer Komponente_](https://docs.joomla.org/Absolute_Basics_of_How_a_Component_Functions)[^docs.joomla.org/Absolute_Basics_of_How_a_Component_Functions].

Dieses Tutorial ist für Joomla 4 gedacht. Informationen zum Erstellen einer Komponente für Joomla 3 findest du unter [Entwickeln einer Model-View-Controller-Komponente / 3.x](https://docs.joomla.org/J3.x:Developing_an_MVC_Component)[^docs.joomla.org/J3.x:Developing_an_MVC_Component].

Du benötigst Joomla 4.x für dieses Tutorial. Joomla 4 findest du bei [GitHub](https://github.com/joomla/joomla-cms/)[^github.com/joomla/joomla-cms] auf der [Entwickler-Website](https://developer.joomla.org/nightly-builds.html)[^developer.joomla.org/nightly-builds.html] oder erstelle eine kostenlose Website unter [launch.joomla.org](https://launch.joomla.org).

## Ziel dieses Tutorial?

Dieses Tutorial erstellt kein praktisches Beispiel. Ich habe absichtlich alles allgemein gehalten. Mein Hauptanliegen ist es, dir zu zeigen, wie Joomla funktioniert - und es dabei selbst besser zu verstehen. Am Ende ersetzt du den Namen `foo` in allen Dateien durch den Namen deiner Komponente und erweiterst diese um deine besonderen Anforderungen. Wenn du magst, kannst du das Skript [duplicate.sh](https://codeberg.org/astrid/j4examplecode/src/branch/t43/duplicate.sh)[^github.com/astridx/boilerplate/blob/t43/duplicate.sh] hierfür verwenden.

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

Du möchtest eine Erweiterung für Joomla programmieren und benötigst deshalb eine Umgebung in der Joomla installiert ist. Meiner Meinung nach ist ein [XAMPP-Serverpaket](https://www.apachefriends.org/index.html)[^www.apachefriends.org/index.html] auf einem lokalen Arbeitsrechner eine ideale Voraussetzung zur Entwicklung neuer Erweiterungen. Der direkte Zugriff auf die Dateien von Joomla im lokalen Dateisystem erleichtert die Handhabe.

#### Code-Editoren oder IDE

Zwingend ist ebenfalls ein guter Editor. Dies sollte einer sein, mit dem du dich wohlfühlst. Wikipedia führt eine Liste mit [Editoren.](https://de.wikipedia.org/wiki/Liste_von_Texteditoren)[^de.wikipedia.org/wiki/Liste_von_Texteditoren]

Mehr Bequemlichkeit bietet eine integrierte Entwicklungsumgebung [IDE](https://de.wikipedia.org/wiki/Liste_von_integrierten_Entwicklungsumgebungen). Mit Bequemlichkeit meine ich Funktionen wie

- Versionierung: Integration von [GIT](https://de.wikipedia.org/wiki/Git)[^de.wikipedia.org/wiki/Git]
- Codevervollständigung: Benutzereingabe sinnvoll ergänzen
- Syntax-Highlighting: farbliche Hervorhebung von Variablen, Klassennamen oder Anweisungen.
- Coding Standards: Beachten von Regeln
- Debugging: Auffinden von Fehlern

Auch zu IDEs kannst du dir bei Wikipedia anhand einer [Liste mit IDEs](https://de.wikipedia.org/wiki/Liste_von_integrierten_Entwicklungsumgebungen)[^de.wikipedia.org/wiki/Liste_von_integrierten_Entwicklungsumgebungen] einen Überblick verschaffen.

In der Joomla-Community ist die kostenpflichtige IDE [PHPStorm](https://www.jetbrains.com/phpstorm/)[^www.jetbrains.com/phpstorm/] beliebt. Immer häufiger trifft man auf Nutzer von [Visual Studio Code](https://code.visualstudio.com/)[^code.visualstudio.com/]. Nennenswert sind daneben [NetBeans](https://netbeans.org) und [Eclipse](https://eclipse.org).

Sucht du nach einer Anleitung, zur Einrichtung der Entwicklungsumgebung? Joomla mit Visual Studio Code findest du in der [Joomla Dokumentation](https://docs.joomla.org/Visual_Studio_Code)[^docs.joomla.org/Visual_Studio_Code]. Für PHPStorm bietet Jetbrains eine [Beschreibung](https://www.jetbrains.com/help/phpstorm/joomla-specific-coding-assistance.html).

> Wenn du magst, kannst du meine ersten Schritte mit Visual Studio Code unter [blog.astrid-guenther.de/ubuntu-vscode-docker-lamp](https://blog.astrid-guenther.de/ubuntu-vscode-docker-lamp) lesen.

### Joomla 3 und Joomla 4 im Vergleich

#### Neues in Joomla 4

##### Frontend und Backend barrierefrei und mit Bootstrap 5

Joomla 4 integriert Bootstrap 5 in den Joomla-Kern. Dabei sind die mitgelieferten Templates zugänglich und entsprechen der Stufe AA der WCAG 2.1. Die WCAG 2.1 ergänzt die WCAG 2.0 und ist der Webstandard für digitale Barrierefreiheit, der in der Europäischen Union für öffentliche Stellen verbindlich ist. Als Erweiterungsentwickler ist es nicht zwingend, dass du Bootstrap 5 verwendest. Technisch sollte sie aber die neuesten Standards einhalten. Es wäre schade die gute Vorlage die Joomla bietet, nicht zu nutzen.

##### Optimierte Web Assets

Mit einem einzigen Aufruf ist es Developern mithilfe der Web Assets möglich, mehrere Javascript- und CSS-Dateien in einer festgelegten Reihenfolge zu laden. Verwendet ein Erweiterungsentwickler beispielsweise Styles, die davon abhängen, dass Font Awesome zuerst geladen wird und er weiß, dass Joomla 4 das Icon-Font-Set verwendet, kommen Web Assets ins Spiel. Web Assets werden in diesem Tutorial an mehreren Stellen beschrieben.

> Verwende den Web Asset Manager, wenn du für Joomla 4 entwickelst. Alle Aufrufe von `HTMLHelper::_('stylesheet oder script ...)` funktionieren, aber diese Assets werden nach den Web Asset Manager Assets angefügt. Dies führt dazu, dass Styles überschrieben werden, die im Template gesetzt werden. So hat ein Benutzer nicht die Möglichkeit, mithilfe einer `user.css` einzuwirken. Siehe in diesem Zusammenhang [Issue 35706](https://github.com/joomla/joomla-cms/issues/35706)[^github.com/joomla/joomla-cms/issues/35706].

##### Webservices ermöglichen einen automatisierten Datenaustausch

Joomla 4 Webdienste machen Inhalte für andere Websites oder mobile Anwendungen zugänglich. Was ist ein Webservice? Unterschiedliche Definitionen sorgen für Verwirrung. Die SOAP-Standards werden als Webdienste bezeichnet. Andere kennen diese unter dem Begriff REST-API. Das W3C definiert einen Webservice allgemein als eine Schnittstelle für die automatisierte Kommunikation über Rechnernetze. Die API-Integration in Joomla 4 implementiert eine solche im Core des CMS unter Zuhilfenahme von REST. In dem Beispiel, dass wir in diesem Text aufbauen, unterstützen wir die Joomla API ebenfalls.

##### Workflow

Mit der neuen Komponente Workflow ist es möglich, Websiteinhalte mit einem Arbeitsablauf zu verknüpfen. Thirt Party Erweiterungen können mithifle der Kernerweiterung ebenfalls einen Arbeitsablauf anbieten. Auf diese Funktion ist hier im Buch bisher nicht aufgenommen.

##### Viele weitere Änderungen und Verbesserungen

Joomla 4 beinhaltet neue Sicherheitsfunktionen wie die Unterstützung von vorbereiteten Anweisungen für Datenbanksysteme. So wird ein SQL-Injection verhindert, da die Datenbank die Gültigkeit von Parametern prüft. Außerdem wurde die Codebasis Restrukturierung. Der Code wurde gründlich bereinigt, veraltete Funktionen entfernt und PHP-Namespaces eingeführt.

#### Rückwärtskompatibilität zu Joomla 3

Dieser Text richtet sich in erster Linie an Entwickler, die eine neue Erweiterung in Angriff nehmen. Nichtsdestotrotz sind Probleme in Bezug auf die Kompatibilität mit Joomla 3 interessant. Eine [Seite in der Joomla Dokumentation](https://docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4/de)[^docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4/de] fasst die wichtigen Punkte zusammen.

### Ändere niemals die Kerndateien.

Der Zweck von Joomla-Erweiterungen ist es, ein System zu haben, das erweitert werden kann. So ist es möglich, dass dein Code und der Joomla Core Code unabhängig voneinander mit neuen Funktionen versehen werden können.

Wenn du Änderungen an Joomla selbst vornimmst, werden diese mit dem nächsten Update überschrieben.

Du hast das Gefühl, dass deine Funktion nur mit einem Core-Hack umgesetzt werden kann? Dein Gefühl trügt dich! Es gibt immer eine Lösung, die die Systemdateien unangetastet lässt.

### Lerne von den Kerndateien

Dass du die Systemdateien nicht verändern solltest, heißt nicht, dass du sie gar nicht erst ansiehst. Ganz im Gegenteil! Beim Lesen wirst du auf viel Code stoßen, der nirgendwo dokumentiert ist. Wenn du dir nicht sicher bist, wie du eine Funktion am besten implementierst, stöbere im Joomla-Code. Die Lösung findet sich oft im Herzen von Joomla.

### Die Datei autoload_psr4.php

Während der Installation werden Einträge in der Datei `/administrator/ cache/autoload_psr4.php` vorgenommen. Das ist neu in Joomla 4. Falls du auf merkwürdige Probleme stößt, lösche diese Datei. Sie wird beim nächsten Laden neu erstellt. Manchmal löst sich so ein Problem.<!-- \index{autoload!autoload psr4.php} -->

> Der nachfolgende Text wurde in englischer Sprache mit dem [PR 28436](https://github.com/joomla/joomla-cms/pull/28436/files)[^github.com/joomla/joomla-cms/pull/28436/files] in die README auf Github eingefügt: "Joomla erstellt einen Cache der Namespaces seiner Erweiterungen in `JOOMLA_ROOT/administrator/cache/ autoload_psr4.php`. Wenn Erweiterungen in Git erstellt, gelöscht oder entfernt werden, muss diese Datei neu erstellt werden. Sie können die Datei einfach löschen und sie wird beim nächsten Aufruf von Joomla neu erstellt."

### Namespace<!-- \index{Namespace} -->

Beachte den Namespace Eintrag im oberen Bereich der meisten PHP-Dateien

`Namespace FooNamespace\ Component\Foos\Administrator\View\Foos;`

und als Tag in der Manifestdatei

`<Namespace>FooNamespace\ Component\Foos</ Namespace>`.

> Denke daran, dass du den Parameter `path="src"` mitgibst, falls du die Dateien mit Namespace im Unterverzeichnis `src` speicherst. Dies ist in Joomla üblich und die in diesem Tutorial erstellten Beispiel-Erweiterungen [verwenden dieses Verzeichnis ebenfalls](https://codeberg.org/astrid/j4examplecode/src/branch/62a970704ee2899addd3922e88c918b7f6af72a2/src/administrator/components/com_foos/foos.xml#L12)[^github.com/astridx/boilerplate/blob/62a970704ee2899addd3922e88c918b7f6af72a2/ src/administrator/components/com_foos/foos.xml#L12].

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
Wenn du weiter interessiert bist lese die Diskussion zum Thema in einer [Google Group](https://groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s)[^groups.google.com/forum/#!topic/joomla-dev-cms/en1G7QoUW2s].

### Technische Anforderungen<!-- \index{Technische Anforderungen} -->

Weißt du wie die Verantwortlichen bei Joomla entscheiden, welche Funktionen unterstützt werden und was nicht weiter verfolgt wird? Dafür gibt es das [Statistik-Plugin](https://developer.joomla.org/about/stats.html)[^developer.joomla.org/about/stats.html]. Dank der Benutzer, die diese Erweiterung aktivieren, fließen wichtige Informationen in die Entwicklung ein.

### Warum wird in Joomla-Dateien am Ende einer Quellcodedatei eine Leerzeile eingefügt?<!-- \index{Leerzeile am Dateiende} -->

Es gibt mehrere Gründe dafür, dass eine leere Zeile am Dateiende als Erfordernis in die Joomla Coding Standards aufgenommen wurde:

- Abgesehen von der Tatsache, dass es eine schönere Cursorposition ist, wenn du in einem Texteditor zum Ende einer Datei gehst ermöglicht ein Zeilenumbruch am Ende der Datei eine einfache Überprüfung, dass die Datei nicht abgeschnitten wurde.
- Wenn du etwas am Ende einer Datei einfügt, zeigt die Differenzanzeige in Git, dass du die letzte Zeile geändert hast, während das Einzige, was du tatsächlich eingefügt hast, ein Zeilenumbruch ist. Das ist verwirrend.
- Heute spielt es keine Rolle mehr, aber: viele ältere Werkzeuge im Programmierbereich verhalten sich falsch, wenn die letzte Datenzeile in einer Datei nicht mit einem Zeilenumbruch oder einer Wagenrücklauf/Neuzeilenkombination abgeschlossen wird.

### PHP

#### Warum sollte man das Tag zum Schließen von PHP Bereichen am Ende einer Datei weglassen?<!-- \index{PHP Ende-Tag} -->

Das schließende Tag eines PHP-Blocks am Ende einer Datei ist optional, und in einigen Fällen ist es hilfreich, es wegzulassen. Wenn du das schließende Tag weglässt, kannst du verhindern, dass am Ende der Datei versehentlich Leerzeichen oder Zeilenumbrüche eingefügt werden. Weitere Erklärungen findest du unter [php.net](https://www.php.net/basic-syntax.instruction-separation)[php.net/basic-syntax.instruction-separation]

#### PHP-Operatoren für Gleichheit (== zwei Gleichheitszeichen) und Identität (=== drei Gleichheitszeichen)<!-- \index{PHP!Vergleichsoperator} -->

Der [Vergleichsoperator](https://www.php.net /manual/de/language.operators.comparison.php #language.operators.comparison)[^php.net/manual/de/language.operators.comparison.php#language.operators.comparison] `==` vergleicht zwischen zwei verschiedenen Typen, wenn diese unterschiedlich sind, während der Operator `===` einen typensicheren Vergleich durchführt. Das bedeutet, dass er nur dann `wahr` zurückgibt, wenn beide Operanden denselben Typ und denselben Wert haben. Beispiele:

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

In Joomla verwenden wir einfache Anführungszeichen. Die Verwendung von einfachen Anführungszeichen ist performanter, in der Regel besser lesbar und unkomplizierter bei der Verwendung mit assoziativen Arrays. PHP braucht keine zusätzliche Verarbeitung, um zu interpretieren, was innerhalb der einfachen Anführungszeichen steht. Wenn du doppelte Anführungszeichen verwendest, muss PHP prüfen, ob es irgendwelche Variablen in der Zeichenkette gibt.

> Weitere Informationen dazu und die Beschreibung von zwei weitern Möglichkeiten Strings in PHP zu verwneden findest du auf der Website [php.net](https://www.php.net/manual/de/language.types.string.php)[^php.net/manual/de/language.types.string.php].

##### Einfache Anführungszeichen `'`

Die einfachste Art, eine Zeichenkette anzugeben, ist, sie in einfache Anführungszeichen einzuschließen. Einfache Anführungszeichen sind im Allgemeinen schneller, und alles, was in Anführungszeichen steht, wird als einfache Zeichenkette behandelt. Beispiel:

```
echo 'Beginne mit einer einfachen Zeichenkette';
echo 'String mit \' Apostroph';
echo 'String mit einer php-Variablen' . $name;
```

##### Doppelte Anführungszeichen `"`

Verwende doppelte Anführungszeichen in PHP, um beim Trennen die Verwendung eines Punktes zu vermeiden. Verwende geschweifte Klammern {} in Strings, um Variablen einzuschließen, wenn du den Verkettungsoperator (.) nicht verwenden magst. Beispiel:

```
var $name = "Peter";
echo "Hello {$name}";
```

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
<!-- prettier-ignore -->
Wo speicherst du am besten JavaScript-, CSS- und Bilddateien? Speichere diese Daten im Verzeichnis `media` im Joomla-Wurzelverzeichnis. So ist es möglich, diese zu überschreiben. Dies ist besonders bei CSS-Dateien von Vorteil, um das Design der gesamten Joomla-Website einheitlich zu gestalten. Die [Best Praxis Richtlinien](https://docs.joomla.org/Development_Best_Practices)[^docs.joomla.org/Development_Best_Practices] empfehlen dies ebenfalls.

> Beispiele: Für diese Tutorial-Erweiterung nutze ich später `media/com_foos/js/` für die JavaScript-Dateien der Komponente. Die CSS-Dateien des Modules `mod_articles_news` findest du im Verzeichnis `media/mod_articles_news/css/`. Und die Bilder zum Plugin `plg_content_vote` liegen im Ordner `media/plg_content_vote/images/`.

### Fontawesome Icons<!-- \index{Fontawesome} -->

Du möchtest Icons einsetzen aber keine eigene Bibliothek hinzufügen. Dann nutze im Frontend und im Backend die freien Icons der Seite [fontawesome.com/icons](https://fontawesome.com/icons). Zumindest wenn du die Standardtemplates _Cassiopeia_ und _Atum_ nutzt, funktioniert das. Falls dein Template FontAwesome nicht unterstützt, kannst du die Icons selbst über den WebassetManager nachladen. In Joomla wird Fontawesome mitgeliefert. Das Markieren als [Abhängigkeit](https://github.com/joomla/joomla-cms/blob/75ef0b10ee31a768d279f04e5278bafee3b23a78/templates/cassiopeia/joomla.asset.json#L14)[^templates/cassiopeia/joomla.asset.json] reicht aus.

> Achtung: In Joomla Core Dateien kann nicht einfach so abgeguckt werden, weil Joomla den Text `icon-` voran stellt. Das wird später mithilfe der Datei `build/media_source/ system/scss/_icomoon.scss` für Fontawesome umgewandelt. Auf diese Art funktionieren lediglich die Icons, die in der vorgenannten Datei aufgenommen sind. Warum verkompliziert Joomla die Auswahl von Font Awesome Icons? Der Grund hierfür ist folgender: So können Erweiterungen, weiterhin verwendet werden, die für Joomla 3 programmiert wurden.

Der HTML-Code

```css
<i class="fas fa-align-left"></i>
```

zeigt dann beispielsweise das Linkbündig-Zeichen an.

### Images verwenden<!-- \index{Images} -->

Ein [neues JLayout](https://gist.github.com/dgrammatiko/a20236039586a2fbc5c77caadffc3de8)[^gist.github.com/dgrammatiko/a20236039586a2fbc5c77caadffc3de8] ab Joomla 4.0.5 ermöglicht es Entwicklern HTML-Image-Tags einfacher auszugeben:

Anstatt also etwas wie dieses zu schreiben:

```PHP
<?php
echo '<img src="' . $imageURL .'" alt="' . htmlspecialchars($imageAlt, ENT_COMPAT, 'UTF-8') . '">';
?>
```

Der empfohlene Weg ist die Verwendung des JLayout:

```PHP
<?php
echo LayoutHelper::render('joomla.html.image', ['src' => imageURL, 'alt' => $imageAlt]);
?>
```

Vorteile:

- Die URL und das alt-Attribut werden korrekt escaped
- Der Entwickler muss sich nicht um das "#" am Ende der URL kümmern.
- Das Bild-Tag erhält ein `loading="lazy"`-Attribut, wenn das Bild die Attribute `width` und `height` definiert hat
- Das alt-Attribut wird ignoriert, wenn der übergebene Wert `false` (boolesch) ist.
- Alle weiteren Attribute werden korrekt gerendert, übergebe diesee wie im Array: (beispielsweise `'class' => 'my-class'`)

### Datumsangaben<!-- \index{Datumsangaben} -->

In einer meiner Joomla-Erweiterung trat ein Fehler auf. Datum- und Zeitangaben wurden nicht korrekt angezeigt. Die Zeitzone war offensichtlich das Problem. Die Lösung schien auf den ersten Blick einfach zu sein. Ich habe in der Vergangenheit mit Datumsangaben und der Klasse `DateTime` in PHP[^php.net/manual/en/class.datetime.php] gearbeitet und hatte Erfahrung mit Zeitzonen. In Joomla gibt es allerdings Besonderheiten.

Betrachten wir mein konkretes Problem. Ein Benutzer, der in der Zeitzone `Australia/Adelaide` (UTC/GMT +10:30 Stunden) lebt, füllt im Sommer ein Formular aus, welches ein Feld enthält, in dem ein Datum gespeichert wird. Die Zeitzone `Australia/Adelaide` hat im Sommer eine Differenz zur Zeitzone `UTC` von +10:30 Stunden, in der Winterzeit ist die Differenz +9:30 Stunden.

![Joomla 4 | Zeitzone beim Benutzer einstellen](/images/j4xvorwortx1.png)

Der Server steht in Johannesburg, somit in Südafrika. Die Zeitzone des Servers ist in der globalen Konfiguration auf `Africa/Johannesburg` eingestellt. Die Zeitzone `Africa/Johannesburg` hat im Sommer eine Differenz zur Zeitzone `UTC` von +2:00 Stunden, in der Winterzeit ist die Differenz +1:00 Stunden.

![Joomla 4 | Zeitzone des Servers in der globalen Konfiguration einstellen](/images/j4xvorwortx2.png)

Bei meiner Erweiterung handelt sich um ein _Gewinnspiel_. Beim Datum handelt es sich um den 4.10.2022. Die Uhrzeit ist 00:00:01 Uhr. Genau dann ist das Gewinnspiel beendet. Es wichtig, dass das Spiel überall auf der Welt zur gleichen Zeit inaktiv geschaltet wird. 
Das ist anders, als zum Beispiel bei einem _Adventskalender_. Beim Adventskalender ist es unter Umständen gewollt, dass in jeder Zeitzone etwas zu einer bestimmten Uhrzeit passiert. Das erste Türchen öffnet sich in Australien, in Afrika und in Europa dann, wenn es vor Ort der 1.12. und nicht gleichzeitig.

Ich verwende im Formular unter Joomla das Feld vom Typ Calendar[^docs.joomla.org/Calendar_form_field_type]. 

```xml
<field
  name="advent_publish_up"
  type="calendar"
  label="COM_AGADVENTS_FIELD_PUBLISH_UP_LABEL"
  translateformat="true"
  showtime="true"
  size="22"
  filter="user_utc"
/>
```

Zu meinem Erstaunen stelle ich bei meinen ersten Tests fest, dass in der Datenbank anstelle von `2022-10-04 00:00:01` das der String ` 2022-10-03 13:30:01` gespeichert wird. Mit etwas Recherche wird mir klar, dass das Kalenderfeld das Datum in die Zeitzone UTC konvertiert und in dieser Form abspeichert. Die Information zur Zeitzone selbst wird nicht in der Datenbank hinterlegt. Letzteres ist nicht notwendig, wenn sichergestellt ist, dass immer ein uns dieselbe Zeitzone verwendet wird. Im Falle von Joomla ist dies `UTC`.

Im Code zum Kalenderfeld der Datei `/libraries/src/Form/Field/CalendarField.php` kann diesen Vorgang in der Funktion `filter` abgelesen werden: 

```php
...
public function filter($value, $group = null, Registry $input = null)
{
    // Make sure there is a valid SimpleXMLElement.
    if (!($this->element instanceof \SimpleXMLElement)) {
        throw new \UnexpectedValueException(sprintf(‚%s::filter `element` is not an instance of SimpleXMLElement‘, \get_class($this)));
    }

    if ((int) $value <= 0) {
        return ‚‚;
    }

    if ($this->filterFormat) {
        $value = DateTime::createFromFormat($this->filterFormat, $value)->format(‚Y-m-d H:i:s‘);
    }

    $app = Factory::getApplication();

    // Get the field filter type.
    $filter = (string) $this->element[‚filter‘];

    $return = $value;

    switch (strtoupper($filter)) {
        // Convert a date to UTC based on the server timezone offset.
        case ‚SERVER_UTC‘:
            // Return an SQL formatted datetime string in UTC.
            $return = Factory::getDate($value, $app->get(‚offset‘))->toSql();
            break;

        // Convert a date to UTC based on the user timezone offset.
        case ‚USER_UTC‘:
            // Get the user timezone setting defaulting to the server timezone setting.
            $offset = $app->getIdentity()->getParam(‚timezone‘, $app->get(‚offset‘));

            // Return an SQL formatted datetime string in UTC.
            $return = Factory::getDate($value, $offset)->toSql();
            break;
    }

    return $return;
}
...
```

Die Variable `$value` beinhaltet den vom Benutzer eingegebene Wert, in userem Falle `2022-10-04 00:00:01`. Dieser wird in die Zeitzone `UTC` umgerechnet und daraufhin in der Variablen `$return` gespeichert. Der umgerechnete Wert wird zum Speichern an die Datenbank übergeben. So kann man sich immer darauf verlassen, dass das in der Datenbank hinterlegt Datum für die Zeitzone `UTC` korrekt ist.

`SERVER_UTC` und `USER_UTC` bieten in Joomla die Möglichkeit das Datum entweder in der Zeitzone, mit der der Webserer konfiguriert ist oder der beim Benutzer eingestellten Zeitzone auszugeben. Kurzum, die Konstanten geben an, ob der Wert der Variablen `$value` in der Zeitzone, die beim Benutzer gespeichert ist oder der Zeitzone des Webservers, welche in der globalen Konfiguration konfigurierbar ist, vorliegt.

> Warum wird das Datum für das Speichern in der Datenbank in die Zeitzone `UTC` konvertiert? Eigentlich ist es egal, welche Zeitzone man wählt. Sinnvoll ist, dass man eine festlegt. Auf diese Weise hat man immer einen fixen Ausgangspunkt. Andernfalls müsste man für jede Zeitzonen-Kombination den Umrechnungsfaktor oder das Offset bestimmen. Im Standardverhalten von Joomla ist sichergestellt, dass das Datum, welches in der Datenbank abgelegt ist, für die Zeitzone UTC korrekt ist und man bei der Umrechnung lediglich die Differenz/den Offset zu dieser Zeitzone benötigt. 
Die Standardzeitzone ist in der Datei `configuration.php` konfigurierbar. Die Variable heißt `$offset`. Standard ist `public $offset = ‚UTC‘;`. Bei der Anzeige im Frontend der Website muss man nun lediglich die Differenz zwischen `UTC` und der gewünschten Zeitzone berechnen.  

## Die Klasse Joomla\CMS\Date

Wenn man sich die Klasse `Joomla\CMS\Date` im Verzeichnis `/libraries/src/Date/Date.php` ansieht, bemerkt man, dass der Konstruktor `public function __construct($date = ‚now‘, $tz = null)` zwei Parameter ermöglicht: das _Datum_ und die _Zeitzone_. 

```php
...
public function __construct($date = ‚now‘, $tz = null)
{
    // Create the base GMT and server time zone objects.
    if (empty(self::$gmt) || empty(self::$stz)) {
        // @TODO: This code block stays here only for B/C, can be removed in 5.0
        self::$gmt = new \DateTimeZone(‚GMT‘);
        self::$stz = new \DateTimeZone(@date_default_timezone_get());
    }

    // If the time zone object is not set, attempt to build it.
    if (!($tz instanceof \DateTimeZone)) {
        if (\is_string($tz)) {
            $tz = new \DateTimeZone($tz);
        } else {
            $tz = new \DateTimeZone(‚UTC‘);
        }
    }

    // Backup active time zone
    $activeTZ = date_default_timezone_get();

    // Force UTC timezone for correct time handling
    date_default_timezone_set(‚UTC‘);

    // If the date is numeric assume a unix timestamp and convert it.
    $date = is_numeric($date) ? date(‚c‘, $date) : $date;

    // Call the DateTime constructor.
    parent::__construct($date, $tz);

    // Restore previously active timezone
    date_default_timezone_set($activeTZ);

    // Set the timezone object for access later.
    $this->tz = $tz;
}
...
```

Die Klasse `Joomla\CMS\Date` wir unter anderem in der Funktion `getDate` der Datei `/libraries/src/Factory.php` angewendet, welche Joomla Erweiterungsprogrammierer darin unterstützt, das Datum immer mit dem passenden Offset auszugeben, also in der korrekten Zeitzone. Nachfolgend ist der Code der Funktion `getDate()` der Vollständigkeit halber abgedruckt:


```php
...

public static function getDate($time = ‚now‘, $tzOffset = null)
{
    static $classname;
    static $mainLocale;

    $language = self::getLanguage();
    $locale = $language->getTag();

    if (!isset($classname) || $locale != $mainLocale) {
        // Store the locale for future reference
        $mainLocale = $locale;

        if ($mainLocale !== false) {
            $classname = str_replace(‚-‘, ‚_‘, $mainLocale) . ‚Date‘;

            if (!class_exists($classname)) {
                // The class does not exist, default to Date
                $classname = ‚Joomla\\CMS\\Date\\Date‘;
            }
        } else {
            // No tag, so default to Date
            $classname = ‚Joomla\\CMS\\Date\\Date‘;
        }
    }

    $key = $time . ‚-‘ . ($tzOffset instanceof \DateTimeZone ? $tzOffset->getName() : (string) $tzOffset);

    if (!isset(self::$dates[$classname][$key])) {
        self::$dates[$classname][$key] = new $classname($time, $tzOffset);
    }

    $date = clone self::$dates[$classname][$key];

    return $date;
}
...
```

Wie gibt man das Datum in seiner Joomla-Erweiterung im Frontend in der korrekten Zeitzone aus? Auf der sicheren Seite ist man, wenn man die von Joomla zur Verfügung gestellten Funktionen verwendet. Sehen wir uns das Zusammenspiel von `Factory::getDate()` und der Klasse `Joomla\CMS\Date` in Joomla nachfolgend beispielhaft an. 

## Anzeige im Frontend


### Der Wert in der Datenbank

Beginnen wir ganz simpel. Der nachfolgende Code zeigt den String an, der für das Datum in der Datenbank gespeichert ist.

```php
echo $this->item->advent_publish_up;
```

Die Ausgabe ist:

```
2022-10-03 13:30:01
```

Warum die Zeit in der Zeitzone UTC ausgegeben wird, hatte ich schon erläutert.

### Die Zeit in der Zeitzone des angemeldeten Benutzers

Möchte man das Datum in der Zeitzone anzeigen, die beim Benutzer gespeichert ist, zeigt der nachfolgende Code eine Möglichkeit.

```php
$date = Factory::getDate($this->item->advent_publish_up, 'UTC');
$user = Factory::getApplication()->getIdentity();
$date->setTimezone($user->getTimezone());
echo $this->value = $date->format('Y-m-d H:i:s', true, false);
echo "<br><pre>";
print_r($date);
echo "</pre>";
```

Wenn ein Benutzer angemeldet ist, bei dem die Zeitzone `Australia/Adelaide` eingestellt ist, erscheint folgender Text im Frontend:

```
2022-10-04 00:00:01

Joomla\CMS\Date\Date Object
(
    [tz:protected] => DateTimeZone Object
        (
            [timezone_type] => 3
            [timezone] => Australia/Adelaide
        )

    [date] => 2022-10-04 00:00:01.000000
    [timezone_type] => 3
    [timezone] => Australia/Adelaide
)
```

Falls kein Benutzer angemeldet ist, ist die Zeitzone des Servers Fallback. In unserem Beispiel erscheint der nachfolgende Text:

```
2022-10-03 15:30:01

Joomla\CMS\Date\Date Object
(
    [tz:protected] => DateTimeZone Object
        (
            [timezone_type] => 3
            [timezone] => Africa/Johannesburg
        )

    [date] => 2022-10-03 15:30:01.000000
    [timezone_type] => 3
    [timezone] => Africa/Johannesburg
)

```

Der nachfolgende Code zeigt das Datum in der Zeitzone an, die für den Webserver in der globalen Konfiguration gespeichert ist.

```php
$date = Factory::getDate($this->item->advent_publish_up, 'UTC');
$date->setTimezone(new \DateTimeZone(Factory::getApplication()->get('offset')));
echo $this->value = $date->format('Y-m-d H:i:s', true, false);
echo "<br><pre>";
print_r($date);
echo "</pre>";
```

Die Ausgabe ist: 

```
2022-10-03 15:30:01

Joomla\CMS\Date\Date Object
(
    [tz:protected] => DateTimeZone Object
        (
            [timezone_type] => 3
            [timezone] => Africa/Johannesburg
        )

    [date] => 2022-10-03 15:30:01.000000
    [timezone_type] => 3
    [timezone] => Africa/Johannesburg
)

```

Der nachfolgende Code gibt das Datum unmittelbar in der Standard-Zeitzone `UTC` aus.


```php
$date = Factory::getDate($this->item->publish_up, 'UTC');
echo $this->value = $date->format('Y-m-d H:i:s', true, false);
echo "<br><pre>";
print_r($date);
echo "</pre>";
```

Die Ausgabe ist: 

```
2022-10-03 13:30:01

Joomla\CMS\Date\Date Object
(
    [tz:protected] => DateTimeZone Object
        (
            [timezone_type] => 3
            [timezone] => UTC
        )

    [date] => 2022-10-03 13:30:01.000000
    [timezone_type] => 3
    [timezone] => UTC
)
```

Fazit: Je nach Anwendungsfall, also ob Gewinnspiel, bei dem alles gleichzeitig passieren sollte, oder Adventskalender, bei dem die tatsächliche Uhrzeit relevant ist, kann das Datum in der Joomla-Erweiterung programmiert werden.

<img src="https://vg01.met.vgwort.de/na/be6e0f448d4442348d0275b49531a2b7" width="1" height="1" alt="">
