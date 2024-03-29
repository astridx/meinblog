---
description: 'desc'
set: 'eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-cassipeia-anwenden'
syndication:
shortTitle: 'short'
date: 2022-10-30
title: 'Override des Modules Articles - Category Beiträge - Kategorie'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-override-module-articles-category
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---










Du verwendest verschieden Module des Types Beiträge - Kategorie. Nun möchtest du, dass ein Website Besucher auf den ersten Blick erkennt, zu welchem Module der gerade aktive Beitrag gehört und um welchen Beitrag es sich handelt. Dazu möchtest du das Modul und den Beitrag selbst per CSS besonders stylen.<!-- \index{Aktuellen Beitrag hervorheben} --><!-- \index{Override!mod_articles_category} -->

Wie ist das mit Cassiopeia umsetzbar? Gehen wir das Problem praktisch an!

## Zwei Test-Module

Als erstes legen wir zwei Module vom Typ `Beiträge - Kategorie` zum Testen an.

![Joomla Testmodule anlegen](/images/moduleoverride0.png)

Weil wir das äußere HTML-Element des Module mit einer CSS-Klasse versehen müssen, stellen wir das Modul so ein, dass kein Module Chrome Style verwendet wird.

> Es gibt die `:has() CSS relational pseudo-class`, mit deren Hilfe es möglich wäre, Eltern-HTML-Elemente zu stylen. Diese Funktion wird aber noch nicht gut unterstützt: [caniuse.com](https://caniuse.com/css-has)[^caniuse.com/css-has]

![Keinen Module Style beim Module einstellen](/images/moduleoverride1.png)

Im Frontend sieht dies nun erst einmal etwas nackt aus.

![Ansicht der Module im Frontend](/images/moduleoverride1a.png)



## Das Override erstellen

Nun erstellen wir über das Joomla Backend ein Override für das Module.

![Override zum Modul anlegen](/images/moduleoverride2.png)

Es sollten die beiden Dateien `/templates/cassiopeia/html/mod_articles_category/default.php` und `/templates/cassiopeia/html/mod_articles_category/default_items.php` angelegt werden.

![Ansicht der Dateien zum Override](/images/moduleoverride3.png)

## Das Override editieren

### Liste

Die Datei `/templates/cassiopeia/html/mod_articles_category/default.php` beinhaltet den Code zum erstellen der Liste aller Beiträge für die ausgewählte Kategorie. Der vollständige Inhalt sieht wie folgt aus:

```php
<?php

/**
 * @package     Joomla.Site
 * @subpackage  mod_articles_category
 *
 * @copyright   (C) 2010 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Factory;

$app = Factory::getApplication();
$article_id = -1;

if (
    $app->input->get('option') === 'com_content'
    && $app->input->get('view') === 'article'
) {
    // Get the article ID
    $article_id = $app->input->getInt('id');
}

if (!$list) {
    return;
}

$class_name_module = 'no_active_article_id';
foreach ($list as $item) {
    if ($article_id === (int)$item->id){
        $class_name_module = 'active_article_id';
    } 
}

?>

<style>
.active_article_id {
    background-color: red;
}

.no_active_article_id {
    background-color: gray;
}
</style>

<div class="<?php echo $class_name_module; ?> card">
    <div class="card-header">
        <h3><?php echo $module->title ?></h3>
    </div>
    <div class="card-body">
        <ul class="mod-articlescategory category-module mod-list">
            <?php if ($grouped) : ?>
            <?php foreach ($list as $groupName => $items) : ?>
            <li>
                <div class="mod-articles-category-group"><?php echo Text::_($groupName); ?></div>
                <ul>
                    <?php require ModuleHelper::getLayoutPath('mod_articles_category', $params->get('layout', 'default') . '_items'); ?>
                </ul>
            </li>
            <?php endforeach; ?>
            <?php else : ?>
            <?php $items = $list; ?>
            <?php require ModuleHelper::getLayoutPath('mod_articles_category', $params->get('layout', 'default') . '_items'); ?>
            <?php endif; ?>
        </ul>
    </div>
</div>

```

Als erstes sorgen wir dafür, dass das Modul nicht mehr so gedrückt wirkt. Hierzu ergänzen wir Elemente zur Darstellung eines Bootstrap Card Elementes, wie in Cassiopeia üblich.

```php

<div class="card>
<div class="card-header">
<h3><?php echo $module->title ?></h3>
</div>
<div class="card-body>
<h3><?php echo $module->title ?></h3>

<ul class="mod-articlescategory category-module mod-list">
..
</ul>

</div>
</div>
```

![Den Style im Override selbst implementieren](/images/moduleoverride4.png)


Danach ergänzen wir den Code, der die ID des aktiven Beitrags speichert. Ist gerade keine Beitragsansicht aktiv, weil beispielsweise ein Kategorieblog angezeigt wird, wird die ID mit -1 als ungültig gesetzt.

```php

use Joomla\CMS\Factory;

$app = Factory::getApplication();
$article_id = -1;
if (
    $app->input->get('option') === 'com_content'
    && $app->input->get('view') === 'article'
) {
    // Get the article ID
    $article_id = $app->input->getInt('id');
}
```

Als nächstes überprüfen wir, ob die im Modul anzuzeigende Liste den Beitrag mit der eben ausgelesenen ID enthält und speichern demenstprechend den Namen der einzufügenden Klasse.

```php
$class_name_module = 'no_active_article_id';
foreach ($list as $item) {
    if ($article_id === (int)$item->id){
        $class_name_module = 'active_article_id';
    } 
}

```

Zum Schluss fügen wir die Klasse im umgebenden Div-Element ein und eränzen Style. 

> Die CSS-Style habe ich der Einfachheit halber im Override eingefügt. Besser sind diese in einer user.css aufgehoben.

```php

<style>
.active_article_id {
    background-color: red;
}
.no_active_article_id {
    background-color: gray;
}
</style>

<div class="<?php echo $class_name_module; ?> card">

```

Im Frontend sollte dies nun wie in den beiden nachfolgenden Bildern aussehen. Ist der gerade aktive Beitrag im Modul zu sehen, wird das Module rot dargestellt. 

![Hintergrundfarbe anpassen](/images/moduleoverride5.png)

![Hintergrundfrabe, wenn keine Artikelansicht aktiv ist](/images/moduleoverride5a.png)

#### Die vollständige Datei am Ende der Implementierung

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Factory;

$app = Factory::getApplication();
$article_id = -1;

if (
    $app->input->get('option') === 'com_content'
    && $app->input->get('view') === 'article'
) {
    // Get the article ID
    $article_id = $app->input->getInt('id');
}

if (!$list) {
    return;
}

$class_name_module = 'no_active_article_id';
foreach ($list as $item) {
    if ($article_id === (int)$item->id){
        $class_name_module = 'active_article_id';
    } 
}

?>

<style>
.active_article_id {
    background-color: red;
}

.no_active_article_id {
    background-color: gray;
}
</style>

<div class="<?php echo $class_name_module; ?> card">
    <div class="card-header">
        <h3><?php echo $module->title ?></h3>
    </div>
    <div class="card-body">
        <ul class="mod-articlescategory category-module mod-list">
            <?php if ($grouped) : ?>
            <?php foreach ($list as $groupName => $items) : ?>
            <li>
                <div class="mod-articles-category-group"><?php echo Text::_($groupName); ?></div>
                <ul>
                    <?php require ModuleHelper::getLayoutPath('mod_articles_category', $params->get('layout', 'default') . '_items'); ?>
                </ul>
            </li>
            <?php endforeach; ?>
            <?php else : ?>
            <?php $items = $list; ?>
            <?php require ModuleHelper::getLayoutPath('mod_articles_category', $params->get('layout', 'default') . '_items'); ?>
            <?php endif; ?>
        </ul>
    </div>
</div>
```


### Item

Die Datei `/templates/cassiopeia/html/mod_articles_category/default_items.php` durchläuft alle anzuzeigenden Beiträge und fügt diese in die Liste ein. Der vollständige Inhalt sieht wie folgt aus:

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;

?>
<?php foreach ($items as $item) : ?>
<li>
    <?php if ($params->get('link_titles') == 1) : ?>
        <?php $attributes = ['class' => 'mod-articles-category-title ' . $item->active]; ?>
        <?php $link = htmlspecialchars($item->link, ENT_COMPAT, 'UTF-8', false); ?>
        <?php $title = htmlspecialchars($item->title, ENT_COMPAT, 'UTF-8', false); ?>
        <?php echo HTMLHelper::_('link', $link, $title, $attributes); ?>
    <?php else : ?>
        <?php echo $item->title; ?>
    <?php endif; ?>

    <?php if ($item->displayHits) : ?>
        <span class="mod-articles-category-hits">
            (<?php echo $item->displayHits; ?>)
        </span>
    <?php endif; ?>

    <?php if ($params->get('show_author')) : ?>
        <span class="mod-articles-category-writtenby">
            <?php echo $item->displayAuthorName; ?>
        </span>
    <?php endif; ?>

    <?php if ($item->displayCategoryTitle) : ?>
        <span class="mod-articles-category-category">
            (<?php echo $item->displayCategoryTitle; ?>)
        </span>
    <?php endif; ?>

    <?php if ($item->displayDate) : ?>
        <span class="mod-articles-category-date"><?php echo $item->displayDate; ?></span>
    <?php endif; ?>

    <?php if ($params->get('show_tags', 0) && $item->tags->itemTags) : ?>
        <div class="mod-articles-category-tags">
            <?php echo LayoutHelper::render('joomla.content.tags', $item->tags->itemTags); ?>
        </div>
    <?php endif; ?>

    <?php if ($params->get('show_introtext')) : ?>
        <p class="mod-articles-category-introtext">
            <?php echo $item->displayIntrotext; ?>
        </p>
    <?php endif; ?>

    <?php if ($params->get('show_readmore')) : ?>
        <p class="mod-articles-category-readmore">
            <a class="mod-articles-category-title <?php echo $item->active; ?>" href="<?php echo $item->link; ?>">
                <?php if ($item->params->get('access-view') == false) : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE'); ?>
                <?php elseif ($item->alternative_readmore) : ?>
                    <?php echo $item->alternative_readmore; ?>
                    <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                        <?php if ($params->get('show_readmore_title', 0)) : ?>
                            <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                        <?php endif; ?>
                <?php elseif ($params->get('show_readmore_title', 0)) : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_READ_MORE'); ?>
                    <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                <?php else : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_READ_MORE_TITLE'); ?>
                <?php endif; ?>
            </a>
        </p>
    <?php endif; ?>
</li>
<?php endforeach; ?>

```

In der Datei lesen wir ebenfalls die ID des gerade aktiven Beitrags aus.


```php
...
use Joomla\CMS\Factory;

$app = Factory::getApplication();
$article_id_item = -1;

if (
    $app->input->get('option') === 'com_content'
    && $app->input->get('view') === 'article'
) {
    // Get the article ID
    $article_id_item = $app->input->getInt('id');
}
?>
...
```

Danach setzen wir den Klassennamen, jennachdem, ob der gerade einzufügende Beitrag aktiv ist oder nicht. Die Style habe ich auch hier der Einfachheit halber wieder in der PHP Datei des Overrides eingefügt. 

```php

<?php foreach ($items as $item) : ?>

<?php $class_name_item = "no_active_article_id_item"; ?>
<?php if ($article_id_item === (int)$item->id) : ?>
<?php $class_name_item = 'active_article_id_item'; ?>
<?php endif; ?>

<li class="<?php echo $class_name_item ?>">
...
...
<style>
.active_article_id_item a {
    color: green;
    font-size:30px;
}
.no_active_article_id_item a {
    color: black;
}
</style>
...

```


Im Frontend sollte dies nun wie in den beiden nachfolgenden Bildern aussehen. Der Name des aktiven Beitrags ist im Modul groß und in grüner Farbe zu sehen.

![Den aktiven Artikel kennzeichnen](/images/moduleoverride6.png)

![Den aktiven Artikel kennzeichnen](/images/moduleoverride6a.png)

#### Die vollständige Datei am Ende der Implementierung

```php
<?php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Layout\LayoutHelper;
use Joomla\CMS\Factory;

$app = Factory::getApplication();
$article_id_item = -1;

if (
    $app->input->get('option') === 'com_content'
    && $app->input->get('view') === 'article'
) {
    // Get the article ID
    $article_id_item = $app->input->getInt('id');
}
?>

<style>
.active_article_id_item a {
    color: green;
    font-size:30px;
}
.no_active_article_id_item a {
    color: black;
}
</style>

<?php foreach ($items as $item) : ?>

<?php $class_name_item = "no_active_article_id_item"; ?>
<?php if ($article_id_item === (int)$item->id) : ?>
<?php $class_name_item = 'active_article_id_item'; ?>
<?php endif; ?>

<li class="<?php echo $class_name_item ?>">
    <?php if ($params->get('link_titles') == 1) : ?>
        <?php $attributes = ['class' => 'mod-articles-category-title ' . $item->active]; ?>
        <?php $link = htmlspecialchars($item->link, ENT_COMPAT, 'UTF-8', false); ?>
        <?php $title = htmlspecialchars($item->title, ENT_COMPAT, 'UTF-8', false); ?>
        <?php echo HTMLHelper::_('link', $link, $title, $attributes); ?>
    <?php else : ?>
        <?php echo $item->title; ?>
    <?php endif; ?>

    <?php if ($item->displayHits) : ?>
        <span class="mod-articles-category-hits">
            (<?php echo $item->displayHits; ?>)
        </span>
    <?php endif; ?>

    <?php if ($params->get('show_author')) : ?>
        <span class="mod-articles-category-writtenby">
            <?php echo $item->displayAuthorName; ?>
        </span>
    <?php endif; ?>

    <?php if ($item->displayCategoryTitle) : ?>
        <span class="mod-articles-category-category">
            (<?php echo $item->displayCategoryTitle; ?>)
        </span>
    <?php endif; ?>

    <?php if ($item->displayDate) : ?>
        <span class="mod-articles-category-date"><?php echo $item->displayDate; ?></span>
    <?php endif; ?>

    <?php if ($params->get('show_tags', 0) && $item->tags->itemTags) : ?>
        <div class="mod-articles-category-tags">
            <?php echo LayoutHelper::render('joomla.content.tags', $item->tags->itemTags); ?>
        </div>
    <?php endif; ?>

    <?php if ($params->get('show_introtext')) : ?>
        <p class="mod-articles-category-introtext">
            <?php echo $item->displayIntrotext; ?>
        </p>
    <?php endif; ?>

    <?php if ($params->get('show_readmore')) : ?>
        <p class="mod-articles-category-readmore">
            <a class="mod-articles-category-title <?php echo $item->active; ?>" href="<?php echo $item->link; ?>">
                <?php if ($item->params->get('access-view') == false) : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_REGISTER_TO_READ_MORE'); ?>
                <?php elseif ($item->alternative_readmore) : ?>
                    <?php echo $item->alternative_readmore; ?>
                    <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                        <?php if ($params->get('show_readmore_title', 0)) : ?>
                            <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                        <?php endif; ?>
                <?php elseif ($params->get('show_readmore_title', 0)) : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_READ_MORE'); ?>
                    <?php echo HTMLHelper::_('string.truncate', $item->title, $params->get('readmore_limit')); ?>
                <?php else : ?>
                    <?php echo Text::_('MOD_ARTICLES_CATEGORY_READ_MORE_TITLE'); ?>
                <?php endif; ?>
            </a>
        </p>
    <?php endif; ?>
</li>
<?php endforeach; ?>

```
<img src="https://vg05.met.vgwort.de/na/fde6b138c7cc41e1a45b29faed63e5a1" width="1" height="1" alt="">
