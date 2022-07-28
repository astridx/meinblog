---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-09
title: 'Set up Visual Studio Code for Joomla'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-vscode-docker-lamp
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
---

_Docker_ simplifies the administration of software in containers. _Docker Compose_ is a tool that simplifies working with multiple containers.

This is about _docker-lamp_ and specifically how special domains are created. _docker-lamp_ is a software that provides prebuilt images, containers and scripts to help you develop on a web server. In this part I document my configuration of Visual Studio Code.

## Requirements

Besides [Docker](/en/ubuntu-docker-set-up-docker-lamp), [Docker Compose](/en/ubuntu-docker-compose-set-up-docker-lamp) is necessary. If you have followed this [set](en/my-ubuntu-computer-with-docker-lamp-themes/) so far, everything is fine.

## Visual Studio Code

### Installation

Installiert habe ich [Visual Studio Code](https://code.visualstudio.com/).

1. Ich habe die Installationsdatei von der [Homepage](https://code.visualstudio.com/docs/setup/linux) kopiert.

2. Dann habe ich diese via `sudo apt install ./<file>.deb` installiert.

```
sudo apt install ./<file>.deb
```

> Wer eine grafische Benutzeroberfläche bevorzugt, öffnet Ubuntu Software, sucht nach "Visual Studio Code" und installiert die Anwendung per klick auf die angebotenecd Schalftläche.

### Extensions

#### PHP-Debug

[felixfbecker.php-debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug). Debug-Unterstützung für PHP mit XDebug.

##### Voraussetzungen im Browser Mozilla Firefox

Ich füge zu Firefox hinzu.

![Xdebug Helper for Firefox](/images/xdebug1.png)

![Xdebug Helper for Firefox](/images/xdebug4.png)

![Xdebug Helper for Firefox](/images/xdebug5.png)

![Xdebug Helper for Firefox](/images/xdebug6.png)

##### PHP Debug von Felix Becker installieren und konfigurieren

![PHP Debug von Felix Becker](/images/xdebug2.png)

![PHP Konfiguration hinzufügen](/images/xdebug3.png)

Die Standardkonfiguration passt bis auf eine Ausnahme, der `port` muss auf `10000` abgeändert werden.

```

    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for XDebug",
            "type": "php",
            "request": "launch",
            "port": 10000
        },
        {
            "name": "Launch currently open script",
            "type": "php",
            "request": "launch",
            "program": "${file}",
            "cwd": "${fileDirname}",
            "port": 10000
        }
    ]
}
```

##### Mit PHP Debug von Felix Becker in Visual Studio Code debuggen

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Firefox aktivieren](/images/xdebug7.png)

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code aktivieren](/images/xdebug8.png)

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code aktivieren](/images/xdebug9.png)

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code aktivieren](/images/xdebug10.png)

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code aktivieren](/images/xdebug11.png)

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code aktivieren](/images/xdebug12.png)

##### Mögliche Fehler

###### Listen EACCES: permission denied` on any port

![PHP Debug von Felix Becker in Visual Studio Code debuggen - Visual Code Fehler](/images/xdebugfehler.png)

#### phpcs

[ikappas.phpcs](https://marketplace.visualstudio.com/items?itemName=ikappas.phpcs). PHP CodeSniffer für Visual Studio Code.

#### PHP Intelephense

[bmewburn.vscode-intelephense-client](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client). PHP-Code-Intelligenz für Visual Studio Code.

#### PHPUnit

[emallin.phpunit](https://marketplace.visualstudio.com/items?itemName=emallin.phpunit). Führen Sie PHPUnit-Tests von VSCode aus.

#### php cs-fixer

#####

##### Visual Studio Code Erweiterung

[junstyle.php-cs-fixer](https://marketplace.visualstudio.com/items?itemName=junstyle.php-cs-fixer): Für den Fall, dass Sie sich für den [PSR-2: Coding Style Guide](https://www.php-fig.org/psr/psr-2/)) entscheiden. PHP CS Fixer Erweiterung für VS Code, php formatter, php code beautify tool, format html.

#### PHP Phan

(Analyzer) [tysonandre.php-phan](https://marketplace.visualstudio.com/items?itemName=TysonAndre.php-phan). Phan - statischer Analyzer für PHP, minimiert falsch-positive Ergebnisse.

#### phpmd

[linyang95.phpmd](https://marketplace.visualstudio.com/items?itemName=linyang95.phpmd). VS Code-Erweiterung für PHP, die phpmd verwendet.

#### EditorConfig für VS Code

[editorconfig.editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) EditorConfig-Unterstützung für Visual Studio Code

#### Joomla Snippets

[anibalsanchez.vs-code-joomla-snippets](https://marketplace.visualstudio.com/items?itemName=AnibalSanchez.vs-code-joomla-snippets). Snippets für Joomla. Einschließlich Joomla 3.x und Joomla 4 Snippets.

#### PHP Getter & Setter

[phproberto.vscode-php-getters-setters](https://marketplace.visualstudio.com/items?itemName=phproberto.vscode-php-getters-setters). Erstellen von PHP-Gettern und -Settern aus Klasseneigenschaften.

<img src="https://vg02.met.vgwort.de/na/83d6f6a213cd4fce9e4cc6f27c609042" width="1" height="1" alt="">
