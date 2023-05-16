---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2022-08-03
title: 'Stapelverarbeitung/Batch'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-batch
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Joomla bietet eine Reihe von Funktionen, mit denen es Administratoren möglich ist, mehrere Items in einem Arbeitsschitt zu bearbeiten. Diese Stapelverarbeitung (englisch Batch) fügen wir jetzt zur Komponente hinzu.<!-- \index{Stapelverarbeitung} --><!-- \index{Batch} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t21...t22)[^codeberg.org/astrid/j4examplecode/compare/t21...t22] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/default_batch_body.php

Die nachfolgende Datei erstellt den mittleren Teil des Formulars, welches zum Anstoßen der Stapelverarbeitung angezeigt wird.

[administrator/components/com_foos/tmpl/foos/default_batch_body.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t22/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;

$published = $this->state->get('filter.published');
$noUser    = true;
?>

<div class="p-3">
	<div class="row">
		<div class="form-group col-md-6">
			<div class="controls">
				<?php echo LayoutHelper::render('joomla.html.batch.language', []); ?>
			</div>
		</div>
		<div class="form-group col-md-6">
			<div class="controls">
				<?php echo LayoutHelper::render('joomla.html.batch.access', []); ?>
			</div>
		</div>
	</div>
	<div class="row">
		<?php if ($published >= 0) : ?>
			<div class="form-group col-md-6">
				<div class="controls">
					<?php echo LayoutHelper::render('joomla.html.batch.item', ['extension' => 'com_foos']); ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</div>

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/default_batch_footer.php

Den Fußbereich des Formulars, welches zum Anstoßen der Stapelverarbeitung angezeigt wird, erzeugt die nachfolgende Datei. Die Schaltfläche `JCANCEL` löscht alle Werte in den Formularfeldern mittles `document.getElementById('ELEMENT_ID').value=''`. Ich habe hier alle möglichen Felder aufgenommen, obwohl wir noch nicht alle nutzen. `batch-user-id` und `batch-tag-id` sind beispielsweise bisher nicht in unserem Formular belegt. Die Schaltfläche `JGLOBAL_BATCH_PROCESS` startet die Stapelverarbeitung.

> Wichtig ist, dass du das Formular für die Stapelverarbeitung so anlegst, wie oben bei der Datei `administrator/components/com_foos/tmpl/foos/default_batch_body.php` beschrieben. `LayoutHelper` in Kombination mit dem passenden Layout sorgt dafür, dass alle Variablen und IDs so gesetzt sind, dass die Standardfunktionen korrekt ablaufen.

[administrator/components/com_foos/tmpl/foos/default_batch_footer.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t22/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

?>
<button type="button" class="btn btn-secondary" onclick="document.getElementById('batch-category-id').value='';document.getElementById('batch-access').value='';document.getElementById('batch-language-id').value='';document.getElementById('batch-user-id').value='';document.getElementById('batch-tag-id').value=''" data-bs-dismiss="modal">
	<?php echo Text::_('JCANCEL'); ?>
</button>
<button type="submit" class="btn btn-success" onclick="Joomla.submitbutton('foo.batch');return false">
	<?php echo Text::_('JGLOBAL_BATCH_PROCESS'); ?>
</button>

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Controller/FooController.php

Im Controller implementieren wir die Methode `batch`. Wenn wir es genau betrachten, fügen wir nichts weiter als die Besonderheiten ein: Den Namen des Models, welches für die Datenverarbeitung genutzt wird und die Adresse zu der nach der Abarbeitung weitergeleitet wird. Am Ende rufen wir mit `return parent::batch($model);` die Implementierung von Joomla auf. Fertig! Für die Standardfunktionen ist das Rad bereits von Joomla erfunden.

[administrator/components/com_foos/src/Controller/FooController.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/src/Controller/FooController.php)

```php {diff}

\defined('_JEXEC') or die;

 use Joomla\CMS\MVC\Controller\FormController;
+use Joomla\CMS\Router\Route;

 /**
  * Controller for a single foo

  */
 class FooController extends FormController
 {
+	public function batch($model = null)
+	{
+		$this->checkToken();
+
+		$model = $this->getModel('Foo', 'Administrator', array());
+
+		// Preset the redirect
+		$this->setRedirect(Route::_('index.php?option=com_foos&view=foos' . $this->getRedirectToListAppend(), false));
+
+		return parent::batch($model);
+	}
 }

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/Model/FooModel.php

Im Model geben wir an, ob das Kopieren und Verschieben unterstützt wird. Im Falle von `false` wird der Befehl von der Stapelverarbeitung nicht bereitgestellt. Außerdem geben wir die Eigenschaften an, die mithilfe der Batch-Funktion bearbeitbar sind.

[administrator/components/com_foos/src/Model/FooModel.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
protected $associationsContext = 'com_foos.item';

+	protected $batch_copymove = 'category_id';
+
+	protected $batch_commands = array(
+		'assetgroup_id' => 'batchAccess',
+		'language_id'   => 'batchLanguage',
+		'user_id'       => 'batchUser',
+	);
+
 	/**
 	 * Method to get the row form.
 	 *

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/View/Foos/HtmlView.php

Damit die Stapelverarbeitung per Schaltfläche nutzbar ist, fügen wir einen Eintrag in der Werkzeugleiste ein.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 			{
 				$childBar->trash('foos.trash')->listCheck(true);
 			}
-		}

-		if ($this->state->get('filter.published') == -2 && $canDo->get('core.delete'))
-		{
-			$toolbar->delete('foos.delete')
-				->text('JTOOLBAR_EMPTY_TRASH')
-				->message('JGLOBAL_CONFIRM_DELETE')
-				->listCheck(true);
+			if ($this->state->get('filter.published') == -2 && $canDo->get('core.delete'))
+			{
+				$childBar->delete('foos.delete')
+					->text('JTOOLBAR_EMPTY_TRASH')
+					->message('JGLOBAL_CONFIRM_DELETE')
+					->listCheck(true);
+			}
+
+			// Add a batch button
+			if ($user->authorise('core.create', 'com_foos')
+				&& $user->authorise('core.edit', 'com_foos')
+				&& $user->authorise('core.edit.state', 'com_foos'))
+			{
+				$childBar->popupButton('batch')
+					->text('JTOOLBAR_BATCH')
+					->selector('collapseModal')
+					->listCheck(true);
+			}
 		}

 		if ($user->authorise('core.admin', 'com_foos') || $user->authorise('core.options', 'com_foos'))

```

<!-- prettier-ignore -->
#### administrator/components/com_foos/tmpl/foos/default.php

Das Template, mit dem das Formular zum Anstoßen der Stapelverarbeitung angelegt wird, erstellen wir unter Zuhilfenahme von `HTMLHelper`.

[administrator/components/com_foos/tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t22/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
		<?php echo $this->pagination->getListFooter(); ?>

+		<?php echo HTMLHelper::_(
+			'bootstrap.renderModal',
+			'collapseModal',
+			array(
+				'title'  => Text::_('COM_FOOS_BATCH_OPTIONS'),
+				'footer' => $this->loadTemplate('batch_footer'),
+			),
+			$this->loadTemplate('batch_body')
+		); ?>
+
	<?php endif; ?>
	<input type="hidden" name="task" value="">
	<input type="hidden" name="boxchecked" value="0">
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen. Klicke den Eintrag `Batch`.

![Joomla Stapelverarbeitung](/images/j4x26x1.png)

3. Teste die Stapelverarbeitung.

![Joomla Stapelverarbeitung](/images/j4x26x2.png)
<img src="https://vg08.met.vgwort.de/na/1ea25f95afe6405e843dd87b971f669b" width="1" height="1" alt="">
