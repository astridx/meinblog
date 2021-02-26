---
date: 2021-03-05
title: 'Ein Tutorial zur Verwendung des Cassiopeia-Templates für Joomla 4 - Optionen in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-optionen
langKey: de
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

Cassiopeia bietet Optionen, die über Styles im Template Manager angepasst werden können. Um größere Änderungen am Aussehen des Templates vorzunehmen, müssen wir in der Lage sein, die Template-Dateien selbst zu bearbeiten, wie beispielsweise die `user.css`, die `index.php` und die `templateDetails.xml`.

Hier sehe ich mir zunächst die Optionen an, für die keine Änderungen im Programmcode notwendig sind und gehen dann auf kleiner Anpassungen in Form von Überschreibungen ein.

Die Bilder sind mithilfe der Beispieldateien erstellt worden. Um gleiche Voraussetzungen zu haben, wäre es gut, wenn du diese ebenfalls in einer Testumgebung installierst. Klick dazu im Dashboard die mit `Installieren` beschriebene Schaltfläche neben Blog-Beispieldateien.

![Blog-Beispieldateien installieren](/images/c11.png)

Das Front-End sollte nun so wie in der nachfolgenden Abbildung aussehen.

![Cassiopeia im Frontend](/images/c12.png)

### Optionen im einzelnen

Um zu diesen Optionen im Joomla Backend zu gelangen, öffne `System | Site Templates Style`.

![Templates_Edit_Style_admin_Administration](/images/c2.png)

Klicke dann Cassiopeia in der Spalte Style.

![Templates_Edit_Style_admin_Administration](/images/c3.png)

#### Registerkarte Details

![Templates_Edit_Style_admin_Administration](/images/c6.png)

Diese Registerkarte enthält Informationen über das Template und erlaubt keine Änderungen.

#### Registerkarte Erweitert

![Templates_Edit_Style_admin_Administration](/images/c4.png)

Diese Registerkarte zeigt verschiedene Parameter, über die das Template beeinflussbar ist.

##### Logo, Titel und Beschreibung

![Templates_Edit_Style_admin_Administration](/images/ce1.png)

###### Logo

Mit einem Klick auf `Auswählen` ist es möglich, ein bereits hochgeladenes Logobild einzufügen oder wir können im Dialogfeld nach unten scrollen und eine Bilddatei vom eigenen Computer hochladen. Standardmäßig wird dieses an der Position des Logomoduls, oben links auf der Webseite, platziert.

Das Standard-Layout des Cassiopeia-Templates ermöglicht es, entweder ein Logo-Bild ODER den Titel der Website im `<Header>`-Bereich der Seite anzuzeigen. Wenn wir ein Logo über diese Methode einfügen, macht Cassiopeia das Logo-Bild automatisch zu einem Link zur Startseite.

###### Titel

Wenn wir keine Logodatei als Bild ausgewählt haben, zeigt das Template den hier dargestellten Titel an. Falls auch dieser fehlt, greift es auf die SVG-Datei `logo.svg` im Verzeichnis `/templates/cassiopeia/images` zurück. Diese SVG-Datei enthält den Text Cassiopeia. Egal, ob Titel oder SVG-Datei eingefügt werde, beides wird automatisch zu einem Link zur Startseite.

###### Code in der Datei index.php

```php
...
...
// Logo file or site title param
if ($this->params->get('logoFile'))
{
	$logo = '<img src="' . Uri::root() . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
}
elseif ($this->params->get('siteTitle'))
{
	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
}
else
{
	$logo = '<img src="' . $templatePath . '/images/logo.svg" class="logo d-inline-block" alt="' . $sitename . '">';
}
...
...
```

##### Tagline / Stichwort - Die Beschreibung der Website

Standardmäßig platziert Cassiopeia die Beschreibung unter dem Titel, beziehungsweise dem Logo. Wir können dies nutzen, um einen Seitentitel anzuzeigen, wenn wir möchten, dass sowohl das Logo als auch der Titel der Seite oben auf der Webseite erscheinen.

