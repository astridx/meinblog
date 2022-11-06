---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-09
title: 'Visual Studio Code für Joomla einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-vscode-docker-lamp
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
---

_Docker_ erleichtert die Verwaltung von Software in Containern. _Docker Compose_ ist ein Tool, welches die Arbeit mit mehreren Containern vereinfacht.

Hier geht es um _docker-lamp_ und konkrete darum, wie spezielle Domains erzeugt werden. _docker-lamp_ ist eine Software die vorgefertigte Images, Container und Skripte bietet, die dich bei der Entwicklung auf einem Webserver unterstützen. In diesem Teil dokumentiere ich meine Konfiguration von Visual Studio Code.

## Voraussetzungen

Neben [Docker](/ubuntu-docker-einrichten-docker-lamp) ist [Docker Compose](/ubuntu-docker-compose-einrichten-docker-lamp) notwendig. Wenn du diesem [Set](mein-ubuntu-rechner-mit-docker-lamp-themen/) bisher gefolgt bist, passt alles.

## Visual Studio Code

### Installation

Installiert habe ich [Visual Studio Code](https://code.visualstudio.com/)[^code.visualstudio.com].

Aktualisiere das System:

```
$ sudo apt update && sudo apt upgrade -y
OK:1 http://de.archive.ubuntu.com/ubuntu jammy InRelease
Holen:2 http://de.archive.ubuntu.com/ubuntu jammy-updates InRelease [114 kB]  
Holen:3 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]   
OK:4 https://download.docker.com/linux/ubuntu jammy InRelease                 
Holen:5 http://de.archive.ubuntu.com/ubuntu jammy-backports InRelease [99,8 kB]
Holen:6 http://de.archive.ubuntu.com/ubuntu jammy-updates/main amd64 DEP-11 Metadata [95,0 kB]
Holen:7 http://de.archive.ubuntu.com/ubuntu jammy-updates/universe amd64 DEP-11 Metadata [255 kB]
Holen:8 http://de.archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 DEP-11 Metadata [940 B]
Holen:9 http://de.archive.ubuntu.com/ubuntu jammy-backports/universe amd64 DEP-11 Metadata [12,6 kB]
Es wurden 687 kB in 2 s geholt (387 kB/s).                                
Paketlisten werden gelesen… Fertig
Abhängigkeitsbaum wird aufgebaut… Fertig
Statusinformationen werden eingelesen… Fertig
...
...
```

Installiere die Pakete:

```
$  sudo apt install software-properties-common apt-transport-https wget -y
Paketlisten werden gelesen… Fertig
Abhängigkeitsbaum wird aufgebaut… Fertig
Statusinformationen werden eingelesen… Fertig
wget ist schon die neueste Version (1.21.2-2ubuntu1).
wget wurde als manuell installiert festgelegt.
software-properties-common ist schon die neueste Version (0.99.22.3).
apt-transport-https ist schon die neueste Version (2.4.8).
Die folgenden Pakete wurden automatisch installiert und werden nicht mehr benötigt:
  chromium-codecs-ffmpeg-extra gstreamer1.0-vaapi i965-va-driver
  intel-media-va-driver libaacs0 libaom3 libass9 libavcodec58 libavformat58
  libavutil56 libbdplus0 libblas3 libbluray2 libbs2b0 libchromaprint1
  libcodec2-1.0 libdav1d5 libflashrom1 libflite1 libftdi1-2 libgme0 libgsm1
  libgstreamer-plugins-bad1.0-0 libigdgmm12 liblilv-0-0 libmfx1 libmysofa1
  libnorm1 libopenmpt0 libpgm-5.3-0 libpostproc55 librabbitmq4 librubberband2
  libserd-0-0 libshine3 libsnappy1v5 libsord-0-0 libsratom-0-0
  libsrt1.4-gnutls libssh-gcrypt-4 libswresample3 libswscale5 libudfread0
  libva-drm2 libva-wayland2 libva-x11-2 libva2 libvdpau1 libvidstab1.1
  libx265-199 libxvidcore4 libzimg2 libzmq5 libzvbi-common libzvbi0
  mesa-va-drivers mesa-vdpau-drivers ocl-icd-libopencl1 pocketsphinx-en-us
  va-driver-all vdpau-driver-all
Verwenden Sie »sudo apt autoremove«, um sie zu entfernen.
0 aktualisiert, 0 neu installiert, 0 zu entfernen und 2 nicht aktualisiert.
```

Importiere das Repository:

```
$  wget -O- https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor | sudo tee /usr/share/keyrings/vscode.gpg
--2022-11-04 09:11:09--  https://packages.microsoft.com/keys/microsoft.asc
Auflösen des Hostnamens packages.microsoft.com (packages.microsoft.com) … 40.114.136.21
Verbindungsaufbau zu packages.microsoft.com (packages.microsoft.com)|40.114.136.21|:443 … verbunden.
HTTP-Anforderung gesendet, auf Antwort wird gewartet … 200 OK
Länge: 983 [application/octet-stream]
Wird in ‘STDOUT’ gespeichert.

-                   100%[==================>]     983  --.-KB/s    in 0s      

...
...
deb [arch=amd64 signed-by=/usr/share/keyrings/vscode.gpg] https://packages.microsoft.com/repos/vscode stable main
```

Erneute Aktualisierung des Systems:

```
$ sudo apt update
OK:1 http://de.archive.ubuntu.com/ubuntu jammy InRelease
Holen:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]   
OK:3 http://de.archive.ubuntu.com/ubuntu jammy-updates InRelease              
OK:4 http://de.archive.ubuntu.com/ubuntu jammy-backports InRelease            
Holen:5 https://packages.microsoft.com/repos/vscode stable InRelease [3.958 B]
OK:6 https://download.docker.com/linux/ubuntu jammy InRelease                 
Holen:7 https://packages.microsoft.com/repos/vscode stable/main amd64 Packages [332 kB]
Es wurden 447 kB in 2 s geholt (282 kB/s).
Paketlisten werden gelesen… Fertig
Abhängigkeitsbaum wird aufgebaut… Fertig
Statusinformationen werden eingelesen… Fertig
Aktualisierung für 2 Pakete verfügbar. Führen Sie »apt list --upgradable« aus, um sie anzuzeigen.
```

Den Editor installieren

```
$ sudo apt install code
Paketlisten werden gelesen… Fertig
Abhängigkeitsbaum wird aufgebaut… Fertig
Statusinformationen werden eingelesen… Fertig
...
...
```

Starte Visual Studio Code:

```
$ code

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
{
    // Verwendet IntelliSense zum Ermitteln möglicher Attribute.
    // Zeigen Sie auf vorhandene Attribute, um die zugehörigen Beschreibungen anzuzeigen.
    // Weitere Informationen finden Sie unter https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
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
            "port": 0,
            "runtimeArgs": [
                "-dxdebug.start_with_request=yes"
            ],
            "env": {
                "XDEBUG_MODE": "debug,develop",
                "XDEBUG_CONFIG": "client_port=${port}"
            }
        },
        {
            "name": "Launch Built-in web server",
            "type": "php",
            "request": "launch",
            "runtimeArgs": [
                "-dxdebug.mode=debug",
                "-dxdebug.start_with_request=yes",
                "-S",
                "localhost:0"
            ],
            "program": "",
            "cwd": "${workspaceRoot}",
            "port": 10000,
            "serverReadyAction": {
                "pattern": "Development Server \\(http://localhost:([0-9]+)\\) started",
                "uriFormat": "http://localhost:%s",
                "action": "openExternally"
            }
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

<img src="https://vg02.met.vgwort.de/na/2b596ee61e2c4e768e93b5f087f92121" width="1" height="1" alt="">
