---
date: 2019-12-02
title: 'Joomla Update und Change Log einrichten'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-update-und-change-logeinrichten
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Du wirst deine Komponente weiterentwickeln. Wie stellst du sicher, dass die User immer die neueste Version verwenden? Woher wissen sie von einem Update? Jetzt, wo das Grundgerüst der Erweiterung fertig ist, ist es wichtig, dass deine Anwender von Weiterentwicklungen erfahren.

In diesem Kapitel erläutere ich dir, wie du einen Update-Server für deine Komponente erstellst und ausführst. Falls du erst weiter an den Funktionen arbeiten möchtest, verstehe ich dies voll und ganz. __Überspringe dann einfach diese Einheit.__

Update Server klingt kompliziert, im Grunde ist es nur eine URL zu einer XML-Datei, die in der XML-Installationsdatei angegeben ist. Diese XML enthält eine Reihe von Details, einschließlich der neuen Version und der Download-URL. Wenn Joomla! eine Aktualisierung findet, wird dies im Administrationsbereich angezeigt.

![Joomla Update Server](/images/j4x2x3.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t1...t1b) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Im aktuellen Abschnittel kommen zwei Datei hinzu, die außerhalb der Website im Internet gespeichert werden. Die Adressen oder URLS zu diesen hatten wir im vorherigen Kapitel in der Datei `src/administrator/components/com_foos/foos.xml` eingefügt.

![Übersicht über die Dateien im zweiten Kapitel](/images/j4xzwei.png)

### Neue Dateien

Die Änderungen, die das Changelog und den Joomla Update Server betreffen, erwähne ich nur in diesem Kapitel. In jedem weiteren ist erforderlich, dass du die Nummern selbst anpasst, wenn dir dies wichtig ist. Das ist kein Hexenwerk. Wenn ich dies immer wieder neu beschrieb, langweilte dich das nicht nur - es blähte diesen Text unnötig auf.

#### foo_update.xml (Update Server)


Du hast der Komponente in der Datei [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) mitgeteilt, wo sie sich über Updates informiert.

