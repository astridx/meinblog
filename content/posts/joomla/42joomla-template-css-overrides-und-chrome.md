---
description: 'desc'
shortTitle: 'short'
date: 2021-01-08
title: 'Template - Overrides - alternative Overrides und Module Chrome'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-css-overrides-und-chrome
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

In diesem Kapitel werden wir die Ausgabe der Erweiterungen im Frontend verändern. In Joomla geschieht dies mithilfe von

- Overrides,
- alternativen Overrides,
- Layouts und
- Modul Chromes.<!-- \index{Template!Overrides, alternvative Overrides, Layouts, Modul Chromes} -->

Die Standard-Ausgabe jeder Joomla-konformen Erweiterungen ist über Dateien im Ordner `html` des Templates manipulierbar. Joomla bietet zu diesem Zweck unterschiedliche Möglichkeiten. Overrides, alternative Overrides, Layouts und Modul Chromes. Jede Variante hat ihre Berechtigung.

_Overrides_ sind das erste Mittel der Wahl. Gibt es bereits ein Override für eine Erweiterung, erstellt man ein _alternatives Override_. _Layouts_ überschreiben einen begrenzten Bereich einer Ansicht und sind dabei in unterschiedlichen Ansichten wiederverwendbar. Last but not least bieten _Modul Chromes_ eine Variante, um ein Override an verschieden Stellen leicht abgewandelt einzusetzten.<!-- \index{Modul Chromes} --><!-- \index{Overrides} --><!-- \index{alternvative Overrides} --><!-- \index{Overrides} -->

![Joomla Template erstellen - Module Chrome](/images/overview.png)

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t36...t37)[^github.com/astridx/boilerplate/compare/t36...t37] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt verändern wir die Frontend Ansicht von `com_content/featured`, `mod_articles_news` und `mod_menu`. Dabei verwenden wir alle in Joomla möglichen Varianten zum Überschreiben. Das Template ist damit nicht fertig. Es bleiben eine Menge Erweiterungen, deren Ansicht nicht angepasst ist.

Mein Ziel: Am Ende haben wir alle Override-Varianten besprochen, so dass du das Template fertigstellen oder dein eigenes Template nach deinen Wünschen bearbeiten kannst. Fertig sein wird die Ansicht der Startseite der Joomla 4 Blog-Beispieldateien.

Ansicht der Startseite der Joomla 4 Blog-Beispieldateien in Cassiopeia:

![Joomla Template erstellen - Standardtemplate Cassiopeia](/images/j4x43x8a.png)

Ansicht der Startseite der Joomla 4 Blog-Beispieldateien in unserem neuen Template Facile:

![Joomla Template erstellen - Template Facile](/images/j4x43x8b.png)

Overrides können komfortabel mit Hilfe des Template-Managers erstellt werden. Dieser bietet eine Ansicht, die die Unterschiede zum Joomla-eigenen Code farblich markiert.

![Joomla Template erstellen - Diff-View](/images/j4x42x4.png)

> Tipp: Wenn man eine Ansicht nur geringfügig verändern möchte, bietet es sich an, die original Ansicht als Vorlage zu nehmen. Dann ändert man diese wunschgemäß. Dazu geht man folgendermaßen vor. Man erstellt eine Kopie der vorhandenen Ansicht im `html`-Verzeichnis des Templates und bearbeitet diese. Die Kopie legt man im Templateverzeichnis an, genau unter `templates/TEMPLATE_NAME/html/EXTENSION_NAME/VIEW_NAME/FILE_NAME.php`. Falls man zum Beispiel die `Feature`-Ansicht in `com_content` ändern möchte, dann kopiert man die Datei `components/com_content/views/feature/tmpl/default.php` nach `templates/TEMPLATE_NAME/html/com_content/feature/default.php`. Analog verhält es sich, falls du die Darstellung des `mod_article_latest`-Moduls ändern möchtest. Kopiere `modules/tmpl/mod_articles_news/default.php` nach `templates/TEMPLATE_NAME/html/mod_articles_news/default.php`. Joomla 4 bietet als Standard das Frontend-Template Cassiopeia. Cassipeia verwendet Template-Overrides um das Dropdown Menu zu kreieren. An diesem kannst du dich orientieren. Öffne dazu das Verzeichnis `\template\cassiopeia`. Im Template-Ordner, findest du ein Unterverzeichnis namens `html`.

