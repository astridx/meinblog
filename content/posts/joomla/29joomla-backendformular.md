---
date: 2020-12-29
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Backendformular aufräumen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-backendformular
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---



Der Administrationsbereich hat sich gefüllt. Die einzelnen Parameter habe ich bisher ohne Struktur eingefügt. Es ist benutzerfreundlich, wenn in einer Anwendung die Ansichten einheitlich sind. So findet sich jeder schnell zurecht. Es ist nicht erforderlich, dass man sich in jede neue Erweiterung einarbeitet. In diesem Teil des Tutorials räumen wir die Ansicht im Administrationsbereich auf. Dabei haben wir das Ziel die Darstellung an die Standardansichten im Content Management System anzupassen. So wie im nachfolgenden Bild sieht dein Backend aufgeräumt und `joomlamäßig` aus.

![Joomla Ansicht im Backend](/images/j4x29x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24...t24b) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Nichts Neues.

### Geänderte Dateien

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t24...t24b#diff-1637778e5f7d1d56dd1751af1970f01b)

Wir ersetzen die bisher rudimentär eingefügten Formularfelder. Hinzukommt eine Ansicht, die den normalen Joomla-Erweiterungen ähnelt.

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
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Editiere ein Item und vergewissere dich davon, dass die Darstellung so ist, wie du es in Joomla erwartest.

![Joomla Ansicht im Backend](/images/j4x29x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t24...t24b.diff

## Links
