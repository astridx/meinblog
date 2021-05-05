---
date: 2021-01-09
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Erste Schritte'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-erste-schritte
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Warum ein eigenes Joomla Template erstellen? Es gibt ein paar gute Gründe, warum wir dies in Angriff nehmen sollten!

- Die Erstellung eines eigenen Joomla Templates hat zur Folge, dass wir die vollständige Kontrolle über jedes kleinste Detail des Erscheinungsbildes der Website haben. Wir erstellen nur Code, den wir mögen. Es ist viel einfacher, ein eigenes Template zu ändern, als ein komplexes Joomla Template, bei dem oft die unterschiedlichen Elemente voneinander anhängen.
- Die Erstellung eines eigenen Templates bewirkt, dass wir die Website nicht Funktionen überfrachten, die wir gar nicht nutzen.
- Wenn wir uns ein individuelles Joomla-Template wünschen, das nicht von Tausenden anderer Websites verwendet wird, ist die Erstellung einer einen Vorlage eine Möglichkeit.
- Wenn du bisher noch nie ein Joomla Template erstellt hast, wirst du beim Entwickeln sehr viel über Joomla lernen. Du wirst am Ende sehr viel über das Zusammenspiel der unterschiedlichen Elemente wissen und dich sicherer fühlen.

> Es geht hier nicht um das Erlernen von HTML und CSS. Deshalb werde ich in diesem Artikel ein fertiges [HTML5-Template](https://html5up.net/txt) zu Hilfe nehmen. Folge meinem Beispiel und du wirst am Ende in der Lage sein, ein vollständiges Joomla Template selbst zu erstellen. HTML und CSS entwickelst du selbst oder nimmst wie ich hier, eine Vorlage.

Ein Template ist verantwortlich für das Design der Website.
Es gibt zwei Arten von Templates in Joomla:

- Front-End-Templates und
- Back-End-Templates.

Wir kreieren ein Front-End-Template. Dieses steuert die Art und Weise, wie die Website dem Benutzer präsentiert wird.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t34...t35)[^github.com/astridx/boilerplate/compare/t34...t35] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Beim Template ist es ebenfalls so, dass du das Rad nicht neu erfindest. Du kannst viele Dinge nutzen, die Joomla von Haus aus zur Verfügung stellt. Das hat Vorteile. Nachteilig ist, dass individuelle Wünsche schwerer umzusetzten sind. Deshalb beginnen wir rudimentär. Es geht in erster Linie darum, hinter die Funktionen zu blicken und diese zu verstehen.

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree35.png)

### Neue Dateien

#### Template

Dieser Teil führt dich durch die notwendigen Schritte zur Erstellung eines Joomla Templates - von Grund auf.

##### [templates/facile/component.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-a2b7f60a181e04a69df79be3ddff4649b7c147917743f7031cbe581adb1572be)

Die `component.php` ermöglicht es, eine abgespeckte Version der Site zu erzeugen. Das bedeutet, dass nur die Ansicht der Komponente angezeigt wird. Diese kann sehr gut für einen Ausdruck verwendet werden. Die Komponente ist für die Darstellung der Artikel zuständig. Das gesamte Layout, also zum Beispiel die Module und die Navigation bleibt dabei außen vor. Dies kann recht praktisch sein; der Fokus liegt auf dem Inhalt.

> Diese Ansicht wird im Browser über den Link `/index.php?tmpl=component` angezeigt.

