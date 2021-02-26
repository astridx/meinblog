---
date: 2020-08-05
title: 'Docker Compose unter Ubuntu 20.04 einrichten'
template: post
thumbnail: '../../thumbnails/dp_logo.png'
slug: ubuntu-docker-compose-einrichten
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
  - Docker Compose
---

Docker erleichtert die Konfiguration von Software mithilfe von Containern. Docker Compose vereinfacht die Arbeite mit mehreren Containern. Ich installiere [Docker Compose](https://docs.docker.com/compose/) unter Ubuntu 20.04.

## Voraussetzungen

Nach der Installation des Desktop Images von [Ubuntu 20.04 LTS (Focal Fossa)](https://releases.ubuntu.com/20.04/) verfüge ich über ein _non-root-Superuser-Konto_ und kann direkt mit der Installation von _Docker Compose_ beginnen.

## Installieren von Docker Compose

Mit dem folgenden Befehl lädst du die Version `1.28.2` herunter und speicherst die ausführbare Datei unter `/usr/local/bin/docker-compose`. So ist diese global als `docker-compose` erreichbar. Die neueste **Docker Compose** Version findest du auf der [Seite](https://github.com/docker/compose/releases):

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

> Die aktuellste `docker-compose`-Version findest du auf [Github](https://github.com/docker/compose/releases)

Setze die notwendigen Berechtigungen:

```
sudo chmod +x /usr/local/bin/docker-compose
```

Überprüfe die Version und somit auch die Installation:

```
docker-compose --version

docker-compose version 1.28.2, build 67630359
```

Docker Compose ist nun installiert. Richten wir nun eine `docker-compose.yml`-Datei ein.

## Die `docker-compose.yml`-Datei

Um einen Überblick zu bekommen lege ich ein einfaches Beispiel an. Ich erstelle mithilfe des [Nginx-Images](https://hub.docker.com/_/nginx) eine Webserverumgebung die eine statische HTML-Datei enthält. Dafür lege ich ein separates Verzeichnis an.

```
mkdir ~/compose-test
cd ~/compose-test

```

Ich lege ein Verzeichnis an, in dem ich die HTML-Datei ablegen. Die Datei `~/compose-test/app/index.html` enthält einen einfachen Text:

```
mkdir app
nano app/index.html
```

> Ich verwende den Editor Nano. Hier klicke ich zum Speichern `STRG+X`, dann `Y` und zur Bestätigung `ENTER`.

Ich erstelle als nächstes die Datei `docker-compose.yml`:

```
nano docker-compose.yml

```

Inhalt der Datei `docker-compose.yml` ist:

docker-compose.yml

```
version: '1.0'
services:
  web:
    image: nginx:alpine
    ports:
      - "8000:80"
    volumes:
      - ./app:/usr/share/nginx/html

```

Die Datei `docker-compose.yml` beginnt mit der `version`.

Dann folgt der `services`-Block, in dem wir die Dienste einrichten. Es gibt einen Dienst der das Image `nginx:alpine` verwendet und mit der Anweisung `ports` eine Portumleitung einrichtet. `volumes` erstellt ein [gemeinsames Volume](https://docs.docker.com/compose/compose-file/#volumes) - der lokale Ordner `app` wird mit dem Container unter `/usr/share/nginx/html` geteilt.

Im nächsten Schritt stellen wir diese Umgebung mithilfe von Docker Compose bereit.

## Ausführen von Docker Compose

Die Datei `docker-compose.yml` enthälte alle Informationen. Der folgende Befehl (im Verzeichnis composer-test aufgerufen) lädt alle notwendigen Images herunter, erstellt einen Container für den `web`-Dienst und führt die Umgebung im Hintergrundmodus aus:

```
docker-compose up -d
```

Die Ausgabe sieht beispeilsweise so aus:

```
Creating network "app_default" with the default driver
Pulling web (nginx:alpine)...
alpine: Pulling from library/nginx
ksuhret5bc2a: Pull complete
...
Creating compose-test_web_1 ... done
```

Ich überprüfen, ob der Container aktiv ist:

```
docker-compose ps

```

Dieser Befehl zeigt Informationen über die ausgeführten Container an:

```
  Name                     Command               State          Ports
----------------------------------------------------------------------------------
compose-test_web_1          /docker-entrypoint.sh ngin ...   Up      0.0.0.0:8000->80/tcp

```

> `docker ps` listet alle laufenden Container in der Docker-Engine auf. `docker-compose ps` listet Container auf, die sich auf Images beziehen, die in der `docker-compose.yml`-Datei deklariert sind. Das Ergebnis von `docker-compose ps` ist eine Teilmenge des Ergebnisses von `docker ps`.

Im Browser unter der URL `localhost:8000`, oder auf `Remote_IP:8000`, wird nun der Inhalt von `~/compose-test/app/index.html` angezeigt.

Wenn ich `~/compose-test/app/index.html` ändere, wird dies automatisch vom Container übernommen und im Browser angezeigt.

## Docker Compose Befehle

Wir haben eine `docker-compose.yml`-Datei erstellt und mit `docker-compose` aufgerufen. Docker Compose biete mehr.

Der Befehl `docker-compose logs` zeigt die mitprotokollierten Meldungen:

```
docker-compose logs

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
docker-compose pause
```

Die Pause beende ich mit:

```
docker-compose unpause
```

Der Befehl `stop` beendet die Ausführung des Containers:

```
docker-compose stop
```

Verknüpften Container, Netzwerke und Volums werden mit `down` entfernt:

```
docker-compose down
```

Das Image entferne ich mit:

```
docker image rm nginx:alpine
```

Eine vollständige Referenz aller verfügbaren `docker-compose` Befehle ist die [offizielle Dokumentation](https://docs.docker.com/compose/reference/).