###### Beispiel 1

Der Titel wird angezeigt. In einer kleineren Schriftgröße wir das Stichwort unter diesem eingeblendet.

![Templates_Edit_Style_admin_Administration](/images/c7.png)

![Templates_Edit_Style_admin_Administration](/images/c8.png)

###### Beispiel 2

Der Titel wird nicht angezeigt, weil eine Bilddatei als Logo ausgewählt ist. Das Stichwort, wird unter der Bilddatei platziert.

![Templates_Edit_Style_admin_Administration](/images/c9.png)

![Templates_Edit_Style_admin_Administration](/images/c10.png)

##### Fonts Scheme / Schrift Schema

![Templates_Edit_Style_admin_Administration](/images/ce2.png)

Die Frage, welche Schriften eine Site einsetzt, hat zwei Facetten:

- Welche Schriftart ist gut lesbar und sieht gut aus?
- Welche Schriftarten sind technisch möglich. Technisch möglich sind lediglich die Schriftarten, die auf einem Computer installiert sind oder die online zur Verfügung stehen - die Webfonts. Auf meinem Rechner ist die Schriftart Verdana installiert. Die kann ich einer CSS-Datei als Schriftart angeben. Diese wird auf meinem Rechner verwendet - und bei allen Besuchern, die diese Schrift installiert haben. Bei allen anderen erscheint eine andere Schrift. Das ist die Standardschrift des Browsers, falls ich keine alternative Schriftart angegeben habe.

Wenn ich möchte, dass die Standardschriftart des Browsers des Websitebesuchers für meine Website verwendet wird, dann wähle ich bei Schrift-Schema `Keine`. Ist mir die Darstellung wichtig, dann habe ich zwei Möglichkeiten. Ich nutze die Schriftart Roboto, die von Cassiopeia mitgeliefert wird und deshalb über meine Website online verfügbar ist, oder ich lade die Schrift von einer anderen Website. Vorteile und Nachteile sehen wir uns in den nachfolgenden Abschnitten im einzelnen an.

