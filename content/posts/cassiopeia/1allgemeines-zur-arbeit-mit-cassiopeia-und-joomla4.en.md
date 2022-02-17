---
description: 'desc'
shortTitle: 'short'
date: 2022-02-14
title: 'General notes on Cassiopeia and Joomla'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/allgemeines-zur-arbeit-mit-cassiopeia-und-joomla4
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Every person has his or her preferences. A content management system like Joomla, cannot fulfil every one of these preferences. Many functions are offered in a way that is good for most people. When working with Cassiopeia and Joomla, there are things that can be individually extended or customized for you.

## Practical tips

## Editor Switcher / Syntax Highlight<!-- \index{editor!switcher} --><!-- \index{editor!syntax highlight} -->

Joomal offers a number of different editors. Each editor offers advantages, but also has disadvantages. Under certain circumstances, you may not want to use an editor at all.

When I write article texts in the Joomla backend, I like to use the [TinyMCE](https://www.tiny.cloud/) because it provides a toolbar that helps me to do simple formatting. At the same time, I like to look at the HTML source code with syntax highlighting. This makes it much easier to read all HTML tags and CSS classes. Markup is clearly displayed. Syntax highlighting is implemented in [codemirror](https://codemirror.net/)[^https://codemirror.net/]. The TinyMCE does not offer this under Joomla in early 2022.

The editor can be set in the global configuration. Alternatively, you can set it individually for a user in the User Manager. While entering an article text, switching to the global configuration or the user manager is cumbersome. That's why I love the plugin [Editor Switcher by Bakual](https://github.com/Bakual/editors_switcher)[^https://github.com/bakual/editors_switcher].

After installing and activating it, I set the Switcher as the default editor for my user.

Editor Switcher | Edit Style in the Joomla administration area](/images/switcher_backend_user.png)

It is then possible to switch the editor while writing a text in the Article Manager. It is not necessary to switch to another configuration area. Only a buffering is necessary.

![Editor Switcher | Edit Style in the Joomla Administration Area](/images/switcher_backend_article.png)

### Since Joomla 4.1

Since February 2022, i.e. as of Joomla 4.1, code in the integrated TinyMCE editor is provided with syntax highlighting. In addition, it is via buttons on the bootom of the pop up possible to search and replace directly in the HTML code view.

Syntax-Highlighting in the integrated TinyMCE-Editor

![Editor Switcher | Syntax-Highlighting in the integrated TinyMCE-Editor](/images/switcher_backend_new1.png)

Editor button:

![Editor Switcher | Syntax-Highlighting in the integrated TinyMCE-Editor | Show editor button](/images/switcher_backend_new2.png)

Option to activate the editor button:

![Editor Switcher | Syntax highlighting in the integrated TinyMCE editor | Option to activate the editor button](/images/switcher_backend_new3.png)

## Joomla Accessibility <!-- \index{Accessibility} --><!-- \index{a11y} -->

You can clearly see it: Joomla 4 has been worked all around with Accessibility in mind. Both standard templates, frontend and backend, are accessible and comply with level AA of [WCAG 2.1](https://www.w3.org/TR/WCAG21/)[^w3.org/TR/WCAG21/]. WCAG 2.1 complements WCAG 2.0 and is the web standard for digital accessibility that is mandatory for public bodies in the European Union.

### Basics 

#### What is Accessibility?

The WCAG 2.0 guidelines are technical rules. A website is considered accessible if it complies with these rules.

As the owner of a website, it makes sense to decide in the planning phase where the website should be accessible. The system one chooses for the creation of the website application should be suitable. Joomla offers good conditions in this context.

#### Why is the accessibility of a website important?

Accessibility is important for many reasons. Public authorities around the world are pushing for online content to be accessible to all, and there are heavy fines for companies that don't comply with these laws.

But: Foremost accessibility is about values and treating all people equally. It's about people with disabilities not having to rely on others to do simple things like read a website.

In addition, an accessible website is also easier for machines to read. For example, a search engine can more easily read and correctly offert correct search results if the content is accessible. 

### How to Enable Accessibility Features in Joomla

There are the inbuilt accessibility plugins *Joomla Accessibility Checker* and *Additional Accessibility Features*, you can enable them in your plugin manager.

#### System Plugin - Joomla Accessibility Checker

The System Plugin *Joomla Accessibility Checker* visually highlights common accessibility and usability issues. Geared towards content authors, the plugin identifies errors or warnings and provides guidance on how to fix them. 

If you activate the first option, the accessiblity checker is loaded on all pages. This is useful when developing the website but should not be left on when the website is live. 

![System Plugin - Joomla Accessibility Checker | Plugin Settings](/images/c_a11y_1.png)

You can check the accessibility of your content via a button in the toolbar when creating a post.

![System Plugin - Joomla Accessibility Checker | Check the accessibility when creating a post](/images/c_a11y_1_1.png)

If you want to examine several articles one after the other, it is more convenient to work in the frontend. This is possible via a button in the lower right area.

![System Plugin - Joomla Accessibility Checker | Check the accessibility in frontend](/images/c_a11y_1_2.png)

> View project website and demo [joomla-projects.github.io/joomla-a11y-checker/](https://joomla-projects.github.io/joomla-a11y-checker/).

####  System Plugin - Additional Accessibility Features

This plugin adds an accessibility toolbar to your site with additional accessibility options. Once enabled the toolbar can be opened. You can choose whether you want to display the accessibility toolbar: It can be enabled on either Joomla backend, frontend, or both. 

![System Plugin - Additional Accessibility Features | Plugin Settings](/images/c_a11y_2.png)

This plugin adds an accessibility toolbar to your site with additional accessibility options. Once enabled shows it the Accessibility icon on the bottom left corner of every page of your website. Click on the icon for using the additional accessibility features.

![System Plugin - Additional Accessibility Features | Accessibility icon on the bottom left corner of every page](/images/c_a11y_2_1.png)

This plugin gives the user ability to a variety of things including
- Increase Text Size
- Decrease Text Size
- Increase Text Spacing
- Decrease Text Spacing
- Invert Colours
- Grey Hues
- Underline Links
- Big Cursor
- Reading Guide
- Text to Speech.

![System Plugin - Additional Accessibility Features | Toolbar opend](/images/c_a11y_2_2.png)



