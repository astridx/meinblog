---
description: 'desc'
set: ''
booklink: ''
syndication: 
shortTitle: 'short'
date: 2023-02-10
title: 'Making the Joomla website an ActivityPub server'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: soziale-netze-joomla
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








# Turning the Joomla website into an ActivityPub server and being an independent participant in the Fediverse - a start.

This article has two parts. In the first part, I summarise what each term means. In the second part, I briefly describe what I have implemented to make a Joomla website support the ActivityPub protocol and allow a Mastodon user to follow a Joomla website user.

## TLDR and FAQ

1. why Fediverse or IndieWeb for a website? 

A website owner wants their website to be able to network with other websites.

2. Why would someone want his website to do that?

He wants his content to be easily found by others. He wants his content to be linked to content on other websites without publishing it directly on one of these websites. This means that he still has full control over the content on his website and that he can share it with others, regardless of the platform. Wouldn't it be desirable if a Maston user could follow and like blog posts on a Joomla site?

3. it is still not clear to me why this is important.

If a major social network changes so that you no longer want to be a part of it, or if it closes down, you lose your followers and your content. Experience shows that after such events, many users switch to other platforms. This means a lot of work for many users, and usually something is lost in the process. This does not have to be the case. Use the federated web and control your content yourself.

## Fediverse and ActivityPub

I don't know exactly when I first heard about Fediverse. I thought it was interesting. But I did not get stuck. When in spring 2022 the big excitement about Elon Musk and Twitter began, I was surprised that in the Joomla community many had never heard the terms Fediverse, ActivityPub or IndieWeb. After all, these are mostly people with an affinity for technology. I admit that I had heard all the terms before, but I can't exactly define them. I wanted to change that and maybe it is interesting for the one or other Joomlaner aswell. Also, I feel quite comfortable in Fediverse by now and would like to advertise this a bit.

### The Fediverse

