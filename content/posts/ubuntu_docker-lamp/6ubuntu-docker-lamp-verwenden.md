---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-05
title: 'docker-lamp im Einsatz'
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

Hier geht es um _docker-lamp_. Eine Software die vorgefertigte Images, Container und Skripte bietet, die bei der Entwicklung auf einem Webserver unterstützen. Im letzten Teil haben wir die Umgebung eingerichtet. Nun installiere ich Joomla in unterschiedlichen Versionen. Im nächsten Teil dieser Beitragsreihe füge ich eines meiner Joomla-Projekte hinzu.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](/mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## docker-lamp verwenden

Wenn der Server zwischenzeitlich heruntergefahren wurde, starte ihn über `./docker-lamp start` im Verzeichnis `docker-lamp`.

Im Webbrowser sollte nun die URL `https://joomla.test/` oder `https://joomla.local/` etwas Ähnliches wie das folgende Bild anzeigen. Du siehst die Ansicht, nachdem die beiden Verzeichnisse `j4dev` und `j3dev` im Verzeichnis `joomla` angelegt wurden.

![Webserver Oberfläche](/images/joomlalocal1.png)

### Webserverumgebung einrichten<!-- \index{docker-lamp! Webserverumgebung einrichten} -->

#### Verwendung des Standardverzeichnisses

Wenn du das Verzeichnis `/www`, das unter `/docker-lamp/data/www` vorhanden ist, als Stammverzeichnis des Webservers verwendest, kannst du diesen Abschnitt überspringen und mit der Installation von Joomla weiter machen.

##### Optional Stammverzeichnis des Webservers unter ./data einrichten

###### Verzeichnis einrichten

Ich beschreibe meine Vorgehensweise als Beispiel, bei der ich `home/youruser/docker-lamp/data` als Stammverzeichnis im Webserver nutze. Hierfür hatte ich die Variable `APP_BASEDIR` in der Datei `.env` wie folgt abgeändert.

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

Als erstes lege ich das Verzeichnis `/srv/www/joomla` an. `/srv/www` soll mein Webserver Stammverzeichnis sein. In den Unterordner `joomla` kommen zur besseren Übersicht alle Joomla Projekte.

In den meisten Server Setups ist es sinnvoll, dass derjenige, der die Dateien ändert, entweder Eigentümer ist oder zu einer Gruppe gehört, die Schreibrechte hat. So vermeidet man Konflikte mit Benutzerrechten, manchmal auch [`www-run`-Problem](https://www.joomla.ch/joomla-entdecken/anleitungen/99-joomla-und-das-wwwrun-problem) genannt.

Die nachfolgende Befehlskette stellt sicher, dass Ordner und Dateien die richtigen Rechte besitzen.

Als erstes stoppen wir den Server.

```
./docker-lamp shutdown
```

Wir kopieren den gesamten Inhalt des Verzeichnisses `docker-lamp/data` nach `/srv`.

```
sudo cp -r data/* /srv/
sudo rm -r data/
```

`chown` steht für `change owner` und änder den Besitzer von `/srv/www/`.

```
sudo chown -R deinBenutzer:deinBenutzer /srv/www/
```

> Zur Erinnerung `whoami` zeigt dir deinen Benutzer. `groups` zeigt dir, in welchen Gruppen du bist.

###### Am Ende sollte dies für die Entwicklung mit Joomla vorhanden sein

1. In der Root sollte das Verzeichnis `srv` dem Benutzer `root` gehören.

```
$ ll
..
drwxrwxr-x   9 root root       4096 Mai 17 14:50 srv/
...
```

2. Das Verzeichnis `/srv` enthält folgende Struktur:

```
$ ll
insgesamt 40
drwxrwxr-x  9 root   root   4096 Mai 17 14:50 ./
drwxr-xr-x 20 root   root   4096 Apr 26 08:54 ../
drwxrwxr-x  2 root   root   4096 Mai 17 01:12 apache24/
drwxrwxr-x  3 root   root   4096 Mai 17 13:28 ca/
drwxrwxr-x  3 root   root   4096 Mai 17 01:12 httpd/
drwxrwxr-x  2 root   root   4096 Mai 17 03:44 initDB/
drwxrwxr-x  7 root   root   4096 Mai 17 01:12 php/
drwxrwxr-x  2 root   root   4096 Mai 15 05:36 phpinfo/
-rw-rw-r--  1 root   root    144 Mai 15 05:36 README.md
drwxrwxr-x  5 deinBenutzer deinBenutzer 4096 Mai 17 03:44 www/
```

3. Das Verzeichnis `home/youruser/docker-lamp/data` sieht wie folgt aus:

```
$ ll
insgesamt 28
drwxrwxr-x 5 youruser youruser 4096 Mai 17 03:44 ./
drwxrwxr-x 9 root   root   4096 Mai 17 14:50 ../
-rw-rw-r-- 1 youruser youruser 3981 Mai 17 01:12 htaccess.txt
drwxrwxr-x 2 youruser youruser 4096 Mai 17 03:45 joomla/
-rw-rw-r-- 1 youruser youruser   35 Mai 15 05:36 README.md
drwxrwxr-x 2 youruser youruser 4096 Mai 15 05:36 wp/
drwxrwxr-x 2 youruser youruser 4096 Mai 15 05:36 wp-multisite/
```

> Wer für Wordpress entwickeln möchte, legt analog zum `joomla`-Ordner die von docker-lamp vorgesehen Verzeichnisse `wp` und `wp-multisite` an.

###### Abschlusstest

Zum Test den Befehl `./docker-lamp start` im Verzeichnis `docker-lamp` aufrufen, um den Server neu zu starte.

Im Webbrowser sollte nun die URL `https://joomla.test/` oder `https://joomla.local/` das folgende Bild zeigen - ich habe bereits die beiden Verzeichnisse `j4dev` und `j3dev` im Verzeichnis `joomla` angelegt.

![Webserver Oberfläche](/images/joomlalocal1.png)

#### Joomla installieren<!-- \index{Joomla! Installation} -->

Jenachdem, ob du mit der Entwicklerversion von Joomla arbeitest oder eine stabile Variante nutzt, unterscheidet sich die Installation.

##### Entwicklungsversion

###### Joomla 4

Die Developement Versionen klonen wir von Github in den Unterordner `joomla` des Webserver-Stammverzeichnises, genau in das Verzeichnis `./data/joomla`.

Ich wechsele dazu in den Ordner `./data/joomla` und setze den folgenden Aufruf ab.

```
cd ./data/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b 4.2-dev

```

> `4.2-dev` steht für den Zweig. Unter Umständen möchtest du eine andere Version verwenden. Ändere in diesem Fall einfach dies Angabe ab. In früheren Versionen war es so, dass der aktuelle Zweit immer `staging` benannt war. Dies hat sich mit Joomla in Version 4.0 geändert.

Als Ergebnis sehe ich:

```
./data/joomla$ ll
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

Der nachfolgende Befehl führt `composer install` im Verzeichnis `./data/joomla/j4dev` des `docker-lamp_php81`-Containers als Benutzer `1000` aus.

> Eine eventuelle lokale Installation von _Composer_ ist verwendbar. Dazu auf dem Rechner in das `j4dev` Verzeichnis wechseln und dort den Befehl [`composer install`](https://getcomposer.org/doc/03-cli.md#install-i) aufrufen.

```
docker exec -it --user 1000 -w /srv/www/joomla/j4dev docker-lamp_php74 composer install
```

> Alternativ könntest du die docker-lamp Befehle verwenden: `./docker-lamp cli php81` ist eine Hilfe für diejenigen, die die Docker-Befehle nicht kennen. `./docker-lamp cli php81` bewirkt das gleiche wie `docker exec -ti docker-lamp_php81 sh`. Es öffent sich eine Shell und du kannst direkt im Container in das korrekte Unterverzeichnis wechseln und den Befehl `composer install` aufrufen.

> Composer ist in den Containern mit PHP 7.3 (docker-lamp_php73), 7.4 (docker-lamp_php74), 8.1 (docker-lamp_php81 und 8.2 (docker-lamp_php82) verfügbar.

Der nachfolgende Befehl führt `npm ci` im Verzeichnis `./data/joomla/j4dev` des `docker-lamp_php81` Containers als Benutzer `1000` aus. Wir möchten `npm` aber nicht dauerhaft im Container haben. Deshalb löschen wir es anschließen. Dies bewirkt der Parameters `--rm`.

> Eventuelle lokale Installationen von _Node.js_ beziehungsweise _npm_ sind verwendbar. Dazu auf dem Rechner in das `j4dev` Verzeichnis wechseln und dort den Befehl [`npm ci`](https://docs.npmjs.com/cli/v6/commands/npm-ci) aufrufen.

```
$ docker run --rm -it --user 1000 -v /home/youruser/docker-lamp/data/www/joomla/j4dev:/home/youruser/docker-lamp/data/www/joomla/j4dev -w /home/youruser/docker-lamp/data/www/joomla/j4dev node:latest npm ci

```

Ich überprüfe die Ausgabe erneut im Browser. `https://j4dev/joomla.local` oder `https://j4dev.joomla.test` sind die passenden URLs.

![Joomla 4 Oberfläche nach dem Einrichten der Entwicklungsumgebung](/images/j4dev2.png)

Voilá! Joomla ist bereit für die Installation.

###### Besonderheiten bei der Installation von Joomla

Die MySql-Datenbank von _docker-lamp_ befindet sich im Container `mysql`. So geben wir als Datenbank-Server `mysql` an.

![Datenbankkonfiguration bei der Installation](/images/installmysql.png)

Aus Sicherheitsgründen ist es erforderlich bei einer Installation eine Datei im Installationsverzeichnis zu löschen, falls der Datenbank-Server nicht derselbe ist, wie der Webserver. Die Installationsroutine sagt dir genau, welche Datei du löschen sollt.

![Meldung bei der Installation](/images/installdelfile.png)

###### Joomla 3

Analog zur Installation der Joomla 4 Entwicklerversion wende ich die nachfolgenden Befehle an.

```
cd ./data/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b 3.10-dev

mv joomla-cms/ j3dev
```

> `3.10-dev` steht für den Zweig. Unter Umständen möchtest du eine andere Version verwenden. Ändere in diesem Fall einfach dies Angabe ab. In früheren Versionen war es so, dass der aktuelle Zweit immer staging benannt war. Dies hat sich mit Version 4.0 geändert.

Ich sehe mir das Ergebnis im Browser an. `https://j3dev.joomla.local` oder `https://j3dev.joomla.test` sind die passenden URLs für das Verzeichnis.

![Joomla 3 Oberfläche](/images/j3dev1.png)

Die Installationroutine von Joomla öffnet sich.

##### Stabile Versionen

Im Falle einer stabilen Version besorge ich mir das ZIP File von [Github](https://github.com/joomla/joomla-cms/releases) und entpacke es im Ordner `./data/joomla`.

Wenn das Paket entpackt ist, benenne ich es um. Der Name `j3` bedeute bei mir, dass dies die letzte stabile Version der 3er-Reihe ist. `joomla-cms` würde mir nichts über die Version sagen.

```
mv joomla-cms/ j3
```

Für die Installation ist alles bereit.

#### Was bietet docker-lamp

Ich habe Joomla im Container `docker-lamp_php81` installiert. Zur Verfügung steht es mir in allen unterstützten PHP-Versionen.

##### Ein kleiner Rundgang zum Orientieren

Eine Befehlszeile des Containers `docker-lamp_php81` öffne ich über `docker exec -ti docker-lamp_php81 sh` oder alternativ könnte ich den `docker-lamp`-Befehl verwenden: `./docker-lamp cli php81`. Voraussetzung ist, dass `docker-lamp` gestartet ist!

```
$ docker exec -ti docker-lamp_php81 sh
php81:./data# 
```

`cat /etc/issue` im Container aufgerufen zeigt mir das Betriebssystem und die Version.

```
php81:./data# cat /etc/issue
Welcome to Alpine Linux 3.15
Kernel \r on an \m (\l)
```

Mittels `php -i | grep php.ini` finde ich heraus, welche `php.ini` geladen wird.

```
php81:./data# php -i | grep php.ini
Configuration File (php.ini) Path => /usr/local/etc/php
Loaded Configuration File => /usr/local/etc/php/php.ini
```

> Im Container ist als Editor [_vi_](https://de.wikipedia.org/wiki/Vi) verfügbar. Mein Spickzettel mit den wichtigsten Befehlen zum _vi_: `:w` = Speichern der Datei. `:q` = Verlassen des vi (nur nach Speichern). `:wq` = Speichern und Verlassen. `:q!` = Verlassen ohne zu speichern.

Aus dem Container komme ich via `exit` wieder heraus.

```
php81:./data# exit
$
```

Die Namen der Container erfahre ich mittels `docker ps`.

```
$ docker ps
CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS         PORTS                                                                                                                                                                                                                                                                                                                                                                                              NAMES
ed6d95aacc7b   degobbis/apache24-alpine:latest     "/httpd-php-entrypoi…"   4 minutes ago   Up 4 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp, 0.0.0.0:8074->8074/tcp, :::8074->8074/tcp, 0.0.0.0:8080-8081->8080-8081/tcp, :::8080-8081->8080-8081/tcp, 0.0.0.0:8400->8400/tcp, :::8400->8400/tcp, 0.0.0.0:8474->8474/tcp, :::8474->8474/tcp, 80/tcp, 0.0.0.0:8481-8481->8481-8481/tcp, :::8481-8481->8481-8481/tcp, 0.0.0.0:80->8074/tcp, :::80->8074/tcp, 0.0.0.0:443->8474/tcp, :::443->8474/tcp   docker-lamp_apache24
1bf108900cac   degobbis/php74-fpm-alpine:latest    "/httpd-php-entrypoi…"   4 minutes ago   Up 4 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php74
caf2bdf3aa2e   degobbis/php81-fpm-alpine:latest    "/httpd-php-entrypoi…"   4 minutes ago   Up 4 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php81
c6a0d78ea55e   degobbis/php81-fpm-alpine:latest    "/httpd-php-entrypoi…"   4 minutes ago   Up 4 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php81
57835bd12bd9   phpmyadmin/phpmyadmin:fpm-alpine    "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_phpmyadmin
2e85cb90f4a0   degobbis/mariadb105-alpine:latest   "/docker-entrypoint …"   4 minutes ago   Up 4 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp                                                                                                                                                                                                                                                                                                                                                          docker-lamp_db
d2448e023193   mailhog/mailhog:latest              "MailHog"                4 minutes ago   Up 4 minutes   0.0.0.0:1025->1025/tcp, :::1025->1025/tcp, 0.0.0.0:8025->8025/tcp, :::8025->8025/tcp                                                                                                                                                                                                                                                                                                               docker-lamp_mailhog
0edd21e01428   cytopia/bind:0.15                   "/docker-entrypoint.…"   4 minutes ago   Up 4 minutes   0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp, :::53->53/tcp, :::53->53/udp                                
```

##### Unterstützte PHP Versionen

Die Konfiguration zeigt, welche PHP-Versionen unterstützt werden. Die Konfiguration findest du im Verzeichnis `DEINPFADZUDOCKERLAMP/docker-lamp/docker-lamp/.config/php`.

Konkret ist das

- PHP 5.6 (https://joomla.local:8456/phpinfo/)
- PHP 7.3 (https://joomla.local:8473/phpinfo/)
- PHP 7.4 (https://joomla.local:8474/phpinfo/)
- PHP 8.1 (https://joomla.local:8481/phpinfo/)


> Bei den PHP-Versionen in der Auflistung stehen keine Minor-Versionen. Diese werden zeitnah aktualisiert und ändern sich somit permanent.

##### Port-Verlinkungen und PHP-Versionen

Standard ist PHP Version 7.4.x. Dies erkennt man daran, das der Port `8074` standardmäßig mit `443` gemappt ist, in der `compose.yml`.

```
...
  apache24:
    image: degobbis/apache24-alpine:latest
    container_name: docker-lamp_apache24
    hostname: apache24
    links: 
      - "bind"
      - "phpmyadmin"
      - "php74"
      - "php81"
      - "php81"
    volumes:
      - /home/youruser/docker-lamp/docker-lamp/.config/httpd/apache24/conf.d:/usr/local/apache2/conf.d:rw
      - /home/youruser/git:/home/youruser/git:rw
      - /home/youruser/docker-lamp/docker-lamp/.config/httpd/apache24/vhosts:/usr/local/apache2/vhosts:rw
      - /srv:/srv:rw
      - pma:/var/www/pma
      - phpsocket:/run/php
    ports: 
      - "80:8074"
      - "443:8474"
      - "8000:8000"
      - "8400:8400"
      - "8074:8074"
      - "8474:8474"
      - "8080:8080"
      - "8481:8481"
      - "8081:8081"
      - "8481:8481"
    environment:
      TZ: Europe/Berlin
      LC_ALL: de_DE.UTF-8
      APP_USER_ID: 1000
      APP_GROUP_ID: 1000
    dns:
      - 172.16.238.100
    networks:
      net:
        ipv4_address: 172.16.238.10
...
```

Eine spezielle PHP Version adressiert man über den Port. Beispielsweise wählt man https://joomla.local:8481/phpinfo/ für PHP 8.1.x oder https://joomla.local:8456/phpinfo/ wenn man PHP 5.6.x überprüfen möchte.

![phpinfo() in PHP 5.6.40](/images/phpinfo56.png)

![phpinfo() in PHP 8.1.1](/images/phpinfo_80.png)

###### PHPInfo()

Ein praktisches Feature ist, dass `phpinfo()` für jede PHP-Version und jede Domain oder Subdomain vom System bereitgestellt wird. Dazu reicht es, die Domain mit dem Unterverzeichnis `/phpinfo` aufzurufen.

Der Aufruf

```
https://j4dev.joomla.local:8481/administrator/index.php?option=com_admin&view=sysinfo
```

zeigt die Systeminformationen der Joomla Installation. Man sieht, dass PHP 8.1 ausgeführt wird.

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

PHP 8.1 verwendet

- xdebug 3.1.0-dev

##### Parameter

Die in _xdebug_ eingestellten Parameter findet man in der PHP Konfiguration.

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
;xdebug.remote_log = ./data/xdebug.log

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
;xdebug.log = ./data/xdebug.log

; xdebug.client_host is set automaticaly by entrypoint.
; If it not works, it can be overridden here with the
; host network IP like this
;xdebug.client_host=192.168.0.100
```

> Man beachte die Angaben `xdebug.remote_port = 10000` beziehungsweise `xdebug.client_port = 10000`, die in der Konfiguration der IDE oder des Browser Plugins benötigt werden.

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

Die Installation von Git im Container erfolgt für den Container `docker-lamp_php81` via:

```
$ docker exec -it docker-lamp_php81 apk add git
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

Bei der Installation von Joomla wird ein Datenbankserver abgefragt. Verwendet man _docker-lamp_ ist der Name des Datenbank Containers anzugeben. Dieser ist schlicht und einfach `mysql`. Diese Information findet man in der Datei `compose.yml`.

```
...
  mariadb105:
    image: degobbis/mariadb105-alpine:latest
    container_name: docker-lamp_db
    hostname: mysql
    volumes:
      - db-data-dir:/var/lib/mysql
      - /srv/initDB:/docker-entrypoint-initdb.d
    environment:
      TZ: Europe/Berlin
      LC_ALL: de_DE.UTF-8
      MYSQL_ROOT_PASSWORD: root
      APP_USER_ID: 1000
      APP_GROUP_ID: 1000
      INIT_DB_BY_SCRIPT: 1
    ports:
      - "3306:3306"
    networks:
      net:
        ipv4_address: 172.16.238.8
...
...
  phpmyadmin:
    image: phpmyadmin/phpmyadmin:fpm-alpine
    container_name: docker-lamp_phpmyadmin
    hostname: phpmyadmin
    links:
      - mariadb105
    volumes:
      - /home/youruser/docker-lamp/docker-lamp/.config/phpmyadmin/config.user.inc.php:/etc/phpmyadmin/config.user.inc.php:rw
      - pma:/var/www/html
    environment:
      TZ: Europe/Berlin
      LC_ALL: de_DE.UTF-8
      PMA_HOST: mysql
      PMA_PORT: 3306
      MAX_EXECUTION_TIME: 600
      MEMORY_LIMIT: 512M
      UPLOAD_LIMIT: 512M
      MYSQL_ROOT_PASSWORD: root
    networks:
      net:
        ipv4_address: 172.16.238.7
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
    container_name: docker-lamp_mailhog
    hostname: mailhog
    ports:
      - "8025:8025"
      - "1025:1025"
    networks:
      net:
        ipv4_address: 172.16.238.9
...
```

<img src="https://vg02.met.vgwort.de/na/7867d0b1258a493da7b0effcef2cc5a8" width="1" height="1" alt="">
