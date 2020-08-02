---
date: 2019-12-13
title: 'Serverseiteige Validierung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-serverseiteige-validierung
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Deine Komponente ist benutzerfreundlich. User Experience (UX) oder Nutzererfahrung ist in aller Munde. Wenn ein Benutzer fehlerhafte Daten eingibt, ist es dir wichtig, dass dieser hierzu eine Erklärung erhält.
Dazu fügen wir die Validierung hinzu. Bei der serverseitigen Überprüfung wird die vom Benutzer übermittelte Eingabe an den Server gesendet und mithilfe der Skriptsprache validiert. Im Falle von Joomla! ist das PHP. Nach dem Validierungsprozess auf der Serverseite wird das Feedback von einer neuen dynamisch generierten Webseite an den Client zurückgesendet. Es ist sicherer, Benutzereingaben vom Server zu überprüfen. Böswillige Angreifer haben so kein leichtes Spiel. Clientseitige Skriptsprache sind problemloser auszutricksen. Eindringlinge umgehen sie und senden bösartige Eingaben an den Server.

> Da beide Validierungsmethoden (Server und Client) ihre eigene Bedeutung haben, wird empfohlen sie gleichzeitig zu verwenden. Die serverseitige Validierung ist sicherer. Die Clientseitige benutzerfreundlicher!

Dieser Teil behandelt die die serverseitige Validierung in Joomla! 4.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t10...t11a) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

####  [src/administrator/components/com_foos/src/Rule/LetterRule.php](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-64b9f20891ab28b2da58671514d68679)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t10...t11a#diff-262e27353fbe755d3813ea2df19cd0ed)

[]()
```

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle ein neues Item oder editiere ein vorhandenes. Gib im Textfeld für den Titel dabei eine Zahl ein.

3. Editiere danach ein anderes Feld, setze zum Beispiel den Zugriff auf `Registered`.

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **keine** Warnung angezeigt wird.

5. Versuche am Ende, deine Eingabe zu speichern. Dies ist nicht möglich. Du siehst einen Warnhinweis.

![Joomla! Validierung](/images/j4x13x1.png)

## Geänderte Dateien

### Übersicht
