---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-07-29
title: 'Die Daten der Datenbank im Frontend nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-daten-der-datenbank-im-frontend-nutzen
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Wir haben eine Datenbank, in der die Daten zur Komponente gespeichert werden. Der nächste Schritt ist, die dynamischen Inhalte im Frontend anzuzeigen. In diesem Teil zeige ich dir, wie du den Inhalt eines Elements per Menüpunkt im Frontend anzeigst. Hierzu erstellen wir ein eigenes Formularfeld.<!-- \index{Formularfeld} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t6b...t7)[^codeberg.org/astrid/j4examplecode/compare/t6b...t7] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/Field/Modal/FooField.php

Als erstes erstellen wir das Formularfeld, über welches es möglich ist, ein Foo-Element auszuwählen, beziehungsweise abzuwählen. Auf ein vorgefertigtes Feld können wir in diesem Fall nicht zugreifen. Im Wesentlichen implementieren wir die Methoden `getInput` und `getLabel` und wir legen Typ mit `Modal_Foo` fest. Das der Name der Klasse mit dem Wort `Field` beginnt und dass die Klasse im Verzeichnis `Field` gespeichert wird ist nicht zwingend. Es kann aber hilfreich sein, weil es in Joomla-eigenen Erweiterung Standard ist.

> Es ist möglich, das Feld so zu erweitern, dass ein Foo-Elemente über eine Schaltfläche angelegt wird. Dies habe ich in der aktuellen Version der Übersicht halber außen vor gelassen. Beispielcode bietet die Komponente `com_contact` in der Datei `administrator/components/com_contact/ src/Field/Modal/ContactField.php`.

