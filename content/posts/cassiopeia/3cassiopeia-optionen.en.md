---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2022-09-01
title: 'Options in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-optionen
langKey: en
categories:
  - Cassiopeia English
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Cassiopeia offers options that are customized via styles in the template manager. To make major changes to the appearance of the template, we need to edit the template files themselves, such as `user.css`, `index.php` or `templateDetails.xml`. In this case, you should ideally create a child template. This is a function that was introduced in Joomla 4.1.

Here I first look at the options for which no changes in the code are necessary and then go into smaller customizations using overrides.
The images attached in this text for illustration were created using the Joomla blog sample files. To have a equal basis, it would be good if you also install them in a test environment. To do this, click the 'Install' button next to Blog sample files in the Dashboard.

![Blog-Beispieldateien installieren](/images/c11.png)

The front-end should now look as shown in the figure below.

![Cassiopeia im Frontend](/images/c12.png)

## Options in detail

First open the view `System | Site Templates Style` in the backend to get to the template options in the Joomla backend.

![Edit Template Style in Backend | Site Templates Style](/images/c2.png)

Then click Cassiopeia in the Style column.

![Edit Template Style in Backend | Open Cassiopeia Style](/images/c3.png)

### Tab Details

![Edit Template Style in Backend](/images/c6.png)

This tab contains information about the template and does not allow any changes.

### Tab Advanced

![Templates Edit Style Administration | Details](/images/c4.png)

This tab shows various parameters that can be used to modify the template. In the following I will have a look at them in detail.

#### Logo, Title and Tagline/Slogan

![Templates Edit Style Administration | Logo, Titel und Tagline/Slogan](/images/ce1.png)

##### Logo

By clicking on 'Select' it is possible to insert an already uploaded logo image or we can scroll down the dialogue box and upload an image file from our own computer. By default, this is placed at the position of the logo module, at the top left of the web page.

The default layout of the Cassiopeia template allows either a logo image **or** the website title to be displayed in the `<header>` area of the page. If we insert a logo via this method, Cassiopeia will automatically make the logo image a link to the home page.

##### Title

If we have not selected a logo file as an image, the template displays the title shown here. If this is also missing, it falls back on the SVG file `logo.svg` in the directory `/templates/cassiopeia/images`. This SVG file contains the text Cassiopeia. No matter whether the title or the SVG file is inserted, both will automatically become a link to the start page.

##### Code in the index.php file

```php
...
...
// Logo file or site title param
if ($this->params->get('logoFile'))
{
	$logo = '<img src="' . Uri::root() . htmlspecialchars($this->params->get('logoFile'), ENT_QUOTES) . '" alt="' . $sitename . '">';
}
elseif ($this->params->get('siteTitle'))
{
	$logo = '<span title="' . $sitename . '">' . htmlspecialchars($this->params->get('siteTitle'), ENT_COMPAT, 'UTF-8') . '</span>';
}
else
{
	$logo = '<img src="' . $templatePath . '/images/logo.svg" class="logo d-inline-block" alt="' . $sitename . '">';
}
...
...
```

#### Tagline - The description of the website

By default, Cassiopeia places the description below the title, or logo. We can use this to display a page title if we want both the logo and the page title to appear at the top of the web page.

##### Example 1

The title is displayed. In a smaller font size, the keyword is displayed below it.

![Edit Template Style in Backend | Title and Tagline](/images/c7.png)

![Template Style View in Frontend | Title and Tagline](/images/c8.png)

##### Example 2

The title is not displayed because an image file is selected as the logo. The tagline, is placed below the image file.

![Edit Template Style in Backend | Image and Tagline](/images/c9.png)

![Template Style View in Frontend | Image and Tagline](/images/c10.png)

#### Fonts Scheme

![Edit Template Style in Backend](/images/ce2.png)

The question of which fonts a site uses has two facets:

