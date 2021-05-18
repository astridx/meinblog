---
date: 2021-03-11
title: 'A tutorial on using the Cassiopeia template for Joomla 4 - Information about the author'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-autorinfo
langKey: en
categories:
  - Code
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Various authors publish articles on a website. You want blog posts to include information about the author. The name of the author is available. We add a _picture_, a _URL_ and an _"About me"_ text.

The next picture shows what the information about the author looks like in the end. Instead of a portrait, I have chosen the image of a star formation for the example.

![Joomla 4 and Cassiopeia - Author Information in the Frontend](/images/aut10.png)

## Author information in Cassiopeia using an override and custom fields

### Creating custom fields

Open the _User Manager_ via the left-hand side menu and click _Fields_. On the right, the toolbar now offers you a button for creating custom fields.

Joomla 4 and Cassiopeia - Overview of custom fields](/images/aut0.png)

Create a custom field for the author's image. It is important that you choose the type `media`.

![Joomla 4 and Cassiopeia - A custom field for the author's image](/images/aut1.png)

For the description we also use a custom field. Select the type `textarea`.

![Joomla 4 and Cassiopeia - A custom field for the author's description](/images/aut2.png)

A custom field of type `url` stores the author's homepage.

![Joomla 4 and Cassiopeia - A custom field for the URL of the author's homepage](/images/aut3.png)

### Fill the custom fields at the user with content

Now open an author item in the user manager.

![Joomla 4 and Cassiopeia - User Manager - Fill Custom Fields - Open User](/images/aut4a.png)

Then we fill the custom fields with content.

![Joomla 4 and Cassiopeia - User Manager - Fill Custom Fields - Tab](/images/aut4b.png)

### Create the post

If the user now creates a contribution, it is automatically saved as the author. The entry can be changed later.

![Joomla 4 and Cassiopeia - Content Manager - Create Contribution ](/images/aut9a.png)

### Template Override

To make the fields appear at the bottom of the post the way we want them to, we create an override. To do this, we click on _System_ in the left sidebar and then on _Site Template_ in the _Tempaltes_ area on the right.

![Joomla 4 and Cassiopeia - Create Tempalte Override - Open Tekmplate Manager](/images/aut5a.png)

We select _Cassiopeia_.

![Joomla 4 and Cassiopeia - Create Tempalte Override - Create Override](/images/aut5aa.png)

In the _Overrides_ tablulator, we now create the _Override_ for displaying a post. This is nothing more than a copy of the previous view. We can change this copy. It will be preserved when Joomla is updated.

![Joomla 4 and Cassiopeia - Create Tempalte Override - Editor](/images/aut5b.png)

In the tabulator _Editor_ it is possible to change the override.

![Joomla 4 and Cassiopeia - Create Tempalte Override - ](/images/aut5c.png)

Copy the following code into the file `/templates/cassiopeia/html/com_content/article/default.php`.

> Do you want to create posts under which the author information does not appear? In my installation there is an administrator who creates these posts. For him, I do not fill in the custom fields. Therefore, the line `<?php if (json_decode($fields[1]->value) != null && $description != null && $url != null) : ?>` is enough so that no author information is displayed.

```php {numberLines: 1}
...
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;
...
```

und

```php {numberLines: 136}
...
	<?php $author = Joomla\CMS\Factory::getUser($this->item->created_by); ?>
	<?php $userfields = FieldsHelper::getFields('com_users.user', $author); ?>

	<?php $fields = []; ?>
	<?php foreach ($userfields as $field) : ?>
		<?php $fields[$field->id] = $field; ?>
	<?php endforeach; ?>
	<?php //print_r($fields); ?>

	<?php if (json_decode($fields[1]->value) != null && $beschreibung != null && $url != null) : ?>
		<?php $bild = json_decode($fields[1]->value)->imagefile; ?>
		<?php $alt = json_decode($fields[1]->value)->alt_text; ?>
		<?php $beschreibung = $fields[2]->value; ?>
		<?php $url = $fields[3]->value; ?>

		<!-- https://getbootstrap.com/docs/5.0/components/card/#horizontal-->
		<div class="card mb-3" style="max-width: 540px;">
			<div class="row g-0">
				<div class="col-md-4">
					<img src="<?php echo $bild; ?>" alt="<?php echo $alt; ?>">
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5 class="card-title"><?php echo $author->name; ?></h5>
						<p class="card-text"><?php echo $beschreibung; ?></p>
						<p class="card-text"><small class="text-muted"><?php echo HTMLHelper::_('link', Route::_($url), $url);?></small></p>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>

...
```

The view of the differences supports you. Here you can view the differences to the view in the Joomla Core at any time.

![Joomla 4 and Cassiopeia - Create Tempalte Override - ](/images/aut5d.png)

### Complete file

The complete file should end up looking like the code block below.

```php {numberLines}
defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Associations;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\FileLayout;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Router\Route;
use Joomla\CMS\Uri\Uri;
use Joomla\Component\Content\Administrator\Extension\ContentComponent;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\Component\Fields\Administrator\Helper\FieldsHelper;

// Create shortcuts to some parameters.
$params  = $this->item->params;
$canEdit = $params->get('access-edit');
$user    = Factory::getUser();
$info    = $params->get('info_block_position', 0);
$htag    = $this->params->get('show_page_heading') ? 'h2' : 'h1';

// Check if associations are implemented. If they are, define the parameter.
$assocParam        = (Associations::isEnabled() && $params->get('show_associations'));
$currentDate       = Factory::getDate()->format('Y-m-d H:i:s');
$isNotPublishedYet = $this->item->publish_up > $currentDate;
$isExpired         = !is_null($this->item->publish_down) && $this->item->publish_down < $currentDate;
?>
<div class="com-content-article item-page<?php echo $this->pageclass_sfx; ?>" itemscope itemtype="https://schema.org/Article">
	<meta itemprop="inLanguage" content="<?php echo ($this->item->language === '*') ? Factory::getApplication()->get('language') : $this->item->language; ?>">
	<?php if ($this->params->get('show_page_heading')) : ?>
	<div class="page-header">
		<h1> <?php echo $this->escape($this->params->get('page_heading')); ?> </h1>
	</div>
	<?php endif;
	if (!empty($this->item->pagination) && !$this->item->paginationposition && $this->item->paginationrelative)
	{
		echo $this->item->pagination;
	}
	?>

	<?php $useDefList = $params->get('show_modify_date') || $params->get('show_publish_date') || $params->get('show_create_date')
	|| $params->get('show_hits') || $params->get('show_category') || $params->get('show_parent_category') || $params->get('show_author') || $assocParam; ?>

	<?php if ($params->get('show_title')) : ?>
	<div class="page-header">
		<<?php echo $htag; ?> itemprop="headline">
			<?php echo $this->escape($this->item->title); ?>
		</<?php echo $htag; ?>>
		<?php if ($this->item->state == ContentComponent::CONDITION_UNPUBLISHED) : ?>
			<span class="badge bg-warning text-light"><?php echo Text::_('JUNPUBLISHED'); ?></span>
		<?php endif; ?>
		<?php if ($isNotPublishedYet) : ?>
			<span class="badge bg-warning text-light"><?php echo Text::_('JNOTPUBLISHEDYET'); ?></span>
		<?php endif; ?>
		<?php if ($isExpired) : ?>
			<span class="badge bg-warning text-light"><?php echo Text::_('JEXPIRED'); ?></span>
		<?php endif; ?>
	</div>
	<?php endif; ?>
	<?php if ($canEdit) : ?>
		<?php echo LayoutHelper::render('joomla.content.icons', array('params' => $params, 'item' => $this->item)); ?>
	<?php endif; ?>

	<?php // Content is generated by content plugin event "onContentAfterTitle" ?>
	<?php echo $this->item->event->afterDisplayTitle; ?>

	<?php if ($useDefList && ($info == 0 || $info == 2)) : ?>
		<?php echo LayoutHelper::render('joomla.content.info_block', array('item' => $this->item, 'params' => $params, 'position' => 'above')); ?>
	<?php endif; ?>

	<?php if ($info == 0 && $params->get('show_tags', 1) && !empty($this->item->tags->itemTags)) : ?>
		<?php $this->item->tagLayout = new FileLayout('joomla.content.tags'); ?>

		<?php echo $this->item->tagLayout->render($this->item->tags->itemTags); ?>
	<?php endif; ?>

	<?php // Content is generated by content plugin event "onContentBeforeDisplay" ?>
	<?php echo $this->item->event->beforeDisplayContent; ?>

	<?php if ((int) $params->get('urls_position', 0) === 0) : ?>
	<?php echo $this->loadTemplate('links'); ?>
	<?php endif; ?>
	<?php if ($params->get('access-view')) : ?>
	<?php echo LayoutHelper::render('joomla.content.full_image', $this->item); ?>
	<?php
	if (!empty($this->item->pagination) && $this->item->pagination && !$this->item->paginationposition && !$this->item->paginationrelative) :
		echo $this->item->pagination;
	endif;
	?>
	<?php if (isset ($this->item->toc)) :
		echo $this->item->toc;
	endif; ?>
	<div itemprop="articleBody" class="com-content-article__body">
		<?php echo $this->item->text; ?>
	</div>

	<?php if ($info == 1 || $info == 2) : ?>
		<?php if ($useDefList) : ?>
			<?php echo LayoutHelper::render('joomla.content.info_block', array('item' => $this->item, 'params' => $params, 'position' => 'below')); ?>
		<?php endif; ?>
		<?php if ($params->get('show_tags', 1) && !empty($this->item->tags->itemTags)) : ?>
			<?php $this->item->tagLayout = new FileLayout('joomla.content.tags'); ?>
			<?php echo $this->item->tagLayout->render($this->item->tags->itemTags); ?>
		<?php endif; ?>
	<?php endif; ?>

	<?php
	if (!empty($this->item->pagination) && $this->item->paginationposition && !$this->item->paginationrelative) :
		echo $this->item->pagination;
	?>
	<?php endif; ?>
	<?php if ((int) $params->get('urls_position', 0) === 1) : ?>
	<?php echo $this->loadTemplate('links'); ?>
	<?php endif; ?>
	<?php // Optional teaser intro text for guests ?>
	<?php elseif ($params->get('show_noauth') == true && $user->get('guest')) : ?>
	<?php echo LayoutHelper::render('joomla.content.intro_image', $this->item); ?>
	<?php echo HTMLHelper::_('content.prepare', $this->item->introtext); ?>
	<?php // Optional link to let them register to see the whole article. ?>
	<?php if ($params->get('show_readmore') && $this->item->fulltext != null) : ?>
	<?php $menu = Factory::getApplication()->getMenu(); ?>
	<?php $active = $menu->getActive(); ?>
	<?php $itemId = $active->id; ?>
	<?php $link = new Uri(Route::_('index.php?option=com_users&view=login&Itemid=' . $itemId, false)); ?>
	<?php $link->setVar('return', base64_encode(RouteHelper::getArticleRoute($this->item->slug, $this->item->catid, $this->item->language))); ?>
	<?php echo LayoutHelper::render('joomla.content.readmore', array('item' => $this->item, 'params' => $params, 'link' => $link)); ?>
	<?php endif; ?>
	<?php endif; ?>
	<?php
	if (!empty($this->item->pagination) && $this->item->paginationposition && $this->item->paginationrelative) :
		echo $this->item->pagination;
	?>
	<?php endif; ?>
	<?php // Content is generated by content plugin event "onContentAfterDisplay" ?>
	<?php echo $this->item->event->afterDisplayContent; ?>

	<?php $author = Joomla\CMS\Factory::getUser($this->item->created_by); ?>
	<?php $userfields = FieldsHelper::getFields('com_users.user', $author); ?>

	<?php $fields = []; ?>
	<?php foreach ($userfields as $field) : ?>
		<?php $fields[$field->id] = $field; ?>
	<?php endforeach; ?>
	<?php //print_r($fields); ?>

	<?php if (json_decode($fields[1]->value) != null && $beschreibung != null && $url != null) : ?>
		<?php $bild = json_decode($fields[1]->value)->imagefile; ?>
		<?php $alt = json_decode($fields[1]->value)->alt_text; ?>
		<?php $beschreibung = $fields[2]->value; ?>
		<?php $url = $fields[3]->value; ?>

		<!-- https://getbootstrap.com/docs/5.0/components/card/#horizontal-->
		<div class="card mb-3" style="max-width: 540px;">
			<div class="row g-0">
				<div class="col-md-4">
					<img src="<?php echo $bild; ?>" alt="<?php echo $alt; ?>">
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5 class="card-title"><?php echo $author->name; ?></h5>
						<p class="card-text"><?php echo $beschreibung; ?></p>
						<p class="card-text"><small class="text-muted"><?php echo HTMLHelper::_('link', Route::_($url), $url);?></small></p>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
</div>
```

### Possible errors

#### Check the data in the fields

Doesn't it work the way you want it to? Then first look at the data in the fields. Use the line `<?php print_r($fields); ?>`. I was initially overwhelmed by the output. However, only a few fields are important. I have separated them in the following code block.

```
Array (

[1] => stdClass Object ( [id] => 1 [title] => Autorbild [name] => autorbild [checked_out] => [checked_out_time] => [note] => [state] => 1 [access] => 1 [created_time] => 2021-05-14 14:41:27 [created_user_id] => 42 [ordering] => 0 [language] => * [fieldparams] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [directory] => [preview] => [image_class] => ) [initialized:protected] => 1 [separator] => . ) [params] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [hint] => [class] => [label_class] => [show_on] => [render_class] => [showlabel] => 1 [label_render_class] => [display] => 2 [prefix] => [suffix] => [layout] => [display_readonly] => 2 ) [initialized:protected] => 1 [separator] => . ) [type] => media [default_value] => [context] => com_users.user [group_id] => 0 [label] => Autorbild [description] => [required] => 0 [only_use_in_subform] => 0 [language_title] => [language_image] => [editor] => [access_level] => Public

[author_name] => Admin [group_title] => [group_access] => [group_state] => [group_note] =>

[value] => {"imagefile":"images\/bild.png?joomla_image_width=225&joomla_image_height=50","alt_text":""}

[rawvalue] => {"imagefile":"images\/bild.png?joomla_image_width=225&joomla_image_height=50","alt_text":""} )

[2] => stdClass Object ( [id] => 2 [title] => Autorinfo [name] => autorinfo [checked_out] => [checked_out_time] => [note] => [state] => 1 [access] => 1 [created_time] => 2021-05-14 14:42:13 [created_user_id] => 42 [ordering] => 0 [language] => * [fieldparams] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [rows] => [cols] => [maxlength] => [filter] => ) [initialized:protected] => 1 [separator] => . ) [params] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [hint] => [class] => [label_class] => [show_on] => [render_class] => [showlabel] => 1 [label_render_class] => [display] => 2 [prefix] => [suffix] => [layout] => [display_readonly] => 2 ) [initialized:protected] => 1 [separator] => . ) [type] => textarea [default_value] => [context] => com_users.user [group_id] => 0 [label] => Autorinfo [description] => [required] => 0 [only_use_in_subform] => 0 [language_title] => [language_image] => [editor] => [access_level] => Public [author_name] => Admin [group_title] => [group_access] => [group_state] => [group_note] =>

[value] => Ich bin Peter und ich helfe Websitebetreuern bei der Joomla Administration

[rawvalue] => Ich bin Peter und ich helfe Websitebetreuern bei der Joomla Administration )

[3] => stdClass Object ( [id] => 3 [title] => Homepage [name] => homepage [checked_out] => [checked_out_time] => [note] => [state] => 1 [access] => 1 [created_time] => 2021-05-14 14:42:53 [created_user_id] => 42 [ordering] => 0 [language] => * [fieldparams] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [relative] => [show_url] => 1 ) [initialized:protected] => 1 [separator] => . ) [params] => Joomla\Registry\Registry Object ( [data:protected] => stdClass Object ( [hint] => [class] => [label_class] => [show_on] => [render_class] => [showlabel] => 1 [label_render_class] => [display] => 2 [prefix] => [suffix] => [layout] => [display_readonly] => 2 ) [initialized:protected] => 1 [separator] => . ) [type] => url [default_value] => [context] => com_users.user [group_id] => 0 [label] => Homepage [description] => [required] => 0 [only_use_in_subform] => 0 [language_title] => [language_image] => [editor] => [access_level] => Public [author_name] => Admin [group_title] => [group_access] => [group_state] => [group_note] =>

[value] => http://www.example.org
[rawvalue] => http://www.example.org ) )
```
