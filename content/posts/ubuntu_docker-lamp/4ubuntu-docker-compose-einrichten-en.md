---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-03
title: 'Configure Docker Compose with Ubuntu 22.04'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-compose-einrichten-docker-lamp
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
  - Docker Compose
---









Docker simplifies the configuration of software using containers. Docker Compose simplifies working with multiple containers. I am installing [Docker Compose](https://docs.docker.com/compose/) on Ubuntu 22.04.

## Requirements

After installing the desktop image of [Ubuntu 22.04 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/22.04/), I have a _non-root superuser accounto_ and can directly start installing _Docker Compose_.

## Installing Docker Compose<!-- \index{Docker Compose! Installation} -->

With the following command you download the version `v2.12.2` and save the executable file under `/usr/local/bin/docker-compose`. This way it is globally accessible as `docker-compose`. The latest **Docker Compose** version can be found on [page](https://github.com/docker/compose/releases):

```
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.12.2/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
```

> The latest `docker-compose` version can be found on [Github](https://github.com/docker/compose/releases).

Set the necessary permissions:

```
chmod +x ~/.docker/cli-plugins/docker-compose
```

Check the version and thus also the installation:

```
$ docker compose version
Docker Compose version v2.12.2
```

Docker Compose is now installed. Next, we create a `docker-compose.yml` file.

## The `docker-compose.yml` file

To give me an overview as a beginner, I start with a simple example. Using the [Nginx image](https://hub.docker.com/_/nginx), I create a web server environment that contains a static HTML file. I create a separate directory for this.

```
mkdir ~/compose-test
cd ~/compose-test

```

I create another directory in which I place the HTML file `~/compose-test/app/index.html`. The file `~/compose-test/app/index.html` contains the simple text `test`:

```
mkdir app
nano app/index.html
```

> I use the editor Nano. Here I click `STRG+X` to save, then `Y` and `ENTER` to confirm.

Next I create the file `docker-compose.yml`:

```
nano docker-compose.yml

```

The content of the file `docker-compose.yml` is:

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

The file `docker-compose.yml` starts with the [version number](https://docs.docker.com/compose/compose-file/compose-versioning/)[^docs.docker.com/compose/compose-file/compose-versioning/] `version`.

Then comes the `services` block where we set up the services. There is a service that uses the image `nginx:alpine` and sets up port redirection with the `ports` statement. `volumes` creates a [shared volume](https://docs.docker.com/compose/compose-file/#volumes) - the local folder `app` is shared with the container under `/usr/share/nginx/html`.

In the next step, we deploy this environment using Docker Compose.

## Running Docker Compose

The file `docker-compose.yml` contains all the information. The following command 
- downloads all necessary images, 
- creates a container for the `web` service and 
- runs the environment in background mode.

The command has to be called in the `composer-test` directory.

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

Ich überprüfen, ob der Container aktiv ist:

```
$ docker compose ps
NAME                 COMMAND                  SERVICE             STATUS              PORTS
compose-test-web-1   "/docker-entrypoint.…"   web                 running             0.0.0.0:8000->80/tcp, :::8000->80/tcp

```

Thus, the container is active.

> `docker ps` lists all running containers in the Docker Engine. `docker compose ps` lists containers that refer to images declared in the `docker-compose.yml` file. The result of `docker compose ps` is a subset of the result of `docker ps`.

In the Internet browser at the URL `localhost:8000` the contents of `~/compose-test/app/index.html` are now displayed. In my example this is the text `test`.

If I change the content of `~/compose-test/app/index.html`, this is automatically taken over by the container and updated in the browser.

## Docker Compose commands

We created a `docker-compose.yml` file and called it with `docker compose`. Docker Compose offers more.

The `docker compose logs` command shows the logged messages:

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

<img src="https://vg02.met.vgwort.de/na/a7f6285533aa40d387d451eea40085e9" width="1" height="1" alt="">
