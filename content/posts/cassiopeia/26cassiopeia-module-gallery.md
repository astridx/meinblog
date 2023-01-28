---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Ein Module zur Anzeige einer Gallerie selbst erstellen'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-module-gallery
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Du suchst eine Erweiterung, um eine Gallerie in Joomla 4 mit Cassiopeia anzuzeigen? 

> Im [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] findest du viele Einträge. Aber die richtige ist nicht dabei. Das Ausprobieren hat viel Zeit gekostet und du überlegst, ob es nicht viel einfacher wäre, selbst die richtige Lösung für dich zu erstellen.

Dann ist das Anpassen der [fslightbox.com](https://fslightbox.com/javascript/download)[^fslightbox.com/javascript/download] vielleicht ein Anfang für dich. Beginne mit meinen wenigen Dateien. Dann hast du eine gute Basis, um selbst Änderungen vorzunehmen. Es gibt dann nicht mehr die vielen Optionen, die oft für Verwirrung sorgen. Aber du hast genau das, was du brauchst.

## Dateien

Es gibt vier Dateien, die wir benötigen, um ein Boostrap 5 Carousel über ein Joomla-Modul anzuzeigen. 

> Eventuell werden noch Dateien für die Sprachübersetzung hinzugefügt. Wenn du die Erweiterung für dich selbst schreibst und genau weißt, dass du sie nur in deiner eigenen einsprachigen Installation verwenden möchtest, kannst du statt der Sprachstrings auch die eigentlichen Texte für die Ausgabe verwenden. Weitere Informationen zu diesem Thema findest du später beim Besprechen des Installationsmanifests in der Datei `modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml`.

### modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.php

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.php` und fülle diese mit nachfolgendem Code. Diese Datei sorgt dafür, dass alle Rahmenbedingen korrekt gesetzt sind und das Modul sich problemlos in Joomla einfügt.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Plugin\PluginHelper;

/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $app->getDocument()->getWebAssetManager();
$wa->registerAndUseScript('mod_bootstrap5lightboxgallery', 'mod_bootstrap5lightboxgallery/fslightbox.js', [], ['defer' => true]);

require ModuleHelper::getLayoutPath('mod_bootstrap5lightboxgallery', $params->get('layout', 'default'));

```
Besonderheit hier: Wir nutzen die Asset-Datei `mod_bootstrap5lightboxgallery/fslightbox.js`. Wir machen den Zugriff über [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml` und fülle diese mit dem nachfolgenden Code. Passe diesen im oberen Bereich an deine Gegebenheiten an. Lösche die Zeile `<folder>language</folder>`, falls du keine Sprachdateien verwendest. 

> Falls du Sprachdateien anlegen magst, kannst du dich an den Dateien in meinem [Repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/language/en-GB] orientieren. Mehr Informationen zu Sprachdateien habe ich unter ["Sprachdateien nutzen"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/] geschrieben.

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
	<name>mod_bootstrap5lightboxgallery</name>
	<author>Astrid Günther</author>
	<creationDate>##DATE##</creationDate>
	<copyright>(C) Astrid Günther. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
	<description>MOD_BOOTSTRAP5LIGHTBOXGALLERY_XML_DESCRIPTION</description>

	<files>
		<filename module="mod_bootstrap5lightboxgallery">mod_bootstrap5lightboxgallery.php</filename>
		<folder>tmpl</folder>
		<folder>language</folder>
	</files>

	<!-- Media files -->
	<media folder="media/mod_bootstrap5lightboxgallery" destination="mod_bootstrap5lightboxgallery">
		<folder>js</folder>
	</media>

	<config>
		<fields name="params">
			<fieldset name="options" label="COM_MODULES_BASIC_FIELDSET_LABEL">
			<field
				name="bootstrap5lightboxgalleryimages"
				type="subform"
				label="TPL_CASSIOPEIA_BOOTSTRAP5LIGHTBOXGALLERY_HEADERIMAGE_IMAGE_LABEL"
				multiple="true"
				layout="joomla.form.field.subform.repeatable"
				>
				<form>
					<field
						name="file"
						type="media"
						label="TPL_CASSIOPEIA_BOOTSTRAP5LIGHTBOXGALLERY_HEADERIMAGE_IMAGE_FILE_LABEL"
					/>
					<field
						name="alttext"
						type="text"
						label="TPL_CASSIOPEIA_BOOTSTRAP5LIGHTBOXGALLERY_HEADERIMAGE_ALTTEXT_FILE_LABEL"
						default=""
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

### modules/mod_bootstrap5lightboxgallery/tmpl/default.php

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_bootstrap5lightboxgallery/tmpl/default.php` und fülle diese mit nachfolgendem Code. Diese Datei ist ein Template, welches für die Anzeige im Frontend verantwortlich ist.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/tmpl/default.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Language\Multilanguage;

$modId = 'mod-bootstrap5lightboxgallery' . $module->id;
$app = Factory::getApplication();
?>

<div class="bootstrap5lightboxgalleryimages-container">
	<?php foreach ($params->get('bootstrap5lightboxgalleryimages') as $key => $bootstrap5lightboxgalleryimage) : ?>
	<div>
		<a data-fslightbox href="<?php echo $bootstrap5lightboxgalleryimage->file; ?>">
			<img src="<?php echo $bootstrap5lightboxgalleryimage->file; ?>"
				alt="<?php echo $bootstrap5lightboxgalleryimage->alttext; ?>">
		</a>

	</div>
	<?php endforeach; ?>
</div>

<!--
Stylesheet for user.css
<style>
.bootstrap5lightboxgalleryimages-container > div {
	width: 200px;
	min-width: 200px;
	max-width: 200px;
	height: auto;
	margin: 10px;
}

.bootstrap5lightboxgalleryimages-container {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
}
</style>
-->
```

> Tipp: Gleiche Höhe und Breite von Spalten mit Flexbox: [codepen.io](https://codepen.io/imohkay/pen/AWyojz)[^codepen.io/imohkay/pen/AWyojz]

### media/mod_bootstrap5lightboxgallery/js/fslightbox.js

Erstelle das Verzeichnis `media/mod_bootstrap5lightboxgallery`. Lege in diesem Verzeichnis den Ordner `js` an. Kopiere in den `js`-Ordner die Datei `fslightbox.js`. Diese Datei kannst du entweder aus meinem [Repo](https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/media/mod_bootstrap5lightboxgallery/js/fslightbox.js)[^codeberg.org/astrid/git/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/media/mod_bootstrap5lightboxgallery/js/fslightbox.js] verwenden oder von [fslightbox.com](https://fslightbox.com/javascript/download)[^fslightbox.com/javascript/download] herunterladen.

## Anwendung

Wir haben die Dateien direkt in der Joomla-Installation erstellt. Wir haben kein Installationspaket erzeugt. Joomla bietet für diese Fälle eine alternative Installationsmethode - die Joomla Kernfunktion Discover. Die Funktion findet man im Systemmenü. Klicke im Administrationsbereich in der linken Navigation auf System und suche dann im Bereich Install auf der rechten Seite den Eintrag Entdecken. Klicke diesen an und führe die Discover-Installation durch. 

![Installation des Modules mod_bootstrap5lightboxgallery](/images/discover.png)

Nach erfolgreicher Installation ist es möglich, über Content | Site Modules ein Modul zu erstellen.

![Anlegen des Modules mod_bootstrap5lightboxgallery](/images/gallery1.png)

Richte das Modul nach deinen Vorstellungen ein.

![Optionen des Modules mod_bootstrap5lightboxgallery](/images/gallery2.png)

Vergewissere dich, dass die Anzeige im Frontend so ist, wie du sie haben möchtest.

![Anzeige im Frontend des Modules mod_bootstrap5lightboxgallery](/images/gallery3.png)


## Links

https://fslightbox.com/javascript/download
<img src="https://vg06.met.vgwort.de/na/a56c568c25d34773b3b0a12d81e98c14" width="1" height="1" alt="">