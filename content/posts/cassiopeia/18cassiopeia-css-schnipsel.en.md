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

Add the following code to the `user.css` file if your goal is to configure the `up-link` in Cassiopeia so that it is always visible and not only at the end of the page.<!-- \index{CSS!back to top} --><!-- \index{back to top} -->

```
#back-top { position: fixed; }
```

### Hyphenation

#### Normal hyphenation

Hyphenation is activated by CSS with the `hyphens` property. Hyphenation uses the rules of the language specified in [HTML-Language Code](http://www.w3schools.com/tags/ref_language_codes.asp)[^w3schools.com/tags/ref_language_codes.asp].

```css
body {
  hyphens: auto;
}
```

More information: [hyphens](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens)[developer.mozilla.org/en-US/docs/Web/CSS/hyphens] and [word-break](https://developer.mozilla.org/en-US/docs/Web/CSS/word-break)[^developer.mozilla.org/en-US/docs/Web/CSS/word-break]

> Maybe helpful: `<wbr>` Word Break: the word is wrapped without hyphen if there is not enough space. Example: `dogs<wbr>leash`. `&shy;` Soft Hyphen: The word is hyphenated if there is not enough space. Example: `dogs&shy;leash`. `&nbsp;` Non Breaking Space: If the line break between two words should be prevented, a protected space must be inserted. Example: `3&nbsp;cm`.

#### Force hyphenation

The `overflow-wrap` property specifies whether the browser can wrap lines with long words if they run beyond the container. Especially in mobile view, such overhanging is not user-friendly. When swiping, the whole view shifts. With the value `anywhere` a wrap is forced. More information at [selfhtml.org](https://wiki.selfhtml.org/wiki/CSS/Eigenschaften/overflow-wrap)[^wiki.selfhtml.org/wiki/CSS/properties/overflow-wrap]

```css
body {
  overflow-wrap: anywhere;
}
```
