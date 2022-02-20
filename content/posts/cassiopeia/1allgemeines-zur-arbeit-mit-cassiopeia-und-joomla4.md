---
description: 'desc'
shortTitle: 'short'
date: 2022-02-14
title: 'Allgemeines zu Joomla und Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: allgemeines-zur-arbeit-mit-cassiopeia-und-joomla4
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Jeder Mensch hat seine Vorlieben. Ein Content Management System wie Joomla, kann nicht jede dieser Vorlieben erfüllen. Viele Funktionen werden so angeboten, wie es für die meisten Menschen gut ist. Bei der Arbeit mit Cassiopeia und Joomla gibt es Dinge, die man individuell für sich erweitern oder einstellen kann.

## Praxistipps

## Joomla Login- und Logout-Menüpunkte umschalten

Nachfolgend zeige ich dir, wie man einen Login-Menüpunkt erstellen, der nur Benutzern angezeigt wird, die noch nicht eingeloggt sind. Sobald sie sich angemeldet haben, sehen sie stattdessen den Menüpunkt "Logout". Also: Wie richtet man Login- und Logout-Links in Joomla so ein, dass der Menüpunkt Login automatisch durch Logout ersetzt wird, sobald sich jemand eingeloggt hat, und umgekehrt?

### Login-Link

Zuerst erstellen wir den Login. Öffne dazu den Menümanager über die linke Seitenleister. Öffne `Menus | All Menu Items` und klicke in der Werkzeugleiste die Schaltfläche `New` um einen neuen Menüpunkt zu erstellen. Wähle für den Menüpunkt den Typ `User | Login Form`. Außerdem ist wichtig, dass du für den Zugriff die voreingestellte Gruppe `Public` in `Guest` änderst. Dies bewirkt, dass der Menüpunkt nur _nicht_ angemeldeten Benutzern angezeigt wird. Wähle alle anderen Einstellungen so, wie es für deine Umgebung passt und speichere den Menüpunkt.

![Login - Logout | Login-Link erstellen](/images/login_logout1.png)

### Logout-Link

Als nächstes erstellen wir den Logout-Link. Du befindest dich noch im Menümanager, richtig? Anderfalls öffne diesen über `Menus | All Menu Items` in der linken Seitenleiste. Im Menümanger klicke in der Werkzeugleiste erneut die Schaltfläche `New` um einen neuen Menüpunkt zu erstellen. Wähle für den Menüpunkt den Typ `User | Logout`. Außerdem ist wichtig, dass du für den Zugriff die voreingestellte Gruppe `Public` mit `Registert` ersetzt. Dies bewirkt, dass der Menüpunkt nur angemeldeten Benutzern angezeigt wird. Wähle alle anderen Einstellungen so, wie es für deine Umgebung passt und speichere den Menüpunkt.

![Login - Logout | Logout-Link erstellen](/images/login_logout2.png)

### Teste die Links

Abschließend testen wir, ob alles richtig funktioniert. Siehst du den Login-Menüpunkt, wenn du die Website aufrufst? Ist gleichzeitig der Logout-Menüpunkt ausgeblendet? Erscheint der Logout-Menüpunkt, wenn man eingeloggt ist? Verschwindet nach dem erfolgreichen Anmelden der Login-Menüpunkt?

Funktioniert das Umschalten nicht wie erwartet? Überprüfe in dem Fall eine Einstellung in der globalen Konfiguration. Klicke dazu in der linken Seitenleiste `System` und dann im rechten Bereich den Link `globale Konfiguration`. Stelle sicher, dass `Guest User Group` mit `Gast` belegt ist.

![Login - Logout | Option Gast Gruppe](/images/login_logout3.png)

## Editor Switcher / Syntax Highlight (Syntax-Hervorhebung)<!-- \index{Editor!Syntax-Hervorhebung} --><!-- \index{Editor!Switcher} --><!-- \index{Editor!Syntax Highlight} -->

Joomal bietet von Haus aus eine Reihe unterschiedlicher Editoren. Jeder Editor bietet Vorteile, hat gleichzeitig allerdings auch Nachteile. Unter Umständen möchte man gar keinen Edtor verwenden.

