---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2021-03-11
title: 'Ein Banner ganz oben und die Navigation horizontal darunter'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-banner
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Du hast kein Logo und es gibt auch keinen Text, der anstelle des Logos auf deiner Website passt. Dafür möchtest du ein Banner ganz oben auf deiner Joomla Website anzeigen. Unter diesem Banner, soll dein Menü erscheinen. Das Logo oder der alternative Text soll gar nicht zu sehen sein. Am allerliebsten wäre es dir, wenn deine Website genauso aussieht, wie du sie unter Joomla 3 und Protostar angelegt hast.<!-- \index{Banner} --><!-- \index{Navigation} -->

So soll es aussehen:

![So soll es aussehen](/images/logotobe.png)

Wie ist das mit Cassiopeia umsetzbar?

Das Frontend einer frischen Joomla 4 Installation sieht mit Cassiopeia so aus, wie im nächsten Bild zu sehen ist. Ganz oben befindet sich der Bereich, der die Marke oder das Branding widerspiegelt.

- Ohne benutzerdefinierte Änderungen steht an dieser Stelle der in den Optionen des Templates eingetragene Titel. Falls es noch keinen Titel gibt, ist der Name des Templates die Rückfallposition. Deshalb steht hier im Bild ganz oben Cassiopeia.
- Das Menü befindet sich in der rechten Seitenleiste.

![Frontend einer frischen Joomla 4 Installation mit Cassiopeia - Menü in der Seitenleiste](/images/logo0.png)

## Die Navigation horizontal und im oberen Bereich

Als erstes verschieben wir die Navigation nach oben und stellen diese horizontal dar.

Öffne dazu im Backend über die linke Seitennavigation `Content | Site Modules` das Modul, in dem die Navigation implementiert ist. In einer ganz frischen Installation ist das `Main Menu`.

![Frontend einer frischen Joomla 4 Installation mit Cassiopeia](/images/logo0a.png)

Stelle zunächst sicher, dass die Position `menu` ausgewählt ist.

![Frontend einer frischen Joomla 4 Installation mit Cassiopeia](/images/logo1.png)

