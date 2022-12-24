---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
  - https://ug-mayen.de/de/joomla-blog-de/135-indieweb
  - https://fimidi.com/@astrid/109370365972980807
shortTitle: 'short'
date: 2022-11-12
title: 'IndieWeb'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-joomla-indieweb
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---


Im [IndieWeb](https://indieweb.org/)[^indieweb.org/] geht es darum, dass man seine Inhalte selbst in die Hand nimmt. Man teilt seine Gedanken und Ideen an einem Ort und verbreitet sie dann auf anderen sozialen Plattformen. Was ist, wenn ein soziales Netzwerk sich so entwickelt, dass du dich dort nicht mehr wohl fühlst? Oder es wird ganz abgeschaltet? Was wird in diesem Falle aus all deinen Beiträgen?

Meiner Meinung nach sollte deine digitale Identität dir gehören und nicht einem kommerziellen Unternehmen. Du sollten der alleinige Eigentümer der Inhalte sein, die du online teilst. Und das ist es, wozu IndieWeb die Menschen ermutigt.

## Was ist das IndieWeb?

> The IndieWeb is a people-focused alternative to the ‘corporate web’. - IndieWeb.org

Der Kerngedanke des IndieWeb ist es, dass du durch eine URL identifiziert wirst. Du hast die Kontrolle über eine bestimmte Website oder Webpräsenz. Du schreibst Beiträge auf dieser Website, und diese Beiträge werden mit einem Permalink versehen. Andere Menschen können Feeds deiner Website und deiner Webbeiträge abonnieren. Du fügst zusätzliches Markup zu dem HTML deiner Website hinzu, um automatisch auslesbare Endpunkte bereitzustellen. So können auch Maschinen deinen Inhalten eine Bedeutung zuordnen.

Im Grunde genommen ist das IndieWeb das Web. Es sind HTML-Dateien, aus denen eine Website besteht. Es gibt keinen definierten Service-Aspekt. 
Man kann [Microservices](https://de.wikipedia.org/wiki/Microservices)[de.wikipedia.org/wiki/Microservices] für Dinge wie 
- [IndieAuth](https://en.wikipedia.org/wiki/IndieAuth)[^en.wikipedia.org/wiki/IndieAuth], 
- [Webmentions](https://en.wikipedia.org/wiki/Webmention)[^en.wikipedia.org/wiki/Webmention] oder 
- [Micropub](https://en.wikipedia.org/wiki/Micropub_(protocol))[^en.wikipedia.org/wiki/Micropub_(protocol)] 
einrichten.

## Eine Joomla Website im IndieWeb

Von hier an werde ich die Schritte beschreiben, die ich bisher unternommen habe, um eine Joomla Website für das IndieWeb einzurichten. Die Website [indiewebify.me](https://indiewebify.me/), war hierbei eine große Hilfe.

Ich entschied mich dazu, Joomla-Plugins zu verwenden und diese so zu erstellen, dass sie in jedem Template eingesetzt werden können. 

### Bürger des IndieWeb Level 1

#### Die eigene Domain

Eine [persönliche Domain](https://indieweb.org/personal-domain) gibt dir Kontrolle über einen Raum. So wie andere Identitäten wie E-Mail-Adresse oder Telefonnummer. Ich besitze bereits eine Domain und Speicherplatz, um eine Website zu hosten. Das ist eine Voraussetzung, um ein "Bürger des IndieWeb" zu werden. Wenn du eine Joomla Website besitzt, erfüllst du diese Voraussetzung sicherlich ebenfalls. 

#### Web Sign In einrichten

Um dich mit deinem Domänennamen per [Web Sign In](https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain) anmelden zu können, verbindest du diesen mit deinen bestehenden Identitäten.

Wahrscheinlich hast du bereits andere Profile im Web. Wenn du diese mit dem Mikroformat [`rel=me`](http://microformats.org/wiki/rel-me) mit deinem Domänennamen verknüpfst, ist es leicht zu erkennen, dass du bei Google, Twitter, Github, Flickr oder Facebook dieselbe Person bist und diese Person mit deiner Domäne verbunden ist. Auch deine E-Mail-Adresse kannst du verbinden.

##### Meine Vorgehensweise

In einem Content Plugin habe ich einen Parameter implementiert, in dem man seine `rel=me` einfügt. Das Plugin liest diese mit folgendem Code aus.

```php
// Web Sign In
$row->text = $row->text . '<div class="hidden"><ul>';
$row->text = $row->text . '<li><a rel="me" href="mailto:' . $row->email . '">' . $row->email . '</a></li>';

foreach ($this->params->get('websignin') as $websigninitem) {
    $row->text = $row->text . '<li><a rel="me" href="' . $websigninitem->websignin_url . '">' . $websigninitem->websignin_url . '</a></li>';
}
$row->text = $row->text . '</ul></div>';
```

![Set up Web Sign In](/images/cassiopeia_indieweb_1.png)

Im HTML-Quellcode der Beitragsansicht werden die Relationen aufgelistet.

```html
<div class="hidden">
  <ul>
    <li><joomla-hidden-mail  is-link="1" is-email="1" first="aW5mbw==" last="YXN0cmlkLWd1ZW50aGVyLmRl" text="aW5mb0Bhc3RyaWQtZ3VlbnRoZXIuZGU=" base="" >This email address is being protected from spambots. You need JavaScript enabled to view it.</joomla-hidden-mail>
    </li>
    <li><a rel="me" href="https://fimidi.com/@astrid">https://fimidi.com/@astrid</a>
    </li>
    <li><a rel="me" href="https://github.com/astridx">https://github.com/astridx</a>
    </li>
    <li><a rel="me" href="https://twitter.com/astridguenther">https://twitter.com/astridguenther</a>
    </li>
    <li><joomla-hidden-mail  is-link="1" is-email="0" first="aW5mbw==" last="YXN0cmlkLWd1ZW50aGVyLmRl" text="bWFpbHRvOmluZm9AYXN0cmlkLWd1ZW50aGVyLmRl" base="" >This email address is being protected from spambots. You need JavaScript enabled to view it.</joomla-hidden-mail>
    </li>
  </ul>
</div>
```

Wichtig ist nun noch, dass du auf jeder der anderen Websites einen Link zurück zu deiner Website einbaust. Es ist zwingend, dass dieser ebenfalls mit einem `rel=me` versehen ist!

> Magst du die Anmeldung via E-Mail Adresse testen? Melde dich bei webmention.io via deiner Website an. Du erhält eine E-Mail an die mit `rel="me"` gekennzeichnete E-Mail-Adresse. Hierin findest du einen Code mit dem du dich dann authentifizierst.

Falls du E-Mails mit `rel=me` verwendest, ist erforderlich das Plugin _Inhalt – E-Mail-Verschleierung_ zu deaktivieren.

### Publizieren im IndieWeb Stufe 2

#### Kennzeichne deinen Inhalt (Profil, Notizen, Artikel, etc...) mit [Microformaten](https://microformats.org/)

Andere Menschen können die Informationen lesen und verstehen, die du auf deiner Website veröffentlichst. Durch Hinzufügen von CSS-Klasse zum HTML-Code können Maschinen diese ebenfalls auswerten und interpretieren. Nützlich ist dies beispeislweise für Dinge wie [Feedback](https://indieweb.org/reply-context), [Kommentare](https://indieweb.org/comment) oder [Event-RSVPs](https://indieweb.org/rsvp).

Per Content Plugin habe ich [h-card](https://microformats.org/wiki/h-card) und [h-entry](http://microformats.org/wiki/h-entry) als verstecktes HTML-Element zum Content der Joomla Website hinzugefügt. So ist zwar der Inhalt dupliziert. Dafür ist sichergestellt, dass das Design des Templates nicht angetastet wird. Umgekehrt ist mein Template nicht darauf angewiesen, dass ein Template in einem eventuellen Override den Content innerhalb eines besimmten HTML-Elementes positioniert. Unter Umständen muss die CSS-Klasse `hidden` im Template ergänzt werden. Das Joomla Standard-Template-Cassiopeia verfüg von Hause aus über diese Klasse.

##### Meine Vorgehensweise

```php
$row->text = $row->text . '<article class="hidden h-entry">
<h1 class="p-name">' . $row->title . '</h1>
<p>Published by 
<a class="p-author h-card" href="' . $row->webpage . '">' . $row->authorname . '</a> on 

<time class="dt-published" datetime="' . $row->publish_up . '">' . $row->publish_up . '</time>
</p>
<p class="p-summary">' . $row->introtext . '</p>
<div class="e-content">' . str_replace($row->introtext, '', $row->text) . '</div>
</article>';
```

> Die Syntax kann man mittels [indiewebify.me](https://indiewebify.me) testen.

#### Webmentions an andere IndieWeb-Sites senden

Wenn du einen Beitrag einer anderen IndieWeb-Site verlinkst, kannst du eine [Webmention](http://webmention.org/) senden. So kann ein Websitebesucher auf der anderen Website erkennen, dass diese auf deiner Website in Verbindung steht. Das Versenden von Webmentions ermöglicht es, auf der eigenen Website Antworten auf andere Inhalte zu schreiben und an seitenübergreifenden Unterhaltungen teilzunehmen. Klingt kompliziert? Nun, es ist genau wie bei sozialen Netzwerken, wo man auf einen Beitrag reagiert, indem man ihn kommentiert oder liked.

Die Erstellung der Webmentions habe ich bisher nicht automatisiert. Ich nutze für den Anfang dieses [Formular](https://indiewebify.me/send-webmentions/)[indiewebify.me/send-webmentions/] zu diesem Zweck.

### Federating IndieWeb Unterhaltungen Stufe 3

#### Markiere deinen Beitrag als Antwort auf einen anderen Text

Das Veröffentlichen von [Antworten](https://indieweb.org/reply) auf die Beiträge anderer Leute ist der nächste Schritt, nachdem man sie via [Webmentions](http://webmention.org/) erwähnen kann.

Normalerweise ist eine Antwort eine [note](https://indieweb.org/note) wie jede andere auch. Zusätzlich verlinkt sie auf den Beitrag, auf den sie antwortet. Wenn sie mit `h-entry` und `rel=in-reply-to` oder `class=u-in-reply-to` gekennzeichnet ist, ist nicht nur für Maschinen klar erkennbar, dass es sich um eine Antwort auf den verlinkten Beitrag handelt. Idealerweise wird der Text als Kommentar zu dem verlinkten Beitrag hinzugefügt. 

> Versuche, um zu testen, ob das Senden von Webmentions funktioniert, auf einen Beitrag von jemandem zu antworten, der das Empfangen von Kommentaren implementiert hat. Es gibt eine Liste [im Wiki](https://indieweb.org/webmention#IndieWeb_implementations)[^indieweb.org/webmention#IndieWeb_implementations].

> Wenn du möchtest, kannst du auch einen Schritt weiter gehen und eine Kopie des Beitrags, auf den du antwortest, anzeigen. Dies wird [Antwortkontext](https://indieweb.org/reply-context) genannt. 

##### Meine Vorgehensweise

Ich füge per Custom Fields Plugin folgenden Codeschnipsel zum Beitrag hinzu, wenn ein Antwortlink im Custom Field eingetragn ist. Den Permalink ersetze ich mit dem korrekten.

> Antworten auf anderen Seiten behandele ich bisher auf der eigenen Website noch nicht als Kommentar.

```html
<div class="u-in-reply-to h-cite">In Reply to 
<a class="u-url" href="permalink"> this article.</a>
</div>
```

Wichtig ist hierbei, dass das Custom Field im Beitragstext eingefügt wird und nicht die automatische Anzeige vor oder nach dem Inhalt gewählt wird. Nur so wird das Element im versteckten Bereich innerhalb der CSS-Klasse `h-entry` angezeigt. Dies ist eine [Voraussetzunge](https://indieweb.org/in-reply-to)[^indieweb.org/in-reply-to]!

#### Erhalte Webmentions

Nachdem du nun in der Lage bist, Webmentions zu posten, die auf den Websites anderen erscheinen, besteht der nächste Schritt darin, dass du selbst Webmentions empfangen kannst. Es gibt mehrere Möglichkeiten, dies zu tun. Ich mache es mir einfach und implementiere den Dienst [webmention.io](http://webmention.io/). Jetzt fehlte nur noch eine Möglichkeit, die Webmentions anzuzeigen. Für den Anfang füge ich die Url unter dem Inhalt ein.

##### Meine Vorgehensweise

Ich habe ein Zusammenspiel von drei Plugins implementiert.

###### System Plugin 

Via System Plugin schreibe ich die notwendigen Informationen in den `head` der Website. Im Falle von webmention.io sind dies die folgenden Endpunkte, wobei username die Adresse der Website ist.

```
<link rel="webmention" href="https://webmention.io/username/webmention" />
<link rel="pingback" href="https://webmention.io/username/xmlrpc" />
```

###### Task Plugin

Via Task Plugin hole ich einmal täglich Webmentions von `https://webmention.io` ab und speichere sie in einer Datei. Hierfür ist ein Token `https://webmention.io`  erforderlich, welches ich per Parameter in den Einstellungen zum Plugin einfüge.


```php
    private function writewebmentionFile(string $config): int
    {
        $file = $this->webmentionFile;

        try {
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, 'https://webmention.io/api/mentions.jf2?token=' . $this->params->get('token'));
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

            File::write($file, $response);
        } catch (Exception $e) {

        ....

        return Status::OK;
    }
```

![Joomla Task Plugin](/images/cassiopeia_indieweb_2.png)

###### Content Plugin

Die per Task Plugin geladenen und gespeicherten Webmentions lese ich im Content Plugin bei jedem Aufruf aus und zeige sie im Beitrag an.


```php
$webmention_file = JPATH_BASE . '/plugins/task/indieweb/webmentions.json';
$webmentions = file_get_contents($webmention_file);
$webmentions = json_decode($webmentions);

$webmentions_urls = "";
if ($webmentions !== null) {
    foreach ($webmentions->children as $i => $webmention) {
        if (str_contains($webmention->{'mention-of'}, $row->alias)) {
            $webmentions_urls = $webmentions_urls . '<a href="' . $webmention->url . '">' . $webmention->url . '</a></br>';
        }
    }
}

$row->text = $row->text . '<div><b>Webmentions</b><br>' . $webmentions_urls . '</div>';

```

Das Content-Plugin leistet weitere Arbeit. Es fügt die unsichtbaren Texte mit den Mikroformaten ein. Es setzt auch die unten beschriebenen Syndikationslinks im passenden Format ein.

#### Syndication und Backfeed

Ein Rätsel waren für mich zwei Begriffe, auf die ich beim Lesen stieß. Sie scheinen zum IndieWeb zu gehören. Es sind [POSSE](https://indieweb.org/POSSE) und [Backfeed](https://indieweb.org/backfeed). Ich kann sie nicht genau einordnen, deshalb füge ich sie am Schluss an.

`POSSE` bedeutet, dass du deine Inhalte zuerst auf deiner eigenen Website veröffentlichst und dann Links auf anderen sozialen Plattformen postest. 

> Publish on your Own Site, Syndicate Elsewhere

Dies tust du beispielsweise, indem du über deinen Beitrag trötest und in diesem Toot einen Link zu deiner Website setzt. 

`Backfeed` beschreibt den Prozess, bei dem die Interaktionen deiner POSSE-Kopien auf den ursprünglichen Beitrag gezogen werden. Wenn also jemand einen Toot mit dem Link zu deinem Beitrag kommentiert, wird dieser tatsächlich als Webmention auf deine Website zurückverlinkt.

Das Hinzufügen von Syndication Markup ist unkompliziert, es ist ein weiteres [Mikroformat](http://microformats.org/wiki/h-entry#u-syndication "microformat"), welches zum Content hinzugefügt werden kann.

##### Meine Vorgehensweise

Ich füge per Editor-xtd Plugin ein Pattern ein.

`{loadsyndication syndicationurl1,syndicationurl1,syndicationurl1}`

![Joomla IndieWeb Syndication](/images/cassiopeia_indieweb_3.png)

Dieses Pattern passe dann via Content Plugin an.

```php
...
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
    $syndication_urls = $syndication_urls . '<li><a class="u-syndication" rel="syndication" href="' . $matche . '">' . $matche . '</a></li>';
}

$syndication_urls = $syndication_urls . '</ol></div>';
$row->text = $row->text . $syndication_urls;
$row->text = preg_replace($regex, '', $row->text);
...

```

## Links

- [Indiewebify me! And don't forget my webmentions!](https://chringel.dev/2022/07/indiewebify-me-and-dont-forget-my-webmentions/)[^chringel.dev/2022/07/indiewebify-me-and-dont-forget-my-webmentions/]
- [Am I on the IndieWeb Yet?](https://www.miriamsuzanne.com/2022/06/04/indiweb/)[^miriamsuzanne.com/2022/06/04/indiweb/]
- [indieweb.org](https://indieweb.org/)[^indieweb.org/]
- [https://indiewebify.me/](https://indiewebify.me/)[indiewebify.me/]
- [Am I on the IndieWeb Yet?](https://www.miriamsuzanne.com/2022/06/04/indiweb/)[miriamsuzanne.com/2022/06/04/indiweb/]
- [Into the Personal-Website-Verse](https://matthiasott.com/articles/into-the-personal-website-verse)[^matthiasott.com/articles/into-the-personal-website-verse]
- [Beispielcode der Plugins](https://blog.astrid-guenther.de/joomla-plugins)[^blog.astrid-guenther.de/en/joomla-plugins]

<img src="https://vg05.met.vgwort.de/na/9ffc143919f04c1ebc0b22826ad63e3c" width="1" height="1" alt="">
