---
date: 2021-01-09
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-erste-schritte
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Template
  - Joomla
---

Ein Template ist verantwortlich für das Design der Website. Es gibt zwei Arten von Templates in Joomla: Front-End-Templates und Back-End-Templates.
Wir kreieren ein Front-End-Template. Dieses steuert die Art und Weise, wie die Website dem Benutzer präsentiert wird.

## For impatient people

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t34...t35) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Beim Template ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du kannst viele Dinge nutzen, die Joomla von Haus aus zur Verfügung stellt. Das hat Vorteile. Nachteilig ist, dass individuelle Wünsche schwerer umzusetzten sind. Deshalb beginnen wir rudimentär. Es geht eher darum, hinter die Funktionen zu blicken und diese zu verstehen, als etwas "Schönes" zu erschaffen.

### Neue Dateien

#### Template

Dieser Teil führt dich durch die notwendigen Schritte zur Erstellung eines Joomla Templates - von Grund auf.

##### [templates/facile/component.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-a2b7f60a181e04a69df79be3ddff4649b7c147917743f7031cbe581adb1572be)

[templates/facile/component.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/component.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/component.php

Component

```

##### [templates/facile/error.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-13b9d39c6c50cd64c483828e227736031299d698ae3cf54b91d9b9c4114ffd9e)

[templates/facile/index.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/error.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/error.php

Error

```

##### [templates/facile/index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Ein minimaler Aufbau sieht wie folgt aus.

[templates/facile/index.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/index.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/index.php

<?php
/**
 * @package     Facile
 *
 * @copyright   Copyright (C) 2021 Facile. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Uri\Uri;

$app = Factory::getApplication();
$sitename = htmlspecialchars($app->get('sitename'), ENT_QUOTES, 'UTF-8');

if ($this->params->get('logoFile'))
{
	$logo = '<img src="' . Uri::root() . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
}
elseif ($this->params->get('siteTitle'))
{
	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
}
else
{
	$logo = '';
}
?>

<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
	<jdoc:include type="metas" />
</head>

<body>
	<header >
		<div>
			<div>
				<a href="<?php echo $this->baseurl; ?>/">
					<?php echo $logo; ?>
				</a>
				<?php if ($this->params->get('siteDescription')) : ?>
					<div><?php echo htmlspecialchars($this->params->get('siteDescription')); ?></div>
				<?php endif; ?>
			</div>
		</div>
		<div>
			<nav>
				<div>
					<jdoc:include type="modules" name="menu" />
				</div>
			</nav>
			<div>
				<jdoc:include type="modules" name="search" />
			</div>
		</div>
	</header>

	<div>
		<jdoc:include type="modules" name="banner" />
	</div>

	<div>
		<jdoc:include type="modules" name="top-a" />
	</div>

	<div>
		<jdoc:include type="modules" name="top-b" />
	</div>

	<div>
		<jdoc:include type="modules" name="sidebar-left" />
	</div>

	<div>
		<jdoc:include type="modules" name="breadcrumbs" />
		<jdoc:include type="modules" name="main-top" />
		<jdoc:include type="message" />
		<main>
		<jdoc:include type="component" />
		</main>
		<jdoc:include type="modules" name="main-bottom" />
	</div>

	<div>
		<jdoc:include type="modules" name="sidebar-right" />
	</div>

	<div>
		<jdoc:include type="modules" name="bottom-a" />
	</div>

	<div>
		<jdoc:include type="modules" name="bottom-b" />
	</div>

	<footer>
		<jdoc:include type="modules" name="footer" />
	</footer>

	<jdoc:include type="modules" name="debug" />

</body>
</html>

```

Die erste Zeile ist in PHP geschrieben. Das Gute an PHP und HTML ist, dass es zusammen geschrieben werden kann. Wir können PHP-Anweisungen in eine HMTL-Datei einfügen, und umgekehrt. `<?php` öffnet eine PHP-Anweisung - egal wo - und `?>` schließt sie wieder. In der ersten Zeile verbieten wir den direkten Zugriff auf diese Datei. Dies geschieht über die Joomla API mit dem Befehl `_JEXEC`. Diese Anweisung prüft, ob die Datei aus einer Joomla-Sitzung heraus aufgerufen wird, und sie schützt di Seite, indem sie es einem Hacker schwerer macht.

Später deklarieren wir mit `<!doctype html>` den [Dokumententyp](https://www.w3.org/QA/2002/04/valid-dtd-list.html). Dies stellt sicher, dass das Dokument von verschiedenen Browsern auf die gleiche Weise geparst wird. Die einfachste und zuverlässigste Doctype-Deklaration, die verwendet werden kann, ist die in HTML5 definierte. Diese verwenden wir.

Was dann folgt, ist ein kleinstmöglicher Aufbau einer HTML-Seite. Diese Seite wird mit `<html>` eröffnet und endet mit `</html>`. Der Kopfbereich beginnt mit `<head>` und endet mit `</head>`. Der Body beginnt mit `<body>` und endet mit `</body>`. Innerhalb des Header-Bereichs, während wir die Header-Informationen mit `<jdoc: include type="head" />` aus der Joomla API laden. Dieser `jdoc:include`-Befehl fügt die normalen Header-Informationen ein, die eine Website benötigt.

Den Befehl `jdoc:include` finden wir noch öfter in der `index.php`. Beispielsweise sehen wir `<jdoc:include type="message" />`, damit funktionieren die Systemmeldungen. Wann immer Joomla dem Websitebetrachter etwas mitteilt, wird diese Zeile es auf Ihrem Bildschirm anzeigen. Wenn man beispielsweise eine E-Mail über ein Kontaktformular senden, wir man die Nachricht "Ihre Nachricht wurde erfolgreich gesendet" sehen.

Ein weiteres zu besprechendes Element ist `<jdoc:include type="component" />`. Dieses Element sollte nur einmal im `<body>`-Element erscheinen, um den Hauptinhalt der Seite in Bezug auf die aktuell angezeigte Seite darzustellen.

Das letzte erwähnenswerte Element ist `<jdoc:include type="modules" />`.

So, genug erklärt. So sieht die Website minimal aus.

##### [templates/facile/language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t34...t35#diff-754d06b92d8b132af8eb955c0e6d9cd66a493f7b0055c4820f5b3f474a02da83)

[templates/facile/language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/language/en-GB/en-GB.tpl_facile.ini

TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
; Parameters
TPL_FACILE_LOGO_LABEL="Logo"

```

##### [templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/compare/t34...t35#diff-f430f52316f61d2dd90ac59a813bcd36cf84549945e7eb5055302d54858a169f)

[templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/language/en-GB/en-GB.tpl_facile.sys.ini

FACILE="Facile - Site template"
TPL_FACILE_POSITION_MENU="Menu"
TPL_FACILE_POSITION_SEARCH="Search"
TPL_FACILE_POSITION_BANNER="Banner"
TPL_FACILE_POSITION_TOP-A="Top-a"
TPL_FACILE_POSITION_TOP-B="Top-b"
TPL_FACILE_POSITION_MAIN-TOP="Main-top"
TPL_FACILE_POSITION_BREADCRUMBS="Breadcrumbs"
TPL_FACILE_POSITION_MAIN-BOTTOM="Main-bottom"
TPL_FACILE_POSITION_SIDEBAR-LEFT="Sidebar-left"
TPL_FACILE_POSITION_SIDEBAR-RIGHT="Sidebar-right"
TPL_FACILE_POSITION_BOTTOM-A="Bottom-a"
TPL_FACILE_POSITION_BOTTOM-B="Bottom-b"
TPL_FACILE_POSITION_FOOTER="Footer"
TPL_FACILE_POSITION_DEBUG="Debug"
TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."

```

##### [templates/facile/offline.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6883c0bebfdde2e2fa5faf0c765520ece0850108806a0ea508cb132c08b9d322)

[templates/facile/offline.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/offline.php)

```php {numberLines: -2}
// https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/offline.php

Offline

```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t34...t35#diff-7d97de6b92def4b5a42a0052c815e6fada268a2e2dda9e3ea805eb87e0076dc1)

Die Datei `templateDetails.xml` (beachte das große D) ist nach `index.php` die zweitwichtigste Datei. Sie enthält allgemeine Informationen wie Name und Autor und definiert die Installationsroutine. Die Installationsroutine ist nichts anderes als eine Auflistung aller Ordner und Dateien, die zum Template gehören, damit diese bei der Installation entpackt und gespeichert werden.

Zusätzlich werden hier die Modulpositionen angelegt, um über den Befehl `jdoc:include` in der `index.php` eingebunden zu werden. Optional können wir Parameter anlegen, um das Template im Backend anpassbar zu machen. Vielleicht wollen Sie Ihr Template in verschiedenen Farben erstrahlen lassen? Nachfolgend habe ich `logoFile`, `siteTitle` und `siteDescription` als Parameter eingefügt. Schauen wir uns eine minimale Version der `templateDetails.xml` an:

[ssrc/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/templateDetails.xml)

```xml {numberLines: -2}
<!-- https://github.com/astridx/boilerplate/raw/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/templateDetails.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="template" client="site" method="upgrade">
	<name>facile</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>TPL_FACILE_XML_DESCRIPTION</description>

	<files>
		<filename>component.php</filename>
		<filename>error.php</filename>
		<filename>index.php</filename>
		<filename>offline.php</filename>
		<filename>templateDetails.xml</filename>
		<filename>template_preview.png</filename>
		<filename>template_thumbnail.png</filename>
		<folder>language</folder>
	</files>

	<positions>
		<position>menu</position>
		<position>search</position>
		<position>banner</position>
		<position>top-a</position>
		<position>top-b</position>
		<position>main-top</position>
		<position>main-bottom</position>
		<position>breadcrumbs</position>
		<position>sidebar-left</position>
		<position>sidebar-right</position>
		<position>bottom-a</position>
		<position>bottom-b</position>
		<position>footer</position>
		<position>debug</position>
	</positions>

	<config>
		<fields name="params">
			<fieldset name="advanced">
				<field
					name="logoFile"
					type="media"
					default=""
					label="TPL_FACILE_LOGO_LABEL"
				/>

				<field
					name="siteTitle"
					type="text"
					default=""
					label="JGLOBAL_TITLE"
					filter="string"
				/>

				<field
					name="siteDescription"
					type="text"
					default=""
					label="JGLOBAL_DESCRIPTION"
					filter="string"
				/>
			</fieldset>
		</fields>
	</config>
</extension>

```

Was sehen Sie hier? Die erste Zeile erzeugt einen XML-Abschnitt, der Version und Zeichensatz (utf-8) bestimmt.

Kommen wir zu dem Teil der `templateDetails.xml`, der Informationen für die Installation enthält. Der Typ wird `template` genannt. Die `method="upgrade"` erlaubt es, das Template zu einem späteren Zeitpunkt über eine bestehende Version zu installieren.

> Was zu `method="upgrade"` wichtig ist: Dabei werden neuere Versionen der Dateien installiert. Alte Dateien, die nicht mehr benötigt werden, bleiben jedoch erhalten, werden also nicht gelöscht. Dies muss in einem Installationsskript vom Entwickler selbst übernommen werden.

Als nächstes kommen die allgemeinen Informationen des Templates wie

- Template-Name,
- Erstellungsdatum,
- Autor, Copyright,
- E-Mail-Adresse, Website,
- Version und
- Beschreibung)
  Diese werden später im Template-Manager im Joomla Backend angezeigt.

Danach wird die Installationsroutine aufgelistet. Zum Template gehörende Ordner `<folder>` und Dateien `<filename>` werden eingebettet. Das Modul `<positions>` kommt im Anschluss. Jede Position wird in eine eigene Zeile geschrieben und ist nun bereit, in die `index.php` eingebunden zu werden - ist über den Modulmanager im Joomla Backend auswählbar.

##### src/templates/facile/template_preview.png und src/templates/facile/template_thumbnail.png

### Modified files

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen. Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deinem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

3. Teste als Nächstes, ob das Template fehlerfrei arbeitet. Ö

4. Template Style Facile als aktiv.

5. Installiere die Beispieldaten für die Tests

6. Rufe die URL `joomla-cms4/index.php?tp=1` auf.

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t34...t35.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
