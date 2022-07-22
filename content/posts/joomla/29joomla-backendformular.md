---
description: 'desc'
shortTitle: 'short'
date: 2021-01-23
title: 'Backendformular aufräumen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-backendformular
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Der Administrationsbereich hat sich gefüllt. Die einzelnen Parameter habe ich bisher ohne Struktur eingefügt. Es ist benutzerfreundlich, wenn in einer Anwendung die Ansichten einheitlich sind. So findet sich jeder schnell zurecht. Es ist nicht erforderlich, dass man sich in jede neue Erweiterung einarbeitet. In diesem Teil des Tutorials räumen wir die Ansicht im Administrationsbereich auf. Dabei haben wir das Ziel die Darstellung an die Standardansichten im Content Management System anzupassen. So wie im nachfolgenden Bild sieht dein Backend aufgeräumt und `joomlamäßig` aus.<!-- \index{Backendformular} -->

![Joomla Ansicht im Backend](/images/j4x29x1.png)

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t24...t24b)[^github.com/astridx/boilerplate/compare/t24...t24b] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Nichts Neues.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ tmpl/foo/edit.php

Wir ersetzen die bisher rudimentär eingefügten Formularfelder. Es entsteht eine Ansicht, die den normalen Joomla-Erweiterungen ähnelt.

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

Die wesentliche Änderung ist, dass wir nun das Joomla-eigene Layout `joomla.edit.publishingdata` nutzen. Das ist im Verzeichnis `/layouts/joomla/edit/publishingdata.php` und den Inhalt findest du im nachfolgenden Codebeispiel. Neben der einheitlichen Ansicht ist ein weiterer Vorteil, dass die Layout-Datei von Joomla gepflegt wird und man deshalb weniger häufig bösen Überraschungen bei Aktualisierungen erlebt.

```php
<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   (C) 2013 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

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

foreach ($fields as $field)
{
	foreach ((array) $field as $f)
	{
		if ($form->getField($f))
		{
			if (in_array($f, $hiddenFields))
			{
				$form->setFieldAttribute($f, 'type', 'hidden');
			}

			echo $form->renderField($f);
			break;
		}
	}
}

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Editiere ein Item und vergewissere dich davon, dass die Darstellung so ist, wie du es in Joomla erwartest. Eine Beispieldarstellung siehst du im Bild zu Beginn dieses Kapitels.

<img src="https://vg08.met.vgwort.de/na/21c53f666f254e31bcd07348201fc4bb" width="1" height="1" alt="">
