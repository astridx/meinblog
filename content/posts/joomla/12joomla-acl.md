---
date: 2019-12-12
title: 'ACL'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-acl
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Dein Ziel ist es, dass nicht jeder das Recht hat, alles zu bearbeiten. Dazu bietet Joomla! eine Zugriffskontrollliste, die ACL. Mit dieser handhabst du Benutzerrechte in deiner Komponente.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t9...t10) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-e5dfd09c647ca1e552c9016cf918acf3)

Als Erstes legen wir alle möglichen Berechtigungen in einer XML-Datei fest.

[src/administrator/components/com_foos/access.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/access.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<access component="com_foos">
	<section name="component">
		<action name="core.admin" title="JACTION_ADMIN" />
		<action name="core.options" title="JACTION_OPTIONS" />
		<action name="core.manage" title="JACTION_MANAGE" />
		<action name="core.create" title="JACTION_CREATE" />
		<action name="core.delete" title="JACTION_DELETE" />
		<action name="core.edit" title="JACTION_EDIT" />
		<action name="core.edit.state" title="JACTION_EDITSTATE" />
		<action name="core.edit.own" title="JACTION_EDITOWN" />
	</section>
</access>
```

#### [src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql](https://github.com/astridx/boilerplate/compare/t9...t10#diff-887ce564d59a60e62da6554aa4e91cd7)

Die Berechtigungen bestehen permanent und werden in der Datenbank gespeichert. 

Bei einem Update sind ausschließlich die Änderungen relevant. Diese tragen wir in diese Datei diese ein. Bei einer neuen Installation wird die Datenbank über die Hauptdatei `administrator/components/com_foos/sql/install.mysql.utf8.sql` gleich korrekt eingerichtet.

[src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/sql/updates/mysql/10.0.0.sql)

```sql
ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-9be56d6cedb2c832265e47642f0afb25)

Die Berechtigungen für die gesamte Komponente stellen wir in der Konfiguration ein. Hierfür legen wir ein Feld an.

[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/config.xml)

```xml
...
  <fieldset
		name="permissions"
		label="JCONFIG_PERMISSIONS_LABEL"
		description="JCONFIG_PERMISSIONS_DESC"
		>
		<field
			name="rules"
			type="rules"
			label="JCONFIG_PERMISSIONS_LABEL"
			validate="rules"
			filter="rules"
			component="com_foos"
			section="component"
		/>
	</fieldset>
...
```

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-1ff20be1dacde6c4c8e68e90161e0578)

Damit bei der Installation alles glatt läuft, ergänzen wir die hier neu hinzukommenden Dateien.

[https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/foos.xml)

```xml
...
	<update>  <!-- Runs on update -->
		<schemas>
			<schemapath type="mysql">sql/updates/mysql</schemapath>
		</schemas>
	</update>
...
	<files folder="components/com_foos">
			<filename>access.xml</filename>
...
```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t9...t10#diff-262e27353fbe755d3813ea2df19cd0ed)

Das Formular zum Erstellen eines neuen Foo-Items wird um die Möglichkeit erweitert, Berechtigungen für ein einzelnes Element zu setzten.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/forms/foo.xml)

```xml
...
  <field
		name="access"
		type="accesslevel"
		label="JFIELD_ACCESS_LABEL"
		size="1"
	/>
...

```

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t9...t10#diff-896f245bc8e493f91277fd33913ef974)

Das SQL-Skript für die Installation wird ebenfalls um die notwendigen Felder erweitert. 

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql
...
ALTER TABLE `#__foos_details` ADD COLUMN  `access` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_access` (`access`);
```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-2daf62ad6c51630353e31eaa3cc28626)

Wenn du mit SQL bisher nicht vertraut bist, dann wird die Datenbankabfrage für dich komplex. Es ist jetzt erforderlich, Daten aus zwei Datenbanktabellen zu kombinieren. Die Tabelle, die die Berechtigungen von `com_user` verwaltet `#__viewlevels`, und die unsere Beispielkomponenete.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php
...
$query->select($db->quoteName('ag.title', 'access_level'))
			->join(
				'LEFT',
				$db->quoteName('#__viewlevels', 'ag') . ' ON ' . $db->quoteName('ag.id') . ' = ' . $db->quoteName('a.access')
      );
...
```

> Zur Erinnerung: Joomla unterstützt dich beim Erstellen der Datenbankabfragen. Wenn du die [zur Verfügung stehenden Anweisungen](https://docs.joomla.org/Accessing_the_database_using_JDatabase/de) nutzt, dann kümmert sich Joomla für dich um Sicherheit oder unterschiedliche Syntax in PostgreSQL und MySQL.

(https://docs.joomla.org/Accessing_the_database_using_JDatabase/de)

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-8e3d37bbd99544f976bf8fd323eb5250)

Eine Schaltfläche zum Erstellen eines Elementes ist nur sinnvoll, wenn dies erlaubt ist. Deshalb ändern wir die View ab.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
  $canDo = ContentHelper::getActions('com_foos');
...
	if ($canDo->get('core.create'))
	{
		$toolbar->addNew('foo.add');
	}
...
```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-1637778e5f7d1d56dd1751af1970f01b)

Der Eintrag `<?php echo $this->getForm()->renderField(‚access‘);` ist notwendig, damit das Feld im Formular aufgenommen wird, welches wir in er XML Datei schon konfiguriert haben. Nur so ist es möglich, die Berechtigungen pro Element zu verändern.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php
...
	<?php echo $this->getForm()->renderField('access'); ?>
...
```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t9...t10#diff-3186af99ea4e3321b497b86fcd1cd757)

Last but not least nehmen wir für die Anzeige der Berechtigung eine Spalte in der Übersicht auf.

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/4efa6681475e12a48143acc126358a0f36fd8452/src/administrator/components/com_foos/tmpl/foos/default.php)

```php
...
	<th scope="col" style="width:10%" class="d-none d-md-table-cell">
		<?php echo TEXT::_('JGRID_HEADING_ACCESS') ?>
	</th>
...
	<td class="small d-none d-md-table-cell">
  	<?php echo $item->access_level; ?>
	</td>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Datenbank für dich.

2. Erstelle in deiner Komponente ein neues Item. Überzeuge dich davon, dass dir ein Auswahlfeld für das Speichern einer Berechtigung angeboten wird. Der Wert, den du hier eingibst, wird mit dem Element gespeichert und ist bei der Anzeige in einer Liste abfragbar.

![Joomla! Konfiguration](/images/j4x12x1.png)

3. Zur besseren Übersicht wird der Wert in der Hauptansicht angezeigt.

![Joomla! Konfiguration](/images/j4x12x2.png)

4. Öffne die Optionen. Hier hast du die Möglichkeit, die Berechtigungen für die Nutzung der Komponente selbst zu setzten.

![Joomla! Konfiguration](/images/j4x12x3.png)

Spiele mit den Einstellungen herum. Erlaube einmal nur dem Super Admin, neue Elemente in deiner Erweiterung zu erstellen. Melde dich dann als Administrator an und sieh, dass die Schaltfläche `New` verschwunden ist.

## Geänderte Dateien

### Übersicht
