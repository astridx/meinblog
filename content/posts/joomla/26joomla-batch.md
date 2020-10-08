---
date: 2019-12-26
title: 'Stapelverarbeitung/Batch'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-batch
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Joomla! bietet eine Reihe von Funktionen, mit denen es Administratoren möglich ist, mehrere Items auf einen Schlag zu bearbeiten. Diese Stapelverarbeitung (englisch Batch) fügen wir jetzt zur Komponente hinzu. Darauf aufbauend ist dir möglich, eigenen Funktionen hinzuzufügen.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t21...t22) an und übernimm diese Änderungen in deine Entwicklungsversion.

```php {numberLines diff}
// https://github.com/astridx/boilerplate/compare/t21...t22.diff

diff --git a/src/administrator/components/com_foos/src/Controller/FooController.php b/src/administrator/components/com_foos/src/Controller/FooController.php
index 08c1ec19..858537bf 100644
--- a/src/administrator/components/com_foos/src/Controller/FooController.php
+++ b/src/administrator/components/com_foos/src/Controller/FooController.php
@@ -12,6 +12,7 @@
 \defined('_JEXEC') or die;
 
 use Joomla\CMS\MVC\Controller\FormController;
+use Joomla\CMS\Router\Route;
 
 /**
  * Controller for a single foo
@@ -20,4 +21,24 @@
  */
 class FooController extends FormController
 {
+	/**
+	 * Method to run batch operations.
+	 *
+	 * @param   object  $model  The model.
+	 *
+	 * @return  boolean   True if successful, false otherwise and internal error is set.
+	 *
+	 * @since   __BUMP_VERSION__
+	 */
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
diff --git a/src/administrator/components/com_foos/src/Model/FooModel.php b/src/administrator/components/com_foos/src/Model/FooModel.php
index 70fdd2e0..80ff2907 100644
--- a/src/administrator/components/com_foos/src/Model/FooModel.php
+++ b/src/administrator/components/com_foos/src/Model/FooModel.php
@@ -39,6 +39,24 @@ class FooModel extends AdminModel
 	 */
 	protected $associationsContext = 'com_foos.item';
 
+	/**
+	 * Batch copy/move command. If set to false, the batch copy/move command is not supported
+	 *
+	 * @var  string
+	 */
+	protected $batch_copymove = 'category_id';
+
+	/**
+	 * Allowed batch commands
+	 *
+	 * @var array
+	 */
+	protected $batch_commands = array(
+		'assetgroup_id' => 'batchAccess',
+		'language_id'   => 'batchLanguage',
+		'user_id'       => 'batchUser',
+	);
+
 	/**
 	 * Method to get the row form.
 	 *
diff --git a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
index 6593ecd1..4d35af80 100644
--- a/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foo/HtmlView.php
@@ -144,5 +144,8 @@ protected function addToolbar()
 
 			ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
 		}
+
+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
 	}
 }
diff --git a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
index 6ff2d395..622ff2db 100644
--- a/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
+++ b/src/administrator/components/com_foos/src/View/Foos/HtmlView.php
@@ -175,14 +175,25 @@ protected function addToolbar()
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
@@ -190,6 +201,9 @@ protected function addToolbar()
 			$toolbar->preferences('com_foos');
 		}
 
+		ToolbarHelper::divider();
+		ToolbarHelper::help('', false, 'http://joomla.org');
+
 		HTMLHelper::_('sidebar.setAction', 'index.php?option=com_foos');
 	}
 }
diff --git a/src/administrator/components/com_foos/tmpl/foos/default.php b/src/administrator/components/com_foos/tmpl/foos/default.php
index 74f0ef88..3aa053c4 100644
--- a/src/administrator/components/com_foos/tmpl/foos/default.php
+++ b/src/administrator/components/com_foos/tmpl/foos/default.php
@@ -156,6 +156,16 @@
 
 					<?php echo $this->pagination->getListFooter(); ?>
 				
+					<?php echo HTMLHelper::_(
+						'bootstrap.renderModal',
+						'collapseModal',
+						array(
+							'title'  => Text::_('COM_FOOS_BATCH_OPTIONS'),
+							'footer' => $this->loadTemplate('batch_footer'),
+						),
+						$this->loadTemplate('batch_body')
+					); ?>
+
 				<?php endif; ?>
 				<input type="hidden" name="task" value="">
 				<input type="hidden" name="boxchecked" value="0">
diff --git a/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php b/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php
new file mode 100644
index 00000000..9052b7b2
--- /dev/null
+++ b/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php
@@ -0,0 +1,39 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Layout\LayoutHelper;
+
+$published = $this->state->get('filter.published');
+$noUser    = true;
+?>
+
+<div class="container">
+	<div class="row">
+		<div class="form-group col-md-6">
+			<div class="controls">
+				<?php echo LayoutHelper::render('joomla.html.batch.language', []); ?>
+			</div>
+		</div>
+		<div class="form-group col-md-6">
+			<div class="controls">
+				<?php echo LayoutHelper::render('joomla.html.batch.access', []); ?>
+			</div>
+		</div>
+	</div>
+	<div class="row">
+		<?php if ($published >= 0) : ?>
+			<div class="form-group col-md-6">
+				<div class="controls">
+					<?php echo LayoutHelper::render('joomla.html.batch.item', ['extension' => 'com_foos']); ?>
+				</div>
+			</div>
+		<?php endif; ?>
+	</div>
+</div>
diff --git a/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php b/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php
new file mode 100644
index 00000000..8c5d7158
--- /dev/null
+++ b/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php
@@ -0,0 +1,19 @@
+<?php
+/**
+ * @package     Joomla.Administrator
+ * @subpackage  com_foos
+ *
+ * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
+ * @license     GNU General Public License version 2 or later; see LICENSE.txt
+ */
+\defined('_JEXEC') or die;
+
+use Joomla\CMS\Language\Text;
+
+?>
+<button type="button" class="btn btn-secondary" onclick="document.getElementById('batch-category-id').value='';document.getElementById('batch-access').value='';document.getElementById('batch-language-id').value='';document.getElementById('batch-user-id').value='';document.getElementById('batch-tag-id').value=''" data-dismiss="modal">
+	<?php echo Text::_('JCANCEL'); ?>
+</button>
+<button type="submit" class="btn btn-success" onclick="Joomla.submitbutton('foo.batch');return false">
+	<?php echo Text::_('JGLOBAL_BATCH_PROCESS'); ?>
+</button>

```

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/tmpl/foos/default_batch_body.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-a9b2d92dcca8384605c7c4c4e7111093)

