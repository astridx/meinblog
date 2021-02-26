---
date: 2020-12-05
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Das M im MVC: Model'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: das-m-im-mvc-model
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

In diesem Teil kommt keine neue Funktion hinzu. Wir verbessern den bisherigen Aufbau. Jede Web-Anwendung besteht aus Logik, Daten und der Darstellung.
Problematisch wäre es die drei Elemente in einer Klasse zusammenzufassen, vor allem bei größeren Projekten. Joomla verwendet das [Model-View-Controller-Konzept (MVC)](https://de.wikipedia.org/wiki/Model_View_Controller) für die Unterteilung.

In diesem Tutorial-Teil fügen wir ein Model zum Frontend hinzu. Das Model-Objekt ist für die Daten und deren Verarbeitung verantwortlich.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t3...t4) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-599caddf64a6ed0c335bc9c9f828f029)

Beim Model ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du erweiterst die Joomla Klasse `BaseDatabaseModel`. Implementiere dann nur das, was du anders einsetzt. In unserem Fall ist es die Ausgabe `$this->message = 'Hello Foo!';`, für die wir die Methode `getMsg()` erstellen.

[src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/src/Model/FooModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/ae88836668a85602657d7fa96df890bd4c5465d7/src/components/com_foos/src/Model/FooModel.php

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

```php {diff}
 	public function display($tpl = null)
 	{
+		$this->msg = $this->get('Msg');
+
 		return parent::display($tpl);
 	}
 }

```

> Unter Umständen verwirrt dich der Aufruf `$this->get('Msg');` genauso wie mich, als ich Joomla das erste Mal nutzte. Die Methode im Model heißt `getMsg()`, du rufst die aber über `get('Msg')` auf. Das passt nicht. Wenn du dich vorher schon mit objektorientierter Programmierung befasst hast, dann bist du versucht, den Aufruf über `getMsg()` zu tätigen. Verwendest du Joomla, hast du es leichter, wenn du die Dinge so nutzt, wie es für dich vorbereitet ist. [Getter](https://de.wikipedia.org/w/index.php?title=Zugriffsfunktion&oldid=196247734) im Model rufst du über die Methode `get()` mit dem entsprechenden Parameter auf.

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t3...t4#diff-a33732ebd6992540b8adca5615b51a1f)

Über das Template geben wir die Daten aus. Hier wird später alles richtig in HTML-Tags verpackt.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/4951c642c75d353de06bcc78de3efb7e20b0f93d/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 \defined('_JEXEC') or die;
 ?>
-Hello Foos
+
+Hello Foos: <?php echo $this->msg;

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

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t3...t4.diff

diff --git a/src/components/com_foos/src/Model/FooModel.php b/src/components/com_foos/src/Model/FooModel.php
new file mode 100644
index 00000000..70dd4d2b
--- /dev/null
+++ b/src/components/com_foos/src/Model/FooModel.php
@@ -0,0 +1,43 @@
+<?php
+
+/**
+ * @package     Joomla.Site
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Site\Model;
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\MVC\Model\BaseDatabaseModel;
+
+/**
+ * Foo model for the Joomla Foos component.
+ *
+ * @since  __BUMP_VERSION__
+ */
+class FooModel extends BaseDatabaseModel
+{
+	/**
+	 * @var string message
+	 */
+	protected $message;
+
+	/**
+	 * Get the message
+	 *
+	 * @return  string  The message to be displayed to the user
+	 */
+	public function getMsg()
+	{
+		if (!isset($this->message))
+		{
+			$this->message = 'Hello Foo!';
+		}
+
+		return $this->message;
+	}
+}
diff --git a/src/components/com_foos/src/View/Foo/HtmlView.php b/src/components/com_foos/src/View/Foo/HtmlView.php
index fabeaa3a..fe10f2aa 100644
--- a/src/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/components/com_foos/src/View/Foo/HtmlView.php
@@ -29,6 +29,8 @@ class HtmlView extends BaseHtmlView
 	 */
 	public function display($tpl = null)
 	{
+		$this->msg = $this->get('Msg');
+
 		return parent::display($tpl);
 	}
 }
diff --git a/src/components/com_foos/tmpl/foo/default.php b/src/components/com_foos/tmpl/foo/default.php
index 661ed99b..e98d8dc3 100644
--- a/src/components/com_foos/tmpl/foo/default.php
+++ b/src/components/com_foos/tmpl/foo/default.php
@@ -8,4 +8,5 @@
  */
 \defined('_JEXEC') or die;
 ?>
-Hello Foos
+
+Hello Foos: <?php echo $this->msg;

```

## Links