Erstelle die Datei [foo_update.xml](https://github.com/astridx/boilerplate/blob/t1b/foo_update.xml). Die Datei kann beliebig benannt werden, solange sie mit dem Namen übereinstimmt, den du in der Installations-XML [administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/t1b/src/administrator/components/com_foos/foos.xml) festgelegt hast.   

Das Tag `updates` umgibt alle Update-Elemente. Erstelle jedes Mal einen weiteren Update-Abschnitt, wenn du eine neue Version veröffentlichst.

> Wenn deine Erweiterung andere Joomla! Versionen unterstütz, erstelle für jede Version eine separate `<update>`-Definitionen.

```xml
<updates>
    <update>
```

Der Wert von `name` wird in der Ansicht "Extension Manager Update" angezeigt. Wenn du denselben Namen wie die Erweiterung verwendest, vermeidst u Verwirrung:

```xml
        <name>com_foos</name>
```
Der Wert des Tags `description` wird angezeigt, wenn du den Mauszeiger über den Namen in der Aktualisierungsansicht bewegen.

```xml
        <description>This is com_foo</description>
```
Der Wert des `element`-Tags ist der installierte Name der Erweiterung. Dies sollte mit dem Wert in der Elementspalte in der Tabelle `#__extensions` in Ihrer Datenbank übereinstimmen.

```xml
        <element>com_foos</element>
```

Der Wert des Tags `type` beschreibt, um welche Erweiterung es sich handelt, z. B. ob es sich um eine Komponente, ein Modul oder ein Plugin handelt.

```xml
        <type>component</type>
```

Der Wert des Tags `version` ist die Versionsnummer für diese Version. Diese Versionsnummer muss höher sein, als die aktuell installierte Version der Erweiterung, damit das verfügbare Update angezeigt wird.

```xml
        <version>1.0.1</version>
```

Das Tag `changelogurl` ist optional und ermöglicht es, einen Link anzuzeigen, der über die Änderungen in dieser Version informiert. Diese Datei ist ebenfalls Thema dieses Kapitels.

```xml
		<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>  

```

Das Tag `infourl` ist optional und ermöglicht es dir, einen Link anzuzeigen, der über das Update oder einen Versionshinweis informiert.

```xml
    <infourl title="agosms">https://github.com/astridx/boilerplate/blob/v1.0.1/README.md</infourl>
```

Das Tag `downloads` zeigt alle verfügbaren Download-Speicherorte für ein Update an.
Der Wert des Tags `downloadurl` ist die URL zum Herunterladen der Erweiterung. Diese Datei kann sich an einer beliebigen Stelle befinden.
Das Attribut `type` beschreibt, ob es sich um ein vollständiges Paket oder ein Update handelt, und das Format.
Und das Attribut `format` definiert den Pakettyp wie `zip` or `tar`.

```xml
        <downloads>
            <downloadurl type="full" format="zip">https://github.com/astridx/boilerplate/releases/download/v1.0.1/com_foos-1.0.1.zip</downloadurl>
        </downloads>

```

The Tags `maintainer` und `maintainerurl` sind selbsterklärend.

```xml

        <maintainer>Foo Creator</maintainer>
        <maintainerurl>http://www.example.com</maintainerurl>
```

Das Tag `targetplatform` beschreibt die Joomla! Version, für die dieses Update bestimmt ist. Der Wert des Attributs `name` sollte immer auf "joomla" gesetzt werden.

> Wenn du dein Update auf eine bestimmtes Joomla! Version erstellst kannst du `min_dev_level` und` max_dev_level` verwenden.

```xml

        <targetplatform name="joomla" version="4.*"/>
```

Manchmal möchtest du, dass dein Update für eine Mindest-PHP-Version verfügbar ist. Ereldig dies mit dem Tag `php_minimum`.

```xml
	<php_minimum>7.1</php_minimum>
```

Schließe alle Tags.

```xml
    </update>
</updates>
``` 

> Für Plugins füge ein Tag mit dem Namen `folder` und ein Tag mit dem Namen `client` hinzu. Diese Tags werden nur für Plugins benötigt.

Das Tag `folder` beschreibt den Typ des Plugins. Abhängig von Ihrem Plugin-Typ kann dies  `system`, `content`, `search` usw. sein.
Der Wert des `client` -Tags beschreibt die client_id in der Tabelle #__extension, die Joomla! Wenn dies ein Site- (0) oder ein Administrator- (1) Erweiterungstyp ist. Plugins sind immer 0, Komponenten sind immer 1; Module können jedoch variieren, je nachdem, ob es sich um ein Front-End- oder ein Back-End-Modul handelt.

Nachfolgend siehst du die vollständige Datei.

foo_update.xml
```xml
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

#### changelog.xml (Changelog)

Informationen zum Changelog findest du unter in Github [Github](https://github.com/joomla/joomla-cms/pull/24026) und der [Dokumentation](https://docs.joomla.org/Adding_changelog_to_your_manifest_file).

changelog.xml
```xml
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

Lediglich die Versinsnummer wurde angepasst. Diese Änderunge mache in jedem neuen Kapitel, da immer eine neue Funktion hinzu kommt. Ich erwähne das nicht mehr explizit.

#### src/administrator/components/com_foos/foos.xml

src/administrator/components/com_foos/foos.xml
```xml
...
<version>1.0.1</version>
...
```

Die folgenden Zeilen haben wir nicht geändert. Da sie in diesem Kapitel eine wichtig Rolle spielen, füge sie hier ein. 

src/administrator/components/com_foos/foos.xml
```xml
...
	<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
	<updateservers>
		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
	</updateservers>...
```


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus Teil 1 weiter.

2. Als Nächstes erstellst du eine weitere Version. Ändere dazu die Versionsnummer im Manifest oder bearbeite den nächsten Teil. Vorher ist nicht möglich, den Update Server zu testen. Es gibt bisher keine Aktualisierung. Ich schreibe dir hier aber schon einmal, was genau nach dem Erstellen der nächsten Version passiert.

3. Wenn alles funktioniert siehst du nach der Installation diese Anzeigen vor dir.

![Joomla Update Server](/images/j4x2x1.png)

4. Öffne System Update Extension. Hier wird dir die Aktualisierung für deine Komponente angeboten. Falls dies nicht der Fall ist, klicke auf die Schaltfläche `Find Updates`.

5. Beim ersten Öffnen siehst du den Hinweis `The Download Key` is missing, weil du das Element `dlid` im Manifest eingetragen hast.

6. Füge einen Download Key über `System | Update Sites` hinzu. Klicke hierzu auf den Namen deiner Komponente. Dann siehst du das Textfeld, in das du einen beliebigen Wert einträgst. Zum jetzigen Zeitpunkt wird dieser beim Abruf des Updates nicht geprüft. Speichere den Wert.

![Joomla Update Sites](/images/j4x2x2.png)

5. Wenn du zurück zu System Update Extension navigierst, ist es dir möglich, eine Aktualisierung anzustoßen und dir das Changelog anzusehen.

![Joomla Update Server](/images/j4x2x3.png)