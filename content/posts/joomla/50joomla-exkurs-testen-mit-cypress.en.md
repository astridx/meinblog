---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-01-28
title: 'How to write end-to-end tests with Cypress'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-exkurs-testen-mit-cypress
langKey: en
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Automated tests are not a special tool for software developers in large projects. Especially for smaller extensions, automated tests are a help to quickly identify problems. They help to ensure that extensions work smoothly in newer Joomla versions. The Joomla Core developers want third-party software developers to test their extensions. This way, bugs are noticed before a user finds them. This requires a lot of work and is therefore often not done. Especially not if it has to be done manually by humans for each release. Automatic testing makes it possible to repeat the manual steps for each release without a human performing the steps themselves. This way, bugs are found before a user encounters them when accessing the live system.<!-- \index{tests} --><!-- \index{Cypress} -->

## Openning

„While it is true that quality cannot be tested in, it is equally evident that without testing it is impossible to develop anything of quality.“
– [James A. Whittaker]

### Who should read this text?

Anyone who thinks that software testing is a waste of time should take a look at this article. In particular, I would like to invite those developers to read this who have always wanted to write tests for their software - but have never done for a variety of reasons. Cypress could be a way to remove such barriers.

### Requirements

#### What equipment do you need?

You do not have to meet very many requirements to be able to work on the contents of this manual. Of course, you must have a computer that is common today. A development environment with Git, NodeJS and Composer and a local web server should be installed or installable on it. You can find more information and help on setting up your workstation in the Joomla documentation article [Setting up your workingstation for Joomla development](https://docs.joomla.org/Setting_up_your_workstation_for_Joomla_development)[^docs.joomla.org/Setting_up_your_workstation_for_Joomla_development]. 

For Cypress you find informations under https://docs.cypress.io/guides/getting-started/installing-cypress. But you do not need this. Joomla is setting up everything for you.

#### What knowledge should you personally have?

You should have a good command of basic PHP programming techniques. Ideally, you have already programmed a small or medium-sized web application. In any case, you should know where to store PHP files on your development computer and how to load them in your internet browser. 

Most importantly, you should enjoy trying out new things.

## Setting up Cypress with Joomla!

### Installation

Steps to setup the local environment:

-   Clone the repository:

```source-shell
git clone https://github.com/joomla/joomla-cms.git
```

-   Go to the joomla-cms folder:

```source-shell
cd joomla-cms
```

-   Go to the current branch. At the moment this is 4.3-dev:

```source-shell
git checkout 4.3-dev
```

-   Install all the needed composer packages:

```source-shell
composer install
```

-   Install all the needed npm packages:

```source-shell
npm ci
```

### How to use Cypress? 

Just call `npm run cypress:open` in a CLI in your Joomla folder and a short time later the app will open. Here you can choose to run the e2e tests and decide which browser to use. All available test suites are then listed and you can click on the one you want to run at the moment.

When you select a test suite, the tests are executed and you can watch the tests in real time in the browser. As the tests run, you see the executed script on one side and the result in the browser on the other. These are not just screenshots either, but real snapshots of the browser at that time, so you can view the actual HTML. Screenshots and even videos of the tests are also possible.

Todo: in joomla kann man nicht immer alle tests mehrfach ausführen. 
todo wenn das geklappt hat, können wir mit der eigenen erweiterung weiter machen.



##

## Links
todo auf anfangszitat James Whittaker eingehen.

https://magazine.joomla.org/all-issues/october-2022/off-to-cyprus-ehm-cypress-how-joomla-does-its-end-to-end-testing

https://github.com/joomla/joomla-cms/pull/38422

https://www.youtube.com/watch?v=26jL9EVI-98

https://github.com/joomla/joomla-cms/pull/38422

https://www.youtube.com/watch?v=26jL9EVI-98

https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment/de

Link zu beispiedateien in entwicklermagazin

https://stackoverflow.com/questions/70841070/how-to-do-cy-notcontainstext-in-cypress

https://github.com/joomla-projects/joomla-cypress/pull/3/files

Fallstricke merke selbst beim validierne, dass mein Text llerzeichen hat.
https://docs.cypress.io/api/commands/type#Tabindex
https://dzone.com/articles/how-to-execute-javascript-commands-in-cypress
https://docs.cypress.io/api/commands/trigger#Differences
https://docs.cypress.io/api/commands/focus


Unterordner für Module nagelegt.

get versus find

https://docs.cypress.io/faq/questions/using-cypress-faq


https://www.webiny.com/blog/things-to-avoid-when-writing-cypress-tests



     cy.get('#jform_name').clear().type('1')
     cy.get('#jform_alias').trigger('click')
-    cy.get('#jform_alias').focus()
-    cy.get('#foo-form').should('contain.text', 'This value is not valid')
+    cy.get('#jform_alias').focus().then(() => {
+      cy.get('#foo-form').should('contain.text', 'This value is not valid')
+    })



https://learn.cypress.io/