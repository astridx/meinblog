---
date: 2020-12-17
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Custom Fields (Benutzerdefinierte Felder) im Backend integrieren'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-backend-integrieren
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Custom Fields (Benutzerdefinierte Felder) in Joomla sind seit Joomla Version 3.7 in aller Munde. Sie bieten unabhängig von Drittanbietern viele zusätzliche Möglichkeiten. Deshalb unterstützt unsere Komponente die benutzerdefinierten Felder.

Dieser Teil zeigt dir, wie du die Unterstützung im Administrationsbereich programmierst. Im nächsten Kapitel integrieren wir Custom Fields im Frontend.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

> Ich lege hier für die benutzerdefinierten Felder ein eigenes Untermenü an. Die Joomla eigenen Komponenten erstellen einen Menüpunkt im Administrationsmenü. Wenn dir diese Art lieber ist, gucke in einer der Core-Komponenten ab.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t13...t14a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [administrator/components/com_foos/ src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e2ec43fec6e2c22254228beb71e9c787)

In einer Hilfsdatei erstellen wir eine Sidebar - ein eigenes Untermenü - für die benutzerdefinierten Felder.

[administrator/components/com_foos/ src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/Helper/FooHelper.php)

```php {numberLines: -3}
// https://raw.githubusercontent.com/astridx/boilerplate/t14a/src/administrator/components/com_foos/src/Helper/FooHelper.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Helper\ContentHelper;
use Joomla\CMS\Language\Text;

/**
 * Foo component helper.
 *
 * @since  __BUMP_VERSION__
 */
class FooHelper extends ContentHelper
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string  $vName  The name of the active view.
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	public static function addSubmenu($vName)
	{
		if (ComponentHelper::isEnabled('com_fields') && ComponentHelper::getParams('com_foos')->get('custom_fields_enable', '1')) {
			\JHtmlSidebar::addEntry(
				Text::_('JGLOBAL_FIELDS'),
				'index.php?option=com_fields&context=com_foos.foo',
				$vName == 'fields.fields'
			);
			\JHtmlSidebar::addEntry(
				Text::_('JGLOBAL_FIELD_GROUPS'),
				'index.php?option=com_fields&view=groups&context=com_foos.foo',
				$vName == 'fields.groups'
			);
		}
	}
}

```

### Geänderte Dateien

#### [administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e5dfd09c647ca1e552c9016cf918acf3)

Auch die benutzerdefinierten Felder werden mit Berechtigungen versehen. So ist es möglich, dass das Ändern oder das Ansehen eines Feldes nur bestimmten Benutzern erlaubt ist. Hierfür ergänzen wir alles Notwendige in der Datei `access.xml`.

[administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/access.xml)

```xml {diff}
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
+	<section name="fieldgroup">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="field">
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
 </access>

```

#### [administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9be56d6cedb2c832265e47642f0afb25)

Über die Konfiguration `config.xml` wird mithilfe eines Paramters festgelegt, ob die Erweiterung benutzerdefinierte Felder verwendet.

> Fragst du dich, ob warum es diesen Parameter gibt? Er ist [nicht zwingend](https://joomla.stackexchange.com/questions/28672/reason-for-parameter-for-using-custom-fields-in-configuration/28680#28680).

[administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/config.xml)

```php {diff}
 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="custom_fields_enable"
+			type="radio"
+			class="switcher"
+			label="JGLOBAL_CUSTOM_FIELDS_ENABLE_LABEL"
+			default="1"
+			>
+			<option value="0">JNO</option>
+			<option value="1">JYES</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"

```

#### [administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-8e3d37bbd99544f976bf8fd323eb5250)

In der `View` bereiten wir alles Notwendige für die Anzeige des Untermenüs vor.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

 \defined('_JEXEC') or die;

+use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Helper\ContentHelper;
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Toolbar\Toolbar;
 use Joomla\CMS\Toolbar\ToolbarHelper;
+use FooNamespace\Component\Foos\Administrator\Helper\FooHelper;

 /**
  * View class for a list of foos.

 	 */
 	protected $items;

+	/**
+	 * The sidebar markup
+	 *
+	 * @var  string
+	 */
+	protected $sidebar;
+
 	/**
 	 * Method to display the view.
 	 *

 	 */
 	protected function addToolbar()
 	{
+		FooHelper::addSubmenu('foos');
+		$this->sidebar = \JHtmlSidebar::render();
+
 		$canDo = ContentHelper::getActions('com_foos');

 		// Get the toolbar object instance

 		{
 			$toolbar->preferences('com_foos');
 		}
+
+		HTMLHelper::_('sidebar.setAction', 'index.php?option=com_foos');
 	}
 }

