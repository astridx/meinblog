---
date: 2021-02-07
title: 'docker-lamp einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. Im letzten Teil haben wir die Umgebung eingerichtet. Nun installiere ich Joomla in unterschiedlichen Versionen. Im nächsten Teil füge ich eines meiner Projekte hinzu.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Um die Skripte automatisch auszuführen, solltest du unter Linux arbeiten. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## docker-lamp verwenden

Wenn der Server zwischenzeitlich heruntergefahren wurde, starte ihn über `make server-up` im Verzeichnis `docker-lamp`.

Im Webbrowser sollte nun URL `https://joomla.test/` oder `https://joomla.local/` das folgende Bild zeigen.

![Webserver Oberfläche](/images/joomlalocal.png)

### Webserverumgebung einrichten

#### Den Standard verwenden

Wer das Verzeichnis `/www`, welches unter `/docker-lamp/data/www` vorhanden ist, als Stammverzeichnis des Webservers nutzt, kann diesen Abschnitt überspringen und dafür im weiteren meine Beschreibung anpassen. Diese beziehen sich auf `/srv/www`.

#### Stammverzeichnis des Webservers unter /srv/www einrichten

Ich beschreibe meine Vorgehensweise als Beispiel, bei der ich `/srv/www` als Stammverzeichnis im Webserver nutze.

Zur Erinnerung. In diesem Fall ist die Variable WWW_BASEDIR in der Datei .env wie folgt abzuändern.

```
...
...
# Set Your projekt folder for websites
#
WWW_BASEDIR=/srv/www
...
...
```

> Eine einfachere Alternative ist es, das Verzeichnis `/www` welches unter `/docker-lamp/data/www` zu finden ist, nach `/srv` zu kopieren. Dann verfügt man über die von docker-lamp als Standard vorgesehen Verzeichnisse und kann diesen Abschnitt überspringen.

Als erstes lege ich das Verzeichnis `/srv/www/joomla` an. `/srv/www` soll mein Webserver Stammverzeichnis sein. In den Unterordner `joomla` kommen zur besseren Übersicht alle Joomla Projekte. Logisch, richtig?

