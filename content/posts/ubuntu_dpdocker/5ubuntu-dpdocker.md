---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-10
title: 'DPDocker einrichten'
template: post
thumbnail: '../../thumbnails/dp_logo.png'
slug: ubuntu-dpdocker
langKey: de
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - DPDocker
  - Joomla
---

Zur Erinnerung: 

## Voraussetzungen



```
$ docker images -a
REPOSITORY                   TAG          IMAGE ID       CREATED         SIZE
node                         latest       0a852a6111fc   2 weeks ago     994MB
degobbis/php82-fpm-alpine    latest       d076bd79a74c   5 weeks ago     180MB
degobbis/php81-fpm-alpine    latest       dc4bfc810727   5 weeks ago     175MB
degobbis/php74-fpm-alpine    latest       a5cc3d801dfb   5 weeks ago     145MB
degobbis/mariadb105-alpine   latest       2f95b891209f   4 months ago    238MB
degobbis/apache24-alpine     latest       08ec3256be3a   4 months ago    59.4MB
phpmyadmin/phpmyadmin        fpm-alpine   7ac3cb8d0544   6 months ago    132MB
degobbis/minica              latest       2fcbfc904eff   22 months ago   13.2MB
mailhog/mailhog              latest       4de68494cd0d   2 years ago     392MB
cytopia/bind                 0.15         ff37cf218d55   4 years ago     142MB
astrid@astrid-virtual-machine:~$ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                  CREATED      STATUS                        PORTS                                                                                                                                                                                                                                                                                                                                                                                              NAMES
4c7fabf043b5   degobbis/apache24-alpine:latest     "/httpd-php-entrypoi…"   2 days ago   Exited (255) 44 minutes ago   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp, 0.0.0.0:8074->8074/tcp, :::8074->8074/tcp, 0.0.0.0:8081-8082->8081-8082/tcp, :::8081-8082->8081-8082/tcp, 0.0.0.0:8400->8400/tcp, :::8400->8400/tcp, 0.0.0.0:8474->8474/tcp, :::8474->8474/tcp, 80/tcp, 0.0.0.0:8481-8482->8481-8482/tcp, :::8481-8482->8481-8482/tcp, 0.0.0.0:80->8081/tcp, :::80->8081/tcp, 0.0.0.0:443->8481/tcp, :::443->8481/tcp   docker-lamp_apache24
d990b7f39ccc   degobbis/php81-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 days ago   Exited (255) 44 minutes ago   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php81
bbd7d8fabda1   phpmyadmin/phpmyadmin:fpm-alpine    "/docker-entrypoint.…"   2 days ago   Exited (255) 44 minutes ago   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_phpmyadmin
3af6bd2cabd6   degobbis/php74-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 days ago   Exited (255) 44 minutes ago   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php74
b4dcac27e30e   degobbis/php82-fpm-alpine:latest    "/httpd-php-entrypoi…"   2 days ago   Exited (255) 44 minutes ago   9000/tcp                                                                                                                                                                                                                                                                                                                                                                                           docker-lamp_php82
8a68a1693533   degobbis/mariadb105-alpine:latest   "/docker-entrypoint …"   2 days ago   Exited (255) 44 minutes ago   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp                                                                                                                                                                                                                                                                                                                                                          docker-lamp_db
5cae9d9b3b0a   mailhog/mailhog:latest              "MailHog"                2 days ago   Exited (255) 44 minutes ago   0.0.0.0:1025->1025/tcp, :::1025->1025/tcp, 0.0.0.0:8025->8025/tcp, :::8025->8025/tcp                                                                                                                                                                                                                                                                                                               docker-lamp_mailhog
05871afca12b   cytopia/bind:0.15                   "/docker-entrypoint.…"   2 days ago   Exited (255) 44 minutes ago   0.0.0.0:53->53/tcp, 0.0.0.0:53->53/udp, :::53->53/tcp, :::53->53/udp                                                                                                                                                                                                                                                                                                                               docker-lamp_bind
astrid@astrid-virtual-machine:~$ 

```



## DPDocker installieren


Ich clone ich das DPDocker Github Repository.

```
git clone https://github.com/Digital-Peak/DPDocker.git
```

Als nächstes wechsele ich in den Ordner DPDocker und führe den Befehl aus, der alle notwendigen Images herunterlädt.

```
cd DPDocker

bash images/build.sh
```

