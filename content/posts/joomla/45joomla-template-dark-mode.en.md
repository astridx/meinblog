---
date: 2021-01-14
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Dark Mode'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-dark-mode
langKey: en
categories:
  - JoomladE
  - Code
tags:
  - CMS
  - Joomla
---

The topic of dark mode has caused a lot of excitement. Apple, for example, has integrated dark mode into its operating systems. Windows and Google have done the same. Dark Mode is in fashion. And not only that. It offers advantages. Whether darker displays are good for the eyes is debatable. What is clear, however, is that less light saves energy.

## For the impatient

Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t39...t40)[^github.com/astridx/boilerplate/compare/t39...t40] and transfer these changes to your development version.

## Step by step

In this section we enable a dark mode with the help of a specially created CSS file. We query which mode is active via the property 'prefers-color-scheme'. This recognises which variant the user has set in the operating system.

I use the following snippet to have the information displayed in the browser console beforehand. This way I am sure that the property 'prefers-color-scheme' is supported and how it is set.

```js
    <script>
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        console.log('Dark mode is supported');
    }
    if (matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Dark mode');
    } else {
        console.log('Light  mode');
    }
    </script>
```

> A simple solution would be to display everything in black and white. The entry `@media (prefers-color-scheme: dark) { body { background: #333!important; color: white !important; }}` in the CSS file would do this. A matching color scheme is better in terms of quality.

### New files

Added the CSS file `templates/assets/css/main.dark.css`. This new stylesheet contains the rules for the dark mode. It differs from `templates/assets/css/main.css` only in some color codes.

> The system messages appear to bright in dark mode. So far we have used these function unchanged. In Dark Mode I adjust these now. This is the [web component](https://developer.mozilla.org/en/docs/Web/Web_Components) `joomla-alert`. The appearance is changeable via `joomla-alert { ..}` in the CSS file.

### Changed files

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/661edd39e639f8b76fa73f7d00054fcff61f5351/src/templates/facile/index.php)

The file `templates/facile/ index.php` now loads the CSS file depending on the _preferred color scheme_. Additionally it integrates a slider in the upper left corner, which makes the mode switchable by click. The necessary changes can be found in the following code example.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/661edd39e639f8b76fa73f7d00054fcff61f5351/src/templates/facile/index.php)

```php {diff}
 $templatePath = 'templates/' . $this->template;
 $wa  = $this->getWebAssetManager();
-$wa->registerAndUseStyle('main', $templatePath . '/assets/css/main.css');
+$wa->registerAndUseStyle('main_dark', $templatePath . '/assets/css/main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
+$wa->registerAndUseStyle('main_light', $templatePath . '/assets/css/main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
 HTMLHelper::_('jquery.framework');
 $wa->registerAndUseScript('dropotron', $templatePath . '/assets/js/jquery.dropotron.min.js', [], ['defer' => true], []);
 $wa->registerAndUseScript('scrolly', $templatePath . '/assets/js/jquery.scrolly.min.js', [], ['defer' => true], []);
@@ -30,11 +31,14 @@
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <jdoc:include type="styles" />
     <jdoc:include type="scripts" />
+    <script type="module" src="https://unpkg.com/dark-mode-toggle"></script>
 </head>

 <body class="homepage is-preload">
     <div id="page-wrapper">
-
+
+        <dark-mode-toggle></dark-mode-toggle>
+
         <?php if ($this->countModules('menu', true)) : ?>
         <nav id="nav">
             <jdoc:include type="modules" name="menu" />
@@ -150,6 +154,18 @@ class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerBut

         <jdoc:include type="modules" name="debug" />
     </div>
-</body>
+    <script>
+    /*
+        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
+            console.log('Dark mode is supported');
+        }
+        if (matchMedia('(prefers-color-scheme: dark)').matches) {
+            console.log('Dark mode');
+        } else {
+            console.log('Light  mode');
+        }
+    */
+    </script>
+    </body>

 </html>
```

## Side Note: Dark Mode depending on the position of the sun

An interesting idea is to switch the dark mode depending on the position of the sun at the viewer: As soon as the sun sets on the viewer's side, the dark mode should kick in. Not only time and date play a role, but also the geo position. I found a possible implementation on [Codepen](https://codepen.io/ljardin/pen/jOyzwbN).

First of all, CSS variables are set.

```css
html {
  --text-color: #2f2f2f;
  --bg-color: #fff;
}

html[data-theme='dark'] {
  --text-color: #fff;
  --bg-color: #2f2f2f;
}

body {
  colour: var(--text-color);
  background: var(--bg-color);
}
```

These CSS variables are used to switch JavaScript, which queries the time zone, on and off.

```js
// Get Current ClientTime
let clientTimes = new Date()
let currentTime = clientTimes.getHours() + clientTimes.getMinutes() / 100

let options = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 30000,
}

let success = (pos) => {
  // Get Location
  let lat = pos.coords.latitude
  let long = pos.coords.longitude

  // Get Sunset && Sunrise Time for Location based on SunsetCalc (https://github.com/mourner/suncalc)
  let sunTimes = SunCalc.getTimes(new Date(), lat, long)
  let sunsetTime =
    sunTimes.sunset.getHours() + sunTimes.sunset.getMinutes() / 100
  let sunriseTime =
    sunTimes.sunrise.getHours() + sunTimes.sunrise.getMinutes() / 100

  // Add Data-Attribut to HTMl if sunsetTime < curentTime
  if (currentTime > sunsetTime || currentTime < sunriseTime) {
    document.querySelector('html').dataset.theme = 'dark'
  }
}

let error = (err) => {
  if (currentTime > 20) {
    // Set Fallback if GeoLocation is not supported
    document.querySelector('html').dataset.theme = 'dark'
  }
}

navigator.geolocation.getCurrentPosition(success, error, options)
```

## Test your Joomla template

1. install your template in Joomla version 4 to test it:

Copy the files in the `templates` folder to the `templates` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part. Your website should now support dark mode. In the upper left area there should be a switch to toggle the mode.

![Create Joomla Template - Dark Mode](/images/j4x45x1.png)

## Links

[prefers-color-scheme](https://web.dev/prefers-color-scheme/)[^https://web.dev/prefers-color-scheme]

[dark-mode-toggle-Element](https://github.com/GoogleChromeLabs/dark-mode-toggle)[^https://github.com/googlechromelabs/dark-mode-toggle]
