---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-17
title: 'Serverseitige Validierung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-serverseiteige-validierung
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Deine Komponente ist benutzerfreundlich. User Experience (UX) oder Nutzererfahrung ist in aller Munde. Wenn ein Benutzer fehlerhafte Daten eingibt, ist es dir wichtig, dass dieser hierzu eine Erklärung erhält. Hierfür nutzen wir die Validierung.<!-- \index{Validierung (serverseitige)} -->

Bei der serverseitigen Überprüfung wird die vom Benutzer übermittelte Eingabe an den Server gesendet und dort mithilfe der Skriptsprache validiert. Im Falle von Joomla ist das PHP. Nach dem Validierungsprozess auf der Serverseite wird das Feedback von einer neuen dynamisch generierten Webseite an den Client zurückgesendet. Es ist sicherer, Benutzereingaben auf dem Server zu überprüfen. Böswillige Angreifer haben so kein leichtes Spiel. Clientseitige Skriptsprachen sind problemloser auszutricksen. Eindringlinge umgehen sie und haben so die Möglichkeitbösartige Eingaben an den Server zu senden.

> Da beide Validierungsmethoden (Server und Client) ihre eigene Bedeutung haben, wird empfohlen sie gleichzeitig nebeneinander zu verwenden. Die serverseitige Validierung ist sicherer. Die clientseitige benutzerfreundlicher!

Dieser Teil behandelt die serverseitige Validierung in Joomla 4.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t10...t11a)[^codeberg.org/astrid/j4examplecode/compare/t10...t11a] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Rule/LetterRule.php

In diesem Text ist es nicht das Hauptziel, sinnvolle Validierung zu lernen. Ich zeige dir vielmehr, wie du deine Regeln in Joomla integrierst. Deshalb siehst du hier nur ein rudimentäres Beispiel: Im Namen ist es ab jetzt verboten, eine Zahl einzufügen. Konkret bedeutet dies: _Astrid_ ist erlaubt. _Astrid9_ ist nicht erlaubt. Diese Prüfung implementieren wir in der Datei `LetterRule.php`.

> Hier im Beispiel nutze ich lediglich den zu prüfenden [regulären Ausdruck](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck) der Klasse `LetterRule.php`. Natürlich ist es möglich, komplexere Prüfungen mithilfe von Funktionen zu integrieren.

[administrator/components/com_foos/src/Rule/LetterRule.php](https://codeberg.org/astrid/j4examplecode/src/branch/t11a/src/administrator/components/com_foos/src/Rule/LetterRule.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t11a/src/administrator/components/com_foos/src/Rule/LetterRule.php

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

Es ist nicht notwendig in deine Datei die Methode `test` selbst zu implementieren. Du erbst diese von der Klasse `FormRule`, welche in der Datei `/libraries/src/Form/FormRule.php` implementiert ist. In ihr findest du den Code

```php
...
protected $regex;
...
public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null)
{
...
	// Test the value against the regular expression.
	if (preg_match(\chr(1) . $this->regex . \chr(1) . $this->modifiers, $value)) {
		return true;
	}

	return false;	
}
```

### Geänderte Dateien

Damit Joomla die Regel in der Datei `LetterRule.php` auf das Textfeld zur Eingabe des Namens anwendet, passen wir die Formulardatei an.

<!-- prettier-ignore -->
#### administrator/components/com_foos/forms/foo.xml

Geändert hat sich `<fieldset addruleprefix="FooNamespace\Component\Foos\ Administrator\Rule">` und `validate="Letter"`. Der Parameter `addruleprefix="FooNamespace\Component\Foos\Administrator\Rule"` sorgt dafür, dass das Formular im Namespace `FooNamespace\Component\Foos\Administrator\Rule` nach Regeln sucht und `validate="Letter"` zeigt an, dass die Regel `Letter`, also nach Joomla Standard die Klasse `LetterRule`, angewendet wird.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t11a/src/administrator/components/com_foos/forms/foo.xml)

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

## Beispiel aus Joomla Core

Um dir zu zeigen, was möglich ist, füge ich unten zwei Beispiele aus Joomla Core als Inspiration hinzu.

### Benutzername

Für den Benutzernamen wird die Joomla-Datenbank verwendet, um zu prüfen, ob der Name bereits existiert. In diesem Fall wird `false` zurückgegeben. Andernfalls ist der Test erfolgreich.

```php
<?php

namespace Joomla\CMS\Form\Rule;

use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\Database\DatabaseAwareInterface;
use Joomla\Database\DatabaseAwareTrait;
use Joomla\Database\ParameterType;
use Joomla\Registry\Registry;

class UsernameRule extends FormRule implements DatabaseAwareInterface
{
    use DatabaseAwareTrait;

    public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null)
    {
        // Get the database object and a new query object.
        $db    = $this->getDatabase();
        $query = $db->getQuery(true);

        // Get the extra field check attribute.
        $userId = ($form instanceof Form) ? (int) $form->getValue('id') : 0;

        // Build the query.
        $query->select('COUNT(*)')
            ->from($db->quoteName('#__users'))
            ->where(
                [
                    $db->quoteName('username') . ' = :username',
                    $db->quoteName('id') . ' <> :userId',
                ]
            )
            ->bind(':username', $value)
            ->bind(':userId', $userId, ParameterType::INTEGER);

        // Set and query the database.
        $db->setQuery($query);
        $duplicate = (bool) $db->loadResult();

        if ($duplicate) {
            return false;
        }

        return true;
    }
}
```

