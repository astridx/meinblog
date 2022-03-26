---
description: 'desc'
shortTitle: 'short'
date: 2021-01-08
title: 'Template - Overrides - Alternative Overrides and Modules Chrome'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-css-overrides-und-chrome
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

In this chapter we will change the output of the extensions in the frontend. In Joomla this is done using

- overrides,
- alternative overrides,
- layouts and
- module chromes.<!-- \index{template!overrides, alternative overrides, layouts, module chomes} -->

The standard output of each Joomla extension can be manipulated via files in the template's `html` folder. Joomla offers different options for this purpose. Overrides, alternative overrides, layouts and module chromes. Each variant has its purpose.

_Overrides_ are the first choice. If there is already an override for an extension, you create an _alternative override_. _Layouts_ override a small area of a view and can be reused in different views. Last but not least, _module chromes_ offer a variant to use an override in different places slightly modified.<!-- \index{modul chromes} --><!-- \index{overrides} --><!-- \index{alternvative overrides} --><!-- \index{overrides} -->

![Create Joomla Template - Module Chrome](/images/overview.en.png)

> For impatient people: Take a look at the changed programme code in the [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t36...t37)[^github.com/astridx/boilerplate/compare/t36...t37] and copy these changes into your development version.

## Step by step

In this section we change the frontend view of `com_content/featured`, `mod_articles_news` and `mod_menu`. Thereby we use all variants possible in Joomla for overwriting. The template is not finished with this. There remain a lot of extensions whose view is not adapted.

My Goal: In the end, we will have discussed all override variations so that you can finish the template or edit your own template according to your needs. Finished will be the home page view of the Joomla 4 blog sample files.

Home page view of the Joomla 4 blog sample in Cassiopeia:
![Create Joomla Template - Default Template Cassiopeia](/images/j4x43x8a.png)
Home page view of the Joomla 4 blog sample in our new template Facile:
![Create Joomla Template - Template Facile](/images/j4x43x8b.png)

Overrides can be created comfortably with the help of the template manager. This offers a view that highlights the differences to Joomla's own code.

![Create Joomla Template - Diff-View](/images/j4x42x4.png)

> Tip: If you want to change a view only slightly, it is a good idea to take the original view as a template. Then you can change it. To do this, create a copy of the existing view in the `html` directory of the template and edit it. The copy is placed in the template directory, exactly as the file `templates/TEMPLATE_NAME/html/EXTENSION_NAME/VIEW_NAME/FILE_NAME.php`. For example, if you want to change the `feature` view of `com_content`, then copy the file `components/com_content/views/feature/tmpl/default.php` to `templates/TEMPLATE_NAME/html/com_content/feature/default.php`. Similarly, if you want to change the appearance of the `mod_article_latest` module. Copy `modules/tmpl/mod_articles_news/default.php` to `templates/TEMPLATE_NAME/html/mod_articles_news/default.php`. Joomla 4 includes the standard frontend template Cassiopeia. Cassipeia uses template overrides to create the dropdown menu. You can use this as an example. Open the directory `\template\cassiopeia`. In the template folder, you will find a subdirectory called `html`.

### New files

#### Assets directory

