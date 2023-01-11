---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication: 
shortTitle: 'short'
date: 2022-12-29
title: 'Joomla 4 Cassiopeia - Design contact list via override'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-override-kontaktliste
langKey: de
categories:
  - Cassiopeia
tags:
  - Joomla
  - Cassiopeia
---











I want to display a set of contacts. I do not want to use the standard output of Joomla. Everything should look a bit more individual. Therefore I write an override for the view of the contacts of a category.<!-- \index{Override!com_contact category} -->

![Joomla Override Category of Contacts - This is how it should look like](/images/overridegemeinderat2.png)

> Override possibilities in Joomla I had described in more detail in the post [joomla-template-css-overrides-and-chrome](https://blog.astrid-guenther.de/joomla-template-css-overrides-und-chrome)[^blog.astrid-guenther.de/joomla-template-css-overrides-and-chrome].

First I copy the original XML file, that is `/components/com_contact/tmpl/category/default.xml`. This is the file I want to overwrite. 

Editing the files is done in the template manager. 

![Joomla override category of contacts - edit in template manager](/images/overridegemeinderat1.png)


I create the XML file under `/templates/astrid/html/com_contact/category/musterstadt.xml`. Copying the XML file is only necessary if I want to create a menu item using the menu manager.

![Joomla Override Category of Contacts - Create a Menu Item in the Menu Manager](/images/overridegemeinderat3.png)

The minimal version of the XML file can be seen below. If I want to use more parameters, I can add them in the 'params' section.

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

As is common in Joomla in other places, I create a main file `/templates/astrid/html/com_contact/category/musterstadt.php`. This loads the subtemplates. In our case there is only one template called `items`. I orientate myself to the file `/components/com_contact/tmpl/category/default.php`.

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

Then I create the template `items` in the file `/templates/astrid/html/com_contact/category/musterstadt_items.php`. I orientate myself on the file `/components/com_contact/tmpl/category/default-items.php`. Thereby I delete everything that I definitely don`t need. So the file becomes clearer. 

Afterwards I add the code I need for my view. Cassiopeia is based on Boostrap 5 and so I use the bootstarp [Cards](https://getbootstrap.com/docs/5.0/components/card/)[^getbootstrap.com/docs/5.0/components/card/] with the class `card`. The [Spacing](https://getbootstrap.com/docs/5.0/utilities/spacing/)[^getbootstrap.com/docs/5.0/utilities/spacing/] are tradable using bootstrap class like `mb-3`. To adapt the view to different screen sizes use the [Boostrap Grid System](https://getbootstrap.com/docs/5.0/layout/grid/)[^getbootstrap.com/docs/5.0/layout/grid/], for example with the class `col-md-6`.

> I can use the CSS classes `pattern-city-contact-category-card` and `contact-thumbnail-pattern-city` for further styling.

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
                        <div class="card mb-3 rueber-contact-category-card">
                            <div class="row g-0">
                            <div class="col-md-6 text-center">                        
                                <?php if ($this->params->get('show_image_heading')) : ?>
                                    <?php if ($item->image) : ?>
                                        <?php echo LayoutHelper::render(
                                            'joomla.html.image',
                                            [
                                                'src'   => $item->image,
                                                'alt'   => '',
                                                'class' => 'contact-thumbnail-rueber contact-thumbnail img-thumbnail',
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

Finished!
<img src="https://vg06.met.vgwort.de/na/ff55bbddd3f147b3b46170927eb24278" width="1" height="1" alt="">
