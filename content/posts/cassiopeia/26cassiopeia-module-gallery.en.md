---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Create a module to display a gallery yourself'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-module-gallery
langKey: en
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











You are looking for an extension to display a Gallery in Joomla 4 with Cassiopeia? 

> In the [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] you can find many entries. But the right one is not there. Trying it out took a lot of time and you think, if it wouldn't be much easier to create the right solution for yourself. 

Then customizing the [fslightbox.com](https://fslightbox.com/javascript/download)[^fslightbox.com/javascript/download] might be a start for you. Start with my few files. Then you have a good basis to make changes yourself. There are no longer the many options that often cause confusion. But you have exactly what you need.

## Files

There are four files we need to display a Gallery via Joomla module. 

> Possibly files for the language translation will be added. If you write the extension for yourself and know exactly that you like to use it only in your own one-language installation, you can use the actual texts for the output instead of the language strings. You can find more information about this topic later when discussing the installation manifest in the file `modules/mod_bootstrap5lightboxgallery/bootstrap5lightboxgallery.xml`.

### modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.php

In your Joomla 4 installation, create the file `modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.php` and fill it with the following code. This file ensures that all conditions are set correctly and that the module fits into Joomla without any problems.

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

Special feature here: We the asset file `mod_bootstrap5lightboxgallery/fslightbox.js`. We do the access via [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml

Create the file `modules/mod_bootstrap5lightboxgallery/mod_bootstrap5lightboxgallery.xml` in your Joomla 4 installation and fill it with the following code. Adjust the upper part of the code to your needs. Delete the line `<folder>language</folder>` if you don`t use language files. 

> If you like to create language files, you can use the files in my [repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_bootstrap5lightboxgallery/language/en-GB] for orientation. I wrote more information about language files at ["Using language files"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/].

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

In your Joomla 4 installation, create the file `modules/mod_bootstrap5lightboxgallery/tmpl/default.php` and fill it with the following code. This file is a template which is responsible for the layout in the frontend.

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

> Hint: Equal Height and Width Columns using Flexbox: [codepen.io](https://codepen.io/imohkay/pen/AWyojz)[^codepen.io/imohkay/pen/AWyojz]

### media/mod_bootstrap5lightboxgallery/js/fslightbox.js

Create the directory `media/mod_bootstrap5lightboxgallery`. Create the folder `js` in this directory. In the `js` folder copy the file `fslightbox.js`. You can either use this file from my [repo](https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/media/mod_bootstrap5lightboxgallery/js/fslightbox.js)[^codeberg.org/astrid/git/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/media/mod_bootstrap5lightboxgallery/js/fslightbox.js] or download it from [fslightbox.com](https://fslightbox.com/javascript/download)[^fslightbox.com/javascript/download].

## Anwendung

We have created the files directly in the Joomla installation. We did not create an installation package. Joomla provides an alternative installation method for these cases - the core Joomla Discover. The function is located in the system menu. In the administration area, click on System in the left navigation and then look for the Discover entry in the Install area on the right. Click on it and perform the Discover installation. 

![Installation des Moduls mod_bootstrap5lightboxgallery](/images/discover.png)

After successful installation it is possible to create a module via Content | Site Modules.

![Anlegen des Moduls mod_bootstrap5lightboxgallery](/images/gallery1.png)

Set up the module according to your ideas.

![Optionen des Moduls mod_bootstrap5lightboxgallery](/images/gallery2.png)

Make sure that the display on the frontend is what you want it to be.

![Anzeige im Frontend des Moduls mod_bootstrap5lightboxgallery](/images/gallery3.png)


## Links

https://fslightbox.com/javascript/download


<img src="https://vg06.met.vgwort.de/na/3c6bdac448b54638b114bf7e44c123eb" width="1" height="1" alt="">