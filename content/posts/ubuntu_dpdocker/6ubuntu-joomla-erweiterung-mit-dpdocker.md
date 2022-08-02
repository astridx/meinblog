---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-04-13
title: 'Eine eigene Joomla-Erweiterung mit DPDocker'
template: post
thumbnail: '../../thumbnails/dp_logo.png'
slug: joomla-erweiterung-mit-dpdocker
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

Zur Erinnerung: [_Docker_](/ubuntu-dpdocker/) erleichtert die Verwaltung von Software in Containern. [_Docker Compose_](/ubuntu-docker-compose-einrichten) ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht. [_DPDocker_](/ubuntu-dpdocker) enthält vorgefertigte Images, Container und Skripte, die dich bei der Entwicklung mit und für Joomla unterstützen.

DPDocker bietet den Task `build`, der Joomla Erweiterungen optimal in die Docker Umgebung integriert. Dazu ist es erforderlich, Regeln einzuhalten. 

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten) und [Docker Compose](/ubuntu-docker-compose-einrichten) ist [DPDocker](https://github.com/Digital-Peak/DPDocker.git) notwendig. Wenn du diesem [Set](/mein-ubuntu-rechner-themen) bisher gefolgt bist, passt alles.

## Clonen einer Joomla Erweiterung

Als nächstes clone ich eines meiner Repositorys, in welchem sich eine Joomla Erweiterung befindet. Ich achte darauf, dass das Repo in einem Verzeichnis **neben** DPDocker abgelegt wird. Das ist wichtig, denn hier sucht DPDocker nach Erweiterungen! 

```
git clone https://github.com/Digital-Peak/DPAttachments.git
```

## Joomla Erweiterung mit DPDocker verwalten

DPDocker enthält Skripte, die das

- Entwickeln
- Erstellen eines Installationspaketes, 
- Testen und 
- Aktualisieren der Abhängigkeiten 

unterstützen. Jedes Verzeichnis im [Github-Repository](https://github.com/Digital-Peak/DPDocker)[^github.com/Digital-Peak/DPDocker] beinhaltet eine Datei `README.md` mit genaueren Erklärungen.

## Mögliche Fehlermeldungen

### Hilfe bei der Meldung: `Docker Error bind: address already in use`

Unter Umständen hilft es schon, alle Container zu entfernen damit sie beim nächsten Aufruf von `./DPDocker/webserer/run.sh` neu gebaut werden.

```
docker rm $(docker ps -a - q)
```

Falls das Problem weiterhin auftritt, lasse ich mir alle Dienste anzeigen, die den Port verwenden.

```
sudo lsof -i -P -n | grep <port number>
```

Je nachdem, welchen Dienst ich als den Schuldigen ausmache, stoppe ich ihn via

```
sudo service DIENST stop
```

Falls es mir nicht gelingt, den blockierenden Dienst zu identifizieren, entferne ich ihn mittels `kill`. Unter Ubuntu 20.04 stoppe ich ihn mittels

```
sudo kill <process id>
```

> Die Nummer des Prozesses kann ich in der Ausgabe von `sudo lsof -i -P -n | grep <port number>` ablesen.
