---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-08-03
title: 'Batch Processing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-batch
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











Joomla offers a number of functions that enable administrators to process several items at once. We now add this batch processing to the component. Based on this, it is possible for you to add your own "batch processing" functions.<!-- \index{batch} -->

> For impatient people: Look at the changed programme code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t21...t22)[^codeberg.org/astrid/j4examplecode/compare/t21...t22] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ tmpl/foos/default_batch_body.php

The following file creates the middle part of the form that is displayed to trigger batch processing.

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
#### administrator/components/com\_foos/ tmpl/foos/default_batch_footer.php

The following file creates the footer of the form that is displayed to trigger batch processing. The 'JCANCEL' button clears all values in the form fields using `document.getElementById('ELEMENT_ID').value=''`. I have included all possible fields here, although we don't use them all yet. For example, `batch-user-id` and `batch-tag-id` are not yet used in our form. The button `JGLOBAL_BATCH_PROCESS` starts the batch processing.

> It is important that you create the batch form as described above in the file `administrator/components/com_foos/tmpl/foos/default_batch_body.php`. `LayoutHelper` in combination with the appropriate layout ensures that all variables and IDs are set so that the standard functions run correctly.

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

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ src/Controller/FooController.php

In the controller we implement the method `batch`. If we look at it closely, we add nothing more than the specifics: The name of the model used for data processing and the address to forward to after processing. At the end we call the implementation of Joomla with `return parent::batch($model);`. Done! For the standard functions, the wheel has already been invented by Joomla.

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
#### administrator/components/com\_foos/ src/Model/FooModel.php

In the model we specify whether copying and moving is supported. In case of `false` the command is not provided by the batch processing. We also specify the properties that are editable using the batch function.

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
#### administrator/components/com\_foos/ src/View/Foos/HtmlView.php

To make the batch processing usable via a button, we add an entry to the toolbar.

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
#### administrator/components/com\_foos/ tmpl/foos/default.php

We create the template that is used to create the form to trigger batch processing with the help of `HTMLHelper`.

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

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. Open the view of your component in the administration area. In the toolbar you will see a selection list for triggering various actions. Click the entry 'Batch'.

![Joomla Batch Processing](/images/j4x26x1.png)

3. test the batch processing.

![Joomla Batch Processing](/images/j4x26x2.png)
<img src="https://vg08.met.vgwort.de/na/ae7468cecd5e482ba7025cfc4d0e3d4d" width="1" height="1" alt="">
