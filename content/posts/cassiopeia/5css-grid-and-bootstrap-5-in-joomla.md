---
description: 'desc'
shortTitle: 'short'
date: 2021-03-07
title: 'CSS Grid'
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

Bootstrap 5 und CSS Grid sind die Werkzeuge, die für das Frontend-Design in Joomla 4 verwendet werden. Das [Joomla-Team macht diese Änderung](https://github.com/joomla/joomla-cms/pull/16810#issuecomment-310654687), weil sie glauben, dass CSS Grid zukunftssicherer ist. Joomla 3 war lange Jahre an eine alte Version von Bootstrap gebunden. Die Hoffnung ist, dass dieser neue Ansatz ähnliche Probleme mit Joomla 4 vermeiden wird.

## Bootstrap 2 versus Bootstrap 5

Zusammengefasst bedeutet Boostrap 2 versus Boostrap 5: [Float versus Flex zum Aufbau von Layouts](https://www.joomlashack.com/blog/joomla-news/css-grid/). Vergleichen wir die beiden Bootstrap Versionen, bevor wir uns CSS Grid genauer ansehen.

- Bootstrap 2 wird in Joomla 3 unterstützt.
- Bootstrap 5 wird in Joomla 4 unterstützt werden.

Das Beispiel unten ist ein zweispaltiges Grid-Layout in Bootstrap 2:

```
<div class="container">
    <div class="row">
        <div class="span6"></div>
        <div class="span6"></div>
    </div>
</div>
```

Dieser Code wird das folgende Layout ausgeben:

![Spalten in Boostrap 2]()

Hier ist das gleiche Beispiel mit Bootstrap 5:

```
<div class="container">
    <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
    </div>
</div>
```

Der Hauptunterschied ist, dass die Spaltengrößen-Präfixe von `span` auf `col-md-` geändert wurden. Wir können `col-md-` durch `col-sm-` ersetzen, um kleine Bildschirme anzusprechen, oder durch `col-lg-`, um große Bildschirme anzusprechen, oder durch `col-xl-` für extra große Bildschirme.

Es ist möglich, mehr als eine Klasse zu verwenden, um eine unterschiedliche Spaltengröße in Abhängigkeit von der Bildschirmbreite zu definieren. Dies erlaubt mehr Kontrolle über die Reaktionsfähigkeit bei unterschiedlichen Bildschirmgrößen!

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

Das obigen Beispiel zeigt ein prägnanteres HTML-Markup. Wir sind die CSS-Spalten- und -Zeilenklassen sowie den Zeilencontainer losgeworden. Diese Regeln definieren wir in der CSS-Datei:

- `grid-template-columns`: die Anzahl der Spalten und die Breite der einzelnen Spalten. Zwei Spalten, 50% Breite für beide.
- `grid-template-rows`: die Höhe für jede Zeile. In diesem Fall 100 Pixel.

Die Eigenschaft `display` mit `grid` als Wert definiert die Kind-Divs für `.container` als Elemente für das Layout.

Natürlich ist dieses kurze Beispiel sehr einfach und geht nicht auf komplexere Funktionen ein.

## CSS-Grid-Layouts in Joomla 4

CSS Grid hat in meinen Augen zwei markante Vorteile gegenüber Bootstrap:

- Einfacheres HTML. Wir benötigen weniger HTML um das gleiche Ergebnis zu erzielen wie mit Bootstrap 5.
- Mehr Kontrolle über das Design durch CSS. Selbst wenn wir wissen, dass CSS für das Design zuständig ist, müssen wir uns bei Frameworks auch auf das HTML-Markup verlassen. Mit CSS Grid haben wir mehr Kontrolle über das Design und sind weit weniger abhängig von den CSS-Klassen und wie diese in HTML eingefügt sind.

Allerdings gibt es eine Reihe von Einschränkungen, auf die wir stoßen, sobald wir versuchen, [CSS Grid in einem Joomla-Projekt mit dynamischem Content](https://www.joomla51.com/blog/item/joomla-css-grid-and-dynamic-content) zu implementieren.

### CSS Grid und das Cassiopeia-Template

CSS Grid funktioniert so, dass wir zunächst ein Raster für einen übergeordneten Container definieren. Wir positionieren dann jedes untergeordnete Element dieses Containers innerhalb dieses Rasters. Auf diese Weise erhalten wir ein CSS-Grundgerüst, mit dem wir auf einfache Weise ein anspruchsvolles Layout mit einfachem, leicht zu lesendem Markup erstellen.

#### Das Problem mit dynamischen Inhalten und CSS Grid

Joomla ist unglaublich vielseitig. Jede beliebige Joomla-Seite kann mehrere Layouts haben, abhängig von den Modulen, die in einem bestimmten Menüpunkt aktiviert sind. Dasselbe gilt für Komponenten, wo verschiedene Komponentenelemente angezeigt werden, abhängig von den Einstellungen für diese Komponente. Es ist diese Flexibilität von Joomla, die eine Herausforderung bei der Verwendung von CSS-Grid darstellt. Wie die Positionierung eines Elements innerhalb eines Rasters definiert wird, muss sich je nach den umgebenden Elementen ändern.

Angenommen ein Komponentenbereich ist von Modulpositionen umgeben.

![Beispiel-Layout](/images/grid1.png)

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

Das ist einfach. Die Probleme beginnen, wenn Elemente dieses Layouts nicht mehr veröffentlicht werden. Betrachten wir eine Seite, auf der kein Modul innerhalb der Sidebar-Modulposition veröffentlicht ist. Ohne die Positionierung der umgebenden Elemente innerhalb des Rasters neu zu definieren, wird das Entfernen des Sidebar-Moduls einen leeren Bereich ausgeben.

![Beispiel-Layout](/images/grid2.png)

Im Gegensatz zu [Flexbox](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Flexible_Box_Layout/Grundlegende_Konzepte_der_Flexbox) können wir mit CSS Grid nicht definieren, wie Elemente in einen leeren Raum hineinwachsen.

Wer mit Flexbox vertraut ist weiß, dass das Hineinwachsen funktioniert. Das liegt daran, dass Flexelemente entweder in einer Zeile oder einer Spalte definiert sind. Dies ist in CSS Grid nicht der Fall. Mit der Eigenschaft `flex-grow` legt man fest, wie ein Element innerhalb dieser einen Dimension wachsen und sich ausdehnen soll. Es ist diese Dynamic von Flexbox, die es unglaublich nützlich innerhalb von Joomla macht, besonders wenn wir darüber nachdenken, wie mehrere Module fließen, wenn sie innerhalb einer einzelnen Modulposition veröffentlicht werden.

CSS Grid ist zweidimensional. Deshalb ist es komplizierter. Insbesondere, weil eine beliebige Anzahl von Elementen innerhalb des Grids im verfügbaren Platz möglich ist.

![Beispiel-Layout](/images/grid6.png)

> Wegen dieser zusätzlichen Komplexität ist es sicherlich in der CSS Grid-Spezifikation nicht vorgesehen, diese dynamisch zu verwalten.

Aber es gibt die vielen Beispielen für CSS-Grid, bei denen Inhalte mühelos fließen? Ja. Die Besonderheit bei dieser Art von Layout ist, dass die Elemente keine definierte Platzierung haben. Daher setzt ein Algorithmus ein, der jedes Element automatisch innerhalb des Rasters platziert. Das passt für Inhalte. Zum Beispiel ist es ideal für eine Bildergalerie. Es ist nicht geeignet, wenn ein Element einen fest Platz hat, beispielsweise eine Seitenleiste. Letzteres ist bei einem Joomla Template in der Regel der Fall.

#### Eine Lösung

Um dies zu umgehen, müssen wir neu definieren, wie Elemente innerhalb des Rasters positioniert werden - abhängig von den vorhandenen Raster-Elementen. Wir können dies tun, indem wir `has-*`-Klassen für die Elemente erstellen, die innerhalb einer Seite vorhanden sind und das Layout dieser Seite beeinflussen. Diese Klasse geben wir dann an einen äußersten Container weiter. Das nachfolgende Codebeispiel zeigt die implementierung in Joomla 4 Beta 7.

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
<body class="site-grid site <?php echo $option
	. ' ' . $wrapper
	. ' view-' . $view
	. ($layout ? ' layout-' . $layout : ' no-layout')
	. ($task ? ' task-' . $task : ' no-task')
	. ($itemid ? ' itemid-' . $itemid : '')
	. ' ' . $pageclass
	. $hasClass;
	echo ($this->direction == 'rtl' ? ' rtl' : '');
?>">

...
```

Wir haben nun also `has-sidebar`-Klassen, die dem `<body>`-Tag hinzugefügt sind, wenn ein Modul in der Sidebar-Modulposition veröffentlicht wird. Anhand des vorherigen Layout-Beispiels können wir nun diese Klasse verwenden, um das Layout in unserem Template-CSS neu zu definieren, je nachdem, ob ein Sidebar-Modul vorhanden ist. Angenommen, wir möchten, dass der Komponentenbereich den Platz des Sidebar-Moduls ausfüllt:

```css
:not(.has-sidebar) .component {
  grid-column: 1 / 4;
}
```

Dieses CSS bedeutet übersetzt _wenn keine `has-sidebar`-Klasse vorhanden ist, erweitere den Komponentenbereich auf die volle Breite des Grids_. Dies führt zu folgendem Ergebnis...

![Beispiel-Layout](/images/grid3.png)

In diesem Beispiel wird zunächst für jedes Element eine Position definiert, dann wird die Position neu definiert, wenn ein Element nicht vorhanden ist. Je nach Szenario kann es logischer sein, dies andersherum zu tun. Anstatt also die Position neu zu definieren, wenn ein Element nicht vorhanden ist, definieren wir stattdessen die Position neu, wenn es vorhanden ist.

```css
.component {
  grid-column: 1 / 4;
}

.has-sidebar .component {
  grid-column: 2 / 4;
}
```

Da es sich hierbei um ein CSS-Grid handelt, sind wir nicht darauf beschränkt, wie wir das Layout der Seite in Abhängigkeit von den vorhandenen Elementen verändern. Mit der gleichen Klasse können wir nun komplett neu definieren, wie jedes Element innerhalb des Grids angezeigt wird.

```css
:not(.has-sidebar) .component {
  grid-column: 1 / 4;
}

:not(.has-sidebar) .component {
  grid-column: 1 / 4;
}
```

Das sieht dann wie folgt aus:

![Beispiel-Layout](/images/grid4.png)

Die gleiche Methode kann für eine beliebige Anzahl von Elementen auf einer Seite wiederholt werden. `has-*`-Klassen sollten für jedes Element hinzugefügt werden.

In Joomla 4 Beta 7 wird dies für `.has-sidebar-left` und `.has-sidebar-right` verwendet.

```php
@supports (display: grid) {
  .site-grid {
    display: grid;
    grid-template-areas: ". head head head head ." ". banner banner banner banner ." ". top-a top-a top-a top-a ." ". top-b top-b top-b top-b ." ". comp comp comp comp ." ". side-r side-r side-r side-r ." ". side-l side-l side-l side-l ." ". bot-a bot-a bot-a bot-a ." ". bot-b bot-b bot-b bot-b ." ". footer footer footer footer ." ". debug debug debug debug .";
    grid-template-columns: [full-start] minmax(0, 1fr) [main-start] repeat(4, minmax(0, 16.875rem)) [main-end] minmax(0, 1fr) [full-end];
    grid-gap: 0 1em;
  }
  .site-grid > [class^=container-],
.site-grid > [class*=" container-"] {
    width: 100%;
    max-width: none;
  }
  .site-grid:not(.has-sidebar-left) .container-component {
    grid-column-start: main-start;
  }
  .site-grid:not(.has-sidebar-right) .container-component {
    grid-column-end: main-end;
  }
  .site-grid > .full-width {
    grid-column: full-start/full-end;
  }
  @media (min-width: 48em) {
    .site-grid {
      grid-template-areas: ". head head head head ." ". banner banner banner banner ." ". top-a top-a top-a top-a ." ". top-b top-b top-b top-b ." ". side-l comp comp side-r ." ". bot-a bot-a bot-a bot-a ." ". bot-b bot-b bot-b bot-b ." ". footer footer footer footer ." ". debug debug debug debug .";
    }
  }
  .site-grid.wrapper-fluid {
    grid-template-columns: [full-start] minmax(0, 1fr) [main-start] repeat(4, minmax(0, 25%)) [main-end] minmax(0, 1fr) [full-end];
    grid-gap: 0 2em;
  }
  .site-grid.wrapper-fluid .grid-child {
    max-width: none;
  }
  .site-grid.wrapper-fluid header > .grid-child,
.site-grid.wrapper-fluid footer > .grid-child {
    padding-right: 2em;
    padding-left: 2em;
  }
}
```

<img src="https://vg04.met.vgwort.de/na/84da832e1e304a59829dc3aa631646c4" width="1" height="1" alt="">
