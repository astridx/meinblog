---
date: 2020-12-13
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Serverseiteige Validierung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-serverseiteige-validierung
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Deine Komponente ist benutzerfreundlich. User Experience (UX) oder Nutzererfahrung ist in aller Munde. Wenn ein Benutzer fehlerhafte Daten eingibt, ist es dir wichtig, dass dieser hierzu eine Erklärung erhält. Hhierfür nutzen wir die Validierung.

Bei der serverseitigen Überprüfung wird die vom Benutzer übermittelte Eingabe an den Server gesendet und mithilfe der Skriptsprache validiert. Im Falle von Joomla ist das PHP. Nach dem Validierungsprozess auf der Serverseite wird das Feedback von einer neuen dynamisch generierten Webseite an den Client zurückgesendet. Es ist sicher, Benutzereingaben vom Server zu überprüfen. Böswillige Angreifer haben so kein leichtes Spiel. Clientseitige Skriptsprachen sind problemloser auszutricksen. Eindringlinge umgehen sie und senden so bösartige Eingaben an den Server.

> Da beide Validierungsmethoden (Server und Client) ihre eigene Bedeutung haben, wird empfohlen sie gleichzeitig nebeneinander zu verwenden. Die serverseitige Validierung ist sicherer. Die clientseitige benutzerfreundlicher!

Dieser Teil behandelt die die serverseitige Validierung in Joomla 4.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t10...t11a)[^github.com/astridx/boilerplate/compare/t10...t11a] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree11a.png)

### Neue Dateien

#### [administrator/components/com_foos/ src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-64b9f20891ab28b2da58671514d68679)

Hier ist nicht das Hauptziel, sinnvolle Validierung zu lernen. Ich zeige dir vielmehr, wie du deine Regeln in Joomla integrierst. Deshalb siehst du hier nur ein rudimentäres Beispiel: Im Namen ist es ab jetzt verboten, eine Zahl einzufügen. Konkret bedeutet dies: _Astrid_ ist erlaubt. _Astrid9_ ist nicht erlaubt. Hierzu erstellen wir die Datei `LetterRule.php`.

> Hier im Beispiel nutze ich lediglich den zu prüfenden [regulären Ausdruck](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck) in der Klasse `LetterRule.php`. Natürlich ist es möglich, komplexe Prüfungen mithilfe von Funktionen zu integrieren.

[administrator/components/com_foos/ src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/blob/cf84e8d47ef47d4918c094810e7a16ea213d1bee/src/administrator/components/com_foos/src/Rule/LetterRule.php)

```php  {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t11a/src/administrator/components/com_foos/src/Rule/LetterRule.php

<?php
/**
 * Joomla! Content Management System
 *
 * @copyright  Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Rule;

\defined('_JEXEC') or die;

use Joomla\CMS\Form\FormRule;

/**
 * Form Rule class for the Joomla Platform.
 *
 * @since  __DEPLOY_VERSION__
 */
class LetterRule extends FormRule
{
	/**
	 * The regular expression to use in testing a form field value.
	 *
	 * @var    string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $regex = '^([a-z]+)$';

	/**
	 * The regular expression modifiers to use when testing a form field value.
	 *
	 * @var    string
	 * @since  __DEPLOY_VERSION__
	 */
	protected $modifiers = 'i';
}

```

### Geänderte Dateien

Damit Joomla die Regel in der Datei `LetterRule.php` auf das Textfeld zur Eingabe des Namens anwendet, passen wir die Formulardatei an.

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-262e27353fbe755d3813ea2df19cd0ed)

Geändert hat sich `<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">` und `validate="Letter"`

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/cf84e8d47ef47d4918c094810e7a16ea213d1bee/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 <?xml version="1.0" encoding="utf-8"?>
 <form>
-	<fieldset>
+	<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">
 		<field
 			name="id"
 			type="number"

 		<field
 			name="name"
 			type="text"
+			validate="Letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
 			size="40"
 			required="true"

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle ein neues Item oder editiere ein vorhandenes. Gib im Textfeld für den Titel dabei eine Zahl ein.

3. Editiere danach ein anderes Feld, setze zum Beispiel den Zugriff auf `Registered`.

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **keine** Warnung angezeigt wird.

5. Versuche am Ende, deine Eingabe zu speichern. Dies ist nicht möglich. Du siehst einen Warnhinweis.

![Joomla Validierung](/images/j4x13x1.png)

> Ist es dir aufgefallen? Du siehst die Warnung unter Umständen erst, nachdem du im Formular sehr viele Änderungen durchgeführt hast. In dieser kleinen Erweiterung fällt dies nicht ins Gewicht. Bei große Formularen kann der Hinweis am Ende frustrieren. Ein Benutzer wünscht sich, diesen unmittelbar nach der fehlerhaften Eingabe zu sehen. So ist möglich, sofort zu regieren und unnötige Arbeit zu vermeiden. Hier kommti die clienteseiteige Validierung ins Spiel. Diese sehen wir uns im nächsten Teil an.
