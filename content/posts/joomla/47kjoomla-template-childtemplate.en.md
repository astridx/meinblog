---
description: 'desc'
shortTitle: 'short'
date: 2022-03-26
title: 'Template - Child Template'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-childtemplate
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

You use the template as a basis for different projects and would like to design certain parts differently only in one project? Maybe you are wondering how to create a Joomla template that can be used as a parent template for a child template. This is known to many from the CMS Wordpress. In Joomla, this worked differently until version 4.1. To protect yourself from overwriting your own new code in a template during a template update, you had to copy the template and make the changes in the copy. The advantage of working on a copy was that you didn't lose the changes you made when updating. The disadvantage was that you had to integrate updates to the original template into your copy yourself if you wanted to use those new features. Since Joomla 4.1, this problem has been [fixed](https://github.com/joomla/joomla-cms/pull/35874)[^github.com/joomla/joomla-cms/pull/35874]. With the introduction of child templates, it is possible to create a template underneath another template where you only change the things you want to customize. Everything else is used by the parent template. To be able to offer this feature it is necessary to place the locations of the media files in the parent template in the Joomla media folder and to integrate the `inheritable` parameter in the XML file with the value `1`. We will do this in this chapter.<!-- \index{Child Template} --><!-- \index{Template!Child Template} -->

