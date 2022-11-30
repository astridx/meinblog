---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-03-03
title: 'General information about Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/allgemeines-zu-cassiopeia-und-joomla4
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Joomla is an open source content management system, CMS for short, for creating websites. Joomla 4 refers to any version of the 4.x.x series.

A Joomla website requires a certain environment. A server must meet the [minimum requirements](https://downloads.joomla.org/technical-requirements)[^https://downloads.joomla.org/technical-requirements]<!-- \index{installation!minimum requirements} --> for a Joomla installation. In particular, look for supported MySQL or PostgreSQL database versions, PHP version and supported web servers. It is also important that your hosting account has access to the database, as well as access to the file system to upload and unpack the Joomla installation files.

Joomla can also be installed on a local computer <!-- \index{installation!local} --> as long as it has the necessary requirements. For beginners, I recommend an easy-to-install distribution that contains Apache, MariaDB and PHP. For this purpose, [WAMP](https://www.wampserver.com/en/)[^wampserver.com/en/], [LAMP](<https://en.wikipedia.org/wiki/LAMP_(software_bundle)>)[^en.wikipedia.org/wiki/lamp_(software_bundle)] or [XAMP](https://www.apachefriends.org/index.html)[^apachefriends.org/index.html] come into question. A local installation is often used to learn the Joomla system and to develop new sites before they go live on the web.

## Cassiopeia

Joomla 4 comes with a frontend template and an administrator template. The frontend template defines what the visitor sees. The administrator template works in the backend, the place where administrators create content, change settings, manage users, upload extensions for additional functions.

Cassiopeia is the front-end template. The Cassiopeia folder and the associated files are located in the Joomla 4 template directory. The Cassiopeia files contain the necessary programme code and styles for a _mostly_ accessible and responsive website.

> Why is the word _mostly_ in the previous sentence? In my opinion, the statement _This is not responsive_ cannot be said without further explanation. You have to define at the same time what is not responsive. In other words, that which is not user-friendly on small and/or large displays. Besides, sensitivity is subjective. Some are of the opinion that a slider in the header has no place on small displays. Others feel it is a mistake if it is not there. _This is accessible_ is also an absolute sentence that is faced with a lot of barriers: As different as people are, so are the barriers. On the internet, this is not limited to people. For machines, barriers also matter. Besides, it is not uncommon for a barrier that has been removed to create a new one. In my opinion, the state of absolute accessibility cannot be achieved.

In the following I describe my experiences with the Cassiopeia template. I show how I made changes to customize Cassiopeia to my own needs.

## What is a Content Management System?<!-- \index{CMS!What is it} -->

A CMS is a user interface for creating websites. A CMS compiles the website from content contained in a database or other files.

The CMS simplifies access to the database. As a rule, it offers a user-friendly interface. Here, content can be created and the appearance of the website can be manipulated. No PHP or SQL knowledge is required. If you want to change the appearance of the website in the frontend, you should know how to use HTML and CSS. The deeper the knowledge in these areas, the easier it is to customise the layout, colours and fonts. It is also very practical to be familiar with diagnostic tools such as the [developer tools](https://en.wikipedia.org/wiki/Web_development_tools)[en.wikipedia.org/wiki/Web_development_tools] of a browser.

> With a content management system, it is possible to easily change all the information on a website via a web browser. It is not necessary to create static web pages and then copy them to the web server. This great advantage has a disadvantage. Content management systems create the website dynamically with the help of scripts. Some of these scripts are old and contain code that would no longer be written in this way nowadays. That's why you always find more or less large security gaps. It is mandatory that a CMS is kept up to date and updates are installed promptly!

Joomla 4 is a CMS that uses PHP and a database to create websites.

## What is a Joomla template?<!-- \index{Template!What is it} -->

A template manages the appearance of the website. This includes the fonts, colours, layout and special effects of the website. In the case of Joomla, the template combines styling and content from the database. The template uses HTML, CSS, JavaScript and PHP to compile the content and determine its appearance.

> The front-end template is the framework that composes and displays the written content, images, navigation and other modules. It is located in the subdirectory 'templates'. The administration template composes the user interface for the website administrators and you can find it in the subdirectory `administrator\templates`.

A Joomla template contains the file `index.php` where everything comes together. Each page is created using this one main file. This file itself uses many other files in the Joomla installation for formatting. There are PHP files that manage the display of specific content. The 'index.php' file of the template contains the HTML skeleton for the layout of the web pages and works hand in hand with the other files.

The styling of the template is done with the help of CSS style sheets. Depending on the template, there are one or more stylesheets that are linked to the template. The stylesheet determines the colours, fonts and layout of the website. In the case of Cassiopeia, it is generated via [Sass](https://sass-lang.com/)[^sass-lang.com/]. If you want to customise Cassiopeia, it is enough if you know CSS. Sass knowledge is not mandatory, it only makes the work easier.

A Joomla installation comes with the frontend template _Cassiopeia_ as well as the backend template _Atum_.

There are many other 3rd party templates available for Joomla. Some 3rd party templates are free, others are chargeable. Using a 3rd party template can save many hours of styling and file manipulation to get the look and layout you want for your site. On the downside, it makes it dependent on the template provider if we need support or to update the site. Cassiopeia is kept up-to-date with Joomla!

## Worth mentioning Cassiopeia?

Cassiopeia is the default template that we see immediately after the initial installation of Joomla. Cassiopeia is developed by the Joomla community.

Cassiopeia is a simple template, with a minimum of styling, that serves as the basis for an individual website. Some adjustments to the layout are straightforward, while other changes require a good knowledge of HTML and CSS.

Third-party Joomla templates are offered in [various places](https://forum.joomla.de/thread/69-template-gesucht-joe-s-liste/)[^forum.joomla.de/thread/69-template-searched-joe-s-list/] on the Internet. There are free ones and ones that are distributed commercially. If you don't have a specific idea of what you want your site to look like, I recommend looking at third-party templates. Many offer an interface that is ready to go with relatively little styling or changes. Some have additional features that are controllable through the template manager interface.

In my opinion, anyone who wants to independently implement their own design with their Joomla website should ideally build on Cassiopeia. Knowledge of HTML and CSS is helpful for modifying the template. An understanding of PHP and JavaScript is also an advantage.

The Cassiopeia template comes with settings and options<!-- \index{options!Cassiopeia} --><!-- \index{Cassiopeia!options} --> that we can access via the Template Manager in Joomla's Template Manager. These settings allow us to change

- logo
- Title
- Tagline / Keyword
- Fonts Scheme
- Colour Theme / Template Colour
- layout
- Sticky Header
- Back-to-top link / "Back to top" link

![The view of the menu item Templates | Edit Style in the Joomla backend](/images/c4.png)

Apart from these settings, all changes require editing the files.

Cassiopeia uses Bootstrap 5 as the framework of the site. This determines the width of the columns and allows for a responsive website.

Cassiopeia collects all styles in a CSS stylesheet file called `template.min.css`. This is the [minified version](https://wiki.selfhtml.org/index.php?title=Minify&oldid=73854) of the file `template.css`.

> Minifying CSS and JavaScript files is one of many ways to optimise the loading speed of your website.

All styles that are used by default are contained in this file, including the `@media` queries for different screen sizes. To change these default styles, it is necessary to create your own CSS stylesheet. This custom style file overrides the Cassiopiea definitions as we wish for our website. Cassiopeia is written to recognise a stylesheet called 'user.css', which is located in the CSS subdirectory of the Cassiopeia files. Using a separate stylesheet makes it possible to access the new styles easily and quickly. Moreover, you do not run the risk of overwriting your own changes when you update your Joomla installation.

> You want to do more than just change CSS? Perhaps you are wondering how to create a child template for Cassiopeia. Many know this from the CMS Wordpress. In Joomla, this worked differently until version 4.1. To protect yourself from overwriting your own new code during a Joomla update, you had to copy the corresponding template and make the changes in the copy. The advantage of working on a copy was that you did not lose the changes you made when updating. The disadvantage was that you had to integrate updates to Cassiopeia into your copy yourself if you wanted these new functions. Since Joomla 4.1, this drawback has been [fixed](https://github.com/joomla/joomla-cms/pull/35874)[^github.com/joomla/joomla-cms/pull/35874]. With the introduction of child templates in Joomla 4.1, it is possible to create a template where you only change the things you want to customise. Everything else is used by a parent template. To be able to offer this function, it is necessary to change the locations of the media files in the Cassiopeia template. The path to the _template media folders_ was `templates/cassiopeia/` before Joomla 4.1. Template media folders are `css`, `images`, `fonts`, `js` and `scss`. As of Joomla 4.1, the files are located in the directory `media/templates/site/cassiopeia/`. Do I have to pay attention to anything when updating from Joomla 4.0 to Joomla 4.1? Short answer: No, Joomla takes care of everything. For example, if you have created a `templates/cassiopeia/css/user.css`, this file will automatically be moved to `media/templates/site/cassiopeia/css/user.css` after the update from 4.0 to 4.1.

## What is SCSS or Sass?<!-- \index{SCSS!What is it?} --><!-- \index{Sass!What is it?} -->

[What is SCSS or Sass](https://de.wikipedia.org/wiki/Sass_(stylesheet language))[^en.wikipedia.org/wiki/sass_(stylesheet-language)]? Sass (stands for "Syntactically awesome style sheets") is an extension to CSS that allows you to use variables, nested rules, inline imports and more. As a CSS pre-processor, it helps organise code, allowing stylesheets to be created more quickly and clearly. Sass is compatible with all versions of CSS. SCSS is a special notation or syntax.

## What is Bootstrap?<!-- \index{Bootstrap!What is it?} -->

Bootstrap 5 is a front-end web development tool that consists of CSS mixed with some JavaScript. It helps website developers build websites more responsive to different screen sizes. It also uses `@media` queries and utility classes.It was developed by web developers at Twitter to make designing for different screen sizes easier by using pre-built solutions and requiring less custom code.

Bootstrap 5 uses a [12-way grid system](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/] that can be _static_ or _fluid_. This means that the page either locks in at certain site widths or scales down with a fluid motion where all areas take up a percentage of the total width and scale down accordingly.

Cassiopeia is designed for Bootstrap 5. If you don't know Bootstrap, it takes some time to get familiar with the framework.When Bootstrap is used correctly, it facilitates technically good design. Some people think that websites created with Bootstrap all look the same. I think it's like everywhere else in life. Everything offers advantages and disadvantages and the middle is often the best.Those who are knowledgeable can take advantage of Bootstrap and still build a custom website. With less knowledge, Bootstrap helps to implement a website for all devices in a technically good and accessible way.

## How does Cassiopeia use Bootstrap 5?

Cassiopeia uses the Bootstrap 5 grid system and allows you to choose a static or fluid layout. Both versions are responsive, meaning they change the size and position of the grid system depending on the screen size of the displaying device.

### Responsive: Static layout<!-- \index{static!layout} --><!-- \index{layout!static} -->

The static layout uses 12 columns and designs the website to have a _maximum_ width. If we reduce the size of the screen, the width adjusts. If the width of the display is smaller than the _maximum_ width, the website does not continue to use the _maximum_ width but adapts to the new width. Individual side-by-side areas are displayed above and below each other from certain breakpoints onwards. A horizontal menu is also displayed vertically.

### Responsive: Fluid Layout<!-- \index{fluid!Layout} --><!-- \index{layout!fluid} -->

The fluid system uses percentages instead of pixels for column widths. Elements of the class `.container-fluid` narrow proportionally as the width of the display device decreases. The inner divisions within the website also decrease in width. For narrow devices, the subdivisions stack on top of each other. This all happens fluidly and changes constantly. This is optimal for many website. Graphic designers who are used to working with fixed paper sizes find this strange because positioning of images and hyphenation work differently.

### CSS Grid<!-- \index{CSS Grid!What is it?} -->

[CSS Grid](https://developer.mozilla.org/en/docs/Web/CSS/CSS_Grid_Layout)(^developer.mozilla.org/en/docs/Web/CSS/CSS_Grid_Layout) is a two-dimensional grid system used for the layout of elements on a web page. The grid consists of horizontal and vertical lines that form rows and columns, similar to a table.

Bootstrap also offers a grid layout system and you may now be wondering why Joomla 4 additionally uses CSS Grid? CSS Grid is a simple and flexible grid layout system that offers advantages in the area of user experience. Therefore, using CSS Grid over Bootstrap makes sense when implementing simple layouts. Bootstrap is more of a frontend toolkit suite that creates complex responsive designs with its predefined classes.

## Worth noting

Bootstrap 5's default media queries detect the responsiveness of a Bootstrap site by reducing the width of the browser window and on tablets and phones. This is because the media queries use `min-width` and `max-width` instead of `min-device-width` and `max-device-width`. `device-width` refers to the resolution of the display. For example, the width is 1024 for a display size of 1024x768. `width` refers to the width of the browser itself, which is different from the display size when the browser is not maximised.

Bootstrap styling aims to minimise the CSS code required for a properly responsive website. I had already written it: All styling for Cassiopeia is contained in a file called `template.css`. All styles can be overwritten by us. When overwriting, make sure that you look at the responsive layout as a whole.

## Override management in Joomla 4

New in Joomla 4 is the difference display<!-- \index{Override!Difference display} -->, which draws attention to changes in the overwritten code during a Joomla update. This is particularly useful if you have adopted the main part of the Joomla! standard view in your own override and the update has fixed a security problem in exactly this view. Besides, it makes creating an override child's play. The new tool can be accessed via the Tempalte manager and is supported by a difference display.

## Frequently asked questions

### How can I tell if Cassiopeia renders the start page of a Joomla website or a subpage?

You want to create a Cassiopeia child template or an override that behaves differently or looks different on the start page than on all other pages. The following steps will show you how to find out whether your template is rendering the start page of your Joomla website or a subpage.

For multilingual websites, the start page depends on the currently selected language. To find out which language version is currently active, you need functions from the namespace `Joomla\CMS\Language\Multilanguage`. Import this namespace if you want to be prepared for multilingual websites.

```php
use Joomla\CMS\Language\Multilanguage;
```

The following code can be found in the file `templates/cassiopeia/index.php`, i.e. Cassiopeia. If you have copied this file for your child template or your template copy, it is not necessary to create it again. Make sure that the lines

```php
$app = Factory::getApplication();
...
...
...
$menu = $app->getMenu()->getActive();

```

are present in the file you are editing. The same will be true if you implement an override.

With the call `$home = $app->getMenu()->getDefault();` you assign the variable `$home` with `true` on a non-multilingual website. On multilingual websites, a parameter is required. Use `$home = $app->getMenu()->getDefault($lang->getTag());`.

```php
<?php
// Look for the home menu
if (Multilanguage::isEnabled())
{
$home = $app->getMenu()->getDefault($lang->getTag());
}
else
{
$home = $app->getMenu()->getDefault();
}
?>
```

From now on, you can insert between the lines

``php

<?php if ($menu === $home) : ?>

<?php endif; ?>

```

everything that should be used on the start page.

Use

``php
<?php if ($menu !== $home) : ?>

<?php endif; ?>
```

for the code used on all other websites.
<img src="https://vg04.met.vgwort.de/na/268c8301735945699b410dfde6414624" width="1" height="1" alt="">
