---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2022-03-02
title: 'Joomla Standard Template Cassiopeia - CSS Snippets'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-css-schnipsel
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










You would like to slightly change the display of the Cassiopeia templates in Joomla? This can be achieved with the help of the file 'user.css'. In this article you will find code snippets for uncomplicated use cases. 

### Configure the up link in Cassiopeia so that it is always visible

Add the following code to the `user.css` file if your goal is to configure the `up-link` in Cassiopeia so that it is always visible and not only at the end of the page.<!-- \index{CSS!back to top} -->

```
#back-top { position: fixed; }
```

