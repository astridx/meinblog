---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-07-08
title: 'Rules for communication between computers on the Internet - Part 1'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: en/regeln-fuer-die-kommunikation-im-netz
langKey: en
categories:
  - Internet
tags:
  - IP
  - Spoofing
  - Datenübertragung
---


A successful conversation is not possible unless a language is used that every participant understands. That is clear! On the Internet, the rules of this language are called protocols.

![Packing data for exchange over the internet into packets](/images/3.png)

## Protocols: Rules on the Internet

Rules are usually annoying and no one is happy about them. But some things need an agreement to make something work.

### What issues need an agreement?

In order for every device on the network to understand the data correctly, it's important to know the answer to questions like. 

- How big is a packet?
- What happens if an address is wrong?
- What is in the header and what information is written where and in what format?
- How can lost data be reconstructed?
- Is a confirmation of receipt or an error message sent from the recipient to the addressee?

### Can things be agreed upon differently?

As in non-digital life, there are different requirements on the Net that call for different rules. If I send a postcard from vacation, it will be handled differently than a valuable item posted by registered mail with return receipt.

In the network, it's more complex. Therefore, I use the layer model and limit myself to the transport layer. 

- The most important protocol of this layer is the `Transmission Control Protocol (TCP)`. It guarantees the completeness of the data, but works slowly.[^de.wikipedia.org/wiki/Transmission_Control_Protocol].
- In addition, unreliable but fast protocols belong to this layer. For example, the User `Datagram Protocol (UDP)`.[^de.wikipedia.org/wiki/User_Datagram_Protocol]
- A compromise is `Stream Control Transmission Protocol (SCTP)`. This is a reliable, connection-oriented network protocol.[^de.wikipedia.org/wiki/Stream_Control_Transmission_Protocol]

### Rules: How do they work on the web?

### Rule creator

In our house, we have a rule that dirty dishes belong in the dishwasher. Not everyone in the house always follows it. On the other hand, a traffic ticket is paid by all family members. 

There are international organizations that set rules for communicating online. You don't get a penalty ticket if you don't follow them. Nevertheless, people follow these guidelines because everyone benefits from them. Without following them, it is impossible to communicate in a way that is useful for everyone. 

> It is a voluntary, consensus-based system of rules.

#### Worldwide Standards Cooperation (WSC)

- The 'International Organization for Standardization ISO' is an association of standardization organizations. Everyone has heard of it in school because it sets paper formats. It is also active in the field of technology. There is a layered model that ISO has created.[^de.wikipedia.org/wiki/International_Organization_for_Standardization]
- The most important products of the standardization area of the `International Telecommunication Union ITU-T` are the `ITU-T Recs`. These are recommendations that define how telecommunications networks work. Encryption is only one important topic in this area.[^de.wikipedia.org/wiki/International_Telecommunications_Union].
- The `International Electrotechnical Commission IEC` standardizes in the field of electrical engineering.

#### Internet Engineering Task Force IETF

The IETF is a working group that deals with standards for the technical development of the World Wide Web - for example, protocols such as HTTP, which is used to display web pages in a browser.[^de.wikipedia.org/wiki/Internet_Engineering_Task_Force]
- [^de.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers]

#### Institute of Electrical and Electronics Engineers IEEE

IEEE is the largest technical professional association in the world. The standard for wireless networks originates from it.[^de.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers]

### Rule non-compliance

What happens if a participant does not implement a rule? Surely everyone has experienced an example of this in the past. A browser displays a website slightly differently because it does not interpret a function or interprets it differently. Often it is because the developers of the browser have not yet had a chance to integrate the function because it is new. 

> `caniuse.com` answers the question whether a certain technology on a website is compatible with certain browsers. The website illustrates this with the help of an easy-to-read diagram. CanIUse is an open source project that anyone can contribute to[^github.com/Fyrd/caniuse].
<img src="https://vg04.met.vgwort.de/na/544c9dd8e19a4715987262f72c5af810" width="1" height="1" alt="">
