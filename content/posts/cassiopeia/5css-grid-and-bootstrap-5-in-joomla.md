---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-03-07
title: 'Bootstrap 5 und CSS Grid'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: css-grid-and-bootstrap-5-in-joomla
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Eine der wichtigsten Änderungen in Joomla 4 ist das Upgrade von Bootstrap 2 auf [Bootstrap 5](https://getbootstrap.com/docs/5.0/). Allerdings setzt Joomla 4 nicht ausschließlich auf Bootstrap auf. Joomla 4 verwendet ebenfalls [CSS Grid](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Grid_Layout).

Bootstrap 5 und CSS Grid sind die Werkzeuge, die für das Frontend-Design in Joomla 4 verwendet werden. Das [Joomla-Team machte diese Änderung](https://github.com/joomla/joomla-cms/pull/16810#issuecomment-310654687), weil sie glauben, dass CSS Grid zukunftssicherer ist. Joomla 3 war lange Jahre an eine alte Version von Bootstrap gebunden. Die Hoffnung ist, dass dieser neue Ansatz ähnliche Probleme mit Joomla 4 vermeiden wird.<!-- \index{Bootstrap 5} --><!-- \index{CSS Grid} -->

## Bootstrap 2 versus Bootstrap 5

Zusammengefasst bedeutet Bootstrap 2 versus Bootstrap 5: [Float versus Flex zum Aufbau von Layouts](https://www.joomlashack.com/blog/joomla-news/css-grid/). Vergleichen wir die beiden Bootstrap Versionen, bevor wir uns CSS Grid genauer ansehen.

- Bootstrap 2 ist in Joomla 3 integriert.
- Bootstrap 5 ist in Joomla 4 integriert.

Das folgende Codeschnipsel zeigt ein zweispaltiges Grid-Layout in Bootstrap 2:

```
<div class="container">
    <div class="row">
        <div class="span6"></div>
        <div class="span6"></div>
    </div>
</div>
```

Dieser Code zeigt das folgende Layout:

![Spalten in Bootstrap 2](/images/grid0.png)

Nachfolgend ein analoges Codebeispiel mittels Bootstrap 5:

```
<div class="container">
    <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
    </div>
</div>
```

Der Hauptunterschied ist, dass die Spaltengrößen-Präfixe von `span` auf `col-md-` geändert wurden. Wir können `col-md-` durch `col-sm-` ersetzen, um kleine Bildschirme anzusprechen, oder durch `col-lg-`, um große Bildschirme anzusprechen, oder durch `col-xl-` für extra große Bildschirme.

Es ist möglich, mehr als eine Klasse zu verwenden, um eine unterschiedliche Spaltengröße in Abhängigkeit von der Bildschirmbreite zu definieren. Dies erlaubt mehr Kontrolle über das Layout bei unterschiedlichen Bildschirmgrößen!

```html
<div class="col-md-6 col-lg-12"></div>
```

Das obige Beispiel bedeutet, dass die Spaltenbreite bei mittleren Bildschirmen (ab 768 Pixel) 50% und bei einer minimalen Bildschirmbreite von 992 Pixel 100% betragen würde. Bei der mittleren Breite werden 6 Spalten und bei der minimalen Breite 12 der Spalten verwendet.

|                       | xs<576px    | sm≥576px   | md≥768px   | lg≥992px   | xl≥1200px  | xxl≥1400px  |
| --------------------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----------- |
| Container `max-width` | None (auto) | 540px      | 720px      | 960px      | 1140px     | 1320px      |
| Class prefix          | `.col-`     | `.col-sm-` | `.col-md-` | `.col-lg-` | `.col-xl-` | `.col-xxl-` |

[Grid Optionen bei getbootstrap.com](https://getbootstrap.com/docs/5.0/layout/grid/#grid-options)

## CSS-Raster-Layout

CSS Grid-Layout ist ein Raster-Layout-System, das von [allen gängigen Browsern](https://caniuse.com/#feat=css-grid) unterstützt wird. CSS Grid ist kein Framework.

Bootstrap erstellt ein Raster - also Spalten und Zeilen - mithilfe von CSS-Klassen. CSS Grid funktioniert auf die entgegengesetzte Weise. Wir erhalten ein übersichtlicheres HTML-Markup und legen per CSS fest, welche Elemente Zeilen und welche Spalten sind - und die Größen. Es gibt keine Float- oder Flex-CSS-Eigenschaften.

Das zweispaltige Layout aus unseren vorherigen Bootstrap-Beispielen hier im Grid CSS Layout.

HTML:

```html
<div class="container">
  <div></div>
  <div></div>
</div>
```

CSS:

```css
.container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100px;
}
```

Das obigen Beispiel verwendet weniger Text im HTML-Markup. Es gibt keine CSS-Spalten- und -Zeilenklassen mehr. Die Regeln hierfür definieren wir im Elternelement:

- `grid-template-columns`: die Anzahl der Spalten und die Breite der einzelnen Spalten. Zwei Spalten, 50% Breite für beide.
- `grid-template-rows`: die Höhe für jede Zeile. In diesem Fall 100 Pixel.

Die Eigenschaft `display` mit `grid` als Wert definiert die Kind-`Divs` für `.container` als Elemente für das Layout.

Natürlich ist dieses kurze Beispiel sehr einfach und geht nicht auf komplexere Funktionen ein.

## CSS-Grid-Layouts in Joomla 4

CSS Grid hat in meinen Augen zwei wesentliche Vorteile gegenüber Bootstrap:

- Einfacheres HTML: Wir benötigen weniger HTML um das gleiche Ergebnis zu erzielen wie mit Bootstrap 5.
- Mehr Kontrolle über das Design durch CSS: Selbst wenn wir wissen, dass CSS für das Design zuständig ist, müssen wir uns bei Frameworks auch auf das HTML-Markup verlassen. Mit CSS Grid haben wir mehr Kontrolle über das Design und sind weit weniger abhängig von den CSS-Klassen und wie diese in das HTML-Markup eingefügt sind.

Allerdings gibt es eine Reihe von Einschränkungen. Sobald wir versuchen, [CSS Grid in einem Joomla-Projekt mit dynamischem Content](https://www.joomla51.com/?view=article&id=89:joomla-css-grid-and-dynamic-content&catid=9) zu implementieren, werden diese deutlich.

### CSS Grid und das Cassiopeia-Template

CSS Grid funktioniert so: Wir definieren zunächst ein Raster für einen übergeordneten Container. Danach positionieren wir jedes untergeordnete Element dieses Containers innerhalb dieses Rasters. Auf diese Weise erhalten wir ein CSS-Grundgerüst, mit dem wir auf einfache Weise ein anspruchsvolles Layout mit einfachem, leicht zu lesendem Markup erstellen.

#### Das Problem mit dynamischen Inhalten und CSS Grid

Joomla ist unglaublich vielseitig. Jede beliebige Joomla-Seite kann mehrere Layouts haben, abhängig von den Modulen, die in einem bestimmten Menüpunkt aktiviert sind. Dasselbe gilt für Komponenten, die abhängig von den Einstellungen verschiedene Komponentenelemente angezeigen. Diese Flexibilität von Joomla stellt eine Herausforderung bei der Verwendung von CSS-Grid dar. Wie die Positionierung eines Elements innerhalb eines Rasters definiert wird, muss sich je nach den vorhandenen Elementen ändern. Das klingt kompliziert? Ein Beispiel sagt mehr als Worte: Angenommen ein Komponentenbereich ist von Modulpositionen umgeben.

![Beispiel-Layout 1](/images/grid1a.png)

Unter Verwendung von CSS Grid kann das oben genannte mit dem folgenden CSS erreicht werden. Es erzeugt ein einfaches 3-Spalten-Raster erzeugt und positioniert jedes untergeordnete Element explizit innerhalb dieses Rasters.

> Das 3-Spalten-Raster erkennt man an `1fr 1fr 1fr` in `grid-template-columns: 1fr 1fr 1fr;`.

```css
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr;
}

.sidebartop {
  grid-column: 1 / 4;
  grid-row: 1 / 2;
}

.sidebar {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}

.component {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}

.copyright {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.footer {
  grid-column: 2 / 4;
  grid-row: 3 / 4;
}
```

Soweit ist das unkompliziert. Die Probleme beginnen, wenn einzelne Elemente dieses Layouts nicht mehr veröffentlicht werden. Angenommen auf der Website ist kein Modul innerhalb der Sidebar-Modulposition veröffentlicht: Ohne die Positionierung der umgebenden Elemente innerhalb des Rasters neu zu definieren, wird das Fehlen des Sidebar-Moduls einen leeren Bereich im Layout verursachen.

![Beispiel-Layout 2](/images/grid2.png)

Wer mit Flexbox vertraut ist weiß, dass ein Hineinwachsen möglich ist. Im Gegensatz zu [Flexbox](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Flexible_Box_Layout/Grundlegende_Konzepte_der_Flexbox) können wir mit CSS Grid nicht definieren, wie Elemente in einen leeren Raum hineinwachsen Im Falle von Flexbox ein Hineinwachsten einfach, weil die Elemente entweder in einer Zeile oder einer Spalte definiert sind. Dies ist in CSS Grid nicht der Fall. Mit der Eigenschaft `flex-grow` legt man bei Flexbox fest, wie ein Element sich innerhalb der einen Dimension ausdehnen. Es ist diese Dynamic von Flexbox, die es unglaublich nützlich innerhalb von Joomla für Teilbereiche macht. Für das Grundgerüst nutzt Cassiopeia CSS Grid und CSS Grid ist zweidimensional. Deshalb ist es komplizierter. Insbesondere, weil eine nicht festgelegte Anzahl von Elementen innerhalb des Grids im verfügbaren Bereich vorkommen kann.

![Beispiel-Layout 3](/images/grid6.png)

Aber es gibt die vielen Beispielen für CSS-Grid, bei denen Inhalte mühelos fließen? Ja. Die Besonderheit bei dieser Art von Layout ist, dass die Elemente keine definierte Platzierung haben. Daher setzt ein Algorithmus ein, der jedes Element automatisch innerhalb des Rasters platziert. Das passt für viele unterschiedlichen Arten von Inhalten. Zum Beispiel ist es ideal für eine Bildergalerie. Es ist nicht geeignet, wenn ein Element eine feste Position benötigt: Beispielsweise eine Seitenleiste. Letzteres kommt bei einem Joomla Template häufig vor.

#### Eine Lösung

Eine Lösung ist es, genauer zu definieren, wie Elemente innerhalb des Rasters positioniert werden. Wir können dies tun, indem wir `has-*`-Klassen für die Elemente erstellen, die innerhalb einer Seite vorhanden sind. Diese Klassen geben wir dann an einen äußersten Container weiter. Das nachfolgende Codebeispiel zeigt die Implementierung in Joomla 4.1.

```php
<php
...
$hasClass = '';

if ($this->countModules('sidebar-left', true))
{
	$hasClass .= ' has-sidebar-left';
}

if ($this->countModules('sidebar-right', true))
{
	$hasClass .= ' has-sidebar-right';
}
?>

...
...
<body class="site <?php echo $option
	. ' ' . $wrapper
	. ' view-' . $view
	. ($layout ? ' layout-' . $layout : ' no-layout')
	. ($task ? ' task-' . $task : ' no-task')
	. ($itemid ? ' itemid-' . $itemid : '')
	. ($pageclass ? ' ' . $pageclass : '')
	. $hasClass
	. ($this->direction == 'rtl' ? ' rtl' : '');
?>">
...
```

Wir haben nun also `has-sidebar`-Klassen, die dem `<body>`-Tag hinzugefügt werden, falls ein Modul in der jeweiligen Sidebar-Modulposition veröffentlicht ist. Anhand des vorherigen Layout-Beispiels können wir nun diese Klasses verwenden, um das Layout in unserem Template-CSS genauer zu definieren. Angenommen, wir möchten, dass der Komponentenbereich den Platz des Sidebar-Moduls ausfüllt verwenden wir die nachfolgenden CSS Definitionen:

```css
body:not(.has-sidebar-left) .site-grid .container-component {
  grid-column-start: main-start;
}
body:not(.has-sidebar-right) .site-grid .container-component {
  grid-column-end: main-end;
}
```

Dieses CSS bedeutet übersetzt _wenn keine `has-sidebar`-Klasse vorhanden ist, erweitere den Komponentenbereich auf die volle Breite des Main-Grids_. Dies führt zu folgendem Layout:

![Beispiel-Layout](/images/grid3.png)

> Interessante Pull Requests in diesem Zusammenhang sind die folgenden: Der Programmcode wurde im [Pull Request 23661](https://github.com/joomla/joomla-cms/pull/23661) eingeführt. Später wurde das CSS Grid vom `body`-Element per [Pull Request 35012](https://github.com/joomla/joomla-cms/pull/35012/) verschoben.

In diesem Beispiel wird zunächst für jedes Element eine Position definiert (1) und zugewiesen (2). Dann wird die Position neu definiert (3), falls ein Element nicht vorhanden ist.

> Den nachfolgenden Code habe ich aus der Datei `/media/templates/site/cassiopeia/css/template.css` von Cassiopeia in Joomla 4.1 vereinfacht entnommen. Das Ganze ist natürlich komplizierter, weil weitere Elemente im Grid vorkommen. Außerdem sind verschiedene Bildschirmbreiten im responsive Webdesign zu beachten.

```css
/* (1) */
body.wrapper-fluid .site-grid {
  grid-template-columns:
    [full-start] minmax(0, 1fr) [main-start] repeat(4, minmax(0, 25%))
    [main-end] minmax(0, 1fr) [full-end];
  grid-gap: 0 2em;
}

.site-grid {
  grid-template-areas:
    '. banner banner banner banner .'
    '. top-a top-a top-a top-a .'
    '. top-b top-b top-b top-b .'
    '. side-l comp comp side-r .'
    '. bot-a bot-a bot-a bot-a .'
    '. bot-b bot-b bot-b bot-b .';
}
```

```css
/* (2) */
.site-grid > .full-width {
  grid-column: full-start/full-end;
}
```

```css
/* (3) */
.container-component {
  grid-area: comp;
}
... body:not(.has-sidebar-left) .site-grid .container-component {
  grid-column-start: main-start;
}
body:not(.has-sidebar-right) .site-grid .container-component {
  grid-column-end: main-end;
}
```

> Je nach Szenario kann die umgekehrte Vorgehensweise sinnvoller sein. Anstatt also die Position neu zu definieren, wenn ein Element nicht vorhanden ist, definieren wir stattdessen die Position erst, wenn das Element vorhanden ist.

Da es sich hierbei um ein CSS-Grid handelt, sind wir nicht darauf beschränkt, wie wir das Layout der Seite in Abhängigkeit von den vorhandenen Elementen verändern. Mit der gleichen Klasse können wir nun komplett neu definieren, wie jedes Element innerhalb des Grids angezeigt wird.

```css
body .has-sidebar-left .site-grid .container-component {
  grid-column-start: main-start;
}
body .has-sidebar-right .site-grid .container-component {
  grid-column-end: main-end;
}
```

Der zuvor geschriebene Code könnte dazu führen, dass der Komponentenbereich mit einer vorhandenen Seitenleiste in der CSS-Grid Spalte `main-start` beginnt und im nachfolgenden Layout resultiert:

![Beispiel-Layout](/images/grid4.png)
<img src="https://vg04.met.vgwort.de/na/84da832e1e304a59829dc3aa631646c4" width="1" height="1" alt="">
