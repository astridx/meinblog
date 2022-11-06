---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-08-07
title: 'Plugins'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-plugins
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Du hast im vorhergehenden Abschnitt ein Plugin erstellt. Sicherlich hast du vorher auch schon andere Plugins im Plugin-Manager konfiguriert und kennst unterschiedliche Arten. Plugins decken viele verschiedene Bereiche in Joomla ab. Dieses Kapitel bietet einen Überblick darüber, was Plugins sind und wie sie innerhalb von Joomla funktionieren.<!-- \index{Plugins} -->

> Einen Überblick über alle im Joomla Kern zur Verfügung stehen Plugins und den dazugehörigen Ereignissen/Events bietet die [Joomla-Dokumentation](https://docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin)[^docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin]. Schau dir den Code an, wenn du Inspiration beim Programmieren benötigst.

## Was ist ein Joomla-Plugin?

Du weißt, dass es verschiedene Arten von Erweiterungen gibt: Komponenten, Module, Templates, Sprachen und Plugins. Während Komponenten, Module, Templates und Sprachen meist eine direkte Ausgabe bewirken, arbeitet ein Plugin in der Regel im Hintergrund. Plugins sind vielfältig. Jedes Plugin hat seinen eigenen Zweck.
Lass uns Plugins ein wenig organisieren. Auch innerhalb von Joomla, sind sie in Plugin-Gruppen aufgeteilt. Es ist viel einfacher, den Zweck zu verstehen, wenn man jeden Typ für sich ansieht. In diesem Kapitel verschaffen wir uns einen Überblick, über die verschiedenen Typen und deren Besonderheiten.

## Plugin-Typen im Joomla 4-Kern

Der Joomla-Kern kommt mit einer Menge Plugins. Diese sind in Joomla 4.3 auf 22 Plugin-Typen verteilt und so ist auch dieser Teil des Textes aufgebaut. Es gibt beispielsweise ein Kapitel über Inhalts-Plugins und ein anderes über System-Plugins.

> In der [Joomla-Dokumentation](https://docs.joomla.org/Plugin/Events)[^docs.joomla.org/Plugin/Events] finden Sie eine Liste aller Plugin-Gruppen mit allen zugehörigen Ereignissen. Verwende diese Liste als schnelle Referenz, wenn du eine Aufgabe zu erledigen hast.

Meiner Meinung nach hilft es zum Verständnis von Joomla-Plugins, wenn man jeden Typ für sich betrachtet. Deshalb tun wir dies jetzt. Die Typen oder Gruppen unterteilen sich wie folgt:

### [Action Log (Aktivitäten)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Action_Log_Group/en)<!-- \index{Plugin!Action Log} -->

Plugins vom Typ Action Log zeichnen die Benutzeraktivitäten in den Joomla-Core-Erweiterungen der Seite auf, um sie bei Bedarf später zu überprüfen. Wenn du Aktivitäten in einer Drittanbieter-Erweiterung protokollieren möchtest, erstellst du dafür ein Plugin dieses Typs.

### [API Authentication (API Authentifizierung)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_API_Authentication_Group/en)<!-- \index{Plugin!API Authentication (API Authentifizierung)} -->

Plugins des Typs API Authentifizierung werden verwendet, um die Authentifizierung für Web Services in Joomla zu ermöglichen. Erinnerst du dich: Ein Joomla Kern Plugin dieses Typs hast du im vorherigen Kapitel zu Webservices aktiviert.

### [Authentifizierung (Authentication)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Authentication_Group/en)<!-- \index{Plugin!Authentifizierung (Authentication)} -->

Wenn sich jemand bei Joomla anmeldet, authentifiziert die Joomla-Anwendung diesen Benutzer. Auf den meisten Websites wird die Authentifizierung gegen die Joomla-Datenbank durchgeführt. Diese Art der Authentifizierung wird durch das Authentifizierungs-Plugin durchgeführt. Mit einem Authentifizierungs-Plugin ist es möglich, externe Dienste zur Authentifizierung von Benutzern zu verwenden: Joomla bietet ein Authentifizierungs-Plugin für LDAP, das in Windows-Domänen verwendet wird.

> Joomla 3 hatte Plugins für die Authentifizierung über Gmail an Bord. [Joomla 4 bietet dies nicht mehr an](https://developer.joomla.org/news/724-removal-of-the-gmail-authentication-plugin-as-of-joomla-4-0.html)[^developer.joomla.org/news/724-removal-of-the-gmail-authentication-plugin-as-of-joomla-4-0.html]. Die Technik, die das Plugin verwendet, ist nicht mehr auf dem neuesten Stand der Technik und weniger sicher. Heutzutage sollten sich Anwendungen über das [OAuth 2.0 Protokoll](https://de.wikipedia.org/wiki/OAuth)[^de.wikipedia.org/wiki/oauth] bei Google autorisieren.

### [Behaviour (Verhalten)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Behaviour_Group/en)<!-- \index{Plugin!Behaviour (Verhalten)} -->

Plugins des Typs Verhalten werden verwendet, um ein bestimmtes Verhalten in der Website zu aktivieren. Beispiele im Joomla Kern sind das Verschlagworten oder die Versionierung von Elementen.

### [CAPTCHA](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_CAPTCHA_Group/en)<!-- \index{Plugin!Action Log} -->

Plugins dieser Gruppe ermöglichen die Prüfung von Formularen mit einem [Captcha
Check](https://de.wikipedia.org/wiki/Captcha)[^de.wikipedia.org/wiki/captcha] (engl. completely automated public Turing test to tell computers and humans apart), einem vollautomatischen öffentlichen Turing-Test der erkennt, ob ein Mensch oder eine Maschine das Formular absendet. Der Joomla-Kern wird mit einem Plugin für [Google reCaptcha](https://www.google.com/recaptcha/about/)[^google.com/recaptcha/about/] geliefert. Individuelle Captcha-Methoden sind leicht hinzufügbar.

> Captchas sind meiner Meinung nach eine schöne Möglichkeit, der Website einen individuellen Touch zu geben. Wem es zu aufwendig ist, zum Thema passende Bilder zu erstellen, kann mit Fragen arbeiten. Auf der Website eines Feuerwehrvereins wäre eine mögliche Frage, die nach der Farbe des Feuerwehrautos.

### [Inhalt (Content)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Content_Group/en)<!-- \index{Plugin!Inhalt (Content)} -->

Ein Inhalts-Plugin wird meist verwendet, um den Inhalt des Artikels zu ändern, bevor er angezeigt wird oder bevor er in der Datenbank gespeichert wird. Wer besondere Anforderungen hat, kann ein Plugin dieses Typs für benutzerdefinierte Funktionen nutzen, nachdem der Artikel in der Datenbank gespeichert wurde. Immer dann, wenn man die Verarbeitung des Inhalts individuell gestalten möchte, ist die Wahl dieses Plugin-Typ richtig.

### [Editor](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Editor_Group/en)<!-- \index{Plugin!Editor} -->

Editor Plugins wandeln ein HTML-Textarea-Element in einen vollwertigen JavaScript-basierten Editor um. Bekannte Plugins dieser Gruppe sind TinyMCE und CodeMirror. Wenn kein [WYSIWYG-Editor-Plugin](https://de.wikipedia.org/wiki/WYSIWYG)[^de.wikipedia.org/wiki/wysiwyg] aktiviert ist, zeigt Joomla eine normal HTML-Textarea an. Technisch geschieht dies ebenfalls über ein Plugin, nämlich via `Editor | Keiner`.

> Ein Drittanwenderplugin aus der Gruppe Editor, welches in der Joomla Community sehr beliebt ist, ist der [JCE-Editor](https://www.joomlacontenteditor.net/)[^www.joomlacontenteditor.net/].

### [Schaltfläche (Button)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Button_Group/en)<!-- \index{Plugin!Schaltfläche (Button)} -->

Im Joomla-Editors erscheinen zusätzlich zur Symbolleiste Schaltflächen - zum Beispiel eine Schaltfläche zum Hinzufügen eines `Mehr lesen`-Links oder eine Schaltfläche zum Hinzufügen eines Seitenumbruchs. Diese Schaltflächen werden von Plugins des Typs editors-xtd erzeugt.

### [Extensions (Erweiterungen)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Extension_Group/en)<!-- \index{Plugin!Extensions (Erweiterungen)} -->

Es gibt nicht viele Plugins in dieser Gruppe, trotzdem ist es eine interessante Gruppe. Wann immer eine Joomla-Erweiterung installiert oder entfernt wird, ist es über ein Plugins dieser Gruppe möglich, sich in die Installation einzuklinken. Ein Erweiterungs-Plugin erledigt eine Aufgabe während einer Installation! Das Joomla-Plugin vom Typ Erweiterung wird verwendet, um Update-Seiten zu bereinigen. Update Seiten sind URLs, die für die Aktualisierung von Erweiterungen im Erweiterungsmanager gespeichert sind. Seit Joomla 3.2 ist es für kommerzielle Erweiterungen möglich, dieses Plugin zu nutzen, um private Downloads mit einem Sicherheitsschlüssel zu ermöglichen. Last, but not least: `Erweiterungen - Namespace Updater` erstellt und aktualisiert automatisch die Datei `administrator/cache/autoload_psr4.php`.

### [Fields (Felder)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Fields_Group/en)<!-- \index{Plugin!Fields (Felder)} -->

Der Plugin-Typ Fields ermöglicht das Erstellen von Feldern in Erweiterungen, die eigene Felder unterstützen. Beispielsweise kann ein Kalender beim Erstellen eines Items hinzugefügt werden, über den ein Datum mit dem Item gespeichert wird, welches an einer bestimmen Stelle im Inhalt ausgegeben wird. Dies erleichtert es Inhalte im gleichen Layout auszugeben oder Inhalte in anderen Erweiterungen abzufragen. Beispiel: Ein Feld, welches eine geografische Koordinate speichert, zeigt in einem Modul einen Marker an dieser Position auf einer digitalen Karte an.

### [FileSystem (Dateisystem)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_FileSystem_Group/en)<!-- \index{Plugin!FileSystem (Dateisystem)} -->

Plugins des Typs Filesystem werden zur Definition eines oder mehrerer lokaler Verzeichnisse zum Speichern von Dateien verwendet. Möchtest du das flexible Ändern eines Verzeichnis für deine Erweiterung anbieten. Dann schaue dir das Joomla Kern Plugin `Dateisystem - Lokal` an. Mit dem stellst du das Verzeichnis, in dem Bilddateien abgelegt werden, ein.

### [Finder (Suchindex)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Smart_Search_Group/en)<!-- \index{Plugin!Finder (Suchindex)} -->

Die Standard-Suche in Joomla 4 ist die Komponente Suchindex oder Smart Search: com_finder. In Joomla 3 war dies com_search. Der Hauptunterschied zwischen den beiden ist, dass com_search den Inhalt in Echtzeit durchsucht sucht und dafür möglicherweise viele verschiedene Datenbanktabellen öffnet, während com_finder zuerst Index-Tabellen erstellt und dann nur diesen Index durchsucht. Letzteres ermöglicht eine effizientere und deshalb schnellere Volltextsuche. Der neue Suchindex ist komplexer als die altbewährte klassische Suche, die keine Konfiguration erforderte, dafür im Gegenzug nur wenige Optionen bot. com_finder verwendet einen aktiven Index, der auf [Stammformreduktion](https://de.wikipedia.org/wiki/Stemming)[^de.wikipedia.org/wiki/stemming] aufbaut. Konkret wird die [PHP-Bibliothek php-stemmer](https://github.com/wamania/php-stemmer)[github.com/wamania/php-stemmer] angewendet. Die Idee besteht darin, die Performanz und die Qualität des Suchergebnisses zu erhöhen, indem man mehrere syntaktische Wörter mit einer Grundform abdecken. So haben zum Beispiel `gärtnern` und `Garten` eine verwandte Bedeutungen. Für jede Art von Inhalten ist ein eigenes Finder-Plugin erforderlich. Erstelle ein Finder-Plugin, wenn du möchtest, dass Inhalte deiner Komponente gefunden werden,

> com_search ist als entkoppelte Komponente [weiterhin verfügbar](https://github.com/joomla-extensions/search)[^github.com/joomla-extensions/search] und sie erfordert ebenfalls ein separates Plugin, damit Inhalte von Dritterweiterungen gefunden werden.

### [Installer](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Installer_Group/en)<!-- \index{Plugin!Installer} -->

Möchtest du den Installationsprozess deiner Erweiterung verändern? Dann sieh dir die Plugins vom Typ Installer an.

### [Media Action (Medienfunktion)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Media_Action_Group/en)<!-- \index{Plugin!Media Action (Medienfunktion)} -->

Das Zuschneiden von Bildern, das Ändern der Größe oder das Drehen ist jeweils mit einem Kern-Joomla-Plugin vom Typ Medienfunktion möglich. Erweitere diese Plugin-Gruppe, wenn dir die Funktionen zur Medien- oder Bildbearbeitung nicht ausreichen.

### [Privacy (Datenschutz)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Privacy_Group/en)<!-- \index{Plugin!Privacy (Datenschutz)} -->

Verarbeitet deine selbst programmierte Erweiterung personenbezogene Daten, dann kommen Plugins des Typs Datenschutz ins Spiel. Erstelle ein Plugin dieses Typs und sorge im Code dafür, dass diese Daten von Joomla in der Komponente Datenschutz korrekt weiter verarbeitet. Nur so kann Joomla Benutzeranfragen nach gespeicherten Daten oder Löschwünsche handhaben. Für Joomla Kernerweiterungen sind die erforderlichen Plugins in Joomla 4 vorhanden.

### [Quick Icon](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Quick_Icon_Group/en)<!-- \index{Plugin!Quick Icon} -->

Verwende ein Plugin des Typs Quickicon, um ein Quickicon auf dem Dashboard des Joomla Backend zu platzieren.

### [Sample Data (Beispieldaten)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Sample_Data_Group/en)<!-- \index{Plugin!Sample Data (Beispieldaten)} -->

Das _Joomla Kern Modul_ Beispieldaten bietet einen einheitlichen Workflow zum Hinzufügen von Beispieldateien. Möchtest du dich hier einklinken und Beispieldateien für deine Erweiterung per Klick installierbar machen? Dann, du vermutest es sicher schon, ist ein Plugin vom Typ Beispieldateien erforderlich.

### [System](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_System_Group/en)<!-- \index{Plugin!System} -->

System Plugins erledigt die unterschiedlichsten Aufgaben. Das klingt zugegebenermaßen vage. Um es etwas konkreter zu machen, folgen Beispiele. System-Plugins können HTML-Code, CSS oder JavaScript zur Joomla-Seite hinzufügen, nachdem diese generiert wurde. Plugins dieses Typs ändern Joomla Formulare, bevor sie generiert werden. Mithilfe von System Plugins sind alternative Fehlerbehandlung möglich. Dies war nur ein kleiner Ausschnitt des Möglichen. Du siehst, System Plugins sind sehr mächtig. Um diese mächtige Aufgabe erfüllen zu können, werden diese häufig aufgerufen und benötigen demzufolge Ressourcen. Setzte sie deshalb mit Bedacht ein!

> Ein weiteres aktuelles Beispiel ist das in Joomla 4.2 neu hinzugekomme Keyboard-Shortcut Plugin[^github.com/joomla/joomla-cms/pull/38092]

### [Task](https://docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin)<!-- \index{Plugin!Task} -->

Hast du Aufgaben, die immer wieder zu erledigen sind? Oder Aufgaben für die Zukunft, die du gerne planen möchtest und auf keinen Fall vergessen werden dürfen? Seit Joomla 4.1 kannst du diese mit dem neuen Aufgabenplaner automatisieren. Und was für Entwickler wesentlich ist: Alle Joomla-Erweiterungen können die Vorteile nutzen und Aufgaben zeitlich planen und regelmäßig ausführen. Insbesondere dann, wenn der Website-Host keine Cron-Jobs zulässt. Es ist möglich den Kern-Scheduler zu nutzen, um Aufgaben in der eigenen Erweiterungen planbar zu machen. Task Plugins wurden mit dem [PR 35143](https://github.com/joomla/joomla-cms/pull/35143)[^github.com/joomla/joomla-cms/pull/35143] in Joomla integriert.

### [Two Factor Authentication (Zwei-Faktor-Authentifizierung)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Two_Factor_Authentication_Group/en)<!-- \index{Plugin!Two Factor Authentication (Zwei-Faktor-Authentifizierung)} -->

Neben der normalen Authentifizierung gibt es die die Möglichkeit, zusätzliche Sicherheit durch Hinzufügen einer gleichzeitigen zweiten Authentifizierung zu erreichen.

### [User (Benutzer)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_User_Group/en)<!-- \index{Plugin!User (Benutzer)} -->

Gibt eine Verbindung zwischen den Daten in einer Komponete und den Benutzern in der Joomla Benutzerverwaltung? Technische wird diese mit einem Plugin vom Typ Benutzer umgesetzt. Du fragst dich wie dies funktioniert? Dann sieh dir das Plugin zur Kontakt Komponente an, welches einen Kontakt mit einem Benutzer koppelt.

### [Web Services](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Web_Services_Group/en)<!-- \index{Plugin!Web Services} -->

Ein Plugin des Typs Web Services fügt die Routen der einer Erweiterung zur API der Website hinzu. Dieses Plugin haben wir im vorherigen Teil praktisch angewandt.

### [Workflow](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Workflow_Group/en)<!-- \index{Plugin!Workflow} -->

Bei der Workflow-Verwaltung gibt es unterschiedliche Übergänge, die per Plugin manipulierbar sind.

## Beispiele

### Indiewebify Joomla

Ich habe Beispiel-Plugins erstellt, die zusammen eine simple Realisierung des IndieWeb ermöglichen.

Was bedeutet *Indiewebify* und was ist das *IndieWeb*? 

Das *IndieWeb* ermöglicht es einem Menschen, seine Gedanken und Ideen an einem Ort zu veröffentlichen und sie dann auf anderen sozialen Websites zu teilen. Dabei ist es wichtig, immer Eigentümer der eigenen digitalen Inhalte zu bleiben. 

Was ist, wenn ein soziales Netzwerk sich so entwickelt, dass du dich dort nicht mehr wohl fühlst und dieses deshalb nicht mehr aufsuchst? Oder der Eigentümer der Website beschließt, diese abzuschalten? All deine Beiträge sind verloren!

Meiner Meinung nach sollte ein digitales Profil und dessen Inhalte nicht die Identität sein, die einem externen Unternehmen gehört. Ein Mensch sollten der alleinige Eigentümer der Inhalte sein, die er online teilt. Und das ist es, wozu *IndieWeb* die Menschen ermutigt.

> Das _IndieWeb_ ist eine auf den Menschen ausgerichtete Alternative zum _Corporate Web_ ist ein Zitat, welches ich der Website  [IndieWeb.org](https://indieweb.org/)[^indieweb.org/] entnommen habe. Die Website [indiewebify.me/](https://indiewebify.me/) hat mich bei der Implementierung unterstützt. Ich habe zum ersten Mal davon auf dem Blog [chringel.dev] (https://chringel.dev/2022/07/indiewebify-me-and-dont-forget-my-webmentions/) gelesen.

1. Web-Sign-In einrichten
Um dich als Inhaber deiner Website mit deiner Domain zu authentifizieren, musst du eine Möglichkeit einrichten, dich über IndieAuth anzumelden. Das heißt, du verwendest deine Domain, um dich als Inhaber deiner anderen sozialen Profile zu verifizieren. Füge einfach ein `rel=me`-Mikroformat zu all deinen Links hinzu, die zu deinen Profilen auf anderen Plattformen führen. Im Content Plugin gibt es Parameter, um dies einzustellen.

2. Author Markup hinzufügen
Der nächste Schritt besteht darin, auf der Website einige grundlegende Informationen über die Autorin bereitzustellen. Oft gibt es schon eine `Über mich`-Seite, aber die ist nicht maschinenlesbar. Das Mikroformat `h-card` bietet Eigenschaften, die geparst werden können. Diese habe ich in Kombination mit dem nachfolgenden Element unsichtbar zum Markup der Website hinzugefügt. So wird das Design des Templates nicht beeinflusst.

3. Inhaltliche Markierung hinzufügen
Wenn du Inhalte im IndieWeb veröffentlichen willst, müssen diese maschinenlesbar sein. Ich habe das `h-entry` Mikroformat hinzugefügt. Die Website IndieWebify.me war eine große Hilfe bei diesem Schritt. In diesem Plugin füge ich die folgenden `h-entry`-Eigenschaften hinzu:
- `p-name` - der Titel des Beitrags
- `e-content` - der Inhalt des Beitrags
- `p-author` - wer den Beitrag geschrieben hat
- `dt-published` - wann der Beitrag veröffentlicht wurde
- `p-summary` - der einleitende Text eines Joomla Beitrags

Jetzt sind meine Inhalte korrekt markiert und können von IndieWeb genutzt werden.

4. Webmentions hinzufügen
Was sind Webmentions? Webmentions sind eine [W3C-Empfehlung](https://www.w3.org/TR/webmention/)[^w3.org/TR/webmention/] für Konversationen und Interaktionen auf Webseiten. Es ist eine einfache Möglichkeit, eine URL zu benachrichtigen, wenn diese auf einer Website erwähnt wird. Im Grunde ist es eine Möglichkeit, von der eigenen Website aus mit den Inhalten anderer Personen zu interagieren.

Ein Beispiel: Ich lese einen Beitrag in einem anderen Blog und möchte darauf regieren. Das kann ich tun, indem ich einen Beitrag auf meiner Website schreibe und auf den anderen Beitrag verweise. Dann kann ich eine Webmention an den anderen Blog senden, um ihm mitzuteilen, dass ich von meiner Website aus auf den Beitrag reagiert habe. Das klingt kompliziert? Nun, es ist genau wie in den meisten sozialen Netzwerken, wo man auf einen Beitrag reagiert, indem man ihn kommentiert oder liked.

Es gibt es eine einfache Möglichkeit, Webmentions einzurichten: Webmention.io. Es ist ein Dienst, der Webmentions handhabt, indem er Web Sign-In verwendet und einige Endpunkte als Links zu deiner Website hinzufügt. Hier im Beispiel setzen wie die Endpunkte, welche ich per System Plugin in den Head der Website einfüge.

> Eine Alternative zu Webmention.io ist Go-Jamming von Wouter Groeneveld.

Es fehlte noch eine Möglichkeit, die Webmentions anzuzeigen. Die Vorgehensweise im Content Plugin für das Parsen von Webmentions ist derzeit dynamisch. Dies ist nicht performant. Eine bessere Lösung ist es, die Webmentions von Zeit zu Zeit abzurufen und in der Datenbank zu speichern.

5. Syndikation und Backfeed
Ein letztes Puzzleteil sind: _POSSE_ und _Backfeed_. 

_POSSE_ bedeutet, dass du deine Inhalte zuerst auf deiner eigenen Website veröffentlichst und dann Links auf anderen Plattformen postest (Publish on your Own Site, Syndicate Elsewhere). Beispielsweise indem du über deinen Beitrag auf Mastodon teilst und daraufhin einen Link zu deiner Website hinzufügst.

_Backfeed_ beschreibt den Prozess, bei dem die Interaktionen deiner POSSE-Kopien auf den ursprünglichen Beitrag gezogen werden. Wenn also jemand einen Toot mit dem Link zu deinem Beitrag kommentiert, wird er tatsächlich als Webmention auf deine Website umgeleitet.

> Die Abarbeitung der 5 Punkte macht eine Joomla Website zu einem IndieWeb-Bürger der Stufe 2. Die nachfolgend beschriebenen Plugins sind eine simple Umsetzung. Web Sign-In kann über das System Plugin verwendet werden, es gibt mittels Content Plugin Inhalte mit Mikroformaten und es werden Webmentions an andere IndieWeb-Sites gesendet und von ihnen empfangen. Syndikation ist ein problematisches Thema. Der Prozess ist etwas verworren, und ich bin mir nicht sicher, ob ich es richtig umsetze. Man muss zuerst einen eigenen Beitrag veröffentlichen, dann den Link teilen und zuletzt diesen geteilten Links zum eigenen Beitrag hinzufügen. Hier unterstützt das Editors-xtd Plugin.

#### [System](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_System_Group/en)<!-- \index{Plugin!System} -->

[plugins/system/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/system/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/indieweb.php

<?php

/**
 * @phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace
 */

use Joomla\CMS\Plugin\CMSPlugin;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

class PlgSystemIndieweb extends CMSPlugin
{
    protected $app;

    public function onAfterDispatch()
    {
        $doc = $this->app->getDocument();
        $doc->addCustomTag('<link rel="authorization_endpoint" href="' . $this->params->get('authorization_endpoint', 'https://indieauth.com/auth') . '" >');
        $doc->addCustomTag('<link rel="token_endpoint" href="' . $this->params->get('token_endpoint', 'https://tokens.indieauth.com/token') . '" >');
        $doc->addCustomTag('<link rel="webmention" href="' . $this->params->get('webmention', 'https://webmention.io/example.org/webmention') . '" >');
        $doc->addCustomTag('<link rel="pingback" href="' . $this->params->get('pingback', 'https://webmention.io/example.org/xmlrpc') . '" >');
    }
}

```

[plugins/system/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/system/indieweb/indieweb.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/indieweb.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="system" method="upgrade">
	<name>plg_system_indieweb</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<filename plugin="indieweb">indieweb.php</filename>
		<folder>language</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
				<field
					name="authorization_endpoint"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_LABEL"
					description="PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_DESC"
					hint="https://indieauth.com/auth"
					filter="url"
					validate="url"
				/>
				<field
					name="token_endpoint"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_LABEL"
					description="PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_DESC"
					hint="https://tokens.indieauth.com/token"
					filter="url"
					validate="url"
				/>
				<field
					name="webmention"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_WEBMENTIOM_LABEL"
					description="PLG_SYSTEM_INDIEWEB_WEBMENTIOM_DESC"
					hint="https://webmention.io/example.org/webmention"
					filter="url"
					validate="url"
				/>
				<field
					name="pingback"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_PINGBACK_LABEL"
					description="PLG_SYSTEM_INDIEWEB_PINGBACK_DESC"
					hint="https://webmention.io/example.org/xmlrpc"
					filter="url"
					validate="url"
				/>
			</fieldset>
		</fields>
	</config>
</extension>

```

[plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/raw/plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini

PLG_SYSTEM_INDIEWEB="System - Indieweb"
PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION="Inserts meta information in the header of the website.<ol><li>&lt;link rel='authorization_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='token_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='webmention' href='https://eample.org' /&gt;<li>&lt;link rel='pingback' href='https://eample.org' /&gt;"

```
[plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/raw/plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini

PLG_SYSTEM_INDIEWEB="System - Indieweb"
PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION="Inserts meta information in the header of the website.<ol><li>&lt;link rel='authorization_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='token_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='webmention' href='https://eample.org' /&gt;<li>&lt;link rel='pingback' href='https://eample.org' /&gt;"

PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_LABEL="Authorization Endpoint"
PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_LABEL="Token Endpoint"
PLG_SYSTEM_INDIEWEB_WEBMENTIOM_LABEL="Webmention"
PLG_SYSTEM_INDIEWEB_PINGBACK_LABEL="Pingback"

PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_DESC="An <b><dfn>authorization endpoint</dfn></b> is an HTTP endpoint that <a href='https://indieweb.org/Micropub'>micropub</a> or <a href='https://indieweb.org/IndieAuth'>IndieAuth</a> clients can use to identify a user or obtain an authorization code (which is then later exchanged for an access token) to be able to post to their website (https://indieweb.org/authorization-endpoint).<br>Default: https://indieauth.com/auth."
PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_DESC="A <b><dfn>token endpoint</dfn></b> is an HTTP endpoint that <a href='https://indieweb.org/Micropub'>micropub</a> clients can use to obtain an access token given an authorization code (https://indieweb.org/token-endpoint).<br>Default: https://tokens.indieauth.com/token."
PLG_SYSTEM_INDIEWEB_WEBMENTIOM_DESC="<b><dfn><a href="https://www.w3.org/TR/webmention/">Webmention</a></dfn></b> is a web standard for conversations and interactions across the web, a powerful building block used for a growing distributed network of peer-to-peer <a href='https://indieweb.org/comment'>comments</a>, <a href='https://indieweb.org/like'>likes</a>, <a href='https://indieweb.org/repost'>reposts</a>, and other <a href='https://indieweb.org/responses'>responses</a> across the web (https://indieweb.org/Webmention).<br>Default: https://webmention.io/example.org/webmention."
PLG_SYSTEM_INDIEWEB_PINGBACK_DESC="<b><dfn>Pingback</dfn></b> is a legacy <a href="/XML-RPC">XML-RPC</a> based protocol for web sites to notify other web sites when they've posted a link to them respectively (https://indieweb.org/pingback).<br>Default: https://webmention.io/example.org/xmlrpc."
```

#### [Inhalt (Content)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Content_Group/en)<!-- \index{Plugin!Inhalt (Content)} -->

[plugins/content/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/indieweb.php

<?php

/**
 * @phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace
 */

 use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\Route;
use Joomla\Component\Contact\Site\Helper\RouteHelper;
use Joomla\Database\ParameterType;
use Joomla\Registry\Registry;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

class PlgContentIndieweb extends CMSPlugin
{
    /**
     * @var    \Joomla\Database\DatabaseDriver
     *
     * @since  3.3
     */
    protected $db;

    /**
     * Plugin that retrieves indieweb information for indieweb
     *
     * @param   string   $context  The context of the content being passed to the plugin.
     * @param   mixed    &$row     An object with a "text" property
     * @param   mixed    $params   Additional parameters. See {@see PlgContentContent()}.
     * @param   integer  $page     Optional page number. Unused. Defaults to zero.
     *
     * @return  void
     */
    public function onContentPrepare($context, &$row, $params, $page = 0)
    {
        // Don't run this plugin when the content is being indexed
        if ($context === 'com_finder.indexer') {
            return;
        }

        $allowed_contexts = array('com_content.article');

        if (!in_array($context, $allowed_contexts)) {
            return;
        }

        // Return if we don't have valid params or don't link the author
        if (!($params instanceof Registry)) {
            return;
        }

        // Return if an alias is used
        if ((int) $this->params->get('link_to_alias', 0) === 0 && $row->created_by_alias != '') {
            return;
        }

        // Return if we don't have a valid article id
        if (!isset($row->id) || !(int) $row->id) {
            return;
        }

        $indieweb = $this->getIndiewebData($row->created_by);

        if ($indieweb === null) {
            return;
        }

        $row->contactid = $indieweb->contactid;
        $row->webpage = $indieweb->webpage;
        $row->email = $indieweb->email_to;
        $row->authorname = $indieweb->name;
        $url = $this->params->get('url', 'url');

        if ($row->contactid && $url === 'url') {
            $row->indieweb_link = Route::_(RouteHelper::getContactRoute($indieweb->contactid . ':' . $indieweb->alias, $indieweb->catid));
        } elseif ($row->webpage && $url === 'webpage') {
            $row->indieweb_link = $row->webpage;
        } elseif ($row->email && $url === 'email') {
            $row->indieweb_link = 'mailto:' . $row->email;
        } else {
            $row->indieweb_link = '';
        }

        // Web Sign In
        $row->text = $row->text . '<div class="hidden"><ul>';
        $row->text = $row->text . '<li><a rel="me" href="mailto:' . $row->email . '">' . $row->email . '</a></li>';

        foreach ($this->params->get('websignin') as $websigninitem) {
            $row->text = $row->text . '<li><a rel="me" href="' . $websigninitem->websignin_url . '">' . $websigninitem->websignin_url . '</a></li>';
        }
        $row->text = $row->text . '</ul></div>';


        // Content
        $row->text = $row->text . '<article class="hidden h-entry">
        <h1 class="p-name">' . $row->title . '</h1>
        <p>Published by 
        <a class="p-author h-card" href="' . $row->webpage . '">' . $row->authorname . '</a> on 

        <time class="dt-published" datetime="' . $row->publish_up . '">' . $row->publish_up . '</time>
        </p>
        <p class="p-summary">' . $row->introtext . '</p>
        <div class="e-content">' . str_replace($row->introtext, '', $row->text) . '</div>
        </article>';


        // Webmention
        $curl = curl_init();
        //curl_setopt($curl, CURLOPT_URL, 'https://webmention.io/api/mentions.html?token=UC7S3VeGryEzkBflVYrvqg');
        curl_setopt($curl, CURLOPT_URL, 'https://webmention.io/api/mentions.jf2?token=vCshWYDynM12T0U49xQLIg');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($curl);

        if ($response === false) {
            $curlError = curl_error($curl);
            curl_close($curl);
            throw new ApiException('cURL Error: ' . $curlError);
        }

        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        if ($httpCode >= 400) {
            curl_close($curl);
            $responseParsed = json_decode($response);
            throw new ApiException('HTTP Error ' . $httpCode .
                ' (' . $responseParsed->error->type . '): ' . $responseParsed->error->message);
        }

        curl_close($curl);

        $webmentions = json_decode($response);

        $webmentions_urls = "";
        if ($webmentions !== null) {
            foreach ($webmentions->children as $i => $webmention) {
                if (str_contains($webmention->url, $row->slug)) {
                    $webmentions_urls = $webmentions_urls . $webmention->url . '</br>';
                }
            }
        }

        $row->text = $row->text . '<div><b>Webmentions</b><br>' . $webmentions_urls . '</div>';


        // Syndication
        $syndication_urls = '<div><b>Syndication</b><ol>';

        $regex = '/{loadsyndication\s(.*?)}/i';
        $matcheslist = array();
        preg_match_all($regex, $row->text, $matches, PREG_SET_ORDER);
        if ($matches) {
            foreach ($matches as $match) {
                $matcheslist = explode(',', $match[1]);
            }
        }

        foreach ($matcheslist as $i => $matche) {
            $syndication_urls = $syndication_urls . '<li>' . $matche . '</li>';
        }

        $syndication_urls = $syndication_urls . '</ol></div>';
        $row->text = $row->text . $syndication_urls;
        $row->text = preg_replace($regex, '', $row->text);
    }

    /**
     * Retrieve Indieweb
     *
     * @param   int  $userId  Id of the user who created the article
     *
     * @return  stdClass|null  Object containing indieweb details or null if not found
     */
    protected function getIndiewebData($userId)
    {
        static $indiewebs = array();

        // Note: don't use isset() because value could be null.
        if (array_key_exists($userId, $indiewebs)) {
            return $indiewebs[$userId];
        }

        $db = $this->db;
        $query  = $db->getQuery(true);
        $userId = (int) $userId;

        $query->select($db->quoteName('contact.id', 'contactid'))
            ->select(
                $db->quoteName(
                    [
                        'contact.alias',
                        'contact.catid',
                        'contact.webpage',
                        'contact.email_to',
                        'contact.name',
                    ]
                )
            )
            ->from($db->quoteName('#__contact_details', 'contact'))
            ->where(
                [
                    $db->quoteName('contact.published') . ' = 1',
                    $db->quoteName('contact.user_id') . ' = :createdby',
                ]
            )
            ->bind(':createdby', $userId, ParameterType::INTEGER);

        if (Multilanguage::isEnabled() === true) {
            $query->where(
                '(' . $db->quoteName('contact.language') . ' IN ('
                . implode(',', $query->bindArray([Factory::getLanguage()->getTag(), '*'], ParameterType::STRING))
                . ') OR ' . $db->quoteName('contact.language') . ' IS NULL)'
            );
        }

        $query->order($db->quoteName('contact.id') . ' DESC')
            ->setLimit(1);

        $db->setQuery($query);

        $indiewebs[$userId] = $db->loadObject();

        return $indiewebs[$userId];
    }
}

```

[plugins/content/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/indieweb.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/indieweb.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="system" method="upgrade">
	<name>plg_content_indieweb</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_CONTENT_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<filename plugin="indieweb">indieweb.php</filename>
		<folder>language</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
			</fieldset>
			<fieldset name="WebSignIn">
				<field
					name="websignin"
					type="subform"
					label="PLG_CONTENT_INDIEWEB_WEBSIGNIN_LABEL"
					description="PLG_CONTENT_INDIEWEB_WEBSIGNIN_DESC"
					layout="joomla.form.field.subform.repeatable-table"
					icon="list"
					multiple="true"
					default=''
				>
					<form repeat="true">
						<field
							name="websignin_url"
							type="url"
							label="PLG_CONTENT_INDIEWEB_WEBSIGNIN_URL_LABEL"
							hint="mailto:info@example.org or https://fimidi.com/@username"
							filter="url"
							validate="url"
							size="50"
						/>
					</form>
				</field>
			</fieldset>
		</fields>
	</config>
</extension>

```

[plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini

PLG_CONTENT_INDIEWEB="Content - Indieweb"
PLG_CONTENT_INDIEWEB_XML_DESCRIPTION="Adds visible and invisible information about the content, the author of the content, webmentions and syndication links for the indieweb. Requirement: The user who wrote the post must be connected to a contact."

```

[plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/raw/plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini

PLG_CONTENT_INDIEWEB="Content - Indieweb"
PLG_CONTENT_INDIEWEB_XML_DESCRIPTION="Adds visible and invisible information about the content, the author of the content, webmentions and syndication links for the indieweb. Requirement: The user who wrote the post must be connected to a contact."

; Own Domain

; Web Sign In
COM_PLUGINS_WEBSIGNIN_FIELDSET_LABEL="Web Sign In"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_LABEL="Web Sign In URLs"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_URL_LABEL="URL"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_DESC="<p>In order to be able to sign in using your domain name, connect it to your existing identities. You probably already have many disconnected profiles on the web. </p><p>Linking between them and your domain name with the rel=me microformat ensures that it’s easy to see that you on Google/Twitter/Github/Flickr/Facebook/email are all the same person as your domain name (https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain).</p><p>The outer container contains the class hidden, so that the information is inserted hidden on the website in a template that styles the class with display:none.</p>"
```

#### [Schaltfläche (Button)](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Button_Group/en)<!-- \index{Plugin!Schaltfläche (Button)} -->

[media/plg_editors-xtd_indieweb/joomla.asset.json](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/media/plg_editors-xtd_indieweb/joomla.asset.json)

```json {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/media/plg_editors-xtd_indieweb/joomla.asset.json


```
[media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js)

```js {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js

(() => {

  const options = window.Joomla.getOptions('xtd-indieweb');

  window.insertIndieweb = editor => {
    if (!options) {
      // Something went wrong!
      throw new Error('XTD Button \'indieweb\' not properly initialized');
    }

    const content = window.Joomla.editors.instances[editor].getValue();

    if (!content) {
      Joomla.editors.instances[editor].replaceSelection('{loadsyndication testurl,testurl2,testurl3}');
    } else if (content && !content.match(/{loadsyndication\s/i)) {
      Joomla.editors.instances[editor].replaceSelection('{loadsyndication testurl,testurl2,testurl3}');
    } else {
      // @todo replace with joomla-alert
      alert(options.exists);
      return false;
    }

    return true;
  };
})();

```

[plugins/editors-xtd/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.php

<?php

/**
 * @phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace
 */

use Joomla\CMS\Language\Text;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Plugin\CMSPlugin;

// phpcs:disable PSR1.Files.SideEffects
\defined('_JEXEC') or die;
// phpcs:enable PSR1.Files.SideEffects

class PlgButtonIndieweb extends CMSPlugin
{
    protected $autoloadLanguage = true;

    protected $app;

    public function onDisplay($name)
    {
        $doc = $this->app->getDocument();
        $doc->getWebAssetManager()
            ->registerAndUseScript('plg_editors-xtd_indieweb.admin-article-indieweb', 'plg_editors-xtd_indieweb/admin-article-indieweb.min.js', [], ['defer' => true], ['core']);

        // Pass some data to javascript
        $doc->addScriptOptions(
            'xtd-indieweb',
            array(
                'exists' => Text::_('PLG_INDIEWEB_ALREADY_EXISTS', true),
            )
        );

        $button = new CMSObject();
        $button->modal   = false;
        $button->onclick = 'insertIndieweb(\'' . $name . '\');return false;';
        $button->text    = Text::_('PLG_INDIEWEB_BUTTON_INDIEWEB');
        $button->name    = $this->_type . '_' . $this->_name;
        $button->icon    = 'arrow-down';
        $button->iconSVG = '<svg viewBox="0 0 32 32" width="24" height="24"><path d="M32 12l-6-6-10 10-10-10-6 6 16 16z"></path></svg>';
        $button->link    = '#';

        return $button;
    }
}

```

[plugins/editors-xtd/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="editors-xtd" method="upgrade">
	<name>plg_editors-xtd_indieweb</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<filename plugin="indieweb">indieweb.php</filename>
		<folder>language</folder>
	</files>
</extension>

```

[plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini

PLG_EDITORS-XTD_INDIEWEB="Button - IndieWeb Syndication"
PLG_INDIEWEB_ALREADY_EXISTS="There is already a IndieWeb Syndication link that has been inserted. Only one link is permitted."
PLG_INDIEWEB_BUTTON_INDIEWEB="IndieWeb Syndications"
PLG_INDIEWEB_XML_DESCRIPTION="Enables a button which allows you to insert the <em>IndieWeb Syndication</em> link into an Article. See Content Plugin Indieweb"

```

[plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini

PLG_EDITORS-XTD_INDIEWEB="Button - IndieWeb Syndication"
PLG_INDIEWEB_XML_DESCRIPTION="Enables a button which allows you to insert the <em>IndieWeb Syndication &hellip;</em> link into an Article.  See Content Plugin Indieweb"

```

## FAQ zu Plugins

### Plugin automatisch während der Installation aktivieren

Möchtest du, dass dein Plugin bei einer Installation automatisch aktiviert wird? Füge in diesem Fall den folgenden Code[^github.com/dgrammatiko/jailed-fs/blob/main/src/plugins/system/restrictedfs/script.php] in ein Installationsskript ein.

```php
defined('_JEXEC') || die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\Adapter\PluginAdapter;
use Joomla\CMS\Installer\InstallerScript;

class plgDeinplugintypDeinpluginnameInstallerScript extends InstallerScript
{
  public function postflight($type, PluginAdapter $parent)
  {
    // Enable the plugin
    if ($type === 'install' || $type === 'discover_install') {
      $db = Factory::getDbo();
      $query = $db->getQuery(true)
        ->update('#__extensions')
        ->set($db->qn('enabled') . ' = 1')
        ->where($db->qn('type') . ' = ' . $db->q('plugin'))
        ->where($db->qn('element') . ' = ' . $db->q('deinpluginname'))
        ->where($db->qn('folder') . ' = ' . $db->q('deinplugintyp'));
      $db->setQuery($query);
      try {
        $db->execute();
      } catch (\Exception $e) {
        // var_dump($e);
      }
    }
  }
}
```
<img src="https://vg08.met.vgwort.de/na/bf834767e907410a826709167dea3c55" width="1" height="1" alt="">
