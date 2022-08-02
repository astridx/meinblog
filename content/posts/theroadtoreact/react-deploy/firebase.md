---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'In Firebase veröffentlichen/bereitstellen'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-deploy-firebase
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## In Firebase veröffentlichen/bereitstellen

Wir haben in React eine vollwertige Anwendung erstellt. Der letzte Schritt ist das Teilen dieser mit der Welt --- nachdem du das Programmieren erlernt hast und lauffähige Programme fertigstellst. Wir verwenden Firebase Hosting für die Bereitstellung.

Firebase unterstützt die *Create React App* und die meisten Bibliotheken und Frameworks wie Angular und Vue. Installiere zunächst die Firebase-CLI global:

{title="Command Line",lang="javascript"}
```
npm install -g firebase-tools
```

Die Verwendung der globalen Installation der Firebase-CLI hat den Vorteil, dass es möglich ist Anwendungen ohne Bedenken hinsichtlich der Projektabhängigkeit bereitzustellen. Denke bei jeder global Installation daran, diese aktuell zu halten. Aktualisiere so oft wie nötig mit demselben Befehl:

{title="Command Line",lang="javascript"}
```
npm install -g firebase-tools
```

Wenn du bisher kein Firebase-Konto hast, melde dich für ein [Firebase-Konto](https://console.firebase.google.com/) an und erstelle dort ein neues Projekt. Ordne anschließend die Firebase-CLI dem Firebase-Konto (Google-Konto) hinzu:

{title="Command Line",lang="javascript"}
```
firebase login
```

In der Befehlszeile wird eine URL angezeigt, die du in einem Browser öffnest, oder die Firebase-CLI öffnet sie für dich nachdem du Fragen hinsichtlich Datenschutz beantwortet hast. Wähle ein Google-Konto aus, um ein Firebase-Projekt zu erstellen, und erteile Google die erforderlichen Berechtigungen. Kehre zur Befehlszeile zurück, um eine erfolgreiche Anmeldung zu überprüfen.

Wechsele als Nächstes in den Projektordner und führe den folgenden Befehl aus, mit dem ein Firebase-Projekt für die Firebase-Hosting-Funktionen initialisiert wird:

{title="Command Line",lang="javascript"}
```
firebase init
```

Wähle dann die Option Hosting. Füge weitere Optionen hinzu, um neben Firebase Hosting ein anderes Tool zu verwenden:

{title="Command Line",lang="javascript"}
```
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ? Database: Deploy Firebase Realtime Database Rules
 ? Firestore: Deploy rules and create indexes for Firestore
 ? Functions: Configure and deploy Cloud Functions
-> Hosting: Configure and deploy Firebase Hosting sites
 ? Storage: Deploy Cloud Storage security rules
```

Google sucht nach deiner Anmeldung alle Firebase-Projekte, die mit dem Konto verknüpft sind und zeigt dir diese an. Wähle eines aus, beispielsweise das eben erstellte:

{title="Command Line",lang="javascript"}
```
First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Select a default Firebase project for this directory:
-> my-react-project-abc123 (my-react-project)
i  Using project my-react-project-abc123 (my-react-project)
```

Einige andere Konfigurationsschritte sind erforderlich. Anstatt den Standardordner *public/* zu verwenden, nutzen wir den Ordner *build/* in der *Create React App*. Wähle selbst den passenden Namen für den Build-Ordner aus, wenn du deine Anwendung nicht mithilfe der *Create React App*, sondern mit einem Tool wie Webpack in Eigenregie packst:

{title="Command Line",lang="javascript"}
```
? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? File public/index.html already exists. Overwrite? No
```

React erstellt einen *build/*-Ordner, nachdem wir `npm run build` aufgerufen haben. Dieser enthält den gesamten Inhalt der Ordner *public/* und *src/*. Da es sich um eine [SPA](https://de.wikipedia.org/wiki/Single-Page-Webanwendung) (Single-Page-Webanwendung oder Einzelseitenanwendung) handelt, leiten wir den Benutzer in die Datei *index.html* um, damit der React-Router das clientseitige Routing verarbeitet. Wir überschreiben die Datei nicht.

Deine Firebase-Initialisierung ist abgeschlossen. In diesem Schritt wurden einige Konfigurationsdateien für Firebase Hosting im Ordner deines Projekts erstellt. Weitere Informationen hierzu findest du in der [Firebase-Dokumentation](https://firebase.google.com/docs/hosting/full-config). Stelle jetzt die React-Anwendung mit Firebase über die Befehlszeile bereit:

{title="Command Line",lang="javascript"}
```
firebase deploy
```

Nach einer erfolgreichen Bereitstellung wird dir die Kennung deines Projekts angezeigt:

{title="Command Line",lang="javascript"}
```
Project Console: https://console.firebase.google.com/project/my-react-project-abc123/overview
Hosting URL: https://my-react-project-abc123.firebaseapp.com
```

Besuche beide Seiten, um die Einrichtung zu prüfen. Der erste Link navigiert zum Dashboard deines Firebase-Projekts. Dieses ist nur zugänglich, wenn du angemeldet bist. Hier wird dir ein neues Fenster für das Firebase-Hosting angezeigt. Der zweite Link leitet dich zur bereitgestellten React-Anwendung. Diese ist öffentlich einsehbar.

Wenn dir eine leere Seite angezeigt wird, stellen sicher, dass das Schlüssel-/Wertepaar `public` in der Datei *firebase.json* auf `build` oder den für diesen Ordner ausgewählten Namen festgelegt ist. Stelle außerdem sicher, dass du das Build-Skript für deine React-App mit `npm run build` ausgeführt hast. Lese abschließend den [offiziellen Fehlerbehebungsbereich für die Bereitstellung von Anwendungen zum Erstellen und Reagieren von Apps in Firebase](https://create-react-app.dev/docs/deployment). Wiederhole die Bereitstellung mit `firebase deploy`.

### Exercises

* Lese mehr zum [Firebase Hosting](https://firebase.google.com/docs/hosting/).
* [Verbinde deine Domain mit der Firebase-Anwendung](https://firebase.google.com/docs/hosting/custom-domain).
* Optional: Sieh dir das Angebot von [DigitalOcean](https://m.do.co/c/fb27c90322f3) an, wenn du dich für einen Cloud-Server interessierst. Die Einrichtung ist Mehraufwand. Dafür ermöglicht diese Variante dir mehr Kontrolle. [Ich hoste dort alle meine Websites, Webanwendungen und Backend-APIs bei DigitalOcean](https://www.robinwieruch.de/deploy-applications-digital-ocean/).
<img src="https://vg04.met.vgwort.de/na/8bdb1675e89b4c82ae9bfae86b9c3299" width="1" height="1" alt="">
