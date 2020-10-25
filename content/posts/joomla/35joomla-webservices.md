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

In diesem Teil werfen wir einen Blick auf die Joomla 4-API und den Zugriff auf Joomla 4-Inhalte. Eine [Programmierschnittstelle](https://de.wikipedia.org/wiki/Programmierschnittstelle) - kurz API (von englisch application programming interface) - ist ein Programmteil, der von einem Softwaresystem anderen Programmen zur Anbindung an das System zur Verfügung gestellt wird. Heutzutage bieten viele Online-Dienste APIs; diese heißen dann [Webservice](https://de.wikipedia.org/wiki/Webservice). Das Vorhandensein einer dokumentierten Programmierschnittstelle (API) für eine Joomla-Komponente ermöglicht es anderen, zusätzliche Software für diese zu erstellen oder Daten in eigenen Programmen zu nutzen – zusammenzuarbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t29...t30) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

In diesem Abschnitt bearbeiten wir die Komponenten und fügen ein Plugin hinzu.

### Neue Dateien

#### Komponente

##### [src/api/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t29...t30#diff-dab91e8b720388ab0c28e2fba29c4c40)

Erstelle den Controller `FooController` der von `ApiController` erbt. In der Klasse `ApiController` ist alles Notwendige implementiert. Wenn du keine abweichenden Anforderungen hast, dann ist das Rad erfunden. Überschreibe lediglich die folgenden Felder für deine Komponente:

`protected $contentType = 'foos';` und `protected $default_view = 'foos';`.

- `$contentType` - wird standardmäßig für `$modelName` verwendet.
- `$default_view` - ist Standard für `$viewName`.

```php
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

##### [src/api/components/com_foos/src/View/Foos/JsonapiView.php](https://github.com/astridx/boilerplate/compare/t29...t30#diff-191b4165f0ea6df622e83c844c919187)

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

##### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t29...t30#diff-1ff20be1dacde6c4c8e68e90161e0578)

In der Installationsdatei ist wichtig, den Ordner `api` aufzunehmen. Sonst werden die Dateien im Unterordner `api` bei einer Installation nicht in das richtige Verzeichnis kopiert.

```xml
<api>
		<files folder="api/components/com_foos">
			<folder>src</folder>
		</files>
</api>
```

## Teste deine Joomla-Komponente

1. Führe eine neue Installation durch. Deinstalliere hierzu deine bisherige Installation und kopiere alle Dateien erneut.

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.
Kopiere die Dateien im `api` Ordner in den `api` Ordner deiner Joomla! 4 Installation.
Kopiere die Dateien im `plugin` Ordner in den `plugin` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponente **und das Plugin** wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast.

2. Aktiviere das Plugin

![Joomla Plugin aktivieren](/images/j4x35x1.png)

3. Aktive das Plugin _Basic Auth_

![Joomla Plugin Basic Auth aktivieren](/images/j4x35x2.png)

4. Die Schnittstelle bietet dir nun folgende Abfragemöglichkeiten:

Eine Liste von Foos: `curl -X GET /api/index.php/v1/foos`  
Ein einzelnes Foo-Element: `curl -X GET /api/index.php/v1/foos/{foo_id}`  
Lösche ein Foo Element: `curl -X DELETE /api/index.php/v1/foos/{foo_id}`

> Bei den Beispielen gehe ich davon aus, dass deine Installation unter `http://localhost/joomla-cms4` befindet und dein Benutzer sowie dein Passwort `admin` lauten. Ändere dies gegebenenfalls.

> Für [Curl](https://curl.haxx.se/) ist es erforderlich, dass du das Passwort in [Base64](https://de.wikipedia.org/wiki/Base64) umwandelst. Eine Website, die dir dies abnimmt, ist [base64encode.org](https://www.base64encode.org/).

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

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t29...t30.diff

diff --git a/src/administrator/components/com_foos/foos.xml b/src/administrator/components/com_foos/foos.xml
index a6f64efa..b78c5974 100644
--- a/src/administrator/components/com_foos/foos.xml
+++ b/src/administrator/components/com_foos/foos.xml
@@ -72,6 +72,11 @@
 			<folder>tmpl</folder>
 		</files>
 	</administration>
+	<api>
+		<files folder="api/components/com_foos">
+			<folder>src</folder>
+		</files>
+	</api>
 	<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
 	<updateservers>
 		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
diff --git a/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.ini b/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.ini
new file mode 100644
index 00000000..8fc54cb6
--- /dev/null
+++ b/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.ini
@@ -0,0 +1,2 @@
+PLG_WEBSERVICES_FOOS="Web Services - Foos"
+PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
diff --git a/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.sys.ini b/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.sys.ini
new file mode 100644
index 00000000..8fc54cb6
--- /dev/null
+++ b/src/administrator/components/com_foos/language/en-GB/plg_webservices_foos.sys.ini
@@ -0,0 +1,2 @@
+PLG_WEBSERVICES_FOOS="Web Services - Foos"
+PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
diff --git a/src/api/components/com_foos/src/Controller/FooController.php b/src/api/components/com_foos/src/Controller/FooController.php
new file mode 100644
index 00000000..657095b4
--- /dev/null
+++ b/src/api/components/com_foos/src/Controller/FooController.php
@@ -0,0 +1,68 @@
+<?php
+/**
+ * @package     Joomla.API
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Api\Controller;
+
+defined('_JEXEC') or die;
+
+use Joomla\CMS\MVC\Controller\ApiController;
+use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;
+
+/**
+ * The foos controller
+ *
+ * @since  __BUMP_VERSION__
+ */
+class FooController extends ApiController
+{
+	/**
+	 * The content type of the item.
+	 *
+	 * @var    string
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $contentType = 'foos';
+
+	/**
+	 * The default view for the display method.
+	 *
+	 * @var    string
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $default_view = 'foos';
+
+	/**
+	 * Method to save a record.
+	 *
+	 * @param   integer  $recordKey  The primary key of the item (if exists)
+	 *
+	 * @return  integer  The record ID on success, false on failure
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function save($recordKey = null)
+	{
+		$data = (array) json_decode($this->input->json->getRaw(), true);
+
+		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
+		{
+			if (isset($data[$field->name]))
+			{
+				!isset($data['com_fields']) && $data['com_fields'] = [];
+
+				$data['com_fields'][$field->name] = $data[$field->name];
+				unset($data[$field->name]);
+			}
+		}
+
+		$this->input->set('data', $data);
+
+		return parent::save($recordKey);
+	}
+}
diff --git a/src/api/components/com_foos/src/View/Foos/JsonapiView.php b/src/api/components/com_foos/src/View/Foos/JsonapiView.php
new file mode 100644
index 00000000..bd2ff186
--- /dev/null
+++ b/src/api/components/com_foos/src/View/Foos/JsonapiView.php
@@ -0,0 +1,96 @@
+<?php
+/**
+ * @package     Joomla.API
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+namespace FooNamespace\Component\Foos\Api\View\Foos;
+
+defined('_JEXEC') or die;
+
+use Joomla\CMS\MVC\View\JsonApiView as BaseApiView;
+use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;
+
+/**
+ * The foos view
+ *
+ * @since  __BUMP_VERSION__
+ */
+class JsonapiView extends BaseApiView
+{
+	/**
+	 * The fields to render item in the documents
+	 *
+	 * @var  array
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $fieldsToRenderItem = ['id', 'alias', 'name', 'catid'];
+
+	/**
+	 * The fields to render items in the documents
+	 *
+	 * @var  array
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $fieldsToRenderList = ['id', 'alias', 'name', 'catid'];
+
+	/**
+	 * Execute and display a template script.
+	 *
+	 * @param   array|null  $items  Array of items
+	 *
+	 * @return  string
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function displayList(array $items = null)
+	{
+		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
+		{
+			$this->fieldsToRenderList[] = $field->id;
+		}
+
+		return parent::displayList();
+	}
+
+	/**
+	 * Execute and display a template script.
+	 *
+	 * @param   object  $item  Item
+	 *
+	 * @return  string
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function displayItem($item = null)
+	{
+		foreach (FieldsHelper::getFields('com_foos.foo') as $field)
+		{
+			$this->fieldsToRenderItem[] = $field->name;
+		}
+
+		return parent::displayItem();
+	}
+
+	/**
+	 * Prepare item before render.
+	 *
+	 * @param   object  $item  The model item
+	 *
+	 * @return  object
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	protected function prepareItem($item)
+	{
+		foreach (FieldsHelper::getFields('com_foos.foo', $item, true) as $field)
+		{
+			$item->{$field->name} = isset($field->apivalue) ? $field->apivalue : $field->rawvalue;
+		}
+
+		return parent::prepareItem($item);
+	}
+}
diff --git a/src/plugins/webservices/foos/foos.php b/src/plugins/webservices/foos/foos.php
new file mode 100644
index 00000000..d4ff98ae
--- /dev/null
+++ b/src/plugins/webservices/foos/foos.php
@@ -0,0 +1,53 @@
+<?php
+/**
+ * @package     Joomla.Plugin
+ * @subpackage  Webservices.foos
+ *
+ * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+
+defined('_JEXEC') or die;
+
+use Joomla\CMS\Plugin\CMSPlugin;
+use Joomla\CMS\Router\ApiRouter;
+
+/**
+ * Web Services adapter for com_foos.
+ *
+ * @since  __BUMP_VERSION__
+ */
+class PlgWebservicesFoos extends CMSPlugin
+{
+	/**
+	 * Load the language file on instantiation.
+	 *
+	 * @var    boolean
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $autoloadLanguage = true;
+
+	/**
+	 * Registers com_foos's API's routes in the application
+	 *
+	 * @param   ApiRouter  &$router  The API Routing object
+	 *
+	 * @return  void
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function onBeforeApiRoute(&$router)
+	{
+		$router->createCRUDRoutes(
+			'v1/foos',
+			'foo',
+			['component' => 'com_foos']
+		);
+
+		$router->createCRUDRoutes(
+			'v1/foos/categories',
+			'categories',
+			['component' => 'com_categories', 'extension' => 'com_foos']
+		);
+	}
+}
diff --git a/src/plugins/webservices/foos/foos.xml b/src/plugins/webservices/foos/foos.xml
new file mode 100644
index 00000000..216c5598
--- /dev/null
+++ b/src/plugins/webservices/foos/foos.xml
@@ -0,0 +1,16 @@
+<?xml version="1.0" encoding="utf-8"?>
+<extension type="plugin" group="webservices" method="upgrade">
+	<name>plg_webservices_foos</name>
+	<creationDate>[DATE]</creationDate>
+	<author>[AUTHOR]</author>
+	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
+	<authorUrl>[AUTHOR_URL]</authorUrl>
+	<copyright>[COPYRIGHT]</copyright>
+	<license>GNU General Public License version 2 or later;</license>
+	<version>__BUMP_VERSION__</version>
+	<description>PLG_WEBSERVICES_FOOS_XML_DESCRIPTION</description>
+	<files>
+		<filename plugin="foos">foos.php</filename>
+		<folder>language</folder>
+	</files>
+</extension>
diff --git a/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.ini b/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.ini
new file mode 100644
index 00000000..8fc54cb6
--- /dev/null
+++ b/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.ini
@@ -0,0 +1,2 @@
+PLG_WEBSERVICES_FOOS="Web Services - Foos"
+PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."
diff --git a/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini b/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini
new file mode 100644
index 00000000..8fc54cb6
--- /dev/null
+++ b/src/plugins/webservices/foos/language/en-GB/plg_webservices_foos.sys.ini
@@ -0,0 +1,2 @@
+PLG_WEBSERVICES_FOOS="Web Services - Foos"
+PLG_WEBSERVICES_FOOS_XML_DESCRIPTION="Used to add foos routes to the API for your website."

```

## Links

[Joomla API-Spezifikation](https://docs.joomla.org/J4.x:Joomla_Core_APIs/de)

[Joomla Core-API](https://docs.joomla.org/J4.x:Joomla_Core_APIs/de)

[Integration in Weblinks](https://github.com/joomla-extensions/weblinks/pull/407)
