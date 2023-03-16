---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2023-03-16
title: 'Joomla 4 Cassiopeia - Footer and Copyright'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-footer
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











## Copyright-Information im Footer von Joomla

### Ist ein Copyright-Hinweis auf Joomla zwingend?

Das Footer-Modul enthält lediglich die Joomla eigene Copyright-Informationen. Daher hat es einen irreführenden Namen. Es ist ein Relikt aus der ersten Joomla-Version.

Joomla und Cassiopeia sind Open-Source-Software und unter der GNU General Public License (GPL) lizenziert. Joomla kann sowohl für private als auch für kommerzielle Zwecke genutzt und modifiziert werden, sofern der folgende Punkt beachtet wird: 

> Joomla selbst oder Teile davon dürfen nicht unter einem anderen Lizenz-Modell vertrieben oder verkauft werden.

Wenn ich das als juristischer Laie korrekt interpretiere, kann der Copyright-Vermerk geändert werden. Auch die [Joomla License FAQs](https://tm.joomla.org/joomla-license-faq.html)[tm.joomla.org/joomla-license-faq.html] erklärt dies so.

Der Kern und alle im Basispaket von Joomla enthaltenen Erweiterungen unterliegen dieser Lizenz. Zusätzliche Software-Erweiterungen für Joomla können kostenpflichtig sein oder unter anderen Lizen-Modellen vertrieben werden.

Die genauen Bedingungen der GNU GPL sind auf der [GNU Homepage](http://www.gnu.org/licenses/gpl.html)[^gnu.org/licenses/gpl.html] beschrieben. Eine inoffizielle deutsche Version ist auf der [German GNU Site](http://www.gnu.de/documents/gpl.de.html)[^gnu.de/documents/gpl.de.html] zu finden. [Dieser Artikel](http://opensourcematters.org/legal/license-copyright/joomla-license-faq.html)[^opensourcematters.org/legal/license-copyright/joomla-license-faq.html] zeigt die original Joomla-Lizenz auf der Seite von Open Source Matters.

### Ein eigener Copyright-Hinweis auf der Website?

Der Artikel [Der Copyright-Hinweis, Bedeutung, Notwendigkeit, Tipps und Muster](https://drschwenke.de/copyright-hinweis-bedeutung-notwendigkeit-tipps-muster/)[^drschwenke.de/copyright-hinweis-bedeutung-notwendigkeit-tipps-muster/] beschreibt in deutscher Sprache ausführlich die rechtlichen Aspekte zu Copryright und Urheberrecht. Zusammenfassend lese ich daraus, das 

- ein eigener Copyright-Hinweis lediglich ein Fingerzeig auf das Urheberrecht ist. 
- Er ist nicht zwingend für ein Urheberrecht. 
- Wenn man einen Urheberrechtsvermerk platziert, dann sollte er ausführlich und aufklärend sein.

## Ein individueller Copyright-Footer in Joomla

### Erstelle ein Footer-Modul und passe die Sprachstrings an deine Gegebenheiten an

Die nachfolgende einfache Idee entstammt einem [Beitrag im Joomla Magazin](https://magazine.joomla.org/all-issues/february-2022/joomla-4-cassiopeia-template-a-bunch-of-tips-tricks)[^magazine.joomla.org/all-issues/february-2022/joomla-4-cassiopeia-template-a-bunch-of-tips-tricks].

#### Erstelle ein Footer-Modul

- Wechsele zu `Inhalt | Site-Module`.
- Klicke auf die Schaltfläche `Neu`.
- Wähle das Modul vom Typ Footer.
- Wähle einen Titel und die Position Footer aus.
- Bestimme über die Registerkarte Menüzuweisung auf welchen Unterseiten der Footer angezeigt werden soll.
- Speiche das Modul.

#### Sprachstrings anpassen

- Wechsele zu `System | Verwalten | Sprachüberschreibung`.
- Wähle die Sprache, die im Frontend aktiv ist. Im Falle einer Mehrsprachigen Website, müssen die nachfolgenden Schritte für jede installierte Sprache durchgeführt werden.
- Klicke auf `Neu`
- Suche nach den folgenden Sprachstrings: `MOD_FOOTER_LINE1` und `MOD_FOOTER_LINE1`
- Klicke auf das entsprechende Ergebnis
- Ändere den Text wie gewünscht. Wenn du bei deiner Änderung einen Copyright-Hinweis auf deine eigenen Inhalte verwendest, gestalte diesen ausführlich - wie vorher erläutert. 

#### CSS ergänzen

Wenn beide Texte auf großen Bildschirmen nebeneinander stehen sollen, füge das folgende CSS zur Datei `/media/templates/site/cassiopeia/css/user.css` hinzu.

```css
footer div.mod-footer {
    display: block;
}

footer div.mod-footer div {
    margin: 2rem;
}

@media (min-width: 1024px) {
    footer div.mod-footer {
        display: inline-flex;
    }
}
```

> Wenn du lieber mit Flexbox arbeitest, findest du im verlinken Magazin Beitrag ein Codebeispiel.

