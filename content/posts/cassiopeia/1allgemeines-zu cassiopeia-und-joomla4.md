---
date: 2021-03-03
title: 'Ein Tutorial zur Verwendung des Cassiopeia-Templates für Joomla 4 - Allgemeines zu Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: allgemeines-zu cassiopeia-und-joomla4
langKey: de
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

Joomla ist ein kostenloses Content Management System, kurz CMS, zur Erstellung von Websites. Joomla 3 bezieht sich auf eine beliebige Version der Joomla-Software, Version .x.x.

Eine Joomla-Website setzt voraus, dass wir einen Hosting-Server für die Installation haben. Der Hosting-Server muss die [Mindestanforderungen](https://downloads.joomla.org/de/technical-requirements-de) für eine Joomla-Installation erfüllen, was unterstützte MySQL-Datenbanken, PHP-Version und unterstützte Webserver angeht. Der Hosting-Account muss Zugriff auf eine Datenbank haben, um die Informationen über die Website zu speichern, sowie Zugriff auf das Dateisystem, um die Joomla-Installationsdateien hochzuladen und zu entpacken.

Joomla kann auch auf einem lokalen Computer installiert werden, solange dieser WAMP, LAMP oder XAMP für den Zugriff auf die Datenbank mit Apache, PHP und MySQL installiert hat. Eine lokale Installation wird oft verwendet, um das Joomla-System zu erlernen und um neue Seiten zu entwickeln, bevor sie live ins Netz gehen.

## Cassiopeia

Joomla 4 kommt mit einem Frontend-Templates und einem Administrator Templates. Das Frontend-Templates bestimmen, was der Besucher sieht. Das Administrator Template, oder Backend, ist der Ort, an dem die Administratoren Inhalte erstellen, Einstellungen ändern, Benutzer verwalten, Erweiterungen für zusätzliche Funktionen hochladen.

Cassiopeia ist das Frontend-Template. Der Ordner Cassiopeia und die Dateien befinden sich unter dem Template-Verzeichnis in den Joomla-Installationsdateien. Die Cassiopeia Dateien enthalten den notwendigen Programmcode und die Stile für eine unkomplizierte Website.

Dies ist ein Leitfaden, um das Cassiopeia Template zu verstehen und Änderungen daran vorzunehmen, um es an eigene Bedürfnissen anzupassen.

## Was ist ein Content Management System?

Ein CMS ist eine Benutzeroberfläche zur Erstellung von Websites. Ein CMS stellt die Webseite aus Inhalten zusammen, die in einer Datenbank oder anderen Dateien enthalten sind.

Das CMS erleichtert den Zugriff auf die Datenbank mit einer benutzerfreundlichen Oberfläche. Wir können Inhalte erstellen und das Erscheinungsbild der Website manipulieren, ohne PHP oder MySQL zu kennen. Wenn wir das Aussehen der Website im Frontend verändern wollen, was das Layout, die Farben und die Schriftarten angeht, sollten wir wissen, wie man HTML, XML und CSS benutzt. Es ist auch sehr praktisch, mit Diagnosetools wie den Entwicklerwerzeugen eines Brwosers vertraut zu sein.

Joomla ist ein CMS, das HTML, XML, PHP und MySQL zur Erstellung von Webseiten verwendet.

## Was ist ein Joomla Template?

Ein Template verwaltet das Erscheinungsbild der Website. Dazu gehören die Schriftarten, die Farben, das Layout und die Breite der Spalten und spezielle Effekte wie Ränder und andere Merkmale der Website. Bei Joomla kombiniert das Template Styling und Inhalte aus der Datenbank. Das Template verwendet HTML, CSS, JavaScript und PHP, um den Inhalt zusammenzustellen und sein Aussehen zu verändern.

Das Front-End-Template ist das Gerüst, das den geschriebenen Inhalt, die Bilder, die Navigation und andere Module zusammenstellt und anzeigt. Das Administrations-Template stellt die Benutzeroberfläche für die Website-Administratoren zusammen.

Im Falle von Joomla enthält ein Template die Datei `index.php`, in der alles zusammenläuft. Jede Seite wird mit Hilfe dieser einen Hauptdatei erstellt. Diese Datei wiederum verwendet viele andere Dateien in der Joomla-Installation für die Formatierung. Es gibt andere PHP-Dateien, die die Anzeige von speziellen Inhalten verwalten. Die Datei `index.php` des Templates beinhaltet das HTML-Gerüst für das Layout der Webseiten.

Das Styling des Templates erfolgt mit Hilfe von CSS-Stylesheets. Je nach Template gibt es ein oder mehrere Stylesheets, die mit dem Template verbunden sind. Das Stylesheet bestimmt die Farben, Schriftarten und das Layout der Webseite.

Eine Joomla Installation wird mit dem Frontend Template Cassiopeia sowie dem Backend-Template Atum ausgeliefert.

Es gibt viele andere Templates von Drittanbietern, die für Joomla verfügbar sind. Einige 3rd-Party-Templates sind kostenlos, andere sind kostenpflichtig. Die Verwendung eines Templates eines Drittanbieters kann viele Stunden an Styling und Dateimanipulation ersparen, um das gewünschte Aussehen und Layout für Ihre Seite zu erhalten. Nachteilig ist, dass es von dem Anbieter der Vorlage abhängig macht, wenn wir Support benötigen oder die Website aktualisieren müssen. Cassiopeia wird mit Joomla aktuell gehalten!

## Erwähnenswertes zu Cassiopeia?

Cassiopeia ist die Standardvorlage, die wir unmittelbar nach der Erstinstallation von Joomla sehen. Das Cassiopeia-Template wird von der Joomla-Community entwickelt.

Cassiopeia ist ein einfaches Template, mit einem Minimum an Styling, das als Grundlage für eine individuelle Website dient. Einige Anpassungen am Layout und Aussehen sind unkompliziert, während andere Änderungen gute Kenntnisse von HTML und CSS erfordern.

Wir finden Joomla Templates von Drittanbietern an [verschiedenen Stellen](https://forum.joomla.de/thread/69-template-gesucht-joe-s-liste/) im Internet. Es gibt kostenlose und solche, für die wir bezahlen müssen. Wenn du bestimmte Vorstellungen davon hast, wie deine Website aussehen soll, empfehlen ich dir, diese verfügbaren Vorlagen anzuschauen. Diese bieten eine Oberfläche, die mit relativ wenig Styling oder Änderungen sofort einsatzbereit ist. Die verfügen möglicherweise über zusätzliche Funktionen, die über die Oberfläche des Template-Managers steuerbar sind.

Wer mit seiner Joomla-Website komplett sein eigenes Ding umsetzten möchte, baut idiealerweise auf Cassiopeia auf. Kenntnisse in HTML und CSS sind hilfreich, um das Cassiopeia-Template zu modifizieren. Ein Verständnis von PHP und JavaScript ist ebenfalls ein Vorteil.

Das Cassiopeia Template hat Einstellungen und Optionen, auf die wir über den Template Manager im Template Manager von Joomla zugreifen können. Diese Einstellungen ermöglichen das Ändern von

- Logo
- Titel
- Tagline / Stichwort
- Fonts Scheme / Schrift Schema
- Colour Theme / Template Farbe
- Layout
- Sticky Header
- Back-to-top-Link / „Zurück nach oben“ Link

![Templates_Edit_Style_admin_Administration](/images/c4.png)

Abgesehen von diesen Einstellungen ist für alle Änderungen das Bearbeiten der Dateien erforderlich.

![Templates_Edit_Style_admin_Administration](/images/c1.png)

Cassiopeia verwendet Bootstrap 5 für das Gerüst der Site. Dieses bestimmen die Breite der Spalten und ermöglichen eine responsive Website.

Cassiopeia hat ein einziges CSS-Stylesheet, `template.min.css`. Dies ist die [minifizierte Version](https://wiki.selfhtml.org/index.php?title=Minify&oldid=73854) der Datei `template.css`.

> Das Minifizieren von CSS- und JavaScript-Dateien ist eine von vielen Stellschrauben, um die Ladegeschwindigkeit deiner Webseite zu optimieren und Inhalte zu verschleiern.

Das gesamte Standard-Styling ist in dieser Datei enthalten, einschließlich der `@media`-Queries für unterschiedliche Bildschirmgrößen. Um diese Stile zu ändern, ist es erforderlich, ein eigenes CSS-Stylesheet zu erstellen, das die übergeordneten Stile enthält, die wir für unsere Website wünschen. Cassiopeia ist so geschrieben, dass es ein Stylesheet namens `user.css` erkennt, das sich im css-Verzeichnis der Cassiopeia-Dateien befindet. Die Verwendung eines separaten Stylesheets ermöglicht es, einfach und schnell auf die neuen Styles zuzugreifen. Außerdem läuft man nicht Gefahr, dass eigenen Änderungen überschrieben werden, wenn man die Joomla-Installation aktualisiert.

## SCSS Sass

## Was ist Bootstrap?

---

Bootstrap 5 ist ein Frontend-Webentwicklungswerkzeug, das aus CSS gemischt mit etwas JavaScript besteht und dabei hilft, Websites in Bezug auf verschiedene Bildschirmgrößen reaktionsfähiger zu machen. Außerdem kommen `@media`-Queries und Utility-Klassen zum Einsatz. Es wurde von zwei Webentwicklern bei Twitter entwickelt, um das Webdesign zu erleichtern, so dass weniger Styling für responsives Webdesign erforderlich ist.

Bootstrap 5 verwendet ein 12-faches Rastersystem, das statisch oder fluid sein kann. Das bedeutet, dass die Seite entweder an bestimmten Container-Breiten einrastet oder sich mit einer fließenden Bewegung verkleinert, bei der alle Divs einen Prozentsatz der Container-Breite haben und sich entsprechend verkleinern.

Cassiopeia ist so konzipiert, dass es Bootstrap 5 verwendet. Es braucht ein bisschen, um sich damit vertraut zu machen, aber wenn es richtig verwendet wird, erleichert es das Design.

## Wie setzt Cassiopeia Bootstrap 5 ein?

Cassiopeia verwendet das Bootstrap 5-Grid-System und ermöglicht es Ihnen, auszuwählen, ob Sie ein statisches oder flüssiges Layout wünschen. Beide sind responsive, d.h. sie ändern die Größe und Position des Rastersystems abhängig von der Bildschirmgröße des Geräts.

### Responsive: Statisches Layout

Das statische Layout verwendet 12 Spalten und gestaltet den Container so, dass er eine maximale Breite hat. Wenn wir den Bildschirm verkleinern, passt sich die statische Breite für den Container an. Unterhalb dieser Breite reduziert der Container die Breite, wenn der Bildschirm schmaler wird. Die Divs werden vertikal gestapelt. Ein horizontales Menü wird ebenfalls vertikal gestapelt.

### Reaktionsfähig: Fluid Layout

Das Fluid-System verwendet Prozentwerte statt Pixel für die Spaltenbreiten. Die Klasse `.container-fluid` verkleinert sich proportional in der Breite, wenn sich die Breite verkleinert. Die inneren Unterteilungen innerhalb des Containers verringern sich ebenfalls in der Breite. Bei schmalen Geräten stapeln sich die Unterteilungen übereinander. Dies alles geschieht fließend und verändert sich ständig. Dies mag für einige Sites geeignet sein. Grafikdesigner, die die Arbeit mit festen Papierformaten gewohnt sind, befremdet dies. Den Bilder und Silbentrennung bei Zeilenumbrüchen funktionieren anders.

### CSS Grid

## Beachtenswertes

Mit den Standard-Media-Queries von Bootstrap wird die Responsivität einer Bootstrap-Site durch Verkleinern der Breite des Browser-Fensters sowie auf Tablets und Telefonen erkannt. Das liegt daran, dass die Media Queries `min-width` und `max-width` anstelle von `min-device-width` und `max-device-width` verwenden. `device-width` bezieht sich auf die Auflösung des Displays, beispielsweise 1024 bei einer Displaygröße von 1024x768, während `width` sich auf die Breite des Browsers selbst bezieht, die sich von der Auflösung unterscheidet, wenn der Browser nicht maximiert ist.

Das Bootstrap-Styling ist dazu gedacht, die Menge an CSS zu reduzieren, die für eine korrekt responsive Website erforderlich ist. Das gesamte Styling für Cassiopeia ist in einer Datei namens `template.css` enthalten. Wir können unsere eigenen überschreibenden Stile für jeden der Standardstile für Cassiopeia erstellen, aber wir sollten darauf achten, dass wir das responsive Layout im Ganzen betrachten.

## Overridemanager
