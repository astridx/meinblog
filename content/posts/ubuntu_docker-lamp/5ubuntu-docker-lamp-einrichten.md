---
date: 2021-02-06
title: 'docker-lamp einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-einrichten
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. In diesem Teil richte ich die Umgebung ein.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Um die Skripte automatisch auszuführen, solltest du unter Linux arbeiten. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

### Optional: Entfernen von Docker-Images, -Containern

Bei der Arbeit mit Docker passiert es leicht, dass viele nicht verwendete Images, Container und Datenvolumen gesammelt werden, die Ausgabe verkomplizieren und unnötigen Festplattenspeicher verbrauchen.

Aus diesem Grund räume ich meine bisher zu Übungszwechen erstellten Dockerelemente auf. Ich nenne das [Tabula rasa](https://de.wikipedia.org/wiki/Tabula_rasa)!

#### Images

##### Auflisten

Ich überprüfe die Images in meinem System mit `docker images`. Durch Hinzufügen des Flag `-a` werden alle angezeigt.

```bash
docker images -a
```

##### Entfernen

Wenn ich sicher bin, ergänze ich das Flag `-q`, um die IDs an den Befehle Docker `rmi` zu übergeben:

```bash
docker rmi $(docker images -a -q)
```

#### Container

##### Auflisten

Ich überprüfe die Container in meinem System mit `docker ps`. Durch Hinzufügen des Flag `-a` werden alle angezeigt.

```bash
docker ps -a
```

##### Stoppen und Entfernen

Wenn ich sicher bin, ergänze ich das Flag `-q`, um die IDs an die Befehle `docker stop` und `docker rm` zu übergeben:

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

> digitalocean.com behandelt in einem [Artikel](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de) alle gängigen Befehle, die zum Entfernen von Images, Containern und Volumen bei Docker verwendet werden.

## Installieren von docker-lamp

Ich verfüge über eine frische Dockerinstallation. Auf meinem Rechner ist kein Image und somit kein Container. Die folgenden Befehle zeigen beide eine leere Tabelle:

```bash
docker images -a
docker ps -a
```

`docker-lamp` verwendet das Hilfsprogramm `make`, welches mithilfe des nachfolgenden Befehls installiert wird.

```
sudo apt install make
```

Nun klone ich das `docker-lamp` Github Repository in ein Verzeichnis nach Wahl.

```bash
git clone https://github.com/degobbis/docker-lamp.git
```

Als nächstes wechsele ich in den Ordner `docker-lamp`.

```bash
cd docker-lamp
```

In `docker-lamp` kopiere ich als erstes die versteckte Datei `.env-example` nach `.env`.

```bash
cp .env-example .env
```

Dann setze in der Datei den Parameter `REMOTE_HOST_IP=` mit der IP des eigenen Rechners, zum Beispiel `REMOTE_HOST_IP=192.168.178.138`.

```bash
nano .env
```

Das Ende der Datei sieht dann beispielsweise so aus, wie im folgenden Block.

```
...
...
# To use PHP xDebug set your host IP here (192.168.0.100)
#
REMOTE_HOST_IP=192.168.209.138
```

> Im Verzeichnis `docker-lamp` befindet sich die unsichtbare Datei `.env-example`, welche nach `.env` kopiert wird. Wofür ist die Datei `.env` wichtig? Diese beinhaltet wesentliche Einstellungen. Konfigurationsdaten müssen besonders geschützt werden, wenn sie sich in einem vom Webserver erreichbaren Verzeichnis befinden. Deshalb ist der Zugriff auf `.env` zu unterbinden und diese sind versteckt.

Im `docker-lamp`-Verzeichnis führe ich desweiteren den Befehl `make` aus, der alle möglichen Kommandos anzeigt.

```bash
make

Usage:
  make <target>
  server-up                    Start all docker containers, creating new certificates before.
  server-down                  Stops all docker containers and delete all volumes, saving all databases before.
  db-backup                    Saving all databases.
  update-images                Update all images from docker-compose.yml to the latest build.
  delete-obsolete-images       Delete all obsolete images.
```

Noch immer im `docker-lamp`-Ordner rufe ich den Befehl `make server-up` auf.

```bash
$ make server-up
./.env included
2021/02/04 20:13:24 open localdomains/key.pem: file exists
Building with native build. Learn about native build in Compose here: https://docs.docker.com/go/compose-native-build/
Recreating docker-lamp_bind ... done
Recreating docker-lamp_mailhog ... done
Recreating docker-lamp_mysql   ... done
Recreating docker-lamp_php74      ... done
Recreating docker-lamp_php56      ... done
Recreating docker-lamp_php80      ... done
Recreating docker-lamp_php73      ... done
Recreating docker-lamp_phpmyadmin ... done
Recreating docker-lamp_httpd      ... done
```

Der Befehl arbeitet einige Minuten. Im Anschluss werden mir eine Reihe von Images angezeigt, wenn ich `docker images -a` eingebe.

```bash
$ docker images -a
REPOSITORY                   TAG          IMAGE ID       CREATED        SIZE
phpmyadmin/phpmyadmin        fpm-alpine   9e4f315e888d   2 days ago     142MB
degobbis/php74-fpm-alpine    latest       d026bc35510a   9 days ago     181MB
degobbis/php73-fpm-alpine    latest       6cc4ac518120   9 days ago     168MB
degobbis/php80-fpm-alpine    latest       f6fe30e9f914   9 days ago     183MB
degobbis/minica              latest       2fcbfc904eff   5 weeks ago    13.2MB
degobbis/mariadb105-alpine   latest       be1c0b068e2e   2 months ago   238MB
degobbis/apache24-alpine     latest       f3469ca1846a   2 months ago   58.8MB
degobbis/php56-fpm-alpine    latest       9609694f3fe4   2 months ago   131MB
mailhog/mailhog              latest       4de68494cd0d   5 months ago   392MB
cytopia/bind                 0.15         ff37cf218d55   2 years ago    142MB
```

`docker ps -a` listet folgende Container auf.

```bash
$ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS         PORTS                                                                                                                                                                                                                                                                     NAMES
0228f9effde2   degobbis/apache24-alpine:latest     "/httpd-php-entrypoi…"   2 minutes ago   Up 2 minutes   0.0.0.0:8000->8000/tcp, 0.0.0.0:8056->8056/tcp, 0.0.0.0:8073-8074->8073-8074/tcp, 0.0.0.0:8080->8080/tcp, 0.0.0.0:8400->8400/tcp, 0.0.0.0:8456->8456/tcp, 0.0.0.0:8473-8474->8473-8474/tcp, 80/tcp, 0.0.0.0:8480->8480/tcp, 0.0.0.0:80->8074/tcp, 0.0.0.0:443->8474/tcp   docker-lamp_httpd
9fd0d7d257df   degobbis/php74-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 minutes ago   Up 2 minutes   9000/tcp                                                                                                                                                                                                                                                                  docker-lamp_php74
b5435404bc73   phpmyadmin/phpmyadmin:fpm-alpine    "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   9000/tcp                                                                                                                                                                                                                                                                  docker-lamp_phpmyadmin
041bbf1a4ee4   degobbis/php73-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 minutes ago   Up 2 minutes   9000/tcp                                                                                                                                                                                                                                                                  docker-lamp_php73
ce746bda0ffc   degobbis/php80-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 minutes ago   Up 2 minutes   9000/tcp                                                                                                                                                                                                                                                                  docker-lamp_php80
226cd211294c   degobbis/php56-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 minutes ago   Up 2 minutes   9000/tcp                                                                                                                                                                                                                                                                  docker-lamp_php56
c473eb668908   degobbis/mariadb105-alpine:latest   "/docker-entrypoint …"   2 minutes ago   Up 2 minutes   0.0.0.0:3306->3306/tcp                                                                                                                                                                                                                                                    docker-lamp_mysql
9beb444df753   mailhog/mailhog:latest              "MailHog"                3 minutes ago   Up 3 minutes   0.0.0.0:1025->1025/tcp, 0.0.0.0:8025->8025/tcp                                                                                                                                                                                                                            docker-lamp_mailhog
96527284e9a0   cytopia/bind:0.15                   "/docker-entrypoint.…"   3 minutes ago   Up 3 minutes   0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp                                                                                                                                                                                                                                    docker-lamp_bind
```

Wenn du nicht sofort mit dem nächsten Teil weiter machst, stoppe den Server über `make server-down`.

## Mögliche Fehler

Je nach Konfiguration kommt es unter Ubuntu 20.04 beim Aufruf von `make server-up` zu einem Fehler

### permission denied (but minica-root-ca.pem exists)

Falls die Ausgabe von `make server-up` mit dem nachfolgenden Text startet, stimmen Berechtigungen nicht.

```bash
./.env included
2021/02/04 19:57:06 open minica-root-ca-key.pem: permission denied (but minica-root-ca.pem exists)
...
```

#### Abhilfe schafft schafft die folgende Vorgehensweise

Als erstes ins Unterverzeichnis data wechseln.

```bash
/docker-lamp$ cd data
/docker-lamp/data$
...
```

In diesem Verzeichnis alle Rechte prüfen. Alle Inhalte sollten dem aktuellen Benutzer und dessen Gruppe gehören

```bash
/docker-lamp/data$ ll
insgesamt 28
drwxrwxr-x 7 astrid astrid 4096 Feb  4 17:33 ./
drwxrwxr-x 5 astrid astrid 4096 Feb  4 20:41 ../
drwxrwxr-x 2 astrid astrid 4096 Feb  4 17:33 apache24/
drwxr-xr-x 3 root   root   4096 Feb  4 17:33 ca/
-rw-rw-r-- 1 astrid astrid    0 Feb  4 17:16 .gitkeep
drwxrwxr-x 2 astrid astrid 4096 Feb  4 17:16 initDB/
drwxrwxr-x 2 astrid astrid 4096 Feb  4 17:16 phpinfo/
drwxrwxr-x 5 astrid astrid 4096 Feb  4 17:16 www/
```

Mit dem folgenden Befehl alle Inhalte dem aktuellen Benutzer, in dem Falle beide Mal astrid, zuweisen.

```bash
sudo chown -R astrid:astrid .
```

Am Ende wieder zurück in das `docker-lamp`-Verzeichnis wechseln und den Befehl `make server-up` wiederholen.

```bash
/docker-lamp/data$ cd ..
/docker-lamp$ make server-up
```

### ERROR: for docker-lamp_bind Cannot start service bind

```bash
...
Creating docker-lamp_bind ... error

ERROR: for docker-lamp_bind  Cannot start service bind: driver failed programming external connectivity on endpoint docker-lamp_bind (f4e68e24013e93124e6f55ebe821a87c5ca58cf7dca8c6388181fac9956ed26e): Error starting dockeruserland proxy: listen tcp4 0.0.0.0:53: bind: address already in use

ERROR: for bind  Cannot start service bind: driver failed programming external connectivity on endpoint docker-lamp_bind (f4e68e24013e93124e6f55ebe821a87c5ca58cf7dca8c6388181fac9956ed26e): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use
ERROR: Encountered errors while bringing up the project.
make: *** [Makefile:51: server-up] Fehler 1
```

#### Abhilfe schafft schafft die folgende Vorgehensweise

1. `sudo systemctl disable systemd-resolved.service`

```bash
$ sudo systemctl disable systemd-resolved.service
Removed /etc/systemd/system/dbus-org.freedesktop.resolve1.service.
Removed /etc/systemd/system/multi-user.target.wants/systemd-resolved.service.
```

2. `sudo systemctl stop systemd-resolved.service`

```bash
$ sudo systemctl stop systemd-resolved.service
```

> Was ist der Unterschied zwischen `systemctl stop` und `systemctl disable` beziehungsweise `systemctl start` und `systemctl enable`? `systemctl start` und `systemctl enable` machen verschiedene Dinge. Mit `enable` wird der angegebene Dienst an relevanten Stellen eingehängt, sodass er beim Booten automatisch gestartet wird. `start` startet das Gerät sofort. Deaktivieren und Stoppen sind das Gegenteil davon. [Manpage](http://manpages.ubuntu.com/manpages/hirsute/en/man1/systemctl.1.html)

3. `sudo rm /etc/resolv.conf`

Warum ist die Datei zu löschen?

Die Datei `/etc/resolv.conf` ist ein Symlink.

```bash
$ ll /etc/
insgesamt 1128
...
lrwxrwxrwx   1 root root      39 Feb  4 00:00 resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
...
```

Sie hat folgenden Inhalt:

```bash
$ cat /etc/resolv.conf
...
nameserver 127.0.0.53
options edns0
search localdomain
```

Mit dem Löschen der Datei wird gleichzeitig der Symlink gelöscht. Würden wir die Datei nicht löschen, würde der Inhalt bei jedem Neustart wiederhergestellt. Der Eintrag `nameserver 127.0.0.53` ist aber die Ursache für den Fehler, den wir lösen möchten.

4. `sudo nano /etc/resolv.conf`

Als letztes erstellen wir die Datei mit `sudo nano /etc/resolv.conf` neu. Und tragen zwei passende nameserver ein, wobei `nameserver 192.168.178.2` ein Beispiel für die Konfiguration einer Fritzbox ist, und an die eigenen Gegebenbheiten anzupassen ist.

```
nameserver 127.0.0.1
nameserver 192.168.178.2
```

Es ist wichtig, dass der Eintrag `nameserver 127.0.0.1` an erster Stelle steht. Nach einem Neustart wird der `docker`-Container verwendet. Wenn der nicht verfügbar ist, wird auf `nameserver 192.168.178.2` verwiesen. So ist sichergestellt, dass eine Internetverbindung auch bei gestopptem Container verfügbar ist.

5. `dns=default` im NetworkManager

Als letztes bitte den NetworkManager auf `dns=default` einstellen.

Dazu wird erst der Dienst gestoppt

```
sudo systemctl stop NetworkManager.service
```

Danach die Datei zum editieren öffnen.

```
sudo gedit /etc/NetworkManager/NetworkManager.conf
```

Im Bereich `[main]` die Zeile `dns=default` einfügen.

```
[main]
dns=default
plugins=ifupdown,keyfile

[ifupdown]
managed=false

[device]
wifi.scan-rand-mac-address=no
``

Am Ende den Dienst wieder starten.

```

sudo systemctl start NetworkManager.service

```

Voila! Das war es.
```