[administrator/components/com_foos/src/Field/Modal/FooField.php](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/administrator/components/com_foos/src/Field/Modal/FooField.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t7/src/administrator/components/com_foos/src/Field/Modal/FooField.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Field\Modal;

\defined('JPATH_BASE') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Form\FormField;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Session\Session;

/**
 * Supports a modal foo picker.
 *
 * @since  __DEPLOY_VERSION__
 */
class FooField extends FormField
{
	/**
	 * The form field type.
	 *
	 * @var     string
	 * @since   __DEPLOY_VERSION__
	 */
	protected $type = 'Modal_Foo';

	/**
	 * Method to get the field input markup.
	 *
	 * @return  string  The field input markup.
	 *
	 * @since   __DEPLOY_VERSION__ 
	 */
	protected function getInput()
	{
		$allowClear  = ((string) $this->element['clear'] != 'false');
		$allowSelect = ((string) $this->element['select'] != 'false');

		// The active foo id field.
		$value = (int) $this->value > 0 ? (int) $this->value : '';

		// Create the modal id.
		$modalId = 'Foo_' . $this->id;

		// Add the modal field script to the document head.
		/** @var \Joomla\CMS\WebAsset\WebAssetManager $wa */
		$wa = Factory::getApplication()->getDocument()->getWebAssetManager();

		// Add the modal field script to the document head.
		$wa->useScript('field.modal-fields');

		// Script to proxy the select modal function to the modal-fields.js file.
		if ($allowSelect) {
			static $scriptSelect = null;

			if (is_null($scriptSelect)) {
				$scriptSelect = [];
			}

			if (!isset($scriptSelect[$this->id])) {
				$wa->addInlineScript("
				window.jSelectFoo_" . $this->id . " = function (id, title, object) {
					window.processModalSelect('Foo', '" . $this->id . "', id, title, '', object);
				}",
					[],
					['type' => 'module']
				);

				$scriptSelect[$this->id] = true;
			}
		}

		// Setup variables for display.
		$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'
			. Session::getFormToken() . '=1';
		$linkFoo  = 'index.php?option=com_foos&amp;view=foo&amp;layout=modal&amp;tmpl=component&amp;'
			. Session::getFormToken() . '=1';
		$modalTitle   = Text::_('COM_FOOS_CHANGE_FOO');

		$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;

		if ($value) {
			$db    = Factory::getDbo();
			$query = $db->getQuery(true)
				->select($db->quoteName('name'))
				->from($db->quoteName('#__foos_details'))
				->where($db->quoteName('id') . ' = ' . (int) $value);
			$db->setQuery($query);

			try {
				$title = $db->loadResult();
			} catch (\RuntimeException $e) {
				Factory::getApplication()->enqueueMessage($e->getMessage(), 'error');
			}
		}

		$title = empty($title) ? Text::_('COM_FOOS_SELECT_A_FOO') : htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

		// The current foo display field.
		$html  = '';

		if ($allowSelect || $allowNew || $allowEdit || $allowClear) {
			$html .= '<span class="input-group">';
		}

		$html .= '<input class="form-control" id="' . $this->id . '_name" type="text" value="' . $title . '" readonly size="35">';

		// Select foo button
		if ($allowSelect) {
			$html .= '<button'
				. ' class="btn btn-primary hasTooltip' . ($value ? ' hidden' : '') . '"'
				. ' id="' . $this->id . '_select"'
				. ' data-bs-toggle="modal"'
				. ' type="button"'
				. ' data-bs-target="#ModalSelect' . $modalId . '"'
				. ' title="' . HTMLHelper::tooltipText('COM_FOOS_CHANGE_FOO') . '">'
				. '<span class="icon-file" aria-hidden="true"></span> ' . Text::_('JSELECT')
				. '</button>';
		}

		// Clear foo button
		if ($allowClear) {
			$html .= '<button'
				. ' class="btn btn-secondary' . ($value ? '' : ' hidden') . '"'
				. ' id="' . $this->id . '_clear"'
				. ' type="button"'
				. ' onclick="window.processModalParent(\'' . $this->id . '\'); return false;">'
				. '<span class="icon-remove" aria-hidden="true"></span>' . Text::_('JCLEAR')
				. '</button>';
		}

		if ($allowSelect || $allowNew || $allowEdit || $allowClear) {
			$html .= '</span>';
		}

		// Select foo modal
		if ($allowSelect) {
			$html .= HTMLHelper::_(
				'bootstrap.renderModal',
				'ModalSelect' . $modalId,
				[
					'title'       => $modalTitle,
					'url'         => $urlSelect,
					'height'      => '400px',
					'width'       => '800px',
					'bodyHeight'  => 70,
					'modalWidth'  => 80,
					'footer'      => '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">'
										. Text::_('JLIB_HTML_BEHAVIOR_CLOSE') . '</button>',
				]
			);
		}

		// Note: class='required' for client side validation.
		$class = $this->required ? ' class="required modal-value"' : '';

		$html .= '<input type="hidden" id="'
			. $this->id . '_id"'
			. $class . ' data-required="' . (int) $this->required
			. '" name="' . $this->name
			. '" data-text="'
			. htmlspecialchars(Text::_('COM_FOOS_SELECT_A_FOO', true), ENT_COMPAT, 'UTF-8')
			. '" value="' . $value . '">';

		return $html;
	}

	/**
	 * Method to get the field label markup.
	 *
	 * @return  string  The field label markup.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getLabel()
	{
		return str_replace($this->id, $this->id . '_name', parent::getLabel());
	}
}

```

> Der Programmcode für das Formularfeld ist an [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)[^getbootstrap.com] angepasst. Dieses Framework wurde im [Pull Request 32037](https://github.com/joomla/joomla-cms/pull/32037)[^github.com/joomla/joomla-cms/pull/32037] in Joomla 4 integriert.

Achte darauf, dass du die korrekten Namen verwendest. Falls später beim Testen nichts passiert, wenn du ein einzelnes Foo auswählst, liegt es meist an einem Tippfehler. Hintergrund: Es wird JavaScript ausgeführt. Du fügst dieses Skript an zwei Stellen hinzu. Zuerst erstellst du die Funktion `jSelectFoo_...` mithilfe von Variablen. 

```js
...
if (!isset($scriptSelect[$this->id])) {
	$wa->addInlineScript("
	window.jSelectFoo_" . $this->id . " = function (id, title, object) {
		window.processModalSelect('Foo', '" . $this->id . "', id, title, '', object);
	}",
		[],
		['type' => 'module']
	);

	$scriptSelect[$this->id] = true;
}

...
```

Im Quelltext des Joomla Administrationsbereich wird der folgende Code hinzugefügt:

```js
<script nonce="beispielID=">
function jSelectFoos_jform_request_id(id, title, object) { window.processModalSelect('Foo', 'jform_request_id', id, title, '', object);}
</script>
```

Etwas später rufst du die Funktion auf.

```js
...
$urlSelect = $linkFoos . '&amp;function=jSelectFoo_' . $this->id;
...
```

Der Name der Funktion muss an beiden Stellen gleich sein!

> In einer früher Beispielcode-Version zum Feld `FooField` nutzen wir den Webasset Manager nicht. Die notwendigen Änderungen findest du [hier](https://github.com/joomla/joomla-cms/commit/04f844ad4a6d0432ec4b770bbb2a33243ded16d9)[^github.com/joomla/joomla-cms/commit/04f844ad4a6d0432ec4b770bbb2a33243ded16d9].

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foos/modal.php

Die Auswahl öffnen wir über das FooField in einem Modal-Fenster. Als Adresse haben wir im Feld `$linkFoos = 'index.php?option=com_foos&amp;view=foos&amp;layout=modal&amp;tmpl=component&amp;'` eingefügt. Der nachfolgende Code zeigt dir das Template für dieses Modal-Fenster.

[administrator/components/com_foos/tmpl/foos/modal.php](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/administrator/components/com_foos/tmpl/foos/modal.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t7/src/administrator/components/com_foos/tmpl/foos/modal.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Session\Session;

$app = Factory::getApplication();

$wa = $this->document->getWebAssetManager();
$wa->useScript('com_foos.admin-foos-modal');

$function  = $app->input->getCmd('function', 'jSelectFoos');
$onclick   = $this->escape($function);
?>
<div class="container-popup">

	<form action="<?php echo Route::_('index.php?option=com_foos&view=foos&layout=modal&tmpl=component&function=' . $function . '&' . Session::getFormToken() . '=1'); ?>" method="post" name="adminForm" id="adminForm" class="form-inline">

		<?php if (empty($this->items)) : ?>
			<div class="alert alert-warning">
				<?php echo Text::_('JGLOBAL_NO_MATCHING_RESULTS'); ?>
			</div>
		<?php else : ?>
			<table class="table table-sm">
				<thead>
					<tr>
						<th scope="col" style="width:10%" class="d-none d-md-table-cell">
						</th>
						<th scope="col" style="width:1%">
						</th>
					</tr>
				</thead>
				<tbody>
				<?php
				$iconStates = [
					-2 => 'icon-trash',
					0  => 'icon-unpublish',
					1  => 'icon-publish',
					2  => 'icon-archive',
				];
				?>
				<?php foreach ($this->items as $i => $item) : ?>
					<?php $lang = ''; ?>
					<tr class="row<?php echo $i % 2; ?>">
						<th scope="row">
							<a class="select-link" href="javascript:void(0)" data-function="<?php echo $this->escape($onclick); ?>" data-id="<?php echo $item->id; ?>" data-title="<?php echo $this->escape($item->name); ?>">
								<?php echo $this->escape($item->name); ?>
							</a>
						</th>
						<td>
							<?php echo (int) $item->id; ?>
						</td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>

		<?php endif; ?>

		<input type="hidden" name="task" value="">
		<input type="hidden" name="forcedLanguage" value="<?php echo $app->input->get('forcedLanguage', '', 'CMD'); ?>">
		<?php echo HTMLHelper::_('form.token'); ?>

	</form>
</div>

```

> Ein [Modal](<https://de.wikipedia.org/wiki/Dialog_(Benutzeroberfl%C3%A4che)>)[^de.wikipedia.org/wiki/dialog_(benutzeroberfl%c3%a4che)] ist ein Bereich, der sich im Vordergrund einer Webseite öffnet und deren Zustand ändert. Es ist erforderlich, diesen aktiv zu schließen. Modale Dialoge sperren den Rest der Anwendung solange der Dialog angezeigt wird. Ein Modal wird ebenfalls Dialog oder Lightbox genannt.<!-- \index{Modal} --><!-- \index{Dialog Box} -->

#### media/com_foos/joomla.asset.json

Wir nutzen den [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets/de). Dieses mal fügen wir ein eigenes Webasset mithilfe der Datei `joomla.asset.json` hinzu. Falls du dieses nicht korrekt einbindest, wird dir folgender Fehler angezeigt, wenn du für den Menüpunkt ein Foo-Element auswählst: `There is no "com_foos.admin-foos-modal" asset of a "script" type in the registry.`. Grund: Im Modal wird mit der Zeile `$wa->useScript('com_foos.admin-foos-modal');` das Skript `com_foos.admin-foos-modal` aufgerufen, welches aber vorher nicht richtig registriert wurde. Deshalb wird es nicht gefunden.<!-- \index{Webassetmanager} -->

> Wegen der neu hinzugekommenen Datei `joomla.asset.json` ist es erforderlich, dass wir die Erweiterung neu installieren. Andere Dateien haben wir bisher ohne eine neue Installation in Joomla verwendet. Mit der Datei `joomla.asset.json` funktioniert das nicht. Diese muss einmal bei einer Installation registriert werden. Im Weiteren können Änderungen in ihr vorgenommen werden. Diese werden ohne Neuinstallation erkannt.<!-- \index{Webassetmanager!joomla.asset.json} -->

> Es ist nicht zwingend die Datei `joomla.asset.json` anzulegen, wenn du den den [Webassetmanager](https://docs.joomla.org/J4.x:Web_Assets/de)[^docs.joomla.org/j4.x:web_assets/de] nutzen möchtest. In der Dokumentation findest du Möglichkeiten, Webassets nachträglich im Code zu registrieren.

[media/com_foos/joomla.asset.json](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/media/com_foos/joomla.asset.json)

```js {numberLines: -2}
/* https://codeberg.org/astrid/j4examplecode/raw/branch/t7/src/media/com_foos/joomla.asset.json */

{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "com_foos",
  "version": "1.0.0",
  "description": "Joomla CMS",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "com_foos.admin-foos-modal",
      "type": "script",
      "uri": "com_foos/admin-foos-modal.js",
      "dependencies": ["core"],
      "attributes": {
        "defer": true
      }
    }
  ]
}
```

> Wundern Sie sich, dass ich anstelle von `com_foos/js/admin-foos-modal.js` `com_foos/admin-foos-modal.js` als `uri` schreibe? Meiner Meinung nach ist dies ein verstecktes Geheimnis in Joomla. `js` und `css` Datei, wenn der Pfad nicht [absolut](https://github.com/joomla/joomla-cms/blob/ddb844b450ec989f08f6a54c051ca52d57fa0789/libraries/src/WebAsset/WebAssetItem.php#L349)[^github.com/joomla/joomla-cms/blob/ddb844b450ec989f08f6a54c051ca52d57fa0789/ libraries/src/webasset/webassetitem.php#l349] ist, werden automatisch im Unterverzeichnis `js`, bzw. `css` gesucht. Dies war bereits in [Joomla 3.x](https://docs.joomla.org/Adding_JavaScript/de#Externes_JavaScript)[^docs.joomla.org/adding_javascript/de#external_javascript] der Fall. Im Aufruf `JHtml::_('script', 'com_example/example.js', array('relative' => true));` erwartet Joomla, dass sich die Datei `example.js` unter `media/com_example/example.js` befindet. Du solltest `js` nicht in den Pfad in der Anweisung einschließen. Dieses Verhalten wird vom Web Asset Manager für Skripte und Stile standardmäßig implementiert. Möchtest du einen genaueren Blick darauf werfen? Du findest den Code dafür in der Datei `libraries/src/WebAsset/WebAssetItem.php`.<!-- \index{Webassetmanager!relative} -->

Für die Medienversion setzt der Web Asset Manager den Standardwert `auto`. Das bedeutet, dass `JHtml::_('script', 'com_example/example.js', array('version' => 'auto'));` standardmäßig aufgerufen wird. Was bedeutet das genau? Die Medienversion wird verwendet, um das erneute Laden von CSS- und JavaScript-Dateien zu steuern. Insbesondere wird die Medienversion bei einer Aktualisierung, Installation oder Deinstallation zurückgesetzt. Der Grund dafür ist, dass Browser CSS- und JS-Dateien im Cache speichern, so dass die folgende Situation eintreten kann 
1. Ein Benutzer greift auf eine Joomla-Website zu, und die CSS- und JS-Dateien werden im Browser des Benutzers gespeichert. 
2. Joomla wird aktualisiert, und während des Aktualisierungsprozesses ändert sich der Inhalt mehrerer CSS- und JS-Dateien. Die Dateinamen bleiben gleich. 
3. Der Benutzer greift auf die neu aktualisierte Seite zu, aber die neuen CSS- und JS-Dateien werden nicht neu geladen, weil der Browser des Benutzers stattdessen die zwischengespeicherten Versionen verwendet. 
4. Wenn `version' => 'auto` gesetzt ist, ist das `src`-Attribut des `<script>`-Tags nach der Aktualisierung anders, und der Browser lädt die neue Datei. 
Für die normale Arbeit mit einer Joomla-Website ist diese Einstellung nützlich. Bei der Entwicklung kann es vorkommen, dass du Web-Asset-Dateien öfters neu laden möchtest. Ich verwende beim Entwickeln den Debug-Modus, weil auf diese Weise bei jeder HTTP-Anfrage eine neue Medienversion erzwungen wird.<!-- \index{Webassetmanager!version} -->

> Was bedeutet das Attribut `"defer": true`? Skripte werden mit `async` asynchron oder parallel zu anderen Ressourcen geladen. `defer` verspricht dem Browser, dass die Webseite nicht durch Anweisungen geändert wird. Weitere Informationen [bei Mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)[^developer.mozilla.org/en-us/docs/web/html/element/script].<!-- \index{Webassetmanager!Attribut} -->

> Der Joomla Web Assets Manager verwaltet alle Assets in einer Joomla-Installation. Es ist nicht zwingend Skriptdateien oder Stylesheets über diesen Manager einzubinden. Alle Aufrufe von `HTMLHelper::_('stylesheet oder script ...)` funktionieren, aber diese Assets werden nach den Web Asset Manager Assets angefügt. Dies führt dazu, dass Styles überschrieben werden, die im Template gesetzt werden. So hat ein Benutzer nicht die Möglichkeit, mithilfe einer `user.css` einzuwirken. Es gibt weitere Vorteile: Wenn Abhängigkeiten korrekt gesetzt sind, treten keine Konflikte auf und notwendige Dateien werden von Joomla geladen. Eine Abhängigkeit haben wir beispielsweise in der Zeile `"dependencies": ["core"],` gesetzt.<!-- \index{Webassetmanager!Abhängigkeit} -->

#### media/com_foos/js/admin-foos-modal.js

Es folgt der JavaScript Code, der bewirkt, dass beim Anlegen eines Menüpunktes ein Foo-Element auswählbar ist. Die Klasse `select-link`, deren Elemente Hauptbestandteil der Datei sind, werden wir später im Feld der entsprechenden Schaltfläche zuordnen.

[media/com_foos/js/admin-foos-modal.js](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/media/com_foos/js/admin-foos-modal.js)

```js {numberLines: -2}
/* https://codeberg.org/astrid/j4examplecode/raw/branch/t7/src/media/com_foos/js/admin-foos-modal.js */

;(function () {
  'use strict'

  document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.select-link')

    for (var i = 0, l = elements.length; l > i; i += 1) {
      elements[i].addEventListener('click', function (event) {
        event.preventDefault()
        var functionName = event.target.getAttribute('data-function')

        window.parent[functionName](
          event.target.getAttribute('data-id'),
          event.target.getAttribute('data-title'),
          null,
          null,
          event.target.getAttribute('data-uri'),
          event.target.getAttribute('data-language'),
          null
        )

        if (window.parent.Joomla.Modal) {
          window.parent.Joomla.Modal.getCurrent().close()
        }
      })
    }
  })
})()
```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

Wir haben eine neue JavaScript-Datei erstellt. Wir legen sie im Verzeichnis `media\js` ab. Damit sie bei der Installation der Komponente kopiert wird, fügen wir den Ordner `js` in den Abschnitt `media` des Installationsmanifests ein.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/administrator/components/com_foos/foos.xml)