I took the design from the HTML5 UP template [TXT](https://html5up.net/txt)[^html5up.net/txt]. This tutorial is about Joomla. Explanations about HTML, SCSS and CSS would go beyond the scope of this post. Therefore I leave them out and concentrate on Joomla.

##### Override `com_content/featured/` (including Layout Override)

The blog sample files use the `components/com_content/tmpl/com_content/featured/` view as the start page. The code of this view is complex, at least in Joomla core. I don't need many of these complex features, so I'll limit myself to the essentials. Take a look at the code below. Basically, I go through all the items with the `featured/` property and display them using the `default_item.php` subtemplate. Joomla provides me with all the properties of an article in the variable `$this->items`.

> Joomla uses templates and subtemplates like `$this->loadTemplate('item')` or layouts like `LayoutHelper::render('joomla.content.intro_image', $this->item);` to structure the code clearly. I had already mentioned this with the frontend views of the categories in the tutorial part for the component. In the following, we will take a practical look at these functions again. Nachfolgend sehen wir uns diese Funktionen noch einmal praktisch an.<!-- \index{subtemplates} -->

[templates/facile/ html/com_content/featured/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/com_content/featured/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/com_content/featured/default.php

<?php
defined('_JEXEC') or die;
?>

<div>
	<h1>
		<?php echo $this->escape($this->params->get('page_heading')); ?>
	</h1>

	<?php if (!empty($this->items)) : ?>
		<?php foreach ($this->items as $key => &$item) : ?>
			<div>
				<?php
				$this->item = & $item;
				echo $this->loadTemplate('item');
				?>
			</div>
		<?php endforeach; ?>
	<?php endif; ?>
</div>

```

The file `/templates/facile/ html/com_content/featured/default.php` is an override. It calls a subtemplate using `echo $this->loadTemplate('item');`.

[templates/facile/ html/com_content/featured/default_item.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/com_content/featured/default_item.php)

The subtemplate `templates/facile/ html/com_content/featured/default_item.php`

- displays an image using the `joomla.content.intro_image` layout,
- then creates a linked headline and
- outputs the intro text below it.

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/com_content/featured/default_item.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Router\Route;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\CMS\Layout\LayoutHelper;
?>

<?php echo LayoutHelper::render('joomla.content.intro_image', $this->item); ?>

<div>
	<h2>
		<a href="<?php echo Route::_(RouteHelper::getArticleRoute($this->item->slug, $this->item->catid, $this->item->language)); ?>">
			<?php echo $this->escape($this->item->title); ?>
		</a>
	</h2>

	<?php echo $this->item->introtext; ?>
</div>

```

Joomla first searches for files in the template directory. Therefore we create our own layout later. We will save it under `templates/facile/ html/layouts/joomla/content/intro_image.php`. Our own layout shows the image in the correct size. Since the file `layouts/joomla/content/intro_image.php` exists directly in the Joomla root directory, it would otherwise be used for the display. If we had no special requirements, we could make it easy and use this Joomla own layout `layouts/joomla/content/intro_image.php`.

> If the file `templates/facile/ html/layouts/joomla/content/intro_image.php` did not exist, next the directory `layouts/ joomla/content/` would be searched and the file `intro_image.php` there would be used for display.

[templates/facile/ html/layouts/joomla/content/intro_image.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/layouts/joomla/content/intro_image.php)

The layout `joomla.content.intro_image` is used in many places in Joomla.

> In addition to the override of entire views, Joomla supports the override of smaller code segments, so-called layouts. Layouts are used by Joomla in various places. For example, to generate the code that creates the search and sort filters in list views or when displaying post information (such as author, creation date...) above or below a post.

Because our template is built differently and expects different CSS elements, the display of the image via `joomla.content.intro_image` is not optimal. Therefore we overwrite the layout in our template. Because we want to reuse this, we do it in a way that we can also access our layout in other places via `echo LayoutHelper::render('joomla.content.intro_image', $this->item);`. For this we create the file `templates/facile/ html/layouts/joomla/content/intro_image.php`.

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/layouts/joomla/content/intro_image.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\Component\Content\Site\Helper\RouteHelper;
use Joomla\CMS\Router\Route;

$images = json_decode($displayData->images);
$img = HTMLHelper::cleanImageURL($images->image_intro);
$alt = empty($images->image_intro_alt) && empty($images->image_intro_alt_empty) ? '' : 'alt="'. htmlspecialchars($images->image_intro_alt, ENT_COMPAT, 'UTF-8') .'"';
?>

<a href="<?php echo Route::_(RouteHelper::getArticleRoute($displayData->slug, $displayData->catid, $displayData->language)); ?>" class="image featured">
<img src="<?php echo htmlspecialchars($img->url, ENT_COMPAT, 'UTF-8'); ?>" alt="<?php echo $alt; ?>" />
</a>

```

> Again for comparison: The original Joomla-own file of the layout `joomla.content.intro_image` is located in the directory `layouts/ joomla/content/intro_image.php`. The special file for our template is saved under `templates/facile/ html/` + `layouts/joomla/content/intro_image.php`.

##### Override via Module Chrome `mod_articles_news`

At the top of the home page, the Joomla Blog sample data displays the module `mod_articles_news`. We create a standard override analogous to the view of the main articles in `com_content/featured/`, in which we include the items in a subtemplate. The code of the two files `mod_articles_news/_item.php` and `mod_articles_news/default.php` can be found below. These only support the necessary functions and are therefore clearly compact for learning.

> `templates/facile/html/mod_articles_news/_item.php` also contains a layout. `joomla.content.readmore` contains the code that creates a readmore link. This is a function that is used in many views and is therefore a good example of reusability.

[templates/facile/ html/mod_articles_news/\_item.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_articles_news/_item.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_articles_news/_item.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Layout\LayoutHelper;
?>

<div class="col-4 col-12-medium col-12-small">
	<section class="box feature">
		<a href="<?php echo $item->link; ?>" class="image featured"><img src="<?php echo $item->imageSrc; ?>" alt="<?php echo $item->imageAlt; ?>"/></a>

		<h3><a href="<?php echo $item->link; ?>"><?php echo $item->title; ?></a></h3>

		<p>
			<?php echo $item->introtext; ?>
			<?php echo LayoutHelper::render('joomla.content.readmore', ['item' => $item, 'params' => $item->params, 'link' => $item->link]); ?>
		</p>
	</section>
</div>

```

[templates/facile/ html/mod_articles_news/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_articles_news/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_articles_news/default.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;

if (empty($list)) {
	return;
}

?>
<div>
	<div class="row">
			<!-- Feature -->
			<?php foreach ($list as $item) : ?>
				<?php require ModuleHelper::getLayoutPath('mod_articles_news', '_item'); ?>
			<?php endforeach; ?>
	</div>
</div>

```

The override to the module 'mod_articles_news' should be displayed in the upper area with a large headline. On a subpage, it should appear with small headline in the sidebar. We could create a solution with an alternative override. This variant is the subject of the next section. However, a lot of program code would be written via alternativen Override redundantly. Actually, only the first line with the heading is different. And here Joomlas module Chromes comes into play. We create a file in the directory `templates/facile/html/layouts/chromes/` which only contains the different code and otherwise embeds the module exactly as it is. The latter is taken care of by `echo $module->content;`. We can name the modules chrome file anything we want. I have chosen `hr.php` as name. In the `index.php` at the end of this section you can see how to make sure that the `hr.php` file is integrated in the header of the page but not in the sidebar.

[templates/facile/ html/layouts/chromes/hr.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/layouts/chromes/hr.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/layouts/chromes/hr.php

<?php
defined('_JEXEC') or die;
$module  = $displayData['module'];
?>

<section class="box features">
	<h2 class="major"><span>News</span></h2>
	<?php echo $module->content; ?>
</section>

```

#### The alternative override `mod_menu`.

There are requirements where the design of a module varies greatly in different places. In this case it is necessary to create two different files. The file `default.php` is actually the override. If we create another file in the directory next to `default.php`, this is an alternative override. A use case is a menu. In the header, the main menu often looks quite different from the one in the footer. In our template the main menu is implemented in the file `default.php` and the footer menu in the file `bottom.php`.

> Note: The two files differ slightly. In the `bottom.php` file, the `<ul>` element must be given the class `menu` so that no list item symbols are displayed in the frontend view. This could also be handled via a Chrome module.

[templates/facile/ html/mod_menu/default.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_menu/default.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_menu/default.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
?>

<ul>
<?php foreach ($list as $i => &$item) {
	$itemParams = $item->getParams();
	$class      = '';

	if ($item->id == $active_id) {
		$class .= ' current';
	}

	echo '<li class="' . $class . '">';

	require ModuleHelper::getLayoutPath('mod_menu', 'default_url');

	// The next item is deeper.
	if ($item->deeper) {
		echo '<ul>';
	}
	// The next item is shallower.
	else if ($item->shallower) {
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else {
		echo '</li>';
	}
}
?></ul>

```

[templates/facile/ html/mod_menu/bottom.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/html/mod_menu/bottom.php)

```php
// https://github.com/astridx/boilerplate/raw/t37/src/templates/facile/html/mod_menu/bottom.php

<?php
defined('_JEXEC') or die;

use Joomla\CMS\Helper\ModuleHelper;
?>

<ul class="menu">
<?php foreach ($list as $i => &$item) {
	$itemParams = $item->getParams();
	$class      = '';

	if ($item->id == $active_id) {
		$class .= ' current';
	}

	echo '<li class="' . $class . '">';

	require ModuleHelper::getLayoutPath('mod_menu', 'default_url');

	// The next item is deeper.
	if ($item->deeper) {
		echo '<ul>';
	}
	// The next item is shallower.
	else if ($item->shallower) {
		echo '</li>';
		echo str_repeat('</ul></li>', $item->level_diff);
	}
	// The next item is on the same level.
	else {
		echo '</li>';
	}
}
?></ul>

```

### Modified files

##### [templates/facile/index.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/index.php)

The following `index.php` is adapted to the newly added CSS styles and now outputs a more appealing design in the frontend.

The line `<jdoc:include type="modules" name="top-a" style="hr" />` ensures that the Chrome `hr` module is added at this point to display the module.

[templates/facile/index.php](https://github.com/astridx/boilerplate/blob/t37/src/templates/facile/index.php)

```php {diff}
 <!DOCTYPE html>
 <html lang="de">

 <head>
-    <meta charset="utf-8">
-    <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <title>Titel</title>
+	<meta charset="utf-8">
+	<meta name="viewport" content="width=device-width, initial-scale=1.0">
+	<link rel="stylesheet" href="<?php echo $templatePath; ?>/assets/css/main.css" />
+	<title>Titel</title>
 </head>

-<body>
-    <header>
-        <div>
-            <nav>
-                <div>
-                    <jdoc:include type="modules" name="menu" />
-                </div>
-            </nav>
-            <div>
-                <jdoc:include type="modules" name="search" />
-            </div>
-        </div>
-    </header>
-
-    <div>
-        <jdoc:include type="modules" name="banner" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="top-a" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="top-b" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="sidebar-left" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="breadcrumbs" />
-        <jdoc:include type="modules" name="main-top" />
-        <jdoc:include type="message" />
-        <main>
-            <jdoc:include type="component" />
-        </main>
-        <jdoc:include type="modules" name="main-bottom" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="sidebar-right" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="bottom-a" />
-    </div>
-
-    <div>
-        <jdoc:include type="modules" name="bottom-b" />
-    </div>
-
-    <footer>
-        <jdoc:include type="modules" name="footer" />
-    </footer>
-
-    <jdoc:include type="modules" name="debug" />
-
+<body class="homepage is-preload">
+	<div id="page-wrapper">
+
+		<?php if ($this->countModules('menu', true)) : ?>
+		<nav id="nav">
+			<jdoc:include type="modules" name="menu" />
+		</nav>
+		<?php endif; ?>
+
+		<section id="main">
+			<div class="container">
+				<div class="row gtr-200">
+					<div class="row">
+
+						<?php if ($this->countModules('top-a', true)) : ?>
+						<jdoc:include type="modules" name="top-a" style="hr" />
+						<?php endif; ?>
+
+						<?php if ($this->countModules('sidebar-left', true)) : ?>
+						<div class="col-3 col-12-medium">
+							<div class="sidebar">
+								<jdoc:include type="modules" name="sidebar-left" style="none" />
+							</div>
+						</div>
+						<?php endif; ?>
+
+						<div class="col-6 col-12-medium imp-medium">
+							<div class="content">
+
+								<?php if ($this->countModules('search', true)) : ?>
+								<section id="search">
+									<jdoc:include type="modules" name="breadcrumbs" style="none" />
+								</section>
+								<?php endif; ?>
+
+								<?php if ($this->countModules('search', true)) : ?>
+								<section id="search">
+									<jdoc:include type="modules" name="search" style="none" />
+								</section>
+								<?php endif; ?>
+
+								<jdoc:include type="modules" name="main-top" style="none" />
+								<jdoc:include type="message" />
+								<main>
+									<jdoc:include type="component" />
+								</main>
+
+								<jdoc:include type="modules" name="main-bottom" style="none" />
+
+							</div>
+						</div>
+
+						<?php if ($this->countModules('sidebar-right', true)) : ?>
+						<div class="col-3 col-12-medium">
+							<div class="sidebar">
+								<jdoc:include type="modules" name="sidebar-right" style="none" />
+							</div>
+						</div>
+						<?php endif; ?>
+
+						<?php if ($this->countModules('bottom-a', true)) : ?>
+						<jdoc:include type="modules" name="bottom-a" style="none" />
+						<?php endif; ?>
+					</div>
+				</div>
+			</div>
+		</section>
+
+		<footer id="footer">
+			<?php if ($this->countModules('footer', true)) : ?>
+			<div id="copyright">
+				<jdoc:include type="modules" name="footer" />
+			</div>
+			<?php endif; ?>
+		</footer>
+
+		<jdoc:include type="modules" name="debug" />
+
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.dropotron.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/jquery.scrolly.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/browser.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/breakpoints.min.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/util.js"></script>
+		<script src="<?php echo $templatePath; ?>/assets/js/main.js"></script>
+
+	</div>
 </body>

 </html>

```

> Tip: To avoid adding elements unnecessarily it is good practice to check if a module position is used in the Joomla installation. This is done with `$this->countModules('NAME_DER_POSITIONS', true)`.

> I deleted the banner module, because I want to add a banner later using parameters.

## Test your Joomla template

1. install your template in Joomla version 4 to test it:

Copy the files in the `templates` folder to the `templates` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

We have installed the sample data in the previous chapter. If you have not done so, please do it now so that the modules shown in the next image are available on the homepage of the Joomla installation.

![Create Joomla Template - Filter Module Positions](/images/j4x42x1.png)

2. open the module `Bottom Menu` and choose as layout `bottom`. For the module `Main Menu Blog` replace the layout `Dropdown` with the default layout `Default` from Module.

![Create Joomla Template - Alternate Override - Bottom](/images/j4x42x5.png)

3. open the module `mod_articles_news` (`Articles - Newsflash`) with the name `Latest Posts`, which is shown in the header of the frontend. In the explanations of `index.php` you have learned that a module Chrome is activated via the parameter `style="hr"` in `<jdoc:include type="modules" name="top-a" style="hr" />`. But you can also set this in the backend. The next picture shows you how to do this in the `Advanced` tab via the `Module Style` parameter.

![Create Joomla Template - Module Chrome](/images/j4x42x3.png)

4. Play with the different possibilities. Create different types of overrides and test the output in the frontend.

All override files in the directory `templates/facile/html/com_content/article` are available for selection in the tab `Options` in the selection field `Layout` when creating an article.

![Different options in Joomla Template Overrides creation | When creating an article](/images/j4x43x6.png)

When creating a menu item, you only have the overrides to choose from, for which you have created an XML file.

![Different possibilities with the Joomla Template Overrides creation | When creating a menu item](/images/j4x43x7.png)

Attention: You will not get an error message if you create an XML file but the related PHP file is missing due to a typo. There is also no hint if you create two XML files with the same title. Joomla pretends in this case that there is only one of them. In the next screen, the file names are all correct. However, the title 'COM_CONTENT_ARTICLE_VIEW_DEFAULT_TITLE' already exists. When I created an article, the override was only offered for selection after I changed the language string to `COM_CONTENT_ARTICLE_VIEW_DEFAULT_MEINSPRECHENDERNAME_TITLE`.

![Pitfalls in Joomla Template Overrides Creation](/images/j4x43x5.png)
<img src="https://vg08.met.vgwort.de/na/05bb9638c92646eea2764f7f302d84b9" width="1" height="1" alt="">
