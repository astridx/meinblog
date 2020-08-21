---
date: 2019-12-22
title: 'Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-parameter
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Einstellungen, die für alle Items deiner Komponente gelten und ein Anwender an seine Erfordernisse anpasst? In Joomla! gibt für diesen Zweck Parameter.

Parameter gibt es für

- ein Item speziell,
- für die ganze Komponente und
- für einen Menüpunkt.

Wenn ein Parameter bei den drei Möglichkeiten gesetzt ist, dann gilt folgende Hierarchie:

- Der Menüpunkt schlägt alles.
- Danach zieht der Parameter, der für das Item speziell gilt.
- Die niedrigst Priorität hat der Parameter, der für die ganze Komponente gilt.

Beim Menüpunkt hatten wir schon einen Parameter gesetzt und für die Komponente als Ganzes gibt es diesen in den Optionen. Das Item im Speziellen ist jetzt an der Reihe.

![Joomla! Published](/images/j4x22x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t17...t18) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-61df23203c29920003ce39f96f2fb2f7)

Damit bei einem Update die Spalte erstellt wird, in der die Parameter gespeichert werden, benötigen wir die folgende SQL-Datei.

[src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql)

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-9be56d6cedb2c832265e47642f0afb25)

In der Konfiguration wird der Parameter in Joomla üblicherweise gespeichert, um einen Standardwert zu setzen. Wir fügen ein Feld `show_name` zur Konfiguration hinzu. Anschließend werden wir die Möglichkeit schaffen, diesen für ein Element oder einen Menüpunkt zu überschreiben.

[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/config.xml)

```xml
...
<field
  name="show_name"
  type="radio"
  label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
  default="1"
  class="switcher"
  >
  <option value="0">JHIDE</option>
  <option value="1">JSHOW</option>
</field>
...

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-262e27353fbe755d3813ea2df19cd0ed)

In dem Formular, mit dem wir ein Element bearbeiten, fügen wir eine Feld `params` hinzu. Hierin ist `show_name` ebenfalls konfigurierbar.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
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
  </fieldset>
</fields>
...

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-896f245bc8e493f91277fd33913ef974)

Damit bei einer neuen Installation die Spalte erstellt wird, in der die Parameter gespeichert werden, ergänzen wir die folgende SQL-Datei.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql
...
ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
```

#### [src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-19bf55010e1963bede0668355cebb307)

In der Klasse, die die Tabelle verwaltete, stellen sicher, dass die Parameter zusammen in der korrekten Form gespeichert werden.

[src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/src/Table/FooTable.php)

```php
...
	public function store($updateNulls = false)
	{
		if (is_array($this->params))
		{
			$registry = new Registry($this->params);
			$this->params = (string) $registry;
		}

		return parent::store($updateNulls);
	}
...
```

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-c77adeff4ff9e321c996e0e12c54b656)

Die View mischt die Daten zu den Parametern so zusammen, dass die Anzeige passt.

> In Joomla ist es üblich, dass die Einstellung beim Menüpunkt alles überschreibt. Falls es hier keinen Parameter gibt, zieht der Wert, der beim Element gespeichert wurde. Last but not least wird der Wert der Konfiguration herangezogen. Den aktiven Menüpunkt fragst du über `$active = $app->getMenu()->getActive();` ab.

Manchmal ist es intuitiver, die Anzeige beim Element als Prioriät zu verwenden. Dies habe ich hier so umgesetzt. `$state->get('params')` gibt den Wert an, der beim Menüpunkt gespeichert wurde. `$item->params` ist der Parameter, der beim Element gespeichert wurde. Der nachfolgende Code zeigt dir, wie du die beiden so mischst, dass der Wert beim Item Vorrang hat.

[src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/src/View/Foo/HtmlView.php)

```php
...
		$state = $this->State = $this->get('State');
		$params = $this->Params = $state->get('params');
		$itemparams = new Registry(json_decode($item->params));

		$temp = clone $params;

		$temp->merge($itemparams);
		$item->params = $temp;
...

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-a33732ebd6992540b8adca5615b51a1f)

Am Ende nutzen wir den Parameter im Template für die Anzeige. Wenn es den Parameter gibt und er so gesetzt ist, dass der Name angezeigt werden soll, dann wird dieser angezeigt. Das Label `$this->Params->get('show_foo_name_label')` wird ebenfalls nur dann angezeigt:

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.php)

```php
...
if ($this->item->params->get('show_name')) {

	if ($this->Params->get('show_foo_name_label')) {
		echo Text::_('COM_FOOS_NAME');
  }
}
...
```

#### [src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-35fa310ee8efa91ecb0e9f7c604d413f)

[https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml)

Damit es möglich ist, den Parameter beim Menüpunkt zu speichern, fügen wir ein Feld in der XML-Datei hinzu. Wichtig ist, dass es unter `fields` angeordnet wirde und `params` heißt!

```xml
...
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
  </fieldset>
</fields>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich. Beim Bearbeiten eines Items steht der Tabulator.

![Joomla! Published](/images/j4x22x1.png)

## Geänderte Dateien

### Übersicht
