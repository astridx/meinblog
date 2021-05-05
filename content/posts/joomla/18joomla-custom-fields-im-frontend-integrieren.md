---
date: 2020-12-18
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Custom Fields (Benutzerdefinierte Felder) im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-frontend-integrieren
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Die wenigsten nutzen benutzerdefinierten Felder alleine im Administrationsbereich. In der Regel ist eine Ausgabe im Frontend erforderlich. Dieser Frage widmen wir uns im aktuellen Teil der Artikelserie. Wie und wo werden benutzerdefinierten Felder in Joomla im Frontend ausgegeben?

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14a...t14b)[^github.com/astridx/boilerplate/compare/t14a...t14b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree14b.png)

### Neue Dateien

In diesem Kapitel kommen keine neuen Dateien hinzu.

### Geänderte Dateien

#### [components/com_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-02a4c6dd3e5ef61740a32d58e2b6a7fbcbeb430b6b03e3f740934fa296fc0c82)

Custom Fields zeigen im Frontend Daten mithilfe von Ereignisse an. Die benutzerdefinierten Felder werden an drei unterschiedlichen Stellen auf der Website angezeigt. Standardmäßig werden die Daten vor dem Content ausgegeben. Diese Einstellung ist änderbar. Deshalb speichern wir die Ergebnisse von `onContentAfterTitle`, `onContentBeforeDisplay` und `onContentAfterDisplay`. Dies erledigen wir in der `View`.

Konkret sorgen wir dafür, dass die Ereignisse

- [onContentAfterTitle](https://docs.joomla.org/Plugin/Events/Content#onContentAfterTitle),
- [onContentBeforeDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay) und
- [onContentAfterDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay)
  ausgelöst werden und das Ergebnis in einer Variablen gespeichert wird.

[components/com_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/blob/54b05b97d53ba27cb0a07f1c3f6ba5aa344e2750/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Factory;

 /**
  * HTML Foos View class for the Foo component

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

```

> Über `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay` werden, neben den benutzerdefinierten Felder andere Elemente ausgegeben, die dem jeweiligen Ereignis zugeordnet sind.

#### [components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-11c9422cefaceff18372b720bf0e2f8fb05cda454054cd3bc38faf6a39e4f7d6)

Im Template geben wir die benutzerdefinierten Felder aus. In unserem Fall ist dieses nicht umfangreich, deshalb schreiben wir alle gespeicherten Texte hintereinander. In einer komplexeren Datei wir die Anweisung an der passenden Stelle eingefügt.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/6f52944757be5b7839c787338dc81932d7d25b59/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 }

 echo $this->item->name;
+
+echo $this->item->event->afterDisplayTitle;
+echo $this->item->event->beforeDisplayContent;
+echo $this->item->event->afterDisplayContent;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text` oder stelle sicher, dass das im vorherigen Kapitel erstellte benutzerdefinierte Feld veröffentlicht ist.

4. Edieren ein veröffentlichtes Foo-Item. Stelle sicher, dass du das Custom Field mit einem Wert versiehst.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

5. Öffne am Ende die Detailansicht des eben bearbeiteten Foo-Items. Du siehst jetzt zusätzlich den Text, den du im benutzerdefinierten Feld eingetragen hast.

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x18x2.png)
