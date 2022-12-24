---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-07-05
title: 'Central and decentralised social networks'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: en/soziale-netze
langKey: en
categories:
  - Internet
tags:
  - mastodon
  - social
---


Like any network, social networks are organised differentially.

![Central and decentralised social networks](/images/1aa.en.png)

## Central 

In centrally set up social networks, all news and media are in one hand. In a centralised network, one provider controls the software and the servers. This allows the provider to apply his rules. He influences content and processes. Consciously or unconsciously! 

## Decentralised

Within a decentralised network anyone can communicate with all others. I can reach out to people in every decentralised instance. It doesn't matter whether they are with my provider or with someone else. The administrator's influence is limited to simplifying access to content by configuring servers. Nevertheless, everyone is responsible for what they read and share and decides for themselves.

I'll try a comparison with the road network. Regardless of whether I enter the network via a motorway, a private toll road or a federal highway: many roads lead to Rome. One is not limited to one route. There are several option or instances and everyone can choose. If you live in a small town on a local road, you get in via that local road that is financed by public duties and taxes. In a region where there are only toll roads, the rules are different.

### Fediverse, ActivityPub, IndieWeb






#### The Fediverse

**Fediverse** refers to a network of federated, mutually independent social networks, microblogging services, and web pages for online publication or data hosting. The concept began in 2008 with [GNU Social](https://en.wikipedia.org/wiki/GNU_social) and continued in 2016 with [Mastodon](https://en.wikipedia.org/wiki/Mastodon_(software)) and the Communication Protocol defined in 2018 by the World Wide Web (W3C) *[ActivityPub](https://en.wikipedia.org/wiki/ActivityPub)*.


> The fediverse (a portmanteau of "federation" and "universe") is an ensemble of federated (i.e. interconnected) servers that are used for web publishing (i.e. social networking, microblogging, blogging, or websites) and file hosting, but which, while independently hosted, can communicate with each other. On different servers (instances), users can create so-called identities. These identities are able to communicate over the boundaries of the instances because the software running on the servers supports one or more communication protocols which follow an open standard. As an identity on the fediverse, users are able to post text and other media, or to follow posts by other identities. - [Wikipedia](https://en.wikipedia.org/wiki/Fediverse)



All right, that's a lot of theory. Let's break down the definition.

> interconnected servers [...] that are hosted independently [...] can communicate with each other.

So basically people run their own servers, but they can communicate with each other because they have agreed on rules or a standard.

> [...] create so-called identities

You create an local account.

> These identities can communicate [...]

But this account is recognized by other servers.

This means the Fediverse is not centrally organized. It is more like email servers. You can create a `@community.joomla.org`, a `@gmail.com` or your own account like `@astrid-guenther.de`. 

This is complex and means additional effort for the individual. But it has advantages:

1. you can host your own server and thus control your data.
2. you can be part of a community that has as strict or loose rules as you want.

There are many Fediverse services. The most popular is [mastodon] (https://joinmastodon.org/). Mastodon is similar to Twitter in its application, while offering different instances. So you can have an account at [https://fimidi.com](https://fimidi.com) or [https://mastodon.social](https://mastodon.social) or something else entirely. No matter what you use, you can communicate with it.




There is not only Mastodon. In general, federation can be used for something like a YouTube clone like [PeerTube](https://joinpeertube.org/), audio streaming like [Funkwhale](https://funkwhale.audio/), Instagram clone like [PixelFed](https://pixelfed.org/), event planning like [Gath.io](https://gath.io/), and many other things. Among many other things could be a CMSs. [Wordpress](https://de.wordpress.org/plugins/activitypub/) and [Drupal](https://www.drupal.org/project/activitypub) for example. The key point is that an identity can be used for each of these systems, and the server you use can choose who to partner with. If you host the server yourself, you decide. Specifically, this means the following:

- The server in the Fediverse is censorship resistant.

- The Fediverse allows you to join a community that doesn't allow things you don't like

- Services in the Fediverse let you control your data as much as you want.

That sounds contrary. How can something be censorship resistant, but still have communities with rules? Well, the key word here is communities, and they are plural. These communities are still separate, they just join together *if* they want to. In the same way, you will certainly only join a community if you consider its rules to be good. Since there is more than one community, you will surely find like-minded people. If not, you start your own instance with your own rules and without censorship.

If an instance is home to people discussing things you and your community don't care about, you won't join. You can post the most awesome Joomla news on your server. A garden community will share little content with you. There are certainly malicious participants in Fediverse, just like in real life. It is possible for for the "bad" people to exchange on one instance without censorship. This is a problematic point for many, but it is much better in my eyes than the central alternative, where everyone can see this content and it is censored in a complicated process.

#### ActivityPub

> ActivityPub is a decentralized social networking protocol based on the [ActivityStreams 2.0](https://www.w3.org/TR/activitystreams-core/) data format. ActivityPub is an official W3C recommended standard published by the [W3C Social Web Working Group](https://www.w3.org/wiki/Socialwg). It provides a client to server API for creating, updating and deleting content, as well as a federated server to server API for delivering notifications and subscribing to content. - [activitypub.rocks](https://activitypub.rocks/)

Sounds exciting? No! But it is useful!

It is a way for services and websites to communicate with each other. It's a part of the federation mentioned above. Basically, it's a pledge about how things federate, the protocol or the rules.

This is more understandable with an example from everyday life. When people talk to each other, you use language. The conversation is the federation. The grammar rules and vocabulary is ActivityPub.

#### The IndieWeb 

> The IndieWeb is a [people](https://indieweb.org/people)-focused alternative to the "corporate web". - [indieweb.org](https://indieweb.org/)

Honestly, that says everything and nothing. The description also fits the Fediverse, so what's the difference? Let's take a closer look.

##### You are better connected.

Basically, the IndieWeb is, the web. It's HTML files that make up a website. It doesn't really have a service aspect to it. Fediverse expects a service to always be running.

Your articles and status updates can go [to all services](https://indieweb.org/POSSE) "in the IndieWeb", not just one, so you can connect with everyone. Even replies and likes on other services can [be redirected back to your website](https://indieweb.org/backfeed), so they're all in one place.

That's a rewrite for when you post something on your own website, it should automatically post links to all those linked websites. Your website should also automatically pull responses from all of those things.

In addition, in terms of the indie web, it's important to be independent. This means that large corporate websites, in terms of decentralization are not desired.

#### FAQ

1. Why would i want my website in Fediverse or IndieWeb?

You want your website to be able to interact with other websites.

2. Why would I want my website to be able to do that?

You want your content to connect with content on other websites without publishing directly to any of those places. This means that you still have full control over that site, plus you can share it with others, regardless of platform.

3. Are ActivityPub and Federation the same thing?

ActivityPub and Federation are becoming more and more synonymous. However, they are actually not the same thing. Federation stands for union or connection. ActivityPub regulates this federation. ActivityPub has the disadvantage that you have to follow rules. ActivityPub has the advantage that you can rely on rules.

4. what is the role of the indieweb?
at the indieweb you communicate with other webiste and are connected. However, the connection is not based on a service that is always active.

5. I'm still confused.

If a big social network like Twitter, Facebook or Instagramm gets shut down, you lose your followers and your content. For some platforms, it's not a matter of "if" but "when." Such events are usually followed by a flight to a variety of different platforms, where you inevitably lose some people because you have to decide which one to stay on. It's happened before. But it doesn't have to happen again. Use the federated web.










### The Federated Web - objective and emotional 

#### objective points of view

The Fediverse cannot be associated with one or a few people, but with all people. The services I know are all open source. Everyone has the possibility to view the code of the software, to use it or to contribute to it. So there is not just one link to a service in the Fediverse, just as there is only one link to Twitter [en.wikipedia.org/wiki/Twitter]. Instead, there are countless instances that are connected to each other via the internet: It is a large, decentralised network.

The business model known from other platforms, where money is earned with data and advertising, does not exist on Fediverse. Each instance decides for themselves how they will finance themselves. For example, through crowdfunding, public funds, donations or a user fee. Because of the decentralised orientation, advertising and data are not lucrative. Since profit-making is not in the foreground and the work is mostly done on a voluntary basis, less money is needed. So it is possible to create a space with friendly conditions for networking and exchange.

> When I look at how Fediverse works compared to the central platforms, I conclude that the former is clearly the better model.

#### emotional thoughts

I have only been active there for a short time and share my first impression here. Until now, I have avoided social networks on the internet. That changed in February 2022. More and more often I read in the news that reports from Ukraine are not independently checkable. In recent years, I have had contact with programmers living in Ukraine in open source projects. I was interested in their situation and therefore read the post in social networks. I don't know the people personally, but I felt connected to them through previous digital communication and I trusted their contributions. At some point I came to the conclusion that an information exchange via social networks is important. And because of the internet it is possible in today's world. 

> I continued to feel uncomfortable in the centralised form. That's why I chose the decentralised variant for myself. 

### What convinced me?

The discussion culture in Fediverse is different: it is more interested and constructive. If you share something that has a mistake in it, you are corrected and not laughed at or shouted down. In my opinion, this is because the structure of the network is different. Quarrels happen - but the mechanisms in Fediverse ensure that they don't get out of hand. 

There is a shared responsibility for the online space. At least if this is not too large and therefore anonymous. Similar to barcamps like the JoomlaCamp[^joomlacamp.de/]. You organise a day together that is beneficial for everyone. It's absurd to complain at the end. Everyone has it in their own hands. Everyone has the opportunity to help organise the shared online space: Support newcomers, share things, make suggestions for improvement, report bugs, even code along on Github.

I experience the Fediverse as multi-faceted. I think that's because I'm responsible for what's presented to me and not an external algorithm. So it happens more often that I come across new and different points of view. 

> I am curious to see whether the Fediverse will become established in society. Whether it will succeed in democratising the net. I think it's like shopping in a health food shop or a discount shop. You don't change the whole world, just a small part of it.

## A service in the Fediverse: Mastodon

Mastodon is a software in the Fediverse similar to the popular central provider Twitter. Some things are called differently. Instead of a tweet, it is a toot. Otherwise, there are many things in common: for example, hashtags, sharing, liking, followers and short messages.

There is no one Mastodon provider. This is similar to other open source software: there is not one Joomla, but many installations of Joomla on different servers managed by different people. Usually, the first thing you discover is one of the large Mastodon instances. In terms of decentralisation, it makes more sense to choose the provider carefully. 

An overview of the possible instances can be found at instances.social[^instances.social].

If you are looking for me, you can find me at https://fimidi.com/@astrid as @astrid@fimidi.com.
<img src="https://vg04.met.vgwort.de/na/9afdced5561249e08bdd2d806168b065" width="1" height="1" alt="">
