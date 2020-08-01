---
date: 2019-12-07
title: 'Eine Joomla-Datenbank für deine Erweiterung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: eine-joomla-datenbank-fuer-deine-erweiterung
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Deine Ansicht im Administrationsbereich enthält in der Regel nicht nur statischen Text. Du zeigst hier Daten an, die dynamisch sind. So arbeiten zumindest die meisten Erweiterungen. Deshalb legen wir in diesem Teil eine Datenbank für deine Komponente an.

In der Datenbank speichern wir bei der Einrichtung drei Datensätze und zeigen diese im Administrationsbereich an. Es wird eine statische Liste ausgegeben. Änderbar sind die einzelnen Einträge über das Backend nicht. Daran arbeiten wir im nächsten Teil.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t5...t6) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-896f245bc8e493f91277fd33913ef974)

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql
CREATE TABLE IF NOT EXISTS `#__foos_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 DEFAULT COLLATE=utf8mb4_unicode_ci;

INSERT INTO `#__foos_details` (`name`) VALUES
('Nina'),
('Astrid'),
('Elmar');
```

#### [src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t5...t6#diff-e256ea429d6d414897f4bfe1730b9d8a)

[src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/sql/uninstall.mysql.utf8.sql)

```sql
DROP TABLE IF EXISTS `#__foos_details`;
```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-2daf62ad6c51630353e31eaa3cc28626)

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t5...t6#diff-1ff20be1dacde6c4c8e68e90161e0578)

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/foos.xml)

```xml
  ...
  <install> <!-- Runs on install -->
		<sql>
			<file driver="mysql" charset="utf8">sql/install.mysql.utf8.sql</file>
		</sql>
	</install>
	<uninstall> <!-- Runs on uninstall -->
		<sql>
			<file driver="mysql" charset="utf8">sql/uninstall.mysql.utf8.sql</file>
		</sql>
	</uninstall>
  ...
```

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

[src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/blob/a16028022ae1e854f4e54764e7b335bfaf3c19f0/src/administrator/components/com_foos/services/provider.php)

```php
...
use Joomla\CMS\MVC\Factory\MVCFactoryInterface;
...
...
$component->setMVCFactory($container->get(MVCFactoryInterface::class));
...
```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-8e3d37bbd99544f976bf8fd323eb5250)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t5...t6#diff-3186af99ea4e3321b497b86fcd1cd757)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! erstellt bei der Installation die Datenbank für dich.

2. Teste als Nächstes, ob du die Ansicht im Administrationsbereich für deine Komponente fehlerfrei angezeigt bekommst. Siehst du drei Einträge? Diese hatten wir beim Einrichten der Datenbank als Beispieldaten in der SQL-Datei angelegt.

![Joomla Componente mit Datenbank](/images/j4x7x1.png)

## Geänderte Dateien

### Übersicht
