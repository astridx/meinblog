---
date: 2020-01-04
title: 'Webservices - Unterstützen der Joomla-API'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-webservices
categories:
  - Code
tags:
  - CMS
  - Joomla
---

In diesem Teil werfen wir einen Blick auf die Joomla 4-API und den Zugriff auf Joomla 4-Inhalte. Eine [Programmierschnittstelle](https://de.wikipedia.org/wiki/Programmierschnittstelle) - kurz API (von englisch application programming interface) - ist ein Programmteil, der von einem Softwaresystem anderen Programmen zur Anbindung an das System zur Verfügung gestellt wird. Heutzutage bieten viele Online-Dienste APIs; diese heißen dann Webservice(https://de.wikipedia.org/wiki/Webservice). Das Vorhandensein einer dokumentierten Programmierschnittstelle (API) für eine Joomla-Komponente ermöglicht es anderen, zusätzliche Software für diese zu erstellen oder Daten in eigenen Programmen zu nutzen – zusammenzuarbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t29...t30) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

#### Komponente

##### [src/api/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t29...t30#diff-dab91e8b720388ab0c28e2fba29c4c40)

Erstelle den Controller `FooController` die von `ApiController` erbt. In der Klasse `ApiController` ist alles Notwendige implementiert. Wenn du keine abweichenden Anforderungen hast, dann ist das Rad erfunden. Überschreibe die folgenden Felder für deine Komponente: 

`protected $contentType = 'foos';` und `protected $default_view = 'foos';`.

- `$contentType` - wird standardmäßig für `$modelName` verwendet.
- `$default_view` - ist Standard für `$viewName`.

```php
<?php
namespace Joomla\Component\Foos\Api\Controller;

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

##### [src/api/components/com_foos/src/View/Foos/JsonapiView.php](https://github.com/astridx/boilerplate/compare/t29...t30#diff-191b4165f0ea6df622e83c844c919187)

Erstelle die Schnittstelle `JsonapiView` die von `BaseApiView` erbt. Greife wieder auf fertigen Joomla Code zu. Überschreibe die folgenden Felder für deine Komponente: 

`protected $fieldsToRenderItem = ['id', 'alias', 'name', 'catid'];` und `protected $fieldsToRenderList = ['id', 'alias', 'name', 'catid'];`.

- `$fieldsToRenderItem` - Array mit Informationen zum Anzeigen eines einzelnen Objekts.
- `$fieldsToRenderList` - Array mit Inhalten zum Auflisten von Objekten.

```php
<?php
namespace Joomla\Component\Foos\Api\View\Foos;

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


##### [src/plugins/webservices/foos/foos.php](https://github.com/astridx/boilerplate/compare/t29...t30#diff-40f93df99ac26b4f2227f6916930d089)

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

##### [src/plugins/webservices/foos/foos.xml](https://github.com/astridx/boilerplate/compare/t29...t30#diff-9edff0e14d874c7924bbeaada9d5b3d9)

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

#### [src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.ini](https://github.com/astridx/boilerplate/compare/t29...t30#diff-ea87c7478e8b139eba5cfa201d65126f)

Die Spachdateien füge ich der Vollständigkeit halber bei.

```ini
PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

#### [src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini](https://github.com/astridx/boilerplate/compare/t29...t30#diff-4d953946983e4ca61a815fe58c527837)

Auch diese Spachdatei füge ich der Vollständigkeit halber bei.

```ini
PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

### Geänderte Dateien

### Komponente

#####  [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t29...t30#diff-1ff20be1dacde6c4c8e68e90161e0578)

In der Installationsdatei ist wichtig, den Ordner `api` aufzunehmen. Sonst werden die Dateien im Unterordner `api` bei einer Installation nicht in das richtige Verzeichnis kopiert.

```xml
<api>
		<files folder="api/components/com_foos">
			<folder>src</folder>
		</files>
</api>
```

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und Kopiere alle Dateien erneut.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.
Kopiere die Dateien im `api` Ordner in den `api` Ordner deiner Joomla! 4 Installation.
Kopiere die Dateien im `plugin` Ordner in den `plugin` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten __und das Plugin__ wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Aktiviere das Plugin

![Joomla Plugin aktivieren](/images/j4x35x1.png)

3. Aktive das Plugin *Basic Auth*

![Joomla Plugin Basic Auth aktivieren](/images/j4x35x2.png)

4. Die Schnittstelle bietet dir nun folgende Abfragemöglichkeiten:

- Eine Liste von Foos 
`curl -X GET /api/index.php/v1/foos`

- Ein einzelnes Foo-Element
`curl -X GET /api/index.php/v1/foos/{foo_id}`

- Lösche ein Foo Element
`curl -X DELETE /api/index.php/v1/foos/{foo_id}`

> Bei den Beispielen gehe ich davon aus, dass deine Installation unter `http://localhost/joomla-cms4` befindet und dein Benutzer sowie dein Passwort `admin` lauten. Für [Curl](https://curl.haxx.se/) ist es erforderlich, dass du das Passwort in [Base64](https://de.wikipedia.org/wiki/Base64) umwandelst. Eine Website, die dir dies abnimmt, ist [base64encode.org](https://www.base64encode.org/).

Nutzt du [Curl](https://curl.haxx.se/)? Die folgende Abfrage listet dir alle Elemente auf: 

```bash
curl --location --request GET 'http://localhost/joomla-cms4/api/index.php/v1/foos' \
--header 'Accept: application/vnd.api+json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4='
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

Nutzt du [Postman](https://www.postman.com/)? Dann ist meine [Kollektion](https://github.com/astridx/boilerplate/blob/tutorial/tutorial/component/30/Content%20und%20Foos.postman_collection.json) unter Umständen hilfreich für dich. In ihr sind zusätzlich Abfragen für `com_content` enthalten. 


> Ich nutze gerne [dieses Addon](https://addons.mozilla.org/en-US/firefox/addon/restclient/) in Firefox.

## Geänderte Dateien

### Übersicht

### Links

[Joomla API-Spezifikation](https://docs.joomla.org/J4.x:Joomla_Core_APIs/de)

[Joomla Core-API](https://docs.joomla.org/J4.x:Joomla_Core_APIs/de)

[Integration in Weblinks](https://github.com/joomla-extensions/weblinks/pull/407)