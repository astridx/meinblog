---
date: 2019-12-10
title: 'Sprachdateien nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: sprachdateien-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel war, dass deine Erweiterung mehrsprachig ist! Deshalb hast du die Texte, die im Frontend angezeigt werden, nicht direkt in den Programmcode eingegeben. Du hattest alles so vorbereitet, dass du spezielle Dateien nutzt, die austauschbar sind. Bisher hast du deshalb lange kryptische Texte gesehen. In diesem Teil übersetzten wir die unschönen Sprachstrings.

> Selbst wenn deine Zielgruppe die englisch Sprache spricht und du ausschließlich diese Sprache unterstützt ist es wichtig, eine Sprachdatei für den gesamten Text zu verwenden, welchen du im Front-End oder im Back-End der Komponente anzeigst. So ist es potentiellen Nutzern möglich, Texte zu überschreiben, ohne den Quellcode zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t7...t8) an und übernimm diese Änderungen in deine Entwicklungsversion.

```php {numberLines diff}
// https://github.com/astridx/boilerplate/compare/t7...t8.diff

diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index 8cbb3201..cb47107a 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -23,6 +23,7 @@
 	</uninstall>
 	<!-- Frond-end files -->
 	<files folder="components/com_foos">
+		<folder>language</folder>
 		<folder>src</folder>
 		<folder>tmpl</folder>
 	</files>
@@ -39,6 +40,7 @@
 		<files folder="administrator/components/com_foos">
 			<filename>foos.xml</filename>
 			<folder>forms</folder>
+			<folder>language</folder>
 			<folder>services</folder>
 			<folder>sql</folder>
 			<folder>src</folder>
diff --git a/src/administrator/components/com_foos/language/de-DE/com_foos.ini b/src/administrator/components/com_foos/language/de-DE/com_foos.ini
new file mode 100644
index 00000000..7509a5f5
--- /dev/null
+++ b/src/administrator/components/com_foos/language/de-DE/com_foos.ini
@@ -0,0 +1,16 @@
+COM_FOOS="[PROJECT_NAME]"
+COM_FOOS_CONFIGURATION="Foo Optionen"
+
+COM_FOOS_MANAGER_FOO_NEW="Neu"
+COM_FOOS_MANAGER_FOO_EDIT="Bearbeiten"
+COM_FOOS_MANAGER_FOOS="Foo Manager"
+
+COM_FOOS_TABLE_TABLEHEAD_NAME="Name"
+COM_FOOS_TABLE_TABLEHEAD_ID="ID"
+COM_FOOS_ERROR_FOO_NOT_FOUND="Foo nicht gefunden"
+
+COM_FOOS_FIELD_NAME_LABEL="Name"
+
+COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL="Namensschild anzeigen"
+COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC="Diese Einstellungen gelten für alle foo."
+COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY="Foo"
diff --git a/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini b/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini
new file mode 100644
index 00000000..10b620d2
--- /dev/null
+++ b/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini
@@ -0,0 +1,15 @@
+COM_FOOS="[PROJECT_NAME]"
+COM_FOOS_XML_DESCRIPTION="Foo Komponente"
+
+COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Alles hier passiert vor der Installation / Aktualisierung / Deinstallation der Komponente</p>"
+COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>TDie Komponente wurde aktualisiert</p>"
+COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>Die Komponente wurde deinstalliert</p>"
+COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>Die Komponente wurde installiert</p>"
+COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Alles hier passiert nach der Installation / Aktualisierung / Deinstallation der Komponente</p>"
+
+COM_FOOS_FOO_VIEW_DEFAULT_TITLE="Ein einzelnes Foo"
+COM_FOOS_FOO_VIEW_DEFAULT_DESC="Dies ist ein Link zu den Informationen für ein Foo."
+COM_FOOS_SELECT_FOO_LABEL="Wählen Sie ein foo aus"
+
+COM_FOOS_CHANGE_FOO="Ändern Sie ein foo"
+COM_FOOS_SELECT_A_FOO="Wählen Sie ein foo aus"
diff --git a/src/administrator/components/com_foos/language/en-GB/com_foos.ini b/src/administrator/components/com_foos/language/en-GB/com_foos.ini
new file mode 100644
index 00000000..69cc46c1
--- /dev/null
+++ b/src/administrator/components/com_foos/language/en-GB/com_foos.ini
@@ -0,0 +1,53 @@
+COM_FOOS="[PROJECT_NAME]"
+COM_FOOS_CONFIGURATION="Foo Options"
+COM_FOOS_FOOS="Foos"
+COM_FOOS_CATEGORIES="Categories"
+
+COM_FOOS_MANAGER_FOO_NEW="New"
+COM_FOOS_MANAGER_FOO_EDIT="Edit"
+COM_FOOS_MANAGER_FOOS="Foo Manager"
+
+COM_FOOS_TABLE_TABLEHEAD_NAME="Name"
+COM_FOOS_TABLE_TABLEHEAD_ID="ID"
+COM_FOOS_ERROR_FOO_NOT_FOUND="Foo not found"
+
+COM_FOOS_FIELD_NAME_LABEL="Name"
+
+COM_FOOS_FIELD_FOO_SHOW_CATEGORY_LABEL="Show name label"
+COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DESC="These settings apply for all foo."
+COM_FOOS_FIELD_CONFIG_INDIVIDUAL_FOO_DISPLAY="Foo"
+
+COM_FOOS_FIELD_PUBLISH_DOWN_LABEL="Finish Publishing"
+COM_FOOS_FIELD_PUBLISH_UP_LABEL="Start Publishing"
+COM_FOOS_N_ITEMS_PUBLISHED="%d foos published."
+COM_FOOS_N_ITEMS_PUBLISHED_1="%d foo published."
+COM_FOOS_N_ITEMS_UNPUBLISHED="%d foos unpublished."
+COM_FOOS_N_ITEMS_UNPUBLISHED_1="%d foo unpublished."
+COM_FOOS_N_ITEMS_CHECKED_IN_1="%d foo checked in."
+COM_FOOS_N_ITEMS_CHECKED_IN_MORE="%d foos checked in."
+COM_FOOS_N_ITEMS_FEATURED="%d foos featured."
+COM_FOOS_N_ITEMS_FEATURED_1="Foo featured."
+COM_FOOS_N_ITEMS_UNFEATURED="%d foos unfeatured."
+COM_FOOS_N_ITEMS_UNFEATURED_1="Foo unfeatured."
+
+COM_FOOS_EDIT_FOO="Edit Foo"
+COM_FOOS_NEW_FOO="New Foo"
+
+COM_FOOS_HEADING_ASSOCIATION="Association"
+COM_FOOS_CHANGE_FOO="Change a foo"
+COM_FOOS_SELECT_A_FOO="Select a foo"
+
+COM_FOOS_TABLE_CAPTION="Foo Table Caption"
+
+COM_FOOS_N_ITEMS_ARCHIVED="%d foos archived."
+COM_FOOS_N_ITEMS_ARCHIVED_1="%d foo archived."
+COM_FOOS_N_ITEMS_DELETED="%d foos deleted."
+COM_FOOS_N_ITEMS_DELETED_1="%d foo deleted."
+COM_FOOS_N_ITEMS_TRASHED="%d foos trashed."
+COM_FOOS_N_ITEMS_TRASHED_1="%d foo trashed."
+COM_FOO_MANAGER_FOOS="Foos"
+
+COM_FOOS_FIELD_PARAMS_NAME_LABEL="Show Name"
+
+COM_FOOS_FILTER_SEARCH_DESC="Search in foo name."
+COM_FOOS_FILTER_SEARCH_LABEL="Search Foos"
diff --git a/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini b/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini
new file mode 100644
index 00000000..7e555721
--- /dev/null
+++ b/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini
@@ -0,0 +1,26 @@
+COM_FOOS="[PROJECT_NAME]"
+COM_FOOS_XML_DESCRIPTION="Foo Component"
+
+COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the installation/update/uninstallation of the component</p>"
+COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>The component has been updated</p>"
+COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>The component has been uninstalled</p>"
+COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>The component has been installed</p>"
+COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the component</p>"
+
+COM_FOOS_FOO_VIEW_DEFAULT_TITLE="Single Foo"
+COM_FOOS_FOO_VIEW_DEFAULT_DESC="This links to the information for one foo."
+COM_FOOS_SELECT_FOO_LABEL="Select a foo"
+
+COM_FOOS_CHANGE_FOO="Change a foo"
+COM_FOOS_SELECT_A_FOO="Select a foo"
+
+COM_FOOS_FOO_VIEW_WITHHEAD_TITLE="Single Foo with a headertext"
+COM_FOOS_FOO_VIEW_WITHHEAD_DESC="This links to the information for one foo with a headertext."
+
+COM_FOOS_FEATURED_VIEW_DEFAULT_TITLE="Featured Foos"
+COM_FOOS_FEATURED_VIEW_DEFAULT_DESC="This view lists the featured foos."
+
+COM_FOOS_FORM_VIEW_DEFAULT_DESC="Create a new foo."
+COM_FOOS_FORM_VIEW_DEFAULT_TITLE="Create Foo"
+
+COM_FOOS_CATEGORY_VIEW_DEFAULT_TITLE="Category"
diff --git a/src/components/com_foos/language/de-DE/com_foos.ini b/src/components/com_foos/language/de-DE/com_foos.ini
new file mode 100644
index 00000000..95468148
--- /dev/null
+++ b/src/components/com_foos/language/de-DE/com_foos.ini
@@ -0,0 +1 @@
+COM_FOOS_NAME="Name: "
diff --git a/src/components/com_foos/language/en-GB/com_foos.ini b/src/components/com_foos/language/en-GB/com_foos.ini
new file mode 100644
index 00000000..ac23d9be
--- /dev/null
+++ b/src/components/com_foos/language/en-GB/com_foos.ini
@@ -0,0 +1,11 @@
+COM_FOOS_NAME="Name: "
+COM_FOOS_FOO_NAME_LABEL="Name"
+COM_FOOS_FIELD_NAME_LABEL="Name"
+COM_FOOS_NEW_FOO="New"
+COM_FOOS_EDIT_FOO="Edit"
+JGLOBAL_FIELDSET_DISPLAY_OPTIONS="Display"
+JGLOBAL_FIELDSET_PUBLISHING="Publishing"
+COM_FOOS_FIELD_PARAMS_NAME_LABEL="Label"
+JFIELD_ALT_LAYOUT_LABEL="Layout"
+COM_FOOS_FIELD_PUBLISH_UP_LABEL="Publishing start"
+COM_FOOS_FIELD_PUBLISH_DOWN_LABEL="Publishing end"
diff --git a/src/components/com_foos/tmpl/foo/default.php b/src/components/com_foos/tmpl/foo/default.php
index d1feb12c..e5205d7e 100644
--- a/src/components/com_foos/tmpl/foo/default.php
+++ b/src/components/com_foos/tmpl/foo/default.php
@@ -7,7 +7,7 @@
  * @license     GNU General Public License version 2 or later; see LICENSE.txt
  */
 \defined('_JEXEC') or die;
-?>

-<?php
-echo $this->item->name;
+use Joomla\CMS\Language\Text;
+
+echo Text::_('COM_FOOS_NAME') . $this->item->name;

```

