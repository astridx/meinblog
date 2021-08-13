---
date: 2020-12-17
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Custom Fields (Eigene Felder) im Backend integrieren'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-custom-fields-im-backend-integrieren
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Custom Fields (Eigene Felder)<!-- \index{Eigene Felder (Backend)} --><!-- \index{Custom Fields (Backend)} --> sind seit Joomla Version 3.7 in aller Munde. Sie bieten viele zusätzliche Möglichkeiten. Deshalb steht es außer Frage, dass wir diese in unsere Komponente integrieren.

Dieser Teil zeigt dir, wie du die Unterstützung im Administrationsbereich programmierst. Im nächsten Kapitel integrieren wir Custom Fields im Frontend.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t13...t14a)[^github.com/astridx/boilerplate/compare/t13...t14a] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Wir haben in diesem Teil keine neue Datei erstellt, sondern lediglich Dateien geändert.

### Geänderte Dateien

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ access.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9e0953a0d7bd9275f21f699e0722ed100264bd28b3b9452cabcde1e393603e93)

In der Datei `administrator/components/com_foos/ access.xml` bereiten wir alles dafür vor, die benutzerdefinierten Felder mit Berechtigungen versehen. So ist es möglich, dass das Ändern oder das Ansehen eines Feldes nur bestimmten Benutzern erlaubt ist.

[administrator/components/com_foos/ access.xml](https://github.com/astridx/boilerplate/blob/t14a/src/administrator/components/com_foos/access.xml)

```xml {diff}
 		<action name="core.edit.state" title="JACTION_EDITSTATE" />
 		<action name="core.edit.own" title="JACTION_EDITOWN" />
 	</section>
+	<section name="fieldgroup">
+		<action name="core.create" title="JACTION_CREATE" />
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.own" title="JACTION_EDITOWN" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
+	<section name="field">
+		<action name="core.delete" title="JACTION_DELETE" />
+		<action name="core.edit" title="JACTION_EDIT" />
+		<action name="core.edit.state" title="JACTION_EDITSTATE" />
+		<action name="core.edit.value" title="JACTION_EDITVALUE" />
+	</section>
 </access>
 ```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/config.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-9be56d6cedb2c832265e47642f0afb25)

Über die Konfiguration `config.xml` wird mithilfe eines Paramters festgelegt, ob die Erweiterung eigene Felder verwendet.

