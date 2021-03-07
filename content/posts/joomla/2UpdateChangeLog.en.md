---
date: 2020-12-02
title: 'Joomla 4.x Tutorial - Extension Development - Joomla Update and Change Log Setup'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-update-und-change-logeinrichten
langKey: en
categories:
  - Code
  - JoomlaEn
tags:
  - CMS
  - Joomla
---

You will continue to develop your component. How do you make sure that users always use the latest version? How do they know about an update? Now that the basic framework of the extension is ready, it's important that your users know about enhancements.

In this chapter I will explain how to create and run an update server for your component. If you want to continue working on the features first, I fully understand. **Then just skip this unit.**

Update Server sounds complicated, basically it's just a URL to an XML file specified in the XML installation file. This XML contains a number of details, including the new version and the download URL. When Joomla finds an update, this is displayed in the administration area.

![Joomla Update Server](/images/j4x2x3.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1...t1b) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Im aktuellen Abschnitte kommen zwei Datei hinzu, die außerhalb der Website im Internet gespeichert werden. Die Adressen oder URLs unter diesen diesen abgelegt sind, hatten wir im vorherigen Kapitel in der Datei `src/administrator/components/com_foos/foos.xml` eingefügt.

![Übersicht über die Dateien im zweiten Kapitel](/images/j4xzwei.png)

### Neue Dateien

Die Änderungen, die das Changelog und den Joomla Update Server betreffen, erwähne ich nur in diesem Kapitel. In jedem weiteren ist erforderlich, dass du die Nummern selbst anpasst, wenn dir dies wichtig ist. Das ist kein Hexenwerk. Wenn ich dies immer wieder neu beschrieb, langweilte dich das nicht nur - es blähte diesen Text unnötig auf.

#### [foo_update.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-3bc7af7f15e37f2136334901bd05115b) (Update Server)

Du hast der Komponente in der Datei [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) mitgeteilt, wo sie sich über Updates informiert.

