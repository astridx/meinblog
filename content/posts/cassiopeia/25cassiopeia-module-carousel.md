---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Ein Module zur Anzeige eines Carousels, Bildwechslers oder Sliders selbst erstellen'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-module-carousel
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Du suchst eine Erweiterung, um ein Boostrap 5 Carousel in Joomla 4 mit Cassiopeia anzuzeigen?  

> Im [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] findest du viele Einträge. Aber die richtige ist nicht dabei. Das Ausprobieren hat viel Zeit gekostet und du überlegst, ob es nicht viel einfacher wäre, selbst die richtige Lösung für dich zu erstellen.

Dann ist mein erster Entwurf vielleicht ein Anfang für dich. Beginne mit meinen wenigen Dateien. Dann hast du eine gute Basis, um selbst Änderungen vorzunehmen. Es gibt dann nicht mehr die vielen Optionen, die oft für Verwirrung sorgen. Aber du hast genau das, was du brauchst.

## Dateien

Es gibt drei Dateien, die wir benötigen, um ein Boostrap 5 Carousel über ein Joomla-Modul anzuzeigen. 

> Eventuell werden noch Dateien für die Sprachübersetzung hinzugefügt. Wenn du die Erweiterung für dich selbst schreibst und genau weißt, dass du sie nur in deiner eigenen einsprachigen Installation verwenden möchtest, kannst du statt der Sprachstrings auch die eigentlichen Texte für die Ausgabe verwenden. Weitere Informationen zu diesem Thema findest du später beim Besprechen des Installationsmanifests in der Datei `modules/mod_carousel/mod_carousel.xml`.

### modules/mod_carousel/mod_carousel.php

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_carousel/mod_carousel.php` und fülle diese mit nachfolgendem Code. Diese Datei sorgt dafür, dass alle Rahmenbedingen korrekt gesetzt sind und das Modul sich problemlos in Joomla einfügt.

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

Besonderheit hier: Wir integrieren Bootstrap, aber wir laden keine Dateien herunter. Bootstrap ist bereits in Joomla 4 per `media/vendor/joomla.asset.json` registriert. Wir machen den Zugriff via [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_carousel/mod_carousel.xml

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_carousel/mod_carousel.xml` und fülle diese mit dem nachfolgenden Code. Passe diesen im oberen Bereich an deine Gegebenheiten an. Lösche die Zeile `<folder>language</folder>`, falls du keine Sprachdateien verwendest. 

> Falls du Sprachdateien anlegen magst, kannst du dich an den Dateien in meinem [Repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_carousel/language/en-GB] orientieren. Mehr Informationen zu Sprachdateien habe ich unter ["Sprachdateien nutzen"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/] geschrieben.

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

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_carousel/tmpl/default.php` und fülle diese mit nachfolgendem Code. Diese Datei ist ein Template, welches für die Anzeige im Frontend verantwortlich ist.

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

Wir haben die Dateien direkt in der Joomla-Installation erstellt. Wir haben kein Installationspaket erzeugt. Joomla bietet für diese Fälle eine alternative Installationsmethode - die Joomla Kernfunktion Discover. Die Funktion findet man im Systemmenü. Klicke im Administrationsbereich in der linken Navigation auf System und suche dann im Bereich Install auf der rechten Seite den Eintrag Entdecken. Klicke diesen an und führe die Discover-Installation durch. 

![Installation des Modules mod_carousel](/images/discover.png)

Nach erfolgreicher Installation ist es möglich, über Content | Site Modules ein Modul zu erstellen.

![Anlegen des Modules mod_carousel](/images/carousel1.png)

Richte das Modul nach deinen Vorstellungen ein.

![Optionen des Modules mod_carousel](/images/carousel2.png)

Für die Bilder gibt es einen eigenen Tabulator.

![Optionen des Modules mod_carousel](/images/carousel2a.png)

Vergewissere dich, dass die Anzeige im Frontend so ist, wie du sie haben möchtest.

![Anzeige im Frontend des Modules mod_carousel](/images/carousel3.png)


## Links

https://www.rapidtables.com/convert/color/index.html

https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable



https://www.w3schools.com/bootstrap/bootstrap_carousel.asp

https://getbootstrap.com/docs/5.0/components/carousel/

<img src="https://vg06.met.vgwort.de/na/8bb15f796364454a9ccfbbcc7b26adeb" width="1" height="1" alt="">


