---
date: 2019-12-17
title: 'Custom Fields im Backend integrieren'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-backend-integrieren
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Custom Fields in Joomla! sind in aller Munde. Sie bieten viele zusätzliche Möglichkeiten. Deshalb unterstützt unsere Komponente die benutzerdefinierten Felder.

Dieser Teil zeigt dir, wie du die Unterstützung im Administrationsbereich programmierst. Im nächsten Kapitel zeigen wir den Inhalt der Custom Fields im Frontend an.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

> Ich lege hier für die benutzerdefinierten Felder ein eigenen Untermenü an. Die Joomla eigenen Komponenten erstellen einen Menüpunkt im Administrationsmenü. Wenn dir diese Art lieber ist, gucke in einer der Core-Komponenten ab.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t13...t14a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e2ec43fec6e2c22254228beb71e9c787)

In einer Hilfsdatei erstellen wir ein Untermenü für die benutzerdefinnierten Felder.

[src/administrator/components/com_foos/src/Helper/FooHelper.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/Helper/FooHelper.php)

```php
namespace Joomla\Component\Foos\Administrator\Helper;

\defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Helper\ContentHelper;
use Joomla\CMS\Language\Text;

class FooHelper extends ContentHelper
{
	public static function addSubmenu($vName)
	{
		if (ComponentHelper::isEnabled('com_fields') && ComponentHelper::getParams('com_foos')->get('custom_fields_enable', '1'))
		{
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

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-e5dfd09c647ca1e552c9016cf918acf3)

Auch die benutzerdefinierten Felder werden mit Berechtiungen versehen.

[src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/access.xml)

```xml
...
  <section name="fieldgroup">
		<action name="core.create" title="JACTION_CREATE" />
		<action name="core.delete" title="JACTION_DELETE" />
		<action name="core.edit" title="JACTION_EDIT" />
		<action name="core.edit.state" title="JACTION_EDITSTATE" />
		<action name="core.edit.own" title="JACTION_EDITOWN" />
		<action name="core.edit.value" title="JACTION_EDITVALUE" />
	</section>
	<section name="field">
		<action name="core.delete" title="JACTION_DELETE" />
		<action name="core.edit" title="JACTION_EDIT" />
		<action name="core.edit.state" title="JACTION_EDITSTATE" />
		<action name="core.edit.value" title="JACTION_EDITVALUE" />
	</section>
...
```

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9be56d6cedb2c832265e47642f0afb25)

über die Konfiguration kann mithilfe eines Paramters festgelegt werden, ob die Erweiterung benutzerdefinierte Felder verwendet.

[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/config.xml)

```xml
...
<field
  name="custom_fields_enable"
  type="radio"
  class="switcher"
  label="JGLOBAL_CUSTOM_FIELDS_ENABLE_LABEL"
  default="1"
  >
  <option value="0">JNO</option>
  <option value="1">JYES</option>
</field>
...
```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-8e3d37bbd99544f976bf8fd323eb5250)

In der View bereiten wir alles Notwendige für die Anzeige des Untermenüs vor.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/66d580532028f860fa60865098d80d362e4d9aff/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
	protected $sidebar;
...
...
  protected function addToolbar()
	{
		FooHelper::addSubmenu('foos');
		$this->sidebar = \JHtmlSidebar::render();

		$canDo = ContentHelper::getActions('com_foos');
...
```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()

```php

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()

```php

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Du siehst eine weitere Seitenleiste. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text`.

4. Überzeuge dich davon, dass du dieses Feld beim Edieren eines Foo-Items ebenfalls editieren zum Bearbeiten angeboten bekommst.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x2.png)

## Geänderte Dateien

### Übersicht
