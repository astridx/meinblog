---
description: 'desc'
shortTitle: 'short'
date: 2022-07-17
title: 'Regeln für die Kommunikation zwischen Computern im Internet - Teil 2'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: regeln-fuer-die-kommunikation-im-netz2
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


Ein wichtiges Protokoll der Transportschicht ist das Internetprotokoll IP[^de.wikipedia.org/wiki/Internet_Protocol].

![Daten zum Austausch über das Internet in Pakete packen](/images/3a.png)

## Internetprotokoll IP

IP bietet Basisfunktionen für die Vermittlung von Datenpaketen in einem Netz. Es normiert wie Pakete strukturiert und wie Adressen formatiert sind. Jedes Gerät erhält eine IP-Adresse, wenn es sich mit einem Netzwerk verbindet. Um mit anderen Geräten im Internet zu kommunizieren, muss es sich hierbei um eine öffentliche eindeutige Adresse handeln.

### Adressen in privaten Netzwerken und Adressen im Internet

Das Internetprotokoll unterscheidet öffentliche und private Adressen. 

> Öffentliche IP-Adressen dienen zur Interaktion mit dem Internet, während private IP-Adressen innerhalb eines lokalen Netzwerks verwendet werden. Lokale Netze sind LAN oder VPN.

#### Was ist eine öffentliche IP-Adresse?

Mithilfe einer öffentliche IP-Adresse kann direkt über das Internet zugegriffen werden und umgekehrt. In Regel wird diese dem eigenen Netzwerkrouter vom Internet-Service-Provider ISP zugewiesen. Außerdem hat jedes lokale Gerät eine private IP-Adresse.

> Die Begriffe `öffentliche IP-Adresse`, `globale IP-Adresse` und `externe IP-Adresse` sind Synonyme. 

Außerdem hat jedes Gerät eine private IP-Adresse. Diese ist nicht öffentlich einsehbar, wenn man sich über die externe IP-Adresse des Routers mit dem Internet verbindet.

#### Was ist eine private IP-Adresse?

Eine private IP-Adresse wird einem Gerät von einem Router zugewiesen. Jedes Gerät in einem Netzwerk erhält eine eindeutige private IP-Adresse. So können Geräte, die sich im selben internen Netzwerk befinden, miteinander kommunizieren, ohne dass sie eine Internetverbindung benötigen.

> Die Begriffe `private IP-Adresse`, `lokale IP-Adresse` und `interne IP-Adresse` sind Synonyme. 

#### Wichtige Unterschiede zwischen öffentlichen und privaten IP-Adressen

Die Hauptunterschiede zwischen öffentlichen und privaten IP-Adressen liegen in ihrem Gültigkeitsbereich und darin, womit sie verbunden sind. Eine öffentliche IP-Adresse wird verwendet, um ein Gerät im Internet zu identifizieren, so dass die von ihm Angeforderten Informationen an dich weitergeleitet werden können. Eine private IP-Adresse wird innerhalb eines privaten Netzes für eine sichere Verbindung zu anderen Geräten im selben Netz verwendet.

### Adressübersetzung NAT

### IPv4

Weltweit gibt es unzählige private Netze mit Geräten, denen private IP-Adressen innerhalb der folgenden Bereiche zugewiesen sind:
- Klasse A: 10.0.0.0 - 10.255.255.255
- Klasse B: 172.16.0.0 - 172.31.255.255 
- Klasse C: 192.168.0.0 - 192.168.255.255 

Diese Bereiche sind nicht sehr umfangreich. Da diese IP-Adressen für den privaten Gebrauch reserviert sind, können sie in verschiedenen privaten Netzen auf der ganzen Welt wiederverwendet werden, ohne dass es zu Verwechslungen kommt. 

### IPv6

### Adressvergabe

### Routing

## Sicherheit mit IPsec

Regeln sind meist lästig und niemand ist begeistert. Aber manche Dinge brauchen eine Vereinbarung, damit etwas funktioniert.
