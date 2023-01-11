---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2021-05-04
title: 'HTTP-Header und Content Security Policy in Joomla 4'
template: post
thumbnail: '/thumbnails/joomla.png'
slug: http-header-und-content-security-policy-joomla4
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Sicherheit
  - CSP
  - HTTP Header
  - Content Security Policy
---








Die Aufgabe eines Browsers erscheint auf den ersten Blick simpel: er zeigt Text und Bilder an, die man ihm übermittelt. Bei genauerem Hinsehen wird alles komplexer. Web-Standards sind zu unterstützen, Benutzerfreundlichkeit steht hoch im Kurs und Entwickler benötigen Werkzeuge. Hinzu kommt, dass das Web ist ein tückischer Ort ist. Webseiten werden ständig automatisiert angegriffen. Zum Schutz vor verschieden Angriffsvektoren, haben Software Hersteller HTTP Header implementiert, über welche die Webseite im Webbrowser Sicherheitsfunktionen aktiviert und so Angriffsmuster blockiert oder erschwert.<!-- \index{HTTP headers} --><!-- \index{Content Security Policy} -->

> Testest du lokal und es funktioniert nicht. Du siehst die Meldung `Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf ... Grund: CORS-Kopfzeile 'Access-Control-Allow-Origin' fehlt.`. Der Zugriff auf lokale Dateien in Firefox ist normalerweise aufgrund der `Same-Origin-Policy` nicht möglich. Die Funktion an sich ist nützlich, aber manchmal möchte man sie für Entwicklungszwecke abschalten. Dies kann durch den Aufruf von `about:config` in der Adressleiste des Firefox-Browsers erreicht werden. In den Einstellungen findet man das Attribut `privacy.file_unique_origin`. Wenn dieser Wert auf `false` gesetzt ist, können die Dateien lokal geladen werden.

# Wie macht man die Header sichtbar

