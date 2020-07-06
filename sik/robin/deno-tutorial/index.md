---
title: "How to get started with Deno Tutorial"
description: "A comprehensive Deno tutorial for beginners. Learn what makes Deno unique in comparison to Node.js ..."
date: "2020-06-07T09:52:46+02:00"
categories: ["Deno"]
keywords: ["deno", "deno tutorial"]
hashtags: ["#100DaysOfCode", "#Deno"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

Deno ist eine zukunftsweisende Laufzeitumgebung für JavaScript und TypeScript. Ryan Dahl, einer der Entwickler von Node.js, veröffentlichte die erste stabile Deno-Version im Juni 2020. Er verbessert mit Deno Implementierungen, die er als Problem in Node.js ansieht und aus heutiger Sicht damals gerne anders umgesetzt hätte. Deno ist somit eine Node.js-Alternative, die darauf abzielt, erkannte Fehler zu vermeiden. Verwenden Sie Deno ähnlich wie Node.js für serverseitiges JavaScript. Seien wir gespannt: Bald wird sich zeigen, ob Deno heute genauso angenommen wird wie Node.js im Jahr 2009.

# Warum Deno

Ryan Dahl veröffentlichte Deno als Ergänzung zum JavaScript-Ökosystem. Als Ryan Deno zum ersten Mal auf einer Konferenz ankündigte, sprach er über Fehler in Node.js. Das Anschauen des Vortrags (siehe Tipps) erklärt nicht nur Technisches, sondern Menschliches. Node.js ist für das JavaScript-Ökosystem unverzichtbar. Die Laufzeitumgebung wird von Millionen von Menschen verwendet. Dennoch fühlt sich Ryan Dahl bei Entscheidungen, die damals getroffen wurden, unwohl. Jetzt schafft er mit Deno Abhilfe. Er nutzt seine Erfahrung und vermeidet Designfehler von Node.js. Deno ist eine brandneue Laufzeitumgebung für sicheres serverseitiges JavaScript und TypeScript. Es wird von der V8-JavaScript-Engine Rust und TypeScript implementiert.

* Programmier-Sprachen: An JavaScript und TypeScript gibt es nur wenig auszusetzen. Ob Sie Ihre Deno-Anwendung mit der einen oder der anderen Sprache schreiben, ist nur eine Dateierweiterung von Ihnen entfernt. Während TypeScript immer beliebter wird, ist Deno mit erstklassiger TypeScript-Unterstützung die richtige Antwort auf diesen Trend.

* Kompatibilität: Deno zielt auf Webkompatibilität ab. Dies bedeutet, dass eine Anwendung innerhalb von Deno und gleichzeitig in einem Browser funktioniert. Es handelt  sich ja um eine ausführbare JavaScript- (oder TypeScript-) Datei, die im Grunde genommen nicht von der Umgebung abhängig ist. Unter Berücksichtigung dieser Kompatibilität ist Deno mithilfe von modernen JavaScript- und TypeScript-Funktionen zukunftssicher.

* Sicherheit: Deno ist standardmäßig restriktiv. Es findet kein Datei-, Netzwerk- oder Umgebungszugriff statt, der nicht explizit vom Entwickler freigeben wird. Dies schützt vor einer böswilligen Verwendung von Deno-Skripten.

* Standardbibliothek: Deno verfügt über eine Standardbibliothek. Das bedeutet, dass Deno einen größeren Einfluss hat als Node.js. Denn: Deno bietet neben JavaScript viele interne Funktionen. Darüber hinaus verfügt Deno über integrierte Tools, die das Leben und die Arbeit eines Entwicklers vereinfachen und verbessern.

In den folgenden Abschnitten werde ich auf jeden der genannten Punkte detailliert eingehen. Gleichzeitig implementiere ich mit Ihnen eine kleine Deno-Anwendung --- Schritt für Schritt und von Grund auf neu. Darauf aufbauend werden wir mit Deno eine echte Webanwendung weiterentwickeln.

### Tipps, Links & Literatur

* Sehen Sie sich das Video an, in dem [Ryan Dahl seine Gewissensbisse wegen Node.js](https://www.youtube.com/watch?v=M3BM9TB-8yA) erläutert.
* Sehen Sie sich diese [Einführung zu Deno von Ryan Dahl](https://www.youtube.com/watch?v=z6JRlx5NC9E) an.
* Lesen Sie mehr über [Deno](https://deno.land) auf der Projekt-Website.
* Holen Sie sich Ihre Deno-Aufkleber mit diesen [Grafikdateien](https://github.com/kt3k/deno_sticker) und [Stickermule](https://bit.ly/36xs3P6).

# Die Deno-Installation unter MacOS, Windows and Linux

Die Einrichtung einer Deno-Anwendung variiert je nach Betriebssystem und Arbeitsumgebung leicht. Ich verwende Homebrew unter MacOS, um Programme auf meinem Computer zu verwalten. Das ist natürlicherweise keine Voraussetzung. Sie finden den passenden Installationsbefehl für Ihre Arbeitsumgebung in der nachfolgenden Liste. Diese stammt von der Deno-Website. Rufen Sie den Befehl in einem integrierten Terminal oder einer Befehlszeile auf:

```text
Shell (Mac, Linux):
curl -fsSL https://deno.land/x/install/install.sh | sh

PowerShell (Windows):
iwr https://deno.land/x/install/install.ps1 -useb | iex

Homebrew (Mac):
brew install deno

Chocolatey (Windows):
choco install deno

Scoop (Windows):
scoop install deno

Installieren Sie Deno mithilfe der Paketverwaltungssoftware Cargo
cargo install deno
```

Überprüfen Sie, ob Deno korrekt installiert ist, indem Sie sich die Versionsnummer über die Befehlszeile ausgeben lassen. Das folgende Beispiel zeigt ihnen die Ausgabe des Kommandos bei der ersten stabilen Veröffentlichung --- dies ist „deno 1.0.0“. Bitte arbeiten Sie immer mit der aktuellsten Deno-Version. Verwenden Sie den Befehl `deno upgrade` um die Deno-Version zu aktualisieren und `deno --Version` zur Ausgabe der installierten Version:

```text
deno --version
-> deno 1.0.0
```

Rufen Sie als Nächstes eine Deno-Anwendung auf, um zu überprüfen, ob Deno auf Ihrem Computer korrekt arbeitet. Verwenden Sie zu Beginn der Einfachheit halber ein fertiges Programm:

```text
deno run https://deno.land/std/examples/welcome.ts
-> Welcome to Deno
```

Diese Deno-Anwendung gibt den Text „Welcome to Deno„ über die Befehlszeile aus. Mehr passiert nicht. Sie zeigt Ihnen nebenbei, wie eine Deno-Anwendung von einer Remote-Quelle aufgerufen wird. Dabei wird diese im laufenden Betrieb herunterladen und kompilieren. Falls Sie beim Aufrufen der Beispielanwendung oder bei der Installation von Deno Probleme haben, finden Sie weitere Informationen auf der [offiziellen Website von Deno](https://deno.land).

### Tipps, Links & Literatur

* Lesen Sie die [offizielle Deno-Installationsanleitung](https://deno.land/manual/getting_started/installation).
* Lesen Sie mehr zu [IDE-, Editor- und Befehlszeilenintegrationen für Deno](https://deno.land/manual/getting_started/setup_your_environment).

# Hallo Deno

Es hat seine Vorteile, wenn es auch verpönt ist: Jedes Mal, wenn wir als Programmierer etwas Neues lernen, fangen wir mit dem üblichen Beispiel „Hallo Welt“ an. Schreiben wir gemeinsam die erste „Hallo Welt“-Anwendung mit Deno. Legen Sie dazu über die Befehlszeile ein Verzeichnis für Ihr Deno-Projekt an, navigieren Sie danach in dieses und erstellen Sie hier eine neue Datei. Ich habe das Verzeichnis `deno-project` und die Datei `index.js` genannt. Wählen Sie eigene Namen, wenn Ihnen meine zu einfallslos sind:

```text
mkdir deno-project
cd deno-project
touch index.js
```

Öffnen Sie die neu erstellte Datei in einem Editor oder einer IDE. Fügen Sie die folgende Zeile ein und speichern Sie diese:

```javascript
console.log('Hallo Deno');
```

Rufen Sie anschließend die Deno-Anwendung über die Befehlszeile auf. Verwenden Sie dazu die folgende Anweisung --- denken Sie daran, diese anzupassen, falls Sie einen anderen Namen für die Datei gewählt haben:

```text
deno run index.js
-> Hallo Deno
```

Voila! Ihr erstes Deno-Programm ist fertig. Sie haben einen Projekt-Ordner angelegt, eine JavaScript-Datei für die Implementierungsdetails erstellt und diese über Deno in der Befehlszeile aufgerufen. Mehr ist nicht erforderlich.

### Tipps, Links & Literatur

* Informieren Sie sich über [andere Einsteiger-Projekte in Deno](https://deno.land/manual/getting_started/first_steps).
* Folgen Sie dem [Deno Twitter Account](https://twitter.com/deno_land).

# Berechtigungen in Deno

In den folgenden Abschnitten entwickeln wir die "Hallo Welt"-Deno-Anwendung weiter. In diesem sehen wir uns Berechtigungen genauer an. Sicherheit spielt in Deno eine große Rolle. Verdeutlichen wir uns dieses Thema anhand eines Beispiels.

Wenn Sie sich wie ich über technische Themen auf dem Laufenden halten, kennen Sie [Hacker News](https://news.ycombinator.com/). Ich informiere mich jeden Morgen auf dieser Website über die neuesten technischen Nachrichten. Darüber hinaus gibt es eine API für die Hacker News, die ich gerne in meinen Tutorials als Beispiel nutze. Wir werden die API hier ebenfalls verwenden, um Daten abzurufen. Wenn Sie die [Hacker News API](https://hn.algolia.com/api) durchsuchen, nutzen Sie die folgende URL, um Texte zu einem Thema anzufordern --- anstelle der drei Punkte steht das Suchwort:

```text
http://hn.algolia.com/api/v1/search?query=...
```

Wir werden diese URL im Deno-Projekt --- in der Datei *index.js* --- verwenden, um Hacker-Nachrichten über JavaScript abzurufen:

```javascript
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';
```

In Deno ist es möglich, über die fetch-API Netzwerk-Anfragen abzusetzten – so wie im Browser. Verwenden wir im nächsten Beispiel die URL in der fetch-API von Deno. Diese führt eine HTTP-GET-Anforderung aus und gibt ein JavaScript Promis-Objekt zurück. Wandeln Sie dieses in JSON um und geben das Ergebnis aus:

```javascript{3-5}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

fetch(url)
  .then((result) => result.json())
  .then((result) => console.log(result.hits));
```

Wenn Sie JavaScript in Webanwendungen nutzen erkennen Sie, dass wir in der Deno-Anwendung die gleiche Schnittstelle verwenden, die uns die Browser-API bietet. Wie erwähnt, versucht Deno, webkompatibel zu sein. Jede Deno-Anwendung funktioniert beim Aufruf im Browser in gleicher Weise wie über die Befehlszeile. Deno stellt sicher, dass APIs, in clientseitigen JavaScript-Programmen genauso wie in serverseitigen Deno-Anwendungen verfügbar sind.

Rufen Sie die Beispielanwendung jetzt erneut über die Befehlszeile auf:

```text
deno run index.js
```

Ihnen wird der folgenden Fehler von Deno angezeigt:: *"Uncaught PermissionDenied: network access to "http://hn.algolia.com/api/v1/search?query=javascript", run again with the --allow-net flag"*. Dieser Fehler wird ausgegeben, weil Deno standardmäßig eine Erlaubnis für externe Anfragen benötigt. Innerhalb von Deno ist Vieles ohne eine spezielle Berechtigung möglich. Wenn wir den Verantwortungsbereich von Deno verlassen, funktioniert dies nicht. In unserem Beispiel ist es erforderlich, Netzwerkanforderungen über eine Remote-API zuzulassen:

```text
deno run --allow-net index.js
```

Wenn Sie die Deno-Anwendung erneut aufrufen, sehen Sie über die Befehlszeile eine Reihe von Hacker-Nachrichten. Jedes Element in diesem Array enthält Informationen. Um die Lesbarkeit zu verbessern, blenden wir die Eigenschaften aus. Danach ist die Ausgabe übersichtlicher:

```javascript{5-13}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

fetch(url)
  .then((result) => result.json())
  .then((result) => {
    const stories = result.hits.map((hit) => ({
      title: hit.title,
      url: hit.url,
      createdAt: hit.created_at_i,
    }));

    console.log(stories);
  });
```

In diesem Abschnitt haben Sie gelernt, dass Deno standardmäßig eine Erlaubnis für externe Anfragen benötigt. Alles, worauf wir außerhalb von Deno zugreifen, erfordert eine Legitimierung. Das gilt für Netzwerkzugriff oder Dateizugriff. Ohne eine spezielle Freigabe, antwortet Deno mit einer Fehlermeldung.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/init...permissions?expand=1).
* Lesen Sie mehr über [Berechtigungen in Deno](https://deno.land/manual/getting_started/permissions).

# Denos Kompatibilität

Wir haben uns im vorherigen Abschnitt die fetch-API angesehen. Diese wird üblicherweise in clientseitigen Browseranwendungen verwendet. Anstatt mit Deno eine neue API einzuführen, verwenden wir die altbewährte Funktion weiter. Es ist nicht erforderlich, dass wir mit Deno das Rad neu erfinden.

Gleichzeitig hält Deno mit den modernen JavaScript-Funktionen Schritt, unabhängig davon, ob sie clientseitig oder serverseitig verwendet werden. Nehmen wir zum Beispiel die Funktion async/await, welche nur in neueren Node.js-Versionen verfügbar ist. Nicht nur async/await, sondern auch Top-Level-Await --- await, auf höchster Ebene ohne async ---, welche in Node.js nie unterstützt wurde, steht uns mit Deno zur Verfügung:

```javascript{3,5-9,11}
const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const result = await fetch(url).then((result) => result.json());

const stories = result.hits.map((hit) => ({
  title: hit.title,
  url: hit.url,
  createdAt: hit.created_at_i,
}));

console.log(stories);
```

Anstelle der regulären Then- und Catch-Blöcke eines Promise-Objektes verwenden wir Top-Level-Await, um Code synchron auszuführen. Der gesamte Code nach der await-Anweisung wird erst aufgerufen, nachdem die Promise aufgelöst wurde. Wenn diese Implementierung in einer Funktion aufgerufen würde, wäre es erforderlich, dass die Funktion asynchrone Datenabrufe unterstützt. Async/await und Top-Level-Await sind in Deno verfügbar.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/permissions...compatibility?expand=1).
* Überprüfen Sie, ob Sie in Deno Zugriff auf ein `window`-Objekt haben, das normalerweise ausschließlich in einem Browser verfügbar ist.

# Denos Standardbibliothek

Deno bietet von Haus aus eine Reihe von Dienstprogrammfunktionen. Alle zusammen werden als Standardbibliothek bezeichnet. Anstatt alles aus externen Bibliotheken zu importieren, bietet Deno vieles selbst intern an. Probieren wir eine dieser Lösungen aus. Wir richten einen Webserver mithilfe von Deno ein:

```javascript
import { serve } from 'https://deno.land/std/http/server.ts';

const server = serve({ port: 8000 });

for await (const req of server) {
  req.respond({ body: 'Hello Deno' });
}
```

Hier passieren ein paar erwähnenswerte Dinge. Zuerst [importieren](https://www.robinwieruch.de/javascript-import-export) wir `server.ts` aus der Standardbibliothek. Wir verwenden hierzu den eindeutigen Pfad. In Deno geschehen alle Importe über einen absoluten Pfad --- unabhängig davon, ob sie aus der Standardbibliothek oder von einem Drittanbieter stammen. Überzeugen Sie sich selbst von der Tatsache, dass die [http-Bibliothek in der Datei server.ts](https://deno.land/std/http/server.ts) die Funktion `served` beinhaltet. In der ersten stabilen Deno Version finden Sie diese in [Zeile 250](https://deno.land/std/http/server.ts#L250).

`serve` erstellt für uns einen Webserver, auf den wir über einen [Port](https://developer.mozilla.org/de/docs/Glossary/Port) zugreifen --- wir definieren den Port 8000. Die JavaScript Anweisung [for await...of](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for-await...of) verwenden wir daraufhin, um auf jede eingehende Anforderung zu reagieren. Um das Beispiel unkompliziert zu halten, wird bei jedem Aufruf ein Text ausgegeben.

Führen Sie Ihre Deno-Anwendung nach der Implementierung von `serve` erneut aus. Da wir über ein Netzwerk zugreifen, ist eine Freigabe in Form von `--allow-net` vonnöten. Navigieren Sie jetzt in Ihrem Browser zur URL http://localhost:8000:

```text
deno run --allow-net index.js
```
Beide URLs, http://localhost:8000 und http://localhost:8000/ mit einem abschließenden Schrägstrich, funktionieren gleichermaßen. Immer wenn wir eine der URLs im Webbrowser öffnen, wird eine HTTP-GET-Anforderung an die Deno-Anwendung gesendet. Die gibt eine HTTP-Antwort mit dem Text „Hello Deno“ zurück, welcher im Browser angezeigt wird.

So weit so gut --- die grundsätzliche Vorgehensweise ist geklärt! Gestalten wir das Beispiel etwas spannungsvoller: Anstatt einen langweiligen fest codierten Text vom Server (Deno) an den Client (Browser) zu senden, nutzen wir nachfolgend dynamische Daten über eine Schnittstelle. Wir rufen die besten JavaScript-Beiträge der Hacker News ab und zeigen diese im Browser an:

```javascript{3,8,10-14,16}
import { serve } from 'https://deno.land/std/http/server.ts';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map((hit) => ({
    title: hit.title,
    url: hit.url,
    createdAt: hit.created_at_i,
  }));

  req.respond({ body: JSON.stringify(stories) });
}
```
Nach den Änderungen dieses Abschnitts ist die Deno-Anwendung im Browser verwendbar, wenn sie hier aufrufen. Vorher haben wir die Ausgabe einzig und alleine in der Befehlszeile gesehen. Jetzt ist es möglich, über eine Deno-Anwendung die einen Webserver implementiert, Text an einen Client (Browser) zu übergeben. Das letzte Beispiel zeigt eine Übersicht der Hacker News Beiträge im JSON-Format an.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/compatibility...std?expand=1).
* Stöbern Sie in [Denos Standardbibliothek](https://deno.land/std/).

# Bibliotheken in Deno

Es ist unmöglich, dass Deno alle Funktionen abdeckt. Ab und an werden Sie externen Code einbinden, sprich: Bibliotheken eines Drittanbieters. Sehen Sie sich die letzte Ausgabe der Beispielanwendung an. `createdAt` gibt das Datum in einem benutzerunfreundlichen Format aus. Nachfolgend korrigieren wir dies mithilfe der Bibliothek [date-fns](https://deno.land/x/date_fns):

```javascript{2,14-17}
import { serve } from 'https://deno.land/std/http/server.ts';
import format from 'https://deno.land/x/date_fns/format/index.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map((hit) => ({
    title: hit.title,
    url: hit.url,
    createdAt: format(
      new Date(hit.created_at_i * 1000),
      'yyyy-MM-dd'
    ),
  }));

  req.respond({ body: JSON.stringify(stories) });
}
```

Ich hatte es schon erwähnt, ich wiederhole es, weil es wichtig ist: Bibliotheken werden in Deno immer mit einem absoluten Pfad direkt aus dem Web importiert. Dies hat neben der Eindeutigkeit einen weiteren Vorteil. Sie erkennen auf den ersten Blick, wo der Quellcode gespeichert ist. So könnten Sie diesen unkompliziert einsehen. Öffnen Sie dazu im konkreten Fall die [URL https://deno.land/x/date_fns/format/index.js](https://deno.land/x/date_fns/format/index.js) im Browser, und suchen die Funktion `format`. 

Die Funktion `format` erwartet zwei Argumente: ein Datum und eine Formatvorlage. Die Hacker News API sendet das Datum als [Unix-Zeitstempel](https://de.wikipedia.org/wiki/Zeitstempel). Wir konvertieren es zunächst in Millisekunden, bevor wir daraus ein JavaScript-Objekt erstellen. Die Formatvorlage, die wir als zweites Argument für die Funktion angeben, macht das Datum für den Menschen lesbar.

Nachdem Sie Ihre Deno-Anwendung erneut gestartet haben, sehen Sie in der Befehlszeile, dass diese die Formatierungsfunktion aus der Bibliothek sowie alle zusätzlichen Abhängigkeiten herunterlädt. Da wir eine direkte URL zur Funktion verwenden, wird nur dieser Teil der Bibliothek heruntergeladen. Versuchen Sie testweise, den übergeordneten Pfad zu importieren. Setzen Sie anstelle von `import format from 'https://deno.land/x/date_fns/format/index.js';` `import { format } from 'https://deno.land/x/date_fns/index.js';` ein. Sie werden beim Ansehen der Ausgabe der Befehlszeile feststellen, dass daraufhin die gesamte Bibliothek heruntergeladen wird:

```javascript{2}
import { serve } from 'https://deno.land/std/http/server.ts';
import { format } from 'https://deno.land/x/date_fns/index.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  ...
}
```

Eine heruntergeladene Bibliothek wird zwischengespeichert. Sie wird nicht aufs Neue angefordert, wenn die Anwendung wiederholt aufgerufen wird. Jedes Mal, wenn Deno erneut gestartet wird, überprüft es alle Importe, lädt sie --- wenn erforderlich --- herunter und bündelt sie in einer ausführbaren Datei. Das Importieren von Bibliotheken in Deno ist von [Go](https://golang.org/) inspiriert und weicht von Node.js ab: Es ist nicht erforderlich, eine Liste von Abhängigkeiten in einer Datei zu verwalten --- Sie benötigen keine *package.json*. Außerdem ist es nicht erforderlich, dass alle Module in Ihrem Projekt abgelegt sind --- es gibt kein *node_modules* Verzeichnis.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/std...libraries?expand=1).
* Lesen Sie mehr über [Verlinkungen zu externem Code](https://deno.land/manual/linking_to_external_code).
* Entdecken Sie weitere [Deno-Bibliotheken](https://deno.land/x).

# Importieren mit Deno

Sie wissen, dass Importe in Deno über einen absoluten Pfad geschehen. Dieser Ansatz ist von der Programmiersprache Go inspiriert. Er ist sicherer, da der absolute Pfad  eindeutiger ist. Fehler werden vermieden. Im Gegensatz dazu ist es möglich, Quellcode Ihres eigenen Projekts mittels eines relativen Pfads zu importieren.

Probieren wir dies aus! Erstellen Sie zunächst eine zweite Datei in Ihrem Projekt und nennen Sie diese *stories.js*. Speichern Sie *stories.js* im gleichen Verzeichnis wie *index.js* ab. Fügen Sie in *stories.js* den folgenden Code ein:

```javascript{1-10}
import { format } from 'https://deno.land/x/date_fns/index.js';

export const mapStory = (story) => ({
  title: story.title,
  url: story.url,
  createdAt: format(
    new Date(story.created_at_i * 1000),
    'yyyy-MM-dd'
  ),
});
```
Da *stories.js* eine Export-Anweisung beinhaltet, ist es möglich, diese in der Datei *index.js* zu importieren. Der folgende Code zeigt Ihnen, dass und wie der Import relativ möglich ist.:

```javascript{2,11}
import { serve } from 'https://deno.land/std/http/server.ts';

import { mapStory } from './stories.js';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({ port: 8000 });

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map(mapStory);

  req.respond({ body: JSON.stringify(stories) });
}
```

Das war alles Wichtige zum Exportieren und Importieren von Dateien in Deno. Anstatt absolute Pfade zu verwenden, wie zuvor für die Standardbibliothek von Deno oder für externe Bibliotheken, nutzen wir lokal einen relativen Pfad. Unabhängig davon ist es zwingend, die Dateierweiterung mitzugeben. So lassen wir in Bezug auf diese keinen Spielraum für Fehler und Mehrdeutigkeiten.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/libraries...importing?expand=1).

# Testen in Deno

Jedem ist es klar, aber trotzdem wird es oft nicht korrekt gehandhabt: Tests sind keine Nebensächlichkeit beim Programmieren. Um sicherzustellen, dass eine Anwendung funktioniert, sind Tests unverzichtbar. Deshalb ist dieser wichtige Teil in Deno integriert. Wir werden uns dies genauer ansehen, indem wir einen Unit-Test schreiben. Erstellen Sie zunächst im Projektverzeichnis eine Datei mit dem Namen *stories.test.js*. Fügen Sie in diese den folgenden Code ein:

```javascript
import { mapStory } from './stories.js';

Deno.test('maps to a smaller story with formatted date', () => {

});
```

Deno bietet uns eine `test`-Funktion. Mit dieser ist es möglich Tests mit einem Namen,  einer Beschreibung und dem eigentlichen Test-Code zu definieren. Es liegt an uns, den Test im Funktionskörper zu implementieren. Dazu importieren wir zunächst die zu testende Funktion. In unserem Beispiel ist dies `mapStory`, welche im Wesentlichen nur ein Array verwendet. Zurück gibt `mapStory` ein neues Array mit weniger Eigenschaften und einem formatierten Datum. Definieren wir für den Test zwei Listen, eine, die wir in der Funktion `mapStory` verwenden und eine, die wir als Ausgabe --- nach der Verwendung --- erwarten. Nachfolgend zeige ich Ihnen den vollständigen Test-Code:

```javascript{1,6-23}
import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';

import { mapStory } from './stories.js';

Deno.test('maps to a smaller story with formatted date', () => {
  const stories = [
    {
      id: '1',
      title: 'title1',
      url: 'url1',
      created_at_i: 1476198038,
    },
  ];

  const expectedStories = [
    {
      title: 'title1',
      url: 'url1',
      createdAt: '2016-10-11',
    },
  ];

  assertEquals(stories.map(mapStory), expectedStories);
});
```

In der Standardbibliothek von Deno gibt es die Funktion `assertEquals` für den Vergleich von zwei Werten. Der erste Wert ist die konkrete Ausgabe beim Test. Der zweite Wert ist die erwartete Ausgabe. Wenn beide übereinstimmen, ist alles im grünen Bereich. Wenn sie unterschiedlich sind, schlägt der Test fehl und die Anzeige ist rot gefärbt. Führen Sie in der Befehlszeile alle implementierten Tests mit dem Befehl `deno test` aus:

```text
deno test

-> running 1 tests
-> test maps to a smaller story with formatted date ... ok (9ms)

-> test result: ok. (10ms)
-> 1 passed;
-> 0 failed;
-> 0 ignored;
-> 0 measured;
-> 0 filtered out
```

Unser Test ist erfolgreich, die Ausgabe ist grün gefärbt. Mit `deno test` werden alle Dateien mit dem Namensmuster *test.{js,ts,jsx,tsx}* aufgerufen. Es ist möglich, einzelne Dateien mit `deno test <Dateiname>` zu testen. In unserem Fall lautete der Befehl `deno test story.test.js`.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/importing...test?expand=1).
* Lesen Sie mehr zum Thema [Testen in Deno](https://deno.land/manual/testing).
* Haben Sie ausprobiert, was passiert, wenn die Werte nicht übereinstimmen? Falls nicht: Lassen Sie den Test fehlschlagen, indem Sie die erwartete Ausgabe oder die tatsächliche Implementierung in der Datei *stories.js* ändern.

# Deno mit TypeScript

Deno unterstützt JavaScript und TypeScript. Aus diesem Grund ist es zusätzlich wichtig, immer die Dateierweiterung bei Dateiimporte anzugeben - unabhängig davon, ob es sich bei diesen Dateien um relative Importe aus Ihrem Deno-Projekt oder um absolute aus anderen Bibliotheken handelt.

Da Deno TypeScript unterstützt, ist es möglich, die Datei `stories.js` in `stories.ts` umzubenennen. Denken Sie daran, alle Importe - in *index.js* und *story.test.js* - an die geänderte Dateiendung anzupassen.

Die Datei * stories.ts * mit allen Implementierungsdetails erwartet jetzt Typsicherheit und Typisierung. Wir werden Schnittstellen für die Eingabe und Ausgabe bereitstellen. Hierzu implementieren wir die Funktionen `Story` und` FormattedStory`:

```javascript{3-7,9-13,15}
import { format } from 'https://deno.land/x/date_fns/index.js';

interface Story {
  title: string;
  url: string;
  created_at_i: number;
}

interface FormattedStory {
  title: string;
  url: string;
  createdAt: string;
}

export const mapStory = (story: Story): FormattedStory => ({
  title: story.title,
  url: story.url,
  createdAt: format(
    new Date(story.created_at_i * 1000),
    'yyyy-MM-dd'
  ),
});
```

Jetzt ist diese Funktion vollständig. Setzen Sie die Überarbeitung von JavaScript zu TypeScript selbst fort, indem Sie die Datei *stories.test.js* in *stories.test.ts* und die Datei *index.js* in *index.ts* umbenennen. Es ist nicht erforderlich, für alle diese neuen TypeScript-Dateien Typen oder Schnittstellen hinzugefügt. Die meisten werden automatisch abgeleitet.

Nutzen Sie die neue Endung, wenn Sie Ihre Deno-Anwendung erneut aufrufen:

```text{1}
deno run --allow-net index.ts
```

Deno verfügt über eine Standard-TypeScript-Konfiguration. Um diese anzupassen, erstellen Sie eine eigene benutzerdefinierte *tsconfig.json*-Datei. Wie dies funktioniert, erfahren Sie im zweiten Tipp zu diesem Abschnitt. 

TypeScript ist genauso wie JavaScript eine erstklassige Programmiersprache. Entscheiden Sie selbst, welche Endung Sie den Dateien in Ihrem Projekt geben. 

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/test...typescript?expand=1).
* Lesen Sie mehr über [TypeScript in Deno](https://deno.land/manual/getting_started/typescript).

# Umgebungsvariablen in Deno

Umgebungsvariablen eignen sich zum Ausblenden vertraulicher Informationen. API-Schlüssel, Kennwörter oder andere Daten sind nicht für fremde Augen gedacht. Aus dem Grund gibt es die [*.env*-Datei](https://de.wikipedia.org/wiki/Env). Erstellen Sie diese, um vertrauliche Informationen zu verstecken. Beispielhaft nutzen wir eine *.env*-Datei, um den Port unserer Serveranwendung zu übergeben:

```text
PORT=8000
```

In der Datei *index.ts* nutzen wir diese Umgebungsvariable jetzt zusammen mit der Bibliothek eines Drittanbieters. Aus *https://deno.land/x/dotenv/mod.ts* verwenden wir die Funktion `config()`, um den Port aus er Datei `.env` auszulesen:

```javascript{2,9}
import { serve } from 'https://deno.land/std/http/server.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

import { mapStory } from './stories.ts';

const url = 'http://hn.algolia.com/api/v1/search?query=javascript';

const server = serve({
  port: parseInt(config()['PORT']),
});

for await (const req of server) {
  const result = await fetch(url).then((result) => result.json());

  const stories = result.hits.map(mapStory);

  req.respond({ body: JSON.stringify(stories) });
}
```

Die Funktion `config()` gibt ein Objekt mit allen Schlüssel/Wert-Paaren der Datei *.env* zurück. Wir filtern den Integer-Wert des Schlüssels `'PORT'` mithilfe von `parseInt()` und verfügen im Ergebnis über die Port-Nummer. Jetzt ist es nicht mehr notwendig, diese Zahl in den Quellcode einzutragen. Es reicht aus, sie in der Umgebungsvariablendatei vorzuhalten.

Wenn Sie Ihre Deno-Anwendung erneut mit dem bekannten Befehl aufrufen, sehen Sie folgende Fehlermeldung: *"Uncaught PermissionDenied: read access to "/Users/mydspr/Developer/Repos/deno-example", run again with the --allow-read flag"*. Mit dem Parameter `--allow-read` erlauben Sie den Zugriff auf das Dateisystem und die Anwendung läuft fehlerfrei:

```text
deno run --allow-net --allow-read index.ts
```

Wenn Sie Ihren Quellcode veröffentlichen --- beispielsweise auf GitHub ---, ist es wichtig, dass Sie die *.env*-Datei in die *.gitignore*-Datei einfügen, damit deren Inhalt nicht für andere sichtbar ist.

Der Port einer Serveranwendung ist nicht vertraulich. Wir haben diesen verwendet, um etwas über Umgebungsvariablen zu lernen. Wenn Sie sich tiefer in Deno einarbeiten, werden Sie früher oder später auf ein Szenario stoßen, in dem Sie Informationen verarbeiten, die nicht öffentlich im Quellcode stehen dürfen. Greifen Sie dann auf dieses Beispiel zurück.

### Tipps, Links & Literatur

* Reflektieren Sie die [Änderungen gegenüber dem letzten Abschnitt](https://github.com/the-road-to-deno/deno-example/compare/typescript...env?expand=1).
* Lesen Sie mehr [über Umgebungsvariablen in Deno](/deno-environment-variables).
* Fragen Sie sich selbst: Gibt es ein Szenario, in dem Sie Deno einsetzten möchten?
* Optional: Lesen Sie mehr über [Dienstprogramme in Deno](https://deno.land/manual/tools).

<Divider />

# Fazit: gute Aussichten für Deno

Deno ist mit seinen Verbesserungen im Hinblick auf Node.js auf einem sehr guten Weg. An einer Laufzeitumgebung kommt man bei der Entwicklung mit JavaScript nicht vorbei. Das Web ist schnelllebig, es bleibt spannend, was auf uns zukommt. Vielleicht werden wir überrascht und Deno tritt eines Tages an die Stelle von Node.js --- und Sie waren von Anfang an dabei.

Beim Lesen dieses Textes haben Sie alle Grundlagen von Deno kennengelernt. Deno wird in den gleichen Bereichen wie Node.js verwendet --- vom kleinen Skript bis zur vollständigen Serveranwendung. Dabei ist Deno mit seinem Berechtigungssystem sicher implementiert, kompatibel mit vielen clientseitigen APIs, ausgestattet mit modernen Funktionen wie Top-Level-Await und mit JavaScript oder TypeScript verwendbar.

<LinkCollection label="This tutorial is part 1 of 2 in the series." links={[{ prefix: "Part 2:", label: "Getting started with Oak in Deno", url: "/deno-oak" }]} />