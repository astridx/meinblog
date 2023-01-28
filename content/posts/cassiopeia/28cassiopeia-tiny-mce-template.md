---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2023-01-29
title: 'Joomla 4 Cassiopeia - TinyMCE Template'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-tiny-mce-template
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Aus Textverarbeitungsprogrammen kennt man die Textbausteine. Textpassagen, die sich oft wiederholen, sind per Klick hinzufügbar. Ähnlich kann man mit Formaten im TinyMCE verfahren. Mir geht es um das Prinzip. Deshalb ist das Beispiel hier wieder einfach gehalten. Ein Text wird lediglich mit einem roten Hintergrund versehen. 

> Cassiopeia bietet Bootstrap 5. Lass dich für eigene Anwendungsbeispiele in der [Bootstrap Dokumentation](https://getbootstrap.com/docs/5.0/getting-started/introduction/)[getbootstrap.com/docs/5.0] inspirieren, falls du nicht selbst schon eine Menge Ideen hast. Ein oft verwendeter Anwendungsfall ist eine Tabelle, die nur zu Design-zwecken angelegt wird. Es ist in HTML verpönt eine Tabelle lediglich für die Darstellung zu verwenden, weil es die Semantik nicht widerspiegelt. Andere Elemente sind semantisch sinnvoller und sehen genauso aus, wie eine Tabelle. Im einfachsten Fall das [Grid](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/]<!-- \index{Tiny!Tempalte erstellen} --><!-- \index{Editor Tiny MCE!Tempalte erstellen} -->

## Ein Template für die Verwendung im TinyMCE in Joomla 4 anlegen

Als erstes erstellen wir die Datei `redBackground.html` im Verzeichnis `/templates/cassiopeia/html/tinymce/`.

```html
<!-- /templates/cassiopeia/html/tinymce/redBackground.html -->
<div class="redbackground"><p>Text</p></div> 

```

Die im nachfolgenden Bild ersichtlichen Pfade musst du an deine individuelle Umgebung anpassen, wenn du nicht Cassiopeia als Standardtemplate verwendest - oder ein Child Template. 

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny1.png)

Erstelle nun einen Artikel und wähle im Menü des TinyMCE den Menüeintrag zum einfügen eines Templates.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny2.png)

Wenn es in deiner Installation mehrere Templates gibt, dann kannst du wählen.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny3.png)

Je nachdem, welches HTML-Markup dein Template beinhaltet, wird nun eingefügt. Wenn du genau mein simples Beispiel verwendet hast, wird der Code `<div class="redbackground"><p>Text</p></div>` eingefügt.

![Joomla Tiny MCE Template erstellen - Einstellungen](/images/tiny4.png)
