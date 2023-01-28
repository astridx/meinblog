---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-12-23
title: 'Joomla 4 Cassiopeia - Ein Modul zur Anzeige eines Boostrap 5 Accordion selbst erstellen'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-module-accordion
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Du suchst eine Erweiterung, um ein Boostrap 5 Accordion in Joomla 4 mit Cassiopeia anzuzeigen? Im [Joomla Extensions Directory](https://extensions.joomla.org/)[^extensions.joomla.org/] findest du viele Einträge. Aber die passende Erweiterung ist nicht dabei. Das Ausprobieren hat viel Zeit gekostet und du überlegst, ob es nicht viel einfacher wäre, selbst die richtige Lösung für dich zu erstellen. Dann ist mein erster Entwurf vielleicht ein Anfang für dich. Beginne mit meinen wenigen Dateien. So hast du eine gute Basis, um selbst Änderungen vorzunehmen. Es gibt dann nicht mehr die vielen Optionen, die oft für Verwirrung sorgen. Aber du hast genau das, was du brauchst.

## Dateien

Es gibt im wesentlichen drei Dateien, die wir benötigen, um ein Boostrap 5 Akkordeon über ein Joomla-Modul anzuzeigen. 

> Eventuell werden noch Dateien für die Sprachübersetzung hinzugefügt. Wenn du die Erweiterung für dich selbst schreibst und genau weißt, dass du sie nur in deiner eigenen einsprachigen Installation verwenden möchtest, kannst du statt der Sprachstrings auch die eigentlichen Texte für die Ausgabe verwenden. Weitere Informationen zu diesem Thema findest du später beim Besprechen des Installationsmanifests in der Datei `modules/mod_agaccordion/mod_agaccordion.xml`.

### modules/mod_agaccordion/mod_agaccordion.php

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_agaccordion/mod_agaccordion.php` und fülle diese mit nachfolgendem Code. Diese Datei sorgt dafür, dass alle Rahmenbedingen korrekt gesetzt sind und das Modul sich problemlos in Joomla einfügt.

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

Besonderheit hier: Wir integrieren Bootstrap, aber wir laden keine Dateien herunter. Bootstrap ist bereits in Joomla 4 per `media/vendor/joomla.asset.json` registriert. Wir machen den Zugriff via [Joomla WebAssetManager](https://docs.joomla.org/J4.x:Web_Assets)[^docs.joomla.org/J4.x:Web_Assets].

### modules/mod_agaccordion/mod_agaccordion.xml

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_agaccordion/mod_agaccordion.xml` und fülle diese mit dem nachfolgenden Code. Passe diesen im oberen Bereich an deine Gegebenheiten an. Lösche die Zeile `<folder>language</folder>`, falls du keine Sprachdateien verwendest. 

> Falls du Sprachdateien anlegen magst, kannst du dich an den Dateien in meinem [Repo](https://codeberg.org/astrid/j/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/language/en-GB)[^codeberg.org/astrid/git/src/branch/main/pkg_agpledges/j4/pkg_agpledges/src/modules/mod_agaccordion/language/en-GB] orientieren. Mehr Informationen zu Sprachdateien habe ich unter ["Sprachdateien nutzen"](https://blog.astrid-guenther.de/sprachdateien-nutzen/)[^blog.astrid-guenther.de/sprachdateien-nutzen/] geschrieben.

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

> Über den Editor des Formularfeldes `type="editor"` kann man Bilder über die Schaltflächen einfügen, so wie man es von Beiträgen her kennt. Es gibt einen bekannten Fehler. Die Inhalte werden alle im ersten Editor eingefügt. Momentan muss man diese dann von dort in den korrekten Editor kopieren. Es gibt aber schon einen [Lösungsansatz](https://github.com/joomla/joomla-cms/pull/39449)[^github.com/joomla/joomla-cms/pull/39449].

### modules/mod_agaccordion/tmpl/default.php

Erstelle in deiner Joomla 4 Installation die Datei `modules/mod_agaccordion/tmpl/default.php` und fülle diese mit nachfolgendem Code. Diese Datei ist ein Template, welches für die Anzeige im Frontend verantwortlich ist.


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

Wir haben die Dateien direkt in der Joomla-Installation erstellt. Wir haben kein Installationspaket erzeugt. Joomla bietet für diese Fälle eine alternative Installationsmethode - die Joomla Kernfunktion Discover. Die Funktion findet man im Systemmenü. Klicke im Administrationsbereich in der linken Navigation auf System und suche dann im Bereich Install auf der rechten Seite den Eintrag Entdecken. Klicke diesen an und führe die Discover-Installation durch. 

![Installation es Modules mod_agaccordion](/images/discover.png)

Nach erfolgreicher Installation ist es möglich, über Content | Site Modules ein Modul zu erstellen.

![Anlegen des Modules mod_agaccordion](/images/accordion1.png)

Richte das Modul nach deinen Vorstellungen ein.

![Optionen des Modules mod_agaccordion](/images/accordion2.png)

Vergewissere dich, dass die Anzeige im Frontend so ist, wie du sie haben möchtest.

![Anzeige im Frontend des Modules mod_agaccordion](/images/accordion3.png)

## Links

https://getbootstrap.com/docs/5.0/components/accordion/

<img src="https://vg06.met.vgwort.de/na/e0f18fa01a9846d4af533f44862292e2" width="1" height="1" alt="">
