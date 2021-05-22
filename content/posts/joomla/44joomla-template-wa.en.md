---
date: 2021-01-13
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Web Asset Manager'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-wa
langKey: en
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

There is a lot to consider when loading styles and stylesheets in the frontend. Performance plays a role and possibly the order in which files are loaded. In Joomla, there were often conflicts and cumbersome workarounds. Joomla 4 changes this with the concept of web assets.

> I think it is important to understand that the _Joomla Web Assets Manager_ manages all assets in a Joomla installation. It does not apply assets specifically for a template. If an extension is loaded and it needs assets, it can also use the Web Assets Manager. But: It does not have to. Assets can still be included via `Joomla\CMS\HTML\HTMLHelper` - for example via `HTMLHelper::_('jquery.framework');`. The advantage of the _Webassets Manager_ is that it ensures that assets are not loaded twice if two extension use the same asset file. And the assets are loaded in the defined order. This prevents conflicts.

## For the impatient

Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t38...t39)[^github.com/astridx/boilerplate/compare/t38...t39] and transfer these changes into your development version.

## Step by step

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree39.png)

In this section, we are not adding a new function. We are merely rebuilding. We change the way we integrate the JavaScript and CSS files. From now on, a Joomla-specific function will be used for this, which offers many advantages.

> In connection with the use of the database in the frontend, I had already written in the explanations about the component that you can also integrate web assets via the file 'joomla.asset.json'. Here I show you how to use the Web Asset Manager without `joomla.asset.json`.

### New files

In this chapter only one file has been changed.

### Modified files

In the file `templates/facile/ index.php` we change the way JavaScript and CSS is included. We replaced the `<script>` tags in the footer and the `<link rel="stylesheet" .. />` in the header. Instead of them we use the _Joomla Web Asset Manager_. This makes it necessary to use the `<jdoc:include type="styles" />` and `<jdoc:include type="styles" />` tags. We give control here. Joomla does work for us in return. If we configure the assets correctly Joomla loads everything optimized and conflict free.

> Because we use `<jdoc:include type="metas" />`, we no longer need the line `<title>title</title>`. Joomla now uses the _site name_ as title. This name is set during installation and can be edited at any time via _global configuration_.

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/a2bb516f85494ecec58e494d25fa788a04e7f02b/src/templates/facile/index.php)

The following code snippet shows you the changes in the file `templates/facile/ index.php`.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/a2bb516f85494ecec58e494d25fa788a04e7f02b/src/templates/facile/index.php)

```{diff}
 \defined('_JEXEC') or die;
+
+use Joomla\CMS\HTML\HTMLHelper;
+
 $templatePath = 'templates/' . $this->template;
+$wa  = $this->getWebAssetManager();
+$wa->registerAndUseStyle('main', $templatePath . '/assets/css/main.css');
+HTMLHelper::_('jquery.framework');
+$wa->registerAndUseScript('dropotron', $templatePath . '/assets/js/jquery.dropotron.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('scrolly', $templatePath . '/assets/js/jquery.scrolly.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('browser', $templatePath . '/assets/js/browser.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('breakpoints', $templatePath . '/assets/js/breakpoints.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('util', $templatePath . '/assets/js/util.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('main', $templatePath . '/assets/js/main.js', [], ['defer' => true], []);
 ?>

 <!DOCTYPE html>
 <html lang="de">

 <head>
-    <meta charset="utf-8">
+    <jdoc:include type="metas" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <link rel="stylesheet" href="<?php echo $templatePath; ?>/assets/css/main.css" />
-    <title>Titel</title>
+    <jdoc:include type="styles" />
+    <jdoc:include type="scripts" />
 </head>

 <body class="homepage is-preload">
@@ -137,15 +149,6 @@ class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerBut
         </footer>

         <jdoc:include type="modules" name="debug" />
-
-        <script src="<?php echo $templatePath; ?>/assets/js/jquery.min.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/jquery.dropotron.min.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/jquery.scrolly.min.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/browser.min.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/breakpoints.min.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/util.js"></script>
-        <script src="<?php echo $templatePath; ?>/assets/js/main.js"></script>
-
     </div>
 </body>

```

> Asynchronous loading of web assets leads to an improvement in noticed loading time. External resources such as JavaScript can be assigned the `defer` and `async` attributes when tagged in the HTML document. If a resource is given the `defer` attribute, the script will not execute until the `Document Object Model (DOM)` has been loaded. By specifying the `async` attribute, the JavaScript is loaded and executed asynchronously in the background. This avoids blocking the rendering to the browser and multiple scripts are loaded and executed in parallel.

## Test your Joomla template

1. install your template in Joomla version 4 to test it:

Copy the files in the `templates` folder to the `templates` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part, unless you use the variant with the file `joomla.asset.json`. The `joomla.asset.json` has to be registered and this is done during the installation.

2. no visible new function has to be added. Make sure that the drop down menu works and the display fine. If it is, then all files are loaded correctly.

## Links

[Web Assets](https://docs.joomla.org/J4.x:Web_Assets)[^https://docs.joomla.org/j4.x:web_assets]
