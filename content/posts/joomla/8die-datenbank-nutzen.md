---
description: 'desc'
shortTitle: 'short'
date: 2021-02-13
title: 'Die Datenbank nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-datenbank-nutzen
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Im vorhergehenden Teil hatten wir eine Datenbank für die Joomla-Komponenten eingerichtet. In diesem Teil lernst du, wie du mithilfe eines Formulars im Administrationsbereich die Daten der Datenbank änderst oder ergänzt. Am Ende enthält die Ansicht deiner Komponente im Administrationsbereich eine Schaltfläche zum Hinzufügen von neuen Elementen. Du änderst ein vorhandenes Item, indem du in der Listenansicht auf den Titel klickst.<!-- \index{Datenbank! Datenbank nutzen} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t6...t6b)[^github.com/astridx/boilerplate/compare/t6...t6b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

Joomla erstellt das Formular für dich, wenn du ihm die Rahmenbedingungen in einer XML-Datei vorgibst. Nachfolgend siehst du dies für unser Beispiel.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/forms/foo.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/forms/foo.xml -->

<?xml version="1.0" encoding="utf-8"?>
<form>
	<fieldset>
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
	</fieldset>
</form>
```

<!-- \index{Alias} -->
<!-- \index{Formulare} -->

> Du wünschst dir einen Überblick über alle möglichen Formular-Elemente? In der [Joomla Dokumentation](https://docs.joomla.org/Form_field/de)[^docs.joomla.org/form_field/de] sind alle standardmäßig enthaltenen Formularfelder aufgelistet.

> Weiterführender Tipp: Wir haben bisher ein einfaches Formular. Später kommen sicher speziellere Anforderungen hinzu. Zum Beispiel: Wie platzierst du am besten JavaScript in einem Joomla Formular? Eine einfache aber schnelle und unschöne Lösung ist diese: Du erstellst ein Feld `type=note` in der XML-Definition und schreibst dann den JavaScript Code in die Sprachkonstante der Beschreibung. Eine elegantere Lösung fand ich im (Allrounder Template von Bakual)[https://github.com/Bakual/Allrounder/](^github.com/Bakual/Allrounder/). Zunächst erstellt er ein neues [Feld des Typs `loadjscss`](https://github.com/Bakual/Allrounder/blob/master/fields/loadjscss.php)[^github.com/Bakual/Allrounder/blob/master/fields/loadjscss.php]. Dieses bindet er dann in der Datei [`templateDetails.xml`](https://github.com/Bakual/Allrounder/blob/57bb030ec0e243c776e758daeade898abbbb9c10/templateDetails.xml#L51)[^github.com/Bakual/Allrounder/blob/master/templateDetails.xml#L51] ein. Mach dir keine Sorgen, falls du die letzte Variante nicht sofort durchschaust. Wir erstellen im weiteren Verlauf noch weitere Felder.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Controller/FooController.php

Wir erstellen mit `FooController` mehr oder weniger eine leere Klasse. Obwohl diese keine eigene Logik beinhaltet, brauchen wir sie, weil sie von `FormController` erbt. Joomla erwartet `FooController` als Controller der Erweiterung an der Stelle unter dem Namen.

[administrator/components/com_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Controller/FooController.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Controller/FooController.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\FormController;

/**
 * Controller for a single foo
 *
 * @since  __BUMP_VERSION__
 */
class FooController extends FormController
{
}

```

When should you add something to the file `administrator/components/com_foos/ src/Controller/FooController.php`? 
Did you rename your component and now you have the problem that your _Views_ are not found correctly by Joomla? For example, did you create a new _View_ called `Katze` and your list view is called `Katzen`. Now you are sometimes redirected by Joomla to the _View_ `Katzes`. Especially when you create a new record or cancel an editing. You wonder where the `S` in the end of `Katzes` comes from? You can find the solution in the file [libraries/src/MVC/Controller/ FormController.php](https://github.com/joomla/joomla-cms/blob/73ae0235c25a489bac64613ba3d4837aec406fda/libraries/src/MVC/Controller/FormController.php#L136)[^libraries/src/MVC/Controller/FormController.php]. In the constructor of this file, the `view_item` variable is automatically made plural. However, the English grammar is used. In the case of the English word cat, it fits. Cats is plural of cat. Your controller inherits these values because of `use Joomla\CMS\MVC\Controller\FormController` and `extends FormController`. This does not always fit. Set in your `FormController` the variables `view_item` and `view_list` yourself to use custom values. 

``php
class catController extends FormController
{
protected $view_item = 'katze';
protected $view_list = 'katzen';
}
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Model/FooModel.php

Jetzt erstellen wir das Model, mit dem die Daten für ein Element abgeholt werden. Dieses nennen wir `FooModel`. Es erbt die wesentlichen Implementierungen von `AdminModel`. Wir programmieren unsere speziellen Anforderungen selbst hinzu. Mit `$typeAlias` setzen wir den Typalias für den Inhaltstyp. So weiß Joomla bei allen vererbten Funktionen, auf welches Element es diese genau anzuwenden hat. Beispielsweise wird der Alias in `loadFormData()` genutzt, um die passende XML-Datei in ein Formular umzuwandeln. Erinnerst du dich, die Datei hast du im aktuellen Kapitel erstellt. Und für das korrekte Zuordnen der Tabelle ist der Alias unerlässlich, wenn du Joomla Funktionen wiederverwendest. Der Typalias übernimmt im Hintergrund eine große Rolle, ohne dass du es mitbekommst.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Model/FooModel.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\MVC\Model\AdminModel;

/**
 * Item Model for a Foo.
 *
 * @since  __BUMP_VERSION__
 */
class FooModel extends AdminModel
{
	/**
	 * The type alias for this content type.
	 *
	 * @var    string
	 * @since  __BUMP_VERSION__
	 */
	public $typeAlias = 'com_foos.foo';

	/**
	 * Method to get the row form.
	 *
	 * @param   array    $data      Data for the form.
	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @return  \JForm|boolean  A \JForm object on success, false on failure
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function getForm($data = [], $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm($this->typeAlias, 'foo', ['control' => 'jform', 'load_data' => $loadData]);

		if (empty($form)) {
			return false;
		}

		return $form;
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @return  mixed  The data for the form.
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function loadFormData()
	{
		$app = Factory::getApplication();

		$data = $this->getItem();

		$this->preprocessData($this->typeAlias, $data);

		return $data;
	}

	/**
	 * Prepare and sanitise the table prior to saving.
	 *
	 * @param   \Joomla\CMS\Table\Table  $table  The Table object
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function prepareTable($table)
	{
		$table->generateAlias();
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Table/FooTable.php

Wir implementieren den Zugriff auf die Datenbanktabelle. Wichtig ist das Setzten von `$this->typeAlias` und die Angabe des Namens der Tabelle `#__foos_details`.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/Table/FooTable.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Table;

\defined('_JEXEC') or die;

use Joomla\CMS\Application\ApplicationHelper;
use Joomla\CMS\Table\Table;
use Joomla\Database\DatabaseDriver;

/**
 * Foos Table class.
 *
 * @since  __BUMP_VERSION__
 */
class FooTable extends Table
{
	/**
	 * Constructor
	 *
	 * @param   DatabaseDriver  $db  Database connector object
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct(DatabaseDriver $db)
	{
		$this->typeAlias = 'com_foos.foo';

		parent::__construct('#__foos_details', 'id', $db);
	}

	/**
	 * Generate a valid alias from title / date.
	 * Remains public to be able to check for duplicated alias before saving
	 *
	 * @return  string
	 */
	public function generateAlias()
	{
		if (empty($this->alias)) {
			$this->alias = $this->name;
		}

		$this->alias = ApplicationHelper::stringURLSafe($this->alias, $this->language);

		if (trim(str_replace('-', '', $this->alias)) == '') {
			$this->alias = Factory::getDate()->format('Y-m-d-H-i-s');
		}

		return $this->alias;
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foo/HtmlView.php

Die Datei `administrator/components/com_foos/ src/View/Foo/HtmlView.php` organisiert die Ansicht eines Elements. Achte darauf, dass du diese nicht mit der Datei `administrator/components/com_foos/ src/View/Foo s /HtmlView.php` verwechselt, welche alle Elemente in einer Übersichtsliste anzeigt. Für die Bearbeitung eines Elementes benötigen wir genau wie bei der Listenansicht eine Toolbar. Die Anzeige selbst erfolgt wie gewohnt über die Methode `display` der Klasse `BaseHtmlView`. Lediglich unsere Besonderheiten geben wir über `$this->form = $this->get('Form');` und `$this->item = $this->get('Item');` mit.

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\View\Foo;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
use Joomla\CMS\Toolbar\ToolbarHelper;

/**
 * View to edit a foo.
 *
 * @since  __BUMP_VERSION__
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * The \JForm object
	 *
	 * @var  \JForm
	 */
	protected $form;

	/**
	 * The active item
	 *
	 * @var  object
	 */
	protected $item;

	/**
	 * Display the view.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  A string if successful, otherwise an Error object.
	 */
	public function display($tpl = null)
	{
		$this->form  = $this->get('Form');
		$this->item = $this->get('Item');

		$this->addToolbar();

		return parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function addToolbar()
	{
		Factory::getApplication()->input->set('hidemainmenu', true);

		$isNew = ($this->item->id == 0);

		ToolbarHelper::title($isNew ? Text::_('COM_FOOS_MANAGER_FOO_NEW') : Text::_('COM_FOOS_MANAGER_FOO_EDIT'), 'address foo');

		ToolbarHelper::apply('foo.apply');
		ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
	}
}

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

In der Datei `edit.php` ist die Ansicht implementiert, die zum Bearbeiten aufgerufen wird. Mir ist wichtig, dass ich den [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets/de)[^docs.joomla.org/j4.x:web_assets/de] `$wa = $this->document->getWebAssetManager();` an dieser Stelle anspreche. Der ist in Joomla 4 neu. Du lädst zwei JavaScript Dateien via Webassetmanager. `useScript('keepalive')` lädt `media/system/js/keepalive.js` und hält deine Sitzung am Leben, während du ein Element bearbeitest oder erstellst. `useScript('form.validate')` lädt mit `media/system/js/core.js` eine Menge hilfreicher Funktionen. Zum Beispiel die Validierung, die wir später genauer ansehen.

> Falls du Webassets nicht korrekt einbindest, wird dir in der Konsole deines Browsers folgender Fehler angezeigt, wenn du das Formular speicherst: `joomla document.formvalidator is undefined`. Joomla validiert die Formulare nämlich standardmäßig und erwartet, dass die Datei `media/system/js/core.js` geladen ist.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/tmpl/foo/edit.php

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
use Joomla\CMS\Router\Route;

$app = Factory::getApplication();
$input = $app->input;

$wa = $this->document->getWebAssetManager();
$wa->useScript('keepalive')
	->useScript('form.validate');

$layout  = 'edit';
$tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';
?>

<form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
	<?php echo $this->getForm()->renderField('name'); ?>
	<?php echo $this->getForm()->renderField('alias'); ?>
	<input type="hidden" name="task" value="">
	<?php echo HTMLHelper::_('form.token'); ?>
</form>

```

> Interessierst dich der Inhalt der Dateien [Core.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/core.es6.js) oder [Keepalive.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/keepalive.es6.js)? Sieh sie dir in dem Falle in Joomla direkt an. Sie befinden sich in der Entwicklungsversion im Verzeichnis `build/media_source/system/js/` und werden mithilfe von Skripten, [Node.js](https://nodejs.org/en/)[^nodejs.org] und [Composer](https://getcomposer.org/)[^getcomposer.org/] für die Installation aufbereitet im Verzeichnis `media/system/js` abgelegt. Weitere Informationen hierzu findest du in der [Joomla Dokumentation](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment/de)[^docs.joomla.org/j4.x:setting_up_your_local_environment/de].

<!-- prettier-ignore -->
#### administrator/components/com_foos/ tmpl/foos/emptystate.php<!-- \index{Empty State} -->

Mit der Datei `administrator/components/com_foos/ tmpl/foos/emptystate.php` erstellen wir ein spezielles Layout für den Fall, dass die Komponente kein Element enthält und somit leer ist.

[administrator/components/com_foos/ tmpl/foos/emptystate.php](https://github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php
<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Layout\LayoutHelper;

$displayData = [
	'textPrefix' => 'COM_FOOS',
	'formURL' => 'index.php?option=com_foos',
	'helpURL' => 'https://github.com/astridx/boilerplate#readme',
	'icon' => 'icon-copy',
];

$user = Factory::getApplication()->getIdentity();

if ($user->authorise('core.create', 'com_foos') || count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0) {
	$displayData['createURL'] = 'index.php?option=com_foos&task=foo.add';
}

echo LayoutHelper::render('joomla.content.emptystate', $displayData);

```

> `'icon' => 'icon-copy'` funktioniert lediglich bei Icons, die in der Datei [build/media_source/system/scss/\_icomoon.scss](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/scss/_icomoon.scss)[^build/media_source/system/scss/_icomoon.scss] namentlich aufgenommen sind. Warum das so ist, hatte ich im Vorwort erklärt. Passe das Layout für das Icon an, falls du ein anderes Symbol darstellen möchtest.

Das Empty-State-Layout wurde in Joomla im [PR 33264](https://github.com/joomla/joomla-cms/pull/33264)[github.com/joomla/joomla-cms/pull/33264] integriert. Die Implementierung des Empty-State-Layouts hier im Tutorial berücksichtig den Hinweis aus [Issue 35712](https://github.com/joomla/joomla-cms/issues/35712] und fügt den Code `if (count($errors = $this->get('Errors'))) { throw new GenericDataException(implode("\n", $errors), 500);}` vor dem Code `if (!count($this->items) && $this->get('IsEmptyState')) { $this->setLayout('emptystate');}` in die Datei `administrator/components/com_foos/ src/View/Foos/HtmlView.php` ein. Letzteres geschieht in einem späteren Kapitel.

> Gutes Design ist schon eine Herausforderung, wenn es Daten zum darstellen gibt. Noch schwieriger ist es, eine leer Seiten benutzerfreundlich umzusetzen. Stöbere bei [emptystat.es](https://emptystat.es/), wenn du dich in Bezug auf deine Empty State Umsetzung inspirieren lassen möchtest.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

Damit während einer neuen Installation das Verzeichnis `forms` an Joomla übergeben wird, tragen wird diese im Installationsmanifest ein.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/foos.xml)

```php {diff}
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<folder>forms</folder>
 			<folder>services</folder>
 			<folder>sql</folder>
 			<folder>src</folder>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

In der Ansicht, die die Übersichtsliste anzeigt, ergänzen wir die Toolbar. Hier fügen wir eine Schaltfläche ein, über die ein neues Element erstellt wird. Außerdem fragen wir über `if (!count($this->items) && $this->get('IsEmptyState'))` ab, ob es Elemente zum Anzeigen gibt. Falls die Ansicht leer ist, zeigen wir das benutzerfreundliche Empty State Layout `$this->setLayout('emptystate');` an.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Toolbar\Toolbar;
+use Joomla\CMS\Toolbar\ToolbarHelper;

 /**
  * View class for a list of foos.
 class HtmlView extends BaseHtmlView
 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
+
+		if (!count($this->items) && $this->get('IsEmptyState')) {
+			$this->setLayout('emptystate');
+		}
+
+		$this->addToolbar();
+
 		parent::display($tpl);
 	}
+
+	protected function addToolbar()
+	{
+		// Get the toolbar object instance
+		$toolbar = Toolbar::getInstance('toolbar');
+
+		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');
+
+		$toolbar->addNew('foo.add');
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/default.php

Im Template der Übersichtsliste ersetzen wir den einfachen Text mit einem Formular. Das Formular enthält ein Formularfeld für jede Spalte in der Datenbanktabelle und ermöglicht es, Daten anzulegen beziehungsweise zu ändern.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Router\Route;
 ?>
-<?php foreach ($this->items as $i => $item) : ?>
-	<?php echo $item->name; ?>
-</br>
-<?php endforeach; ?>
+<form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
+	<div class="row">
+		<div class="col-md-12">
+			<div id="j-main-container" class="j-main-container">
+				<?php if (empty($this->items)) : ?>
+					<div class="alert alert-warning">
+						<?php echo Text::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
+					</div>
+				<?php else : ?>
+					<table class="table" id="fooList">
+						<thead>
+							<tr>
+								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
+									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_NAME'); ?>
+								</th>
+								<th scope="col">
+									<?php echo Text::_('COM_FOOS_TABLE_TABLEHEAD_ID'); ?>
+								</th>
+							</tr>
+						</thead>
+						<tbody>
+						<?php
+						$n = count($this->items);
+						foreach ($this->items as $i => $item) :
+							?>
+							<tr class="row<?php echo $i % 2; ?>">
+								<th scope="row" class="has-context">
+									<div>
+										<?php echo $this->escape($item->name); ?>
+									</div>
+									<?php $editIcon = '<span class="fa fa-pencil-square mr-2" aria-hidden="true"></span>'; ?>
+									<a class="hasTooltip" href="<?php echo Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id); ?>" title="<?php echo Text::_('JACTION_EDIT'); ?> <?php echo $this->escape(addslashes($item->name)); ?>">
+										<?php echo $editIcon; ?><?php echo $this->escape($item->name); ?></a>
+
+								</th>
+								<td class="d-none d-md-table-cell">
+									<?php echo $item->id; ?>
+								</td>
+							</tr>
+						<?php endforeach; ?>
+						</tbody>
+					</table>
+
+				<?php endif; ?>
+				<input type="hidden" name="task" value="">
+				<input type="hidden" name="boxchecked" value="0">
+				<?php echo HTMLHelper::_('form.token'); ?>
+			</div>
+		</div>
+	</div>
+</form>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne als nächstes die Listenansicht deiner Komponente im Administrationsbereich. Sind die drei Einträge mit Links versehen? Siehst du eine Schaltfläche zum Anlegen eines neuen Items?

![Joomla Komponente im Backend bearbeiten - Listenansicht](/images/j4x8x1.png)

3. Klicke dann auf die Schaltfläche `Neu` oder auf den Titel eines Elements. Siehst du das Formular zum Anlegen oder Bearbeiten der Items. Füge ein neues Element hinzu.

![Joomla Komponente im Backend bearbeiten - Ansicht eines Elementes öffnen](/images/j4x8x2.png)

4. Ändere vorhandene Einträge via Klick auf den Namen.

![Joomla Komponente im Backend bearbeiten - Ein Element bearbeiten](/images/j4x8x3.png)

5. Lösche über die Datenbank alle Foo-Items und überzeuge dich davon, dass das Layout Empty-State angezeigt wird. Hast du bisher die Datenbank noch nicht selbst bearbeitet? Im vorherigen Abschnitt hatte ich dir [phpmyadmin.net](https://www.phpmyadmin.net/) als Werkzeug vorgeschlagen. Nachfolgend siehst du zum Vergleich erst die Standardansicht gefolgt von unserer benutzerfreundlichen Empty State Version. Im übernächsten Abschnitt nehmen wir uns die Sprachdateien vor, dann ist das Layout perfekt.

![Joomla Komponente im Backend bearbeiten - Leere Ansicht ohne Emty-State-Layout](/images/j4x8x10.png)

![Joomla Komponente im Backend bearbeiten - Leere Ansicht mit Emty-State-Layout](/images/j4x8x11.png)
<img src="https://vg08.met.vgwort.de/na/f2f50fc66ee847cdb6ffc403f78f546a" width="1" height="1" alt="">