> For impatient people: Look at the changed programme code in the [diff view](https://github.com/astridx/boilerplate/compare/t41...t41a)[^github.com/astridx/boilerplate/compare/t41...t41a] and transfer these changes into your development version.

## Step by step

In this section we will modify the template so that it can be used as a parent template. At the end it is possible to create another template based on Facile. This other template is a so-called child template. All updates of Facile will be applied to it. It is only necessary to maintain the code generated in the child template.

> Tip: The default template called Cassiopeia is certainly maintained the lifetime of Joomla 4. For this reason, it provides a good base on which to build if you do not want to create your own template from scratch.

### New files

There are no new files in this chapter. We have only moved or changed files.

### Modified files

The path to the _template media folders_ was `templates/TEMPLATENAME/` before Joomla 4.1. Template media folders are for example the folders `css`, `images`, `fonts`, `webfonts`, `js`, `sass`, `less` or `scss`. Starting with Joomla 4.1, these media are ideally located in the `media/templates/site/TEMPLATENAME/` directory. This is a prerequisite to use a child template in a useful way.

##### [templates/facile/ assets](https://github.com/astridx/boilerplate/tree/t41a/src/media/templates/site/facile)

In order to overwrite the media files, it is necessary to move them to the `media` directory in the Joomla root directory. Therefore we move

- all folders of the directory `templates/facile/assets`,
- the images `template_preview.png` and `template_thumbnail.png`
- and the directories `templates/facile/images` 
- and `templates/facile/favicon_package`.

to `media\templates\site\facile\`.

So that the images `template_preview.png` and `template_thumbnail.png` and those in the directory `favicon_package` can be easily overwritten by the child template later, I put them in the subdirectory `images`, i.e. under `medien\templates/site/facile/images/` and under `medien\templates/site/facile/images/favicon_package/` respectively.

##### [media/templates/site/facile/ css/main.css](https://github.com/astridx/boilerplate/blob/t41a/src/media/templates/site/facile/css/main.css)

Our CSS files are now no longer located in the `assets` subdirectory. Therefore, we adjust the relative path in the `main.css` file.

[media/templates/site/facile/ css/main.css](https://github.com/astridx/boilerplate/blob/t41a/src/media/templates/site/facile/css/main.css)

```php {diff}
 /* Banner */
 #banner {
   position: relative;
-  background-image: url('images/overlay.png'), url('images/overlay.png'), url('../../images/banner.jpg');
+  background-image: url('images/overlay.png'), url('images/overlay.png'), url('../images/banner.jpg');
   background-position: top left, top left, center center;
   background-repeat: repeat, repeat, no-repeat;
   background-size: auto, auto, cover;
```

> The same applies to the file `media/templates/site/facile/ css/main.dark.css` and who uses SASS also for the file `media/templates/site/facile/ sass/main.scss`.

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/index.php)

In the file `templates/facile/ index.php` we correct all places where the media files are loaded. There is no further need to specify an exact path, because we use the default directories in Joomla. We put the files where Joomla looks for them. Because Joomla keeps a certain order, overwriting is possible using child template. In this way, everything that the child template does not implement itself is used from the parent template.

We also make it possible to use a `user.css` file via `$wa->registerAndUseStyle('user', 'user.css', [], []);`. This simplifies overwriting without having to make changes to the already existing files.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/index.php)

```php {diff}
 use Joomla\CMS\HTML\HTMLHelper;

-$templatePath = 'templates/' . $this->template;
 $wa  = $this->getWebAssetManager();
-$wa->registerAndUseStyle('main_dark', $templatePath . '/assets/css/main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
-$wa->registerAndUseStyle('main_light', $templatePath . '/assets/css/main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
+$wa->registerAndUseStyle('main_dark', 'main.dark.css', [], ['media' => '(prefers-color-scheme: dark)']);
+$wa->registerAndUseStyle('main_light', 'main.css', [], ['media' => '(prefers-color-scheme: no-preference), (prefers-color-scheme: light)']);
+$wa->registerAndUseStyle('user', 'user.css', [], []);
 HTMLHelper::_('jquery.framework');
-$wa->registerAndUseScript('dropotron', $templatePath . '/assets/js/jquery.dropotron.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('scrolly', $templatePath . '/assets/js/jquery.scrolly.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('browser', $templatePath . '/assets/js/browser.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('breakpoints', $templatePath . '/assets/js/breakpoints.min.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('util', $templatePath . '/assets/js/util.js', [], ['defer' => true], []);
-$wa->registerAndUseScript('main', $templatePath . '/assets/js/main.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('dropotron', '/js/jquery.dropotron.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('scrolly', '/js/jquery.scrolly.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('browser', '/js/browser.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('breakpoints', '/js/breakpoints.min.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('util', '/js/util.js', [], ['defer' => true], []);
+$wa->registerAndUseScript('main', '/js/main.js', [], ['defer' => true], []);
 ?>

 <!DOCTYPE html>

     <jdoc:include type="scripts" />

     <link rel="apple-touch-icon" sizes="180x180"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/apple-touch-icon.png">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/apple-touch-icon.png', '', [], true, 1); ?>">
     <link rel="icon" type="image/png" sizes="32x32"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-32x32.png">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/favicon-32x32.png', '', [], true, 1); ?>">
     <link rel="icon" type="image/png" sizes="16x16"
-        href="<?php echo $templatePath . '/favicon_package'; ?>/favicon-16x16.png">
-    <link rel="manifest" href="<?php echo $templatePath . '/favicon_package'; ?>/site.webmanifest">
+        href="<?php echo HTMLHelper::_('image', '/favicon_package/favicon-16x16.png', '', [], true, 1); ?>">
+    <link rel="manifest" href="<?php echo '/favicon_package'; ?>/site.webmanifest">
     <meta name="msapplication-TileColor" content="#da532c">
     <meta name="theme-color" content="#ffffff">
```

> If you are more interested in the features used here, besides the Joomla Web Asset Manager, the file `libraries/src/HTML/HTMLHelper.php` is a good starting point for further code research.

##### [templates/facile/ language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/language/en-GB/tpl_facile.ini)

[templates/facile/ language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/language/en-GB/tpl_facile.ini)

We have moved the banner image to the media directory so that it is also used in the child template if the child does not provide a more specific image. This change results in a change in the language files.

```php {diff}
 TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
 ;params
 TPL_FACILE_BANNER_FIELDSET_LABEL="Banner"
-TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /templates/facile/images/banner.jpg"
+TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /media/templates/site/facile/images/banner.jpg"
 TPL_FACILE_BANNER_LABEL="Show Banner"
 TPL_FACILE_BANNER_TITLE="Title text"
 TPL_FACILE_BANNER_TAGLINE="Tagline text"
```

##### [templates/facile/ templateDetails.xml](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/templateDetails.xml)

The locations of the media files have been changed. To ensure that this is recognized correctly when the template is installed, we correct the corresponding entries in the `templates/facile/ templateDetails.xml` file.

> Changing the locations in the `src` directory of the development environment is not mandatory. Because it is important to me that my files simulate the locations in a Joomla installation, I have also recopied the files in the `src` directory.

[templates/facile/ templateDetails.xml](https://github.com/astridx/boilerplate/blob/t41a/src/templates/facile/templateDetails.xml)

```php {diff}
 	<license>GNU General Public License version 2 or later;</license>
 	<version>__BUMP_VERSION__</version>
 	<description>TPL_FACILE_XML_DESCRIPTION</description>
+	<inheritable>1</inheritable>

 	<files>
 		<filename>component.php</filename>

 		<filename>templateDetails.xml</filename>
 		<filename>template_preview.png</filename>
 		<filename>template_thumbnail.png</filename>
-		<folder>assets</folder>
 		<folder>html</folder>
-		<folder>images</folder>
 		<folder>language</folder>
 	</files>
-
+	<media destination="templates/site/facile" folder="media/templates/site/facile">
+		<folder>js</folder>
+		<folder>css</folder>
+		<folder>sass</folder>
+		<folder>webfonts</folder>
+		<folder>images</folder>
+	</media>
 	<positions>
 		<position>topbar</position>
 		<position>below-top</position>
```

## Test your Joomla template

1. Install your template in Joomla version 4 to test it: Copy the files in the `templates` folder into the `templates` folder of your Joomla 4 installation. Install your template as described in part one after copying all files. Joomla will adjust the database for you during the installation.

Make sure that all functions you have included so far are working.

2. Check the changes in the Template Manager

Switch to the Template Manager and make sure that the button for creating a child template is present. The button to copy the template has disappeared.

![Create Joomla Template - Create Child Template - Template Manager](/images/j4x47kx0.png)

![Create Joomla Template - Create Child Template - Copy button has disappeared](/images/j4x47kx1.png)

![Create Joomla Template - Create child template - button to create a child template](/images/j4x47kx2.png)

3. Create a child template

Click on the button to create a child template. Name the template 'facile_child' if you like to follow my example.

![Create Joomla Template - Create Child Template - View in Template Manager after creating the child template](/images/j4x47kx3.png)

Make sure that the images that preview the template are now loaded from the media directory.

Additional task: save special preview images for your child template and place them in `medien\templates/site/facile_facile_child/images/template_preview.png` and `medien\templates/site/facile_facile_child/images/template_thumbnail.png`. Make sure that they are displayed correctly in the template manager.

4. Make the child template the default and check the changes in the frontend.

Open the template styles view.

![Create Joomla Template - Create Child Template - Template Styles](/images/j4x47kx4.png)

Click the star next to the style that names the child template, so that it is displayed in yellow color at the end.

![Create Joomla Template - Create Child Template - Child Template as default style](/images/j4x47kx5.png)

Switch to the frontend view and make sure that the parameters are not taken from the parent template. In contrast, all the contents of the media directory such as CSS style, JavaScript and images are present. You will see a view similar to the following image if you followed my example also during the last chapters.

![Create Joomla Template - Create Child Template - Frontend View without setting parameters](/images/j4x47kx6.png)

5. Parameters

Set the parameters for the banner and the links to the social networks in the child template. Test the frontend view. All parameters work the same in the child template as in the parent template.

Additional task: save special favicons for the child template and place it in `medien\templates/site/facile_facile_child/images/favicon_package`. Make sure that it is displayed correctly in the frontend.

> Surely you expect that the banner for the child template is located in the directory `media/templates/site/facile_facile_child/images/banner.jpg`, if the banner for the parent template is located in `media/templates/site/facile/images/banner.jpg`. Unfortunately, in this case it does not work so easily. The reason is that the banner image is selected by CSS. It is necessary to override the style for the ID `#banner` in the file `main.css`.

6. Overwrite CSS content

Create the file `media/templates/site/facile_facile_child/css/user.css` and implement styles. For example, this way it is possible to fix the shortcoming we found in the previous exercise part about parameters. Customize the banner image using the following CSS style for the child template.

```css
#banner {
  background-image: url('../images/banner.jpg');
}
```

## Links

[YouTube Video; Sprecher Dimitris Grammatiko](https://www.youtube.com/embed/LxOQnX-JJyk)[^youtube.com/embed/LxOQnX-JJyk]
