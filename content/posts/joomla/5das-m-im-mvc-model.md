---
date: 2019-12-05
title: 'Das M im MVC: Model'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: das-m-im-mvc-model
categories:
  - Code
tags:
  - CMS
  - Joomla
---

In diesem Teil kommt keine neue Funktion hinzu. Wir bessern den bisherigen Aufbau. Jede Web-Anwendung besteht aus Eingaben, Daten und der Darstellung.
Problematisch wäre es vor allem bei größeren Projekten die drei Elemente in einer Klasse zusammenzufassen. Joomla! verwendet das Model-View-Controller-Konzept für die Aufteilung. In diesem Tutorial-Teil fügen wir ein Model zum Frontend hinzu.
Das Model-Objekt ist für die Daten und deren Verarbeitung verantwortlich.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t3...t4) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-599caddf64a6ed0c335bc9c9f828f029)

Beim Model ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du erweiterst die Joomla Klasse `BaseDatabaseModel`. Implementiere dann nur das, was du anders einsetzt. In unserem Fall es die Ausgabe `$this->message = 'Hello Foo!';` für die wir die Methode `getMsg()` erstellen.

[src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/src/Model/FooModel.php)

```php
<?php
namespace Joomla\Component\Foos\Site\Model;

\defined('_JEXEC') or die

use Joomla\CMS\MVC\Model\BaseDatabaseModel;

class FooModel extends BaseDatabaseModel
{
	protected $message;

	public function getMsg()
	{
		if (!isset($this->message))
		{
			$this->message = 'Hello Foo!';
		}

		return $this->message;
	}
}
```

### Geänderte Dateien

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-c77adeff4ff9e321c996e0e12c54b656)

Die Daten des Models holen wir uns in der View mit `$this->msg = $this->get('Msg');`. Das wirkt hier umständlich, in komplexen Anwendungen hat sich diese Verfahrensweise bewährt. Die Datenberechnung geschieht im Model. Die Gestaltung der Ansicht mithilfe der berechneten Daten übernimmt die View.

[src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/src/View/Foo/HtmlView.php)

```php
	...
	public function display($tpl = null)
	{
		$this->msg = $this->get('Msg');

		return parent::display($tpl);
	}
	...

```

> Unter Umständen verwirrt dich der Aufruf `$this->get('Msg');` genauso wie mich, als ich Joomla das erste Mal nutzte. Die Methode im Model heißt `getMsg()`, du rufst die aber über `get('Msg')` auf. Das passt nicht. Wenn du dich vorher schon mit objektorientierter Programmierung befasst hast, dann bist du versucht, den Aufruf über `getMsg()` zu tätigen. Verwendest du Joomla, hast du es leichter, wenn du die Dinge so nutzt, wie es für dich vorbereitet ist. [Getter](https://de.wikipedia.org/w/index.php?title=Zugriffsfunktion&oldid=196247734) im Model rufst du über die Methode `get()` mit dem entsprechenden Parameter auf.

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-a33732ebd6992540b8adca5615b51a1f)

Über das Template geben wir die Daten aus. Hier wird später alles richtig in HTML-Tags verpackt.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/tmpl/foo/default.php)

```php
...
Hello Foos: <?php echo $this->msg;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Sieh dir die Frontendansicht deiner Komponente an. Die Daten für die Ausgabe werden vom Model erzeugt.

![Joomla Model im Frontend](/images/j4x5x1.png)

## Geänderte Dateien

### Übersicht
