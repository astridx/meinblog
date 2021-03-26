---
date: 2021-01-10
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Overrides - alternative Overrides und Module Chrome'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-css-overrides-und-chrome
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---

todo es gibt auch system css altert

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t36...t37) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

		
Image
	banner 	Custom 	Selected 	Public 	117
Select Popular Tags				
Popular Tags
	bottom-b 	Tags - Popular 	All 	Public 	118
Select Older Posts				
Older Posts
	bottom-b 	Articles - Category 	All 	Public 	114
Select Similar Items				
Similar Items
	bottom-b 	Tags - Similar 	All 	Public 	119
Select Breadcrumbs				
Breadcrumbs
	breadcrumbs 	Breadcrumbs 	All 	Public 	17
Select Bottom Menu				
Bottom Menu
	footer 	Menu 	All 	Public 	115
Select Main Menu Blog				
Main Menu Blog
	menu 	Menu 	All 	Public 	109
Select Search				
Search
	search 	Smart Search 	All 	Public 	116
Select Main Menu				
Main Menu
	sidebar-right 				
Author Menu
	sidebar-right 				
Archived Articles
	sidebar-right 			
Syndication
	sidebar-right 			
Login Form
	sidebar-right 			
Latest Posts
	top-a 	Articles - Newsflash 	

![Joomla Template erstellen - Modulepositionen filtern](/images/j4x42x1.png)


- wir ergänzen if ob es modul gibt
- löschen mdoule, die wir nicht brauchen. banner machen wir später

- menu anlegen
![Joomla Template erstellen - Module Layout wählen](/images/j4x42x2.png)

- chrome
![Joomla Template erstellen - Module Chrome](/images/j4x42x3.png)

### Neue Dateien

#### Module

##### []()

```php

```

## Teste dein Joomla-Template

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `templates` Ordner in den `templates` Ordner deiner Joomla 4 Installation.

Installiere dein Template wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Template Style Facile als aktiv.

3. Installiere die Beispieldaten für die Tests

4. Rufe die URL `joomla-cms4/index.php?tp=1` auf.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t35...t36.diff

## Links

[Joomla 4 Template Lightning](https://github.com/C-Lodder/lightning)
[Joomla 4 Template Sloth](https://github.com/dgrammatiko/sloth-pkg)
