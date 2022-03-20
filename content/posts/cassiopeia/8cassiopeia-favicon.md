---
description: 'desc'
shortTitle: 'short'
date: 2021-03-10
title: 'Favicon'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-favicon
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

_Favicons_ sind die kleinen Symbole, die wir in Browser-Registerkarten sehen. Sie helfen eine Seite wiederzuerkennen, wenn wir die Lesezeichen und offenen Registerkarten im Browsers durchsuchen. Die Integration der Favicons änderte sich im Laufe der Zeit. Manche sagen, sie ist historisch gewachsen. Heute bieten Favicons verschiedene Zusatzfunktionen und es kommen immer wieder neue hinzu.<!-- \index{Favicon} -->

Es ist möglich, den Dateityp SVG als Favicon zu verwenden. Dies unterstützen [die meisten modernen Browser](https://caniuse.com/#feat=link-icon-svg). Um diese neue Funktion zu nutzen, benötigst du eine SVG-Datei. Um sicherzustellen, dass auch ältere Browser die Grafik anzeigen, ist zusätzlich eine ICO-Datei erforderlich.

> Du kennst dich mit SVG und ICO nicht aus und würdest lieber das PNG-Format verwenden? Dann findest du unter [Favicon im Joomla-Template](https://blog.astrid-guenther.de/joomla-template-favicon) eine Lösung die besser zu dir passt.

> Lösche den Browser-Cache, falls beim Entwickeln Änderungen des Favicons nicht erscheinen.

## Favicon in Cassiopeia

### Implementierung

Hier ist der Code den Cassiopeia zum Hinzufügen von Favicons nutzt:

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

Als Ergebnis erscheinen im HTML-Quellcode folgende Einträge. Der HTML-Quellcode ist das Dokument, welches an den Browser übergeben wird.

> In allen gängigen Browsern ist der HTML-Quellcode mit der Tastenkombination [Strg - U] einsehbar.

```HTML
...
<link href="/j4dev/media/system/images/joomla-favicon.svg" rel="icon" type="image/svg+xml">
<link href="/j4dev/media/system/images/favicon.ico" rel="alternate icon" type="image/vnd.microsoft.icon">
<link href="/j4dev/media/system/images/joomla-favicon-pinned.svg" rel="mask-icon" color="#000">
...
```

> Der [Pull Request](https://github.com/joomla/joomla-cms/pull/31436)[^github.com/joomla/joomla-cms/pull/31436] mit dem diese Funktion integriert wurde, orientiert sich an einem [CSS-Tricks](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) Tutorial.

### Erklärung zur Implementierung

Wenn ein Browser ein SVG-Favicon nicht unterstützt, ignoriert er die erste Zeile `<link href="/j4dev/media/system/images/joomla-favicon.svg" rel="icon" type="image/svg+xml">` und fährt mit der zweiten fort. Dadurch wird sichergestellt, dass alle Browser, die Favicons unterstützen, ein Bild anzeigen können.

Beachte den alternativen Attributwert für unsere `rel`-Deklaration `rel="alternate icon"`. Damit wird dem Browser mitgeteilt, dass das Favicon mit dem Dateiformat `.ico` lediglich als alternative Darstellung verwenden soll.

Nach den Favicons folgt die Codezeile `<link href="/j4dev/media/system/images/joomla-favicon-pinned.svg" rel="mask-icon" color="#000">`, die ein weiteres SVG-Bild lädt. Dieses heißt `joomla-favicon-pinned.svg`. Damit wird die "Pinned Tab"-Funktionalität von Safari unterstützt, die es gab, bevor andere Browser SVG-Favicons unterstützten.

## Ein modernes Favicon mit SVG und ICO als Rückfallposition

### Warum ein SVG Favicon?

Du fragst dich, welchen Grund es gibt zu SVG zu wechseln? Das `.ico`-Dateiformat gibt es schon ewig und kann Bilder bis zu einer Größe von 256×256 Pixeln unterstützen. Hier sind drei Gründe.

- Das `.ico`-Dateiformat ist ein proprietäres Format, das von Microsoft verwendet wird. SVG ist ein offener Standard. Du kannst SVG-Dateien ohne jegliche Abhängigkeit verwenden.

- Wenn wir eine auflösungsunabhängige SVG-Datei für ein Favicon verwenden, sieht das Favicons bei jeder Displaygröße gestochen scharf aus.

- SVGs sind in der Regel sehr kleine Dateien, vor allem im Vergleich zu ihren Rasterbild-Pendants. Indem wir nur ein 16×16 Pixel großes Favicon als Rückfallposition für Browser verwenden, bieten wir mit wenig Datenvolumen einen hohen Grad an Unterstützung.

### Erstelle dein Favicon mit Ubuntu 20.04

Zunächst sehen wir uns an, wie man ein Favicon unter Ubuntu erstellt. Ich veranschauliche es mit Hilfe der Pakete [Inkscape](https://inkscape.org/de/) und [Imagemagick](https://imagemagick.org/index.php). Zuerst besprechen wir den Installationsprozess für beide Pakete. Um mit dem Installationsprozess fortzufahren, solltest du Zugriff auf Superuser-Rechte haben.

#### Installiere Inkscape und Imagemagick unter Ubuntu

Führe folgendes Kommando im Terminal aus.

```
sudo apt install inkscape imagemagick
```

Der obige Befehl installiert die Pakete -- Inkscape und Imagemagick. Mit dem Inkscape-Paket erstellen wir eine skalierbare Vektorgrafik und konvertieren anschließend die Datei mit der Erweiterung .svg in .ico mit dem Befehl `convert` von Imagemagick.

#### Erstellen einer skalierbaren Vektorgrafik mit Inkscape

Mit Inkscape können wir praktisch alles entwerfen. Wir erstellen ein Text-Favicon. Öffne Inkscape und du siehst zunächst eine leere Seite umringt von Symbolleisten. Klinke auf der linken Seite auf das Symbol mit dem `A`.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape1.png)

Die Funktion hinter dem `A` dient zum Erstellen und Bearbeiten von Textobjekten in Inkscape. Danach erstellen wir einen rechteckigen Rahmen in der Standard-Leerzeile.

![Cassiopeia Favicon erstellen - Schrift anpassen in Inkscape](/images/cassiopeia_inkscape2.png)

Schreibe irgendetwas und markieren den Text. Direkt unter der Menüleiste ist die Schriftart und die Größe des Textes änderbar. Wähle eine Schrift nach deinem Geschmack.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape3.png)

Danach drücke F1, um das Textobjekt auszuwählen und zu transformieren.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape3a.png)

Des Weiteren werden wir das Textobjekt einfärben. Diese kann über die Leise im unteren Bereich erfolgen.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape4.png)

