---
date: 2021-03-06
title: 'Static Option'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-statisch-oder-fluid
langKey: en
categories:
  - Code
tags:
  - Tmplate
  - Joomla
  - Cassiopeia
---

Static Option

Die Einstellungen für die Protostar-Vorlage lassen zwei Optionen für das Layout der Seite zu, Statisch oder Fluid.

Diese Einstellungen wirken sich hauptsächlich auf die Darstellung auf breiten Bildschirmen wie Computermonitoren und vielen Laptops aus. Dies sind die Standardeinstellungen, die durch das Erstellen von überschreibenden Stilen in einem benutzerdefinierten Stylesheet manipuliert werden können. Auf schmalen Bildschirmen gibt es im Wesentlichen keinen Unterschied zwischen den beiden Einstellungen.

Die Einstellungen finden Sie unter Erweiterungen -> Vorlagen. Öffnen Sie die Vorlage protostar in der Spalte Style.

Statische Einstellung für Protostar
Die Static-Einstellung für Protostar platziert den Hauptinhalt Ihrer Webseiten in <div class="container">. Das Stylesheet von template.css wird Stile für diese Klasse, .container, vorgeben. Mit der Einstellung "Static" können Sie die Breite des Inhalts und der Seitenspalten für größere Bildschirme festlegen.

static widescreen

Bildschirme breiter als 980px

Mit der Einstellung Static wird der Container bei Breiten über 980px nicht so breit wie der Bildschirm sein. Der Container wird eine feste Breite von 980px haben (einschließlich Padding). Die rechte, mittlere und linke Spalte haben eine feste Breite, die ein Prozentsatz der Breite des Containers ist.

Bildschirme mit einer Breite zwischen 979px und 768px

Bei schmaleren Bildschirmen, wie z. B. auf Tablets, wird die Breite des Containers prozentual zur Bildschirmgröße reduziert, aber die drei Spalten bleiben erhalten. In einigen Fällen wird der Raum um den Container herum weiterhin sichtbar sein, obwohl einige Tablets ihn eliminieren. Die rechte Spalte, die mittlere Spalte und die linke Spalte haben ebenfalls eine Breite, die einen Prozentsatz der Größe des Containers ausmacht.

Wenn der Bildschirm schmaler wird, werden die drei Spalten in der Breite reduziert.

Bildschirme mit weniger als 768px

Bei sehr schmalen Bildschirmen füllt der Container den Bildschirm aus. Es gibt keinen Platz um den Container herum. Die Spalten haben alle eine Breite von 100 % des Bildschirms und werden übereinander gestapelt.

Fluid-Einstellung für Protostar
Die Fluid-Einstellung für Protostar platziert den Hauptinhalt Ihrer Webseiten in <div class="container-fluid">. Das Stylesheet der template.css wird die Klasse .container-fluid mit den entsprechenden Styles ansprechen. Mit der Einstellung Fluid müssen Sie Ihre Inhalte und Module so gestalten, dass sie bei jeder Breite gut dargestellt werden.

Fluid-Bildschirm

Bildschirme breiter als 980px

Mit der Fluid-Einstellung füllt der Inhalt den Bildschirm aus. Es gibt keinen Platz um den Container herum. Jede Spalte entspricht einem Prozentsatz der Breite des Bildschirms. Wenn der Bildschirm schmaler wird, werden auch die Spalten schmaler.

Bildschirme mit einer Breite zwischen 979px und 768px

Mit der Einstellung "Fluid" füllt der Inhalt immer noch den Bildschirm aus. Jede Spalte entspricht einem Prozentsatz der Breite des Bildschirms. Wenn der Bildschirm schmaler wird, werden auch die Spalten schmaler.

Bildschirme mit weniger als 768px

Bei sehr schmalen Bildschirmen füllt der Container immer noch den Bildschirm aus. Die Spalten haben alle eine Breite von 100 % des Bildschirms und werden übereinander gestapelt.
