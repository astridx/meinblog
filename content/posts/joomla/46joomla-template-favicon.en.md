---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-11-12
title: 'Template - Favicon'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-favicon
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











A [favicon](https://de.wikipedia.org/wiki/Favicon) is a small icon used to identify a website in a recognizable way. It appears in different ways on different devices. Most often, you see it as an icon in your favorites when you save the website here to visit it again more quickly. Almost always the tabs in the browser are marked with the icon.<!-- \index{template!favicon} -->

> The size and type of the favicon is expected to be different on different devices. I use the website [realfavicongenerator.net](https://realfavicongenerator.net/) to create the optimal format of my image for the individual devices. I consider this tool to be tried and tested and the easiest to use. However, there is an alternative newer approach that is used by the Joomla standard template Cassiopeia. If you prefer to use the modern SVG format with an ICO file as a fallback layer, you will find a solution that suits you better under [Favicon in Joomla template](https://blog.astrid-guenther.de/en/cassiopeia-favicon).

> For impatient people: Look at the changed programme code in the [diff view](https://codeberg.org/astrid/j4examplecode/compare/t40...t41)[^codeberg.org/astrid/j4examplecode/compare/t40...t41] and transfer these changes into your development version.

## Step by step

In this section we create a recognisable image. In the first step, we choose an image. For the example, I chose a yellow PNG file. In the next step, we convert it into different formats using the website [realfavicongenerator.net](https://realfavicongenerator.net/).

> Tip: Clear the browser cache if changes to the favicon are not visible during development.

### New files

The favicon generator creates 9 files which we copy into our template directory. I put all of them in the directory `templates/facile/favicon_package`. These are exactly the files

1.  android-chrome-192x192.png
2.  android-chrome-512x512.png
3.  apple-touch-icon.png
4.  browserconfig.xml
5.  favicon-16x16.png
6.  favicon-32x32.png
7.  favicon.ico
8.  mstile-150x150.png
9.  site.webmanifest

### Modified files

##### templates/facile/index.php

In order for the files to be found, new lines in the file `templates/facile/index.php` are required. The variable `$templatePath` helps me to create the relativ path.

> We introduced the variable `$templatePath` in the last chapter. It is assigned `$templatePath = 'templates/' . $this->template;` and thus points to the directory of the current template in the Joomla directory tree. The entry `<link rel="icon" type="image/png" sizes="16x16" href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-16x16.png">` thus becomes `<link rel="icon" type="image/png" sizes="16x16" href="/PathToJoomla/templates/facile/favicon_package/favicon-16x16.png">` in the HTML source code.

[templates/facile/index.php](https://codeberg.org/astrid/j4examplecode/src/branch/t41/src/templates/facile/index.php)

```php {diff}
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <jdoc:include type="styles" />
     <jdoc:include type="scripts" />
+
+    <link rel="apple-touch-icon" sizes="180x180"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/apple-touch-icon.png">
+    <link rel="icon" type="image/png" sizes="32x32"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-32x32.png">
+    <link rel="icon" type="image/png" sizes="16x16"
+        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-16x16.png">
+    <link rel="manifest" href="<?php echo $templatePath . '/favicon_package'; ?>/site.webmanifest">
+    <meta name="msapplication-TileColor" content="#da532c">
+    <meta name="theme-color" content="#ffffff">
+
     <script type="module" src="https://unpkg.com/dark-mode-toggle"></script>
 </head>
```

## Test your Joomla template

1. install your template in Joomla version 4 to test it: Copy the files in the `templates` folder to the `templates` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the ones from the previous part. Make sure that the favicons are displayed correctly on the devices. Below you can see a representation in the browser Firefox.

![Create Joomla Template - Favicon](/images/j4x46x1.png)

## Links

[Favicon Generator](https://realfavicongenerator.net/)[^realfavicongenerator.net]
<img src="https://vg08.met.vgwort.de/na/73b505d6ad6643aaa92b8c045a3a891b" width="1" height="1" alt="">
