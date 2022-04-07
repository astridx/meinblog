---
description: 'desc'
shortTitle: 'short'
date: 2021-01-10
title: 'Template - First Steps'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-erste-schritte
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Why should you create your own Joomla template? There are a few good reasons why we should make this happen!<!-- \index{template} -->

> Especially for extension developers, I think it is essential to know how a Joomla template works. This makes it possible to integrate the separation of logic and design into the extension.

- Creating our own Joomla template means that we have complete control over every last detail of the look and feel of the website. We only create code that we like. It is much easier to change a custom template than a complex Joomla template, where often the different elements are attached to each other.
- Creating our own template means that we don't overload the website with functions that we don't even use.
- If we want a custom Joomla template that is not used by thousands of other websites, creating one is an option.
- If you have never created a Joomla template before, you will learn a lot about Joomla while developing it. You will end up knowing a lot about the interaction of the different elements and feel more confident.

> This is not about learning HTML and CSS. That's why I will use a ready-made [HTML5 template](https://html5up.net/txt) in this article. Follow my example and you will be able to create a complete Joomla template yourself in the end. You develop HTML and CSS yourself or use a template like I did here.

A template is responsible for the design of the website.
There are two types of templates in Joomla:

- Front-End-Templates and
- back-end templates.

We create a front-end template. This controls the way the website is presented to the user.

The principle for creating a template for the administration area is exactly the same. You create it in the subdirectory `/administrator/templates`. You create the front-end template in the folder `/templates`.

> For impatient people: Take a look at the changed programme code in the [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t34...t35)[^github.com/astridx/boilerplate/compare/t34...t35] and copy these changes into your development version.

## Step by step

With the template it is also so that you do not reinvent the wheel. You can use many things that Joomla provides by default. This has advantages. The disadvantage is that individual wishes are more difficult to implement, or rather Joomla knowledge is a necessary prerequisite. Therefore we start rudimentary. The main thing is to look behind the functions and understand them.

### New files

#### Template

This part will guide you through the necessary steps to create a Joomla template - from scratch.

##### [templates/facile/component.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-a2b7f60a181e04a69df79be3ddff4649b7c147917743f7031cbe581adb1572be)

The `component.php` provides the logic for a reduced version of the site. This means that only the pure view of the component is displayed.

This is ideal for printer-friendly output or display in a modal window.

To further explain: As already mentioned, a component is responsible for the display of the _main_ content. The entire layout, for example the modules in a sidebar and the navigation are accessories. The file `component.php` sets the focus on the _main_ content.

> Would you like to see the output of the file `component.php`? This view is displayed in the browser if you append `tmpl=component` to the URL - for example like this: `/index.php?tmpl=component`.

We create the file `component.php` here for the sake of completeness and add the text `Component` to test it.

