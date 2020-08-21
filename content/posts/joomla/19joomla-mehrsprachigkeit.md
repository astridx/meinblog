---
date: 2019-12-19
title: 'Mehrsprachigkeit'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-mehrsprachigkeit
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Mit Joomla! ist es möglich, eine mehrsprachige Website einzurichten, ohne Erweiterungen von Dritten zu installieren. In diesem Tutorial zeige ich dir, wie du deine Komponente so programmierst, dass sie Sprachverknüpfungen unterstützt.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14b...t15a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Damit die Sprache zum Element gespeichert wird, fügen wir eine Spalte in der Datenbanktabelle hinzu. Bei einer Aktualisierung ist das Skript `15.0.0.sql` dasjenige, welches für Version 15.0.0. ausgeführt wird.

#### [src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-fa2e66efed41380705fb9f91c257ea9c)

[src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql)

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
```

#### [src/administrator/components/com_foos/src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-89e05e395916539c641802f3bb6165c5)

Die Hilfsdatei `AssociationsHelper.php` ist die Schnittstelle zur Komponente Sprachverknüpfungen `com_associations`. `AssociationsHelper.php` gibt es im Frontend und im Backend.

[src/administrator/components/com_foos/src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Helper/AssociationsHelper.php)

```php
<?php
namespace Joomla\Component\Foos\Administrator\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Association\AssociationExtensionHelper;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Table\Table;
use Joomla\Component\Foos\Site\Helper\AssociationHelper;

class AssociationsHelper extends AssociationExtensionHelper
{
	protected $extension = 'com_foos';

	protected $itemTypes = array('foo', 'category');

	protected $associationsSupport = true;

	public function getAssociationsForItem($id = 0, $view = null)
	{
		return AssociationHelper::getAssociations($id, $view);
	}

	public function getAssociations($typeName, $id)
	{
		$type = $this->getType($typeName);

		$context    = $this->extension . '.item';
		$catidField = 'catid';

		if ($typeName === 'category')
		{
			$context    = 'com_categories.item';
			$catidField = '';
		}

		$associations = Associations::getAssociations(
			$this->extension,
			$type['tables']['a'],
			$context,
			$id,
			'id',
			'alias',
			$catidField
		);

		return $associations;
	}

	public function getItem($typeName, $id)
	{
		if (empty($id))
		{
			return null;
		}

		$table = null;

		switch ($typeName)
		{
			case 'foo':
				$table = Table::getInstance('FooTable', 'Joomla\\Component\\Foos\\Administrator\\Table\\');
				break;

			case 'category':
				$table = Table::getInstance('Category');
				break;
		}

		if (empty($table))
		{
			return null;
		}

		$table->load($id);

		return $table;
	}

	public function getType($typeName = '')
	{
		$fields  = $this->getFieldsTemplate();
		$tables  = array();
		$joins   = array();
		$support = $this->getSupportTemplate();
		$title   = '';

		if (in_array($typeName, $this->itemTypes))
		{
			switch ($typeName)
			{
				case 'foo':
					$fields['title'] = 'a.name';
					$fields['state'] = 'a.published';

					$support['state'] = true;
					$support['acl'] = true;
					$support['category'] = true;
					$support['save2copy'] = true;

					$tables = array(
						'a' => '#__foos_details'
					);

					$title = 'foo';
					break;

				case 'category':
					$fields['created_user_id'] = 'a.created_user_id';
					$fields['ordering'] = 'a.lft';
					$fields['level'] = 'a.level';
					$fields['catid'] = '';
					$fields['state'] = 'a.published';

					$support['state'] = true;
					$support['acl'] = true;
					$support['checkout'] = false;
					$support['level'] = false;

					$tables = array(
						'a' => '#__categories'
					);

					$title = 'category';
					break;
			}
		}

		return array(
			'fields'  => $fields,
			'support' => $support,
			'tables'  => $tables,
			'joins'   => $joins,
			'title'   => $title
		);
	}

