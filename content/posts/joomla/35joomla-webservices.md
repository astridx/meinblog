---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-08-09
title: 'Webservices - Unterstützen der Joomla-API'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-webservices
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











In diesem Teil werfen wir einen Blick auf die Joomla 4-API und den Zugriff auf Joomla 4-Inhalte. Eine [Programmierschnittstelle](https://de.wikipedia.org/wiki/Programmierschnittstelle) - kurz API (von englisch application programming interface) - ist ein Programmteil, der von einem Softwaresystem anderen Programmen zur Anbindung an das System zur Verfügung gestellt wird. Heutzutage bieten viele Online-Dienste APIs; diese heißen dann [Webservice](https://de.wikipedia.org/wiki/Webservice). Das Vorhandensein einer dokumentierten Programmierschnittstelle (API) für eine Joomla-Komponente macht es möglich, mit anderen zusammenzuarbeiten. Entweder über zusätzliche Software, welche die API per Erweiterung nutzt oder Daten werden über die API in anderen Anwendungen nutzbar.<!-- \index{API} --><!-- \index{Webservices} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t29...t30)[^codeberg.org/astrid/j4examplecode/compare/t29...t30] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### Komponente

##### api/components/com_foos/src/Controller/FooController.php

Erstelle den Controller `FooController` der von `ApiController` erbt. In der Klasse `ApiController` ist alles Notwendige implementiert. Wenn du keine abweichenden Anforderungen hast, dann ist das Rad erfunden. Überschreibe lediglich die folgenden Felder für deine Komponente:

`protected $contentType = 'foos';` und `protected $default_view = 'foos';`.

- `$contentType` - wird standardmäßig für `$modelName` verwendet.
- `$default_view` - ist Standard für `$viewName`.

```php {numberLines: -2}
//
<?php
namespace FooNamespace\Component\Foos\Api\Controller;

defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\ApiController;
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;

class FooController extends ApiController
{
	protected $contentType = 'foos';

	protected $default_view = 'foos';

	protected function save($recordKey = null)
	{
		$data = (array) json_decode($this->input->json->getRaw(), true);

		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
		{
			if (isset($data[$field->name]))
			{
				!isset($data['com_fields']) && $data['com_fields'] = [];

				$data['com_fields'][$field->name] = $data[$field->name];
				unset($data[$field->name]);
			}
		}

		$this->input->set('data', $data);

		return parent::save($recordKey);
	}
}
```

##### api/components/com_foos/src/View/Foos/JsonapiView.php

Erstelle die Schnittstelle `JsonapiView` die von `BaseApiView` erbt. Greife wieder auf fertigen Joomla Code zu. Überschreibe die folgenden Felder für deine Komponente:

`protected $fieldsToRenderItem = ['id', 'alias', 'name', 'catid'];` und `protected $fieldsToRenderList = ['id', 'alias', 'name', 'catid'];`.

- `$fieldsToRenderItem` - Array mit Informationen zum Anzeigen eines einzelnen Objekts.
- `$fieldsToRenderList` - Array mit Inhalten zum Auflisten von Objekten.

```php
<?php
namespace FooNamespace\Component\Foos\Api\View\Foos;

defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\JsonApiView as BaseApiView;
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;

class JsonapiView extends BaseApiView
{
	protected $fieldsToRenderItem = ['id', 'alias', 'name', 'catid'];

	protected $fieldsToRenderList = ['id', 'alias', 'name', 'catid'];

	public function displayList(array $items = null)
	{
		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
		{
			$this->fieldsToRenderList[] = $field->id;
		}

		return parent::displayList();
	}

	public function displayItem($item = null)
	{
		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
		{
			$this->fieldsToRenderItem[] = $field->name;
		}

		return parent::displayItem();
	}

	protected function prepareItem($item)
	{
		foreach (FieldsHelper::getFields('com_foos.foo', $item, true) as $field)
		{
			$item->{$field->name} = isset($field->apivalue) ? $field->apivalue : $field->rawvalue;
		}

		return parent::prepareItem($item);
	}
}
```

#### Plugin

##### plugins/webservices/foos/foos.php

In der Plugin-Datei erstellen wir die Klasse `PlgWebservicesFoos` und registrieren in der `onBeforeApiRoute`-Methode alle Routen, die wir für den Webservice benötigen.

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\ApiRouter;

class PlgWebservicesFoos extends CMSPlugin
{
	protected $autoloadLanguage = true;

	public function onBeforeApiRoute(&$router)
	{
		$router->createCRUDRoutes(
			'v1/foos',
			'foo',
			['component' => 'com_foos']
		);

		$router->createCRUDRoutes(
			'v1/foos/categories',
			'categories',
			['component' => 'com_categories', 'extension' => 'com_foos']
		);
	}
}

```

##### plugins/webservices/foos/foos.xml

Um das Plugin zu installieren, ist eine Installationsdatei notwendig. Die kennst du von der Komponente.

```xml
<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="webservices" method="upgrade">
	<name>plg_webservices_foos</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_WEBSERVICES_FOOS_XML_DESCRIPTION</description>
	<files>
		<filename plugin="foos">foos.php</filename>
		<folder>language</folder>
	</files>
</extension>
```

#### plugins/webservices/foos/language/en-GB/plg_webservices_foos.ini

Die Sprach-Dateien füge ich der Vollständigkeit halber bei.

```ini
PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

#### plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini

Auch die Sprach-Datei, welche in Hautpsache der für die Installation und die Erstellung des Menüs im Dashboard zuständig ist, füge ich bei.

```ini
PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

### Geänderte Dateien

### Komponente

<!-- prettier-ignore -->
#### administrator/components/com_foos/foos.xml

In der Installationsdatei ist wichtig, den Ordner `api` aufzunehmen. Sonst werden die Dateien im Unterordner `api` bei einer Installation nicht in das richtige Verzeichnis kopiert.

```xml {diff}
 			<folder>tmpl</folder>
 		</files>
 	</administration>
+	<api>
+		<files folder="api/components/com_foos">
+			<folder>src</folder>
+		</files>
+	</api>
 	<changelogurl>https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/changelog.xml</changelogurl>
 	<updateservers>
 		<server type="extension" name="Foo Updates">https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/foo_update.xml</server>
```

#### Verschiedenes

##### Öffentliche Api

Routen können durch Setzen eines Flags als öffentlich deklariert werden. Allerdings ist dies gefährlich und kann sensible Informationen preisgeben. Du kannst den öffentlichen Zugang bei der Registrierung der Route festlegen. Wenn Du `Joomla\CMS\Router\ApiRouter::createCRUDRoutes()` verwendest, übergebe das vierte Argument mit true, um `public GETs` zu aktivieren.

```php
...
$router->createCRUDRoutes(
    'v1/foos',
    'foos',
    ['component' => 'com_foos'],
    true
);
...
```

Oder wenn du die Route manuell instanziierst verwende Code analog zum nachfolgenden Beispiel.

```php
...
$route = new Joomla\Router\Route(['GET'], 'v1/foos', 'foos.displayList', [], ['component' => 'com_foos', 'public' => true]);
$router->addRoute($route);
...
```

Weitere Informationen findest du im PR 27021[^github.com/joomla/joomla-cms/pull/27021] oder unter joomla.stackexchange.com[^joomla.stackexchange.com/questions/32320/joomla-api-and-credentials].

##### Joomla API und benutzerdefinierte URL

API Urls enthalten das Wort `/api`. Zum Beispiel `http://localhost/joomla-cms4/api/index.php/v1/foos`. Wenn du eine andere URL brauchst, ist es möglich, über die Datei `.htaccess` umzuleiten.

```
Redirect 301 /yourCustomFolder /api/v1/foos/index.php/yourCustomFolder
```

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut. Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `api` Ordner in den `api` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `plugin` Ordner in den `plugin` Ordner deiner Joomla 4 Installation. Installiere deine Komponente **und das Plugin** wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Aktiviere das Plugin

![Joomla Plugin aktivieren](/images/j4x35x1.png)

3. Aktive das Plugin _Basic Auth_

![Joomla Plugin Basic Auth aktivieren](/images/j4x35x2.png)

4. Die Schnittstelle bietet dir nun folgende Abfragemöglichkeiten:

Eine Liste von Foos: `curl -X GET /api/index.php/v1/foos`  
Ein einzelnes Foo-Element: `curl -X GET /api/index.php/v1/foos/{foo_id}`  
Lösche ein Foo Element: `curl -X DELETE /api/index.php/v1/foos/{foo_id}`

Bei den nachfolgenden Beispielen gehe ich davon aus, dass deine Installation unter `http://localhost/joomla-cms4` befindet und dein Benutzer sowie dein Passwort `adminadminadmin (Base64: YWRtaW5hZG1pbmFkbWluOmFkbWluYWRtaW5hZG1pbg==)`, lauten. Ändere diese Angaben gegebenenfalls.

### curl.haxx.de

Für [Curl](https://curl.haxx.se/) ist es erforderlich, dass du das Passwort in [Base64](https://de.wikipedia.org/wiki/Base64) umwandelst. Eine Website, die dir dies abnimmt, ist [base64encode.org](https://www.base64encode.org/).

Nutzt du [Curl](https://curl.haxx.se/)[^curl.haxx.se]? Die folgende Abfrage listet dir alle Elemente auf:

```
curl --location --request GET 'http://localhost/joomla-cms4/api/index.php/v1/foos' \
--header 'Accept: application/vnd.api+json' \
--header 'Authorization: Basic YWRtaW5hZG1pbmFkbWluOmFkbWluYWRtaW5hZG1pbg=='
```

Das Ausgabeformat ist JSON und sieht beispielsweise wie folgt aus:

```json
{
  "links": {
    "self": "http://localhost/joomla-cms4/api/index.php/v1/foos"
  },
  "data": [
    {
      "type": "foos",
      "id": "2",
      "attributes": {
        "id": 2,
        "name": "Astrid",
        "catid": 8
      }
    },
    {
      "type": "foos",
      "id": "3",
      "attributes": {
        "id": 3,
        "name": "Elmar",
        "catid": 0
      }
    },
    {
      "type": "foos",
      "id": "1",
      "attributes": {
        "id": 1,
        "name": "Nina",
        "catid": 0
      }
    }
  ],
  "meta": {
    "total-pages": 1
  }
}
```

Das Mitgeben der Anmeldeinformationen ist zwingend. Zusammen sieht der Aufruf in einer Konsole wie folgt aus:

```
$ curl -X GET -H 'Authorization: Basic YWRtaW5hZG1pbmFkbWluOmFkbWluYWRtaW5hZG1pbg==' -i 'http://localhost/joomla-cms4/api/index.php/v1/foos'
HTTP/1.1 200 OK
Date: Tue, 16 May 2023 20:34:34 GMT
Server: Apache/2.4.54 (Unix) OpenSSL/1.1.1o
x-frame-options: SAMEORIGIN
referrer-policy: strict-origin-when-cross-origin
cross-origin-opener-policy: same-origin
X-Powered-By: JoomlaAPI/1.0
Expires: Wed, 17 Aug 2005 00:00:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
Upgrade: h2,h2c
Connection: Upgrade
Last-Modified: Tue, 16 May 2023 20:34:34 GMT
Transfer-Encoding: chunked
Content-Type: application/vnd.api+json; charset=utf-8

{"links":{"self":"http:\/\/localhost\/joomla-cms\/api\/index.php\/v1\/foos"},"data":[{"type":"foos","id":"2","attributes":{"id":2,"name":"Astrid","catid":8}},{"type":"foos","id":"3","attributes":{"id":3,"name":"Elmar","catid":0}},{"type":"foos","id":"1","attributes":{"id":1,"name":"Nina","catid":0}}],"meta":{"total-pages":1}}
```

### postman.com

Nutzt du postman.com? Dann ist meine [Kollektion](https://github.com/astridx/boilerplate/blob/tutorial/tutorial/component/30/Content%20und%20Foos.postman_collection.json)[^github.com/astridx/boilerplate/blob/tutorial/tutorial/component/30/Content%20und%20Foos.postman_collection.json] unter Umständen hilfreich für dich. In ihr sind zusätzlich Abfragen für `com_content` enthalten.

### Sonstiges

#### Firefox Addon

Ich nutze gerne [dieses Addon](https://addons.mozilla.org/de/firefox/addon/restclient/)[^addons.mozilla.org/de/firefox/addon/restclient] in Firefox.

## Links

[Joomla API-Spezifikation](https://docs.joomla.org/J4.x:Joomla_Core_APIs/de)[^docs.joomla.org/J4.x:Joomla_Core_APIs]

[Integration in Weblinks](https://github.com/joomla-extensions/weblinks/pull/407)[^github.com/joomla-extensions/weblinks/pull/407]
<img src="https://vg08.met.vgwort.de/na/01fa65fba2a743bb8e08bf4f6872e79f" width="1" height="1" alt="">