## Schritt für Schritt

Die Ansicht der Website und der Administrationsbereich haben jeweils eigene Sprachdateien. Anders als im Frontend, wo es nur eine gibt, gibt es im Backend zwei. Kurz erklärt: Die Datei mit der Endung `sys.ini` wird zum Übersetzen der XML-Installationsdatei sowie der Menüelemente verwendet. Die `ini` ist für den Rest zuständig. Dies hat den Vorteil, dass bei er Installation und für den Aufbau des Menüs nur das Laden von kleinen Textdateien notwendig ist. Nachteilig wirkst sich aus, dass teilweise Sprachstrings doppelt eingetragen werden.

> Das Hinzufügen der englischen Sprachdateien ist zwingend erforderlich. Alle anderen Sprache sind optional.

### Neue Dateien

Erstelle die folgenden Dateien, um neben der englischen die deutsche Sprache zu unterstützen.

Die linke Seite des Gleichheitszeichens in der Sprachzeichenfolge ist immer in Großbuchstaben. Normalerweise steht zu Beginn der Erweiterungsnamen, in unserem Fall mit `COM_FOOS`. Danach fügst du idealerweise eine kurze Beschreibung hinzu, wofür dieser String genutzt wird. Stelle sicher, dass du kein Leerzeichen verwendest. Es sind nur Buchstaben und Unterstriche zulässig.