> Welche Schriftart genau verwendet wird, ist über die Entwicklerwerkzeuge eines Browsers anzeigbar. Die Tastaturkürzel für Firefox findet man unter [Öffnen und Schließen von Werkzeugen](https://developer.mozilla.org/de/docs/Tools/Keyboard_shortcuts).

![Templates_Edit_Style_admin_Administration](/images/c13.png)

###### Keine

Keine speziellen Anforderungen an die Schriftart zu stellen, ist am unkompliziertesten.

Nachteilig ist, dass das Aussehen der Website nicht vorhersehbar ist.

Die nachfolgende Abbildung zeigt, dass als Schrift eine serifenlose ausgewählt wird.

![Templates_Edit_Style_admin_Administration](/images/c15.png)

Warum ist das so? In der `template.css` steht die nachfolgende Regel.

```
...
body {
  margin: 0;
  font-family: var(--cassiopeia-font-family-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  ...
}
...
```

Die [`font-family` CSS Eigenschaft](https://developer.mozilla.org/de/docs/Web/CSS/font-family) ist verantwortlich für das Laden. Sie erlaubt es, eine priorisierte Liste von Schrift für ein Element anzugeben. Es handelt sich dabei um Alternativen. Der Browser wählt die erste Schrift, die er laden kann. Im Beispiel ist das `sans-serif`. `--cassiopeia-font-family-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans"` stehen vorher, sind in meinem Fall nicht verfügbar.

###### Schriften aus einem lokalen Verzeichnis

Wer eine Schriftart über die eigenen Website zur Verfügung stellt, hat Sicherheit in Bezug auf das Aussehen der Website. Nebenbei macht man sich datenschutzrechtlich von keinem anderen Anbieter abhängig.

Im Vergleich zum Laden einer Webfont ist die Ladezeit als Nachteil zu nennen, da Webfonts in der Regel von vielen Websites verwendet werden und deshalb für eine Webiste nicht speziell zu laden sind.

Im nachfolgenden sieht man eine mit der Option `Schriften aus Verzeichnis` geladene Website. Roboto wird mit Joomla ausgeliefert. Es ist die einzige Schrift, die im CMS gespeichert ist.

![Templates_Edit_Style_admin_Administration](/images/c14.png)

> Genau liegt Roboto im Verzeichnis `/media/vendor/roboto-fontface`. Das ist hier aber nebensächlich. Webmaster sollten dieses Verzeichnis nicht verwenden, da dieses bei einer Aktualisierung der Joomla Kerndateien veränderbar ist.

Wer eine eigene Schrift hosten möchte, kann dies tun. Ich möchte beispielsweise für alle meine Überschriften die Schriftart `Aclonica` verwenden.

1. Dazu öffne ich die Website [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com) und wähle im linken Bereich die Schriftart `Aclonica` aus.

![google-webfonts-helper](/images/c18.png)

2. Im unteren Bereich der Website habe ich die Möglichkeit eine ZIP-Datei herunterzuladen, die alle erforderlichen Schriftart-Dateien enthält. Ich lade die Datei auf meinen Rechner und entpacke sie.

3. Als nächstes kopiere ich die Dateien in meine Joomla Installation. Ich wähle das Verzeichnis `/templates/cassiopeia/fonts/aclonica-v11-latin`.

![google-webfonts-helper](/images/c20.png)

4. Falls noch nicht geschehen, lege ich die Datei `/templates/cassiopeia/css/user.css` und ergänze folgenden Inhalt.

```
...
/* aclonica-regular - latin */
@font-face {
  font-family: 'Aclonica';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.svg#Aclonica') format('svg'); /* Legacy iOS */
}

h1, .h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-family: "Aclonica", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 700;
}
...
```

5. Nun überprüfe ich im Frontend, ob alles geklappt hat. Ja, alle Überschriften werden in der gewünschten Schriftart angezeigt.

![google-webfonts-helper](/images/c19.png)

> Natürlich ist es möglich, die Schriftarten an einer anderen Stelle abzulegen. Beachte dann, dass in der Datei `/templates/cassiopeia/css/user.css` die Adressierung passt. Verwende dabei relative Pfade, wenn möglich. Ein doppelter Punkt (..) bedeutet, dass es einen Ordner nach oben geht und dann nach dem Ordner hinter dem Schrägstrich gesucht wird. Im Befindet befindet sich die `user.css` im Ordner `/templates/cassiopeia/css/` und die Schriftarten in `/templates/cassiopeia/fonts/aclonica-v11-latin/`, dann ist das `..` korrekt, weil ich einen Ordner zurückgehe, um von `css` zu `/fonts` zu gelangen. Ist die `user.css` in `/templates/cassiopeia/css/` und die Schriftarten in `/templates/cassiopeia/css/fonts`, dann verwende ich nur einen Punkt.

###### Schriften aus dem Web

Die Verwendung einer Schriftart, die auf einem anderen Server im Internet gespeichert ist, birgt eine Abhängigkeit. Zum einen ist es möglich, das der Anbieter sein Angebot einstellt. Zum anderen bietet er die Schriften nicht ganz uneigennützig. Er sammelt dabei die Daten der Nutzer, die die Schrift aufrufen.

Schriften werden auf diese Art eingebunden, weil dies weniger Wissen erfordert. Es ist nicht erforderlich die Schrift selbst herunterzuladen, über den eigenen Webserver verfügbar zu machen und korrekt einzubinden. Außerdem ist eine häuftig verwendet Google Font höchstwahrscheinlich im Cache eines Browsers. Dies wirkt sich positiv auf Ladezeiten aus.

Die nachfolgenden Bilder zeigen die Beispielsite mit der Option `Schriften aus dem Web`. Die Schrift Fire Sans wird verwendet. In der Netzwerkanalyse der Entwicklerwerkzeuge erkennst du, dass die Schrift von fonts.gstatic.com geladen wird.

![Templates_Edit_Style_admin_Administration](/images/c16.png)

![Templates_Edit_Style_admin_Administration](/images/c17.png)

Wer eine eigene Schrift laden möchte ohne sie selbst zu hosten, kann dies tun. Ich zeige dies wieder an dem Beispiel, bei dem ich für alle meine Überschriften die Schriftart `Aclonica` einsetze.

> Bevor man Schriftarten aus dem Internet lädt und über seine Website anzeigt, ist erforderlich sich datenschutzrechtlich zu informieren.

1. Ich öffne die Website [Google Fonts](https://fonts.google.com) und und such hier [Aclonica](https://fonts.google.com/specimen/Aclonica?preview.text_type=custom&sidebar.open=true&selection.family=Aclonica).

2. Ich wähle die Schriftart aus `Select this style` und klicke rechts oben auf `View your selected families.`- Mir werden alle erforderlichen Angaben angezeigt.

![Templates_Edit_Style_admin_Administration](/images/c.png)

3. Falls noch nicht geschehen, lege ich die Datei `/templates/cassiopeia/css/user.css` und ergänze folgenden Inhalt.

```
...
@import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');

h1, .h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-family: "Aclonica", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 700;
}
...
```

5. Nun überprüfe ich im Frontend, ob alles geklappt hat. Ja, alle Überschriften werden in der gewünschten Schriftart angezeigt.

##### Colour Theme / Template Farbe

Die Template Farbe oder das Farbschema ist nichts anderes als eine (S)CSS-Datei, die CSS-Variablen für das Template festlegt. Cassiopeia enthält zwei Farbschemen:

- Standard: ein Schema, für das die Farben optimiert wurden, damit alles barrierefrei ist.
- Alternative: ein Beispiel für eine benutzerdefinierte Implementierung.

![Templates_Edit_Style_admin_Administration](/images/ce3.png)

Diese Farben sind überschreibbar. Der nachfolgende Code, beispielsweise in der `user.css` verändert die Farben im Frontend.

```
:root {
  --cassiopeia-color-primary: #ff0000;
  --cassiopeia-color-link: #00ff00;
  --cassiopeia-color-hover: #0000ff;
}
```

Die nachfolgende Ansicht ist nicht schön. Es geht nur ums Prinzip:

![Cassiopeia Frontend Farbscheme](/images/c22.png)

- cassiopeia-color-primary` legt die Hauptfarbe des Templates fest.
- cassiopeia-color-link`gibt die Farbe an, in der Links dargestellt werden. -cassiopeia-color-hover` bestimmt die Farbe, mit der Links beim Überrollen mit der Maus reagieren.

##### Layout

![Templates_Edit_Style_admin_Administration](/images/ce4.png)

Cassiopeia passt sich an Bildschirmgrößen an, egal ob wir uns für ein statisches oder ein fluides Layout entscheiden. Es sind nur unterschiedliche Ansätze.

Container sind das grundlegendste Layout-Element in Bootstrap und werden benötigt, wenn unser Standard-Grid-System verwendet wird. Container werden verwendet, um den Inhalt in ihnen zu enthalten, aufzufüllen und unter Umständen zu zentrieren. Während Container verschachtelt werden _können_, benötigen die meisten Layouts keine verschachtelten Container.

Bootstrap wird mit drei verschiedenen Containern ausgeliefert. Dabei sind die ersten beiden für uns relevant.

- `.container`, der eine `max-width` an jedem responsiven Haltepunkt setzt
- `.container-fluid`, der an allen Haltepunkten eine `Breite: 100%` hat
- `.container-{Breakpoint}`, der bis zum angegebenen Breakpoint `Breite: 100%` ist

Die folgende [Tabelle](https://getbootstrap.com/docs/5.0/layout/containers/) zeigt, wie die `max-width` jedes Containers mit der ursprünglichen `.container` und `.container-fluid` an jedem Haltepunkt zusammen arbeitet.

| Extra klein <576px | Small\≥576px | Medium\≥768px | Large\≥992px | X-Large\≥1200px | XX-Large\≥1400px |
| ------------------ | ------------ | ------------- | ------------ | --------------- | ---------------- |
| `.container`       | 100%         | 540px         | 720px        | 960px           | 1140px           | 1320px |
| `.container-sm`    | 100%         | 540px         | 720px        | 960px           | 1140px           | 1320px |
| `.container-md`    | 100%         | 100%          | 720px        | 960px           | 1140px           | 1320px |
| `.container-lg`    | 100%         | 100%          | 100%         | 960px           | 1140px           | 1320px |
| `.container-xl`    | 100%         | 100%          | 100%         | 100%            | 1140px           | 1320px |
| `.container-xxl`   | 100%         | 100%          | 100%         | 100%            | 100%             | 1320px |
| `.container-fluid` | 100%         | 100%          | 100%         | 100%            | 100%             | 100% |

Sehen wir uns das nun im Einzelnen an.

###### Fluid - `.container-fluid`

Fluid ist gut für Seiten, bei denen der Inhalt die volle Breite eines großen Bildschirms einnimmt. Mit Fluid verkleinert sich unsere Seite kontinuierlich, wenn sich das Browserfenster verkleinert. Die Breite der Seitenspalten und der Inhaltsbereich sind alle ein Prozentsatz der Bildschirmbreite und verkleinern sich, wenn das Sichtfenster kleiner wird. Dies funktioniert möglicherweise nicht für alle Inhalte oder für alle Module an der Seite gut.

Ausführlicher gehe ich im [Exkurs: CSS Grid und Bootstrap-5-in-joomla](/css-grid-and-bootstrap-5-in-joomla) darauf ein.

###### Statisch - `.container`

Bei statisch bleiben der Inhaltsbereich und die Seitenspalten in der Mitte großer Monitore auf einer festen Breite. Wenn der Bildschirm schmaler wird, werden die Spalten und der Inhaltsbereich immer schmaler. Bei geringen Bildschirmbreiten stapeln sich schließlich die Elemente übereinander.

##### Sticky Header

![Templates_Edit_Style_admin_Administration](/images/ce5.png)

Diese Option bewirkt, dass der Kopfbereich immer im oberen Teil angezeigt wird. Auch dann, wenn die Seite nach unten gescollt wird.

In der `index.php` ist dies wie folgt implementiert.

```
...
$stickyHeader = $this->params->get('stickyHeader') ? 'position-sticky sticky-top' : '';
...
...
	<header class="header container-header full-width <?php echo $stickyHeader; ?>">
		<div class="grid-child">
			<div class="navbar-brand">
				<a class="brand-logo" href="<?php echo $this->baseurl; ?>/">
					<?php echo $logo; ?>
				</a>
				<?php if ($this->params->get('siteDescription')) : ?>
					<div class="site-description"><?php echo htmlspecialchars($this->params->get('siteDescription')); ?></div>
				<?php endif; ?>
			</div>
		</div>
...
```

Der im nächsten Bild mit dem Pfeil gezeigte Abschnitt bleibt immer im Anezigebereiche.

![Cassiopeia Frontend Sticky Header](/images/c24.png)

##### Back-to-top-Link / „Zurück nach oben“ Link

![Templates_Edit_Style_admin_Administration](/images/ce6.png)

Das Cassiopeia Template bietet die Möglichkeit, einen Pfeil im unteren Bereich einzublenden, über den mit einem Klick der Anzeigebreich nach oben verschiebbar ist.

![Cassiopeia Frontend Back-to-top-Link](/images/c23.png)

### Registerkarte Menüs zuordnen

![Templates_Edit_Style_admin_Administration](/images/c5.png)

Wenn wir für verschiedene Seiten unterschiedliche Templaten verwenden möchten, können wir hier die Seiten auswählen. Natürlich müssen die Seiten bereits in den Menüs vorhanden sein, bevor wir etwas auswählen. Wenn deine Seiten Teil eines Kategorie-Blogs oder einer Kategorie-Liste und kein separater Menüpunkt sind, werden die einzelnen Unterseiten in dieser Liste nicht angezeigt.
