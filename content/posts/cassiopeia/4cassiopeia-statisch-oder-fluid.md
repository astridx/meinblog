---
date: 2021-03-06
title: 'Ein Tutorial zur Verwendung des Cassiopeia-Templates für Joomla 4 - Statisch oder fluid'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-statisch-oder-fluid
langKey: de
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

Die Einstellungen für Cassiopeia lassen zwei Optionen für das Layout der Seite zu, statisch oder fluid.

![Templates_Edit_Style_admin_Administration](/images/ce4.png)

Diese Einstellungen wirken sich hauptsächlich auf die Darstellung auf breiten Bildschirmen wie Computermonitoren aus. Auf schmalen Bildschirmen gibt es im Wesentlichen keinen Unterschied zwischen den beiden Einstellungen.

> Wie du die Optionen öffnest findest du unter [Optionen in Cassiopeia](/cassiopeia-optionen).

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

![Cassiopeia Layout-Option static](/images/cp_static.png)

Nachfolgend siehst du eine Seite unter verschiedenen Auflösungen mit der Fluid-Einstellung. Die Bildschirmbreite beträgt von links nach rechts 575px, 2000px und 1100px. In jeder Variante wird der vorhandene Platz vollständig genutzt.

![Cassiopeia Layout-Option fluid](/images/cp_fluid.png)
