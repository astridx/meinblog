---
description: 'desc'
shortTitle: 'short'
date: 2021-01-07
title: 'Template - Parameters and Variables'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-template-variablen
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Parameters make the template flexibly configurable in the backend. Perhaps a colour selection should be possible? The standard template Cassiopeia offers, among others, `logoFile`, `siteTitle` and `siteDescription` as parameters. We add a banner and social media icons.<!-- \index{template!parameters} -->

> For impatient people: Take a look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t37...t38)[^github.com/astridx/boilerplate/compare/t37...t38] and copy these changes into your development version.

## Step by step

In this section we will look at parameters and see that they add content relatively statically. This is a drawback. The benefit is that it is not complicated to use.

### New files

In this chapter only the image `templates/facile/images/banner.jpg` is added, which is displayed in the banner via CSS. I took this from the demo images of [html5up.net](https://html5up.net/txt) and it is from [unsplash.com](https://unsplash.com/).

### Modified files

##### [templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

We add code to the file `templates/facile/ index.php` so that a banner and social media icons can be inserted via parameters.

> In HTML some characters, for example the _less than sign_ `<` or the _greater-than-sign_ `>`, have a special meaning. They are therefore written as [HTML entities](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)[^en.wikipedia.org/wiki/list_of_xml_and_html_character_entity_references] if they are to be displayed as text. For example, `&lt;` is written instead of `<` and `&gt;` is written instead of `>`. When processing strings, it may happen that they contain such specific characters. These must then be converted so that they can be further processed as plain text. We offer in the template a text input option via a form in the backend. However, we do not want HTML code to be injected via this. This is a security risk. To prevent this, we use the function [htmlspecialchars()](https://www.php.net/manual/en/function.htmlspecialchars.php)[^www.php.net/manual/en/function.htmlspecialchars.php]. This ensures that the characters that have a special meaning in HTML are converted to plain text.<!-- \index{htmlspecialchars} -->

Take a look at the code snippet below. I think the HTML code is self-explanatory. We add HTML markup, which is only displayed if a certain parameter is set. For example, for the footer via the query `$this->params->get('showFooter')`. What is displayed then also depends on the values for the parameters filled in by the user in the backend.

[templates/facile/ index.php](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```php {diff}
         </nav>
         <?php endif; ?>

+        <?php if ($this->params->get('showBanner')) : ?>
+        <section id="banner">
+            <div class="content">
+                <h2><?php echo htmlspecialchars($this->params->get('bannerTitle')); ?></h2>
+                <p><?php echo htmlspecialchars($this->params->get('bannerDescription')); ?></p>
+                <a href="#main"
+                    class="button scrolly"><?php echo htmlspecialchars($this->params->get('bannerButton')); ?></a>
+            </div>
+        </section>
+        <?php endif; ?>
+
         <section id="main">
             <div class="container">
                 <div class="row gtr-200">

         </section>

         <footer id="footer">
+            <?php if ($this->params->get('showFooter')) : ?>
+            <div class="col-12">
+                <section>
+                    <?php
+                        $fieldValues = $this->params->get('showFooterTouchFields');
+
+                        if (empty($fieldValues))
+                        {
+                            return;
+                        }
+
+                        $html = '<ul class="contact">';
+
+                        foreach ($fieldValues as $value)
+                        {
+                            $html .= '<li><a class="icon brands ' . $value->touchsubicon . '" href="' . $value->touchsuburl . '"><span class="label">' . $value->touchsubname . '</span></a></li>';
+
+                        }
+
+                        $html .= '</ul>';
+
+                        echo $html;
+
+                    ?>
+                </section>
+            </div>
+            <?php endif; ?>
+
+
             <?php if ($this->countModules('footer', true)) : ?>
             <div id="copyright">
                 <jdoc:include type="modules" name="footer" />
```

> Tip: You would like to optionally define in the template which module position is used. For example, is it important for you that a sidebar can be completely deactivated? Then create the parameter `showSidebarLeft` and extend the line `<?php if ($this->countModules('sidebar-left', true)) : ?>`. In the end, this should become `<?php if ($this->countModules('sidebar-left', true) && $this->params->get('showSidebarLeft')) : ?>`.

##### [templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

We use the language files for the labels of our backend form. This way the texts can be translated into different languages.

[templates/facile/language/en-GB/tpl_facile.ini](https://github.com/astridx/boilerplate/compare/t37...t38#diff-e46f43df955f9c24f237c461cd835bdfc8dde798943f6999e8675d4045334d6f)

```xml {diff}
 TPL_FACILE_XML_DESCRIPTION="Facile is a Joomla 4 template."
+;params
+TPL_FACILE_BANNER_FIELDSET_LABEL="Banner"
+TPL_FACILE_BANNER_FIELDSET_DESC="Please copy banner image file to /templates/facile/images/banner.jpg"
+TPL_FACILE_BANNER_LABEL="Show Banner"
+TPL_FACILE_BANNER_TITLE="Title text"
+TPL_FACILE_BANNER_TAGLINE="Tagline text"
+TPL_FACILE_BANNER_BUTTON="Button text"
+TPL_FACILE_FOOTER_FIELDSET_LABEL="Social Footer"
+TPL_FACILE_FOOTER_FIELDSET_DESC="For example: https://fontawesome.com/icons/facebook?style=brands"
+TPL_FACILE_FOOTER_LABEL="Show Social Footer"
+TPL_FACILE_GET_IN_TOUCH="Social Link"
+TPL_FACILE_GET_IN_TOUCH_SUBNAME="Name"
+TPL_FACILE_GET_IN_TOUCH_SUBICON="Icon"
+TPL_FACILE_GET_IN_TOUCH_SUBURL="URL"
```

##### [templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

Since Joomla supports us in creating the form fields, it is enough to define the fields via an XML file.

In order to display one form field in dependency to another, we use `showon`. `showon="showBanner:1"` ensures that the current field is only shown if the `showBanner` field has the value `1`.<!-- \index{Fields|showon} -->

The field of type `type="subform"` provides the possibility to flexibly define the number of values in the backend form. Thus, with one form field it is possible to insert either only one link to Facebook or to display many social media channels.<!-- \index{Fields|subform} -->

[templates/facile/templateDetails.xml](https://github.com/astridx/boilerplate/compare/t37...t38#diff-6155acc1859344bb0cdb1ef792d0107971f0d60c87f3fc3138e9672a2b924931)

```xml {diff}
 		<position>footer</position>
 		<position>debug</position>
 	</positions>
+	<config>
+		<fields name="params">
+			<fieldset name="banner" label="TPL_FACILE_BANNER_FIELDSET_LABEL" description="TPL_FACILE_BANNER_FIELDSET_DESC">
+				<field
+					name="showBanner"
+					type="radio"
+					label="TPL_FACILE_BANNER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="bannerTitle"
+					type="text"
+					default="Welcome to the Joomla version of TXT by HTML5 UP"
+					label="TPL_FACILE_BANNER_TITLE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerDescription"
+					type="text"
+					default="A free responsive site template built on HTML5, CSS3, and some other stuff"
+					label="TPL_FACILE_BANNER_TAGLINE"
+					filter="string"
+					showon="showBanner:1"
+				/>
+
+				<field
+					name="bannerButton"
+					type="text"
+					default="Alright let's go"
+					label="TPL_FACILE_BANNER_BUTTON"
+					filter="string"
+					showon="showBanner:1"
+				/>
+			</fieldset>
+			<fieldset name="footer" label="TPL_FACILE_FOOTER_FIELDSET_LABEL" description="TPL_FACILE_FOOTER_FIELDSET_DESC">
+				<field
+					name="showFooter"
+					type="radio"
+					label="TPL_FACILE_FOOTER_LABEL"
+					layout="joomla.form.field.radio.switcher"
+					default="0"
+					filter="integer"
+					>
+					<option value="0">JNO</option>
+					<option value="1">JYES</option>
+				</field>
+
+				<field
+					name="showFooterTouchFields"
+					type="subform"
+					label="TPL_FACILE_GET_IN_TOUCH"
+					multiple="true"
+					max="10"
+					showon="showFooter:1"
+					>
+					<form>
+						<field
+							name="touchsubname"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBNAME"
+							/>
+						<field
+							name="touchsubicon"
+							type="text"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBICON"
+							/>
+						<field
+							name="touchsuburl"
+							type="url"
+							label="TPL_FACILE_GET_IN_TOUCH_SUBURL"
+							size="30"
+							filter="url"
+							validate="url"
+							/>
+					</form>
+				</field>
+			</fieldset>
+		</fields>
+	</config>
 </extension>
```

> The Joomla documentation [docs.joomla.org/Form_field](https://docs.joomla.org/Form_field) provides an overview of all possible form fields.<!-- \index{Fields} -->

## Test your Joomla template

1. install your template in Joomla version 4 to test it:

Copy the files in the `templates` folder to the `templates` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part. In any case you should make sure that the template style Facile is active. In my examples the Blog sample files are installed.

2. activate the banner in the template style of Facile and see the result in the frontend.

![Create Joomla Template - Banner via parameters in the frontend](/images/j4x43x1.png)

![Create Joomla Template - Banner via parameters in the backend](/images/j4x43x2.png)

3. activate the social media display in the template style of Facile and see the result in the frontend.

![Create Joomla Template - Social Media Backend](/images/j4x43x3.png)

![Create Joomla Template - Social Media Frontend](/images/j4x43x4.png)

> I use the icons `fa-facebook-f` for _Facebook_ and `fa-twitter` for _Twitter_. I can do this because the template integrates Facile [Font Awesome](https://fontawesome.com/v5/search?m=free)[^fontawesome.com/v5/search?m=free]. See `/templates/facile/assets/webfonts`.
<img src="https://vg08.met.vgwort.de/na/05bb9638c92646eea2764f7f302d84b9" width="1" height="1" alt="">
