---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-08-03
title: 'Hilfe'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-hilfe
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Eine selbsterklärende Software ist ideal. Aber welches Programm ist das schon? Eine Hilfe ist aus diesem Grund immer eine sinnvolle Ergänzung. Je nach System sind Hilfeseiten nicht sofort auffindbar oder sogar versteckt. Joomla bietet hierfür eine einheitliche Vorgehensweise. <!-- \index{Hilfe-Seite} -->

Zum einen gibt es eine in jeder Komponente an gleicher Stelle platzierte Schaltfläche, über die eine externe Hilfeseite aufgerufen wird.

![Joomla Hilfelink in der Listenansicht](/images/j4x27x1.png)

Zusätzlich ist es möglich, neben den Feldern in Formularen Erklärungen einzublenden. Seit Joomla 4.1 sind diese Erklärungen der besseren Übersicht halber ein- und ausblendbar. Diese Funktion wurde mit [PR 35610](https://github.com/joomla/joomla-cms/pull/35610/)[^github.com/joomla/joomla-cms/pull/35610/] eingeführt und _Inline-Hilfe_ genannt.<!-- \index{Inline-Hilfe} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t22...t23)[^codeberg.org/astrid/j4examplecode/compare/t22...t23] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Als erstes ist erforderlich, dass du die Hilfeseiten für deine Erweiterung erstellst und online erreichbar speicherst. Vielleicht magst du dich im Aufbau deiner individuellen Hilfeseiten an den Joomla eigenen orientieren.

> Die Joomla eigenen Hilfeseiten findest du unter der Adresse [help.joomla.org/proxy](https://help.joomla.org/proxy)[^help.joomla.org/proxy] im Internet. Eine Beispielseite wäre [help.joomla.org/proxy?keyref=Help40:Articles&lang=en](https://help.joomla.org/proxy?keyref=Help40:Articles&lang=en). Hierbei steht `help.joomla.org/proxy` für die Basisadresse und `?keyref=Help40:Articles&lang=en` adressiert die konkrete Unterseite.

### Neue Dateien

In diesem Kapitel werden ausschließlich Dateien geändert.

### Geänderte Dateien

Zwei Zeilen pro Ansicht reichen aus, um rechts oben auf den Seiten des Administrationsbereichs eine Schaltfläche anzuzeigen, die ein Fragezeichen als Icon enthält und eine im Code festgelegte Internetadresse als Link-Ziel hat. Ich habe `http://example.org` als Beispiel gewählt. Das Prinzip ist klar. Du hast die Möglichkeit für jede `View` eine separate Hilfedatei anzulegen und in der Ansicht der Komponente zu verlinken - genau da, wo in der Regel Fragen auftauchen.
Und eine weitere Zeile reicht aus, um Beschreibungen in Inline-Hilfen zu verwandeln, also ein- und ausblendbar zu gestalten.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/config.xml

Im Formular für die Anzeige der Optionen ergänzen wir beispielhaft eine Beschreibung. Diese wird später als Inline-Hilfe ein- beziehungsweise ausgeblendet.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t23/src/administrator/components/com_foos/config.xml)

```php {diff}

<?xml version="1.0" encoding="utf-8"?>
 <config>
+       <inlinehelp button="show"/>
        <fieldset
                name="foo"
                label="COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY"
                        name="show_foo_name_label"
                        type="list"
                        label="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL"
+                       description="COM_FOOS_FIELD_FOO_SHOW_CATEGORY_DESC"
                        default="1"
                        >
                        <option value="0">JNO</option>
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/forms/foo.xml

Im Formular zum Item ergänzen wir beispielhaft eine Beschreibung. Diese wird später als Inline-Hilfe ein- beziehungsweise ausgeblendet.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t23/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 <?xml version="1.0" encoding="utf-8"?>
 <form>
+       <config>
+               <inlinehelp button="show"/>
+       </config>
        <fieldset 
                addruleprefix="FooNamespace\Component\Foos\Administrator\Rule"

			validate="Letter"
 			class="validate-letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
+			description="COM_FOOS_FIELD_NAME_DESC"
 			size="40"
 			required="true"
 		 />
```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foo/HtmlView.php

Der Toolbar-Helfer unterstützt uns. Die Zeile `ToolbarHelper::divider();` sorgt dafür, dass die nachfolgenden Schaltflächen rechtsbündig dargestellt werden. `ToolbarHelper::inlinehelp();` fügt die Schaltfläche ein, die die Inlinehilfe ein- und ausblendet. Der Text hiefür wird hinter `description=` im Formular beim Feld gesucht. `ToolbarHelper::help('', false, 'http://example.org');` fügt die Schaltfläche ein, die zur externen Hilfeseite weiterleitet. Die Adresse der externen Seite, hier im Beispiel `http://example.org`, wird als Parameter mitgegeben.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t23/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}


 			ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
 		}
+
+		ToolbarHelper::divider();
+		ToolbarHelper::inlinehelp();
+		ToolbarHelper::help('', false, 'http://example.org');
 	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

Das gleiche was ich unter `administrator/components/com_foos/ src/View/Foos/HtmlView.php` geschrieben habe trifft auch hier zu.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t23/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 		if ($user->authorise('core.admin', 'com_foos') || $user->authorise('core.options', 'com_foos')) {
 			$toolbar->preferences('com_foos');
 		}
+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
 	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

In der Templatedatei `administrator/components/com_foos/ tmpl/foo/edit.php` laden wir das erforderliche JavaScript.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://codeberg.org/astrid/j4examplecode/src/branch/t23/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
        ->useScript('form.validate')
+       ->useScript('inlinehelp')
        ->useScript('com_foos.admin-foos-letter');
 
 $isModal = $input->get('layout') === 'modal';
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf die Hilfschaltfläche und vergewissere dich davon, dass du zu der von dir eingegebenen Website weitergeleitet wirst.

![Joomla Schaltfläche mit Link zur Hilfeseite in der Detailansicht](/images/j4x27x2.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und klicke mehrmals hintereinander auf die Schaltfläche Inline-Hilfe. Vergewissere dich davon, dass alle Texte, die als Beschreibung bei einem Feld vorhanden sind, ein- und ausgeblendet werden.

![Joomla Inline-Hilfe Toggle Schaltfläche in der Detailansicht](/images/j4x27x3.png)
<img src="https://vg08.met.vgwort.de/na/eab5f11b0c6e466e8e709ae5032bf209" width="1" height="1" alt="">
