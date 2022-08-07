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

Am unteren Rand eines Joomla-Editors erscheinen zusätzlich zur Symbolleiste Schaltflächen - zum Beispiel eine Schaltfläche zum Hinzufügen eines `Mehr lesen`-Links oder eine Schaltfläche zum Hinzufügen eines Seitenumbruchs. Diese Schaltflächen werden von Plugins des Typs editors-xtd erzeugt.

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

System Plugins erledigt die unterschiedlichsten Aufgaben. Das klingt zugegebenermaßen vage. Um es etwas konkreter zu machen, folgen Beispiele. System-Plugins können HTML-Code, CSS oder JavaScript zur Joomla-Seite hinzufügen, nachdem diese generiert wurde. Plugins dieses Typs ändern Joomla Formulare, bevor sie generiert werden. Mithilfe von System Plugins sind alternative Fehlerbehandlung möglich. Dies war nur ein kleiner Ausschnitt des mögliche. Du siehst, System Plugins sind sehr mächtig. Um diese mächtige Aufgabe erfüllen zu können, werden diese häufig aufgerufen und benötigen demzufolge Ressourcen. Setzte sie deshalb mit Bedacht ein!

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