Erstelle die Datei [foo_update.xml](https://github.com/astridx/boilerplate/blob/t1b/foo_update.xml). Die Datei kann beliebig benannt werden, solange sie mit dem Namen übereinstimmt, den du in der Installations-XML [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) festgelegt hast.

Das Tag `updates` umgibt alle Update-Elemente. Erstelle jedes Mal einen weiteren Update-Abschnitt, wenn du eine neue Version veröffentlichst.

> Wenn deine Erweiterung andere Joomla Versionen unterstütz, erstelle für jede Version eine separate `<update>`-Definitionen.

Der Wert von `name` wird in der Ansicht "Extension Manager Update" angezeigt. Wenn du denselben Namen wie die Erweiterung verwendest, vermeidst u Verwirrung:

Der Wert des Tags `description` wird angezeigt, wenn du den Mauszeiger über den Namen in der Aktualisierungsansicht bewegen.

Der Wert des `element`-Tags ist der installierte Name der Erweiterung. Dies sollte mit dem Wert in der Elementspalte in der Tabelle `#__extensions` in Ihrer Datenbank übereinstimmen.

Der Wert des Tags `type` beschreibt, um welche Erweiterung es sich handelt, z. B. ob es sich um eine Komponente, ein Modul oder ein Plugin handelt.

Der Wert des Tags `version` ist die Versionsnummer für diese Version. Diese Versionsnummer muss höher sein, als die aktuell installierte Version der Erweiterung, damit das verfügbare Update angezeigt wird.

Das Tag `changelogurl` ist optional und ermöglicht es, einen Link anzuzeigen, der über die Änderungen in dieser Version informiert. Diese Datei ist ebenfalls Thema dieses Kapitels.

Das Tag `infourl` ist optional und ermöglicht es dir, einen Link anzuzeigen, der über das Update oder einen Versionshinweis informiert.

Das Tag `downloads` zeigt alle verfügbaren Download-Speicherorte für ein Update an.
Der Wert des Tags `downloadurl` ist die URL zum Herunterladen der Erweiterung. Diese Datei kann sich an einer beliebigen Stelle befinden.
Das Attribut `type` beschreibt, ob es sich um ein vollständiges Paket oder ein Update handelt, und das Format.
Und das Attribut `format` definiert den Pakettyp wie `zip` or `tar`.

The Tags `maintainer` und `maintainerurl` sind selbsterklärend.

Das Tag `targetplatform` beschreibt die Joomla Version, für die dieses Update bestimmt ist. Der Wert des Attributs `name` sollte immer auf "joomla" gesetzt werden: `<targetplatform name="joomla" version="4.*"/>`.

> Wenn du dein Update für eine bestimmte Joomla Version erstellst kannst du `min_dev_level` und`max_dev_level` verwenden.

Manchmal möchtest du, dass dein Update für eine Mindest-PHP-Version verfügbar ist. Ereldig dies mit dem Tag `php_minimum`.

Schließe am Ende alle Tags `</update></updates>`

> Für Plugins füge ein Tag mit dem Namen `folder` und ein Tag mit dem Namen `client` hinzu. Diese Tags werden nur für Plugins benötigt.

Das Tag `folder` beschreibt den Typ des Plugins. Abhängig von Ihrem Plugin-Typ kann dies `system`, `content`, `search` usw. sein.
Der Wert des `client` -Tags beschreibt die client_id in der Tabelle #\_\_extension, die Joomla Wenn dies ein Site- (0) oder ein Administrator- (1) Erweiterungstyp ist. Plugins sind immer 0, Komponenten sind immer 1; Module können jedoch variieren, je nachdem, ob es sich um ein Front-End- oder ein Back-End-Modul handelt.

Nachfolgend siehst du die vollständige Datei.

[foo_update.xml](https://github.com/astridx/boilerplate/blob/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/foo_update.xml)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/foo_update.xml

<updates>
    <update>
        <name>com_foos</name>
        <description>This is com_foo</description>
        <element>com_foos</element>
        <type>component</type>
        <version>1.0.1</version>
		<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
		<infourl title="agosms">https://github.com/astridx/boilerplate/blob/v1.0.1/README.md</infourl>
        <downloads>
            <downloadurl type="full" format="zip">https://github.com/astridx/boilerplate/releases/download/v1.0.1/com_foos-1.0.1.zip</downloadurl>
        </downloads>
        <maintainer>Foo Creator</maintainer>
        <maintainerurl>http://www.example.com</maintainerurl>
        <targetplatform name="joomla" version="4.*"/>
		<php_minimum>7.1</php_minimum>
    </update>
</updates>

```

> Magst du eine Prüfsumme verwenden? Sieh dir die Testbeschreibung in diesem [PR](https://github.com/joomla/joomla-cms/pull/30076) an, wenn du nicht weißt wie du dies umsetzt.

#### [changelog.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-264e4bc4cab45c9b271bf9b5779607e2) (Changelog)

Informationen zum Changelog findest du unter in Github [Github](https://github.com/joomla/joomla-cms/pull/24026) und der [Dokumentation](https://docs.joomla.org/Adding_changelog_to_your_manifest_file).

[changelog.xml](https://github.com/astridx/boilerplate/blob/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/changelog.xml)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/changelog.xml

<changelogs>
	<changelog>
		<element>com_foos</element>
		<type>component</type>
		<version>1.0.0</version>
		<note>
			<item>Initial Version</item>
		</note>
	</changelog>
	<changelog>
		<element>com_foos</element>
		<type>component</type>
		<version>1.0.1</version>
		<security>
			<item><![CDATA[<p>No security issues.</p>]]></item>
		</security>
		<fix>
			<item>No fix</item>
		</fix>
		<language>
			<item>English</item>
		</language>
		<addition>
			<item>Change log and Update Server added.</item>
		</addition>
		<change>
			<item>No change</item>
		</change>
		<remove>
			<item>No remove</item>
		</remove>
		<note>
			<item>Change log and Update Server added.</item>
		</note>
	</changelog>
</changelogs>

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-1ff20be1dacde6c4c8e68e90161e0578)

Lediglich die Versionsnummer wurde angepasst. Diese Änderung ist in jedem neuen Kapitel erforderlich, da immer eine neue Funktion hinzu kommt. Ich erwähne das im Weiteren nicht explizit.

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/src/administrator/components/com_foos/foos.xml)

```php {diff}
 	<authorUrl>[AUTHOR_URL]</authorUrl>
 	<copyright>[COPYRIGHT]</copyright>
 	<license>GNU General Public License version 2 or later;</license>
-	<version>1.0.0</version>
+	<version>1.0.1</version>
 	<description>COM_FOOS_XML_DESCRIPTION</description>
 	<namespace path="src">FooNamespace\Component\Foos</namespace>
 	<scriptfile>script.php</scriptfile>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus Teil 1 weiter.

2. Als Nächstes erstellst du eine weitere Version der Beispiel-Erweiterung. Ändere dazu die Versionsnummer im Manifest. Vorher ist es nicht möglich, den Update Server zu testen. Denn, es gibt bisher keine Aktualisierung. Ich erwähne dies hier trotzdem, was genau nach dem Erstellen der nächsten Versionen passiert.

3. Wenn alles funktioniert siehst du nach der Installation diese Anzeigen vor dir, wenn du links das Menü `System` anklickst und dann rechts `Extension` im Bereich `Updates` auswählst. Das Bild hzeigt den Stand, nachdem die Version 23.0.0 veröffentlicht wurde.

![Joomla Update Server](/images/j4x2x1.png)

4. Öffne also `System | Update | Extension`. Hier wird dir die Aktualisierung für deine Komponente angeboten. Falls dies nicht der Fall ist, klicke auf die Schaltfläche `Find Updates`.

5. Beim ersten Öffnen siehst du den Hinweis `The Download Key` is missing, weil du das Element `dlid` im Manifest eingetragen hast.

6. Füge einen Download Key über `System | Update Sites` hinzu. Klicke hierzu auf den Namen deiner Komponente. Dann siehst du das Textfeld, in das du einen beliebigen Wert einträgst. Zum jetzigen Zeitpunkt wird dieser beim Abruf des Updates nicht geprüft. Speichere den Wert.

![Joomla Update Sites](/images/j4x2x2.png)

![Joomla Update Sites](/images/j4x2x2_2.png)

5. Wenn du zurück zu System Update Extension navigierst, ist es dir möglich, eine Aktualisierung anzustoßen oder dir das Changelog anzusehen.

> Die Aktualisierung war vorher nicht möglich, weil der `Download Key` nicht konfiguriert war.

> Klicke die Schaltfläche `Find Updates` in der Werkzeugleiste, falls das Update nicht mehr angezeigt wird.

![Joomla Update Server](/images/j4x2x3.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t1...t1b.diff

```

## Links
