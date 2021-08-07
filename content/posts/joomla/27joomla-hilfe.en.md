---
date: 2020-12-27
title: 'Joomla 4.x Tutorial - Extension Development - Help Sites'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-hilfe
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Self-explanatory software is ideal. But which programme is? For this reason, help is always a useful addition. Depending on the system, help pages cannot be found immediately or are even hidden. Joomla offers a uniform procedure for this.<!-- \index{Help Site} -->

![Joomla Help link in the list view](/images/j4x27x1.png)

> For impatient people: Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t22...t23)[^github.com/astridx/boilerplate/compare/t22...t23] and incorporate these changes into your development version.

## Step by step

### New files

In this chapter, only files are changed.

### Modified files

Two lines per view are sufficient to display a button at the top right that contains a question mark as an icon and has an Internet address specified in the code as the link target. I have chosen `http://joomla.org` as an example. The principle is clear. You have the possibility to create a separate help file for each `View` and to link it in the view of the component - exactly where questions usually arise.

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t22...t23#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

```php {diff}

+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
+

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t22...t23#diff-8e3d37bbd99544f976bf8fd323eb5250)

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/af04f8493aa045e8bcb2a49b8b1f8a60a927d78a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}

+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
+

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part.

2. Open the view of your component in the administration area. Click on the help link and make sure that you are redirected to the help page you entered.

![Joomla Help Link in the item view](/images/j4x27x2.png)
