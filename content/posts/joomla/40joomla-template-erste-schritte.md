---
date: 2021-01-09
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-erste-schritte
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir ergänzen Namespace und Helper.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t34...t35) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

#### Template

Beim Template ist es ebenfalls so, dass du das Rad nicht neu erfindest.

##### [src/templates/facile/index.php](https://github.com/astridx/boilerplate/blob/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/index.php)

[src/templates/facile/index.php](https://github.com/astridx/boilerplate/blob/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/index.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/index.php

<?php
/**
 * @package     Facile
 *
 * @copyright   Copyright (C) 2020 Facile. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

$app = Factory::getApplication();
$sitename = htmlspecialchars($app->get('sitename'), ENT_QUOTES, 'UTF-8');
$pageclass = $app->getMenu()->getActive()->getParams()->get('pageclass_sfx');

// Logo file or site title param
if ($this->params->get('logoFile'))
{
	$logo = '<img src="' . Uri::root() . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
} else
{
	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
}

$hasSidebar = '';

if ($this->countModules('sidebar-left'))
{
	$hasSidebar .= ' has-sidebar-left';
}

if ($this->countModules('sidebar-right'))
{
	$hasSidebar .= ' has-sidebar-right';
}

$this->setMetaData('viewport', 'width=device-width, initial-scale=1');

$menu = $this->getBuffer('modules', 'menu', $attribs = ['style' => 'none']);
$search = $this->getBuffer('modules', 'search', $attribs = ['style' => 'none']);
$banner = $this->getBuffer('modules', 'banner', $attribs = ['style' => 'default']);
$topA = $this->getBuffer('modules', 'top-a', $attribs = ['style' => 'default']);
$topB = $this->getBuffer('modules', 'top-b', $attribs = ['style' => 'default']);
$sidebarLeft = $this->getBuffer('modules', 'sidebar-left', $attribs = ['style' => 'default']);
$mainTop = $this->getBuffer('modules', 'main-top', $attribs = ['style' => 'default']);
$message = $this->getBuffer('message');
$breadcrumbs = $this->getBuffer('modules', 'breadcrumbs', $attribs = ['style' => 'none']);
$component = $this->getBuffer('component');
$mainBottom = $this->getBuffer('modules', 'main-bottom', $attribs = ['style' => 'default']);
$sidebarRight = $this->getBuffer('modules', 'sidebar-right', $attribs = ['style' => 'default']);
$bottomA = $this->getBuffer('modules', 'bottom-a', $attribs = ['style' => 'default']);
$bottomB = $this->getBuffer('modules', 'bottom-b', $attribs = ['style' => 'default']);
$footer = $this->getBuffer('modules', 'footer', $attribs = ['style' => 'none']);
$debug = $this->getBuffer('modules', 'debug', $attribs = ['style' => 'none']);
$metas = $this->getBuffer('metas');
$styles = $this->getBuffer('styles');
$scripts = $this->getBuffer('scripts');
?>

<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
	<head>
<?php echo $metas; ?>
		<style><?php echo $css; ?></style>
	</head>
	<body class="site-grid site <?php echo $pageclass . $hasSidebar; ?>">
		<header class="grid-child container-header full-width header <?php echo $this->countModules('banner') ? 'has-banner' : ''; ?>">
			<nav class="navbar">
				<div class="navbar-brand">
					<a href="<?php echo $this->baseurl; ?>/">
<?php echo $logo; ?>
						<span class="sr-only"><?php echo Text::_('TPL_FACILE_LOGO_LABEL'); ?></span>
					</a>
<?php if ($this->params->get('siteDescription')) : ?>
						<div><?php echo htmlspecialchars($this->params->get('siteDescription')); ?></div>
					<?php endif; ?>
				</div>

<?php if ($this->countModules('menu') || $this->countModules('search')) : ?>
					<div class="navbar-menu">
					<?php echo $menu; ?>
						<?php if ($this->countModules('search')) : ?>
							<div>
							<?php echo $search; ?>
							</div>
							<?php endif; ?>
					</div>
					<span id="navbar-menu-toggle" class="navbar-menu-toggle"><span></span></span>
<?php endif; ?>
			</nav>
		</header>

<?php if ($this->countModules('banner')) : ?>
			<div class="grid-child full-width container-banner">
			<?php echo $banner; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('top-a')) : ?>
			<div class="grid-child container-top-a">
			<?php echo $topA; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('top-b')) : ?>
			<div class="grid-child container-top-b">
			<?php echo $topB; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('sidebar-left')) : ?>
			<div class="grid-child container-sidebar-left">
			<?php echo $sidebarLeft; ?>
			</div>
			<?php endif; ?>

		<div class="grid-child container-component">
<?php echo $mainTop; ?>
			<?php echo $message; ?>
			<?php echo $breadcrumbs; ?>
			<?php echo $component; ?>
			<?php echo $mainBottom; ?>
		</div>

<?php if ($this->countModules('sidebar-right')) : ?>
			<div class="grid-child container-sidebar-right">
			<?php echo $sidebarRight; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('bottom-a')) : ?>
			<div class="grid-child container-bottom-a">
			<?php echo $bottomA; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('bottom-b')) : ?>
			<div class="grid-child container-bottom-b">
			<?php echo $bottomB; ?>
			</div>
			<?php endif; ?>

		<?php if ($this->countModules('footer')) : ?>
			<footer class="grid-child container-footer full-width footer">
				<div class="container">
	<?php echo $footer; ?>
				</div>
			</footer>
<?php endif; ?>

		<?php echo $debug; ?>

		<?php echo $scripts; ?>
	</body>
</html>

```

##### [src/templates/facile/language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t34...t35#diff-754d06b92d8b132af8eb955c0e6d9cd66a493f7b0055c4820f5b3f474a02da83)

[src/templates/facile/language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini

TPL_FACILE_XML_DESCRIPTION="Facile is a blazingly fast Joomla 4 template, using the HiQ CSS framework."
; Parameters
TPL_FACILE_LOGO_LABEL="Logo"

```

##### [src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/compare/t34...t35#diff-f430f52316f61d2dd90ac59a813bcd36cf84549945e7eb5055302d54858a169f)

[src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini

FACILE="Facile - Site template"
TPL_FACILE_POSITION_MENU="Menu"
TPL_FACILE_POSITION_SEARCH="Search"
TPL_FACILE_POSITION_BANNER="Banner"
TPL_FACILE_POSITION_TOP-A="Top-a"
TPL_FACILE_POSITION_TOP-B="Top-b"
TPL_FACILE_POSITION_MAIN-TOP="Main-top"
TPL_FACILE_POSITION_BREADCRUMBS="Breadcrumbs"
TPL_FACILE_POSITION_MAIN-BOTTOM="Main-bottom"
TPL_FACILE_POSITION_SIDEBAR-LEFT="Sidebar-left"
TPL_FACILE_POSITION_SIDEBAR-RIGHT="Sidebar-right"
TPL_FACILE_POSITION_BOTTOM-A="Bottom-a"
TPL_FACILE_POSITION_BOTTOM-B="Bottom-b"
TPL_FACILE_POSITION_FOOTER="Footer"
TPL_FACILE_POSITION_DEBUG="Debug"
TPL_FACILE_XML_DESCRIPTION="Facile is a blazingly fast Joomla 4 template."

```

##### [src/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t34...t35#diff-7d97de6b92def4b5a42a0052c815e6fada268a2e2dda9e3ea805eb87e0076dc1)

[ssrc/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/templateDetails.xml)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/68fc165e168a88fffc86a46ad4c34328919a17d2/src/templates/facile/templateDetails.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="template" client="site" method="upgrade">
	<name>facile</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>TPL_FACILE_XML_DESCRIPTION</description>

	<files>
		<filename>component.php</filename>
		<filename>error.php</filename>
		<filename>index.php</filename>
		<filename>offline.php</filename>
		<filename>templateDetails.xml</filename>
		<filename>template_preview.png</filename>
		<filename>template_thumbnail.png</filename>
		<folder>language</folder>
	</files>

	<positions>
		<position>menu</position>
		<position>search</position>
		<position>banner</position>
		<position>top-a</position>
		<position>top-b</position>
		<position>main-top</position>
		<position>main-bottom</position>
		<position>breadcrumbs</position>
		<position>sidebar-left</position>
		<position>sidebar-right</position>
		<position>bottom-a</position>
		<position>bottom-b</position>
		<position>footer</position>
		<position>debug</position>
	</positions>

	<config>
		<fields name="params">
			<fieldset name="advanced">
				<field
					name="logoFile"
					type="media"
					default=""
					label="TPL_FACILE_LOGO_LABEL"
				/>

				<field
					name="siteTitle"
					type="text"
					default=""
					label="JGLOBAL_TITLE"
					filter="string"
				/>

				<field
					name="siteDescription"
					type="text"
					default=""
					label="JGLOBAL_DESCRIPTION"
					filter="string"
				/>
			</fieldset>
		</fields>
	</config>
</extension>

```

##### src/templates/facile/template_preview.png and src/templates/facile/template_thumbnail.png

### Geänderte Dateien

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla! Version 4, um es zu testen. Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla! 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deinem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

3. Teste als Nächstes, ob das Template fehlerfrei arbeitet. Ö

4. Template Style Facile als aktiv.

5. Installiere die Beispieldaten für die Tests

6. Rufe die URL `joomla-cms4/index.php?tp=1` auf.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t34...t35.diff

diff --git a/src/templates/facile/index.php b/src/templates/facile/index.php
new file mode 100644
index 00000000..3eeb110f
--- /dev/null
+++ b/src/templates/facile/index.php
@@ -0,0 +1,158 @@
+<?php
+/**
+ * @package     Facile
+ *
+ * @copyright   Copyright (C) 2020 Facile. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Factory;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Uri\Uri;
+
+$app = Factory::getApplication();
+$sitename = htmlspecialchars($app->get('sitename'), ENT_QUOTES, 'UTF-8');
+$pageclass = $app->getMenu()->getActive()->getParams()->get('pageclass_sfx');
+
+// Logo file or site title param
+if ($this->params->get('logoFile'))
+{
+	$logo = '<img src="' . Uri::root() . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
+} else
+{
+	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
+}
+
+$hasSidebar = '';
+
+if ($this->countModules('sidebar-left'))
+{
+	$hasSidebar .= ' has-sidebar-left';
+}
+
+if ($this->countModules('sidebar-right'))
+{
+	$hasSidebar .= ' has-sidebar-right';
+}
+
+$this->setMetaData('viewport', 'width=device-width, initial-scale=1');
+
+$menu = $this->getBuffer('modules', 'menu', $attribs = ['style' => 'none']);
+$search = $this->getBuffer('modules', 'search', $attribs = ['style' => 'none']);
+$banner = $this->getBuffer('modules', 'banner', $attribs = ['style' => 'default']);
+$topA = $this->getBuffer('modules', 'top-a', $attribs = ['style' => 'default']);
+$topB = $this->getBuffer('modules', 'top-b', $attribs = ['style' => 'default']);
+$sidebarLeft = $this->getBuffer('modules', 'sidebar-left', $attribs = ['style' => 'default']);
+$mainTop = $this->getBuffer('modules', 'main-top', $attribs = ['style' => 'default']);
+$message = $this->getBuffer('message');
+$breadcrumbs = $this->getBuffer('modules', 'breadcrumbs', $attribs = ['style' => 'none']);
+$component = $this->getBuffer('component');
+$mainBottom = $this->getBuffer('modules', 'main-bottom', $attribs = ['style' => 'default']);
+$sidebarRight = $this->getBuffer('modules', 'sidebar-right', $attribs = ['style' => 'default']);
+$bottomA = $this->getBuffer('modules', 'bottom-a', $attribs = ['style' => 'default']);
+$bottomB = $this->getBuffer('modules', 'bottom-b', $attribs = ['style' => 'default']);
+$footer = $this->getBuffer('modules', 'footer', $attribs = ['style' => 'none']);
+$debug = $this->getBuffer('modules', 'debug', $attribs = ['style' => 'none']);
+$metas = $this->getBuffer('metas');
+$styles = $this->getBuffer('styles');
+$scripts = $this->getBuffer('scripts');
+?>
+
+<!DOCTYPE html>
+<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
+	<head>
+<?php echo $metas; ?>
+		<style><?php echo $css; ?></style>
+	</head>
+	<body class="site-grid site <?php echo $pageclass . $hasSidebar; ?>">
+		<header class="grid-child container-header full-width header <?php echo $this->countModules('banner') ? 'has-banner' : ''; ?>">
+			<nav class="navbar">
+				<div class="navbar-brand">
+					<a href="<?php echo $this->baseurl; ?>/">
+<?php echo $logo; ?>
+						<span class="sr-only"><?php echo Text::_('TPL_FACILE_LOGO_LABEL'); ?></span>
+					</a>
+<?php if ($this->params->get('siteDescription')) : ?>
+						<div><?php echo htmlspecialchars($this->params->get('siteDescription')); ?></div>
+					<?php endif; ?>
+				</div>
+
+<?php if ($this->countModules('menu') || $this->countModules('search')) : ?>
+					<div class="navbar-menu">
+					<?php echo $menu; ?>
+						<?php if ($this->countModules('search')) : ?>
+							<div>
+							<?php echo $search; ?>
+							</div>
+							<?php endif; ?>
+					</div>
+					<span id="navbar-menu-toggle" class="navbar-menu-toggle"><span></span></span>
+<?php endif; ?>
+			</nav>
+		</header>
+
+<?php if ($this->countModules('banner')) : ?>
+			<div class="grid-child full-width container-banner">
+			<?php echo $banner; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('top-a')) : ?>
+			<div class="grid-child container-top-a">
+			<?php echo $topA; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('top-b')) : ?>
+			<div class="grid-child container-top-b">
+			<?php echo $topB; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('sidebar-left')) : ?>
+			<div class="grid-child container-sidebar-left">
+			<?php echo $sidebarLeft; ?>
+			</div>
+			<?php endif; ?>
+
+		<div class="grid-child container-component">
+<?php echo $mainTop; ?>
+			<?php echo $message; ?>
+			<?php echo $breadcrumbs; ?>
+			<?php echo $component; ?>
+			<?php echo $mainBottom; ?>
+		</div>
+
+<?php if ($this->countModules('sidebar-right')) : ?>
+			<div class="grid-child container-sidebar-right">
+			<?php echo $sidebarRight; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('bottom-a')) : ?>
+			<div class="grid-child container-bottom-a">
+			<?php echo $bottomA; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('bottom-b')) : ?>
+			<div class="grid-child container-bottom-b">
+			<?php echo $bottomB; ?>
+			</div>
+			<?php endif; ?>
+
+		<?php if ($this->countModules('footer')) : ?>
+			<footer class="grid-child container-footer full-width footer">
+				<div class="container">
+	<?php echo $footer; ?>
+				</div>
+			</footer>
+<?php endif; ?>
+
+		<?php echo $debug; ?>
+
+		<?php echo $scripts; ?>
+	</body>
+</html>
diff --git a/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini b/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini
new file mode 100644
index 00000000..20016071
--- /dev/null
+++ b/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini
@@ -0,0 +1,3 @@
+TPL_FACILE_XML_DESCRIPTION="Facile is a blazingly fast Joomla 4 template, using the HiQ CSS framework."
+; Parameters
+TPL_FACILE_LOGO_LABEL="Logo"
diff --git a/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini b/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini
new file mode 100644
index 00000000..5dd5c3a0
--- /dev/null
+++ b/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini
@@ -0,0 +1,16 @@
+FACILE="Facile - Site template"
+TPL_FACILE_POSITION_MENU="Menu"
+TPL_FACILE_POSITION_SEARCH="Search"
+TPL_FACILE_POSITION_BANNER="Banner"
+TPL_FACILE_POSITION_TOP-A="Top-a"
+TPL_FACILE_POSITION_TOP-B="Top-b"
+TPL_FACILE_POSITION_MAIN-TOP="Main-top"
+TPL_FACILE_POSITION_BREADCRUMBS="Breadcrumbs"
+TPL_FACILE_POSITION_MAIN-BOTTOM="Main-bottom"
+TPL_FACILE_POSITION_SIDEBAR-LEFT="Sidebar-left"
+TPL_FACILE_POSITION_SIDEBAR-RIGHT="Sidebar-right"
+TPL_FACILE_POSITION_BOTTOM-A="Bottom-a"
+TPL_FACILE_POSITION_BOTTOM-B="Bottom-b"
+TPL_FACILE_POSITION_FOOTER="Footer"
+TPL_FACILE_POSITION_DEBUG="Debug"
+TPL_FACILE_XML_DESCRIPTION="Facile is a blazingly fast Joomla 4 template."
diff --git a/src/templates/facile/templateDetails.xml b/src/templates/facile/templateDetails.xml
new file mode 100644
index 00000000..206b7c6c
--- /dev/null
+++ b/src/templates/facile/templateDetails.xml
@@ -0,0 +1,69 @@
+<?xml version="1.0" encoding="utf-8"?>
+<extension type="template" client="site" method="upgrade">
+	<name>facile</name>
+	<creationDate>[DATE]</creationDate>
+	<author>[AUTHOR]</author>
+	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
+	<authorUrl>[AUTHOR_URL]</authorUrl>
+	<copyright>[COPYRIGHT]</copyright>
+	<license>GNU General Public License version 2 or later;</license>
+	<version>__BUMP_VERSION__</version>
+	<description>TPL_FACILE_XML_DESCRIPTION</description>
+
+	<files>
+		<filename>component.php</filename>
+		<filename>error.php</filename>
+		<filename>index.php</filename>
+		<filename>offline.php</filename>
+		<filename>templateDetails.xml</filename>
+		<filename>template_preview.png</filename>
+		<filename>template_thumbnail.png</filename>
+		<folder>language</folder>
+	</files>
+
+	<positions>
+		<position>menu</position>
+		<position>search</position>
+		<position>banner</position>
+		<position>top-a</position>
+		<position>top-b</position>
+		<position>main-top</position>
+		<position>main-bottom</position>
+		<position>breadcrumbs</position>
+		<position>sidebar-left</position>
+		<position>sidebar-right</position>
+		<position>bottom-a</position>
+		<position>bottom-b</position>
+		<position>footer</position>
+		<position>debug</position>
+	</positions>
+
+	<config>
+		<fields name="params">
+			<fieldset name="advanced">
+				<field
+					name="logoFile"
+					type="media"
+					default=""
+					label="TPL_FACILE_LOGO_LABEL"
+				/>
+
+				<field
+					name="siteTitle"
+					type="text"
+					default=""
+					label="JGLOBAL_TITLE"
+					filter="string"
+				/>
+
+				<field
+					name="siteDescription"
+					type="text"
+					default=""
+					label="JGLOBAL_DESCRIPTION"
+					filter="string"
+				/>
+			</fieldset>
+		</fields>
+	</config>
+</extension>
diff --git a/src/templates/facile/template_preview.png b/src/templates/facile/template_preview.png
new file mode 100644
index 00000000..0d17c73d
Binary files /dev/null and b/src/templates/facile/template_preview.png differ
diff --git a/src/templates/facile/template_thumbnail.png b/src/templates/facile/template_thumbnail.png
new file mode 100644
index 00000000..c356778b
Binary files /dev/null and b/src/templates/facile/template_thumbnail.png differ

```

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
