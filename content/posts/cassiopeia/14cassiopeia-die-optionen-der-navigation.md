---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-02-19
title: 'Die Einstellmöglichkeiten der Navigation im Joomla 4 Standardtemplate Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-die-optionen-der-navigation
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Das Cassiopeia Standardtemplate ist technisch ausgereift. Es bietet alles was man benötigt. Es gibt eine Navigation die aufklappbare Untermenüpunkte bietet, sie ist barrierefrei und passt sich an unterschiedliche Bildschirmbreiten an. Nebenbei kann man die Hauptanwendungsfälle unkompliziert individuell anpassen. Beispielsweise ein horizontales Menü in der Kopf- und Fußzeile der Website. Wie dies funktioniert ist Thema dieses Abschnitts.<!-- \index{Navigation!Optionen} -->

### Ausgangsituation

Unmittelbar nach der Installation von Joomla 4 findet man im Frontend ein vertikales Menü in der rechten Seitenleiste vor.

![Joomla 4 - Horizontales Menü in der Kopf- und Fußzeile | Erste Ansicht im Fronden](/images/menu_footer_frontend1.png)

In Joomla bearbeitet man dieses Hauptmenü im Administrationsbereich an zwei Stellen.

1. Im Menü-Manager fügt man neue Menüpunkte hinzu.
2. Die Darstellung der Navigation handhabt man über ein Modul im Modul-Manager.

Schwerpunkt dieses Abschnitts ist die gestaltung der Navigation. Deshalb lassen wir den Menü-Manager außen vor. Wir möchten das Menü horizontal präsentieren und werden somit im nächsten Schritt Einstellungen im Site-Modul verändern.

![Joomla 4 - Horizontales Menü in der Kopf- und Fußzeile | Erste Ansicht im Backend](/images/menu_footer_backend1.png)

### Horizontales Menü im Kopfbereich der Website

Öffne über die linke Seitenleiste die Einstellungen zum Modul. Klicke hierzu erst auf `Content` und danach auf `Site-Modules`. Nun siehst du im rechten Bereich den Eintrag `Main-Menü` und öffnest auch diese Ansicht per Klick.

Als erstes siehst du den Tabulator `Module` in welchem du die _Position_ von `sidebar-right` auf `menu` änderst.

![Joomla 4 - Horizontales Menü in der Kopfzeile | Standard Einstellungen des Menüs im Module-Manager](/images/menu_header_module.png)

Wechsel danach in den Tabulator _Advanced (Erweitert)_ und belege die Option _Layout_ mit `Zusammenklappbares Dropdown` oder einfach nur `Dropdown`. Wenn du magst, setzte das `Modul-Tag` auf `nav`.

> Für die Darstellung ist nicht zwingend das `Modul-Tag` auf `nav` abzuändern. Aber: Wenn du dies tust, ist unabhängig von der Darstellung klar, dass der Inhalt eine Navigation ist. Suchmaschinen und Screenreader können so den Text korrekt interpretieren.

![Joomla 4 - Horizontales Menü in der Kopfzeile | Erweiterte Einstellungen des Menüs im Module-Manager](/images/menu_header_advanced.png)

Speichere alles und sieh es dir im Frontend an.

#### Zu den Layouts des Menümoduls:

Es gibt 4 Optionen im Bereich Layout:

2 vom Module

- `Collapsible Default Menu` (Zusammenklappbares Standardmenü): Du kennst diese Variante des Menüus vielleicht unter dem Namen `Hamburger-Menü`. Das Menü wird ohne Untermenüs angezeigt. So kann es unkompliziert auf schmalen Displays angezeigt werden.
- `Default` (Standard): Es wird ebenfalls ohne Untermenüs angezeigt. Wenn Besucher über Mobiltelefone auf Ihre Website zugreifen, sehen sie das Menü in vertikaler Form.

2 von Cassiopeia Template