	protected function getFieldsTemplate()
	{
		return array(
			'id'                  => 'a.id',
			'title'               => 'a.title',
			'alias'               => 'a.alias',
			'ordering'            => '',
			'menutype'            => '',
			'level'               => '',
			'catid'               => 'a.catid',
			'language'            => 'a.language',
			'access'              => 'a.access',
			'state'               => 'a.state',
			'created_user_id'     => '',
			'checked_out'         => '',
			'checked_out_time'    => ''
		);
	}
}
```

#### [src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-00a681faa92b56a5268be6268afbe52f)

Wir haben keine speziellen Wünsche und nutzen deshalb das Standardtemplate. Du findest das im Verzeichnis `/layouts/joomla/edit/associations.php`. Wie du es lädst zeigt dir der nachfolgende Beispielcode.

> Falls du spezielle Wünsche hast, kopiere `/layouts/joomla/edit/associations.php` in deine Komponente und ändere sie wunschgemäß ab. Wie und wo du sie speicherst oder aufrufst, wird in einem späteren Kapitel behandelt.

[src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/administrator/components/com_foos/tmpl/foo/edit_associations.php)

```php
defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;

echo LayoutHelper::render('joomla.edit.associations', $this);
```

#### [src/components/com_foos/src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2c4c9f6ac9ee1dafc30e300dc667f323)

Die Hilfsdatei `AssociationsHelper.php` ist die Schnittstelle zur Komponente Sprachverknüpfungen `com_associations`. `AssociationsHelper.php` gibt es im Frontend und im Backend.

[src/components/com_foos/src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/components/com_foos/src/Helper/AssociationHelper.php)

```php
namespace Joomla\Component\Foos\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Associations;
use Joomla\Component\Categories\Administrator\Helper\CategoryAssociationHelper;
use Joomla\Component\Foos\Site\Helper\Route as FoosHelperRoute;

abstract class AssociationHelper extends CategoryAssociationHelper
{
	public static function getAssociations($id = 0, $view = null)
	{
		$jinput = Factory::getApplication()->input;
		$view = $view ?? $jinput->get('view');
		$id = empty($id) ? $jinput->getInt('id') : $id;

		if ($view === 'foos')
		{
			if ($id)
			{
				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $id);

				$return = array();

				foreach ($associations as $tag => $item)
				{
					$return[$tag] = FoosHelperRoute::getFoosRoute($item->id, (int) $item->catid, $item->language);
				}

				return $return;
			}
		}

		if ($view === 'category' || $view === 'categories')
		{
			return self::getCategoryAssociations($id, 'com_foos');
		}

		return array();

	}
}
```

#### [src/components/com_foos/src/Helper/Route.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-80bf53de6eba8ceb28ebfb1069c0c304)

Wir erzeugen die Klasse `Route`, damit die Links korrekt zusammengesetzt werden, die wir in diesem Kapitel erstellen.

[src/components/com_foos/src/Helper/Route.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/components/com_foos/src/Helper/Route.php)

```php
<?php
namespace Joomla\Component\Foos\Site\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Categories\CategoryNode;
use Joomla\CMS\Language\Multilanguage;

abstract class Route
{
	public static function getFoosRoute($id, $catid, $language = 0)
	{
		$link = 'index.php?option=com_foos&view=foo&id=' . $id;

		if ($catid > 1)
		{
			$link .= '&catid=' . $catid;
		}

		if ($language && $language !== '*' && Multilanguage::isEnabled())
		{
			$link .= '&lang=' . $language;
		}

		return $link;
	}

	public static function getCategoryRoute($catid, $language = 0)
	{
		if ($catid instanceof CategoryNode)
		{
			$id = $catid->id;
		}
		else
		{
			$id = (int) $catid;
		}

		if ($id < 1)
		{
			$link = '';
		}
		else
		{
			$link = 'index.php?option=com_foos&view=category&id=' . $id;

			if ($language && $language !== '*' && Multilanguage::isEnabled())
			{
				$link .= '&lang=' . $language;
			}
		}

		return $link;
	}
}
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-262e27353fbe755d3813ea2df19cd0ed)

Wir erstellen ein Feld, über das du die Sprachverknüpfung auswählst. Damit Joomla dieses Feld findet, gibst du Pfad in der Form `addfieldprefix="Joomla\Component\Foos\Administrator\Field"` an.

Außerdem fügen wir ein Feld hinzu, in dem dein Item einer Sprache zugeordnet wird.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/fc08495c9bf14cb79315da7a3a5a95064351e2a0/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
<fieldset
		addruleprefix="Joomla\Component\Foos\Administrator\Rule"
		addfieldprefix="Joomla\Component\Foos\Administrator\Field"
>
...
...
<field
			name="language"
			type="contentlanguage"
			label="JFIELD_LANGUAGE_LABEL"
			>
			<option value="*">JALL</option>
</field>

