---
date: 2021-02-06
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

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung in einer [LAMP Umgebung](https://de.wikipedia.org/w/index.php?title=LAMP_(Softwarepaket)&oldid=199333875) unterstützen. In diesem Teil richte ich die Umgebung ein.

> Eine LAMP-Umgebung besteht aus den vier Komponenten Linux (Betriebssystem), Apache (Webserver), MySQL (Datenbanksystem) und PHP (serverseitiger Skript-Interpreter).

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](/mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

### Optional und auf eigene Gefahr: Entfernen von Docker-Images, -Containern

Bei der Arbeit mit Docker passiert es leicht, dass viele nicht verwendete Images, Container und Datenvolumen gesammelt werden, die Ausgabe verkomplizieren und unnötigen Festplattenspeicher verbrauchen.

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

> digitalocean.com behandelt in einem [Artikel](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-de) alle gängigen Befehle, die zum Entfernen von Images, Containern und Volumen bei Docker verwendet werden.

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
git clone https://github.com/degobbis/docker-lamp.git
```

Als nächstes wechsele ich in den Ordner `docker-lamp`.

```
cd docker-lamp
```

### Umgebungsvariablen

#### .env-example in .env umbennen und editieren

Im `docker-lamp`-Ordner kopiere ich die versteckte Datei `.env-example` nach `.env`.

> Im Verzeichnis `docker-lamp` befindet sich die unsichtbare Datei `.env-example`, welche nach `.env` kopiert wird. Wofür ist die Datei `.env` wichtig? Diese beinhaltet wesentliche Einstellungen. Konfigurationsdaten müssen besonders geschützt werden, wenn sie sich in einem vom Webserver erreichbaren Verzeichnis befinden. Deshalb ist der Zugriff auf `.env` zu unterbinden und diese ist versteckt.

```
cp .env-example .env
```

Mittels `nano .env` öffne ich die Datei zum editieren.

```
nano .env
```

#### .env Datei abändern

##### Eigene IP-Adresse

Ich belege in der Datei `.env` den Parameter `REMOTE_HOST_IP=` mit der IP des eigenen Rechners. In meinem Fall ist das `192.168.178.138`. Der gesamte Eintrag lautet: `REMOTE_HOST_IP=192.168.178.138`. Das Ende der Datei sieht jetzt so aus, wie im folgenden Block.

```
...
...
# To use PHP xDebug set your host IP here (192.168.0.100)
#
REMOTE_HOST_IP=192.168.209.138
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
    inet 192.168.209.138/24 brd 192.168.209.255 scope global dynamic noprefixroute ens33
       valid_lft 1248sec preferred_lft 1248sec
    inet6 fe80::c526:e1ca:5b3e:7b1/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
...
...
...
```

##### APP_BASEDIR

Ich nutze `/srv/www` als Stammverzeichnis für den Webserver und ändere deshalb später die Variable `APP_BASEDIR` ab. Was weiterhin zu beachten ist, wenn man eine benutzerdefinierte Webserver-Root nutzt, habe ich unter [docker-lamp verwenden](/ubuntu-docker-lamp-verwenden) beschrieben. Zum Einrichten belasse ich `APP_BASEDIR=./data`.

```
...
...
# Set your project folder for websites and configurations.
# If you want to outsource this, use the ./data folder as the base skeleton.
#
APP_BASEDIR=./data
# APP_BASEDIR=/srv/www
...
...
```

##### Benutzer ID unter Ubuntu

In der `.env` gibt es den folgenden Eintrag.

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

Falls die ID des Benutzers welcher `docker-lamp` ausführt, von 1000 abweicht, ist dieser Eintrag zu korrigieren.

### Die make Commandos

`docker-lamp` verwendet das [Hilfsprogramm `make`](https://de.wikipedia.org/w/index.php?title=Make&oldid=203684973). Auf meinem Rechner ist das nicht vorhanden. Mithilfe von `sudo apt install make` installiere ich `make`.

```
sudo apt install make
```

Im `docker-lamp`-Verzeichnis führe ich nach erfolgreicher Installation von `make` den Befehl `make` aus, der alle möglichen Kommandos anzeigt.

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

Noch immer im `docker-lamp`-Ordner rufe ich den Befehl `make server-up` auf.

```
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

Der Befehl arbeitet beim ersten Aufruf einige Minuten, da sämtliche Images heruntergeladen werden. Im Anschluss sind diese mit `docker images -a` auflistbar.

```
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

```
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

Mit dem Befehl `make server-down` stoppe ich alle Container. Vorher werden die Daten in der Datenbank in das Verzeichnis `/data/initDB` gesichert. Beim nächsten Aufruf von `make server-up` werden die Datenbank-Dumps in den neu angelegten Datenbank-Container eingelesen.

### Eigene Projekte in den Container mappen

#### Das Verzeichnis ist flexibel

Wenn man die Projekte erst neu anlegt ist der einfachste Weg, das Verzeichnis `/data/www` im `docker-lamp`-Verzeichnis zu verwenden. Dies gilt ebenfalls, wenn der Speicherort änderbar ist und man die Projekte leicht verschieben kann. `/data/www` wird automatisch im Container unter `/srv/www` eingebunden - falls es nicht in der `.env` neu belegt wurde. Im letzteren Fall ist das in der Variablen `APP_BASEDIR` gesetzte Verzeichnis das, welches in den Container verlinkt wird.

#### Mehrere Verzeichnisse im Container - docker-compose.override.yml

Um weitere Verzeichnisse mit den eigenen Webprojekten im Container zur Verfügung zu haben, ist es erforderlich, die Datei `docker-compose.yml` zu überschreiben. Dazu erstellt man eine Kopie von `docker-compose.yml` unter dem Namen `docker-compose.override.yml` im gleichen Ordner. Im Verzeichnis `docker-lamp` gebe ich folgenden Befehl ein.

```
cp docker-compose.yml docker-compose.override.yml
```

> Wir nutzen die Datei `docker-compose.override.yml` und ändern nicht direkt die Datei `docker-compose.yml`, damit beim nächsten `docker-lamp`-Update die `docker-compose` Konfiguration nicht überschrieben wird.

Nun öffnet ich die Datei `docker-compose.override.yml` zum editieren.

```
nano docker-compose.yml docker-compose.override.yml
```

Angenommen, alle Projekte im Verzeichnis `/home/deinBenutzer/git/joomla-development` sollen in den Containern zur Verfügung stehen. Relevant ist jeder Container, der das Stammverzeichnis eines Webservers verwendet, denn nur dort läuft Joomla. In den Containern sollen die Projekte ebenfalls unter `/home/deinBenutzer/git/joomla-development` zur Verfügung stehen.

Um herauszufinden, wo das Stammverzeichnis des Webservers gemappt wird, suche ich in der Datei `docker-compose.override.yml` nach dem folgenden Eintrag.

```
      - ${APP_BASEDIR:-./data}:/srv:rw
```

Insgesamt wird der Eintrag fünf Mal gefunden. Die Container
`httpd`, `php56`, `phpo73`, `php74` und `php80` sind betroffen.

Bei allen Treffern füge ich die nachfolgende Zeile hinter der gefundenen Zeile `${APP_BASEDIR:-./data}:/srv:rw` ein.

```
      - /home/deinBenutzer/git/joomla-development:/home/deinBenutzer/git/joomla-development:rw
```

Für den `httpd`-Container sieht der Eintrag wie folgt aus:

```
...
...
  httpd:
    image: degobbis/apache24-alpine:latest
    container_name: ${COMPOSE_PROJECT_NAME}_httpd
    hostname: httpd
    links:
      - bind
      - php56
      - php73
      - php74
      - php80
      - mailhog
    volumes:
      - ./.config/httpd/apache24/conf.d:/usr/local/apache2/conf.d:rw
      - ./.config/httpd/apache24/vhosts:/usr/local/apache2/vhosts:rw
      - ${APP_BASEDIR:-./data}:/srv/:rw
      - /home/deinBenutzer/git/joomla-development:/home/deinBenutzer/git/joomla-development:rw
      - pma:/var/www/pma
      - phpsocket:/run/php
    ports:
      - "80:${MAP_POT_80:-8074}"
      - "8000:8000"
      - "8056:8056"
      - "8073:8073"
      - "8074:8074"
      - "8080:8080"
      - "443:${MAP_POT_443:-8474}"
      - "8400:8400"
      - "8456:8456"
      - "8473:8473"
      - "8474:8474"
      - "8480:8480"
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
...
...
```

> Weitere Informationen zur Verwendung von Volumes mit `compose` gibt es in der [docker-Dokumentation](https://docs.docker.com/storage/volumes/#use-a-volume-with-docker-compose) oder in der [compose-Referenz](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference).

Jetzt starte ich den Server mit `make server-up` neu, damit die letzten Änderungen übernommen werden.

```
make server-up
```

Das in meinem Beispiel neu verlinkte Verzeichnis wird im Container unter `/home/deinBenutzer/git/joomla-development` verlinkt. Ich wechsele mit `docker exec -ti docker-lamp_php74 sh` in den Container und überzeuge mich davon:

```
$ docker exec -ti docker-lamp_php74 sh
php74:/srv/www# cd /home/meinBenutzer/git/joomla-development/
php74:/home/meinBenutzer/git/joomla-development# ll
total 20
drwxrwxr-x    6 virtual  virtual       4096 Feb  9 21:07 AG
drwxrwxr-x    8 virtual  virtual       4096 Feb 12 16:04 boilerplate
drwxrwxr-x    6 virtual  virtual       4096 Feb 11 22:17 pkg_agosms
drwxrwxr-x    9 virtual  virtual
```

> Über den Befehl `docker exec -ti docker-lamp_php74 sh` öffnet man eine Befehlszeile im container `docker-lamp_php74`. Über `exit` kommt man wieder aus ihm heraus.

### Zertifikat

Falls die Konfiguration der Zertifikate geändert wird ist erforderlich, den Server neu zu starten. Am besten vor Änderungen den Befehl `make server-down` aufrufen.

```
$ make server-down
/home/meinBenutzer/docker-lamp/.env included

Datenbank-Sicherung gestartet.

j3 wird gesichert...
joomla_db wird gesichert...
joomla_j4b7 wird gesichert...
joomla_j4dev wird gesichert...
tutorial_t1 wird gesichert...

Datenbank-Sicherung abgeschlossen.

Stopping docker-lamp_php56      ... done
Stopping docker-lamp_php74      ... done
Stopping docker-lamp_phpmyadmin ... done
Stopping docker-lamp_php73      ... done
Stopping docker-lamp_php80      ... done
Stopping docker-lamp_mysql      ... done
Stopping docker-lamp_mailhog    ... done
Stopping docker-lamp_bind       ... done
Removing docker-lamp_httpd      ... done
Removing docker-lamp_php56      ... done
Removing docker-lamp_php74      ... done
Removing docker-lamp_phpmyadmin ... done
Removing docker-lamp_php73      ... done
Removing docker-lamp_php80      ... done
Removing docker-lamp_mysql      ... done
Removing docker-lamp_mailhog    ... done
Removing docker-lamp_bind       ... done
Removing network docker-lamp_net
local
docker-lamp_db-data-dir
local
docker-lamp_phpsocket
local
docker-lamp_pma

```

#### Minica

Ich benötige ein Zertifikat auf meinen con­tai­ne­ri­sie­rten Webservern, um verschlüsselte Websites zu verwenden. `docker-lamp` nutzt für diesen Zweck [Minica](https://github.com/jsha/minica).

> Minica erstellt beim ersten Aufruf ein Root-Zertifikat, auf welchem alle daraufhin erzeugten Zertifikate basieren.

##### Angabe im `Makefile`

Standardmäßig werden die im Makefile in der Variablen `MINICA_DEFAULT_DOMAINS` festgelegten Domains zertifiziert.

```
...
MINICA_DEFAULT_DOMAINS:=localdomains,localhost,joomla.local,joomla.test,*.joomla.local,*.joomla.test,wp.local,wp.test,*.wp.local,*.wp.test,wpms.local,wpms.test,*.wpms.local,*.wpms.test
...
```

##### Angaben in der Datei `.env`

Um zusätzliche Domains zu zertifizieren, git es die Variablen `SSL_DOMAINS` und `SSL_LOCALDOMAINS` in der Datei `.env`.

```
...
SSL_DOMAINS=
SSL_LOCALDOMAINS=
...
```

##### Zusätzliche Domain hinzufügen

Eine eigene Domains fügt man im `docker-lamp` verzeichnis mittels nachfolgender Befehle hinzu.

> Ein konkretes [Beispiel](/ubuntu-docker-lamp-verwenden-eigene-domain) habe ich später beschrieben.

```
nano .env
```

Hier dann je nach Wunsch folgenden Einträge erweitert:

```
...
TLD_SUFFIX=local=127.0.0.1,test=127.0.0.1
...
...
SSL_LOCALDOMAINS=
```

> Als `TLD_SUFFIX` trägt man lediglich das Wort ein, welches ganz am Ende der [URL](https://de.wikipedia.org/w/index.php?title=Uniform_Resource_Locator&oldid=207716904) steht. [Top-Level-Domain](https://de.wikipedia.org/w/index.php?title=Top-Level-Domain&oldid=208512458) steht. `local` reicht aus. `joomla.local` ist nicht notwendig. Alle [Domains und Subdomains](<https://de.wikipedia.org/w/index.php?title=Domain_(Internet)&oldid=207898687>) mit der Top-Level-Domain `.local` werden durch den vorherigen Eintrag abgefangen. Es ist ausreichend, diese unter `SSL_LOCALDOMAINS` einzutragen.
> Benötigst du eine weitere Top-Level-Domain inklusive Subdomains, beispielsweise `mytdl` mit `jedemengesubdomains.mytld`? Nun kommt `TLD_SUFFIX` ins Spiel. Das heißt: `TLD_SUFFIX=mytdl` und `SSL_LOCALDOMAINS=subdomain1.mytdl,*.subdomain2.mytdl` spielen zusammen.

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

Dann die Ordner für die Ebenen erstellen. Für die zweite Ebene wäre das `/data/www/subdomain1` und `/data/www/subdomain2` erstellen. `/data/www/joomla` sollte bereits vorhanden sein. Die dritte Ebenen führt man analog fort: `/data/www/subdomain1/s11`, `/data/www/subdomain1/s12`, `/data/www/subdomain1/s13`, `/data/www/subdomain2/s21`, `/data/www/subdomain2/s22`, `/data/www/subdomain2/s23`.

Bereits vorkonfiguriert für die Entwicklung mit Joomla ist die nachfolgende Struktur. Für Wordpress Entwickler gibt es neben `joomla` weiter Domains auf der 3. Ebenen.

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

Am Ende den Ordner `/localdomains` löschen und den Server starten.

```
make server-up
```

#### Vor dem Importieren des Zertifikates

Ruft man die URL `https://joomla.test/` oder `https://joomla.local/` im Browser auf, erscheint ein Sicherheitshinweis. Der Brwoser kennt das Zertifikat bisher nicht. Deshalb importiere ich es im nächsten Schritt.

![Sicherheitshinweis](/images/dockerlamp_zert.png)

> Hinter `https://joomla.test/` oder `https://joomla.local/` befindet sich das gleiche Ziel. Warum wurden zwei Domains zur Verfügung gestellt, die auf dieselben Daten zeigen? Ganz einfach. So kannst du Debuggen und gleichzeitg Browsen.

#### Zertifikat importieren

In Mozilla Firefox importiert man das Zertifikat wie folgt:

1. Öffne die Einstellungen (Preferences). und klicke in der linken Seitenleiste auf Datenschutz & Sicherheit (Privacy and Security).
2. Im rechten Bereich findest du nun weiter unten den Abschnitt Sicherheit (Security). Klicke hier auf die Schaltfläche Zertifikate anzeigen (View Certificates).
3. Wechsele in den Tabulator Zertifizierungsstellen (Authorities).
4. Importiere die Datei `APP_BASEDIR/ca/minica-root-ca-key.pem`. Achte darauf, dass du `Webseite vertrauen` aktivierst.

![Zertifikat importieren](/images/dockerlamp_zertbrowser.png)

> Das Zertifikat wird von `docker-lamp` standardmäßig für die `https://joomla.test/` oder `https://joomla.local/` erstellt. Unter `https://test/` oder `https://local/` gibt es weiterhin den Fehler. Ein konkretes [Beispiel](/ubuntu-docker-lamp-verwenden-eigene-domain) beschreibt die Vorgehensweise für neue Domains.

## Mögliche Fehler

Je nach Konfiguration kommt es unter Ubuntu 20.04 beim Aufruf von `make server-up` zu einem Fehler

### permission denied (but minica-root-ca.pem exists)

Falls die Ausgabe von `make server-up` mit dem nachfolgenden Text startet, stimmen Berechtigungen nicht.

```
./.env included
2021/02/04 19:57:06 open minica-root-ca-key.pem: permission denied (but minica-root-ca.pem exists)
...
```

#### Abhilfe schafft die folgende Vorgehensweise

Als erstes ins Unterverzeichnis data wechseln.

```
/docker-lamp$ cd data
/docker-lamp/data$
...
```

In diesem Verzeichnis alle Rechte prüfen. Alle Inhalte sollten dem aktuellen Benutzer und dessen Gruppe gehören

```
/docker-lamp/data$ ll
insgesamt 28
drwxrwxr-x 7 deinBenutzer deinBenutzer 4096 Feb  4 17:33 ./
drwxrwxr-x 5 deinBenutzer deinBenutzer 4096 Feb  4 20:41 ../
drwxrwxr-x 2 deinBenutzer deinBenutzer 4096 Feb  4 17:33 apache24/
drwxr-xr-x 3 root   root   4096 Feb  4 17:33 ca/
-rw-rw-r-- 1 deinBenutzer deinBenutzer    0 Feb  4 17:16 .gitkeep
drwxrwxr-x 2 deinBenutzer deinBenutzer 4096 Feb  4 17:16 initDB/
drwxrwxr-x 2 deinBenutzer deinBenutzer 4096 Feb  4 17:16 phpinfo/
drwxrwxr-x 5 deinBenutzer deinBenutzer 4096 Feb  4 17:16 www/
```

Mit dem folgenden Befehl alle Inhalte dem aktuellen Benutzer, in dem Falle beide Mal deinBenutzer, zuweisen.

```
sudo chown -R deinBenutzer:deinBenutzer .
```

Am Ende wieder zurück in das `docker-lamp`-Verzeichnis wechseln und den Befehl `make server-up` wiederholen.

```
/docker-lamp/data$ cd ..
/docker-lamp$ make server-up
```

### ERROR: for docker-lamp_bind Cannot start service bind

```
...
Creating docker-lamp_bind ... error

ERROR: for docker-lamp_bind  Cannot start service bind: driver failed programming external connectivity on endpoint docker-lamp_bind (f4e68e24013e93124e6f55ebe821a87c5ca58cf7dca8c6388181fac9956ed26e): Error starting dockeruserland proxy: listen tcp4 0.0.0.0:53: bind: address already in use

ERROR: for bind  Cannot start service bind: driver failed programming external connectivity on endpoint docker-lamp_bind (f4e68e24013e93124e6f55ebe821a87c5ca58cf7dca8c6388181fac9956ed26e): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use
ERROR: Encountered errors while bringing up the project.
make: *** [Makefile:51: server-up] Fehler 1
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

3. `sudo rm /etc/resolv.conf`

Warum ist die Datei zu löschen?

Die Datei `/etc/resolv.conf` ist ein Symlink.

```
$ ll /etc/
insgesamt 1128
...
lrwxrwxrwx   1 root root      39 Feb  4 00:00 resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
...
```

Sie hat folgenden Inhalt:

```
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
```

Am Ende den Dienst wieder starten.

```
sudo systemctl start NetworkManager.service

```

Voila! Das war es.
