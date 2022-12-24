---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2022-02-13
title: 'A multilingual website'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-mehrsprachig
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

This tutorial shows you how to set up a multilingual website in Joomla 4 with the default template Cassiopeia.

Joomla allows you to easily create a multilingual website without the need to install a third party extension.

A multilingual Joomla website starts with installing the languages, creating different content elements and ends with publishing the content. Here are detailed steps to create a multilingual website.

### Installing languages

There are two ways to install languages on a Joomla website. I usually choose to install via the live server.

#### Installing languages via Live Server

1. to do this, I log into the Joomla administration area and open the menu 'System > Install > Languages'.

![Joomla 4 | Multilingual Website Setup | Install Language via Live Server](/images/multiling2.png)

2. then I install the desired language by clicking on the button 'Install'.

![Joomla 4 | Multilingual Website Setup | Install Language](/images/multiling3.png)

There is no limit to this. It is possible to install all languages that are offered as Joomla language packages.

#### Install languages manually

In addition to the installation via the live server, a manual installation is also possible. To do this, open the website [Joomla Community Translation Packages](https://community.joomla.org/translations.html)[^community.joomla.org/translations.html]. Here you will find a zip-package for each language, which can be installed via 'System > Install > Extensions > Upload Installation Package'.

![Joomla 4 | Multilingual Website Setup | Install Language Manually](/images/multiling1.png)

### Activate content languages

At this point, I think it is important to know the difference between content language and system language. The system language, simply put, is the one that translates the menu items in the backend or descriptive texts in the frontend such as "Author" or "Created on:" . The text of an article, on the other hand, is the actual content. To ensure that the content of the website is assigned to the correct language and that machines also assign a text to the correct language, we configure the content languages.

1. configuring the content language is done in the menu 'System > Manage > Languages > Content languages'.

![Joomla 4 | Multilingual Website Setup | Select Content Language](/images/multiling4.png)

2. we select all languages in which we want to offer content or content languages. Usually the content languages match the languages installed for the system.

![Joomla 4 | Multilingual Website Setup | Install Content Language](/images/multiling5.png)

### Activating the language plug-ins

In the next step, we activate two plugins that are necessary for operating the multilingual website.

The _System Language Filter_ plugin helps you to display the content based on the language selection on the website. This plugin must be activated. The following points are crucial for language recognition for new website visitors:

1. the cookie from a previous visit.
2. the "language selection for new visitors" setting in this plugin. 3.
3. if applicable, the language set in the browser.

The _System Language Code_ plugin helps you to hide the language code in the HTML code of the website. It plays an important role in search engine optimisation.

Here are the steps to activate these 2 plugins:

1. go to [System > Manage > Plugins

![Joomla 4 | Multilingual Website Setup | Open Plugins](/images/multiling6.png)

2. use search terms in the search bar to find the plugins.

3. activate the two plugins: 'System - Language Filter' and 'System - Language Code'.

![Joomla 4 | Multilingual Website Setup | Activate Language Plugins](/images/multiling7.png)

### Multilingual content

Once the language plugins are enabled, we can start adding new content for each language. As an example, on the demo website in this tutorial, I have added German, Spanish and French to the already pre-installed English language. The most used content on a Joomla website are articles, categories and modules.

#### Add new categories

To better structure the content of the website I create a category for each content language. To create content in different languages, we need to add a new category for each language.

1. go to the menu 'Content > Categories' and create a new category. 2.
   In the right pane, select the language for the category from the Language drop-down box. 3.
   Save the category when you have added all the content. 4.
2. repeat this process for each content language.

![Joomla 4 | Multilingual Website Setup | Categories](/images/multiling8b.png)

#### Add new articles

Articles are the most important content component of the website. Like most content types, they offer the possibility to set the language. If 'All' is selected as the language, the content will be assigned to all content languages.

![Joomla 4 | Multilingual Website Setup | Articles](/images/multiling8a.png)

To create article content in different languages, we add a new article for each language.

1. call up the menu 'Content > Articles' and create a new article
2. select the language for the article from the Language drop-down list in the right-hand pane.
   Save the article when you have added all the content. 4.
3. repeat this procedure for each content language.

#### Add new modules

We use modules to display content at a specific position on specified subpages of the website. A module can also be assigned to a content language.

![Joomla 4 | Multilingual Website Setup | Modules](/images/multiling8c.png)

On a multilingual website, we can display different modules for each language, depending on which language the content of the module is assigned to. Practically, we use this later in this text to display the navigation that matches the content language.

### Setting up the menu system for a multilingual website

#### Add menus for each language

For a multilingual website, we create a separate menu for each language to have better control over navigation. Here are the steps in detail:

1. navigate to 'Menu > Manage' and create a new menu.

![Joomla 4 | Multilingual Website Setup | Menu](/images/multiling9a.png)

2. select the language for the menu from the Language drop-down list in the right-hand pane.
3. save the menu
   Repeat this process for each content language.

![Joomla 4 | Multilingual Website Setup | One Menu for Each Language](/images/multiling9b.png)

#### Create a module for each menu

In Joomla, a menu is usually displayed via a module. Our aim is that the English menu - and only this menu - is displayed if English is selected as the content language. The same applies analogously to any other content language. To achieve our goal, we install a module for each menu, i.e. for each content language. We assign this module to the appropriate language.

1. navigate to 'Content | Site Module' and create a new menu Module.

![Joomla 4 | Multilingual Site Setup | A Module for the Menu](/images/multiling11a.png)

2. select the appropriate menu and in the right area select the language for the module from the Language selection box.

![Joomla 4 | Multilingual Website Setup | Configuring the Module](/images/multiling11b.png)

3. save the module
   Repeat this process for each content language. 5.
4. the main menu, which was automatically created during the installation of Joomla, is no longer needed and for this reason we deactivate it.

![Joomla 4 | Multilingual Website Setup | Deactivate Modules](/images/multiling11c.png)

6. make sure that only the menu matching the content language is displayed in the frontend at all times.

![Joomla 4 | Multilingual Website Setup | Always show the menu that matches the content language](/images/multiling15.png)

#### Add menu items for each language

Once the menu for each language is created, we add new menu items.

Open the English menu and click on 'Add new menu item' in the toolbar. 2.
In the right pane, select the language for the menu item from the Language selection box. Make sure the correct menu is selected. Set the menu item as the default menu item if you wish.

Joomla 4 | Multilingual Website Setup | One Menu for Each Language](/images/multiling10a.png)

3. save the menu item
4. repeat this process for each content language.

### Multilingual associations

Multilingual associations are used to redirect articles or menu items from one language to another when we click on the language switch flag. Website visitors expect to be taken to the English version of an article when they switch the content language from German to English. However, this is only possible if Joomla knows which articles or menu items belong to each other. Language links tell Joomla this information. If we do not set the language links, we will be redirected to the default menu of a language when we change the content language in the frontend. This is not desired and therefore we link the content.

#### Associations

When we add a menu item and assign a language to it, the options for associations are displayed. We find these on the 'Associations' tab. Selectable are the menu items of other content languages.

![Joomla 4 | Multilingual Website Setup | Default Menu Item per Language](/images/multiling12.png)

We also find 'associations' with other Joomla elements. For example with articles.

#### The component Multilingual Associations - Language Links

The component 'Multilingual Associations' or 'Language Links' is a tool that makes it possible to edit associated elements side by side without having to switch back and forth. It is very convenient to create an element in several languages and associate them simultaneously. The side-by-side view allows us to edit the elements after selecting a reference element.

![Joomla 4 | Multilingual Website Setup | Multilingual Associations - Language Associations - Side-by-Side View](/images/multiling13b.png)

To get to this component, we navigate to 'Components > Multilingual Associations / Language Shortcuts'.

![Joomla 4 | Multilingual Website Setup | Multilingual Associations - Language Associations](/images/multiling13a.png)

### Set default page for each language

The default page is the home page for each language. Set a default menu item in each menu. For example, if you click on the menu item _Home_ as the default in the English main menu, it becomes the default menu item for English-language pages.

![Joomla 4 | Multilingual Website Setup | Default Menu Item per Language](/images/multiling10b.png)

1. open the english main menu and click on the circle symbol to set the menu item as default for this language. 2. repeat this process for each language.

Repeat this process for each content language.

### Language Switch Module

This language switching module displays a list of available content languages. This allows you to switch back and forth between them. The prerequisite is that Joomla is used as a multilingual website and that the content languages have been defined and published as explained above. 1.

To set up the language switcher, navigate to 'Content | Site Module' and create a new Language Switcher Module.

![Joomla 4 | Multilingual Site Setup | Language Switcher Module Setup](/images/multiling14a.png)

2. i assign the module to the position languageswitcherload.

![Joomla 4 | Multilingual Website Setup | Language Switcher Module Setup](/images/multiling14b.png)

3. as soon as the module is published, we can use it in the frontend.

![Joomla 4 | Multilingual Website Setup | Language Switcher Module Setup](/images/multiling14c.png)

Done!
<img src="https://vg06.met.vgwort.de/na/986e096b00f64b76b1c25a07e20f3871" width="1" height="1" alt="">
