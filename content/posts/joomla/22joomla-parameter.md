---
date: 2020-12-22
title: 'Parameter'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-parameter
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Gibt es Einstellungen, die für alle Items deiner Komponente gelten und ein Anwender an seine Erfordernisse anpasst? In Joomla! gibt für diesen Zweck Parameter.

Parameter gibt es für

- ein Item speziell,
- für die ganze Komponente und
- für einen Menüpunkt.

Wenn ein Parameter bei den drei Möglichkeiten gesetzt ist, dann gilt in Joomla folgende Hierarchie:

- Der Menüpunkt schlägt alles.
- Danach zieht der Parameter, der für das Item speziell gilt.
- Die niedrigst Priorität hat der Parameter, der für die ganze Komponente gilt.

Beim Menüpunkt hatten wir schon einen Parameter gesetzt und für die Komponente als Ganzes gibt es diesen in den Optionen. Das Item im Speziellen ist jetzt an der Reihe.

![Joomla! Published](/images/j4x22x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t17...t18) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-61df23203c29920003ce39f96f2fb2f7)

Damit bei einem Update die Spalte erstellt wird, in der die Parameter gespeichert werden, benötigen wir die folgende SQL-Datei.

[src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql)

```sql {numberLines: -2}
/* https://raw.githubusercontent.com/astridx/boilerplate/39598941015020537d51ccb6ca4098f019d76b04/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql */

ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-9be56d6cedb2c832265e47642f0afb25)

In der Konfiguration wird der Parameter in Joomla üblicherweise gespeichert, um einen Standardwert zu setzen. Wir fügen ein Feld `show_name` zur Konfiguration hinzu. Anschließend werden wir die Möglichkeit schaffen, diesen für ein Element oder einen Menüpunkt zu überschreiben.

[src/administrator/components/com_foos/config.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/config.xml)

```xml {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="show_name"
+			type="radio"
+			label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+			default="1"
+			class="switcher"
+			>
+			<option value="0">JHIDE</option>
+			<option value="1">JSHOW</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-262e27353fbe755d3813ea2df19cd0ed)

In dem Formular, mit dem wir ein Element bearbeiten, fügen wir eine Feld `params` hinzu. Hierin ist `show_name` ebenfalls konfigurierbar.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 			content_type="com_foos.foo"
 		/>
 	</fieldset>
+	<fields name="params" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+		<fieldset name="display" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="list"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				useglobal="true"
+			>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </form>

```

> In Joomla gibt es die Möglichkeit, den Parmeter auf den Wert [global](https://docs.joomla.org/How_do_you_set_parameters_for_articles_and_other_content_items%3F) zu setzen. Der Vorteil ist, dass beim Konfigurien angezeigt wird, was global eingestellt ist. Verwende dazu `useglobal="true"` wie [com_contact](https://github.com/joomla/joomla-cms/blob/8053386a7c9c1c1f1766748aae3c5161662aaf2d/administrator/components/com_contact/forms/contact.xml#L395).

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t17...t18#diff-896f245bc8e493f91277fd33913ef974)

Damit bei einer neuen Installation die Spalte erstellt wird, in der die Parameter gespeichert werden, ergänzen wir die folgende SQL-Datei.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

 ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;

```

#### [src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-19bf55010e1963bede0668355cebb307)

In der Klasse, die die Tabelle verwaltete, stellen sicher, dass die Parameter zusammen in der korrekten Form gespeichert werden.

[src/administrator/components/com_foos/src/Table/FooTable.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/administrator/components/com_foos/src/Table/FooTable.php)

```php {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 		parent::__construct('#__foos_details', 'id', $db);
 	}

+	/**
+	 * Stores a foo.
+	 *
+	 * @param   boolean  $updateNulls  True to update fields even if they are null.
+	 *
+	 * @return  boolean  True on success, false on failure.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function store($updateNulls = false)
+	{
+		// Transform the params field
+		if (is_array($this->params))
+		{
+			$registry = new Registry($this->params);
+			$this->params = (string) $registry;
+		}
+
+		return parent::store($updateNulls);
+	}
+
 	/**
 	 * Generate a valid alias from title / date.
 	 * Remains public to be able to check for duplicated alias before saving


```

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-c77adeff4ff9e321c996e0e12c54b656)

Die View mischt die Daten zu den Parametern so zusammen, dass die Anzeige passt.

> In Joomla ist es üblich, dass die Einstellung beim Menüpunkt alles überschreibt. Falls es hier keinen Parameter gibt, zieht der Wert, der beim Element gespeichert wurde. Last but not least wird der Wert der Konfiguration herangezogen. Den aktiven Menüpunkt fragst du über `$active = $app->getMenu()->getActive();` ab.

Manchmal ist es intuitiver, die Anzeige beim Element als Prioriät zu verwenden. Dies habe ich hier so umgesetzt. `$state->get('params')` gibt den Wert an, der beim Menüpunkt gespeichert wurde. `$item->params` ist der Parameter, der beim Element gespeichert wurde. Der nachfolgende Code zeigt dir, wie du die beiden so mischst, dass der Wert beim Item Vorrang hat.

