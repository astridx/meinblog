---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-07-21
title: 'Das M im MVC: Model'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: das-m-im-mvc-model
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











In diesem Teil kommt keine neue Funktionalität hinzu. Wir verbessern den bisherigen Aufbau. Eine Web-Anwendung besteht in der Regel aus

- Logik,
- Daten und
- der Darstellung.<!-- \index{Model-View-Controller} -->

Problematisch ist es, diese drei Elemente in einer Klasse zusammenzufassen. Vor allem bei größeren Projekten. Joomla verwendet zur Abgrenzung das [Model-View-Controller-Konzept (MVC)](https://de.wikipedia.org/wiki/Model_View_Controller)[^de.wikipedia.org/wiki/model_view_controller]. In diesem Tutorial-Teil fügen wir ein Model zum Frontend hinzu. Das Model-Objekt ist für die Daten und deren Verarbeitung verantwortlich.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t3...t4)[^codeberg.org/astrid/j4examplecode/compare/t3...t4] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### components/com_foos/src/Model/FooModel.php

Beim Model ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du erweiterst die Joomla Klasse `BaseDatabaseModel`. Implementiere dann nur das, was du speziell einsetzt. In unserem Fall ist es die Ausgabe `$this->message = 'Hello Foo!';`, für die wir die Methode `getMsg()` erstellen.

> Die Model-Klassen, die als Elternklasse von Joomla zur Verfügung stehen, findest du im Verzeichnis `libraries/src/MVC/Model/`. `BaseDatabaseModel` ist in der Datei `libraries/src/MVC/Model/BaseDatabaseModel.php` implementiert.

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t4/src/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t4/src/components/com_foos/src/Model/FooModel.php

<?php

/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Model\BaseDatabaseModel;

/**
 * Foo model for the Joomla Foos component.
 *
 * @since  __BUMP_VERSION__
 */
class FooModel extends BaseDatabaseModel
{
	/**
	 * @var string message
	 */
	protected $message;

	/**
	 * Get the message
	 *
	 * @return  string  The message to be displayed to the user
	 */
	public function getMsg()
	{
		if (!isset($this->message)) {
			$this->message = 'Hello Foo!';
		}

		return $this->message;
	}
}

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### components/com_foos/src/View/Foo/HtmlView.php

Die Daten des Models holen wir uns in der View mit `$this->msg = $this->get('Msg');`. Das wirkt in diesem einfachen Beispiel umständlich. In komplexen Anwendungen hat sich diese Verfahrensweise bewährt. Die Datenberechnung geschieht im Model. Die Gestaltung der Daten übernimmt die View.

[components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t4/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 	public function display($tpl = null)
 	{
+		$this->msg = $this->get('Msg');
+
 		return parent::display($tpl);
 	}
 }

```

> Unter Umständen verwirrt dich der Aufruf `$this->get('Msg');` genauso wie mich, als ich Joomla das erste Mal nutzte. Die Methode im Model heißt `getMsg()`, wir rufen sie hier aber über `get('Msg')` auf. Das passt irgendwie nicht. Wenn du dich vorher schon mit objektorientierter Programmierung befasst hast, dann bist du versucht, den Aufruf über `getMsg()` zu tätigen. Verwendest du Joomla, hast du es leichter, wenn du die Dinge so nutzt, wie es vorbereitet ist. [Getter](https://de.wikipedia.org/w/index.php?title=Zugriffsfunktion&oldid=196247734)[^de.wikipedia.org/wiki/zugriffsfunktion] im Model rufst du über die Methode `get()` mit dem entsprechenden Parameter auf.

<!-- prettier-ignore -->
#### components/com_foos/ tmpl/foo/default.php

Über das Template geben wir die Daten aus. Hier wird später alles in HTML-Tags verpackt.

[components/com_foos/tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t4/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 \defined('_JEXEC') or die;
 ?>
-Hello Foos
+
+Hello Foos: <?php echo $this->msg;

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Sieh dir die Frontendansicht deiner Komponente an. Überzeuge dich davon, dass die Daten für die Ausgabe vom Model erzeugt werden. Die Textausgabe lautet nun `Hello Foos: Hello Foo!` statt `Hello Foos`, wenn du meinem Beispiel gefolgt bist.

![Joomla - Verwendung des Model im Frontend](/images/j4x5x1.png)
<img src="https://vg08.met.vgwort.de/na/5edb5ab163424dbf8f3f773464101cd3" width="1" height="1" alt="">
