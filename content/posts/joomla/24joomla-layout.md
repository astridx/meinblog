---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-08-02
title: 'Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-layout
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Manchmal ist es erforderlich, die Darstellung im Frontend unterschiedlich zu gestalten. Hierfür ist grundsätzlich das Template zuständig. Eine Komponente ist für die Ausgabe von Inhalten verantwortlich, nicht mehr und nicht weniger. Das Template sorgt für ein einheitliches Aussehen. Trotzdem gibt es Anwendungsfälle für unterschiedliche Layouts. Wie du diese für eine Ansicht einbaust, ist Thema des folgenden Artikels.<!-- \index{Layout} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t19...t20)[^codeberg.org/astrid/j4examplecode/compare/t19...t20] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Wir nutzen bereits Layouts. Das Empty-State-Layout (`administrator/components/com_foos/tmpl/foos/emptystate.php`)[^github.com/astridx/boilerplate/blob/t6b/src/administrator/components/com_foos/tmpl/foos/emptystate.php] ist ein Beispiel. In diesem Teil des Textes geht es darum, alle Schritte zur Integration eines Layouts zusammenhängend zu betrachten.

### Neue Dateien

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withhead.php

[components/com_foos/tmpl/foo/withhead.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withhead.php)

```php {numberLines: -2}
<?php
// https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withhead.php

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

echo "<hr>Hier kannst du einen Headertext anzeigen.<hr>";

if ($this->item->params->get('show_name')) {
	if ($this->params->get('show_foo_name_label')) {
		echo Text::_('COM_FOOS_NAME') . $this->item->name;
	} else {
		echo $this->item->name;
	}
}

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withhead.xml

[components/com_foos/tmpl/foo/withhead.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withhead.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withhead.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FOO_VIEW_WITHHEAD_TITLE">
		<message>
			<![CDATA[COM_FOOS_FOO_VIEW_WITHHEAD_DESC]]>
		</message>
	</layout>
	<!-- Add fields to the request variables for the layout. -->
	<fields name="request">
		<fieldset name="request"
			addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
		>
			<field
				name="id"
				type="modal_foo"
				label="COM_FOOS_SELECT_FOO_LABEL"
				required="true"
				select="true"
				new="true"
				edit="true"
				clear="true"
			/>
		</fieldset>
	</fields>
</metadata>

```

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/withheadandfoot.php

[components/com_foos/tmpl/foo/withheadandfoot.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/tmpl/foo/withheadandfoot.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t24/src/components/com_foos/tmpl/foo/withheadandfoot.php

<?php

\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

echo "<hr>Hier kannst du einen Headertext anzeigen.<hr>";

if ($this->item->params->get('show_name')) {
	if ($this->Params->get('show_foo_name_label')) {
		echo Text::_('COM_FOOS_NAME') . $this->item->name;
	} else {
		echo $this->item->name;
	}
}

echo "<hr>Hier kannst du eine Fußzeile anzeigen.<hr>";

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/forms/foo.xml

Im Formular des Elements ergänzen wir ein Feld zum Auswählen des Layouts.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 				<option value="0">JHIDE</option>
 				<option value="1">JSHOW</option>
 			</field>
+
+			<field
+				name="foos_layout"
+				type="componentlayout"
+				label="JFIELD_ALT_LAYOUT_LABEL"
+				class="custom-select"
+				extension="com_foos"
+				view="foo"
+				useglobal="true"
+			/>
 		</fieldset>
 	</fields>
 </form>

```

<!-- prettier-ignore -->
#### components/com_foos/src/Model/FooModel.php

So etwas passiert beim Entwickeln. Im Grunde genommen müssten wir die Datei `components/com_foos/src/Model/FooModel.php` nicht ändern. In diesem Kapitel ist mir aufgefallen, dass ein `use`-Eintrag fehlt. Deshalb erfolgt doch eine Änderung.

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;
+use Joomla\CMS\Language\Text;

 /**
  * Foo model for the Joomla Foos component.

```

<!-- prettier-ignore -->
#### components/com_foos/src/View/Foo/HtmlView.php

Im Falle eines Menüpunktes finde ich es wichtig, dass dieser - beziehungsweise der Inhalt und das Design- immer einheitlich angezeigt werden. Deshalb fragen wir den aktiven Menüpunkt ab. Werden beispielsweise Elemente über eine Kategorie-Ansicht angezeigt, dann ist mithilfe dieser Information ein einheitliches Layout möglich. Wird der Content als einzelnes Element angezeigt kann auf ein anderes Layout zurückgegriffen werden.

[components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t20/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 		$temp->merge($itemparams);
 		$item->params = $temp;

+		$active = Factory::getApplication()->getMenu()->getActive();
+
+		// Override the layout only if this is not the active menu item
+		// If it is the active menu item, then the view and item id will match
+		if ((!$active) || ((strpos($active->link, 'view=foo') === false) || (strpos($active->link, '&id=' . (string) $this->item->id) === false)))
+		{
+			if (($layout = $item->params->get('foos_layout')))
+			{
+				$this->setLayout($layout);
+			}
+		}
+		elseif (isset($active->query['layout']))
+		{
+			// We need to set the layout in case this is an alternative menu item (with an alternative layout)
+			$this->setLayout($active->query['layout']);
+		}
+
 		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

 		// Store the events for later

```

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut. In einem frisch installierten System ist die Erklärung der Layouts unkomplizierter.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Stelle bei einem Item ein spezielles Layout ein. Ich habe `withhead` bei dem Item mit der ID 2 gesetzt.

![Joomla Layouts](/images/j4x24x1.png)

3. Sie dir die Ausgabe im Frontend an. Gibt dazu die URL `JOOMLA4/?option=com_foos&id=2&view=foo` in der Adresszeile des Browsers ein. Du siehst das ausgewählte Layout. Überzeuge dich davon, dass die Eingabe von `JOOMLA4/?option=com_foos&id=1&view=foo` das Standardlayout aufruft - sofern kein spezielles eingestellt ist.

4. Dieses Layout ist ebenfalls per Menüpunkt ansteuerbar.

![Joomla Layouts](/images/j4x24x2.png)

> Ein Item ohne XML-Datei ist nicht im Administrationsbereich auswählbar. Trotzdem sind solche Layouts sinnvoll! Im Programmcode ist es an jeder Stelle möglich, dieses zuzuweisen: `$this->setLayout('withheadandfoot');`

> Da bei der Ansteuerung über einen Menüpunkt die Ansicht einheitlich erwartet wird, wird das im Menüitem eingestellte Layout bevorzugt.

<img src="https://vg08.met.vgwort.de/na/bd940f8807134f77a057676ee2990dcc" width="1" height="1" alt="">
