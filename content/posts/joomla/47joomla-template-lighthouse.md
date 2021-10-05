---
date: 2021-01-15
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Template - Lighthouse'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-template-lighthouse
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Das Template ist fertig. Nun möchtest du sichergehen, dass es keine Fehler enthält. Dann sieh dir [Lighthouse](https://developers.google.com/web/tools/lighthouse)[^developers.google.com/web/tools/lighthouse] an. Das ist ein Browser-Plugin und ein in Google Chrome entwickeltes Audit-Tool mit dem die Ladezeit einer Internetpräsenz untersucht und optimiert werden kann. Es beachtet neben dem Aufbau von HTML-, CSS- und JavaScript-Dateien auch die Integration von Bildern und die Cache-Vorgaben der Website.<!-- \index{Google Lighthoause} --><!-- \index{Template!Performance, Zugänglichkeit, Accessibility, Bewährte Praxis, SEO,PWA} -->

## Google Lighthouse

Die Lighthouse-Analyse beinhaltet

- Performance - Wie schnell lädt die Website?
- Zugänglichkeit - Beinhaltet die Website Barrieren für bestimmte Menschen oder Geräte?
- Bewährte Praxis - Berücksichtigt die Website moderne Standards?
- Suchmaschinenoptimierung (SEO) - Wie gut ist die Website für Suchmaschinen auslesbar?
- Progressive Web App (PWA) - Bietet die Website Funktionen einer [Web App](https://de.wikipedia.org/wiki/Mobile_App)[de.wikipedia.org/wiki/Mobile_App]?

![Joomla Template erstellen - Page Speed Analyse mit Lighthouse](/images/j4x47x1.png)

Für jedem Bereich wird die Unterstützung in Prozent errechnet.

- 0 - 49 (rot) = schlecht
- 50 bis 89 (gelb) = mittel
- 90 bis 100 (grün) = gut

> Mit Joomla sind 100% in allen Bereichen erreichbar. Ein konkretet Beispiel findests du unter [die-beste-website.de](https://die-beste-website.de/test/lighthouse).

### Google Chrome Webbrowser

Lighthouse ist standardmäßig im Webbrowser Google Chrome enthalten. Öffne die Website die du testen möchtest und aktiviere Lighthouse:

- Klicken mit der rechten Maustaste auf eine beliebige Stelle der Website.
- Wähle _Untersuchen_ aus dem sich nun öffnenden Kontext-Menü.
- Öffne die Registerkarte _Lighthouse_.
- Nutzte die Schaltfläche _Bericht generieren_.

### Gute Voraussetzungen für den Test schaffen

- Führe die Analyse unter einer guten Internetverbindung durch.
- Führe den Test im "Inkognito-Modus" (Datenschutzmodus) aus. Eventuelle Browser-Erweiterungen beeinflussen den Test so nicht.

Die Ergebnisse und Tipps von Lighthouse kannst du zum Verbessern der Website nutzen. Teilweise kommen die [Tipps](https://github.com/GoogleChrome/lighthouse-stack-packs/pull/44/files) direkt aus der Joomla Community.

![Joomla Template erstellen - Page Speed Analyse mit Lighthouse](/images/j4x47x2.png)

### Ergebnisse variieren

Die Ergebnisse der Lighthouse-Analyse variieren zu unterschiedlichen Zeitpunkten und unter unterschiedlichen Bedingungen. Gründe hierfür sind beispielsweise

- die Internetverbindung
- das verwendete Geräten
- Browser-Erweiterungen
- Antiviren-Software

## Links

[Lighthouse](https://developers.google.com/web/tools/lighthouse)[^https://developers.google.com/web/tools/lighthouse]
<img src="https://vg08.met.vgwort.de/na/251f86b31a7c4cb691826d5abb59f824" width="1" height="1" alt="">