...

```

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

Im Provider registrieren wir den Service.

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/services/provider.php)

```php
...
  $container->set(AssociationExtensionInterface::class, new AssociationsHelper);
...
...
	$component->setAssociationExtension($container->get(AssociationExtensionInterface::class));
...
```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-896f245bc8e493f91277fd33913ef974)

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

Damit die Sprache zum Element gespeichert wird, fügen wir eine Spalte in der Datenbanktabelle hinzu. Bei Neuinstallationen ist das Skript `install.mysql.utf8.sql` dasjenige, welches aufgerufen wird.

```sql
...
...
ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*' AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);
```

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-38764f2b1343234561c0d02cd2991ea1)

In FoosComponent ergänzen wir den `AssociationServiceTrait`.

> [Traits](https://www.php.net/manual/de/language.oop5.traits.php) sind ein Mechanismus zur Wiederverwendung von Code, der in Programmiersprachen mit einfacher Vererbung wie PHP verwendet wird.

[src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Extension/FoosComponent.php)

```php
...
class FoosComponent extends MVCComponent
implements BootableExtensionInterface, CategoryServiceInterface, AssociationServiceInterface
{
	use CategoryServiceTrait;
	use AssociationServiceTrait;
  use HTMLRegistryAwareTrait;
...
```

#### [src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-aa20a48089379605365184314b6cc950)

Das Modal haben wir bisher genutzt, um beim Anlegen eines Menüpunkts ein Foo-Element auszuwählen. Jetzt verwenden wir es wieder, um eine Sprachverknüpfung zu selektieren. Damit nur die passenden Sprachen angezeigt werden, erweitern wir die URL.

[src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Field/Modal/FooField.php)

```php
...
if (isset($this->element['language'])) {
  $linkFoos .= '&amp;forcedLanguage=' . $this->element['language'];
  $modalTitle .= ' &#8212; ' . $this->element['label'];
}
...
```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Das Model passen wir bezüglich der Sprache an. Dabei spielen `getItem` und `preprocessForm` die wesentliche Rolle.

[src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FooModel.php)

```php
...
public function getItem($pk = null)
	{
		$item = parent::getItem($pk);

		// Load associated foo items
		$assoc = Associations::isEnabled();

		if ($assoc)
		{
			$item->associations = array();

			if ($item->id != null)
			{
				$associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $item->id, 'id', null);

				foreach ($associations as $tag => $association)
				{
					$item->associations[$tag] = $association->id;
				}
			}
		}

		return $item;
	}

	protected function preprocessForm(\JForm $form, $data, $group = 'content')
	{
		if (Associations::isEnabled())
		{
			$languages = LanguageHelper::getContentLanguages(false, true, null, 'ordering', 'asc');

			if (count($languages) > 1)
			{
				$addform = new \SimpleXMLElement('<form />');
				$fields = $addform->addChild('fields');
				$fields->addAttribute('name', 'associations');
				$fieldset = $fields->addChild('fieldset');
				$fieldset->addAttribute('name', 'item_associations');

				foreach ($languages as $language)
				{
					$field = $fieldset->addChild('field');
					$field->addAttribute('name', $language->lang_code);
					$field->addAttribute('type', 'modal_foo');
					$field->addAttribute('language', $language->lang_code);
					$field->addAttribute('label', $language->title);
					$field->addAttribute('translate_label', 'false');
					$field->addAttribute('select', 'true');
					$field->addAttribute('new', 'true');
					$field->addAttribute('edit', 'true');
					$field->addAttribute('clear', 'true');
				}

				$form->load($addform, false);
			}
		}

		parent::preprocessForm($form, $data, $group);
	}
...
```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2daf62ad6c51630353e31eaa3cc28626)

Im Model der Liste ist es neben dem Hinzufügen der Sprachinformationen jetzt wichtig, den Status zu aktualisieren. Anderfalls ist nicht jederzeit die passende Sprache aktiv.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php
...
	protected function populateState($ordering = 'a.name', $direction = 'asc')
	{
		$app = Factory::getApplication();
		$forcedLanguage = $app->input->get('forcedLanguage', '', 'cmd');

		// Adjust the context to support modal layouts.
		if ($layout = $app->input->get('layout'))
		{
			$this->context .= '.' . $layout;
		}

		// Adjust the context to support forced languages.
		if ($forcedLanguage)
		{
			$this->context .= '.' . $forcedLanguage;
		}

		// List state information.
		parent::populateState($ordering, $direction);

		// Force a language.
		if (!empty($forcedLanguage))
		{
			$this->setState('filter.language', $forcedLanguage);
		}
	}
```

