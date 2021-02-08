---
date: 2021-02-08
title: 'docker-lamp mit eigenen _jorobo_ Projekt'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden-eigene-projekte
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_ und konkrete darum, wie spezielle Domains erzeugt werden. _docker-lamp_ ist eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. Im diesem Abschnitt füge ich eines meiner Projekte hinzu.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](/mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.


## Eigene Projekte 

Ich speichere meine Projekte im Verzeichnis `/home/deinBenutzer/git/joomla-development`. Das Verzeichnis steht im Container zur Verfügung, weil ich es im Abschnitt [docker-lamp einrichten](/ubuntu-docker-lamp-einrichten) mithilfe der `docker-compose-override.yml` so eingestellt habe. 

### Eigene Projekte einbinden

##### Ein Beispielprojekt

Damit gleiche Voraussetzungen gegeben sind, sollte das Beispielprojekt `https://github.com/astridx/boilerplate.git` in des Projektverzeichnis geklont werden.

```
$ git clone https://github.com/astridx/boilerplate.git
Klone nach 'boilerplate' ...
remote: Enumerating objects: 31, done.
remote: Counting objects: 100% (31/31), done.
remote: Compressing objects: 100% (22/22), done.
remote: Total 18865 (delta 5), reused 20 (delta 3), pack-reused 18834
Empfange Objekte: 100% (18865/18865), 4.64 MiB | 675.00 KiB/s, fertig.
Löse Unterschiede auf: 100% (6886/6886), fertig.
```

Anschließend ins Beispielprojekt wechseln.

```
$ cd boilerplate/
```

##### Projekt mit _jorobo_

Meine Projekte verwendet [jorobo](https://github.com/joomla-projects/jorobo).

> Wie man ein Projekt mit _jorobo_ aufsetzt, habe ich in einer [Präsentation](https://astridx.github.io/9997_jorobo/presentation/index.html#/) beschrieben. 

###### _jorobo_ Funktionen

* `vendor/bin/robo build` - Baut aus der Erweiterung ein installierbares Joomla Paket oder eine Zip-Datei inklusive Ersetzungen
* `vendor/bin/robo map` - Verlinkt (Symlink) die Erweiterung in eine laufende Joomla Installation
* `vendor/bin/robo headers` - Aktualisiert die Copyright-Header im Quellverzeichnis dem in der `jorobo.ini` konfigurierten.
* `vendor/bin/robo bump` - Tauscht die Zeichenkette `__DEPLOY_VERSION__` in jeder Datei im Quellverzeichnis mit der in der `jorobo.ini` eingestellten Versionsnummer aus.

###### Composer 


##### Projekte symlinken

##### JRobo
