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

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t10...t11a) and incorporate these changes into your development version.

## Step by step

### New files

#### [administrator/components/com_foos/ src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-64b9f20891ab28b2da58671514d68679)

The main goal here is not to learn meaningful validation. Rather, I'm showing you how to integrate your rules into Joomla. That's why you see here only a rudimentary example: In the name it is forbidden to insert a number from now on. In concrete terms, this means: _Astrid_ is allowed. _Astrid9_ is not allowed. For this we create the file `LetterRule.php`.

> Here in the example I only use the [regular expression](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck) to be checked in the class `LetterRule.php`. Of course it is possible to integrate complex checks using functions.

[administrator/components/com_foos/ src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/blob/cf84e8d47ef47d4918c094810e7a16ea213d1bee/src/administrator/components/com_foos/src/Rule/LetterRule.php)

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

### Modified files

To make Joomla apply the rule in the `LetterRule.php` file to the text field for entering the name, we modify the form file.

#### [administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-262e27353fbe755d3813ea2df19cd0ed)

What has changed is `<fieldset addruleprefix="FooNamespace\Component\Foos\Administrator\Rule">` and `validate="Letter"`

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

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

2. Open the view of your component in the administration area and create a new item or edit an existing one. Enter a number in the text field for the name.

3. Then edit another field, for example set the access to `Registered`.

4. make sure that you don't get any warning at this time.

5. try to save your input at the end. This is not possible. You will see a warning.

![Joomla Validation](/images/j4x13x1.png)

> Did you notice it? You may see the warning only after you have made a lot of changes in the form. In this small extension it does not matter. In large forms, the hint at the end can be frustrating. A user may want to see it immediately after the incorrect input. So it is possible to act immediately and avoid unnecessary work. This is where client-side validation comes into play. We will look at this in the next part.

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t10...t11a.diff

## Links