#### [src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)

Wir implementieren den Service `association` in `AdministratorService.php`.

[src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php)

```php
...
	public function association($fooid)
	{
		$html = '';

		if ($associations = Associations::getAssociations('com_foos', '#__foos_details', 'com_foos.item', $fooid, 'id', null))
		{
			foreach ($associations as $tag => $associated)
			{
				$associations[$tag] = (int) $associated->id;
			}

			$db = Factory::getDbo();
			$query = $db->getQuery(true)
				->select('c.id, c.name as title')
				->select('l.sef as lang_sef, lang_code')
				->from('#__foos_details as c')
				->select('cat.title as category_title')
				->join('LEFT', '#__categories as cat ON cat.id=c.catid')
				->where('c.id IN (' . implode(',', array_values($associations)) . ')')
				->where('c.id != ' . $fooid)
				->join('LEFT', '#__languages as l ON c.language=l.lang_code')
				->select('l.image')
				->select('l.title as language_title');
			$db->setQuery($query);

			try
			{
				$items = $db->loadObjectList('id');
			}
			catch (\RuntimeException $e)
			{
				throw new \Exception($e->getMessage(), 500, $e);
			}

			if ($items)
			{
				foreach ($items as &$item)
				{
					$text = strtoupper($item->lang_sef);
					$url = Route::_('index.php?option=com_foos&task=foo.edit&id=' . (int) $item->id);
					$tooltip = '<strong>' . htmlspecialchars($item->language_title, ENT_QUOTES, 'UTF-8') . '</strong><br>'
						. htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8') . '<br>' . Text::sprintf('JCATEGORY_SPRINTF', $item->category_title);
					$classes = 'badge badge-secondary';

					$item->link = '<a href="' . $url . '" title="' . $item->language_title . '" class="' . $classes . '">' . $text . '</a>'
						. '<div role="tooltip" id="tip' . (int) $item->id . '">' . $tooltip . '</div>';
				}
			}

			$html = LayoutHelper::render('joomla.content.associations', $items);
		}

		return $html;
	}
...
```

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/3e4020a2fb91237a269e49d24b9ff695f4d7ecec/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

Wenn nur eine Sprache möglich ist, setzte den Wert des Sprachauswahlfeldes und schützte es vor Schreibzugriff. Außerdem sind nur Kategorien dieser Sprache auswählbar.

```php
...
  if ($this->getLayout() === 'modal' && $forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'cmd'))
  {
    $this->form->setValue('language', null, $forcedLanguage);
    $this->form->setFieldAttribute('language', 'readonly', 'true');

    $this->form->setFieldAttribute('catid', 'language', '*,' . $forcedLanguage);
  }
...

```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-8e3d37bbd99544f976bf8fd323eb5250)

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
  if ($this->getLayout() !== 'modal')
  {
    $this->addToolbar();
    $this->sidebar = \JHtmlSidebar::render();
  }
  else
  {
    if ($forcedLanguage = Factory::getApplication()->input->get('forcedLanguage', '', 'CMD'))
    {
      $languageXml = new \SimpleXMLElement('<field name="language" type="hidden" default="' . $forcedLanguage . '" />');
    }
  }
...
```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-1637778e5f7d1d56dd1751af1970f01b)

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/a477530dc5e1a7a5d574ee2019951af2a5264eb5/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()

```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Installiere über `System | Install | Languages` mindestens eine weitere Sprache.

4. Stelle über `System | Manage | Plugins` sicher, dass das Plugin `Sample Data - Multilingual` veröffentlicht ist.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x1.png)

5. Wechsele zurück zum `Home Dashboard` und installiere die Beispieldateien `Multilinguale Sample Data`.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x3.png)

6. Öffne die Ansicht eines Items deiner Komponente im Administrationsbereich und überzeuge dich davon, dass der Status `Language` änderbar ist. Ändere diesen von `All` in eine beliebige Sprache.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x2.png)

7. Spiele mit den Sprachverknüpfungen und überzeuge dich davon, dass alles korrekt verknüpft wird.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x4.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

8. Erweitere die Tests auf die Komponente `Multilingual Associations`. Diese unterstützt deine Erweiterung ebenfalls.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Geänderte Dateien

### Übersicht
