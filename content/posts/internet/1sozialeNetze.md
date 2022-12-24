---
description: 'desc'
set: ''
booklink: ''
syndication: 
  - https://fimidi.com/web/@astrid/108603095089729884
shortTitle: 'short'
date: 2022-07-05
title: 'Zentrale und dezentrale soziale Netze'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: soziale-netze
langKey: de
categories:
  - Internet
tags:
  - mastodon
  - soziale Netze
  - Fediverse
  - zentral
  - dezentral
---


Wie jedes Netzwerk sind auch die sozialen unterschiedlich organisiert.

![Zentrale und dezentrale soziale Netze](/images/1aa.png)

## Zentral 

In zentral eingerichteten sozialen Netzwerken befinden sich alle Nachrichten und Medien in einer Hand. In einem zentralen Netzwerk kontrolliert ein Anbieter die Software und die Server. Dies ermöglicht es dem Anbieter, seine Regeln anzuwenden. Er nimmt Einfluss auf Inhalte und Prozesse. Bewusst oder unbewusst! 

## Dezentral

Jeder kann in einem dezentralen Netz mit anderen kommunizieren. Ich kann die Menschen in jeder Instanz erreichen. Dabei spielt es keine Rolle, ob sie bei meinem Provider sind oder bei jemand anderem. Der Einfluss des Administrators beschränkt sich auf die Vereinfachung des Zugangs zu den Inhalten durch die Konfiguration. Trotzdem ist jeder selbst verantwortlich für das was er liest und teilt und entscheidet selbst.

Ich versuche einen Vergleich mit dem Straßennetz. Egal, ob ich über eine Autobahn, eine private Mautstraße oder eine Bundesstraße ins Netz einsteige: Viele Wege führen nach Rom. Man ist nicht auf eine Route angewiesen. Es gibt mehrere Optionen/Instanzen und ich wähle aus. Wenn ich in einer kleinen Stadt an einer Gemeindestraße wohne, komme ich über diese Zufahrt hinein. Sie wird durch Steuern finanziert. In einer Region, in der es nur mautpflichtige Straßen gibt, gelten andere Regeln.

### Fediverse, ActivityPub, IndieWeb








#### Das Fediverse


Das Fediverse ist eine Gruppe von föderierten Servern. Das sind Server, die miteinander verbundenen sind. Sie werden für Web-Publishing verwendet, sind unabhängig voneinander gehostet und können trotzden miteinander kommunizieren. Auf verschiedenen Servern können die Nutzer so genannte Identitäten anlegen. Ein Server wird auch Instanz genannt. Diese Identitäten sind in der Lage, über die Grenzen der Instanzen hinweg zu kommunizieren, da die auf den Servern laufende Software Kommunikationsprotokolle unterstützt, die einem offenen Standard folgen. Im Fediverse können die Nutzer Texte und andere Medien veröffentlichen oder den Beiträgen anderer folgen.

