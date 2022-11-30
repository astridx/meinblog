---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-07-06
title: 'Putting data into packets for sharing over the internet'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: en/daten-in-pakete-packen
langKey: de
categories:
  - Internet
tags:
  - Paket
  - Daten
  - Datenübertragung
  - Schichtenmodell
  - Datenübertragung
---


Network nodes and connections on the internet do not exist for their own sake. People use the net to communicate with each other. What is possible in reality also happens digitally. Working, playing, communicating to spend time are just a few examples. 

![Putting data into packets for exchange over the Internet](/images/2.en.png)

## Packets

All activities on the net happen through the exchange of data. These are, for example, texts, images, videos or sounds. For transfer, these are put into a uniform form. The result is a packet.

How a data packet is packed is regulated in protocols [^de.wikipedia.org/wiki/Netzwerkprotokoll]. Most of the time, not everything fits into one packet, so protocols additionally define rules on how to divide the data. 

> Why is there a network protocol? In order for all network devices to communicate with each other, it is necessary that they understand each other. This is ensured by the protocols. Similar to learning a language, they define grammars and meanings within which data is shared. Anyone who learns them can join in the communication.

A typical data packet consists of 
- the actual data, 
- address information and 
- information about the packaged packets such as
  - content,
  - size,
  - sequence number, 
  - total number of packets and a 
  - checksum.

Everything is packed together according to the protocol rules. The information about the packets is prefixed as a header. A checksum ensures that everything is received correctly.

## Content and form of the packets

When my daughter sends a photo of her cat to her friend, she doesn't worry about how exactly it happens. Like a miracle, colours and shapes reach their destination
- by mobile phone, through the air, or 
- via a cable, from the computer.

But a computer is quite limited. It can add and compare, but it is no more imaginative. Therefore, two states are the only things it can process. These are often represented by 1 and 0 or 
- in a cable with power or no power 
- in the optical fibre with light or no light, 
- in the air by radio wave [^de.wikipedia.org/wiki/radio-wave] with wave signal or without.

> All information processed by computers consists of two different signals in its raw state. This is also true for data packets.

## An overview of the transfer process

A complex process is easier to understand if you divide it into parts. For transmission on the internet, there are a number of models that divide transmission into layers. For example, the TCP/IP reference model [^de.wikipedia.org/wiki/Internetprotokollfamilie], which works with four layers.

### Application layer

The main task of the application layer is to forward data to the transport layer. Nina clicks Send in the chat program to send the photo of her cat to her friend, causing the chat program to pass the data to the transport layer.

### Transport layer

> Very few users are aware of the protocols. They are not visible and are not knowingly installed. They are part of the operating system of any Internet-enabled device. 

The transport layer splits the transferred data into packets and adds the header information. The picture is now no longer `a single` sequence of zeros and ones. The transport layer forwards `several` packets consisting of zeros and ones with descriptive header information to the internet layer.

> Why is the data split into individual, smaller data packets for transmission? Splitting into several packets has the advantage that they are sent independently of each other. If there is a problem with the data transfer, it is only necessary to resend the part affected by the fault. 

### Internet layer

The Internet layer is responsible for correct addressing. Here, the IP origin address and IP destination address are added to the packet header. The path of the packets is also determined in this layer. Many tasks of this layer are performed by routers.

### Network access layer

The actual data transfer takes place in the network access layer. Depending on the medium, either in the form of light, as a radio wave or as an electrical signal.
<img src="https://vg04.met.vgwort.de/na/1fdfb2f8f4f84aad983c8e27a2138298" width="1" height="1" alt="">