- Which font is [legible](https://www.accessibility.com/blog/what-are-accessible-fonts) and looks good?
- Which fonts are technically possible. Technically possible are only the fonts that are installed on a computer or that are available online - the web fonts. On my computer, the font Verdana is installed. I can specify this as the font in a CSS file. This is used on my computer - and on all visitors who have this font installed. For all others, a different font appears. This is the default font of the browser if I have not specified an alternative font.

If I want the default font of the website visitor's browser to be used for my website, then I select 'None' for Font Scheme. If the font is important to me, then I have two options. I use the font Roboto, which is supplied by Cassiopeia and therefore available online via my website, or I load the font from another website. We will look at the advantages and disadvantages in detail in the following sections.

> The exact font used can be read out via the developer tools of a browser. The keyboard shortcuts for Firefox can be found under [Open and close tools](https://developer.mozilla.org/de/docs/Tools/Keyboard_shortcuts).

![Edit Template Style in Backend | Title | Font](/images/c13.png)

##### None

Having no special requirements for the font is the most straightforward.

The disadvantage of not using a special font is, that the appearance of the website is unpredictable.

The following illustration shows that a sans serif is selected as the font.

![Edit Template Style in Backend | No Font](/images/c15.png)

Why is this sans serif font selected? The following rule is in the `template.css`.

```css
...
:root {
...
  --font-sans-serif: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
...
  --body-font-family: var(--font-sans-serif);
...
}
...
body {
  margin: 0;
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: var(--body-line-height);
  color: var(--body-color);
  text-align: var(--body-text-align);
  background-color: var(--body-bg);
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
...
```

The [`font-family` CSS property](https://developer.mozilla.org/de/docs/Web/CSS/font-family) is responsible for loading. It allows you to specify a prioritised list of fonts for an element. These are alternatives. The browser chooses the first font it can load. In the example this is `sans-serif`. `"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial,` are listed before, but are not available in my case.

##### Fonts from a local directory

If you make a font available via your own website, you have reliability with regard to the appearance of the website. Besides, one does not become dependent on a third party provider in terms of data protection.

Compared to loading a web font, the loading time is a disadvantage, because web fonts are usually used by many websites and therefore do not require special loading for a website.

In the following you can see a website loaded with the option 'Fonts from directory'. Roboto is delivered with Joomla. It is the only font that is available in the CMS.

![Edit Template Style in Backend](/images/c14.png)

> Exactly, Roboto is located in the directory `/media/vendor/roboto-fontface`. But that is not important at this point. Webmasters should not use this directory, as it can be changed when the Joomla core files are updated.

If you want to host your own font, you can do so. For example, I would like to use the font 'Aclonica' for all my headings.

1. To do this, I open the website [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com)[^google-webfonts-helper.herokuapp.com] and select the font `Aclonica` in the left-hand area.

![Google Webfonts Helper | Select font](/images/c18.png)

2. at the bottom of the website I have the option of downloading a ZIP file that contains all the necessary font files. I download the file to my computer and unzip it.

3. Next, I copy the files into my Joomla installation. I choose the directory 'media/templates/site/cassiopeia/fonts/aclonica-v11-latin'.

![Google Webfonts Helper](/images/c20.png)

4. if not already done, I create the file `media/templates/site/cassiopeia/css/user.css` and add the following content.

> Note: The path to the _template media folders_ was `templates/cassiopeia/` before Joomla 4.1. Template media folders are the folders `css`, `images`, `fonts`, `js` and `scss`. As of Joomla 4.1, the files are located in the `media/templates/site/cassiopeia/` directory.

```css
...
/* aclonica-regular - latin */
@font-face {
  font-family: 'Aclonica';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('../fonts/aclonica-v11-latin/aclonica-v11-latin-regular.svg#Aclonica') format('svg'); /* Legacy iOS */
}

h1, .h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-family: "Aclonica", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 700;
}
...
```

5. Now I check in the frontend whether everything has worked. Yes, all headings are displayed in the desired font.

![Google Webfonts Helper](/images/c19.png)

![Google Webfonts Helper](/images/c19a.png)

> Of course it is possible to store the fonts in a different place. Then make sure that the addressing in the file `media/templates/site/cassiopeia/css/user.css` fits. Use relative paths if possible. A double dot (..) means that it goes up one folder and then searches for the folder after the slash. If the `user.css` is in the folder `media/templates/site/cassiopeia/css/` and the fonts are in `media/templates/site/cassiopeia/fonts/aclonica-v11-latin/`, then the `..` is correct because I go back one folder to get from `css` to `/fonts`. If the `user.css` is in `media/templates/site/cassiopeia/css/` and the fonts are in `media/templates/site/cassiopeia/css/fonts`, then I use only one dot. Note: The path to the _template media folders_ was `templates/cassiopeia/` before Joomla 4.1. Template media folders are the folders `css`, `images`, `fonts`, `js` and `scss`. As of Joomla 4.1, the files are located in the `media/templates/site/cassiopeia/` directory.

##### Fonts from the web

Using a font that is stored on another server on the Internet involves a dependency. On the one hand, it is possible that the provider will close down his offer. On the other hand, he usually offers the fonts not entirely altruistically. They often collect the data of the users who call up the font.

Fonts are usually integrated in this way because it requires less knowledge. It is not necessary to download the font yourself, make it available via your own web server and integrate it correctly. In addition, a frequently used Google Font is most likely to be in a browser's cache. This has a positive effect on loading times.

The following pictures show the example site with the option 'Fonts from the Web'. The font Fire Sans is used. In the network analysis of the developer tools you can see that the font is loaded from fonts.gstatic.com.

![Edit the template style in the backend](/images/c16.png)

![Edit the template style in the backend](/images/c17.png)

If you want to load your own font without hosting it yourself, you can do so. I show this again with the example where I use the font 'Aclonica' for all my headlines.

> Before downloading fonts from the internet and displaying them on your website, it is necessary to inform yourself about data protection laws.

1. i open the website [Google Fonts](https://fonts.google.com) and and search here [Aclonica](https://fonts.google.com/specimen/Aclonica?preview.text_type=custom&sidebar.open=true&selection.family=Aclonica).

2. i select the font 'Select this style' and click on 'View your selected families' in the upper right corner. all the necessary information is displayed.

![Edit the template style in the backend](/images/c.png)

3. if not already done, I create the file `media/templates/site/cassiopeia/css/user.css` and add the following content.

```css
...
@import url('https://fonts.googleapis.com/css2?family=Aclonica&display=swap');

h1, .h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  font-family: "Aclonica", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 700;
}
...
```

5. Now I check in the frontend whether everything has worked. Yes, all headings are displayed in the desired font.

#### Colour Theme / Template Farbe

Die Template Farbe oder das Farbschema ist nichts anderes als eine (S)CSS-Datei, die CSS-Variablen für das Template festlegt. Cassiopeia enthält zwei Farbschemen:

- Standard: ein Schema, für das die Farben optimiert wurden, damit alles barrierefrei ist.
- Alternative: ein Beispiel für eine benutzerdefinierte Implementierung.

![Edit Template Style in Backend](/images/ce3.png)

Diese Farben sind überschreibbar. Der nachfolgende Code, beispielsweise in der `user.css` verändert die Farben im Frontend.

```css
:root {
  --cassiopeia-color-primary: #ff0000;
  --cassiopeia-color-link: #00ff00;
  --cassiopeia-color-hover: #0000ff;
}
```

Die nachfolgende Ansicht ist nicht schön. Es geht nur ums Prinzip:

![Cassiopeia Frontend Farbscheme](/images/c22.png)

- cassiopeia-color-primary` legt die Hauptfarbe des Templates fest.
- cassiopeia-color-link`gibt die Farbe an, in der Links dargestellt werden. -cassiopeia-color-hover` bestimmt die Farbe, mit der Links beim Überrollen mit der Maus reagieren.

#### Layout

![Edit Template Style in Backend](/images/ce4.png)

Cassiopeia passt sich an Bildschirmgrößen an, egal ob wir uns für ein statisches oder ein fluides Layout entscheiden. Es sind nur unterschiedliche Ansätze.

Container sind das grundlegendste Layout-Element in Bootstrap und werden benötigt, wenn unser Standard-Grid-System verwendet wird. Container werden verwendet, um den Inhalt in ihnen zu enthalten, aufzufüllen und unter Umständen zu zentrieren. Während Container verschachtelt werden _können_, benötigen die meisten Layouts keine verschachtelten Container.

Bootstrap wird mit drei verschiedenen Containern ausgeliefert. Dabei sind die ersten beiden für uns relevant.

- `.container`, der eine `max-width` an jedem responsiven Haltepunkt setzt
- `.container-fluid`, der an allen Haltepunkten eine `Breite: 100%` hat
- `.container-{Breakpoint}`, der bis zum angegebenen Breakpoint `Breite: 100%` ist

Die folgende [Tabelle](https://getbootstrap.com/docs/5.0/layout/containers/) zeigt, wie die `max-width` jedes Containers mit der ursprünglichen `.container` und `.container-fluid` an jedem Haltepunkt zusammen arbeitet.

|                    | Extra klein <576px | Small\≥576px | Medium\≥768px | Large\≥992px | X-Large\≥1200px | XX-Large\≥1400px |
| ------------------ | ------------------ | ------------ | ------------- | ------------ | --------------- | ---------------- |
| `.container`       | 100%               | 540px        | 720px         | 960px        | 1140px          | 1320px           |
| `.container-sm`    | 100%               | 540px        | 720px         | 960px        | 1140px          | 1320px           |
| `.container-md`    | 100%               | 100%         | 720px         | 960px        | 1140px          | 1320px           |
| `.container-lg`    | 100%               | 100%         | 100%          | 960px        | 1140px          | 1320px           |
| `.container-xl`    | 100%               | 100%         | 100%          | 100%         | 1140px          | 1320px           |
| `.container-xxl`   | 100%               | 100%         | 100%          | 100%         | 100%            | 1320px           |
| `.container-fluid` | 100%               | 100%         | 100%          | 100%         | 100%            | 100%             |

Sehen wir uns das nun hier und im [Exkurs: Statisch oder fluid](/cassiopeia-statisch-oder-fluid) im Einzelnen an. Relevant in diesem Zusammenhang ist ebenfalls der [Exkurs: CSS Grid und Bootstrap-5-in-joomla](/css-grid-and-bootstrap-5-in-joomla).

##### Fluid - `.container-fluid`

Fluid ist gut für Seiten, bei denen der Inhalt die volle Breite eines großen Bildschirms einnimmt. Mit Fluid verkleinert sich unsere Seite kontinuierlich, wenn sich das Browserfenster verkleinert. Die Breite der Seitenspalten und der Inhaltsbereich sind alle ein Prozentsatz der Bildschirmbreite und verkleinern sich, wenn das Sichtfenster kleiner wird. Dies funktioniert möglicherweise nicht für alle Inhalte oder für alle Module an der Seite gut.

Ausführlicher gehe ich im [Exkurs: CSS Grid und Bootstrap-5-in-joomla](/css-grid-and-bootstrap-5-in-joomla) darauf ein.

##### Statisch - `.container`

Bei statisch bleiben der Inhaltsbereich und die Seitenspalten in der Mitte großer Monitore auf einer festen Breite. Wenn der Bildschirm schmaler wird, werden die Spalten und der Inhaltsbereich immer schmaler. Bei geringen Bildschirmbreiten stapeln sich schließlich die Elemente übereinander.

#### Sticky Header

![Edit Template Style in Backend](/images/ce5.png)

Diese Option bewirkt, dass der Kopfbereich immer im oberen Teil angezeigt wird. Auch dann, wenn die Seite nach unten gescollt wird.

In der `index.php` ist dies wie folgt implementiert.

```html
... $stickyHeader = $this->params->get('stickyHeader') ? 'position-sticky
sticky-top' : ''; ... ...
<header class="header container-header full-width <?php echo $stickyHeader; ?>">
  <div class="grid-child">
    <div class="navbar-brand">
      <a class="brand-logo" href="<?php echo $this->baseurl; ?>/">
        <?php echo $logo; ?>
      </a>
      <?php if ($this->params->get('siteDescription')) : ?>
      <div class="site-description">
        <?php echo htmlspecialchars($this->params->get('siteDescription')); ?>
      </div>
      <?php endif; ?>
    </div>
  </div>
  ...
</header>
```

Der im nächsten Bild mit dem Pfeil gezeigte Abschnitt bleibt immer im Anezigebereiche.

![Cassiopeia Frontend Sticky Header](/images/c24.png)

#### Back-to-top-Link / „Zurück nach oben“ Link

![Edit Template Style in Backend](/images/ce6.png)

Das Cassiopeia Template bietet die Möglichkeit, einen Pfeil im unteren Bereich einzublenden, über den mit einem Klick der Anzeigebreich nach oben verschiebbar ist.

![Cassiopeia Frontend Back-to-top-Link](/images/c23.png)

## Registerkarte Menüs zuordnen

![Edit Template Style in Backend](/images/c5.png)

Wenn wir für verschiedene Seiten unterschiedliche Templaten verwenden möchten, können wir hier die Seiten auswählen. Natürlich müssen die Seiten bereits in den Menüs vorhanden sein, bevor wir etwas auswählen. Wenn deine Seiten Teil eines Kategorie-Blogs oder einer Kategorie-Liste und kein separater Menüpunkt sind, werden die einzelnen Unterseiten in dieser Liste nicht angezeigt.
<img src="https://vg04.met.vgwort.de/na/8be019b2d0344ce2aa236f90f7f636ef" width="1" height="1" alt="">
