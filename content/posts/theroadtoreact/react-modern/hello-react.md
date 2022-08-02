---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'React Grundlagen'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-grundlagen
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---


Im ersten Teil dieses Buches erarbeiten wir gemeinsam die React-Grundlagen. Dabei erstellen wir ein Beispiel-Projekt. Anschließend untersuchen wir neue Aspekte, indem wir reale Funktionen implementieren. Wir gehen genauso vor, wie bei der Entwicklung einer tatsächlichen Webanwendung. Am Ende steht eine fertige React-Applikation mit Funktionalitäten wie clientseitiger und serverseitiger Suche, Remote-Datenabruf und erweiterter Statusverwaltung.

## Hallo React

Single-Page-Webanwendung ([englisch single-page application, kurz SPA](https://de.wikipedia.org/wiki/Single-Page-Webanwendung)) wurden mit Frameworks der ersten Generation wie Angular (von Google), Ember, Knockout und Backbone immer beliebter. Die Verwendung dieser Frameworks erleichterte das Erstellen von Webanwendungen, die über Vanilla JavaScript und jQuery hinausgingen. React, eine weitere SPA, wurde 2013 von Facebook veröffentlicht. Alle genannten SPAs haben gemein, dass sie zum Erstellen von Webanwendungen einzig und alleine mit JavaScript verwendet werden.

Lasse uns für einen Moment in die Zeit zurückgehen, bevor es SPAs gab: Damals wurden Websites und Webanwendungen auf dem Server gerendert. Ein Benutzer öffnet eine URL in einem Browser und fordert dabei ein HTML-Dokument und alle zugehörigen CSS- und JavaScript-Dateien von einem Webserver an. Nach der Übertragung über das Netzwerk sieht der Benutzer den gerenderten HTML-Code im Browser (Client). Jeder zusätzliche Seitenaufruf löst diese Ereigniskette erneut aus. Im beschriebenen Szenario wird alles Wichtige vom Server erledigt. Der Client spielt eine untergeordnete Rolle. In seine Zuständigkeit fällt ausschließlich das Rendern der einzelnen Seiten. Während HTML und CSS zum Strukturieren der Anwendung verwendet werden, wird nur ein wenig JavaScript genutzt, um dynamische Interaktionen (zum Beispiel das Umschalten eines Auswahlfeldes) oder erweitertes Styling (beispielsweise das Positionieren eines Tooltips) zu ermöglichen. Eine beliebte JavaScript-Bibliothek für diese Art von Arbeit war lange Zeit jQuery.

Im Gegensatz dazu verlagert modernes JavaScript den Schwerpunkt vom Server auf den Client. Die extremste Version davon: Ein Benutzer besucht eine URL und fordert ein *minimales HTML-Dokument* und eine *zugehörige JavaScript-Datei* an. Nach der Übertragung über das Netzwerk sieht der Benutzer das *mithilfe von JavaScript gerenderte HTML* im Browser. Ein zusätzlicher Seitenaufruf fordert *keine* weiteren Dateien vom Webserver an. Vielmehr nutzt er das ursprünglich übergebene JavaScript zum Rendern der neuen Ansicht. Jede weitere Interaktion des Benutzers wird auf dem Client abgewickelt. In dieser modernen Version liefert der Server hauptsächlich JavaScript inklusive eines minimalen HTML-Dokuments beim ersten Aufruf über das Netzwerk aus. Die HTML-Datei führt das verknüpfte JavaScript auf der Clientseite aus und rendert so die gesamte Anwendung.

React --- und die anderen SPA-Lösungen --- ermöglichen dies. Im Wesentlichen ist eine Single-Page-Webanwendung JavaScript, welches übersichtlich in Ordnern und Dateien organisiert ist. Das SPA-Framework bietet alle notwendigen Werkzeuge. Die JavaScript-fokussierte Anwendung wird einmal über das Netzwerk an einen Browser gesendet, wenn ein Benutzer die URL der Webanwendung besucht. Von diesem Zeitpunkt an übernimmt React --- oder ein anderes SPA-Framework --- das Rendern aller Elemente im Browser und die Reaktion auf Benutzerinteraktionen.

Mit React wurde das Konzept der Komponenten populär. Jede Komponente beschreibt ihr Erscheinungsbild mit HTML, CSS und JavaScript. Sobald sie definiert ist, ist es möglich, sie innerhalb einer Hierarchie zu verwenden. So wird eine vollständige Anwendung erstellt. Obwohl React den Fokus auf Komponenten legt, ist die JavaScript-Softwarebibliothek flexibel. React verfügt über eine schlanke API, eine stabile und dennoch aufstrebende Erweiterungsbibliothek und eine einladende Community. Wir freuen uns, dich begrüßen zu dürfen :-)

### Übungen

* Lese, [warum ich von Angular zu React wechselte](https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/).
* Informiere dich darüber [wie man ein Framework lernt](https://www.robinwieruch.de/how-to-learn-framework/).
* Lese, [wie man React lernt](https://www.robinwieruch.de/learn-react-js).
* Lerne, [warum Frameworks wichtig sind](https://www.robinwieruch.de/why-frameworks-matter).
* Verschaffe dir einen [Überblick über JavaScript und React](https://www.robinwieruch.de/javascript-fundamentals-react-requirements). Teste so dein Wissen zu verschiedenen in React verwendeten JavaScript-Funktionen.
<img src="https://vg01.met.vgwort.de/na/b44f7e46ab41487bb9d8e6504018ea31" width="1" height="1" alt="">
