---
date: 2021-01-02
title: 'Joomla 4.x Tutorial - Extension Development - Dashboard'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-dashboard-fuer-deine-erweiterung
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Extensive Joomla Core extensions have a dashboard in which related functions are displayed. This is user-friendly because it provides an overview. This way, a user can orientate himself in the extension without many clicks. In this part, we create such a dashboard for our sample component.<!-- \index{dashboard} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t27...t28)[^github.com/astridx/boilerplate/compare/t27...t28] and incorporate these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-ccf142664dd6f4ef27cf3d390b9fd93f)

In the file `administrator/components/com_foos/presets/foos.xml` we define what is displayed on the dashboard by default.

[administrator/components/com_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/blob/7d68b12d50e602b39b39f2459dccfa8d507b31e9/src/administrator/components/com_foos/presets/foos.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t28/src/administrator/components/com_foos/presets/foos.xml -->

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

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-1ff20be1dacde6c4c8e68e90161e0578)

We modify the XML manifest so that the sidebar in the Joomla administration template knows how to link to the dashboard.

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
+			<menu link="option=com_foos">
+				COM_FOOS
+				<params>
+					<menu-quicktask-title>COM_FOOS</menu-quicktask-title>
+					<menu-quicktask>index.php?option=com_foos&amp;view=foo&amp;layout=edit</menu-quicktask>
+				</params>
+			</menu>
 			<menu link="option=com_foos">COM_FOOS</menu>
-			<menu link="option=com_categories&amp;extension=com_foos">JCATEGORY</menu>
+			<menu link="option=com_categories&amp;extension=com_foos">
+				JCATEGORY
+				<params>
+					<menu-quicktask-title>JCATEGORY</menu-quicktask-title>
+					<menu-quicktask>index.php?option=com_categories&amp;view=category&amp;layout=edit&amp;extension=com_foos</menu-quicktask>
+				</params>
+			</menu>
 			<menu link="option=com_fields&amp;context=com_foos.foo">JGLOBAL_FIELDS</menu>
 			<menu link="option=com_fields&amp;view=groups&amp;context=com_foos.foo">JGLOBAL_FIELD_GROUPS</menu>
 		</submenu>

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ script.php](https://github.com/astridx/boilerplate/compare/t27...t28#diff-7aceee287e50092f4d9e6caaec3b8b40)

In the installation script we add the call. With this, we call a Joomla-specific function that makes our dashboard known in the CMS.

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
 public function install($parent): bool
 			return false;
 		}
 
+		$this->addDashboardMenu('foos', 'foos');
+
 		return true;
 	}
 
 public function update($parent): bool
 	{
 		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');
 
+		$this->addDashboardMenu('foo', 'foo');
+
 		return true;
 	}

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

Install your component as described in part one, after copying all files. Joomla will update the namespaces for you during the installation. Since a new file has been added, this is necessary. 2.

2. use the dashboard in the backend.

![The Joomla Dashboard in a separate component](/images/j4x33x1.png)

## Links

[Allow 3rd party components to create the dashboard](https://github.com/joomla/joomla-cms/pull/28027)[^https://github.com/joomla/joomla-cms/pull/28027]
