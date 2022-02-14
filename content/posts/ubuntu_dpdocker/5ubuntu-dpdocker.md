---
description: 'desc'
shortTitle: 'short'
date: 2020-08-06
title: 'DPDocker einrichten'
template: post
thumbnail: '../../thumbnails/dp_logo.png'
slug: ubuntu-dpdocker
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _DPDocker_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung mit und für Joomla unterstützen.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten) ist [Docker Compose](/ubuntu-docker-compose-einrichten) notwendig. Um die Skripte automatisch auszuführen, solltest du unter Linux arbeiten. Wenn du diesem [Set](mein-ubuntu-rechner-mit-dpdocker-themen/) bisher gefolgt bist, passt alles.

### Optional: Entfernen von Docker-Images, -Containern

Bei der Arbeit mit Docker passiert es leicht, dass viele nicht verwendete Images, Container und Datenvolumen gesammelt werden, die Ausgabe verkomplizieren und unnötigen Festplattenspeicher verbrauchen.

Aus diesem Grund räume ich meine bisher zu Übungszwechen erstellten Dockerelemente auf. Ich nenne das [Tabula rasa](https://de.wikipedia.org/wiki/Tabula_rasa)!

#### Images

##### Auflisten

Ich überprüfe die Images in meinem System mit `docker images`. Durch Hinzufügen des Flag `-a` werden alle angezeigt.

```
docker images -a
```

##### Entfernen

Wenn ich sicher bin, ergänze ich das Flag `-q`, um die IDs an den Befehle Docker `rmi` zu übergeben:

```
docker rmi $(docker images -a -q)
```

#### Container

##### Auflisten

Ich überprüfe die Container in meinem System mit `docker ps`. Durch Hinzufügen des Flag `-a` werden alle angezeigt.

```
docker ps -a
```

##### Stoppen und Entfernen

Wenn ich sicher bin, ergänze ich das Flag `-q`, um die IDs an die Befehle `docker stop` und `docker rm` zu übergeben:

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

> digitalocean.com behandelt in einem [Artikel](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de) alle gängigen Befehle, die zum Entfernen von Images, Containern und Volumen bei Docker verwendet werden.

## Installieren von DPDocker

Ich verfüge über eine frische Dockerinstallation. Auf meinem Rechner ist kein Image und somit kein Container. Die folgenden Befehle zeigen beide eine leere Tabelle:

```
docker images -a
docker ps -a
```

Nun clone ich das DPDocker Github Repository.

```
git clone https://github.com/Digital-Peak/DPDocker.git
```

Als nächstes wechsele ich in den Ordner DPDocker und führe den Befehl aus, der alle notwendigen Images herunterlädt.

```
cd DPDocker

bash images/build.sh
```

Der Befehl arbeitet einige Minuten. Im Anschluss werden mir eine Reihe von Images angezeigt, wenn ich `docker images -a` eingebe. `docker ps -a` listet keine Container auf. Diese werden über spezielle Kommandos angelegt. Eine vollständige Referenz aller verfügbaren `DPDocker` Befehle ist die [Dokumentation](https://github.com/Digital-Peak/DPDocker/blob/master/README.md).
