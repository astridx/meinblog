---
date: 2020-12-02
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Joomla Update und Change Log einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-update-und-change-logeinrichten
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Du wirst deine Komponente weiterentwickeln. Wie stellst du sicher, dass die User immer die neueste Version verwenden? Woher wissen sie von einem Update? Jetzt, wo das Grundgerüst der Erweiterung fertig ist, ist es wichtig, dass deine Anwender von Weiterentwicklungen erfahren.

In diesem Kapitel erläutere ich dir, wie du einen Update-Server für deine Komponente erstellst und ausführst. Falls du erst weiter an den Funktionen arbeiten möchtest, verstehe ich dies voll und ganz. Überspringe dann einfach diesen Abschnitt und komme wieder zurück, wenn du deine Erweiterung veröffentlichst.

Update Server klingt kompliziert, im Grunde handelt es sich lediglich eine URL zu einer XML-Datei. Diese URL wird im Installationsmanifest der Erweiterung eingefügt. Die XML-Datei enthält eine Reihe von Details, einschließlich der neuen Versionsnummer und die Download-URL zur Installationsdatei. Wenn Joomla eine Aktualisierung für eine installierte Erweiterung findet, wird dies im Administrationsbereich angezeigt.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1...t1b)[^github.com/astridx/boilerplate/compare/t1...t1b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Im aktuellen Abschnitte kommen zwei Datei hinzu, die außerhalb der Website gespeichert werden. Die Adressen oder URLs unter der diese abgelegt sind, hatten wir im vorherigen Kapitel in der Datei `src/administrator/components/com_foos/foos.xml` eingetragen.

```xml
<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
<updateservers>
	<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
</updateservers>
```

### Neue Dateien

> Die Änderungen bezüglich des Changelogs und des Joomla Update Servers werden nur in diesem Kapitel erwähnt. In jedem anderen Kapitel kannst du die Zahlen selbst aktualisieren, wenn dies für dich wichtig ist. Dies ist kein Hexenwerk. Wenn ich das immer wieder beschreiben würde, würde es dich nicht nur langweilen - es würde diesen Text unnötig aufblähen.

#### [foo_update.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-3bc7af7f15e37f2136334901bd05115b) (Update Server)<!-- \index{Update Server} -->

Du hast der Komponente in der Datei [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) mitgeteilt, wo sie sich über Updates informiert. Nämlich in der Datei `foo_update.xml`.

Erstelle die Datei [foo_update.xml](https://github.com/astridx/boilerplate/blob/t1b/foo_update.xml). Die Datei kann beliebig benannt werden, solange der Name mit dem Namen übereinstimmt, den du in der Installations-XML [administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) festgelegt hast.

Das Tag `updates` umgibt alle Update-Elemente. Erstelle einen neuen Update-Abschnitt, wenn du eine neue Version veröffentlichst.

> Wenn deine Erweiterung mehrere Joomla Versionen unterstütz, erstelle für jede Joomla Version eine separate `<update>`-Definitionen.

Der Wert `name` wird in der Ansicht `Extension Manager Update` angezeigt. Wenn du hier den Namen deiner Erweiterung verwendest, vermeidst du Verwirrung.

Der Wert des Tags `description` wird angezeigt, wenn du den Mauszeiger über den Namen in der Aktualisierungsansicht bewegen.

Der Wert des `element`-Tags ist der Name der Erweiterung. Dieser sollte mit dem Wert in der Elementspalte in der Tabelle `#__extensions` in der Datenbank übereinstimmen.

Der Wert des Tags `type` beschreibt, um welche Erweiterung es sich handelt, ob es eine Komponente, ein Modul oder ein Plugin ist.

Der Wert des Tags `version` ist die Versionsnummer der aktuellen Version. Diese Versionsnummer muss höher sein, als die in Joomla installierte Version der Erweiterung, damit das verfügbare Update angezeigt wird.

Das Tag `changelogurl` ist optional und ermöglicht es, einen Link anzuzeigen, der über die Änderungen in der aktuellen Version informiert. `changelogurl` wird später in diesem Kapitel behandelt.

Das Tag `infourl` ist optional und ermöglicht es dir, einen Link anzuzeigen, der über das Update informiert.

Das Tag `downloads` zeigt alle verfügbaren Download-Speicherorte für ein Update an.
Der Wert des Tags `downloadurl` ist die URL zum Herunterladen der Erweiterung. Diese Datei kann sich an einer beliebigen Stelle befinden.
Das Attribut `type` beschreibt, ob es sich um ein vollständiges Paket oder ein Update handelt.
Und das Attribut `format` definiert den Pakettyp wie `zip` or `tar`.

The Tags `maintainer` und `maintainerurl` sind selbsterklärend.

Das Tag `targetplatform` beschreibt die Joomla Version, für die dieses Update bestimmt ist. Der Wert des Attributs `name` sollte auf `joomla` gesetzt werden: `<targetplatform name="joomla" version="4.*"/>`.

> Wenn du dein Update für eine ganz bestimmte Joomla Version erstellst kannst du `min_dev_level` und`max_dev_level` verwenden.

Manchmal möchtest du, dass dein Update für eine Mindest-PHP-Version verfügbar ist. Erledige dies mit dem Tag `php_minimum`.

Schließe am Ende alle Tags `</update></updates>`

> Für Plugins füge ein Tag mit dem Namen `folder` und ein Tag mit dem Namen `client` hinzu. Diese Tags werden nur für Plugins benötigt.

Das Tag `folder` beschreibt den Typ des Plugins. Abhängig vom Plugin-Typ kann dies beispielsweise `system`, `content` oder `search` sein.
Der Wert des `client`-Tags beschreibt die `client_id` in der Datenbanktabelle `#__extensions`. Der Wert für Plugins ist immer `0`, Komponenten sind immer `1`. Module und Templates können jedoch variieren, je nachdem, ob es sich um ein Frontend oder ein Backend-Modul handelt.

Nachfolgend siehst du die vollständige Datei.

[foo_update.xml](https://github.com/astridx/boilerplate/blob/t1b/foo_update.xml)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1b/foo_update.xml

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

> Magst du eine Prüfsumme verwenden? Sieh dir die Testbeschreibung im [PR github.com/joomla/joomla-cms/pull/30076](https://github.com/joomla/joomla-cms/pull/30076) an, wenn du nicht weißt wie du dies umsetzt. Unter Ubuntu Linux ist es möglich über die Konsole mit `sha256sum -b meineDatei.zip` oder `sha284sum -b meineDatei.zip` die Prüfsumme zu berechnen.

#### [changelog.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-264e4bc4cab45c9b271bf9b5779607e2) (Changelog)<!-- \index{Changelog} -->

Informationen zum Changelog findest du unter in Github im PR [github.com/joomla/joomla-cms/pull/24026](https://github.com/joomla/joomla-cms/pull/24026) und in der [Joomla Dokumentation](https://docs.joomla.org/Adding_changelog_to_your_manifest_file/de)[^docs.joomla.org/adding_changelog_to_your_manifest_file/de]. Nachfolgend siehst du eine Beispieldatei.

[changelog.xml](https://github.com/astridx/boilerplate/blob/t1b/changelog.xml)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1b/changelog.xml

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

> Du weißt nicht, was `<![CDATA[ ... ]]>` bedeutet? Der [Begriff CDATA](https://de.wikipedia.org/wiki/cdata)[^de.wikipedia.org/wiki/cdata] wird in der Auszeichnungssprache XML für verschiedene Zwecke verwendet. Er zeigt an, dass es sich bei einem bestimmten Teil des Dokuments um allgemeine Zeichen handelt und nicht um Programmcode mit einer spezifischeren, begrenzten Struktur. Der CDATA-Abschnitt kann Auszeichnungszeichen (`<`, `>` und `&`) enthalten. Diese werden vom Parser nicht weiter interpretiert. Die Verwendung von Entitäten wie `&lt;` und `&amp;` ist nicht notwendig.

### Geänderte Dateien

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t1...t1b#diff-1ff20be1dacde6c4c8e68e90161e0578)

Lediglich die Versionsnummer wurde angepasst. Diese Änderung ist in ähnlicher Form in jedem neuen Kapitel erforderlich, da immer eine neue Funktion hinzu kommt. Ich erwähne das im weiteren nicht explizit.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/src/administrator/components/com_foos/foos.xml)

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

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus Teil 1 weiter.

2. Als nächstes erstellst du eine weitere Version der Beispiel-Erweiterung. Ändere dazu die Versionsnummer im Manifest. Vorher ist es nicht möglich, den Update Server zu testen. Denn, es gibt bisher keine Aktualisierung. Ich erwähne dies hier trotzdem, was genau nach dem Erstellen der nächsten Versionen passiert.

3. Wenn alles funktioniert siehst du nach der Installation diese Anzeigen vor dir, wenn du links das Menü `System` anklickst und dann rechts `Extension` im Bereich `Updates` auswählst. Das Bild hzeigt den Stand, nachdem die Version 23.0.0 veröffentlicht wurde.

![Joomla Update Server](/images/j4x2x1.png)

4. Öffne also `System | Update | Extension`. Hier wird dir die Aktualisierung für deine Komponente angeboten. Falls dies nicht der Fall ist, klicke auf die Schaltfläche `Find Updates`.

5. Beim ersten Öffnen siehst du den Hinweis `The Download Key` is missing, weil du das Element `dlid` im Manifest eingetragen hast.

6. Füge einen Download Key über `System | Update Sites` hinzu. Klicke hierzu auf den Namen deiner Komponente. Dann siehst du das Textfeld, in das du einen beliebigen Wert einträgst. Zum jetzigen Zeitpunkt wird dieser beim Abruf des Updates nicht geprüft. Speichere den Wert.

![Joomla Update Sites](/images/j4x2x2.png)

![Joomla Update Sites](/images/j4x2x2_2.png)

7. Wenn du zurück zu `System | Update | Extension` navigierst, ist es dir möglich, eine Aktualisierung anzustoßen oder dir das Changelog anzusehen.

> Die Aktualisierung war vorher nicht möglich, weil der `Download Key` nicht konfiguriert war.

> Klicke die Schaltfläche `Find Updates` in der Werkzeugleiste, falls das Update nicht mehr angezeigt wird.

![Joomla Update Server](/images/j4x2x3.png)

## Links

[Einen Update-Server bereitstellen](https://docs.joomla.org/Deploying_an_Update_Server/de)[^docs.joomla.org/deploying_an_update_server/de]
