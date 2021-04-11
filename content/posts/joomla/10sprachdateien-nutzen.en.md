---
date: 2020-12-10
title: 'Joomla 4.x Tutorial - Extension Development - Using Language Files'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/sprachdateien-nutzen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Your goal was to make your extension multilingual! That's why you didn't enter the texts directly into the program code. Specifically, I mean the texts that are displayed in the browser. You had prepared everything so that you use special files. These are uncomplicated exchangeable. So far you have seen cryptic texts because of that. In this part we translate the unattractive language strings.

![Joomla language files are used](/images/j4x10x1.png)

> Even if your target audience speaks English and you only support this language it is important to use a language file for texts you display in the front-end or back-end of the component. This way it is possible for users to overwrite texts without editing the source code. Under some circumstances a user prefers to write _first name_ instead of _name_ in the column header

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t7...t8) and incorporate these changes into your development version.

## Step by step

The frontend view and the administration area each use their own language files. Unlike the frontend, where there is only one, the backend needs two - `*.sys.ini` and `*.ini`. Briefly explained: The file with the extension `sys.ini` is used to translate the XML installation file as well as the menu elements. The `ini` is responsible for the rest. This has the advantage that during the installation and for the construction of the menu only the loading of small text files is necessary. A disadvantage is that some language strings have to be entered twice. You can find out more in the article [International Enhancements](http://docs.joomla.org/International_Enhancements_for_Version_1.6) which has a section on [the file `*.sys.ini`](http://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini).

> The addition of the English language files is mandatory. All other languages are optional. The reason for this is that if a file is missing, the English version is used by default. If a Frenchman installs the extension - which contains German and English language files - on his Joomla with the default language French, the texts will be displayed in English.

### New files

Create the following six files to support the German language in addition to English.

The left side of the equal sign in the language string, for example `COM_FOOS_CONFIGURATION"` in `COM_FOOS_CONFIGURATION="Foo Options"`, is always in upper case. Normally the extension name is at the beginning, in our case it is `COM_FOOS`. After that you ideally add a short description. Here you describe briefly what this string is used for. Make sure that you do not use spaces. Only letters and underscores are allowed.

The right side of the language string, for example `Foo Options"` in `COM_FOOS_CONFIGURATION = "Foo Options"`, is the actual text that will be displayed on the site. When your extension is translated into another language, the translator only changes this right side of the language string in his language file. The right side is enclosed in quotation marks.

#### [administrator/components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cb357e383d05f82d66215fa10abf3bde)

We add the German language version for the administration area with the files 'administrator/components/com_foos/ language/en-DE/com_foos.ini' and 'administrator/components/com_foos/ language/en-DE/com_foos.sys.ini'.

> Don't be confused if you see a lot of texts. These are not all used at the moment. I'm already inserting the text for the future chapters here.

[administrator/components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/administrator/components/com_foos/language/de-DE/com_foos.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Optionen"

COM_FOOS_MANAGER_FOO_NEW="Neu"
COM_FOOS_MANAGER_FOO_EDIT="Bearbeiten"
COM_FOOS_MANAGER_FOOS="Foo Manager"

COM_FOOS_TABLE_TABLEHEAD_NAME="Name"
COM_FOOS_TABLE_TABLEHEAD_ID="ID"
COM_FOOS_ERROR_FOO_NOT_FOUND="Foo nicht gefunden"

COM_FOOS_FIELD_NAME_LABEL="Name"

COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL="Namensschild anzeigen"
COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC="Diese Einstellungen gelten für alle foo."
COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY="Foo"

```

##### Naming conventions

Each language file is marked with an abbreviation, which is defined in [ISO-639](https://en.wikipedia.org/wiki/ISO_639) and [ISO-3166](https://en.wikipedia.org/wiki/ISO_3166): The first two lower case letters name the language. For German this is `de` and `en` for English.

After the hyphen, the two capital letters indicate the country. For example, Swiss German can be distinguished from `DE` by `CH` or Austrian by `AT`. A frolder named `de-CH` contains the translation for Switzerland and `de-AT` the Austrian variant.

#### [administrator/components/com_foos/ language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-0bb25b2f8499b27811f2a24af0dd3987)

As mentioned before, you need two language files: one ending with `.ini` and one ending with `sys.ini`. The [`sys.ini`](https://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini) is primarily used during installation and for displaying the menu items and the `sys.ini` for everything else.

> The reason for this dichotomy is performance. When installing or setting up the navigation in the backend, it is thus not necessary to load all language strings. In small extensions this advantage of two language files is not big in my opinion. Therefore I partially fill both files with the same language strings. This way I am on the safe side. This is not professional, but it has proven to be suitable for me in practice.

[administrator/components/com_foos/ language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_XML_DESCRIPTION="Foo Komponente"

COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Alles hier passiert vor der Installation / Aktualisierung / Deinstallation der Komponente</p>"
COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>TDie Komponente wurde aktualisiert</p>"
COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>Die Komponente wurde deinstalliert</p>"
COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>Die Komponente wurde installiert</p>"
COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Alles hier passiert nach der Installation / Aktualisierung / Deinstallation der Komponente</p>"

COM_FOOS_FOO_VIEW_DEFAULT_TITLE="Ein einzelnes Foo"
COM_FOOS_FOO_VIEW_DEFAULT_DESC="Dies ist ein Link zu den Informationen für ein Foo."
COM_FOOS_SELECT_FOO_LABEL="Wählen Sie ein foo aus"

COM_FOOS_CHANGE_FOO="Ändern Sie ein foo"
COM_FOOS_SELECT_A_FOO="Wählen Sie ein foo aus"
```

#### [administrator/components/com_foos/ language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cbdc0f2989570582624b6f9332e7c2f2)

I had already written it: The English versions of the language files are mandatory.

[administrator/components/com_foos/ language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/administrator/components/com_foos/language/en-GB/com_foos.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
COM_FOOS_FOOS="Foos"
COM_FOOS_CATEGORIES="Categories"

COM_FOOS_MANAGER_FOO_NEW="New"
COM_FOOS_MANAGER_FOO_EDIT="Edit"
COM_FOOS_MANAGER_FOOS="Foo Manager"

COM_FOOS_TABLE_TABLEHEAD_NAME="Name"
COM_FOOS_TABLE_TABLEHEAD_ID="ID"
COM_FOOS_ERROR_FOO_NOT_FOUND="Foo not found"

COM_FOOS_FIELD_NAME_LABEL="Name"

COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL="Show name label"
COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC="These settings apply for all foo."
COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY="Foo"

COM_FOOS_FIELD_PUBLISH_DOWN_LABEL="Finish Publishing"
COM_FOOS_FIELD_PUBLISH_UP_LABEL="Start Publishing"
COM_FOOS_N_ITEMS_PUBLISHED="%d foos published."
COM_FOOS_N_ITEMS_PUBLISHED_1="%d foo published."
COM_FOOS_N_ITEMS_UNPUBLISHED="%d foos unpublished."
COM_FOOS_N_ITEMS_UNPUBLISHED_1="%d foo unpublished."
COM_FOOS_N_ITEMS_CHECKED_IN_1="%d foo checked in."
COM_FOOS_N_ITEMS_CHECKED_IN_MORE="%d foos checked in."
COM_FOOS_N_ITEMS_FEATURED="%d foos featured."
COM_FOOS_N_ITEMS_FEATURED_1="Foo featured."
COM_FOOS_N_ITEMS_UNFEATURED="%d foos unfeatured."
COM_FOOS_N_ITEMS_UNFEATURED_1="Foo unfeatured."

COM_FOOS_EDIT_FOO="Edit Foo"
COM_FOOS_NEW_FOO="New Foo"

COM_FOOS_HEADING_ASSOCIATION="Association"
COM_FOOS_CHANGE_FOO="Change a foo"
COM_FOOS_SELECT_A_FOO="Select a foo"

COM_FOOS_TABLE_CAPTION="Foo Table Caption"

COM_FOOS_N_ITEMS_ARCHIVED="%d foos archived."
COM_FOOS_N_ITEMS_ARCHIVED_1="%d foo archived."
COM_FOOS_N_ITEMS_DELETED="%d foos deleted."
COM_FOOS_N_ITEMS_DELETED_1="%d foo deleted."
COM_FOOS_N_ITEMS_TRASHED="%d foos trashed."
COM_FOOS_N_ITEMS_TRASHED_1="%d foo trashed."
COM_FOO_MANAGER_FOOS="Foos"

COM_FOOS_FIELD_PARAMS_NAME_LABEL="Show Name"

COM_FOOS_FILTER_SEARCH_DESC="Search in foo name."
COM_FOOS_FILTER_SEARCH_LABEL="Search Foos"

```

#### [administrator/components/com_foos/ language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-2a376eb220cf55ce50bb756c0cd9bf59)

Also the file is `administrator/components/com_foos/ language/en-GB/com_foos.sys.ini` mandatory.

[administrator/components/com_foos/ language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_XML_DESCRIPTION="Foo Component"

COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the installation/update/uninstallation of the component</p>"
COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>The component has been updated</p>"
COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>The component has been uninstalled</p>"
COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>The component has been installed</p>"
COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the component</p>"

COM_FOOS_FOO_VIEW_DEFAULT_TITLE="Single Foo"
COM_FOOS_FOO_VIEW_DEFAULT_DESC="This links to the information for one foo."
COM_FOOS_SELECT_FOO_LABEL="Select a foo"

COM_FOOS_CHANGE_FOO="Change a foo"
COM_FOOS_SELECT_A_FOO="Select a foo"

COM_FOOS_FOO_VIEW_WITHHEAD_TITLE="Single Foo with a headertext"
COM_FOOS_FOO_VIEW_WITHHEAD_DESC="This links to the information for one foo with a headertext."

COM_FOOS_FEATURED_VIEW_DEFAULT_TITLE="Featured Foos"
COM_FOOS_FEATURED_VIEW_DEFAULT_DESC="This view lists the featured foos."

COM_FOOS_FORM_VIEW_DEFAULT_DESC="Create a new foo."
COM_FOOS_FORM_VIEW_DEFAULT_TITLE="Create Foo"

COM_FOOS_CATEGORY_VIEW_DEFAULT_TITLE="Category"

```

#### [components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-9c71769b65375e899db729d95b37c96e)

In the frontend there is only the `.ini` - so no `sys.ini`. The file `components/com_foos/language/en-DE/com_foos.ini` implements the German language.

[components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/components/com_foos/language/de-DE/com_foos.ini -->

COM_FOOS_NAME="Name: "

```

#### [components/com_foos/ language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-43a9aed65969ca2daddc1de76e8664a6)

We add the mandatory English version in the file `components/com_foos/ language/en-GB/com_foos.ini`.

[components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/t8/src/components/com_foos/language/en-GB/com_foos.ini -->

COM_FOOS_NAME="Name: "
COM_FOOS_FOO_NAME_LABEL="Name"
COM_FOOS_FIELD_NAME_LABEL="Name"
COM_FOOS_NEW_FOO="New"
COM_FOOS_EDIT_FOO="Edit"
JGLOBAL_FIELDSET_DISPLAY_OPTIONS="Display"
JGLOBAL_FIELDSET_PUBLISHING="Publishing"
COM_FOOS_FIELD_PARAMS_NAME_LABEL="Label"
JFIELD_ALT_LAYOUT_LABEL="Layout"
COM_FOOS_FIELD_PUBLISH_UP_LABEL="Publishing start"
COM_FOOS_FIELD_PUBLISH_DOWN_LABEL="Publishing end"

```

> In the next chapters more language strings will be added. I will not mention them separately there. I have already integrated most of them into the sample files in this lesson. This way I avoid that the files appear in the diff view and blow it up unnecessarily. Specifically, I mean the diff view of the program code of the various chapters on Github, which I refer to here.

### Modified files

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t7...t8#diff-1ff20be1dacde6c4c8e68e90161e0578)

So that the language files are copied during an installation, we add the `<folder>language</folder>` entry for the frontend and the backend.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/foos.xml)

```xml {diff}

 	</uninstall>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
+		<folder>language</folder>
 		<folder>src</folder>
 		<folder>tmpl</folder>
 	</files>

 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
 			<folder>forms</folder>
+			<folder>language</folder>
 			<folder>services</folder>
 			<folder>sql</folder>
 			<folder>src</folder>
```

##### Where are the language files ideally stored?

Joomla's own components store the files for the administration area in the folder `/administrator/language/en-GB/` and those for the site in the folder `/language/en-GB/`. This is the first place Joomla looks for the language files. For this reason, it was common for extension developers to put their files here. Sometimes it is more straightforward to put them in your own component folder. In our example, this is the folder `administrator/components/com_foos/language/en-GB/` and `components/com_foos/language/en-GB/` for the frontend. This is the place where Joomla looks for the language file if it doesn't find anything suitable in the directory `/administrator/language/en-GB /` and `/ language/en-GB` respectively.

To place your files together with Joomla's own language files, you add the `<language>` tag to the installation file. Here is an example from `com_contact` where you need to adjust the value of the `folder` parameter to your structure:

```xml
...
	<files folder="components/com_foos">
...
	</files>

	<languages folder="site">
		<language tag="en-GB">language/en-GB.com_foos.ini</language>
	</languages>

	<administration>
...
		<languages folder="admin">
			<language tag="en-GB">language/en-GB.com_contact.ini</language>
			<language tag="en-GB">language/en-GB.com_contact.sys.ini</language>
		</languages>
	</administration>
...
```

#### [components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t7...t8#diff-a33732ebd6992540b8adca5615b51a1f)

So far we have output the name without a label in the frontend `echo $this->item->name;`. Now we add a label. For this we consider the different languages. The following code causes that instead of `Text::_('COM_FOOS_NAME')` in the frontend the string is output, which is entered in the corresponding language file. If there is a Spanish language file with the entry `COM_FOOS_FIELD_NAME_LABEL="Nombre"` and the Spanish language is active in the frontend, then `Nombre` is output. If the German language is active and there is the German language file with the entry `COM_FOOS_FIELD_NAME_LABEL="Name"`, the word `Name` is displayed.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 \defined('_JEXEC') or die;
-?>

-<?php
-echo $this->item->name;
+use Joomla\CMS\Language\Text;
+
+echo Text::_('COM_FOOS_NAME') . $this->item->name;

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

If you do a new installation, you will notice that the hints in the installation script are now translated.

![Joomla language files are used](/images/j4x10x3.png)

2. open the view of your component in the administration area and frontend and make sure that the texts are readable and not cryptic anymore.

![Joomla language files are used](/images/j4x10x1.png)

3. sample the innovation. Create language files for different languages and change the default language in Joomla. Make sure that Joomla translates correctly.

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t7...t8.diff

## Links
