---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-10
title: 'docker-lamp with own Domain'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-lamp-verwenden-eigene-domain
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

_Docker_ simplifies the administration of software in containers. _Docker Compose_ is a tool that simplifies working with multiple containers.

This is about _docker-lamp_ and specifically how special domains are created. _docker-lamp_ is a software that provides prebuilt images, containers and scripts to help you develop on a web server. In this part we will create a separate domain.

## Requirements

Besides [Docker](/en/ubuntu-docker-set-up-docker-lamp), [Docker Compose](/en/ubuntu-docker-compose-set-up-docker-lamp) is necessary. If you have followed this [set](en/my-ubuntu-computer-with-docker-lamp-themes/) so far, everything is fine.

## Top-Level Domain (TDL)

## Subdomain

So far we have the domains `joomla.local` and `joomla.test`. Now we add `tutorial.local` and `tutorial.test`.

> docker-lampp offers `wp.local` and `wp.test` as well as `wpms.local` and `wpms.test` by default.

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
Stopping docker-lamp_php74      ... done
Stopping docker-lamp_php80      ... done
Stopping docker-lamp_php73      ... done
Stopping docker-lamp_php56      ... done
Stopping docker-lamp_phpmyadmin ... done
Stopping docker-lamp_mailhog    ... done
Stopping docker-lamp_mysql      ... done
Stopping docker-lamp_bind       ... done
Removing docker-lamp_httpd      ... done
Removing docker-lamp_php74      ... done
Removing docker-lamp_php80      ... done
Removing docker-lamp_php73      ... done
Removing docker-lamp_php56      ... done
Removing docker-lamp_phpmyadmin ... done
Removing docker-lamp_mailhog    ... done
Removing docker-lamp_mysql      ... done
Removing docker-lamp_bind       ... done
Removing network docker-lamp_net
local
docker-lamp_db-data-dir
local
docker-lamp_phpsocket
local
docker-lamp_pma
```

### Eigene Domain erzeugen

#### .env

Über `nano .env` öffne ich die Datei, in der die Umgebungsvariablen konfiguriert werden. Hier ergänze ich `tutorial.local,*.tutorial.local,tutorial.test,*.tutorial.test` bei `SSL_LOCALDOMAINS`.

```
...
TLD_SUFFIX=local=127.0.0.1,test=127.0.0.1,tutorial.local=127.0.0.1,tutorial.test=127.0.0.1
...
...
SSL_LOCALDOMAINS=tutorial.local,*.tutorial.local,tutorial.test,*.tutorial.test
...
```

#### Webserver

Mit `mkdir /srv/www/tutorial` erstelle ich auf dem Webserver das Verzeichnis, dass die Daten zur neuen Domain beinhalten wird.

> Mein Webserver Stammverzeichnis ist `/srv/www/`

```
mkdir /srv/www/tutorial
```

![Webserver Stammverzeichnis](/images/neuedomainwebserver.png)

##### Zertifikat

Damit das Zertifikat neu angelegt wird lösche ich den Ordner `/data/ca/localdomains`.

```
$ sudo rm -R ./data/ca/localdomains/
```

#### Test

Im `docker-lamp`-Ordner rufe ich den Befehl `./docker-lamp start` auf.

```
/docker-lamp$ ./docker-lamp start
./.env included
Building with native build. Learn about native build in Compose here: https://docs.docker.com/go/compose-native-build/
Creating network "docker-lamp_net" with driver "bridge"
Creating volume "docker-lamp_pma" with default driver
Creating volume "docker-lamp_db-data-dir" with default driver
Creating volume "docker-lamp_phpsocket" with default driver
Creating docker-lamp_bind ... done
Creating docker-lamp_mysql   ... done
Creating docker-lamp_mailhog    ... done
Creating docker-lamp_phpmyadmin ... done
Creating docker-lamp_php73      ... done
Creating docker-lamp_php80      ... done
Creating docker-lamp_php56      ... done
Creating docker-lamp_php74      ... done
Creating docker-lamp_httpd      ... done
```

![Ansicht der neuen Domain im Browser](/images/neuedomain.png)

`https://tutorial.local/` zeigt mir den Inhalt des Verzeichnisses `an.` und ``sind zwei Joomla Installationen, die über`https://tutorial.local/t1/installation/index.php` und `https://tutorial.local/t2/installation/index.php` erreiche.

<img src="https://vg02.met.vgwort.de/na/27d031d09f86427da396a4c825935c73" width="1" height="1" alt="">
