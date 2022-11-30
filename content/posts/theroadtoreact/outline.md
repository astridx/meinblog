# Ausblick

Wir sind am Ende von *Der Weg zu React* angekommen. Ich hoffe, du hattest Vergnügen beim Lesen und hast dir dabei gleichzeitig die Grundlagen zum Arbeiten mit React angeeignet. Wenn dir das Buch gefallen hat, freue ich mich, wenn du es mit deinen Freunden teilst --- insbesondere mit denen, die wie du an React interessiert sind. Eine konstruktive Rezension hilft mir, in Zukunft bessere Inhalte basierend auf deinem Feedback anzubieten.

Von hier aus empfehle ich dir, die Beispiel-Anwendung zu erweitern. Erstelle dein eigenes React-Projekt bevor du ein weiteres Buch, einen anderen Kurs oder ein zusätzliches Tutorial in Angriff nimmst. Probieren das Gelernte eine Woche lang aus und teile es mit anderen, indem du es zum Beispiel auf Github veröffentlichst. Wende dich gerne an mich oder andere. Ich bin immer daran interessiert zu sehen, was meine Leser entwickelt haben und wie ich sie bestmöglich unterstütze.

Nachdem du die Grundlagen beherrschst, empfehle ich dir das Folgende um deine Anwendung und dein Wissen sinnvoll zu erweitern:

* **Herstellen einer Verbindung zu einer Datenbank und/oder Authentifizierung:** In wachsenden React-Anwendungen sind persistente Daten in der Regel unumgänglich. Die Daten werden in der Regel in einer Datenbank gespeichert, damit sie nach dem beenden einer Browsersitzung erhalten bleiben und für verschiedene Benutzer zugänglich sind. Firebase ist eine der einfachsten Möglichkeiten, eine Datenbank zu integrieren, ohne eine eigene  Backend-Anwendung zu schreiben. Mein Buch mit dem Titel ["The Road to Firebase"](https://www.roadtofirebase.com/) bietet dir eine schrittweise Anleitung zur Verwendung der Firebase-Authentifizierung und -Datenbank in React.

* **Die Verbindung zu einem Administrationsbereich/Backend:** React bietet ein Grundgerüst für Frontend-Anwendungen, und wir haben in unsere Beispielanwendung ausschließlich Daten von der API eines Drittanbieters im Frontend angezeigt. Erstelle selbst eine API mit einer Backend-Anwendung, die eine Verbindung zu einer Datenbank herstellt und die Authentifizierung und Autorisierung bietet. In ["The Road to GraphQL"](https://www.roadtographql.com/) erkläre ich dir, wie du GraphQL für die Client-Server-Kommunikation verwendest. Du erfährst, wie du dein eigenes Backend mit einer Datenbank verbindest, Benutzersitzungen verwaltest und wie du über eine GraphQL-API dein Frontend mit der Backend-Anwendung verknüpfst.

* **Statusverwaltung:** Du hast React verwendet, um den lokalen Komponentenstatus zu verwalten. Dies ist eine solide Grundlage für die meisten Anwendungen. Zusätzlich gibt es externe Statusverwaltungslösungen. Ich behandele die beliebteste in meinem Buch ["The Road to Redux"](https://www.roadtoredux.com/).

* **Tooling mit Webpack und Babel:** Wir haben die *Create React App* verwendet, um die Anwendung in diesem Buch einzurichten. Dein Ziel ist es sicher, die Einrichtung einmal selbst in die Hand zu nehmen und die Werkzeuge zu erlernen, um Projekte unabhängig von der *Create React App* zu erstellen. Ich empfehle dir ein minimales Setup mit [Webpack](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/), wobei du nach und nach je nach Anforderung zusätzliche Werkzeuge einbindest.

* **Code-Organisation:** Öffne das Kapitel über die Code-Organisation und wende die dort beschriebenen Änderungen an, falls du dies bisher nicht getan hast. Es hilft dir dabei, deine Komponenten in strukturierten Dateien und Ordnern zu organisieren und die Prinzipien der Codeaufteilung, Wiederverwendbarkeit, Wartbarkeit und des Modul-API-Designs zu verstehen. Deine Anwendung wird wachsen und strukturierte Module benötigen. Deshalb ist es besser, schon jetzt die Grundlagen zu legen.

* **Testen:** Wir haben die Oberfläche der Möglichkeiten im Bereich Tests angekratzt. Wenn du mit dem Testen von Webanwendungen nicht vertraut bist, vertiefe dein Wissen im Bereich [Unit-Tests und Integrationstests mit React-Anwendungen](https://www.robinwieruch.de/react-testing-tutorial). [Cypress](https://www.robinwieruch.de/react-testing-cypress) ist ein nützliches Tool für End-to-End-Tests in React.

* **Typprüfung:** In der Vergangenheit wurde TypeScript in React verwendet. Dies ist eine bewährte Methode, um Fehler zu vermeiden, und die Benutzbarkeit für Entwickler zu verbessern. Tauche tiefer in dieses Thema ein, und erstelle deine JavaScript-Anwendungen robuster. Wer weiß? Unter Umständen verwendest du in Zukunft überwiegend TypeScript anstelle von JavaScript.

* **UI-Komponenten:** Viele Anfänger führen Frameworks oder UI-Komponentenbibliotheken wie Bootstrap meiner Meinung nach zu früh in ihre Projekte ein. Auf den ersten Blick erscheint es praktisch, ein Dropdown-Menü, ein Kontrollkästchen oder einen Dialog mit Standard-HTML-Elementen zu integrieren. Beachte dabei: Die meisten dieser Komponenten verwalten ihren eigenen lokalen Status. Ein Kontrollkästchen weiß, ob es aktiviert oder deaktiviert ist. Implementiere dieses daher als gesteuerte Komponenten. Nachdem du die grundlegenden Implementierungen der wichtigen UI-Komponente erarbeitet hast, ist die Einführung einer UI-Komponentenbibliothek unkomplizierter.

* **Routing:** Implementiere das Routing für deine Anwendung mit [React Router](https://github.com/ReactTraining/react-router). Es gibt bisher nur eine Seite in der Beispiel-Anwendung, aber diese wird wachsen. Mit React Router verwaltest du weitere Seiten über mehrere URLs hinweg. Wenn du das Routing in deine Anwendung integrierst, werden für neue Seitenaufrufe keine Anforderungen an den Webserver gesandt. Der Router übernimmt diese clientseitig.

* **React Native:** [React Native](https://facebook.github.io/react-native/) ermöglicht es dir, native Apps plattformübergreifend und parallel für Android und iOS zu programmieren. Sobald du React beherrschst, ist die Lernkurve für React Native nicht steil, da beide dieselben Prinzipien teilen. Einige wenige Unterschiede gibt es bei den Layoutkomponenten, den Build-Tools und den APIs deines Mobilgeräts.

Last but not least lade ich dich ein, meine [Website](https://www.robinwieruch.de) zu besuchen, um weitere Informationen zu aktuellen Themen im Bereich Webentwicklung und Softwareentwicklung zu lesen. Abonniere gerne meinen [Newsletter](https://www.getrevue.co/profile/rwieruch) oder folge mir auf [Twitter](https://twitter.com/rwieruch), um Updates zu Artikeln, Büchern und Kursen zu erhalten.

Vielen Dank dafür, dass du mein Buch gelesen hast.

<img src="https://vg01.met.vgwort.de/na/63e032b31e484823831da51f1c56139a" width="1" height="1" alt="">