[templates/facile/component.php](https://github.com/astridx/boilerplate/blob/159271f625aac7d0ce5e7fdffd033e6c28097647/src/templates/facile/component.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/component.php

Component

```

##### [templates/facile/error.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-13b9d39c6c50cd64c483828e227736031299d698ae3cf54b91d9b9c4114ffd9e)

Wenn Besucher der Website eine Seite aufrufen, die nicht existiert, erhalten sie eine Fehlermeldung. Die Fehlermeldung von Joomla ist nicht individuell. Viel besser ist es, eine eigene Fehlerseite zu erstellen.

Meiner Meinung nach eine gute Fehlerseite beinhaltet:

- Minimalistisches Design: Drücke dich mit einfachen Texten und klaren Bildern aus. Schreibe nur das Nötigste. Weniger ist mehr!
- Verlinke auf die Startseite: Beschreibe klar und deutlich, wie die Homepage erreichbar ist und setze einen Link auf diese. Ein zusätzlicher Link, zum Beispiel im Logo, ist hilfreich. Er sollte aber nicht der einzige Punkt sein, um wieder auf die Homepage zu gelangen.
- Eine Suche: Biete dem Besucher ein Suchfeld an. Er wird wissen, was er sehen will. Ein Suchfeld wird geschätzt und gibt dem Besucher eine Möglichkeit, dieses zu finden. Nebenbei bleibt er so auf deiner Website.
- Keine Fachbegriffe: "404 Error" ist für viele Menschen völlig bedeutungslos.

> Die Fehlerseite sollte die Besucher nicht zurechtweisen. Schließlich ist es nicht ihre Schuld, wenn eine Seite nicht existiert oder ein interner Serverfehler auftritt.

Damit du weißt, wo du deine Fehlerseite implementierst, habe ich die Datei `templates/facile/index.php` erstellt. Sie beinhaltet nichts weiter als das Wort Error. So kannst du deiner Phantasie freien Lauf lassen.

[templates/facile/error.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/error.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/error.php

Error

```

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t34...t35#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Die Datei `index.php` ist das Herzstück. Sie sorgt dafür, dass alles zusammenarbeitet. Ein minimaler Aufbau sieht wie folgt aus.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/index.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/index.php

<?php
/**
 * @package     Facile
 *
 * @copyright   Copyright (C) 2021 Facile. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;
?>

<!DOCTYPE html>
<html lang="de">
  <head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Titel</title>
  </head>
  <body>
	Hallo Joomla!
  </body>
</html>

```

Die erste Zeile ist in PHP geschrieben. Das Gute an PHP und HTML ist, dass es zusammen geschrieben werden kann. Wir können PHP-Anweisungen in eine HMTL-Datei einfügen, und umgekehrt. `<?php` öffnet eine PHP-Anweisung - egal wo - und `?>` schließt sie wieder. In der ersten Zeile verbieten wir den direkten Zugriff auf diese Datei. Dies geschieht über die Joomla API mit dem Befehl `_JEXEC`. Diese Anweisung prüft, ob die Datei aus einer Joomla-Sitzung heraus aufgerufen wird, und sie schützt di Seite, indem sie es einem Hacker schwerer macht.

Später deklarieren wir mit `<!doctype html>` den [Dokumententyp](https://www.w3.org/QA/2002/04/valid-dtd-list.html). Dies stellt sicher, dass das Dokument von verschiedenen Browsern auf die gleiche Weise geparst wird. Die einfachste und zuverlässigste Doctype-Deklaration, die verwendet werden kann, ist die in HTML5 definierte. Diese verwenden wir.

Was dann folgt, ist ein kleinstmöglicher Aufbau einer HTML-Seite. Diese Seite wird mit `<html>` eröffnet und endet mit `</html>`. Der Kopfbereich beginnt mit `<head>` und endet mit `</head>`. Der Body beginnt mit `<body>` und endet mit `</body>`.

So, genug erklärt. So sieht die Website minimal aus. Sie lädt noch keine Inhalte aus Joomla! Mir ging es hier in erste Linie darum zu zeigen, dass die `index.php` des aktiven Templates für alles verantwortlich ist. In unserem Fall ist dies die Datei `templates/facile/index.php`.

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

Die Sprachdatei `templates/facile/ language/en-GB/en-GB.tpl_facile.ini` sorgt dafür, dass im Backend bei der Verwaltung der Erweiterungen der Name zur Sprache passend angezeigt wird.

[templates/facile/ language/en-GB/en-GB.tpl_facile.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.ini

TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."


```

##### [templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

Die Sprachdatei `templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini` übersetzt nach der Installation in die korrekte Sprache.

[templates/facile/ language/en-GB/en-GB.tpl_facile.sys.ini](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/language/en-GB/tpl_facile.sys.ini)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/language/en-GB/tpl_facile.sys.ini

FACILE="Facile - Site template"

```

##### [templates/facile/offline.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/offline.php)

Die Datei `offline.php` wird aufgerufen, wenn im Backend der Wartungsmodus aktviert ist. Du aktivierst diesen in der globalen Konfiguration.

![Joomla Template erstellen - Offline Seite Backend](/images/j4x40x5.png)

> Um die Website technisch auf dem neuesten Stand zu halten oder um neue Funktionen zu integrien, wird sie von Zeit zu Zeit überarbeitet. Meist handelt es sich dabei um Updates. Während der Aktualisierung kann es zu Anzeigeproblemen kommen. Damit Besucher nicht durch eine Fehlermeldung irritiert werden, gibt es bei Joomla den Wartungsmodus. Ist dieser aktiv wird einem Besuchern eine spezielle Wartungsmodus-Seite angezeigt, die `offline.php`.

Der nachfolgende minimalischte Code sorgt dafür, dass ein Anmeldeformular angezeigt wird. Du könntest anstelle davon lediglich einen kurzen Text anzeigen. Das Formular ermöglicht es, dass ein Administrator die Website online testen.

![Joomla Template erstellen - Offline Seite Frontend](/images/j4x40x6.png)

[templates/facile/ offline.php](https://github.com/astridx/boilerplate/blob/a3e575640e792ee6503ce92b941c3b2015e2bb11/src/templates/facile/offline.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/offline.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\AuthenticationHelper;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;

$twofactormethods = AuthenticationHelper::getTwoFactorMethods();
?>

<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<jdoc:include type="head" />
</head>
<body>
	<jdoc:include type="message" />
	<form action="<?php echo Route::_('index.php', true); ?>" method="post" id="form-login">
		<fieldset>
			<label for="username"><?php echo Text::_('JGLOBAL_USERNAME'); ?></label>
			<input name="username" id="username" type="text">

			<label for="password"><?php echo Text::_('JGLOBAL_PASSWORD'); ?></label>
			<input name="password" id="password" type="password">

			<?php if (count($twofactormethods) > 1) : ?>
			<label for="secretkey"><?php echo Text::_('JGLOBAL_SECRETKEY'); ?></label>
			<input name="secretkey" autocomplete="one-time-code" id="secretkey" type="text">
			<?php endif; ?>

			<input type="submit" name="Submit" value="<?php echo Text::_('JLOGIN'); ?>">

			<input type="hidden" name="option" value="com_users">
			<input type="hidden" name="task" value="user.login">
			<input type="hidden" name="return" value="<?php echo base64_encode(Uri::base()); ?>">
			<?php echo HTMLHelper::_('form.token'); ?>
		</fieldset>
	</form>
</body>
</html>

```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/190254198095577c21d790df30102f9e11fadd6e/src/templates/facile/templateDetails.xml)

Die Datei `templateDetails.xml` (beachte das große D) ist nach `index.php` die zweitwichtigste Datei. Sie enthält allgemeine Informationen wie Name und Autor und definiert die Installationsroutine. Die Installationsroutine ist nichts anderes als eine Auflistung aller Ordner und Dateien, die zum Template gehören, damit diese bei der Installation entpackt und gespeichert werden.

Zusätzlich werden hier die Modulpositionen angelegt, um über den Befehl `jdoc:include` in der `index.php` eingebunden zu werden. Optional können wir Parameter anlegen, um das Template im Backend anpassbar zu machen. Vielleicht wollen Sie Ihr Template in verschiedenen Farben erstrahlen lassen? Nachfolgend habe ich `logoFile`, `siteTitle` und `siteDescription` als Parameter eingefügt. Schauen wir uns eine minimale Version der `templateDetails.xml` an:

[ssrc/templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/blob/190254198095577c21d790df30102f9e11fadd6e/src/templates/facile/templateDetails.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t35/src/templates/facile/templateDetails.xml -->

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
</extension>

```

Was sehen wir hier? Die erste Zeile erzeugt einen XML-Abschnitt, der Version und Zeichensatz (utf-8) bestimmt.

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

Die beiden neuen PNG-Dateien sind die Bilder, die im Template Manager angezeigt werden.

![Joomla Template erstellen - Images](/images/j4x40x7.png)

### Geänderte Dateien

In diesem Abschnitt wurden lediglich Dateien hinzugefügt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen. Am Anfang ist das Einfachste, die Dateien manuell an Ort und Stelle zu kopieren:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

2. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Öffne dazu das Menü `System | Install | Discover`. Hier siehst du einen Eintrag zu deinem eben kopierten Template. Wähle diesen aus und klicke auf die Schaltfläche `Install`.

![Joomla Template erstellen - Die Installation](/images/j4x40x2.png)

3. Teste als Nächstes, ob das Template fehlerfrei arbeitet. Aktiviere dazu den Template Style Facile.

![Joomla Template erstellen - Template Style aktivieren](/images/j4x40x3.png)

5. Rufe die URL `/index.php?tp=1` auf. Öffne die Frontend-Ansicht.

![Joomla Template erstellen - Frontend Ansicht](/images/j4x40x1.png)

6. Test die einfache Error-Seite. Gibt dazu eine URL im Adressfeld des Browsers ein, die nicht exisitert.

![Joomla Template erstellen - Error Seite](/images/j4x40x4.png)

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)[^https://github.com/c-lodder/lightning]

[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)[^https://github.com/dgrammatiko/sloth-pkg]

[HTML5 UP bietet schicke HTML5-Website-Vorlagen](https://html5up.net/)[^https://html5up.net]
