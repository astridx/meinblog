---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-15
title: 'Sprachdateien nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: sprachdateien-nutzen
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Dein Ziel war, dass beschreibende Text in den Ansichten nicht mit dem Programmcode gemischt werden. So sind sie unkompliziert über das Joomla Backend änderbar. Dies ist jedem Nutzer möglich. Auch dem, der sich im Programmcode nicht auskennt. Nebenbei ist dies die Voraussetzung dafür, dass deine Erweiterung mehrsprachig ist! Aus diesem Grund hast du die tatsächlichen Texte nicht direkt in den Programmcode eingegeben, sondern anstelle davon Sprachstrings genutzt. Konkret meine ich mit beschreibenden Texten die Texte, welche im Frontend der Website via Browser angezeigt werden, zum Beispiel mit der Breadcrumb-Navigation "Aktuelle Seite". Du hattest alles so vorbereitet, dass du spezielle Dateien nutzt. Diese sind unkompliziert austauschbar. Bisher hast du deshalb kryptische Texte in den Browseransichten gesehen. In diesem Teil übersetzen wir die unschönen Sprachstrings in für Menschen lesbare Worte.<!-- \index{Sprachstrings} -->

> Selbst wenn deine Zielgruppe die englisch Sprache spricht und du ausschließlich diese Sprache unterstützt ist es wichtig, eine Sprachdatei für Texte zu verwenden, welche du im Front-End oder im Back-End der Komponente anzeigst. So ist es Nutzern möglich, Texte mithilfe eines Sprachoverrides[^docs.joomla.org/j3.x:language_overrides_in_joomla/de] zu überschreiben, ohne den Quellcode zu bearbeiten. Unter Umständen schreibt ein Benutzer lieber _Vorname_ anstelle von _Name_ in die Spaltenüberschrift.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t7...t8)[^codeberg.org/astrid/j4examplecode/compare/t7...t8] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Die Ansicht der Website im Frondend und der Administrationsbereich nutzen jeweils eigene Sprachdateien. Anders als im Frontend, wo es nur eine Datei gibt, benötigt das Backend zwei - `*.sys.ini` und `*.ini`. Kurz erklärt: Die Datei mit der Endung `sys.ini` wird zum Übersetzen der XML-Installationsdatei sowie der Menüelemente verwendet. Die `ini` ist für den Rest zuständig. Dies hat den Vorteil, dass bei er Installation und für den Aufbau des Menüs nur das Laden von kleinen Textdateien notwendig ist. Nachteilig wirkst sich aus, dass teilweise Sprachstrings doppelt einzutragen sind. Erklärt ist dies im Artikel [International Enhancements](http://docs.joomla.org/International_Enhancements_for_Version_1.6), der einen Abschnitt über [die Datei `*.sys.ini`](http://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini)[^docs.joomla.org/international_enhancements_for_version_1.6#the_new_.sys.ini] enthält.

> Das Hinzufügen der englischen Sprachdateien ist zwingend erforderlich. Alle anderen Sprachen sind optional. Der Grund hierfür ist, dass bei einer fehlenden Datei standardmäßig auf die englische Version zurückgegriffen wird. Wenn ein Franzose eine Erweiterung - welche deutsche und englische Sprachdateien enthält - auf seinem Joomla mit der Standardsprache Französisch installiert, werden die Texte in englischer Sprache angezeigt. Achtung: Dies gilt lediglich für fehlende Sprach-Dateien. Ein Fehlender Sprachschlüssel in einer nicht-englischen Sprachdatei wird nicht mit dem Schlüssel aus der englischen Datei ersetzt. Das bedeutet, dass es zwingend ist, dass die Dateien vollständig ist. Joomla sucht nicht in verschieden Sprachversion nach einem in einer Datei fehlenden Sprachstring.

### Exkurs: Besonderheiten

> Möchtest du dir ganz genau ansehen, wie die ini-Datei geparst wird? Unter [php.net](https://www.php.net/manual/de/function.parse-ini-file.php)[^php.net/manual/de/function.parse-ini-file.php] findest du die Beschreibung der Funktion, die diese Arbeit übernimmt.

#### Auskommentieren

Du kannst mithilfe eines Semikolons `;` eine Zeile als Kommentar markieren.

```
; Joomla Project
; (C) 2005 Open Source Matters, Inc. <https://www.joomla.org>
; License GNU General Public License version 2 or later; see LICENSE.txt
; Note : All ini files need to be saved as UTF-8
....
```

#### Escapen

Es gibt Zeichen die eine besondere Bedeutung haben - beispielsweise die Anführungszeichen `"`, die den Beginn und dass Ende der Übersetzung markieren. Diese Bedeutung ist mit einem Backslash `\` aufhebbar.

```
...
COM_CONTACT_CONTACT_REQUIRED="<strong class=\"red\">*</strong> Required field"

...

```

> Sprachstrings in Joomla verwendeten in der Vergangenheit die Zeichenfolge `_QQ_`, um doppelte Anführungszeichen innerhalb der Sprach-INI-Dateien zu vermeiden. Dies war eine kurzfristige Lösung. Ältere PHP-Versionen waren nicht in der Lage, doppelte Anführungszeichen zu verarbeiten. Weitere Informationen findest du im [PR 19024.](https://github.com/joomla/joomla-cms/issues/19024)[^github.com/joomla/joomla-cms/issues/19024]

#### Variablen

Manchmal hängt die Ausgabe des Sprachstrings von einer Variablen ab. Die Funktion `Text::sprintf` sorgt dafür, dass du den Text nicht selbst im Programmcode zusammensetzen musst. Gib anstelle der Variablen in der Sprachdatei ein Zeichen mit dem Prefix `%` ein. Beispielsweise kannst du `%s` verwenden.

> Bist du an der genauen Struktur der Funktion `Text::sprintf` interessiert? Du findest sie in Joomla in der Datei `libraries/src/Language/Text.php`.

```
...
COM_CONTACT_CHECKED_OUT_BY="Checked out by %s"
...
```

Im PHP-Code sieht der Aufruf dann wie folgt aus.

```
...
Text::sprintf('COM_CONTACT_CHECKED_OUT_BY', $checkoutUser->name)
...
```

Der Wert von `$checkoutUser->name` wird anstelle der ersten Variablen im Sprachstring eingefügt. Hier im Beispiel anstelle von `%s`.

> Gibt es mehr als eine Variable? Du kannst angeben, welche Variable zu welchem Sprachstring gehört. Verwenden Sie zum Beispiel `%1$s, %2$s` wie in `JLIB_DATABASE_ERROR_STORE_FAILED="%1$s: :store failed<br>%2$s"`. Die Werte werden in der Reihenfolge zugewiesen, die in der Nummer hinter dem Zeichen "%" angegeben ist.

#### Einzahl/Mehrzahl

Es gibt Einzahl oder Singular und Mehrzahl oder Plural und die Joomla Sprachstrings unterstützen dies.

Nehmen wir den Aufruf

```
...
$message = Text::plural('COM_FOOS_N_ITEMS_FEATURED', count($ids));
...
```

als Beispiel.

Jenachdem, ob `count($ids)` den Wert `1` oder `2` hat wird der Sprachstring `COM_FOOS_N_ ITEMS_FEATURED_1` oder `COM_FOOS_N_ ITEMS_FEATURED_2` verwendet. Hat `count($ids)` weder den Wert `1` noch `2`, wird `COM_FOOS_N_ ITEMS_FEATURED` herangezogen.

```
...
COM_FOOS_N_ITEMS_FEATURED="%d foos featured."
COM_FOOS_N_ITEMS_FEATURED_1="Foo featured."
COM_FOOS_N_ITEMS_FEATURED_2="Two foos featured."
...
```

### Neue Dateien

Erstelle sechs Dateien, um neben der englischen die deutsche Sprache zu unterstützen. Jede Datei ist wie folgt aufgebaut: Pro Zeile wird eine Sprachzeichenfolge eingefügt. Die _linke Seite_ des Gleichheitszeichens in der Sprachzeichenfolge, beispielsweise `COM_FOOS_ CONFIGURATION` in `COM_FOOS_ CONFIGURATION="Foo Optionen"`, ist immer in Großbuchstaben. Normalerweise steht zu Beginn der Name der Erweiterung, in unserem Fall ist das `COM_FOOS`. Danach fügst du idealerweise eine kurze Beschreibung hinzu. Hier beschreibst du kurz, wofür dieser String genutzt wird. Stelle sicher, dass du kein Leerzeichen verwendest. Es sind nur Buchstaben und Unterstriche zulässig. Die _rechte Seite_ der Sprachzeichenfolge, beispielsweise `Foo Optionen` in `COM_FOOS_ CONFIGURATION = "Foo Optionen"`, ist der tatsächliche Text, der auf der Site angezeigt wird. Wenn deine Erweiterung in eine weitere Sprache übersetzt wird, ändert der Übersetzer nur diese rechte Seite des Sprachstrings in seiner Sprachdatei. Die rechte Seite wird in Anführungszeichen eingefasst.

<!-- prettier-ignore -->
#### administrator/components/com_foos/language/de-DE/com_foos.ini

Wir ergänzen die deutsche Sprachversion für den Administrationsbereich mit den Dateien `administrator/components/com_foos/language/de-DE/com_foos.ini` und `administrator/components/com_foos/language/de-DE/com_foos.sys.ini`.

> Sei nicht verwirrt, wenn du eine Menge Texte in den Beispieldateien siehst. Diese werden im Moment noch nicht alle genutzt. Ich füge hier nun schon die Text für die zukünftigen Kapitel ein.

[administrator/components/com_foos/language/de-DE/com_foos.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/administrator/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/administrator/components/com_foos/language/de-DE/com_foos.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Optionen"
COM_FOOS_FOOS="Foos"
COM_FOOS_CATEGORIES="Kategorien"
...
```

> Namenskonventionen: Jede Sprachdatei ist mit einem Kürzel gekennzeichnet, welches in der [ISO-639](https://de.wikipedia.org/wiki/ISO_639)[^de.wikipedia.org/wiki/iso_639] und [ISO-3166](https://de.wikipedia.org/wiki/ISO_3166)[^de.wikipedia.org/wiki/iso_3166] festgelegt ist: Die ersten beiden Kleinbuchstaben benennen die Sprache. Für Deutsch ist das `de` und `en` für Englisch. Nach dem Bindestrich weisen die zwei Großbuchstaben auf das Land. So können die Besonderheiten im Schweizerdeutsch zum Beispiel über `CH` oder Österreichisch über `AT` vom `DE` abgegrenzt werden. Ein Verzeichnis mit dem Namen `de-CH` enthält die Übersetzung für die Schweiz und `de-AT` die österreichische Variante.

<!-- prettier-ignore -->
#### administrator/components/com_foos/language/de-DE/com_foos.sys.ini

Wie bereits erwähnt, benötigst du im Backend zwei Sprachdateien: Eine mit der Endung `.ini` und eine, die mit `sys.ini` endet. Die [`sys.ini`](https://docs.joomla.org/International_Enhancements_for_Version_1.6#The_new_.sys.ini) wird in erster Linie bei der Installation und für die Anzeige der Menüpunkte verwendet und die `ini` für alles andere.

[administrator/components/com_foos/language/de-DE/com_foos.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/administrator/components/com_foos/language/de-DE/com_foos.sys.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Optionen"
...
COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Alles hier passiert vor der Installation / Aktualisierung / Deinstallation der Komponente</p>"
COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>TDie Komponente wurde aktualisiert</p>"
COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>Die Komponente wurde deinstalliert</p>"
COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>Die Komponente wurde installiert</p>"
COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Alles hier passiert nach der Installation / Aktualisierung / Deinstallation der Komponente</p>"
...
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/language/en-GB/com_foos.ini

Ich hatte es schon geschrieben: Die englischen Versionen der Spachdateien sollte immer als Rückfallposition vorhanden sein.

[administrator/components/com_foos/language/en-GB/com_foos.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/administrator/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/administrator/components/com_foos/language/en-GB/com_foos.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
COM_FOOS_FOOS="Foos"
COM_FOOS_CATEGORIES="Categories"
...
```

<!-- prettier-ignore -->
#### administrator/components/com_foos/language/en-GB/com_foos.sys.ini

Auch die Datei `administrator/components/com_foos/language/en-GB/com_foos.sys.ini` ergänzen wir als Rückfallposition für alle nicht deutschen oder englischen Joomla-Installationen.

[administrator/components/com_foos/language/en-GB/com_foos.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/administrator/components/com_foos/language/en-GB/com_foos.sys.ini -->

COM_FOOS="[PROJECT_NAME]"
COM_FOOS_CONFIGURATION="Foo Options"
...
COM_FOOS_INSTALLERSCRIPT_PREFLIGHT="<p>Anything here happens before the installation/update/uninstallation of the component</p>"
COM_FOOS_INSTALLERSCRIPT_UPDATE="<p>The component has been updated</p>"
COM_FOOS_INSTALLERSCRIPT_UNINSTALL="<p>The component has been uninstalled</p>"
COM_FOOS_INSTALLERSCRIPT_INSTALL="<p>The component has been installed</p>"
COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT="<p>Anything here happens after the installation/update/uninstallation of the component</p>"
...
```

<!-- prettier-ignore -->
#### components/com_foos/language/de-DE/com_foos.ini

Im Frontend gibt es lediglich die `.ini` - also keine `sys.ini`. Die Datei `components/com_foos/language/de-DE/com_foos.ini` implementiert die deutsche Sprache.

[components/com_foos/language/de-DE/com_foos.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/components/com_foos/language/de-DE/com_foos.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/components/com_foos/language/de-DE/com_foos.ini -->

COM_FOOS_NAME="Vorname: "
...
```

<!-- prettier-ignore -->
#### components/com_foos/language/en-GB/com_foos.ini

Die englische Version ergänzen wir in der Datei `components/com_foos/language/en-GB/com_foos.ini`, damit diese in allen Sprachen als Rückfall verwendet wird.

[components/com_foos/language/en-GB/com_foos.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/components/com_foos/language/en-GB/com_foos.ini)

```xml {numberLines: -2}
<!-- htttps://codeberg.org/astrid/j4examplecode/raw/branch/t8/src/components/com_foos/language/en-GB/com_foos.ini -->

COM_FOOS_NAME="Surname: "
...
```

> In den nächsten Kapiteln kommen weitere Sprachstrings hinzu. Die erwähne ich dort nicht separat. Die meisten habe ich in dieser Lektion schon in den Beispieldateien integriert. So vermeide ich, dass die Dateien in der Diff-Ansicht erscheinen und die unnötig aufbläht. Ich meine die Diff-Ansicht des Programmcodes der verschiedenen Kapitel auf Github, auf die ich hier im Text verweise.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

Damit die Sprachdateien bei einer Installation der Erweiterung in Joomla Core kopiert werden, fügen wir den Eintrag `<folder>language</folder>` für das Frontend und das Backend im Manifest ein.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/administrator/components/com_foos/foos.xml)

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

Die Joomla eigenen Komponenten speichern die Dateien für den Administrationsbereich im Ordner `/administrator/language/en-GB/` und die für die Site im Ordner `/language/en-GB/`. Dies ist der erste Ort, in dem Joomla nach den Sprachdateien sucht. Aus diesem Grund war es üblich, dass Erweiterungsentwickler hier ihre Dateien ablegten. Manchmal ist es unkomplizierter, sie im eigenen Komponentenordner abzulegen. In unserem Beispiel ist dies der Ordner `administrator/components/com_foos/language/en-GB/` im Falle des Administrationsbereichs und `components/com_foos/language/en-GB/` für das Frontend. Das ist der Ort, an dem Joomla nach der Sprachdatei sucht, wenn es in den Joomla-Core-Verzeichnissen `/administrator/language/en-GB /` beziehungsweise `/language/en-GB` nichts Passendes findet.

Du möchtest deine Sprachdateien im gleichen Verzeichnis wie die Joomla Kernerweiterungen speichern? Um deine Dateien zusammen mit den Joomla eigenen Sprachdateien abzulegen, fügst du das `<language>`-Tag zum Installationsmanifest hinzu. Hier ein Beispiel aus `com_contact`,

```xml
...
	<files folder="components/com_contact">
...
	</files>

	<languages folder="site">
		<language tag="en-GB">language/en-GB.com_contact.ini</language>
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

bei dem du den Wert des Parameters `folder` an deine Struktur anpassen musst:

```xml
...
	<files folder="components/com_foos">
...
	</files>

	<languages folder="language">
		<language tag="en-GB">language/en-GB.com_foos.ini</language>
	</languages>

	<administration>
...
		<languages folder="administrator/language">
			<language tag="en-GB">language/en-GB.com_foos.ini</language>
			<language tag="en-GB">language/en-GB.com_foos.sys.ini</language>
		</languages>
	</administration>
...
```

<!-- prettier-ignore -->
#### components/com_foos/tmpl/foo/default.php

Ein letzter Schritt fehlt noch. Die eigene Nutzung der Sprachstrings. Bisher haben wir den Namen ohne Label im Frontend via `echo $this->item->name;` ausgegeben. Jetzt ergänzen wir ein Label, bei dem wir unterschiedliche Sprachen berücksichtigen. Der nachfolgende Code bewirkt, dass im Frontend der String ausgegeben wir, der in der entsprechenden Sprachdatei eingetragen ist. Hierfür sorgt die Anweisung `Text::_('COM_FOOS_NAME')`. Gib es eine spanische Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Nombre"` und ist im Frondend die spanische Sprache aktiv, dann wird `Nombre` ausgegeben. Ist die deutsche Sprache eingestellt und gibt es die deutsche Sprachdatei mit dem Eintrag `COM_FOOS_FIELD_NAME_LABEL="Name"` steht an der Stelle das Wort `Name`. Ist die spanische Sprache aktiv ohne dass es eine spanische Sprachdatei gibt, wird die englische Sprachdatei herangezogen.

[components/com_foos/tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t8/src/components/com_foos/tmpl/foo/default.php)

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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter. Falls du eine neue Installation durchführst, wirst du feststellen, dass die Hinweise im Installationsskript nun übersetzt werden. 

> Im Falle eines Discovery werden die Texte unter Umständen unterdrückt[^github.com/joomla/joomla-cms/issues/36343]. 

![Joomla Sprachdateien werden genutzt](/images/j4x10x3.png)

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und Frontend und überzeuge dich davon, dass die Texte lesbar und nicht mehr kryptisch sind.

![Joomla Sprachdateien werden genutzt](/images/j4x10x1.png)

3. Probiere die neue Funktion aus. Erstelle Sprachdateien für verschiedene Sprachen und ändere die Standardsprache in Joomla. Stelle sicher, dass Joomla korrekt übersetzt.

4. Erstelle ein Sprach-Override und überzeuge dich davon, dass es angewendet wird.

![Joomla Sprachdateien - Sprach-Override anlegen](/images/j4x10x2a.png)

![Joomla Sprachdateien - Sprach-Override verwenden](/images/j4x10x2b.png)
<img src="https://vg08.met.vgwort.de/na/c3fefbfb25494d4f85cdbe453536a93d" width="1" height="1" alt="">
