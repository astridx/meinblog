---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2021-03-06
title: 'Static or fluid'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-statisch-oder-fluid
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---










The settings for Cassiopeia allow two options for the layout of the page, static or fluid.<!-- \index{static} --><!-- \index{fluid} -->

![Templates_Edit_Style_admin_Administration](/images/ce4.png)

These settings mainly affect the display on wide screens such as computer monitors. On small screens, there is essentially no difference between the two settings.

> Wie du die Optionen öffnest findest du unter [Optionen in Cassiopeia](https://blog.astrid-guenther.de/en/cassiopeia-optionen)[^blog.astrid-guenther.de/en/cassiopeia-optionen].

## Statische Einstellung für Cassiopeia

Die `static`-Einstellung für Cassiopeia fügt dem Hauptinhalt unser Webseiten die Klasse `wrapper-static` hinzu. Das Stylesheet von `template.css` gibt Stile für diese Klasse vor. Mit der Einstellung `static` können wir die Breite des Inhalts und der Seitenspalten für größere Bildschirme festlegen.

### Bildschirme breiter als 1320px

Mit der Einstellung Static wird der Container bei Breiten über 1320px nicht so breit wie der Bildschirm sein. Der Container wird eine feste Breite von 1320px haben (einschließlich Padding). Die rechte, mittlere und linke Spalte haben eine feste Breite, die ein Prozentsatz der Breite des Containers ist.

### Bildschirme mit einer Breite zwischen 1319px und 576px

Bei schmaleren Bildschirmen, wie z. B. auf Tablets, wird die Breite des Containers prozentual zur Bildschirmgröße reduziert, aber die drei Spalten bleiben erhalten. In einigen Fällen wird der Raum um den Container herum weiterhin sichtbar sein, obwohl einige Tablets ihn eliminieren. Die rechte Spalte, die mittlere Spalte und die linke Spalte haben ebenfalls eine Breite, die einen Prozentsatz der Größe des Containers ausmacht.

Wenn der Bildschirm schmaler wird, werden die drei Spalten in der Breite reduziert.

### Bildschirme mit weniger als 576px

Bei sehr schmalen Bildschirmen füllt der Container den Bildschirm aus. Es gibt keinen Platz um den Container herum. Die Spalten haben alle eine Breite von 100 % des Bildschirms und werden übereinander gestapelt.

## Fluid-Einstellung für Cassiopeia

Die `fluid`-Einstellung für Cassiopeia fügt dem Hauptinhalt unser Webseiten die Klasse `wrapper-fluid` hinzu. Das Stylesheet von `template.css` gibt Stile für diese Klasse vor. Mit der Einstellung `fluid` müssen wir dir Inhalte und Module so gestalten, dass sie bei jeder Breite gut dargestellt werden.

### Bildschirme breiter als 1320px

Mit der Fluid-Einstellung füllt der Inhalt den Bildschirm aus. Es gibt keinen Platz um den Container herum. Jede Spalte entspricht einem Prozentsatz der Breite des Bildschirms. Wenn der Bildschirm schmaler wird, werden auch die Spalten schmaler.

### Bildschirme mit einer Breite zwischen 1319px und 576px

Mit der Einstellung "Fluid" füllt der Inhalt immer noch den Bildschirm aus. Jede Spalte entspricht einem Prozentsatz der Breite des Bildschirms. Wenn der Bildschirm schmaler wird, werden auch die Spalten schmaler.

### Bildschirme mit weniger als 576px

Bei sehr schmalen Bildschirmen füllt der Container immer noch den Bildschirm aus. Die Spalten haben alle eine Breite von 100 % des Bildschirms und werden übereinander gestapelt.

## Vergleich zwischen Fluid-Einstellung und Static-Einstellung

Nachfolgend siehst du eine Seite unter verschiedenen Auflösungen mit der Static-Einstellung. Die Bildschirmbreite beträgt von links nach rechts 575px, 2000px und 1100px. Im mittleren Bild ist zu erkennen, dass die 2000px nicht ausgenutzt werden. Rechts und links ist ein Freiraum. Der Vorteil dieser Einstellung ist, dass sich der Webdesigner darauf verlassen kann, dass die Website nie breiter als 1320px dargestellt wird.

![Cassiopeia Layout-Option static](/images/cpstatic.png)

Nachfolgend siehst du eine Seite unter verschiedenen Auflösungen mit der Fluid-Einstellung. Die Bildschirmbreite beträgt von links nach rechts 575px, 2000px und 1100px. In jeder Variante wird der vorhandene Platz vollständig genutzt.

![Cassiopeia Layout-Option fluid](/images/cpfluid.png)
<img src="https://vg04.met.vgwort.de/na/2f6856e06b8d4036bd2f8cc046ce3ebc" width="1" height="1" alt="">