Wenn ich im Joomla Backend Artikel Texte schreibe, dann verwende ich gerne den [TinyMCE](https://www.tiny.cloud/), weil dieser eine Werkzeugleiste bietet, mit deren Hilfe ich einfache Formatierungen vornehmen kann. Gleichzeitig möchte ich mir gerne den HTML-Quellcode mit Syntax-Highlighting ansehen. Das macht es viel einfacher, alle HTML-Tags und CSS-Klassen zu lesen. Das Markup wird übersichtlich dargestellt. Syntax-Highlighting ist im [Codemirror](https://codemirror.net/)[^https://codemirror.net/] umgesetzt. Der TinyMCE bietet dies unter Joomla Anfang 2022 nicht.

Den Editor kann man in der globalen Konfiguration einstellen. Alternativ kann man ihn für einen Benutzer im Benutzer Manager individuell festlegen. Während der Eingabe eines Artikeltextes ist der Wechsel in die globale Konfiguration oder den Benutzermanager umständlich. Deshalb liebe ich das Plugin [Editor Switcher von Bakual](https://github.com/Bakual/editors_switcher)[^https://github.com/bakual/editors_switcher].

Nach der Installation und Aktivierung, stelle ich bei meinem Benutzer den Switcher als Standard-Editior ein.

![Editor Switcher | Edit Style im Joomla Administrationsbereich](/images/switcher_backend_user.png)

Daraufhin ist es während des Schreibens eines Textes im Artikel Manager möglich, den Editor zu wechseln. Ein wechseln in einen anderen Konfigurationsbereich ist nicht erforderlich. Lediglich ein Zwischenspeichern ist notwendig.

![Editor Switcher | Edit Style im Joomla Administrationsbereich](/images/switcher_backend_article.png)

### Seit Joomla 4.1

Seit Februar 2022, also ab Joomla 4.1, ist Code im integrierten TinyMCE-Editor mit Syntax-Highlighting versehen. Darüber hinaus kann direkt in der HTML-Code-Ansicht gesucht und ersetzt werden.

Syntax-Highlighting im integrierten TinyMCE-Editor

![Editor Switcher | Syntax-Highlighting im integrierten TinyMCE-Editor](/images/switcher_backend_new1.png)

Editor Schaltfläche zum Anzeigen

![Editor Switcher | Syntax-Highlighting im integrierten TinyMCE-Editor | Editor-Schaltfläche zum Anzeigen](/images/switcher_backend_new2.png)

Option zum Aktivieren der Editor Schaltfläche

![Editor Switcher | Syntax-Highlighting im integrierten TinyMCE-Editor | Option zum Aktivieren der Editor-Schaltfläche](/images/switcher_backend_new3.png)

## Joomla Barrierefreiheit <!-- \index{Barrierefreiheit} --><!-- \index{Zugänglichkeit} --><!-- \index{Accessibility} --><!-- \index{a11y} -->

Deutlich zu sehen: Joomla 4 wurde mit Blick auf Barrierefreiheit entwickelt. Beide Standard-Templates, Frontend und Backend, sind zugänglich und entsprechen der Stufe AA der [WCAG 2.1](https://www.w3.org/TR/WCAG21/)[^w3.org/tr/wcag21/]. WCAG 2.1 ergänzt die WCAG 2.0 und ist der Webstandard für digitale Zugänglichkeit, der für öffentliche Einrichtungen in der Europäischen Union verbindlich ist.

### Grundlagen

#### Was ist Barrierefreiheit?

Die Richtlinien der WCAG 2.0 sind technische Regeln. Eine Website gilt als zugänglich, wenn sie diesen Regeln entspricht.

Als Websitebetreiber ist es sinnvoll, bereits in der Planungsphase zu entscheiden, ob die Website zugänglich sein soll. Das System, das man für die Erstellung der Website-Anwendung wählt, sollte in Bezug auf a11y unterstützen. Joomla bietet in diesem Zusammenhang gute Voraussetzungen.

#### Warum ist die Barrierefreiheit einer Website wichtig?

Barrierefreiheit ist aus vielen Gründen wichtig. Behörden auf der ganzen Welt drängen darauf, dass Online-Inhalte für alle zugänglich sind.

Aber: In erster Linie geht es bei der Barrierefreiheit um Werte und die Gleichbehandlung aller Menschen. Es geht darum, dass Menschen mit Behinderungen sich nicht auf andere verlassen müssen, um einfache Dinge wie das Lesen einer Website zu erledigen.

Darüber hinaus ist eine barrierefreie Website auch für Maschinen leichter auszulesen. So kann beispielsweise eine Suchmaschine den Inhalt leichter lesen und korrekte Suchergebnisse anbieten, wenn der Inhalt zugänglich ist.

### Wie aktiviert man die Zugänglichkeitsfunktionen in Joomla

Es gibt integrierte Zugänglichkeits-Plugins _Joomla Accessibility Checker_ und _Additional Accessibility Features_, Man kann sie im Plugin-Manager aktivieren.

#### System-Plugin - Joomla Zugänglichkeitsüberprüfung

Das System Plugin _Joomla Accessibility Checker_ hebt häufige Probleme der Zugänglichkeit und Benutzerfreundlichkeit visuell hervor. Das Plugin, das sich an Autoren von Inhalten richtet, identifiziert Fehler oder Warnungen und gibt Hinweise, wie diese behoben werden können.

Wenn du die erste Option aktivierst, wird der Zugänglichkeits-Checker auf allen Seiten geladen. Dies ist nützlich bei der Entwicklung der Website, sollte aber nicht aktiviert bleiben, wenn die Website live ist.

![System Plugin - Joomla Accessibility Checker | Plugin Einstellungen](/images/c_a11y_1.png)

Du kannst die Zugänglichkeit des Inhalts über eine Schaltfläche in der Symbolleiste überprüfen, wenn du einen Beitrag erstellest.

![System Plugin - Joomla Accessibility Checker | Überprüfung der Barrierefreiheit beim Erstellen eines Beitrags](/images/c_a11y_1_1.png)

Wenn wir mehrere Artikel nacheinander prüfen wollen, ist es bequemer, im Frontend zu arbeiten. Dies ist über einen Button im unteren rechten Bereich möglich.

![System Plugin - Joomla Accessibility Checker | Überprüfen Sie die Barrierefreiheit im Frontend](/images/c_a11y_1_2.png)

> Projekt-Website und Demo ansehen [joomla-projects.github.io/joomla-a11y-checker/](https://joomla-projects.github.io/joomla-a11y-checker/).

#### System Plugin - Zusätzliche Funktionen für Barrierefreiheit

Dieses Plugin fügt der Website eine Symbolleiste für Barrierefreiheit mit zusätzlichen Optionen für Barrierefreiheit hinzu. Sobald es aktiviert ist, kann die Symbolleiste geöffnet werden. Du kannst wählen, wo du die Barrierefreiheits-Symbolleiste anzeigen möchten: Sie kann entweder im Joomla-Backend, im Frontend oder in beiden aktiviert werden.

![System-Plugin - Zusätzliche Zugänglichkeitsfunktionen | Plugin-Einstellungen](/images/c_a11y_2.png)

Dieses Plugin fügt der Website eine Symbolleiste mit zusätzlichen Optionen für die Barrierefreiheit hinzu. Sobald es aktiviert ist, wird das Symbol für Barrierefreiheit in der linken unteren Ecke jeder Seite der Website angezeigt. Klicke auf das Symbol, um die zusätzlichen Zugänglichkeitsfunktionen zu nutzen.

![System-Plugin - Zusätzliche Eingabehilfen | Eingabehilfen-Symbol in der linken unteren Ecke jeder Seite](/images/c_a11y_2_1.png)

Dieses Plugin bietet dem Benutzer eine Reihe von Möglichkeiten, darunter

- Vergrößern der Textgröße
- Verkleinern der Textgröße
- Vergrößern des Textabstandes
- Textabstand verkleinern
- Farben invertieren
- Grautöne
- Links unterstreichen
- Großer Cursor
- Lesehilfe
- Text in Sprache.

![System-Plugin - Zusätzliche Funktionen für Barrierefreiheit | Symbolleiste geöffnet](/images/c_a11y_2_2.png)
