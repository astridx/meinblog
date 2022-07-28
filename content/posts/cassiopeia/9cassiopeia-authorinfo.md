---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-03-11
title: 'Informationen zum Autor'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-autorinfo
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Auf einer Website veröffentlichen verschiedene Autoren Artikel. Du wünschst dir, dass bei Blog-Beiträgen eine Information zum Urheber ausgegeben wird. Der Name des Autors ist verfügbar. Wir ergänzen ein _Bild_, eine _URL_ und einen _"Über mich"_-Text.

Wie die Information zum Autor am Ende aussieht, zeigt das nächste Bild. Statt eines Porträts habe ich für das Beispiel das Bild einer Sternformation gewählt.

![Joomla 4 und Cassiopeia - Autorinformation im Frontend](/images/aut10.png)

## Autorinformation in Cassiopeia mithilfe eines Overrides und benutzerdefinierten Feldern

### Benutzerdefinierte Felder anlegen

Öffne über das linke Seitenmenü in den _Benutzer Manager_ und klicke _Fields_. Rechts bietet dir die Werkzeugleiste jetzt eine Schaltfläche zum Anlegen von benutzerdefinierten Feldern.

![Joomla 4 und Cassiopeia - Übersicht benutzerdefinierte Felder](/images/aut0.png)

Lege ein benutzerdefiniertes Feld für das Bild des Autors an. Wichtig ist, dass du den Typ `media` wählst.

![Joomla 4 und Cassiopeia - Ein benutzerdefiniertes Feld für das Bild des Autors](/images/aut1.png)

Für die Beschreibung nutzen wir ebenfalls ein benutzerdefiniertes Feld. Wähle den Typ `textarea`.

![Joomla 4 und Cassiopeia - Ein benutzerdefiniertes Feld für die Beschreibung des Autors](/images/aut2.png)

Ein benutzerdefiniertes Feld vom Typ `url` speichert die Homepage des Autors.

![Joomla 4 und Cassiopeia - Ein benutzerdefiniertes Feld für die URL der Homepage des Autors](/images/aut3.png)

### Die benutzerdefinierten Felder beim Benutzer mit Inhalt füllen

Nun öffnen wir im Benutzermanager den Eintrag eines Autors.

![Joomla 4 und Cassiopeia - Benutzermanager - Benutzerdefinierte Felder befüllen - Benutzer öffnen](/images/aut4a.png)

Dann füllen wir die benutzerdefinieren Felder mit Inhalt.

![Joomla 4 und Cassiopeia - Benutzermanager - Benutzerdefinierte Felder befüllen - Tabulator](/images/aut4b.png)

### Den Beitrag erstellen

Wenn der Benutzer nun einen Beitrag erstellt, wird er automatisch als Autor gespeichert.

![Joomla 4 und Cassiopeia - Content Manager - Beitrag erstellen ](/images/aut9a.png)

> Falls mehrere an dem Beitrag arbeiten und der Autor später geändert werden soll, ist diese im Tabulator _Publishing_ möglich.

### Template Override

Damit die Felder so wie wir uns das vorstellen am unteren Ende des Beitrag erscheinen, erstellen wir ein Override. Dazu klicken wir in der linken Seitenleiste auf _System_ und dann rechts im Bereich _Tempaltes_ auf _Site Template_.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Tekmplate Manager öffnen](/images/aut5a.png)

Wir wählen _Cassiopeia_.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Override erstellen](/images/aut5aa.png)

Im Tablulator _Overrides_ erstellen wir nun das _Override_ für die Anzeige eines Beitrages. Dies ist nichts anderes als eine Kopie der bisherigen Ansicht. Diese neu erstellte Kopie können wir abändern. Sie bleibt bei einer Aktualisierung von Joomla erhalten.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Editor](/images/aut5b.png)

Im Tabulator _Editor_ ist das abändern des Overrides möglich.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - ](/images/aut5c.png)

Kopiere den nachfolgenden Code in die Datei `/templates/cassiopeia/html/com_content/article/default.php`.

> Möchtest du Beitrag erstellen, unter denen die Autorinformation nicht erscheint? In meiner Installation gibt es einen Administrator, der diese Beiträge erstellt. Bei ihm fülle ich die benutzerdefinierten Felder nicht aus. Deshalb reicht die Zeile `<?php if (json_decode($fields[1]->value) != null && $beschreibung != null && $url != null) : ?>`, damit keine Information zum Autor eingeblendet wird.

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

Die Ansicht der Differenzen unterstützt dich. Hier kannst du dir jederzeit die Unterschiede zur Ansicht im Joomla Core ansehen.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - ](/images/aut5d.png)

### Vollständige Datei

Die vollständige Datei sollte am Ende so aussehen, wie im nachfolgenden Codeblock.

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

### Mögliche Fehler

#### Prüfe die Daten in den Feldern

Klappt das nicht so. wie du dir das vorstellst? Dann sieh dir die Daten in den Feldern an. Nutze dazu die Zeile `<?php print_r($fields); ?>`. Mich hat die Ausgabe zunächst überwältigt. Wichtig sind aber nur einige wenige Felder. Ich habe sie im nachfolgenden Codeblock mit Abstand getrennt.

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

<img src="https://vg04.met.vgwort.de/na/f10e2e58223e4423ad33a3507fb0638f" width="1" height="1" alt="">
