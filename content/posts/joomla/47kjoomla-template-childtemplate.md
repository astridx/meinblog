---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-03-26
title: 'Template - Kind Template'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-childtemplate
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Du benutzt das Template als Grundlage für verschiedene Projekte und möchtest gerne bestimmte Teile lediglich in einem Projekt anders gestalten? Vielleicht fragst du dich, wie du ein Joomla Template erstellst, welches als Eltern-Template für ein Child-Template einsetzbar ist. Viele kennen dies vom CMS Wordpress. In Joomla funktionierte dies bis zur Version 4.1 anders. Um sich vor dem Überschreiben des eigenen neuen Codes in einem Template während einer Aktualisierung des Templates zu schützen, musste man das entsprechende Template kopieren und in der Kopie die Änderungen vornehmen. Der Vorteil der Arbeit an einer Kopie war, dass man die Änderungen, die man beim Aktualisieren vorgenommen hatte, nicht verlor. Der Nachteil war, dass man Aktualisierungen am Ursprungstemplate selbst in seine Kopie integrieren musste, wenn man diese neuen Funktionen wünschte. Seit Joomla 4.1 ist dieser Mangel [behoben](https://github.com/joomla/joomla-cms/pull/35874)[^github.com/joomla/joomla-cms/pull/35874]. Mit der Einführung von Child-Templates ist es möglich, ein Template unterhalb eines anderen Templates zu erstellen, in dem man nur die Dinge ändert, die man individuell gestalten möchte. Alles andere wird vom übergeordneten Template verwendet. Um diese Funktion anbieten zu können ist es erforderlich, die Speicherorte der Mediendateien im übergeordneten Template im Joomla-Medienordner anzusiedeln und den Parameter `inheritable` in der XML-Datei mit dem Wert `1` zu integriere. Dies erledigen wir in diesem Kapitel.<!-- \index{Child Template} --><!-- \index{Template!Child Template} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t41...t41a)[^codeberg.org/astrid/j4examplecode/compare/t41...t41a] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt verändern wir das Template so, dass man es als Basis verwenden kann, sprich als Eltern-Template. Am Ende ist es möglich, auf der Grundlage von Facile ein anderes Template anzulegen. Dieses andere Template ist ein sogenanntes Kind-Template. Alle Aktualisierungen von Facile greifen bei ihm. Es ist lediglich erforderlich, den im Kind-Template erzeugten Code zu warten.

> Tipp: Das Standardtemplate namens Cassiopeia wird sicherlich die Lebenszeit von Joomla 4 gewartet. Aus diesem Grund bietet es eine gute Basis auf der man aufbauen kann, wenn man kein eigenes Template von Grund auf erstellen möchte.

### Neue Dateien

Es gibt keine neuen Dateien in diesem Kapitel. Wir haben lediglich Dateien verschoben oder geändert.

### Geänderte Dateien

Der Pfad zu den _Template-Medien-Verzeichnissen_ war vor Joomla 4.1 `templates/TEMPLATENAME/`. Template-Medienordner sind beispielsweise die Ordner `css`, `images`, `fonts`, `webfonts`, `js`, `sass`, `less` oder `scss`. Ab Joomla 4.1 befinden sich diese Medien idealerweise im Verzeichnis `media/templates/site/TEMPLATENAME/`. Dies ist eine Voraussetzung, um ein Kind-Template sinnvoll zu verwenden.

##### templates/facile/ assets

Damit die Medien-Dateien überschrieben werden können, ist es erforderlich, diese ins Verzeichnis `medien` im Joomla Stammverzeichnis zu verschieben. Deshalb verlegen wir

- alle Ordner des Verzeichnisses `templates/facile/assets`,
- die Bilder `template_preview.png` und `template_thumbnail.png`
- sowie die Verzeichnisse `templates/facile/images` 
- und `templates/facile/favicon_package`

nach `media\templates\site\facile\`.

Damit die Bilder `template_preview.png` und `template_thumbnail.png` und die im Verzeichnis `favicon_package` später vom Kind-Template einfach überschreibbar sind, lege ich diese im Unterverzeichnis `images` ab, also unter `medien\templates/site/facile/images/` beziehungsweise unter `medien\templates/site/facile/images/favicon_package/`.

##### media/templates/site/facile/ css/main.css

Unsere CSS-Dateien liegen nun nicht mehr im Unterverzeichnis `assets`. Deshalb passen wir den relativen Pfad in der Datei `main.css` an.

[media/templates/site/facile/ css/main.css](https://codeberg.org/astrid/j4examplecode/src/branch/t41a/src/media/templates/site/facile/css/main.css)

```php {diff}
 /* Banner */
 #banner {
   position: relative;
-  background-image: url('images/overlay.png'), url('images/overlay.png'), url('../../images/banner.jpg');
+  background-image: url('images/overlay.png'), url('images/overlay.png'), url('../images/banner.jpg');
   background-position: top left, top left, center center;
   background-repeat: repeat, repeat, no-repeat;
   background-size: auto, auto, cover;
```

> Das Gleiche gilt für die Datei `media/templates/site/facile/ css/main.dark.css` und wer SASS verwendet auch für die Datei `media/templates/site/facile/ sass/main.scss`

##### templates/facile/ index.php

In der Datei `templates/facile/ index.php` korrigieren wir alle Stellen, an denen die Mediendateien geladen werden. Es ist nicht weiter notwendig, einen genauen Pfad anzugeben, weil wir die Standardverzeichnisse in Joomla verwenden. Wir legen die Dateien dort ab, wo Joomla nach ihnen sucht. Weil Joomla eine bestimmte Reihenfolge einhält, ist das Überschreiben mittels Kind-Template möglich. Auf diese Art und Weise wird alles, was das Kind-Template nicht selbst implementiert vom Eltern-Template genutzt.

Außerdem machen wir via `$wa->registerAndUseStyle('user', 'user.css', [], []);` die Verwendung einer `user.css` Datei möglich. Dies Vereinfacht das Überschreiben ohne an den schon vorhandenen Dateien Änderungen vornehmen zu müssen.

[templates/facile/ index.php](https://codeberg.org/astrid/j4examplecode/src/branch/t41a/src/templates/facile/index.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLHelper;

-$templatePath = 'templates/' . $this->template;
 $wa  = $this->getWebAssetManager();
-$wa->registerAndUseStyle('main_dark', $templatePath . '/assets/css/main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
-$wa->registerAndUseStyle('main_light', $templatePath . '/assets/css/main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
+$wa->registerAndUseStyle('main_dark', 'main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
+$wa->registerAndUseStyle('main_light', 'main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
+$wa->registerAndUseStyle('user', 'user.css', [], []);
 HTMLHelper::_('jquery.framework');
-$wa->registerAndUseScript('dropotron', $templatePath . '/assets/js/jquery.dropotron.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('scrolly', $templatePath . '/assets/js/jquery.scrolly.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('browser', $templatePath . '/assets/js/browser.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('breakpoints', $templatePath . '/assets/js/breakpoints.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('util', $templatePath . '/assets/js/util.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('main', $templatePath . '/assets/js/main.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('dropotron', '/js/jquery.dropotron.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('scrolly', '/js/jquery.scrolly.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('browser', '/js/browser.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('breakpoints', '/js/breakpoints.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('util', '/js/util.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('main', '/js/main.js', [], ['defer' => true], []);
 ?>

 <!DOCTYPE html>

     <jdoc:include type="scripts" />

     <link rel="apple-touch-icon" sizes="180x180"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/apple-touch-icon.png">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/apple-touch-icon.png', '', [], true, 1); ?>">
     <link rel="icon" type="image/png" sizes="32x32"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-32x32.png">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/favicon-32x32.png', '', [], true, 1); ?>">
     <link rel="icon" type="image/png" sizes="16x16"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-16x16.png">
-    <link rel="manifest" href="<?php echo $templatePath . '/favicon_package'; ?>/site.webmanifest">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/favicon-16x16.png', '', [], true, 1); ?>">
+    <link rel="manifest" href="<?php echo '/favicon_package'; ?>/site.webmanifest">
     <meta name="msapplication-TileColor" content="#da532c">
     <meta name="theme-color" content="#ffffff">
```

> Wenn du dich neben dem Joomla Web Asset Manager mehr für die hier verwendeten Funktionen interessierst, ist die Datei `libraries/src/HTML/HTMLHelper.php` ein guter Ausgangspunkt für weitere Code-Recherchen.

##### templates/facile/ language/en-GB/tpl_facile.ini

[templates/facile/ language/en-GB/tpl_facile.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t41a/src/templates/facile/language/en-GB/tpl_facile.ini)

Wir haben das Bannerbild in das Medienverzeichnis verschoben, damit dieses auch im Kind-Template eingesetzt wird, falls das Kind kein spezielleres Bild zur Verfügung stellt. Diese Änderung hat eine Änderung in den Sprachdateien zur Folge.

```php {diff}
 TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
 ;params
 TPL_FACILE_BANNER_FIELDSET_LABEL="Banner"
-TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /templates/facile/images/banner.jpg"
+TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /media/templates/site/facile/images/banner.jpg"
 TPL_FACILE_BANNER_LABEL="Show Banner"
 TPL_FACILE_BANNER_TITLE="Title text"
 TPL_FACILE_BANNER_TAGLINE="Tagline text"
```

##### templates/facile/ templateDetails.xml

Die Speicherorte der Mediendateien wurden geändert. Damit dies bei der Installation des Templates korrekt erkannt wird, korrigieren wir die entsprechenden Einträge in der Datei `templates/facile/ templateDetails.xml`.

> Das Ändern der Speicherorte im `src`-Verzeichnis der Entwicklungsumgebung ist nicht zwingend. Weil es mir wichtig ist, dass meine Dateien die Speicherorte in einer Joomla-Installation nachbilden, habe ich die Dateien im `src`-Verzeichnis ebenfalls umkopiert.

[templates/facile/ templateDetails.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t41a/src/templates/facile/templateDetails.xml)

```php {diff}
 	<license>GNU General Public License version 2 or later;</license>
 	<version>__BUMP_VERSION__</version>
 	<description>TPL_FACILE_XML_DESCRIPTION</description>
+	<inheritable>1</inheritable>

 	<files>
 		<filename>component.php</filename>

 		<filename>templateDetails.xml</filename>
 		<filename>template_preview.png</filename>
 		<filename>template_thumbnail.png</filename>
-		<folder>assets</folder>
 		<folder>html</folder>
-		<folder>images</folder>
 		<folder>language</folder>
 	</files>
-
+	<media destination="templates/site/facile" folder="media/templates/site/facile">
+		<folder>js</folder>
+		<folder>css</folder>
+		<folder>sass</folder>
+		<folder>webfonts</folder>
+		<folder>images</folder>
+	</media>
 	<positions>
 		<position>topbar</position>
 		<position>below-top</position>
```

## Teste dein Joomla-Template

1. Installiere dein Template in Joomla Version 4, um es zu testen: Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation. Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla passt bei der Installation die Datenbank für dich an.

Stelle sicher, dass alle bisher integrierten Funktionen funktionieren.

2. Überprüfe die Änderungen im Template Manager

Wechsele in den Template Manager und überzeuge dich davon, dass die Schaltfläche zum Erstellen eines Kind-Templates vorhanden ist. Die Schaltfläche zum Kopieren des Templates ist verschwunden.

![Joomla Template erstellen - Kind-Template erstellen - Template Manager](/images/j4x47kx0.png)

![Joomla Template erstellen - Kind-Template erstellen - Schaltfläche zum Kopieren ist verschwunden](/images/j4x47kx1.png)

![Joomla Template erstellen - Kind-Template erstellen - Schaltfläche zum Erstellen eines Kind-Templates](/images/j4x47kx2.png)

3. Erstelle ein Kind-Template

Klicke auf die Schaltfläche zum Erstellen eines Kind-Templates. Benenne das Template `facile_child`, wenn du meinem Beispiel folgen magst.

![Joomla Template erstellen - Kind-Template erstellen - Ansicht im Template Manager nach Erstellung des Kind-Templates](/images/j4x47kx3.png)

Stelle sicher, dass die Bilder, die die Vorschau des Templates anzeigen, nun aus dem Medienverzeichnis geladen werden.

Zusatzaufgabe: Speichere spezielle Vorschaubilder für dein Kind-Template und lege diese unter `medien\templates/site/facile_facile_child/images/template_preview.png` und `medien\templates/site/facile_facile_child/images/template_thumbnail.png` ab. Überzeuge dich davon, dass diese im Template-Manager korrekt angezeigt werden.

4. Mache das Kind-Template zum Standard und überprüfe die Änderungen im Frontend

Öffne die Ansicht der Template Stile.

![Joomla Template erstellen - Kind-Template erstellen - Template Stile](/images/j4x47kx4.png)

Klicke den Stern neben dem Stil der das Kind Template nennt, so das dieser am Ende in gelber Farbe dargestellt ist.

![Joomla Template erstellen - Kind-Template erstellen - Kind-Template als Standard-Stil](/images/j4x47kx5.png)

Wechsele in die Frontend Ansicht und überzeuge dich davon, dass die Parameter nicht vom Eltern-Template übernommen werden. Im Gegensatz dazu sind alle Inhalte des Medienverzeichnisses wie CSS-Style, JavaScript und Bilder vorhanden. Du siehst eine Ansicht, die dem nachfolgenden Bild ähnelt, wenn du meinem Beispiel auch während der letzten Kapitel gefolgt bist.

![Joomla Template erstellen - Kind-Template erstellen - Frontend Ansicht ohne das Setzen von Parametern](/images/j4x47kx6.png)

5. Parameter

Setzte die Parameter für das Banner und die Links zu den Sozialen Netzwerken im Kind-Template. Teste die Frontend Ansicht. Alle Parameter funktionieren im Kind-Template genauso wie im Eltern-Template.

Zusatzaufgabe: Speichere spezielle Favicons für das Kind-Template und lege dieses unter `medien\templates/site/facile_facile_child/images/favicon_package` ab. Überzeuge dich davon, dass diese im Frontend korrekt angezeigt wird.

> Sicherlich erwartest du, dass das Banner für das Kinde-Template im Verzeichnis `media/templates/site/facile_facile_child/images/banner.jpg` liegt, wenn das Banner für das Eltern-Template unter `media/templates/site/facile/images/banner.jpg` abgelegt ist. Leider funktioniert dies in diesem Fall nicht so einfach. Der Grund ist, dass das Banner Bild per CSS ausgewählt wird. Es ist erforderlich den Stil für die ID `#banner` in der Datei `main.css` zu überschreiben.

6. Überschreibe CSS Inhalte

Erstelle die Datei `media/templates/site/facile_facile_child/css/user.css` und implementiere Stile. Beispielsweise ist so möglich den Manko zu beheben, den wir im vorherigen Übungsteil zu den Parametern festgestellt haben. Passe das Banner-Bild mithilfe des nachfolgenden CSS-Stils für das Kind-Template an.

```css
#banner {
  background-image: url('../images/banner.jpg');
}
```

## Links

[YouTube Video; Sprecher Dimitris Grammatiko](https://www.youtube.com/embed/LxOQnX-JJyk)[^youtube.com/embed/LxOQnX-JJyk]
