---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-07-06
title: 'Daten zum Austausch über das Internet in Pakete packen'
template: post
thumbnail: '../../thumbnails/worldinternet.png'
slug: daten-in-pakete-packen
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


Netzknoten und Verbindungen im Internet existieren nicht um ihrer selbst willen. Menschen nutzen das Netz, um miteinander zu kommunizieren. Was in der Realität möglich ist, geschieht auch digital. Arbeiten, Spielen, Kommunizieren zum Zeitvertreib sind nur einige Beispiele. 

![Daten zum Austausch über das Internet in Pakete packen](/images/2.png)

## Pakete packen

Alle Aktivitäten im Netz geschehen durch den Austausch von Daten. Dies sind zum Beispiel Texte, Bilder, Videos oder Töne. Zur Übertragung werden diese in eine einheitliche Form gebracht. Das Ergebnis ist ein Paket.

Wie ein Datenpaket gepackt wird, ist in Protokollen[^de.wikipedia.org/wiki/Netzwerkprotokoll] geregelt. Meistens passt nicht alles in ein Paket, deshalb definieren Protokolle zusätzlich Regeln, wie die Daten aufzuteilen sind. 

> Warum gibt es ein Netzwerkprotokoll? Damit alle Netzwerkgeräte miteinander kommunizieren können, ist es notwendig, dass sie sich gegenseitig verstehen. Dies wird durch die Protokolle gewährleistet. Ähnlich wie beim Erlernen einer Sprache legen sie Grammatiken und Bedeutungen fest, innerhalb derer Daten ausgetauscht werden. Jeder, der diese lernt, kann mitreden.

Ein typisches Datenpaket besteht aus 
- den eigentlichen Daten, 
- Adressinformationen und 
- Informationen über die gepackten Pakete wie
  - Inhalt,
  - Größe,
  - Sequenznummer, 
  - Gesamtzahl der Pakete und einer 
  - Prüfsumme.

Alles wird gemäß den Protokoll-Regeln zusammengepackt. Die Informationen über die Pakete werden als Header vorangestellt. Eine Prüfsumme stellt sicher, dass alles korrekt ankommt.

## Inhalt und Form der Netzwerkpakete

Wenn meine Tochter ein Foto ihrer Katze an ihre Freundin schickt, macht sie sich keine Gedanken darüber, wie genau das geschieht. Wie durch ein Wunder gelangen Farben und Formen an ihr Ziel
- per Mobiltelefon durch die Luft oder 
- über ein Kabel, vom Computer aus.

Doch ein Computer ist ziemlich begrenzt. Er kann addieren und vergleichen, einfallsreicher ist er nicht. Deshalb sind zwei Zustände das Einzige, was er verarbeiten kann. Diese werden oft mit 1 und 0 dargestellt oder 
- im Kupferkabel mit Strom oder ohne Strom, 
- in der Glasfaser mit Licht oder kein Licht, 
- in der Luft per Radiowelle[^de.wikipedia.org/wiki/radio-wave] mit Wellensignal oder ohne.

> Alle von Computern verarbeiteten Informationen bestehen im Rohzustand aus zwei verschiedenen Signalen. Dies gilt gleichermaßen für Datenpakete.

## Der Übertragungsprozess in der Übersicht

Ein komplexer Prozess ist leichter zu verstehen, wenn man ihn aufteilt. Für die Übertragung im Internet gibt es eine Reihe von Modellen, die die Übermittlung in Schichten unterteilen. Zum Beispiel das TCP/IP-Referenzmodell[^de.wikipedia.org/wiki/Internetprotokollfamilie], das mit vier Schichten arbeitet.

### Anwendungsschicht

Die Hauptaufgabe der Anwendungsschicht besteht darin, Daten an die Transportschicht weiterzuleiten. Nina klickt im Chatprogramm auf Senden, um das Foto ihrer Katze an ihre Freundin zu schicken und veranlasst so, dass das Chatprogramm die Daten an die Transportschicht zu übergeben.

### Transportschicht

> Nur sehr wenige Nutzer sind sich der Protokolle bewusst. Sie sind nicht sichtbar und werden nicht bewusst installiert. Sie sind Teil des Betriebssystems eines jeden internettauglichen Geräts. 

Die Transportschicht teilt die übermittelten Daten in Pakete auf und fügt die Header-Informationen hinzu. Das Foto ist nun nicht mehr `eine einzige` Folge von Nullen und Einsen. Die Transportschicht leitet `mehrere` aus Nullen und Einsen bestehende Pakete mit beschreibenden Header-Informationen an die Internet-Schicht weiter.

> Warum werden die Daten für die Übertragung in einzelne, kleinere Datenpakete zerlegt? Die Aufteilung in mehrere Pakete hat den Vorteil, dass sie unabhängig voneinander gesendet werden. Wenn es ein Problem bei der Datenübertragung gibt, reicht es aus, nur den vom Fehler betroffenen Teil nochmals zu senden. 

### Internet-Schicht

Verantwortlich für die korrekte Adressierung ist die Internet-Schicht. Hier wird der Paketkopf um die IP-Ursprungs- und Zieladresse ergänzt. Der Weg der Pakete wird ebenfalls in dieser Schicht bestimmt. Viele Aufgaben dieser Schicht werden von Routern erledigt.

### Netzzugangsschicht

Die eigentliche Datenübertragung findet in der Netzzugangsschicht statt. Je nach Medium entweder in Form von Licht, als Funkwelle oder als elektrisches Signal.
<img src="https://vg04.met.vgwort.de/na/1f847204312249bfb40b5a092d0986f3" width="1" height="1" alt="">
