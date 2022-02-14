---
description: 'desc'
shortTitle: 'short'
date: 2021-03-04
title: 'Why Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/warum-cassiopeia
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

## Should I use Cassiopeia or a 3rd party Joomla template?

Cassiopeia template is the frontend template that is included by default in a Joomla 4 installation. Cassiopeia is a straightforward template. It is responsive. This means it displays content correctly on different devices. It is also accessible.

Anyone installing Joomla 4 is faced with the choice of either using this included template for the front end or installing a third party template. This is a decision that should be made during the development of a website. Although the design and the content are separated in Joomla and the change of the template is possible at any time. But: different Joomla templates present content in very different ways. This has an impact on the content. For example, if your template puts images in the foreground, you will certainly keep the text shorter and more precise, and put more value on the selection of images. This is often the case with templates for photographers or for presentations. If you have a template where the texts are the main part, then you go the other way around when adding the content.

Cassiopeia is a good starting point if you like the Joomla 4 standard view and you only want to make a few changes to the look and functionality. Besides, you will find the most support in the Joomla forums for this template.

### Cassiopeia as a basis for your own Joomla template.

The Cassiopeia template can be customized to look exactly the way we want it to. It contains the basic components of Joomla. Changes can be made to the files within Cassiopeia to create a website that meets specific requirements.

#### Appearance

We can change the basic appearance of Cassiopeia relatively easily if we understand the CSS style sheets. We can change colors, fonts, backgrounds, and column widths simply by adding or editing lines in a stylesheet called `user.css`. Do not change the `template.css` file that comes with Cassiopeia, as your changes will be overwritten when you upgrade Joomla.

#### Layout

It is possible to make major changes to the layout or add module positions. To do this, edit the files 'index.php' and possibly the 'templateDetails.xml'. To make changes on this level we should have a good understanding of HTML markup. The `index.php` file is a PHP script that is essential for the proper loading of the website. We should at least know enough to understand basic concepts of PHP.

#### Functionality

If we have an understanding of the Joomla API, we can modify Cassiopeia. We can make changes to `index.php` and add template overrides. The Joomla API is the interface that provides information from the core files to build the website.

#### What's important: Joomla updates

If we make changes to the Cassiopeia template directly, we run the risk of losing those changes. When updating Joomla, files may be overwritten. Only in the case of `user.css` can we be sure that it will remain. Therefore, we ideally take precautions. Depending on the change, it is recommended to protocol it. The best way is to copy Cassiopeia, rename the copy of the template and use it as template. The disadvantage in this case is that updates to Cassiopeia itself are not automatically reflected in our copy.

> Maybe in the future it will be possible to use [Child Templates](https://github.com/joomla/joomla-cms/pull/32896)[^https://github.com/joomla/joomla-cms/pull/32896] in Joomla. When using this feature, updates in the main template will be automatically adopted in copies. The child inherits from the parent.

### Using 3rd party templates for your Joomla site

Third party templates are templates that are ready to use out of the box.We don't have to do any styling because we choose a template that suits our needs. We can just start adding our own content. There are free templates and those that are paid.

Third party templates can be simple or quite complicated. They can have many settings to make the page look more unique. These settings include the choice of fonts, colors, layout and backgrounds. These templates sometimes offer a wide range of positions for modules or other special ways to display the content.

> In the german speaking forum links to template providers are collected in [Joes Liste](https://forum.joomla.de/thread/69-template-gesucht-joe-s-liste/)[^forum.joomla.de/thread/69-template-searched-joe-s-liste/].

#### There are pros and cons to using third-party templates

##### Pros

- the template is ready to use out of the box, we don't spend time styling it
- third-party templates can have very nice features or options that increase the attractiveness of the website
- third-party templates can be specially designed to work with other extensions, such as shops, social, forums, etc.

##### Cons

- the template may be paid, or we may need to add other paid extensions to get the desired functionality.
- the template may not be available for the next major upgrade for Joomla
- third-party templates can be quite complicated to customize
- the core files may have extensive overwrites that cause problems with some Joomla features later on
- we rely on the expertise and skills of other developers
- third-party templates can add security risks or other vulnerabilities

### Things to watch out for when using 3rd party templates

Inform yourself before installing 3rd party templates.

- Choose templates from reliable sources only.
- Make sure that the template works with the latest version of Joomla.
- Look at the reviews for the template.
- Do a search in the [Joomla forum](https://forum.joomla.org/)[^forum.joomla.org/] to see if there are many posts with problems related to the template.
- Is there support for the template?
- Is there a forum to resolve any issues?
- Will the template provider keep up with new versions of Joomla?

<img src="https://vg04.met.vgwort.de/na/ce472b7ad61e43d783051d994e6a865e" width="1" height="1" alt="">
