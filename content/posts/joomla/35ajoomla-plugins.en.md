---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-08-07
title: 'Plugins'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-plugins
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











You have created a plug-in in the previous section. You have probably already configured other plugins in the plugin manager and know the different types. Plugins cover many different areas in Joomla. This chapter provides an overview of what plugins are and how they work within Joomla.<!-- \index{plugins} -->

> In the [Joomla Documentation](https://docs.joomla.org/Plugin/Events)[^docs.joomla.org/Plugin/Events] you will find a list of all plugin groups with all associated events. Use this list as a quick reference.

## What is a Joomla plugin?

You already know that there are different types of extensions: Components, modules, templates, languages and plugins. While components, modules, templates and languages usually cause a direct output, a plugin typically works in the background. Plugins are versatile. Each plugin has its own purpose.
Let's organise plugins a little. Even within Joomla, they are divided into plugin groups. It's much easier to understand the purpose if you look at each type separately. In this chapter, we will get an overview of the different types and their special features.

## Plugin types in the Joomla 4 core

The Joomla core comes with a lot of plugins. These are divided into 22 plugin types in Joomla 4.2 and so is this part of the text. For example, there is a chapter about content plugins and another one about system plugins.

> For an overview of all plugins available in Joomla core and their associated events/events, see the [Joomla documentation](https://docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin)[^docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin]. Check out the code if you need some programming inspiration.

In my opinion, it helps to understand Joomla plugins if you study each type on its own. That is why we are doing this now. The types or groups are classified as follows:

### [Action Log](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Action_Log_Group/en)<!-- \index{plugins!Action Log} -->

Plugins of the Action Log type record user activities in the Joomla Core extensions of the page to review them later if needed. If you want to log activities in a third-party extension, create a plugin of this type for it.

### [API Authentication](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_API_Authentication_Group/en)<!-- \index{plugins!API Authentication} -->

API Authentication type plugins are used to provide authentication for web services in Joomla. Remember: You activated a Joomla core plugin of this type in the previous chapter on web services.

### [Authentication](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Authentication_Group/en)<!-- \index{plugins!Authentication} -->

When someone logs into Joomla, the Joomla application authenticates that user. On most websites, authentication is performed against the Joomla database. This type of authentication is performed by the authentication plugin. With an authentication plugin, it is possible to use external services to authenticate users: Joomla provides an authentication plugin for LDAP, which is used in Windows domains.

> Joomla 3 had plugins for authentication via Gmail on board. [Joomla 4 no longer offers this](https://developer.joomla.org/news/724-removal-of-the-gmail-authentication-plugin-as-of-joomla-4-0.html)[^developer.joomla.org/news/724-removal-of-the-gmail-authentication-plugin-as-of-joomla-4-0.html]. The technology used by the plugin is no longer state of the art and less secure. Nowadays, applications should authorize themselves via the [OAuth 2.0](https://en.wikipedia.org/wiki/OAuth)[^en.wikipedia.org/wiki/oauth] protocol with Google.

### [Behaviour](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Behaviour_Group/en)<!-- \index{plugins!Behaviour} -->

Behavior type plugins are used to enable a specific behavior in the website. Examples in Joomla core are tagging or versioning of elements.

### [CAPTCHA](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_CAPTCHA_Group/en)<!-- \index{plugins!CAPTCHA} -->

Plugins of this group allow to check forms with a [Captcha Check](https://en.wikipedia.org/wiki/Captcha)[^en.wikipedia.org/wiki/captcha] (engl. completely automated public Turing test to tell computers and humans apart), a fully automated public Turing test that detects whether a human or a machine submits the form. The Joomla core comes with a plugin for [Google reCaptcha](https://www.google.com/recaptcha/about/)[^google.com/recaptcha/about/]. Custom captcha methods are easily added.

> Captchas are a nice way to add an individual touch to the website. If it is too much work to create images that match the topic, you can work with questions. On the website of a fire department association a possible question would be, about the color of the fire truck.

### [Content](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Content_Group/en)<!-- \index{plugins!Content} -->

A content plugin is mostly used to change the content of the article before it is displayed or before it is saved in the database. Those who have special requirements can use a plugin of this type for custom functions after the article is saved in the database. Whenever you want to customize the processing of the content, choosing this type of plugin is perfect.

### [Editors](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Editor_Group/en)<!-- \index{plugins!Editors} -->

Editor plugins convert an HTML textarea element into a JavaScript-based editor. Well known plugins of this group are TinyMCE and CodeMirror. If no [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG)[^en.wikipedia.org/wiki/wysiwyg] editor plugin is enabled, Joomla displays a normal HTML textarea. Technically, this is also done via a plugin, namely via `Editor | None`.

> A third party plugin from the Editor group, which is very popular in the Joomla community, is the [JCE-Editor](https://www.joomlacontenteditor.net/)[^www.joomlacontenteditor.net/].

### [Editor Button](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Button_Group/en)<!-- \index{plugins!Editor Button} -->

At the bottom of a Joomla editor, buttons appear in addition to the toolbar - for example, a button to add a `read more` link or a button to add a page break. These buttons are generated by plugins of the editors-xtd type.

### [Extensions](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Extension_Group/en)<!-- \index{plugins!Extensions} -->

There are not many plugins in this group, nevertheless it is an interesting group. Whenever a Joomla extension is installed or removed, it is possible to hook into the installation via a plugin of this group.An extension plugin does a task during an installation! The Joomla plugin of extension type is used to clean up update pages. Update pages are URLs that are stored in the extension manager for updating extensions. Since Joomla 3.2 it is possible for commercial extensions to use this plugin to allow private downloads with a security key. And last but not least: `Extensions - Namespace Updater` automatically creates and updates the file `administrator/cache/autoload_psr4.php`.

### [Fields](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Fields_Group/en)<!-- \index{plugins!Fields} -->

The Fields plugin type allows you to create fields in extensions that support custom fields. For example, a calendar can be added when creating an item, through which a date is stored with the item, which is output at a specific location in the content. This makes it easier to output content in the same layout or to query content in other extensions. For example, a field that stores a geographic coordinate will display a marker at that position on a digital map in a module.

### [FileSystem](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_FileSystem_Group/en)<!-- \index{plugins!FileSystem} -->

Plugins of the Filesystem type are used to define one or more local directories for storing files. Do you want to offer the flexible changing of a directory for your extension. Then check out the Joomla core plugin `Filesystem - Local` with which you can set the directory where image files are stored.

### [Finder](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Smart_Search_Group/en)<!-- \index{plugins!Finder} -->

The default search in Joomla 4 is the Search Index or Smart Search component: com_finder. In Joomla 3 this was com_search. The main difference between the two is that com_search searches the content in real time and may open many different database tables to do so, while com_finder creates index tables first and then searches only that index. The latter allows for a more efficient and therefore faster full-text search. The new search index is more complex than the old classic search, which required no configuration but offered few options. com_finder uses an active index based on [stem reduction](https://en.wikipedia.org/wiki/Stemming)[^en.wikipedia.org/wiki/stemming]. Specifically, the [PHP library php-stemmer](https://github.com/wamania/php-stemmer)[github.com/wamania/php-stemmer] is applied. The idea is to increase the performance and quality of the search result by covering multiple syntactic words with a base form. For example, `gardening` and `garden` have related meanings. Each type of content requires its own Finder plugin. Create a Finder plugin if you want content in your component to be found,

> com_search is [still available](https://github.com/joomla-extensions/search)[^github.com/joomla-extensions/search] as a decoupled component, and it also requires a separate plugin for third-party extension content to be found.

### [Installer](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Installer_Group/en)<!-- \index{plugins!Installer} -->

Do you want to change the installation process of your extension? Then take a look at the installer type plugins.

### [Media Action](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Media_Action_Group/en)<!-- \index{plugins!Media Action} -->

Cropping images, changing the size or rotating them is each possible with a core Joomla plugin from the Media Action. Expand this plugin group if the media or image editing functions are not enough for you.

### [Privacy](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Privacy_Group/en)<!-- \index{plugins!Privacy} -->

If your self-programmed extension processes personal data, then plugins of the type Privacy come into play. Create a plugin of this type and make sure in the code that this data is correctly processed by Joomla in the core privacy component. This is the only way Joomla can handle user requests for stored data or deletion requests. For Joomla core extensions the required plugins are available in Joomla 4.

### [Quick Icon](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Quick_Icon_Group/en)<!-- \index{plugins!Quick Icon} -->

Use a plugin of the type quickicon to place a quickicon on the dashboard of the Joomla backend.

### [Sample Data](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Sample_Data_Group/en)<!-- \index{plugins!Sample Data} -->

The _Joomla Core Sample Data module_ provides a unified workflow for adding sample files. Want to jump in here and make sample files installable for your extension with a click? Then, you probably guessed it already, a plugin of the type sample files is required.

### [System](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_System_Group/en)<!-- \index{plugins!System} -->

System Plugins performs a wide variety of tasks. This sounds vague, however. To make it a bit more concrete, examples follow. System plugins can add HTML code, CSS or JavaScript to the Joomla page after it is generated.Plugins of this type modify Joomla forms before they are generated. With the help of system plugins alternative error handling is possible. This was only a small part of the possible. You see, system plugins are very powerful. To be able to fulfill this powerful task, they are called frequently and therefore need resources. Use them carefully!

> Another current example is the keyboard shortcut plugin newly added in Joomla 4.2[^github.com/joomla/joomla-cms/pull/38092]

### [Task](https://docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin)<!-- \index{plugins!Task} -->

Do you have tasks that have to be done again and again? Or tasks for the future that you would like to plan and definitely must not forget? Since Joomla 4.1, you can automate these with the new task planner. And what is essential for developers: All Joomla extensions can take advantage of it and schedule tasks and execute them regularly. Especially if the website host does not allow cron jobs. It is possible to use the core scheduler to schedule tasks in your own extensions. Task Plugins are integrated into Joomla via [PR 35143](https://github.com/joomla/joomla-cms/pull/35143)[^github.com/joomla/joomla-cms/pull/35143].

### [Two Factor Authentication](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Two_Factor_Authentication_Group/en)<!-- \index{plugins!Two Factor Authentication} -->

In addition to standard authentication, there is the possibility to achieve additional security by adding a parallel second authentication.

### [User](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_User_Group/en)<!-- \index{plugins!User} -->

Is there a connection between the data in a component and the users in the Joomla user management? Technically, this is implemented with a plug-in of the user type. Are you wondering how this works? Then take a look at the plugin for the contact component, which links a contact to a user.

### [Web Services](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Web_Services_Group/en)<!-- \index{plugins!Web Services} -->

A Web Services plug-in adds the routes of an extension to the website's API. We practically used this plugin in the previous part.

### [Workflow](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Workflow_Group/en)<!-- \index{plugins!Workflow} -->

In workflow management, there are different transitions that can be manipulated using a plugin.

## Examples

### Indiewebify Joomla

I have created example plugins that together allow a simple realization of the IndieWeb. I have described the setup on a website at [blog.astrid-guenther.de/en/cassiopeia-joomla-indieweb](https://blog.astrid-guenther.de/en/cassiopeia-joomla-indieweb/). This is about the programming.

What does *Indiewebify* mean and what is the *IndieWeb*? 

The *IndieWeb* allows a person to publish their thoughts and ideas in one place and then share them on other social websites. It is important to always remain the owner of your own digital content. 

What if a social network develops in such a way that you no longer feel comfortable there and therefore no longer visit it? Or the owner of the website decides to shut it down? All your contributions are lost!

In my opinion, a digital profile and its content should not be an identity owned by an external company. A person should be the sole owner of the content they share online. And that's what *IndieWeb_ encourages people to do.

> The _IndieWeb_ is a people-centred alternative to the _Corporate Web_ is a quote I took from the website [IndieWeb.org](https://indieweb.org/)[^indieweb.org/]. The website [indiewebify.me/](https://indiewebify.me/) supported me in the implementation. I first read about this on the blog [chringel.dev](https://chringel.dev/2022/07/indiewebify-me-and-dont-forget-my-webmentions/).

1. set up web sign-in
To authenticate yourself as the owner of your website using your domain, you need to set up a way to sign in using IndieAuth. That is, you use your domain to verify yourself as the owner of your other social profiles. Simply add a `rel=me` microformat to all your links that lead to your profiles on other platforms. We do this within the content plugin.

2. add author markup
The next step is to provide some basic information about the author on the website. Often there is already an `about me` page, but it is not machine readable. The microformat `h-card` provides properties that can be parsed. I have added these invisibly to the markup of the website in combination with the following element. This way the design of the template is not affected.

3. add content tagging
If you want to publish content on the IndieWeb, it needs to be machine-readable. I added the `h-entry` microformat. The website IndieWebify.me was a great help in this step. In this plugin I add the following `h-entry` properties:
- `p-name` - the title of the post.
- `e-content` - the content of the post
- `p-author` - who wrote the post
- `dt-published` - when the post was published
- `p-summary` - the intro of an Joomla article

Now my content is correctly tagged and can be used by IndieWeb.

4. add webmentions
What are webmentions? Webmentions are a [W3C Recommendation](https://www.w3.org/TR/webmention/)[^w3.org/TR/webmention/] for conversations and interactions on web pages. It is a simple way to notify a URL when it is mentioned on a web page. Basically, it's a way to interact with other people's content from your own website.

Example: I read a post on another blog and want to respond to it. I can do that by writing a post on my website and linking to the other post. Then I can send a webmention to the other blog to let them know that I have reacted to the post from my website. That sounds complicated? Well, it's just like most social networks where you respond to a post by commenting or liking it.

There is a simple way to set up webmentions: Webmention.io. It's a service that handles webmentions by using web sign-in and adding some endpoints as links to your website. Here in the example we set the endpoints, which I add to the head of the website via a system plugin.

> An alternative to Webmention.io is Go-Jamming by Wouter Groeneveld.

What was missing was a way to display the webmentions. The procedure in the content plugin for parsing webmentions is currently dynamic. This is not performant. A better solution is to retrieve the webmentions from time to time and store them in the database.

5. syndication and backfeed
A final piece of the puzzle are: _POSSE_ and _Backfeed_. 

_POSSE_ means that you first publish your content on your own website and then post links on other platforms (Publish on Site, Syndicate Elsewhere). For example, by sharing about your post on Mastodon and then adding a link to your website.

_Backfeed_ describes the process of pulling the interactions of your POSSE copy to the original post. So when someone comments on a toot with the link to your post, it is actually redirected to your website as a webmention.

> Working through the 5 points makes a Joomla website a IndieWeb citizen. The plugins described below are a simple implementation. Web Sign-In can be used via the system plugin, there is content with microformats via the content plugin and webmentions are sent to and received from other IndieWeb sites. Syndication is a problematic issue. The process is a bit convoluted and I'm not sure I'm implementing it properly. You have to publish your own post first, then share the link, and lastly add that shared link to your own post. This is where the editors-xtd plugin helps.

### [Fields](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Fields_Group/en)<!-- \index{plugins!Fields} -->

> The Custom Field is intended to support inserting a [Reply-to](https://indieweb.org/in-reply-to)[^indieweb.org/in-reply-to] element.

A custom form field, written for a custom field itself, is searched for by default in the `/fields` subdirectory. You can find the code for this search in the `onCustomFieldsGetTypes()` function. This is implemented in the file `administrator/components/com_fields/src/Plugin/FieldsPlugin.php#L96`. I make it easy for myself and extend the `UrlField`. So I only need to add an empty class. In the custom field named `indieweb` a field of type `indieweb` is expected. If you don`t implement this, a simple text field is used as fallback position.

[plugins/fields/indieweb/fields/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/fields/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/fields/indieweb.php

<?php

\defined('JPATH_PLATFORM') or die;


class JFormFieldIndieweb extends Joomla\CMS\Form\Field\UrlField
{
	protected $type = 'indieweb';
}

```
The file `plugins/fields/indieweb/indieweb.php` is the actual plugin file. It extends `administrator/components/com_fields/src/Plugin/FieldsPlugin.php`. Since the parent class implements all the essential properties, it is sufficient to add or override only its own specifics. In my case this is a server-side validation.

> You would set a client-side validation using `$fieldNode->setAttribute('class', 'validate-indieweb');`. As explained in the client-side validation part, you would need to add the JavaScript.

[plugins/fields/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/indieweb.php

<?php

use Joomla\CMS\Form\Form;

\defined('_JEXEC') or die;

class PlgFieldsIndieweb extends \Joomla\Component\Fields\Administrator\Plugin\FieldsPlugin
{
	public function onCustomFieldsPrepareDom($field, DOMElement $parent, Form $form)
	{
		$fieldNode = parent::onCustomFieldsPrepareDom($field, $parent, $form);

		if (!$fieldNode) {
			return $fieldNode;
		}

		$fieldNode->setAttribute('validate', 'indieweb');

		return $fieldNode;
	}
}

```

Das XML-Manifest wird für die Installation verwendet. Die Parameter werden später noch einmal für ein einzelnes Feld implementiert. Hier im Installationsmanifest stehen sie, damit man sie global im Plugin-Manager setzen kann. 

[plugins/fields/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/indieweb.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/indieweb.xml -->

<?xml version="1.0" encoding="utf-8" ?>
<extension type="plugin" group="fields" method="upgrade">
	<name>plg_fields_indieweb</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_FIELDS_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<filename plugin="indieweb">indieweb.php</filename>
		<folder>params</folder>
		<folder>language</folder>
		<folder>fields</folder>
		<folder>tmpl</folder>
		<folder>fields</folder>
		<folder>rules</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
				<field
					name="schemes"
					type="list"
					label="PLG_FIELDS_INDIEWEB_PARAMS_SCHEMES_LABEL"
					multiple="true"
					layout="joomla.form.field.list-fancy-select"
					validate="options"
					>
					<option value="http">HTTP</option>
					<option value="https">HTTPS</option>
				</field>

				<field
					name="relative"
					type="radio"
					label="PLG_FIELDS_INDIEWEB_PARAMS_RELATIVE_LABEL"
					layout="joomla.form.field.radio.switcher"
					default="1"
					filter="integer"
					>
					<option value="0">JNO</option>
					<option value="1">JYES</option>
				</field>
			</fieldset>
		</fields>
	</config>
</extension>

```

Als nächste sind die Sprachdateien für die Übersetzung der Vollständigkeit halber abgedruckt.

[plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.ini

PLG_FIELDS_INDIEWB="Fields - INDIEWEB"
PLG_FIELDS_INDIEWEB_LABEL="INDIEWEB (%s)"
PLG_FIELDS_INDIEWEB_PARAMS_RELATIVE_LABEL="Relative URLs"
PLG_FIELDS_INDIEWEB_PARAMS_SCHEMES_LABEL="Schemes"
PLG_FIELDS_INDIEWEB_PARAMS_SHOW_URL="Show URL"
PLG_FIELDS_INDIEWEB_XML_DESCRIPTION="This plugin lets you create new fields of type 'URL' in any extensions where custom fields are supported."
JVISIT_REPLY_TO_WEBSITE="In reply to website: "
JVISIT_REPLY_TO_LINK="In reply to internal link: "
```

[plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/language/en-GB/plg_fields_indieweb.sys.ini

PLG_FIELDS_INDIEWEB="Fields - INDIEWEB"
PLG_FIELDS_INDIEWEB_XML_DESCRIPTION="This plugin lets you create new fields of type 'URL' in any extensions where custom fields are supported."

```

The file `plugins/fields/indieweb/params/indieweb.xml` contains the parameters that are set in the field itself when it is created and apply only to this field.

[plugins/fields/indieweb/params/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/params/indieweb.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/params/indieweb.xml -->

<?xml version="1.0" encoding="utf-8"?>
<form>
	<fields name="fieldparams">
		<fieldset name="fieldparams">
			<field
				name="schemes"
				type="list"
				label="PLG_FIELDS_INDIEWEB_PARAMS_SCHEMES_LABEL"
				multiple="true"
				layout="joomla.form.field.list-fancy-select"
				validate="options"
				>
				<option value="http">HTTP</option>
				<option value="https">HTTPS</option>
			</field>

			<field
				name="relative"
				type="list"
				label="PLG_FIELDS_INDIEWEB_PARAMS_RELATIVE_LABEL"
				filter="integer"
				validate="options"
				>
				<option value="">COM_FIELDS_FIELD_USE_GLOBAL</option>
				<option value="1">JYES</option>
				<option value="0">JNO</option>
			</field>

			<field
				name="show_url"
				type="radio"
				label="PLG_FIELDS_INDIEWEB_PARAMS_SHOW_URL"
				layout="joomla.form.field.radio.switcher"
				default="1"
				filter="integer"
				>
				<option value="0">JNO</option>
				<option value="1">JYES</option>
			</field>
		</fieldset>
	</fields>
</form>

```

The rules for validation belong in the `rules` directory. This is implemented in the file `administrator/components/com_fields/src/Plugin/FieldsPlugin.php#L96`. Again, I made it simple and copied from the validation of the url field. Primarily, I want to show where the files are inserted so that they are found correctly by Joomla. 

[plugins/fields/indieweb/rules/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/rules/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/rules/indieweb.php

<?php

use Joomla\CMS\Form\Form;
use Joomla\CMS\Form\FormRule;
use Joomla\CMS\Language\Text;
use Joomla\Registry\Registry;
use Joomla\String\StringHelper;
use Joomla\Uri\UriHelper;

\defined('JPATH_PLATFORM') or die;

class JFormRuleIndieweb extends FormRule
{
	public function test(\SimpleXMLElement $element, $value, $group = null, Registry $input = null, Form $form = null)
	{
		// If the field is empty and not required, the field is valid.
		$required = ((string) $element['required'] === 'true' || (string) $element['required'] === 'required');

		if (!$required && empty($value)) {
			return true;
		}

		$urlParts = UriHelper::parse_url($value);

		// See https://www.w3.org/Addressing/URL/url-spec.txt
		// Use the full list or optionally specify a list of permitted schemes.
		if ($element['schemes'] == '') {
			$scheme = ['http', 'https'];
		} else {
			$scheme = explode(',', $element['schemes']);
		}

		/*
		 * Note that parse_url() does not always parse accurately without a scheme,
		 * but at least the path should be set always. Note also that parse_url()
		 * returns False for seriously malformed URLs instead of an associative array.
		 * @link https://www.php.net/manual/en/function.parse-url.php
		 */
		if ($urlParts === false || !\array_key_exists('scheme', $urlParts)) {
			/*
			 * The function parse_url() returned false (seriously malformed URL) or no scheme
			 * was found and the relative option is not set: in both cases the field is not valid.
			 */
			if ($urlParts === false || !$element['relative']) {
				$element->addAttribute('message', Text::sprintf('JLIB_FORM_VALIDATE_FIELD_URL_SCHEMA_MISSING', $value, implode(', ', $scheme)));

				return false;
			}

			// The best we can do for the rest is make sure that the path exists and is valid UTF-8.
			if (!\array_key_exists('path', $urlParts) || !StringHelper::valid((string) $urlParts['path'])) {
				return false;
			}

			// The internal URL seems to be good.
			return true;
		}

		// Scheme found, check all parts found.
		$urlScheme = (string) $urlParts['scheme'];
		$urlScheme = strtolower($urlScheme);

		if (\in_array($urlScheme, $scheme) == false) {
			return false;
		}

		// For some schemes here must be two slashes.
		$scheme = ['http', 'https'];

		if (\in_array($urlScheme, $scheme) && substr($value, \strlen($urlScheme), 3) !== '://') {
			return false;
		}

		// The best we can do for the rest is make sure that the strings are valid UTF-8
		// and the port is an integer.
		if (\array_key_exists('host', $urlParts) && !StringHelper::valid((string) $urlParts['host'])) {
			return false;
		}

		if (\array_key_exists('port', $urlParts) && !\is_int((int) $urlParts['port'])) {
			return false;
		}

		if (\array_key_exists('path', $urlParts) && !StringHelper::valid((string) $urlParts['path'])) {
			return false;
		}

		return true;
	}
}

```

The file `plugins/fields/indieweb/tmpl/indieweb.php` is the template for the output in the frontend.

[plugins/fields/indieweb/tmpl/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/fields/indieweb/tmpl/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/fields/indieweb/tmpl/indieweb.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

$value = $field->value;

if ($value == '') {
	return;
}

$attributes = '';

$attributes = ' target="_self"';

if (!Uri::isInternal($value)) {
	$text = Text::_('JVISIT_REPLY_TO_WEBSITE');
} else {
	$text = Text::_('JVISIT_REPLY_TO_LINK');
}

if ($fieldParams->get('show_url', 0)) {
	$text = $text . htmlspecialchars($value);
}

echo sprintf(
	'<div class="u-in-reply-to h-cite"><a class="u-url" href="%s"%s>%s</a></div>',
	htmlspecialchars($value),
	$attributes,
	$text
);

```

### [Task](https://docs.joomla.org/Help4.x:Plugins:_Name_of_Plugin)<!-- \index{plugins!Task} -->

> The task plugin is there to fetch [Webmention](http://webmention.org/) from the website [webmention.io](http://webmention.io/) at regular time intervals.

We start with the manifest for the installation. Note that we use `namespace` here.

[plugins/task/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/indieweb.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/indieweb.xml -->

<?xml version="1.0" encoding="utf-8" ?>
<extension type="plugin" group="task" method="upgrade">
	<name>plg_task_indie_web</name>
	<author>Astrid Günther</author>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_TASK_INDIE_WEB_XML_DESCRIPTION</description>
	<namespace path="src">Joomla\Plugin\Task\IndieWeb</namespace>
	<files>
		<folder plugin="indieweb">services</folder>
		<file>indieweb.xml</file>
		<file>webmentions.json</file>
		<folder>language</folder>
		<folder>src</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
			</fieldset>
			<fieldset name="WEBMENTION_IO">
				<field
					name="token"
					type="text"
					label="PLG_TASK_INDIEWEB_WEBMENTION_IO_TOKEN_LABEL"
					description="PLG_TASK_INDIEWEB_WEBMENTION_IO_TOKEN_DESC"
				/>
			</fieldset>
		</fields>
	</config>
</extension>

```

I have attached the two language files below for completeness.

[plugins/task/indieweb/language/en-GB/plg_task_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/language/en-GB/plg_task_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/language/en-GB/plg_task_indieweb.ini

PLG_TASK_INDIE_WEB="Task - Indieweb"
PLG_TASK_INDIE_WEB_DESC="Fetches webmentions on each run."
PLG_TASK_INDIE_WEB_ERROR_WEBMENTIONS_PHP_NOTUNWRITABLE="Could not make configuration.php un-writable."
PLG_TASK_INDIE_WEB_ERROR_WEBMENTIONS_PHP_NOTWRITABLE="Could not make configuration.php writable."
PLG_TASK_INDIE_WEB_ERROR_WRITE_FAILED="Could not write to the configuration file!"
PLG_TASK_INDIE_WEB_ROUTINE_END_LOG_MESSAGE="ToggleOffline return code is: %1$d. Processing Time: %2$.2f seconds."
PLG_TASK_INDIE_WEB_TASK_LOG_INDIE_WEB="Webmentions in File %1$s."
PLG_TASK_INDIE_WEB_TITLE="Fetches webmentions"
PLG_TASK_INDIE_WEB_XML_DESCRIPTION="Offers task routines to fetch webmentions."

```

[plugins/task/indieweb/language/en-GB/plg_task_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/language/en-GB/plg_task_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/language/en-GB/plg_task_indieweb.sys.ini

PLG_TASK_INDIE_WEB="Task - Indieweb"
PLG_TASK_INDIE_WEB_XML_DESCRIPTION="Offers task routines to change the site's offline status."

; Web Sign In
COM_PLUGINS_WEBMENTION_IO_FIELDSET_LABEL="Webmention.io"
PLG_TASK_INDIEWEB_WEBMENTION_IO_LABEL="Webmention.io"
PLG_TASK_INDIEWEB_WEBMENTION_IO_TOKEN_LABEL="Token"
PLG_TASK_INDIEWEB_WEBMENTION_IO_TOKEN_DESC="<p>Webmention.io.</p>"

```

In the file `plugins/task/indieweb/services/provider.php` the service of the extension is registered. This is implemented in the file `plugins/task/indieweb/src/Extension/IndieWeb.php`. This is accessed via the namespace `Joomla\Plugin\Task\IndieWeb\Extension\IndieWeb;`.

[plugins/task/indieweb/services/provider.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/services/provider.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/services/provider.php

<?php

defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use Joomla\Event\DispatcherInterface;
use Joomla\Plugin\Task\IndieWeb\Extension\IndieWeb;
use Joomla\Utilities\ArrayHelper;

return new class implements ServiceProviderInterface
{
	public function register(Container $container)
	{
		$container->set(
			PluginInterface::class,
			function (Container $container) {
				$plugin = new IndieWeb(
					$container->get(DispatcherInterface::class),
					(array) PluginHelper::getPlugin('task', 'indieweb'),
					ArrayHelper::fromObject(new JConfig()),
					JPATH_BASE . '/plugins/task/indieweb/webmentions.json'
				);
				$plugin->setApplication(Factory::getApplication());

				return $plugin;
			}
		);
	}
};

```

The file `plugins/task/indieweb/src/Extension/IndieWeb.php` does the actual work. The tasks listed in the `TASKS_MAP` constant are displayed in the Joomla backend.

[plugins/task/indieweb/src/Extension/IndieWeb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/src/Extension/IndieWeb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/src/Extension/IndieWeb.php

<?php

namespace Joomla\Plugin\Task\IndieWeb\Extension;

use Exception;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Component\Scheduler\Administrator\Event\ExecuteTaskEvent;
use Joomla\Component\Scheduler\Administrator\Task\Status;
use Joomla\Component\Scheduler\Administrator\Traits\TaskPluginTrait;
use Joomla\Event\DispatcherInterface;
use Joomla\Event\SubscriberInterface;
use Joomla\Filesystem\File;
use Joomla\Filesystem\Path;
use Joomla\Registry\Registry;

\defined('_JEXEC') or die;

final class IndieWeb extends CMSPlugin implements SubscriberInterface
{
	use TaskPluginTrait;

	protected const TASKS_MAP = [
		'plg_task_fetch_webmentions'             => [
			'langConstPrefix' => 'PLG_TASK_INDIE_WEB',
		],
	];

	protected $autoloadLanguage = true;

	public static function getSubscribedEvents(): array
	{
		return [
			'onTaskOptionsList' => 'advertiseRoutines',
			'onExecuteTask' => 'alterIndiewebStatus',
		];
	}

	private $webmentionFile;

	public function __construct(DispatcherInterface $dispatcher, array $config, array $jConfig, string $webmentionFile)
	{
		parent::__construct($dispatcher, $config);

		$this->webmentionFile = $webmentionFile;
	}

	public function alterIndiewebStatus(ExecuteTaskEvent $event): void
	{
		if (!array_key_exists($event->getRoutineId(), self::TASKS_MAP)) {
			return;
		}

		$this->startRoutine($event);

		$exit= $this->writewebmentionFile($this->webmentionFile);
		$this->logTask(sprintf($this->getApplication()->getLanguage()->_('PLG_TASK_INDIE_WEB_TASK_LOG_INDIE_WEB'), $this->webmentionFile));

		$this->endRoutine($event, $exit);
	}

	private function writewebmentionFile(string $config): int
	{
		$file = $this->webmentionFile;

		if (file_exists($file) && Path::isOwner($file) && !Path::setPermissions($file)) {
			$this->logTask($this->getApplication()->getLanguage()->_('PLG_TASK_INDIE_WEB_ERROR_WEBMENTIONS_PHP_NOTWRITABLE'), 'notice');
		}

		try {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, 'https://webmention.io/api/mentions.jf2?token=' . $this->params->get('token'));
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

			$response = curl_exec($curl);

			if ($response === false) {
				$curlError = curl_error($curl);
				curl_close($curl);
				throw new ApiException('cURL Error: ' . $curlError);
			}

			$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

			if ($httpCode >= 400) {
				curl_close($curl);
				$responseParsed = json_decode($response);
				throw new ApiException('HTTP Error ' . $httpCode .
					' (' . $responseParsed->error->type . '): ' . $responseParsed->error->message);
			}

			curl_close($curl);

			File::write($file, $response);
		} catch (Exception $e) {
			$this->logTask($this->getApplication()->getLanguage()->_('PLG_TASK_INDIE_WEB_ERROR_WRITE_FAILED'), 'error');

			return Status::KNOCKOUT;
		}

		// Invalidates the cached file
		if (function_exists('opcache_invalidate')) {
			opcache_invalidate($file);
		}

		// Attempt to make the file un-writeable.
		if (Path::isOwner($file) && !Path::setPermissions($file, '0444')) {
			$this->logTask($this->getApplication()->getLanguage()->_('PLG_TASK_INDIE_WEB_ERROR_WEBMENTIONS_PHP_NOTUNWRITABLE'), 'notice');
		}

		return Status::OK;
	}
}

```

The file `plugins/task/indieweb/webmentions.json` is not part of the actual program code. It is downloaded when the task is executed. I have included it here as an example.

[plugins/task/indieweb/webmentions.json](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/task/indieweb/webmentions.json)

```js {numberLines: -2}
/* https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/task/indieweb/webmentions.json */
{
    "type": "feed",
    "name": "Webmentions",
    "children": [
        {
            "type": "entry",
            "author": {
                "type": "card",
                "name": "Astrid",
                "photo": "https://webmention.io/avatar/fimidi.com/19be.jpg",
                "url": "https://fimidi.com/@astrid"
            },
            "url": "https://fimidi.com/@astrid/109303891082037165",
            "published": "2022-11-07T18:16:57+00:00",
            "wm-received": "2022-11-13T10:32:24Z",
            "wm-id": 1557987,
            "wm-source": "https://fimidi.com/web/@astrid/109303891082037165",
            "wm-target": "https://astrid-guenther.de/en/webprogrammierung/imagemap-and-or-advent-calender-for-joomla",
            "content": {
                "html": "<p>I like advent calendars. I am currently in the process of designing and ...</p>",
                "text": "I like advent calendars. I am currently in the process of designing and ..."
            },
            "mention-of": "https://astrid-guenther.de/en/webprogrammierung/imagemap-and-or-advent-calender-for-joomla",
            "wm-property": "mention-of",
            "wm-private": false
        }
   ]
}
```

### [System](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_System_Group/en)<!-- \index{plugins!System} -->

> For inserting elements in the `<head>` of the HTML markup we access a system plugin. 

This `onAfterDispatch` event is fired after the framework is loaded and the application initialization method is called. Here it is possible to insert elements into the document.

[plugins/system/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/system/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/indieweb.php

<?php

use Joomla\CMS\Plugin\CMSPlugin;

\defined('_JEXEC') or die;

class PlgSystemIndieweb extends CMSPlugin
{
	protected $app;

	public function onAfterDispatch()
	{
		$doc = $this->app->getDocument();
		$doc->addCustomTag('<link rel="authorization_endpoint" href="' . $this->params->get('authorization_endpoint', 'https://indieauth.com/auth') . '" >');
		$doc->addCustomTag('<link rel="token_endpoint" href="' . $this->params->get('token_endpoint', 'https://tokens.indieauth.com/token') . '" >');
		$doc->addCustomTag('<link rel="webmention" href="' . $this->params->get('webmention', 'https://webmention.io/example.org/webmention') . '" >');
		$doc->addCustomTag('<link rel="pingback" href="' . $this->params->get('pingback', 'https://webmention.io/example.org/xmlrpc') . '" >');
	}
}

```

The installation manifest does not contain any special features.

[plugins/system/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/system/indieweb/indieweb.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/indieweb.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="system" method="upgrade">
	<name>plg_system_indieweb</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<file>indieweb.xml</file>
		<file plugin="indieweb">indieweb.php</file>
		<folder>language</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
				<field
					name="authorization_endpoint"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_LABEL"
					description="PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_DESC"
					hint="https://indieauth.com/auth"
					filter="url"
					validate="url"
				/>
				<field
					name="token_endpoint"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_LABEL"
					description="PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_DESC"
					hint="https://tokens.indieauth.com/token"
					filter="url"
					validate="url"
				/>
				<field
					name="webmention"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_WEBMENTIOM_LABEL"
					description="PLG_SYSTEM_INDIEWEB_WEBMENTIOM_DESC"
					hint="https://webmention.io/example.org/webmention"
					filter="url"
					validate="url"
				/>
				<field
					name="pingback"
					type="url"
					label="PLG_SYSTEM_INDIEWEB_PINGBACK_LABEL"
					description="PLG_SYSTEM_INDIEWEB_PINGBACK_DESC"
					hint="https://webmention.io/example.org/xmlrpc"
					filter="url"
					validate="url"
				/>
			</fieldset>
		</fields>
	</config>
</extension>

```

The two language files are included below for completeness.

[plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/raw/plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/language/en-GB/plg_system_indieweb.ini

PLG_SYSTEM_INDIEWEB="System - Indieweb"
PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION="Inserts meta information in the header of the website.<ol><li>&lt;link rel='authorization_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='token_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='webmention' href='https://eample.org' /&gt;<li>&lt;link rel='pingback' href='https://eample.org' /&gt;"

```
[plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/raw/plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/system/indieweb/language/en-GB/plg_system_indieweb.sys.ini

PLG_SYSTEM_INDIEWEB="System - Indieweb"
PLG_SYSTEM_INDIEWEB_XML_DESCRIPTION="Inserts meta information in the header of the website.<ol><li>&lt;link rel='authorization_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='token_endpoint' href='https://eample.org' /&gt;<li>&lt;link rel='webmention' href='https://eample.org' /&gt;<li>&lt;link rel='pingback' href='https://eample.org' /&gt;"

PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_LABEL="Authorization Endpoint"
PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_LABEL="Token Endpoint"
PLG_SYSTEM_INDIEWEB_WEBMENTIOM_LABEL="Webmention"
PLG_SYSTEM_INDIEWEB_PINGBACK_LABEL="Pingback"

PLG_SYSTEM_INDIEWEB_AUTHORIZATION_ENDPOINT_DESC="An <b><dfn>authorization endpoint</dfn></b> is an HTTP endpoint that <a href='https://indieweb.org/Micropub'>micropub</a> or <a href='https://indieweb.org/IndieAuth'>IndieAuth</a> clients can use to identify a user or obtain an authorization code (which is then later exchanged for an access token) to be able to post to their website (https://indieweb.org/authorization-endpoint).<br>Default: https://indieauth.com/auth."
PLG_SYSTEM_INDIEWEB_TOKEN_ENDPOINT_DESC="A <b><dfn>token endpoint</dfn></b> is an HTTP endpoint that <a href='https://indieweb.org/Micropub'>micropub</a> clients can use to obtain an access token given an authorization code (https://indieweb.org/token-endpoint).<br>Default: https://tokens.indieauth.com/token."
PLG_SYSTEM_INDIEWEB_WEBMENTIOM_DESC="<b><dfn><a href="https://www.w3.org/TR/webmention/">Webmention</a></dfn></b> is a web standard for conversations and interactions across the web, a powerful building block used for a growing distributed network of peer-to-peer <a href='https://indieweb.org/comment'>comments</a>, <a href='https://indieweb.org/like'>likes</a>, <a href='https://indieweb.org/repost'>reposts</a>, and other <a href='https://indieweb.org/responses'>responses</a> across the web (https://indieweb.org/Webmention).<br>Default: https://webmention.io/example.org/webmention."
PLG_SYSTEM_INDIEWEB_PINGBACK_DESC="<b><dfn>Pingback</dfn></b> is a legacy <a href="/XML-RPC">XML-RPC</a> based protocol for web sites to notify other web sites when they've posted a link to them respectively (https://indieweb.org/pingback).<br>Default: https://webmention.io/example.org/xmlrpc."
```

### [Content](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Content_Group/en)<!-- \index{plugins!Content} -->

> The content plugin adds elements to the HTML markup that meet the minimum syntactic rules of the IndieWeb. The elements are partially assigned the CSS class `hidden` and therefore do not appear in the default template Cassiopeia. I accept the disadvantage that the content appears twice in the markup. The advantage is that I am not dependent on how a template renders the content and that the plugin does not affect the appearance of the website.

[plugins/content/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/indieweb.php

<?php

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\CMS\Router\Route;
use Joomla\Component\Contact\Site\Helper\RouteHelper;
use Joomla\Database\ParameterType;
use Joomla\Registry\Registry;

\defined('_JEXEC') or die;

class PlgContentIndieweb extends CMSPlugin
{
	protected $db;

	public function onContentPrepare($context, &$row, $params, $page = 0)
	{
		if ($context === 'com_finder.indexer') {
			return;
		}

		$allowed_contexts = ['com_content.article', 'com_agadvents.agadvent'];

		if (!in_array($context, $allowed_contexts)) {
			return;
		}

		if (!($params instanceof Registry)) {
			return;
		}

		if (!isset($row->id) || !(int) $row->id) {
			return;
		}

		if ($context === 'com_content.article') {
			$indieweb = $this->getIndiewebData($row->created_by);
			$row->contactid = $indieweb->contactid;
			$row->webpage = $indieweb->webpage;
			$row->email = $indieweb->email_to;
			$row->authorname = $indieweb->name;
		}

		// Todo Save created_by with agadvent
		if ($context === 'com_agadvents.agadvent') {
			$row->webpage = "";
			$row->email = "";
			$row->authorname = "Advent";
			$row->title = $row->name;
			$row->introtext = '';
			$row->text = $row->fulltext;
		}

		$url = $this->params->get('url', 'url');

		$row->indieweb_link = '';

		// Web Sign In
		$row->text = $row->text . '<div class="hidden"><ul>';
		$row->text = $row->text . '<li><a rel="me" href="mailto:' . $row->email . '">' . $row->email . '</a></li>';

		foreach ($this->params->get('websignin') as $websigninitem) {
			$row->text = $row->text . '<li><a rel="me" href="' . $websigninitem->websignin_url . '">' . $websigninitem->websignin_url . '</a></li>';
		}
		$row->text = $row->text . '</ul></div>';


		// Content
		$row->text = $row->text . '<article class="hidden h-entry">
        <h1 class="p-name">' . $row->title . '</h1>
        <p>Published by 
        <p class="p-author h-card"><a class="u-url u-uid" href="' . $row->webpage . '">' . $row->authorname . '</a></p> on 

        <time class="dt-published" datetime="' . $row->publish_up . '">' . $row->publish_up . '</time>
        </p>
        <p class="p-summary">' . $row->introtext . '</p>
        <div class="e-content">' . str_replace($row->introtext, '', $row->text) . '</div>
        </article>';


		$webmention_file = JPATH_BASE . '/plugins/task/indieweb/webmentions.json';
		$webmentions = file_get_contents($webmention_file);
		$webmentions = json_decode($webmentions);

		$webmentions_urls = "";
		if ($webmentions !== null) {
			foreach ($webmentions->children as $i => $webmention) {
				if (str_contains($webmention->{'wm-target'}, $row->alias)) {
					$webmentions_urls = $webmentions_urls . '<a href="' . $webmention->{'wm-source'} . '">' . $webmention->{'wm-source'} . '</a></br>';
				}
			}
		}

		$row->text = $row->text . '<div><b>Webmentions</b><br>' . $webmentions_urls . '</div>';


		// Syndication
		$syndication_urls = '<div><b>Syndication</b><ol>';

		$regex = '/{loadsyndication\s(.*?)}/i';
		$matcheslist = [];
		preg_match_all($regex, $row->text, $matches, PREG_SET_ORDER);
		if ($matches) {
			foreach ($matches as $match) {
				$matcheslist = explode(',', $match[1]);
			}
		}

		foreach ($matcheslist as $i => $matche) {
			$syndication_urls = $syndication_urls . '<li><a class="u-syndication" rel="syndication" href="' . $matche . '">' . $matche . '</a></li>';
		}

		$syndication_urls = $syndication_urls . '</ol></div>';
		$row->text = $row->text . $syndication_urls;
		$row->text = preg_replace($regex, '', $row->text);

		// Todo text and fulltext ?
		if ($context === 'com_agadvents.agadvent') {
			$row->fulltext = $row->text;
		}
	}

	protected function getIndiewebData($userId)
	{
		static $indiewebs = [];

		// Note: don't use isset() because value could be null.
		if (array_key_exists($userId, $indiewebs)) {
			return $indiewebs[$userId];
		}

		$db = $this->db;
		$query  = $db->getQuery(true);
		$userId = (int) $userId;

		$query->select($db->quoteName('contact.id', 'contactid'))
			->select(
				$db->quoteName(
					[
						'contact.alias',
						'contact.catid',
						'contact.webpage',
						'contact.email_to',
						'contact.name',
					]
				)
			)
			->from($db->quoteName('#__contact_details', 'contact'))
			->where(
				[
					$db->quoteName('contact.published') . ' = 1',
					$db->quoteName('contact.user_id') . ' = :createdby',
				]
			)
			->bind(':createdby', $userId, ParameterType::INTEGER);

		if (Multilanguage::isEnabled() === true) {
			$query->where(
				'(' . $db->quoteName('contact.language') . ' IN ('
				. implode(',', $query->bindArray([Factory::getLanguage()->getTag(), '*'], ParameterType::STRING))
				. ') OR ' . $db->quoteName('contact.language') . ' IS NULL)'
			);
		}

		$query->order($db->quoteName('contact.id') . ' DESC')
			->setLimit(1);

		$db->setQuery($query);

		$indiewebs[$userId] = $db->loadObject();

		return $indiewebs[$userId];
	}
}

```

Auch das Content Plugin benötigt ein Installations-Manifest.

[plugins/content/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/indieweb.xml)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/indieweb.xml -->

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="content" method="upgrade">
	<name>plg_content_indieweb</name>
	<author>Astrid Günther</author>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_CONTENT_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<file>indieweb.xml</file>
		<file plugin="indieweb">indieweb.php</file>
		<folder>language</folder>
	</files>
	<config>
		<fields name="params">
			<fieldset name="basic">
			</fieldset>
			<fieldset name="WebSignIn">
				<field
					name="websignin"
					type="subform"
					label="PLG_CONTENT_INDIEWEB_WEBSIGNIN_LABEL"
					description="PLG_CONTENT_INDIEWEB_WEBSIGNIN_DESC"
					layout="joomla.form.field.subform.repeatable-table"
					icon="list"
					multiple="true"
					default=''
				>
					<form repeat="true">
						<field
							name="websignin_url"
							type="url"
							label="PLG_CONTENT_INDIEWEB_WEBSIGNIN_URL_LABEL"
							hint="mailto:info@example.org or https://fimidi.com/@username"
							filter="url"
							validate="url"
							size="50"
						/>
					</form>
				</field>
			</fieldset>
		</fields>
	</config>
</extension>

```

Below are the two language files necessary for correct translation.

[plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.ini

PLG_CONTENT_INDIEWEB="Content - Indieweb"
PLG_CONTENT_INDIEWEB_XML_DESCRIPTION="Adds visible and invisible information about the content, the author of the content, webmentions and syndication links for the indieweb. Requirement: The user who wrote the post must be connected to a contact."

```

[plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/raw/plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/content/indieweb/language/en-GB/plg_content_indieweb.sys.ini

PLG_CONTENT_INDIEWEB="Content - Indieweb"
PLG_CONTENT_INDIEWEB_XML_DESCRIPTION="Adds visible and invisible information about the content, the author of the content, webmentions and syndication links for the indieweb. Requirement: The user who wrote the post must be connected to a contact."

COM_PLUGINS_WEBSIGNIN_FIELDSET_LABEL="Web Sign In"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_LABEL="Web Sign In URLs"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_URL_LABEL="URL"
PLG_CONTENT_INDIEWEB_WEBSIGNIN_DESC="<p>In order to be able to sign in using your domain name, connect it to your existing identities. You probably already have many disconnected profiles on the web. </p><p>Linking between them and your domain name with the rel=me microformat ensures that it’s easy to see that you on Google/Twitter/Github/Flickr/Facebook/email are all the same person as your domain name (https://indieweb.org/How_to_set_up_web_sign-in_on_your_own_domain).</p><p>The outer container contains the class hidden, so that the information is inserted hidden on the website in a template that styles the class with display:none.</p>"

```

### [Editor Button](https://docs.joomla.org/Chunk4x:Extensions_Plugin_Manager_Edit_Button_Group/en)<!-- \index{plugins!Editor Button} -->

> In the content plugin, syndication links are detected and reshaped using a specific pattern in the content. To make it easier to enter this pattern in the editor, we implement this editor button.

The file `media/plg_editors-xtd_indieweb/joomla.asset.json` registers the necessary JavaScript code in the WebAsset manager.

[media/plg_editors-xtd_indieweb/joomla.asset.json](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/media/plg_editors-xtd_indieweb/joomla.asset.json)

```js {numberLines: -2}
/* https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/media/plg_editors-xtd_indieweb/joomla.asset.json */

{
  "$schema": "https://developer.joomla.org/schemas/json-schema/web_assets.json",
  "name": "plg_editors-xtd_indieweb",
  "version": "4.0.0",
  "description": "Joomla CMS",
  "license": "GPL-2.0-or-later",
  "assets": [
    {
      "name": "plg_editors-xtd_indieweb.admin-article-indieweb",
      "type": "script",
      "uri": "plg_editors-xtd_indieweb/admin-article-indieweb.js",
      "dependencies": [
        "core"
      ],
      "attributes": {
        "nomodule": true,
        "defer": true
      },
      "version": "3caf2bd836dad54185a2fbb3c9a625b7576d677c"
    }
 ]
}
```

The JavaScript file `media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js` implements code that inserts a specific text pattern by clicking at the insertion point in the editor. In our case the text is `{loadsyndication testurl,testurl2,testurl3}'`. 

[media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js)

```js {numberLines: -2}
/* https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/media/plg_editors-xtd_indieweb/js/admin-article-indieweb.js */

(() => {

  const options = window.Joomla.getOptions('xtd-indieweb');

  window.insertIndieweb = editor => {
    if (!options) {
      // Something went wrong!
      throw new Error('XTD Button \'indieweb\' not properly initialized');
    }

    const content = window.Joomla.editors.instances[editor].getValue();

    if (!content) {
      Joomla.editors.instances[editor].replaceSelection('{loadsyndication testurl,testurl2,testurl3}');
    } else if (content && !content.match(/{loadsyndication\s/i)) {
      Joomla.editors.instances[editor].replaceSelection('{loadsyndication testurl,testurl2,testurl3}');
    } else {
      // @todo replace with joomla-alert
      alert(options.exists);
      return false;
    }

    return true;
  };
})();

```

The file `plugins/editors-xtd/indieweb/indieweb.php` inserts the button in the editor for the event `onDisplay`.

[plugins/editors-xtd/indieweb/indieweb.php](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.php)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.php

<?php

use Joomla\CMS\Language\Text;
use Joomla\CMS\Object\CMSObject;
use Joomla\CMS\Plugin\CMSPlugin;

\defined('_JEXEC') or die;

class PlgButtonIndieweb extends CMSPlugin
{
	protected $autoloadLanguage = true;

	protected $app;

	public function onDisplay($name)
	{
		$doc = $this->app->getDocument();
		$doc->getWebAssetManager()
			->registerAndUseScript('plg_editors-xtd_indieweb.admin-article-indieweb', 'plg_editors-xtd_indieweb/admin-article-indieweb.min.js', [], ['defer' => true], ['core']);

		// Pass some data to javascript
		$doc->addScriptOptions(
			'xtd-indieweb',
			[
				'exists' => Text::_('PLG_EDITORS-XTD_INDIEWEB_ALREADY_EXISTS', true),
			]
		);

		$button = new CMSObject();
		$button->modal   = false;
		$button->onclick = 'insertIndieweb(\'' . $name . '\');return false;';
		$button->text    = Text::_('PLG_EDITORS-XTD_INDIEWEB_BUTTON_INDIEWEB');
		$button->name    = $this->_type . '_' . $this->_name;
		$button->icon    = 'arrow-down';
		$button->iconSVG = '<svg viewBox="0 0 32 32" width="24" height="24"><path d="M32 12l-6-6-10 10-10-10-6 6 16 16z"></path></svg>';
		$button->link    = '#';

		return $button;
	}
}

```
The installation manifest lists the information and files necessary for installation.

[plugins/editors-xtd/indieweb/indieweb.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/indieweb.xml

<?xml version="1.0" encoding="utf-8"?>
<extension type="plugin" group="editors-xtd" method="upgrade">
	<name>plg_editors-xtd_indieweb</name>
	<author>Astrid Günther</author>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>__BUMP_VERSION__</version>
	<description>PLG_EDITORS-XTD_INDIEWEB_XML_DESCRIPTION</description>
	<files>
		<file>indieweb.xml</file>
		<file plugin="indieweb">indieweb.php</file>
		<folder>language</folder>
	</files>
</extension>

```

Two language files complete the implementation.

[plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.ini

PLG_EDITORS-XTD_INDIEWEB="Button - IndieWeb Syndication"
PLG_EDITORS-XTD_INDIEWEB_XML_DESCRIPTION="Enables a button which allows you to insert the <em>IndieWeb Syndication &hellip;</em> link into an Article.  See Content Plugin Indieweb"
PLG_EDITORS-XTD_INDIEWEB_ALREADY_EXISTS="There is already a IndieWeb Syndication link that has been inserted. Only one link is permitted."
PLG_EDITORS-XTD_INDIEWEB_BUTTON_INDIEWEB="IndieWeb Syndications"

```

[plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini](https://codeberg.org/astrid/j4examplecode/src/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t30a/src/plugins/editors-xtd/indieweb/language/en-GB/plg_editors-xtd_indieweb.sys.ini

PLG_EDITORS-XTD_INDIEWEB="Button - IndieWeb Syndication"
PLG_EDITORS-XTD_INDIEWEB_XML_DESCRIPTION="Enables a button which allows you to insert the <em>IndieWeb Syndication &hellip;</em> link into an Article.  See Content Plugin Indieweb"


## FAQ about plugins

### Activate plugin automatically during installation

Do you want your plugin to be activated automatically during an installation? In that case, add the following code[^github.com/dgrammatiko/jailed-fs/blob/main/src/plugins/system/restrictedfs/script.php] to an installation script.

```php
defined('_JEXEC') || die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\Adapter\PluginAdapter;
use Joomla\CMS\Installer\InstallerScript;

class plgYourplugintypYourpluginnameInstallerScript extends InstallerScript
{
  public function postflight($type, PluginAdapter $parent)
  {
    // Enable the plugin
    if ($type === 'install' || $type === 'discover_install') {
      $db = Factory::getDbo();
      $query = $db->getQuery(true)
        ->update('#__extensions')
        ->set($db->qn('enabled') . ' = 1')
        ->where($db->qn('type') . ' = ' . $db->q('plugin'))
        ->where($db->qn('element') . ' = ' . $db->q('yourpluginname'))
        ->where($db->qn('folder') . ' = ' . $db->q('yourplugintyp'));
      $db->setQuery($query);
      try {
        $db->execute();
      } catch (\Exception $e) {
        // var_dump($e);
      }
    }
  }
}
```
<img src="https://vg08.met.vgwort.de/na/6ed60508849f482daea03626b68de768" width="1" height="1" alt="">
