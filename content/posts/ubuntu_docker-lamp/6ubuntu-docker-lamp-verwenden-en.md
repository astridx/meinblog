---
description: 'desc'
shortTitle: 'short'
date: 2021-02-07
title: 'Use docker-lamp'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-lamp-verwenden
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

This is about _docker-lamp_. A software that provides pre-built images, containers and scripts to help with development on a web server. In the last part we set up the environment. Now I install Joomla in different versions. In the next part, I will add one of my projects.

## Requirements

Besides [Docker](/en/ubuntu-docker-einrichten-docker-lamp), [Docker Compose](/en/ubuntu-docker-compose-einrichten-docker-lamp) is necessary. If you have followed this [set](/en/mein-ubuntu-rechner-mit-docker-lamp-themen/) so far, everything is fine.

## use docker-lamp

If the server has been shut down in the meantime, start it via `./docker-lamp start` in the directory `docker-lamp`.

In the web browser, the URL `https://joomla.test/` or `https://joomla.local/` should now show something like the following picture. In the following image you see the view after the two directories `j4dev` and `j3dev` have been created in the directory `joomla`.

![Web server interface](/images/joomlalocal1.png)

### Set up web server environment

#### Using the default

If you use the `/www` directory, which exists under `/docker-lamp/data/www`, as the root directory of the web server, you can skip this section and modify my description for it. These refer to `/srv/www`.

#### Setting up the root directory of the web server under /srv/www

I describe my procedure as an example using `/srv/www` as the root directory in the web server.

In this case, the variable `APP_BASEDIR` in the file `.env` must be changed as follows.

```
...
...
# Set Your projekt folder for websites
#
APP_BASEDIR=/srv
...
...
```

> The `data` directory under `docker-lamp` is the basis for the project folder for websites and configurations. To outsource this, one can use this folder as skeleton.

> An easier alternative is to copy the directory `/www` which can be found under `/docker-lamp/data/www` to `/srv`. Then you have the directories provided by _docker-lamp_ as standard. Only the permissions have to be taken into account.

First I create the directory `/srv/www/joomla`. `/srv/www` should be my webserver root directory. The subfolder `joomla` will contain all Joomla projects for a better overview. Logical, right?

