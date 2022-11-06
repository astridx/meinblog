---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-11-04
title: 'Set up docker-lamp'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-lamp-einrichten
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

This is about _docker-lamp_. A software that provides pre-built images, containers and scripts to help you develop in a [LAMP environment](<https://en.wikipedia.org/w/index.php?title=LAMP_(software_bundle)&oldid=1015344121>). In this part, I set up the environment.

> A LAMP environment consists of the four components Linux (operating system), Apache (web server), MySQL (database system) and PHP (server-side script interpreter).

## Prerequisites

In addition to [Docker](/ubuntu-docker-set-up-docker-lamp), [Docker Compose](/ubuntu-docker-compose-set-up-docker-lamp) is necessary. If you have followed this [Set](/en/ubuntu-vorwort-docker-lamp/) so far, everything is fine.

### Optional and at your own risk: removing Docker images, containers.

When working with Docker, it happens easily that many unused images, containers and data volumes are collected, complicating the output and consuming unnecessary disk space.

For this reason, I am cleaning up my Docker items created so far for practice purposes. I call this [Tabula rasa](https://en.wikipedia.org/w/index.php?title=Tabula_rasa&oldid=1015652247)!

#### Container

##### List

I list the containers in my system with `docker ps`. By adding the parameter `-a` all of them are displayed, even the inactive ones..

```
docker ps -a
```

##### Stop and remove

When I am sure, I add the flag `-q` to pass the IDs to the commands `docker stop` and `docker rm`:

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

> digitalocean.com covers all the common commands used to remove images, containers and volumes in Docker in an [article](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de).

#### Images

##### List

I list the images in my system with `docker images`. By adding the parameter `-a`, all of them are displayed.

```
docker images -a
```

##### Remove

When I am sure, I add the `-q` parameter to pass the IDs to the Docker `rmi` command:

```
docker rmi $(docker images -a -q)
```

## Setting up [docker-lamp](https://github.com/degobbis/docker-lamp/)

### A fresh environment

I have a fresh docker installation. There is no image on my machine and therefore no container. The following commands both show an empty table:

```
docker images -a
docker ps -a
```

### clone docker-lamp repository from Github

Now I clone the `docker-lamp` Github repository to a directory of choice.

```
$ git clone https://github.com/degobbis/docker-lamp.git --depth 1 -b 2.0.0-dev
Klone nach 'docker-lamp' …
remote: Enumerating objects: 98, done.
remote: Counting objects: 100% (98/98), done.
remote: Compressing objects: 100% (62/62), done.
remote: Total 98 (delta 18), reused 86 (delta 16), pack-reused 0
Empfange Objekte: 100% (98/98), 47.95 KiB | 211.00 KiB/s, fertig.
Löse Unterschiede auf: 100% (18/18), fertig.

```

> With `-b 2.0.0-dev` the appropriate branch is pulled and with `--depth 1` only the history of this branch is pulled.

Next I change to the folder `docker-lamp`.

```
cd docker-lamp
```

> This description is adapted to the [version 2 of docker-lamp](https://github.com/degobbis/docker-lamp/tree/2.0.0-dev)[^github.com/degobbis/docker-lamp]. Therefore, a change to the development branch is still necessary at the moment. The necessary commands for this are `git fetch origin` and then `git checkout 2.0.0-dev`.

### Environment variables

#### Rename and edit .env-example to .env

In the `docker-lamp` folder I copy the hidden file `.env-example` to `.env`.

> In the `docker-lamp` folder there is the invisible file `.env-example` which is copied to `.env`. What is the file `.env` important for? It contains essential settings. Configuration data must be especially protected if it is located in a directory accessible by the web server. Therefore, access to `.env` must be prevented and it is hidden.

```
cp .env-example .env
```

Using `nano .env` I open the file for editing.

```
nano .env
```

#### Edit .env File

##### Own IP address

In the file `.env` I assign the parameter `REMOTE_HOST_IP=` with the IP of my own computer. In my case this is `192.168.209.152`. The entire entry is: `REMOTE_HOST_IP=192.168.209.152`. The end of the file now looks like the following block.

```
...
...
# To use PHP xDebug set your host IP here (192.168.0.100)
#
REMOTE_HOST_IP=192.168.209.152
```

> You can find out your own IP with the command `ip address`, among other things.

```
...
$ ip address
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:0c:29:8a:bf:d9 brd ff:ff:ff:ff:ff:ff
    altname enp2s1
    inet 192.168.209.152/24 brd 192.168.209.255 scope global dynamic noprefixroute ens33
       valid_lft 1248sec preferred_lft 1248sec
    inet6 fe80::c526:e1ca:5b3e:7b1/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
...
...
...
```

##### APP_BASEDIR

For this tutorial I use the default directory `APP_BASEDIR=./data`. 


> It is possible to assign this directory individually. Are you using `/srv/www` as the root directory for the web server? In this case, change the variable `APP_BASEDIR`. At the same time, copy all data in the directory `YOUR-docker-lamp-INSTALLATION/data` to `/srv`.

##### User ID under Ubuntu

In the `.env` there is the following entry.

```
...
...
# Set your user and group ID from your Linux host,
# it will be automatically assigned to the user and group 'virtual'
# inside the containers used for Apache and php-fpm processes.
#
# You can safely ignore this on Windows and MacOS, but don't disable it!
APP_USER_ID=1000
APP_GROUP_ID=1000
...
...
```

Why do `APP_USER_ID` and `APP_GROUP_ID` default to 1000? In Ubuntu, `1000` is the first ID created in the case of users and groups during installation. If you have installed the system yourself, your own ID is 1000. You can check this with the command `id -u`.

```
$ id -u
1000
```

If the ID of the user running `docker-lamp` is different from `1000`, this entry has to be corrected.

### The make commandos

`docker-lamp` uses the [utility `make`](<https://en.wikipedia.org/w/index.php?title=Make_(software)&oldid=1016450338>). This is not available on my computer. With the help of `sudo apt install make` I install `make`.

```
sudo apt install make
```

In the `docker-lamp` directory, after successfully installing `make`, I execute the command `make`, which displays all possible commands.

```
make

Usage:
  make <target>
  server-up                    Start all docker containers, creating new certificates before.
  server-down                  Stops all docker containers and delete all volumes, saving all databases before.
  db-backup                    Saving all databases.
  update-images                Update all images from docker-compose.yml to the latest build.
  delete-obsolete-images       Delete all obsolete images.
```

Still in the `docker-lamp` folder, I call the command `./docker-lamp start`.

```
$ ./docker-lamp start


Start creating SSL certificates:
Create certificate for: localdomains,localhost,joomla.local,joomla.test,*.joomla.local,*.joomla.test,wp.local,wp.test,*.wp.local,*.wp.test,wpms.local,wpms.test,*.wpms.local,*.wpms.test
2022/11/04 10:06:13 open localdomains/key.pem: file exists

All certificates created.
Start server:
[+] Running 11/11
 ⠿ Network docker-lamp_net           Created                               0.2s
 ⠿ Volume "docker-lamp_pma"          Created                               0.0s
 ⠿ Volume "docker-lamp_phpsocket"    C...                                  0.0s
 ⠿ Container docker-lamp_bind        Start...                              3.9s
 ⠿ Container docker-lamp_db          Started                               3.7s
 ⠿ Container docker-lamp_mailhog     St...                                 4.3s
 ⠿ Container docker-lamp_php74       Star...                               7.7s
 ⠿ Container docker-lamp_php82       Star...                               7.9s
 ⠿ Container docker-lamp_phpmyadmin  Started                               7.2s
 ⠿ Container docker-lamp_php81       Star...                               7.8s
 ⠿ Container docker-lamp_apache24    S...                                  8.9s
Server started.

```

The command works for a few minutes the first time it is called, as all images are needed to be downloaded. Afterwards, they can be listed with `docker images -a`.

```
$ docker images -a
REPOSITORY                   TAG          IMAGE ID       CREATED         SIZE
degobbis/php82-fpm-alpine    latest       d076bd79a74c   4 weeks ago     180MB
degobbis/php81-fpm-alpine    latest       dc4bfc810727   4 weeks ago     175MB
degobbis/php74-fpm-alpine    latest       a5cc3d801dfb   4 weeks ago     145MB
degobbis/mariadb105-alpine   latest       2f95b891209f   4 months ago    238MB
degobbis/apache24-alpine     latest       08ec3256be3a   4 months ago    59.4MB
phpmyadmin/phpmyadmin        fpm-alpine   7ac3cb8d0544   5 months ago    132MB
degobbis/minica              latest       2fcbfc904eff   22 months ago   13.2MB
mailhog/mailhog              latest       4de68494cd0d   2 years ago     392MB
cytopia/bind                 0.15         ff37cf218d55   4 years ago     142MB

```

##### Domains

If everything runs without errors, you can now access the contents of your `www root`, i.e. of `APP_BASEDIR + /www`, in the browser without encryption via the following URLs:

- http://localhost:8000 - phpmyadmin
- http://localhost:8025 - mailhog webmail
- http://localhost/ - uses the PHP version configured as default
- http://localhost:8074 - website uses PHP7.4
- http://localhost:8074/phpinfo/ - PHP configuration of PHP7.4 environment 
- http://localhost:8080 - website using PHP8.0
- http://localhost:8081 - website using PHP8.1
- http://localhost:8082 - website using PHP8.1

The ports for SSL calls to the site start with 84:

- https://localhost:8400 - phpmyadmin
- https://localhost/ - uses the PHP version configured as default
- https://localhost:8474 - website using PHP7.4
- https://localhost:8474/phpinfo/ - PHP configuration of PHP7.4 environment 
- https://localhost:8481 - website using PHP8.0
- https://localhost:8481 - website using PHP8.1
- https://localhost:8482 - website using PHP8.1












##### Docker Container

`docker ps -a` lists the following containers.

```
$ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                  CREATED          STATUS          PORTS                                                                                                                                                                                                                                                                                                                                                                                              NAMES
2d8b1ac7e1a7   degobbis/apache24-alpine:latest     "/httpd-php-entrypoi…"   10 minutes ago   Up 10 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp, 0.0.0.0:8074->8074/tcp, :::8074->8074/tcp, 0.0.0.0:8081-8082->8081-8082/tcp, :::8081-8082->8081-8082/tcp, 0.0.0.0:8400->8400/tcp, :::8400->8400/tcp, 0.0.0.0:8474->8474/tcp, :::8474->8474/tcp, 80/tcp, 0.0.0.0:8481-8482->8481-8482/tcp, :::8481-8482->8481-8482/tcp, 0.0.0.0:80->8074/tcp, :::80->8074/tcp, 0.0.0.0:443->8474/tcp, :::443->8474/tcp   docker-lamp_apache24
60149f5c1072   degobbis/php74-fpm-alpine:latest    "/httpd-php-entrypoi…"   10 minutes ago   Up 10 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php74
d9ca56d1cb56   degobbis/php82-fpm-alpine:latest    "/httpd-php-entrypoi…"   10 minutes ago   Up 10 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php82
523e81a4d070   degobbis/php81-fpm-alpine:latest    "/httpd-php-entrypoi…"   10 minutes ago   Up 10 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php81
65086396f886   phpmyadmin/phpmyadmin:fpm-alpine    "/docker-entrypoint.…"   10 minutes ago   Up 10 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_phpmyadmin
ea9bee20bafc   cytopia/bind:0.15                   "/docker-entrypoint.…"   10 minutes ago   Up 10 minutes   0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp, :::53->53/tcp, :::53->53/udp                                                                                                                                                                                                                                                                                                                               docker-lamp_bind
6ae2c61cf5d7   degobbis/mariadb105-alpine:latest   "/docker-entrypoint …"   10 minutes ago   Up 10 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp                                                                                                                                                                                                                                                                                                                                                          docker-lamp_db
ad50f5352239   mailhog/mailhog:latest              "MailHog"                10 minutes ago   Up 10 minutes   0.0.0.0:1025->1025/tcp, :::1025->1025/tcp, 0.0.0.0:8025->8025/tcp, :::8025->8025/tcp                                                                                                                                                                                                                                                                                                               docker-lamp_mailhog

```

#### Anhalten via `./docker-lamp shutdown`

With the command `./docker-lamp shutdown` I stop all containers. Before that, the data in the database is saved in the directory `/data/initDB`. The next time `./docker-lamp start` is called, the database dumps are read in the new created database container.

#### Further commands

You can view more commands and help scripts via `./docker-lamp --help`.

```
$ ./docker-lamp --help
-- Help for the command: docker-lamp  --

Usage:
-> docker-lamp <command> [<parameters>]

For more details about the allowed parameters use:
-> docker-lamp <command> --help

Commands:
start [<parameters>]
-> If 'start' is used without parameters, the server is started with the globally defined settings from the '.env' file.
-> If parameters are set, these will override the global settings. The phpmyadmin and mailhog containers always start.

restart
-> Restarts the server with the same configuration as started before.

shutdown [<parameters>]
-> Shuts down the server completely deleting also all volumes created.
-> If not other set, all databases will be saved before.

stop
-> Stops the server.
-> However, unlike 'shutdown', the database volume is preserved and the databases are not saved before.
-> Likewise, the files in the 'initDB' folder are ignored by the next start.

update-images
-> Downloads the newest images globally defined in the '.env' file, or set in the parameters.
-> If parameters are set, these will override the global settings. The new images will be tagged all latest.

delete-obsolete-images
-> Deletes obsolete images remaining after updated images.

cli <CONTAINER-NAME> [<parameters>][ '<COMMAND-TO-PASS>']
-> Uses 'docker exec -it <CONTAINER-NAME>' to launch into the cli in the container, or to execute the passed command.
-> Use single quotes ' to pass the command to the container to be executed in it.

save-db <DB-NAME>
-> Uses 'docker-compose down' to stop the server.
```




### Mapping your own projects into the container

#### Own folders in the Container

If you are just creating the projects, the easiest way is to use the `APP_BASEDIR + /www` directory in the `docker-lamp` directory. This also applies if the location is changeable and you can easily move the projects. `APP_BASEDIR + /www` is included in the container under `home/astrid/docker-lamp/data` - if you have followed my example so far and it is not assigned differently in the `.env`. In the latter case, the directory set in the variable `APP_BASEDIR` is the one that will be included in the container.

#### Beispiel 

Angenommen, du möchtest das Verzeichnis `/home/youruser/git` im `apache24-Container` verwenden.

1. Ich stoppe den Server via 

```
$ ./docker-lamp shutdown
```

2. Sieh dir die Konfiguration für den `apache24-Container` an. Du findest diese in der Datei `config.yml` im Verzeichnis `DEINE-docker-lamp-INSTALLATION/.config/httpd/apache24`.

```
apache24:
  image: degobbis/apache24-alpine:latest
  container_name: ${COMPOSE_PROJECT_NAME}_apache24
  hostname: apache24
  links: ${HTTPD_LINKS}
  volumes:
    - ${DOCKER_LAMP_BASEDIR}/.config/httpd/apache24/conf.d:/usr/local/apache2/conf.d:rw
    - ${DOCKER_LAMP_BASEDIR}/.config/httpd/apache24/vhosts:/usr/local/apache2/vhosts:rw
    - ${APP_BASEDIR:-${DOCKER_LAMP_BASEDIR}/data}:/srv:rw
    - pma:/var/www/pma
    - phpsocket:/run/
  ports: ${HTTPD_PORTS}
  environment:
    TZ: ${MY_TZ:-UTC}
    LC_ALL: ${MY_LOCALES:-en_GB.UTF-8}
    APP_USER_ID: ${APP_USER_ID:-1000}
    APP_GROUP_ID: ${APP_GROUP_ID:-1000}
  dns:
    - 172.16.238.100
  networks:
    net:
      ipv4_address: 172.16.238.10

```


3. Kopiere nun diese Datei nach `APP_BASEDIR + /httpd/apache24/config.yml` und ergänze die Zeile `- /home/youruser/git:/home/youruser/git:rw`. Da ich den Standard nutze, kopiere ich die Datei nach `.data/httpd/apache24/config.yml`.

> Wir nutzen die Datei `APP_BASEDIR + /httpd/apache24/config.yml` und ändern nicht direkt die original Datei `DEINE-docker-lamp-INSTALLATION/.config/httpd/apache24/config.yml`, damit beim nächsten `docker-lamp`-Update die Änderung der Konfiguration nicht überschrieben wird.

```
apache24:
  image: degobbis/apache24-alpine:latest
  container_name: ${COMPOSE_PROJECT_NAME}_apache24
  hostname: apache24
  links: ${HTTPD_LINKS}
  volumes:
    - ${DOCKER_LAMP_BASEDIR}/.config/httpd/apache24/conf.d:/usr/local/apache2/conf.d:rw
    - ${DOCKER_LAMP_BASEDIR}/.config/httpd/apache24/vhosts:/usr/local/apache2/vhosts:rw
    - ${APP_BASEDIR:-${DOCKER_LAMP_BASEDIR}/data}:/srv:rw
    - pma:/var/www/pma
    - phpsocket:/run/
    - /home/youruser/git:/git:rw
  ports: ${HTTPD_PORTS}
  environment:
    TZ: ${MY_TZ:-UTC}
    LC_ALL: ${MY_LOCALES:-en_GB.UTF-8}
    APP_USER_ID: ${APP_USER_ID:-1000}
    APP_GROUP_ID: ${APP_GROUP_ID:-1000}
  dns:
    - 172.16.238.100
  networks:
    net:
      ipv4_address: 172.16.238.10

```

> Weitere Informationen zur Verwendung von Volumes mit `compose` gibt es in der [docker-Dokumentation](https://docs.docker.com/storage/volumes/#use-a-volume-with-docker-compose) oder in der [compose-Referenz](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference).

4. Jetzt starte ich den Server mit `./docker-lamp start` neu, damit die letzten Änderungen übernommen werden.

```
./docker-lamp start
```

5. Ich teste die Änderung

Das in meinem Beispiel neu verlinkte Verzeichnis wird im `apache24-Container` unter `/git` verlinkt. Ich wechsele via `./docker-lamp cli apache24` in den Container und überzeuge mich davon:

```
$ ./docker-lamp cli apache24
apache24:./data$ cd /home/youruser/git/
apache24:/home/youruser/git$ ll
total 4
drwxrwxr-x    4 virtual  virtual       4096 Nov 3 11:16 joomla-development
apache24:/home/youruser/git$ 
```

`./docker-lamp cli apache24` ist eine Hilfe für diejenigen, die die Docker-Befehle nicht kennen. Wer mit Docker-Befehlen vertraut ist oder diese lernen möchte: `./docker-lamp cli apache24` bewirkt das gleiche wie `docker exec -it ${params}${env}${COMPOSE_PROJECT_NAME}_${CLI_CONTAINER} /usr/bin/env ${shell}`. In meinem Fall ist dies konkret `docker exec -it --user 1000 docker-lamp_apache24 /usr/bin/env sh`. 

```
$ ./docker-lamp cli apache24
apache24:./data$ cd /home/youruser/git/
apache24:/home/youruser/git$ ll
total 4
drwxrwxr-x    4 virtual  virtual       4096 Nov 3 11:16 joomla-development
```

> Über den Befehl `docker exec -ti docker-lamp_apache24 sh` öffnet man eine Befehlszeile im Container `docker-lamp_php74`. Über `exit` kommt man wieder aus dem Container heraus. Der Docker wird ohne weitere Parameter unter dem Benutzer `root` ausgeführt. Dies erkennst du am Zeichen `#` anstelle von `$` nach dem Login im nachfolgenden Listing. Der `docker-lamp` Befehl verwendet jederzeit den konfigurierten User. Worfür ist dies wichtig? Wenn du Dateien erstellst gibt es hinterher in der Regelexit keine Konflikte mit den Dateiberechtigungen.

```
$ docker exec -ti docker-lamp_apache24 sh
apache24:./data# cd /home/youruser/git/
apache24:/home/youruser/git# ll
total 4
drwxrwxr-x    4 virtual  virtual       4096 Nov 3 11:16 joomla-development
```

6. So wie ich das Verzeichnis in den Container apache24 eingebunden habe, wiederhole ich dies für die PHP Container!

```
$ cp .config/php/php56/config.yml  data/php/php56/config.yml
$ cp .config/php/php73/config.yml  data/php/php73/config.yml
$ cp .config/php/php74/config.yml  data/php/php74/config.yml
$ cp .config/php/php81/config.yml  data/php/php81/config.yml
$ cp .config/php/php81/config.yml  data/php/php81/config.yml
$ cp .config/php/php82/config.yml  data/php/php82/config.yml

```







### Certificate

If the configuration of the certificates is changed, it is necessary to restart the server. It is best to call the command `./docker-lamp shutdown` before making changes.

```
$ ./docker-lamp shutdown
```

#### Minica

I need a certificate on my containerised web servers to use encrypted websites. For this purpose, `docker-lamp` uses [Minica](https://github.com/jsha/minica).

> Minica creates a root certificate the first time it is called, on which all further created certificates are based.

##### Specifications in the `Makefile

By default, the domains specified in the variable `MINICA_DEFAULT_DOMAINS` in the Makefile are certified.

```
...
MINICA_DEFAULT_DOMAINS:=localdomains,localhost,joomla.local,joomla.test,*.joomla.local,*.joomla.test,wp.local,wp.test,*.wp.local,*.wp.test,wpms.local,wpms.test,*.wpms.local,*.wpms.test
...
```

##### Specifications in the `.env` file

To certify additional domains, there are variables `SSL_DOMAINS` and `SSL_LOCALDOMAINS` in the `.env` file.

```
...
SSL_DOMAINS=
SSL_LOCALDOMAINS=
...
```

##### Adding an additional domain

You can add your own domains in the `docker-lamp` directory using the following commands. I leave the default settings here. However, I think the explanations are important at this point, because you already use the default settings and thus find your way around docker-lamp better.

> I will describe a concrete [example](/en/ubuntu-docker-lamp-verwenden-eigene-domain) later.

```
nano .env
```

Then expand the following entries here as desired:

```
...
TLD_SUFFIX=local=127.0.0.1,test=127.0.0.1
...
...
SSL_LOCALDOMAINS=
```

> As `TLD_SUFFIX` you only enter the word that is at the very end of the [URL](https://de.wikipedia.org/w/index.php?title=Uniform_Resource_Locator&oldid=207716904). This is the [top-level domain TLD](https://de.wikipedia.org/w/index.php?title=Top-Level-Domain&oldid=208512458). We had defined this in the variable `MINICA_DEFAULT_DOMAINS`. One `TLD` is `joomla`. As `TLD_SUFFIX` `local` is sufficient. `joomla.local` is not necessary. All [domains and subdomains](<https://de.wikipedia.org/w/index.php?title=Domain_(Internet)&oldid=207898687>) with the top-level domain `.local` are caught by the previous entry.

> Do you need another top-level domain including subdomains, for example `mytdl` with `jedemengesubdomains.mytld`? Now `TLD_SUFFIX` comes into play. That is: `TLD_SUFFIX=mytdl` and `SSL_LOCALDOMAINS=subdomain1.mytdl,*.subdomain2.mytdl` play together. But more on this later in the concrete [example](/ubuntu-docker-lamp-use-own-domain).

```
             (root)                 0. level, Null-Label
               |
               |
              mytdl                 1. level, Top-Level-Domains (TLD)
         /           \
        /             \
  subdomain1       subdomain2       2. level, Second-Level-Domains
    /  |   \         /   |  \
s11    s12  s13   s21    s22  s23   3. level, Third-Level-Domains
```

Then create the directories for the levels. For the second level this would be `/data/www/subdomain1` and `/data/www/subdomain2`. `/data/www/joomla` should already exist. The third level is continued in the same way: `/data/www/subdomain1/s11`, `/data/www/subdomain1/s12`, `/data/www/subdomain1/s13`, `/data/www/subdomain2/s21`, `/data/www/subdomain2/s22`, `/data/www/subdomain2/s23`.

The following structure is already pre-configured for development with Joomla.

> For Wordpress developers, there are further domains on the 3rd level in addition to `joomla`.

```
             (root)                 0. level, Null-Label
             /   \
            /     \
         test     local             1. level, Top-Level-Domains (TLD)
         /           \
        /             \
    joomla           joomla         2. level, Second-Level-Domains

                                    3. level, Third-Level-Domains
```

If you have changed anything in the configuration, delete the folder `APP_BASEDIR/ca/localdomains`. To continue working on `docker-lampp` we start the server again with `./docker-lamp start`.

```
./docker-lamp start
```

#### Before importing the certificate

If you call up the URL `https://joomla.test/` or `https://joomla.local/` in the browser, a security notice appears. The browser does not know the certificate yet. Therefore, I import it in the next step.

![security notice](/images/dockerlamp_zert.png)

> `https://joomla.test/` and `https://joomla.local/` address the same files. Why were two domains provided that link to the same destination? Quite simple. So you can debug and browse at the same time.

#### Import certificate

In Mozilla Firefox, import the certificate as follows.

1. Open the Preferences and click in the left sidebar on Privacy and Security.
2. In the right-hand area you will now find the Security section further down. Click the View Certificates button here.
3. Switch to the tab Authorities.
4. Import the file `APP_BASEDIR/ca/minica-root-ca-key.pem`. Make sure that you activate `Trust website`.

![import certificate](/images/dockerlamp_zertbrowser.png)

> The certificate is created by `docker-lamp` by default for `https://joomla.test/` or `https://joomla.local/`. Under `https://test/` or `https://local/` there is still the error. A concrete [example](/en/ubuntu-docker-lamp-use-own-domain) describes the procedure for certifying new domains.

## Possible errors

Depending on the configuration, an error may occur under Ubuntu 22.04 when calling `./docker-lamp start`.

### permission denied (but minica-root-ca.pem exists)

If the output of `./docker-lamp start` starts with the following text, permissions are not correct.

```
./.env included
2021/02/04 19:57:06 open minica-root-ca-key.pem: permission denied (but minica-root-ca.pem exists)
...
```

#### The following action will help.

First, navigate to the data subdirectory.

```
/docker-lamp$ cd data
/docker-lamp/data$
...
```

Check all rights in this directory. All contents should belong to the current user and his or her group.

```
/docker-lamp/data$ ll
insgesamt 28
drwxrwxr-x 7 youruser youruser 4096 Feb  4 17:33 ./
drwxrwxr-x 5 youruser youruser 4096 Feb  4 20:41 ../
drwxrwxr-x 2 youruser youruser 4096 Feb  4 17:33 apache24/
drwxr-xr-x 3 root   root   4096 Feb  4 17:33 ca/
-rw-rw-r-- 1 youruser youruser    0 Feb  4 17:16 .gitkeep
drwxrwxr-x 2 youruser youruser 4096 Feb  4 17:16 initDB/
drwxrwxr-x 2 youruser youruser 4096 Feb  4 17:16 phpinfo/
drwxrwxr-x 5 youruser youruser 4096 Feb  4 17:16 www/
```

Use the following command to assign all contents to the current user, in this case both times the user `youruser`.

```
sudo chown -R youruser:youruser .
```

At the end, navigate back to the `docker-lamp` directory and redo the `./docker-lamp start` command.

```
/docker-lamp/data$ cd ..
/docker-lamp$ ./docker-lamp start
```

### ERROR: for docker-lamp_bind Cannot start service bind

```
...
Error response from daemon: driver failed programming external connectivity on endpoint docker-lamp_bind (e7f7311581354435351e2c8482a21eb511b45afd819515729b250793676a441b): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use

```

#### The following procedure provides a solution

1. `sudo systemctl disable systemd-resolved.service`

```
$ sudo systemctl disable systemd-resolved.service
Removed /etc/systemd/system/dbus-org.freedesktop.resolve1.service.
Removed /etc/systemd/system/multi-user.target.wants/systemd-resolved.service.
```

2. `sudo systemctl stop systemd-resolved.service`

```
$ sudo systemctl stop systemd-resolved.service
```

> What is the difference between `systemctl stop` and `systemctl disable` or `systemctl start` and `systemctl enable`? `systemctl start` and `systemctl enable` do different things. `enable` hooks the specified service into relevant places so that it is automatically started at boot time. `start` starts the device immediately. Disable and stop are the opposite of this. [Manpage](http://manpages.ubuntu.com/manpages/hirsute/en/man1/systemctl.1.html)

3. `sudo rm /etc/resolv.conf`

Why is the file to be deleted?

The file `/etc/resolv.conf` is a symlink.

```
$ ll /etc/
insgesamt 1128
...
lrwxrwxrwx   1 root root      39 Feb  4 00:00 resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
...
```

The linked file has the following content:

```
$ cat /etc/resolv.conf
...
nameserver 127.0.0.53
options edns0
search localdomain
```

Deleting the file deletes the symlink at the same time. If we did not delete the file, the content would be restored at every restart. However, the entry `nameserver 127.0.0.53` is the cause of the error we want to solve.

4. `sudo nano /etc/resolv.conf`

Finally, we recreate the file with `sudo nano /etc/resolv.conf`. Then we enter two suitable `nameservers`, where `nameserver 192.168.209.2` is an example for the configuration of a Fritzbox, and change everything to suit our own circumstances.

```
nameserver 127.0.0.1
nameserver 192.168.209.2
```

It is important that the entry `nameserver 127.0.0.1` is in first place. After a restart, the `docker` container is used. If this is not available, reference is made to `nameserver 192.168.209.2`. This ensures that an internet connection is available even if the container is stopped.

5. `dns=default` im NetworkManager

The last thing we do is set the NetworkManager to `dns=default`.

To do this, first stop the service:

```
sudo systemctl stop NetworkManager.service
```

Then we open the file for editing:

```
sudo gedit /etc/NetworkManager/NetworkManager.conf
```

Then we add the line `dns=default` in the area `[main]`:

```
[main]
dns=default
plugins=ifupdown,keyfile

[ifupdown]
managed=false

[device]
wifi.scan-rand-mac-address=no
```

At the end we start the service again:

```
sudo systemctl start NetworkManager.service

```

Voila! That is it.

<img src="https://vg02.met.vgwort.de/na/74aa730a21cd40e08180bb49ba5e34fb" width="1" height="1" alt="">
