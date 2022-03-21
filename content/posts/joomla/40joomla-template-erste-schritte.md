---
description: 'desc'
shortTitle: 'short'
date: 2021-01-10
title: 'Template - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-erste-schritte
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Warum ein eigenes Joomla Template erstellen? Es gibt gute Gründe, warum wir dies in Angriff nehmen sollten!<!-- \index{Template} -->

> Gerade für Erweiterungsentwickler ist es meiner Meinung nach wesentlich, zu wissen wie ein Joomla Template funktioniert. Denn so ist es möglich, die Trennung von Logik und Design in die Extension zu integrieren.

- Die Erstellung eines eigenen Joomla Templates hat zur Folge, dass wir die vollständige Kontrolle über jedes kleinste Detail des Erscheinungsbildes der Website haben. Wir erstellen nur Code, den wir mögen. Es ist viel einfacher, ein eigenes Template zu ändern, als ein komplexes Joomla Template, bei dem oft die unterschiedlichen Elemente voneinander anhängen.
- Die Erstellung eines eigenen Templates bewirkt, dass wir die Website nicht mit Funktionen überfrachten, die wir gar nicht nutzen.
- Wenn wir uns ein individuelles Joomla-Template wünschen, das nicht von Tausenden anderer Websites verwendet wird, ist die Erstellung einer eigenen Vorlage eine Möglichkeit.
- Wenn du bisher noch nie ein Joomla Template erstellt hast, wirst du beim Entwickeln eine Menge über Joomla lernen. Du wirst am Ende sehr viel über das Zusammenspiel der unterschiedlichen Elemente wissen und dich sicherer fühlen.

> Es geht hier nicht um das Erlernen von HTML und CSS. Deshalb werde ich in diesem Artikel ein fertiges [HTML5-Template](https://html5up.net/txt) zu Hilfe nehmen. Folge meinem Beispiel und du wirst am Ende in der Lage sein, ein vollständiges Joomla Template selbst zu erstellen. HTML und CSS entwickelst du selbst oder nimmst eine Vorlage, wie ich hier im Tutorial.

Ein Template ist verantwortlich für das Design der Website.
Es gibt zwei Arten von Templates in Joomla:

- Front-End-Templates und
- Back-End-Templates.

Wir kreieren ein Front-End-Template. Dieses steuert die Art und Weise, wie die Website dem Benutzer präsentiert wird.

> Das Prinzip zur Erstellung eines Templates für den Administrationsbereich ist genau das Gleiche. Relevanter Unterschied: Du legst es im Unterverzeichnis `/administrator/templates` an. Das Front-End-Template erstellst du im Ordner `/templates`.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t34...t35)[^github.com/astridx/boilerplate/compare/t34...t35] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Beim Template ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du kannst viele Dinge nutzen, die Joomla von Haus aus zur Verfügung stellt. Das hat Vorteile. Nachteilig ist, dass individuelle Wünsche schwerer umzusetzen sind, beziehungsweise Joomla-Wissen voraussetzen. Deshalb beginnen wir rudimentär. Mir geht in erster Linie darum, hinter die Funktionen zu blicken und diese zu verstehen.

### Neue Dateien

#### Template

Dieser Teil führt dich durch die notwendigen Schritte zur Erstellung eines Joomla Templates - von Grund auf.

##### [templates/facile/ component.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-a2b7f60a181e04a69df79be3ddff4649b7c147917743f7031cbe581adb1572be)

Die `component.php` stellt die Logik für eine abgespeckte Version der Site bereit. Das bedeutet, dass lediglich die pure Ansicht der Komponente angezeigt wird.

Diese ist für eine druckerfreundliche Ausgabe oder die Anzeige in einem modalen Fenster ideal. 

Wie schon erwähnt ist eine Komponente für die Darstellung des _Hauptinhalts_ zuständig. Das gesamte Layout, also zum Beispiel die Module in einer Seitenleiste und die Navigation sind Beiwerk. Die Datei `component.php` setzt den Fokus auf den _Hauptinhalt_.

