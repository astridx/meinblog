---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-06
title: 'Template - Web Asset Manager'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-wa
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Beim Laden von Styles und Stylesheets im Frontend gibt es viel zu beachten. Die Performance spielt eine Rolle und unter Umständen die Reihenfolge, in der Dateien geladen werden. In Joomla gab es oft Konflikte und umständliche Behelfslösung. Joomla 4 ändert dies mit dem Konzept der Web-Assets.<!-- \index{Template!Web-Assets} -->

> Es ist wichtig zu verstehen, dass der _Joomla Web Assets Manager_ alle Assets in einer Joomla-Installation verwaltet. Er wendet keine Assets speziell für ein Template an. Wenn eine Erweiterung geladen wird und sie Assets benötigt, kann sie ebenfalls den Web Assets Manager verwenden. Aber: Das muss sie nicht. Assets können weiterhin über `Joomla\CMS\HTML\HTMLHelper` eingebunden werden - zum Beispiel über `HTMLHelper::_('jquery.framework');`. Der Vorteil des _Webassets Manager_ ist, dass er dafür sorgt, dass Assets nicht doppelt geladen werden, wenn zwei Erweiterungen die gleiche Asset-Datei verwenden. Und die Assets werden in der definierten Reihenfolge geladen. Dies vermeidet Konflikte. Was meiner Meinung nach für Template-Entwickler besonders beachtenswert ist: Wenn andere Joomla-Erweiterungen per `HTMLHelper` ihre Assets einbinden, werden diese Assets nach den Web Asset Manager Assets angefügt. Dies führt dazu, dass Styles überschrieben werden, die im Template gesetzt werden. Siehe in diesem Zusammenhang (Issue 35706)[https://github.com/joomla/joomla-cms/issues/35706](^github.com/joomla/joomla-cms/issues/35706).

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t38...t39)[^github.com/astridx/boilerplate/compare/t38...t39] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt kommt keine neue Funktion hinzu. Wir bauen lediglich um. Wir ändern die Art, wie wir die JavaScript und CSS-Dateien integrieren. Ab jetzt wird eine Joomla-eigene Funktion dafür verwendet, die viele Vorteile bietet.

> Ich hatte im Zusammenhang mit der Nutzung der Datenbank im Frontend bei den Erklärungen zur Komponente bereits geschrieben, dass du Web Assets ebenfalls über die Datei `joomla.asset.json` integrieren kannst. Hier zeige ich, wie man ohne die Datei `joomla.asset.json` den Web Asset Manager nutzt.

### Neue Dateien

In diesem Kapitel wurde lediglich eine Datei geändert.

### Geänderte Dateien

In der Datei `templates/facile/ index.php` ändern wir die Art, wie JavaScript und CSS eingebunden wird. Wir ersetzten die `<script>`-Tags im Fußbereich und das `<link rel="stylesheet" .. />` im Kopfbereich. Anstelle davon nutzen wir den _Joomla Web Asset Manager_. Dieser macht es erforderlich, die Tags `<jdoc:include type="styles" />` und `<jdoc:include type="styles" />` zu verwenden. Wir geben hier Kontrolle ab. Joomla übernimmt im Gegenzug Arbeit für uns. Wenn wir die Assets richtig konfigurieren, lädt Joomla alles optimiert und konfliktfrei.

> Weil wir `<jdoc:include type="metas" />` nutzen, benötigen wir die Zeile `<title>Titel</title>` nicht mehr. Joomla setzt als Titel nun den _Site Name_ ein. Dieser Name wird bei der Installation festgelegt und ist jederzeit über die _Globale Konfiguration_ editierbar.

##### templates/facile/ index.php

Der nachfolgender Codeausschnitt zeigt dir die Änderungen in der Datei `templates/facile/ index.php`.

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

> Das asynchrone Laden der Web Assets führt zu einer Verbesserung der wahrgenommenen Ladezeit. Externen Ressourcen wie JavaScript können bei der Auszeichnung im HTML-Dokument die Attribute `defer` und `async` zugewiesen werden. Wird eine Ressource mit dem `defer`-Attribut versehen, erfolgt die Ausführung des Skriptes erst, nachdem das `Document Object Model (DOM)` geladen wurde. Mit der Angabe des Attributes `async` wird das JavaScript asynchron im Hintergrund geladen und ausgeführt. Durch dieses Vorgehen wird eine Blockierung des Renderings dem Browser vermieden und mehrere Skripte werden parallel geladen und ausgeführt.

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen:

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter, es sei denn, du verwendest die Variante mit der Datei `joomla.asset.json`. Die `joomla.asset.json` muss registriert werden und dies erfolgt beim Installieren.

2. Es ist keine sichtbare neue Funktion hinzukommen. Stelle sicher, dass das Drop Down Menü weiterhin funktioniert und die Anzeige unverändert ist. Wenn das so ist, dann werden alle Dateien korrekt geladen.

## Links

[Web Assets](https://docs.joomla.org/J4.x:Web_Assets/de)[^docs.joomla.org/j4.x:web_assets/de]
<img src="https://vg08.met.vgwort.de/na/280e411fc425447591db2fec37dad317" width="1" height="1" alt="">
