---
date: 2019-12-14
title: 'Clientseitige Validierung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-clientseiteige-validierung
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Unser Ziel in diesem Teil: Wenn wir eine Zahl in das Namensfeld eingeben, wird unmittelbar nach dem Verlassen des Feldes eine Fehlermeldung angezeigt. Bei der serverseitigen Überprüfung wurde die Meldung erst ausgegeben, nachdem das Formular über die Schaltfläche Speichern an den Server gesendet wurde.

In der clientseitigen Validierung bieten Sie eine bessere Benutzererfahrung, indem Sie schnell auf Browserebene reagieren. Hier werden alle Benutzereingaben im Browser des Benutzers selbst validiert. Für die clientseitige Validierung ist keine Rückfrage beim Server erforderlich, so das der und das Netzwerk entlastet werden. Diese Art der Überprüfung arbeitet auf der Browserseite mithilfe von Skriptsprachen wie JavaScript oder mit HTML5-Attributen.

Wenn der Benutzer beispielsweise ein ungültiges E-Mail-Format eingibt, geben Sie unmittelbar vor dem Wechsel zum nächsten Feld eine Fehlermeldung aus. So ist eine Korrektur möglich, bevor er das Formular sendet.

Meistens hängt die clientseitige Validierung davon ab, dass im Browser JavaScript aktiviert ist. Bei deaktiviertem JavaScript werden Benutzer-Eingaben ungeprüft zum Server gesandt. Es ist möglich, dass dies bösartige Daten sind! Daher schützt die clientseitige Validierung die Nutzer deiner Komponente nicht sicher vor böswilligen Angriffen.

> Da beide Validierungsmethoden (Server und Client) ihre eigene Bedeutung haben, wird empfohlen sie gleichzeitig zu verwenden. Die serverseitige Validierung ist sicherer. Die Clientseitige benutzerfreundlicher!

Dieser Teil behandelt die die clientseitige Validierung in Joomla! 4.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t11a...t11b) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Die clientseitige Validierung erfolgt über eine Klasse mithilfe einer JavaScript-Datei.

#### [src/media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-68de4c4edca27f9e89ecedeef62c11bb)

Auch hier geht es um das Prinzip. Die Qualtiät der Validierung spielt keine Rolle.

[src/media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/blob/562ceedf45834ae7632a38d701c446da682d49fc/src/media/com_foos/js/admin-foos-letter.js)

```js
document.addEventListener('DOMContentLoaded', function(){
	"use strict";
	setTimeout(function() {
		if (document.formvalidator) {
			document.formvalidator.setHandler('letter', function (value) {

				var returnedValue = false;

				var regex = /^([a-z]+)$/i;

				if (regex.test(value))
					returnedValue = true;

				return returnedValue;
			});
			//console.log(document.formvalidator);
		}
	}, (1000));
});
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-1637778e5f7d1d56dd1751af1970f01b)

[]()
```

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-262e27353fbe755d3813ea2df19cd0ed)

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

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **eine** Warnung angezeigt wird.

![Joomla! Validierung](/images/j4x14x1.png)

## Geänderte Dateien

### Übersicht