In most server setups it makes sense that the person who changes the files is either the owner or belongs to a group that has write permissions. This way you avoid conflicts with user rights, sometimes called [`www-run`-problem](https://www.joomla.ch/joomla-entdecken/anleitungen/99-joomla-und-das-wwwrun-problem).

The following chain of commands ensures that folders and files have the correct rights.

First, we stop the server.

```
./docker-lamp shutdown
```

We copy the entire contents of the `docker-lamp/data` directory to `/srv`.

```
sudo cp -r data/* /srv/
sudo rm -r data/
```

`chown` stands for `change owner` and changes the owner of `/srv/www/`.

```
sudo chown -R youruser:youruser /srv/www/
```

> As a reminder, `whoami` shows you your user. `groups` shows you which groups you are in.

##### In the end, this should be there for Joomla development

1. In the root, the directory `srv` should belong to the user `root`.

```
$ ll
..
drwxr-xr-x   4 root root       4096 Feb  3 17:42 srv/
...
```

2. The directory `/srv` contains the following structure:

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
drwxr-xr-x  5 youruser youruser 4096 Apr  8 18:57 www/

```

3. The directory `/srv/www` looks like this:

```
/srv/www$ ll
insgesamt 24
drwxr-xr-x 5 youruser youruser 4096 Apr  8 18:57 ./
drwxr-xr-x 8 root   root   4096 Apr  8 18:59 ../
drwxr-xr-x 2 youruser youruser 4096 Apr  8 18:57 joomla/
-rw-r--r-- 1 youruser youruser   35 Apr  8 18:57 README.md
drwxr-xr-x 2 youruser youruser 4096 Apr  8 18:57 wp/
drwxr-xr-x 2 youruser youruser 4096 Apr  8 18:57 wp-multisite/

```

> If you want to develop for Wordpress, create the directories `wp` and `wp-multisite` intended by _docker-lamp_ similar to the `joomla` folder.

##### Final test

To test: run the command `./docker-lamp start` in the directory `docker-lamp` to restart the server.

In the web browser the URL `https://joomla.test/` or `https://joomla.local/` should now show the following image - I have already created the two directories `j4dev` and `j3dev` in the directory `joomla`.

![webserver interface](/images/joomlalocal1.png)

#### Installing Joomla

The installation process differs depending on whether you are working with the development version of Joomla or a stable version.

##### Developer version

###### Joomla 4

We clone the development versions from Github into the subfolder `joomla` of the web server root directory, exactly into the directory `/srv/www/joomla`.

To do this, I switch to the folder `/srv/www/joomla` and run the following command.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b 4.0-dev

```

As a result I see:

```
/srv/www/joomla$ ll
insgesamt 12
drwxr-xr-x  3 youruser youruser 4096 Feb  6 13:18 ./
drwxr-xr-x  3 youruser youruser 4096 Feb  6 13:08 ../
drwxrwxr-x 21 youruser youruser 4096 Feb  6 13:19 joomla-cms/
```

In order to recognise at first glance which Joomla it is, I give the directory a more descriptive name.

```
mv joomla-cms/ j4dev
```

> I use `j4dev` for the development version of Joomla 4. `j3`, or `j4` for the last stable version of the major release. `j4b6` for the 6th beta version of Joomla 4. I name the databases in the same way. This way everything is clear for me.

I look at the result in the browser. `https://j4dev.joomla.local` or `https://j4dev.joomla.test` are the right URLs.

![Joomla 4 Oberfläche vor dem Einrichten der Entwicklungsumgebung](/images/j4dev1.png)

So far so good! The [development environment](https://docs.joomla.org/J4.x:Setting_Up_Your_Local_Environment/de) is to be set up next.

> Why do I use the 1000 instead of `user` or `group` in the following commands? In Ubuntu, `1000` is the first ID created in the case of users and groups during installation. If you have installed the system yourself, you will have the ID 1000. You can check this with the command `id -u`.

We need Git to run Composer without errors and install the version management with the following command in the container `docker-lamp_php80`.

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

The following command runs `composer install` in the `/srv/www/joomla/j4dev` directory of the `docker-lamp_php80` container as user `1000`.

> A local installation of _Composer_ can be used. To do this, switch to the `j4dev` directory on the computer and call the command [`composer install`](https://getcomposer.org/doc/03-cli.md#install-i) there.

```
docker exec -it --user 1000 -w /srv/www/joomla/j4dev docker-lamp_php80 composer install
```

> Composer can be used in the containers with PHP 7.3 (docker-lamp_php73), 7.4 (docker-lamp_php74) and 8.0 (docker-lamp_php80).

The following command runs `npm ci` in the `/srv/www/joomla/j4dev` directory of the `docker-lamp_php80` container as user `1000`. However, we do not want `npm` to be permanently in the container. Therefore we delete it. This is what the parameter `--rm` does.

> Any local installations of _Node.js_ or _npm_ can be used. To do this, switch to the `j4dev` directory on the computer and call up the command [`npm ci`](https://docs.npmjs.com/cli/v6/commands/npm-ci) there.

```
docker run --rm -it --user 1000 -v /srv/www/joomla/j4dev:/srv/www/joomla/j4dev -w /srv/www/joomla/j4dev node:latest npm ci
```

I check the output again in the browser. `https://j4dev/joomla.local` or `https://j4dev.joomla.test` are the appropriate URLs.

![Joomla 4 interface after setting up the development environment](/images/j4dev2.png)

Voilá! Joomla is ready for installation.

###### Special features during the installation of Joomla

![Database configuration during installation](/images/installmysql.png)

![Message during installation](/images/installdelfile.png)

###### Joomla 3

Similar to the installation of the Joomla 4 developer version, I use the following commands.

```
cd /srv/www/joomla

git clone --depth 1 https://github.com/joomla/joomla-cms.git -b staging

mv joomla-cms/ j3dev
```

I look at the result in the browser `https://j3dev.joomla.local` or `https://j3dev.joomla.test` are the appropriate URLs for the directory.

![Joomla 3 interface](/images/j3dev1.png)

The installation routine of Joomla opens.

##### Stable versions

In case of a stable version, I get the ZIP file from [Github](https://github.com/joomla/joomla-cms/releases) and unpack it in the folder `/srv/www/joomla`.

When the package is unpacked, I rename it. For me, the name `j3` means that this is the last stable version of the 3 series. `joomla-cms` would tell me nothing about the version.

```
mv joomla-cms/ j3
```

Everything is ready for installation.

#### What does docker-lamp offer

I have installed Joomla in the container `docker-lamp_php80`. It is available to me in all supported PHP versions.

##### A short overview for orientation

I open a command line of the container `docker-lamp_php80` via `docker exec -ti docker-lamp_php80 sh`.

```
$ docker exec -ti docker-lamp_php80 sh
php80:/srv/www#
```

`cat /etc/issue` called in the container shows me the operating system and version.

```
php80:/srv/www# cat /etc/issue
Welcome to Alpine Linux 3.13
Kernel \r on an \m (\l)
```

Using `php -i | grep php.ini` I find out which `php.ini` is loaded.

```
php80:/srv/www# php -i | grep php.ini
Configuration File (php.ini) Path => /usr/local/etc/php
Loaded Configuration File => /usr/local/etc/php/php.ini
```

> The editor [_vi_](https://de.wikipedia.org/wiki/Vi) is available in the container. My cheat sheet with the most important commands for _vi_: `:w` = Save the file. `:q` = Exit the vi (only after saving). `:wq` = Save and exit. `:q!` = Exit without saving.

I can exit the container again via `exit`.

```
php80:/srv/www# exit
$
```

I find out the names of the containers using `docker ps`.

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

##### Supported PHP Versions

The [Configuration](https://github.com/degobbis/docker-lamp/tree/main/.config/php) shows which PHP versions are supported.

That is concretely

- PHP 5.6 (https://joomla.local:8456/phpinfo/)
- PHP 7.3 (https://joomla.local:8473/phpinfo/)
- PHP 7.4 (https://joomla.local:8474/phpinfo/)
- PHP 8.0 (https://joomla.local:8480/phpinfo/)

> The PHP versions in the list do not include minor versions. These are updated promptly and therefore change permanently.

##### Port links and PHP versions

The default PHP version is 7.4.x. This can be seen from the fact that port `8074` is mapped to `443` by default in `docker-compose.yml`, or the custom `docker-compose.override.yml`.

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

A specific PHP version is addressed via the port. For example https://joomla.local:8480/phpinfo/ for PHP 8.0.x or https://joomla.local:8456/phpinfo/ if you want to check PHP 5.6.x.

![phpinfo() in PHP 5.6.40](/images/phpinfo56.png)

![phpinfo() in PHP 8.0.1](/images/phpinfo_80.png)

###### PHPInfo()

A practical feature is that `phpinfo()` is provided by the system for each PHP version and each domain or subdomain. All that is needed is to call the domain with the subdirectory `/phpinfo`.

The request

```
https://j4dev.joomla.local:8480/administrator/index.php?option=com_admin&view=sysinfo
```

shows the system information of the Joomla installation. You can see that PHP 8.0 is running.

The request

```
https://j4dev.joomla.local:8456/administrator/index.php?option=com_admin&view=sysinfo
```

shows the system information of the Joomla installation. Joomla 4 cannot be run with PHP version 5.6. Therefore, you are greeted with "Sorry, your PHP version is not supported". Joomla 4 does not support PHP 5.6.x.

##### xdebug

##### Versions

PHP 5.6 used in February 2021

- xdebug 2.5.5

PHP 7.3 and PHP 7.4 used

- xdebug 2.9.8

PHP 8.0 used

- xdebug 3.1.0-dev

##### Parameters

The parameters set in _xdebug_ can be found in the [PHP configuration](https://github.com/degobbis/docker-lamp/tree/main/.config/php).

For xdebug 2 this is

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

For xdebug 3 this is

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

> Note `xdebug.remote_port = 10000` and `xdebug.client_port = 10000` respectively, which are required in the configuration of the IDE or the browser plugin.

##### Possible errors

###### Cloning failed using an ssh key for authentication, enter your GitHub credentials to access private repos

The following error indicates that Git is not installed in the container.

```
Installing joomla-projects/joomla-browser (v4.0.0.x-dev 679c0ce): Cloning 679c0cef9c
Cloning failed using an ssh key for authentication, enter your GitHub credentials to access private repos
Head to https://github.com/settings/tokens/new?scopes=repo&description=Composer+on+php74+2021-02-13+1333
to retrieve a token. It will be stored in "/home/virtual/.composer/auth.json" for future use by Composer.
Token (hidden):
```

The installation of Git in the container is done for the container `docker-lamp_php80` via:

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

### phpMyAdmin and MailHog

#### phpMyAdmin

[phpMyAdmin](https://www.phpmyadmin.net/) is a free tool designed for managing MySQL over the web.
The phpMyAdmin interface can be reached via `http://localhost:8000`.

The password for the user `root` is set in the file `.env`. By default it is `root`.

```
...
# Set MySQL root password
#
MYSQL_ROOT_PASSWD=root
...
```

![phpMyAdmin interface](/images/phpmyadmin.png)

When installing Joomla, a database server is requested. If you use _docker-lamp_ you have to enter the name of the database container. This is simply `mysql`. This information can be found in the file `docker-compose.yml`.

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

![Database configuration during installation](/images/installmysql.png)

#### MailHog

[MailHog](https://github.com/mailhog/MailHog) is an email testing tool for developers.

With `docker-lamp` emails can be viewed via the Mailhog interface if they were sent via PHP mail. The Mailhog interface can be reached via `http://localhost:8025`.

![MailHog interface](/images/mailhog.png)

If you want to see how the container is build, you can take a look at the file `docker-compose.yml`.

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

## Complete Set

1. [Preface](/en/ubuntu-vorwort-docker-lamp)
2. [Git](/en/ubuntu-git-einrichten-docker-lamp)
3. [Docker](/en/ubuntu-docker-einrichten-docker-lamp)
4. [Docker Compose](/en/ubuntu-docker-compose-einrichten-docker-lamp)
5. [Set up docker-lamp](/en/ubuntu-docker-lamp-einrichten)

-> 6. [Use docker-lamp](/en/ubuntu-docker-lamp-verwenden)

7. [docker-lamp with own projects](/en/ubuntu-docker-lamp-verwenden-eigene-projekte)
8. [Visual Studio Code](/en/ubuntu-vscode-docker-lamp)
9. [docker-lamp with own Domain](/en/ubuntu-docker-lamp-verwenden-eigene-domain)

<img src="https://vg02.met.vgwort.de/na/85e5c88e236543b79cfd517801609246" width="1" height="1" alt="">
