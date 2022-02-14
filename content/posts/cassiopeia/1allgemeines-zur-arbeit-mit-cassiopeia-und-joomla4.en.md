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

## Editor Switcher<!-- \index{Editor!Switcher} -->

Joomal offers a number of different editors. Each editor offers advantages, but also has disadvantages. Under certain circumstances, you may not want to use an editor at all.

When I write article texts in the Joomla backend, I like to use the [TinyMCE](https://www.tiny.cloud/) because it provides a toolbar that helps me to do simple formatting. At the same time, I like to look at the HTML source code with syntax highlighting. Syntax highlighting is implemented in [codemirror](https://codemirror.net/)[^https://codemirror.net/]. The TinyMCE does not offer this under Joomla in early 2022.

The editor can be set in the global configuration. Alternatively, you can set it individually for a user in the User Manager. While entering an article text, switching to the global configuration or the user manager is cumbersome. That's why I love the plugin [Editor Switcher by Bakual](https://github.com/Bakual/editors_switcher)[^https://github.com/bakual/editors_switcher].

After installing and activating it, I set the Switcher as the default editor for my user.

Editor Switcher | Edit Style in the Joomla administration area](/images/switcher_backend_user.png)

It is then possible to switch the editor while writing a text in the Article Manager. It is not necessary to switch to another configuration area. Only a buffering is necessary.

![Editor Switcher | Edit Style in the Joomla Administration Area](/images/switcher_backend_article.png)
