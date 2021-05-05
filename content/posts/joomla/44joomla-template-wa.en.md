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

In der Datei `templates/facile/ index.php` ändern wir die Art, wie JavaScript und CSS eingebunden wird. Wir ersetzten die `<script>`-Tags im Fußbereich und das `<link rel="stylesheet" .. />` im Kopfbereich. Anstelle davon nutzen wir den Joomla Web Asset Manager. Dieser macht es erfoderlich, die Tags `<jdoc:include type="styles" />` und `<jdoc:include type="styles" />` zu verwenden. Wir geben hier Kontrolle ab. Joomla übernimmt im Gegenzug Arbeit für uns. Wenn wir die Assets richtig konfigurieren lädt Joomla alles optimiert und konfliktfrei.

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/a2bb516f85494ecec58e494d25fa788a04e7f02b/src/templates/facile/index.php)

Die Änderungen in der Datei `templates/facile/ index.php`.

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

> Das asynchrone Laden der Web Assets führt zu einer Verbesserung der wahrgenommenen Ladezeit. Deshalb nutzen `im Aufruf`. Externe Ressourcen wie JavaScript können bei der Auszeichnung im HTML-Dokument die Attribute `defer` und `async` zugewiesen bekommen. Wird eine Ressource mit dem `defer`-Attribut versehen, erfolgt die Ausführung des Skriptes erst, nachdem das `Document Object Model (DOM)` geladen wurde. Mit der Angabe des Attributes `async` wird das JavaScript asynchron im Hintergrund geladen und ausgeführt. Durch dieses Vorgehen wird eine Blockierung des Renderings in dem Browser vermieden und mehrere Skripte werden parallel geladen und ausgeführt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter, es sei denn, du verwendest die Variante mit der Datei `joomla.asset.json`. Die `joomla.asset.json` muss registriert werden und dies erfolgt beim Installieren.

2. Es ist keine neue Funktion hinzukommen. Stelle sicher, dass das Drop Down Menü funktioniert und die Anzeige unverändert ist. Wenn das so ist, dann werden alle Dateien richtig geladen.

## Links

[Web Assets](https://docs.joomla.org/J4.x:Web_Assets)[^https://docs.joomla.org/j4.x:web_assets]