### Neue Dateien

#### Assets-Verzeichnis

Das Design habe ich vom HTML5 UP-Template [TXT](https://html5up.net/txt)[^html5up.net/txt] übernommen. In diesem Text geht es um Joomla. Erklärungen zu HTML, SCSS und CSS würden den Rahmen dieses Beitrags sprengen. Deshalb lasse ich diese außen vor und konzentriere mich auf Joomla.

##### Override `com_content/featured/` (inklusive Layout Override)

Die Blog-Beispieldateien nutzen als Starseite die Ansicht `components/com_content/tmpl/com_content/featured/`. Der Code dieser Ansicht ist komplex, zumindest im Joomla Kern. Viele dieser komplexen Abfragen brauche ich nicht, deshalb beschränke ich mich auf das Wesentliche. Sieh dir den nachfolgenden Code an. Im Grunde genommen durchlaufe ich alle Artikel mit der Eigenschaft `featured/` und zeige sie mithilfe des Untertemplates `default_item.php` an. Joomla stellt mir alle Eigenschaften eines Artikels in der Variablen `$this->items` zur Verfügung.

> Joomla verwendet Templates und Subtemplates wie `$this->loadTemplate('item')` oder Layouts wie `LayoutHelper::render('joomla.content.intro_image', $this->item);`, um den Code übersichtlich zu strukturieren. Das hatte ich bereits bei den Frontend-Ansichten der Kategorien im Tutorialteil zur Komponente erwähnt. Nachfolgend sehen wir uns diese Funktionen noch einmal praktisch an.<!-- \index{Subtemplates} -->

[templates/facile/ html/com_content/featured/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/com_content/featured/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/com_content/featured/default.php

<?php
defined('_JEXEC') or die;
?>

<div>
	<h1>
		<?php echo $this->escape($this->params->get('page_heading')); ?>
	</h1>

	<?php if (!empty($this->items)) : ?>
		<?php foreach ($this->items as $key => &$item) : ?>
			<div>
				<?php
				$this->item = & $item;
				echo $this->loadTemplate('item');
				?>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
</div>

```

Die Datei `/templates/facile/ html/com_content/featured/default.php` ist ein Override. Sie ruft mittels `echo $this->loadTemplate('item');` ein Subtemplate auf.

[templates/facile/ html/com_content/featured/default_item.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/com_content/featured/default_item.php)

Das Subtemplate `templates/facile/ html/com_content/featured/default_item.php` zeigt

- mithilfe des Layouts `joomla.content.intro_image` ein Bild an,
- erstellt dann eine verlinkte Überschrift und
- gibt darunter den Introtext aus.

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/com_content/featured/default_item.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Router\Route;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\CMS\Layout\LayoutHelper;
?>

<?php echo LayoutHelper::render('joomla.content.intro_image', $this->item); ?>

<div>
	<h2>
		<a href="<?php echo Route::_(RouteHelper::getArticleRoute($this->item->slug, $this->item->catid, $this->item->language)); ?>">
			<?php echo $this->escape($this->item->title); ?>
		</a>
	</h2>

	<?php echo $this->item->introtext; ?>
</div>

```

Joomla sucht zuerst im Template-Verzeichnis nach Dateien. Deshalb erstellen wir später ein eigenes Layout. Des speichern wir unter `templates/facile/ html/layouts/joomla/content/intro_image.php`. Unser eigenes Layout zeigt das Bild in der korrekten Größe an. Da es die Datei `layouts/joomla/content/intro_image.php` direkt im Joomla Stammverzeichnis gibt, würde diese andernfalls für die Anzeige verwendet. Wenn wir keine besonderen Erfordernisse hätten, könnten wir es uns einfach machen und auf dieses Joomla eigene Layout `layouts/joomla/content/intro_image.php` zurückgreifen.

> Falls die Datei `templates/facile/ html/layouts/joomla/content/intro_image.php` nicht existierte, würde als nächstes im Verzeichnis `layouts/ joomla/content/` gesucht und die dortige Datei `intro_image.php` zur Anzeige verwendet.

[templates/facile/ html/layouts/joomla/content/intro_image.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/layouts/joomla/content/intro_image.php)

Das Layouts `joomla.content.intro_image` wird an vielen Stellen in Joomla verwendet.

> Ergänzend zum Override ganzer Views unterstützt Joomla das Überschreiben kleinerer Codesegemente, sogenannter Layouts. Layouts werden von Joomla an unterschiedlichen Stellen verwendet. Zum Beispiel um den Code zu erzeugen, der die Such- und Sortierfilter in Listenansichten erzeugt oder bei der Anzeige der Beitragsinformationen (wie Autor, Erstelldatum...) ober- oder unterhalb eines Beitrags.

Da unser Template anders aufgebaut ist und abweichende CSS Elemente erwartet, ist die Darstellung des Bildes via `joomla.content.intro_image` nicht optimal. Deshalb überschreiben wir das Layout in unserem Template. Weil wir dies wiederverwenden möchten, erledigen wir es so, dass wir mit dem Aufruf `echo LayoutHelper::render('joomla.content.intro_image', $this->item);` an anderen Stellen ebenfalls auf unser Layout zugreifen können. Dazu erstellen wir die Datei `templates/facile/ html/layouts/joomla/content/intro_image.php`.

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/layouts/joomla/content/intro_image.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\CMS\Router\Route;

$images = json_decode($displayData->images);
$img = HTMLHelper::cleanImageURL($images->image_intro);
$alt = empty($images->image_intro_alt) && empty($images->image_intro_alt_empty) ? '' : 'alt="'. htmlspecialchars($images->image_intro_alt, ENT_COMPAT, 'UTF-8') .'"';
?>

<a href="<?php echo Route::_(RouteHelper::getArticleRoute($displayData->slug, $displayData->catid, $displayData->language)); ?>" class="image featured">
<img src="<?php echo htmlspecialchars($img->url, ENT_COMPAT, 'UTF-8'); ?>" alt="<?php echo $alt; ?>" />
</a>

```

> Nochmal zum Vergleich: Die ursprüngliche Joomla-eigene Datei des Layouts `joomla.content.intro_image` liegt im Verzeichnis `layouts/ joomla/content/intro_image.php`. Die spezielle Datei für unser Template ist unter `templates/facile/ html/` + `layouts/joomla/content/intro_image.php` gespeichert.

##### Override via Module Chrome `mod_articles_news`

Im oberen Bereich der Startseite zeigen die Joomla Blog Beispieldaten das Modul `mod_articles_news` an. Wir erstellen analog zur Ansicht der Hauptbeiträge in `com_content/featured/` ein Standard Override, in dem wir die Items in einem Untertemplate einbinden. Den Code der beiden Dateien `mod_articles_news/_item.php` und `mod_articles_news/default.php` findest du nachfolgend. Diese unterstützen lediglich die notwendigen Funktionen und sind deshalb zum Lernen übersichtlich kompakt.

> `templates/facile/html/mod_articles_news/_item.php` beinhaltet ebenfalls ein Layout. `joomla.content.readmore` enthält den Code, der einen Weiterlesen-Link erstellt. Eine Funktion, die in vielen Ansichten eingesetzt wird und deshalb ein gutes Beispiel für die Wiederverwendbarkeit ist.

[templates/facile/ html/mod_articles_news/\_item.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_articles_news/_item.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_articles_news/_item.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;
?>

<div class="col-4 col-12-medium col-12-small">
	<section class="box feature">
		<a href="<?php echo $item->link; ?>" class="image featured"><img src="<?php echo $item->imageSrc; ?>" alt="<?php echo $item->imageAlt; ?>"/></a>

		<h3><a href="<?php echo $item->link; ?>"><?php echo $item->title; ?></a></h3>

		<p>
			<?php echo $item->introtext; ?>
			<?php echo LayoutHelper::render('joomla.content.readmore', ['item' => $item, 'params' => $item->params, 'link' => $item->link]); ?>
		</p>
	</section>
</div>

```

[templates/facile/ html/mod_articles_news/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_articles_news/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_articles_news/default.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

if (empty($list)) {
	return;
}

?>
<div>
	<div class="row">
			<!-- Feature -->
			<?php foreach ($list as $item) : ?>
				<?php require ModuleHelper::getLayoutPath('mod_articles_news', '_item'); ?>
			<?php endforeach; ?>
	</div>
</div>

```

Das Override zum Modul `mod_articles_news` soll im oberen Bereich mit einer großen Überschrift angezeigt werden. Auf einer Unterseite, soll es mit kleiner Überschrift in der Seitenleiste erscheinen. Wir könnten mit einem alternativen Override eine Lösung schaffen. Diese Variante ist Thema des nächsten Abschnitts. Mit einem alternativen Override würde viel Programmcode redundant geschrieben. Eigentlich ist nur die erste Zeile mit der Überschrift unterschiedlich. Und hier kommen Joomlas Modul Chromes ins Spiel. Wir erstellen eine Datei im Verzeichnis `templates/facile/html/layouts/chromes/` die nur den unterschiedlichen Code enthält und ansonsten das Modul genauso einbindet, wie es ist. Für letzteres sorgt `echo $module->content;`. Die Module Chrome Datei können wir beliebig nennen. Ich habe `hr.php` als Namen gewählt. In der `index.php` am Ende dieses Abschnittes siehst du, wie du dafür sorgst, dass die Datei `hr.php` im Kopfbereich der Seite integriert wird aber nicht in der Seitenleiste.

[templates/facile/ html/layouts/chromes/hr.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/layouts/chromes/hr.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/layouts/chromes/hr.php

<?php
defined('_JEXEC') or die;
$module  = $displayData['module'];
?>

<section class="box features">
	<h2 class="major"><span>News</span></h2>
	<?php echo $module->content; ?>
</section>

```

#### Das alternative Override `mod_menu`

Es gibt Anforderungen, bei denen das Aussehen eines Modules an unterschiedlichen Stellen stark variiert. In diesem Fall ist es erforderlich, dass zwei unterschiedliche Dateien erstellt werden. Die Datei `default.php` ist das eigentlich Override. Legen wir im Verzeichnis neben der `default.php` eine weitere Datei an, ist dies ein alternatives Override. Ein Anwendungsfall ist ein Menü. Im Kopfbereich sieht das Hauptmenü oft ganz anders aus, als das im Footer. In unserem Template ist das Hauptmenü in der Datei `default.php` implementiert und das Fußmenü in der Datei `bottom.php`.

> Anmerkung: Die beiden Dateien unterscheiden sich geringfügig. In der Datei `bottom.php` muss das `<ul>`-Element die Klasse `menu` erhalten, damit keine Listenpunkte in der Frontendansicht angezeigt werden. Dies könnte ebenfalls über ein Modul Chrome gehandhabt werden.

[templates/facile/ html/mod_menu/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_menu/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_menu/default.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
?>

<ul>
<?php foreach ($list as $i => &$item) {
	$itemParams = $item->getParams();
	$class      = '';

	if ($item->id == $active_id) {
		$class .= ' current';
	}

	echo '<li class="' . $class . '">';

	require ModuleHelper::getLayoutPath('mod_menu', 'default_url');

	// The next item is deeper.
	if ($item->deeper) {
		echo '<ul>';
	}
	// The next item is shallower.
	else if ($item->shallower) {
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else {
		echo '</li>';
	}
}
?></ul>

```

[templates/facile/ html/mod_menu/bottom.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_menu/bottom.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_menu/bottom.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
?>

<ul class="menu">
<?php foreach ($list as $i => &$item) {
	$itemParams = $item->getParams();
	$class      = '';

	if ($item->id == $active_id) {
		$class .= ' current';
	}

	echo '<li class="' . $class . '">';

	require ModuleHelper::getLayoutPath('mod_menu', 'default_url');

	// The next item is deeper.
	if ($item->deeper) {
		echo '<ul>';
	}
	// The next item is shallower.
	else if ($item->shallower) {
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else {
		echo '</li>';
	}
}
?></ul>

```

### Geänderte Dateien

##### [templates/facile/index.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/index.php)

Die nachfolgende `index.php` ist an die neu hinzugefügten CSS-Styles angepasst und gibt nun im Frontend ein ansprechenderes Design aus.

Die Zeile `<jdoc:include type="modules" name="top-a" style="hr" />` sorgt dafür, dass an dieser Stelle das Modul Chrome `hr` für die Anzeige des Moduls hinzugezogen wird.

[templates/facile/index.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/index.php)

```php {diff}
 <!DOCTYPE html>
 <html lang="de">

 <head>
-    <meta charset="utf-8">
-    <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <title>Titel</title>
+	<meta charset="utf-8">
+	<meta name="viewport" content="width=device-width, initial-scale=1.0">
+	<link rel="stylesheet" href="<?php echo $templatePath; ?>/assets/css/main.css" />
+	<title>Titel</title>
 </head>

-<body>
-    <header>
-        <div>
-            <nav>
-                <div>
-                    <jdoc:include type="modules" name="menu" />
-                </div>
-            </nav>
-            <div>
-                <jdoc:include type="modules" name="search" />
-            </div>
-        </div>
-    </header>
-
-    <div>
-        <jdoc:include type="modules" name="banner" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="top-a" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="top-b" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="sidebar-left" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="breadcrumbs" />
-        <jdoc:include type="modules" name="main-top" />
-        <jdoc:include type="message" />
-        <main>
-            <jdoc:include type="component" />
-        </main>
-        <jdoc:include type="modules" name="main-bottom" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="sidebar-right" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="bottom-a" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="bottom-b" />
-    </div>
-
-    <footer>
-        <jdoc:include type="modules" name="footer" />
-    </footer>
-
-    <jdoc:include type="modules" name="debug" />
-
+<body class="homepage is-preload">
+	<div id="page-wrapper">
+
+		<?php if ($this->countModules('menu', true)) : ?>
+		<nav id="nav">
+			<jdoc:include type="modules" name="menu" />
+		</nav>
+		<?php endif; ?>
+
+		<section id="main">
+			<div class="container">
+				<div class="row gtr-200">
+					<div class="row">
+
+						<?php if ($this->countModules('top-a', true)) : ?>
+						<jdoc:include type="modules" name="top-a" style="hr" />
+						<?php endif; ?>
+
+						<?php if ($this->countModules('sidebar-left', true)) : ?>
+						<div class="col-3 col-12-medium">
+							<div class="sidebar">
+								<jdoc:include type="modules" name="sidebar-left" style="none" />
+							</div>
+						</div>
+						<?php endif; ?>
+
+						<div class="col-6 col-12-medium imp-medium">
+							<div class="content">
+
+								<?php if ($this->countModules('search', true)) : ?>
+								<section id="search">
+									<jdoc:include type="modules" name="breadcrumbs" style="none" />
+								</section>
+								<?php endif; ?>
+
+								<?php if ($this->countModules('search', true)) : ?>
+								<section id="search">
+									<jdoc:include type="modules" name="search" style="none" />
+								</section>
+								<?php endif; ?>
+
+								<jdoc:include type="modules" name="main-top" style="none" />
+								<jdoc:include type="message" />
+								<main>
+									<jdoc:include type="component" />
+								</main>
+
+								<jdoc:include type="modules" name="main-bottom" style="none" />
+
+							</div>
+						</div>
+
+						<?php if ($this->countModules('sidebar-right', true)) : ?>
+						<div class="col-3 col-12-medium">
+							<div class="sidebar">
+								<jdoc:include type="modules" name="sidebar-right" style="none" />
+							</div>
+						</div>
+						<?php endif; ?>
+
+						<?php if ($this->countModules('bottom-a', true)) : ?>
+						<jdoc:include type="modules" name="bottom-a" style="none" />
+						<?php endif; ?>
+					</div>
+				</div>
+			</div>
+		</section>
+
+		<footer id="footer">
+			<?php if ($this->countModules('footer', true)) : ?>
+			<div id="copyright">
+				<jdoc:include type="modules" name="footer" />
+			</div>
+			<?php endif; ?>
+		</footer>
+
+		<jdoc:include type="modules" name="debug" />
+
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.dropotron.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.scrolly.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/browser.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/breakpoints.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/util.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/main.js"></script>
+
+	</div>
 </body>

 </html>

```

> Tipp: Damit keine Elemente unnötig hinzugefügt werden ist es gute Praxis zu prüfen, ob eine Modulposition in der Joomla Installation verwendet wird. Dies geschieht mit `$this->countModules('NAME_DER_POSITIONS', true)`.

> Das Banner Modul habe ich gelöscht, weil ich später ein Banner mithilfe von Parametern einfüge.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

Wir haben im vorhergehenden Kapitel die Beispieldaten installiert. Falls du dies nicht getan hast, hole es bitte nun nach damit die im nächsten Bild dargestellten Module auf der Homepage der Joomla-Installation verfügbart sind.

![Joomla Template erstellen - Modulepositionen filtern](/images/j4x42x1.png)

2. Öffne das Modul `Bottom Menü` und wähle als Layout `bottom`. Beim Modul `Main Menu Blog` ersetzt du das Layout `Dropdown` mit dem Standardlayout `Default` vom Module.

![Joomla Template erstellen - Alternatives Override - Bottom](/images/j4x42x5.png)

3. Öffne das Modul `mod_articles_news` (`Articles - Newsflash`) mit dem Namen `Latest Posts`, welches im Kopfbereich des Frontends angezeigt wird. Bei den Erklärungen zur `index.php` hast du erfahren, dass ein Modul Chrome über den Parameter `style="hr"` in `<jdoc:include type="modules" name="top-a" style="hr" />` aktiviert wird. Du kannst dies aber auch im Backend einstellen. Das nächste Bild zeigt dir wie das im Tabulator `Advanced` über den Parameter `Module Style` funktioniert.

![Joomla Template erstellen - Module Chrome](/images/j4x42x3.png)

4. Spiele mit den verschiedenen Möglichkeiten. Lege verschiedene Arten von Overrides an und teste die Ausgabe im Frontend.

Alle Override-Dateien im Verzeichnis `templates/facile/html/com_content/article` hast du beim Erstellen eines Artikels im Tabulator `Options` im Auswahlfeld `Layout` zur Auswahl.

![Verschiedene Möglichkeiten bei der Joomla Template Overrides Erstellung | Beim Erstellen eines Artikels](/images/j4x43x6.png)

Beim Anlegen eines Menüpunktes hast du lediglich die Overides zur Auswahl, für die du eine XML-Datei angelegt hast.

![Verschiedene Möglichkeiten bei der Joomla Template Overrides Erstellung | Beim Erstellen eines Menüpunktes](/images/j4x43x7.png)

Achtung: Dir wird keine Fehlermeldung angezeigt, wenn du eine XML-Datei anlegst aber die dazugehörige PHP-Datei aufgrund eines Tippfehlers fehlt. Es gibt auch keinen Hinweis, wenn du zwei XML-Dateien mit dem gleichen Titel anlegst. Joomla tut in dem Fall so, als ob es nur eine davon gibt. Im nächsten Bild sind die Dateinamen alle korrekt. Den Titel `COM_CONTENT_ARTICLE_VIEW_DEFAULT_TITLE` gibt es allerdings schon. Beim Erstellen eines Artikels wurde das Override erst zur Auswahl angeboten, nachdem ich den Sprachstring in `COM_CONTENT_ARTICLE_VIEW_DEFAULT_MEINSPRECHENDERNAME_TITLE` änderte.

![Fallstricke bei der Joomla Template Overrides Erstellung](/images/j4x43x5.png)
<img src="https://vg08.met.vgwort.de/na/b0e462dbf36540ef85c2d098ae4cbf09" width="1" height="1" alt="">
