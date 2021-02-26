---
date: 2021-02-08
title: 'docker-lamp mit eigenen _jorobo_ Projekt'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden-eigene-projekte
langKey: de
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

Ich speichere meine Projekte im Verzeichnis `/home/deinBenutzer/git/joomla-development`. Das Verzeichnis steht im Container zur Verfügung, weil ich es im Abschnitt [docker-lamp einrichten](/ubuntu-docker-lamp-einrichten) mithilfe der `docker-compose.override.yml` so eingestellt habe.

### Eigene Projekte einbinden

##### Ein Beispielprojekt

Wer mein Beispiel nachvollziehen möchte, sollte das Beispielprojekt `https://github.com/astridx/boilerplate.git` in sein Projektverzeichnis klonen.

```
$ git clone https://github.com/astridx/boilerplate.git
Klone nach 'boilerplate' ...
...
Löse Unterschiede auf: 100% (6886/6886), fertig.
```

Anschließend ins Verzeichnis des Beispielprojekts wechseln.

```
$ cd boilerplate/
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

Composer steht in den Containern ab PHP-Version 7.3 zur Verfügung. So kann ich mein Projekt, das im Container im Verzeichnis `/home/astrid/git/joomla-development/boilerplate` eingebunden ist, über den nachfolgendenen Befehl mit allen Abhängigkeiten versorgen.

```
$ docker exec -it --user 1000 -w /home/astrid/git/joomla-development/boilerplate docker-lamp_php80 composer install

```

> Um in einem Container Composer aufzurufen, muss Git installiert sein: `docker exec -it docker-lamp_php80 apk add git`.  
> `OCI runtime exec failed: exec failed: container_linux.go:370: starting container process caused: chdir to cwd ("/srv/git/boilerplate") set in config.json failed: no such file or directory: unknown` weißt darauf hin, dass man sich im Pfad vertippt hat.

###### Projekte symlinken

Nachdem alle Abhängigkeiten über Composer installiert wurden, ist es möglich `vendor/bin/robo map` zu verwenden. dieser Befehl verlinkt meine Joomla Erweiterung automatisch in eine Joomla installation.

Dazu wechsele ich nun wieder in mein Projektverzeichnis.

```
$ docker exec -it --user 1000 -w /home/astrid/git/joomla-development/boilerplate docker-lamp_php73 ./vendor/bin/robo map /srv/www/joomla/j4dev
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/plugins/webservices/foos","/srv/www/joomla/j4dev/plugins/webservices/foos"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/modules/mod_foo","/srv/www/joomla/j4dev/modules/mod_foo"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/media/com_foos","/srv/www/joomla/j4dev/media/com_foos"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/language/de-DE/pkg_foos.ini","/srv/www/joomla/j4dev/language/de-DE/pkg_foos.ini"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/language/de-DE/pkg_foos.sys.ini","/srv/www/joomla/j4dev/language/de-DE/pkg_foos.sys.ini"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/language/en-GB/pkg_foos.ini","/srv/www/joomla/j4dev/language/en-GB/pkg_foos.ini"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/language/en-GB/pkg_foos.sys.ini","/srv/www/joomla/j4dev/language/en-GB/pkg_foos.sys.ini"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/administrator/components/com_foos","/srv/www/joomla/j4dev/administrator/components/com_foos"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/templates/facile","/srv/www/joomla/j4dev/templates/facile"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/components/com_foos","/srv/www/joomla/j4dev/components/com_foos"]
 [Filesystem\FilesystemStack] symlink ["/home/astrid/git/joomla-development/boilerplate/src/api/components/com_foos","/srv/www/joomla/j4dev/api/components/com_foos"]

```

###### Projekte in Joomla entdecken (discovern)

Im Joomla Backend sind die Erweiterungen nun zum Entdecken bereit.

![Projekte in Joomla discovern](/images/discover.png)