Der Befehl arbeitet einige Minuten. Im Anschluss werden mir eine Reihe von Images angezeigt, wenn ich `docker images -a` eingebe. `docker ps -a` listet keine weiteren Container auf. Diese werden über spezielle Kommandos angelegt. Eine Referenz aller verfügbaren `DPDocker` Befehle ist die [Dokumentation](https://github.com/Digital-Peak/DPDocker/blob/master/README.md).

```
$ docker images -a
REPOSITORY                   TAG                    IMAGE ID       CREATED              SIZE
<none>                       <none>                 e947e26212f7   54 seconds ago       1.06GB
digitpeak/dpdocker-web       8.1                    81ff5f78aa28   54 seconds ago       1.06GB
digitpeak/dpdocker-web       latest                 81ff5f78aa28   54 seconds ago       1.06GB
<none>                       <none>                 5e3ef7b61caa   58 seconds ago       1.06GB
<none>                       <none>                 7e15ebdd818d   About a minute ago   1.06GB
<none>                       <none>                 bc7f93bff993   About a minute ago   1.06GB
<none>                       <none>                 53c6fb1cb936   About a minute ago   1.06GB
<none>                       <none>                 b36936081ddc   About a minute ago   1.06GB
<none>                       <none>                 714a67938313   About a minute ago   1.05GB
<none>                       <none>                 200c64f78813   About a minute ago   1.05GB
<none>                       <none>                 03fbebbc2924   About a minute ago   1.05GB
<none>                       <none>                 caae59797709   About a minute ago   1.05GB
<none>                       <none>                 9e7312e767e9   About a minute ago   1.04GB
<none>                       <none>                 b518c70cf5c9   2 minutes ago        877MB
<none>                       <none>                 e1865766820d   3 minutes ago        834MB
<none>                       <none>                 c3723a29f2bb   3 minutes ago        828MB
<none>                       <none>                 c04e6ee4d543   3 minutes ago        823MB
<none>                       <none>                 a6f09c37a78c   3 minutes ago        766MB
<none>                       <none>                 42cc7b2019ea   4 minutes ago        727MB
<none>                       <none>                 02ff1e62471b   4 minutes ago        727MB
<none>                       <none>                 dca7a80c5033   4 minutes ago        727MB
<none>                       <none>                 f21adbb09797   4 minutes ago        727MB
<none>                       <none>                 4678d7e93438   4 minutes ago        727MB
<none>                       <none>                 a24492134cde   4 minutes ago        727MB
<none>                       <none>                 f70711e2b624   4 minutes ago        727MB
<none>                       <none>                 622686b23614   4 minutes ago        727MB
<none>                       <none>                 594c9ca39c01   4 minutes ago        727MB
<none>                       <none>                 702387e50cd1   4 minutes ago        727MB
<none>                       <none>                 2092dbb728ff   4 minutes ago        727MB
<none>                       <none>                 51b7f59a93d4   4 minutes ago        727MB
<none>                       <none>                 00174bc1a0d7   4 minutes ago        727MB
digitpeak/dpdocker-web       8.0                    0a648022dad6   6 minutes ago        977MB
<none>                       <none>                 2954748c92b9   6 minutes ago        977MB
<none>                       <none>                 428655daea56   6 minutes ago        977MB
<none>                       <none>                 bc775053bb71   6 minutes ago        977MB
<none>                       <none>                 f0baab2f3374   6 minutes ago        977MB
<none>                       <none>                 404f5bdaa499   6 minutes ago        977MB
<none>                       <none>                 59f894e4ae4a   6 minutes ago        977MB
<none>                       <none>                 05e32c63f18d   8 minutes ago        976MB
<none>                       <none>                 e8b10b83783f   8 minutes ago        972MB
<none>                       <none>                 8e0a9f8cf94c   8 minutes ago        972MB
<none>                       <none>                 d8384924ead1   8 minutes ago        969MB
<none>                       <none>                 c89830c771c1   9 minutes ago        966MB
<none>                       <none>                 ae0e477088fe   10 minutes ago       798MB
<none>                       <none>                 a5d6fd4cfa94   11 minutes ago       756MB
<none>                       <none>                 7de882d2587a   11 minutes ago       750MB
<none>                       <none>                 a9fec528cefd   11 minutes ago       744MB
<none>                       <none>                 123943073ae6   11 minutes ago       687MB
<none>                       <none>                 bc329589804f   12 minutes ago       648MB
<none>                       <none>                 198647b02761   12 minutes ago       648MB
<none>                       <none>                 e312822d52fa   12 minutes ago       648MB
<none>                       <none>                 f4973a2f94cd   12 minutes ago       648MB
<none>                       <none>                 9d40fbb7b3a1   12 minutes ago       648MB
<none>                       <none>                 675ec389f7a5   12 minutes ago       648MB
<none>                       <none>                 b2665a6f2332   12 minutes ago       648MB
<none>                       <none>                 3f20f573ea0f   12 minutes ago       648MB
<none>                       <none>                 9783c18197ea   12 minutes ago       648MB
<none>                       <none>                 c7cb1920cfb2   12 minutes ago       648MB
<none>                       <none>                 f47dbd74ab93   12 minutes ago       648MB
<none>                       <none>                 8ba0d86094ef   12 minutes ago       648MB
<none>                       <none>                 8e065af97ef0   12 minutes ago       648MB
digitpeak/dpdocker-web       7.4                    077eb13f527b   16 minutes ago       1.01GB
<none>                       <none>                 c593638ec639   16 minutes ago       1.01GB
<none>                       <none>                 4ea775cc022b   16 minutes ago       1.01GB
<none>                       <none>                 9477f0bbb428   16 minutes ago       1.01GB
<none>                       <none>                 518172a616b4   16 minutes ago       1.01GB
<none>                       <none>                 731b107ed93f   16 minutes ago       1.01GB
<none>                       <none>                 161dcbd2379a   16 minutes ago       1.01GB
<none>                       <none>                 353b5767365f   16 minutes ago       1.01GB
<none>                       <none>                 70ca39d88d2a   16 minutes ago       1GB
<none>                       <none>                 f44de4e27833   16 minutes ago       1GB
<none>                       <none>                 d5f56b712032   16 minutes ago       1e+03MB
<none>                       <none>                 0d67790a3b30   17 minutes ago       996MB
<none>                       <none>                 526de2fa5801   20 minutes ago       804MB
<none>                       <none>                 66bfc5659800   21 minutes ago       762MB
<none>                       <none>                 b655b5426dd9   21 minutes ago       756MB
<none>                       <none>                 6efeedd0296f   21 minutes ago       750MB
<none>                       <none>                 af005bae99d0   22 minutes ago       693MB
<none>                       <none>                 10021fe2d084   23 minutes ago       654MB
<none>                       <none>                 c2361534f60d   23 minutes ago       654MB
<none>                       <none>                 eb9851f5b0b3   23 minutes ago       654MB
<none>                       <none>                 1cc7c67160e3   23 minutes ago       654MB
<none>                       <none>                 af148d944b4d   23 minutes ago       654MB
<none>                       <none>                 d283c425a718   23 minutes ago       654MB
<none>                       <none>                 8913dcae9dd5   23 minutes ago       654MB
<none>                       <none>                 9634a735e6bc   23 minutes ago       654MB
<none>                       <none>                 5f600b243a55   23 minutes ago       654MB
<none>                       <none>                 78ab486dc7a7   23 minutes ago       654MB
<none>                       <none>                 e541cac8fbc6   23 minutes ago       654MB
<none>                       <none>                 4c809d990764   23 minutes ago       654MB
<none>                       <none>                 504d887cdeca   23 minutes ago       654MB
digitpeak/dpdocker-cli       8.1                    c58648eca503   33 minutes ago       1.04GB
digitpeak/dpdocker-cli       latest                 c58648eca503   33 minutes ago       1.04GB
<none>                       <none>                 1a84de1bc9b5   34 minutes ago       1.03GB
<none>                       <none>                 bd4a1b743dec   34 minutes ago       1.03GB
<none>                       <none>                 b728bac35acc   34 minutes ago       1.03GB
<none>                       <none>                 0f3c96c01bad   34 minutes ago       1.03GB
<none>                       <none>                 a372abd5095c   36 minutes ago       861MB
<none>                       <none>                 459e01f051ce   36 minutes ago       819MB
<none>                       <none>                 4f42f1b7a3dc   36 minutes ago       813MB
<none>                       <none>                 ff51e9fff185   37 minutes ago       808MB
<none>                       <none>                 63e8bf878a3d   37 minutes ago       751MB
<none>                       <none>                 927eca6ad6ea   38 minutes ago       712MB
<none>                       <none>                 1e76948622c0   38 minutes ago       712MB
<none>                       <none>                 47f7b514e297   38 minutes ago       712MB
<none>                       <none>                 2eeda8cce21e   38 minutes ago       712MB
<none>                       <none>                 34a3d63c7f94   38 minutes ago       712MB
<none>                       <none>                 1a0e2365d201   38 minutes ago       712MB
<none>                       <none>                 b8e14191e794   38 minutes ago       712MB
<none>                       <none>                 45018ba9a90a   38 minutes ago       712MB
<none>                       <none>                 bd516bc441f3   38 minutes ago       712MB
<none>                       <none>                 050964ca2896   38 minutes ago       712MB
<none>                       <none>                 f2b01dd75d52   38 minutes ago       712MB
<none>                       <none>                 e4cc04c822b5   38 minutes ago       712MB
<none>                       <none>                 11a211b3bded   38 minutes ago       712MB
digitpeak/dpdocker-cli       8.0                    6bd0a6bfa676   45 minutes ago       961MB
<none>                       <none>                 b78638cc450c   45 minutes ago       957MB
<none>                       <none>                 21194093c2c4   46 minutes ago       957MB
<none>                       <none>                 4c2ce5c5c18c   46 minutes ago       954MB
<none>                       <none>                 d3fa461579c9   46 minutes ago       951MB
<none>                       <none>                 73f23e3b08b3   48 minutes ago       783MB
<none>                       <none>                 e1d1b1b087a0   49 minutes ago       741MB
<none>                       <none>                 a31447612b29   49 minutes ago       735MB
<none>                       <none>                 d78802856821   49 minutes ago       729MB
<none>                       <none>                 66ddd6a1c771   49 minutes ago       673MB
<none>                       <none>                 5574e9b5f8d4   50 minutes ago       633MB
<none>                       <none>                 7ff5b0c1d940   50 minutes ago       633MB
<none>                       <none>                 2bb4b1511c7e   50 minutes ago       633MB
<none>                       <none>                 0c271a4ec810   50 minutes ago       633MB
<none>                       <none>                 78c242f0e8b3   50 minutes ago       633MB
<none>                       <none>                 b9b148d598f3   50 minutes ago       633MB
<none>                       <none>                 89d3a6c49281   50 minutes ago       633MB
<none>                       <none>                 b40efea900b4   50 minutes ago       633MB
<none>                       <none>                 6dc535b5951b   50 minutes ago       633MB
<none>                       <none>                 0344d91fec5e   50 minutes ago       633MB
<none>                       <none>                 ab118dd491b0   50 minutes ago       633MB
<none>                       <none>                 504db66fafb2   50 minutes ago       633MB
<none>                       <none>                 4788b7f258a6   50 minutes ago       633MB
digitpeak/dpdocker-cli       7.4                    1ea1edb3e5bb   54 minutes ago       992MB
<none>                       <none>                 305256e84c58   54 minutes ago       988MB
<none>                       <none>                 fec5ce9ce41c   54 minutes ago       988MB
<none>                       <none>                 e4dedd3f14ba   54 minutes ago       985MB
<none>                       <none>                 a21bc72850bc   54 minutes ago       982MB
<none>                       <none>                 dae70c233d38   56 minutes ago       789MB
<none>                       <none>                 16b7bffb8237   57 minutes ago       747MB
<none>                       <none>                 c940f79c529a   57 minutes ago       741MB
<none>                       <none>                 ae938de6af8e   57 minutes ago       735MB
<none>                       <none>                 25e3b396525f   58 minutes ago       679MB
<none>                       <none>                 f93666f99cd2   59 minutes ago       640MB
<none>                       <none>                 5a70444ccb72   59 minutes ago       640MB
<none>                       <none>                 f5b4db611ac3   59 minutes ago       640MB
<none>                       <none>                 6559ce536395   59 minutes ago       640MB
<none>                       <none>                 8986ef3b7f63   59 minutes ago       640MB
<none>                       <none>                 12b547f4359c   59 minutes ago       640MB
<none>                       <none>                 2281fe7364b8   59 minutes ago       640MB
<none>                       <none>                 8c7c7acb7a72   59 minutes ago       640MB
<none>                       <none>                 3a051b1e657e   59 minutes ago       640MB
<none>                       <none>                 23484e51a2ba   59 minutes ago       640MB
<none>                       <none>                 121cc0334027   59 minutes ago       640MB
<none>                       <none>                 27641be7c119   59 minutes ago       640MB
<none>                       <none>                 ace587c559c6   59 minutes ago       640MB
thecodingmachine/php         7.4-v4-apache-node16   bd3a8b16e0c6   4 days ago           654MB
thecodingmachine/php         7.4-v4-cli-node16      1da11d6e095c   4 days ago           640MB
thecodingmachine/php         8.0-v4-apache-node16   2536861a89fb   4 days ago           648MB
thecodingmachine/php         8.0-v4-cli-node16      4d1eb6ed1a86   4 days ago           633MB
thecodingmachine/php         8.1-v4-apache-node16   db9206401580   4 days ago           727MB
thecodingmachine/php         8.1-v4-cli-node16      d31bab99abf3   4 days ago           712MB
node                         latest                 0a852a6111fc   2 weeks ago          994MB
degobbis/php82-fpm-alpine    latest                 d076bd79a74c   5 weeks ago          180MB
degobbis/php81-fpm-alpine    latest                 dc4bfc810727   5 weeks ago          175MB
degobbis/php74-fpm-alpine    latest                 a5cc3d801dfb   5 weeks ago          145MB
degobbis/mariadb105-alpine   latest                 2f95b891209f   4 months ago         238MB
degobbis/apache24-alpine     latest                 08ec3256be3a   4 months ago         59.4MB
phpmyadmin/phpmyadmin        fpm-alpine             7ac3cb8d0544   6 months ago         132MB
degobbis/minica              latest                 2fcbfc904eff   22 months ago        13.2MB
mailhog/mailhog              latest                 4de68494cd0d   2 years ago          392MB
cytopia/bind                 0.15                   ff37cf218d55   4 years ago          142MB

```
