---
date: 2021-02-06
title: 'docker-lamp einrichten'
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

In addition to [Docker](/ubuntu-docker-set-up-docker-lamp), [Docker Compose](/ubuntu-docker-compose-set-up-docker-lamp) is necessary. If you have followed this [Set](/my-ubuntu-computer-with-docker-lamp-themes/) so far, everything is fine.

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
git clone https://github.com/degobbis/docker-lamp.git
```

Next I change to the folder `docker-lamp`.

```
cd docker-lamp
```

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

In the file `.env` I assign the parameter `REMOTE_HOST_IP=` with the IP of my own computer. In my case this is `192.168.178.138`. The entire entry is: `REMOTE_HOST_IP=192.168.178.138`. The end of the file now looks like the following block.

```
...
...
# To use PHP xDebug set your host IP here (192.168.0.100)
#
REMOTE_HOST_IP=192.168.209.138
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
    inet 192.168.209.138/24 brd 192.168.209.255 scope global dynamic noprefixroute ens33
       valid_lft 1248sec preferred_lft 1248sec
    inet6 fe80::c526:e1ca:5b3e:7b1/64 scope link noprefixroute
       valid_lft forever preferred_lft forever
...
...
...
```

##### APP_BASEDIR

I use `/srv/www` as the root directory for the web server and therefore change the variable `APP_BASEDIR` later. I have described what else needs to be considered when using a custom web server root in [use docker-lamp](/en/ubuntu-docker-lamp-verwenden). For now to set it up, I leave `APP_BASEDIR=./data`.

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

Still in the `docker-lamp` folder, I call the command `make server-up`.

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

The command works for a few minutes the first time it is called, as all images are needed to be downloaded. Afterwards, they can be listed with `docker images -a`.

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

`docker ps -a` lists the following containers.

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

With the command `make server-down` I stop all containers. Before that, the data in the database is saved in the directory `/data/initDB`. The next time `make server-up` is called, the database dumps are read in the new created database container.

### Mapping your own projects into the container

#### The directory is flexible

If you are just creating the projects, the easiest way is to use the directory `/data/www` in the `docker-lamp` directory. This is also true if the location is changeable and you can easily move the projects. `/data/www` is automatically included in the container under `/srv/www` - if it has not been reassigned in the `.env`. In the latter case, the directory set in the variable `APP_BASEDIR` is the one that is linked into the container.

#### Multiple directories in the container - docker-compose.override.yml

In order to have more directories with your own web projects available in the container, it is necessary to overwrite the file `docker-compose.yml`. To do this, create a copy of `docker-compose.yml` under the name `docker-compose.override.yml` in the same folder. In the directory `docker-lamp` I enter the following command.

```
cp docker-compose.yml docker-compose.override.yml
```

> We use the file `docker-compose.override.yml` and do not directly change the file `docker-compose.yml` so that the next `docker-lamp` update does not overwrite the `docker-compose` configuration.

Now I open the file `docker-compose.override.yml` to edit.

```
nano docker-compose.yml docker-compose.override.yml
```

Assume that all projects in the directory `/home/youruser/git/joomla-development` are to be available in the containers. Relevant is every container that uses the root directory of a web server, because Joomla only runs there. In the containers, the projects should also be available under `/home/youruser/git/joomla-development`.

To find out where the root directory of the web server is mapped, I search for the following entry in the file `docker-compose.override.yml`.

```
      - ${APP_BASEDIR:-./data}:/srv:rw
```

In total, the entry is found six times. The containers
`httpd`, `php56`, `phpo73`, `php74`, `php80`and `mysql` are affected.

For the first five hits, I add the following line after this one. So for `httpd`, `php56`, `phpo73`, `php74` and `php80`. The container `mysql` does not need a connection to the project folder.

```
      - /home/youruser/git/joomla-development:/home/youruser/git/joomla-development:rw
```

For the `httpd` container, the entry looks like this:

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
      - /home/youruser/git/joomla-development:/home/youruser/git/joomla-development:rw
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

> For more information on using volumes with `compose`, see the [docker documentation](https://docs.docker.com/storage/volumes/#use-a-volume-with-docker-compose) or the [compose reference](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference).

Now I restart the server with `make server-up` so that the last changes are applied.

```
make server-up
```

The newly linked directory in my example is linked in the container under `/home/youruser/git/joomla-development`. I switch into the container with `docker exec -ti docker-lamp_php74 sh` and convince myself of this:

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

> The command `docker exec -ti docker-lamp_php74 sh` opens a command line in the container `docker-lamp_php74`. You can get out of it again via `exit`.

### Certificate

If the configuration of the certificates is changed, it is necessary to restart the server. It is best to call the command `make server-down` before making changes.

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

If you have changed anything in the configuration, delete the folder `APP_BASEDIR/ca/localdomains`. To continue working on `docker-lampp` we start the server again with `make server-up`.

```
make server-up
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

Depending on the configuration, an error may occur under Ubuntu 20.04 when calling `make server-up`.

### permission denied (but minica-root-ca.pem exists)

If the output of `make server-up` starts with the following text, permissions are not correct.

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

At the end, navigate back to the `docker-lamp` directory and redo the `make server-up` command.

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

Finally, we recreate the file with `sudo nano /etc/resolv.conf`. Then we enter two suitable `nameservers`, where `nameserver 192.168.178.2` is an example for the configuration of a Fritzbox, and change everything to suit our own circumstances.

```
nameserver 127.0.0.1
nameserver 192.168.178.2
```

It is important that the entry `nameserver 127.0.0.1` is in first place. After a restart, the `docker` container is used. If this is not available, reference is made to `nameserver 192.168.178.2`. This ensures that an internet connection is available even if the container is stopped.

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

Voila! That was it.

## Complete Set

1. [Preface](/en/ubuntu-vorwort-docker-lamp)
2. [Git](/en/ubuntu-git-einrichten-docker-lamp)
3. [Docker](/en/ubuntu-docker-einrichten-docker-lamp)
4. [Docker Compose](/en/ubuntu-docker-compose-einrichten-docker-lamp)

-> 5. [Set up docker-lamp](/en/ubuntu-docker-lamp-einrichten)

6. [Use docker-lamp](/en/ubuntu-docker-lamp-verwenden)
7. [docker-lamp with own projects](/en/ubuntu-docker-lamp-verwenden-eigene-projekte)
8. [Visual Studio Code](/en/ubuntu-vscode-docker-lamp)
9. [docker-lamp with own Domain](/en/ubuntu-docker-lamp-verwenden-eigene-domain)

<img src="https://vg02.met.vgwort.de/na/74aa730a21cd40e08180bb49ba5e34fb" width="1" height="1" alt="">
