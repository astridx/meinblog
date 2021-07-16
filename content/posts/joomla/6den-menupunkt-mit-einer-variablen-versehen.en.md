---
date: 2020-12-06
title: 'Joomla 4.x Tutorial - Extension Development - Extend the Menu Item with a Variable'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/den-menupunkt-mit-einer-variablen-versehen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Sometimes you need to customize the frontend output for a menu item. For this you need a variable. In this part of the tutorial we will add a text variable to the menu item and use it for the display in the frontend.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x1.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t4...t5)[^github.com/astridx/boilerplate/compare/t4...t5] and incorporate these changes into your development version.

## Step by step

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree5.png)

### New files

No new file is added in this chapter. We only change.

### Modified files

<!-- prettier-ignore -->
#### [components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t4...t5#diff-599caddf64a6ed0c335bc9c9f828f029)

In the model, change the method in which text is calculated for output. Delete the following entry:

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

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

Combined, this looks like the following in the Diff view:

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

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

So far, so good. We are still missing the possibility to configure the value for `show_text` at the menu item. We implement this next in the file `default.xml`.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t4...t5#diff-35fa310ee8efa91ecb0e9f7c604d413f)

You store a value using the menu item in the input element by expanding the XML file:

[components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/tmpl/foo/default.xml)

```php {diff}
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

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `components` folder to the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

2. switch to the Menu Manager and open the created menu item or create a new one. Here you will now see a text field where you can insert any text.

![Joomla Request Variable at Joomla Menu Item](/images/j4x6x1.png)

3. now switch to the frontend view. Make sure that the text you entered for the menu item is displayed in the correct variant in the frontend.

![Joomla Request Variable at Joomla Menu Item](/images/j4x6x2.png)

I apologize for my lack of imagination. I'm sure you can think of funnier or more useful examples. But the sense and function of the variables will be clear, right?

Create multiple menu items, each containing different text. Don't just output the text on the frontend, style the output using [conditional statements](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/if...else). A popular use case is to influence the design of the output using variables. For example, you use the variable to query whether the content is to be output in a list or in a table.