Die nachfolgende Datei erstellt den mittleren Teil des Formulars, welches zum Anstoßen der Stapelverarbeitung angezeigt wird.

[src/administrator/components/com_foos/tmpl/foos/default_batch_body.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/tmpl/foos/default_batch_body.php)

```php
<?php
\defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;

$published = $this->state->get('filter.published');
$noUser    = true;
?>
<div class="container">
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

#### [src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-d653f1f236af4637ec0c4a7ff789bde1)

Die nachfolgende Datei erstellt den Footer des Formulars, welches zum Anstoßen der Stapelverarbeitung angezeigt wird.

[src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/tmpl/foos/default_batch_footer.php)

```php
<?php
\defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;

?>
<button type="button" class="btn btn-secondary" onclick="document.getElementById('batch-category-id').value='';document.getElementById('batch-access').value='';document.getElementById('batch-language-id').value='';document.getElementById('batch-user-id').value='';document.getElementById('batch-tag-id').value=''" data-dismiss="modal">
	<?php echo Text::_('JCANCEL'); ?>
</button>
<button type="submit" class="btn btn-success" onclick="Joomla.submitbutton('foo.batch');">
	<?php echo Text::_('JGLOBAL_BATCH_PROCESS'); ?>
</button>

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-181b1576846350fbb4a7a1a73291de4b)

Im Controller implementieren wir die Methode `batch`. Wenn wir es genau betrachten, fügen wir nichts weiter als die Besonderheiten ein; den Namen des Models, welches für die Datenverarbeitung genutzt wird und die Adresse zu der nach der Abarbeitung weitergeleitet wird. Am Ende rufen wir mit `return parent::batch($model);` die interne Implementierung von Joomla auf. Fertig!

[src/administrator/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/src/Controller/FooController.php)

```php
...
public function batch($model = null)
{
  $this->checkToken();

  $model = $this->getModel('Foo', 'Administrator', array());

  $this->setRedirect(Route::_('index.php?option=com_foos&view=foos' . $this->getRedirectToListAppend(), false));

  return parent::batch($model);
}
...
```

#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-c1b8160bef2d2b36367dc59381d6bcb7)

Im Model geben wir an, ob das Kopieren und Verschieben unterstützt wird. Im Falle von `false` wird der Befehl von der Stapelverarbeitung nicht bereitgestellt. Außerdem geben wir die Eigenschaften an, die mithilfe der Batch-Funktion bearbeitbar bin.

[src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/src/Model/FooModel.php)

```php
...
protected $batch_copymove = 'category_id';

protected $batch_commands = array(
  'assetgroup_id' => 'batchAccess',
  'language_id'   => 'batchLanguage',
  'user_id'       => 'batchUser',
);
...
```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-8e3d37bbd99544f976bf8fd323eb5250)

Damit die Stapelverarbeitung nutzbar ist, fügen wir einen Eintrag in der Werkzeugleiste ein.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
if ($this->state->get('filter.published') == -2 && $canDo->get('core.delete'))
{
  $childBar->delete('foos.delete')
    ->text('JTOOLBAR_EMPTY_TRASH')
    ->message('JGLOBAL_CONFIRM_DELETE')
    ->listCheck(true);
}

if ($user->authorise('core.create', 'com_foos')
  && $user->authorise('core.edit', 'com_foos')
  && $user->authorise('core.edit.state', 'com_foos'))
{
  $childBar->popupButton('batch')
    ->text('JTOOLBAR_BATCH')
    ->selector('collapseModal')
    ->listCheck(true);
}
...

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t21...t22#diff-3186af99ea4e3321b497b86fcd1cd757)

Das Template, mit dem das Formular zum Anstoßen der Stapelverarbeitung angelegt wird, erstellen wir unter Zuhilfenahme von `HTMLHelper`.

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/b6365457de4e6d2020b4c0797d31ddd8d36b88ef/src/administrator/components/com_foos/tmpl/foos/default.php)

```php
...
<?php echo HTMLHelper::_(
  'bootstrap.renderModal',
  'collapseModal',
  array(
    'title'  => Text::_('COM_FOOS_BATCH_OPTIONS'),
    'footer' => $this->loadTemplate('batch_footer'),
  ),
  $this->loadTemplate('batch_body')
); ?>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen. Klicke den Eintrag `Batch`.

![Joomla! Stapelverarbeitung](/images/j4x26x1.png)

3. Teste die Stapelverarbeitung.

![Joomla! Stapelverarbeitung](/images/j4x26x2.png)

## Geänderte Dateien

### Übersicht
