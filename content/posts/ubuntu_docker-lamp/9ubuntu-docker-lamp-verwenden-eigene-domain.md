---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-02-10
title: 'docker-lamp mit eigener Domain'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden-eigene-domain
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

_Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_ und konkrete darum, wie spezielle Domains erzeugt werden. _docker-lamp_ ist eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. In diesem Teil erstellen wir eine separate Domain.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## Top-Level-Domain (TDL)

## Subdomain

Bisher verfügen wir über die Domains `joomla.local` und `joomla.test`. Nun ergänzen wir `tutorial.local` und `tutorial.test`

> docker-lampp bietet von Hause aus zusätzlich `wp.local` und `wp.test` sowie `wpms.local` und `wpms.test`

```
                            (root)
                   /                     \
                 /                         \
               /                             \
            test                              local
         /         \                       /          \
        /           \                     /            \
    joomla        tutorial             joomla        tutorial
    /  |   \       /  |   \           /   |  \       /  |   \
j4dev j3  j3b4   t1   t2  t3        j4dev j3 j3b4   t1   t2  t3
```

Falls der Server aktiv ist, stoppe ihn über `./docker-lamp shutdown`. Stelle sicher, dass du den Befehl im `docker-lamp` Ordner aufrufst oder ihn global verfügbar gemacht hast.

```
/docker-lamp$ ./docker-lamp shutdown
./.env included

Datenbank-Sicherung gestartet.


Datenbank-Sicherung abgeschlossen.

Stopping docker-lamp_httpd      ... done
...
```

### Eigene lokale Domain erzeugen

#### .env

Über `nano .env` öffne ich die Datei, in der die Umgebungsvariablen konfiguriert werden. Hier ergänze `tutorial.local,*.tutorial.local,tutorial.test,*.tutorial.test`  damit die Verschlüsselung auch funktioniert bei `SSL_LOCALDOMAINS`.

```
...
SSL_LOCALDOMAINS=tutorial.local,*.tutorial.local,tutorial.test,*.tutorial.test
...
```

#### Webserver

Mit `mkdir` erstelle ich auf dem Webserver das Verzeichnis, welches die Daten zur neuen Domain beinhalten wird.

> Zur Erinnerung: Mein Webserver Stammverzeichnis ist `./data/`

```
mkdir ./data/tutorial
```

##### Zertifikat

Damit das Zertifikat neu angelegt wird lösche ich den Ordner `/data/ca/localdomains`.

```
$ sudo rm -R /srv/data/ca/localdomains/
```

Dieses Zertifikat muss ich später wie gehabt im Browser importieren. Dies kann ich frühestens nach dem nächsten Start von docker-map tun, weil das Zeritifkat beim Start angelegt wird.

#### Test

Im `docker-lamp`-Ordner rufe ich den Befehl `./docker-lamp start` auf.

```
/docker-lamp$ ./docker-lamp start
./.env included
Building with native build. Learn about native build in Compose here: https://docs.docker.com/go/compose-native-build/
...
```

![Ansicht der neuen Domain im Browser](/images/neuedomain.png)

`https://tutorial.local/` zeigt mir den Inhalt des Verzeichnisses `tutorial` an. In diesem Verzeichnis befinden sich zwei Joomla Installationen, die über`https://t1.tutorial.local` und `https://t2.tutorial.local` erreiche.

### Optionale DNS Konfiguration erzeugen

Ich möchte gerne die URL `astrid-guenther.de` auf ein lokales Verzeichnis mappen. Über `nano .env` öffne ich die Datei, in der die Umgebungsvariablen konfiguriert werden. Hier ergänze `astrid-guenther.de=127.0.0.1` bei `EXTRA_HOSTS`. 

```
...
EXTRA_HOSTS=astrid-guenther.de=192.168.209.147
...
```

Mit `mkdir` erstelle ich dann auf dem Webserver das Verzeichnis, welches die Daten zur Domain `astrid-guenther.de` beinhalten wird.

> Zur Erinnerung: Mein Webserver Stammverzeichnis ist `./data/`

```
mkdir ./data/astrid-guenther
```

<img src="https://vg02.met.vgwort.de/na/3cb53e3046464e33bca6719d817f7426" width="1" height="1" alt="">
