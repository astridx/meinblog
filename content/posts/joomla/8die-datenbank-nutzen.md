---
date: 2020-12-08
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Die Datenbank nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-datenbank-nutzen
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Im vorhergehenden Teil hatten wir eine Datenbank für deine Joomla-Komponenten eingerichtet. In diesem Teil lernst du, wie du mithilfe eines Formulars im Administrationsbereich die Daten änderst oder ergänzt.

Am Ende enthält die Ansicht deiner Komponente im Administrationsbereich eine Schaltfläche zum Hinzufügen von neuen Elementen. Du änderst ein vorhandenes Item, indem du in der Listenansicht auf den Titel klickst.

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t6...t6b)[^github.com/astridx/boilerplate/compare/t6...t6b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree6b.png)

### Neue Dateien

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-262e27353fbe755d3813ea2df19cd0ed)

Joomla erstellt das Formular für dich, wenn du ihm die Rahmenbedingungen in einer XML-Datei vorgibst. Nachfolgend siehst du dies für unser Beispiel.

> Du wünschst dir einen Überblick über alle möglichen Formular-Elemente? In der [Joomla Dokumentation](https://docs.joomla.org/Form_field/de) sind alle standardmäßig enthaltenen Formularfelder aufgelistet.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/forms/foo.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/forms/foo.xml -->

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

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-181b1576846350fbb4a7a1a73291de4b)

Wir erstellen hier mehr oder weniger eine leere Klasse. Obwohl die nichts beinhaltet, brauchen wir sie, weil diese von `FormController` erbt. Joomla erwartet `FooController` als Controller der Erweiterung an der Stelle unter dem Namen.

[administrator/components/com_foos/ src/Controller/FooController.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Controller/FooController.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Controller/FooController.php

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

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Jetzt erstellen wir das Model, um die Daten für ein Element zu holen. Dieses nennen wir `FooModel`. Es erbt die wesentlichen Implementierungen von `AdminModel`. Wir programmieren unsere speziellen Anforderungen selbst hinzu. Mit `$typeAlias` setzen wir den den Typalias für den Inhaltstyp. So weiß Joomla bei allen vererbten Funktionen, auf welches Element es diese genau anzuwenden hat. Beispielsweise wird der Alias in `loadFormData()` genutzt, um die passende XML-Datei in ein Formular umzuwandeln. Erinnerst du dich, die Datei hast du im aktuellen Kapitel erstellt. Und für das korrekte Zuordnen der Tabelle ist der Alias unerlässlich, wenn du Joomla Funktionen wiederverwendest. Der Typalias übernimmt im Hintergrund eine große Rolle, ohne dass du es mitbekommst.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Model/FooModel.php

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
	public function getForm($data = array(), $loadData = true)
	{
		// Get the form.
		$form = $this->loadForm($this->typeAlias, 'foo', array('control' => 'jform', 'load_data' => $loadData));

		if (empty($form))
		{
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
#### [administrator/components/com\_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-19bf55010e1963bede0668355cebb307)

Wir implementieren den Zugriff auf die Datenbanktabelle. Wichtig ist das Setzten von `$this->typeAlias` und die Angabe des Namens der Tabelle `#__foos_details`.

> Lies im Vorwort, was das Präfix `#__` genau bedeutet, wenn du dies nicht weißt.

[administrator/components/com_foos/ src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/Table/FooTable.php

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
		if (empty($this->alias))
		{
			$this->alias = $this->name;
		}

		$this->alias = ApplicationHelper::stringURLSafe($this->alias, $this->language);

		if (trim(str_replace('-', '', $this->alias)) == '')
		{
			$this->alias = Factory::getDate()->format('Y-m-d-H-i-s');
		}

		return $this->alias;
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php

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
#### [administrator/components/com\_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1637778e5f7d1d56dd1751af1970f01b)

In der Datei `edit.php` ist die Ansicht implementiert, die zum Bearbeiten aufgerufen wird. Mir ist wichtig, dass ich den [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets/de) `$wa = $this->document->getWebAssetManager();` anspreche. Der ist in Joomla 4 neu. Du lädst zwei JavaScript Dateien via Webassetmanager. `useScript('keepalive')` lädt `media/system/js/keepalive.js` und hält deine Sitzung am Leben, während du einen Artikel bearbeitest oder erstellst. `useScript('form.validate')` lädt mit `media/system/js/core.js` eine Menge hilfreicher Funktionen. Zum Beispiel die Validierung, die wir später genauer ansehen.

> Falls du Webassets nicht korrekt einbindest, wird dir in der Konsole deines Browsers folgender Fehler angezeigt, wenn du das Formular speicherst: `joomla document.formvalidator is undefined`.

> Interessierst du dich intensiver für die Dateien [Core.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/core.es6.js) oder [Keepalive.js](https://github.com/joomla/joomla-cms/blob/4.0-dev/build/media_source/system/js/keepalive.es6.js)? Dann klicke auf die Namen. Dies führt dich zu den JavaScript-Dateien.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t6b/src/administrator/components/com_foos/tmpl/foo/edit.php

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

### Geänderte Dateien

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-1ff20be1dacde6c4c8e68e90161e0578)

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/6af3fd96a856784ffd8c0ffd1225544b60361ba9/src/administrator/components/com_foos/foos.xml)

Damit bei einer neuen Installation das Verzeichnis `forms` an Joomla übergeben wird, tragen wird diese im Installationsmanifest ein.

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
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-8e3d37bbd99544f976bf8fd323eb5250)

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Toolbar\Toolbar;
+use Joomla\CMS\Toolbar\ToolbarHelper;

 /**
  * View class for a list of foos.

 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
+
+		$this->addToolbar();
+
 		parent::display($tpl);
 	}
+
+	/**
+	 * Add the page title and toolbar.
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function addToolbar()
+	{
+		// Get the toolbar object instance
+		$toolbar = Toolbar::getInstance('toolbar');
+
+		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');
+
+		$toolbar->addNew('foo.add');
+	}
+
 }

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t6...t6b#diff-3186af99ea4e3321b497b86fcd1cd757)

In der Übersicht der Komponente ersetzen wir den einfachen Text. Außerdem fügen wir ein Formular hinzu.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/db7d51d50ff1ac238d8fd979b65acd54f157e586/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\HTML\HTMLHelper;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Router\Route;
 ?>
-<?php foreach ($this->items as $i => $item) : ?>
-<?php echo $item->name; ?>
-</br>
-<?php endforeach; ?>
+<form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
+	<div class="row">
+        <div class="col-md-12">
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
+							<?php endforeach; ?>
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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne als Nächstes die Ansicht im Administrationsbereich für deine Komponente. Sind die drei Einträge mit Links versehen? Siehst du eine Schaltfläche zum Anlegen eines neuen Items?

![Joomla Componente im Backend bearbeiten](/images/j4x8x1.png)

3. Klicke als Letztes auf die Schaltfläche `Neu` oder auf den Titel eines Elements. Siehst du das Formular zum Anlegen oder Bearbeiten der Items. Füge ein neues Element hinzu.

![Joomla Componente im Backend bearbeiten](/images/j4x8x2.png)

4. Ändere vorhandene Einträge via Klick auf den Namen.

![Joomla Componente im Backend bearbeiten](/images/j4x8x3.png)
