---
date: 2020-12-14
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Clientseitige Validierung'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-clientseiteige-validierung
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Unser Ziel in diesem Teil: Wenn wir eine Zahl in das Namensfeld eingeben, wird unmittelbar nach dem Verlassen des Feldes eine Fehlermeldung angezeigt. Bei der serverseitigen Überprüfung wurde die Meldung erst ausgegeben, nachdem das Formular über die Schaltfläche `Speichern` an den Server gesendet wurde.

In der clientseitigen Validierung bieten wir eine bessere Benutzererfahrung, indem wir schnell auf Browserebene reagieren. Hier werden alle Eingaben im Browser des Benutzers sofort validiert. Für die clientseitige Validierung ist keine Rückfrage beim Server erforderlich, so das dieser und das Netzwerk entlastet werden. Diese Art der Überprüfung arbeitet auf der Browserseite mithilfe von Skriptsprachen wie JavaScript oder mit HTML5-Attributen.

Wenn der Benutzer beispielsweise ein ungültiges E-Mail-Format eingibt, geben wir unmittelbar nach dem Wechsel zum nächsten Feld eine Fehlermeldung aus. So ist zeitnah eine Korrektur möglich.

Meistens hängt die clientseitige Validierung davon ab, dass im Browser JavaScript aktiviert ist. Bei deaktiviertem JavaScript werden Benutzer-Eingaben ungeprüft zum Server gesandt. Es ist möglich, dass es sich hierbei um bösartige Daten handelt! Daher schützt die clientseitige Validierung die Nutzer deiner Komponente nicht sicher vor böswilligen Angriffen.

> Da beide Validierungsmethoden (Server und Client) ihre eigene Bedeutung haben, wird empfohlen, sie nebeneinander zu verwenden. Die serverseitige Validierung ist sicherer - die clientseitige benutzerfreundlicher!

Dieser Teil behandelt die die clientseitige Validierung in Joomla 4.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t11a...t11b)[^github.com/astridx/boilerplate/compare/t11a...t11b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In der nachfolgenden Übersicht sind die neu hinzugekommenen Dateien mit einem Hintergrund versehen und die geänderten umrandet.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree11b.png)

### Neue Dateien

Die clientseitige Validierung erfolgt über eine Klasse mithilfe einer JavaScript-Datei.

#### [media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-68de4c4edca27f9e89ecedeef62c11bb)

Auch hier geht es um das Prinzip, genau wie im vorhergehenden Kapitel. Die Qualtiät der Validierung ist Nebensache und ich wähle ein simples Beispiel. Zahlen sind im Textfeld für den Namen verboten. _Astrid_ ist erlaubt. _Astrid9_ ist nicht erlaubt.

> Im Beispiel nutze ich einen [regulären Ausdruck](https://de.wikipedia.org/wiki/Regul%C3%A4rer_Ausdruck). `regex.test(value)` gibt `true` zurück, wenn `regex = /^([a-z]+)$/i` ist und `value` keine Zahl enthält. Weitere Informationen zur Test-Methode findest du bei [developer.mozilla.org](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).

[media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/blob/562ceedf45834ae7632a38d701c446da682d49fc/src/media/com_foos/js/admin-foos-letter.js)

```js {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t11b/src/media/com_foos/js/admin-foos-letter.js

document.addEventListener('DOMContentLoaded', function () {
  'use strict'
  setTimeout(function () {
    if (document.formvalidator) {
      document.formvalidator.setHandler('letter', function (value) {
        var returnedValue = false

        var regex = /^([a-z]+)$/i

        if (regex.test(value)) returnedValue = true

        return returnedValue
      })
      //console.log(document.formvalidator);
    }
  }, 1000)
})
```

### Geänderte Dateien

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/b4078c00700f28ba31229246bd941b24fabf8dbb/src/administrator/components/com_foos/foos.xml)

Im Installationsmanifest fügen wir `<filename>joomla.asset.json</filename>` ein, damit Joomla weiß, das die Datei `joomla.asset.json` zur Erweiterung gehört und ins `media/com_foos` Verzeichnis kopiert wird.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/b4078c00700f28ba31229246bd941b24fabf8dbb/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		<folder>tmpl</folder>
 	</files>
     <media folder="media/com_foos" destination="com_foos">
+		<filename>joomla.asset.json</filename>
 		<folder>js</folder>
     </media>
 	<!-- Back-end files -->

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-1637778e5f7d1d56dd1751af1970f01b)

Der Eintrag `->useScript('com_foos.admin-foos-letter');` fügt die JavaScript-Datei, welche für das Prüfen zuständig ist, zum [Webasset-Manager](https://docs.joomla.org/J4.x:Web_Assets/de) hinzu.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}

 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
-	->useScript('form.validate');
+	->useScript('form.validate')
+	->useScript('com_foos.admin-foos-letter');

 $layout  = 'edit';
 $tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-262e27353fbe755d3813ea2df19cd0ed)

Wir ergänzen `class="validate-letter"`, damit Joomla weiß, welche CSS-Klasse zu prüfen ist.

[administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			name="name"
 			type="text"
 			validate="Letter"
+			class="validate-letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
 			size="40"
 			required="true"

```

#### [media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-a0586cff274e553e62750bbea954e91d)

Last but not least registrieren wir die neue Datei unter dem Namen `com_foos.admin-foos-letter` im Webasset-Manager.

[media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/media/com_foos/joomla.asset.json)

```json {diff}

"description": "Joomla CMS",
   "license": "GPL-2.0-or-later",
   "assets": [
+    {
+      "name": "com_foos.admin-foos-letter",
+      "type": "script",
+      "uri": "com_foos/admin-foos-letter.js",
+      "dependencies": [
+        "core"
+      ],
+      "attributes": {
+        "defer": true
+      }
+    },
     {
       "name": "com_foos.admin-foos-modal",
       "type": "script",

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle ein neues Item oder editiere ein vorhandenes. Gib im Textfeld für den Titel dabei eine Zahl ein.

3. Editiere danach ein anderes Feld, setze zum Beispiel den Zugriff auf `Registered`.

4. Überzeuge dich davon, dass dir zu diesem Zeitpunkt **eine** Warnung angezeigt wird.

![Joomla Validierung](/images/j4x14x1.png)
