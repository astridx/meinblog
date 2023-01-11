---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-05-04
title: 'Ein erstes Joomla Child-Template'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-mein-erstes-child-template
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










In diesem Tutorial beschreibe ich die ersten Schritte auf dem Weg zur Geburt meines ersten Child-Templates. Diesen Anfang habe ich auf der Grundlage des Standard-Template Cassiopeia gemacht.<!-- \index{Child Template} -->

Seit Joomla 4.1 ist es ermöglicht, mit der Child-Template Funktion unkompliziert das eigene Template zu erstellen. Wie eine Katze an ein Mauseloch kannst du dich ganz langsam in die Template-Entwicklung vortasten. Es ist lediglich erforderlich, die selbst hinzugefügten Elemente zu warten. Also ist auch nur zwingend erforderlich, dass du dich mit diesen auskennst. Alles andere wird weiterhin vom Joomla-Projekt auf dem neuesten Stand gehalten.

### Child-Template erstellen

Ich baue auf einer frischen Joomla 4.1 Installation auf.

1. Öffne den Template Manager, in dem du links auf `System` und dann rechts auf `Site Templates` klickst.

Du erkennst unter dem Namen des Templates einen neuen Eintrag `parent`. Hier ist gekennzeichnet, ob ein Template die Voraussetzungen dazu verfügt, ein Kindtemplate zu erzeugen. Hier beginnt der Zauber!

![Joomla 4 - Cassiopeia | Child-Template - Ein neuer Eintrag](/images/child1.png)

2. Öffne als nächstes das Template Cassiopeia per Klick auf den Eintrag `Cassiopeia Details and Files`.

Auch hier findest du etwas Neues vor: Die Schaltfläche `Create Child-Template`. Außerdem hat sich die Dateistruktur verändert, die du im linken Bereich siehst. 

> Die Schaltfläche `Copy template` ist nicht mehr verfügbar. Diese kennst du vielleicht aus vorhergehenden Joomla Versionen?

![Joomla 4 - Cassiopeia | Child-Template - Template Cassiopeia](/images/child2.png)

3. Klicke nun auf die Schaltfläche `Create Child-Template` und erstelle so dein erstes Joomla Child Template.

Vollziehe die zwei Schritte nach, welche in den nachfolgenden Bildern gezeigt sind. Du wirst sehen, es ist tatsächlich unkompliziert.

![Joomla 4 - Cassiopeia | Child-Template - Erstellen Schritt 1](/images/child3.png)

![Joomla 4 - Cassiopeia | Child-Template - Erstellen Schritt 2](/images/child4.png)

Voila! Das war es schon! Du hast ein Child Template erstellt. Anhand der Dateien im linken Bereich erkennst du, dass du dich noch in der Ansicht von Cassiopeia befindest. Um das neue Child Template zu bearbeiten, wechselst du im nächsten Schritt die Ansicht.

4. Schließe die Anzeige der Cassiopeia-Dateien und öffne dein Child Template.

Klicke also im Dashboard auf den Namen deines Child Templates.

![Joomla 4 - Cassiopeia | Child-Template - Child Template öffnen ](/images/child5.png)

5. Sieh dir die Dateien an, die für dein Child Template automatisch angelegt wurden. Hierbei handelt es sich um eine minimale Struktur.

Die folgenden Ansichten, zeigen dir den Inhalt deines Child-Templates, nachdem du im Dashboard auf den Namen deines Child Templates geklickt hast.

![Joomla 4 - Cassiopeia | Child-Template - Dateistruktur des Child Templates](/images/child6.png)

Wenn du dieses Template als Standardtemplate aktivierst, ändert sich die Anzeige im Frontend noch nicht, da alles vom Elterntempalte Cassiopeia geerbet und verwendet wird.

6. Öffne die Frontend Ansicht der Website und überzeuge dich davon, dass Cassiopeia und dein Child Template bisher die gleiche Anzeige bewirken.

