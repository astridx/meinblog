---
date: 2021-02-06
title: 'docker-lamp einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. Im letzten Teil haben wir die Umgebung eingerichtet. Nun füge ich eines meiner Projekte hinzu.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Um die Skripte automatisch auszuführen, solltest du unter Linux arbeiten. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## docker-lamp verwenden

Wenn der Server zwischenzeitlich heruntergefahren wurde, starte ihn über `make server-up` im Verzeichnis `docker-lamp`.

Öffne als nächstes einen Webbrowser und öffne die URL `https://joomla.test/` oder `https://joomla.local/`. Du siehst einen Zertifikatsfehler. Den Fehler beheben wir als nächstes.

![Zertifikatsfehler](/images/dockerlamp_zert.png)

> Hinter `https://joomla.test/` oder `https://joomla.local/` befindet sich das gleiche Ziel. Warum wurden zwei Domains zur Verfügung gestellt? Ganz einfach. So kannst du Debuggen und gleichzeitg Browsen.

### Zertifikat importieren

In Mozilla Firefox importierst du das Zertifikat wie folgt. Öffne die
Einstellungen (Preferences). Klicke dann in der linken Seiteleiste auf Datenschutz & Sicherheit (Privacy and Security). Im rechten Bereich findest du nun weiter unten den Abschnitt Sicherheit (Security). Klicke hier auf die Schaltfläche Zertifikate anzeigen (View Certificates). Im Tabulator Zertifizierungsstellen (Authorities) importierst du die Datei `/docker-lamp/data/ca/minica-root-ca-key.pem`. Achte darauf, dass du `Webseite vertrauen` aktivierst.

![Zertifikat importieren](/images/dockerlamp_zertbrowser.png)

> Das Zertifikat ist für die `https://joomla.test/` oder `https://joomla.local/` erstellt. Unter `https://joomla.test/` oder `https://joomla.local/` gibt es weiterhin den Fehler.

## Ein Projekt in docker-lamp integrieren

## Mögliche Fehler
