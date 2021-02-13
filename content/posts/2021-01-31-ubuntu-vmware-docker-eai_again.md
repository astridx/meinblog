---
date: 2021-01-30
title: 'Netzwerk-DNS-Konfiguration von Docker und EAI_AGAIN'
template: post
thumbnail: '../thumbnails/ubuntu.png'
slug: ubuntu-vmware-docker-eai_again
categories:
  - Tipp
tags:
  - Linux
  - VMWare
  - Dockerproblem
---

Ich verwende VMWare Workstation unter Windows 10 Pro , um eine VM für Ubuntu 20.04 zu testen. Um auf den freigegebenen Ordner in Ubuntu zuzugreifen waren folgende Eintstellungen erforderlich.

## Der Fehler EAI_AGAIN

Manchmal funktioniert die Internet-Verbindung von Docker nicht richtig, was zu einer Reihe von obskuren Fehlern führet. Meiner Erfahrung nach liegt dies in der Regel daran, dass DNS-Lookups in Docker-Images fehlschlagen.

Ein Beispiel zeigt der nachfolgende Schnipsel.

```
$ docker run --rm -it -u "node" -v /srv/www/joomla/j4dev:/srv/www/joomla/j4dev -w /srv/www/joomla/j4dev node:latest npm ci
npm ERR! code EAI_AGAIN
npm ERR! syscall getaddrinfo
npm ERR! errno EAI_AGAIN
npm ERR! request to https://registry.npmjs.org/zwitch/-/zwitch-1.0.5.tgz failed, reason: getaddrinfo EAI_AGAIN registry.npmjs.org
```

Ist DNS das Problem?
Glücklicherweise ist es einfach, Docker's DNS zu testen.

> Voraussetzung zum Testen der Konfiguration sind `net-tools`. Unter Ubuntu 20.04 isntalliere ich diese per `sudo apt install net-tools`

Überprüfen Sie zunächst die grundlegende Internetverbindung beispielweise mit `ping google.com`.

```
$ ping google.com
PING google.com (142.250.186.142) 56(84) Bytes Daten.
64 Bytes von fra24s07-in-f14.1e100.net (142.250.186.142): icmp_seq=1 ttl=128 Zeit=24.8 ms
64 Bytes von fra24s07-in-f14.1e100.net (142.250.186.142): icmp_seq=2 ttl=128 Zeit=26.9 ms
^C
--- google.com ping statistics ---
2 Pakete übertragen, 2 empfangen, 0% Paketverlust, Zeit 1002ms
rtt min/avg/max/mdev = 24.770/25.852/26.934/1.082 ms
```

Löse nun, die Domain `google.com` über `docker run busybox nslookup google.com` auf.

```
$ docker run busybox nslookup google.com
;; connection timed out; no servers could be reached
```

Wenn es wie oben gezeigt fehlschlägt, gibt es ein Problem bei der DNS-Auflösung.

> Warum? Wenn Docker keinen lokal in der Datei /etc/resolv.conf definierten DNS-Server finden kann, verwenden Container standardmäßig den [öffentlichen DNS-Server von Google](https://developers.google.com/speed/public-dns/), 8.8.8.8, zur DNS-Auflösung.

### Die schnelle Lösung: Überschreiben des DNS von Docker

Für die Lösung findet man zunächst die DNS-Server des Netzwerks in Ubuntu über `nmcli dev show | grep 'IP4.DNS'` heraus.

```
$ nmcli dev show | grep 'IP4.DNS'
IP4.DNS[1]:                             127.0.0.1
IP4.DNS[2]:                             192.168.209.2
```

Um einen Docker-Container mit diesem DNS-Server auszuführen, hängt man das Flag `--dns` an den Befehl `run` an.

```
$ docker run --dns 127.0.0.1 busybox nslookup google.com
```

Und nun ist die Abfrage erfolgreich!

### Der dauerhafte systemweite Fix

Die obige Lösung ist kurzfristig gut. Besser ist, dass dies standardmäßig funktioniert.
Um dies zu erreichen, ändere ich die DNS-Einstellungen des Docker-Daemons indem ich eine [Daemon-Konfigurationsdatei](https://docs.docker.com/engine/reference/commandline/dockerd/#/daemon-configuration-file) unter /etc/docker/daemon.json erstelle.

Ich erstelle diese Datei mit folgendem Inhalt, um zwei DNS einzustellen, zum einen den DNS-Server meines Netzwerks und zum anderen den Google-DNS-Server, auf den zurückgegriffen werden soll, falls dieser Server nicht verfügbar ist. Dies geschieht über `sudo nano /etc/docker/daemon.json`. Konkret sieht das so aus:

```
{
    "dns": ["127.0.0.1", "8.8.8.8"]
}
```

Dann starte ich den Docker-Dienst neu:

```
sudo service docker restart
```

Nun ist es möglich , google.com von jedem Docker-Container aus erfolgreich anzupingen, ohne den DNS-Server explizit zu überschreiben

```
$ docker run busybox nslookup google.com
nslookup: write to '127.0.0.1': Connection refused
Server:		8.8.8.8
Address:	8.8.8.8:53

Non-authoritative answer:
Name:	google.com
Address: 142.250.186.78
```

Uns was noch mehr zählt. Mein Ausgangsproblem ist ebenfalls gelöst.
