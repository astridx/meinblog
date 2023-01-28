---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
shortTitle: 'short'
date: 2022-12-29
title: 'Joomla 4 Cassiopeia - Plugins for the display of contact persons'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-ansprechpartner
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











You are looking for a way to display contact persons in Joomla 4 with Cassiopeia? I have solved the problem once with a [Custom Field](https://blog.astrid-guenther.de/joomla-plugins/#fields-felder---indexpluginfields-felder---)[^blog.astrid-guenther.de/joomla-plugins/#fields-felder---indexpluginfields-felder---] and another time with a [Content Plugin](https://blog.astrid-guenther.de/joomla-plugins/#inhalt-content---indexplugininhalt-content---)[^blog.astrid-guenther.de/joomla-plugins/#inhalt-content---indexplugininhalt-content---]. 

> First I, wrote a Custom Field for this purpose, because in the first version was desired that each article is filled with a contact person. In another installation, it was no longer necessary to force the insertion, but a more flexible application was required. After consideration I used a content plugin. The advantage of a content plugin is that you can easily apply it in modules. The custom field is linked to the main content of the display page, usually the post.

## Custom Field

![add a contact person via custom field - activate the plugin](/images/ansprechpartnerf1.png)

A custom field must be installed. For this we need an installation manifest `plugins/fields/contact/contact.xml`.

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/contact.xml

<?xml version="1.0" encoding="utf-8" ?>
<extension type="plugin" group="fields" method="upgrade">
	<name>plg_fields_contact</name>
	<author>Astrid Günther</author>
	<creationDate>##DATE##</creationDate>
	<copyright>(C) Astrid Günther. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
	<description>PLG_FIELDS_CONTACT_XML_DESCRIPTION</description>
	<files>
		<filename plugin="contact">contact.php</filename>
		<folder>tmpl</folder>
		<folder>fields</folder>
		<folder>language</folder>
	</files>
</extension>

```


```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/contact.php

<?php
use Joomla\CMS\Form\Form;

\defined('_JEXEC') or die;

class PlgFieldsContact extends \Joomla\Component\Fields\Administrator\Plugin\FieldsPlugin
{
	public function onCustomFieldsPrepareDom($field, DOMElement $parent, Form $form)
	{
		if ($this->app->isClient('site')) {
			// The user field is not working on the front end
			return;
		}

		return parent::onCustomFieldsPrepareDom($field, $parent, $form);
	}
}

```

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/tmpl/contact.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\String\PunycodeHelper;

$value = $field->value;

if ($value == '') {
	return;
}

$app = Factory::getApplication();
$factory = $app->bootComponent('com_contact')->getMVCFactory();
$cparams = ComponentHelper::getParams('com_contact');
$model = $factory->createModel('Contact', 'Site', ['ignore_request' => true]);
$model->setState('params', $cparams);

try {
	$contact = $model->getItem($value);
} catch (\Exception $e) {
	return "";
}
?>

<div class="plg-loadcontact card mb-3" itemscope itemtype="https://schema.org/Person">
	<div class="row g-0">
			<div class="col-md-4">Ansprechpartner:
			</div>
		<div class="<?php echo $col; ?>">
			<div class="card-body">
				<p class="card-title" itemprop="name"><?php echo $contact->name; ?></p>
				<?php if ($contact->con_position && $cparams->get('show_position')) : ?>
					<p class="contact-position" itemprop="jobTitle"><?php echo $contact->con_position; ?></p>
				<?php endif; ?>
				<?php if ($contact->address || $contact->suburb  || $contact->state || $contact->country || $contact->postcode || $contact->mobile || $contact->telephone || $contact->fax || $contact->email_to || $contact->webpage) : ?>
					<address class="plg-loadcontact__address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
						<?php if ($contact->address && $cparams->get('show_street_address')) : ?>
							<span class="contact-street" itemprop="streetAddress">
								<?php echo nl2br($contact->address, false); ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->postcode && $cparams->get('show_postcode')) : ?>
							<span class="contact-postcode" itemprop="postalCode">
								<?php echo $contact->postcode; ?>
							</span>
						<?php endif; ?>

						<?php if ($contact->suburb && $cparams->get('show_suburb')) : ?>
							<span class="contact-suburb" itemprop="addressLocality">
								<?php echo $contact->suburb; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->state && $cparams->get('show_state')) : ?>
							<span class="contact-state" itemprop="addressRegion">
								<?php echo $contact->state; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->country && $cparams->get('show_country')) : ?>
							<span class="contact-country" itemprop="addressCountry">
								<?php echo $contact->country; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->mobile && $cparams->get('show_mobile')) : ?>
							<span class="contact-mobile" itemprop="telephone">
								<?php echo $contact->mobile; ?>
							</span>
						<?php endif; ?>

						<?php if ($contact->telephone && $cparams->get('show_telephone')) : ?>
							<span class="contact-telephone" itemprop="telephone">
								<?php echo $contact->telephone; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->fax && $cparams->get('show_fax')) : ?>
							<span class="contact-fax" itemprop="faxNumber">
								<?php echo $contact->fax; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->email_to && $cparams->get('show_email')) : ?>
							<p class="contact-emailto" itemprop="email">
								<?php echo $contact->email_to; ?>
							</p>
						<?php endif; ?>

						<?php if ($contact->webpage && $cparams->get('show_webpage')) : ?>
							<p class="contact-webpage">
								<a href="<?php echo $contact->webpage; ?>" target="_blank" rel="noopener noreferrer" itemprop="url">
									<?php echo PunycodeHelper::urlToUTF8($contact->webpage); ?>
								</a>
							</p>
						<?php endif; ?>
					</address>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>


```

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/params/contact.xml

<?xml version="1.0" encoding="utf-8"?>
<form>
	<fields name="params" label="COM_FIELDS_FIELD_BASIC_LABEL">
		<fieldset name="basic">
			<field
				name="show_on"
				type="hidden"
				filter="unset"
			/>
		</fieldset>
	</fields>
</form>

```


```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/fields/contact.php

<?php
defined('JPATH_PLATFORM') or die;

jimport('joomla.form.fields.sqlfield');

class JFormFieldContact extends JFormFieldSQL
{
	public $type = 'Contact';

	public function setup(\SimpleXMLElement $element, $value, $group = null)
	{
		$return = parent::setup($element, $value, $group);

		if ($return) {
			if (empty($this->query)) {
				$query = [];
				$defaults = [];

				$query['select'] = 'id,name';
				$query['from'] = '#__contact_details';
				$query['join'] = '';
				$query['where'] = 'published = 1';
				$query['group'] = '';
				$query['order'] = 'name';

				$this->query = $this->processQuery($query, null, null);
			}

			$this->keyField = 'id';
			$this->valueField = 'name';
			$this->translate = false;
			$this->header = false;
		}

		return $return;
	}
}

```

Sprachdateien

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/language/en-GB/plg_fields_contact.ini

PLG_FIELDS_CONTACT="Fields - Contact"
PLG_FIELDS_CONTACT_XML_DESCRIPTION="This plugin lets you create new fields of type 'contact' in any extensions where custom fields are supported."

PLG_FIELDS_CONTACT_DEFAULT_VALUE_LABEL="Default Contact"
PLG_FIELDS_CONTACT_LABEL="Contact (%s)"

```


```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/fields/contact/language/en-GB/plg_fields_contact.sys.ini

PLG_FIELDS_CONTACT="Fields - Contact"
PLG_FIELDS_CONTACT_XML_DESCRIPTION="This plugin lets you create new fields of type 'contact' in any extensions where custom fields are supported."

```

![add a contact person via custom field - create custom field](/images/ansprechpartnerf2.png)

![add a contact person via custom field - fill custom field in backend](/images/ansprechpartnerf3.png)

![add a contact person via custom field - view of custom field in frontend](/images/ansprechpartnerf4.png)

## Content Plugin

![add a contact person via content plugin - activate the plugin](/images/ansprechpartnerc1.png)

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/content/loadcontact/loadcontact.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="content" method="upgrade">
    <name>plg_content_loadcontact</name>
	<author>Astrid Günther</author>
	<creationDate>##DATE##</creationDate>
	<copyright>(C) Astrid Günther. All rights reserved.</copyright>
	<license>GNU General Public License version 2 or later; see LICENSE.txt</license>
	<authorEmail>info@astrid-guenther.de</authorEmail>
	<authorUrl>www.astrid-guenther.de</authorUrl>
	<version>##VERSION##</version>
    <description>PLG_CONTENT_LOADCONTACT_XML_DESCRIPTION</description>
    <files>
        <filename plugin="loadcontact">loadcontact.php</filename>
        <folder>tmpl</folder>
    </files>
</extension>

```


```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/content/loadcontact/loadcontact.php

<?php
use Joomla\CMS\Factory;
use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Plugin\PluginHelper;

\defined('_JEXEC') or die;

class PlgContentLoadcontact extends CMSPlugin
{
	public function onContentPrepare($context, &$article, &$params, $page = 0)
	{
		if ($context === 'com_finder.indexer') {
			return;
		}

		if (strpos($article->text, 'loadcontact') === false) {
			return;
		}

		$regexcontid = '/{loadcontact\s([1-9][0-9]*)}/i';

		preg_match_all($regexcontid, $article->text, $matchescontid, PREG_SET_ORDER);

		if ($matchescontid) {
			foreach ($matchescontid as $match) {
				$id     = trim($match[1]);
				$output = $this->_loadcontid($id);

				if (($start = strpos($article->text, $match[0])) !== false) {
					$article->text = substr_replace($article->text, $output, $start, strlen($match[0]));
				}
			}
		}
	}

	protected function _loadcontid($id)
	{
		$app = Factory::getApplication();
		$factory = $app->bootComponent('com_contact')->getMVCFactory();
		$cparams = ComponentHelper::getParams('com_contact');

		$model = $factory->createModel('Contact', 'Site', ['ignore_request' => true]);

		// Get item
		$model->setState('params', $cparams);
		$contact = $model->getItem($id);

		if ($contact->published == 1) {
			ob_start();
			include PluginHelper::getLayoutPath('content', 'loadcontact');

			return (string)ob_get_clean();
		}
	}
}

```

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/content/loadcontact/tmpl/default.php

<?php
use Joomla\CMS\String\PunycodeHelper;

\defined('_JEXEC') or die;
?>
<div class="plg-loadcontact card mb-3" itemscope itemtype="https://schema.org/Person">
	<div class="row g-0">
			<div class="col-md-4">Ansprechpartner:
			</div>
		<div class="<?php echo $col; ?>">
			<div class="card-body">
				<p class="card-title" itemprop="name"><?php echo $contact->name; ?></p>
				<?php if ($contact->con_position && $cparams->get('show_position')) : ?>
					<p class="contact-position" itemprop="jobTitle"><?php echo $contact->con_position; ?></p>
				<?php endif; ?>
				<?php if ($contact->address || $contact->suburb  || $contact->state || $contact->country || $contact->postcode || $contact->mobile || $contact->telephone || $contact->fax || $contact->email_to || $contact->webpage) : ?>
					<address class="plg-loadcontact__address" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
						<?php if ($contact->address && $cparams->get('show_street_address')) : ?>
							<span class="contact-street" itemprop="streetAddress">
								<?php echo nl2br($contact->address, false); ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->postcode && $cparams->get('show_postcode')) : ?>
							<span class="contact-postcode" itemprop="postalCode">
								<?php echo $contact->postcode; ?>
							</span>
						<?php endif; ?>

						<?php if ($contact->suburb && $cparams->get('show_suburb')) : ?>
							<span class="contact-suburb" itemprop="addressLocality">
								<?php echo $contact->suburb; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->state && $cparams->get('show_state')) : ?>
							<span class="contact-state" itemprop="addressRegion">
								<?php echo $contact->state; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->country && $cparams->get('show_country')) : ?>
							<span class="contact-country" itemprop="addressCountry">
								<?php echo $contact->country; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->mobile && $cparams->get('show_mobile')) : ?>
							<span class="contact-mobile" itemprop="telephone">
								<?php echo $contact->mobile; ?>
							</span>
						<?php endif; ?>

						<?php if ($contact->telephone && $cparams->get('show_telephone')) : ?>
							<span class="contact-telephone" itemprop="telephone">
								<?php echo $contact->telephone; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->fax && $cparams->get('show_fax')) : ?>
							<span class="contact-fax" itemprop="faxNumber">
								<?php echo $contact->fax; ?>
							</span><br />
						<?php endif; ?>

						<?php if ($contact->email_to && $cparams->get('show_email')) : ?>
							<p class="contact-emailto" itemprop="email">
								<?php echo $contact->email_to; ?>
							</p>
						<?php endif; ?>

						<?php if ($contact->webpage && $cparams->get('show_webpage')) : ?>
							<p class="contact-webpage">
								<a href="<?php echo $contact->webpage; ?>" target="_blank" rel="noopener noreferrer" itemprop="url">
									<?php echo PunycodeHelper::urlToUTF8($contact->webpage); ?>
								</a>
							</p>
						<?php endif; ?>
					</address>
				<?php endif; ?>
			</div>
		</div>
	</div>
</div>

```

Sprachdateien

```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/content/loadcontact/language/en-GB/plg_content_loadcontact.ini

PLG_CONTENT_LOADCONTACT="Content - Load Contact"
PLG_CONTENT_LOADCONTACT_XML_DESCRIPTION="Within content this plugin loads a Contact by ID, Syntax: {loadcontact 1}. It display contact information (position, address, phone number, etc.) as defined in the contact component. The default layout is a Bootstrap card, but it can be overwritten by a template override."

```


```php {numberLines: -2}
// https://codeberg.org/astrid/j/raw/branch/main/pkg_agpledges/j4/pkg_agpledges/src/plugins/content/loadcontact/language/en-GB/plg_content_loadcontact.sys.ini

PLG_CONTENT_LOADCONTACT="Content - Load Contact"
PLG_CONTENT_LOADCONTACT_XML_DESCRIPTION="Within content this plugin loads a Contact by ID, Syntax: {loadcontact 1}. It display contact information (position, address, phone number, etc.) as defined in the contact component. The default layout is a Bootstrap card, but it can be overwritten by a template override."

```

![add a contact person via content plugin - use code in content](/images/ansprechpartnerc2.png)

![add a contact person via content plugin - view in frontend](/images/ansprechpartnerc3.png)




<img src="https://vg06.met.vgwort.de/na/11fae5001d794f63bf06da9f88f91e1f" width="1" height="1" alt="">