### URL

Für das URL-Feld ist kein regulärer Ausdruck erforderlich. Es werden nacheinander verschiedene Bedingungen abgefragt. Ist eine Bedingung nicht gegeben, wird `false` zurückgegeben. Andernfalls ist der Test erfolgreich.

```php
<?php

namespace Joomla\CMS\Form\Rule;

use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\CMS\Language\Text;
use Joomla\Registry\Registry;
use Joomla\String\StringHelper;
use Joomla\Uri\UriHelper;

class UrlRule extends FormRule
{
    public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null)
    {
        // If the field is empty and not required, the field is valid.
        $required = ((string) $element['required'] === 'true' || (string) $element['required'] === 'required');

        if (!$required && empty($value)) {
            return true;
        }

        $urlParts = UriHelper::parse_url($value);

        // See https://www.w3.org/Addressing/URL/url-spec.txt
        // Use the full list or optionally specify a list of permitted schemes.
        if ($element['schemes'] == '') {
            $scheme = array('http', 'https', 'ftp', 'ftps', 'gopher', 'mailto', 'news', 'prospero', 'telnet', 'rlogin', 'sftp', 'tn3270', 'wais',
                'mid', 'cid', 'nntp', 'tel', 'urn', 'ldap', 'file', 'fax', 'modem', 'git');
        } else {
            $scheme = explode(',', $element['schemes']);
        }

        /*
         * Note that parse_url() does not always parse accurately without a scheme,
         * but at least the path should be set always. Note also that parse_url()
         * returns False for seriously malformed URLs instead of an associative array.
         * @link https://www.php.net/manual/en/function.parse-url.php
         */
        if ($urlParts === false || !\array_key_exists('scheme', $urlParts)) {
            /*
             * The function parse_url() returned false (seriously malformed URL) or no scheme
             * was found and the relative option is not set: in both cases the field is not valid.
             */
            if ($urlParts === false || !$element['relative']) {
                $element->addAttribute('message', Text::sprintf('JLIB_FORM_VALIDATE_FIELD_URL_SCHEMA_MISSING', $value, implode(', ', $scheme)));

                return false;
            }

            // The best we can do for the rest is make sure that the path exists and is valid UTF-8.
            if (!\array_key_exists('path', $urlParts) || !StringHelper::valid((string) $urlParts['path'])) {
                return false;
            }

            // The internal URL seems to be good.
            return true;
        }

        // Scheme found, check all parts found.
        $urlScheme = (string) $urlParts['scheme'];
        $urlScheme = strtolower($urlScheme);

        if (\in_array($urlScheme, $scheme) == false) {
            return false;
        }

        // For some schemes here must be two slashes.
        $scheme = array('http', 'https', 'ftp', 'ftps', 'gopher', 'wais', 'prospero', 'sftp', 'telnet', 'git');

        if (\in_array($urlScheme, $scheme) && substr($value, \strlen($urlScheme), 3) !== '://') {
            return false;
        }

        // The best we can do for the rest is make sure that the strings are valid UTF-8
        // and the port is an integer.
        if (\array_key_exists('host', $urlParts) && !StringHelper::valid((string) $urlParts['host'])) {
            return false;
        }

        if (\array_key_exists('port', $urlParts) && !\is_int((int) $urlParts['port'])) {
            return false;
        }

        if (\array_key_exists('path', $urlParts) && !StringHelper::valid((string) $urlParts['path'])) {
            return false;
        }

        return true;
    }
}
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle ein neues Item oder editiere ein vorhandenes. Gib im Textfeld für den Titel dabei eine Zahl ein.

3. Editiere danach ein anderes Feld, setze zum Beispiel den Zugriff auf `Registered`.

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **keine** Warnung angezeigt wird.

5. Versuche am Ende, deine Eingabe zu speichern. Dies ist nicht möglich. Du siehst einen Warnhinweis.

![Joomla Validierung - Serverseiteige Validierung](/images/j4x13x1.png)

> Ist es dir aufgefallen? Du siehst die Warnung in der Regel erst, nachdem du im Formular sehr viele Änderungen durchgeführt hast und und alles abspeicherst. In dieser kleinen Erweiterung fällt dies nicht ins Gewicht. Bei großen Formularen kann der Hinweis am Ende frustrieren. Ein Benutzer wünscht sich, diesen unmittelbar nach der fehlerhaften Eingabe zu sehen. So ist möglich, sofort zu regieren und unnötige Arbeit zu vermeiden. Außerdem ist es frustrierend alle Eingaben noch einmal tätigen zu müssen. Hier kommt die clienteseiteige Validierung ins Spiel. Diese sehen wir uns im nächsten Teil an.

<img src="https://vg08.met.vgwort.de/na/3f0f8c400c4541ac99d7bcce0c0ad37e" width="1" height="1" alt="">
