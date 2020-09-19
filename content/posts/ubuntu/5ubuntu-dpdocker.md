---
date: 2020-08-05
title: 'Docker Compose unter Ubuntu 20.04 einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-compose-einrichten
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

_Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht. _DPDocker_ enthält vorgefertigte Images, Container und Skripte, die dich bei der Entwicklung mit und für Joomla unterstützen.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten) ist [Docker Compose](/ubuntu-docker-compose-einrichten) notwendig. Um die Skripte automatisch auszuführen, solltest du unter Linux arbeiten. Wenn du diesem [Set](mein-ubuntu-rechner/) bisher gefolgt bist, passt alles.

## Installieren von DPDocker

```bash
git clone https://github.com/Digital-Peak/DPDocker.git

git clone  https://github.com/astridx/boilerplate.git

cd DPDocker

bash images/build.sh
```

./run.sh

Eine vollständige Referenz aller verfügbaren `DPDocker` Befehle ist die [Dokumentation](https://github.com/Digital-Peak/DPDocker/blob/master/README.md).
