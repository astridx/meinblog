---
date: 2020-12-30
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Frontend Editing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-frontend-editing
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Es gibt mehrere Gründe dafür, einem Anwender das Editieren im Frontend zu ermöglichen. Zum einen finden Nutzer das benutzerfreundlicher. Oder, einem Administrator ist es wichtig, den Zugriff auf den Administrationsbereich nicht freizugeben. Deshalb statten wir unsere Komponente im nächsten Schritt mit der Möglichkeit aus, Items im Frontend zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24b...t25) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Service/HTML/Icon.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-df719aabca9dd99f45c5a7cf44a85697)

Die folgende Datei enthält alle Informationen, um ein Icon, über das die Bearbeitung geöffnet wird, im Frontend anzuzeigen - vorausgesetzt, der Betrachter darf dies.

[src/administrator/components/com_foos/src/Service/HTML/Icon.php](https://github.com/astridx/boilerplate/blob/f0d56fe96433a8f74c325c43dcf5ba10863a8222/src/administrator/components/com_foos/src/Service/HTML/Icon.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/administrator/components/com_foos/src/Service/HTML/Icon.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Service\HTML;

\defined('_JEXEC') or die;

use Joomla\CMS\Application\CMSApplication;
use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use FooNamespace\Component\Foos\Site\Helper\RouteHelper;
use Joomla\Registry\Registry;

/**
 * Content Component HTML Helper
 *
 * @since  __DEPLOY_VERSION__
 */
class Icon
{
	/**
	 * The application
	 *
	 * @var    CMSApplication
	 *
	 * @since  __DEPLOY_VERSION__
	 */
	private $application;

	/**
	 * Service constructor
	 *
	 * @param   CMSApplication  $application  The application
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function __construct(CMSApplication $application)
	{
		$this->application = $application;
	}

	/**
	 * Method to generate a link to the create item page for the given category
	 *
	 * @param   object    $category  The category information
	 * @param   Registry  $params    The item parameters
	 * @param   array     $attribs   Optional attributes for the link
	 *
	 * @return  string  The HTML markup for the create item link
	 *
	 * @since  __DEPLOY_VERSION__
	 */
	public static function create($category, $params, $attribs = array())
	{
		$uri = Uri::getInstance();

		$url = 'index.php?option=com_foos&task=foo.add&return=' . base64_encode($uri) . '&id=0&catid=' . $category->id;

		$text = LayoutHelper::render('joomla.content.icons.create', array('params' => $params, 'legacy' => false));

		// Add the button classes to the attribs array
		if (isset($attribs['class']))
		{
			$attribs['class'] .= ' btn btn-primary';
		}
		else
		{
			$attribs['class'] = 'btn btn-primary';
		}

		$button = HTMLHelper::_('link', Route::_($url), $text, $attribs);

		$output = '<span class="hasTooltip" title="' . HTMLHelper::_('tooltipText', 'COM_FOOS_CREATE_FOO') . '">' . $button . '</span>';

		return $output;
	}

	/**
	 * Display an edit icon for the foo.
	 *
	 * This icon will not display in a popup window, nor if the foo is trashed.
	 * Edit access checks must be performed in the calling code.
	 *
	 * @param   object    $foo  The foo information
	 * @param   Registry  $params   The item parameters
	 * @param   array     $attribs  Optional attributes for the link
	 * @param   boolean   $legacy   True to use legacy images, false to use icomoon based graphic
	 *
	 * @return  string   The HTML for the foo edit icon.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function edit($foo, $params, $attribs = array(), $legacy = false)
	{
		$user = Factory::getUser();
		$uri  = Uri::getInstance();

		// Ignore if in a popup window.
		if ($params && $params->get('popup'))
		{
			return '';
		}

		// Ignore if the state is negative (trashed).
		if ($foo->published < 0)
		{
			return '';
		}

		// Set the link class
		$attribs['class'] = 'dropdown-item';

		// Show checked_out icon if the foo is checked out by a different user
		if (property_exists($foo, 'checked_out')
			&& property_exists($foo, 'checked_out_time')
			&& $foo->checked_out > 0
			&& $foo->checked_out != $user->get('id'))
		{
			$checkoutUser = Factory::getUser($foo->checked_out);
			$date         = HTMLHelper::_('date', $foo->checked_out_time);
			$tooltip      = Text::_('JLIB_HTML_CHECKED_OUT') . ' :: ' . Text::sprintf('COM_FOOS_CHECKED_OUT_BY', $checkoutUser->name)
				. ' <br /> ' . $date;

			$text = LayoutHelper::render('joomla.content.icons.edit_lock', array('tooltip' => $tooltip, 'legacy' => $legacy));

			$output = HTMLHelper::_('link', '#', $text, $attribs);

			return $output;
		}

		if (!isset($foo->slug))
		{
			$foo->slug = "";
		}

		$fooUrl = RouteHelper::getFooRoute($foo->slug, $foo->catid, $foo->language);
		$url        = $fooUrl . '&task=foo.edit&id=' . $foo->id . '&return=' . base64_encode($uri);

		if ($foo->published == 0)
		{
			$overlib = Text::_('JUNPUBLISHED');
		}
		else
		{
			$overlib = Text::_('JPUBLISHED');
		}

		if (!isset($foo->created))
		{
			$date = HTMLHelper::_('date', 'now');
		}
		else
		{
			$date = HTMLHelper::_('date', $foo->created);
		}

		if (!isset($created_by_alias) && !isset($foo->created_by))
		{
			$author = '';
		}
		else
		{
			$author = $foo->created_by_alias ?: Factory::getUser($foo->created_by)->name;
		}

		$overlib .= '&lt;br /&gt;';
		$overlib .= $date;
		$overlib .= '&lt;br /&gt;';
		$overlib .= Text::sprintf('COM_FOOS_WRITTEN_BY', htmlspecialchars($author, ENT_COMPAT, 'UTF-8'));

		$icon = $foo->published ? 'edit' : 'eye-slash';

		if (strtotime($foo->publish_up) > strtotime(Factory::getDate())
			|| ((strtotime($foo->publish_down) < strtotime(Factory::getDate())) && $foo->publish_down != Factory::getDbo()->getNullDate()))
		{
			$icon = 'eye-slash';
		}

		$text = '<span class="hasTooltip fa fa-' . $icon . '" title="'
			. HTMLHelper::tooltipText(Text::_('COM_FOOS_EDIT_FOO'), $overlib, 0, 0) . '"></span> ';
		$text .= Text::_('JGLOBAL_EDIT');

		$attribs['title'] = Text::_('COM_FOOS_EDIT_FOO');
		$output           = HTMLHelper::_('link', Route::_($url), $text, $attribs);

		return $output;
	}
}

```

#### [src/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-2c4ef4fe24ac0395496baf9af77926a1)

Die XML Datei, die Joomla verwendet umd das Formular aufzubauen.

[src/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/ea90f526176d4dfd3ca550fafd1d201599bb1a39/src/components/com_foos/forms/foo.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/forms/foo.xml -->

<?xml version="1.0" encoding="utf-8"?>
<form>
	<fieldset
		addruleprefix="FooNamespace\Component\Foos\Administrator\Rule"
		addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
	>
		<field
			name="id"
			type="number"
			label="JGLOBAL_FIELD_ID_LABEL"
			default="0"
			class="readonly"
			readonly="true"
		/>

		<field
			name="name"
			type="text"
			validate="Letter"
			class="validate-letter"
			label="COM_FOOS_FIELD_NAME_LABEL"
			size="40"
			required="true"
		 />

		<field
			name="alias"
			type="text"
			label="JFIELD_ALIAS_LABEL"
			size="45"
			hint="JFIELD_ALIAS_PLACEHOLDER"
		/>

		<field
			name="language"
			type="contentlanguage"
			label="JFIELD_LANGUAGE_LABEL"
			>
			<option value="*">JALL</option>
		</field>

		<field
			name="featured"
			type="radio"
			class="switcher"
			label="JFEATURED"
			default="0"
			>
			<option value="0">JNO</option>
			<option value="1">JYES</option>
		</field>

		<field
			name="published"
			type="list"
			label="JSTATUS"
			default="1"
			id="published"
			class="custom-select-color-state"
			size="1"
			>
			<option value="1">JPUBLISHED</option>
			<option value="0">JUNPUBLISHED</option>
			<option value="2">JARCHIVED</option>
			<option value="-2">JTRASHED</option>
		</field>

		<field
			name="publish_up"
			type="calendar"
			label="COM_FOOS_FIELD_PUBLISH_UP_LABEL"
			translateformat="true"
			showtime="true"
			size="22"
			filter="user_utc"
		/>

		<field
			name="publish_down"
			type="calendar"
			label="COM_FOOS_FIELD_PUBLISH_DOWN_LABEL"
			translateformat="true"
			showtime="true"
			size="22"
			filter="user_utc"
		/>

		<field
			name="catid"
			type="categoryedit"
			label="JCATEGORY"
			extension="com_foos"
			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
			required="true"
			default=""
		/>

		<field
			name="access"
			type="accesslevel"
			label="JFIELD_ACCESS_LABEL"
			size="1"
		/>

		<field
			name="checked_out"
			type="hidden"
			filter="unset"
		/>

		<field
			name="checked_out_time"
			type="hidden"
			filter="unset"
		/>

		<field
			name="ordering"
			type="ordering"
			label="JFIELD_ORDERING_LABEL"
			content_type="com_foos.foo"
		/>
	</fieldset>
	<fields name="params" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
		<fieldset name="display" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
			<field
				name="show_name"
				type="list"
				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
				useglobal="true"
			>
				<option value="0">JHIDE</option>
				<option value="1">JSHOW</option>
			</field>

			<field
				name="foos_layout"
				type="componentlayout"
				label="JFIELD_ALT_LAYOUT_LABEL"
				class="custom-select"
				extension="com_foos"
				view="foo"
				useglobal="true"
			/>
		</fieldset>
	</fields>
</form>

```

#### [src/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-10b4c546e88438ff045b3399d8c287bd)

`FormController` enhält die Logik für die Bearbeitung im Formular.

> Beachte die Funktion `save`. Diese ist im `FormController` nicht üblich, weil Joomla alles für dich übernimmt. Da beim Erstellen eines Elementes die ID erst erstellt wird und deshalb nicht bekannt ist, leitet Joomla nach dem Erstellen zur Übersichtsseite weiter. Diese haben wir im Frontend noch nicht erstellt. Deshalb habe ich diese Funktion hier abgeändert.

[src/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/blob/173247856759bdda2f48df505f02574d19decdc9/src/components/com_foos/src/Controller/FooController.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/src/Controller/FooController.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Controller\FormController;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use Joomla\Utilities\ArrayHelper;

/**
 * Controller for single foo view
 *
 * @since  __DEPLOY_VERSION__
 */
class FooController extends FormController
{
	/**
	 * The URL view item variable.
	 *
	 * @var    string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $view_item = 'form';

	/**
	 * Method to get a model object, loading it if required.
	 *
	 * @param   string  $name    The model name. Optional.
	 * @param   string  $prefix  The class prefix. Optional.
	 * @param   array   $config  Configuration array for model. Optional.
	 *
	 * @return  \Joomla\CMS\MVC\Model\BaseDatabaseModel  The model.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getModel($name = 'form', $prefix = '', $config = array('ignore_request' => true))
	{
		return parent::getModel($name, $prefix, array('ignore_request' => false));
	}

	/**
	 * Method override to check if you can add a new record.
	 *
	 * @param   array  $data  An array of input data.
	 *
	 * @return  boolean
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function allowAdd($data = array())
	{
		if ($categoryId = ArrayHelper::getValue($data, 'catid', $this->input->getInt('catid'), 'int'))
		{
			$user = Factory::getUser();

			// If the category has been passed in the data or URL check it.
			return $user->authorise('core.create', 'com_foos.category.' . $categoryId);
		}

		// In the absence of better information, revert to the component permissions.
		return parent::allowAdd();
	}

	/**
	 * Method override to check if you can edit an existing record.
	 *
	 * @param   array   $data  An array of input data.
	 * @param   string  $key   The name of the key for the primary key; default is id.
	 *
	 * @return  boolean
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function allowEdit($data = array(), $key = 'id')
	{
		$recordId = (int) isset($data[$key]) ? $data[$key] : 0;

		if (!$recordId)
		{
			return false;
		}

		// Need to do a lookup from the model.
		$record     = $this->getModel()->getItem($recordId);
		$categoryId = (int) $record->catid;

		if ($categoryId)
		{
			$user = Factory::getUser();

			// The category has been set. Check the category permissions.
			if ($user->authorise('core.edit', $this->option . '.category.' . $categoryId))
			{
				return true;
			}

			// Fallback on edit.own.
			if ($user->authorise('core.edit.own', $this->option . '.category.' . $categoryId))
			{
				return ($record->created_by == $user->id);
			}

			return false;
		}

		// Since there is no asset tracking, revert to the component permissions.
		return parent::allowEdit($data, $key);
	}

	/**
	 * Method to save a record.
	 *
	 * @param   string  $key     The name of the primary key of the URL variable.
	 * @param   string  $urlVar  The name of the URL variable if different from the primary key (sometimes required to avoid router collisions).
	 *
	 * @return  boolean  True if successful, false otherwise.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function save($key = null, $urlVar = null)
	{
		$result = parent::save($key, $urlVar = null);

		$this->setRedirect(Route::_($this->getReturnPage(), false));

		return $result;
	}

	/**
	 * Method to cancel an edit.
	 *
	 * @param   string  $key  The name of the primary key of the URL variable.
	 *
	 * @return  boolean  True if access level checks pass, false otherwise.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function cancel($key = null)
	{
		$result = parent::cancel($key);

		$this->setRedirect(Route::_($this->getReturnPage(), false));

		return $result;
	}

	/**
	 * Gets the URL arguments to append to an item redirect.
	 *
	 * @param   integer  $recordId  The primary key id for the item.
	 * @param   string   $urlVar    The name of the URL variable for the id.
	 *
	 * @return  string    The arguments to append to the redirect URL.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getRedirectToItemAppend($recordId = 0, $urlVar = 'id')
	{
		// Need to override the parent method completely.
		$tmpl = $this->input->get('tmpl');

		$append = '';

		// Setup redirect info.
		if ($tmpl)
		{
			$append .= '&tmpl=' . $tmpl;
		}

		$append .= '&layout=edit';

		$append .= '&' . $urlVar . '=' . (int) $recordId;

		$itemId = $this->input->getInt('Itemid');
		$return = $this->getReturnPage();
		$catId  = $this->input->getInt('catid');

		if ($itemId)
		{
			$append .= '&Itemid=' . $itemId;
		}

		if ($catId)
		{
			$append .= '&catid=' . $catId;
		}

		if ($return)
		{
			$append .= '&return=' . base64_encode($return);
		}

		return $append;
	}

	/**
	 * Get the return URL.
	 *
	 * If a "return" variable has been passed in the request
	 *
	 * @return  string    The return URL.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getReturnPage()
	{
		$return = $this->input->get('return', null, 'base64');

		if (empty($return) || !Uri::isInternal(base64_decode($return)))
		{
			return Uri::base();
		}

		return base64_decode($return);
	}
}

```

#### [src/components/com_foos/src/Model/FormModel.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-9ddd88cf1e09823f0afae63e91b84e1e)

`FormModel` organisiert alle notwendigen Daten für die Bearbeitung im Formular.

[src/components/com_foos/src/Model/FormModel.php](https://github.com/astridx/boilerplate/blob/8874f61785a485edc39b93d3de28aeebbf972c06/src/components/com_foos/src/Model/FormModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/src/Model/FormModel.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\Form;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Language\Multilanguage;
use Joomla\Registry\Registry;
use Joomla\Utilities\ArrayHelper;

/**
 * Foo Component Foo Model
 *
 * @since  __DEPLOY_VERSION__
 */
class FormModel extends \FooNamespace\Component\Foos\Administrator\Model\FooModel
{
	/**
	 * Model typeAlias string. Used for version history.
	 *
	 * @var  string
	 * @since  __DEPLOY_VERSION__
	 */
	public $typeAlias = 'com_foos.foo';

	/**
	 * Name of the form
	 *
	 * @var string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $formName = 'form';

	/**
	 * Method to get the row form.
	 *
	 * @param   array    $data      Data for the form.
	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @return  \JForm|boolean  A \JForm object on success, false on failure
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getForm($data = array(), $loadData = true)
	{
		$form = parent::getForm($data, $loadData);

		// Prevent messing with article language and category when editing existing foo with associations
		if ($id = $this->getState('foo.id') && Associations::isEnabled())
		{
			$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $id);

			// Make fields read only
			if (!empty($associations))
			{
				$form->setFieldAttribute('language', 'readonly', 'true');
				$form->setFieldAttribute('language', 'filter', 'unset');
			}
		}

		return $form;
	}

	/**
	 * Method to get foo data.
	 *
	 * @param   integer  $itemId  The id of the foo.
	 *
	 * @return  mixed  Foo item data object on success, false on failure.
	 *
	 * @throws  Exception
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getItem($itemId = null)
	{
		$itemId = (int) (!empty($itemId)) ? $itemId : $this->getState('foo.id');

		// Get a row instance.
		$table = $this->getTable();

		// Attempt to load the row.
		try
		{
			if (!$table->load($itemId))
			{
				return false;
			}
		}
		catch (Exception $e)
		{
			Factory::getApplication()->enqueueMessage($e->getMessage());

			return false;
		}

		$properties = $table->getProperties();
		$value      = ArrayHelper::toObject($properties, 'JObject');

		// Convert field to Registry.
		$value->params = new Registry($value->params);

		return $value;
	}

	/**
	 * Get the return URL.
	 *
	 * @return  string  The return URL.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getReturnPage()
	{
		return base64_encode($this->getState('return_page'));
	}

	/**
	 * Method to save the form data.
	 *
	 * @param   array  $data  The form data.
	 *
	 * @return  boolean  True on success.
	 *
	 * @throws Exception
	 * @since   __DEPLOY_VERSION__
	 */
	public function save($data)
	{
		// Associations are not edited in frontend ATM so we have to inherit them
		if (Associations::isEnabled() && !empty($data['id'])
			&& $associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $data['id']))
		{
			foreach ($associations as $tag => $associated)
			{
				$associations[$tag] = (int) $associated->id;
			}

			$data['associations'] = $associations;
		}

		return parent::save($data);
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @return  void
	 *
	 * @throws  Exception
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function populateState()
	{
		$app = Factory::getApplication();

		// Load state from the request.
		$pk = $app->input->getInt('id');
		$this->setState('foo.id', $pk);

		$this->setState('foo.catid', $app->input->getInt('catid'));

		$return = $app->input->get('return', null, 'base64');
		$this->setState('return_page', base64_decode($return));

		// Load the parameters.
		$params = $app->getParams();
		$this->setState('params', $params);

		$this->setState('layout', $app->input->getString('layout'));
	}

	/**
	 * Allows preprocessing of the JForm object.
	 *
	 * @param   Form    $form   The form object
	 * @param   array   $data   The data to be merged into the form object
	 * @param   string  $group  The plugin group to be executed
	 *
	 * @return  Form
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function preprocessForm(Form $form, $data, $group = 'foo')
	{
		if (!Multilanguage::isEnabled())
		{
			$form->setFieldAttribute('language', 'type', 'hidden');
			$form->setFieldAttribute('language', 'default', '*');
		}

		return parent::preprocessForm($form, $data, $group);
	}

	/**
	 * Method to get a table object, load it if necessary.
	 *
	 * @param   string  $name     The table name. Optional.
	 * @param   string  $prefix   The class prefix. Optional.
	 * @param   array   $options  Configuration array for model. Optional.
	 *
	 * @return  Table  A Table object
	 *
	 * @since   __DEPLOY_VERSION__
	 * @throws  \Exception
	 */
	public function getTable($name = 'Foo', $prefix = 'Administrator', $options = array())
	{
		return parent::getTable($name, $prefix, $options);
	}
}

```

#### [src/components/com_foos/src/View/Form/HtmlView.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-a5001e438f2980f6d0c0fa7c774c1849)

`HtmlView.php` holt alle notwendigen Daten und gibt diese an die Templatedatei `edit.php` weiter.

[src/components/com_foos/src/View/Form/HtmlView.php](https://github.com/astridx/boilerplate/blob/8874f61785a485edc39b93d3de28aeebbf972c06/src/components/com_foos/src/View/Form/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/src/View/Form/HtmlView.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\View\Form;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;

/**
 * HTML Foo View class for the Foo component
 *
 * @since  __DEPLOY_VERSION__
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * @var    \Joomla\CMS\Form\Form
	 * @since  __DEPLOY_VERSION__
	 */
	protected $form;

	/**
	 * @var    object
	 * @since  __DEPLOY_VERSION__
	 */
	protected $item;

	/**
	 * @var    string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $return_page;

	/**
	 * @var    string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $pageclass_sfx;

	/**
	 * @var    \Joomla\Registry\Registry
	 * @since  __DEPLOY_VERSION__
	 */
	protected $state;

	/**
	 * @var    \Joomla\Registry\Registry
	 * @since  __DEPLOY_VERSION__
	 */
	protected $params;

	/**
	 * Execute and display a template script.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 *
	 * @throws Exception
	 * @since  __DEPLOY_VERSION__
	 */
	public function display($tpl = null)
	{
		$user = Factory::getUser();
		$app  = Factory::getApplication();

		// Get model data.
		$this->state = $this->get('State');
		$this->item = $this->get('Item');
		$this->form = $this->get('Form');
		$this->return_page = $this->get('ReturnPage');

		if (empty($this->item->id))
		{
			$authorised = $user->authorise('core.create', 'com_foos') || count($user->getAuthorisedCategories('com_foos', 'core.create'));
		}
		else
		{
			// Since we don't track these assets at the item level, use the category id.
			$canDo = FooHelper::getActions('com_foos', 'category', $this->item->catid);
			$authorised = $canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == $user->id);
		}

		if ($authorised !== true)
		{
			$app->enqueueMessage(Text::_('JERROR_ALERTNOAUTHOR'), 'error');
			$app->setHeader('status', 403, true);

			return false;
		}

		// Check for errors.
		if (count($errors = $this->get('Errors')))
		{
			$app->enqueueMessage(implode("\n", $errors), 'error');

			return false;
		}

		// Create a shortcut to the parameters.
		$this->params = $this->state->params;

		// Escape strings for HTML output
		$this->pageclass_sfx = htmlspecialchars($this->params->get('pageclass_sfx'));

		// Override global params with foo specific params
		$this->params->merge($this->item->params);

		// Propose current language as default when creating new foo
		if (empty($this->item->id) && Multilanguage::isEnabled())
		{
			$lang = Factory::getLanguage()->getTag();
			$this->form->setFieldAttribute('language', 'default', $lang);
		}

		$this->_prepareDocument();

		parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @return  void
	 *
	 * @throws Exception
	 *
	 * @since  __DEPLOY_VERSION__
	 */
	protected function _prepareDocument()
	{
		$app   = Factory::getApplication();
		$menus = $app->getMenu();
		$title = null;

		// Because the application sets a default page title,
		// we need to get it from the menu item itself
		$menu = $menus->getActive();

		if ($menu)
		{
			$this->params->def('page_heading', $this->params->get('page_title', $menu->title));
		}
		else
		{
			$this->params->def('page_heading', Text::_('COM_FOOS_FORM_EDIT_FOO'));
		}

		$title = $this->params->def('page_title', Text::_('COM_FOOS_FORM_EDIT_FOO'));

		if ($app->get('sitename_pagetitles', 0) == 1)
		{
			$title = Text::sprintf('JPAGETITLE', $app->get('sitename'), $title);
		}
		elseif ($app->get('sitename_pagetitles', 0) == 2)
		{
			$title = Text::sprintf('JPAGETITLE', $title, $app->get('sitename'));
		}

		$this->document->setTitle($title);

		$pathway = $app->getPathWay();
		$pathway->addItem($title, '');
	}
}

```

#### [src/components/com_foos/tmpl/form/edit.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-043586bc19ba70b8a901bfbf6d75da3e)

`edit.php` sorgt als Template dafür, dass das Formular schon im Frontend angezeigt wird.

[src/components/com_foos/tmpl/form/edit.php](https://github.com/astridx/boilerplate/blob/f0d56fe96433a8f74c325c43dcf5ba10863a8222/src/components/com_foos/tmpl/form/edit.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/tmpl/form/edit.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

HTMLHelper::_('behavior.formvalidator');
HTMLHelper::_('script', 'com_foos/admin-foos-letter.js', array('version' => 'auto', 'relative' => true));

$app = Factory::getApplication();
$input = $app->input;

$assoc = Associations::isEnabled();

$this->ignore_fieldsets = array('item_associations');
$this->useCoreUI = true;

// In case of modal
$isModal = $input->get('layout') == 'modal' ? true : false;
$layout  = $isModal ? 'modal' : 'edit';
$tmpl    = $isModal || $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';
?>
<form action="<?php echo Route::_('index.php?option=com_foos&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="adminForm" class="form-validate form-vertical">

	<?php echo LayoutHelper::render('joomla.edit.title_alias', $this); ?>

	<div>
		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', array('active' => 'details')); ?>

		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details', empty($this->item->id) ? Text::_('COM_FOOS_NEW_FOO') : Text::_('COM_FOOS_EDIT_FOO')); ?>
		<div class="row">
			<div class="col-md-9">
				<div class="row">
					<div class="col-md-6">
						<?php echo 'Hier ist Platz für die Inhalte deiner Erweiterung'; ?>
					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="card">
					<div class="card-body">
						<?php echo LayoutHelper::render('joomla.edit.global', $this); ?>
					</div>
				</div>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>

		<?php if ( !$isModal && $assoc) : ?>
			<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'associations', Text::_('JGLOBAL_FIELDSET_ASSOCIATIONS')); ?>
			<?php echo $this->loadTemplate('associations'); ?>
			<?php echo HTMLHelper::_('uitab.endTab'); ?>
		<?php elseif ($isModal && $assoc) : ?>
			<div class="hidden"><?php echo $this->loadTemplate('associations'); ?></div>
		<?php endif; ?>

		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>

		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'publishing', Text::_('JGLOBAL_FIELDSET_PUBLISHING')); ?>
		<div class="row">
			<div class="col-md-6">
				<fieldset id="fieldset-publishingdata" class="options-form">
					<legend><?php echo Text::_('JGLOBAL_FIELDSET_PUBLISHING'); ?></legend>
					<div>
					<?php echo LayoutHelper::render('joomla.edit.publishingdata', $this); ?>
					</div>
				</fieldset>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>

		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
	</div>

	<input type="hidden" name="task" value="">
	<input type="hidden" name="return" value="<?php echo $this->return_page; ?>"/>
	<?php echo HTMLHelper::_('form.token'); ?>
	<div class="mb-2">
		<button type="button" class="btn btn-primary" onclick="Joomla.submitbutton('foo.save')">
			<span class="fas fa-check" aria-hidden="true"></span>
			<?php echo Text::_('JSAVE'); ?>
		</button>
		<button type="button" class="btn btn-danger" onclick="Joomla.submitbutton('foo.cancel')">
			<span class="fas fa-times-cancel" aria-hidden="true"></span>
			<?php echo Text::_('JCANCEL'); ?>
		</button>
	</div>
</form>

```

#### [src/components/com_foos/tmpl/form/edit.xml](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-541bddf91fcdf3140a8a108f82fa7ab9)

Diese Datei benötigen wir zum Anlegen des Menüpunktes.

[src/components/com_foos/tmpl/form/edit.xml](https://github.com/astridx/boilerplate/blob/8874f61785a485edc39b93d3de28aeebbf972c06/src/components/com_foos/tmpl/form/edit.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/379bdcdb2d01e883086bcc12b41c331a35de47a6/src/components/com_foos/tmpl/form/edit.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FORM_VIEW_DEFAULT_TITLE">
		<help
			key="JHELP_MENUS_MENU_ITEM_FOO_CREATE"
		/>
		<message>
			<![CDATA[COM_FOOS_FORM_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>
	<fields name="params">

	</fields>
</metadata>
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-38764f2b1343234561c0d02cd2991ea1)

Hier registrieren wir das Icon. Anders ausgedruckt: Wir machen Icon mit Joomla bekannt.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/f0d56fe96433a8f74c325c43dcf5ba10863a8222/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php {diff}
 defined('JPATH_PLATFORM') or die;

+use Joomla\CMS\Application\SiteApplication;
 use Joomla\CMS\Association\AssociationServiceInterface;
 use Joomla\CMS\Association\AssociationServiceTrait;
 use Joomla\CMS\Categories\CategoryServiceInterface;
@@ -19,6 +20,7 @@
 use Joomla\CMS\Extension\MVCComponent;
 use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
 use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
+use FooNamespace\Component\Foos\Administrator\Service\HTML\Icon;
 use Psr\Container\ContainerInterface;
 use Joomla\CMS\Helper\ContentHelper;

@@ -50,6 +52,7 @@ class FoosComponent extends MVCComponent
 	public function boot(ContainerInterface $container)
 	{
 		$this->getRegistry()->register('foosadministrator', new AdministratorService);
+		$this->getRegistry()->register('fooicon', new Icon($container->get(SiteApplication::class)));
 	}

 	/**

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-a33732ebd6992540b8adca5615b51a1f)

Wenn man das Element bearbeiten darf `if ($canEdit)`, dann sieht man das Icon zum Öffnen des Formulares.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/8874f61785a485edc39b93d3de28aeebbf972c06/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
  */
 \defined('_JEXEC') or die;

+use Joomla\CMS\Factory;
+use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;

-if ($this->item->params->get('show_name')) {
+$canDo   = ContentHelper::getActions('com_foos', 'category', $this->item->catid);
+$canEdit = $canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == Factory::getUser()->id);
+$tparams = $this->item->params;

+if ($tparams->get('show_name')) {
 	if ($this->Params->get('show_foo_name_label')) {
 		echo Text::_('COM_FOOS_NAME');
 	}

 	echo $this->item->name;
 }
+?>

+<?php if ($canEdit) : ?>
+	<div class="icons">
+		<div class="btn-group float-right">
+			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton-<?php echo $this->item->id; ?>"
+				aria-label="<?php echo JText::_('JUSER_TOOLS'); ?>"
+				data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
+				<span class="fa fa-cog" aria-hidden="true"></span>
+			</button>
+			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-<?php echo $this->item->id; ?>">
+				<li class="edit-icon"> <?php echo JHtml::_('fooicon.edit', $this->item, $tparams); ?> </li>
+			</ul>
+		</div>
+	</div>
+<?php endif; ?>
+
+<?php
 echo $this->item->event->afterDisplayTitle;
 echo $this->item->event->beforeDisplayContent;
 echo $this->item->event->afterDisplayContent;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Erstelle einen Menüpunkt

![Joomla Frontend Bearbeitung](/images/j4x30x1.png)

3. Öffne den Menüpunkt im Frontend

![Joomla Frontend Bearbeitung](/images/j4x30x2.png)

4. Stelle sicher, dass du das Icon zum Editieren bei der Detailanszeige eines Elements siehst.

![Joomla Frontend Bearbeitung](/images/j4x30x3.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t24b...t25.diff

```

## Links

https://github.com/joomla/joomla-cms/pull/24311/files
