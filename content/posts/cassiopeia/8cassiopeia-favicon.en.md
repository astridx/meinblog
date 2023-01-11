---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2021-03-10
title: 'Favicon'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-favicon
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---










_Favicons_ are the small icons we see in browser tabs. They help to recognise a page when we browse the bookmarks and open tabs in the browser. The integration of favicons changed over time. Some say it has grown historically. Today, favicons offer various additional functions and new ones are added from time to time.<!-- \index{favicon} -->

It is possible to use the file type SVG as a favicon. This is supported by [most modern browsers](https://caniuse.com/#feat=link-icon-svg). To use this new function, you need an SVG file. To ensure that older browsers also display the graphic, an ICO file is also required.

> You are not familiar with SVG and ICO and would rather use the PNG format? Then you will find a solution that suits you better under [Favicon in Joomla template](https://blog.astrid-guenther.de/en/joomla-template-favicon).

> Delete the browser cache if changes to the favicon do not seem to work during development.

## Favicon in Cassiopeia

### Implementierung

Here is the code Cassiopeia uses to add favicons:

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

As a result, the following entries appear in the HTML source code. The HTML source code is the document that is passed to the browser.

> In all common browsers you can display the HTML source code with the key combination [Ctrl - U].

```HTML
...
<link href="/j4dev/media/system/images/joomla-favicon.svg" rel="icon" type="image/svg+xml">
<link href="/j4dev/media/system/images/favicon.ico" rel="alternate icon" type="image/vnd.microsoft.icon">
<link href="/j4dev/media/system/images/joomla-favicon-pinned.svg" rel="mask-icon" color="#000">
...
```

> The [Pull Request](https://github.com/joomla/joomla-cms/pull/31436)[^github.com/joomla/joomla-cms/pull/31436] with which this function was integrated is based on a [CSS-Tricks](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) tutorial.

### Implementation explanation

If a browser does not support an SVG favicon, it ignores the first line `<link href="/j4dev/media/system/images/joomla-favicon.svg" rel="icon" type="image/svg+xml">` and continues with the second. This ensures that all browsers that support favicons can display an image.

Note the alternate attribute value for our `rel` declaration `rel="alternate icon"`. This tells the browser to use the favicon with the file format `.ico` as an alternative display only.

After the favicons follows the code line `<link href="/j4dev/media/system/images/joomla-favicon-pinned.svg" rel="mask-icon" colour="#000">`, which loads another SVG image. This is called `joomla-favicon-pinned.svg`. This supports Safari's `pinned tab` functionality, which existed before other browsers supported SVG favicons.

## A modern favicon with SVG and ICO as fallback

### Why an SVG Favicon?

Wondering what reason there is to switch to SVG? The `.ico` file format has been around forever and can support images up to 256×256 pixels. Here are three reasons.

- The `.ico` file format is a proprietary format used by Microsoft. SVG is an open standard. You can use SVG files without any dependency.

- If we use a resolution-independent SVG file for a favicon, the favicon will look sharp at any display size.

- SVGs are usually very small files, especially compared to their raster image counterparts. By using only a 16×16 pixel favicon as a fallback position for browsers, we provide a high level of support with little data volume.

### Create your favicon with Ubuntu 20.04

First, let's look at how to create a favicon on Ubuntu. I illustrate it using the [Inkscape](https://inkscape.org/de/) and [Imagemagick](https://imagemagick.org/index.php) packages. First, let's discuss the installation process for both packages. To proceed with the installation process, you should have access to superuser privileges.

#### Install Inkscape and Imagemagick on Ubuntu

Execute the following command in the terminal.

```
sudo apt install inkscape imagemagick
```

The above command installs the packages -- Inkscape and Imagemagick. We use the Inkscape package to create a scalable vector graphic and then convert the file with the .svg extension to .ico using Imagemagick's `convert` command.

#### Creating a scalable vector graphic with Inkscape

With Inkscape we can design practically anything. We will create a text favicon. Open Inkscape and you will first see a blank page surrounded by toolbars. Click on the symbol with the 'A' on the left side.

! [Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape1.png)

The function behind the `A` is used to create and edit text objects in Inkscape. Then we create a rectangular frame in the standard empty line.

![Create Cassiopeia Favicon - adjust font in Inkscape](/images/cassiopeiainkscape2.png)

Write anything and highlight the text. Directly under the menu bar you can change the font and the size of the text. Choose a font according to your taste.

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape3.png)

Then press F1 to select and transform the text object.

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape3a.png)

Furthermore we will colour the text object. This can be done using the quiet in the lower area.

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape4.png)

The text object should be converted to a path, this could be done using the keyboard shortcut Convert Object to Path Ctrl+Shft+C and Page Size to Selection Size Ctrl+Shft+R to shrink the page to fit the selection.

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape5.png)

Save the SVG file via the menu or the key combination Ctrl+Shft+S. Choose a normal SVG as format. As storage location choose

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape6.png)

In the browser you will now see the favicon in the tabulator.

![Create Cassiopeia Favicon - Creating Text Objects in Inkscape](/images/cassiopeiainkscape7.png)

For the sake of completeness, I include the source code of the SVG file below.

