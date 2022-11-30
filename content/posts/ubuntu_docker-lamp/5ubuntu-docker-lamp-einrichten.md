---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-04
title: 'docker-lamp einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-einrichten
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_. _docker-lamp_ ist eine Software die 

- vorgefertigte Docker-Images, 
- Docker-Container und 
- Skripte 

bietet, die dich bei der Entwicklung in einer [LAMP Umgebung](<https://de.wikipedia.org/w/index.php?title=LAMP_(Softwarepaket)&oldid=199333875>) unterstützen. In diesem Teil richte ich die Umgebung ein.

> Eine LAMP-Umgebung besteht aus den vier Komponenten Linux (Betriebssystem), Apache (Webserver), MySQL (Datenbanksystem) und PHP (serverseitiger Skript-Interpreter).

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](/ubuntu-vorwort-docker-lamp/)[^blog.astrid-guenther.de/ubuntu-vorwort-docker-lamp/] bisher gefolgt bist, passt alles.

### Optional und auf eigene Gefahr: Entfernen von Docker-Images, -Containern

Bei der Arbeit mit Docker passiert es leicht, dass viele nicht verwendete Images, Container und Datenvolumen gesammelt werden, welche die Ausgabe verkomplizieren und unnötigen Festplattenspeicher verbrauchen.

