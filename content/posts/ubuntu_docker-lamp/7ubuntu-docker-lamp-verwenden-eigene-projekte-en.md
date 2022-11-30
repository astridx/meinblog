---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-06
title: 'docker-lamp mit eigenen _jorobo_ Projekten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-lamp-verwenden-eigene-projekte
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

As a reminder, _Docker_ simplifies the management of software in containers. _Docker Compose_ is a tool that simplifies working with multiple containers.

This is about _docker-lamp_ and specifically how special domains are created. _docker-lamp_ is software that provides pre-built images, containers and scripts to help you develop on a web server. In this section I add one of my projects.

## Requirements

Besides [Docker](/en/ubuntu-docker-set-up-docker-lamp), [Docker Compose](/en/ubuntu-docker-compose-set-up-docker-lamp) is necessary. If you have followed this [set](/en/my-ubuntu-computer-with-docker-lamp-themes/) so far, everything is fine.

## Own projects

I store my projects in the directory `/home/youruser/git`. The directory is available in the container because I set it that way in the [docker-lamp-setup](/ubuntu-docker-lamp-setup) section using `docker-compose.override.yml`.

### Include your own projects

##### An example project

Wer mein Beispiel nachvollziehen möchte, sollte das Beispielprojekt `https://codeberg.org/astrid/j4examplecode.git` in sein Projektverzeichnis klonen.

```
$ git clone https://codeberg.org/astrid/j4examplecode.git
Klone nach 'j4examplecode' ...
...
Löse Unterschiede auf: 100% (6886/6886), fertig.
```

Anschließend ins Verzeichnis des Beispielprojekts wechseln.

```
$ cd j4examplecode/
$ git checkout tutorial
```

##### Optional: Ein Projekt mit _jorobo_

Meine Projekte verwendet [jorobo](https://github.com/joomla-projects/jorobo). So kann ich Funktionen nutzen, die auf eine Joomla Erweiterung zugeschnitten sind.

> Wie man ein Projekt mit _jorobo_ aufsetzt, habe ich in einer [Präsentation](https://astridx.github.io/9997_jorobo/presentation/index.html#/) beschrieben.

###### _jorobo_ Funktionen

- `vendor/bin/robo build` - Baut aus der Erweiterung ein installierbares Joomla Paket oder eine Zip-Datei inklusive Ersetzungen wie das aktuelle Datum oder die Versionsnummer.
- `vendor/bin/robo map` - Verlinkt (Symlink) die Erweiterung in eine laufende Joomla Installation
- `vendor/bin/robo headers` - Aktualisiert die Copyright-Header aller Dateien des Quellverzeichnises. Dabei wird ein Header eingesetzt, welcher in der `jorobo.ini` konfigurierbar ist.
- `vendor/bin/robo bump` - Tauscht die Zeichenkette `__DEPLOY_VERSION__` in jeder Datei im Quellverzeichnis mit der in der `jorobo.ini` eingestellten Versionsnummer aus.

Um all diese Funktionen nutzen zu können, ist es erforderlich mit Composer PHP-Abhängigkeiten zu installieren.

###### Mit Composer PHP-Abhängikeiten installieren

Composer steht in den Containern ab PHP-Version 7.3 zur Verfügung. So kann ich mein Projekt, das im Container im Verzeichnis `/home/astrid/git/j4examplecode` eingebunden ist, über den nachfolgendenen Befehl mit allen Abhängigkeiten versorgen.

```
$ docker exec -it --user 1000 -w /git/j4examplecode docker-lamp_php74 composer install

```

> Um in einem Container Composer aufzurufen, muss Git installiert sein: `docker exec -it docker-lamp_php81 apk add git`. 

> Die Meldung `OCI runtime exec failed: exec failed: container_linux.go:370: starting container process caused: chdir to cwd ("/srv/git/j4examplecode") set in config.json failed: no such file or directory: unknown` weißt darauf hin, dass man sich im Pfad vertippt hat.

###### Projekte symlinken

Nachdem alle Abhängigkeiten über Composer installiert wurden, ist es möglich `vendor/bin/robo map` zu verwenden. dieser Befehl verlinkt meine Joomla Erweiterung automatisch in eine Joomla installation.

Dazu wechsele ich nun wieder in mein Projektverzeichnis.

```
$ docker exec -it --user 1000 -w /git/j4examplecode docker-lamp_php74 ./vendor/bin/robo map /home/astrid/docker-lamp/data/www/joomla/j4dev


```

###### Projekte in Joomla entdecken (discovern)

Im Joomla Backend sind die Erweiterungen nun zum Entdecken bereit.

![Projekte in Joomla discovern](/images/discover.png)

<img src="https://vg02.met.vgwort.de/na/7551ddb6895642938dab66210247c68d" width="1" height="1" alt="">
