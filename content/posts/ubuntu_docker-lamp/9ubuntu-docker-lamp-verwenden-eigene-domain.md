---
date: 2021-02-10
title: 'docker-lamp mit eigener Domain'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden-eigene-domain
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

_Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_ und konkrete darum, wie spezielle Domains erzeugt werden. _docker-lamp_ ist eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. In diesem Teil erstellen wir eine separate Domain.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.


## Eigene Domain

Falls der Server aktiv ist, stoppe ihn über `make server-down`. Stelle sicher, dass du den Befehl im `docker-lamp` Ordner aufrufst oder ihn global verfügbar gemacht hast.

```bash
/docker-lamp$ make server-down 
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



##### .env

Über `sudo nano .env` öffne ich die Datei, in der die Umgebungsvariablen konfiguriert werden. Hier ergänze ich `tutorial.local=127.0.0.1,tutorial.test=127.0.0.1` bei `TLD_SUFFIX` und `utorial.local,*.tutorial.local,tutorial.test,*.tutorial.test` bei `SSL_LOCALDOMAINS`.

```
...
TLD_SUFFIX=local=127.0.0.1,test=127.0.0.1,tutorial.local=127.0.0.1,tutorial.test=127.0.0.1
...
...
SSL_LOCALDOMAINS=tutorial.local,*.tutorial.local,tutorial.test,*.tutorial.test
...
```

##### Webserver

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

##### Test 

Im `docker-lamp`-Ordner rufe ich den Befehl `make server-up` auf.

```bash
/docker-lamp$ make server-up
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


`https://tutorial.local/` zeigt mir den Inhalt des Verzeichnisses `` an. `` und `` sind zwei Joomla Installationen, die über `https://tutorial.local/t1/installation/index.php` und `https://tutorial.local/t2/installation/index.php` erreiche.