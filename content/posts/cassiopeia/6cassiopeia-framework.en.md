---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2021-03-08
title: 'Basic framework'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-framework
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---










## Cassiopeia skeleton<!-- \index{skeleton} -->

The Cassiopeia template for _Joomla 4_ has a basic skeleton that allows the [module-positions](/cassiopeia-module-positions)
and also uses Bootstrap's grid system for a responsive design. This basic skeleton supports HTML5 areas such as _header_, _nav_, _main_ and _footer_.

If we remove all the PHP from the `index.php` file, we see the basic skeleton of the template as shown below. This is for the _static_ layout, with `<body class="site-grid site wrapper-static">`. Assigned to the _fluid_ layout is `<body class="site-grid site wrapper-fluid">`, which allows the body to be as large as the screen size and shrink proportionally. If we select the _fluid_ option under the [options in Cassiopeia](/cassiopeia-options), Joomla uses PHP code that appends the text "-fluid" to the class name.

```
<!DOCTYPE html>
<html lang="" dir="">
<head>
  <jdoc:include type="metas" />
  <jdoc:include type="styles" />
  <jdoc:include type="scripts" />
</head>

<body class="site-grid site wrapper-static">

  <header class="header container-header full-width">
    <div class="grid-child">
      <div class="navbar-brand">
        LOGO
      </div>
   </div>
    <div class="grid-child container-nav">
      <nav class="navbar navbar-expand-md">
      </nav>
    </div>
  </header>

  <div class="grid-child container-component">
    <main>
    </main>
  </div>

  <footer class="container-footer footer full-width">
    <div class="grid-child">
    </div>
  </footer>

</body>
</html>
```

### Body

Das Standard-Styling für das Cassiopeia Template hat keinen Rand. Kopfzeile, Navigation, Hauptbereich und Footer nehmen die gesamte verfügbare Breites ein. Das Logo befindet sich in der Kopfzeile im `<header>`-Tag. `<body class=".. wrapper-fluid">` ist eine Breite von 100% zugewiesen. `<body class=".. wrapper-static">` ist eine Breite auf 1320px begrenzt.

### Sidebar

```
...
	<?php if ($this->countModules('sidebar-right', true)) : ?>
	<div class="grid-child container-sidebar-right">
		<jdoc:include type="modules" name="sidebar-right" style="card" />
	</div>
	<?php endif; ?>
...
```

We can test this by reducing the size of the screen window.
<img src="https://vg04.met.vgwort.de/na/2d578b7fdff146ce85215298ffb60664" width="1" height="1" alt="">
