---
date: 2019-12-29
title: 'Backendformular aufräumen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-backendformular
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Der Administrationsbereich hat sich gefüllt. Die einzelnen Parameter habe ich bisher ohne Struktur eingefügt. Es ist benutzerfreundlich, wenn in einer Anwendung die Ansichten einheitlich sind. So findet sich jeder schnell zurecht. Es ist nicht erforderlich, dass man sich in jede neue Erweiterung einarbeitet. In diesem Teil des Tutorials räumen wir die Ansicht im Administrationsbereich auf. Dabei haben wir das Ziel die Darstellung an die Standardansichten im Content Management System anzupassen. So sieht dein Backend aufgeräumt und `joomlamäßig` aus.

![Joomla! Ansicht im Backend](/images/j4x29x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24...t24b) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

Nichts Neues.

### Geänderte Dateien

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t24...t24b#diff-1637778e5f7d1d56dd1751af1970f01b)

Wir ersetzen die bisher rudimentär eingefügten Formularfelder.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/d23cc2ecdd8487d416f0370be5661a5689cde753/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php
...
<?php echo $this->getForm()->renderField('name'); ?>
<?php echo $this->getForm()->renderField('alias'); ?>
<?php echo $this->getForm()->renderField('access'); ?>
<?php echo $this->getForm()->renderField('published'); ?>
<?php echo $this->getForm()->renderField('publish_up'); ?>
<?php echo $this->getForm()->renderField('publish_down'); ?>
<?php echo $this->getForm()->renderField('catid'); ?>
<?php echo $this->getForm()->renderField('language'); ?>
<?php echo $this->getForm()->renderField('featured'); ?>
...
```
Hinzukommt eine Ansicht, die den normalen Joomla-Erweiterungen ähnelt.

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/d23cc2ecdd8487d416f0370be5661a5689cde753/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php
...
<?php echo LayoutHelper::render('joomla.edit.global', $this); ?>
...
...
<?php echo HTMLHelper::_('uitab.addTab', 'myTab', 'publishing', Text::_('JGLOBAL_FIELDSET_PUBLISHING')); ?>
		<div class="row">
			<div class="col-md-6">
				<fieldset id="fieldset-publishingdata" class="options-form">
					<legend><?php echo Text::_('JGLOBAL_FIELDSET_PUBLISHING'); ?></legend>
					<div>
					<?php echo LayoutHelper::render('joomla.edit.publishingdata', $this); ?>
					</div>
				</fieldset>
			</div>
		</div>
		<?php echo HTMLHelper::_('uitab.endTab'); ?>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. Editiere ein Item und vergewissere dich davon, dass die Darstellung so ist, wie du es in Joomla! erwartest.

![Joomla! Ansicht im Backend](/images/j4x29x1.png)

## Geänderte Dateien

### Übersicht
