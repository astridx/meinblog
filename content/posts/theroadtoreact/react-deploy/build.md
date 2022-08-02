---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Veröffentlichen/Bereitstellen einer React-Anwendung'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-deploy-build
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

# Veröffentlichen/Bereitstellen einer React-Anwendung

Jetzt ist es Zeit, dass du deine Anwendung der Welt zeigst. Es gibt viele konkurrierende Anbieter, die diesen Service bieten. Ich werde es hier unkompliziert halten, indem ich die Beschreibung eingrenzen. Ich erläutere dir, wie du die Anwendung auf einem lokalen Server veröffentlichst. Wähle danach einen Provider und passe meine Erklärungen gegebenenfalls an.

## Erstellungsprozess (Build Prozess)

Alles, was wir bisher bearbeitet haben, wird in einem echten Projekt der *Entwicklungsphase* zugeordnet. Entwickelt wird in einer speziell für die Entwicklung eingerichteten Umgebung. In unserem Fall war es so, dass wir alle Dateien auf dem lokalen Computer über einen integrierten Server bereitstellten und über localhost die Anwendung aufriefen. Daher ist der Code bisher für niemanden anderen verfügbar.

Der nächste Schritt ist, die Anwendung in die *Produktionsphase* zu überführen. Dazu wird diese auf einen Remote-Server verschoben und so für andere Benutzer zugänglich. Bevor eine Anwendung veröffentlicht wird, ist es erforderlich, dass sie speziell hierfür zusammengestellt oder gebündelt wird. Redundanter Code, Testcode und Duplikate werden entfernt. Außerdem gibt es einen Prozess, der die Codegröße weiter reduziert, die Minifizierung.

Glücklicherweise übernehmen die Build-Tools der *Create React App* die Optimierung und Verpackung --- das Bündeln. Erstelle zunächst die Anwendung für die Veröffentlichung über die Befehlszeile:

{title="Command Line",lang="text"}
```
npm run build
```

Dadurch wird ein neuer Ordner *build/* im Projekt erstellt. Kopiere diesen auf deinen Webspace bei einem Hosting-Anbieter um ihn öffentlich bereitzustellen. Wir simulieren das, indem wir einen lokalen Server verwenden. Installiere hierzu einen HTTP-Server auf deinem Computer:

{title="Command Line",lang="text"}
```
npm install -g http-server
```

Stelle im nächsten Schritt deine Anwendung über diesen lokalen HTTP-Server bereit:

{title="Command Line",lang="text"}
```
http-server build/
```

Oder: Fasse die beiden vorherigen Schritte zu einem einzigen Befehl zusammen:

{title="Command Line",lang="text"}
```
npx http-server build/
```

Jetzt wird dir über die Befehlszeile eine URL angezeigt, die den Zugriff auf die optimierte, gepackte und gehostete Anwendung ermöglicht. Es handelt sich hierbei um eine lokale IP-Adresse, die über das Netzwerk verfügbar ist. Dein Computer ist im Prinzip der Webserver.
<img src="https://vg04.met.vgwort.de/na/f1214cbe34024350a5d2153649c185a8" width="1" height="1" alt="">
