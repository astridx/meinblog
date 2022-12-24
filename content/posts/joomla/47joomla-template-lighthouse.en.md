---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2021-01-03
title: 'Template - Lighthouse'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-lighthouse
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











The template is ready. Now you want to make sure that it is technically good and contains no errors. Then take a look at [Lighthouse](https://developers.google.com/web/tools/lighthouse)[^developers.google.com/web/tools/lighthouse]. This is a browser plug-in and an audit tool developed in Google Chrome with which the loading time of a website can be examined and optimised. In addition to the structure of HTML, CSS and JavaScript files, it also takes into account the integration of images and the cache settings of the website.<!-- \index{Google Lighthouse} --><!-- \index{template!performance, accessibility, best practice, seo, pwa} -->

## Google Lighthouse

The Lighthouse analyses includes

- Performance - How fast does the website load?
- Accessibility - Does the website include barriers for certain people or devices?
- Best Practices - Does the website use modern standards?
- Search Engine Optimisation (SEO) - How well is the website readable by search engines?
- Progressive Web App (PWA) - Does the website offer features of a [Web App](https://en.wikipedia.org/wiki/Mobile_app)[^en.wikipedia.org/wiki/mobile_app]?

![Create Joomla Template - Page Speed Analysis with Lighthouse](/images/j4x47x1.png)

For each area, the support is calculated as a percentage.

- 0 - 49 (red) = poor
- 50 to 89 (yellow) = medium
- 90 to 100 (green) = good

> With Joomla, 100% is achievable in all areas. You can find a concrete example at [die-beste-website.de](https://die-beste-website.de/test/lighthouse).

### Google Chrome web browser

Lighthouse is included in the Google Chrome web browser by default. Open the website you want to test and activate Lighthouse:

- Right-click anywhere on the website.
- Select _Inspect_ from the context menu that opens.
- Open the _Lighthouse_ tab.
- Use the _Generate Report_ button.

### Create good conditions for the test

- Start the analysis under a good internet connection.
- Run the test in "incognito mode" (privacy mode). This way, any browser extensions do not influence the test.

You can use the results and tips from Lighthouse to improve your website. Some of the [tips](https://github.com/GoogleChrome/lighthouse-stack-packs/pull/44/files)[^github.com/googlechrome/lighthouse-stack-packs/pull/44/files] come directly from the Joomla community.

![Create Joomla Template - Page Speed Analysis with Lighthouse](/images/j4x47x2.png)

### Vary results

The results of the Lighthouse analysis vary at different times and under different conditions. Reasons for this are, for example

- the internet connection
- the device used
- browser extensions
- antivirus software

## Links

[Lighthouse](https://developers.google.com/web/tools/lighthouse)[^developers.google.com/web/tools/lighthouse]
<img src="https://vg08.met.vgwort.de/na/871cabe6012345f9908b7d01547c7440" width="1" height="1" alt="">
