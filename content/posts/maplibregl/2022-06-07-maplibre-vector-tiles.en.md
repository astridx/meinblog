---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-06-05
title: 'Create self-hosted maps and vector tiles with Tilemaker'
template: post
thumbnail: '../../thumbnails/maplibre.png'
slug: en/maplibre-vector-tiles-self-host
langKey: en
categories:
  - MapLibre
tags:
  - geografische Daten
  - Tilemaker
  - Openstreetmap
---



## Create and use self-hosted maps and vector tiles with Tilemaker

When a digital map is shown in a web application, web developers usually use online services. However, for many applications this is not necessary. It is not that complicated to create maps yourself and host them on your own web space. Freely available data from OpenStreetmap and open source tools help to create individual vector graphic maps for a website/web application. The only problem in my eyes is the amount of data. But mostly it is not necessary to include the whole world in the map.

> Hosting the whole planet requires significant amounts of storage. In April 2022 the file size is 63 GB [^wiki.openstreetmap.org/wiki/EN:Planet.osm]. 

In this post, I show how I created a map using data from OpenStreetmap and _Tilemaker_ for the German state of Rhineland-Palatinate on my local machine. I am currently working under Ubuntu 20.04.

### Creating a regional openstreetmap data export

> The bounding box [^wiki.openstreetmap.org/wiki/EN:Bounding_Box] of Rhineland-Palatinate is `bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711`. A handy tool to determine the bounding box coordinates is boundingbox[^boundingbox.klokantech.com] or calc[^tools.geofabrik.de/calc/].

First, we need to create an export of the region we want to host. It is possible to get pre-made exports from here: GeoFabrik[download.geofabrik.com]. Note though that when we want to export a region, we actually want a rectangular export. So we also want to include some parts around the border. Geofabrik exports are extracted around the borders of the region, and the areas around them appear as gray areas when we display the map on a rectangular area.

So we want to export a country, for example Rhineland-Palatinate. We can generate a rectangular section from a larger region, for example Germany. I create the section using the Osmium tool. So, we first download the area Germany from GeoFabrik. The next step is to set the bounding box of the region we want to extract.

> Because Rhineland-Palatinate is on the edge of Germany, I should have chosen Europe as the larger data source so that it is actually rectangular.

