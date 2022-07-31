---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-07-31
title: 'Server Side Validation'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-serverseiteige-validierung
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Your component is user-friendly. User experience (UX) or user experience is on everyone's lips. If a user enters incorrect data, it's important to you that they get an explanation. This is where we use validation.<!-- \index{validation (server-side)} -->

In server-side validation, the input submitted by the user is sent to the server and validated using the scripting language. In the case of Joomla, this is PHP. After the validation process on the server side, the feedback is sent back to the client from a new dynamically generated web page. It is safe to validate user input from the server. Malicious attackers have no easy game this way. Client-side scripting languages are easier to trick. Intruders bypass them to send malicious input to the server.

> Since both validation methods (server and client) have their own importance, it is recommended to use them simultaneously. Server-side validation is more secure. The client-side one is more user-friendly!

This part covers the server-side validation in Joomla 4.

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t10...t11a)[^codeberg.org/astrid/j4examplecode/compare/t10...t11a] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Rule/LetterRule.php

The main goal here is not to learn meaningful validation. Rather, I'm showing you how to integrate your rules into Joomla. That's why you see here only a rudimentary example: In the name it is forbidden to insert a number from now on. In concrete terms, this means: _Astrid_ is allowed. _Astrid9_ is not allowed. For this we create the file `LetterRule.php`.

> Here in the example I only use the [regular expression](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck) to be checked in the class `LetterRule.php`. Of course it is possible to integrate complex checks using functions.

[administrator/components/com_foos/ src/Rule/LetterRule.php](https://codeberg.org/astrid/j4examplecode/src/branch/t11a/src/administrator/components/com_foos/src/Rule/LetterRule.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t11a/src/administrator/components/com_foos/src/Rule/LetterRule.php

<?php
/**
 * Joomla Content Management System
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

It is not necessary to implement the `test` method in your file. You inherit it from the class `FormRule`, which is implemented in the file `/libraries/src/Form/FormRule.php`. In it you will find the code

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

### Modified files

To make Joomla apply the rule in the `LetterRule.php` file to the text field for entering the name, we modify the form file.

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

What has changed is `<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">` and `validate="Letter"`. The parameter `addruleprefix="FooNamespace\Component\Foos\Administrator\Rule"` ensures that the form searches for rules in the namespace `FooNamespace\Component\Foos\Administrator\Rule` and `validate="Letter"` indicates that the rule `Letter`, i.e. according to Joomla standard the class `LetterRule`, is applied.

[administrator/components/com_foos/ forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t11a/src/administrator/components/com_foos/forms/foo.xml)

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

## Example taken from Joomla Core

To show you what is possible I add below two examples from Joomla Core as inspiration.

### Username

For the username, the Joomla database is used to check if the name already exists. In this case `false` is returned. Otherwise the test is successful.

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

The URL field does not require a regular expression. Various requirements are queried successively. If a requirement is not given, `false` is returned. Otherwise, the test is successful.

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

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the ones from the previous part.

2. Open the view of your component in the administration area and create a new item or edit an existing one. Enter a number in the text field for the name.

3. Then edit another field, for example set the access to `Registered`.

4. make sure that you don't get any warning at this time.

5. try to save your input at the end. This is not possible. You will see a warning.

![Joomla Validation - Server Side Validation](/images/j4x13x1.png)

> Did you notice it? You may see the warning only after you have made a lot of changes in the form and want to save all changes. In this small extension it does not matter. In large forms, the hint at the end can be frustrating. A user may want to see it immediately after the incorrect input. So it is possible to act immediately and avoid unnecessary work. It is also frustrating to have to do all the input again. This is where client-side validation comes into play. We will look at this in the next part.

<img src="https://vg08.met.vgwort.de/na/6a564843d8d24485a5e55eaf1366578b" width="1" height="1" alt="">
