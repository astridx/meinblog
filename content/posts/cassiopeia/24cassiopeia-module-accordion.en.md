---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Create a module to display Boostrap 5 Accordion yourself'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-module-accordion
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











You are looking for an extension to display a Boostrap 5 Accordion in Joomla 4 with Cassiopeia? In the [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] you can find many entries. But the right one is not there. Trying it out took a lot of time and you think, if it wouldn't be much easier to create the right solution for yourself. Then maybe my first draft is a start for you. Start with my few files. Then you have a good basis to make changes yourself. There are no longer the many options that often cause confusion. But you have exactly what you need.

## Files

There are three files we need to display a Boostrap 5 Accordion via Joomla module. 

> Possibly files for the language translation will be added. If you write the extension for yourself and know exactly that you like to use it only in your own one-language installation, you can use the actual texts for the output instead of the language strings. You can find more information about this topic later when discussing the installation manifest in the file `modules/mod_agaccordion/mod_agaccordion.xml`.

### modules/mod_agaccordion/mod_agaccordion.php

In your Joomla 4 installation, create the file `modules/mod_agaccordion/mod_agaccordion.php` and fill it with the following code. This file ensures that all conditions are set correctly and that the module fits into Joomla without any problems.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/mod_agaccordion.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Factory;

$wa = Factory::getApplication()->getDocument()->getWebAssetManager();
$wa->useScript('bootstrap.collapse');

require ModuleHelper::getLayoutPath('mod_agaccordion', $params->get('layout', 'default'));

```

> Special feature here: We integrate Bootstrap, but we don't need to download any files. Bootstrap is already registered in Joomla 4 via media/vendor/`joomla.asset.json`. We do the access via [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_agaccordion/mod_agaccordion.xml

Create the file `modules/mod_agaccordion/mod_agaccordion.xml` in your Joomla 4 installation and fill it with the following code. Adjust the upper part of the code to your needs. Delete the line `<folder>language</folder>` if you don`t use language files. 

> If you like to create language files, you can use the files in my [repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/language/en-GB] for orientation. I wrote more information about language files at ["Using language files"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/].

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/mod_agaccordion.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="module" client="site" method="upgrade">
	<name>mod_agaccordion</name>
	<author>Astrid Günther</author>
	<creationDate>##DATE##</creationDate>
	<copyright>(C) Astrid Günther. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
	<description>MOD_AGACCORDION_XML_DESCRIPTION</description>

	<files>
		<filename module="mod_agaccordion">mod_agaccordion.php</filename>
		<folder>tmpl</folder>
		<folder>language</folder>
	</files>

	<config>
		<fields name="params">
			<fieldset name="options" label="COM_MODULES_BASIC_FIELDSET_LABEL">
			<field
				name="agaccordion"
				type="subform"
				label="TPL_CASSIOPEIA_AGACCORDION_HEADERIMAGE_IMAGE_LABEL"
				multiple="true"
				layout="joomla.form.field.subform.repeatable"
				>
				<form>
					<field
						name="heading"
						type="text"
						filter="raw"
						label="TPL_CASSIOPEIA_AGACCORDION_HEADERIMAGE_IMAGE_HEADING_LABEL"
				/>

				<field
					name="text"
					type="editor"
					default=""
					buttons="true"
					hide="pagebreak,readmore"
					label="TPL_CASSIOPEIA_AGACCORDION_HEADERIMAGE_IMAGE_TEXT_LABEL"
					filter="safehtml"
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

> The editor of the form field `type="editor"` can be used to insert images via the buttons, as you know it from articles. There is a known error. The contents are all inserted in the first editor. At the moment you have to copy them from there into the correct editor. But there is already a [solution](https://github.com/joomla/joomla-cms/pull/39449)[^github.com/joomla/joomla-cms/pull/39449].

### modules/mod_agaccordion/tmpl/default.php

In your Joomla 4 installation, create the file `modules/mod_agaccordion/tmpl/default.php` and fill it with the following code. This file is a template which is responsible for the layout in the frontend.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/tmpl/default.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

$modId = 'mod-agaccordion' . $module->id;
?>

<div class="accordion" id="<?php echo $modId; ?>">
	<?php foreach ($params->get('agaccordion') as $key => $agaccordionimage) : ?>
	<div class="accordion-item">
		<h2 class="accordion-header" id="heading<?php echo $key; ?>">
			<button class="accordion-button" type="button" data-bs-toggle="collapse"
				data-bs-target="#collapse<?php echo $key; ?>" aria-expanded="true"
				aria-controls="collapse<?php echo $key; ?>">
				<?php echo $agaccordionimage->heading; ?>
			</button>
		</h2>
		<div id="collapse<?php echo $key; ?>"
			class="accordion-collapse collapse <?php echo (str_replace("agaccordion", "", $key) == '0') ? ' show ' : ''; ?>"
			aria-labelledby="heading<?php echo $key; ?>" data-bs-parent="#<?php echo $modId; ?>">
			<div class="accordion-body">
				<?php echo $agaccordionimage->text; ?>
			</div>
		</div>
	</div>
	<?php endforeach; ?>
</div>
```

## Anwendung

We have created the files directly in the Joomla installation. We did not create an installation package. Joomla provides an alternative installation method for these cases - the core Joomla Discover. The function is located in the system menu. In the administration area, click on System in the left navigation and then look for the Discover entry in the Install area on the right. Click on it and perform the Discover installation. 

![Installation es Modules mod_agaccordion](/images/discover.png)

After successful installation it is possible to create a module via Content | Site Modules.

![Anlegen des Modules mod_agaccordion](/images/accordion1.png)

Set up the module according to your ideas.

![Optionen des Modules mod_agaccordion](/images/accordion2.png)

Make sure that the display on the frontend is what you want it to be.

![Anzeige im Frontend des Modules mod_agaccordion](/images/accordion3.png)

## Links

https://getbootstrap.com/docs/5.0/components/accordion/
<img src="https://vg06.met.vgwort.de/na/357062d862e84681af4c2e66390d7143" width="1" height="1" alt="">

