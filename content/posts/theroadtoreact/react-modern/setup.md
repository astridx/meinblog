---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Einrichten eines React-Projekts'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-project-einrichten
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## Einrichten eines React-Projekts

In diesem Buch verwenden wir die [Create React App](https://github.com/facebook/create-react-app), um unsere Anwendung einzurichten. Es handelt sich um ein, von Facebook im Jahr 2016 eingeführtes, Starter-Kit für React. Tools wie Webpack oder Babel sind installiert und konfiguriert. Ich empfehle dir, die *Create React App* zu verwenden und deinen Fokus auf der Implementierung der Anwendung zu legen.

Öffne die Befehlszeile, nachdem du *Node.js* und *npm* installiert hast. Lege danach ein Verzeichnis für dein Beispielprojekt an und wechsele in dieses. Ich werde das Projekt *hacker-stories* nennen. Wähle du den gleichen oder einen beliebigen anderen Name. Passe bei Letzterem den folgenden Befehl an deine Namenswahl an:

{title="Command Line",lang="text"}
```
npx create-react-app hacker-stories
```

Navigiere nach Abschluss des Setups in den neuen Ordner:

{title="Command Line",lang="text"}
```
cd hacker-stories
```

Öffne jetzt die Anwendung in einem Editor oder einer IDE oder, gib `code .` in die Befehlszeile ein, wenn du *Visual Studio Code* nutzt. Du siehts die folgende Ordnerstruktur:

{title="Project Structure",lang="text"}
```
hacker-stories/
--node_modules/
--public/
--src/
----App.css
----App.js
----App.test.js
----index.css
----index.js
----logo.svg
----serviceWorker.js
----setupTests.js
--.gitignore
--package-lock.json
--package.json
--README.md
```

Dies sind die wichtigsten Ordner und Dateien:

* **README.md:** Die Erweiterung *.md* gibt an, dass es sich bei der Datei um eine Markdown-Datei handelt. Markdown ist eine Markup-Sprache mit Textformatierungssyntax. Viele Projekte werden mit einer *README*.md-Datei veröffentlicht. Diese enthält Anweisungen und nützliche Informationen. Wenn wir Projekte auf Plattformen wie GitHub übertragen, zeigt die Datei *README.md* normalerweise Informationen zu den Inhalten an, die in den Repositorys enthalten sind. Da wir die *Create React App* verwendet haben, ist die *README.md* mit dem offiziellen GitHub-Repository [Create React App](https://github.com/facebook/create-react-app) identisch.
* **node_modules/:** Dieser Ordner enthält alle Node.js-Pakete, die über npm installiert wurden. Da wir die *Create React App* verwendeten, sind bereits einige Node.js-Module installiert. Wir werden diesen Ordner nicht selbst verändern. Node.js-Pakete werden normalerweise mit npm über die Befehlszeile installiert und deinstalliert.
* **package.json:** Diese Datei beinhaltet eine Liste der abhängigen Node.js-Pakete und andere Projektkonfigurationen.
* **package-lock.json:** Diese Datei ist wichtig für npm. Sie beschreibt, welches Paket mit welcher Version erforderlich ist. Wir werden sie hier im Buch nicht verändern.
* **.gitignore:** Diese Datei zeigt alle Dateien und Ordner an, die bei Verwendung von Git nicht zum Git-Repository hinzugefügt werden, da diese nur im lokalen Projekt wichtig sind. Der Ordner *node_modules/* ist ein Beispiel. Es reicht aus, die Datei *package.json* für andere freizugeben. So werden diese Abhängigkeiten mit `npm install` installiert.
* **public/:** Dieser Ordner enthält Dateien wie *public/index.html*. Die Indexdatei wird unter der Adresse *localhost:3000* angezeigt. Das Standard-Setup behandelt eine *index.html*-Datei mit dem gesamten JavaScript des Verzeichnisses *src/*.

Am Anfang findest du alles, was du brauchst, im Ordner *src/*. Das Hauptaugenmerk liegt auf der Datei *src/App.js*. Diese implementiert eine React-Komponente. Später teilst du deine Anwendung in mehrere Module auf.

Zusätzlich findest du die Dateien *src/App.test.js* für deine Tests, *src/index.js* als Einstiegspunkt in die React-Welt sowie *src/index.css* und  *src/App.css* zum Stylen. In späteren Abschnitten wirst du diese Dateien näher kennenlernen.

Nachdem du die Ordner- und Dateistruktur deines React-Projekts angesehen hast, verschaffen wir uns einen Überblick über die verfügbaren Befehle. Alle projektspezifischen Befehle findest du in der Datei *package.json* im Bereich *scripts*:

{title="package.json",lang="javascript"}
```
{
  ...
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
}
```

Diese Skripte werden mit dem Befehl `npm run <script>` über die Befehlszeile aufgerufen. `run` ist nicht immer notwendig --- beispielsweise bei `start` und `test`:

{title="Command Line",lang="text"}
```
# Runs the application in http://localhost:3000
npm start

# Runs the tests
npm test

# Builds the application for production
npm run build
```

Den Befehl `eject` lassen wir hier außen vor. Sobald du `eject` einmal aufgerufen hast, gibt es kein Zurück mehr. Im Wesentlichen ist dieser dazu da, das gesamte Build-Tool und die Konfiguration der *Create React App* zu löschen, falls du mit den standardmäßig gesetzten Einstellungen nicht zufrieden bist. Für die Übungen im Buch werden wir alle Standardeinstellungen beibehalten.

### Übungen:

* Verschaffe dir einen Überblick über die Dokumentation der [Create React App](https://github.com/facebook/create-react-app) und die [Erste-Schritte-Anleitung](https://create-react-app.dev/docs/getting-started).
  * Lese mehr über [die unterstützten JavaScript-Funktionen in der Create React App](https://create-react-app.dev/docs/supported-browsers-features).
* Lese mehr über die [die Ordnerstruktur in der Create React App](https://create-react-app.dev/docs/folder-structure).
  * Sieh dir nacheinander alle Ordner und Dateien deines React-Projekts an.
* Lese mehr über [die Skripte in der Create React App](https://create-react-app.dev/docs/available-scripts).
  * Rufe die React-Anwendung mit `npm start` in der Befehlszeile auf und sieh dir die Ausgabe im Browser an.
    * Beende den Befehl in der Befehlszeile, indem du "Strg + C" klickst.
  * Führe das Skript `npm test` aus.
  * Rufe das Skript `npm run build` auf und stelle sicher, dass dem Projekt ein Ordner *build/* hinzugefügt wurde (entferne ihn anschließend wieder). Beachte, dass der Build-Ordner später verwendet wird, um [deine Anwendung zu veröffentlichen](https://www.robinwieruch.de/deploy-applications-digital-ocean/).
* Überprüfe jedes Mal, wenn wir etwas in unserem Code ändern, die Ausgabe in deinem Browser.
<img src="https://vg01.met.vgwort.de/na/930ba8aab1514b4dbe976e89b208a411" width="1" height="1" alt="">
