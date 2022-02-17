---
description: 'desc'
shortTitle: 'short'
date: 2021-01-25
title: 'Help Sites'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-hilfe
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Self-explanatory software is ideal. But which programme is? For this reason, help is always a useful addition. Depending on the system, help pages cannot be found immediately or are even hidden. Joomla offers a uniform procedure for this.<!-- \index{Help Site} -->

On the one hand, there is a button positioned in the same place in each component, which is used to call up an external help page.

![Joomla Help link in the list view](/images/j4x27x1.png)

In addition, it is possible to show descriptions next to the fields in forms. Since Joomla 4.1, these descriptions can be shown and hidden for a better overview. This feature was introduced with [PR 35610](https://github.com/joomla/joomla-cms/pull/35610/)[^github.com/joomla/joomla-cms/pull/35610/] and called *inline help*. <!-- \index{inline help} -->

> For impatient people: Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t22...t23)[^github.com/astridx/boilerplate/compare/t22...t23] and copy these changes into your development version.

## Step by step

The first thing you need to do is to create the help pages for your extension and save them online. Perhaps you would like to base the structure of your individual help pages on Joomla's own.

> You can find Joomla's own help pages on the Internet at the address [help.joomla.org/proxy](https://help.joomla.org/proxy)[^help.joomla.org/proxy]. An example page would be [help.joomla.org/proxy?keyref=Help40:Articles&lang=en](https://help.joomla.org/proxy?keyref=Help40:Articles&lang=en). Here, `help.joomla.org/proxy` stands for the base address and `?keyref=Help40:Articles&lang=en` addresses the specific subpage.

### New files

In this chapter, only files are changed.

### Modified files

Two lines per view are sufficient to display a button at the top right that contains a question mark as an icon and has an Internet address specified in the code as the link target. I have chosen `http://example.org` as an example. The principle is clear. You have the possibility to create a separate help site for each `View` and to link it in the view of the component - exactly where questions usually arise. 
And another line is enough to turn descriptions into inline help, which means to make them fade in and out or toggleable.

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/forms/foo.xml)

In the form, we add a description as an example. This will be shown or hidden later as inline help.

[administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/forms/foo.xml)

```php {diff}
 			validate="Letter"
 			class="validate-letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
+			description="COM_FOOS_FIELD_NAME_DESC"
 			size="40"
 			required="true"
 		 />
```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

The toolbar helper supports us. The line `ToolbarHelper::divider();` ensures that the following buttons are displayed right-aligned. `ToolbarHelper::inlinehelp();` inserts the button that shows and hides the inline help. The text for this is searched behind `description=` in the form at the field. `ToolbarHelper::help('', false, 'http://example.org');` inserts the button that redirects to the external help page. The address of the external page, here in the example `http://example.org`, is given as a parameter.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}

 
 			ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
 		}
+
+		ToolbarHelper::divider();
+		ToolbarHelper::inlinehelp();
+		ToolbarHelper::help('', false, 'http://example.org');
 	}
 }

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

The same I wrote under `administrator/components/com_foos/ src/View/Foos/HtmlView.php` also applies here.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/t23/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 		if ($user->authorise('core.admin', 'com_foos') || $user->authorise('core.options', 'com_foos')) {
 			$toolbar->preferences('com_foos');
 		}
+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
 	}
 }

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part.

2. Open the view of your component in the administration area. Click on the help link and make sure that you are redirected to the help page you entered.

![Joomla Help Link in the item view](/images/j4x27x2.png)

3. Open the view of your component in the administration area and click several times on the Inline Toggle Help button. Make sure that all texts that are available as description for a field are toggled on and off.

![Joomla Inline-Help Toggle Button in the Detail View](/images/j4x27x3.png)
<img src="https://vg08.met.vgwort.de/na/3e4cb448b8ab47f480890c213b3c2ba7" width="1" height="1" alt="">