Die rechte Seite der Sprachzeichenfolge ist der tatsächliche Text, der auf der Site angezeigt wird. Wenn deine Erweiterung in eine weitere Sprache übersetzt wird, reicht es, wenn der Übersetzer nur diese rechte Seite des Sprachstrings in seiner neuen Sprachdatei ändert.

#### [src/administrator/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cb357e383d05f82d66215fa10abf3bde)

[src/administrator/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.ini)

```ini
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

#### [src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-0bb25b2f8499b27811f2a24af0dd3987)

[src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini)

```ini
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

#### [src/administrator/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cbdc0f2989570582624b6f9332e7c2f2)

[src/administrator/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.ini)

```ini
COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
...
```

#### [src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-2a376eb220cf55ce50bb756c0cd9bf59)

[src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini)

```ini
COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
...
```

#### [src/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-9c71769b65375e899db729d95b37c96e)

[src/components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/de-DE/com_foos.ini)

```ini
`COM_FOOS_NAME="Name: "
```

#### [src/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-43a9aed65969ca2daddc1de76e8664a6)

[src/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/en-GB/com_foos.ini)

```ini
COM_FOOS_NAME="Name: "
```

> In den nächsten Kapiteln kommen weitere Sprachstrings hinzu. Die erwähne ich dort nicht separat. Die meisten habe ich in dieser Lektion schon in den Beispieldateien integriert. So vermeide ich, dass die Dateien in der Diff-Ansicht erscheinen und die unnötig aufbläht.

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t7...t8#diff-1ff20be1dacde6c4c8e68e90161e0578)

Damit die Sprachdateien bei einer Installation kopiert werden, fügen wir den Eintrag `<folder>language</folder>` für das Frontend und das Backend hinzu.

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/foos.xml)

```xml
...
	<!-- Frond-end files -->
	<files folder="components/com_foos">
		<folder>language</folder>
		<folder>src</folder>
		<folder>tmpl</folder>
	</files>
    <media folder="media/com_foos" destination="com_foos">
		<folder>js</folder>
    </media>
	<!-- Back-end files -->
	<administration>
		<!-- Menu entries -->
		<menu view="foos">COM_FOOS</menu>
		<submenu>
			<menu link="option=com_foos">COM_FOOS</menu>
		</submenu>
		<files folder="administrator/components/com_foos">
			<filename>foos.xml</filename>
			<folder>forms</folder>
			<folder>language</folder>
			<folder>services</folder>
			<folder>sql</folder>
			<folder>src</folder>
			<folder>tmpl</folder>
		</files>
	</administration>
