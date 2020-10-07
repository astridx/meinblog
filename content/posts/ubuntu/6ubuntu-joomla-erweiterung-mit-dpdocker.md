---
date: 2020-08-07
title: 'Eine eigene Joomla-Erweiterung mit DPDocker'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: joomla-erweiterung-mit-dpdocker
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

Zur Erinnerung: _Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht. _DPDocker_ enthält vorgefertigte Images, Container und Skripte, die dich bei der Entwicklung mit und für Joomla unterstützen.

DPDocker bietet den Task `build`, mit dem Joomla Erweiterungen optimal integriert werden. Dazu ist es erforderlich, Regeln einzuhalten. Bei einer neuen Erweiterung würde dies Voraussetzungen beachten. Das Umbauen meiner Erweiterungen wäre aufwendig. In diesem Kapitel führe ich mit [jorobo](https://packagist.org/packages/astridx/jorobo) erstellte Extension mit DPDocker zusammen. So kann ich weiterhin meine Skripte zum Mappen, Builden, Zippen und Testen anwenden.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten) und [Docker Compose](/ubuntu-docker-compose-einrichten) ist [DPDocker](https://github.com/Digital-Peak/DPDocker.git) notwendig. Wenn du diesem [Set](mein-ubuntu-rechner/) bisher gefolgt bist, passt alles.

## Installieren von Composer und PHP

### Installieren von Abhängigkeiten

Aktualisieren wir den Cache des Paketmanagers und installieren die erforderlichen Abhängigkeiten, einschließlich `php-cli`:

```
sudo apt update
sudo apt install php-cli unzip
```

### Herunterladen und Installieren von Composer

Wir rufen das [Composer Installationsprogramm](https://getcomposer.org/installer) mit `curl` auf:

```
cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php

```

Jetzt überprüfen wir, ob das heruntergeladene Installationsprogramm mit dem SHA-384-Hash übereinstimmt.

Mithilfe von `curl` rufen wir die neueste Signatur ab und speichern diese in einer Shell-Variable:

```
HASH=`curl -sS https://composer.github.io/installer.sig`

```

Der folgende PHP-Codeprüft das Installationsskript und gibt `Installer verified` aus, wenn alles korrekt ist.

```
php -r „if (hash_file(‚SHA384‘, ‚composer-setup.php‘) === ‚$HASH‘) { echo ‚Installer verified‘; } else { echo ‚Installer corrupt‘; unlink(‚composer-setup.php‘); } echo PHP_EOL;“

```

Über folgenden Befehl wird Composer global (unter `/usr/local/bin` heruntergeladen) installiert:

```
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

```

Ich teste die Installation mit:

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

Damit ist überprüft, dass Composer erfolgreich auf dem System installiert und systemweit verfügbar ist.

### PHP unter Ubuntu 20.04 intallieren inklusive notwendiger Erweiterungen

```bash
sudo apt update
sudo apt install php php-cli php-fpm php-json php-pdo php-mysql php-zip php-gd  php-mbstring php-curl php-xml php-pear php-bcmath
```

```bash
php -- version
```

## Clonen einer mit Jorobo erstellten Joomla Erweiterung

Als nächstes clone ich eines meiner Repositorys, in welchem sich eine Joomla Erweiterung befindet. Ich achte darauf, dass das Repo **neben** DPDocker abgelegt wird.

```bash
git clone  https://github.com/astridx/boilerplate.git
```

Als nächstes wechsele ich in den Ordner `boilerplate` und führe den Befehl aus, der alle notwendigen Abhängigkeiten herunterlädt.

```bash
cd boilerplate

composer install
```

Jetzt sind alle Abhängikeiten im Verzeichnis `vendor` abgelegt.

## Joomla Erweiterung erstellen

Ich verwende `vendor/bin/robo build`. Im Ergebnis sehe ich das Unterverzeichnis `dist`, in dem sich gepackte Installationsdateien befinden.

```bash
vendor/bin/robo build
```

Der Befehl `vendor/bin/robo list` zeigt mir alle möglichen Skripte an.

```bash
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

> In der [Präsentation](https://astridx.github.io/9997_jorobo/presentation/index.html#/) sind die Befehle beschrieben.

## Joomla Erweiterung mit DPDocker nutzen

Jetzt wechsele ich wieder ein Verzeichnis zurück - in das Verzeichnis, in dem `boilerplate` und `DPDocker` nebeneinader abgelegt sind. Hier rufe ich [./DPDocker/webserer/run.sh mysql rebuild](https://github.com/Digital-Peak/DPDocker/tree/master/webserver#execute) auf, wobei die Parameter optional sind:

```bash
./DPDocker/webserer/run.sh mysql rebuild
```

Mein Rechner arbeitet einige Minuten. In der Zeit erstellt er alle notwendigen Docker Container.

## Mögliche Fehlermeldungen

### Hilfe bei der Meldung: `Docker Error bind: address already in use`

Unter Umständen hilft es schon, alle Container zu entfernen.

```bash
docker rm $(docker ps -a - q)
```

Falls das problem weiterhin auftritt, lasse ich mir alle Dienste anzeigen, die den Port verwenden.

```bash
sudo lsof -i -P -n | grep <port number>
```

Unter Ubuntu 20.04 stoppe ich diese Dienst mit

```bash
sudo kill <process id>
```