The bounding box I chose is: `6.1173598760 48.9662745077 8.5084754437 50.940443571`[^tools.geofabrik.de/calc/#type=geofabrik_standard&bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711&tab=1&proj=EPSG:4326&places=2]

Under Ubuntu I install the tool _Osmium_ via:

```
$ sudo apt-get install osmium-tool
```

Then I create the regional export for the German state of Rhineland-Palatinate:

```
$ osmium extract --bbox=6.1173598760,48.9662745077,8.5084754437,50.9404435711 --set-bounds --strategy=smart germany-latest.osm.pbf  --output rlp.osm.pbf
```

In the end I have a rectangular section of the region to host myself in the file `rlp.osm.pbf`.

### Creating Vector Tiles

The next step is to create vector tiles from the regional export. For this I use Tilemaker[^github.com/systemed/tilemaker]. 

```
git clone https://github.com/systemed/tilemaker.git
cd tilemaker

```
After that I compile and install Tilemaker via `make` and `sudo make install`.

```
$ make
...
$ sudo make install
Using Lua 5.1 (include path is -I/usr/include/lua5.1, library path is -llua5.1)
install -m 0755 -d /usr/local/bin/
install -m 0755 tilemaker /usr/local/bin/
install -d /usr/share/man/man1/
install docs/man/tilemaker.1 /usr/share/man/man1/
```

It is not relevant for Rhineland-Palatinate, but sometimes you need data from international waters and coastal areas. Openstreetmap provides these on the website `osmdata.openstreetmap.de`.

```
wget https://osmdata.openstreetmap.de/download/water-polygons-split-4326.zip
unzip water-polygons-split-4326.zip
```

Now I have everything I need and create the map using Tilemaker. First I get an overview of the options:

```
$ ./tilemaker --help
tilemaker v2.2.0
Convert OpenStreetMap .pbf files into vector tiles

Available options:
  --help                       show help message
  --input arg                  source .osm.pbf file
  --output arg                 target directory or .mbtiles/.sqlite file
  --bbox arg                   bounding box to use if input file does not have 
                               a bbox header set, example: 
                               minlon,minlat,maxlon,maxlat
  --merge                      merge with existing .mbtiles (overwrites 
                               otherwise)
  --config arg (=config.json)  config JSON file
  --process arg (=process.lua) tag-processing Lua file
  --store arg                  temporary storage for node/ways/relations data
  --compact                    Reduce overall memory usage (compact mode).
                               NOTE: This requires the input to be renumbered 
                               (osmium renumber)
  --verbose                    verbose error output
  --skip-integrity             don't enforce way/node integrity
  --threads arg (=0)           number of threads (automatically detected if 0)
```

#### Output options

When you generate your maps with Tilemaker, there are two output options: _directory_ and _mbtiles_.

##### Directory

With _Tilemaker_ it is possible to generate the tile files as single files into a directory. I will not use this option for now. I use _mbtiles_ and will unpack the mbtiles file later on another server for publishing. When styling on my development server, a single file is more handy.

> Be sure to set `"compress":` to `"none"` in the configuration file. In this example this is the file `config-openmaptiles.json`!

Do you want to create all `pbf` files one by one into one directory? Then it is sufficient not to use an extension in the `output` parameter. For example `--output rlp.mbtiles` puts all `pbf` files into the file `rlp.mbtiles`. `--output rlp` puts all pbf files individually in the `rlp` directory.

```
$ ./tilemaker --input ./rlp.osm.pbf --output rlp --process ./resources/process-openmaptiles.lua --config ./resources/config-openmaptiles.json
```

In this example the files are created in the directory `rlp`. In this directory there are a number of directories and a file called `metadata.json`.

##### mbtiles

The `mbtiles` file is a `sqlite3` database that can be read by server-side scripting languages like PHP LUA or NodeJs. Tileservers like tileserver-php open this file and read the tile data as soon as the client requests it. This is the environment I choose for my working environment.

I call the following command, using the provided sample configuration from openmaptiles.org for simplicity. 

> If you plan to offer the vector tiles later not as a file, but to unpack them into a directory, it is important to set the property `"compress":` in the file `config-openmaptiles.json` to `"none"`!

```
$ ./tilemaker --input ./rlp.osm.pbf --output rlp.mbtiles --process ./resources/process-openmaptiles.lua --config ./resources/config-openmaptiles.json
```

When the conversion is finished and everything went without errors, the following is displayed at the end 

```
Filled the tileset with good things at rlp.mbtiles
```

Voila! The tiles are now ready for the web server!

### Hosting the vector tiles

For hosting the vector tiles we need a web server with PHP enabled. Also, the PHP server should be sqlite-enabled, since the mbtiles files are basically a sqlite database file that will be opened by our tile server. To host the map, we will use tileserver-php[^github.com/maptiler/tileserver-php]. Clone this repository to your web server using git:

```
/srv/www$ git clone  https://github.com/maptiler/tileserver-php
Klone nach 'tileserver-php' …
remote: Enumerating objects: 574, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 574 (delta 2), reused 0 (delta 0), pack-reused 567
Empfange Objekte: 100% (574/574), 1.47 MiB | 739.00 KiB/s, fertig.
Löse Unterschiede auf: 100% (290/290), fertig.
```

Copy the mbtiles file you just created into the tileserver-php directory. In our example this is the file `rlp.mbtiles` and it should be in the directory `/srv/www/tileserver-php` at the end.

If you are using the Apache web server, everything is now set. Open the url to `tileserver.php` and look at your map. In my case this is the URL `https://localhost/tileserver-php/tileserver.php`. You see the raw version of the lines and points.

![Tileserver PHP](/images/maplibrevector1.png)

### Vector Tiles on your website

Now we are ready to use the generated tiles on our own website. For this we use the _MapLibre GL JS_[^maplibre.org/] library along with a style from OpenMapTiles[^https://openmaptiles.org/styles/]. Create a small HTML document that displays the map:

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Display a map on a webpage</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src='https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.js'></script>
    <link href='https://unpkg.com/maplibre-gl@2.1.9/dist/maplibre-gl.css' rel='stylesheet' />
</head>

<body>
    <div id='map' style='width: 800px; height: 800px;'></div>
    <script>
        var map = new maplibregl.Map({
            container: 'map',
            style: 'rlp.json',
            center: [7, 50],
            zoom: 4
        });
        map.addControl(new maplibregl.NavigationControl());
    </script>
</body>

</html>
```


Furthermore, you need styles to make the raw lines and points more attractive. For now, choose a ready-made style file. You can download it from the demo of this post [astridx.github.io/vectortiles/rlp.json] or use another style from [OpenMapTiles](https://openmaptiles.org/styles/). Customize two URLs to your individual environment. The URLs point to your tile server. The name `rlp.json` is mandatory if the `mbtiles` file is called `rlp`: the name of the `mbtiles` file must match the name of the `json` style file!

In the `rlp.json` file it is important that the URL in the `glyphs` property points to fonts. We will get these fonts in the next step. Also, the URL in the `sources` property may be different in your environment and therefore need to be modified.

```
{
    "version": 8,
    "name": "Basic",
    "metadata": {
      "mapbox:autocomposite": false,
      "mapbox:type": "template",
      "maputnik:renderer": "mbgljs",
      "openmaptiles:version": "3.x",
      "openmaptiles:mapbox:owner": "openmaptiles",
      "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t"
    },
    "sources": {
      "openmaptiles": {
        "type": "vector",
          "url": "metadata.json"
      }
    },
    "glyphs": "fonts/{fontstack}/{range}.pbf",
    "layers": [
...      

```

I store the data for the property `sources` in the file `metadata.json`, which I save in the same directory as the `rlp.json`. In this file I modify the URL in the property `tiles`.

```
{
    "tilejson": "2.0.0",
    "scheme": "xyz",
    "type": "baselayer",
    "format": "pbf",
    "tiles": [
        "https://localhost/tileserver-php/tileserver.php?/index.json?/rlp/{z}/{x}/{y}.pbf"
    ],
...
```

When modifying the `glyphs` property you have already seen that fonts are necessary on your server. Here you can also use ready-made fonts for the time being. klokantech[^github.com/klokantech/klokantech-gl-fonts] offers a package with fonts on Github. Clone it into your webserver directory and set symlinks.

```
git clone https://github.com/klokantech/klokantech-gl-fonts fonts
ln -sf 'KlokanTech Noto Sans Bold' fonts/Bold
ln -sf 'KlokanTech Noto Sans Regular' fonts/Regular
```

![Webserver directory to publish a mbtiles file](/images/maplibrevector3.png)

Check out your own hosted map now.

![Webserver view to of the mbtiles file](/images/maplibrevector4.png)

### Unpack MBTiles

You have seen: It is possible to host the `mbtile` file generated by Tilemaker, via tile servers like _tileserver-php_. This is convenient for a development environment. However, it is more performant to load the vector tiles directly from a static web server. Besides, handling large files is problematic in certain environments. For example, special steps are required to publish a demo [astridx.github.io/vectortiles/index.html] on _github.io_ if there is a file larger than 100 MB in the package. 

As mentioned before, you can use _Tilemaker_ to create individual `pbf` files in a directory. In my workaround I prefer to work with `mbtiles` files and unzip the file intended for publishing at the end. For this purpose there is a tool called _mbutil_. 

Install _mbutil_ and _Python_ and get an overview of the options of _mbutil_.

```
git clone https://github.com/mapbox/mbutil.git

sudo apt-get install python3 

cd mbutil/

./mbutil/mb-util -h
```

I unpack the file `rlp.mbtiles` via 

```
./mbutil/mb-util rlp.mbtiles rlpdir --image_format=pbf 
```

> Reminder: For static hosting the tiles must not be compressed! When creating them, `"compress": "none"` must have been activated in the configuration of Tilemaker.

In my web server directory I now have the following files:

![webserver directory for publishing static vector tiles](/images/maplibrevector2.png)

I do not need the file `tileserver.php` anymore. The file `rlp.mptiles` has been replaced by the directory `rlp`. I have to adjust the URL to the `tiles` in the file `metadata.json`. This is now `"https://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf"` instead of `"https://localhost/tileserver-php/tileserver.php?/index.json?/rlp/{z}/{x}/{y}.pbf"`. 

![Webserver Verzeichnis zum Veröffentlichen von statischen Vector Tiles](/images/maplibrevector2.png)

```
{
    "tilejson": "2.0.0",
    "scheme": "xyz",
    "type": "baselayer",
    "format": "pbf",
    "tiles": [
        "https://localhost/tileserver-php/rlp/{z}/{x}/{y}.pbf"
    ],
...
```

You can see the result under [Demo](https://astridx.github.io/vectortiles/index.html)[^astridx.github.io/vectortiles/index.html].

### Links 

- Generating self-hosted maps using tilemaker[^blog.kleunen.nl/blog/tilemaker-generate-map]
- VectorTiles mithilfe von Tilemaker erstellen und nutzen[^youtube.com/watch?v=8J0J41YsAbc]
- Tipps zur Performance[^blog.kleunen.nl/blog/improving-tilemaker-hosting-speed]
- Planet[^wiki.openstreetmap.org/wiki/Planet.osm]
- GeoFabrik[^download.geofabrik.de]
- OSMData[^osmdata.openstreetmap.de/download/water-polygons-split-4326.zip]
- GeoFabrik Calc[^tools.geofabrik.de/calc]
- Osmium-tool[^github.com/osmcode/osmium-tool]
- OSMConvert[^wiki.openstreetmap.org/wiki/Osmconvert]
- Tilemaker[^github.com/systemed/tilemaker]
- Tileserver-php[^github.com/maptiler/tileserver-php]
- MapLibre[^maplibre.org]
- Klokantech GL fonts[^github.com/klokantech/klokantech-gl-fonts]
- OpenMapTiles styles[^openmaptiles.org/styles]
