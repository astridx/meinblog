---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-17
title: 'Custom Fields (Eigene Felder) im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-frontend-integrieren
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Die wenigsten nutzen eigene Felder ausschließlich im Administrationsbereich. In der Regel ist eine Ausgabe im Frontend erforderlich. Dieser Frage widmen wir uns im aktuellen Teil der Artikelserie. Wie und wo werden benutzerdefinierte Felder in Joomla im Frontend ausgegeben?<!-- \index{Eigene Felder!Frontend} --><!-- \index{Custom Fields!Frontend} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t14a...t14b)[^codeberg.org/astrid/j4examplecode/compare/t14a...t14b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommen keine neuen Dateien hinzu.

### Geänderte Dateien

<!-- prettier-ignore -->
#### components/com_foos/src/View/Foo/HtmlView.php

Eigene Felder zeigen im Frontend Daten mithilfe von Ereignisse an. Die benutzerdefinierten Felder werden an drei unterschiedlichen Stellen auf der Website angezeigt. Standardmäßig werden die Daten vor dem Content ausgegeben. Diese Einstellung ist änderbar. Deshalb speichern wir die Daten der Ereignisse `onContentAfterTitle`, `onContentBeforeDisplay` und `onContentAfterDisplay`. Dies erledigen wir in der `View`.

Konkret sorgen wir dafür, dass die Ereignisse<!-- \index{Ereignis!onContentAfterDisplay} --><!-- \index{Ereignis!onContentBeforeDisplay} --><!-- \index{Ereignis!onContentAfterTitle} --><!-- \index{Event!onContentAfterDisplay} --><!-- \index{Event!onContentBeforeDisplay} --><!-- \index{Event!onContentAfterTitle} -->

- [onContentAfterTitle](https://docs.joomla.org/Plugin/Events/Content#onContentAfterTitle)[^docs.joomla.org/Plugin/Events/Content#onContentAfterTitle],
- [onContentBeforeDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay)[^docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay] und
- [onContentAfterDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay)[^docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay] 
ausgelöst werden und das Ergebnis in einer Variablen gespeichert wird.

> Joomla setzt für die Ereignisbehandlung das [Beobachter-Entwurfsmuster](<https://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)>)[^de.wikipedia.org/wiki/beobachter_(Entwurfsmuster)] ein. Hierbei handelt es sich um ein Software-Entwurfsmuster, bei dem ein Objekt eine Liste seiner Abhängigen unterhält. Diese Abhängigen werden Beobachter genannt. Das Objekt benachrichtigt diese automatisch über Zustandsänderungen, normalerweise durch den Aufruf einer ihrer Methoden.<!-- \index{Entwurfsmuster!Beobachter} -->

[components/com_foos/src/View/Foo/HtmlView.php ](https://codeberg.org/astrid/j4examplecode/src/branch/t14b/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Factory;

 /**
  * HTML Foos View class for the Foo component
 class HtmlView extends BaseHtmlView
 	 */
 	public function display($tpl = null)
 	{
-		$this->item = $this->get('Item');
+		$item = $this->item = $this->get('Item');
+
+		Factory::getApplication()->triggerEvent('onContentPrepare', ['com_foos.foo', &$item, &$item->params]);
+
+		// Store the events for later
+		$item->event = new \stdClass;
+		$results = Factory::getApplication()->triggerEvent('onContentAfterTitle', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->afterDisplayTitle = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentBeforeDisplay', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->beforeDisplayContent = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentAfterDisplay', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->afterDisplayContent = trim(implode("\n", $results));

 		return parent::display($tpl);
 	}
```

Wunderst du dich, dass wir bei den Ereignis-Methoden 

- `onContentPrepare`, 
- `onContentAfterTitle`, 
- `onContentBeforeDisplay` und 
- `onContentAfterDisplay` 

`&$item->params` als Parameter setzen, obwohl wir `&$item->params` bisher nicht explizit in der Foo-Erweiterung implementiert haben? Implizit sorgt die Methode `populateState` der Datei `/components/com_foos/src/Model/FooModel.php` dafür, dass `&$item->params` zur Verfügung steht. Für unser Beispiel benötigen wir bisher diesen dritten Parameter nicht. Es kann aber sein, dass es in Kombination mit anderen Erweiterungen zu Fehlern kommt, wenn dieser nicht gesetzt ist. Deshalb setzen wir bei allen Ereignis-Methoden die drei Pflicht-Parameter `['com_foos.foo', &$item, &$item->params]` ein.

> Über `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay` werden, neben den eigenen Feldern andere Elemente ausgegeben, die dem jeweiligen Ereignis zugeordnet sind.

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/default.php

Im Template geben wir die eigenen Felder aus. In unserem Fall ist dieses nicht umfangreich, deshalb schreiben wir alle gespeicherten Texte hintereinander. In einer komplexeren Datei werden die Events an der passenden Stelle eingefügt.

[components/com_foos/tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t14b/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 }

 echo $this->item->name;
+
+echo $this->item->event->afterDisplayTitle;
+echo $this->item->event->beforeDisplayContent;
+echo $this->item->event->afterDisplayContent;

```

## Exkurs: Individuelle Positionierung

Benutzerdefinierte Felder können in eigenen Overrides beliebig positioniert werden.

### Aufruf eines Feldes in einem Override

Grundsätzlich stehen alle benutzerdefinierten Felder die dem aktuellen Element zugehören im Template `components/com_foos/tmpl/foo/default.php` zur Verfügung. Der Aufruf erfolgt über eine Eigenschaft der Variable `$this->item` mit dem Namen `jcfields`. Die Variable `$this->item->jcfields` ist ein Array, welcher beispielsweise die folgenden Daten pro Feld enthält:

```
stdClass Object
(
    [id] => 1
    [alias] => nina
    [publish_down] => 
    [publish_up] => 
    [published] => 0
    [state] => 0
    [catid] => 8
    [access] => 1
    [name] => Nina
    [params] => 
    [jcfields] => Array
        (
            [1] => stdClass Object
                (
                    [id] => 1
                    [title] => Text Custom Field
                    [name] => text-custom-field
                    ...
                )

        )

    [event] => stdClass Object
        (
            [afterDisplayTitle] => 
            [beforeDisplayContent] => 


        
        Text Custom Field: 
    Custom Field Value


            [afterDisplayContent] => 
        )

)
```

### Das Feld individuell rendern

Um das Feld im Template `components/com_foos/tmpl/foo/default.php` zu rendern, kann `FieldsHelper::render()` verwendet werden.

> Die Klasse `FieldsHelper` findest du in der Datei `administrator/components/com_fields/src/Helper/FieldsHelper.php`, falls du dir die Methode selbst genauer ansehen möchtest.

#### Ein einfaches Override

```php
<?php foreach ($this->item->jcfields as $field) : ?>
<?php echo $field->label . ':' . $field->value; ?>
<?php endforeach ?>
```

#### Override mithilfe von FieldsHelper

```php
<?php JLoader::register('FieldsHelper', JPATH_ADMINISTRATOR . '/components/com_fields/helpers/fields.php'); ?>
<?php foreach ($this->item->jcfields as $field) : ?>
<?php echo FieldsHelper::render($field->context, 'field.render', array('field' => $field)); ?>
<?php endforeach ?>
```

### Felder individuell laden

Um einzelne Felder zum Inhalt hinzuzufügen, wähle zunächst spezifische Namen für die benutzerdefinierten Felder aus. So ist es möglich mithilfe des Feldname das Feld im Override-Code zur Datei `components/com_foos/tmpl/foo/default.php` direkt anzusprechen. Setze im Joomla Backend die automatische Anzeige für das Feld auf `Nein`. So verhinderst du, dass es automatisch an einer der Standardpositionen angezeigt wird. Füge den folgenden Code am Anfang der Template-Datei `components/com_foos/tmpl/foo/default.php` oder deren Override ein, um den direkten Zugriff via Namen auf Felder in den Overrides zu verwenden. 

```php
<?php 
foreach($item->jcfields as $jcfield) {
  $item->jcFields[$jcfield->name] = $jcfield;
}
?>
```

Füge schließlich die Einfügeanweisung des Feldes an die Stelle ein, an der die Feldbezeichnung oder der Feld-Wert angezeigt werden soll. 

```php
<?php echo $item->jcFields['DEINFELDNAME']->label; ?>
<?php echo $item->jcFields['DEINFELDNAME']->value; ?>
``` 

> Weiterführende Informationen findest du in der Joomla Dokumentation[^docs.joomla.org/J3.x:Adding_custom_fields/Overrides/de]

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. 

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text` oder stelle sicher, dass das im vorherigen Kapitel erstellte benutzerdefinierte Feld veröffentlicht ist.

4. Edieren ein veröffentlichtes Foo-Item. Stelle sicher, dass du das Custom Field mit einem Wert versiehst.

![Joomla Eigene Felder in eine eigene Komponente integrieren | Feld im Backend mit einem Wert belegen.](/images/j4x18x1.png)

5. Öffne am Ende die Detailansicht des eben bearbeiteten Foo-Items. Lege hierfür einen Menüpunkt an. Du siehst jetzt zusätzlich den Text, den du im benutzerdefinierten Feld eingetragen hast.

![Joomla Eigene Felder in eine eigene Komponente integrieren | Wert des Feldes im Frontend anzeigen.](/images/j4x18x2.png)
<img src="https://vg08.met.vgwort.de/na/b28a1a8aaac2416a8a4a480959615bb6" width="1" height="1" alt="">
