---
description: 'desc'
shortTitle: 'short'
date: 2021-03-03
title: 'Allgemeines zu Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: allgemeines-zu-cassiopeia-und-joomla4
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Joomla ist ein Open Source Content Management System, kurz CMS, zur Erstellung von Websites. Joomla 4 bezieht sich dabei auf eine beliebige Version der Reihe 4.x.x.

Eine Joomla-Website setzt eine bestimmte Umgebung voraus. Ein Server muss die [Mindestanforderungen](https://downloads.joomla.org/de/technical-requirements-de)[^downloads.joomla.org/de/technical-requirements-de]<!-- \index{Installation!Mindestanforderungen} --> für eine Joomla-Installation erfüllen. Achte insbesondere auf unterstützte MySQL oder PostgreSQL-Datenbankversionen, PHP-Version und unterstützte Webserver. Wichtig ist auch, dass dein Hosting-Account über den Zugriff auf die Datenbank verfügt, sowie Zugriff auf das Dateisystem hat, um die Joomla-Installationsdateien hochzuladen und zu entpacken.

Joomla kann auch auf einem lokalen Computer <!-- \index{Installation!lokal} --> installiert werden, solange dieser über die notwendigen Voraussetzungen verfügt. Für Anfänger empfiehlt sich eine leicht zu installierende Distribution, die Apache, MariaDB und PHP enthält. In Frage kommen hierfür [WAMP](https://www.heise.de/download/product/wampserver-56697)[^heise.de/download/product/wampserver-56697], [LAMP](<https://de.wikipedia.org/wiki/LAMP_(Softwarepaket)>)[^de.wikipedia.org/wiki/lamp_(softwarepaket)] oder [XAMP](https://www.apachefriends.org/de/index.html)[^apachefriends.org/de/index.html]. Eine lokale Installation wird oft verwendet, um das Joomla-System zu erlernen und um neue Seiten zu entwickeln, bevor sie live ins Netz gehen.

## Cassiopeia

Joomla 4 kommt mit einem Frontend-Templates und einem Administrator-Templates. Das Frontend-Template bestimmen, was der Besucher sieht. Das Administrator Template wirkt im Backend, also dem Ort, an dem die Administratoren Inhalte erstellen, Einstellungen ändern, Benutzer verwalten, Erweiterungen für zusätzliche Funktionen hochladen.

Cassiopeia ist das Frontend-Template. Der Ordner Cassiopeia und die dazugehörigen Dateien befinden sich im Joomla 4 Template-Verzeichnis. Die Cassiopeia Dateien enthalten den notwendigen Programmcode und die Stile für eine _weitestgehend_ barrierefreie und responsive Website.

> Warum steht das Wort _weitestgehend_ im vorhergehenden Satz? Die Aussage _Das ist nicht responsiv_ kann man meiner Meinung nach nicht ohne weitere Erklärung aussprechen. Man muss gleichzeitig definieren, was nicht korrekt reagiert. Also das, was man auf schmalen und/oder großen Displays nicht benutzerfreundlich erkennt. Nebenbei ist das Empfinden subjektiv. Manche sind der Meinung, das ein Slider im Header auf schmalen Displays nichts zu suchen hat. Andere empfinden es als Fehler, wenn der dort nicht vorhanden ist. _Das ist barrierefrei_ ist ebenfalls ein absoluter Satz, dem eine Menge an Barrieren gegenüberstehen: So unterschiedlich die Menschen sind, so unterschiedlich sind die Barrieren. Im Internet beschränkt sich dies nicht auf Menschen. Für Maschinen spielen Barrieren ebenfalls eine Rolle. Nebenbei passierte es nicht selten, dass eine abgebaute Barriere eine neue schafft. Der Zustand absoluter Barrierefreiheit ist meiner Meinung nach nicht zu erreichen.

Nachfolgend beschreibe ich meine Erfahrungen mit dem Cassiopeia Template. Ich zeige wie ich Änderungen durchführte, um Cassiopeia an meine eigenen Bedürfnisse anzupassen.

## Was ist ein Content Management System?<!-- \index{CMS!Was ist das?} -->

Ein CMS ist eine Benutzeroberfläche zur Erstellung von Websites. Ein CMS stellt die Webseite aus Inhalten zusammen, die in einer Datenbank oder anderen Dateien enthalten sind.

Das CMS erleichtert den Zugriff auf die Datenbank. In der Regel bietet es eine benutzerfreundliche Oberfläche. Hier können Inhalte erstellt und das Erscheinungsbild der Website manipuliert werden. Dabei sind keine PHP oder SQL Kenntnisse erforderlich. Wer das Aussehen der Website im Frontend verändern möchte sollte wissen, wie man HTML und CSS benutzt. Je tiefer das Wissen in diesen Bereichen, desto einfacher sind das Layout, die Farben und die Schriftarten zu individualisieren. Es ist auch sehr praktisch, mit Diagnosetools wie den [Entwicklerwerkzeugen](https://de.wikipedia.org/wiki/Wikipedia:Technik/Browser/Entwicklerwerkzeuge)[^https://de.wikipedia.org/wiki/wikipedia:technik/browser/entwicklerwerkzeuge] eines Browsers vertraut zu sein.

> Mit einem Content Management System ist es möglich unkompliziert über einen Webbrowser alle Informationen einer Website zu ändern. Es ist nicht erforderlich mühsam statische Internetseiten zu erzeugen und diese dann auf den Webserver zu kopieren. Dieser große Vorteil hat einen entscheidenden Nachteil. Content Management Systeme erstellen die Website dynamisch mit Hilfe von Skripten. Manche dieser Skripte sind alt und enthalten Code, der heute nicht mehr so geschrieben werden würde. Deshalb findet man immer wieder mehr oder weniger große Sicherheitslücken. Es ist zwingend, dass ein CMS auf dem neuesten Stand gehalten wird und Aktualisierungen zeitnah installiert werden!

Joomla 4 ist ein CMS, das PHP und eine Datenbank zur Erstellung Websites verwendet.

## Was ist ein Joomla Template?<!-- \index{Template!Was ist das?} -->

Ein Template verwaltet das Erscheinungsbild der Website. Dazu gehören die Schriftarten, die Farben, das Layout und spezielle Effekte der Website. Im Falle von Joomla kombiniert das Template Styling und Inhalte aus der Datenbank. Das Template verwendet HTML, CSS, JavaScript und PHP, um den Inhalt zusammenzustellen und sein Aussehen zu bestimmen.

> Das Front-End-Template ist das Gerüst, das den geschriebenen Inhalt, die Bilder, die Navigation und andere Module zusammenstellt und anzeigt. Es befindert sich im Unterverzeichnis `templates`. Das Administrations-Template stellt die Benutzeroberfläche für die Website-Administratoren zusammen und du findest es im Unterverzeichnis `administrator\templates`

Ein Joomla Template beinhaltet die Datei `index.php`, in der alles zusammenläuft. Jede Seite wird mit Hilfe dieser einen Hauptdatei erstellt. Diese Datei wiederum verwendet viele andere Dateien der Joomla-Installation für die Formatierung. Es gibt PHP-Dateien, die die Anzeige von speziellen Inhalten verwalten. Die Datei `index.php` des Templates beinhaltet das HTML-Gerüst für das Layout der Webseiten und arbeitet mit den anderen Dateien Hand in Hand.

Das Styling des Templates erfolgt mit Hilfe von CSS-Stylesheets. Je nach Template gibt es ein oder mehrere Stylesheets, die mit dem Template verbunden sind. Das Stylesheet bestimmt die Farben, Schriftarten und das Layout der Webseite. Es wird im Falle von Cassiopeia über [Sass](https://sass-lang.com/)[^sass-lang.com/] generiert. Wenn du Cassiopeia anpassen möchtest, reicht es aus, wenn dich mit CSS auskennst. Sass-Kenntnisse sind nicht zwingend, sondern erleichtern lediglich die Arbeit.

Eine Joomla Installation wird mit dem Frontend Template _Cassiopeia_ sowie dem Backend-Template _Atum_ ausgeliefert.

Es gibt viele andere Templates von Drittanbietern, die für Joomla verfügbar sind. Einige 3rd-Party-Templates sind kostenlos, andere sind kostenpflichtig. Die Verwendung eines Templates eines Drittanbieters kann viele Stunden an Styling und Dateimanipulation ersparen, um das gewünschte Aussehen und Layout für Ihre Seite zu erhalten. Nachteilig ist, dass es von dem Anbieter der Vorlage abhängig macht, wenn wir Support benötigen oder die Website aktualisieren müssen. Cassiopeia wird mit Joomla aktuell gehalten!

## Erwähnenswertes zu Cassiopeia?

Cassiopeia ist das Standardtemplate, welches wir unmittelbar nach der Erstinstallation von Joomla sehen. Cassiopeia wird von der Joomla-Community entwickelt.

Cassiopeia ist ein einfaches Template, mit einem Minimum an Styling, das als Grundlage für eine individuelle Website dient. Einige Anpassungen am Layout sind unkompliziert, während andere Änderungen gute Kenntnisse von HTML und CSS erfordern.

Joomla Templates von Drittanbietern werden an [verschiedenen Stellen](https://forum.joomla.de/thread/69-template-gesucht-joe-s-liste/)[^forum.joomla.de/thread/69-template-gesucht-joe-s-liste/] im Internet angeboten. Es gibt kostenlose und solche, die kommerziell vertrieben werden. Wenn du keine bestimmte Vorstellungen davon hast, wie deine Website aussehen soll, empfehle ich dir, Drittanbietertemplates anzuschauen. Viele bieten eine Oberfläche, die mit relativ wenig Styling oder Änderungen sofort einsatzbereit ist. Manche verfügen über zusätzliche Funktionen, die über die Oberfläche des Template-Managers steuerbar sind.

Wer mit seiner Joomla-Website unabhängig sein eigenes Desing umsetzten möchte, baut meiner Meinung nach idealerweise auf Cassiopeia auf. Kenntnisse in HTML und CSS sind hilfreich, um das Template zu modifizieren. Ein Verständnis von PHP und JavaScript ist ebenfalls ein Vorteil.

Das Cassiopeia Template hat Einstellungen und Optionen<!-- \index{Optionen!Cassiopeia} --><!-- \index{Cassiopeia!Optionen} -->, auf die wir über den Template Manager im Template Manager von Joomla zugreifen können. Diese Einstellungen ermöglichen das Ändern von

- Logo
- Titel
- Tagline / Stichwort
- Fonts Scheme / Schrift Schema
- Colour Theme / Template Farbe
- Layout
- Sticky Header
- Back-to-top-Link / „Zurück nach oben“ Link

![Die Ansicht des Menüpunktes Templates | Edit Style im Joomla Administrationsbereich](/images/c4.png)

Abgesehen von diesen Einstellungen ist für alle Änderungen das Bearbeiten der Dateien erforderlich.

Cassiopeia verwendet Bootstrap 5 als Gerüst der Site. Dieses bestimmen die Breite der Spalten und ermöglichen eine responsive Website.

Cassiopeia sammelt alle Stile in einer CSS-Stylesheet-Datei mit dem Namen `template.min.css`. Dies ist die [minifizierte Version](https://wiki.selfhtml.org/index.php?title=Minify&oldid=73854) der Datei `template.css`.

> Das Minifizieren von CSS- und JavaScript-Dateien ist eine von vielen Stellschrauben, um die Ladegeschwindigkeit deiner Webseite zu optimieren und Inhalte zu verschleiern.

Alle Styles die standardmäßig genutzt werden sind in dieser Datei enthalten, einschließlich der `@media`-Queries für unterschiedliche Bildschirmgrößen. Um diese Standard-Stile zu ändern, ist es erforderlich, ein eigenes CSS-Stylesheet zu erstellen. Diese eigene Stildatei überschreibt die Cassiopiea Definitionen so wie wir es für unsere Website wünschen. Cassiopeia ist so geschrieben, dass es ein Stylesheet namens `user.css` erkennt, welches sich im Unterverzeichnis CSS der Cassiopeia-Dateien befindet. Die Verwendung eines separaten Stylesheets ermöglicht es, einfach und schnell auf die neuen Styles zuzugreifen. Außerdem läuft man nicht Gefahr, dass eigene Änderungen überschrieben werden, wenn man die Joomla-Installation aktualisiert.

> Du möchtest mehr als nur CSS verändern? Vielleicht fragst du dich, wie du ein Child-Template für Cassiopeia anlegst. Viele kennen dies vom CMS Wordpress. In Joomla funktionierte dies bis zur Version 4.1 anders. Um sich vor dem Überschreiben des eigenen neuen Codes während eines Joomla Updates zu schützen, musste man das entsprechende Template kopieren und in der Kopie die Änderungen vornehmen. Der Vorteil der Arbeit an einer Kopie war, dass man die Änderungen, die man beim Aktualisieren vorgenommen hat, nicht verliert. Der Nachteil war, dass man Aktualisierungen an Cassiopeia selbst in seine Kopie integrieren musste, wenn man diese neuen Funktionen wünschte. Seit Joomla 4.1 ist dieser Mangel [behoben](https://github.com/joomla/joomla-cms/pull/35874)[^github.com/joomla/joomla-cms/pull/35874]. Mit der Einführung von Child-Templates in Joomla 4.1 ist es möglich, ein Template zu erstellen, in dem man nur die Dinge ändert, die man individuell gestalten möchte. Alles andere wird von einem Elterntemplate verwendet. Um diese Funktion anbieten zu können ist es erforderlich, die Speicherorte der Mediendateien im Cassiopeia-Template zu verändern. Der Pfad zu den _Template-Medien-Verzeichnissen_ war vor Joomla 4.1 `templates/cassiopeia/`. Template-Medienordner sind die Ordner `css`, `images`, `fonts`, `js` und `scss`. Ab Joomla 4.1 befinden sich die Dateien im Verzeichnis `media/templates/site/cassiopeia/`. Muss man beim Update von Joomla 4.0 auf Joomla 4.1 etwas beachten? Kurze Antwort: Nein, Joomla kümmert sich um alles. Wenn du zum Beispiel eine `templates/cassiopeia/css/user.css` erstellt hast, wird diese Datei nach dem Update von 4.0 auf 4.1 automatisch nach `media/templates/site/cassiopeia/css/user.css` verschoben.

## Was ist SCSS oder Sass?<!-- \index{SCSS!Was ist das?} --><!-- \index{Sass!Was ist das?} -->

[Was ist SCSS oder Sass](<https://de.wikipedia.org/wiki/Sass_(Stylesheet-Sprache)>)[^de.wikipedia.org/wiki/sass_(stylesheet-sprache)]? Sass (steht für "Syntactically awesome style sheets") ist eine Erweiterung von CSS, die es ermöglicht, Variablen, verschachtelte Regeln, Inline-Importe und vieles mehr zu verwenden. Als CSS-Präprozessor hilft es, Code zu organisieren und erlaubt es so, Stylesheets schneller und übersichtlicher zu erstellen. Sass ist mit allen Versionen von CSS kompatibel. SCSS ist eine besondere Schreibweise oder Syntax.

## Was ist Bootstrap?<!-- \index{Bootstrap!Was ist das?} -->

Bootstrap 5 ist ein Frontend-Webentwicklungswerkzeug, das aus CSS gemischt mit etwas JavaScript besteht. Es unterstützt Website-Entwickler dabei, Websites in Bezug auf verschiedene Bildschirmgrößen reaktionsfähiger zu bauen. Außerdem kommen `@media`-Queries und Utility-Klassen zum Einsatz. Es wurde von Webentwicklern bei Twitter entwickelt, um das Design für unterschiedliche Bildschirmgrößen zu erleichtern indem auf vorgefertigte Lösungen zurückgegriffen werden kann und weniger eigener spezieller Code erforderlich ist.

Bootstrap 5 verwendet ein [12-faches Rastersystem](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/], das _statisch_ oder _fluid_ sein kann. Das bedeutet, dass die Seite entweder an bestimmten Website-Breiten einrastet oder sich mit einer fließenden Bewegung verkleinert, bei der alle Bereiche einen Prozentsatz der gesamten Breite einnehmen und sich entsprechend verkleinern.

Cassiopeia ist für Bootstrap 5 konzipiert. Wenn man Bootstrap nicht kennt, braucht man etwas Zeit, um sich mit dem Framework vertraut zu machen. Wenn Bootstrap richtig verwendet wird, erleichtert es ein technisch gutes Design. Manche sind der Meinung, dass Websites, die mit Bootstrap erstellt wurden, alle gleich aussehen. Ich denke, dass es wie überall im Leben ist. Alles bietet Vorteile und Nachteile und der gesunde Mittelweg ist oft der beste. Wer sich auskennt, kann die Vorteile von Bootstrap nutzen und trotzdem eine individuelle Website bauen. Mit weniger Kenntnissen hilft Bootstrap eine Website für alle Geräte technisch gut und barrierefrei umzusetzen.

## Wie setzt Cassiopeia Bootstrap 5 ein?

Cassiopeia verwendet das Bootstrap 5-Grid-System und ermöglicht es, ein statisches oder flüssiges Layout auszuwählen. Beide Versionen sind responsive, das heißt sie ändern die Größe und Position des Rastersystems abhängig von der Bildschirmgröße des anzeigenden Geräts.

### Responsive: Statisches Layout<!-- \index{statisch!Layout} --><!-- \index{Layout!statisch} -->

Das statische Layout verwendet 12 Spalten und gestaltet die Website so, dass diese eine _maximale_ Breite hat. Wenn wir den Bildschirm verkleinern, passt sich die Breite an. Ist die Breite des anzeigenden Displays geringer, als die _maximale_ Breite, verwendet die Website die _maximale_ Breite nicht weiter sondern passt sich an die neuen Gegebenheiten an. Einzelne nebeneinander liegende Bereiche werden ab bestimmten Breakpoints über- und untereinander dargestellt. Ein horizontales Menü wird ebenfalls vertikal gestapelt.

### Responsive: Fluid Layout<!-- \index{fluid!Layout} --><!-- \index{Layout!fluid} -->

Das Fluid-System verwendet Prozentwerte statt Pixel für die Spaltenbreiten. Ein Element der Klasse `.container-fluid` verengt sich proportional, wenn die Breite des Anzeigegerätes abnimmt. Die inneren Unterteilungen innerhalb der Website verringern sich ebenfalls in der Breite. Bei schmalen Geräten stapeln sich die Unterteilungen übereinander. Dies alles geschieht fließend und verändert sich ständig. Dies ist für viele Website optimal. Grafikdesigner, die die Arbeit mit festen Papierformaten gewohnt sind, befremdet dies, weil das Positionieren von Bildern und die Silbentrennung bei Zeilenumbrüchen anders funktionieren.

### Was ist CSS Grid<!-- \index{CSS Grid!Was ist das?} -->

[CSS Grid](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Grid_Layout)(^developer.mozilla.org/de/docs/Web/CSS/CSS_Grid_Layout) ist ein zweidimensionales Rastersystem, das für das Layout von Elementen auf einer Webseite verwendet wird. Das Raster besteht aus horizontalen und vertikalen Linien, die Zeilen und Spalten bilden, ähnlich wie bei einer Tabelle.

Bootstrap bietet ebenfalls ein Raster-Layout-System und du fragst dich nun vielleicht, warum Joomla 4 zusätzlich CSS Grid verwendet? CSS Grid ist ein einfaches und flexibles Grid-Layoutsystem, welches im Bereich Benutzererfahrung Vorteile bietet. Daher ist die Verwendung von CSS Grid gegenüber Bootstrap bei der Implementierung einfacher Layouts sinnvoll. Bootstrap ist eher eine Frontend-Toolkit-Suite, die mit ihren vordefinierten Klassen komplexe responsive Designs erstellt.

## Beachtenswertes

Mit den Standard-Media-Queries von Bootstrap 5 wird die Responsivität einer Bootstrap-Site durch Verkleinern der Breite des Browser-Fensters sowie auf Tablets und Telefonen erkannt. Das liegt daran, dass die Media Queries `min-width` und `max-width` anstelle von `min-device-width` und `max-device-width` verwenden. `device-width` bezieht sich auf die Auflösung des Displays. Die Breite ist beispielsweise 1024 bei einer Displaygröße von 1024x768. `width` bezieht sich auf die Breite des Browsers selbst bezieht, die sich von der Displaygröße unterscheidet, wenn der Browser nicht maximiert ist.

Das Bootstrap-Styling zielt darauf ab, den CSS-Code zu minimieren, welcher für eine korrekt responsive Website erforderlich ist. Ich hatte es schon geschrieben: Das gesamte Styling für Cassiopeia ist in einer Datei namens `template.css` enthalten. Alle Style können unsere überschrieben werden. Beim Überschreiben sollte man darauf achten, dass man das responsive Layout im Ganzen betrachten.

## Overrideverwaltung in Joomla 4

Neu in Joomla 4 ist die Differenzanzeige<!-- \index{Override!Differenzanzeige} -->, die bei einer Joomla Aktualisierungen auf Änderungen im überschriebenen Code aufmerksam macht. Das ist insbesondere dann sinnvoll, wenn man den Hauptanteil der Joomla! Standard-View im eigenen Override übernommen hat und mit der Aktualisierung ein Sicherheitsproblem in genau dieser View behoben wurde. Nebenbei macht sie das Anlegen eines Overrides zum Kinderspiel. Das neue Werkzeug ist über den Tempalte-Mánager erreichbar und unterstützt durch eine Differenzanzeige.

## Häufig auftretende Fragen

### Wie erkennt man, ob Cassiopeia die Startseite einer Joomla Website oder eine Unterseite rendert?

Du möchtest ein Cassiopeia Child Template oder ein Override erstellen, welches sich auf der Startseite anders verhält oder anders aussieht als auf allen anderen Seiten. Die nachfolgenden Schritte zeigen dir auf, wie du herausfindest, ob dein Template gerade die Startseite deiner Joomla Website rendert oder eine Unterseite.

Bei mehrsprachigen Websites hängt die Startseite von der aktuell gewählten Sprache ab. Um herauszufinden, welche Sprachversion gerade aktiv ist, benötigst du Funktionen aus dem Namespace `Multilanguage`. Importiere diesen Namespace, wenn du für mehrsprachige Websites gewappnet sein möchtest.

```php
use Joomla\CMS\Language\Multilanguage;
```

Den nachfolgenden Code gibt es in der Datei `templates/cassiopeia/index.php`, also Cassiopeia. Falls diese Datei für dein Child-Template oder deine Templatekopie kopiert hast, ist es somit nicht erforderlich ihn nochmal anzulegen. Stelle sicher, dass die Zeilen

```php
$app = Factory::getApplication();
...
...
...
$menu = $app->getMenu()->getActive();

```

in der Datei die du gerade bearbeitest vorhanden sind. Das Gleiche gilt, wenn Sie einen Override implementieren.

Mit dem Aufruf `$home = $app->getMenu()->getDefault();` belegt du auf einer nicht mehrsprachigen Website die Variable `$home` mit `true`. Auf merhsprachigen Websites ist ein Parameter erforderlich. Verwende hier `$home = $app->getMenu()->getDefault($lang->getTag());`.

```php
<?php
// Look for the home menu
if (Multilanguage::isEnabled())
{
$home = $app->getMenu()->getDefault($lang->getTag());
}
else
{
$home = $app->getMenu()->getDefault();
}
?>
```

Ab jetzt kannst du zwischen den Zeilen

```php
<?php if ($menu === $home) : ?>

<?php endif; ?>
```

alles einfügen, was auf der Startseite verwendet werden soll.

Nutze

```php
<?php if ($menu !== $home) : ?>

<?php endif; ?>
```

für den Code, der auf allen anderen Website verwendet wird.
<img src="https://vg04.met.vgwort.de/na/82c9dbfb46974602adc7fe5207bc48d1" width="1" height="1" alt="">