Wähle dann im Tabulator `Advanced (Erweitert)` das korrekte Layout. Wenn du als Ziel hast, dass die Navigation bei einer geringen Displaybreite zu einem [Hamburgermenu](https://de.wikipedia.org/wiki/Hamburger-Men%C3%BC-Icon)[^de.wikipedia.org/wiki/hamburger-men%c3%bc-icon] verwandelt wird, dann wähle `Collapsible Dropdown`. Wenn du bei einer geringen Bildschirmweite weiterhin die Menüpunkte als Text darstellen möchtest, dann wähle `Dropdown`.

![Frontend einer frischen Joomla 4 Installation mit Cassiopeia Dropdown](/images/logo2.png)

> Hintergründe zu den Layouts `Collapsible Dropdown`und `Dropdown` findest du im [PR 33978](https://github.com/joomla/joomla-cms/pull/33978)[^github.com/joomla/joomla-cms/pull/33978].

Sieh dir nun das Ergebnis im Frontend an. Das Menü befindet sich jetzt am oberen Bildschirmrand und du kannst Untermenüpunkte per Klick auf ein kleines Dreieck öffnen, sofern diese vorhanden sind.

![Frontend einer frischen Joomla 4 Installation mit Cassiopeia - Das Menü im oberen Bereich mit Untermenüpunkt](/images/logo3a.png)

## Logo verschwinden lassen

Störend ist weiterhin der Schriftzug Cassiopeia im oberen Bereich. Dieser ist über die Template-Optionen im Backend zwar mit einem Bild oder einem anderen Text ersetzbar. Die Ersetzung wird allerdings nicht über die volle Breite angezeigt und ist deshalb keine Alternative für ein Banner.

### Warum ist das Logo keine Alternative für ein Banner-Bild?

Das Logo, beziehungsweise der alternative Text, wird nicht über die volle Breite angezeigt, weil dieses Element in das Boostrap 5 Element `navbar-brand` integriert ist. Überzeuge dich selbst davon und sieh dir die Datei `index.php` an.

```php
<?php if ($this->params->get('brand', 1)) : ?>
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
<?php endif; ?>
```

Das nächste Bild zeigt dir, wie es aussähe, wenn du dein Banner-Bild als Logobild hochlädst.

![Logo in Cassiopeia - So sähe es aus](/images/logo4c.png)

> Bootstrap 5 Navbars werden mit integrierten Funktionen für eine Vielzahl von Unterkomponenten geliefert. Das Joomla Projekt greift im Fronend und im Backend Template teilweise auf vorgefertigte Bootstrap 5 Elemente zurück. Wenn du dir die Funktionen ansehen möchtest, die die Bootstrap 5 Navbar bietet, findest du eine erste Anlaufstelle in der Bootstrap Dokumentation [getbootstrap.com/docs/5.0/components/navbar/](https://getbootstrap.com/docs/5.0/components/navbar/).

### Logobereich in Cassiopeia ausblenden

Wir benötigen die Bootstrap Navbar nicht und deaktivieren deshalb das Logo und den Titeltext. Navigiere hierfür zum `Site Template Stil`.

![Template Site öffnen](/images/logo4aa.png)

Wähle den Stil `Cassiopeia - Default`

![Wähle den Stil `Cassiopeia - Default`](/images/logo4.png)

und setzte die Option `Brand` auf `No`.

![setzte die Option `Brand` auf `No`](/images/logo4a.png)

Vergewissere dich, das im Frontend der Schriftzug Cassiopeia nicht mehr angezeigt wird.

![Brand deaktiviert - So sieht es aus.](/images/logo4b.png)

## Banner einblenden

Jetzt fehlt noch das Banner. Wenn wir dieses einblenden möchten, dann ist es zwingend, dass wir dieses vorher erstellen. In Joomla gibt es mehrere Möglichkeiten. Ich wähle ein Modul vom Typ Custom.

### Banner anlegen

Über das Menü `Content | Site Module` öffne ich den Modul Manager.

![Module erstellen](/images/logo6a.png)

Ein Klick auf die Schaltfläche `New` listet die Module-Auswahl auf, in der sich Custom im mittleren Bereich befindet und ebenfalls per Klick öffnet ich den Dialog zum Anlegen eines Custom-Modules.

![Module Custom wählen](/images/logo6b.png)

Ich gebe dem Module den Titel Banner, damit ich es später unkompliziert zuordnen kann. Ich möchte das Bannerbild allerdings ohne Titel anzeigen. Deshalb deaktiviere ich diese Anzeige im rechten Bereich. Mithilfe des Tiny MCE Editors macht Joomla es mir leicht, den Media Manger zu öffnen und ein Bild für die Anzeige auszuwählen. Als Position wähle ich `below-top`.

![Module Custom editieren](/images/logo6c.png)

> Ein paar Worte zu den Positionen: Die Positionen `below-top` und `topbar` sind dazu da, Inhalte über dem Branding-Bereich und dem Navigations-Menü darzustellen. Im Gegensatz zur Position `topbar`, welche jederzeit die volle Bildschirmgröße ausnutzt, füllt `below-top` lediglich den Container. Wenn du im Template die Layout-Option `fluid` gewählt hast, ist der Unterschied nicht groß. Mit der Einstellung `static` fällt die Differenz auf großen Bildschirmen direkt ins Auge. `below-top` und `topbar` wurden übrigens erst kurz vor Schluss via PR [31731](https://github.com/joomla/joomla-cms/pull/31731)[^github.com/joomla/joomla-cms/pull/31731] und [33751](https://github.com/joomla/joomla-cms/pull/33751)[^github.com/joomla/joomla-cms/pull/33751] in Joomla 4 integriert. Fragst du dich, warum ich mich gegen die Position `banner` entschieden habe? Vorgabe war, dass das Banner über der Navigation angezeigt wird. Die Position `banner` zeigt das Banner unter der Navigation und dem Branding-Bereich an.

Im Tabulator Advanced bereiten wir das Styling vor. Als Modul Klasse füge ich `mybanner` ein, damit die Klasse gerendert wird. Wer einen Rahmen mag, lege als Modul Chrome `card` fest. Wem ein Banner ohne Rahmen lieber ist, wählt `no-card`.

> Wenn du dich fragst, warum die Modul Klasse nur nach dem Festlegen eines Module Chromes verwendet wird, dann lese die Diskussion im Issue [30822](github.com/joomla/joomla-cms/issues/30822)[^github.com/joomla/joomla-cms/issues/30822].

![Module erstellen - Klasse](/images/logo6aa.png)

### Banner-Bild einfügen

Im Media Manager habe ich die Möglichkeit, ein Bild hochzuladen, zu bearbeiten und am Ende per Schaltfläche `Insert Media` auszuwählen.

![Module Custom Bild auswählen](/images/logo6d.png)

Als Ergebnis sehe ich das Bild im Editor.

![Module Custom Bild auswählen](/images/logo6dd.png)

### Banner stylen

Mir ist wichtig, dass das Bild bei jeder Displaygröße die Breite des Containers ausfüllt. Deshalb ergänze ich CSS-Stile, die dies bewirken.
Dazu wechsle ich über die Schaltfläche 'Toggle Editor' in die Codeansicht des Editors.

Hinweis: Es gibt eine Alternative zur Schaltfläche 'Toggle Editor': Seit Februar 2022, d.h. ab Joomla 4.1, wird der Code im integrierten TinyMCE-Editor mit Syntax-Highlighting versehen, wenn man den im nächsten Bild gezeigten Editor-Button verwendet:

![Syntax-Highlighting im integrierten TinyMCE-Editor | Editor-Schaltfläche anzeigen](/images/switcherbackendnew2.png)

Über die Schaltfläche 'Toggle Editor' wechsle ich in die Code-Ansicht des Editors.

![Module Custom Bild mit CSS versehen.](/images/logo6e.png)

In der Code-Ansicht ergänze ich das HTML-<img>-Element um die Klasse `mybanner` und Klicke zum Speichern in der Werkezugleiste die Schaltfläche `Save and Close`. Der vollständige Code sieht wie folgt aus:

```html
<p>
  <img
    class="mybanner"
    src="images/banner.png"
    width="1060"
    height="288"
    loading="lazy"
  />
</p>
```

Das nachfolgende Bild zeigt, wie und wo ich den Code via Joomla Backend ergänze.

![Module Custom Klasse ergänzen 1.](/images/logo6f.png)

Zu guter Letzt wechsele ich in den Template Manager, um die CSS-Klasse `mybanner` mit CSS-Stilen zu füllen. Dazu öffne ich über die linke Navigation die Ansicht `System | Site Templates`.

![Module Custom Klasse ergänzen 2.](/images/logo6g.png)

Ich wähle das Cassiopeia Template in dem ich `Cassiopeia Details and Files` klicke.

![Module Custom Klasse ergänzen 3.](/images/logo6h.png)

Im Tabulator `Editor` prüfe ich zunächst, ob es bereits eine Datei mit dem Namen `user.css` gibt. Zur Erinnerung: Die `user.css` ist die Datei, die für die Implementierung eigener CSS-Stile in Joomla vorgesehen ist. Diese Datei wird bei einer Akualisierung nicht verändert.

Hinweis: Der Pfad zu den _Template-Medienordnern_ und somit auch zur Datei `user.css`, war vor Joomla 4.1 `templates/cassiopeia/`. Template-Medienordner sind die Ordner `css`, `images`, `fonts`, `js` und `scss`. Ab Joomla 4.1 befinden sich die Dateien im Verzeichnis `media/templates/site/cassiopeia/`.

![CSS-Stile im Template Manger ergänzen - Die Datei user.css anlegen.](/images/logo6i.png)

Ich füge den nachfolgenden Code-Schnipsel am Ende der Datei `user.css` ein. Damit lege ich die _minimale Breite_ des Bannerbildes fest. Ich wähle 100%, damit das Bild immer die volle Breite des Elementes nutzt, in dem es eingefügt ist.

> Warum nutze ich die Einheit `%` und nicht `vw`, welche an anderen Stellen in der Cassiopeia-CSS-Datei zu finden ist? Mit den Viewportabmessungen `vw (viewport width)` und `vh (viewport height)` können Abmessungen in Relation zum aller ersten umschließenden Block festgelegt werden. Für Darstellungen auf Bildschirmen ist dieser Block identisch mit den Dispay-Abmessungen. Im Vergleich zu `100 %` scaliert `100 vw` das Bild auf die volle Bildschirmbreite. Da ich das statische Layout nutze, beginnt das Bild nicht immer ganz rechts. Die volle Bildschirmbreite wäre deshalb an dieser Stelle falsch. Informationen zu den in CSS möglichen Einheiten hat das [W3C](https://www.w3.org/Style/Examples/007/units.de.html)[^w3.org/style/examples/007/units.de.html] zusammengefasst.

Um die _maximale Breite_ des Bannerbildes kümmert sich das Framework Bootstrap, welche in Cassiopeia verwendet wird. Ein Bild nimmt standardmäßig niemals mehr als 100 % der Bildschirmbreite in Anspruch. Konkret füge ich den nachfolgend dargestellten Codeschnipsel ein.

```css
.mybanner {
  min-width: 100%;
}
```

Das nachfolgende Bild zeigt, wie und wo ich den Code via Joomla Backend ergänze.

![CSS-Stile im Template Manger ergänzen - Breite des Banners festlegen.](/images/logo6j.png)

## Farben ändern

Wenn das Lila im Cassiopeia Template dir gefällt, dann passt die aktuelle Anzeige für dich unter Umständen schon. In den meisten Fällen gibt eine andere Farbe, welche die primäre Farbe der Website sein soll. Deshalb färben wir die Elemente um.

Als erstes färben wir den Hintergrund des `container-header` weiß. Weil das Lila technisch ein Image ist, ist die Zeile `background-image: none;` wichtig! Weiße Schrift auf weißem Grund ist nicht lesbar, deshalb ändern wir die Schriftfarbe in `.mod-menu` via `color: #0088cc;`.

```css
.container-header {
  background-color: white;
  background-image: none;
}

.container-header .mod-menu {
  color: #0088cc;
}
```

Beim Überrollen mit der Maus, soll der Hintergrund eines Menüpunktes grau erscheinen. Dies erreichen wir mittels `background-color: #eee;` beim Menü-Element-Link `.container-header .mod-menu a`. Damit der Hintergrund etwas lockerer wirkt fügen wir einen Innenabstand hinzu `padding: 3px 15px;` und runden die Ecken via `border-radius: 0 0 6px 6px;` ab. Der Text soll auch im Link blau gefärbt sein `color: #0088cc;`.

```css
.container-header .mod-menu a {
  -webkit-border-radius: 0 0 6px 6px;
  -moz-border-radius: 0 0 6px 6px;
  border-radius: 0 0 6px 6px;
  padding: 3px 15px;
  color: #0088cc;
}

.container-header .mod-menu a:hover {
  background-color: #eee;
}
```

Last but not least kümmern wir uns um das Hamburger-Menü. Dieses ist in Cassiopeia weiß. Da der Hintergrund des Kopfbereichs unserer Website nun weiß ist, färben wir dieses passend zur Schrift blau. Das Hamburger Menü befindet sich im Element `.container-header .navbar-toggler`. Die drei wagerechten Striche färben wir mit `color: #0088cc;` und für die Umrandung ist die Zeile `border: 1px solid #0088cc;` verantwortlich.

```css
.container-header .navbar-toggler {
  color: #0088cc;
  border: 1px solid #0088cc;
}
```

Nachfolgend fassen ich noch einmal zur Übersicht den gesanmten Code in der Datei `user.css` zusammen.

```css
/* Banner Image */
.mybanner {
  min-width: 100%;
}

/* Menu */

/* Override the lila background with white */
.container-header {
  background-color: white;
  background-image: none;
}

/* Text should now be blue */
.container-header .mod-menu {
  color: #0088cc;
}

/* We add padding and radius so that on hover there is a nice background */
.container-header .mod-menu a {
  -webkit-border-radius: 0 0 6px 6px;
  -moz-border-radius: 0 0 6px 6px;
  border-radius: 0 0 6px 6px;
  padding: 3px 15px;
  color: #0088cc;
}

/* On hover there should be a gray background*/
.container-header .mod-menu a:hover {
  background-color: #eee;
}

/* We need to change the color of the Hamburger Menu because white on white is not good */
.container-header .navbar-toggler {
  color: #0088cc;
  border: 1px solid #0088cc;
}
```

Als Ergebnis sehen wir nun eine farblich neutral gehaltene Website.

![CSS-Stile im Template Manger ergänzen - Farben anpassen](/images/logo8.png)

## Der Website einen Rahmen geben

Mit dem Standardtemplate Protostar in Joomla 3, war es möglich, Inhalte mit einer festen Breite in einem Container so anzuzeigen, dass alles mit einem Rahmen umgeben war. In Cassiopeia erscheint diese Umrandung nicht ohne weiteres. Wir können einen ähnlichen Effekt mit einem Workaround erzeugen. Dazu färben wir alle Hintergrundelemente grau ein `background-color: #f4f6f7;` und geben den Elemente die Inhalte enthalten einen weißen Hintergrund `background-color: white;` und einen Innenabstand `padding: 3px 15px;`.

```css
... .site-grid {
  background-color: #f4f6f7;
}

.header {
  background-color: #f4f6f7;
}

.grid-child {
  padding: 3px 15px;
  background-color: white;
}

.footer {
  background-color: #f4f6f7;
  background-image: none;
}
```

![CSS-Stile im Template Manger ergänzen - Website im Rahmen](/images/logo9.png)

## Sticky Header

Möchtest du die Option Sticky Header des Cassiopeia Templates nutzen? Ist es dir wichtig, das Menü im oberen Bereich zu fixieren? 

Bei der von mir in diesem Beitrag vorgeschlagenen Vorgehensweise, würde auch das Banner fix stehen bleiben, wenn man die Seite scrollt. Das ist in der Regel nicht gewollt. Gerade auf schmalen Displays bleibt zu wenig Platz für den Hauptinhalt. 

Falls auch du dir für dieses Problem eine Lösung überlegst, schlage ich vor, das Banner außerhalb des `<head>`-Elementes zu platzieren. Das `<head>`-Element ist dasjenige welche in Cassiopeia bei aktivierte Option fixiert wird. Hierzu ist es notwendig, eine neue Position anzulegen. Weil letzteres eine Änderung der Datei ´templates/cassiopeia/index.php` zwingend erfordert, muss Vorsorge dafür getroffen werden, dass die Änderung bei einer Aktualisierung von Joomla nicht überschrieben wird. Man muss ein eigenes Template erstellen, indem man beispielsweise Cassiopeia kopiert. Oder man arbeitet mit einem Child-Template. 

Konkret habe ich folgende Änderungen vorgenommen, um das Banner außerhalb des `<head>`-Elementes zu platzieren. Ich habe die Position `banner_over_header` vor dem `<head>`-Elementes zu platzieren angelegt. Hierfür habe ich den nachfolgenden Code-Schnipsel in meiner `index.php` vor dem `<head>`-Elementes eingetragen. 

```php
    <div class="site-grid">
        <?php if ($this->countModules('banner_over_header', true)) : ?>
            <div class="container-banner full-width">
                <jdoc:include type="modules" name="banner_over_header" style="none" />
            </div>
        <?php endif; ?>
    </div>
```

Zur besseren Orientierung füge ich nachfolgend den ersten Teil der Datei vollständig ein. So erkennst du genau, wo der Code platziert ist.

```php
<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

/** @var Joomla\CMS\Document\HtmlDocument $this */

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Browsers support SVG favicons
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);

// Detecting Active Variables
$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
$itemid   = $app->input->getCmd('Itemid', '');
$sitename = htmlspecialchars($app->get('sitename'), ENT_QUOTES, 'UTF-8');
$menu     = $app->getMenu()->getActive();
$pageclass = $menu !== null ? $menu->getParams()->get('pageclass_sfx', '') : '';

// Color Theme
$paramsColorName = $this->params->get('colorName', 'colors_standard');
$assetColorName  = 'theme.' . $paramsColorName;
$wa->registerAndUseStyle($assetColorName, 'media/templates/site/cassiopeia/css/global/' . $paramsColorName . '.css');

// Use a font scheme if set in the template style options
$paramsFontScheme = $this->params->get('useFontScheme', false);
$fontStyles       = '';

if ($paramsFontScheme) {
    if (stripos($paramsFontScheme, 'https://') === 0) {
        $this->getPreloadManager()->preconnect('https://fonts.googleapis.com/', ['crossorigin' => 'anonymous']);
        $this->getPreloadManager()->preconnect('https://fonts.gstatic.com/', ['crossorigin' => 'anonymous']);
        $this->getPreloadManager()->preload($paramsFontScheme, ['as' => 'style', 'crossorigin' => 'anonymous']);
        $wa->registerAndUseStyle('fontscheme.current', $paramsFontScheme, [], ['media' => 'print', 'rel' => 'lazy-stylesheet', 'onload' => 'this.media=\'all\'', 'crossorigin' => 'anonymous']);

        if (preg_match_all('/family=([^?:]*):/i', $paramsFontScheme, $matches) > 0) {
            $fontStyles = '--cassiopeia-font-family-body: "' . str_replace('+', ' ', $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-family-headings: "' . str_replace('+', ' ', isset($matches[1][1]) ? $matches[1][1] : $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-weight-normal: 400;
			--cassiopeia-font-weight-headings: 700;';
        }
    } else {
        $wa->registerAndUseStyle('fontscheme.current', $paramsFontScheme, ['version' => 'auto'], ['media' => 'print', 'rel' => 'lazy-stylesheet', 'onload' => 'this.media=\'all\'']);
        $this->getPreloadManager()->preload($wa->getAsset('style', 'fontscheme.current')->getUri() . '?' . $this->getMediaVersion(), ['as' => 'style']);
    }
}

// Enable assets
$wa->usePreset('template.cassiopeia.' . ($this->direction === 'rtl' ? 'rtl' : 'ltr'))
    ->useStyle('template.active.language')
    ->useStyle('template.user')
    ->useScript('template.user')
    ->addInlineStyle(":root {
		--hue: 214;
		--template-bg-light: #f0f4fb;
		--template-text-dark: #495057;
		--template-text-light: #ffffff;
		--template-link-color: #2a69b8;
		--template-special-color: #001B4C;
		$fontStyles
	}");

// Override 'template.active' asset to set correct ltr/rtl dependency
$wa->registerStyle('template.active', '', [], [], ['template.cassiopeia.' . ($this->direction === 'rtl' ? 'rtl' : 'ltr')]);

// Logo file or site title param
if ($this->params->get('logoFile')) {
    $logo = '<img src="' . Uri::root(true) . '/' . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
} elseif ($this->params->get('siteTitle')) {
    $logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
} else {
    $logo = HTMLHelper::_('image', 'logo.svg', $sitename, ['class' => 'logo d-inline-block'], true, 0);
}

$hasClass = '';

if ($this->countModules('sidebar-left', true)) {
    $hasClass .= ' has-sidebar-left';
}

if ($this->countModules('sidebar-right', true)) {
    $hasClass .= ' has-sidebar-right';
}

// Container
$wrapper = $this->params->get('fluidContainer') ? 'wrapper-fluid' : 'wrapper-static';

$this->setMetaData('viewport', 'width=device-width, initial-scale=1');

$stickyHeader = $this->params->get('stickyHeader') ? 'position-sticky sticky-top' : '';

// Defer fontawesome for increased performance. Once the page is loaded javascript changes it to a stylesheet.
$wa->getAsset('style', 'fontawesome')->setAttribute('rel', 'lazy-stylesheet');
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
    <jdoc:include type="metas" />
    <jdoc:include type="styles" />
    <jdoc:include type="scripts" />
</head>

<body class="site <?php echo $option
    . ' ' . $wrapper
    . ' view-' . $view
    . ($layout ? ' layout-' . $layout : ' no-layout')
    . ($task ? ' task-' . $task : ' no-task')
    . ($itemid ? ' itemid-' . $itemid : '')
    . ($pageclass ? ' ' . $pageclass : '')
    . $hasClass
    . ($this->direction == 'rtl' ? ' rtl' : '');
?>">

    <div class="site-grid">
        <?php if ($this->countModules('banner_over_header', true)) : ?>
            <div class="container-banner full-width">
                <jdoc:include type="modules" name="banner_over_header" style="none" />
            </div>
        <?php endif; ?>
    </div>

    <header class="header container-header full-width<?php echo $stickyHeader ? ' ' . $stickyHeader : ''; ?>">

        <?php if ($this->countModules('topbar')) : ?>
            <div class="container-topbar">
            <jdoc:include type="modules" name="topbar" style="none" />
            </div>
        <?php endif; ?>

        <?php if ($this->countModules('below-top')) : ?>
            <div class="grid-child container-below-top">
                <jdoc:include type="modules" name="below-top" style="none" />
            </div>
        <?php endif; ?>

        <?php if ($this->params->get('brand', 1)) : ?>
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
        <?php endif; ?>

        <?php if ($this->countModules('menu', true) || $this->countModules('search', true)) : ?>
            <div class="grid-child container-nav">
                <?php if ($this->countModules('menu', true)) : ?>
                    <jdoc:include type="modules" name="menu" style="none" />
                <?php endif; ?>
                <?php if ($this->countModules('search', true)) : ?>
                    <div class="container-search">
                        <jdoc:include type="modules" name="search" style="none" />
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </header>
    ...
 ```

Last but not least habe ich die Position in der XML-Datei `/templates/cassiopeia/templateDetails.xml` eingefügt.

```xml
	<positions>
		<position>banner_over_header</position>
  ...
	</positions>
```

Nachfolgend wieder ein größerer Codeausschnitt zur besseren Orientierung.

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="template" client="site">
	<name>cassiopeia</name>
	<version>1.0</version>
	<creationDate>2017-02</creationDate>
	<author>Joomla! Project</author>
	<authorEmail>admin@joomla.org</authorEmail>
	<copyright>(C) 2017 Open Source Matters, Inc.</copyright>
	<description>TPL_CASSIOPEIA_XML_DESCRIPTION</description>
	<inheritable>1</inheritable>
	<files>
		<filename>component.php</filename>
		<filename>error.php</filename>
		<filename>index.php</filename>
		<filename>joomla.asset.json</filename>
		<filename>offline.php</filename>
		<filename>templateDetails.xml</filename>
		<folder>html</folder>
	</files>
	<media destination="templates/site/cassiopeia" folder="media">
		<folder>js</folder>
		<folder>css</folder>
		<folder>scss</folder>
		<folder>images</folder>
	</media>
	<positions>
		<position>banner_over_header</position>
		<position>topbar</position>
		<position>below-top</position>
		<position>menu</position>
		<position>search</position>
		<position>banner</position>
		<position>top-a</position>
		<position>top-b</position>
		<position>main-top</position>
		<position>main-bottom</position>
		<position>breadcrumbs</position>
		<position>sidebar-left</position>
		<position>sidebar-right</position>
		<position>bottom-a</position>
		<position>bottom-b</position>
		<position>footer</position>
		<position>debug</position>
	</positions>
	<languages folder="language">
		<language tag="en-GB">en-GB/tpl_cassiopeia.ini</language>
		<language tag="en-GB">en-GB/tpl_cassiopeia.sys.ini</language>
	</languages>
  ...
```

Wenn du nun in dem Modul, in dem das Banner eingefügt wird, die Position 'banner_over_header' auswählst und alles speicherst, ist das Banner in der Frontend-Ansicht nicht mehr fixiert.

<img src="https://vg04.met.vgwort.de/na/f4bbe4f0eb04402a858e25ee692b102d" width="1" height="1" alt="">