> Fragst du dich, warum es diesen Parameter gibt? Er ist [nicht zwingend](https://joomla.stackexchange.com/questions/28672/reason-for-parameter-for-using-custom-fields-in-configuration/28680#28680).

[administrator/components/com_foos/config.xml](https://joomla.stackexchange.com/questions/28672/reason-for-parameter-for-using-custom-fields-in-configuration)[^https://joomla.stackexchange.com/questions/28672/reason-for-parameter-for-using-custom-fields-in-configuration]

```php {diff}
 			<option value="0">JNO</option>
 			<option value="1">JYES</option>
 		</field>
+
+		<field
+			name="custom_fields_enable"
+			type="radio"
+			label="JGLOBAL_CUSTOM_FIELDS_ENABLE_LABEL"
+			layout="joomla.form.field.radio.switcher"
+			default="1"
+			>
+			<option value="0">JNO</option>
+			<option value="1">JYES</option>
+		</field>
 	</fieldset>
 	<fieldset
 		name="permissions"
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-2fc2de3e713c03872261cc037f7f6194d843f9cbc953d34db10e9693dfa82924)

Im Navigationsmenü links im Joomla Administrationsbereichs fügen wir zwei Links ein. Der erste neue Link führt zur Ansicht, in der eigene Felder für die Komponente erstellt werden. Der andere führt zu der Ansicht, über die Feld-Gruppen angelegt werden.

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/t14a/src/administrator/components/com_foos/foos.xml)

```php {diff}
 		<submenu>
 			<menu link="option=com_foos">COM_FOOS</menu>
 			<menu link="option=com_categories&amp;extension=com_foos">JCATEGORY</menu>
+			<menu link="option=com_fields&amp;context=com_foos.foo">JGLOBAL_FIELDS</menu>
+			<menu link="option=com_fields&amp;view=groups&amp;context=com_foos.foo">JGLOBAL_FIELD_GROUPS</menu>
 		</submenu>
 		<files folder="administrator/components/com_foos">
 			<filename>access.xml</filename>

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-b50434577837f29c2b0bf385fb9e14819e0ab8fb1557b6d88583896698e7a7c0)

Das Formular, über das ein Foo-Element editierbar ist, verfügt nun über Tabulatoren. Damit die Daten innerhalb der Session nicht verloren gehen, wenn man zwischen den Tabs wechselt, ändern wir die Methode `loadFormData()` in der Datei `administrator/components/com_foos/ src/Model/FooModel.php`. Es ist nicht notwendig, dass wir selbst Daten zwischenspeichern. Die Methode `$app->getUserState()` erledigt dies für uns. Gleichzeitig stellen wir sicher, das für die Kategorie ein Standardwert gesetzt wird, falls ein neues Element geladen wird und deshalb `$this->getState('foo.id') == 0` gleich `true` ist.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/t14a/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}

 	{
 		$app = Factory::getApplication();
 
-		$data = $this->getItem();
+		// Check the session for previously entered form data.
+		$data = $app->getUserState('com_foos.edit.foo.data', []);
+
+		if (empty($data)) {
+			$data = $this->getItem();
+
+			// Prime some default values.
+			if ($this->getState('foo.id') == 0) {
+				$data->set('catid', $app->input->get('catid', $app->getUserState('com_foos.foos.filter.category_id'), 'int'));
+			}
+		}
 
 		$this->preprocessData($this->typeAlias, $data);
 
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t13...t14a#diff-1637778e5f7d1d56dd1751af1970f01b)

Damit das Editieren der Custom Fields genauso funktioniert, wie in den Joomla eigenen Erweiterungen, nutzen wir [UiTab](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/HTML/Helpers/UiTab.php)[^github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/HTML/Helpers/UiTab.php]. `$this->useCoreUI = true;` sorgt dafür, dass der [Helper](https://github.com/joomla/joomla-cms/blob/4.0-dev/layouts/joomla/edit/params.php#L20)[^github.com/joomla/joomla-cms/blob/4.0-dev/layouts/joomla/edit/params.php#L20] flexibel die richtige Tab-Impementierung liefert.

> Einen Vergleich zwischen dem bisher meist genutzten `bootstrap.tab` und `uitab` bietet [Pull Request PR 21805](https://github.com/joomla/joomla-cms/pull/21805)[^github.com/joomla/joomla-cms/pull/21805].<!-- \index{bootstrap.tab} --><!-- \index{UiTab} -->

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/02dd34246bf4a070fcc7b2d7b1dfe5015d0d6c54/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 use Joomla\CMS\Factory;
 use Joomla\CMS\HTML\HTMLHelper;
 use Joomla\CMS\Router\Route;
+use Joomla\CMS\Language\Text;
+use Joomla\CMS\Layout\LayoutHelper;
 
 $app = Factory::getApplication();
 $input = $app->input;
 
+$this->useCoreUI = true;
+
 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
 	->useScript('form.validate')
 ?>
 
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
-	<?php echo $this->getForm()->renderField('name'); ?>
-	<?php echo $this->getForm()->renderField('alias'); ?>
-	<?php echo $this->getForm()->renderField('access'); ?>
-	<?php echo $this->getForm()->renderField('catid'); ?>
-	<?php echo $this->getForm()->renderField('published'); ?>
-	<?php echo $this->getForm()->renderField('publish_up'); ?>
-	<?php echo $this->getForm()->renderField('publish_down'); ?>
+	<div>
+		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', ['active' => 'details']); ?>
+
+		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'details', empty($this->item->id) ? Text::_('COM_FOOS_NEW_FOO') : Text::_('COM_FOOS_EDIT_FOO')); ?>
+		<div class="row">
+			<div class="col-md-9">
+				<div class="row">
+					<div class="col-md-6">
+						<?php echo $this->getForm()->renderField('name'); ?>
+						<?php echo $this->getForm()->renderField('alias'); ?>
+						<?php echo $this->getForm()->renderField('access'); ?>
+						<?php echo $this->getForm()->renderField('published'); ?>
+						<?php echo $this->getForm()->renderField('publish_up'); ?>
+						<?php echo $this->getForm()->renderField('publish_down'); ?>
+						<?php echo $this->getForm()->renderField('catid'); ?>
+					</div>
+				</div>
+			</div>
+		</div>
+		<?php echo HTMLHelper::_('uitab.endTab'); ?>
+		
+		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>
+
+		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
+	</div>
 	<input type="hidden" name="task" value="">
 	<?php echo HTMLHelper::_('form.token'); ?>
 </form>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Du siehst Einträge in der Navigation im linken Bereich. Klicke auf den Menüpunkt `Felder` in diesem neuen Menü.

![Joomla Eigene Felder in eine eigene Komponente integrieren - Backendmenu](/images/j4x17x10.png)

3. Erstelle danach ein Feld vom Typ `Text`.

4. Überzeuge dich davon, dass du dieses Feld beim Editieren eines Foo-Items ebenfalls zum Bearbeiten angeboten bekommst.

![Joomla Eigene Felder in eine eigene Komponente integrieren - Eigene Felder im Element ändern](/images/j4x17x2.png)

5. Stelle sicher, dass die eigenen Felder in der globalen Konfiguration ein- und ausschaltbar sind.

![Joomla Eigene Felder in eine eigene Komponente integrieren - Konfiguration](/images/j4x17x3.png)