> The fediverse (a portmanteau of "federation" and "universe") is an ensemble of federated (i.e. interconnected) servers that are used for web publishing (i.e. social networking, microblogging, blogging, or websites) and file hosting, but which, while independently hosted, can communicate with each other. On different servers (technically instances), users can create so-called identities. These identities are able to communicate over the boundaries of the instances because the software running on the servers supports one or more communication protocols that follow an open standard. As an identity on the fediverse, users are able to post text and other media, or to follow posts by other identities. - [Wikipedia](https://en.wikipedia.org/wiki/Fediverse)

That sounds complicated. But it is not. The important points are

- federated servers 
- independently hosted 
- can communicate with each other.

So basically people run their own servers. Users can create an account and they can communicate with each other on each server because they __have agreed on rules or a standard__.

This means the Fediverse is not centrally organized. It is more like email servers. You can create a `@community.joomla.org` on a Joomla server, a `@gmail.com` on a Google-Gmail-Server or your own account like `@astrid-guenther.de`. 

This has advantages:

1. you can search for and be part of a community, that has as strict or loose rules as you want.
2. if you don't find the community that suits your needs, you can build it yourself. You can host your own server and thus control your data.

#### There are many Fediverse services. 

The most popular Fediverse service is [Mastodon] (https://joinmastodon.org/). Mastodon is similar to Twitter in its look and feel, while offering different instances. So you can have an account at 

- [social.joomla.org/home](https://social.joomla.org/home), 
- [https://fimidi.com](https://fimidi.com), 
- [https://mastodon.social](https://mastodon.social) 
- or something else. 

No matter what you use, you can communicate with each other that has agreed on rules or standards.

#### There is not only Mastodon. 

In general, federation can be used for 

- something like a YouTube clone like [PeerTube](https://joinpeertube.org/), 
- audio streaming like [Funkwhale](https://funkwhale.audio/), 
- Instagram clone like [PixelFed](https://pixelfed.org/), 
- event planning like [Gath.io](https://gath.io/), 
- and "many other". 

Among "many other" could be a CMS. [Wordpress](https://de.wordpress.org/plugins/activitypub/) and [Drupal](https://www.drupal.org/project/activitypub) for example. More on that later. 

The key point is that an identity can be used for each of these systems, and you and the server you use can choose who to talk to and who to ignore. If you host the server yourself, you decide. Specifically, this means the following:

- The servers in the Fediverse are censorship resistant.
- The Fediverse offers you to join a community that doesn't allow things you don't like. If you don't find the community that suits your needs, you can build it yourself.
- Services in the Fediverse let you control your data as much as you want.

*censorship resistant* and *communities with rules*? At first glance, this sounds conflicting. The important point here is that everything is in the plural. It is not one community. It is many separate communities. These communities communicate with each other. But only if they want to. If you think the rules of a community are censorship, then you have the option of joining a community with looser rules.

If an instance is home to people discussing things you and your community don't care about, you won't join. You can post the most awesome Joomla news on your server. A gardening community will share little content with you. There are certainly malicious participants in Fediverse, just like in real life and in central organized sozial networks. It is possible for the *not liked malicious* people to exchange there conten on there own instances without censorship. This is a problem point for many, but it is much better than the alternative.

That sounds good. But how does it work? I already mentioned that you need rules and standards to make it all work. Here we come to ActivityPub.

### ActivityPub

> Enter ActivityPub! ActivityPub is a decentralized social networking protocol based on the [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/) data format. ActivityPub is an official W3C recommended standard published by the [W3C Social Web Working Group](https://www.w3.org/wiki/Socialwg). It provides a client to server API for creating, updating and deleting content, as well as a federated server to server API for delivering notifications and subscribing to content. __Sounds exciting? Dive in!__ - [activitypub.rocks](https://activitypub.rocks/)

Sounds exciting? No! But it is useful! That is why we dive in. 

Basically, it's a pledge about how things federate. The protocol or the rules for services and websites to communicate with each other.

This is more understandable with an example from everyday life. When people talk to each other, you use language. The conversation is the federation. The grammar rules and vocabulary are ActivityPub.

> Do ActivityPub and Federation necessarily belong together? No! Federation refers to the concept of connecting and interoperating multiple separate systems or networks, allowing them to work together as a single, larger system. ActivityPub is not mandatory. There are other protocols and technologies that can be used for communication and interaction in decentralized networks. However, ActivityPub has become established as a standard and is supported by many platforms in the Fediverse.

While researching Federation and ActivityPub, I kept coming across the term *IndieWeb*. (IndieWeb)(https://indieweb.org/) and Fediverse are based on the same idea. But they are [not the same](https://socialhub.activitypub.rocks/t/fediverse-vs-indieweb/2638). 



## Joomla as ActivityPub server step by step

I have been connecting my [Joomla test blog](https://ug-mayen.de/en/joomla-blog-en/174-joomla-and-activitypub) to the Fediverse for the last few weeks. Maybe sharing my experience is an inspiration for Joomla developers. So let's get to the implementation details.

### Webfinger

What happens if you enter a handle, e.g. `@joomla_test_blog@ug-mayen.de` into the search bar in a Mastodon client? Ideally, of course, someone else has already searched for this handle and the Mastodon server already knows about it and has everything in its cache. If this is not the case, then some requests are triggered.

First, the Webfinger protocol is used. The server calls the following address:

```
https://ug-mayen.de/.well-known/webfinger?resource=acct:@joomla_test_blog@ug-mayen.de
```

Back should come a JSON file like this:

```
{
   "subject":"acct:joomla_test_blog@ug-mayen.de",
   "aliases":[
      "https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"
   ],
   "links":[
      {
         "rel":"self",
         "type":"application\/activity+json",
         "href":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"
      }
   ]
}
```

What is JSON? [JSON](https://www.json.org/), or JavaScript Object Notation, is a minimal, readable format for structuring data. It is primarily used to transfer data between a server and a web application as an alternative to XML.

> The Linux user, computer science student or nerd in general has certainly read the term Webfinger many times. [Name/Finger](https://www.rfc-editor.org/rfc/rfc742) is one of the first internet protocols. It dates from 1971 and was intended to make it possible to obtain information about users on other computers. At this time, when the *internet* only had fewer users, this was thought to be a good idea. I wonder about the name Webfinger. I learned: The term "finger" has a definition of "to snitch" or "to identify". At least that's what I gather from [Wikipedia article](https://en.wikipedia.org/wiki/Finger_(protocol)) and [Mastodon Documentation](https://docs.joinmastodon.org/spec/webfinger/).

So that is the first part I had to implement. Returning a JSON. So I created a component `com_activitypubs` with a JSON view `components/com_activitypubs/src/View/Webfinger/JsonView.php` in my Joomla installation and added a system plugin `plugins/system/activitypub/activitypub.php` for redirect the route.

> As far as I know, it is not possible to implement a view directly under the address `https://example.org/.well-known/webfinger` with a Joomla extension. My first thought was to redirect this address via `.htaccess`. I then decided to use a system plugin. On the one hand, no knowledge of server configuration and `.htaccess` is required for installation. In addition, this solution is more flexible and customisable.

The next code snipped shows my start with the JSON view. 

```php
// components/com_activitypubs/src/View/Webfinger/JsonView.php
namespace ActivitypubNamespace\Component\Activitypubs\Site\View\Webfinger;
...
class JsonView extends AbstractView
{
    ...
    public function display($tpl = null): void
    {
        $app = Factory::getApplication();
        $params = $app->getParams();

        $this->handle = $params->get('handle');
        $this->data = $this->getWebfingerData();
        $this->response = json_encode($this->data);

     		header('Content-Type: application/ld+json; profile="https://www.w3.org/ns/activitystreams"');
        echo json_encode($this->data);

        Factory::getApplication()->close();
    }


	protected function getWebfingerData(): array
	{
		$uri = Uri::base();

		return [
			'subject' => 'acct:' . $this->handle . '@' . Uri::getInstance()->toString(['host']),
			'aliases' => [
				$uri . 'index.php?option=com_activitypubs&view=Profil&format=json'
			],
			'links' => [
				[
					'rel' => 'self',
					'type' => 'application/activity+json',
					'href' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json'
				]
			]
		];
	}
}
```

For simplicity and because there is only one user in my blog, I have set the handle per parameter in this proof of concept. I had planned to replace the parameter with the username later. A [discussion](https://github.com/pfefferle/wordpress-activitypub/issues/28) at the github repository of the activitypub plugin for wordpress showed me that this step is more complex.

> Why did I not use the Joomla-API? `Joomla\CMS\MVC\View\JsonApiView` view class is meant for generating [json:api](https://jsonapi.org/) compliant output. For [custom JSON](https://www.json.org/) I need to use the `Joomla\CMS\MVC\View\JsonView` class instead.

Next step is forwaring the url `https://ug-mayen.de/.well-known/webfinger?resource=acct:@joomla_test_blog@ug-mayen.de` to my view `https://ug-mayen.de/index.php/component/activitypubs/?view=Webfinger&format=json`.The next code snipped shows my start with the system plugin.

```php
 // plugins/system/activitypub/activitypub.php
...
class PlgSystemActivitypub extends CMSPlugin
{
	...
	public function onAfterInitialise()
	{
		$uriI = Uri::getInstance();
		$host = $uriI->toString(['host']);
		$path = $uriI->toString(['path']);
		$query = $uriI->toString(['query']);

		if ($this->app->isClient('site')
			&& str_contains(Uri::getInstance()->toString(['path']), '.well-known/webfinger')
		){
			Log::add($host . '-' . $path . '-' . $query, Log::DEBUG, 'plg_system_activitypubs');

			if (str_starts_with($query, '?')) {
				$url = 'index.php/component/activitypubs' . $query . '&view=Webfinger&format=json';
			} else {
				$url = 'index.php/component/activitypubs/?view=Webfinger&format=json';
			}
			Factory::getApplication()->redirect($url);
		}
	}
}

```



Then I tried to find `@joomla_test_blog@ug-mayen.de` in the Mastodon interface fimidi.com, where i have an account. Unfortunately without success at first. Also somehow understandable, Mastodon doesn't know anything about `@joomla_test_blog@ug-mayen.de` yet. All information, such as the display name, the avatar, the profile description and everything else, has nothing to do with WebFinger. Webfinger only ensures that this account exists. This further information is all in a different file. This file can be found in the 'links' section of the WebFinger response. It is the link to `'self'` or the user profile. In my case it is `$uri . 'index.php?option=com_activitypubs&view=Profil&format=json'`. The response to this profile link looks something like this:

```json
{
   "@context":[
      "https:\/\/www.w3.org\/ns\/activitystreams",
      "https:\/\/w3id.org\/security\/v1"
   ],
   "id":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json",
   "type":"Person",
   "preferredUsername":"joomla_test_blog",
   "name":"joomla_test_blog",
   "manuallyApprovesFollowers":false,
   "discoverable":true,
   "inbox":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Inbox&format=json",
   "outbox":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Outbox&format=json",
   "followers":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Followers&format=json",
   "following":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Following&format=json",
   "publicKey":{
      "id":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json#main",
      "owner":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json",
      "publicKeyPem":"-----BEGIN PUBLIC KEY-----\r\nMIIB...QAB\r\n-----END PUBLIC KEY-----"
   },
   "summary":"<p>A blog of Joomla! users who live in the Mayen region. Here we do not only inform. We also like to test out new things on this website.<\/p>\r\n<p>Ein Blog von Joomla!-Benutzern, die in der Region Mayen leben. Hier informieren wir nicht nur. Wir testen auch gerne neue Dinge auf dieser Website aus.<\/p>",
   "url":"https:\/\/ug-mayen.de\/",
   "publishedDate":"2023-01-12T00:00:00Z",
   "icon":{
      "type":"Image",
      "url":"https:\/\/ug-mayen.de\/images\/maennchen.png#joomlaImage:\/\/local-images\/maennchen.png?width=141&height=130"
   },
}
```      

So secondly, I built a route for the user profile based on the ActivityPub protocol. Again, I simply output it in a JSON view.


```php
namespace ActivitypubNamespace\Component\Activitypubs\Site\View\Profil;
...
class JsonView extends AbstractView
{
...
    public function display($tpl = null): void
    {
        $app = Factory::getApplication();
        $params = $app->getParams();

        $this->handle = $params->get('handle');
    	  $this->public_key = $params->get('public');
		  $this->summary = $params->get('summary');
		  $this->icon = $params->get('icon');

        $this->data = $this->getProfilData();
        Log::add(Text::_('COM_ACTIVITYPUBS_PROFIL') . ': ' . json_encode($this->data), Log::DEBUG, 'com_activitypubs');
        $this->response = json_encode($this->data);

		  header('Content-Type: application/ld+json; profile="https://www.w3.org/ns/activitystreams"');
        echo json_encode($this->data);

        Factory::getApplication()->close();
    }


	protected function getProfilData(): array
	{
		$uri = Uri::base();	
		
		return [
			'@context' => ['https://www.w3.org/ns/activitystreams', 'https://w3id.org/security/v1'],
			'id' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json',

			'type' => 'Person',
			'preferredUsername' => $this->handle,
			'name' => $this->handle,

			'manuallyApprovesFollowers' => false,
			'discoverable' => true,
			'inbox' => $uri . 'index.php?option=com_activitypubs&view=Inbox&format=json',
			'outbox' => $uri . 'index.php?option=com_activitypubs&view=Outbox&format=json',
			'followers' => $uri . 'index.php?option=com_activitypubs&view=Followers&format=json',
			'following' => $uri . 'index.php?option=com_activitypubs&view=Following&format=json',

			'publicKey' => [
				'id' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json' . '#main',
				'owner' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json',
				'publicKeyPem' => $this->public_key
			],
			'summary' => $this->summary,
			'url' => $uri,
			'publishedDate' => '2023-01-12T00:00:00Z',
			'icon' => [
				'type' => 'Image',
				'mediaType' => 'image/png',
				'url' => $uri . $this->icon
			],
		];
	}
}
```

Poof, it worked, I could find my account in the Mastodon search of fimidi.com and even click on it. But, when I clicked follow, nothing happened yet. 

> Links in the profile: In addition to the `inbox` and the `publicKey` we will habe a look to in the following, there are some other links in the profile, e.g. `followers` and `followings`, each of which returns a list of followings and followers. In addition, there is also the `outbox`, which theoretically contains all activities that the user has triggered.

#### Excursus: CURL

Testing the outputs with [CURL](https://curl.haxx.se/) is possible. What is CURL? CURL is used in command lines or scripts to transfer data.


```
$ curl -L 'https://ug-mayen.de/.well-known/webfinger?resource=acct:@joomla_test_blog@ug-mayen.de'
{"subject":"acct:joomla_test_blog@ug-mayen.de","aliases":["https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"],"links":[{"rel":"self","type":"application\/activity+json","href":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"}]}
```

or

```
$ curl -L 'https://ug-mayen.de/index.php/component/activitypubs/?view=Webfinger&format=json'
{"subject":"acct:joomla_test_blog@ug-mayen.de","aliases":["https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"],"links":[{"rel":"self","type":"application\/activity+json","href":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"}]}
```

A tool that makes the output of JSON more user-friendly is [jq](https://stedolan.github.io/jq/). What is jq? jq is a lightweight and flexible JSON processor for the command line. Ubuntu users see [wiki.ubuntuusers.de/jq](https://wiki.ubuntuusers.de/jq).


```
$ curl -L 'https://ug-mayen.de/index.php/component/activitypubs/?view=Webfinger&format=json' | jq .
{
  "subject": "acct:joomla_test_blog@ug-mayen.de",
  "aliases": [
    "https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json"
  ],
  "links": [
    {
      "rel": "self",
      "type": "application/activity+json",
      "href": "https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json"
    }
  ]
}
```

### The Follow Flow

#### Follow

In this example the actor `https://fimidi.com/users/astrid` wants to follow `https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json`.

If the actor `https://fimidi.com/users/astrid` clicks on "Follow" in the interface, the server sends an activity with the type "Follow" to the corresponding server of the account you want to follow. 

```
{
   "@context":"https://www.w3.org/ns/activitystreams",
   "id":"https://fimidi.com/63a59186-c186-4190-995c-0adbcb4984cb",
   "type":"Follow",
   "actor":"https://fimidi.com/users/astrid",
   "object":"https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json"
}
```

But where exactly does the server send this activity? To find out, let's take another look at the user profile that we linked to in the last step. Besides the name and so on, there are also some URLs stored. This links are there for the ActivityPub communication.

What we need here now is the 'inbox'. The URL specified there should be an endpoint that accepts a corresponding JSON payload via POST. Joomla can handle JSON payload without any problems, so I add the following code to my display controller.

Via `$this->data = (array) json_decode($this->input->json->getRaw(), true);` I save the POST data in the variable `$this->data`.

```php
namespace ActivitypubNamespace\Component\Activitypubs\Site\Controller;
...
class DisplayController extends BaseController
{
...
	public function display($cachable = false, $urlparams = [])
	{
		
		$view = $this->input->getString('view');
      ...
 		if ($view == 'Inbox') {
			$this->data = (array) json_decode($this->input->json->getRaw(), true);

			switch ($this->data['type']) {
				case 'Follow':
					$element = new \stdClass();
					$element->name = $this->data['type'];
					$element->wert = $this->data['actor'];
					$element->zuordnung = $this->data['object'];
					$element->debug = '';
					$db->insertObject('#__activitypubs_details', $element);
		
					$this->sendFollowAccept();

					break;
            ...   

			$this->response = '{"success": true}';
		}
		
		header('Content-Type: application/ld+json; profile="https://www.w3.org/ns/activitystreams"');

		echo $this->response;

		Factory::getApplication()->close();
      ...
	}
```


Now I have to accept the `follow` by sending back an `accept` activity. This is where it gets complicated, because all requests have to be signed and stored.

Let's start step by step. I do this in the `$this->sendFollowAccept();` function. First I create the JSOM code for this activity. 
```json
{
   "@context":"https:\/\/www.w3.org\/ns\/activitystreams",
   "id":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json&id=63e37628f3341",
   "type":"Accept",
   "actor":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json",
   "object":{
      "@context":"https:\/\/www.w3.org\/ns\/activitystreams",
      "id":"https:\/\/fimidi.com\/63a59186-c186-4190-995c-0adbcb4984cb",
      "type":"Follow",
      "actor":"https:\/\/fimidi.com\/users\/astrid",
      "object":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json"
   }
}
```

After that I am signing it and send it via CURL to the server of the user who wants to follow me. This is my code.

```php
   ...
	protected function sendFollowAccept(): void
	{
		$uri = Uri::base();

		$data = [
			'@context' => 'https://www.w3.org/ns/activitystreams',
			'id' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json&id=' . uniqid(),
			'type' => 'Accept',
			'actor' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json',
			'object' => $this->data
		];
		$data = json_encode($data);

		$date = gmdate('D, d M Y H:i:s T', time());
		$digest = HttpSignatureHelper::digest($data);
		$actor = ActorHelper::fromActorString($this->data['actor']);

		$signature = HttpSignatureHelper::sign(
			$this->private_key,
			$actor->inbox,
			$actor->host,
			$date,
			$digest
		);

		$signatureHeader = sprintf(
			'keyId="%s",headers="(request-target) host date digest",signature="%s"',
			$uri . 'index.php?option=com_activitypubs&view=Profil&format=json' . '#main',
			base64_encode($signature)
		);

		$ch = curl_init();

		curl_setopt($ch, CURLOPT_URL, sprintf('https://%s%s', $actor->host, $actor->inbox));

		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

		$headers = [
			'Content-Type: application/activity+json',
			'Date: ' . $date,
			'Signature: ' . $signatureHeader,
			'Digest: ' . $digest
		];

		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_exec($ch);
		curl_close($ch);
	}
   ...
```

> A digest is a short fixed-length representation of a larger piece of data, such as a message or a file. The process of creating a digest is called "hashing." A hash function takes an input (or "message") and returns a fixed-length string of bytes, which is typically a unique representation of the input data. This fixed-length output is called a "hash" or "digest." Digests are used in many areas of computer science, including digital signatures, data integrity, and indexing data in databases. They are also used to identify duplicates in large data sets and to quickly compare large files to determine if they are identical. In cryptography, digests are used to ensure the integrity of a message or file by detecting any changes made to the original data. For example, a digest of a message can be created and then transmitted along with the message. The recipient can then calculate the digest of the received message and compare it with the transmitted digest. If the two digests match, the recipient can be confident that the message has not been altered during transmission. There are many different hash functions, each with its own strengths and weaknesses. Some popular hash functions include SHA-256, SHA-512, and MD5.

#### Further explanations

I struggled a bit with the creation of the signature, but somehow managed to put it together in the end. Therefore, the following explanation may be helpful and time-saving for interested developers. Finally, you build a plaintext string that looks something like this:

```
(request-target): post /users/astrid/inbox
host: fimidi.com
date: Thu, 09 Feb 2023 09:53:16 GMT
digest: SHA-256=/qqi8j+GFlSGSFzLIOVlsLgegS6+3CwN9tkBULflgLM=
```

This can then be signed with `openssl_sign` and inserted as a base 64 string in the signature header.

I created the signature header with code like this:

```php
...
$signatureHeader = sprintf(
   'keyId="%s",headers="(request-target) host date digest",signature="%s"',
   $uri . 'index.php?option=com_activitypubs&view=Profil&format=json' . '#main',
   base64_encode($signature)
...
```

This statement creates a header in the style of the code snippet below.

```
keyId="https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json#main",headers="(request-target) host date digest",signature="NP6EymeuvQw/jgXeLVPvKb5O5Bfd7u0wCiCxjXKhDo51oJ82nZKRIe3L8gdvNF6IVcJqTI6LEvc7hR4naMcZE01LnZDEtbXM2Ci8ociSdwiwjduAunbBptU3Bc0H5rBDs+ZvCJF4zTIqPYCdHTMhU9uAcdeF5Znk6ZNO5GkcTUgszhNXjHOIyoWgjhLkkQtSuVXEUggOAfcyIgMm+xSKQjZnQVas88gXE0l6CGAln12oVjLaa0HE8WwuIDNe6IYO3T3YMoSGKqOaFRTw21Dbm27ymEFAJB0o4XSnP95cneqpSpMkc/3j2xdJmaLZkw9D3/RQJxShhy/linx+rPikXQ=="
```

It is important that the public key linked in the signature header is also present and can be accessed by the target server. In my case, it is in the 'public key' field in the user profile discussed above.

Once you have all the components together, i.e. WebFinger and user profile response, as well as something that can process and answer requests to the inbox, you are ready to go. You have a basic Joomla Fediverse participant that you can follow!

#### Undo a follow-up request

The activity to undo a follow-up request looks like the following code snipped, if the actor `https://fimidi.com/users/astrid` wants to unfollow `https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json`.

```
{
   "@context":"https://www.w3.org/ns/activitystreams",
   "id":"https://fimidi.com/users/astrid#follows/7646/undo",
   "type":"Undo",
   "actor":"https://fimidi.com/users/astrid",
   "object":{
      "id":"https://fimidi.com/6c3f6346-c623-4d6c-9975-a3e63bb0ceb0",
      "type":"Follow",
      "actor":"https://fimidi.com/users/astrid",
      "object":"https://ug-mayen.de/index.php?option=com_activitypubs&view=Profil&format=json"
   }
}
```

This highlights a point that needs to be considered in terms of security. If I did not support this activity on my server, then it is not possible for a user to undo their follow-up request. He would always continue to see my new posts in his inbox. He would have to block me to prevent this.

#### Excursus: HTTP Signature, ActivityPub and Mastodon

In order to be sure that a follow request really comes from the person who sent it, you have to check it. One possibility is: Cryptography! [Asymmetric Encryption](https://de.wikipedia.org/wiki/Asymmetrisches_Kryptosystem), to be precise.

The ActivityPub spec does not require that appropriate signatures be used here, but it recommends it. Mastodon uses a [`Signature`-HTTP header](https://datatracker.ietf.org/doc/html/draft-cavage-http-signatures).

The header consists of a link to the public key, a list of the HTTP headers used to create the signature and of course the signature itself, as a Base64 string.

In addition to the signature, Mastodon requires a `Digest` header in the request. This contains a hash of the payload, i.e. the JSON object. The `Digest` is also part of the signature, so it is not only ensured that the request comes from the right person, but also that the content has not changed.

How can you create a keypair? Your can use [openssl](https://wiki.openssl.org/index.php/Command_Line_Elliptic_Curve_Operations#Generating_EC_Keys_and_Parameters).

```
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

### Toot like an elefephant your Joomla posts into the Fediverse

Let's move on to creating a Toot when a new blogpost is published! Again, there are a few little pitfalls here.

What does an activity look like that you send on its way in the Fediverse? 

I'll show you with a concrete example: When I saved the blog post [joomla-5](https://ug-mayen.de/joomla-blog-de/189-joomla-5-was-erwartet-uns), the following JSON was sent to the followers' inbox:



```json
{
   "@context":"https:\/\/www.w3.org\/ns\/activitystreams",
   "id":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json&id=63e4cf993bd90",
   "type":"Create",
   "actor":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json",
   "to":[
      "https:\/\/www.w3.org\/ns\/activitystreams#Public"
   ],
   "cc":[
      "https:\/\/fimidi.com\/users\/astrid",
      "..."
   ],
   "object":{
      "@context":{
         "@language":"de"
      },
      "id":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json&id=189",
      "type":"Note",
      ...
      "summary":"Joomla! 5 - Was erwartet uns?",
      "published":"2023-02-08T01:23:19+00:00",
      "updated":"2023-02-09T10:48:57+00:00",
      "attributedTo":"https:\/\/ug-mayen.de\/index.php?option=com_activitypubs&view=Profil&format=json",
      "to":[
         "https:\/\/www.w3.org\/ns\/activitystreams#Public"
      ],
      "cc":[
         "https:\/\/fimidi.com\/users\/astrid",
         "..."
      ],
      "content":"<h1>Joomla! 5<\/h1>\r\n<p style=\"text-align: justify;\">Gerade bin ...<p>"
   }
}
```

> Are you wondering at this point? A request for every follower? Is that efficient? It's not quite that bad in the end, ActivityPub also has the concept of a shared inbox "to"  and "cc", and Mastodon also implements it that way.


Now one step is missing: Of course, I don't just have to generate signatures on my Joomla server for all the requests I send. We just had that with the sending of the Foller-Accept. Of course, I also have to verify the signature for everything that lands in an other inbox. Verifying a signature works very similarly to creating it. You create your plaintext according to the given pattern, except that you now use the headers from the request.

> Signieren und Verifizieren sind zwei Konzepte, die mit digitaler Sicherheit und Kryptographie zu tun haben. 
Das Signieren bezieht sich auf den Prozess der Erstellung einer digitalen Signatur, die zur Authentifizierung des Ursprungs und der Integrität einer Nachricht oder eines Dokuments verwendet werden kann. Eine digitale Signatur wird erstellt, indem ein mathematischer Algorithmus auf den Inhalt der Nachricht oder des Dokuments und einen privaten Schlüssel angewendet wird, der nur dem Unterzeichner bekannt ist. Die sich daraus ergebende Signatur wird zusammen mit der Nachricht oder dem Dokument verschickt, so dass der Empfänger überprüfen kann, dass die Nachricht oder das Dokument nicht manipuliert wurde und vom angegebenen Absender stammt. Die Verifizierung hingegen bezieht sich auf den Prozess der Überprüfung der Authentizität und Integrität einer digital signierten Nachricht oder eines Dokuments. Dazu wird der öffentliche Schlüssel des Empfängers verwendet, um denselben mathematischen Algorithmus auf die Signatur und den Inhalt der Nachricht oder des Dokuments anzuwenden. Wenn das Ergebnis des Verifizierungsprozesses mit den Erwartungen übereinstimmt, kann der Empfänger sicher sein, dass die Nachricht oder das Dokument nicht manipuliert wurde und vom angegebenen Absender stammt. Zusammenfassend lässt sich sagen, dass beim Signieren eine digitale Signatur erstellt wird, während bei der Überprüfung die Authentizität und Integrität einer digital signierten Nachricht oder eines Dokuments geprüft wird.

For sending new articles to an other inbox I wrote the content plugin `plugins/content/activitypub/activitypub.php`.

```php
// plugins/content/activitypub/activitypub.php
...
class PlgContentActivitypub extends CMSPlugin
{
...
	public function onContentAfterSave($context, $article, $isNew)
	{

		switch ($article->state) {
			case 1:
				$this->safeRequest($activitypubs_params, $article, 'Create');
				break;
            ...
			default:
				break;
		}
		
		return true;
	}

	public function onContentAfterDelete($context, $article)
	{
      ...
	}

	public function onContentChangeState($context, $pks, $value)
	{
        ...
		}

		return true;
	}

	public function safeRequest($activitypubs_params, $article, $action)
	{

		// Todo: Create Model
		$db = Factory::getDbo();
		$followers = [];

		$query = $db->getQuery(true);
		$query->select($db->quoteName('wert'))
		->from($db->quoteName('#__activitypubs_details'))
		->where(
			[
				$db->quoteName('name') . ' = "Follow"',
			]
		);
		$followers = $db->setQuery($query)->loadAssocList();


		// Todo: Create Helper
		$groupedByHost = [];
		foreach ($followers as $follower) {
			$actor = ActorHelper::fromActorString(trim($follower['wert']));
			$host = $actor->host;

			if (empty($groupedByHost[$host])) {
				$groupedByHost[$host] = [
					'host' => $host,
					'inbox' => $actor->sharedInbox,
					'followers' => []
				];
			}

			$groupedByHost[$host]['followers'][] = $actor->actor;
		}

		$content_to_send = $article->introtext;
      ...

		foreach ($groupedByHost as $host) {
			$data = [
				'@context' => 'https://www.w3.org/ns/activitystreams',
				'id' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json&id=' . uniqid(),
				'type' => $action ,
				'actor' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json',
				'to' => ['https://www.w3.org/ns/activitystreams#Public'],
				'cc' => $host['followers'],
				'object' => [
					'@context' => $context,
					'id' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json&id=' . $article->id,
					'type' => 'Note',
					'url' => $perma_url,
					'edited' => $edited,
					'summary' => $article->title,
					'published' => $published,
					'updated' => $updated,
               ...
					'attributedTo' => $uri . 'index.php?option=com_activitypubs&view=Profil&format=json',
					'to' => ['https://www.w3.org/ns/activitystreams#Public'],
					'cc' => $host['followers'],
					'content' => $content_to_send
				],
			];

			$data = json_encode($data);

			$date = gmdate('D, d M Y H:i:s T', time());
			$digest = HttpSignatureHelper::digest($data);
		
			$signature = HttpSignatureHelper::sign(
				$private_key,
				$host['inbox'],
				$host['host'],
				$date,
				$digest
			);
		 
			$signatureHeader = sprintf(
				'keyId="%s",headers="(request-target) host date digest",signature="%s"',
				$uri . 'index.php?option=com_activitypubs&view=Profil&format=json' . '#main',
				base64_encode($signature)
			);
		
			$ch = curl_init();

			$serverinbox = sprintf('https://%s%s/', $host['host'], $host['inbox']);
		
			curl_setopt($ch, CURLOPT_URL, $serverinbox);
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

			$headers = [
				'Content-Type: application/activity+json',
				'Date: ' . $date,
				'Signature: ' . $signatureHeader,
				'Digest: ' . $digest
			];
		
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
         curl_exec($ch);
			curl_close($ch);
		}
	}
}

```


## Final reflection

You can follow the blog via handle `@joomla_test_blog@ug-mayen.de` and new posts will land in the inbox of a  Follow. I tested it with a Mastodon user. That was my goal. But there is still a lot missing.

I don't know yet if I will continue to work on the extensions. The Likes and Boosts are attractive but dangerous at the same time. Is it important to me if someone likes something or is it more important to me that I myself like my text? Once again, the DSGVO goes hand in hand with the replies. 
Up to this point it has been an interesting experience. I wonder if supporting the ActivityPub protocol wouldn't be a great Google Summer of Code project? 

## Further Links

https://opguides.info/other/fediverse/
https://briefs.video/videos/why-the-indieweb/