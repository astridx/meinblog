---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-08-05
title: 'Clean Up Backend Form'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-backendformular
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











The administration area has filled up. I have inserted the individual parameters without structure so far. It is user-friendly if the views in an application are uniform. That way, everyone can quickly find their way around. It is not necessary to familiarise oneself with every new extension. In this part of the tutorial we will tidy up the view in the administration area. Our aim is to adapt the display to the standard views in the content management system. As in the following picture, your backend looks tidy and 'Joomla-like'.<!-- \index{backend form} -->

![Joomla Ansicht im Backend](/images/j4x29x1.png)

> For impatient people: Look at the changed programme code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t24...t24b)[^codeberg.org/astrid/j4examplecode/compare/t24...t24b] and copy these changes into your development version.

## Step by step

### New files

Nothing new

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ tmpl/foo/edit.php

We replace the previously rudimentary form fields. The result is a view that resembles the normal Joomla extensions.

```php {diff}
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
+
+	<?php echo LayoutHelper::render('joomla.edit.title_alias', $this); ?>
 	<div>
 		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', ['active' => 'details']); ?>


 			<div class="col-md-9">
 				<div class="row">
 					<div class="col-md-6">
-						<?php echo $this->getForm()->renderField('name'); ?>
-						<?php echo $this->getForm()->renderField('alias'); ?>
-						<?php echo $this->getForm()->renderField('access'); ?>
-						<?php echo $this->getForm()->renderField('published'); ?>
-						<?php echo $this->getForm()->renderField('publish_up'); ?>
-						<?php echo $this->getForm()->renderField('publish_down'); ?>
-						<?php echo $this->getForm()->renderField('catid'); ?>
-						<?php echo $this->getForm()->renderField('language'); ?>
-						<?php echo $this->getForm()->renderField('featured'); ?>
+						<?php echo 'Hier ist Platz für die Inhalte deiner Erweiterung'; ?>
+					</div>
+				</div>
+			</div>
+			<div class="col-lg-3">
+				<div class="card">
+					<div class="card-body">
+						<?php echo LayoutHelper::render('joomla.edit.global', $this); ?>
 					</div>
 				</div>
 			</div>


 		<?php echo LayoutHelper::render('joomla.edit.params', $this); ?>

+		<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'publishing', Text::_('JGLOBAL_FIELDSET_PUBLISHING')); ?>
+		<div class="row">
+			<div class="col-md-6">
+				<fieldset id="fieldset-publishingdata" class="options-form">
+					<legend><?php echo Text::_('JGLOBAL_FIELDSET_PUBLISHING'); ?></legend>
+					<div>
+					<?php echo LayoutHelper::render('joomla.edit.publishingdata', $this); ?>
+					</div>
+				</fieldset>
+			</div>
+		</div>
+		<?php echo HTMLHelper::_('uitab.endTab'); ?>
+
 		<?php echo HTMLHelper::_('uitab.endTabSet'); ?>
 	</div>
 	<input type="hidden" name="task" value="">

```

The main change is that we now use Joomla's own layout `joomla.edit.publishingdata`. This is in the directory `/layouts/joomla/edit/publishingdata.php` and you can check the content in the following code example. Besides the uniform view, another advantage is that the layout file is maintained by Joomla and you are therefore less likely to experience unpleasant surprises when updating.

```php
<?php

defined('_JEXEC') or die;

$form = $displayData->getForm();

$fields = $displayData->get('fields') ?: array(
    'publish_up',
    'publish_down',
    'featured_up',
    'featured_down',
    array('created', 'created_time'),
    array('created_by', 'created_user_id'),
    'created_by_alias',
    array('modified', 'modified_time'),
    array('modified_by', 'modified_user_id'),
    'version',
    'hits',
    'id'
);

$hiddenFields = $displayData->get('hidden_fields') ?: array();

foreach ($fields as $field) {
    foreach ((array) $field as $f) {
        if ($form->getField($f)) {
            if (in_array($f, $hiddenFields)) {
                $form->setFieldAttribute($f, 'type', 'hidden');
            }

            echo $form->renderField($f);
            break;
        }
    }
}
```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. Open the view of your component in the administration area. Edit an item and make sure that the display is as you expect it to be in Joomla. You can see an example in the picture at the beginning of this chapter.

<img src="https://vg08.met.vgwort.de/na/7733ec039c1e4327ba7203c8114d7796" width="1" height="1" alt="">