```

#### [administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-1637778e5f7d1d56dd1751af1970f01b)

Damit das Editieren der Custom Fields genauso funktioniert, wie in den Joomla eigenen Erweiterungen, nutzen wir [UiTab](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/HTML/Helpers/UiTab.php). `$this->useCoreUI = true;` sorgt dafür, dass der [Helper](https://github.com/joomla/joomla-cms/blob/c6332d48dab0fce0d4903f206dc979e2c2c59a12/layouts/joomla/edit/params.php#L20) flexibel die richtige Tab-Impementierung liefert.

> Einen Vergleich zwischen bisher meist genutzten `bootstrap.tab` und `uitab` bietet [Pull Request PR 21805](https://github.com/joomla/joomla-cms/pull/21805).

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Router\Route;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;

 $app = Factory::getApplication();
 $input = $app->input;

+$this->useCoreUI = true;
+
 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
 	->useScript('form.validate')

 ?>

 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
-	<?php echo $this->getForm()->renderField('name'); ?>
-	<?php echo $this->getForm()->renderField('alias'); ?>
-	<?php echo $this->getForm()->renderField('access'); ?>
-	<?php echo $this->getForm()->renderField('catid'); ?>
-	<?php echo $this->getForm()->renderField('published'); ?>
-	<?php echo $this->getForm()->renderField('publish_up'); ?>
-	<?php echo $this->getForm()->renderField('publish_down'); ?>
+	<div>
+		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', array('active' => 'details')); ?>
+
+		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details', empty($this->item->id) ? Text::_('COM_FOOS_NEW_FOO') : Text::_('COM_FOOS_EDIT_FOO')); ?>
+		<div class="row">
+			<div class="col-md-9">
+				<div class="row">
+					<div class="col-md-6">
+						<?php echo $this->getForm()->renderField('name'); ?>
+						<?php echo $this->getForm()->renderField('alias'); ?>
+						<?php echo $this->getForm()->renderField('access'); ?>
+						<?php echo $this->getForm()->renderField('published'); ?>
+						<?php echo $this->getForm()->renderField('publish_up'); ?>
+						<?php echo $this->getForm()->renderField('publish_down'); ?>
+						<?php echo $this->getForm()->renderField('catid'); ?>
+					</div>
+				</div>
+			</div>
+		</div>
+		<?php echo HTMLHelper::_('uitab.endTab'); ?>
+
+		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>
+
+		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
+	</div>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

#### [administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-3186af99ea4e3321b497b86fcd1cd757)

In der Übersicht der Komponente im Administrationsbereich schaffen wir Platz für die `Sidebar`. Um genau zu sein: Wir fügen diese mit der CSS-Klasse `col-md-2` ein, wenn sie notwendig ist. Wir verkleinern dann den Hauptbereich, indem wir die Klasse `col-md-10` setzen. Ohne `Sidebar` nutzt der Hauptbereich die Klasse `col-md-12` und somit den vollen Bereich.

> Dir sagen die Klassen `col-md-2`, `col-md-10` und `col-md-12` nichts? Dies sind Boostrap Klassen. Joomla 4 nutzt standardmäßig das Framework [Boostrap 5](https://getbootstrap.com/docs/5.0/layout/grid/).

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/tmpl/foos/default.php)

```php  {diff}

 ?>
 <form action="<?php echo Route::_('index.php?option=com_foos'); ?>" method="post" name="adminForm" id="adminForm">
 	<div class="row">
-        <div class="col-md-12">
+		<?php if (!empty($this->sidebar)) : ?>
+			<div id="j-sidebar-container" class="col-md-2">
+				<?php echo $this->sidebar; ?>
+			</div>
+		<?php endif; ?>
+		<div class="<?php if (!empty($this->sidebar)) {echo 'col-md-10'; } else { echo 'col-md-12'; } ?>">
 			<div id="j-main-container" class="j-main-container">
 				<?php if (empty($this->items)) : ?>
 					<div class="alert alert-warning">

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Du siehst eine weitere Seitenleiste. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text`.

4. Überzeuge dich davon, dass du dieses Feld beim Edieren eines Foo-Items ebenfalls editieren zum Bearbeiten angeboten bekommst.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x17x2.png)

5. Stelle sicher, dass die benutzerdefinierten Felder in der globalen Konfiguration ein- und ausschaltbar sind.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x3.png)
