---
date: 2020-12-10
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Sprachdateien nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: sprachdateien-nutzen
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel war, dass deine Erweiterung mehrsprachig ist! Deshalb hast du die Texte nicht direkt in den Programmcode eingegeben. Konkret meine ich die Texte, welche im Browser angezeigt werden. Du hattest alles so vorbereitet, dass du spezielle Dateien nutzt. Diese sind unkompliziert austauschbar. Bisher hast du deshalb kryptische Texte gesehen. In diesem Teil übersetzen wir die unschönen Sprachstrings.

![Joomla Sprachdateien werden genutzt](/images/j4x10x1.png)

> Selbst wenn deine Zielgruppe die englisch Sprache spricht und du ausschließlich diese Sprache unterstützt ist es wichtig, eine Sprachdatei für Texte zu verwenden, welche du im Front-End oder im Back-End der Komponente anzeigst. So ist es Nutzern möglich, Texte zu überschreiben, ohne den Quellcode zu bearbeiten. Unter Umständen schreibt ein Benutzer lieber _Vorname_ anstelle von _Name_ in die Spaltenüberschrift

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t7...t8) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Die Ansicht der Website im Frondend und der Administrationsbereich nutzen jeweils eigene Sprachdateien. Anders als im Frontend, wo es nur eine gibt, benötigt das Backend zwei - `*.sys.ini` und `*.ini`. Kurz erklärt: Die Datei mit der Endung `sys.ini` wird zum Übersetzen der XML-Installationsdatei sowie der Menüelemente verwendet. Die `ini` ist für den Rest zuständig. Dies hat den Vorteil, dass bei er Installation und für den Aufbau des Menüs nur das Laden von kleinen Textdateien notwendig ist. Nachteilig wirkst sich aus, dass teilweise Sprachstrings doppelt einzutragen sind. Erklärt ist dies im Artikel [International Enhancements](http://docs.joomla.org/International_Enhancements_for_Version_1.6), der einen Abschnitt über [die Datei `*.sys.ini`](http://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini) enthält.

> Das Hinzufügen der englischen Sprachdateien ist zwingend erforderlich. Alle anderen Sprachen sind optional. Der Grund hierfür ist, dass bei einer fehlenden Datei standardmäßig auf die englische Version zurückgegriffen wird. Wenn ein Franzose die Erweiterung - welches deutsche und englische Sprachdateien enthält - auf seinem Joomla mit der Standardsprache Französisch installiert, werden die Texte in englischer Sprache angezeigt.

### Neue Dateien

Erstelle die folgenden sechs Dateien, um neben der englischen die deutsche Sprache zu unterstützen.

Die linke Seite des Gleichheitszeichens in der Sprachzeichenfolge, beispielsweise `COM_FOOS_CONFIGURATION` in `COM_FOOS_CONFIGURATION="Foo Optionen"`, ist immer in Großbuchstaben. Normalerweise steht zu Beginn der Erweiterungsnamen, in unserem Fall ist das `COM_FOOS`. Danach fügst du idealerweise eine kurze Beschreibung hinzu. Hier beschreibst du kurz, wofür dieser String genutzt wird. Stelle sicher, dass du kein Leerzeichen verwendest. Es sind nur Buchstaben und Unterstriche zulässig.

Die rechte Seite der Sprachzeichenfolge, beispielsweise `Foo Optionen` in `COM_FOOS_CONFIGURATION = "Foo Optionen"`, ist der tatsächliche Text, der auf der Site angezeigt wird. Wenn deine Erweiterung in eine weitere Sprache übersetzt wird, ändert der Übersetzer nur diese rechte Seite des Sprachstrings in seiner Sprachdatei. Die rechte Seite wird in Anführungszeichen eingefasst.

#### [administrator/components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cb357e383d05f82d66215fa10abf3bde)

Wir ergänzen die deutsche Sprachversion für den Administrationsbereich mit den Dateien `administrator/components/com_foos/ language/de-DE/com_foos.ini` und `administrator/components/com_foos/ language/de-DE/com_foos.sys.ini`.

> Sei nicht verwirrt, wenn du eine Menge Texte siehst. Diese werden im Moment noch nicht alle genutzt. Ich füge hier nun schon die Text für die zukünftigen Kapitel ein.

[administrator/components/com_foos/ language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/administrator/components/com_foos/language/de-DE/com_foos.ini -->

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

##### Namenskonventionen

Jede Sprachdatei ist mit einem Kürzel gekennzeichnet, welches in der [ISO-639](https://de.wikipedia.org/wiki/ISO_639 'ISO-639 Joomla') und [ISO-3166](https://de.wikipedia.org/wiki/ISO_3166 'ISO-3166') festgelegt ist: Die ersten beiden Kleinbuchstaben benennen die Sprache. Für Deutsch ist das `de` und `en` für Englisch.

Nach dem Bindestrich weisen die zwei Großbuchstaben auf das Land. So können die Besonderheiten im Schweizerdeutsch zum Beispiel über `CH` oder Österreichisch über `AT` vom `DE` abgegrenzt werden. Ein Verzeichnis mit dem Namen `de-CH` enthält die Übersetzung für die Schweiz und `de-AT` die österreichische Variante.

#### [administrator/components/com_foos/ language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-0bb25b2f8499b27811f2a24af0dd3987)

Wie bereits erwähnt, benötigst du zwei Sprachdateien: Eine mit der Endung `.ini` und eine, die mit `sys.ini` endet. Die [`sys.ini`](https://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini) wird in erster Linie bei der Installation und für die Anzeige der Menüpunkte verwendet und die `sys.ini` für alles andere.

> Der Grund für die Zweiteilung ist die Performance. Bei der Installation oder der Einrichtung der Navigation im Backend ist es so nicht notwendig, alle Sprachstrings zu laden. In kleinen Erweiterungen ist dieser Vorteil der zwei Sprachdateien meiner Meinung nach nicht groß. Deshalb befülle ich beide Dateien teilweise mit den gleichen Sprachzeichenfolgen. So bin ich auf der sicheren Seite. Das ist nicht professionell, hat sich für mich aber als tauglich in der Praxis erwiesen.

[administrator/components/com_foos/ language/de-DE/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini -->

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

#### [administrator/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-cbdc0f2989570582624b6f9332e7c2f2)

Ich hatte es schon geschrieben: Die englischen Versionen der Spachdateien sind zwingend.

[administrator/components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/administrator/components/com_foos/language/en-GB/com_foos.ini -->

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

#### [administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-2a376eb220cf55ce50bb756c0cd9bf59)

[administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://github.com/astridx/boilerplate/blob/06900d62cfdd55f77b785bd6b28262c30e11d45d/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini)

```xml {numberLines: -2}
# https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
...
```

#### [components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-9c71769b65375e899db729d95b37c96e)

Im Frontend gibt es lediglich die `.ini` - also keine `sys.ini`. Die Datei `components/com_foos/language/de-DE/com_foos.ini` implementiert die deutsche Sprache.

[components/com_foos/language/de-DE/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/components/com_foos/language/de-DE/com_foos.ini -->

COM_FOOS_NAME="Name: "

```

#### [components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/compare/t7...t8#diff-43a9aed65969ca2daddc1de76e8664a6)

Die zwingend notwendige englische Version ergänzen wir in der Datei `components/com_foos/language/en-GB/com_foos.ini`.

[components/com_foos/language/en-GB/com_foos.ini](https://github.com/astridx/boilerplate/blob/ecb72cf27bd1abf3157b25207b1aaaa723a7fe19/src/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!--  https://raw.githubusercontent.com/astridx/boilerplate/ea84a82ae28fcc0f55d3f653fe819200a0d7d84b/src/components/com_foos/language/en-GB/com_foos.ini -->

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

> In den nächsten Kapiteln kommen weitere Sprachstrings hinzu. Die erwähne ich dort nicht separat. Die meisten habe ich in dieser Lektion schon in den Beispieldateien integriert. So vermeide ich, dass die Dateien in der Diff-Ansicht erscheinen und die unnötig aufbläht. Konkret meine ich die Diff-Ansicht des Programmcodes der verschiedenen Kapitel auf Github, auf die ich hier verweise.

### Geänderte Dateien

#### [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t7...t8#diff-1ff20be1dacde6c4c8e68e90161e0578)

Damit die Sprachdateien bei einer Installation kopiert werden, fügen wir den Eintrag `<folder>language</folder>` für das Frontend und das Backend hinzu.

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

##### Wo werden die Sprachdateien idealerweise gespeichert?

Die Joomla eigenen Komponenten speichern die Dateien für den Administrationsbereich im Ordner `/administrator/language/en-GB/` und die für die Site im Ordner `/language/en-GB/`. Dies ist der erste Ort, in dem Joomla nach den Sprachdateien sucht. Aus diesem Grund war es üblich, dass Erweiterungsentwickler hier ihre Dateien ablegten. Manchmal ist es unkomplizierter, sie im eigenen Komponentenordner abzulegen. In unserem Beispiel ist dies der Ordner `administrator/components/com_foos/language/en-GB/` und `components/com_foos/language/en-GB/` für das Frontend. Das ist der Ort, an dem Joomla nach der Sprachdatei sucht, wenn es im Verzeichnis `/administrator/language/en-GB /` beziehungsweise `/ language/en-GB` nichts Passendes findet.

Um deine Dateien zusammen mit den Joomla eigenen Sprachdateien abzulegen, fügst du das `<language>`-Tag zur Installationsdatei hinzu. Hier ein Beispiel aus `com_contact`, bei dem du den Wert des Parameters `folder` an deine Struktur anpassen musst:

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

Bisher haben wir den Namen ohne Label im Frontend ausgegeben `echo $this->item->name;`. Jetzt ergänzen wir ein Label. Bei dem beachten wir die unterschiedlichen Sprachen. Der nachfolgende Code bewirkt, dass anstelle von `Text::_('COM_FOOS_NAME')` im Frontend der String ausgegeben wir, der in der entsprechenden Sprachdatei eingetragen ist. Gib es eine spanische Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Nombre"` und ist im Frondend die spanische Sprache aktiv, dann wird `Nombre` ausgegeben. Ist die deutsche Sprache eingestellt und gibt es die deutsche Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Name"` steht an der Stelle das Wort `Name`.

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

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

> Falls du eine neue Installation druchführst, wirst du feststellen, dass die Hinweise im Installationsskript nun übersetzt werden.
> ![Joomla Sprachdateien werden genutzt](/images/j4x10x3.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und Frontend und überzeuge dich davon, dass die Texte lesbar und nicht mehr kryptisch sind.

![Joomla Sprachdateien werden genutzt](/images/j4x10x1.png)

3. try out the new feature. Create language files for different languages and change the default language in Joomla. Make sure that Joomla translates correctly.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t7...t8.diff

## Links