```php {diff}
 		<folder>src</folder>
 		<folder>tmpl</folder>
 	</files>
+    <media folder="media/com_foos" destination="com_foos">
+		<folder>js</folder>
+		<filename>joomla.asset.json</filename>
+    </media>
 	<!-- Back-end files -->
 	<administration>
 		<!-- Menu entries -->

```

> Lies im Vorwort warum du das `media` Verzeichnis idealerweise für Assets wie JavaScript-Dateien oder Stylesheets wählst.

<!-- prettier-ignore -->
#### components/com\_foos/src/Model/FooModel.php

Wir geben keinen statischen Text mehr aus. Es wird ein Element aus der Datenbank angezeigt. Deshalb benennen wir die Methode `getMsg` in `getItem` um. Wir passen die Variablenbezeichnungen an und erstellen eine Datenbankabfrage.

> Achte darauf, dass du den DocBlock anpasst. Das hört sich zu Beginn kleinlich und unwichtig an. In kleinen Erweiterungen ist es vielleicht noch nebensächlich. Später möchtest du aber vielleicht einmal eine Dokumentation anhand dieser Information automatisch erstellen. Dann bist du froh, wenn diese korrekt sind.<!-- \index{DocBlock} -->

[components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
 class FooModel extends BaseDatabaseModel
 {
 	/**
-	 * @var string message
+	 * @var string item
 	 */
-	protected $message;
+	protected $_item = null;

 	/**
-	 * Get the message
+	 * Gets a foo
 	 *
-	 * @return  string  The message to be displayed to the user
+	 * @param   integer  $pk  Id for the foo
+	 *
+	 * @return  mixed Object or null
+	 *
+	 * @since   __BUMP_VERSION__
 	 */
-	public function getMsg()
+	public function getItem($pk = null)
 	{
 		$app = Factory::getApplication();
-		$this->message = $app->input->get('show_text', "Hi");
+		$pk = $app->input->getInt('id');
+
+		if ($this->_item === null)
+		{
+			$this->_item = array();
+		}
+
+		if (!isset($this->_item[$pk]))
+		{
+			try
+			{
+				$db = $this->getDbo();
+				$query = $db->getQuery(true);
+
+				$query->select('*')
+					->from($db->quoteName('#__foos_details', 'a'))
+					->where('a.id = ' . (int) $pk);
+
+				$db->setQuery($query);
+				$data = $db->loadObject();
+
+				if (empty($data))
+				{
+					throw new \Exception(Text::_('COM_FOOS_ERROR_FOO_NOT_FOUND'), 404);
+				}
+
+				$this->_item[$pk] = $data;
+			}
+			catch (\Exception $e)
+			{
+				$this->setError($e);
+				$this->_item[$pk] = false;
+			}
+		}

-		return $this->message;
+		return $this->_item[$pk];
 	}
 }

```

> Joomla unterstützt dich beim Erstellen der Datenbankabfragen. Wenn du die [zur Verfügung stehenden Anweisungen](https://docs.joomla.org/Accessing_the_database_using_JDatabase/de)[^docs.joomla.org/accessing_the_database_using_jdatabase/de] nutzt, dann kümmert sich Joomla um Sicherheit oder unterschiedliche Syntax in PostgreSQL und MySQL.

<!-- prettier-ignore -->
#### components/com\_foos/src/View/Foo/HtmlView.php

In der View tauschen wir folgerichtig `$this->msg = $this->get('Msg');` gegen `$this->item = $this->get('Item');` aus.

[components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 class HtmlView extends BaseHtmlView
 {
+	/**
+	 * The item object details
+	 *
+	 * @var    \JObject
+	 * @since  __BUMP_VERSION__
+	 */
+	protected $item;
+
 	/**
 	 * Execute and display a template script.
 	 *

 	 */
 	public function display($tpl = null)
 	{
-		$this->msg = $this->get('Msg');
+		$this->item = $this->get('Item');

 		return parent::display($tpl);
 	}

```

<!-- prettier-ignore -->
#### components/com\_foos/ tmpl/foo/default.php

Die Anzeige des Namens passen wir im Template an. Hier greifen wir auf das Element `item` und dessen Eigenschaft `name` zu. Auf diese Art können wir in Zukunft weitere Eigenschaften flexibel und unkompliziert ergänzen.

[components/com_foos/tmpl/foo/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 \defined('_JEXEC') or die;
 ?>

-Hello Foos: <?php echo $this->msg;
+<?php
+echo $this->item->name;

```

<!-- prettier-ignore -->
#### components/com\_foos/ tmpl/foo/default.xml

Wir erstellen einen Eintrag in der Datei `default.xml` für das neue Formularfeld. So ermöglichen wir beim Menüpunkt die Auswahl eines Foo-Elementes. Erwähnenswert sind die Einträge `addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"` und `type="modal_foo"`:

[components/com_foos/tmpl/foo/default.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t7/src/components/com_foos/tmpl/foo/default.xml)

```xml {diff}
 	</layout>
 	<!-- Add fields to the request variables for the layout. -->
 	<fields name="request">
-		<fieldset name="request">
+		<fieldset name="request"
+			addfieldprefix="FooNamespace\Component\Foos\Administrator\Field"
+		>
 			<field
-				name="show_text"
-				type="text"
-				label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
-				default="Hi"
+				name="id"
+				type="modal_foo"
+				label="COM_FOOS_SELECT_FOO_LABEL"
+				required="true"
+				select="true"
+				new="true"
+				edit="true"
+				clear="true"
 			/>
 		</fieldset>
 	</fields>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.
   Eine neue Installation ist erforderlich, um die Datei `joomla.asset.json` zu registrieren.

2. Öffne den Menümanager, um einen Menüpunkt anzulegen. Klicke dazu auf `Menü` und dann auf `All Menu Items`.

Klicke danach auf die Schaltfläche `New` und fülle alle notwendigen Felder aus. Den passenden `Menu Item Typ` findest du über die `Select` Schaltfläche. Überzeuge dich davon, dass du, anstelle des Textfeldes zur Eingabe eines statischen Textes ein Auswahlfeld siehst. Das Auswahlfeld enthält ebenfalls eine Schaltfläche `Select`.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x1.png)

3. Klicke auf das zweite `Select` und wähle ein Item aus. Stelle sicher, dass ein gewähltes Element mittels `Clear` widerufbar ist.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x2.png)

4. Speichere den Menüpunkt.

5. Wechsele anschließend ins Frontend und überzeuge dich davon, dass der Menüpunkt korrekt angelegt ist. Dir wird der Titel des Elements angezeigt, welches du im Administrationsbereich ausgewählt hattest.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x3.png)
<img src="https://vg08.met.vgwort.de/na/58035fa2fdcc41cc9004f5bc5e42cc5a" width="1" height="1" alt="">
