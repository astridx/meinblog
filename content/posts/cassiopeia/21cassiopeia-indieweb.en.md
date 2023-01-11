---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
  - https://ug-mayen.de/de/joomla-blog-de/135-indieweb
shortTitle: 'short'
date: 2022-11-12
title: 'IndieWeb'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-joomla-indieweb
langKey: en
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---









The [IndieWeb](https://indieweb.org/)[^indieweb.org/] is about taking control of your content, sharing your thoughts and ideas in one place and then spreading them on other social platforms. What if a social network becomes so that you don't feel comfortable there anymore? Or it gets shut down altogether? In that case, what happens to all your posts?<!-- \index{Indieweb} -->

In my opinion, your digital identity should belong to you and not to a commercial company. You should be the sole owner of the content you share online. And that's what IndieWeb encourages people to do.

## What is the IndieWeb?

> The IndieWeb is a people-focused alternative to the 'corporate web'. - IndieWeb.org

The core idea of the IndieWeb is that you are identified by a URL. You have control over a particular website or web presence. You write posts on that website, and those posts are permalinked. Other people can subscribe to feeds of your website and your web posts. You add additional markup to the HTML of your website to provide automatically readable endpoints. This way, machines can also assign meaning to your content.

Basically, the IndieWeb is the web. It's HTML files that make up a website. There is no defined service aspect. 
You can use [Microservices](https://de.wikipedia.org/wiki/Microservices)[en.wikipedia.org/wiki/Microservices] for things like. 
- [IndieAuth](https://en.wikipedia.org/wiki/IndieAuth)[^en.wikipedia.org/wiki/IndieAuth], 
- [Webmentions](https://en.wikipedia.org/wiki/Webmention)[^en.wikipedia.org/wiki/Webmention] or 
- [Micropub](https://en.wikipedia.org/wiki/Micropub_(protocol))[^en.wikipedia.org/wiki/Micropub_(protocol)].

## A Joomla website in the IndieWeb

Alright, at this point I will describe the steps I took to set up my Joomla website for the IndieWeb up to now. The website [indiewebify.me](https://indiewebify.me/), was a great help in this.

I already owned a domain and storage space to host a website. This is a prerequisite to become a "citizen of the IndieWeb". 

I decided to use Joomla plugins and create them so that they can be used in any template.

### Become a citizen of IndieWeb Level 1

#### Get your own domain name

A [personal domain](https://indieweb.org/personal-domain) is an identifier that gives you control over your space, just like other identities like email address or phone number. I already own a domain and webspace to host a website. This is a requirement to become a "citizen of the IndieWeb". If you own a Joomla website, you certainly meet this requirement as well. 

#### Set up Web Sign In

To be able to log in with your domain name via [Web Sign In](https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain), you connect it to your existing identities.

You probably already have many profiles on the web. If you link them to your domain name using the microformat [`rel=me`](http://microformats.org/wiki/rel-me), it is easy to see that you are the same person on Google, Twitter, Github, Flickr or Facebook and that this person belongs to your domain name. You can also connect your e-mail address.

##### My way of doing

In a content plugin I have inserted a parameter where you insert your `rel=me`. The plugin reads this out with the following code.

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

In the HTML source code of the post view, the relations are listed.

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

It is now important that you include a link back to your website on each of the other websites. It is important that this is also provided with a `rel=me`!

> Would you like to test the registration via e-mail address? Register with webmention.io via your website. You will receive an email to the email address marked with `rel="me"`. In this email you will find a code with which you can authenticate yourself.

If you use emails with `rel=me`, it is necessary to deactivate the plugin _Content - Email cloack_.

### Publishing on the IndieWeb Level 2

#### Tag your content (profile, notes, articles, etc...) with [microformats2](https://microformats.org/)

Other people can read and understand the information you publish on your website. By adding some simple class names to the HTML code, machines can also evaluate and understand it. This is useful for things like [Feedback](https://indieweb.org/reply-context), [Comments](https://indieweb.org/comment) or [Event-RSVPs](https://indieweb.org/rsvp).

##### My way of doing

Using a plugin, I added [h-card](https://microformats.org/wiki/h-card) and [h-entry](http://microformats.org/wiki/h-entry) as hidden HTML elements to the content of the Joomla website. Unfortunately, the content is duplicated, but this ensures that the design of the template is not touched. The other way round, my template does not depend on a template positioning the content inside a certain HTML element in a possible override. It may be necessary to add the CSS class `hidden` to the template. The Joomla default template Cassiopeia comes with this class out of the box.

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

> You can test the syntax using [indiewebify.me](https://indiewebify.me).

#### Webmentions to send to other IndieWeb sites

When you link to a post on another IndieWeb site, you can send a [Webmention](http://webmention.org/). This allows a site visitor on the other site to see that it is linked on your site. Sending webmentions allows you to post replies to other content on your own site and participate in cross-site conversations. Sound complicated? Well, it's just like social media where you respond to a post by commenting or liking it.

I have not automated the creation of the webmentions up to now. I use this [form](https://indiewebify.me/send-webmentions/)[indiewebify.me/send-webmentions/] for this purpose to get started.

### Federating IndieWeb Conversations Level 3

#### Mark your post as a reply to another text

Publishing [replies](https://indieweb.org/reply) to other people's posts is the next step after it is possible to mentioning them via [webmentions](http://webmention.org/).

Normally, a reply is a [note](https://indieweb.org/note) like any other. Additionally, it links to the post it is replying to. If it is marked with `h-entry` and `rel=in-reply-to` or `class=u-in-reply-to`, it is clear not only to machines that it is a reply to the linked post. Ideally, the text is added as a comment to the linked post. 

> To test whether sending webmentions works, try replying to a post by someone who has implemented receiving comments. There is a list [on the wiki](https://indieweb.org/webmention#IndieWeb_implementations)[^indieweb.org/webmention#IndieWeb_implementations].

If you want, you can also go a step further and show a copy of the post you are replying to. This is called [Reply Context](https://indieweb.org/reply-context).

##### My way of doing

I add the following code snippet to the post via Custom Fields plugin when a reply link is entered in the custom field. I replace the permalink with the correct one.

> I don't currently handle replies on other sites as comments on my own site.

```html
<div class="u-in-reply-to h-cite">In Reply to 
<a class="u-url" href="permalink"> this article.</a>
</div>
```

It is important here that the custom field is inserted in the article text and not the automatic display before or after the content is selected. This is the only way to display the element in the hidden area within the CSS class `h-entry`. This is a [requirement](https://indieweb.org/in-reply-to)[^indieweb.org/in-reply-to]!

#### Get webmentions on your site

Now that you are able to post webmentions that appear on others' websites, the next step is to be able to receive webmentions yourself. There are several ways to do this. I make it easy and implement the [webmention.io](http://webmention.io/) service. All that was missing now was a way to display the webmentions. For starters I add the url below the content.

##### My way of doing

I have implemented an interaction of three plugins.

###### System Plugin 

Via system plugin I write the necessary information into the `head` of the website. In the case of webmention.io, these are the following endpoints, where username is the website address.

```
<link rel="webmention" href="https://webmention.io/username/webmention" />
<link rel="pingback" href="https://webmention.io/username/xmlrpc" />
```


###### Task Plugin

Via Task Plugin I fetch webmentions from `https://webmention.io` once a day and save them in a file. For this, a token `https://webmention.io` is required, which I insert per parameter in the settings for the plugin.

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

I read out the webmentions out of the file saved by the task plugin in the content plugin each time they are called up and display them in the post.

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

The content plugin does further work. It inserts the invisible texts with the microformats. It also inserts the syndication links described below in the appropriate format.

#### Syndication and Backfeed

A puzzle for me were two terms I came across while reading. They seem to belong to the IndieWeb. They are [POSSE](https://indieweb.org/POSSE) and [Backfeed](https://indieweb.org/backfeed). I can't quite place them, so I'll add them at the end.

`POSSE` means that you publish your content on your own site first and then post links on other social platforms. 

> Publish on your Own Site, Syndicate Elsewhere

You do this, for example, by tooting over your post and putting a link to your website in that toot. 

`Backfeed` describes the process of pulling the interactions of your POSSE copy to the original post. So if someone comments on a toot with the link to your post, it will actually link back to your website as a webmention.

Adding syndication markup is straightforward, it's another [microformat](http://microformats.org/wiki/h-entry#u-syndication "microformat") that can be manually added to content.

##### My procedure

I add a pattern via editor-xtd plugin.

`{loadsyndication syndicationurl1,syndicationurl1,syndicationurl1}`

![Joomla IndieWeb Syndication](/images/cassiopeia_indieweb_3.png)

Then adapt this pattern via Content Plugin.

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
- [Example code of the Plugins](https://blog.astrid-guenther.de/en/joomla-plugins)[^blog.astrid-guenther.de/en/joomla-plugins]

<img src="https://vg05.met.vgwort.de/na/a5eca696110f4c3dacde2f4b5ea87425" width="1" height="1" alt="">