Sieh dir dazu zunächst die Anzeige von Cassiopeia unmittelbar nach der Installation von Joomla an.

![Joomla 4 - Cassiopeia | Child-Template - Ansicht des Cassiopeia Templates im Frontend](/images/child7.png)

Aktiviere dein Child Template

![Joomla 4 - Cassiopeia | Child-Template - Template Stile öffnen](/images/child8a.png)

![Joomla 4 - Cassiopeia | Child-Template - Anderen Template til aktivieren](/images/child8.png)

Sieh dir die Anzeige erneut im Frontend an

![Joomla 4 - Cassiopeia | Child-Template -  Ansicht des Cassiopeia Child Templates im Frontend](/images/child7.png)

7. Erstelle ein Override

Nach einer ganz frischen Joomla Installation ist standardmäßig die Ansicht `Featured` aktiv. Deshalb erstellen wir ein Override dieser Ansicht. 

Klicke auf den Eintrag `featured`.

![Joomla 4 - Cassiopeia | Child-Template - Override erstellen 1](/images/child9a.png)

Füge einen einfachen Text im Override ein.

![Joomla 4 - Cassiopeia | Child-Template - Override erstellen 2](/images/child9b.png)

Überzeuge dich davon, dass die Änderung im Frontend übernommen wird.

![Joomla 4 - Cassiopeia | Child-Template - Override erstellen 3](/images/child9.png)

> Hier geht es nicht um Programmierung, sondern ums Prinzip. Du bist nun in der Lage deine eigenen Overrides erstellen!

8. Lege ein `user.css` an und ändere CSS-Stile

In der Regel möchte man auf der Website seinen Stil ausgeben. Dies geschieht meist per CSS. Mithilfe der Datei `user.css` ist es dir möglich, alles von Cassiopeia zu verwenden, und nur deinen eigenen Änderungswünsche hinzuzufügen oder abzuändern.

Klicke also auf die Schaltfläche `New File` in der Werkzeugleiste, um eine neue Datei anzulegen.

![Joomla 4 - Cassiopeia | Child-Template - ](/images/child10a.png)

Erstelle die Datei `user.css` im Verzeichnis `media/css`, den hier wird sie als erstes gesucht, wenn dein Child Template aktiv ist.
 
![Joomla 4 - Cassiopeia | Child-Template - ](/images/child10b.png)

Stelle sicher, dass die Datei korrekt gespeichert wird.

![Joomla 4 - Cassiopeia | Child-Template - ](/images/child10c.png)

Lege neue Stile an. Möchtest du beispielsweise die Hintergrundfarbe der Navigation ändern?

Verwende in diesem Fall folgenden Code:

```css
:root {
  --cassiopeia-color-primary: red;
}

.container-header {
  background-image: none;
}
```

Die Angabe 

```css
.container-header {
  background-image: none;
}
```

ist wichtig, weil Cassiopeia im Header per CSS einen Verlauf als Image einfügt. Sie dir dazu den nachfolgenden Codeauszug aus der `template.css` von Cassiopeia an. 

```css
/* Codeauszug aus der template.css von Cassiopeia*/
.container-header {
  background-color: var(--cassiopeia-color-primary);
  background-image: linear-gradient(135deg,var(--cassiopeia-color-primary) 0,var(--cassiopeia-color-hover) 100%);
  box-shadow: inset 0 5px 5px rgba(0,0,0,.03);
  position: relative;
  z-index: 10;
}
```
 Es ist zwingend diesen Code zu überschreiben.

 
![Joomla 4 - Cassiopeia | Child-Template - ](/images/child10d.png)

Überzeuge dich davon, dass die Änderung im Frontend übernommen wird.

![Joomla 4 - Cassiopeia | Child-Template - ](/images/child10.png)
<img src="https://vg05.met.vgwort.de/na/a79de9ecdc814d33bcf6835d5f864852" width="1" height="1" alt="">


