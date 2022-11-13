---
description: 'desc'
syndication: 
  - https://ug-mayen.de/de/joomla-blog-de/135-indieweb
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

Nun gut, von hier an werde ich die Schritte beschreiben, die ich unternommen habe, um eine Joomla Website für das IndieWeb einzurichten. Die Website [indiewebify.me](https://indiewebify.me/), war hierbei eine große Hilfe.

Ich entschied mich dazu, Joomla-Plugins zu verwenden und diese so zu erstellen, dass sie in jedem Template eingesetzt werden können. 

### Bürger des IndieWeb Level 1

#### Die eigene Domain

Eine [persönliche Domain](https://indieweb.org/personal-domain) gibt dir Kontrolle über einen Raum. So wie andere Identitäten wie E-Mail-Adresse oder Telefonnummer. Ich besitze bereits eine Domain und Speicherplatz, um eine Website zu hosten. Das ist eine Voraussetzung, um ein "Bürger des IndieWeb" zu werden. Wenn du eine Joomla Website besitzt, erfüllst du diese Voraussetzung sicherlich ebenfalls. 

#### Web Sign In einrichten

Um dich mit deinem Domänennamen per [Web Sign In](https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain) anmelden zu können, verbindest du diesen mit deinen bestehenden Identitäten.

Wahrscheinlich hast du bereits andere Profile im Web. Wenn du diese mit dem Mikroformat [`rel=me`](http://microformats.org/wiki/rel-me) mit deinem Domänennamen verknüpfst, ist es leicht zu erkennen, dass du bei Google, Twitter, Github, Flickr, Facebook, E-Mail dieselbe Person bist und diese Person mit deiner Domäne verbunden ist.

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

> Magst du die Anmeldung via E-Mail Adresse testen? Melde dich bei webmention.io via deiner Website an. Du bekommt eine E-Mail an die `rel="me"` E-Mail-Adresse mit der du dich authentifizierst.

Falls du E-Mails mit `rel=me` verwendest, ist erforderlich das Plugin _Inhalt – E-Mail-Verschleierung_ zu deaktivieren.

### Publizieren im IndieWeb Stufe 2

#### Kennzeichne deinen Inhalt (Profil, Notizen, Artikel, etc...) mit [microformats2](https://microformats.org/)

Andere Menschen können die Informationen lesen und verstehen, die du auf deiner Website veröffentlichst. Durch Hinzufügen von CSS-Klasse zum HTML-Code können Maschinen diese ebenfalls auswerten und verstehen. Nützlich ist dies beispeislweise für Dinge wie [Feedback](https://indieweb.org/reply-context), [Kommentare](https://indieweb.org/comment) oder [Event-RSVPs](https://indieweb.org/rsvp).

Per Content Plugin habe ich [h-card](https://microformats.org/wiki/h-card) und [h-entry](http://microformats.org/wiki/h-entry) als verstecktes HTML-Element zum Content der Joomla Website hinzugefügt. So ist zwar der Inhalt dupliziert. Dafür ist sichergestellt, dass das Design des Templates nicht angetastet wird. Unter Umständen muss die CSS-Klasse `hidden` im Template ergänzt werden. Das Joomla Standard-Template-Cassiopeia hat dies von Hause aus.

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

Wenn du auf etwas auf einer anderen IndieWeb-Site antwortest oder jemanden mit einer IndieWeb-Site erwähnst, kannst du eine [Webmention](http://webmention.org/) senden. So kann ein Websitebesucher der anderen Website erkennen, dass diese auf deiner Website verlinkt worden ist. Das Versenden von Webmentions ermöglicht es, auf der eigenen Website Antworten auf andere Inhalte zu schreiben und an seitenübergreifenden Unterhaltungen teilzunehmen. Klingt kompliziert? Nun, es ist genau wie bei jedem anderen sozialen Netzwerk, wo man auf einen Beitrag reagiert, indem man ihn kommentiert oder liked.

Die Erstellung der Webmentions habe ich bisher nicht automatisiert. Ich nutze für den Anfang dieses [Formular](https://indiewebify.me/send-webmentions/)[indiewebify.me/send-webmentions/] zu diesem Zweck.

### Federating IndieWeb Unterhaltungen Stufe 3

#### Füge Antwort zu deiner Seite hinzu

Das Veröffentlichen von [Antworten](https://indieweb.org/reply) auf die Beiträge anderer Leute ist der nächste Schritt, nachdem man sie mit [Webmentions](http://webmention.org/) erwähnen kann.

Normalerweise ist eine Antwort eine [note](https://indieweb.org/note) wie jede andere auch, zusätzlich verlinkt sie auf den Beitrag, auf den sie antwortet. Wenn sie mit `h-entry` und `rel=in-reply-to` und/oder `class=u-in-reply-to` gekennzeichnet ist, kann die Antwort als Kommentar zu dem ursprünglichen Beitrag erscheinen.

> Versuche, um zu testen, ob das Senden von Webmentions funktioniert, auf einen Beitrag von jemandem zu antworten, der das Empfangen von Kommentaren implementiert hat. Es gibt eine Liste [im Wiki](https://indieweb.org/webmention#IndieWeb_implementations)[^indieweb.org/webmention#IndieWeb_implementations].

> Wenn du möchtest, kannst du auch einen Schritt weiter gehen und eine Kopie des Beitrags, auf den du antwortest, anzeigen. Dies wird [Antwortkontext](https://indieweb.org/reply-context) genannt. 

##### Meine Vorgehensweise

Ich füge folgenden Codeschnipsel zum Beitrag hinzu, wobei ich den Permalink mit einem korrekten ersetzte. 

```html
<div class="u-in-reply-to h-cite">
<a class="u-url" href="permalink"></a>
</div>
```

#### Erhalte Webmentions

Nachdem du nun in der Lage bist, Antworten zu posten, die als Kommentare auf den Websites anderer erscheinen, besteht der nächste Schritt darin, dass du selbst Kommentare empfangen kannst. Es gibt mehrere Möglichkeiten, dies zu tun. Ich mache es mir einfach und implementiere den Dienst [webmention.io](http://webmention.io/. Jetzt fehlte nur noch eine Möglichkeit, die Webmentions anzuzeigen. Für den Anfang füge ich die Url unter dem Inhalt ein.


##### Meine Vorgehensweise

Ich habe ein Zusammenspiel von drei Plugins implementiert.

###### System Plugin 

Via System Plugin schreibe ich die notwendigen Informationen in den `head` der Website.

###### Task Plugin

Via Task Plugin hole ich einmal täglich Webmentions von `https://webmention.io` ab und speichere sie in einer Datei. Hierfür ist ein Token `https://webmention.io` von erforderlich, welches ich per Parameter in den Einstellungen zum Plugin einfüge.


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

#### Syndication und Backfeed

Ein Rätsel waren für mich zwei Begriffe, auf die ich beim Lesen stieß. Sie scheinen zum IndieWeb zu gehören. Es sind [POSSE](https://indieweb.org/POSSE) und [Backfeed](https://indieweb.org/backfeed). Ich kann sie nicht genau einordnen, deshalb füge ich sie am Schluss an.

`POSSE` bedeutet, dass du deine Inhalte zuerst auf deiner eigenen Website veröffentlichst und dann Links auf anderen sozialen Plattformen postest. 

> Publish on your Own Site, Syndicate Elsewhere

Dies tust du beispielsweise, indem du über deinen Beitrag trötest und einen Link zu deiner Website setzt. 

`Backfeed` beschreibt den Prozess, bei dem die Interaktionen deiner POSSE-Kopien auf den ursprünglichen Beitrag gezogen werden. Wenn also jemand einen Tweet mit dem Link zu deinem Beitrag kommentiert, wird dieser tatsächlich als Webmention auf deine Website zurückverlinkt.

Das Hinzufügen von Syndication Markup ist unkompliziert, es ist ein weiteres [Mikroformat](http://microformats.org/wiki/h-entry#u-syndication "microformat"), welches manuell zum Content hinzugefügt werden kann.

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

