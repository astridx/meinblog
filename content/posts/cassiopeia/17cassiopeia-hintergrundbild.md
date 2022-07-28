---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-03-02
title: 'Hintergrundbild über ganzen Bildschirm in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-hintergrundbild
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Du möchtest ein Bild in den Hintergrund deines Cassiopeia Templates in Joomla einfügen. Das Bild sollte jederzeit den gesamten Bildschirm ausfüllen. Wenn der Inhalt der Website entweder länger oder breiter als der Bildschirm ist, sollte das Bild beim Scrollen fixiert bleiben. Dieses Ziel kann mithilfe der Datei `user.css` erreicht werden.  

### Hintergrundbild über ganzen Bildschirm

1. Wähle ein Bild als Hintergrundbild aus und speichere dieses unter dem Namen `background.jpg` im Imageverzeichnis deiner Joomla-Installation ab.

Ich verwende das Bild von Pexels[^pixabay.com/de/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1850417] auf Pixabay[^pixabay.com/de/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1850417] als Beispiel.

2. Erstelle ein paar Beispielbeiträge falls du eine frische Installation zum Ausprobieren wählst. So kannst du später testen, was passiert, wenn du die auf der Website scollst.

> Mein Bild dient nur als Beispiel. Achte bei der Auswahl des Bildes für eine produktive Website darauf, dass alle Inhalte weiterhin gut lesbar bleiben!

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c1_hintergrund.png)

3. Öffne nun im Administrationsbereich von Joomla zunächst per Klick auf `System` im linken Menü die Systemeinstellungen. Klicke danach im rechten Bereich unter `Template` den Eintrag `Site Templates` und wähle Cassiopeia. Füge jetzt in die Datei `user.css` den nachfolgenden Text ein und speichere deine Änderungen.

> Unter Umständen musst die Datei `user.css` erst anlegen. Seit Joomla 4.1 ist es der korrekte Ort für diese Datei das Verzeichnis `/media/templates/site/cassiopeia/css/`.

```css
body.site {
	background: transparent;
	background-image: url(../../../../../images/background.jpg);
	background-position: top;
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
```

> `background-image: url(../../../../../images/background.jpg);` ist korrekt, wenn sich das Bild in der Root des Joomla-Medienverzeichnis befindet. Wenn du das Bild unter `/media/templates/site/cassiopeia/images/` abgelegt hast, wäre `background-image: url(../images/background.jpg);` der passende Eintrag[^de.wikipedia.org/w/index.php?title=Pfadname&oldid=205952565].

4. Überprüfe nun die Ansicht im Frontend. Dein Bild sollte hier nun als Hintergrund zu sehen sein.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c2_hintergrund.png)

Das Ergebnis siehst du im nachfolgenden Bild.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c3_hintergrund.png)

5. Hintergrund von Modulen und Kopfleiste anpassen.

Ergänze den nachfolgenden Text in die `user.css`, wenn du den Hintergrund der Module und der Kopfleiste ebenfalls transparent darstellen möchtest, damit dein Bild hier ebenfalls erscheint.

```css
.card {
  background: transparent;
  border:none;
}

.header {
   background: transparent;
}
```
Das Ergebnis siehst du im nachfolgenden Bild.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c4_hintergrund.png)

7. Das Bild bleibt beim Scollen fest stehen

Scrolle ans Fußende der Website und überzeuge dich davon, dass sich das Hintergrund nicht verändert.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c5_hintergrund.png)

8. Überprüfe das Erscheinungbild des Images unter unterschiedlichen Bildschirmgrößen.

Das Bild wird nicht verzerrt! Allerdings wird das Bild nicht immer vollständig angezeigt:

Wenn der Bildschirm schmall ist, werden Bildbereich rechts und links abgeschnitten.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c6_hintergrund.png)

Wenn der Bildschirm breit aber nicht sehr hoch ist, werden Bildbereich oben und unten ausgeblendet.

![Joomla 4.1 - Cassiopeia | Hintergrundbild über ganzen Bildschirm |  ](/images/c6a_hintergrund.png)
