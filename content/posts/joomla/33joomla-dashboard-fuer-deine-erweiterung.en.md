---
date: 2021-01-02
title: 'Joomla 4.x Tutorial - Extension Development - Accessing the Dashboard'
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

Joomla Core extensions have a dashboard that displays related functions. In this part we will create one for our sample component.

![Dashboard in Joomla extension](/images/j4x33x1.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t27...t28) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-ccf142664dd6f4ef27cf3d390b9fd93f)

[administrator/components/com_foos/ presets/foos.xml](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/presets/foos.xml)

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

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t27...t28#diff-1ff20be1dacde6c4c8e68e90161e0578)

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/foos.xml)

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

#### [administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/compare/t27...t28#diff-7aceee287e50092f4d9e6caaec3b8b40)

[administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/blob/44ff1b6651cc7be86f9d52e243f7be6bd9871954/src/administrator/components/com_foos/script.php)

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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Installiere deine Komponente wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Nutze im Backend das Dashboard.

![Joomla Dahboard](/images/j4x33x1.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t27...t28.diff

## Links

https://github.com/joomla/joomla-cms/pull/28027
