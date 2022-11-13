---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-07-31
title: 'Konfiguration'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-konfiguration
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Gibt es Dinge, die du konfigurierbar anzubieten planst? Dann ist dieser Teil wichtig für dich. Hier zeige ich dir, wie du eine Konfiguration auf die Joomla typische Art und Weise zu deiner Komponente hinzufügst. Wir erstellen die globale Konfiguration für unsere Komponente!<!-- \index{Konfiguration (globale)} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t8...t9)[^codeberg.org/astrid/j4examplecode/compare/t8...t9] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/config.xml]

Zu unseren Dateien hinzu kommt die Datei `config.xml`. Diese implementiert die Konfigurations-Parameter. In der XML-Datei kannst du wie gewohnt auf alle [Standard-Formular-Feldtypen](https://docs.joomla.org/Form_field/de)[^docs.joomla.org/form_field/de] zurückgreifen oder analog des bereits erstellten Modalfeldes FieldFoo eigene Typen implementieren.

Wir verwenden ein Auswahlfeld vom Typ `type="list"`. Die Übersetzungsarbeit minimieren wir, indem wir die globalen Sprachstrings `JNO` und `JYES` einsetzten. Alle Texte, die Joomla in der Datei `language/en-GB/joomla.ini` übersetzt, sind global verwendbar.

[administrator/components/com_foos/config.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t9/src/administrator/components/com_foos/config.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t9/src/administrator/components/com_foos/config.xml -->

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

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

Die Ergänzung in der Datei `foos.xml` stellt sicher, dass die Datei `config.xml` bei der Installation kopiert wird und Joomla so später auf sie zugreifen kann.

[administrator/components/com_foos/ foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t9/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
+			<filename>config.xml</filename>
 			<folder>forms</folder>
 			<folder>language</folder>
 			<folder>services</folder>

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

Die Zeile `$toolbar->preferences('com_foos');` sorgt dafür, dass im Administrationsbereich rechts oben die Schaltfäche `Optionen` eingefügt wird. So ist die Konfiguration später im Backend unkompliziert erreichbar.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t9/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

 		$toolbar->addNew('foo.add');
+
+		$toolbar->preferences('com_foos');
 	}

 }

```

<!-- prettier-ignore -->
#### components/com\_foos/src/Model/FooModel.php

Die `populateState`-Methode stellt sicher, dass das `State`-Objekt korrekt befüllt und für den gesamten Code zugänglich ist. Wir ergänzen hier für den Site-Bereich den neuen Parameter.

`populateState()` wird automatisch aufgerufen, wenn wir `getState()` zum ersten Mal verwenden. Wenn wir etwas Besonderes in der Methode benötigen, überschreiben wir sie im eigenen Modell - so wie im folgenden Code-Beispiel.

> Vielleicht fragst du dich, welche `populateState()`-Methode aufgerufen wird, wenn in der eigenen Erweiterung nichts implementiert ist. Ganz einfach: `FooModel` (`components/com_foos/src/Model/FooModel.php`) erweitert `BaseDatabaseModel` (`libraries/src/MVC/Model/BaseDatabaseModel.php`), diese wiederum erweitert `BaseModel` (`libraries/src/MVC/Model/BaseModel.php`). Letztere implementiert `StateBehaviorTrait` (`libraries/src/MVC/Model/StateBehaviorTrait.php`) in welchem du die Methode `protected function populateState() {}` findest. Die ist zwar leer und bewirkt so nichts. Aber: Sie ist aufrufbar. Es ist extrem hilfreich immer mal wieder solchen Fragen nachzugehen. So lernt man Joomla kennen.

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t9/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 		return $this->_item[$pk];
 	}
+
+	protected function populateState()
+	{
+		$app = Factory::getApplication();
+
+		$this->setState('foo.id', $app->input->getInt('id'));
+		$this->setState('params', $app->getParams());
+	}
 }

```

<!-- prettier-ignore -->
#### components/com\_foos/ tmpl/foo/default.php

Zum Schluss ersetzen wir `echo Text::_('COM_FOOS_NAME') . $this->item->name;`. Wir zeigen das Label nur an, wenn im Status der Parameter auf `true` oder `1` gesetzt ist.

[components/com_foos/ tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t9/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 use Joomla\CMS\Language\Text;

-echo Text::_('COM_FOOS_NAME') . $this->item->name;
+if ($this->get('State')->get('params')->get('show_foo_name_label'))
+{
+	echo Text::_('COM_FOOS_NAME');
+}
+
+echo $this->item->name;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und überzeuge dich davon, dass dir rechts oben die Schaltfläche `Options` angezeigt wird.

![Joomla Konfiguration - Schaltfläche im Backend](/images/j4x11x1.png)

3. Klicke auf `Options` und stelle die Anzeige des Labels nach deinen wünschen ein.

![Joomla Konfiguration - Ansicht der globalen Konfiguration](/images/j4x11x2.png)

4. Öffne zuletzt, die Ansicht im Frontend. Verhält die Anzeige des Labels sich so, wie du das im Administrationsbereich eingestellt hast?

![Joomla Konfiguration - Frontend](/images/j4x11x3.png)
<img src="https://vg08.met.vgwort.de/na/78d4c9aec3784cf3bbaea85063d1e9c6" width="1" height="1" alt="">