```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 30.691282 18.930109"
   height="18.930109mm"
   width="30.691282mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-53.841845,-125.31983)"
     id="layer1">
    <g
       id="flowRoot3713"
       style="font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:#ff0000"
       transform="scale(0.26458333)"
       aria-label="My">
      <path
         id="path4803"
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000"
         d="m 203.99674,474.14974 h 17.86459 l 12.39583,29.13021 12.46875,-29.13021 h 17.82812 v 54.43229 H 251.2832 v -39.8125 l -12.54166,29.34896 h -8.89584 l -12.54166,-29.34896 v 39.8125 h -13.3073 z" />
      <path
         id="path4805"
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000"
         d="m 272.35611,487.7487 h 13.05209 l 10.97396,27.70833 9.33333,-27.70833 h 13.05208 l -17.17187,44.69791 q -2.58854,6.81771 -6.05209,9.51563 -3.42708,2.73437 -9.07812,2.73437 h -7.54688 v -8.56771 h 4.08334 q 3.31771,0 4.8125,-1.05729 1.53125,-1.05729 2.36979,-3.79166 l 0.36458,-1.13021 z" />
    </g>
  </g>
</svg>
```

##### CSS in the SVG files

Note that we have embedded CSS in the SVG file. This is not only possible via `style="..."`, but also via the tag `<style>`.

```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 30.691282 18.930109"
   height="18.930109mm"
   width="30.691282mm">
  <style>
    #flowRoot3713 {
       font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:#ff0000;
    }
    #path4803, #path4805{
       font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000;
    }
  </style>
  <defs
     id="defs2" />
  <metadata
...
```

##### An emoji as a favicon<!-- \index{favicon!emoji} -->

[Emojis](https://de.wikipedia.org/w/index.php?title=Emoji&oldid=210760547) are small pictures. They are used to replace terms.

An [Emoji as Favicon](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/#emoji)
is an easy way to create a favicon with a transparent background that also works for small sizes.

If you want to display an emoji in HTML, you can use the decimal or hexadecimal reference code. Or you can copy the image if you see it on another website.

Below you can see an example code and the result in the browser.

You can use a palm tree as an emoji favicon in three ways:

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">🌴</text>
</svg>
```

oder

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">&#127796;</text>
</svg>
```

oder

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">&#x1F334;</text>
</svg>
```

![Cassiopeia Favicon erstellen - Emoji als Favicon](/images/cassiopeiainkscape8.png)

> Du möchtest gerne wissen, welche Emojis du verwenden kannst? Dann ist die [Emoji-Liste mit HTML-Codes](https://www.getemojis.net/html/#Emoji-Liste) eine mögliche Anlaufstelle.

##### Favicon and Dark Mode<!-- \index{favicon!dark mode} -->

With [Dark Mode](https://de.wikinew.wiki/wiki/Light-on-dark_color_scheme) we can adapt our display to a dark environment. Do you want a different favicon for your website to be displayed in [Dark Mode](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/#dark-mode-support)? In this case you can use the media query 'prefers-color-scheme'.

For browsers that support SVG files, the following code causes the sun to turn into a moon when dark mode is activated.

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
   <style>
    #sun {display:block} #moon {display:none}
    @media (prefers-color-scheme: dark) {
    #sun {display:none} #moon {display:block}
    }
   </style>
   <text id="sun" y=".9em" font-size="90">🌤</text>
   <text id="moon" y=".9em" font-size="90">🌜</text>
</svg>
```

#### Converting .svg to .ico

To convert the input.svg file to the favicon.ico file, we need to run the following in the terminal.

```
convert -background transparent -define icon:auto-resize=16 joomla-favicon.svg favicon.ico
```

We have chosen a transparent background and a symbol size of 16 pixels. The `ICO` file format supports images with a size of up to 256×256 pixels.

You now know how to create a scalable vector graphic (SVG) with Ubuntu using the packages Inkscape and Imagemagick and convert it to the `ICO` format as `favicon.ico`.

#### Integrating the favicon into the template

To use your self-created favicon instead of the Joomla logo in the template Cassiopeia, it is sufficient to use the files

- `joomla-favicon.svg`
- `favicon.ico`
- `joomla-favicon-pinned.svg`

in the directory 'JOOMLA/templates/cassiopeia/images'. If you have not already created them here, copy them into this directory.

> By the way: This way you can overwrite all files in the directory `media/system`.

Do you like to rename the filenames? You would like to use `favicon.svg` instead of `joomla-favicon.svg` and `favicon-pinned.svg` instead of `joomla-favicon-pinned.svg` as file names? Then you have to adjust the calls in the file `index.php` of the template. Adjust the filenames. Replace the following lines

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

with

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

Note: If you store the favicons in the directory `media/templates/site/cassiopeia/images`, they will not be overwritten during a Joomla update. Just like `user.css`, this is an easy way to make changes. When updating, the versions of the images in the directory `media/system` are updated, not those in the template directory. If you change the names of the image files and therefore edit the `index.php` of the template, you have to take care in case of an update of Joomla. The file `index.php` of the Cassiopeia template will be overwritten. Solution: For example, create a child template.

> Note: The path to the _template media folders_ was `templates/cassiopeia/` before Joomla 4.1. Template media folders are the folders `css`, `images`, `fonts`, `js` and `scss`. As of Joomla 4.1, the files are located in the `media/templates/site/cassiopeia/` directory.
> <img src="https://vg04.met.vgwort.de/na/f0a482cad79b4d04b1e9ccbb267449d0" width="1" height="1" alt="">
