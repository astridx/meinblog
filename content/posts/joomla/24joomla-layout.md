---
date: 2019-12-24
title: 'Layout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-layout
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Manchmal ist es erforderlich, die Darstellung im Frontend unterschiedlich zu gestalten. Hierfür ist grundsätzlich das Template zuständig. Eine Erweiterung ist für die Ausgabe von Inhalten verantwortlich, nicht mehr und nicht weniger. Trotzdem gibt es Anwendungsfälle für unterschiedliche Layouts. Wie du diese für eine Ansicht einbaust, ist Thema des folgenden Artikels.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t19...t20) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

####  [src/components/com_foos/tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-cf093e47c9ffd0b7b3b78ec39042ac8f)

[src/components/com_foos/tmpl/foo/withhead.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.php)

```php
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

echo $this->item->event->afterDisplayTitle; 
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

####  [src/components/com_foos/tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-7176b16bc7f23a2478b1d0755d568b83)

[src/components/com_foos/tmpl/foo/withhead.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withhead.xml)

```xml
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
			addfieldprefix="Joomla\Component\Foos\Administrator\Field"
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

#### [src/components/com_foos/tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-51b2e02f000a9a06e0fc5a6cfd9456c9)

[src/components/com_foos/tmpl/foo/withheadandfoot.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/tmpl/foo/withheadandfoot.php)

```php
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

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t19...t20#diff-262e27353fbe755d3813ea2df19cd0ed)

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/administrator/components/com_foos/forms/foo.xml)

```
<field
  name="foos_layout"
  type="componentlayout"
  label="JFIELD_ALT_LAYOUT_LABEL"
  class="custom-select"
  extension="com_foos"
  view="foo"
  useglobal="true"
/>

```

####  [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t19...t20#diff-c77adeff4ff9e321c996e0e12c54b656)

Im Falle eines Menüpunktes finde ich es wichtig, dass dieser immer einheitlich angezeigt wird. Deshalb fragen wir hier den aktiven Menüpunkt ab. Das Element könnte ja auch über eine Kategorieansicht angezeigt werden.

[src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/b1e4db8fff80c5f4ebb8e1924ece0300aa760119/src/components/com_foos/src/View/Foo/HtmlView.php)

```php
...
$active = Factory::getApplication()->getMenu()->getActive();

if ((!$active) || ((strpos($active->link, 'view=foo') === false) || (strpos($active->link, '&id=' . (string) $this->item->id) === false)))
{
  if (($layout = $item->params->get('foos_layout')))
  {
    $this->setLayout($layout);
  }
}
elseif (isset($active->query['layout']))
{
  $this->setLayout($active->query['layout']);
}
...

```

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut. In einem frisch installierten System ist die Erklärung der Layouts unkomplizierter.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Stelle bei einem Item ein spezielles Layout ein. Ich habe `withhead` bei dem Item mit der ID 2 gesetzt.

![Joomla! Layouts](/images/j4x24x1.png)

3. Sie dir die Ausgabe im Frontend an. Gibt dazu die URL `JOOMLA4/?option=com_foos&id=2&view=foo` in der Adresszeile des Browsers ein. Du siehst das ausgewählte Layout. Überzeuge dich davon, dass die Eingabe von `JOOMLA4/?option=com_foos&id=1&view=foo` das Standardlayout aufruft - sofern kein spezielles eingestellt ist.

4. Dieses Layout ist ebenfalls per Menüpunkt ansteuerbar.

![Joomla! Pagination](/images/j4x24x2.png)

> Ein Item ohne XML-Datei ist nicht im Administrationsbereich auswählbar. Trotzdem sind solche Layouts sinnvoll! Im Programmcode ist es an jeder Stelle möglich, dieses zuzuweisen: `$this->setLayout('withheadandfoot');`

> Da bei der Ansteuerung über einen Menüpunkt die Ansicht einheitlich erwartet wird, wird das im Menüitem eingestellte Layout bevorzugt.

### Übersicht
