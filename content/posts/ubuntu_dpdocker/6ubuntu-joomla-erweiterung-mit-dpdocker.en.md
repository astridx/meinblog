---
description: 'desc'
shortTitle: 'short'
date: 2020-08-07
title: 'A custom third party Joomla extension with DPDocker'
template: post
thumbnail: '../../thumbnails/dp_logo.png'
slug: en/joomla-erweiterung-mit-dpdocker
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

As a reminder, [_Docker_](/ubuntu-dpdocker/) makes it easier to manage software in containers. [_Docker Compose_](/ubuntu-docker-compose-einrichten) is a tool that simplifies working with multiple containers. [_DPDocker_](/ubuntu-dpdocker) contains pre-built images, containers and scripts to help you develop with and for Joomla.

DPDocker offers the task `build`, with which Joomla extensions are optimally integrated. For this, it is necessary to follow rules. For a new extension, I would observe these. Rebuilding my already finished extensions would be costly. In this chapter, I merge an extension created with [jorobo](https://packagist.org/packages/astridx/jorobo) with DPDocker. This way I can continue to use my scripts for mapping, building, zipping and testing.

## Requirements

Besides [Docker](/ubuntu-docker-setup) and [Docker Compose](/ubuntu-docker-compose-setup), [DPDocker](https://github.com/Digital-Peak/DPDocker.git) is necessary. If you have followed this [set](my-ubuntu-computer-themes/) so far, everything fits.

## Installing Composer and PHP

Composer is required to download [jorobo](https://packagist.org/packages/astridx/jorobo) with the package manager.

### Installing dependencies

First, we update the package manager cache and install the required dependencies, including `php-cli`:

```
sudo apt update
sudo apt install php-cli unzip
```

### Downloading and installing Composer

We fetch the [Composer installer](https://getcomposer.org/installer) with `curl`:

```
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php

```

Now we check that the downloaded installer matches the SHA-384 hash. Using `curl` we retrieve the latest signature and store it in a shell variable:

```
HASH=`curl -sS https://composer.github.io/installer.sig`

```

The following PHP code checks the installation script and outputs `Installer verified` if everything is correct.

```
php -r „if (hash_file(‚SHA384‘, ‚composer-setup.php‘) === ‚$HASH‘) { echo ‚Installer verified‘; } else { echo ‚Installer corrupt‘; unlink(‚composer-setup.php‘); } echo PHP_EOL;“

```

The next step is to install Composer globally (downloaded under `/usr/local/bin`) via:

```
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

```

I am testing the installation with:

```
composer

```

```
Output   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.10.5 2020-04-10 11:44:22

Usage:
  command [options] [arguments]

Options:
  -h, --help                     Display this help message
  -q, --quiet                    Do not output any message
  -V, --version                  Display this application version
      --ansi                     Force ANSI output
      --no-ansi                  Disable ANSI output
  -n, --no-interaction           Do not ask any interactive question
      --profile                  Display timing and memory usage information
      --no-plugins               Whether to disable plugins.
  -d, --working-dir=WORKING-DIR  If specified, use the given directory as working directory.
      --no-cache                 Prevent use of the cache
  -v|vv|vvv, --verbose           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
...

```

This ensures that Composer is successfully installed and available system-wide.

### Installing PHP under Ubuntu 20.04 including necessary extensions

```
sudo apt update
sudo apt install php php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd  php-mbstring php-curl php-xml php-pear php-bcmath
```

```
php -- version
```

## Clone a Joomla extension created with Jorobo.

> Do you want to create an extension yourself? Here you can find an introduction: [Jrobo Workshop](https://astridx.github.io/9997_jorobo/presentation/index.html#/).

Next, I clone one of my repositories that contains a Joomla extension. I make sure that the repo is stored in a directory **next to** DPDocker. This is important because DPDocker looks for extensions here!

```
git clone  https://github.com/astridx/boilerplate.git
```

> Alternatively, you can use the Joomla sample extension [Weblinks](https://github.com/joomla-extensions/weblinks), which also uses Jorobo.

Then I switch to the folder `boilerplate` and execute the command that downloads all the necessary dependencies.

```
cd boilerplate

composer install
```

Now all dependencies are present in the `vendor` directory.

## Create Joomla extension

I use `vendor/bin/robo build`. In the result I see the subdirectory `dist` where the packed installation file is located.

```
vendor/bin/robo build
```

The command `vendor/bin/robo list` shows me all possible commands.

```
vendor/bin/robo list

...
Available commands:
  build     Build the joomla extension package
  bump      Bump Version placeholder __DEPLOY_VERSION__ in this project. (Set the version up in the jorobo.ini)
  generate  Generate an extension skeleton - not implemented yet
  headers   Update copyright headers for this project. (Set the text up in the jorobo.ini)
  help      Displays help for a command
  list      Lists commands
  map       Map into Joomla installation.
  umap      Unmap from Joomla installation.
```

> The commands are briefly explained in the [presentation](https://astridx.github.io/9997_jorobo/presentation/index.html#/).

With `vendor/bin/robo map \path-to-your-joomla` symlinks to the Joomla installation `path-to-your-joomla` are set. This is handy. This way you can edit the files in your development directory and test the result directly in Joomla.

It is not possible to symlink into a container straight away, so `vendor/bin/robo map` cannot be used easily. DPDocker offers an ideal environment with the [`webserver` function](https://github.com/Digital-Peak/DPDocker/tree/master/webserver#webserver-task).

## Using the Joomla extension with the DPDocker webserver

Now I change back one directory - to the directory where `boilerplate` and `DPDocker` are stored side by side. Here I call [./DPDocker/webserer/run.sh mysql rebuild](https://github.com/Digital-Peak/DPDocker/tree/master/webserver#execute):

```
./DPDocker/webserer/run.sh
```

My computer works for a few minutes. In that time, it creates all the necessary Docker containers.

> If you want to test a special database version, this is possible with [optional parameters](https://github.com/Digital-Peak/DPDocker/tree/master/webserver#execute).

When everything is created, I reach a [page](https://github.com/Digital-Peak/DPDocker/blob/main/webserver/scripts/index.php) via [http://localhost] in the browser, which lists all available Joomla installations.

## Possible error messages

### Help with the message: `Docker Error bind: address already in use`

It may help to remove all containers so that they are rebuilt the next time I run `./DPDocker/webserer/run.sh`.

```
docker rm $(docker ps -a - q)
```

If the problem persists, I check all services that use the port.

```
sudo lsof -i -P -n | grep <port number>
```

Depending on which service I identify as the culprit, I stop it via

```
sudo service SERVICE stop
```

If I do not succeed in identifying the blocking service, I remove it via `kill`. Under Ubuntu 20.04, I use

```
sudo kill <process id>
```

> I can find the number of the process in the output of `sudo lsof -i -P -n | grep <port number>`.
