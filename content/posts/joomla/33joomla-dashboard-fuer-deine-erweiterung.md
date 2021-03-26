---
date: 2021-01-02
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Zugriff auf das Dashboard'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-dashboard-fuer-deine-erweiterung
langKey: de
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

Umfangreiche Joomla Core-Erweiterungen verfügen über ein Dashboard, in dem zusammengehörige Funktionen angezeigt werden. Das ist benutzerfreundlich, weil es einen Überblick bietet. So kann sich sich ein Benutzer ohne viele Klicks in der Erweiterung orientieren. In diesem Teil erstellen wir ein solches Dashboard für unsere Beispielkomponente.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t27...t28) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [administrator/components/com_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-3e57cc7bb34afac7fa0d4cb5dd66d925bee34fc4e12f58b1a59f836362889c0d)

In der Datei `administrator/components/com_foos/ presets/foos.xml` legen wir fest, was standardmäßig auf dem Dashboard angezeigt wird.

[administrator/components/com_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/blob/7d68b12d50e602b39b39f2459dccfa8d507b31e9/src/administrator/components/com_foos/presets/foos.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/7d68b12d50e602b39b39f2459dccfa8d507b31e9/src/administrator/components/com_foos/presets/foos.xml -->

<?xml version="1.0"?>
<menu
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="urn:joomla.org"
	xsi:schemaLocation="urn:joomla.org menu.xsd"
	>
	<menuitem
		title="COM_FOOS"
		type="heading"
		icon="comment"
		class="class:comment"
		>
		<menuitem
			title="COM_FOOS"
			type="component"
			element="com_foos"
			link="index.php?option=com_foos"
			quicktask="index.php?option=com_foos&amp;view=foo&amp;layout=edit"
			quicktask-title="COM_FOOS"
		/>

		<menuitem
			title="JCATEGORY"
			type="component"
			element="com_foos"
			link="index.php?option=com_categories&amp;extension=com_foos"
			quicktask="index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_foos"
			quicktask-title="JCATEGORY"
		/>
	</menuitem>
</menu>

```

### Geänderte Dateien

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-1ff20be1dacde6c4c8e68e90161e0578)

Wir passen das XML-Manifest an, damit die Seitenleiste im Joomla Administrationstemplate weiß, das und wie es das Dashboard verlinkt.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/foos.xml)

```xml {diff}
     </media>
 	<!-- Back-end files -->
 	<administration>
-		<!-- Menu entries -->
-		<menu view="foos">COM_FOOS</menu>
+		<menu img="class:comment">
+			COM_FOOS
+			<params>
+				<dashboard>foos</dashboard>
+			</params>
+		</menu>
 		<submenu>
-			<menu link="option=com_foos">COM_FOOS</menu>
+			<menu link="option=com_foos">
+				COM_FOOS
+				<params>
+					<menu-quicktask-title>COM_FOOS</menu-quicktask-title>
+					<menu-quicktask>index.php?option=com_foos&amp;view=foo&amp;layout=edit</menu-quicktask>
+				</params>
+			</menu>
 			<menu link="option=com_categories&amp;extension=com_foos"
-				view="categories" img="class:foos-cat" alt="Foos/Categories">JCATEGORY</menu>
+				view="categories" img="class:foos-cat" alt="Foos/Categories">
+				JCATEGORY
+				<params>
+					<menu-quicktask-title>JCATEGORY</menu-quicktask-title>
+					<menu-quicktask>index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_foos</menu-quicktask>
+				</params>
+			</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

#### [administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/compare/t27...t28#diff-7aceee287e50092f4d9e6caaec3b8b40)

Im Installationsskript fügen wir den Aufruf hinzu. Damit rufen wir eine Joomla-eigene Funktion auf die unsere Dashboard im CMS bekannt macht.

[administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/script.php)

```php {diff}
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Log\Log;
 use Joomla\CMS\Table\Table;
+use Joomla\CMS\Installer\InstallerScript;

 /**
  * Script file of Foo Component
  *
  * @since  __BUMP_VERSION__
  */
-class Com_FoosInstallerScript
+class Com_FoosInstallerScript extends InstallerScript
 {
 	/**
 	 * Minimum Joomla version to check
@@ -92,6 +93,8 @@ public function install($parent): bool
 			return false;
 		}

+		$this->addDashboardMenu('foos', 'foos');
+
 		return true;
 	}

@@ -125,6 +128,8 @@ public function update($parent): bool
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');

+		$this->addDashboardMenu('foo', 'foo');
+
 		return true;
 	}
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Nutze im Backend das Dashboard.

![Das Joomla Dahboard in einer eigenen Komponente](/images/j4x33x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t27...t28.diff

## Links

https://github.com/joomla/joomla-cms/pull/28027
