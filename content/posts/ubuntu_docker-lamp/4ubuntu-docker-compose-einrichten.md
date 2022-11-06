---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-11-03
title: 'Docker Compose unter Ubuntu 22.04 einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-compose-einrichten-docker-lamp
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
  - Docker Compose
---

Docker erleichtert die Konfiguration von Software mithilfe von Containern. Docker Compose vereinfacht die Arbeite mit mehreren Containern. Ich installiere [Docker Compose](https://docs.docker.com/compose/) unter Ubuntu 22.04.

## Voraussetzungen

Nach der Installation des Desktop Images von [Ubuntu 22.04 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/22.04/) verfüge ich über ein _non-root-Superuser-Konto_ und kann direkt mit der Installation von _Docker Compose_ beginnen.

## Installieren von Docker Compose

Mit dem folgenden Befehl lädst du die Version `v2.12.2` herunter und speicherst die ausführbare Datei unter `/usr/local/bin/docker-compose`. So ist diese global als `docker compose` erreichbar. Die neueste **Docker Compose** Version findest du auf der [Seite](https://github.com/docker/compose/releases):

```
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
```

> Die aktuellste `docker-compose`-Version findest du auf [Github](https://github.com/docker/compose/releases)

Setze die notwendigen Berechtigungen:

```
chmod +x ~/.docker/cli-plugins/docker-compose
```

Überprüfe die Version und somit auch die Installation:

```
$ docker compose version
Docker Compose version v2.12.2
```

Docker Compose ist nun installiert. Als nächstes erstellen wir eine `docker-compose.yml`-Datei.

## Die `docker-compose.yml`-Datei

Um mir als Einsteigerin einen Überblick zu verschaffen, beginne ich mit einem einfachen Beispiel. Ich erstelle mithilfe des [Nginx-Images](https://hub.docker.com/_/nginx) eine Webserverumgebung die eine statische HTML-Datei enthält. Dafür lege ich ein separates Verzeichnis an.

```
mkdir ~/compose-test
cd ~/compose-test

```

Ich lege ein weiteres Verzeichnis an, in dem ich die HTML-Datei `~/compose-test/app/index.html` ablegen. Die Datei `~/compose-test/app/index.html` beinhaltet den einfachen Text `test`:

```
mkdir app
nano app/index.html
```

> Ich verwende den Editor Nano. Hier klicke ich zum Speichern `STRG+X`, dann `Y` und zur Bestätigung `ENTER`.

Ich erstelle als nächstes die Datei `docker-compose.yml`:

```
nano docker-compose.yml

```

Der Inhalt der Datei `docker-compose.yml` ist:

docker-compose.yml

```
version: '3.8'
services:
  web:
    image: nginx:alpine
    ports:
      - "8000:80"
    volumes:
      - ./app:/usr/share/nginx/html

```

Die Datei `docker-compose.yml` beginnt mit der [Versionsnummer](https://docs.docker.com/compose/compose-file/compose-versioning/)[^docs.docker.com/compose/compose-file/compose-versioning/] `version`.

Dann folgt der `services`-Block, in dem wir die Dienste einrichten. Es gibt einen Dienst der das Image `nginx:alpine` verwendet und mit der Anweisung `ports` eine Portumleitung einrichtet. `volumes` erstellt ein [gemeinsames Volume](https://docs.docker.com/compose/compose-file/#volumes) - der lokale Ordner `app` wird mit dem Container unter `/usr/share/nginx/html` geteilt.

Im nächsten Schritt stellen wir diese Umgebung mithilfe von Docker Compose bereit.

## Ausführen von Docker Compose

Die Datei `docker-compose.yml` enthält alle Informationen. Der folgende Befehl 
- lädt alle notwendigen Images herunter, 
- erstellt einen Container für den `web`-Dienst und 
- führt die Umgebung im Hintergrundmodus aus.

Der Befehl muss im Verzeichnis `composer-test` aufgerufen werden.

```
docker compose up -d
```

Die Ausgabe sieht beispeilsweise so aus:

```
$ docker compose up -d
[+] Running 7/7
 ⠿ web Pulled                                                  11.7s
   ⠿ 213ec9aee27d Pull complete                                 6.4s
   ⠿ ae98275d0ecb Pull complete                                 7.7s
   ⠿ 121e2d9f6af2 Pull complete                                 7.9s
   ⠿ 6a07d505af0f Pull complete                                 8.0s
   ⠿ 3e8957b70867 Pull complete                                 8.1s
   ⠿ 2806408d582e Pull complete                                 8.2s
[+] Running 2/2
 ⠿ Network compose-test_default  Created                        0.3s
 ⠿ Container compose-test-web-1  Started                        2.1s

```

Ich überprüfen, ob der Container aktiv ist. Der Befehl zeigt Informationen über die ausgeführten Container an: 

```
$ docker compose ps
NAME                 COMMAND                  SERVICE             STATUS              PORTS
compose-test-web-1   "/docker-entrypoint.…"   web                 running             0.0.0.0:8000->80/tcp, :::8000->80/tcp

```

Somit ist der Container aktiv.

> `docker ps` listet alle laufenden Container in der Docker-Engine auf. `docker compose ps` listet Container auf, die sich auf Images beziehen, die in der `docker-compose.yml`-Datei deklariert sind. Das Ergebnis von `docker compose ps` ist eine Teilmenge des Ergebnisses von `docker ps`.

Im Internet-Browser wird dir unter der URL `localhost:8000` nun der Inhalt von `~/compose-test/app/index.html` angezeigt. In meinem Beispiel ist dies der Text `test`.

Wenn ich den Inhalt der Datei `~/compose-test/app/index.html` ändere, wird dies automatisch vom Container übernommen und im Browser aktualisiert.

## Docker Compose Befehle

Wir haben eine `docker-compose.yml`-Datei erstellt und mit `docker compose` aufgerufen. Docker Compose biete mehr.

Der Befehl `docker compose logs` zeigt die mitprotokollierten Meldungen:

```
docker compose logs

```

Die Ausgabe des Befehls ähnelt:

```
Attaching to compose-test_web_1
web_1  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
web_1  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
web_1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
web_1  | 10-listen-on-ipv6-by-default.sh: Getting the checksum of /etc/nginx/conf.d/default.conf
web_1  | 10-listen-on-ipv6-by-default.sh: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
web_1  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
web_1  | /docker-entrypoint.sh: Configuration complete; ready for start up
web_1  | 172.19.0.1 - - [30/Aug/2020:20:58:13 +0000] "GET / HTTP/1.1" 200 353 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36" "-"

```

In den Pausemodus schalte ich mit:

```
docker compose pause
```

Die Pause beende ich mit:

```
docker compose unpause
```

Der Befehl `stop` beendet die Ausführung des Containers:

```
docker compose stop
```

Verknüpften Container, Netzwerke und Volums werden mit `down` entfernt:

```
docker compose down
```

Das Image entferne ich mit:

```
docker image rm nginx:alpine
```

Eine vollständige Referenz aller verfügbaren `docker compose` Befehle ist die [offizielle Dokumentation](https://docs.docker.com/compose/reference/).

<img src="https://vg02.met.vgwort.de/na/2abdef14874e4e2b885c763ad3e0f9a0" width="1" height="1" alt="">