Das Textobjekt sollte in einen Pfad umgewandelt werden, dies könnte über das Tastenkürzel Objekt in Pfad umwandeln Strg+Shft+C und Seitengröße auf Auswahlgröße Strg+Shft+R geschehen, um die Seite auf die Auswahl zu verkleinern.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape5.png)

Speichere die SVG-Datei über das Menü oder die Tastenkombination Strg+Shft+S. Wähle als Format ein normales SVG. Als Speicherort wählst du

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape6.png)

Im Browser siehst du das Favicon nun im Tabulator.

![Cassiopeia Favicon erstellen - Erstellen von Textobjekten in Inkscape](/images/cassiopeia_inkscape7.png)

Der Vollständigkeit halber füge ich den Quellcode der SVG-Datei nachfolgend ein.

```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 30.691282 18.930109"
   height="18.930109mm"
   width="30.691282mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     transform="translate(-53.841845,-125.31983)"
     id="layer1">
    <g
       id="flowRoot3713"
       style="font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:#ff0000"
       transform="scale(0.26458333)"
       aria-label="My">
      <path
         id="path4803"
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000"
         d="m 203.99674,474.14974 h 17.86459 l 12.39583,29.13021 12.46875,-29.13021 h 17.82812 v 54.43229 H 251.2832 v -39.8125 l -12.54166,29.34896 h -8.89584 l -12.54166,-29.34896 v 39.8125 h -13.3073 z" />
      <path
         id="path4805"
         style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000"
         d="m 272.35611,487.7487 h 13.05209 l 10.97396,27.70833 9.33333,-27.70833 h 13.05208 l -17.17187,44.69791 q -2.58854,6.81771 -6.05209,9.51563 -3.42708,2.73437 -9.07812,2.73437 h -7.54688 v -8.56771 h 4.08334 q 3.31771,0 4.8125,-1.05729 1.53125,-1.05729 2.36979,-3.79166 l 0.36458,-1.13021 z" />
    </g>
  </g>
</svg>
```

##### CSS in der SVG-Dateien

Beachte, dass wir CSS in der SVG-Datei eingebettet haben. Dies ist nicht nur mittels `style="..."` möglich, sonder ebenfalls via `<style>`-Tag.

```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 30.691282 18.930109"
   height="18.930109mm"
   width="30.691282mm">
  <style>
    #flowRoot3713 {
       font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:#ff0000;
    }
    #path4803, #path4805{
       font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:74.66666412px;font-family:sans-serif;-inkscape-font-specification:'sans-serif Bold';fill:#ff0000;stroke:#ff0000;
    }
  </style>
  <defs
     id="defs2" />
  <metadata
...
```

##### Ein Emoji als Favicon<!-- \index{Favicon!Emoji} -->

