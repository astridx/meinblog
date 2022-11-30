---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-07-07
title: 'Regeln für die Kommunikation zwischen Computern im Internet - Teil 1'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: regeln-fuer-die-kommunikation-im-netz
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


Ein erfolgreiches Gespräch ist nur möglich, wenn eine Sprache verwendet wird, die jeder Teilnehmer versteht. Das ist klar! Im Internet werden die Regeln dieser Sprache als Protokolle bezeichnet.

![Daten zum Austausch über das Internet in Pakete packen](/images/3.png)

## Protokolle: Regeln im Internet

Regeln sind meist lästig und niemand ist begeistert. Aber manche Dinge brauchen eine Vereinbarung, damit etwas funktioniert.

### Welche Themen brauchen eine Vereinbarung?

Damit jedes Gerät im Netz die Daten richtig versteht, ist es wichtig, dass es die Antwort auf Fragen zu kennen wie 

- Wie groß ist ein Paket?
- Was passiert, wenn eine Adresse falsch ist?
- Was steht im Header und welche Informationen werden wo und in welcher Form geschrieben?
- Wie lassen sich verlorene Daten rekonstruieren?
- Wird eine Empfangsbestätigung oder eine Fehlermeldung vom Empfänger an den Adressaten gesendet?

### Kann man Dinge unterschiedlich abstimmen?

Wie im nicht-digitalen Leben gibt es auch im Netz unterschiedliche Anforderungen, die unterschiedliche Regeln erfordern. Wenn ich eine Postkarte aus dem Urlaub verschicke, wird sie anders behandelt als eine wertvolle Sendung, welche per Einschreiben mit Rückschein aufgegeben wird.

Im Netz ist das komplexer. Deshalb greife ich auf das Schichtenmodell zurück und beschränke mich auf die Transportschicht. 

- Das wichtigste Protokoll dieser Schicht ist das `Transmission Control Protocol (TCP)`. Es garantiert die Vollständigkeit der Daten, arbeitet dafür langsam.[^en.wikipedia.org/wiki/Transmission_Control_Protocol]
- Daneben gehören unzuverlässige, aber schnelle Protokolle dieser Schicht an. Zum Beispiel das `User Datagram Protocol (UDP)`.[^en.wikipedia.org/wiki/User_Datagram_Protocol]
- Ein Kompromiss stellt das `Stream Control Transmission Protocol (SCTP)` dar. Dies ist ein zuverlässiges, verbindungsorientiertes Netzwerkprotokoll.[^de.wikipedia.org/wiki/Stream_Control_Transmission_Protocol]

## Regeln: Wie funktionieren sie im Netz?

Bei uns zu Hause gibt es die Regel, dass schmutziges Geschirr in die Spülmaschine gehört. Nicht jeder im Haus hält sich immer daran. Ein Strafzettel wird hingegen von allen Familienmitgliedern bezahlt. 

### Regel-Ersteller

Es gibt internationale Organisationen, die Regeln für die Kommunikation im Internet aufstellen. Man bekommt keinen Strafzettel, wenn man sie nicht befolgt. Trotzdem halten sich Menschen an diese Richtlinien, denn jeder profitiert davon. Ohne die Befolgung dieser Regeln ist eine gewinnbringende Kommunikation für alle nicht möglich. 

> Es handelt sich um ein freiwilliges, auf Konsens beruhendes Systems von Regeln. 

#### Weltweite Zusammenarbeit im Bereich der Normen (WSC)

- Die `Internationale Organisation für Normung ISO` ist ein Zusammenschluss von Normungsorganisationen. Jeder hat schon in der Schule von ihr gehört, weil sie Papierformate festlegt. Sie ist auch auf dem Gebiet der Technologie tätig. Es gibt ein Schichtenmodell, das die ISO erstellt hat.[^de.wikipedia.org/wiki/Internationale_Organisation_für_Standardisierung]
- Die wichtigsten Produkte des Normungsbereichs der `Internationalen Fernmeldeunion ITU-T` sind die `ITU-T Recs`. Dabei handelt es sich um Empfehlungen die festlegen, wie Telekommunikationsnetze funktionieren. Die Verschlüsselung ist nur ein wichtiges Thema in diesem Bereich.[^de.wikipedia.org/wiki/Internationale_Telekommunikationsunion]
- Die `Internationale Elektrotechnische Kommission IEC` standardisiert im Bereich der Elektrotechnik.

#### Internet Engineering Task Force IETF

Die IETF ist eine Arbeitsgruppe, die sich mit Standards für die technische Entwicklung des World Wide Web befasst - zum Beispiel mit Protokollen wie HTTP, das für die Anzeige von Webseiten in einem Browser verwendet wird.[^de.wikipedia.org/wiki/Internet_Engineering_Task_Force]
- [^de.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers]

#### Institute of Electrical and Electronics Engineers IEEE

IEEE ist der größte technische Berufsverband der Welt. Der Standard für drahtlose Netzwerke stammt von ihm.[^de.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers]

#### Sanktionen

Was passiert, wenn ein Beteiligter eine Regel nicht umsetzt? Ein Beispiel hierfür hat sicherlich jeder in der Vergangenheit schon einmal erlebt. Ein Browser zeigt eine Website etwas anders an, weil er eine Funktion nicht oder abgewandelt interpretiert. Oft liegt es daran, dass die Entwickler des Browsers noch keien Gelegenheit hatten, die Funktion zu integrieren, weil sie neu ist. 

> `caniuse.com` beantwortet die Frage, ob eine bestimmte Technologie auf einer Website mit bestimmten Browsern kompatibel ist. Die Website veranschaulicht dies mit Hilfe eines leicht zu lesenden Diagramms. CanIUse ist ein Open-Source-Projekt, zu dem jeder beitragen kann[^github.com/Fyrd/caniuse].
<img src="https://vg04.met.vgwort.de/na/56d51696454041bc84fcbb7e89124973" width="1" height="1" alt="">
