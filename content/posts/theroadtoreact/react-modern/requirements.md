---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Voraussetzungen'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-modern-voraussetzungen
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---


Um diesem Buch geistig zu folgen ist es ideal, wenn du mit den Grundlagen der Webentwicklung vertraut bist. Damit meine ich HTML, CSS und JavaScript. Es ist hilfreich, wenn du weißt, was eine [API](https://www.robinwieruch.de/what-is-an-api-javascript/) ist. Eine [Anwendungsschnittstelle](https://de.wikipedia.org/wiki/Programmierschnittstelle) nutzen wir intensiv in der Beispielanwendung.

### Editor and Terminal

Ich habe [eine Anleitung](https://www.robinwieruch.de/developer-setup/) auf meiner Website veröffentlicht, um dir den Einstieg in die allgemeine Webentwicklung zu erleichtern. Für die Bearbeitung der Inhalte dieses Buches benötigst du einen Texteditor (Sublime Text) und ein Befehlszeilenprogramm (iTerm) oder eine IDE (Visual Studio Code,  VS Code). Ich empfehle dir Letzteres, da dieses Programm eine praktische Kombi-Lösung darstellt, die einen erweiterten Editor mit einem Befehlszeilentool vereint. [VS Code](https://code.visualstudio.com/) ist bei Webentwicklern beliebt.

Hier im Buch werde ich meist den Begriff *Befehlszeile* verwenden, der synonym für *Befehlszeilentool*, *Terminal*, *Kommandozeile* und *integriertes Terminal* verwendet wird. Gleiches gilt für die Begriffe *Editor*, *Texteditor* und *IDE*, je nachdem, welche Programme du verwendest.

Optional empfehle ich dir, deine Projekte mit einer Versionsverwaltungssystem zu verwalten --- beispielsweise Github. Ich habe eine [Kurzanleitung](https://www.robinwieruch.de/git-essential-commands/) erstellt, die dir den Einstieg in dieses Werkzeug erleichtert. Github bietet dir eine Versionskontrolle. So hast du immer den Überblick über Änderungen im Quellcode und es ist unkompliziert auf einen Stand zurück zu wechseln. Github ist nebenbei die ideale Möglichkeit, deinen Code später mit anderen zu teilen.

Eine Alternative zur lokalen Installation auf deinem Rechner stellt der Online-Editor [Codesandbox](https://codesandbox.io/) dar. Während Codesandbox ein ausgezeichnetes Tool zum Teilen und Testen von Code ist, ist ein lokales Computer-Setup ein besseres Tool zum Testen und Erlernen verschiedener Möglichkeiten. Wenn du planst, Anwendungen professionell zu entwickeln, ist ein lokales Setup unumgänglich.

### Node.js and NPM

Um mit React zu arbeiten, benötigst du [Node.js](https://nodejs.org/de/) und [npm](https://www.npmjs.com/). Beide Programme verwenden wir zum Verwalten von externen Bibliotheken. Bei diesen handelt es sich um Node-Pakete in Form von kleinen Codeeinheiten oder ganzen Frameworks. Wir installieren sie mithilfe von `npm` (Node Package Manager).

Überprüfe, ob und in welcher Version `Node.js` und `npm` auf deinem Rechner installiert sind. Verwende dazu die Befehlszeile und die Befehle `node --Version` und `npm --Version`:

{title="Command Line",lang="text"}
```
node --version
*vXX.YY.ZZ
npm --version
*vXX.YY.ZZ
```

Wird dir im Terminal angezeigt, welche Version installiert ist? Klasse, dann brauchst du dich hier nicht weiter aufzuhalten. Andernfalls installiere die Programme, bevor du weiterliest. 

Stelle sicher, dass du immer über aktuelle Versionen verfügst. Kennst du die Programme bisher nicht oder wünschst du dir einen kurzen Überblick? Sieh dir meinen [npm-Crashkurs](https://www.robinwieruch.de/npm-crash-course) an.
<img src="https://vg01.met.vgwort.de/na/1b4b351a8a6f45ee90af227c5f36b7f7" width="1" height="1" alt="">