HTTP Header werden oft mit dem `<head>`-Element eines HTML-Dokuments verwechselt. HTTP-Header wird man im HTML-Header nicht finden! Die stecken im HTTP-Protokoll. Dieses bildet die Basis des World-Wide-Webs. HTTP ist die Sprache, mit der Browser und Webserver kommunizieren. Zusammen mit den sichtbaren Inhalten werden Informationen zu den Daten übermittelt. Diese sind im Kopf-Bereich der Browser-Antwort – im Head der [HTTP-Response](https://developer.mozilla.org/de/docs/Web/HTTP#die_struktur_einer_server-antwort)[^developer.mozilla.org/de/docs/web/http#die_struktur_einer_server-antwort]. Deshalb der Name Header. Um diese anzusehen öffnet man den Netzwerk-Tab der Browser-Entwicklertools.

![HTTP Header im Firefox sichtbar gemacht](/images/header0e.png)

Mit dem Tool [Security Headers von Scott Helme](https://securityheaders.com/)[^securityheaders.com/] ist es möglich, die HTTP-Header und deren Konfiguration zu überprüfen. Der Service liest dazu alle gesetzten Werte aus, bewertet sie und bildet daraus ein Rating. Einen Beispielreport zeigt das nachfolgende Bild.

![Security Headers von Scott Helme](/images/header1.png)

> Ein alternatives Testwerkzeug ist _Webbkoll_. Dies ist ein Projekt aus Schweden, das unter anderem von [Internetfonden](https://internetstiftelsen.se/) finanziert wird. Der Quellcode ist quelloffen und auf [Github](https://github.com/andersju/webbkoll) verfügbar. Wenn man die technischen Voraussetzungen erfüllt, kann man Webbkoll auf seinem eigenen Server hosten. Einfacher ist es, eine bereits existierende Webbkoll-Instanz zu verwenden, wie sie unter [https://webbkoll.dataskydd.net](https://webbkoll.dataskydd.net) angeboten wird.

# Was bietet Joomla 4

Joomla 4 unterstützt Benutzer mit dem Plugin [System - HTTP Headers](https://docs.joomla.org/J4.x:Http_Header_Management/de#Plugin) eine sichere [Content Security Policy](https://wiki.selfhtml.org/wiki/Sicherheit/Content_Security_Policy) zu konfigurieren. Stelle sicher, dass dieses Plugin aktiviert ist, wenn du es verwenden möchtest.

![Joomla 4 Plugin System - HTTP Headers - Zu aktivieren im Menü System|Plugins ](/images/header00p.png)

> Ursprünglich sollte es zusätzlich eine Komponente geben. Über diese Komponente hätten Berichte über die Content Security Policy verwaltet werden können. Mit dem PR [github.com/joomla/joomla-cms/pull/33550](https://github.com/joomla/joomla-cms/pull/33550) wurde diese entfernt. Im Kapitel Content-Security-Policy beschreibe ich eine Möglichkeit, die Reports per E-Mail zu erhalten.

![Joomla 4 Plugin System - HTTP Headers - Detailansicht](/images/header0p.png)

Ich beschreibe die wichtigsten HTTP Header und die Konfiguration in Joomla 4.

> Vorweg: Wer seine Website unter `localhost` testet, wird feststellen, dass nicht alle hier beschriebenen Funktionen lokal testbar sind.

# HTTP Security Header im Detail

Die folgenden Security Header sind [HTTP Response Header](https://developer.mozilla.org/de/docs/Web/HTTP/Headers), welche der Webserver mit den Daten der Webseite an den Webbrowser übergibt. Daraufhin aktiviert der Browser Sicherheitsfunktionen.

## Herausgehobene HTTP Header im Joomla 4 Plugins HTTP Header

Im Joomla Plugin werden die drei Header _X-Frame-Options_, _Referrer-Policy_ und _Cross-Origin-Opener-Policy_ im oberen Bereich angezeigt und der Header _Strict-Transport-Security_ ist in einem eigenen Tabulator konfigurierbar.

### X-Frame-Options

Der [X-Frame-Options](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Frame-Options)-Header verhindert [Clickjacking](https://de.wikipedia.org/wiki/Clickjacking). Diese Technik lädt eine fremde Website über ein _iframe_-Tag in die eigene. Ziel ist es, einen Benutzer dazu zu bringen, sensible Daten preiszugeben – zum Beispiel Anmelde-Daten. Sobald eine Site versucht, eine andere als _iframe_ zu laden, überprüft der Browser die einzubettende Website. Ist dort der _X-Frame-Options Header_ gesetzt, wird die Seite nicht geladen. Auf diese Weise ist er möglich, zu verhindern, dass andere Websites die eigene Website in ihre Inhalte einbetten und sich als man selbst ausgeben.

Der Header bietet drei mögliche Richtlinien: `DENY`, `SAMEORIGIN`, und `ALLOW-FROM`.

In Joomla 4 ist der Header auf unterschiedliche Arten einstellbar. Zum einen gibt es eine eigene Option `X-Frame-Options`. Wenn die aktiviert ist, setzt das Plugin den Header mit der Richtlinie `SAMEORIGIN`. Dies wird in den meisten Fällen die gewünschte Funktion sein. In der eigenen Domain, ist so weiterhin möglich, eigene Inhalte per iFrame einzubinden. Außerhalb ist dies verboten.

![X-Frame-Option in der Joomla 4 Content Security Policy](/images/header2.png)

Wird `ALLOW-FROM` oder `DENY` benötigt, ist dies im Plugin konfigurierbar:

![X-Frame-Option in der Joomla 4 Content Security Policy](/images/header3.png)

Zusätzlich ist das [Setzten](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#frame_options) des Headers per `.htaccess`-Datei möglich:

```
<IfModule mod_headers.c>
  Header always set X-Frame-Options "DENY" "expr=%{CONTENT_TYPE} =~ m#text/html#i"
</IfModule>
```

Achtung: Wenn du die Option im oberen Bereich aktiviert hast, wird immer `SAMEORIGIN` gesetzt. Wenn du die `ALLOW-FROM` oder `DENY` im unteren Bereich manuell konfigurierst, dann ist erforderlich, die Option im oberen Bereich zu deaktivieren.

![X-Frame-Option in der Joomla 4 Content Security Policy](/images/header5.png)

### Referrer-Policy

[Referrer-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) weißt den Browser an, den Referer zu entfernen und nicht an die nachfolgende Site zu übermitteln.

> Der [Referer Anfrage-Header](https://de.wikipedia.org/wiki/Referrer) beinhaltet die Adresse von der vorher besuchten Webseite, welche einen Link zur aktuell angefragten Seite beinhaltet. Der Referer-Header erlaubt es Servern zu sehen, von wo die Personen kommen, die sie besuchen und diese Daten zum Beispiel zur Analyse, zum Logging oder zum Caching zu benutzen.

Im Joomla Plugin sind alle möglichen Optionen in einem Dropdown auswählbar. Die Standardeinstellung im Plugin sieht die Option `no-referrer-when-downgrade` vor.

![Referrer-Policy in der Joomla 4 Content Security Policy](/images/header4.png)

Mittels `.htaccess` kann der Header ebenfalls [gesetzt werden](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#referrer_policy):

```
<IfModule mod_headers.c>
  Header always set Referrer-Policy "strict-origin-when-cross-origin" "expr=%{CONTENT_TYPE} =~ m#text\/(css|html|javascript)|application\/pdf|xml#i"
</IfModule>
```

### Cross-Origin-Opener-Policy

Der Header [Cross-Origin-Opener-Policy (COOP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy) bietet die Möglichkeit, einen neuen Browser-Kontext anzufordern, um sich besser von anderen, nicht vertrauenswürdigen Aufrufen zu isolieren.

Der [Cross-Origin-Resource-Policy Header (CORP)](<https://developer.mozilla.org/en-US/docs/Web/HTTP/Cross-Origin_Resource_Policy_(CORP)>) erlaubt es Websites und Anwendungen, sich gegen bestimmte _Cross-Origin-Anforderungen_ zu schützen.

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ist ein HTTP-Header-basierter Mechanismus, der es einem Server erlaubt, andere Ursprünge (Domäne, Schema oder Port) als seinen eigenen anzugeben, von denen ein Browser das Laden von Ressourcen erlauben soll.

Mit der [Cross-Origin Embedder Policy (COEP)](https://wicg.github.io/cross-origin-embedder-policy/) wird verhindert, Anfragen nicht gleichen Ursprungs zu laden, es sei denn, dies ist ausdrücklich über CORS oder CORP erlaubt.

Mittels `.htaccess` kann der Header ebenfalls [gesetzt](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#general_cors_access) werden. Hier ein Beispiel:

```
<IfModule mod_setenvif.c>
  <IfModule mod_headers.c>
    <FilesMatch "\.(bmp|cur|gif|ico|jpe?g|a?png|svgz?|webp|heic|heif|avif)$">
      SetEnvIf Origin ":" IS_CORS
      Header set Access-Control-Allow-Origin "*" env=*IS_CORS*
    </FilesMatch>
  </IfModule>
</IfModule>
```

### Strict-Transport-Security

Der [Strict-Transport-Security (HSTS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) Header ist im Plugin in einem eigenen Tabulator konfigurierbar. Er bietet eine zusätzliche Absicherung aller Sites, die mit HTTPS verschlüsselt sind. Ist der Header gesetzt, lehnt der Browser alle unverschlüsselten HTTP-Verbindungen ab.

> Bei Seiten, die von HTTP auf HTTPS umgestellt wurden, ist die Wahrscheinlichkeit hoch, dass sich ein Link findet, der nicht mit dem zusätzlichen _S_ versehen ist. Ohne HSTS würde dieser Link unverschlüsselt via HTTP weitergeleitet. Mit HSTS ausgestattete Websites liefern alle Inhalte ohne Ausnahme per HTTPS aus. Links werden umgeschrieben. So finden potenzielle Angreifer nichts Unverschlüsseltes in die Übermittlung.

Im Plugin ist beispielsweise der Wert `max-age=31536000; includeSubDomains` konfigurierbar. Das folgende bild zeigt die Konfiguration über die Option _Force HTTP Headers_.

![Strict-Transport-Security in der Joomla 4 Content Security Policy](/images/header6.png)

`max-age` weißt den Browser an, die Domain zu speichern. Der Wert `31536000` steht in Sekunden und entspricht einem Jahr. Mit der Option `includeSubDomains` weitet der Browser die Funktion auf alle Subdomains aus.

> Wenn `preload` aktiviert ist, wird die Domain in der [Preloadliste](https://hstspreload.org) gespeichert.

Per `.htaccess` ist der Header wie folgt zu [aktivieren](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security):

```
<IfModule mod_headers.c>
  # Header always set
  Strict-Transport-Security "max-age=31536000; includeSubDomains" env=HTTPS
  # (1) Enable your site for HSTS preload inclusion.
  Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" env=HTTPS
</IfModule>
```

> Trotz des Nutzens steht HSTS in der [Kritik](https://de.wikipedia.org/wiki/HTTP_Strict_Transport_Security#Kritik), da Website-Betreiber darüber in der Lage sind, Nutzerinformationen auszulesen. Zwar ist der Zugriff kompliziert, aber möglich.

## Weitere Plugins im Bereich Force HTTP Headers

### HTTP Header Feature-Policy

Der HTTP Header [Feature-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) ist relativ jung und weitreichend. Er teilt dem Browser mit, welche Funktionen die Site benötigt. Wenn kein Zugriff auf das Mikrofon notwendig ist, hat ein möglicher Angreifer keinen Zugriff auf diese Browser-Funktionen - vorausgesetzt der Header ist korrekt gesetzt.

Der Aufbau ist simpel:

`Feature-Policy: <directive> <allowlist>`

> Die steuerbaren [Features (Direktiven)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy), werden bisher [nicht alle in allen Browsern unterstützt.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy#browser_compatibility).

Über das Joomla Plugin ist der Header wie folgt konfigurierbar:

![Strict-Transport-Security in der Joomla 4 Content Security Policy](/images/header7.png)

Mittels `.htaccess` sieht der Eintrag für ein Verbot von Mikrophone und Ortung (geolocation) wie folgt aus:

```
<IfModule mod_headers.c>
  Header always set Feature-Policy microphone 'none'; geolocation 'none'
</IfModule>
```

### Expect-CT

Der [Expect-CT Header](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/Expect-CT) erlaubt es Webseiten, die Anforderungen der [Certificate Transparency](https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency) zu erzwingen.

Wenn eine Webseite die Verwendung des `Expect-CT` Headers aktiviert überprüft der Browser jedes im Zusammenhang mit der Webseite verwendete Zertifikat in [öffentlichen CT Protokollen](https://www.certificate-transparency.org/known-logs).

### Content-Security-Policy

Die [Content-Security-Policy](https://scotthelme.co.uk/content-security-policy-an-introduction/) oder CSP ist das Tüpfelchen auf das I der HTTP Header.

> Ohne CSP lädt ein Browser alle Inhalte, egal von wo. Das ist in vielen Fällen hilfreich. Problematisch ist, dass nicht jede Site vertrauenswürdig ist. Ich meine hiermit das Aufrufen bösartigen Scriptcodes per [Cross Site Scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting). Das Gefährliche ist, dass man als Websitebetreiber die Dinge nicht in der Hand hat, wenn fremde Inhalte aufrufbar sind. Dann reicht es nämlich, wenn der Angreifer eine verlinkte Site mit Schadcode verunreinigte.

CSP bietet einen hohen Schutz, erfordert dafür Sachkenntnis. Im Grund genommen legt man eine Liste aller Ressourcen an, welche die Webseite benötigt. Alles andere wird vom Browser blockiert. Hier wird deutlich: Wer nicht weiß, was er tut, kann seine Website per Content-Security-Policy lahm legen. In der restriktivsten Einstellung lässt der Browser nur Inhalte zu, die von der aufrufenden Domain selbst (`self`) stammen.

> Mit Joomla 4.0 eliminierte man im Joomla Core Inline-Skripte und Styles weitestgehend. Leider verwenden Erweiterungen weiterhin Inline-JavaScript und Inline CSS Styles. Daher ist das Laden von Inline Elmeneten meist erforderlich und darf nicht unterbunten werden. Aus diesem Grund ist mit einer Joomla Website in der Regel nur ein `A` Rating und kein `A+` Rating erreichbar.

Der Header ist wie folgt aufgebaut:

`Content-Security-Policy-(Report-Only) <directive> <allowlist>; <directive> <allowlist>;`

Die [Liste](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy#Browser_compatibility) der möglichen Direktiven ist lang und wird von allen gängigen Browsers unterstützt.

Bei der Implementierung der Content-Security-Policy ist es sinnvoll, den `Report-Only` Modus zu aktivieren und einen [reporting Endpoint](https://github.com/zero-24/csp-reporter-php) aufzusetzen. An diesen Endpoint schickt der Browser alle Verletzungen der CSP. So ist die Website anpassbar, bevor die Regel scharf geschaltet wird und Websitefunktionen nicht mehr arbeiten. Empfehlenswert ist der Einsatz dieser Direktive nur dann, wenn man weiß, was man bewirkt. Im schlimmsten Fall ist am Ende der Joomla Administrationsbereich nicht mehr funktionsfähig.

> Wenn man einen Report per E-Mail erhalten möchte, bietet das Skript unter der Adresse [https://github.com/zero-24/csp-reporter-php](https://github.com/zero-24/csp-reporter-php) eine Möglichkeit.

Das Setzen der Content-Security-Policy in einer `.htaccess` sieht beispielweise wie folgt aus:

```
<IfModule mod_headers.c>
  Content-Security-Policy "default-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" "expr=%{CONTENT_TYPE} =~ m#text\/(html|javascript)|application\/pdf|xml#i"
</IfModule>
```

> Viele Sites beinhalten _Inline-Stile_ und _Inline-Skripte_, so dass es erforderlich ist, dass man `unsafe-inline` hinzufügt, damit die Website korrekt arbeitet.

## Weitere Header

### X-Content-Type-Options

Der Header [X-Content-Type-Options](https://developer.mozilla.org/de/docs/Web/HTTP/Headers/X-Content-Type-Options) ist unkompliziert zu konfigurieren, seit [Joomla 3.9.13 in der Joomla Core `.htaccess`](https://github.com/joomla/joomla-cms/blob/9b54e8bd5da61dfc1a4d1476b9e0df608d7289e9/htaccess.txt#L30) enthalten und [wird für alle Joomla Webseiten](https://docs.joomla.org/J3.x:Joomla_3.9.3_Security_Notes) empfohlen.

Es gibt einen gültigen Wert. Dies ist `nosniff`. Ist der Header gesetzt, versucht der Browser nicht, den Mime Type (Dateitype) einer Datei zu erraten. Dies ist bei heutigen Webseiten nicht mehr notwendig und führt zu unnötigen Sicherheitsproblemen.

Idealerweise wird dieser Header in der Datei `.htaccess` [gesetzt](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#prevent_some_browsers_from_mime-sniffing_the_response). So ist die Sicherheitsfunktion unabhängig von Joomla auf Webserver-Ebenen aktiviert:

```
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
</IfModule>
```

### X-XSS-Protection

Diesen Header erwähne ich der Vollständigkeit halber. Er ist im Joomla 4 Backend nicht konfigurierbar. Der HTTP [X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection) Header war dazu gedacht im Browser einen XSS Auditor zu aktivieren. Moderne Browser berücksichtigen diesen Header [nicht mehr]https://portswigger.net/daily-swig/google-deprecates-xss-auditor-for-chrome).

Die empfohlene Konfiguration für ältere Browser ist: `1; mode=block`. In Joomla 4 ist der Header ausschließlich über die Datei `.htaccess` konfigurierbar. Direkt mit der `.htaccess` Datei wird der Header wie folgt gesetzt:

```
<IfModule mod_headers.c>
  Header always set X-XSS-Protection 1; mode=block
</IfModule>
```

# Weitere Links

## Joomla Dokumentation

[Joomla Dokumentation](https://docs.joomla.org/J4.x:Http_Header_Management/en)

## csp-cheat-sheet

Die Seite [scotthelme.co.uk](https://scotthelme.co.uk/csp-cheat-sheet/) bietet eine Übersicht in englischer Sprache über alle unterstützten Funktionen und Direktiven in der _Content Security Policy_. Sie kann als Kurzreferenz verwendet werden, um gültige und ungültige Direktiven und Werte zu identifizieren und enthält Beispielrichtlinien und Anleitungen zur effektiven Verwendung von CSP.

## CSP-Auswerter

Der [CSP Evaluator](https://csp-evaluator.withgoogle.com/) ermöglicht es Entwicklern und Sicherheitsexperten zu überprüfen, ob eine Content Security Policy (CSP) eine starke Möglichkeit gegen Cross-Site-Scripting-Angriffe darstellt. Er unterstützt den Prozess der Überprüfung von CSP-Richtlinien, der normalerweise eine manuelle Aufgabe ist, und hilft, subtile CSP-Umgehungen zu identifizieren, die den Wert einer Richtlinie untergraben. Die Prüfungen des CSP Auswerters basieren auf einer groß angelegten Studie und sollen Entwicklern helfen, ihre CSP zu härten und die Sicherheit ihrer Anwendungen zu verbessern. Dieses Tool (auch als Chrome-Erweiterung verfügbar) wird Entwicklern zur Verfügung gestellt und Google gibt keine Garantien oder Gewährleistungen für dieses Tool.
<img src="https://vg04.met.vgwort.de/na/5c2df911b6c147a8ba1af8a11e92b1a7" width="1" height="1" alt="">