[templates/facile/component.php](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/component.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/component.php

Component

```

In the Joomla 4 default template Cassiopeia the file `component.php` is implemented as follows:

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

Thus, in Cassiopeia, all essential content is loaded to separately display the area highlighted in the image below.

![Joomla Komponentenbereich im Standardtemplate Cassiopeia](/images/j4x40x8.png)

##### [templates/facile/error.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-13b9d39c6c50cd64c483828e227736031299d698ae3cf54b91d9b9c4114ffd9e)

When website visitors call a page that does not exist, they receive an error message. Joomla's error message is generic. It is much better to create your own individual error page.

In my opinion, a good error page includes:

- Minimalist design: express yourself with simple texts and clear images. Write only what is necessary. Less is more!
- Link to the homepage: Describe clearly how to reach the homepage and put a link to it. An additional link, for example in the logo, is helpful. But it should not be the only way to get back to the homepage.
- A search: Offer the visitor a search field. He will know what he wants to see. A search field is used because it offers an option to find it. Besides, it keeps him on your website.
- No technical terms: `404 Error` is completely meaningless to many people.

> In my opinion, the error page should not blame visitors. After all, it's not their fault if a page doesn't exist or an internal server error occurs.

To let you know how and where to implement your error page, I created the file `templates/facile/error.php`. This contains nothing more than the word `Error`. So it is possible to test the page. Let your imagination run free with the content and design of your own individual error page.

[templates/facile/error.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/error.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/error.php

Error

```

In the Joomla 4 default template Cassiopeia the file `error.php` is implemented as follows:

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

In case of an invalid URL, a user will see the following view.

![Joomla Error Datei im Standardtemplate Cassiopeia](/images/j4x40x9.png)

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

The file `index.php` is the heart. It ensures that everything works together. The following code snippet shows you a minimal structure.

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

The first line `\defined('_JEXEC') or die;` is written in PHP. The good thing about PHP and HTML is that it can be written together in one file. We can put PHP statements into an HMTL file, and vice versa. `<?php` opens a PHP statement - anywhere - and `?>` closes it. With the line `\defined('_JEXEC') or die;` we forbid direct access to this file. This is done through the Joomla API with the `_JEXEC` command. This statement ensures that the file is accessed from within a Joomla session. If not, the processing aborts `... or die;`. This is how Joomla makes it harder for a hacker to inject malicious code.

Then we declare the [document type](https://www.w3.org/QA/2002/04/valid-dtd-list.html)[^w3.org/qa/2002/04/valid-dtd-list.html] with `<!doctype html>`. This ensures that the document is parsed the same way by different browsers. HTML5 is the simplest and most reliable doctype declaration. This is what we use.

> Note that the doctype is simply `!DOCTYPE html` and not `!DOCTYPE html5`.

What follows is the smallest possible structure of an HTML page. This page opens with `<html>` and ends with `</html>`. The header starts with `<head>` and ends with `</head>`. The body starts with `<body>` and ends with `</body>`.

Enough explanation. This is how the website looks minimally. It does not yet load any content from Joomla! My main point here was to show that the `index.php` of the active template is responsible for everything. In our case, this is the file `templates/facile/index.php`. So far, the responsibility is limited. Only the (German) greeting `Hallo Joomla!` is displayed on the screen.

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

The language file `templates/facile/ language/en-GB/en-GB.tpl_facile.ini` ensures that the name is displayed in the backend in the correct language when managing the extensions.

[templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.ini

TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."

```

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

The language file `templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini` translates the texts in the menu or during the installation into the correct language.

[templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.sys.ini

FACILE="Facile - Site template"

```

##### [templates/facile/offline.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/offline.php)

The file `offline.php` is called when the maintenance mode is activated in the backend. You activate this in the global configuration.

![Create Joomla Template - Offline Page Backend](/images/j4x40x5.png)

> To keep the website technically up to date or to integrate new features, it will be revised from time to time. Mostly these are updates. During the update, display problems may occur. So that visitors are not irritated by an error message, Joomla has a maintenance mode. If this is active a special maintenance mode page is shown to the visitor, the `offline.php`.

The following minimalist code will display a registration form. You could display a short text instead. The login form allows an administrator to authenticate and then test the site via frontend.

![Joomla Template erstellen - Offline Seite Frontend](/images/j4x40x6.png)

[templates/facile/ offline.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/offline.php)

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

With the login option you have now integrated the necessary function. You surely want to make your maintenance page more attractive. There is a lot of inspiration available in the Internet. The easiest way is to orientate yourself on the following example from the standard template Cassiopeia:

![Joomla Offline.php in default template Cassiopeia](/images/j4x40x10.png)

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/t35/src/templates/facile/templateDetails.xml)

The file `templateDetails.xml` (note the big D) is the second most important file after `index.php`. It contains general information like name and author and defines everything important for the installation. This is mainly a listing of all folders and files that belong to the template. These will be unpacked during the installation and stored in the correct directories.

In the file `templateDetails.xml` the module positions are usually created and included into the website via the command `jdoc:include` in the `index.php`. We will do this in a later part. Optionally we can create parameters to make the template customizable via backend. In the further course of this text I have included `logoFile`, `siteTitle` and `siteDescription` as parameters. But first, let's look at a minimal version of `templateDetails.xml` in the following code snippet.

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

What does this code mean exactly? XML documents should start with an [XML declaration](https://en.wikipedia.org/wiki/XHTML#XML_declaration)[^en.wikipedia.org/wiki/xhtml#xml_declaration], but they don't have to. We create the declaration and specify XML version and charset (utf-8) here `<?xml version="1.0" encoding="utf-8"?>`.

The other part of `templateDetails.xml` contains information for the installation. The type is `template` in case of a template. The `method="upgrade"` allows to install the template at a later time over a previous version.

> What is important about `method="upgrade"`: It installs newer versions of the files. Old files that are no longer needed, however, remain. So they are not deleted. If you want to specifically ensure that your extension does not contain unnecessary files for users, this have to be explicitly implemented in an installation script.

Next comes the general information of the template such as

- Template name,
- creation date,
- author, copyright,
- e-mail address, website,
- version and
- Description)

These will be displayed later in the template manager of the Joomla backend.

After that the installation routine is listed. Folders (`<folder>`) and files (`<filename>`) belonging to the template. The HTML tag `<positions>` comes afterwards. We will add this later. Each position is written in a separate line and is now ready to be included in the `index.php` and is thus selectable via the module manager in the Joomla backend.

> For more information on the `templateDetails.xml` file, see the Joomla documentation [docs.joomls.org](https://en.wikipedia.org/wiki/XHTML#XML_declaration)[^en.wikipedia.org/wiki/xhtml#xml_declaration].

##### template_preview.png und template_thumbnail.png

The two PNG `src/templates/facile/template_preview.png` and `src/templates/facile/template_thumbnail.png` files added in this chapter are the images that will be displayed in the Template Manager.

![Create Joomla Template - Images](/images/j4x40x7.png)

### Changed files

Only files have been added in this section.

## Test your Joomla template

1. install your template in Joomla version 4 to test it. In the beginning, the easiest thing to do is to copy the files manually in place:

Copy the files from the `templates` folder into the `templates` folder of your Joomla 4 installation.

2. install your template as described in part one, after you have copied all files. Open the menu `System | Install | Discover`. Here you will see an entry for the template you just copied. Select it and click on the button 'Install'.

![Create Joomla Template - The Installation](/images/j4x40x2.png)

Next, test whether the template works without errors. Activate the Template Style Facile.

![Create Joomla Template - Activate Template Style](/images/j4x40x3.png)

5. call the URL `/index.php`. Open the frontend view.

![Create Joomla Template - Frontend View](/images/j4x40x1.png)

6. test the simple error page. To do this, enter a URL in the address field of the browser that does not exist. For example call the URL `/indexabcxyz.php`. You should see the text `Error`.

![Create Joomla Template - Error Page](/images/j4x40x4.png)

7. look at the output of the file `templates/facile/component.php` by typing `/index.php?tmpl=component` in the address bar of the browser. You should see the text `Component`.

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)[^github.com/c-lodder/lightning]

[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)[^github.com/dgrammatiko/sloth-pkg]

[HTML5 UP offers fancy HTML5 website templates](https://html5up.net/)[^html5up.net]
<img src="https://vg08.met.vgwort.de/na/cc552c93919243168d44670763fe0f3c" width="1" height="1" alt="">
