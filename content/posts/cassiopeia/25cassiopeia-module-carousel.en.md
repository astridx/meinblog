---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Create a module to display a carousel, image changer or slider by yourself'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-module-carousel
langKey: en
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











You are looking for an extension to display a Boostrap 5 Carousel in Joomla 4 with Cassiopeia? 

> In the [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] you can find many entries. But the right one is not there. Trying it out took a lot of time and you think, if it wouldn't be much easier to create the right solution for yourself. 

Then maybe my first draft is a start for you. Start with my few files. Then you have a good basis to make changes yourself. There are no longer the many options that often cause confusion. But you have exactly what you need.

## Files

There are three files we need to display a Boostrap 5 Carousel via Joomla module. 

> Possibly files for the language translation will be added. If you write the extension for yourself and know exactly that you like to use it only in your own one-language installation, you can use the actual texts for the output instead of the language strings. You can find more information about this topic later when discussing the installation manifest in the file `modules/mod_carousel/mod_carousel.xml`.

### modules/mod_carousel/mod_carousel.php

In your Joomla 4 installation, create the file `modules/mod_carousel/mod_carousel.php` and fill it with the following code. This file ensures that all conditions are set correctly and that the module fits into Joomla without any problems.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/mod_carousel.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Factory;

// Bootstrap already registered in media/vendor/joomla.asset.json
if ($params->get('loadBootstrap')) {
	$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
	$wa->useScript('bootstrap.carousel');
}

require ModuleHelper::getLayoutPath('mod_carousel', $params->get('layout', 'default'));

```

> Special feature here: We integrate Bootstrap, but we don't need to download any files. Bootstrap is already registered in Joomla 4 via media/vendor/`joomla.asset.json`. We do the access via [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_carousel/mod_carousel.php

Create the file `modules/mod_carousel/mod_carousel.xml` in your Joomla 4 installation and fill it with the following code. Adjust the upper part of the code to your needs. Delete the line `<folder>language</folder>` if you don`t use language files. 

> If you like to create language files, you can use the files in my [repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/language/en-GB] for orientation. I wrote more information about language files at ["Using language files"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/].

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/mod_carousel.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
	<name>mod_carousel</name>
	<author>Astrid Günther</author>
	<creationDate>##DATE##</creationDate>
	<copyright>(C) Astrid Günther. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
	<description>MOD_CAROUSEL_XML_DESCRIPTION</description>

	<files>
		<filename module="mod_carousel">mod_carousel.php</filename>
		<folder>tmpl</folder>
		<folder>language</folder>
	</files>

	<config>
		<fields name="params">
			<fieldset name="options" label="COM_MODULES_BASIC_FIELDSET_LABEL">
				<field
					name="onlyHomepage"
					type="list"
					label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_LABEL"
					default="1"
					description="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_DESC"
					>
					<option value="0">JNO</option>
					<option value="1">JYES</option>
				</field>
				<field
					name="loadBootstrap"
					type="list"
					label="TPL_CASSIOPEIA_CAROUSEL_ONLYONEIMAGE_LABEL"
					default="1"
					description="TPL_CASSIOPEIA_CAROUSEL_ONLYONEIMAGE_DESC"
					>
					<option value="0">JNO</option>
					<option value="1">JYES</option>
				</field>
				<field
					name="showTextOnImage"
					type="list"
					label="TPL_CASSIOPEIA_CAROUSEL_SHOWTEXTONIMAGE_LABEL"
					default="1"
					description="TPL_CASSIOPEIA_CAROUSEL_SHOWTEXTONIMAGE_DESC"
					>
					<option value="0">JNO</option>
					<option value="1">JYES</option>
				</field>
				<field
					name="bigText"
					type="list"
					label="TPL_CASSIOPEIA_CAROUSEL_BIGTEXT_LABEL"
					default="1"
					description="TPL_CASSIOPEIA_CAROUSEL_BIGTEXT_DESC"
					showon="showTextOnImage:1"
					>
					<option value="0">JNO</option>
					<option value="1">JYES</option>
				</field>
				<field 
					name="minheight" 
					type="integer" 
					default="200" 
					label="TPL_CASSIOPEIA_CAROUSEL_MINHEIGHT_LABEL" 
					description="TPL_CASSIOPEIA_CAROUSEL_MINHEIGHT_DESC" 
					first="50" 
					last="500" 
					step="1" 
				/>
			</fieldset>
			<fieldset name="images">
				<field
					name="carouselimages"
					type="subform"
					label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_LABEL"
					description="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_DESC" 
					multiple="true"
					layout="joomla.form.field.subform.repeatable"
					>
					<form>
						<field
							name="file"
							type="media"
							label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_FILE_LABEL"
						/>
						<field
							name="heading"
							type="textarea"
							filter="raw"
							label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_HEADING_LABEL"
						/>
						<field
							name="text"
							type="textarea"
							filter="raw"
							label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_TEXT_LABEL"
						/>
						<field
							name="link"
							type="text"
							label="TPL_CASSIOPEIA_CAROUSEL_HEADERIMAGE_IMAGE_LINK_LABEL"
						/>
					</form>
				</field>				
			</fieldset>
			<fieldset name="advanced">
				<field
					name="layout"
					type="modulelayout"
					label="JFIELD_ALT_LAYOUT_LABEL"
					class="form-select"
					validate="moduleLayout"
				/>

				<field
					name="moduleclass_sfx"
					type="textarea"
					label="COM_MODULES_FIELD_MODULECLASS_SFX_LABEL"
					rows="3"
					validate="CssIdentifier"
				/>

				<field
					name="cache"
					type="list"
					label="COM_MODULES_FIELD_CACHING_LABEL"
					default="1"
					filter="integer"
					validate="options"
					>
					<option value="1">JGLOBAL_USE_GLOBAL</option>
					<option value="0">COM_MODULES_FIELD_VALUE_NOCACHING</option>
				</field>

				<field
					name="cache_time"
					type="number"
					label="COM_MODULES_FIELD_CACHE_TIME_LABEL"
					default="900"
					filter="integer"
				/>

				<field
					name="cachemode"
					type="hidden"
					default="static"
					>
					<option value="static"></option>
				</field>
			</fieldset>
		</fields>
	</config>
