---
date: 2021-01-02
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Zugriff auf das Dashboard'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-dashboard-fuer-deine-erweiterung
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Joomla Core-Erweiterungen verfügen über ein Dashboard, in dem zusammengehörige Funktionen angezeigt werden. In diesem Teil erstellen wir ein solches für unsere Beispielkomponente.

![Dashboard in Joomla Erweiterung](/images/j4x33x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t27...t28) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/presets/foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-ccf142664dd6f4ef27cf3d390b9fd93f)

[src/administrator/components/com_foos/presets/foos.xml](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/presets/foos.xml)

```xml
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

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-1ff20be1dacde6c4c8e68e90161e0578)

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/foos.xml)

```xml
...
<administration>
  <menu img="class:comment">
    COM_FOOS
    <params>
      <dashboard>foos</dashboard>
    </params>
  </menu>
  <submenu>
    <menu link="option=com_foos">
      COM_FOOS
      <params>
        <menu-quicktask-title>COM_FOOS</menu-quicktask-title>
        <menu-quicktask>index.php?option=com_foos&amp;view=foo&amp;layout=edit</menu-quicktask>
      </params>
    </menu>
    <menu link="option=com_categories&amp;extension=com_foos"
      view="categories" img="class:foos-cat" alt="Foos/Categories">
      JCATEGORY
      <params>
        <menu-quicktask-title>JCATEGORY</menu-quicktask-title>
        <menu-quicktask>index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_foos</menu-quicktask>
      </params>
    </menu>
  </submenu>
...
```

#### [src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/compare/t27...t28#diff-7aceee287e50092f4d9e6caaec3b8b40)

[src/administrator/components/com_foos/script.php](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/script.php)

```php
...
class Com_FoosInstallerScript extends InstallerScript
...
...
public function install($parent): bool
{
...
  $this->addDashboardMenu('foos', 'foos');

  return true;
}
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Nutze im Backend das Dashboard.

![Joomla! Dahboard](/images/j4x33x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t27...t28.diff

diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index 1fe73eb1..6580fe15 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -38,12 +38,28 @@
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
diff --git a/src/administrator/components/com_foos/presets/foos.xml b/src/administrator/components/com_foos/presets/foos.xml
new file mode 100644
index 00000000..35cad3e5
--- /dev/null
+++ b/src/administrator/components/com_foos/presets/foos.xml
@@ -0,0 +1,31 @@
+<?xml version="1.0"?>
+<menu
+	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
+	xmlns="urn:joomla.org"
+	xsi:schemaLocation="urn:joomla.org menu.xsd"
+	>
+	<menuitem
+		title="COM_FOOS"
+		type="heading"
+		icon="comment"
+		class="class:comment"
+		>
+		<menuitem
+			title="COM_FOOS"
+			type="component"
+			element="com_foos"
+			link="index.php?option=com_foos"
+			quicktask="index.php?option=com_foos&amp;view=foo&amp;layout=edit"
+			quicktask-title="COM_FOOS"
+		/>
+
+		<menuitem
+			title="JCATEGORY"
+			type="component"
+			element="com_foos"
+			link="index.php?option=com_categories&amp;extension=com_foos"
+			quicktask="index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_foos"
+			quicktask-title="JCATEGORY"
+		/>
+	</menuitem>
+</menu>
diff --git a/src/administrator/components/com_foos/script.php b/src/administrator/components/com_foos/script.php
index 4e74d518..c5f6cf10 100644
--- a/src/administrator/components/com_foos/script.php
+++ b/src/administrator/components/com_foos/script.php
@@ -14,13 +14,14 @@
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
@@ -95,6 +96,8 @@ public function install($parent): bool
 			return false;
 		}
 
+		$this->addDashboardMenu('foos', 'foos');
+
 		return true;
 	}
 
@@ -128,6 +131,8 @@ public function update($parent): bool
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');
 
+		$this->addDashboardMenu('foo', 'foo');
+
 		return true;
 	}
 

```

## Links

https://github.com/joomla/joomla-cms/pull/28027
