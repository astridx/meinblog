---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-01-31
title: 'Windows Host Shared Folder in Ubuntu 20.04'
template: post
thumbnail: '../thumbnails/ubuntu.png'
slug: ubuntu-vmware-shared-folders
langKey: de
categories:
  - Tipp
tags:
  - Linux
  - VMWare
  - Dockerproblem
---

Ich verwende VMWare Workstation unter Windows 10 Pro , um eine VM für Ubuntu 20.04 zu testen. Um auf den freigegebenen Ordner in Ubuntu zuzugreifen waren folgende Eintstellungen erforderlich.

## Wie kann ich Ubuntu 20.04 dazu bringen, den Share-Ordner zu mounten und dann darauf zuzugreifen?

Bearbeiten der Datei `/etc/fstab` folgende Zeile hinzufügen:

```
vmhgfs-fuse    /mnt/hgfs    fuse    defaults,allow_other    0    0
```

Falls der Zielordner nicht vorhanden ist:

```
sudo mkdir /mnt/hgfs
```

Dann wieder einsteigen:

````
sudo mount -a```
````
