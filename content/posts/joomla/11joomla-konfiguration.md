---
date: 2019-12-11
title: 'Konfiguration'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-konfiguration
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Dinge, die du konfigurierbar anzubieten planst? Dann ist dieser Teil wichtig für dich. Hier zeige ich dir, wie du eine Konfiguration auf die Joomla! typische Art und Weise zu deiner Komponente hinzufügst.

![Joomla! Konfiguration](/images/j4x11x2.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t8...t9) an und übernimm diese Änderungen in deine Entwicklungsversion.

```php
// https://github.com/astridx/boilerplate/compare/t8...t9.diff
}
```

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-9be56d6cedb2c832265e47642f0afb25)

[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/config.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<config>
	<fieldset
		name="foo"
		label="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY"
		description="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC"
		>
		<field
			name="show_foo_name_label"
			type="list"
			label="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL"
			default="1"
			>
			<option value="0">JNO</option>
			<option value="1">JYES</option>
		</field>
	</fieldset>
</config>
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t8...t9#diff-1ff20be1dacde6c4c8e68e90161e0578)

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/foos.xml)

```xml
...
			<filename>config.xml</filename>
...
```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-8e3d37bbd99544f976bf8fd323eb5250)

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
  $toolbar->preferences('com_foos');
...
```

#### [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-599caddf64a6ed0c335bc9c9f828f029)

Die `populateState`-Methode stellt sicher, dass das `State`-Objekt gefüllt ist und für den gesamten Code zugänglich ist. Wir ergänzen hier für den Site-Bereich den neuen Parameter.

[src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/src/Model/FooModel.php)

```php
...
	protected function populateState()
	{
		$app = Factory::getApplication();

		$this->setState('foo.id', $app->input->getInt('id'));
		$this->setState('params', $app->getParams());
	}
...
```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t8...t9#diff-a33732ebd6992540b8adca5615b51a1f)

Wir ersetzten `echo Text::_('COM_FOOS_NAME') . $this->item->name;` mit dem nachfolgenden Text.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/18417fb928286a84f8a5151f86e4c0cc0aeb64dd/src/components/com_foos/tmpl/foo/default.php)

```php
...
if ($this->get('State')->get('params')->get('show_foo_name_label'))
{
	echo Text::_('COM_FOOS_NAME');
}

echo $this->item->name;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass dir rechts oben die Schaltfläche `Options` angezeigt wird.

![Joomla! Konfiguration](/images/j4x11x1.png)

3. Klicke auf `Options` und stelle die Anzeige des Labels nach deinen wünschen ein.

![Joomla! Konfiguration](/images/j4x11x2.png)

4. Öffne als Letztes, die Ansicht im Frontend. Verhält die Anzeige des Labels sich so, wie du das im Administrationsbereich eingestellt hast?

![Joomla! Konfiguration](/images/j4x11x3.png)

## Geänderte Dateien

### Übersicht