[Emojis](https://de.wikipedia.org/w/index.php?title=Emoji&oldid=210760547) sind kleine Bilder. Sie werden eingesetzt, um Begriffe zu ersetzen.

Ein [Emoji als Favicon](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/#emoji)
ist eine unkomplizierte Variante, ein Favicon mit transparentem Hintergrund zu erstellen, das auch bei kleinen Größen funktioniert.

Wenn du ein Emojis in HTML anzeigen möchtest, kannst du den dezimalen oder hexadezimalen Referenz-Code verwenden. Oder du kopierst das Bild, wenn du es auf einer anderen Website siehst.

Nachfolgend siehst du einen Beispielcode und das Ergebnis im Browser.

Eine Palme kannst du auf drei Arten als Emoji-Favicon verwenden:

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">🌴</text>
</svg>
```

oder

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">&#127796;</text>
</svg>
```

oder

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<text y=".9em" font-size="90">&#x1F334;</text>
</svg>
```

![Cassiopeia Favicon erstellen - Emoji als Favicon](/images/cassiopeia_inkscape8.png)

> Du möchtest gerne wissen, welche Emojis du verwenden kannst? Dann ist die [Emoji-Liste mit HTML-Codes](https://www.getemojis.net/html/#Emoji-Liste) eine mögliche Anlaufstelle.

##### Favicon und Dark Mode<!-- \index{Favicon!Dark Mode} -->

Mit dem [Dark Mode](https://de.wikinew.wiki/wiki/Light-on-dark_color_scheme) können wir unser Display an eine dunkle Umgebung anpassen. Möchtest du, dass im [Dark Mode](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/#dark-mode-support) ein anderes Favicon für deine Website angezeigt wird? In diesem Fall kannst du die Medienabfrage `prefers-color-scheme` verwenden.

Für SVG-Dateien unterstützende Browser bewirkt der nachfolgende Code, dass sich die Sonne in einen Mond verwandelt, wenn der Dark Mode aktiviert wird.

```XML
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
   <style>
    #sun {display:block} #moon {display:none}
    @media (prefers-color-scheme: dark) {
    #sun {display:none} #moon {display:block}
    }
   </style>
   <text id="sun" y=".9em" font-size="90">🌤</text>
   <text id="moon" y=".9em" font-size="90">🌜</text>
</svg>
```

#### Konvertieren von .svg in .ico

Um die Datei input.svg in die Datei favicon.ico zu konvertieren, müssen wir folgendes im Terminal ausführen.

```
convert -background transparent -define icon:auto-resize=16 joomla-favicon.svg favicon.ico
```

Wir haben den Hintergrund transparent und als Symbolgröße 16 Pixel gewählt. Das `ICO`-Dateiformat unterstützt Bilder mit einer Größe von bis zu 256×256 Pixeln.

Du weißt nun, wie du mit Ubuntu unter Verwendung der Pakete Inkscape und Imagemagick eine skalierbare Vektorgrafik (SVG)erstellst und in das `ICO`-Format als `favicon.ico` konvertiert.

#### Das Favicon im Template einbinden

Um dein selbst erstelltes Favicon anstelle des Joomla-Logos im Template Cassiopeia einzusetzen, reicht es aus, die Dateien

- `joomla-favicon.svg`
- `favicon.ico`
- `joomla-favicon-pinned.svg`

im Verzeichnis `templates/cassiopeia/images` abzulegen. Falls du sie nicht schon sofort hier erstellt hast, kopierst du sie in dieses Verzeichnis.

> Nebenbei bemerkt: Auf dies Art kannst du alle Dateien des Verzeichnisses `media/system` überschreiben.

Magst du die Dateinamen umbenennen? Du würdest gerne anstelle von `joomla-favicon.svg` einfach `favicon.svg` und anstelle von `joomla-favicon-pinned.svg` `favicon-pinned.svg` als Dateinamen verwenden? Dann ist es erforderlich, dass du die Aufrufe in der Datei `index.php` des Tempaltes anpasst. Passe die Dateinamen an. Ersetze die nachfolgenden Zeilen

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'joomla-favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

mit

```PHP
...
$this->addHeadLink(HTMLHelper::_('image', 'favicon.svg', '', [], true, 1), 'icon', 'rel', ['type' => 'image/svg+xml']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon.ico', '', [], true, 1), 'alternate icon', 'rel', ['type' => 'image/vnd.microsoft.icon']);
$this->addHeadLink(HTMLHelper::_('image', 'favicon-pinned.svg', '', [], true, 1), 'mask-icon', 'rel', ['color' => '#000']);
...
```

Hinweis: Wenn du die Favicons im Verzeichnis `media/templates/site/cassiopeia/images` speicherst, werden sie bei einem Joomla-Update nicht überschrieben. Genau wie `user.css` ist dies ein einfacher Weg, um kleine Anpassungen vorzunehmen. Beim Update werden die Versionen der Grafiken im Verzeichnis `media/system` aktualisiert, nicht die im Template-Verzeichnis. Wenn du die Namen der Bilddateien änderst und damit die `index.php` des Templates bearbeitest, musst du im Falle eines Updates von Joomla auf der Hut sein. Die Datei `index.php` des Cassiopeia Templates wird dabei überschrieben. Die Lösung: Erstelle zum Beispiel ein Child-Template.

> Hinweis: Der Pfad zu den _Template-Medienordnern_ war vor Joomla 4.1 `templates/cassiopeia/`. Template-Medienordner sind die Ordner `css`, `images`, `fonts`, `js` und `scss`. Ab Joomla 4.1 befinden sich die Dateien im Verzeichnis `media/templates/site/cassiopeia/`.
> <img src="https://vg04.met.vgwort.de/na/380c0b24cb764d9084f0033e5b2704d9" width="1" height="1" alt="">
