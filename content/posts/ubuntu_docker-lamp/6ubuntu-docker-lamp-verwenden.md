---
description: 'desc'
shortTitle: 'short'
date: 2021-02-07
title: 'docker-lamp einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-lamp-verwenden
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - docker-lamp
  - Joomla
---

_Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die bei der Entwicklung auf einem Webserver unterstützen. Im letzten Teil haben wir die Umgebung eingerichtet. Nun installiere ich Joomla in unterschiedlichen Versionen. Im nächsten Teil füge ich eines meiner Projekte hinzu.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](/mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## docker-lamp verwenden

Wenn der Server zwischenzeitlich heruntergefahren wurde, starte ihn über `make server-up` im Verzeichnis `docker-lamp`.

Im Webbrowser sollte nun die URL `https://joomla.test/` oder `https://joomla.local/` etwas in der Art zeigen, wie im folgenden Bild zu sehen ist. Im folgenden Bild siehst du die Ansicht, wenn die beiden Verzeichnisse `j4dev` und `j3dev` im Verzeichnis `joomla` angelegt wurden.

![Webserver Oberfläche](/images/joomlalocal1.png)

### Webserverumgebung einrichten

#### Den Standard verwenden

Wer das Verzeichnis `/www`, welches unter `/docker-lamp/data/www` vorhanden ist, als Stammverzeichnis des Webservers nutzt, kann diesen Abschnitt überspringen und dafür im weiteren meine Beschreibung anpassen. Diese beziehen sich auf `/srv/www`.

#### Stammverzeichnis des Webservers unter /srv/www einrichten

Ich beschreibe meine Vorgehensweise als Beispiel, bei der ich `/srv/www` als Stammverzeichnis im Webserver nutze.

In diesem Fall ist die Variable `APP_BASEDIR` in der Datei `.env` wie folgt abzuändern.

```
...
...
# Set Your projekt folder for websites
#
APP_BASEDIR=/srv
...
...
```

> Das Verzeichnis `data` unter `docker-lamp` ist die Basis für den Projektordner für Websites und Konfigurationen. Um dies auszulagern, verwendet man idealerweise diesen Ordner als Grundgerüst.

> Eine einfachere Alternative ist es, das Verzeichnis `/www` welches unter `/docker-lamp/data/www` zu finden ist, nach `/srv` zu kopieren. Dann verfügt man über die von _docker-lamp_ als Standard vorgesehen Verzeichnisse. Nur noch die Berechtigungen sind zu beachten.

Als erstes lege ich das Verzeichnis `/srv/www/joomla` an. `/srv/www` soll mein Webserver Stammverzeichnis sein. In den Unterordner `joomla` kommen zur besseren Übersicht alle Joomla Projekte. Logisch, richtig?

In den meisten Server Setups ist es sinnvoll, dass derjenige, der die Dateien ändert, entweder Eigentümer ist oder zu einer Gruppe gehört, die Schreibrechte hat. So vermeidet man Konflikte mit Benutzerrechten, manchmal auch [`www-run`-Problem](https://www.joomla.ch/joomla-entdecken/anleitungen/99-joomla-und-das-wwwrun-problem) genannt.

Die nachfolgende Befehlskette stellt sicher, dass Ordner und Dateien die richtigen Rechte besitzen.

Als erstes stoppen wir den Server.

```
make server-down
```

Wir kopieren den gesamten Inhalt des Verzeichnisse `docker-lamp/data` nach `/srv`.

```
sudo cp -r data/* /srv/
sudo rm -r data/
```

`chown` steht für `change owner` und änder den Besitzer von `/srv/www/`.

```
sudo chown -R deinBenutzer:deinBenutzer /srv/www/
```

> Zur Erinnerung `whoami` zeigt dir deinen Benutzer. `groups` zeigt dir, in welchen Gruppen du bist.

##### Am Ende sollte dies für die Entwicklung mit Joomla vorhanden sein

1. In der Root sollte das Verzeichnis `srv` dem Benutzer `root` gehören.

```
$ ll
..
drwxr-xr-x   4 root root       4096 Feb  3 17:42 srv/
...
```

2. Das Verzeichnis `/srv` enthält folgende Struktur:

```
/srv$ ll
insgesamt 36
drwxr-xr-x  8 root   root   4096 Apr  8 18:59 ./
drwxr-xr-x 21 root   root   4096 Feb  6 12:28 ../
drwxr-xr-x  2 root   root   4096 Apr  8 18:57 apache24/
drwxr-xr-x  3 root   root   4096 Apr  8 18:57 ca/
drwxr-xr-x  2 root   root   4096 Apr  8 18:57 initDB/
drwxr-xr-x  6 root   root   4096 Apr  8 18:57 php/
drwxr-xr-x  2 root   root   4096 Apr  8 18:57 phpinfo/
-rw-r--r--  1 root   root    144 Apr  8 18:57 README.md
drwxr-xr-x  5 deinBenutzer deinBenutzer 4096 Apr  8 18:57 www/

```

3. Das Verzeichnis `/srv/www` sieht wie folgt aus:

```
/srv/www$ ll
insgesamt 24
drwxr-xr-x 5 deinBenutzer deinBenutzer 4096 Apr  8 18:57 ./
drwxr-xr-x 8 root   root   4096 Apr  8 18:59 ../
drwxr-xr-x 2 deinBenutzer deinBenutzer 4096 Apr  8 18:57 joomla/
-rw-r--r-- 1 deinBenutzer deinBenutzer   35 Apr  8 18:57 README.md
drwxr-xr-x 2 deinBenutzer deinBenutzer 4096 Apr  8 18:57 wp/
drwxr-xr-x 2 deinBenutzer deinBenutzer 4096 Apr  8 18:57 wp-multisite/

```

> Wer für Wordpress entwickeln möchte, legt analog zum `joomla` Ordner die von docker-lamp vorgesehen Verzeichnisse `wp` und `wp-multisite` an.

##### Abschlusstest

Zum Test den Befehl `make server-up` im Verzeichnis `docker-lamp` aufrufen, um den Server neu zu starte.

Im Webbrowser sollte nun die URL `https://joomla.test/` oder `https://joomla.local/` das folgende Bild zeigen - ich habe bereits die beiden Verzeichnisse `j4dev` und `j3dev` im Verzeichnis `joomla` angelegt.

![Webserver Oberfläche](/images/joomlalocal1.png)

#### Joomla installieren

Jenachdem, ob du mit der Entwicklerversion von Joomla arbeitest oder eine stabile Variante nutzt, unterscheidet sich die Installation.

##### Entwicklerversion

###### Joomla 4

Die Developement Versionen klonen wir von Github in den Unterordner `joomla` des Webserver-Stammverzeichnises, genau in das Verzeichnis `/srv/www/joomla`.

Ich wechsele dazu in den Ordner `/srv/www/joomla` und setze den folgenden Aufruf ab.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b 4.0-dev

```

Als Ergebnis sehe ich:

```
/srv/www/joomla$ ll
insgesamt 12
drwxr-xr-x  3 deinBenutzer deinBenutzer 4096 Feb  6 13:18 ./
drwxr-xr-x  3 deinBenutzer deinBenutzer 4096 Feb  6 13:08 ../
drwxrwxr-x 21 deinBenutzer deinBenutzer 4096 Feb  6 13:19 joomla-cms/
```

Damit ich auf den ersten Blick erkenne, um welches Joomla es sich handelt, gebe ich dem Verzeichnis einen sprechenderen Namen.

```
mv joomla-cms/ j4dev
```

> Ich nutze `j4dev` für die Development Version von Joomla 4. `j3`, beziehungsweise `j4` für die letzte stabile Version des jeweiligen Major Release. `j4b6` für die 6. Beta Version von Joomla 4. Analog nenne ich die Datenbanken. So ist für mich alles übersichtlich.

Ich schaue mir das Ergebnis im Browser an. `https://j4dev.joomla.local` oder `https://j4dev.joomla.test` sind die passenden URLs.

![Joomla 4 Oberfläche vor dem Einrichten der Entwicklungsumgebung](/images/j4dev1.png)

Soweit so gut! Die [Entwicklungsumgebung](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment/de) ist als nächstes einzurichten.

> Warum nutze ich in den nachfolgenden Befehlen die 1000 anstelle von `user` oder `group`? In Ubuntu ist `1000` die erste ID die im Falle von Benutzern und Gruppen bei der Installation angelegt wird. Wenn man das System selbst installiert hat, hat man somit die ID 1000. Überprüfen kann man dies mit dem Befehl `id -u`.

Wir benötigen Git um Composer fehlerfrei ausführen zu können und installieren die Versionsverwaltung mit dem folgenden Befehl im Container `docker-lamp_php80`.

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

Der nachfolgende Befehl führt `composer install` im Verzeichnis `/srv/www/joomla/j4dev` des `docker-lamp_php80`-Containers als Benutzer `1000` aus.

> Eine eventuelle lokale Installation von _Composer_ ist verwendbar. Dazu auf dem Rechner in das `j4dev` Verzeichnis wechseln und dort den Befehl [`composer install`](https://getcomposer.org/doc/03-cli.md#install-i) aufrufen.

```
docker exec -it --user 1000 -w /srv/www/joomla/j4dev docker-lamp_php80 composer install
```

> Composer ist in den Containern mit PHP 7.3 (docker-lamp_php73), 7.4 (docker-lamp_php74) und 8.0 (docker-lamp_php80).

Der nachfolgende Befehl führt `npm ci` im Verzeichnis `/srv/www/joomla/j4dev` des `docker-lamp_php80` Containers als Benutzer `1000` aus. Wir möchten `npm` aber nicht dauerhaft im Container haben. Deshalb löschen wir es anschließen. Dies bewirkt der Parameters `--rm`.

> Eventuelle lokale Installationen von _Node.js_ beziehungsweise _npm_ sind verwendbar. Dazu auf dem Rechner in das `j4dev` Verzeichnis wechseln und dort den Befehl [`npm ci`](https://docs.npmjs.com/cli/v6/commands/npm-ci) aufrufen.

```
docker run --rm -it --user 1000 -v /srv/www/joomla/j4dev:/srv/www/joomla/j4dev -w /srv/www/joomla/j4dev node:latest npm ci
```

Ich überprüfe die Ausgabe erneut im Browser. `https://j4dev/joomla.local` oder `https://j4dev.joomla.test` sind die passenden URLs.

![Joomla 4 Oberfläche nach dem Einrichten der Entwicklungsumgebung](/images/j4dev2.png)

Voilá! Joomla ist bereit für die Installation.

###### Besonderheiten bei der Installation von Joomla

![Datenbankkonfiguration bei der Installation](/images/installmysql.png)

![Meldung bei der Installation](/images/installdelfile.png)

###### Joomla 3

Analog zur Installation der Joomla 4 Entwicklerversion wende ich die nachfolgenden Befehle an.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b staging

mv joomla-cms/ j3dev
```

Ich sehe mir das Ergebnis im Browser an `https://j3dev.joomla.local` oder `https://j3dev.joomla.test` sind die passenden URLs für das Verzeichnis.

![Joomla 3 Oberfläche](/images/j3dev1.png)

Die Installationroutine von Joomla öffnet sich.

##### Stable Versionen

Im Falle einer stabilen Version besorge ich mir das ZIP File von [Github](https://github.com/joomla/joomla-cms/releases) und entpacke es im Ordner `/srv/www/joomla`.

Wenn das Paket entpackt ist, benenne ich es um. Der Name `j3` bedeute bei mir, dass dies die letzte stabile Version der 3er-Reihe ist. `joomla-cms` würde mir nichts über die Version sagen.

```
mv joomla-cms/ j3
```

Für die Installation ist alles bereit.

#### Was bietet docker-lamp

Ich habe Joomla im Container `docker-lamp_php80` installiert. Zur Verfügung steht es mir in allen unterstützten PHP-Versionen.

##### Ein kleiner Rundgang zum Orientieren

Eine Befehlszeile des Containers `docker-lamp_php80` öffne ich über `docker exec -ti docker-lamp_php80 sh`.

```
$ docker exec -ti docker-lamp_php80 sh
php80:/srv/www#
```

`cat /etc/issue` im Container aufgerufen zeigt mir das Betriebssystem und die Version.

```
php80:/srv/www# cat /etc/issue
Welcome to Alpine Linux 3.13
Kernel \r on an \m (\l)
```

Mittels `php -i | grep php.ini` finde ich heraus, welche `php.ini` geladen wird.

```
php80:/srv/www# php -i | grep php.ini
Configuration File (php.ini) Path => /usr/local/etc/php
Loaded Configuration File => /usr/local/etc/php/php.ini
```

> Im Container ist als Editor [_vi_](https://de.wikipedia.org/wiki/Vi) verfügbar. Mein Spickzettel mit den wichtigsten Befehlen zum _vi_: `:w` = Speichern der Datei. `:q` = Verlassen des vi (nur nach Speichern). `:wq` = Speichern und Verlassen. `:q!` = Verlassen ohne zu speichern.

Aus dem Container komme ich via `exit` wieder heraus.

```
php80:/srv/www# exit
$
```

Die Namen der Container erfahre ich mittels `docker ps`.

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

##### Unterstützte PHP Versionen

Die [Konfiguration](https://github.com/degobbis/docker-lamp/tree/main/.config/php) zeigt, welche PHP-Versionen unterstützt werden.

Konkret ist das

- PHP 5.6 (https://joomla.local:8456/phpinfo/)
- PHP 7.3 (https://joomla.local:8473/phpinfo/)
- PHP 7.4 (https://joomla.local:8474/phpinfo/)
- PHP 8.0 (https://joomla.local:8480/phpinfo/)

> Bei den PHP-Versionen in der Auflistung stehen keine Minor-Versionen. Diese werden zeitnah aktualisiert und ändern sich somit permanent.

##### Port-Verlinkungen und PHP-Versionen

Standard ist PHP Version 7.4.x. Dies erkennt man daran, das der Port `8074` standardmäßig mit `443` gemappt ist, in der `docker-compose.yml`, beziehungsweise der eigenen `docker-compose.override.yml`.

```
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
      - ./data/ca:/usr/local/apache2/ca:rw
      - ./.config/httpd/apache24/conf.d:/usr/local/apache2/conf.d:rw
      - ./.config/httpd/apache24/vhosts:/usr/local/apache2/vhosts:rw
      - ./data/apache24/my-domains.conf:/usr/local/apache2/vhosts/20-extra-domains.conf:rw
      - ./data/phpinfo:/srv/phpinfo:rw
      - ${APP_BASEDIR:-./data/www}:/srv/www:rw
      - /home/meinBenutzer/git/joomla-development:/home/meinBenutzer/git/joomla-development:rw
      - pma:/srv/pma
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
```

Eine spezielle PHP Version adressiert man über den Port. Beispielsweise https://joomla.local:8480/phpinfo/ für PHP 8.0.x oder https://joomla.local:8456/phpinfo/ wenn man PHP 5.6.x überprüfen möchte.

![phpinfo() in PHP 5.6.40](/images/phpinfo56.png)

![phpinfo() in PHP 8.0.1](/images/phpinfo_80.png)

###### PHPInfo()

Ein praktisches Feature ist, dass `phpinfo()` für jede PHP-Version und jede Domain oder Subdomain vom System bereitgestellt wird. Dazu reicht es, die Domain mit dem Unterverzeichnis `/phpinfo` aufzurufen.

Der Aufruf

```
https://j4dev.joomla.local:8480/administrator/index.php?option=com_admin&view=sysinfo
```

zeigt die Systeminformationen der Joomla Installation. Man sieht, dass PHP 8.0 ausgeführt wird.

Der Aufruf

```
https://j4dev.joomla.local:8456/administrator/index.php?option=com_admin&view=sysinfo
```

zeigt die Systeminformationen der Joomla Installation. Mit der PHP-Version 5.6 kann Joomla 4 nicht ausgeführt werden. Deshalb wird man mit "Sorry, your PHP version is not supported" begrüßt. Joomla 4 unterstütz PHP 5.6 nicht.

##### xdebug

##### Versionen

PHP 5.6 verwendet im Februar 2021

- xdebug 2.5.5

PHP 7.3 und PHP 7.4 verwenden

- xdebug 2.9.8

PHP 8.0 verwendet

- xdebug 3.1.0-dev

##### Parameter

Die in _xdebug_ eingestellten Parameter findet man in der [PHP Konfiguration](https://github.com/degobbis/docker-lamp/tree/main/.config/php).

Für xdebug 2 ist dies

```
[XDEBUG]
;
; options for xDebug 2.x
;
xdebug.default_enable = true
xdebug.remote_enable = true
xdebug.remote_port = 10000
xdebug.remote_connect_back = false
xdebug.max_nesting_level = 700
;xdebug.remote_log = /srv/www/xdebug.log

; xdebug.remote_host is set automaticaly by entrypoint.
; If it not works, it can be overridden here with the
; host network IP like this
;xdebug.remote_host=192.168.0.100
```

Für xdebug 3 ist dies

```
[XDEBUG]
;
; options for xDebug 3.x
;
xdebug.mode = debug
xdebug.start_with_request = trigger
xdebug.discover_client_host = false
xdebug.client_port = 10000
xdebug.max_nesting_level = 700
;xdebug.log = /srv/www/xdebug.log

; xdebug.client_host is set automaticaly by entrypoint.
; If it not works, it can be overridden here with the
; host network IP like this
;xdebug.client_host=192.168.0.100
```

> Man beachte `xdebug.remote_port = 10000` beziehungsweise `xdebug.client_port = 10000`, die in der Konfiguration der IDE oder des Browser Plugins benötigt werden.

##### Mögliche Fehler

###### Cloning failed using an ssh key for authentication, enter your GitHub credentials to access private repos

Der nachfolgende Fehler deutet darauf hin, dass Git im Container nicht installiert ist.

```
Installing joomla-projects/joomla-browser (v4.0.0.x-dev 679c0ce): Cloning 679c0cef9c
Cloning failed using an ssh key for authentication, enter your GitHub credentials to access private repos
Head to https://github.com/settings/tokens/new?scopes=repo&description=Composer+on+php74+2021-02-13+1333
to retrieve a token. It will be stored in "/home/virtual/.composer/auth.json" for future use by Composer.
Token (hidden):
```

Die Installation von Git im Container erfolgt für den Container `docker-lamp_php80` via:

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

Bei der Installation von Joomla wird ein Datenbankserver abgefragt. Verwendet man _docker-lamp_ ist der Name des Datenbank Containers anzugeben. Dieser ist schlicht und einfach `mysql`. Diese Information findet man in der Datei `docker-compose.yml`.

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

![Datenbankkonfiguration bei der Installation](/images/installmysql.png)

#### MailHog

[MailHog](https://github.com/mailhog/MailHog) ist ein E-Mail-Testwerkzeug für Entwickler.

Mit `docker-lamp` sind E-Mails über die Mailhog-Oberfläche einsehbar, wenn diese per PHP-Mail gesendet wurden. Die Mailhog-Oberfläche erreicht man über http://localhost:8025.

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

## Gesamtes Set

1. [Vorwort](/ubuntu-vorwort-docker-lamp)
2. [Git](/ubuntu-git-einrichten-docker-lamp)
3. [Docker](/ubuntu-docker-einrichten-docker-lamp)
4. [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp)
5. [docker-lamp einrichten](/ubuntu-docker-lamp-einrichten)

-> 6. [docker-lamp verwenden](/ubuntu-docker-lamp-verwenden)

7. [docker-lamp mit eigenen Projekten](/ubuntu-docker-lamp-verwenden-eigene-projekte)
8. [Visual Studio Code](/ubuntu-vscode-docker-lamp)
9. [docker-lamp mit eigenen Domain](/ubuntu-docker-lamp-verwenden-eigene-domain)

<img src="https://vg02.met.vgwort.de/na/7867d0b1258a493da7b0effcef2cc5a8" width="1" height="1" alt="">
