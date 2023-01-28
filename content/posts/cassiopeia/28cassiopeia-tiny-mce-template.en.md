---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2023-01-29
title: 'Joomla 4 Cassiopeia - TinyMCE Template'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-tiny-mce-template
langKey: en
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Text modules are familiar from word processing programmes. Text passages that are often repeated can be added with a click. You can proceed in a similar way with formats in TinyMCE. I am interested in the general principle. That is why the example here is again kept simple. A text is simply given a red background. 

> Cassiopeia offers Bootstrap 5. Get inspired for your own use cases in the [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)[getbootstrap.com/docs/5.0], if you don't already have a lot of ideas yourself. An often used use case is a table that is created for design purposes only. In HTML, it is a bad idea to use a table for presentation purposes only, because it does not reflect the semantics. Other elements make more semantic sense and look just like a table. In the simplest case, the [Grid](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/]<!-- \index{Tiny!Tempalte erstellen} --><!-- \index{Editor Tiny MCE!Tempalte erstellen} -->

## Create a template for use in TinyMCE in Joomla 4.

First we create the file `redBackground.html` in the directory `/templates/cassiopeia/html/tinymce/`.

```html
<!-- /templates/cassiopeia/html/tinymce/redBackground.html -->
<div class="redbackground"><p>Text</p></div> 

```

You must adapt the paths shown in the following image to your individual environment if you are not using Cassiopeia as the standard template - or a child template.  

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny1.png)

Now create an article and select the menu item for inserting a template in the TinyMCE menu.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny2.png)

If there are several templates in your installation, you can choose.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny3.png)

Depending on which HTML markup your template contains, it is now inserted. If you have used my simple example, the code `<div class="redbackground"><p>Text</p></div>` will be inserted.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny4.png)
