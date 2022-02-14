---
description: 'desc'
shortTitle: 'short'
date: 2021-03-08
title: 'Grundgerüst'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-framework
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

## Cassiopeia Grundgerüst

Das Cassiopeia-Template für _Joomla 4_ hat ein Grundgerüst, das die [Modulpositionen](/cassiopeia-module-positionen)
ermöglicht und außerdem das Grid-System von Bootstrap für ein responsives Design nutzt. Dieses Grundgerüst unterstützt HTML5 Bereiche wie _header_, _nav_, _main_ und _footer_.

Wenn wir das gesamte PHP aus der Datei `index.php` entfernen, sehen wir das Grundgerüst des Templates wie unten dargestellt. Dies ist für das _statische_ Layout, mit `<body class="site-grid site wrapper-static">`. Dem _fluid_-Layout ist `<body class="site-grid site wrapper-fluid">` zugewiesen, welches es ermöglicht, dass der Body so groß wie die Bildschirmgröße ist und sich proportional verkleinert. Wenn wir die Option _fluid_ unter den [Optionen in Cassiopeia](/cassiopeia-optionen) auswählen, verwendet Joomla PHP-Code, der das "-fluid" an den Klassennamen anzuhängt.

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

Wir können dies testen, indem wir die Größe des Bildschirmfensters verringern.
<img src="https://vg04.met.vgwort.de/na/ff44e27f52c04ba1be1abbff38ccff47" width="1" height="1" alt="">
