---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2022-11-03
title: 'Setting up Docker under Ubuntu 22.04'
template: post
thumbnail: '../../thumbnails/ubuntu.png'
slug: en/ubuntu-docker-einrichten-docker-lamp
langKey: en
categories:
  - Betriebssystem
tags:
  - Linux
  - Ubuntu
  - Docker
---

[Docker](https://en.wikipedia.org/wiki/Docker_(software))[^en.wikipedia.org/wiki/Docker_(software)] simplifies the management of application processes. The free software is like virtual machines, but containers are more portable, resource-efficient and dependent on the host operating system. I install [Docker](https://docs.docker.com/get-docker/)[^docs.docker.com/get-docker] on Ubuntu 22.04 and publish my own Docker image.

## Prerequisites

After installing the desktop image of [Ubuntu 22.04 LTS (Jammy Jellyfish)](https://releases.ubuntu.com/22.04/) I have a _non-root superuser accounto_ and can directly start installing Docker.

## Installing Docker

To make sure I get the latest version, I install Docker from the official Docker repository.

I first update the package list:

```
sudo apt update
```

Then I install the necessary packages:

```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```

Next, I add the GPG key for the official Docker repository:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```

I then add the Docker repository to the APT source:

```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

I then update the package database with the Docker packages from the newly added repo:

```
sudo apt update

```

I make sure to install from the Docker repo instead of the default Ubuntu repo:

```
apt-cache policy docker-ce

```

The output is, for example, as follows:

```
docker-ce:
  Installiert:           (keine)
  Installationskandidat: 5:20.10.21~3-0~ubuntu-jammy
  Versionstabelle:
     5:20.10.21~3-0~ubuntu-jammy 500
...
...
```

Note: `docker-ce` is not installed. I am installing `docker-ce`:

```
sudo apt install docker-ce
```

Docker is now installed and the daemon started. I am checking this:

```
sudo systemctl status docker
```

The service is active:

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

## The Docker command without `sudo`.

If a normal user tries to run the `docker` command without prefixing it with `sudo` or without belonging to the `Docker` group, they will see an indication that they are not authorised.

The best workaround is to add all users who used `docker` to the **Docker** group.

```
sudo usermod -aG docker ${USER}

```

To use the new group membership, log out of the computer and log in again or call up the following command:

```
su - ${USER}
```

Confirm that your user has been added to the **Docker** group.

```
id -nG
```

All groups you are in are displayed:

```
astrid adm cdrom sudo dip plugdev lpadmin lxd sambashare docker
```

> Add another user to the **Docker** group as follows: `sudo usermod -aG docker username`.

Now let's take a closer look at the `docker` command.

## Der Befehl Docker im überblick

The syntax of a `docker` command:

```
docker [option] [command] [arguments]
```

Show all available sub-commands:

```
docker

```

Sample output:

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

Look at individual options in more detail:

```
docker docker-unterbefehl --help
```

Display system information about Docker:

```
docker info
```

Let's take a closer look at `docker` images.

## Docker Images

`docker` containers are created using `docker` images. By default, Docker retrieves these images from [Docker Hub](https://hub.docker.com)[^hub.docker.com]. If you haven't experienced this in practice, download an image from Docker Hub and run it at the same time:

```
docker run hello-world
```

The output indicates that Docker is working properly:

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

> The text `Unable to find image` at the beginning is unsettling for beginners. However, it only refers to the local computer. The image was not yet available there.

Now search for images, for example the Ubuntu image:

```
docker search ubuntu

```

Invoke the following command to download the official Ubuntu image to your computer:

```
docker pull ubuntu

```

Du siehst folgendes:

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

After an image has been downloaded, run it with `run`. We'll take a closer look at that later.

This is how you display downloaded images:

```
docker images
```

The output looks like this:

```
~$ docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
ubuntu        latest    a8780b506fa4   15 hours ago    77.8MB
hello-world   latest    feb5d9fea6a5   13 months ago   13.3kB
```
Let's take a closer look at `docker` containers.

## Docker Container

As an example, let's invoke a `docker` container with the latest Ubuntu `docker` image.

> The combination of **-i** and **-t** gives you interactive shell access to the container.

```
docker run -it ubuntu /bin/bash
```

The prompt changes. You are now in the container:

```
$ docker run -it ubuntu /bin/bash
root@3ab499b7296a:/# 
```

In this example, the container ID is '3ab499b7296a'. Use it to identify the container. We will come back to these later.

Call any command in the container. For example, update the package database in the container. `sudo` is not necessary because you are working in the container as **root** user:

```
apt update

```

Or install Node.js. First, make sure that Node.js is not already installed:

```
node -v

```

Now install Node.js.

```
apt install nodejs

```

Check the installation:

```
node -v

```

All changes apply only to this container.

To exit the container, type `exit` at the command prompt. Make sure that Node.js is not installed outside the container.

Next, let's look at the management of `docker` containers.

## Docker Container verwalten

Look at the **active** containers:

```
docker ps
```

For example, you see this:

```
CONTAINER ID        IMAGE               COMMAND             CREATED
...
```

So far we have started two containers. One from the `hello-world` image and one from the `ubuntu` image. Both containers are no longer running, but are still existing in the system.

Call `docker ps` with the option `-a` to show all containers -- active and inactive:

```
docker ps -a

```

For example, you see this:

```
$ docker ps -a
CONTAINER ID   IMAGE         COMMAND       CREATED          STATUS                      PORTS     NAMES
3ab499b7296a   ubuntu        "/bin/bash"   16 minutes ago   Exited (0) 9 minutes ago              zen_bhaskara
07a4378a365d   ubuntu        "/bin/bash"   17 minutes ago   Exited (0) 16 minutes ago             nifty_elion
45951721cf60   ubuntu        "bash"        22 minutes ago   Exited (0) 22 minutes ago             relaxed_borg
e2a3d0c57be1   hello-world   "/hello"      45 minutes ago   Exited (0) 45 minutes ago             gallant_easley

```

> Note the CONTAINER_ID 3ab499b7296a. We have already seen this in the previous section. It was the container we started in interactive mode.

To display the last container created, use `-l`:

```
docker ps -l

```

To start a stopped container, use `docker start` followed by the container ID or name:

```
docker start 3ab499b7296a
```

The container starts and you can check the status with `docker ps`.

> To stop an active container, use `docker stop`. Delete a container with `docker rm`. Find out the container ID with `docker ps -a`.

## Committing changes to a container via Docker image

When you invoke a Docker image, it is possible to create, modify and delete files. How is it possible to permanently save this new state?

After installing Node.js in the Ubuntu container, it differs from the original image. Transfer the changes to a new Docker image instance with the following command.

```
$ docker commit -m "added Node.js" -a "astrid" 3ab499b7296a astrid/ubuntu-und-node-js
```

`-m` stands for the comment describing the changes you have made. a' is for the author's name. The `container_id` is for the identification of the container. Example: The user `astrid` saves the changes in the container with the ID `3ab499b7296a` as follows:

```
docker commit -m "added Node.js" -a "astrid" 00000000 astrid/ubuntu-und-node-js
```

The changed image is first saved locally. Check this with `docker images`.

```
$ docker images
REPOSITORY                  TAG       IMAGE ID       CREATED         SIZE
astrid/ubuntu-und-node-js   latest    2a1dac358bda   2 minutes ago 
...
```

Share the image with others next.

## Publish Docker images to the Docker Repository.

If you want to share your Docker image with others, submit it to Docker Hub. First, log in to [Docker Hub](https://hub.docker.com/) to submit the image.

```
docker login -u dein-docker-username

```

> If your Docker username is different from the local username you used to create the image, the following addition is important: `docker tag astrid/ubuntu-node-js docker-registry-username/ubuntu-and-node-js`.

Upload your own image:

```
docker push docker-registry-username/docker-image-name
```

To load `ubuntu-and-node-js` into the repository **astrid** I use:

```
docker push astrid/ubuntu-und-node-js

```

You can follow the progress in the command line:

```
The push refers to a repository [docker.io/astrid/ubuntu-und-node-js]
edfrbfbf4187: Pushed
...
...
```

After everything is uploaded, you will see the new image in the Docker Hub dashboard.

![Docker Image in Docker Hub](/images/docker1.png)

> Use `docker pull astrid/ubuntu-nodejs` to use the image on another machine.

You've now installed Docker, worked with images and containers, and committed a modified image to Docker Hub. You know the basics and can handle foreign images and containers. 

<img src="https://vg02.met.vgwort.de/na/ae4ceea4d7fe40c69a03083ac0fa98bf" width="1" height="1" alt="">
