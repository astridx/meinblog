---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-07-04
title: 'Wie ist das Internet vernetzt? - Teil 2'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: en/internet-netz2
langKey: en
categories:
  - Internet
tags:
  - Netzknoten
  - Netzverbindungen
  - Netz
  - zentral
  - dezentral
---


How does a device become part of a network like the Internet? 

![How does a device become part of a network?](/images/1b.en.png)

To become part of a network, you need 
- a hardware address and 
- an access authorisation.
Then you get an 
- Internet address or IP address and 
- a standard gateway
and can enter the network.

## Network card with address

The hardware of a network device includes all physical parts, i.e. everything that is hard and can be touched with the hands. These are, for example, the power source, the hard disk for saving data, the graphics card and the screen for display. 

For interaction with the internet, the network card is relevant.

A node on the internet needs an internet address. The network card of a computer has a 'Media Access Control (MAC) address' [^en.wikipedia.org/wiki/MAC-address]. A MAC is a string of characters used by the local router to identify a computer on a network. This makes it addressable. The address is usually hexadecimal and looks like this: '00-80-41-ae-fd-7e'. The MAC address is required within the local network. Outside the local network, the `IP address` is relevant. 

> In the mobile network, the `IMAEI` takes the place of the MAC [^en.wikipedia.org/wiki/International_Mobile_Equipment_Identity]. The `international Mobile Station Equipment Identity (IMEI)` is a unique 15-digit serial number used to identify each GSM or UMTS terminal.

A fixed MAC identifies a device and thus, under certain circumstances, a person. Although not necessary, it is possible to read MAC addresses outside the local network and get information such as the location of the device. For this reason, hardware has been available whose MAC address can be changed by software or is assigned dynamically. 

> Wi-Fi hotspot tracking: Wi-Fi hotspots are able to track the location of a device. This is also the case when it does not connect to them. At least when the mobile phone or computer sends a unique MAC address.

## Access authorisation to the network

The connection to the Internet is usually made by Ethernet cable or WLAN via a router located in one's own home. Alternatively, a connection via the mobile network or a satellite network is possible. In any case, an Internet address is necessary in addition to the MAC address. This is assigned via DHCP [^en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol] after one has proven oneself to be authorised - usually on the basis of access data such as user and password. 

In concrete terms, the following happens after a successful access check:
- The router identifies the network device by its MAC address and assigns an IP address for external communication via DHCP.
- The router informs the network device of the default gateway via which the device can communicate with other networks - usually the Internet.
