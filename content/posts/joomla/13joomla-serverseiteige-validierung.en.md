---
date: 2020-12-13
title: 'Joomla 4.x Tutorial - Extension Development - Server Side Validation'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-serverseiteige-validierung
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Your component is user-friendly. User experience (UX) or user experience is on everyone's lips. If a user enters incorrect data, it's important to you that they get an explanation. This is where we use validation.

In server-side validation, the input submitted by the user is sent to the server and validated using the scripting language. In the case of Joomla, this is PHP. After the validation process on the server side, the feedback is sent back to the client from a new dynamically generated web page. It is safe to validate user input from the server. Malicious attackers have no easy game this way. Client-side scripting languages are easier to trick. Intruders bypass them to send malicious input to the server.

> Since both validation methods (server and client) have their own importance, it is recommended to use them simultaneously. Server-side validation is more secure. The client-side one is more user-friendly!

This part covers the server-side validation in Joomla 4.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t10...t11a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-64b9f20891ab28b2da58671514d68679)

Hier ist nicht das Hauptziel, sinnvolle Validierung zu lernen. Ich zeige dir vielmehr, wie du deine Regeln in Joomla integrierst. Deshalb siehst du hier nur ein rudimentäres Beispiel: Im Namen ist es ab jetzt verboten, eine Zahl einzufügen. Hierzu erstellen wir die Datei `LetterRule.php`.

> Hier im Beispiel nutze ich lediglich den zu prüfenden [regulären Ausdruck](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck) in der Klasse `LetterRule.php`. Natürlich ist möglich, komplexe Prüfungen mithilfe von Funktionen zu integrieren.

[src/administrator/components/com_foos/src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/blob/cf84e8d47ef47d4918c094810e7a16ea213d1bee/src/administrator/components/com_foos/src/Rule/LetterRule.php)

```php  {numberLines}
<?php
namespace FooNamespace\Component\Foos\Administrator\Rule;

\defined('_JEXEC') or die;

use Joomla\CMS\Form\FormRule;

class LetterRule extends FormRule
{
	protected $regex = '^([a-z]+)$';

	protected $modifiers = 'i';
}
```

### Geänderte Dateien

Damit Joomla die Regel in der Datei `LetterRule.php` auf das Textfeld zur Eingabe des Namens anwendet, ändern wir die Formulardatei.

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-262e27353fbe755d3813ea2df19cd0ed)

Geändert hat sich hier `<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">` und `validate="Letter"`

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/cf84e8d47ef47d4918c094810e7a16ea213d1bee/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 <?xml version="1.0" encoding="utf-8"?>
 <form>
-	<fieldset>
+	<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">
 		<field
 			name="id"
 			type="number"
@@ -13,6 +13,7 @@
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
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle ein neues Item oder editiere ein vorhandenes. Gib im Textfeld für den Titel dabei eine Zahl ein.

3. Editiere danach ein anderes Feld, setze zum Beispiel den Zugriff auf `Registered`.

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **keine** Warnung angezeigt wird.

5. Versuche am Ende, deine Eingabe zu speichern. Dies ist nicht möglich. Du siehst einen Warnhinweis.

![Joomla Validierung](/images/j4x13x1.png)

Ist es dir aufgefallen? Du siehst die Warnung unter Umständen erst, nachdem du im Formular sehr viele Änderungen durchgeführt hast. In dieser kleinen Erweiterung fällt dies nicht ins Gewicht. Bei große Formularen kann der Hinweis am Ende frustrieren. Ein Benutzer wünscht sich, diesen unmittelbar nach der fehlerhaften Eingabe zu sehen. So ist möglich, sofort zu regieren und unnötige Arbeit zu vermeiden. Hier kommti die clienteseiteige Validierung ins Spiel. Diese sehen wir uns im nächsten Teil an.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t10...t11a.diff

```

## Links