[src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Factory;
+use Joomla\Registry\Registry;

 /**
  * HTML Foos View class for the Foo component
@@ -21,6 +22,22 @@
  */
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * The page parameters
+	 *
+	 * @var    \Joomla\Registry\Registry|null
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $params = null;
+
+	/**
+	 * The item model state
+	 *
+	 * @var    \Joomla\Registry\Registry
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $state;
+
 	/**
 	 * The item object details
 	 *
@@ -40,6 +57,23 @@ public function display($tpl = null)
 	{
 		$item = $this->item = $this->get('Item');

+		$state = $this->State = $this->get('State');
+		$params = $this->Params = $state->get('params');
+		$itemparams = new Registry(json_decode($item->params));
+
+		$temp = clone $params;
+
+		/**
+		 * $item->params are the foo params, $temp are the menu item params
+		 * Merge so that the menu item params take priority
+		 *
+		 * $itemparams->merge($temp);
+		 */
+
+		// Merge so that foo params take priority
+		$temp->merge($itemparams);
+		$item->params = $temp;
+
 		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

 		// Store the events for later

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t17...t18#diff-a33732ebd6992540b8adca5615b51a1f)

Am Ende nutzen wir den Parameter im Template für die Anzeige. Wenn es den Parameter gibt und er so gesetzt ist, dass der Name angezeigt werden soll, dann wird dieser angezeigt. Das Label `$this->Params->get('show_foo_name_label')` wird ebenfalls nur dann angezeigt:

[src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 use Joomla\CMS\Language\Text;

-if ($this->get('State')->get('params')->get('show_foo_name_label'))
-{
-	echo Text::_('COM_FOOS_NAME');
-}
+if ($this->item->params->get('show_name')) {
+
+	if ($this->Params->get('show_foo_name_label')) {
+		echo Text::_('COM_FOOS_NAME');
+	}

-echo $this->item->name;
+	echo $this->item->name;
+}

 echo $this->item->event->afterDisplayTitle;
 echo $this->item->event->beforeDisplayContent;


```

#### [src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t17...t18#diff-35fa310ee8efa91ecb0e9f7c604d413f)

[https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/ce475ed9c41f91b46932f54e4835ce1868dd9930/src/components/com_foos/tmpl/foo/default.xml)

Damit es möglich ist, den Parameter beim Menüpunkt zu speichern, fügen wir ein Feld in der XML-Datei hinzu. Wichtig ist, dass es unter `fields` angeordnet wirde und `params` heißt!

```xml {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

 			/>
 		</fieldset>
 	</fields>
+	<!-- Add fields to the parameters object for the layout. -->
+	<fields name="params">
+		<fieldset name="basic" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="radio"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				default="1"
+				class=""
+				>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </metadata>

```

> In Joomla gibt es die Möglichkeit, den Parmeter auf den Wert [global](https://docs.joomla.org/How_do_you_set_parameters_for_articles_and_other_content_items%3F) zu setzen. Der Vorteil ist, dass beim Konfigurien angezeigt wird, was global eingestellt ist. Verwende dazu `useglobal="true"` wie [com_contact](https://github.com/joomla/joomla-cms/blob/8053386a7c9c1c1f1766748aae3c5161662aaf2d/components/com_contact/tmpl/contact/default.xml#L42).

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Öffne die Ansicht deiner Komponente im Administrationsbereich. Beim Bearbeiten eines Items steht der Tabulator.

![Joomla! Published](/images/j4x22x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// https://github.com/astridx/boilerplate/compare/t17...t18.diff

diff --git a/src/administrator/components/com_foos/config.xml b/src/administrator/components/com_foos/config.xml
index 9d4465ab..0becb70f 100644
--- a/src/administrator/components/com_foos/config.xml
+++ b/src/administrator/components/com_foos/config.xml
@@ -25,6 +25,17 @@
 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="show_name"
+			type="radio"
+			label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+			default="1"
+			class="switcher"
+			>
+			<option value="0">JHIDE</option>
+			<option value="1">JSHOW</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"
diff --git a/src/administrator/components/com_foos/forms/foo.xml b/src/administrator/components/com_foos/forms/foo.xml
index 1a5f36a5..2496f7d5 100644
--- a/src/administrator/components/com_foos/forms/foo.xml
+++ b/src/administrator/components/com_foos/forms/foo.xml
@@ -98,4 +98,17 @@
 			content_type="com_foos.foo"
 		/>
 	</fieldset>
+	<fields name="params" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+		<fieldset name="display" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="list"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				useglobal="true"
+			>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </form>
diff --git a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
index b989f83f..ab768e01 100644
--- a/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
+++ b/src/administrator/components/com_foos/sql/install.mysql.utf8.sql
@@ -33,3 +33,5 @@ ALTER TABLE `#__foos_details` ADD COLUMN  `language` char(7) NOT NULL DEFAULT '*
 ALTER TABLE `#__foos_details` ADD KEY `idx_language` (`language`);

 ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
diff --git a/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql b/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql
new file mode 100644
index 00000000..7f48eb52
--- /dev/null
+++ b/src/administrator/components/com_foos/sql/updates/mysql/18.0.0.sql
@@ -0,0 +1 @@
+ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
diff --git a/src/administrator/components/com_foos/src/Table/FooTable.php b/src/administrator/components/com_foos/src/Table/FooTable.php
index e92cd58a..2f8497dc 100644
--- a/src/administrator/components/com_foos/src/Table/FooTable.php
+++ b/src/administrator/components/com_foos/src/Table/FooTable.php
@@ -14,6 +14,8 @@
 use Joomla\CMS\Application\ApplicationHelper;
 use Joomla\CMS\Table\Table;
 use Joomla\Database\DatabaseDriver;
+use Joomla\CMS\Language\Text;
+use Joomla\Registry\Registry;

 /**
  * Foos Table class.
@@ -36,6 +38,27 @@ public function __construct(DatabaseDriver $db)
 		parent::__construct('#__foos_details', 'id', $db);
 	}

+	/**
+	 * Stores a foo.
+	 *
+	 * @param   boolean  $updateNulls  True to update fields even if they are null.
+	 *
+	 * @return  boolean  True on success, false on failure.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
+	public function store($updateNulls = false)
+	{
+		// Transform the params field
+		if (is_array($this->params))
+		{
+			$registry = new Registry($this->params);
+			$this->params = (string) $registry;
+		}
+
+		return parent::store($updateNulls);
+	}
+
 	/**
 	 * Generate a valid alias from title / date.
 	 * Remains public to be able to check for duplicated alias before saving
diff --git a/src/components/com_foos/src/View/Foo/HtmlView.php b/src/components/com_foos/src/View/Foo/HtmlView.php
index c0bc3df6..a0ef47fa 100644
--- a/src/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/components/com_foos/src/View/Foo/HtmlView.php
@@ -13,6 +13,7 @@

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
 use Joomla\CMS\Factory;
+use Joomla\Registry\Registry;

 /**
  * HTML Foos View class for the Foo component
@@ -21,6 +22,22 @@
  */
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * The page parameters
+	 *
+	 * @var    \Joomla\Registry\Registry|null
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $params = null;
+
+	/**
+	 * The item model state
+	 *
+	 * @var    \Joomla\Registry\Registry
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $state;
+
 	/**
 	 * The item object details
 	 *
@@ -40,6 +57,23 @@ public function display($tpl = null)
 	{
 		$item = $this->item = $this->get('Item');

+		$state = $this->State = $this->get('State');
+		$params = $this->Params = $state->get('params');
+		$itemparams = new Registry(json_decode($item->params));
+
+		$temp = clone $params;
+
+		/**
+		 * $item->params are the foo params, $temp are the menu item params
+		 * Merge so that the menu item params take priority
+		 *
+		 * $itemparams->merge($temp);
+		 */
+
+		// Merge so that foo params take priority
+		$temp->merge($itemparams);
+		$item->params = $temp;
+
 		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));

 		// Store the events for later
diff --git a/src/components/com_foos/tmpl/foo/default.php b/src/components/com_foos/tmpl/foo/default.php
index c5fac408..f4e516eb 100644
--- a/src/components/com_foos/tmpl/foo/default.php
+++ b/src/components/com_foos/tmpl/foo/default.php
@@ -10,12 +10,14 @@

 use Joomla\CMS\Language\Text;

-if ($this->get('State')->get('params')->get('show_foo_name_label'))
-{
-	echo Text::_('COM_FOOS_NAME');
-}
+if ($this->item->params->get('show_name')) {
+
+	if ($this->Params->get('show_foo_name_label')) {
+		echo Text::_('COM_FOOS_NAME');
+	}

-echo $this->item->name;
+	echo $this->item->name;
+}

 echo $this->item->event->afterDisplayTitle;
 echo $this->item->event->beforeDisplayContent;
diff --git a/src/components/com_foos/tmpl/foo/default.xml b/src/components/com_foos/tmpl/foo/default.xml
index d4437d9b..efbe6517 100644
--- a/src/components/com_foos/tmpl/foo/default.xml
+++ b/src/components/com_foos/tmpl/foo/default.xml
@@ -22,4 +22,19 @@
 			/>
 		</fieldset>
 	</fields>
+	<!-- Add fields to the parameters object for the layout. -->
+	<fields name="params">
+		<fieldset name="basic" label="JGLOBAL_FIELDSET_DISPLAY_OPTIONS">
+			<field
+				name="show_name"
+				type="radio"
+				label="COM_FOOS_FIELD_PARAMS_NAME_LABEL"
+				default="1"
+				class=""
+				>
+				<option value="0">JHIDE</option>
+				<option value="1">JSHOW</option>
+			</field>
+		</fieldset>
+	</fields>
 </metadata>

```

## Links
