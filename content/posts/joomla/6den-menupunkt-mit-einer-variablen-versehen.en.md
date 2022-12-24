---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-07-22
title: 'Extend the Menu Item with a Variable'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/den-menupunkt-mit-einer-variablen-versehen
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











Sometimes you need to customize the frontend output for a menu item. For this you need a variable. In this part of the tutorial we will add a text variable to the menu item and use it for the display in the frontend.<!-- \index{parameter} --><!-- \index{variable} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t4...t5)[^codeberg.org/astrid/j4examplecode/compare/t4...t5] and copy these changes into your development version.

## Step by step

### New files

No new file is added in this chapter. We only change files.

### Modified files

<!-- prettier-ignore -->
#### components/com\_foos/src/Model/FooModel.php

In the model, change the method in which text is calculated for output. Delete the following entry:

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t5/src/components/com_foos/src/Model/FooModel.php)

```php
...
		if (!isset($this->message))
		{
			$this->message = 'Hello Foo!';
		}
...
```

Add the following lines in its place:

```php
...
		$app = Factory::getApplication();
		$this->message = $app->input->get('show_text', "Hi");
...
```

> You can do without the check `if (!isset($this->message))` in the new variant because the statement `get('show_text', "Hi");` catches the error that occurs when the parameter `show_text` is not set. Whenever the value `show_text` is not set, the second parameter<!-- \index{parameter} --> `"Hi"` is used as default.

The complete file looks like this in the Diff view:

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t5/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;

 /**

 	 */
 	public function getMsg()
 	{
-		if (!isset($this->message))
-		{
-			$this->message = 'Hello Foo!';
-		}
+		$app = Factory::getApplication();
+		$this->message = $app->input->get('show_text', "Hi");

 		return $this->message;
 	}

```

##### Side note: How to handle request variables in Joomla<!-- \index{Request} --><!-- \index{$_POST} --><!-- \index{$_GET} --><!-- \index{Input} -->

The function `$app->input->get('show_text', "Hi")` is a help. It is impemented via the `Input` class in the `libraries/vendor/joomla/input/src/Input.php` file and works together with `InputFilter` in the `libraries/vendor/joomla/filter/src/InputFilter.php.` file.

Extension development is about processing user input. The parameter added here is entered by a user through a form and then stored in the database table. To ensure that the value of the parameter is correct, i.e. does not contain malicious code or syntactical errors, it is necessary to filter the value. This is where the `Input` class comes into play. Those already familiar with PHP may work directly with raw request variables such as `$_POST` and `$_GET`. These work fine in Joomla. However, it is easier and possibly safer to let the `Input` class do the work. 

If you browse the code of Joomla, you will find many examples that show the basic uses of the `Input` class. For example, `$app->input->get('show_text', "Hi")` is checked for a string, because it is a string. To return the parameter without filtering, `$app->input->get('show_text', "Hi", 'RAW')` would be the appropriate command. 

Possible data types for filtering are:
- INT: An integer
- UINT: An unsigned integer
- FLOAT: A floating point number
- BOOLEAN: A boolean value
- WORD: A string containing A-Z or underscores only (not case sensitive)
- ALNUM: A string containing A-Z or 0-9 only (not case sensitive)
- CMD: A string containing A-Z, 0-9, underscores, periods or hyphens (not case sensitive)
- BASE64: A string containing A-Z, 0-9, forward slashes, plus or equals (not case sensitive)
- STRING: A fully decoded and sanitised string (default)
- HTML: A sanitised string
- ARRAY: An array
- PATH: A sanitised file path
- TRIM: A string trimmed from normal, non-breaking and multibyte spaces
- USERNAME: Do not use (use an application specific filter)
- RAW: The raw string is returned with no filtering
- unknown: An unknown filter will act like STRING. If the input is an array it will return an array of fully decoded and sanitised strings.

So far, so good. We are still missing the possibility to configure the value for `show_text` at the menu item in the backend. We implement this next in the file `default.xml`.

<!-- prettier-ignore -->
#### components/com\_foos/ tmpl/foo/default.xml

In your extension you offer the possibility to save a value at the menu item by extending the XML file with an input element. The following code shows you how to add a text input field.

[components/com_foos/tmpl/foo/default.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t5/src/components/com_foos/tmpl/foo/default.xml)

```xml {diff}
 			<![CDATA[COM_FOOS_FOO_VIEW_DEFAULT_DESC]]>
 		</message>
 	</layout>
+	<!-- Add fields to the request variables for the layout. -->
+	<fields name="request">
+		<fieldset name="request">
+			<field
+				name="show_text"
+				type="text"
+				label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
+				default="Hi"
+			/>
+		</fieldset>
+	</fields>
 </metadata>

```

The XML entry

```xml
<field
	name="show_text"
	type="text"
	label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
	default="Hi"
/>
```

turns Joomla into the following HTML code for the output in the backend form:

```html
<div class="control-label">
  <label id="jform_request_show_text-lbl" for="jform_request_show_text">
    COM_FOOS_FIELD_TEXT_SHOW_LABEL</label
  >
</div>
<div class="controls has-success">
  <input
    type="text"
    name="jform[request][show_text]"
    id="jform_request_show_text"
    value="Hi"
    class="form-control valid form-control-success"
    aria-invalid="false"
  />
</div>
```

> With `type="text"` we use one of the simplest form fields, that is the one of type `text`. Various types of form fields are built into Joomla. The Joomla documentation lists these standard types. Take a look at the table on the website [docs.joomla.org/Form_field/en](https://docs.joomla.org/Form_field/en). Often you can implement a special requirement with a special field.

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `components` folder to the `components` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the ones from the previous part.

2. switch to the Menu Manager and open a created menu item or create a new one. Here you will now see a text field where you can insert any text.

![Joomla Request Variable at Joomla Menu Item - Backend](/images/j4x6x1.png)

3. now switch to the frontend view. Make sure that the text you entered for the menu item is displayed in the correct variant in the frontend.

![Joomla Request Variable at Joomla Menu Item - Frontend](/images/j4x6x2.png)

I'm sure you can think of funnier or more useful examples. But the sense and function of the variables will be clear.

4. Create multiple menu items, each containing different text. Don't just output the text on the frontend, style the output using [conditional statements](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/if...else)[^developer.mozilla.org/en/docs/web/javascript/reference/statements/if...else]. A popular use case is to change the design of the output using variables. For example, you use the variable to query whether the content is to be output in a list or in a table.

<img src="https://vg08.met.vgwort.de/na/98d3772e579c429fa2b4b823195b57b5" width="1" height="1" alt="">
