---
date: 2019-12-18
title: 'Custom Fields im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-frontend-integrieren
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Die wenigsten benutzerdefinierten Felder leben alleine im Administrationsbereich. In der Regel ist eine Ausgabe im Frontend erforderlich. Dieser Frage widmen wir uns im aktuellen Teil der Artikelserie.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14a...t14b) an und übernimm diese Änderungen in deine Entwicklungsversion.

```php {numberLines diff}
// https://github.com/astridx/boilerplate/compare/t14a...t14b.diff

diff --git a/src/components/com_foos/src/View/Foo/HtmlView.php b/src/components/com_foos/src/View/Foo/HtmlView.php
index c345c5e6..c0bc3df6 100644
--- a/src/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/components/com_foos/src/View/Foo/HtmlView.php
@@ -12,6 +12,7 @@
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Factory;

 /**
  * HTML Foos View class for the Foo component
@@ -37,7 +38,20 @@ class HtmlView extends BaseHtmlView
 	 */
 	public function display($tpl = null)
 	{
-		$this->item = $this->get('Item');
+		$item = $this->item = $this->get('Item');
+
+		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));
+
+		// Store the events for later
+		$item->event = new \stdClass;
+		$results = Factory::getApplication()->triggerEvent('onContentAfterTitle', array('com_foos.foo', &$item, &$item->params));
+		$item->event->afterDisplayTitle = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentBeforeDisplay', array('com_foos.foo', &$item, &$item->params));
+		$item->event->beforeDisplayContent = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentAfterDisplay', array('com_foos.foo', &$item, &$item->params));
+		$item->event->afterDisplayContent = trim(implode("\n", $results));

 		return parent::display($tpl);
 	}
diff --git a/src/components/com_foos/tmpl/foo/default.php b/src/components/com_foos/tmpl/foo/default.php
index 87f2a1a2..c5fac408 100644
--- a/src/components/com_foos/tmpl/foo/default.php
+++ b/src/components/com_foos/tmpl/foo/default.php
@@ -16,3 +16,7 @@
 }

 echo $this->item->name;
+
+echo $this->item->event->afterDisplayTitle;
+echo $this->item->event->beforeDisplayContent;
+echo $this->item->event->afterDisplayContent;

```

## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommen keine neuen Dateien hinzu

### Geänderte Dateien

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-c77adeff4ff9e321c996e0e12c54b656)

Die benutzerdefinierten Felder werden mithilfe von Ereignissen an drei unterschiedlichen Stellen auf der Website angezeigt. Standardmäßig wird es vor dem Content ausgegeben. Diese Einstellung ist änderbar. Deshalb speichern wir die Ergebnisse von `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay`. Dies erledigen wir in der View.

> Über `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay` werden, neben den benutzerdefinierten Felder andere Elemente ausgegeben, die dem jeweiligen Ereignis zugeordnet sind.

[src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/6f52944757be5b7839c787338dc81932d7d25b59/src/components/com_foos/src/View/Foo/HtmlView.php)

```php
...
public function display($tpl = null)
{
  $item = $this->item = $this->get('Item');

  Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

  $item->event = new \stdClass;
  $results = Factory::getApplication()->triggerEvent('onContentAfterTitle', array('com_foos.foo', &$item, &$item->params));
  $item->event->afterDisplayTitle = trim(implode("\n", $results));

  $results = Factory::getApplication()->triggerEvent('onContentBeforeDisplay', array('com_foos.foo', &$item, &$item->params));
  $item->event->beforeDisplayContent = trim(implode("\n", $results));

  $results = Factory::getApplication()->triggerEvent('onContentAfterDisplay', array('com_foos.foo', &$item, &$item->params));
  $item->event->afterDisplayContent = trim(implode("\n", $results));

  return parent::display($tpl);
}
...

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-a33732ebd6992540b8adca5615b51a1f)

Im Template geben wir die benutzerdefinierten Felder aus. Dieses ist nicht umfangreich, deshalb schreiben wir alle gespeicherten Texte hintereinander. In einer komplexeren Datei wir die Anweisung an der passenden Stelle eingefügt.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/6f52944757be5b7839c787338dc81932d7d25b59/src/components/com_foos/tmpl/foo/default.php)

```
...
echo $this->item->event->afterDisplayTitle;
echo $this->item->event->beforeDisplayContent;
echo $this->item->event->afterDisplayContent;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text`, falls du dies nicht im vorherigen Kapitel erledigt hast.

4. Edieren ein veröffentlichtes Foo-Item. Stelle sicher, dass du das Custom Field mit einem Wert versiehst.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

5. Öffne am Ende die Detailansicht des eben bearbeiteten Foo-Items. Du siehst neben den vorher vorhanden Werten jetzt zusätzlich den Text, den du im benutzerdefinierten Feld eingetragen hast.

![Joomla! Custom Fields in eine eigene Komponente integrieren](/images/j4x18x2.png)

## Geänderte Dateien

### Übersicht
