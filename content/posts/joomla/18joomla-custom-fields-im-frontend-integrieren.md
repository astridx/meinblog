---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-03
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
#### components/com\_foos/ src/View/Foo/HtmlView.php

Eigene Felder zeigen im Frontend Daten mithilfe von Ereignisse an. Die benutzerdefinierten Felder werden an drei unterschiedlichen Stellen auf der Website angezeigt. Standardmäßig werden die Daten vor dem Content ausgegeben. Diese Einstellung ist änderbar. Deshalb speichern wir die Daten der Ereignisse `onContentAfterTitle`, `onContentBeforeDisplay` und `onContentAfterDisplay`. Dies erledigen wir in der `View`.

Konkret sorgen wir dafür, dass die Ereignisse<!-- \index{Ereignis!onContentAfterDisplay} --><!-- \index{Ereignis!onContentBeforeDisplay} --><!-- \index{Ereignis!onContentAfterTitle} --><!-- \index{Event!onContentAfterDisplay} --><!-- \index{Event!onContentBeforeDisplay} --><!-- \index{Event!onContentAfterTitle} -->

- [onContentAfterTitle](https://docs.joomla.org/Plugin/Events/Content#onContentAfterTitle)[^docs.joomla.org/plugin/events/content#oncontentaftertitle],
- [onContentBeforeDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay)[^docs.joomla.org/plugin/events/content#oncontentbeforedisplay] und
- [onContentAfterDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay)[^docs.joomla.org/plugin/events/content#oncontentafterdisplay]
  ausgelöst werden und das Ergebnis in einer Variablen gespeichert wird.

> Joomla setzt für die Ereignisbehandlung das [Beobachter-Entwurfsmuster](<https://de.wikipedia.org/wiki/Beobachter_(Entwurfsmuster)>)[^de.wikipedia.org/wiki/beobachter_(entwurfsmuster)] ein. Hierbei handelt es sich um ein Software-Entwurfsmuster, bei dem ein Objekt eine Liste seiner Abhängigen, die Beobachter genannt werden, unterhält und diese automatisch über Zustandsänderungen benachrichtigt, normalerweise durch den Aufruf einer ihrer Methoden.<!-- \index{Entwurfsmuster!Beobachter} -->

[components/com_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/blob/54b05b97d53ba27cb0a07f1c3f6ba5aa344e2750/src/components/com_foos/src/View/Foo/HtmlView.php)

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
#### components/com\_foos/ tmpl/foo/default.php

Im Template geben wir die eigenen Felder aus. In unserem Fall ist dieses nicht umfangreich, deshalb schreiben wir alle gespeicherten Texte hintereinander. In einer komplexeren Datei werden die Events an der passenden Stelle eingefügt.

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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Klicke auf den Menüpunkt `Fields` in diesem neuen Menü.

![Joomla Eigene Felder in eine eigene Komponente integrieren | Feld im Backend anlegen.](/images/j4x17x1.png)

3. Erstelle danach ein benutzerdefiniertes Feld vom Typ `Text` oder stelle sicher, dass das im vorherigen Kapitel erstellte benutzerdefinierte Feld veröffentlicht ist.

4. Edieren ein veröffentlichtes Foo-Item. Stelle sicher, dass du das Custom Field mit einem Wert versiehst.

![Joomla Eigene Felder in eine eigene Komponente integrieren | Feld im Backend mit einem Wert belegen.](/images/j4x18x1.png)

5. Öffne am Ende die Detailansicht des eben bearbeiteten Foo-Items. Du siehst jetzt zusätzlich den Text, den du im benutzerdefinierten Feld eingetragen hast.

![Joomla Eigene Felder in eine eigene Komponente integrieren | Wert des Feldes im Frontend anzeigen.](/images/j4x18x2.png)
<img src="https://vg08.met.vgwort.de/na/b28a1a8aaac2416a8a4a480959615bb6" width="1" height="1" alt="">