> **Fediverse** ([Kofferwort](https://de.wikipedia.org/wiki/Kofferwort "Kofferwort") aus engl. *federation* und *universe*) oder **Fediversum**^[[1]](https://de.wikipedia.org/wiki/Fediverse#cite_note-1)^ bezeichnet ein Netzwerk [föderierter](https://de.wikipedia.org/wiki/F%C3%B6deration_(Informatik) "Föderation (Informatik)"), voneinander unabhängiger [sozialer Netzwerke](https://de.wikipedia.org/wiki/Soziales_Netzwerk_(Internet) "Soziales Netzwerk (Internet)"), [Mikroblogging](https://de.wikipedia.org/wiki/Mikroblogging "Mikroblogging")-Dienste und [Webseiten](https://de.wikipedia.org/wiki/Webseite "Webseite") für [Online-Publikation](https://de.wikipedia.org/wiki/Online-Publikation "Online-Publikation") oder Daten-Hosting. Das Konzept kam 2008 mit [GNU Social](https://de.wikipedia.org/wiki/GNU_Social "GNU Social") auf und verbreitete sich 2016 vermehrt mit [Mastodon](https://de.wikipedia.org/wiki/Mastodon_(Software) "Mastodon (Software)") und dem 2018 vom [World Wide Web Consortium](https://de.wikipedia.org/wiki/World_Wide_Web_Consortium "World Wide Web Consortium") (W3C) definierten [Kommunikationsprotokoll](https://de.wikipedia.org/wiki/Kommunikationsprotokoll "Kommunikationsprotokoll") *[ActivityPub](https://de.wikipedia.org/wiki/ActivityPub "ActivityPub")*. - [Wikipedia](https://de.wikipedia.org/wiki/Fediverse)



Nun gut, das ist eine Menge Theorie. Lass uns die Definition aufschlüsseln.

> miteinander verbundene Server [...], die unabhängig voneinander gehostet werden [...], können miteinander kommunizieren

Im Grunde betreiben also Menschen ihre eigenen Server, die aber miteinander kommunizieren können, weil sie sich auf Regeln oder einen Standard geeinigt haben.

> [...] sogenannte Identitäten erstellen

Man erstellt ein lokales Konto.

> Diese Identitäten können kommunizieren [...]

Aber dieses lokale Konto wird von anderen Servern erkannt.

Das bedeutet, das Fediverse ist nicht wie Twitter zentral organisiert. Es ähnelt eher E-Mail-Servern. Man kann ein `@community.joomla.org`, ein `@gamil.com` oder ein eigenes Konto einrichten wie `@astrid-guenther.de`. 

Dies ist komplex und bedeutet für den Einzelnen zusätzlichen Aufwand. Aber es hat Vorteile:

1.  Du kannst deinen eigenen Server hosten und so deine Daten kontrollieren.
2.  Du kannst Teil einer Community sein, die so strenge oder lockere Regeln hat, wie du willst.

Es gibt viele Fediverse-Dienste. Der bekannteste ist [mastodon] (https://joinmastodon.org/). Mastodon ähnelt in der Anwendung Twitter und bietet dabei unterschiedliche Instanzen. So kannst ein Konto bei [https://fimidi.com](https://fimidi.com) oder <https://mastodon.social> oder etwas ganz anderem haben. Egal, was du benutzt, du kannst damit kommunizieren.

Todo mein Flusdiagramm

Es gibt nicht nur Mastodon. Im Allgemeinen kann Föderation für so etwas wie einen YouTube-Klon wie [PeerTube](https://joinpeertube.org/), Audio-Streaming wie [Funkwhale](https://funkwhale.audio/), Instagramm-Klon wie [PixelFed](https://pixelfed.org/), Veranstaltungsplanung wie [Gath.io](https://gath.io/) und viele andere Dinge verwendet werden. Unter viele andere Dinge fällt ein CMS. [Wordpress](https://de.wordpress.org/plugins/activitypub/) und [Drupal](https://www.drupal.org/project/activitypub) zum Beispiel. Der entscheidende Punkt ist, dass für jedes dieser Systeme eine Identität verwendet werden kann, und dass der Server, den du verwendest, wählen kann, mit wem er sich zusammenschließt. Wenn du den Server selbst hostest, entscheidest du. Konkret bedeutet das folgendes:

- Der Server im Fediverse ist zensurresistent

- Das Fediverse erlaubt es dir, einer Gemeinschaft beizutreten, die Dinge, die du nicht magst, nicht zulässt

- Dienste im Fediverse lassen dich deine Daten so weit kontrollieren, wie du es möchtest.

Das klingt widersprüchlich. Wie kann etwas zensurresistent sein, aber trotzdem Gemeinschaften mit beliebigen Regeln haben? Nun, das Schlüsselwort ist hier Gemeinschaften, und zwar im Plural. Diese Gemeinschaften sind immer noch getrennt, sie schließen sich nur zusammen *wenn* sie das wollen. Ebenso wirst du sicher nur dann einer Gemeinschaft beitreten, wenn du ihre Regeln für gut hältst. Da es mehr als eine Gemeinschaft gibt, wirst du sicher Gleichgesinnte finden. Wenn nicht, gründest du deine eigene Instanz mit deinen eigenen Regeln und ohne Zensur.

Wenn eine Instanz Menschen beheimatet, die Dinge diskutieren, die dich und deine Gemeinschaft nicht interessieren, werde ihr euch nicht verbinden. Du kannst auf deinem  Server die tollsten Joomla Neuigkeiten posten. Eine Garten Community wird wenig Inhalte mit euch teilen. Es gibt sicher auch bösartige Teilnehmer im Fediverse, so wie im wirklichen Leben. Denen ist es möglich, sich auf einer Instanz auszutauschen ohne das Zensur erfolgt. Dies ist für viele ein problematischer Punkt, aber in meinen Augen viel besser als die zentrale Alternative, bei der jeder diese Inhalte sieht und sie in einem komplizierten Verfahren zensiert werden.


#### ActivityPub

Auf der Website von ActivityPub, [activitypub.rocks](https://activitypub.rocks/) steht:

ActivityPub ist ein dezentrales Protokoll für soziale Netzwerke, das auf dem Datenformat [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/) basiert. ActivityPub ist ein offizieller vom W3C empfohlener Standard, der von der [W3C Social Web Working Group](https://www.w3.org/wiki/Socialwg) veröffentlicht wurde. Er bietet eine Client-zu-Server-API zum Erstellen, Aktualisieren und Löschen von Inhalten sowie eine föderierte Server-zu-Server-API zum Bereitstellen von Benachrichtigungen und Abonnieren von Inhalten.

Klingt spannend? Nein! Es ist aber nützlich.

Es ist eine Möglichkeit für Dienste und Websites, miteinander kommunizieren. Das ist eine Form der oben erwähnten Föderation. Im Grunde ist es eine Vereibarung darüber, wie sich Dinge zusammenschließen, das Protokoll oder die Regeln.

Verständlicher wird dies mit einem Beispiel aus dem Alltag. Wenn Menschen miteinander reden, nutzen Sie Sprache. Das Gespräch ist die Föderation. Die Grammatikregeln und das Vokabular ist ActivityPub.

#### The IndieWeb 

The IndieWeb is a [people](https://indieweb.org/people)-focused alternative to the "corporate web".

- [indieweb.org](https://indieweb.org/)

Ehrlich, dass sagt alles und nichts. Die Beschreibung passt genauso zum Fediverse. Wo ist also der Unterschied? Sehen wir uns das nachfolgend genauer an.

##### Du bist besser vernetzt

Im Grunde genommen ist das IndieWeb das Web. Es sind HTML-Dateien, aus denen eine Website besteht. Es hat nicht wirklich einen Service-Aspekt. Das Fediverse erwartet, dass immer ein Dienst läuft.

Deine Artikel und Statusmeldungen können "im IndieWeb" [an alle Dienste](https://indieweb.org/POSSE) gesendet werden, nicht nur an einen, so dass du mit allen in Kontakt treten kannst. Sogar Antworten und Likes auf anderen Diensten können [auf deine Website zurückgeleitet werden](https://indieweb.org/backfeed), so dass diese alle an einem Ort sind. Voraussetzung ist, dass jeder Dienst die Regeln befolgt.

Das ist eine Umschreibung dafür, dass, wenn du etwas auf deiner eigenen Website veröffentlichst, sie automatisch Links zu all diesen verlinkten Websites posten sollte. Deine Website sollte zudem automatisch die Antworten von all diesen Dingen abrufen.

Außerdem ist es im Sinne des Indiewebs wichtig, unabhängig zu sein. Das bedeutet, dass große Unternehmenswebsites, im Sinne der Dezentralisierung nicht gewünscht.


#### FAQ 

1. Warum sollte ich meine Website im Fediverse oder IndieWeb haben wollen?

Du möchtest, dass deine Website mit anderen Websites interagieren kann.

2. Warum sollte ich wollen, dass meine Website das kann?

Du wünschst, dass deine Inhalte mit Inhalten auf anderen Websites verbunden werden, ohne dass du sie direkt an einem dieser Orte veröffentlichst. Das bedeutet, dass du immer noch die volle Kontrolle über diese Website hast, zusätzlich kannst du sie mit anderen teilen, unabhängig von einer Plattform.

3. Sind ActivityPub und Federation das Gleiche?

ActivityPub und Federation werden immer mehr zu Synonymen. Es handelt sich aber eigentlich nicht um das Gleiche. Federation steht für Verbund. ActivityPub regelt diesen Verbund. ActivityPub hat den Nachteil, dass man sich an Regeln halten muss. ActivityPub hat den Vorteil, dass man auf die Einhaltung von Regeln verlassen kann.

4. Welche Rolle spielt das indieweb?

Beim Indieweb kommunizierst du mit anderen Webiste und bist verbunden. Die Verbindung beruht aber nicht auf einem Service der immer aktiv ist.

5. Ich bin immer noch verwirrt.

Wenn bedeutende soziale Netze wie Twitter, Facebook oder Instagramm abgeschaltet werden, verlierst du deine Follower. Bei einigen Plattformen ist es keine Frage des "ob", sondern des "wann". Auf solche Ereignisse folgt in der Regel eine Flucht in eine Vielzahl verschiedener Plattformen, bei der man unweigerlich einige Leute verliert, weil man sich entscheiden muss, auf welcher man bleiben will. Das ist schon vorgekommen. Aber es muss nicht wieder passieren. Nutze das föderierte Web. Idealerweise nutzt du das föderierte Web.












### Das föderierte Web - sachlich und emotional 

#### sachliche Gesichtspunkte

Das Fediverse kann nicht einem oder wenigen Menschen zugeschrieben werden, sondern allen Menschen. Die Angebote, die ich kenne, sind ausschließlich Open Source. Jeder hat die Möglichkeit, den Code der Software einzusehen, sie zu nutzen oder mitzugestalten. Es gibt also nicht nur einen Link zu einem Dienst im Fediverse, so wie es nur einen Link zu Twitter[^de.wikipedia.org/wiki/Twitter] gibt. Stattdessen gibt es unzählige Instanzen, die über das Internet miteinander verbunden sind: Es ist ein großes, dezentralisiertes Netzwerk.

Das von anderen Plattformen bekannte Geschäftsmodell, bei dem mit Daten und Werbung Geld verdient wird, gibt es bei Fediverse nicht. Jede Instanz entscheidet selbst, wie sie sich finanziert. Zum Beispiel durch Crowdfunding, öffentliche Mittel, Spenden oder einen Nutzungsbeitrag. Aufgrund der dezentralen Ausrichtung sind Werbung und Daten nicht lukrativ. Da die Gewinnerzielung nicht im Vordergrund steht und die Arbeit meist ehrenamtlich geleistet wird, wird weniger Geld benötigt. So ist es möglich, einen Raum mit freundlichen Bedingungen für Vernetzung und Austausch zu schaffen.

> Wenn ich mir anschaue, wie das Fediverse im Vergleich zu den zentralen Plattformen funktioniert, komme ich zu dem Schluss, dass ersteres eindeutig das bessere Modell ist.

#### emotionale Gedanken

Vor ein paar Jahren habe ich aus Neugierde einen Blick auf das Fediverse geworfen. Erst seit kurzer Zeit bin ich dort aktiv und teile hier meinen ersten Eindruck. Bis jetzt habe ich soziale Netzwerke im Internet gemieden. Das hat sich im Februar 2022 geändert. Immer öfter lese ich in den Nachrichten, dass Berichte aus der Ukraine nicht unabhängig überprüfbar sind. In den letzten Jahren hatte ich in Open-Source-Projekten Kontakt zu Programmierern, die in der Ukraine leben. Ich war an ihrem Schicksal interessiert und habe deshalb die Beiträge in sozialen Netzen gelesen. Ich kenne die Menschen nicht persönlich, aber ich fühlte mich durch die frühere digitale Kommunikation mit ihnen verbunden und ich vertraute den Beiträgen dieser Menschen. Irgendwann kam ich zu dem Schluss, dass ein Austausch über soziale Netzwerke wichtig ist. Und das Internt ermöglicht dies in der heutigen Zeit.

> In der zentralisierten Form fühlte ich mich weiterhin unwohl. Deshalb habe ich für mich die dezentrale Variante gewählt. 

### Was hat mich überzeugt?

Die Diskussionskultur im Fediverse ist anders: Sie ist interessierter und konstruktiver. Wenn man etwas mitteilt, in dem ein Fehler steckt, wird man korrigiert und nicht belächelt oder beschimpft. Meiner Meinung nach liegt das daran, dass die Struktur des Netzwerks anders ist. Streitigkeiten kommen vor - aber die Mechanismen im Fediverse sorgen dafür, dass sie nicht ausarten. 

Es gibt eine gemeinsame Verantwortung für den Online-Raum. Zumindest dann, wenn dieser nicht zu groß und somit anonym ist. Ähnlich wie bei Barcamps wie dem JoomlaCamp[^joomlacamp.de/]. Man gestaltet gemeinsam einen Tag, der für alle gewinnbringend ist. Es ist absurd, sich am Ende zu beschweren. Jeder hat es selbst in der Hand. Jeder hat die Möglichkeit, den gemeinsamen Online-Raum mitzugestalten: Neulinge unterstützen, Dinge teilen, Verbesserungsvorschläge machen, Fehler melden, sogar auf Github mit programmieren.

Ich erlebe das Fediverse als facettenreich. Ich denke, das liegt daran, dass ich für das, was mir präsentiert wird, verantwortlich bin und nicht ein fremder Algorithmus. So kommt es öfter vor, dass ich auf neue und andere Sichtweisen stoße. 

> Ich bin gespannt, ob sich das Fediverse in der Gesellschaft durchsetzen wird. Ob es gelingt, mehr zu demokratisieren. Ich denke, es ist wie mit dem Einkaufen in einem Bioladen oder einem Discounter. Man verändert nicht die ganze Welt, nur einen kleinen Teil davon.

### Ein Dienst im Fediversum: Mastodon

Mastodon ist eine Software im Fediversum, die dem beliebten zentralen Anbieter Twitter ähnelt. Einige Dinge werden anders genannt. Anstatt zu twittern, wird getrötet. Ansonsten gibt es viele Ähnlichkeiten: zum Beispiel Hashtags, Teilen, Liken, Follower und Kurznachrichten.

Was es nicht gibt: Es gibt nicht den einen Mastodon-Anbieter. Das ist ähnlich wie bei anderer Open-Source-Software: Es gibt nicht ein Joomla, sondern viele Installationen von Joomla auf verschiedenen Servern, die von verschiedenen Leuten verwaltet werden. Normalerweise entdeckt man als erstes eine der großen Mastodon-Instanzen. Im Sinne der Dezentralisierung ist es sinnvoller, den Anbieter sorgfältig auszuwählen. 

Eine Übersicht über die möglichen Instanzen gibt es unter instances.social[^instances.social].

Wer nach mir sucht, findet mich unter https://fimidi.com/@astrid als @astrid@fimidi.com.
<img src="https://vg04.met.vgwort.de/na/0fb6026875be4c50b396ec96021a5e64" width="1" height="1" alt="">
