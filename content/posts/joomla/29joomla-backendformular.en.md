---
date: 2020-12-29
title: 'Joomla 4.x Tutorial - Extension Development - Clean Up Backend Form'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-backendformular
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

The administration area has filled up. I have inserted the individual parameters without structure so far. It is user-friendly if the views in an application are uniform. That way, everyone can quickly find their way around. It is not necessary to familiarise oneself with every new extension. In this part of the tutorial we will tidy up the view in the administration area. Our aim is to adapt the display to the standard views in the content management system. As in the following picture, your backend looks tidy and 'Joomla-like'.

![Joomla Ansicht im Backend](/images/j4x29x1.png)

## For impatient people

Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t24...t24b) and incorporate these changes into your development version.

## Step by step

### New files

Nothing new

### Modified files

#### [administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t24...t24b#diff-1637778e5f7d1d56dd1751af1970f01b)

We replace the previously rudimentary form fields. The result is a view that resembles the normal Joomla extensions.

```php {diff}
 $layout  = 'edit';
 $tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';
 ?>
-
 <form action="<?php echo Route::_('index.php?option=com_foos&layout=' . $layout . $tmpl . '&id=' . (int) $this->item->id); ?>" method="post" name="adminForm" id="foo-form" class="form-validate">
+
+	<?php echo LayoutHelper::render('joomla.edit.title_alias', $this); ?>
 	<div>
 		<?php echo HTMLHelper::_('uitab.startTabSet', 'myTab', array('active' => 'details')); ?>

@@ -42,15 +43,14 @@
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
@@ -65,6 +65,19 @@

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

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Editiere ein Item und vergewissere dich davon, dass die Darstellung so ist, wie du es in Joomla erwartest.

![Joomla Ansicht im Backend](/images/j4x29x1.png)

## Changed files

### Overview

### All changes at a glance

github.com/astridx/boilerplate/compare/t24...t24b.diff

## Links