> Möchtest du dir die Ausgabe der Datei `component.php` ansehen? Diese Ansicht wird im Browser angezeigt, wenn du `tmpl=component` an die URL anhängst - beispielsweise so: `/index.php?tmpl=component`.

Wir legen die Datei `component.php` hier der Vollständigkeit halber an und fügen den Text `Component` ein, um sie zu testen.

[templates/facile/component.php](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/component.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/component.php

Component

```

Im Joomla 4 Standardtemplate Cassiopeia ist die Datei `component.php` wie folgt implementiert:

```php {numberLines: -2}
// https://raw.githubusercontent.com/joomla/joomla-cms/4.1-dev/templates/cassiopeia/component.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;

/** @var Joomla\CMS\Document\HtmlDocument $this */

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Color Theme
$paramsColorName = $this->params->get('colorName', 'colors_standard');
$assetColorName  = 'theme.' . $paramsColorName;
$wa->registerAndUseStyle($assetColorName, 'media/templates/site/cassiopeia/css/global/' . $paramsColorName . '.css');

// Use a font scheme if set in the template style options
$paramsFontScheme = $this->params->get('useFontScheme', false);
$fontStyles       = '';

if ($paramsFontScheme)
{
	if (stripos($paramsFontScheme, 'https://') === 0)
	{
		$this->getPreloadManager()->preconnect('https://fonts.googleapis.com/', ['crossorigin' => 'anonymous']);
		$this->getPreloadManager()->preconnect('https://fonts.gstatic.com/', ['crossorigin' => 'anonymous']);
		$this->getPreloadManager()->preload($paramsFontScheme, ['as' => 'style', 'crossorigin' => 'anonymous']);
		$wa->registerAndUseStyle('fontscheme.current', $paramsFontScheme, [], ['media' => 'print', 'rel' => 'lazy-stylesheet', 'onload' => 'this.media=\'all\'', 'crossorigin' => 'anonymous']);

		if (preg_match_all('/family=([^?:]*):/i', $paramsFontScheme, $matches) > 0)
		{
			$fontStyles = '--cassiopeia-font-family-body: "' . str_replace('+', ' ', $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-family-headings: "' . str_replace('+', ' ', isset($matches[1][1]) ? $matches[1][1] : $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-weight-normal: 400;
			--cassiopeia-font-weight-headings: 700;';
		}
	}
	else
	{
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

// Browsers support SVG favicons
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);

// Defer font awesome
$wa->getAsset('style', 'fontawesome')->setAttribute('rel', 'lazy-stylesheet');
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<jdoc:include type="metas" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<jdoc:include type="styles" />
	<jdoc:include type="scripts" />
</head>
<body class="<?php echo $this->direction === 'rtl' ? 'rtl' : ''; ?>">
	<jdoc:include type="message" />
	<jdoc:include type="component" />
</body>
</html>

```

So werden in Cassiopeia alle wesentliche Inhalte geladen, um den im nachfolgenden Bild markierten Bereich separat anzuzeigen.

![Joomla Komponentenbereich im Standardtemplate Cassiopeia](/images/j4x40x8.png)

##### [templates/facile/ error.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-13b9d39c6c50cd64c483828e227736031299d698ae3cf54b91d9b9c4114ffd9e)

Wenn Besucher der Website eine Seite aufrufen, die nicht existiert, erhalten sie eine Fehlermeldung. Die Fehlermeldung von Joomla ist allgemein gehalten. Viel besser ist es, eine eigene individuelle Fehlerseite zu erstellen.

Meiner Meinung nach beinhaltet eine gute Fehlerseite:

- Minimalistisches Design: Verwende einfache Texten und klare Bilder. Schreibe nur das Nötigste. Weniger ist mehr!
- Verlinke auf die Startseite: Beschreibe klar und deutlich, wie die Homepage erreichbar ist und setze einen Link auf diese. Ein zusätzlicher Link, zum Beispiel im Logo, ist hilfreich. Er sollte aber nicht die einzige Möglichkeit sein, um wieder auf die Homepage zu gelangen.
- Eine Suche: Biete dem Besucher ein Suchfeld an. Er wird wissen, was er sehen will. Ein Suchfeld wird genutzt, denn es bietet eine Option dieses zu finden. Nebenbei bleibt er so auf deiner Website.
- Keine Fachbegriffe: `404 Error` ist für viele Menschen völlig bedeutungslos.

> Die Fehlerseite sollte die Besucher meiner Meinung nach nicht zurechtweisen. Schließlich ist es nicht ihre Schuld, wenn eine Seite nicht existiert oder ein interner Serverfehler auftritt.

Damit du weißt, wie und wo du deine Fehlerseite implementierst, habe ich die Datei `templates/facile/error.php` erstellt. Diese beinhaltet nichts weiter als das Wort `Error`. So ist es möglich, die Seite zu testen. Lasse deiner Phantasie bei den Inhalten und dem Design einer eigenen indiviudellen Fehlerseite freien Lauf.

[templates/facile/error.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/error.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/error.php

Error

```

Im Joomla 4 Standardtemplate Cassiopeia ist die Datei `error.php` wie folgt implementiert:

```php {numberLines: -2}
// https://raw.githubusercontent.com/joomla/joomla-cms/4.1-dev/templates/cassiopeia/error.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.cassiopeia
 *
 * @copyright   (C) 2017 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

/** @var Joomla\CMS\Document\ErrorDocument $this */

$app = Factory::getApplication();
$wa  = $this->getWebAssetManager();

// Detecting Active Variables
$option   = $app->input->getCmd('option', '');
$view     = $app->input->getCmd('view', '');
$layout   = $app->input->getCmd('layout', '');
$task     = $app->input->getCmd('task', '');
$itemid   = $app->input->getCmd('Itemid', '');
$sitename = htmlspecialchars($app->get('sitename'), ENT_QUOTES, 'UTF-8');
$menu     = $app->getMenu()->getActive();
$pageclass = $menu !== null ? $menu->getParams()->get('pageclass_sfx', '') : '';

// Template path
$templatePath = 'media/templates/site/cassiopeia';

// Color Theme
$paramsColorName = $this->params->get('colorName', 'colors_standard');
$assetColorName  = 'theme.' . $paramsColorName;
$wa->registerAndUseStyle($assetColorName, $templatePath . '/css/global/' . $paramsColorName . '.css');

// Use a font scheme if set in the template style options
$paramsFontScheme = $this->params->get('useFontScheme', false);
$fontStyles       = '';

if ($paramsFontScheme)
{
	if (stripos($paramsFontScheme, 'https://') === 0)
	{
		$this->getPreloadManager()->preconnect('https://fonts.googleapis.com/', ['crossorigin' => 'anonymous']);
		$this->getPreloadManager()->preconnect('https://fonts.gstatic.com/', ['crossorigin' => 'anonymous']);
		$this->getPreloadManager()->preload($paramsFontScheme, ['as' => 'style', 'crossorigin' => 'anonymous']);
		$wa->registerAndUseStyle('fontscheme.current', $paramsFontScheme, [], ['media' => 'print', 'rel' => 'lazy-stylesheet', 'onload' => 'this.media=\'all\'', 'crossorigin' => 'anonymous']);

		if (preg_match_all('/family=([^?:]*):/i', $paramsFontScheme, $matches) > 0)
		{
			$fontStyles = '--cassiopeia-font-family-body: "' . str_replace('+', ' ', $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-family-headings: "' . str_replace('+', ' ', isset($matches[1][1]) ? $matches[1][1] : $matches[1][0]) . '", sans-serif;
			--cassiopeia-font-weight-normal: 400;
			--cassiopeia-font-weight-headings: 700;';
		}
	}
	else
	{
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

// Browsers support SVG favicons
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);

// Logo file or site title param
if ($this->params->get('logoFile'))
{
	$logo = '<img src="' . htmlspecialchars(Uri::root() . $this->params->get('logoFile'), ENT_QUOTES, 'UTF-8') . '" alt="' . $sitename . '">';
}
elseif ($this->params->get('siteTitle'))
{
	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
}
else
{
	$logo = HTMLHelper::_('image', 'logo.svg', $sitename, ['class' => 'logo d-inline-block'], true, 0);
}

// Container
$wrapper = $this->params->get('fluidContainer') ? 'wrapper-fluid' : 'wrapper-static';

$this->setMetaData('viewport', 'width=device-width, initial-scale=1');

// Defer font awesome
$wa->getAsset('style', 'fontawesome')->setAttribute('rel', 'lazy-stylesheet');
?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<jdoc:include type="metas" />
	<jdoc:include type="styles" />
	<jdoc:include type="scripts" />
</head>

<body class="site error_site <?php echo $option
	. ' ' . $wrapper
	. ' view-' . $view
	. ($layout ? ' layout-' . $layout : ' no-layout')
	. ($task ? ' task-' . $task : ' no-task')
	. ($itemid ? ' itemid-' . $itemid : '')
	. ' ' . $pageclass;
	echo ($this->direction == 'rtl' ? ' rtl' : '');
?>">
	<header class="header container-header full-width">
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
		<?php if ($this->countModules('menu') || $this->countModules('search')) : ?>
			<div class="grid-child container-nav">
				<?php if ($this->countModules('menu')) : ?>
					<jdoc:include type="modules" name="menu" style="none" />
				<?php endif; ?>
				<?php if ($this->countModules('search')) : ?>
					<div class="container-search">
						<jdoc:include type="modules" name="search" style="none" />
					</div>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</header>

	<div class="site-grid">
		<div class="grid-child container-component">
			<h1 class="page-header"><?php echo Text::_('JERROR_LAYOUT_PAGE_NOT_FOUND'); ?></h1>
			<div class="card">
				<div class="card-body">
					<jdoc:include type="message" />
					<p><strong><?php echo Text::_('JERROR_LAYOUT_ERROR_HAS_OCCURRED_WHILE_PROCESSING_YOUR_REQUEST'); ?></strong></p>
					<p><?php echo Text::_('JERROR_LAYOUT_NOT_ABLE_TO_VISIT'); ?></p>
					<ul>
						<li><?php echo Text::_('JERROR_LAYOUT_AN_OUT_OF_DATE_BOOKMARK_FAVOURITE'); ?></li>
						<li><?php echo Text::_('JERROR_LAYOUT_MIS_TYPED_ADDRESS'); ?></li>
						<li><?php echo Text::_('JERROR_LAYOUT_SEARCH_ENGINE_OUT_OF_DATE_LISTING'); ?></li>
						<li><?php echo Text::_('JERROR_LAYOUT_YOU_HAVE_NO_ACCESS_TO_THIS_PAGE'); ?></li>
					</ul>
					<p><?php echo Text::_('JERROR_LAYOUT_GO_TO_THE_HOME_PAGE'); ?></p>
					<p><a href="<?php echo $this->baseurl; ?>/index.php" class="btn btn-secondary"><span class="icon-home" aria-hidden="true"></span> <?php echo Text::_('JERROR_LAYOUT_HOME_PAGE'); ?></a></p>
					<hr>
					<p><?php echo Text::_('JERROR_LAYOUT_PLEASE_CONTACT_THE_SYSTEM_ADMINISTRATOR'); ?></p>
					<blockquote>
						<span class="badge bg-secondary"><?php echo $this->error->getCode(); ?></span> <?php echo htmlspecialchars($this->error->getMessage(), ENT_QUOTES, 'UTF-8'); ?>
					</blockquote>
					<?php if ($this->debug) : ?>
						<div>
							<?php echo $this->renderBacktrace(); ?>
							<?php // Check if there are more Exceptions and render their data as well ?>
							<?php if ($this->error->getPrevious()) : ?>
								<?php $loop = true; ?>
								<?php // Reference $this->_error here and in the loop as setError() assigns errors to this property and we need this for the backtrace to work correctly ?>
								<?php // Make the first assignment to setError() outside the loop so the loop does not skip Exceptions ?>
								<?php $this->setError($this->_error->getPrevious()); ?>
								<?php while ($loop === true) : ?>
									<p><strong><?php echo Text::_('JERROR_LAYOUT_PREVIOUS_ERROR'); ?></strong></p>
									<p><?php echo htmlspecialchars($this->_error->getMessage(), ENT_QUOTES, 'UTF-8'); ?></p>
									<?php echo $this->renderBacktrace(); ?>
									<?php $loop = $this->setError($this->_error->getPrevious()); ?>
								<?php endwhile; ?>
								<?php // Reset the main error object to the base error ?>
								<?php $this->setError($this->error); ?>
							<?php endif; ?>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
	<?php if ($this->countModules('footer')) : ?>
	<footer class="container-footer footer full-width">
		<div class="grid-child">
			<jdoc:include type="modules" name="footer" style="none" />
		</div>
	</footer>
	<?php endif; ?>

	<jdoc:include type="modules" name="debug" style="none" />
</body>
</html>

```

Im Falle einer ungültigen URL sieht ein Benutzer die nachfolgende Ansicht.

![Joomla Error.php im Standardtemplate Cassiopeia](/images/j4x40x9.png)

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Das nachfolgende Codeschnipsel zeigt dir einen minimaler Aufbau.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/index.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/index.php

<?php
/**
 * @package     Facile
 *
 * @copyright   Copyright (C) 2021 Facile. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;
?>

<!DOCTYPE html>
<html lang="de">
  <head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Titel</title>
  </head>
  <body>
	Hallo Joomla!
  </body>
</html>

```

Die erste Zeile `\defined('_JEXEC') or die;` ist in PHP geschrieben. Das Gute an PHP und HTML ist, dass es zusammen in einer Datei geschrieben werden kann. Wir können PHP-Anweisungen in eine HMTL-Datei einfügen, und umgekehrt. `<?php` öffnet eine PHP-Anweisung - egal wo - und `?>` schließt sie wieder. Mit der Zeile `\defined('_JEXEC') or die;` verbieten wir den direkten Zugriff auf diese Datei. Dies geschieht über die Joomla API mit dem Befehl `_JEXEC`. Diese Anweisung stellt sicher, dass die Datei aus einer Joomla-Sitzung heraus aufgerufen wird. Falls nicht, bricht die Verarbeitung ab `... or die;`. So macht Joomla es einem Hacker schwerer, Schadcode einzuschmuggeln.

Dann deklarieren wir mit `<!doctype html>` den [Dokumententyp](https://www.w3.org/QA/2002/04/valid-dtd-list.html)[^w3.org/qa/2002/04/valid-dtd-list.html]. Dies stellt sicher, dass das Dokument von verschiedenen Browsern auf die gleiche Weise geparst wird. HTML5 ist die einfachste und zuverlässigste Doctype-Deklaration. Diese verwenden wir.

> Beachte, dass der Doctype einfach `!DOCTYPE html` und nicht `!DOCTYPE html5` heißt.

Was dann folgt, ist ein kleinstmöglicher Aufbau einer HTML-Seite. Diese Seite wird mit `<html>` eröffnet und endet mit `</html>`. Der Kopfbereich beginnt mit `<head>` und endet mit `</head>`. Der Body beginnt mit `<body>` und endet mit `</body>`.

Genug erklärt. So sieht die Website minimal aus. Sie lädt noch keine Inhalte aus Joomla! Mir ging es hier in erste Linie darum zu zeigen, dass die `index.php` des aktiven Templates für alles verantwortlich ist. In unserem Fall ist dies die Datei `templates/facile/index.php`. Bisher hält sich die Verantwortung in Grenzen. Es wird lediglich die Begrüßung `Hallo Joomla!` am Bildschirm ausgegeben.

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

Die Sprachdatei `templates/facile/ language/en-GB/en-GB.tpl_facile.ini` sorgt dafür, dass im Backend bei der Verwaltung der Erweiterungen der Name zur Sprache passend angezeigt wird.

[templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.ini

TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."

```

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

Die Sprachdatei `templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini` übersetzt die Texte im Menü oder während der Installation in die korrekte Sprache.

[templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.sys.ini

FACILE="Facile - Site template"

```

##### [templates/facile/offline.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/offline.php)

Die Datei `offline.php` wird aufgerufen, wenn im Backend der Wartungsmodus aktviert ist. Du aktivierst diesen in der globalen Konfiguration.

![Joomla Template erstellen - Offline Seite Backend](/images/j4x40x5.png)

> Um die Website technisch auf dem neuesten Stand zu halten oder um neue Funktionen zu integrieren, wird diese von Zeit zu Zeit überarbeitet. Meist handelt es sich dabei um Updates. Während der Aktualisierung kann es zu Anzeigeproblemen kommen. Damit Besucher nicht durch eine Fehlermeldung irritiert werden, gibt es bei Joomla den Wartungsmodus. Ist dieser aktiv wird einem Besuchern eine spezielle Wartungsmodus-Seite angezeigt, die `offline.php`.

Der nachfolgende minimalistisch Code sorgt dafür, dass ein Anmeldeformular angezeigt wird. Du könntest anstelle davon einen kurzen Text anzeigen. Das Login-Formular ermöglicht es einem Administrator, sich zu authentifizieren und dann die Website im Frontend zu testen.

![Joomla Template erstellen - Offline Seite Frontend](/images/j4x40x6.png)

[templates/facile/ offline.php](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/offline.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/offline.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\AuthenticationHelper;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;

$twofactormethods = AuthenticationHelper::getTwoFactorMethods();
?>

<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<jdoc:include type="head" />
</head>
<body>
	<jdoc:include type="message" />
	<form action="<?php echo Route::_('index.php', true); ?>" method="post" id="form-login">
		<fieldset>
			<label for="username"><?php echo Text::_('JGLOBAL_USERNAME'); ?></label>
			<input name="username" id="username" type="text">

			<label for="password"><?php echo Text::_('JGLOBAL_PASSWORD'); ?></label>
			<input name="password" id="password" type="password">

			<?php if (count($twofactormethods) > 1) : ?>
			<label for="secretkey"><?php echo Text::_('JGLOBAL_SECRETKEY'); ?></label>
			<input name="secretkey" autocomplete="one-time-code" id="secretkey" type="text">
			<?php endif; ?>

			<input type="submit" name="Submit" value="<?php echo Text::_('JLOGIN'); ?>">

			<input type="hidden" name="option" value="com_users">
			<input type="hidden" name="task" value="user.login">
			<input type="hidden" name="return" value="<?php echo base64_encode(Uri::base()); ?>">
			<?php echo HTMLHelper::_('form.token'); ?>
		</fieldset>
	</form>
</body>
</html>

```
Mit der Anmeldemöglichkeit hast du nun die notwendige Funktion integriert. Du möchtest sicherlich deine Wartungsseite schöner gestalten. Inspirationen gibt es jede Menge im Internet. Am einfachstes ist es sicher, sich am nachfolgenden Beispiel des Standardtemplates Cassiopeia zu orientieren: 

![Joomla Offline.php im Standardtemplate Cassiopeia](/images/j4x40x10.png)

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/templateDetails.xml)

Die Datei `templateDetails.xml` (beachte das große D) ist nach `index.php` die zweitwichtigste Datei. Sie enthält allgemeine Informationen wie Name und Autor und definiert alles Wichtige für die Installation. Dies ist hauptsächlich eine Auflistung aller Ordner und Dateien, die zum Template gehören. Diese werden während der Installation entpackt und in den korrekten Verzeichnissen gespeichert.

In der Datei `templateDetails.xml` werden in der Regel die Modulpositionen angelegt und über den Befehl `jdoc:include` in der `index.php` in die Website eingebunden. Dies werden wir in einem später Teil tun. Optional können wir Parameter anlegen, um das Template via Backend anpassbar zu machen. Im weiteren Verlauf dieses Textes habe ich `logoFile`, `siteTitle` und `siteDescription` als Parameter eingefügt. Schauen wir uns aber zunächst eine minimale Version der `templateDetails.xml` im folgenden Code-Schnipsle an.

[src/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/templateDetails.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/templateDetails.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="template" client="site" method="upgrade">
	<name>facile</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>TPL_FACILE_XML_DESCRIPTION</description>

	<files>
		<filename>component.php</filename>
		<filename>error.php</filename>
		<filename>index.php</filename>
		<filename>offline.php</filename>
		<filename>templateDetails.xml</filename>
		<filename>template_preview.png</filename>
		<filename>template_thumbnail.png</filename>
		<folder>language</folder>
	</files>
</extension>

```

Was bedeutet dieser Code genau? XML-Dokumente sollten mit einer [XML-Deklaration](https://de.wikipedia.org/wiki/XML-Deklaration)[^de.wikipedia.org/wiki/xml-deklaration] beginnen, sie müssen es jedoch nicht. Wir erzeugen die Deklaration und legen hier XML-Version und Zeichensatz (utf-8) fest `<?xml version="1.0" encoding="utf-8"?>`.

Der weitere Teil der `templateDetails.xml` enthält Informationen für die Installation. Der Typ ist im Falle eines Templates `template`. Die `method="upgrade"` erlaubt es, das Template zu einem späteren Zeitpunkt über eine frühere Version zu installieren.

> Was zu `method="upgrade"` wichtig ist: Dabei werden neuere Versionen der Dateien installiert. Alte Dateien, die nicht mehr benötigt werden, bleiben jedoch erhalten, werden also nicht gelöscht. Will man gezielt dafür sorgen, dass die eigenen Erweiterung keine unnötigen Dateien bei Nutzern enthält, muss dies in einem Installationsskript explizit implementiert werden.

Als nächstes kommen die allgemeinen Informationen des Templates wie

- Template-Name,
- Erstellungsdatum,
- Autor, Copyright,
- E-Mail-Adresse, Website,
- Version und
- Beschreibung)

Diese Angaben werden später im Template-Manager des Joomla Backends angezeigt.

Danach wird die Installationsroutine aufgelistet. Zum Template gehörende Ordner (`<folder>`) und Dateien (`<filename>`). Das HTML-Tag `<positions>` kommt im Anschluss. Wir werden dieses später einfügen. Jede Position wird in eine eigene Zeile geschrieben und ist nun bereit, in die `index.php` eingebunden zu werden und ist so über den Modulmanager im Joomla Backend auswählbar.

> Weitere Informationen zur Datei `templateDetails.xml` bietet die Joomla Dokumentation [docs.joomls.org](https://docs.joomla.org/What_is_the_purpose_of_the_templateDetails.xml_file%3F/de)[^https://docs.joomla.org/what_is_the_purpose_of_the_templatedetails.xml_file%3f/de].

##### src/templates/facile/template_preview.png und src/templates/facile/template_thumbnail.png

Die beiden in diesem Kapitel neu hinzugekommenen PNG-Dateien sind die Bilder, die im Template Manager angezeigt werden.

![Joomla Template erstellen - Images](/images/j4x40x7.png)

### Geänderte Dateien

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen. Am Anfang ist es am Einfachsten, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien des `templates` Ordners in den `templates` Ordner deiner Joomla 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deinem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

![Joomla Template erstellen - Die Installation](/images/j4x40x2.png)

3. Teste als nächstes, ob das Template fehlerfrei arbeitet. Aktiviere dazu den Template Style Facile.

![Joomla Template erstellen - Template Style aktivieren](/images/j4x40x3.png)

5. Rufe die URL `/index.php` auf. Öffne die Frontend-Ansicht.

![Joomla Template erstellen - Frontend Ansicht](/images/j4x40x1.png)

6. Test die einfache Error-Seite. Gibt dazu eine URL im Adressfeld des Browsers ein, die nicht exisitert. Rufe zum Beispiel die URL `/indexabcxyz.php` auf. Du solltest den Text `Error` sehen.

![Joomla Template erstellen - Error Seite](/images/j4x40x4.png)

7. Sieh dir die Ausgabe der Datei `templates/facile/component.php` an, indem du `/index.php?tmpl=component` in der Adressleiste des Browsers eingibst. Du sollest den Text `Component` sehen.

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)[^https://github.com/c-lodder/lightning]

[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)[^https://github.com/dgrammatiko/sloth-pkg]

[HTML5 UP bietet schicke HTML5-Website-Vorlagen](https://html5up.net/)[^https://html5up.net]
<img src="https://vg08.met.vgwort.de/na/7700831f036b4d999c65e57c78518242" width="1" height="1" alt="">
