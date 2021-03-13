---
date: 2020-12-24
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-layout
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Manchmal ist es erforderlich, die Darstellung im Frontend unterschiedlich zu gestalten. Hierfür ist grundsätzlich das Template zuständig. Eine Komponente ist für die Ausgabe von Inhalten verantwortlich, nicht mehr und nicht weniger. Das Template sorgt für ein einheitliches Aussehen. Trotzdem gibt es Anwendungsfälle für unterschiedliche Layouts. Wie du diese für eine Ansicht einbaust, ist Thema des folgenden Artikels.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t19...t20) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [components/com_foos/tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-cf093e47c9ffd0b7b3b78ec39042ac8f)

[components/com_foos/tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.php)

```php {numberLines: -2}
<?php
// https://raw.githubusercontent.com/astridx/boilerplate/85d92ab0e9f18bfb01341ffec184818b0a2f5545/src/components/com_foos/tmpl/foo/withhead.php

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

echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

#### [components/com_foos/tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-7176b16bc7f23a2478b1d0755d568b83)

[components/com_foos/tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/85d92ab0e9f18bfb01341ffec184818b0a2f5545/src/components/com_foos/tmpl/foo/withhead.xml -->

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

#### [components/com_foos/tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-51b2e02f000a9a06e0fc5a6cfd9456c9)

[components/com_foos/tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withheadandfoot.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/85d92ab0e9f18bfb01341ffec184818b0a2f5545/src/components/com_foos/tmpl/foo/withheadandfoot.php

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

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-262e27353fbe755d3813ea2df19cd0ed)

Im Formular des Elements ergänzen wir ein Feld zum Auswählen des Layouts.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/administrator/components/com_foos/forms/foo.xml)

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

#### [components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/85d92ab0e9f18bfb01341ffec184818b0a2f5545/src/components/com_foos/src/Model/FooModel.php)

So etwas passiert beim Entwickeln. Im Grunde genommen müssten wir die Datei `components/com_foos/src/Model/FooModel.php` nicht ändern. In diesem Kapitel ist mir aufgefallen, dass ein `use`-Eintrag fehlt. Deshalb erfolgt doch eine Änderung.

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-0e3fb820d763e729d9d47b22936ce4bdba051e8494fe32f68ae7f7c939103cb8)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;
+use Joomla\CMS\Language\Text;

 /**
  * Foo model for the Joomla Foos component.

```

#### [components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-c77adeff4ff9e321c996e0e12c54b656)

Im Falle eines Menüpunktes finde ich es wichtig, dass dieser - beziehungsweise der Inhalt - immer einheitlich angezeigt wird. Deshalb fragen wir den aktiven Menüpunkt ab. Werden beispielsweise Elemente über eine Kategorie-Ansicht angezeigt, dass ist ein einheitliches Layout möglich. Wird der Content als einzelnes Element angezeigt kann auf ein anderes Layout zurückgegriffen werden.

[components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/src/View/Foo/HtmlView.php)

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

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t19...t20.diff

## Links
