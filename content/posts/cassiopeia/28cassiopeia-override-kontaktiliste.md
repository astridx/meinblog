---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication: 
shortTitle: 'short'
date: 2022-12-29
title: 'Joomla 4 Cassiopeia - Kontakliste per Override gestalten'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-override-kontaktliste
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











Ich möchte eine Reihe von Kontakten anzeigen. Die Standardausgabe von Joomla möchte ich nicht verwenden. Alles soll etwas individueller aussehen. Deshalb schreibe ich ein Override für die Ansicht der Kontakte einer Kategorie.

![Joomla Override Kategorie von Kontakten - So soll es aussehen](/images/overridegemeinderat2.png)

> Override-Möglichkeiten in Joomla hatte ich im Beitrag [joomla-template-css-overrides-und-chrome](https://blog.astrid-guenther.de/joomla-template-css-overrides-und-chrome)[^blog.astrid-guenther.de/joomla-template-css-overrides-und-chrome] ausführlicher beschrieben.

Als erstes kopiere ich die original XML-Datei, also `/components/com_contact/tmpl/category/default.xml`. Das ist die Datei, welche ich überschreiben möchte. 

Das Bearbeiten der Dateien erfolgt im Templatemanager. 

![Joomla Override Kategorie von Kontakten - Bearbeiten im Templatemanager](/images/overridegemeinderat1.png)


Die XML-Datei lege ich unter `/templates/astrid/html/com_contact/category/musterstadt.xml` an. Das Kopieren der XML-Datei ist nur notwendig, wenn ich einen Menüpunkt über den Menümanager erstellen möchte.

![Joomla Override Kategorie von Kontakten - Einen Menüpunkt im Menümanager erstellen](/images/overridegemeinderat3.png)

Die minimale Version der XML-Datei ist nachfolgend zu sehen. Wenn ich weitere Parameter verwenden möchte, kann diese im Bereich `params` einfügen.

```php {numberLines: -2}
// /templates/astrid/html/com_contact/category/musterstadt.xml

<?xml version="1.0" encoding="utf-8"?>
<metadata>
	<layout title="Gemeinderat Musterstadt" option="COM_CONTACT_CATEGORY_VIEW_DEFAULT_OPTION">
		<help
			key = "Menu_Item:_List_Contacts_in_a_Category"
		/>
		<message>
			<![CDATA[COM_CONTACT_CATEGORY_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>

	<!-- Add fields to the request variables for the layout. -->
	<fields name="request">
		<fieldset
			name="request"
			addfieldprefix="Joomla\Component\Categories\Administrator\Field"
			>
			<field
				name="id"
				type="modal_category"
				label="COM_CONTACT_FIELD_CATEGORY_LABEL"
				extension="com_contact"
				required="true"
				select="true"
				new="true"
				edit="true"
				clear="true"
			/>
		</fieldset>
	</fields>

	<!-- Add fields to the parameters object for the layout, see /components/com_contact/tmpl/category/default.xml. -->
	<fields name="params">

	</fields>
</metadata>

```

Wie in Joomla an anderen Stellen üblich, erstelle ich eine Hauptdatei `/templates/astrid/html/com_contact/category/musterstadt.php`. Diese lädt die Untertemplates. In unserem Fall gibt es nur ein Template namens `items`. Ich orientiere mich an der Datei `/components/com_contact/tmpl/category/default.php`


```php {numberLines: -2}
// /templates/astrid/html/com_contact/category/musterstadt.php
<?php

defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;

?>

<div class="com-contact-category">
    <?php
        $this->subtemplatename = 'items';
        echo LayoutHelper::render('joomla.content.category_default', $this);
    ?>
</div>

```

Dann lege ich das Template `items` in der Datei `/templates/astrid/html/com_contact/category/musterstadt_items.php` an. Ich orientiere mich an der Datei `/components/com_contact/tmpl/category/default-items.php`. Dabei lösche ich alles, was ich definitiv nicht benötige. So wird die Datei übersichtlicher. 

Im Anschluß ergänze ich den Code, den ich für meine Ansicht benötige. Cassiopeia baut auf Boostrap 5 auf und so verwende ich die Bootstarp [Cards](https://getbootstrap.com/docs/5.0/components/card/)[^getbootstrap.com/docs/5.0/components/card/] mithilfe der Klasse `card`. Die [Abstände](https://getbootstrap.com/docs/5.0/utilities/spacing/)[^getbootstrap.com/docs/5.0/utilities/spacing/] sind mittels Bootstrap Klasse wie `mb-3` handelbar. Zur Anpassung der Ansicht auf verschiedene Bildschirmgrößen nutze das [Boostrap Grid System](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/], beispielsweise mit der Klasse `col-md-6`.

> Die CSS Klassen `musterstadt-contact-category-card` und `contact-thumbnail-musterstadt` kann ich zum weiteren Stylen verwenden.

```php {numberLines: -2}
// /templates/astrid/html/com_contact/category/musterstadt_items.php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\Contact\Administrator\Helper\ContactHelper;

/** @var Joomla\CMS\WebAsset\WebAssetManager $wa */
$wa = $this->document->getWebAssetManager();
$wa->useScript('com_contact.contacts-list')
    ->useScript('core');

$canDo = ContactHelper::getActions('com_contact', 'category', $this->category->id);
$canEdit = $canDo->get('core.edit');
$userId = Factory::getUser()->id;
?>
<div class="com-contact-category__items">
<form action="<?php echo htmlspecialchars(Uri::getInstance()->toString()); ?>" method="post" name="adminForm" id="adminForm">

<?php if (empty($this->items)) : ?>
    <?php if ($this->params->get('show_no_contacts', 1)) : ?>
        <div class="alert alert-info">
            <span class="icon-info-circle" aria-hidden="true"></span><span class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
            <?php echo Text::_('COM_CONTACT_NO_CONTACTS'); ?>
        </div>
    <?php endif; ?>

<?php else : ?>
    <table class="com-content-category__table category table table-striped table-bordered table-hover" id="contactList">
        <caption class="visually-hidden">
            <?php echo Text::_('COM_CONTACT_TABLE_CAPTION'); ?>,
        </caption>
        <?php if ($this->params->get('show_headings')) : ?>
            <thead>
                <tr>
                    <th scope="col" id="categorylist_header_title">
                        <?php echo HTMLHelper::_('grid.sort', 'JGLOBAL_TITLE', 'a.name', $listDirn, $listOrder, null, 'asc', '', 'adminForm'); ?>
                    </th>
                    <th scope="col">
                        <?php echo Text::_('COM_CONTACT_CONTACT_DETAILS'); ?>
                    </th>
                    <?php if ($canEdit || ($canDo->get('core.edit.own') && $item->created_by === $userId)) : ?>
                        <th scope="col">
                            <?php echo Text::_('COM_CONTACT_EDIT_CONTACT'); ?>
                        </th>
                    <?php endif; ?>
                </tr>
            </thead>
        <?php endif; ?>
        <tbody>
            <?php foreach ($this->items as $i => $item) : ?>
                <?php if ($this->items[$i]->published == 0) : ?>
                    <tr class="system-unpublished cat-list-row<?php echo $i % 2; ?>">
                <?php else : ?>
                    <tr class="cat-list-row<?php echo $i % 2; ?>" >
                <?php endif; ?>
                <th scope="row" class="list-title">
                        <div class="card mb-3 musterstadt-contact-category-card">
                            <div class="row g-0">
                            <div class="col-md-6 text-center">                        
                                <?php if ($this->params->get('show_image_heading')) : ?>
                                    <?php if ($item->image) : ?>
                                        <?php echo LayoutHelper::render(
                                            'joomla.html.image',
                                            [
                                                'src'   => $item->image,
                                                'alt'   => '',
                                                'class' => 'contact-thumbnail-musterstadt contact-thumbnail img-thumbnail',
                                            ]
                                        ); ?>
                                    <?php endif; ?>
                                <?php endif; ?>

                                </div>
                                <div class="col-md-6">
                                    <div class="card-body">
                                        <p class="card-text"><?php echo $this->escape($item->name); ?></p>
                                        

                                        <p class="card-text">
                                        <small class="text-muted">
                                            <?php if ($this->params->get('show_position_headings') && !empty($item->con_position)) : ?><br>
                                            <?php echo $item->con_position; ?><br>
                                            <?php endif; ?>
                                        </small>
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">
                                            <?php echo $item->address; ?><br>
                                            <?php echo $item->postcode; ?> <?php echo $item->suburb; ?><br>
                                            <?php if ($this->params->get('show_telephone_headings') && !empty($item->telephone)) : ?>
                                                <?php echo Text::sprintf('COM_CONTACT_TELEPHONE_NUMBER', $item->telephone); ?> 
                                            <?php endif; ?>                                                   </small>
                                        </p>
                                        <p class="card-text">
                                            <small class="text-muted">
                                            <?php if ($item->email_to) : ?>
                                                <p class="contact-emailto" itemprop="email">
                                                    <?php echo HTMLHelper::_('email.cloak', $item->email_to) ?>
                                                </p>
                                            <?php endif; ?>
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>                                            
                    <?php echo $item->event->afterDisplayTitle; ?>
                </th>
                <?php if ($canEdit || ($canDo->get('core.edit.own') && $item->created_by === $userId)) : ?>
                    <td>
                        <?php echo HTMLHelper::_('contacticon.edit', $item, $this->params); ?>
                    </td>
                <?php endif; ?>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php endif; ?>
<div>
    <input type="hidden" name="filter_order" value="<?php echo $this->escape($this->state->get('list.ordering')); ?>">
    <input type="hidden" name="filter_order_Dir" value="<?php echo $this->escape($this->state->get('list.direction')); ?>">
</div>
</form>
</div>
```

Fertig!

<img src="https://vg06.met.vgwort.de/na/e9e98899b4e64d339473a13cf75bd15b" width="1" height="1" alt="">
