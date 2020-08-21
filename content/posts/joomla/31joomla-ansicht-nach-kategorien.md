---
date: 2019-12-31
title: 'Ansicht nach Kategorien'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-ansicht-nach-kategorien
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Todo

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t25...t26) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/components/com_foos/src/Model/CategoryModel.php](https://github.com/astridx/boilerplate/compare/t25...t26#diff-71b6dccdcef138d4aabf575d418deb76)

[src/components/com_foos/src/Model/CategoryModel.php](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/src/Model/CategoryModel.php)

```php

```

#### [src/components/com_foos/src/Service/Category.php](https://github.com/astridx/boilerplate/compare/t25...t26#diff-931af94e5b12bab015c84906dc961848)

[src/components/com_foos/src/Service/Category.php](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/src/Service/Category.php)

```php

```

#### [src/components/com_foos/src/View/Category/HtmlView.php](https://github.com/astridx/boilerplate/compare/t25...t26#diff-d5d0bc03614ed16454bf9941dc8ebd7a)

[src/components/com_foos/src/View/Category/HtmlView.php](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/src/View/Category/HtmlView.php)

```php

```

#### [src/components/com_foos/tmpl/category/default.php](https://github.com/astridx/boilerplate/compare/t25...t26#diff-3ab5c99a856218c1f3a99d1a70c97dd5)

[src/components/com_foos/tmpl/category/default.php](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/tmpl/category/default.php)

```php
\defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;
?>

<div class="com-foo-category">
	<?php
		$this->subtemplatename = 'items';
		echo LayoutHelper::render('joomla.content.category_default', $this);
	?>
</div>
```

> Wir nutzen hier `joomla.content.category_default`. Diese Layoutdatei findest du [hier](https://github.com/joomla/joomla-cms/blob/4.0-dev/layouts/joomla/content/category_default.php).

#### [src/components/com_foos/tmpl/category/default.xml](https://github.com/astridx/boilerplate/compare/t25...t26#diff-3e8d54f4dcfed8bbd899db937bdf3c29)

[src/components/com_foos/tmpl/category/default.xml](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/tmpl/category/default.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_CATEGORY_VIEW_DEFAULT_TITLE">
		<help
			key = "JHELP_MENUS_MENU_ITEM_FOO_CATEGORY"
		/>
		<message>
			<![CDATA[COM_FOOS_CATEGORY_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>

	<!-- Add fields to the request variables for the layout. -->
	<fields name="request">
		<fieldset
			name="request"
			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
			>
			<field
				name="id"
				type="modal_category"
				label="COM_FOOS_FIELD_CATEGORY_LABEL"
				extension="com_foos"
				required="true"
				select="true"
				new="true"
				edit="true"
				clear="true"
			/>
		</fieldset>
	</fields>
	<fields name="params">
		<fieldset name="basic" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
			<field
				name="show_name"
				type="radio"
				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
				default="1"
				class=""
				>
				<option value="0">JHIDE</option>
				<option value="1">JSHOW</option>
			</field>

			<field
				name="show_pagination"
				type="list"
				label="JGLOBAL_PAGINATION_LABEL"
				useglobal="true"
				>
				<option value="0">JHIDE</option>
				<option value="1">JSHOW</option>
				<option value="2">JGLOBAL_AUTO</option>
			</field>

			<field
				name="show_pagination_results"
				type="list"
				label="JGLOBAL_PAGINATION_RESULTS_LABEL"
				useglobal="true"
				class="custom-select-color-state"
				>
				<option value="0">JHIDE</option>
				<option value="1">JSHOW</option>
			</field>
		</fieldset>
	</fields>
</metadata>
```

> Die Kategorie-Ansichten in Joomla verfügen in der Regel über eine Menge weiterer Parameter. Beispielsweise habe ich die Unterkategorien und Filter ignoriert. So bleibt das Beispiel übersichtlich. Schau das, was dir wichtig ist, in den Core-Erweiterungen nach.

> Falls dein Element nicht angezeigt wird, liegt es unter Umständen daran, dass du beim Element den Parameter `show_name` auf no gesetzt hast.

#### [src/components/com_foos/tmpl/category/default_items.php](https://github.com/astridx/boilerplate/compare/t25...t26#diff-d08d72ea3e911a67f9ce50b0e543a953)

[src/components/com_foos/tmpl/category/default_items.php](https://github.com/astridx/boilerplate/blob/0d8c876d2435bb1cb38a62dd9a37880df9a3e178/src/components/com_foos/tmpl/category/default_items.php)

```php
\defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\Foos\Site\Helper\RouteHelper;

HTMLHelper::_('behavior.core');
?>
<div class="com-foo-category__items">
	<form action="<?php echo htmlspecialchars(Uri::getInstance()->toString()); ?>" method="post" name="adminForm" id="adminForm">
		<?php if (empty($this->items)) : ?>
			<p>
				<?php echo Text::_('COM_FOO_NO_FOOS'); ?>
			</p>
		<?php else : ?>

			<ul class="com-foo-category__list category">
				<?php foreach ($this->items as $i => $item) : ?>

					<?php if (in_array($item->access, $this->user->getAuthorisedViewLevels())) : ?>
						<li class="row cat-list-row" >

						<div class="list-title">
							<a href="<?php echo Route::_(RouteHelper::getFooRoute($item->slug, $item->catid, $item->language)); ?>">
							<?php echo $item->name; ?></a>
							<?php echo $item->event->afterDisplayTitle; ?>

							<?php echo $item->event->beforeDisplayContent; ?>
						</div>

						<?php echo $item->event->afterDisplayContent; ?>
					</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
			<?php endif; ?>

			<?php if ($this->params->get('show_pagination', 2)) : ?>
			<div class="com-foo-category__counter">
				<?php if ($this->params->def('show_pagination_results', 1)) : ?>
					<p class="counter">
						<?php echo $this->pagination->getPagesCounter(); ?>
					</p>
				<?php endif; ?>

				<?php echo $this->pagination->getPagesLinks(); ?>
			</div>
			<?php endif; ?>
	</form>
</div>
```

> Die Ansicht ist nicht gestylt. Cassiopeia, das neue Frontend-Template von Joomla ist zum Zeitpunkt des Schreibens nicht fertig. Deshalb ist nicht klar, ob ein Framework für die Anzeige im Frontend nutzen wird. Da dies ohnehin Geschmacksache ist, überlasse ich das Stylen dir.

### Geänderte Dateien

In diesem Kapitel fügen wir nur neue Dateien hinzu.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Erstelle einen Menüpunkt, der die Elemente einer Kategorie unserer Erweiterung anzeigt.

3. Wechsele ins Frontend und überzeuge dich davon, dass die Elemente korrekt angezeigt werden.

## Geänderte Dateien

### Übersicht
