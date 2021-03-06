---
date: 2020-12-04
title: 'Joomla 4.x Tutorial - Extension Development - A Menu Item'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/ein-menuepunkt
langKey: en
categories:
  - Code
  - JoomlaEn
tags:
  - CMS
  - Joomla
---

In this article you will learn how to create a menu item for the frontend view of your component. This way, you don't need to know the exact URL. Later, a conversion to search engine friendly URLs is possible automatically.

![Joomla Einen Menüpunkt erstellen](/images/j4x4x2.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t2...t3)[^github.com/astridx/boilerplate/compare/t2...t3] and incorporate these changes into your development version.

## Step by step

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree3.png)

### New files

The menu item in the frontend works differently than the one in the administration area. We create a separate XML file. Later we will use parameters. But for now we keep it straightforward. We add some language strings for text. Later on, we will see how to translate them.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t2...t3#diff-35fa310ee8efa91ecb0e9f7c604d413f)

Create the file `default.xml` under `components/com_foos/tmpl/foo` and add the following code:

[components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/0b9e39042dea67221aabcda2d226b0b8816cabd6/src/components/com_foos/tmpl/foo/default.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t3/src/components/com_foos/tmpl/foo/default.xml -->

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="COM_FOOS_FOO_VIEW_DEFAULT_TITLE">
		<message>
			<![CDATA[COM_FOOS_FOO_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>
</metadata>

```

> The [term CDATA](https://en.wikipedia.org/w/index.php?title=CDATA&oldid=1010130060), meaning character data, is used for distinct, but related, purposes in the markup language XML. The term indicates that a certain portion of the document is general character data, rather than non-character data or character data with a more specific, limited structure. The CDATA section may contain markup characters (`<`, `>` and `&`). These are not interpreted further by the parser.

The `title` attribute in the `layout` tag here is used when we create a new menu item for this component in the administration area.
The text in the `message` tag is displayed as a description.

> The language string does not stay as it is. It will be translated into different languages. We will work on this later. Here we prepare everything.

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `components` folder to the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

2. open the menu manager to create a menu item. To do this, click on 'Menu' in the left sidebar and then on 'All Menu Items'.

![Joomla Create a Menu Item](/images/j4x4x1.png)

Then click on the `New` button and fill in all the necessary fields.

![Joomla Create a menu item](/images/j4x4x2.png)

3. find the appropriate `Menu Item Type` with the `Select` button.

![Joomla Create a Menu Item](/images/j4x4x3.png)

4. save the menu item.

5. switch to the frontend and make sure that the menu item is created correctly and works.

![Joomla Create a menu item](/images/j4x4x4.png)
