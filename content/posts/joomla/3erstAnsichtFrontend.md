---
date: 2019-12-02
title: 'Die erste Ansicht im Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-erste-ansicht-im-frontend
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Nachdem du ein funktionierendes Backend für deine Komponente hast, implementierst du das Frontend. Aktuell ist es mit der Erweiterung möglich, einen statischen Text anzuzeigen. Wir haben bisher keine dynamischen Daten. Aber das wird sich bald ändern. Zunächst bauen wir die grobe Struktur auf. Nachfolgend siehst du die simple Ansicht.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1c...t2) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Im aktuellen Abschnitte kommen drei Datei hinzu und zwei werden geändert.

![Übersicht über die Dateien im dritten Kapitel](/images/j4xdrei.png)

### Neue Dateien

Der Administrationsbereich unserer Komponente ist im Ordner `com_foos` unter `/administrator/component`. Jetzt arbeiten wir am Frontend, das im Ordner `com_foos` direkt unter `/components` gespeichert ist.

#### [src/components/com_foos/src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-6eec124cbd4d68394d1ef4a09898e702) - Einstiegspunkt ins Frontend

Dies ist der Einstiegspunkt für den Model-View-Controller-Teil im Frontend der Foo-Komponente. Nenne die Klasse _DisplayController_. Joomla! erwartet das so. Erweitere _BaseController_, um viele Dinge Out-of-the-Box zu nutzen.

Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

[components/com_foos/src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/src/Controller/DisplayController.php)

```php
namespace Joomla\Component\Foos\Site\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;

class DisplayController extends BaseController
{
	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)
	{
		parent::__construct($config, $factory, $app, $input);
	}

	public function display($cachable = false, $urlparams = array())
	{
		parent::display($cachable);
		return $this;
	}
}
```

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-c77adeff4ff9e321c996e0e12c54b656) - Die Ansicht

Im Moment hat unsere Komponente eine rudimentäre Ansicht. Es wird nur ein statischer Text angezeigt. Dies wird sich ändern!

Es gibt mehrere Dateien, die zusammenarbeiten, um die Ansicht im Frontend zu generieren. Beispielsweise der Controller, der sie aufruft. Den erstellen wir im aktuellen Kapitel. Später kommt das Modell hinzu, welches die Daten vorbereitet.

In der Datei `HtmlView.php` wir das Modell wird aufgerufen, um die Daten für die Ansicht vorzubereiten.

Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

[components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/src/View/Foo/HtmlView.php)

```php
<?php
namespace Joomla\Component\Foos\Site\View\Foo;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

class HtmlView extends BaseHtmlView
{
	public function display($tpl = null)
	{
		return parent::display($tpl);
	}
}
```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-a33732ebd6992540b8adca5615b51a1f) - Template

In dieser Datei ist der Text, den wir anzeigen. Alles was ich in Kapitel zur _ersten Ansicht im Backend_ geschrieben habe, trifft hier analog zu.

[components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/components/com_foos/tmpl/foo/default.php)

```php
<?php
\defined('_JEXEC') or die;
?>
Hello Foos
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1c...t2#diff-1ff20be1dacde6c4c8e68e90161e0578) - XML-Datei (Manifest)

Dies ist die Datei, die Joomla! mitteilt, wie unsere Komponente installiert wird. Deshalb tragen wie die beiden neuen Dateien hier ein, so weiß Joomla bei einer Installatin, dass es die Verzeichnisse `src` und `tmpl` gibt und wo `components/com_foos` es sie hin kopieren soll.

[administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/21105d93f46c44fc76033e8825b8b31f35c1581c/src/administrator/components/com_foos/foos.xml)

```xml
...
<files folder="components/com_foos">
  <folder>src</folder>
  <folder>tmpl</folder>
</files>
...
```

#### Die Behelfsdatei - components/com_foos/index.html

Diese Datei war nur ein Behelf und sie kann nun gelöscht werden.

## Teste deine Joomla-Komponente

1. Installiere am Ende deine Komponente in Joomla! Version 4, um sie zu testen:

Führe eine neue Installation durch. Dies ist erforderlich, da die neuen Dateien im Frontend sonst nicht erkannt werden. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! richtet bei der bei der Installation Namespaces für dich ein.

2. Öffne dann in einem Browser die Adresse `JOOMLA4/index.php?option=com_foos&view=foo`. Du siehst die eben erstelle Frontend-Ansicht.

![Joomla Ansicht im Frontend](/images/j4x3x1.png)

### Übersicht
