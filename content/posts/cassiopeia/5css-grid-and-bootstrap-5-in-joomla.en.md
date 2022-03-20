---
description: 'desc'
shortTitle: 'short'
date: 2022-03-07
title: 'CSS Grid'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/css-grid-and-bootstrap-5-in-joomla
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

One of the most important changes in Joomla 4 is the upgrade from Bootstrap 2 to [Bootstrap 5](https://getbootstrap.com/docs/5.0/). However, Joomla 4 does not rely exclusively on Bootstrap. Joomla 4 also uses [CSS Grid](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Grid_Layout).

Bootstrap 5 and CSS Grid are the tools used for front-end design in Joomla 4. The [Joomla team made this change](https://github.com/joomla/joomla-cms/pull/16810#issuecomment-310654687) because they believe CSS Grid is more future-proof. Joomla 3 was tied to an old version of Bootstrap for many years. The hope is that this new approach will avoid similar problems with Joomla 4.

## Bootstrap 2 versus Bootstrap 5

In summary, Boostrap 2 versus Boostrap 5 means: [Float versus Flex for building layouts](https://www.joomlashack.com/blog/joomla-news/css-grid/). Let's compare the two Bootstrap versions before taking a closer look at CSS Grid.

- Bootstrap 2 is integrated in Joomla 3.
- Bootstrap 5 is integrated in Joomla 4.

The following code snippet shows a two-column grid layout in Bootstrap 2:

```
<div class="container">
    <div class="row">
        <div class="span6"></div>
        <div class="span6"></div>
    </div>
</div>
```

This code shows the following layout:

![columns in Bootstrap 2](/images/grid0.png)

The following is an similar code example using Bootstrap 5:

```
<div class="container">
    <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
    </div>
</div>
```

The main difference is that the column size prefixes have been changed from `span` to `col-md-`. We can replace `col-md-` with `col-sm-` to address small screens, or with `col-lg-` to address large screens, or with `col-xl-` for extra large screens.

It is possible to use more than one class to define a different column size depending on the screen width. This allows more control over the layout for different screen sizes!

```html
<div class="col-md-6 col-lg-12"></div>
```

The above example means that the column width would be 50% for medium screens (768 pixels or more) and 100% for a minimum screen width of 992 pixels. The medium width uses 6 columns and the minimum width uses 12 of the columns.

|                       | xs<576px    | sm≥576px   | md≥768px   | lg≥992px   | xl≥1200px  | xxl≥1400px  |
| --------------------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----------- |
| Container `max-width` | None (auto) | 540px      | 720px      | 960px      | 1140px     | 1320px      |
| Class prefix          | `.col-`     | `.col-sm-` | `.col-md-` | `.col-lg-` | `.col-xl-` | `.col-xxl-` |

[Grid Optiones via getbootstrap.com](https://getbootstrap.com/docs/5.0/layout/grid/#grid-options)

## CSS Grid Layout

CSS Grid Layout is a grid layout system supported by [all major browsers](https://caniuse.com/#feat=css-grid). CSS Grid is not a framework.

Bootstrap creates a grid - columns and rows - using CSS classes. CSS Grid works in the opposite way. We get a clearer HTML markup and use CSS to define which elements are rows and which are columns - and the sizes. There are no float or flex CSS properties.

The two-column layout from our previous Bootstrap examples here in Grid CSS layout:

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

The above example uses less text in the HTML markup. There are no more CSS column and row classes. We define the rules for this in the parent element:

- `grid-template-columns`: the number of columns and the width of each column. Two columns, 50% width for both.
- `grid-template-rows`: the height for each row. In this case 100 pixels.

The property `display` with `grid` as value defines the child `divs` for `.container` as elements for the layout.

Of course, this short example is very simple and does not go into more complex functions.

## CSS Grid layouts in Joomla 4

CSS Grid has two major advantages over Bootstrap in my eyes:

- Simpler HTML: we need less HTML to achieve the same result as with Bootstrap 5.
- More control over the design through CSS: Even if we know that CSS is responsible for the design, with frameworks we also have to rely on the HTML markup. With CSS Grid, we have more control over the design and are far less dependent on the CSS classes and how they are inserted into the HTML markup.

However, there are a number of limitations. As soon as we try to implement [CSS Grid in a Joomla project with dynamic content](https://www.joomla51.com/blog/item/joomla-css-grid-and-dynamic-content), these become obvious.

### CSS Grid and the Cassiopeia template

CSS Grid works like this: We first define a grid for a parent container. Then we position each subordinate element of this container within this grid. In this way, we get a basic CSS framework with which we can easily create a sophisticated layout with simple, easy-to-read markup.

#### The Problem with Dynamic Content and CSS Grid

Joomla is incredibly flexible. Any given Joomla page can have multiple layouts depending on the modules that are enabled in a given menu item. The same applies to components, which display different component elements depending on the settings. This flexibility of Joomla presents a challenge when using CSS Grid. How the positioning of an element is defined within a grid must change depending on the elements present. That sounds complicated? An example says more than words: Suppose a component area is surrounded by module positions.

![Example layout 1](/images/grid1a.png)

Using CSS Grid, the above can be achieved with the following CSS. It creates a simple 3-column grid and explicitly positions each child element within that grid.

> The 3-column grid can be seen by `1fr 1fr 1fr` in `grid-template-columns: 1fr 1fr 1fr;`.

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

So far, this is uncomplicated. The problems start when individual elements of this layout are no longer published. Assuming that no module is published on the website within the sidebar module position: without redefining the positioning of the surrounding elements within the grid, the absence of the sidebar module will cause an empty area in the layout.

![Example layout 2](/images/grid2.png)

Those familiar with Flexbox know that growing into it is possible. Unlike [Flexbox](https://developer.mozilla.org/de/docs/Web/CSS/CSS_Flexible_Box_Layout/Grundlegende_Konzepte_der_Flexbox), CSS Grid does not allow us to define how elements grow into an empty space. In the case of Flexbox, growing in is easy because the elements are defined either in a row or a column. This is not the case in CSS Grid. In Flexbox, the 'flex-grow' property is used to define how an element expands within one dimension. It is this dynamic of Flexbox that makes it incredibly useful within Joomla for partial areas. For the main structure, Cassiopeia uses CSS Grid and CSS Grid is two-dimensional. That's why it's more complicated. Especially because an undefined number of elements can occur within the grid in the area that' s available.

![Example layout 3](/images/grid6.png)

But there are the many examples of CSS grid where content flows easily? Yes. The special feature of this type of layout is that the elements have no defined positioning. Therefore, an algorithm kicks in that automatically places each element within the grid. This fits for many different types of content. For example, it is ideal for an image gallery. It is not suitable if an element needs a fixed position: For example, a sidebar. The latter often occurs in a Joomla template.

#### A solution

One solution is to define more precisely how elements are positioned within the grid. We can do this by creating `has-*` classes for the elements that are available within a page. We then pass these classes to an partent container. The code example below shows the implementation in Joomla 4.1.

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

So now we have `has-sidebar` classes that are added to the `<body>` tag if a module is published in the respective sidebar module position. Using the previous layout example, we can now use these classes to define the layout in our template CSS in more detail. Assuming we want the component area to fill the space of the sidebar module, we use the following CSS definitions:

```css
body:not(.has-sidebar-left) .site-grid .container-component {
  grid-column-start: main-start;
}
body:not(.has-sidebar-right) .site-grid .container-component {
  grid-column-end: main-end;
}
```

This CSS translates to _if there is no `has-sidebar` class, expand the component area to the full width of the main grid_. This leads to the following layout:

![Example layout 3](/images/grid3.png)

> Interesting pull requests in this context are the following: The programme code was introduced in [Pull Request 23661](https://github.com/joomla/joomla-cms/pull/23661). Later, the CSS grid was moved from the `body` element via [Pull Request 35012](https://github.com/joomla/joomla-cms/pull/35012/).

In this example, a position is first defined (1) and assigned (2) for each element. Then the position is redefined (3) if an element does not exist.

> I have taken the following code from the file `/media/templates/site/cassiopeia/css/template.css` of Cassiopeia in Joomla 4.1 in a simplified way. Of course, the whole thing is more complicated because there are more elements in the grid. In addition, different screen widths have to be taken into account in responsive web design.

```css
/* (1) */
body.wrapper-fluid .site-grid {
  grid-template-columns: [full-start] minmax(0, 1fr) [main-start] repeat(
      4,
      minmax(0, 25%)
    ) [main-end] minmax(0, 1fr) [full-end];
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

> Depending on the scenario, the opposite approach may make more sense. So instead of redefining the position when an element is not present, we instead define the position only when the element is present.

Da es sich hierbei um ein CSS-Grid handelt, sind wir nicht darauf beschränkt, wie wir das Layout der Seite in Abhängigkeit von den vorhandenen Elementen verändern. Mit der gleichen Klasse können wir nun komplett neu definieren, wie jedes Element innerhalb des Grids angezeigt wird.

```css
body .has-sidebar-left .site-grid .container-component {
  grid-column-start: main-start;
}
body .has-sidebar-right .site-grid .container-component {
  grid-column-end: main-end;
}
```

The code written above could result in the component area starting with an existing sidebar in the CSS grid column `main-start` and resulting in the layout below:

![Beispiel-Layout](/images/grid4.png)
<img src="https://vg04.met.vgwort.de/na/84da832e1e304a59829dc3aa631646c4" width="1" height="1" alt="">