- `Collapsible Dropdown`(Zusammenklappbares Dropdown): Dieses Menü wird auch als `Hamburger-Menü` bezeichnet. Es wird mit Untermenüs angezeigt und kann auf schmalen Displays erscheinen.
- `Dropdown`: Das Menü wird mit Untermenüs angezeigt. Auf schmalen Displays wird es vertikal angezeigt.

#### Das Aussehen des horizontalen Menüs mit CSS ändern

Eigentlich ist nun in Bezug auf das Kopfmenu alles gut. Wenn du meine Einstellungen bisher nachgestellt hast, dann passt sich das Menü dem Layout der Seite an. Die Standardeinstellungen beispielsweise für Farbe und Schriftart werden übernommen. Das ist gut so. Die Website soll ja in einem abgestimmten Layout daher kommen.

Aber wie das Leben so spielt: Bei allem gibt es Ausnahmen und so möchte man vielleicht auch der Navigation eine individuelle Einstellung hinzufügen. Aus diesem Grund zeige ich dir hier beispielhaft, wie du mit CSS Anpassungen vornimmst. Füge den folgenden Code in die Datei `user.css` ein, wenn du die Schrift im Header-Menü in _Small Caps_ darstellen möchtest, also in verkleinerten Großbuchstaben.

```CSS
.container-header nav {
  font-variant: small-caps;
}
```

> Hinweis: Der Pfad zu den _Template-Medienordnern_ und somit auch zur Datei `user.css`, war vor Joomla 4.1 `templates/cassiopeia/`. Ab Joomla 4.1 befinden sich die Dateien im Verzeichnis `media/templates/site/cassiopeia/`.

![Joomla 4 - Horizontales Menü in der Kopfzeile | Individualisieren mit Styles in der Datei user.css](/images/menu_header_usercss.png)

### Horizontales Menü im Fußbereich der Website

Möchtest du zusätzlich ein Menü in der Fußzeile anzeigen? Ich gehe davon aus, dass du bereits ein Menü mit Menüpunkten für diesen Zweck über den Menü-Manager erstellt hast. Ich habe für dieses Beispiel eines mit dem Namen `Footer Menu De` angelegt und zeige nachfolgend, wie ich dieses horizontal am unteren Rand der Website einrichte. Wir bearbeiten wieder lediglich das Site-Module, welches für die Anzeige des Menüs verantwortlich ist. Das Anlegen des Menüs ist hier nicht das Thema.

Öffne über die linke Seitenleiste den Site-Modul-Manger. Klicke hierzu erst auf `Content` und danach auf `Site-Modules`. Nun siehst du im oberen Bereich die Schaltfläche `New`. Klicke auf `New`, um ein neues Site-Modul vom Typ _Menu_ anzulegen.

Als erstes siehst du den Tabulator `Module` in welchem du die _Position_ `footer` auswählst. Ohne weiteres werden Untermenüpunkte auf dieser Position nicht unterstützt. In der Regel möchte man dies im Fußmenü auch nicht. Zwingend ist das Deaktivieren der _Submenu items_ nicht, um Verwirrung zu vermeiden empfiehlt es sich aber in meinem Augen.

![Joomla 4 - Horizontales Menü in der Fußzeile | Standard Einstellungen des Menüs im Module-Manager](/images/menu_footer_module.png)

Wechsel danach in den Tabulator _Advanced (Erweitert)_ und

- trage die Klasse `menu-horizontal` als _Menu Class_ ein
- belege die Option _Layout_ mit `Dropdown` und
- setzte das _Modul-Tag_ auf `nav`.

![Joomla 4 - Horizontales Menü in der Fußzeile | Erweiterte Einstellungen des Menüs im Module-Manager](/images/menu_footer_advanced.png)

Vergiß nicht, alle Änderungen zu speichern.

### Änderungen im Frontend überprüfen

Jetzt gehen wir zurück zu Ihrer Joomla-Seite und sehen uns die Menüs an.

![Joomla 4 - Horizontales Menü in der Kopf- und Fußzeile | Ansicht im Frontend](/images/menu_header_frontendview.png)