Aus diesem Grund räume ich meine bisher zu Übungszwecken erstellten Docker-Elemente auf. Ich nenne das [Tabula rasa](https://de.wikipedia.org/wiki/Tabula_rasa)!

#### Container

##### Auflisten

Ich überprüfe die Container in meinem System mit `docker ps`. Durch Hinzufügen des Parameters `-a` werden alle angezeigt.

```
docker ps -a
```

##### Stoppen und Entfernen

Wenn ich sicher bin, ergänze ich das Flag `-q`, um die IDs an die Befehle `docker stop` und `docker rm` zu übergeben:

```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

> digitalocean.com behandelt in einem [Artikel](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de)[^digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de] alle gängigen Befehle, die zum Entfernen von Images, Containern und Volumen bei Docker verwendet werden.

#### Images

##### Auflisten

Ich liste die Images in meinem System mit `docker images` auf. Durch Hinzufügen des Parameters `-a` werden alle angezeigt, auch die inaktiven.

```
docker images -a
```

##### Entfernen

Wenn ich sicher bin, ergänze ich den Parameter `-q`, um die IDs an den Befehle Docker `rmi` zu übergeben:

```
docker rmi $(docker images -a -q)
```

## Einrichten von [docker-lamp](https://github.com/degobbis/docker-lamp/)

### Eine frische Umgebung

Ich verfüge über eine frische Dockerinstallation. Auf meinem Rechner ist kein Image und somit kein Container. Die folgenden Befehle zeigen beide eine leere Tabelle:

```
docker images -a
docker ps -a
```

### docker-lamp Repository von Github klonen

Nun klone ich das `docker-lamp` Github Repository in ein Verzeichnis nach Wahl.

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

> Mit `-b 2.0.0-dev` wird der passende Branch und mit `--depth 1` wird nur die History von diesem Branch gezogen.

Als nächstes wechsele ich in den Ordner `docker-lamp`.

```
cd docker-lamp
```

> Diese Beschreibung ist an die [Version 2 von docker-lamp](https://github.com/degobbis/docker-lamp/tree/2.0.0-dev)[^github.com/degobbis/docker-lamp] angepasst. Deshalb ist zur Zeit noch ein Wechsel zum Entwicklungszweig notwendig. Die notwendigen Befehle hierzu sind `git fetch origin` und dann `git checkout 2.0.0-dev`.

### Umgebungsvariablen

#### .env-example in .env umbennen und editieren

Im `docker-lamp`-Ordner kopiere ich die versteckte Datei `.env-example` nach `.env`.

> Im Verzeichnis `docker-lamp` befindet sich die unsichtbare Datei `.env-example`, welche nach `.env` kopiert wird. Wofür ist die Datei `.env` wichtig? Diese beinhaltet wesentliche Einstellungen. Konfigurationsdaten müssen besonders geschützt werden, wenn sie sich in einem vom Webserver erreichbaren Verzeichnis befinden. Deshalb ist der Zugriff auf `.env` zu unterbinden. Deshalb ist diese versteckt.

```
cp .env-example .env
```

Mittels `nano .env` öffne ich die Datei zum editieren.

```
nano .env
```

#### .env Datei abändern

##### Eigene IP-Adresse - zwingend

Ich belege in der Datei `.env` den Parameter `REMOTE_HOST_IP=` mit der IP des eigenen Rechners. In meinem Fall ist das `192.168.209.152`. Der gesamte Eintrag lautet: `REMOTE_HOST_IP=192.168.209.152`.

```
...
...
# To use PHP xDebug set your host IP here (192.168.0.100)
#
REMOTE_HOST_IP=192.168.209.152
```

> Die eigenen IP kann man unter anderem mit dem Befehl `ip address` in Erfahrung bringen.

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

Für dieses Tutorial nutze ich das vorgegebene Verzeichnis `APP_BASEDIR=./data`. 


> Es ist möglich dieses Verzeichnis individuell zu belegen. Nutzt du `/srv/www` als Stammverzeichnis für den Webserver? Ändere in diesem Fall die Variable `APP_BASEDIR` ab. Kopiere gleichzeitig alle Daten im Verzeichnis `DEINE-docker-lamp-INSTALLATION/data` nach `/srv`.

##### Benutzer ID unter Ubuntu

Auf Linux-Systemen ist es zwingend die Benutzer-IDs richtig zu setzen. Auf den meisten Rechnern ist nur ein Nutzer eingerichtet und diesem ist meistens die ID 1000 zugeordnet. Deshalb ist dies in `docker-lamp` voreingestellt. In der `.env` gibt es den folgenden Eintrag.

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

Warum sind `APP_USER_ID` und `APP_GROUP_ID` mit 1000 voreingestellt? In Ubuntu ist `1000` die erste ID die im Falle von Benutzern und Gruppen bei der Installation angelegt wird. Wenn man das System selbst installiert hat, ist die eigene ID 1000. Überprüfen kann man dies mit dem Befehl `id -u`.

```
$ id -u
1000
```

Falls die ID des `docker-lamp` ausführenden Benutzers von 1000 abweicht, ist dieser Eintrag in der Datei `.env` zu korrigieren.

> Möchest du gleichzeitig prüfen, in welcher Gruppe sich dein Benutzer befindet? Dann verwende den Befehl `id` ohne den Parameter `-u`.

### Die docker-lamp Befehle

> Tipp: Belege den Wert für `DEBUG` in der Datei `DEINE-docker-lamp-INSTALLATION/docker-lamp` mit `1`, um dir genauere Informationen im Falle von Problemen anzeigen zu lassen.

```
#!/usr/bin/env bash

# Define debug mode.
DEBUG=1
...
```

### Hauptbefehle

#### Start via `./docker-lamp start`

```
$ ./docker-lamp start
```

Beim Starten von `docker-lamp` geschieht folgendes: 
- Es werden verschiedene Docker-Container erstellt.
- Es werden verschiedene PHP-Umgebungen erstellen.
- SSL/TLS wird zu lokalen Domains hinzufügen.
- Es wird eine phpmyadmin-Schnittstelle zu den Datenbanken zur Verfügung gestellt.
- Es wird ein lokaler Mailserver mit Webmail-Funktionalität bereit gestellt.
- Und last but not least werden die zuvor gesicherten Datenbanken aus SQL-Dateien, welche sich im Ordner `initDB` befinden, ausgelesen und ausgeführt. 

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

Der Befehl arbeitet beim ersten Aufruf einige Minuten lang, da alle Images heruntergeladen werden müssen. Danach können diese mit `docker images -a` aufgelistet werden.

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

Wenn alles fehlerfrei verläuft, kann man nun den Inhalt seiner `www-Root`, also von `APP_BASEDIR + /www`, im Browser unverschlüsselt über die folgenden URLs aufrufen:

- http://localhost:8000 - phpmyadmin
- http://localhost:8025 - mailhog webmail
- http://localhost/ - verwendet die als Standard konfigurierte PHP-Version
- http://localhost:8074 - Website verwendet PHP7.4
- http://localhost:8074/phpinfo/ - PHP-Konfiguration der PHP7.4-Umgebung 
- http://localhost:8080 - Webseite, die PHP8.0 verwendet
- http://localhost:8081 - Webseite, die PHP8.1 verwendet
- http://localhost:8082 - Webseite, die PHP8.2 verwendet

Die Ports für SSL Aufrufe der Seite beginnen mit 84:

- https://localhost:8400 - phpmyadmin
- https://localhost/ - verwendet die als Standard konfigurierte PHP-Version
- https://localhost:8474 - Website verwendet PHP7.4
- https://localhost:8474/phpinfo/ - PHP-Konfiguration der PHP7.4-Umgebung 
- https://localhost:8481 - Webseite, die PHP8.0 verwendet
- https://localhost:8481 - Webseite, die PHP8.1 verwendet
- https://localhost:8482 - Webseite, die PHP8.2 verwendet


##### Docker Container

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

Alles was über den Befehl `` aufgebaut wird, wird mittels `` wieder herunterfahren beziehungsweise gesichert. Die Datenbanken werden automatische im Verzeichnis `` als SQL-Dump gespeichert, um beim nächsten Start von hier wiederhergestellt zu werden.

```
$ ./docker-lamp shutdown
```

#### Weitere Befehle

Weitere Befehle und Hilfsskripte kannst du dir via `./docker-lamp --help` ansehen.

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

### Eigene Projekte in den Container mappen

#### Das Verzeichnis ist flexibel

Wenn man die Projekte erst neu anlegt ist der einfachste Weg, das Verzeichnis `APP_BASEDIR + /www` im `docker-lamp`-Verzeichnis zu verwenden. Dies gilt ebenfalls, wenn der Speicherort änderbar ist und man die Projekte leicht verschieben kann. `APP_BASEDIR + /www` wird im Container unter `home/astrid/docker-lamp/data` eingebunden - falls du meinem Beispiel bisher gefolgt bist und es nicht in der `.env` anders belegt ist. Im letzteren Fall ist das in der Variablen `APP_BASEDIR` gesetzte Verzeichnis dasjenige, welches in den Container eingebunden wird.

#### Eigene Verzeichnisse im Container

Um weitere Verzeichnisse mit den eigenen Webprojekten im Container zur Verfügung zu haben, ist es erforderlich, die Datei Standardkonfiguration zu überschreiben. 

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


3. Kopiere nun diese Datei nach `APP_BASEDIR + /httpd/apache24/config.yml` und ergänze die Zeile `- /home/youruser/git:/home/youruser/git:rw`. Da ich den Standard nutze, kopiere ich die Datei nach `./data/httpd/apache24/config.yml`.

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

### Zertifikat

Falls die Konfiguration der Zertifikate geändert wird, ist es erforderlich, den Server neu zu starten. Am besten vor Änderungen den Befehl `./docker-lamp shutdown` aufrufen.

```
$ ./docker-lamp shutdown

```

#### Minica

Ich benötige ein Zertifikat in meinen con­tai­ne­ri­sie­rten Webservern, um verschlüsselte Websites zu nachzustellen und so zu testen. `docker-lamp` nutzt für diesen Zweck [Minica](https://github.com/jsha/minica).

> Minica erstellt beim ersten Aufruf ein Root-Zertifikat, auf welchem alle daraufhin erzeugten Zertifikate basieren.

##### Angabe in der Datei `DEINE-docker-lamp-INSTALLATION/docker-lamp`

Standardmäßig werden die in der Datei `DEINE-docker-lamp-INSTALLATION/docker-lamp` in der Variablen `MINICA_DEFAULT_DOMAINS` festgelegten Domains zertifiziert.

```
...
MINICA_DEFAULT_DOMAINS="localdomains,localhost,joomla.local,joomla.test,*.joomla.local,*.joomla.test,wp.local,wp.test,*.wp.local,*.wp.test,wpms.local,wpms.test,*.wpms.local,*.wpms.test"
...
```

##### Angaben in der Datei `.env`

Um zusätzliche Domains zu zertifizieren, gibt es die Variablen `SSL_DOMAINS` und `SSL_LOCALDOMAINS` in der Datei `.env`. Hierzu gibt es später mehr Informationen.

```
...
SSL_DOMAINS=
SSL_LOCALDOMAINS=
...
```

##### Zusätzliche Domain hinzufügen

Eine eigene Domain fügt man im `docker-lamp`-Verzeichnis mittels nachfolgender Befehle hinzu. Ich belasse hier die Standardeinstellungen. Die Erklärungen finde ich an dieser Stelle trotzdem wichtig, weil man die Standardeinstellungen schon nutzt und sich so besser in docker-lamp orientiert.

> Ein konkretes [Beispiel](/ubuntu-docker-lamp-verwenden-eigene-domain) habe ich später beschrieben.

```
nano .env
```

Hier dann je nach Wunsch folgenden Einträge erweitern:

```
...
TLD_SUFFIX=local=127.0.0.1,test=127.0.0.1
...
...
SSL_LOCALDOMAINS=
```

> Als `TLD_SUFFIX` trägt man lediglich das Wort ein, welches ganz am Ende der [URL](https://de.wikipedia.org/w/index.php?title=Uniform_Resource_Locator&oldid=207716904) steht. Das ist die [Top-Level-Domain TLD](https://de.wikipedia.org/w/index.php?title=Top-Level-Domain&oldid=208512458). Diese hatten wir in der Variablen `MINICA_DEFAULT_DOMAINS` festgelegt. Eine `TLD` ist `joomla`. Als `TLD_SUFFIX` reicht `local` reicht aus. `joomla.local` ist nicht notwendig. Alle [Domains und Subdomains](<https://de.wikipedia.org/w/index.php?title=Domain_(Internet)&oldid=207898687>) mit der Top-Level-Domain `.local` werden durch den vorherigen Eintrag abgefangen.

> Benötigst du eine weitere Top-Level-Domain inklusive Subdomains, beispielsweise `mytdl` mit `jedemengesubdomains.mytld`? Nun kommt `TLD_SUFFIX` ins Spiel. Das heißt: `TLD_SUFFIX=mytdl` und `SSL_LOCALDOMAINS=subdomain1.mytdl,*.subdomain2.mytdl` spielen zusammen. Aber dazu später mehr in einem konkreten Beispiel.

```
             (root)                 0. Ebene, Null-Label
               |
               |
              mytdl                 1. Ebene, Top-Level-Domains (TLD)
         /           \
        /             \
  subdomain1       subdomain2       2. Ebene, Second-Level-Domains
    /  |   \         /   |  \
s11    s12  s13   s21    s22  s23   3. Ebene, Third-Level-Domains
```

Dann die Verzeichnisse für die Ebenen erstellen. Für die zweite Ebene wäre das `/data/www/subdomain1` und `/data/www/subdomain2` erstellen. `/data/www/joomla` sollte bereits vorhanden sein. Die dritte Ebenen führt man analog fort: `/data/www/subdomain1/s11`, `/data/www/subdomain1/s12`, `/data/www/subdomain1/s13`, `/data/www/subdomain2/s21`, `/data/www/subdomain2/s22`, `/data/www/subdomain2/s23`.

Bereits vorkonfiguriert für die Entwicklung mit Joomla ist die nachfolgende Struktur.

> Für Wordpress Entwickler gibt es neben `joomla` weiter Domains auf der 3. Ebenen.

```
             (root)                 0. Ebene, Null-Label
             /   \
            /     \
         test     local             1. Ebene, Top-Level-Domains (TLD)
         /           \
        /             \
    joomla           joomla         2. Ebene, Second-Level-Domains

                                    3. Ebene, Third-Level-Domains
```

Falls du etwas an der Konfiguration geändet hast, lösche den Ordner `APP_BASEDIR/ca/localdomains`. Um weiter an `docker-lampp` zu arbeiten starten wir den Server wieder mittels `./docker-lamp start`.

```
./docker-lamp start
```

#### Importieren des Zertifikates

Ruft man die URL `https://joomla.test/` oder `https://joomla.local/` im Browser auf, erscheint ein Sicherheitshinweis. Der Browser kennt das Zertifikat bisher nicht. Deshalb importiere ich es im nächsten Schritt.

![Sicherheitshinweis](/images/dockerlamp_zert.png)

> `https://joomla.test/` und `https://joomla.local/` adressieren die gleichen Dateien. Warum wurden zwei verschiedene Domains zur Verfügung gestellt, die das gleiche Ziel verlinken? Ganz einfach. So kannst du Debuggen und gleichzeitg Browsen.

#### Zertifikat importieren

In Mozilla Firefox importiert man das Zertifikat wie folgt:

1. Öffne die Einstellungen (Preferences). und klicke in der linken Seitenleiste auf Datenschutz & Sicherheit (Privacy and Security).
2. Im rechten Bereich findest du nun weiter unten den Abschnitt Sicherheit (Security). Klicke hier auf die Schaltfläche Zertifikate anzeigen (View Certificates).
3. Wechsele in den Tabulator Zertifizierungsstellen (Authorities).
4. Importiere die Datei `APP_BASEDIR/ca/minica-root-ca.pem`. Achte darauf, dass du `Webseite vertrauen` aktivierst.

![Zertifikat importieren](/images/dockerlamp_zertbrowser.png)

> Das Zertifikat wird von `docker-lamp` standardmäßig für die `https://joomla.test/` oder `https://joomla.local/` erstellt. Unter `https://test/` oder `https://local/` gibt es weiterhin den Fehler. Ein konkretes [Beispiel](/en/ubuntu-docker-lamp-verwenden-eigene-domain) beschreibt die Vorgehensweise zum Zertifizieren von neuen Domains.

## Mögliche Fehler

Je nach Konfiguration kommt es unter Ubuntu 22.04 beim Aufruf von `./docker-lamp start` zu einem Fehler

### permission denied (but minica-root-ca.pem exists)

Falls die Ausgabe von `./docker-lamp start` mit dem nachfolgenden Text startet, stimmen Berechtigungen nicht.

```
./.env included
2021/02/04 19:57:06 open minica-root-ca-key.pem: permission denied (but minica-root-ca.pem exists)
...
```

#### Abhilfe schafft die folgende Vorgehensweise

Als erstes ins `APP_BASEDIR` wechseln in meinem Fall ist die `/srv`. Prüfe als nächstes in diesem Verzeichnis alle Rechte. Alle Inhalte sollten dem aktuellen Benutzer und dessen Gruppe gehören.

```
/srv$ ll
insgesamt 40
drwxrwxr-x  9 root   youruser 4096 Mai 17 14:50 ./
drwxr-xr-x 20 root   root   4096 Apr 26 08:54 ../
drwxrwxr-x  2 youruser youruser 4096 Mai 17 01:12 apache24/
drwxrwxr-x  3 youruser youruser 4096 Mai 17 13:28 ca/
drwxrwxr-x  3 youruser youruser 4096 Mai 17 01:12 httpd/
drwxrwxr-x  2 youruser youruser 4096 Mai 17 03:44 initDB/
drwxrwxr-x  7 youruser youruser 4096 Mai 17 01:12 php/
drwxrwxr-x  2 youruser youruser 4096 Mai 15 05:36 phpinfo/
-rw-rw-r--  1 youruser youruser  144 Mai 15 05:36 README.md
drwxrwxr-x  5 youruser youruser 4096 Mai 17 03:44 www/

```

Mit dem folgenden Befehl alle Inhalte dem aktuellen Benutzer, in dem Falle beide Mal `deinBenutzer`, zuweisen.

> Unter Umständen ist das Verzeichnis  `/srv` ebenfalls anzupassen. Je nachdem welches Linux System benutzt wird, gehört der Benutzer der Gruppe der _Sudoers_ zu. Unter ArchLinux ist das `wheel`, auf anderen kann es auch `sudoers` sein. Prüfe dem Befehl `id`, wie die Gruppe in deinem Fall heißt und ob dein Benutzer dieser Gruppe angehört. Passe dann den Ordner an: `$ sudo chown root:<SUDOERGRUPPE> /srv` und `$ sudo chmod 775 /srv`. Wichtig ist, dass dein Benutzer im Verzeichnis `/srv` schreiben darf.

```
sudo chown -R deinBenutzer:deinBenutzer .
```

Am Ende wieder zurück ins `docker-lamp`-Verzeichnis wechseln und den Befehl `./docker-lamp start` wiederholen.

### ERROR: for docker-lamp_bind Cannot start service bind

```
...
Error response from daemon: driver failed programming external connectivity on endpoint docker-lamp_bind (e7f7311581354435351e2c8482a21eb511b45afd819515729b250793676a441b): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use

```

#### Abhilfe schafft die folgende Vorgehensweise

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

> Was ist der Unterschied zwischen `systemctl stop` und `systemctl disable` beziehungsweise `systemctl start` und `systemctl enable`? `systemctl start` und `systemctl enable` machen verschiedene Dinge. Mit `enable` wird der angegebene Dienst an relevanten Stellen eingehängt, sodass er beim Booten automatisch gestartet wird. `start` startet das Gerät sofort. Deaktivieren und Stoppen sind das Gegenteil davon. [Manpage](http://manpages.ubuntu.com/manpages/hirsute/en/man1/systemctl.1.html)

3. Einstellungen anpassen

Viele Wege führen nach Rom. Ich beschreibe dir hier meine Vorgehensweise. Alternativ kannst du die Anpassungen in den Einstellungen deiner Netzwerkverbindung vornehmen. Achte dabei darauf, dass die Datei `/etc/resolv.conf` nach den Änderungen nicht mehr beschreibbar ist. 

`sudo rm /etc/resolv.conf`

Warum ist die Datei zu löschen?

Die Datei `/etc/resolv.conf` ist ein Symlink.

```
$ ll /etc/
insgesamt 1128
...
lrwxrwxrwx   1 root root      39 Feb  4 00:00 resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
...
```

Die verlinkte Datei hat folgenden Inhalt:

```
$ cat /etc/resolv.conf
...
nameserver 127.0.0.53
options edns0
search localdomain
```

Mit dem Löschen der Datei wird gleichzeitig der Symlink gelöscht. Würden wir die Datei nicht löschen, würde der Inhalt bei jedem Neustart wiederhergestellt. Der Eintrag `nameserver 127.0.0.53` ist aber die Ursache für den Fehler, den wir lösen möchten.

4. `sudo nano /etc/resolv.conf`

Als letztes erstellen wir die Datei mit `sudo nano /etc/resolv.conf` neu. Dann tragen wir zwei passende `nameserver` ein, wobei `nameserver 192.168.209.2` ein Beispiel für die Konfiguration einer Fritzbox ist, und passen alles an die eigenen Gegebenheiten an.

```
nameserver 192.168.209.152
nameserver 192.168.209.2
```

Es ist wichtig, dass der Eintrag `nameserver 127.0.0.1` an erster Stelle steht. Nach einem Neustart wird der `docker`-Container verwendet. Wenn der nicht verfügbar ist, wird auf `nameserver 192.168.209.2` verwiesen. So ist sichergestellt, dass eine Internetverbindung auch bei gestopptem Container verfügbar ist.

5. `dns=default` im NetworkManager

Als letztes stellen wir den NetworkManager auf `dns=default` ein.

Dazu wird erst der Dienst gestoppt:

```
sudo systemctl stop NetworkManager.service
```

Danach öffnen wir die Datei zum editieren:

```
sudo gedit /etc/NetworkManager/NetworkManager.conf
```

Dann fügen wir im Bereich `[main]` die Zeile `dns=default` ein:

```
[main]
dns=default
plugins=ifupdown,keyfile

[ifupdown]
managed=false

[device]
wifi.scan-rand-mac-address=no
```

Am Ende starten wir den Dienst wieder:

```
sudo systemctl start NetworkManager.service

```

> Unter Umständen ist ein Neustart des Netzwerks hilfreich: `sudo nmcli networking off` und `sudo nmcli networking on` 

Voila! Das war es.

<img src="https://vg02.met.vgwort.de/na/dbab92cdc0b54da0bfde0222255f2d20" width="1" height="1" alt="">