In den meisten Server Setups ist es sinnvoller, dass derjenige, der die Dateien ändert, entweder Eigentümer der Dateien ist oder zu einer Gruppe gehört, die Schreibrechte für die Dateien hat. So vermeidet man Konflikte mit Benutzerrechten, manchmal auch [`www-run`-Problem](https://www.joomla.ch/joomla-entdecken/anleitungen/99-joomla-und-das-wwwrun-problem) genannt. Die nachfolgende Befehlsreihe stellt sicher, dass Ordner und Dateien die richtigen Rechte besitzen.

```
sudo mkdir /srv/www
sudo mkdir /srv/www/joomla
sudo chown -R deinBenutzer:deinBenutzer /srv/www/

```

Am Ende sollte zumindest dies für die Entwicklung mit Joomla vorhanden sein:

In der Root sollte das Verzeichnis srv dem Benutzer root gehören.

```
:/$ ll
..
drwxr-xr-x   4 root root       4096 Feb  3 17:42 srv/
...
```

Das Verzeichnis /srv

```
:/srv$ ll
insgesamt 16
drwxr-xr-x  4 root   root   4096 Feb  6 17:42 ./
drwxr-xr-x 21 root   root   4096 Feb  5 22:29 ../
drwxr-xr-x  5 deinBenutzer deinBenutzer 4096 Feb  6 17:52 www/
```

Das Verzeichnis /srv/www

```
:/srv/www$ ll
insgesamt 20
drwxr-xr-x 5 deinBenutzer deinBenutzer 4096 Feb  6 17:52 ./
drwxr-xr-x 4 root   root   4096 Feb  6 17:42 ../
drwxrwxr-x 5 deinBenutzer deinBenutzer 4096 Feb  6 19:50 joomla/
```

> Wer für Wordpress entwickeln möchte, legt analog zum `joomla` Ordner die von docker-lamp vorgesehen Verzeichnisse `wp` und `wp-multisite` an.

#### Joomla installieren

Jenachdem, ob du mit der Entwicklerversion von Joomla arbeitest oder einer stable Variante nutzt, unterscheidet sich die Installation.

##### Entwicklerversion

###### Joomla 4

Die Developement Versionen klonen wir von Github in den Unterordner `joomla` des Webserver-Stammverzeichnises, genau in `/srv/www/joomla`.

Ich wechsele in `/srv/www/joomla` und setze den folgenden Aufruf ab.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b 4.0-dev

```

Als Ergebnis sehe ich

```
/srv/www/joomla$ ll
insgesamt 12
drwxr-xr-x  3 deinBenutzer deinBenutzer 4096 Feb  6 13:18 ./
drwxr-xr-x  3 deinBenutzer deinBenutzer 4096 Feb  6 13:08 ../
drwxrwxr-x 21 deinBenutzer deinBenutzer 4096 Feb  6 13:19 joomla-cms/
```

Damit ich auf den ersten Blick erkenne, um welches Joomla es sich handelt, gebe ich ihm einen sprechenderen Namen.

```
mv joomla-cms/ j4dev
```

Ich schaue mir das Ergebnis im Browser an. `j4dev/joomla/local` oder `j4dev/joomla/test` sind die passenden URLs für das Verzeichnis.

![Joomla 4 Oberfläche vor dem Einrichten der Entwicklungsumgebung](/images/j4dev1.png)

Soweit so gut. Die [Entwicklungsumgebung](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment/de) ist als nächstes einzurichten.

> Warum nutze ich in den nachfolgenden Befehlen die 1000 als user? In Ubuntu ist `1000` die erste ID die im Falle von Benutzern und Gruppen bei der Installation angelegt wird. Wenn man das System selbst installiert hat, hat man somit die ID 1000. Überprüfen kann man dies mit dem Befehl `id -u`.

Wir benötigen Git um Composer fehlerfrei ausführen zu können und installierne die Versionsverwaltung mit dem folgenden Befehl im Container docker-lamp_php80.

```
$ docker exec -it docker-lamp_php80 apk add git
fetch https://dl-cdn.alpinelinux.org/alpine/v3.13/main/x86_64/APKINDEX.tar.gz
fetch https://dl-cdn.alpinelinux.org/alpine/v3.13/community/x86_64/APKINDEX.tar.gz
(1/3) Installing expat (2.2.10-r1)
(2/3) Installing pcre2 (10.36-r0)
(3/3) Installing git (2.30.0-r0)
Executing busybox-1.32.1-r2.trigger
OK: 79 MiB in 71 packages
```

Der nachfolgende Befehl führt composer install im Verzeichnis /srv/www/joomla/j4dev des docker-lamp_php80 Containers als Benutzer 1000 aus.

```
docker exec -it --user 1000 -w /srv/www/joomla/j4dev docker-lamp_php80 composer install
```

Der nachfolgende Befehl führt `npm ci` im Verzeichnis `/srv/www/joomla/j4dev` des `docker-lamp_php80` Containers als Benutzer 1000 aus. Wir möchten `npm` aber nicht dauerhaft im Container haben. Deshalb löschen wir es anschließen. Dies bewirkt der Parameters `--rm`.

```
docker run --rm -it --user 1000 -v /srv/www/joomla/j4dev:/srv/www/joomla/j4dev -w /srv/www/joomla/j4dev node:latest npm ci
```

Ich überprüfe die Ausgabe im Browser. `j4dev/joomla/local` oder `j4dev/joomla/test` sind die passenden URLs für das Verzeichnis.

![Joomla 4 Oberfläche nach dem Einrichten der Entwicklungsumgebung](/images/j4dev2.png)

Soweit so gut! Joomla ist nun bereit für die Installation.

###### Joomla 3

Analog zur Installation der Joomla 4 Entwicklerversion wende ich die nachfolgenden Befehle an.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b staging

mv joomla-cms/ j3dev
```

Ich seje mir das Ergebnis im Browser an `j3dev/joomla/local` oder `j3dev/joomla/test` sind die passenden URLs für das Verzeichnis.

![Joomla 3 Oberfläche](/images/j3dev1.png)

Soweit so gut! Joomla ist nun bereit für die Installation.

##### Stable Versionen

Für eine stable Version downloaden wir ein Zipfile und entpacken dieses im www-Verzeichnis.

Im Falle einer stabilen Version besorge ich mir das ZIP File von [Github](https://github.com/joomla/joomla-cms/releases) und entpacke es im Ordner `/srv/www/joomla`.

```
mv joomla-cms/ j3
```

#### Nach der Installation von Joomla einen Überblick verschafften

Ich habe Joomla im Container `docker-lamp_php80` installiert. Eine Befehlszeile dieses Containers erreiche ich über `docker exec -ti docker-lamp_php80 sh`. Aus dem Container komme ich mit `exit` wieder heraus. Die Namen der Container erfahre ich mittels `docker ps`.

Alle PHP Versionen

Konfiguration

### phpMyAdmin und MailHog

#### phpMyAdmin

[phpMyAdmin](https://www.phpmyadmin.net/) ist ein freies Tool, das für die Verwaltung von MySQL über das Web gedacht ist.
Die phpMyAdmin-Oberfläche erreicht man über http://localhost:8000.

Das Passwort für den Benutzer `root` setzt man in der Datei `.env`. Standardmäßig ist es `root`.

```
...
# Set MySQL root password
#
MYSQL_ROOT_PASSWD=root
...
```

![phpMyAdmin Oberfläche](/images/phpmyadmin.png)

Bei der späteren Installation von Joomla wird ein Datenbankserver abgefragt. Verwendet man docker-lamp ist der Name des Datenbank Containers anzugeben. Dieser ist schlicht und einfach `mysql`. Diese Information findet man in der Datei `docker-compose.yml`.

```
...
  mysql:
    image: degobbis/mariadb105-alpine:latest
    container_name: ${COMPOSE_PROJECT_NAME}_mysql
    hostname: mysql
    links:
      - bind
    volumes:
      - db-data-dir:/var/lib/mysql
      - ./data/initDB:/docker-entrypoint-initdb.d
    environment:
      TZ: ${MY_TZ:-UTC}
      LC_ALL: ${MY_LOCALES:-en_GB.UTF-8}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWD:-root}
      APP_USER_ID: ${APP_USER_ID:-1000}
      APP_GROUP_ID: ${APP_GROUP_ID:-1000}
    ports:
      - "3306:3306"
    networks:
      net:
        ipv4_address: 172.16.238.15
...
...
  phpmyadmin:
    image: phpmyadmin/phpmyadmin:fpm-alpine
    container_name: ${COMPOSE_PROJECT_NAME}_phpmyadmin
    hostname: phpmyadmin
    links:
      - bind
      - mysql
    volumes:
      - ./.config/phpmyadmin/config.user.inc.php:/etc/phpmyadmin/config.user.inc.php:rw
      - pma:/var/www/html
    environment:
      TZ: ${MY_TZ:-UTC}
      LC_ALL: ${MY_LOCALES:-en_GB.UTF-8}
      PMA_HOST: mysql
      PMA_PORT: 3306
      UPLOAD_LIMIT: 128M
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWD:-root}
    networks:
      net:
        ipv4_address: 172.16.238.17
...
```

#### MailHog

[MailHog](https://github.com/mailhog/MailHog) ist ein E-Mail-Testwerkzeug für Entwickler.todo

Mit `docker-lamp` sind E-Mails über die Mailhog-Oberfläche eingesehbar, wenn diese per PHP-Mail gesendet wurden. Die Mailhog-Oberfläche erreicht man über http://localhost:8025.

![MailHog Oberfläche](/images/mailhog.png)

Wer sich ansehen möchte, wie der Container gebildet wird, kann einen Blick in der Datei `docker-compose.yml` werfen.

```
...
  mailhog:
    image: mailhog/mailhog:latest
    container_name: ${COMPOSE_PROJECT_NAME}_mailhog
    hostname: mailhog
    links:
      - bind
    ports:
      - "8025:8025"
      - "1025:1025"
    networks:
      net:
        ipv4_address: 172.16.238.16
...
```

## Mögliche Fehler
