---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-03
title: 'Docker unter Ubuntu 22.04 einrichten'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: ubuntu-docker-einrichten-docker-lamp
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
---










[Docker](https://de.wikipedia.org/w/index.php?title=Docker_(Software))[^de.wikipedia.org/w/index.php?title=Docker_(Software)] vereinfacht die Verwaltung von Prozesse und ähnelt virtuellen Maschinen. Der Vorteil von Docker: Container sind portabler, ressourcenschonender und vom Host-Betriebssystem unabhängiger. Ich installiere [Docker](https://docs.docker.com/get-docker/)[^docs.docker.com/get-docker] unter Ubuntu 22.04 und veröffentliche ein erstes eigenes Docker Image.

## Voraussetzungen

Nach der Installation des Desktop Images von [Ubuntu 22.04 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/22.04/) verfüge ich über ein _non-root-Superuser-Konto_ und kann direkt mit der Installation von Docker beginnen.

## Installieren von Docker<!-- \index{Docker! Installation} -->

Um sicherzustellen, dass ich die neueste Version erhalte, installieren ich Docker aus dem offiziellen Docker-Repository.

Ich aktualisiere zunächst die Paketliste:

```
sudo apt update
```

Dann installiere ich notwendige Pakete:

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Danach füge ich den GPG-Schlüssel für das offizielle Docker-Repository hinzu:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```

Daraufhin ergänze ich das Docker-Repository in den APT Quelle:

```
sudo add-apt-repository 'deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable'
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Anschließend aktualisiere ich die Paketdatenbank mit den Docker-Paketen aus dem neu hinzugefügten Repo:

```
sudo apt update

```

Ich stelle sicher, dass ich die Software vom Docker-Repo installiere, anstelle der eventuell veralteten Software des Standard-Ubuntu-Repos:

```
apt-cache policy docker-ce

```

Die Ausgabe ist beispielsweise wie folgt:

```
docker-ce:
  Installiert:           (keine)
  Installationskandidat: 5:20.10.21~3-0~ubuntu-jammy
  Versionstabelle:
     5:20.10.21~3-0~ubuntu-jammy 500
...
...
```

Beachte: `docker-ce` ist bisher nicht installiert. Ich installiere `docker-ce` nun:

```
sudo apt install docker-ce
```

Docker ist jetzt installiert und der Dämon gestartet. Dies prüfe ich via:

```
sudo systemctl status docker
```

Der Dienst ist aktiv:

```
$ sudo systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; >
     Active: active (running) since Thu 2022-11-03 10:30:>
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 6229 (dockerd)
      Tasks: 8
     Memory: 24.1M
        CPU: 666ms
     CGroup: /system.slice/docker.service
             └─6229 /usr/bin/dockerd -H fd:// --container>
...
```

## Der Docker-Befehls ohne `sudo`

Wenn ein normaler Benutzer versucht, den Befehl `docker` aufzurufen, sieht er einen Hinweis darauf, dass er nicht berechtigt ist. Es ist erforderlich `sudo` voranzustellen oder ohne zur Gruppe `Docker` zu gehören. Der beste Workaround ist alle Benutzer zur Gruppe **Docker** zu hinzuzufügen,  die `docker` nutzten.

```
sudo usermod -aG docker ${USER}

```

Um die neue Gruppenmitgliedschaft anzuwenden, melde dich vom Rechner ab und wieder an oder rufe folgenden Befehl auf:

```
su - ${USER}
```

Überzeuge dich davon, dass dein Benutzer zur Gruppe **Docker** hinzugefügt wurde.

```
id -nG
```

Der Befehl `id -nG` zeigt dir alle Gruppen an, in denen du dich befindest. `docker` sollte in der Ausgabe vorhanden sein:

```
astrid adm cdrom sudo dip plugdev lpadmin lxd sambashare docker
```

> Einen anderen Benutzer fügst du wie folgt zur Gruppe **Docker** hinzu: `sudo usermod -aG docker username`

Sehen wir uns jetzt den Befehl `docker` genauer an.

## Der Befehl Docker im überblick

Die Syntax eines `docker`-Befehls:

```
docker [option] [command] [arguments]
```

Lass dir alle verfügbaren Unterbefehle anzeigen:

```
docker

```

Beispielausgabe:

```
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

```

Sieh dir einzelne Optionen detaillierter an:

```
docker docker-unterbefehl --help
```

Lass dir System-Informationen zu Docker anzeigen:

```
docker info
```

Schauen wir uns `docker`-Images genauer an.

## Docker Images

`docker`-Container werden mithilfe von `docker`-Images erstellt. Standardmäßig ruft Docker diese Bilder von [Docker Hub](https://hub.docker.com)[^hub.docker.com] ab. Falls du dies bisher noch nicht in der Praxis erlebt hast: Lade über Docker Hub ein Image herunter und führe es gleichzeitig aus:

```
docker run hello-world
```

Die Ausgabe zeigt an, dass Docker ordnungsgemäß funktioniert:

```
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:6a65f928fb91fcfbc963f7aa6d57c8eeb426ad9a20c7ee045538ef34847f44f1
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
...

```

> Der Text `Unable to find image` zu beginnt, verunsichert Anfänger. Er bezieht aber lediglich auf den lokalen Rechner. Dort war das Image ja noch nicht vorhanden.

Suche nun nach Images, zum Beispiel dem Ubuntu-Image:

```
docker search ubuntu

```

Rufe den folgenden Befehl auf, um das offizielle Ubuntu-Image auf deinen Computer herunterzuladen:

```
docker pull ubuntu

```

Du siehst folgende Ausgabe, wenn alles fehlerfrei verläuft:

```
Using default tag: latest
latest: Pulling from library/ubuntu
d51af753c3d3: Pull complete
fc878cd0a91c: Pull complete
6154df8ff988: Pull complete
fee5db0ff82f: Pull complete
Digest: sha256:31dfdbbaaee995098c9792d99bd333c6783ce56150d1b11e333bbceed5c54d7
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest
```

Nachdem ein Images heruntergeladen wurde, führst du es mit `run` aus. Das sehen wir uns später genauer an.

Via `docker images` zeigst du heruntergeladene Images an:

```
docker images
```

Die Ausgabe sieht wie folgt aus:

```
~$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
ubuntu        latest    a8780b506fa4   15 hours ago    77.8MB
hello-world   latest    feb5d9fea6a5   13 months ago   13.3kB
```

Schauen wir uns `docker`-Container genauer an.

## Docker Container

Lasse uns als Beispiel einen `docker`-Container mit dem aktuellsten Ubuntu `docker`-Image aufrufen.

> Die Kombination von **-i** und **-t** ermöglicht dir den interaktiven Shell-Zugriff auf den Container

```
docker run -it ubuntu /bin/bash
```

Die Eingabeaufforderung ändert sich. Du befindest dich jetzt im Container:

```
$ docker run -it ubuntu /bin/bash
root@3ab499b7296a:/# 
```

In diesem Beispiel ist `3ab499b7296a` die Container-ID. Mithilfe dieser ID identifizierst du den Container. Wir werden später auf diese zurückkommen.

Rufe einen beliebigen Befehl im Container auf. Aktualisiere beispielsweise die Paketdatenbank im Container. 

> `sudo` ist nicht notwendig, da du im Container als **Root**-Benutzer arbeitest:

```
apt update

```

Oder installiere Node.js. Überzeuge dich als erstes davon, das Node.js nicht bereits installiert ist:

```
node -v

```

Installiere nun Node.js.

```
apt install nodejs

```

Überprüfe die Installation:

```
node -v

```

Alle Änderungen gelten nur für diesen Container.

Um den Container zu verlassen, gib in der Eingabeaufforderung `exit` ein. Überzeuge dich davon, dass Node.js nicht außerhalb des Containers installiert ist.

Schauen wir uns als nächstes die Verwaltung von `docker`-Containern an.

## Docker Container verwalten

Sieh dir die **aktiven** Container an:

```
docker ps
```

Du siehst beispielsweise dies:

```
CONTAINER ID        IMAGE               COMMAND             CREATED
...
```

Bisher haben wir zwei Container gestartet. Einen aus dem `hello-world`-Image und einen aus dem `ubuntu`-Image. Beide Container werden nicht mehr ausgeführt, sind jedoch weiterhin im System vorhanden.

Rufe `docker ps` mit der Option `-a` auf, um alle Container anzuzeigen -- aktiv und inaktiv:

```
docker ps -a

```

Du siehst beispielsweise dies:

```
$ docker ps -a
CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                      PORTS     NAMES
3ab499b7296a   ubuntu        "/bin/bash"   16 minutes ago   Exited (0) 9 minutes ago              zen_bhaskara
07a4378a365d   ubuntu        "/bin/bash"   17 minutes ago   Exited (0) 16 minutes ago             nifty_elion
45951721cf60   ubuntu        "bash"        22 minutes ago   Exited (0) 22 minutes ago             relaxed_borg
e2a3d0c57be1   hello-world   "/hello"      45 minutes ago   Exited (0) 45 minutes ago             gallant_easley

```
> Beachten Sie die CONTAINER_ID 3ab499b7296a. Wir haben diese bereits im vorherigen Abschnitt gesehen. Es war der Container, den wir im interaktiven Modus gestartet haben.

Um den zuletzt erstellten Container anzuzeigen, nutze `-l`:

```
docker ps -l

```

Um einen gestoppten Container zu starten, verwende `docker start`, gefolgt von der Container-ID oder dem Namen des Containers:

```
docker start 3ab499b7296a
```

Der Container startet und du kannst mit `docker ps` den Status prüfen

> Um einen aktiven Container zu stoppen, verwende `docker stop`. Lösche einen Container mit `docker rm`. Finde die Container ID mit `docker ps -a` heraus.

## Festschreiben von Änderungen in einem Container via Docker-Image

Wenn du ein Docker-Image aufrufst, ist es möglich, Dateien zu erstellen, zu ändern und zu löschen. Wie ist es möglich, diesen neuen Status permanent zu speichern?

Nach der Installation von Node.js im Ubuntu-Container unterscheidet dieser sich vom ursprünglichen Image. Übernimm die Änderungen mit dem folgenden Befehl in eine neue Docker-Image-Instanz.

```
docker commit -m "Meine Änderung" -a "Autor Name" container_id repository/new_image_name
```

`-m` steht für den Kommentar, mit dem du bescheibst, welche Änderungen du vorgenommen hast. `-a` ist für die Angabe des Autors. Die `container_id` ist zur Identifizierung des Containers. Beispiel: Der Benutzer `astrid` speichert die Änderungen im Container mit der ID `3ab499b7296a` wie folgt:

```
$ docker commit -m "added Node.js" -a "astrid" 3ab499b7296a astrid/ubuntu-und-node-js
```

Das geändert Image wird zunächst lokal abgespeichert. Überprüfe dies mit `docker images`.

```
$ docker images
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
astrid/ubuntu-und-node-js   latest    2a1dac358bda   2 minutes ago 
...
```

Teile das Image als nächstes mit anderen.

## Docker Images im Docker Repository veröffentlichen

Wenn du dein Docker-Image mit anderen teilen möchtest, dann sende es zu Docker Hub. Melde dich zuerst bei [Docker Hub](https://hub.docker.com/) an, um das Image zu übertragen.

```
docker login -u dein-docker-username

```

> Wenn sich dein Docker-Benutzername von dem lokalen Benutzernamen unterscheidet, den du zum Erstellen des Images verwendet hast, ist folgende Ergänzung wichtig: `docker tag astrid/ubuntu-node-js docker-registry-username/ubuntu-und-node-js`

Lade dein eigenes Image hoch:

```
docker push docker-registry-username/docker-image-name
```

Um `ubuntu-und-node-js` in das Repository **astrid** zu laden verwende ich:

```
docker push astrid/ubuntu-und-node-js

```

Du kannst den Fortschritt auf der Kommandozeile verfolgen:

```
The push refers to a repository [docker.io/astrid/ubuntu-und-node-js]
edfrbfbf4187: Pushed
...
...
```

Nachdem alles hochgeladen ist, siehst du im Docker Hub Dashboard das neue Image.

![Docker Image in Docker Hub](/images/docker1.png)

> Nutze `docker pull astrid/ubuntu-nodejs` um das Image auf einer anderen Maschine zu verwenden.

Du hast nun Docker installiert, mit Images und Containern gearbeitet und ein modifiziertes Image an Docker Hub übertragen. Du kennst die Grundlagen und kannst mit fremden Images und Containern umgehen. 

<img src="https://vg02.met.vgwort.de/na/9ab807ce0fb743adb0fd5343e59762b8" width="1" height="1" alt="">
