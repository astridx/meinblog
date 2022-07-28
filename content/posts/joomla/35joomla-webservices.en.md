---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-15
title: 'Web Services - Support Joomla API'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-webservices
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

In this part we will take a look at the Joomla 4 API and how to access Joomla 4 content. A [programming interface](https://de.wikipedia.org/wiki/Programmierschnittstelle) - API for short (from English application programming interface) - is a program part that is made available by a software system to other programs for connection to the system. Nowadays, many online services provide APIs; these are then called [web service](https://de.wikipedia.org/wiki/Webservice). The existence of a documented programming interface (API) for a Joomla component allows others to create additional software for it or to use data in their own programs - to collaborate.<!-- \index{API} --><!-- \index{web services} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t29...t30)[^github.com/astridx/boilerplate/compare/t29...t30] and copy these changes into your development version.

## Step by step

### New files

#### Component

##### api/components/com_foos/ src/Controller/FooController.php

Create the controller `FooController` which inherits from `ApiController`. Everything necessary is implemented in the class `ApiController`. If you have no other requirements, then it is made up. Just overwrite the following fields for your component:

`protected $contentType = 'foos';` and `protected $default_view = 'foos';`.

- `$contentType` - is default for `$modelName`.
- `$default_view` - is default for `$viewName`.

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

Create the interface `JsonapiView` that inherits from `BaseApiView`. Use again ready-made Joomla code. Overwrite the following fields for your component:

`protected $fieldsToRenderItem = ['id', 'alias', 'name', 'catid'];` and `protected $fieldsToRenderList = ['id', 'alias', 'name', 'catid'];`.

- `$fieldsToRenderItem` - array of information to display a single item.
- `$fieldsToRenderList` - Array with contents for listing objects.

```php {numberLines: -2}
//

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

In the plugin file we create the class `PlgWebservicesFoos` and register in the `onBeforeApiRoute` method all the routes we need for the web service.

```php {numberLines: -2}
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

To install the plug-in, an installation file is necessary. You know this from the component.

```xml {numberLines: -2}
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

I am attaching the language files for the sake of completeness.

```ini {numberLines: -2}
<!-- -->

PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

#### plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini

I am also attaching this language file for the sake of completeness.

```xml {numberLines: -2}
<!-- -->

PLG_WEBSERVICES_FOOS="Web Services - Foos"
PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
```

### Modified files

### Component

<!-- prettier-ignore -->
#### administrator/components/com_foos/ foos.xml

In the installation file it is important to include the folder `api`. Otherwise the files in the subfolder `api` will not be copied to the correct directory during an installation.

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

## Test your Joomla component

1. create a new installation. To do this, uninstall your previous installation and copy all files again. Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `api` folder into the `api` folder of your Joomla 4 installation. Copy the files in the `plugin` folder into the `plugin` folder of your Joomla 4 installation. Install your component **and the plugin** as described in part one, after copying all files. 2.

2. activate the plugin

![Activate Joomla Plugin](/images/j4x35x1.png)

3. activate the Plugin _Basic Auth_

![Activate Joomla Plugin Basic Auth](/images/j4x35x2.png)

4. the interface now offers you the following query options:

A list of Foos: `curl -X GET /api/index.php/v1/foos`  
A single Foo element: `curl -X GET /api/index.php/v1/foos/{foo_id}`  
Delete a Foo element: `curl -X DELETE /api/index.php/v1/foos/{foo_id}`

> For the examples, I assume that your installation is located at `http://localhost/joomla-cms4` and that your user and password are `admin`. Change this if necessary.

> For [Curl](https://curl.haxx.se/)[^curl.haxx.se] you need to change the password to [Base64](https://de.wikipedia.org/wiki/Base64). A website that does this for you is [base64encode.org](https://www.base64encode.org/).

Do you use [Curl](https://curl.haxx.se/)? The following query will list all the elements:

```
curl --location --request GET 'http://localhost/joomla-cms4/api/index.php/v1/foos' \
--header 'Accept: application/vnd.api+json' \
--header 'Authorization: Basic YWRtaW46YWRtaW4='
```

The output format is JSON and looks like this:

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

Do you use [postman.com](https://www.postman.com/)? Then the [collection](https://github.com/astridx/boilerplate/blob/tutorial/tutorial/component/30/Content%20und%20Foos.postman_collection.json)[^github.com/astridx/boilerplate/blob/tutorial/tutorial/component/30/content%20und%20foos.postman_collection.json] might be helpful for you. It contains additional queries for `com_content`.

> I like to use the addon [restclient](https://addons.mozilla.org/en-US/firefox/addon/restclient/)[^addons.mozilla.org/en-us/firefox/addon/restclient/] in Firefox.

## Links

[Joomla API Specification](https://docs.joomla.org/J4.x:Joomla_Core_APIs)[^docs.joomla.org/j4.x:joomla_core_apis]

[Joomla Core-API](https://docs.joomla.org/J4.x:Joomla_Core_APIs/)[^docs.joomla.org/j4.x:joomla_core_apis]

[Integration in Weblinks](https://github.com/joomla-extensions/weblinks/pull/407)[^github.com/joomla-extensions/weblinks/pull/407]
<img src="https://vg08.met.vgwort.de/na/97f9021f918a4a05bb5471a222790da9" width="1" height="1" alt="">
