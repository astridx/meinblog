---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-03
title: 'Git unter Ubuntu 22.04 einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-git-einrichten-docker-lamp
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Git
---

Ich verwalte meine Softwareprojekte mit Git. So greife ich jederzeit auf verschiedene Versionsstände zurück. Installiere und konfiguriere ich als erstes Git, Um die Dateien unkompliziert in der Versionsverwaltung auf den neuen Rechner zu laden.

## Voraussetzungen

Nach der Installation des Desktop Images von [Ubuntu 22.04 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/22.04/) verfüge ich über ein _non-root-Superuser-Konto_ und kann direkt mit der Installation von Git beginnen.

## Installieren von Git mit Standardpaketen

Ich nutze die Standardinstallation.

Git wird oft zusammen mit anderen Softwarepaketen installiert. Prüfe, ob es auf deinem Rechner bereits vorhanden ist:

```
git --version

```

Überspringe diesen Schritt, wenn dir eine Version angezeigt wird, dann ist Git installiert. Falls Git noch nicht installiert ist, siehst du die nachfolgende Ausgabe:

```
$ git --version

Command 'git' not found, but can be installed with:

sudo apt install git

```

Wird dir keine Git-Versionsnummer angezeigt? Installiere in diesem Fall Git via APT, dem standardmäßigen Paketmanager von Ubuntu.

Verwende wie gewohnt als erstes die APT-Paketmanagement-Tools zur Aktualisierung des lokalen Paketindexes.

```
sudo apt update

```

Installiere dann Git:

```
sudo apt install git

```

Überprüfe die Installation.

```
git --version

```

Die Ausgabe sollte beispielsweise wie folgt sein:

```
version 2.34.1

```

> In den Standardpaketen ist nicht immer die aktuellste Version. Falls es dir wichtig ist die neuesten Git Funktionen zu nutzt, installiere https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Richte Git nach erfolgreicher Installation für deine individuelle Umgebung ein.

## Einrichten von Git

Richte Git so ein, dass es dich bei der Erstellung deiner Softwareprojekte unterstützt.

Nutze den Befehls `git config` zur Konfiguration des Namens und der E-Mail-Adresse:

```
git config --global user.name DeinName
git config --global user.email deineemailadresse@example.com

```

Überprüfe die Konfiguration:

```
git config --list

```

Die Ausgabe sollte wie folgt sein.

```
user.name=Deinname
user.email= deineemailadresse@example.com
...
```

Die Informationen werden in der Git-Konfigurationsdatei gespeichert. Mit einem Editor kann man diese einsehen und gegebenenfalls bearbeiten, beispielsweise mit [Nano](<https://de.wikipedia.org/w/index.php?title=Nano_(Texteditor)&oldid=191546214>):

```
nano ~/.gitconfig

```

Die Ausgabe sollte wie folgt sein.

```
[user]
  name = Deinname
  email = deineemailadresse@example.com

```

> Drücke `STRG` und `X`, dann `Y` und anschließend die `Eingabetaste`, um den Texteditor Nano zu verlassen.

Es gibt viele weitere [Optionen](https://git-scm.com/book/de/v2/Git-einrichten-Git-Konfiguration)[^git-scm.com/book/de/v2/Git-einrichten-Git-Konfiguration]. Die hier beschriebenen sind meiner Meinung nach für den Anfang die wichtigsten. 

<img src="https://vg02.met.vgwort.de/na/6da1ef5e40714b0481cbacda81aa9df6" width="1" height="1" alt="">