</extension>

```
### modules/mod_carousel/tmpl/default.php

In your Joomla 4 installation, create the file `modules/mod_carousel/tmpl/default.php` and fill it with the following code. This file is a template which is responsible for the layout in the frontend.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/tmpl/default.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Language\Multilanguage;

$modId = 'mod-carousel' . $module->id;
$app = Factory::getApplication();
$menu = $app->getMenu()->getActive();

// Look for the active menu item
$lang = Factory::getLanguage();
if (Multilanguage::isEnabled()) {
	$home = $app->getMenu()->getDefault($lang->getTag());
} else {
	$home = $app->getMenu()->getDefault();
}

$hidden = "";
if (!$params->get('showTextOnImage')) {
	$hidden = " hidden ";
}
?>


<?php if ($menu === $home && $params->get('onlyHomepage')) : ?>
<div id="<?php echo $modId; ?>" class="mod-custom custom">
	<div class="carousel slide" data-bs-ride="carousel" id="carouselHeaderCaptions">
		<div class="carousel-inner">
			<?php foreach ($params->get('carouselimages') as $key => $carouselimage) : ?>
				<?php if ($params->get('bigText')) : ?>
			<div
				class="carousel-item carousel-item1 <?php echo (str_replace("carouselimages", "", $key) == '0') ? ' active ' : ''; ?> bg bg-<?php echo str_replace("carouselimages", "", $key) ?>">
				<div class="<?php echo $hidden; ?> carousel-caption carousel-caption1">
					<p> <?php echo $carouselimage->heading; ?></p>
					<p><?php echo $carouselimage->text; ?></p>
					<a class="btn btn-secondary"
						href="<?php echo Uri::root() . $carouselimage->link; ?>"><?php echo Text::_('MOD_CAROUSEL_MORE'); ?></a>
				</div>
			</div>
				<?php endif; ?>

				<?php if (!$params->get('bigText')) : ?>
			<div
				class="carousel-item carousel-item1 <?php echo (str_replace("carouselimages", "", $key) == '0') ? ' active ' : ''; ?> bg bg-<?php echo str_replace("carouselimages", "", $key) ?>">
				<div class="<?php echo $hidden; ?> carousel-caption carousel-caption1">
					<p>
						<?php echo $carouselimage->heading; ?> <?php echo $carouselimage->text; ?>
						<a class="btn btn-primary"
							href="<?php echo Uri::root() . $carouselimage->link; ?>"><?php echo Text::_('MOD_CAROUSEL_MORE'); ?>
						</a>
					</p>
				</div>
			</div>
				<?php endif; ?>

			<?php endforeach; ?>
		</div>
	</div>
</div>
<?php endif; ?>

<!--
Stylesheet for user.css
<style>
:root {
  --cassiopeia-color-primary-rgb: 85,152,55;
}
</style>
-->

<style>
<?php foreach ($params->get('carouselimages') as $key => $carouselimage) :
	?>.bg-<?php echo str_replace("carouselimages", "", $key) ?> {
	background-image: url("<?php echo Uri::root(); ?><?php echo $carouselimage->file; ?>");
}

<?php endforeach;

?>.carousel-item {
	min-height: <?php echo $params->get('minheight') ?>px;
}

.carousel-caption {
	z-index: 2;
	background-color: rgba(var(--cassiopeia-color-primary-rgb), 0.75);
}

.bg {
	-webkit-background-size: cover;
	background-size: cover;
}

@media only screen and (min-width: 768px) and (max-width: 1200px) {
	.carousel-caption {
		display: none;
	}
}

@media only screen and (max-width: 767px) {
	#<?php echo $modId;

	?> {
		display: none;
	}

	.carousel {
		display: none;
	}
}
</style>
```

## Anwendung

We have created the files directly in the Joomla installation. We did not create an installation package. Joomla provides an alternative installation method for these cases - the core Joomla Discover. The function is located in the system menu. In the administration area, click on System in the left navigation and then look for the Discover entry in the Install area on the right. Click on it and perform the Discover installation. 

![Installation des Modules mod_carousel](/images/discover.png)

After successful installation it is possible to create a module via Content | Site Modules.

![Anlegen des Modules mod_carousel](/images/carousel1.png)

Set up the module according to your ideas.

![Optionen des Modules mod_carousel](/images/carousel2.png)

The images are in a separate Tabulator.

![Optionen des Modules mod_carousel](/images/carousel2a.png)

Make sure that the display on the frontend is what you want it to be.

![Anzeige im Frontend des Modules mod_carousel](/images/carousel3.png)

## Links

https://www.rapidtables.com/convert/color/index.html

https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable



https://www.w3schools.com/bootstrap/bootstrap_carousel.asp

https://getbootstrap.com/docs/5.0/components/carousel/


<img src="https://vg06.met.vgwort.de/na/124b0a46ac144bef840faa6148721be4" width="1" height="1" alt="">