...
```

> Wo werden die Sprachdateien idealerweise gespeichert?  
> Die Joomla eigenen Komponenten speichern die Dateien für den Administrationsbereich im Ordner `/administrator/language/en-GB/` und die für die Site im Ordner `/language/en-GB/`. Dies ist der erste Ort, in dem Joomla nach den Sprachdateien sucht. Aus diesem Grund war es üblich, dass Erweiterungsentwickler hier ihre Dateien ablegten. Manchmal ist es unkomplizierter, sie im eigenen Komponentenordner abzulegen. In unserem Beispiel ist dies der Ordner `administrator/components/com_foos/language/en-GB/` und `components/com_foos/language/en-GB/` für das Frontend. Das ist der Ort, an dem Joomla nach der Sprachdatei sucht, wenn es im Verzeichnis `/administrator/language/en-GB /` beziehungsweise `/ language/en-GB/` nicht passendes findet.

Um deine Dateien zusammen mit den Joomla eigenen Sprachdateien abzulegen, fügst du das language Tag zur Installationsdatei wie folgt hinzu

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

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t7...t8#diff-a33732ebd6992540b8adca5615b51a1f)

Bisher haben wir den Namen ohne Label im Frontend ausgegeben `echo $this->item->name;`. Bei einem Label beachten wir die unterschiedlichen Sprachen. Der nachfolgende Code bewirkt, dass anstelle von `Text::_('COM_FOOS_NAME')` im Frontend der String ausgegeben wir, der in der entsprechenden Sprachdatei eingetragen ist. Gib es eine spanische Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Nombre"` und ist im Frondend die spanische Sprache aktiv, dann wird `Nombre` ausgegeben. Ist die deutsche Sprache eingestellt und gibt es die deutsche Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Name"` steht an der Stelle `Name`.

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/tmpl/foo/default.php)

```php
...
<?php
use Joomla\CMS\Language\Text;

echo Text::_('COM_FOOS_NAME') . $this->item->name;
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und Frontend und überzeuge dich davon, dass die Texte lesbar und nicht mehr kryptisch sind.

![Joomla! Sprachdateien werden genutzt](/images/j4x10x1.png)

3. Probe die Neuerung aus. Erstelle Sprachdateien für unterschiedliche Sprachen und verändere die Standardsprache in Joomla. Überzeuge dich davon, dass Joomla korrekt übersetzt.

## Geänderte Dateien

### Übersicht
