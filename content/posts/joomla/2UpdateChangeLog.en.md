---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-02-19
title: 'Joomla Update and Change Log Setup'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-update-und-change-logeinrichten
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

You will continue to develop your component. How do you make sure that users always use the latest version? How do they know about an update? Now that the basic framework of the extension is ready, it's important that your users know about enhancements.

In this chapter I will explain how to create and run an update server for your component. If you want to continue working on the features first, I fully understand. Then just skip this section and come back when you publish your extension.

Update Server sounds complicated, it's basically just a URL to an XML file. This URL is inserted in the extension's installation manifest. The XML file contains a number of details, including the new version number and the download URL to the installation file. When Joomla finds an update for an installed extension, this is displayed in the administration area.

> For impatient people: Look at the changed program code in the [diff view](https://codeberg.org/astrid/j4examplecode/compare/t1...t1b)[^codeberg.org/astrid/j4examplecode/compare/t1...t1b] and include these changes in your development version.

## Step by step

In the current section, two files are added that are stored outside the website. The addresses or URLs under which these are stored were entered in the previous chapter in the file `src/administrator/components/com_foos/foos.xml`.

```xml
<changelogurl>https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/changelog.xml</changelogurl>
<updateservers>
	<server type="extension" name="Foo Updates">https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/foo_update.xml</server>
</updateservers>
```

### New files

> The changes concerning the changelog and the Joomla Update Server are only mentioned in this chapter. In every other chapter you can update the numbers yourself if this is important to you. This is not witchcraft. If I described this over and over again, it would not only bore you - it would unnecessarily inflate this text.

#### foo_update.xml (Update Server)<!-- \index{Update Server} -->

You have told your component in the file [administrator/components/com_foos/ foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1b/src/administrator/components/com_foos/foos.xml) where to find out about updates. That is in the file `foo_update.xml`.

Create the file [foo_update.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1b/foo_update.xml). The file can be named anything as long as it matches the name you specified in the installation XML [administrator/components/com_foos/ foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1b/src/administrator/components/com_foos/foos.xml).

The tag `updates` surrounds all update elements. Create another update section each time you release a new version.

> If your extension supports other Joomla versions, create separate `<update>` definitions for each version.

The value of `name` will be displayed in the Extension Manager Update view. If you use the same name as the extension, you avoid confusion:

The value of the `description` tag is displayed when you hover over the name in the Update view.

The value of the `element` tag is the installed name of the extension. This should match the value in the element column in the `#__extensions` table in your database.

The value of the `type` tag describes what extension it is, e.g. whether it is a component, a module or a plugin.

The value of the tag `version` is the version number for this version. This version number must be higher than the currently installed version of the extension in order for the available update to be displayed.

The tag `changelogurl` is optional and allows to display a link informing about the changes in this version. This file is also the subject of this chapter.

The tag `infourl` is optional and allows you to display a link that informs about the update or a version note.

The tag `downloads` shows all available download locations for an update.
The value of the tag `downloadurl` is the URL to download the extension. This file can be located anywhere.
The attribute `type` describes whether it is a full package or an update, and the format.
And the attribute `format` defines the package type like `zip` or `tar`.

The tags `maintainer` and `maintainerurl` are self-explanatory.

The tag `targetplatform` describes the Joomla version for which this update is intended. The value of the attribute `name` should always be set to "joomla": `<targetplatform name="joomla" version="4.*"/>`.

> If you create your update for a specific Joomla version you can use `min_dev_level` and `max_dev_level`.

Sometimes you want your update to be available for a minimum PHP version. Do this with the tag `php_minimum`.

At the end, close all tags `</update></updates>`.

> For plugins, add a tag called `folder` and a tag called `client`. These tags are only needed for plugins.

The tag `folder` describes the type of plugin. Depending on the plugin type, this can be `system`, `content` or `search`, for example.
The value of the `client` tag describes the `client_id` in the database table `#__extensions`. The value for plugins is always `0`, components are always `1`. Modules and Templates, however, may vary depending on whether it is a frontend `0` or a backend `1` module.

Below you can see the complete file.

[foo_update.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1b/foo_update.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1b/foo_update.xml

<updates>
    <update>
        <name>com_foos</name>
        <description>This is com_foo</description>
        <element>com_foos</element>
        <type>component</type>
        <version>1.0.1</version>
		<changelogurl>https://codeberg.org/astrid/j4examplecode/raw/branch/tutorial/changelog.xml</changelogurl>
		<infourl title="agosms">https://codeberg.org/astrid/j4examplecode/src/branch/v1.0.1/README.md</infourl>
        <downloads>
            <downloadurl type="full" format="zip">https://github.com/astridx/boilerplate/releases/download/v1.0.1/com_foos-1.0.1.zip</downloadurl>
        </downloads>
        <maintainer>Foo Creator</maintainer>
        <maintainerurl>http://www.example.com</maintainerurl>
        <targetplatform name="joomla" version="4.*"/>
		<php_minimum>7.1</php_minimum>
    </update>
</updates>

```

> Do you like to use a checksum? See the test description in this [PR](https://github.com/joomla/joomla-cms/pull/30076) if you don't know how to do this. Under Ubuntu Linux it is possible to calculate the checksum via the console with `sha256sum -b myfile.zip` or `sha284sum -b myfile.zip`.

#### changelog.xml (Changelog)<!-- \index{changelog} -->

Information on the changelog can be found on Github [in PR github.com/joomla/joomla-cms/pull/24026](https://github.com/joomla/joomla-cms/pull/24026) and the [Joomla documentation](https://docs.joomla.org/Adding_changelog_to_your_manifest_file/en)[^docs.joomla.org/adding_changelog_to_your_manifest_file/en]. Below you can see an example file.

[changelog.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t1b/changelog.xml)

```php {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t1b/changelog.xml

<changelogs>
	<changelog>
		<element>com_foos</element>
		<type>component</type>
		<version>1.0.0</version>
		<note>
			<item>Initial Version</item>
		</note>
	</changelog>
	<changelog>
		<element>com_foos</element>
		<type>component</type>
		<version>1.0.1</version>
		<security>
			<item><![CDATA[<p>No security issues.</p>]]></item>
		</security>
		<fix>
			<item>No fix</item>
		</fix>
		<language>
			<item>English</item>
		</language>
		<addition>
			<item>Change log and Update Server added.</item>
		</addition>
		<change>
			<item>No change</item>
		</change>
		<remove>
			<item>No remove</item>
		</remove>
		<note>
			<item>Change log and Update Server added.</item>
		</note>
	</changelog>
</changelogs>

```

> You don't know what `<![CDATA[ ... ]]>` means? The [term CDATA](https://en.wikipedia.org/wiki/cdata)[^en.wikipedia.org/wiki/cdata] is used in the XML markup language for various purposes. It indicates that a given part of the document is general characters rather than program code with a more specific, limited structure. The CDATA section may contain markup characters (`<`, `>` and `&`). These are not interpreted further by the parser. The use of entities such as `&lt;` and `&amp;` is not necessary.<!-- \index{CDATA} -->

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ foos.xml

Only the version number has been adjusted. This change is necessary in every new chapter, because a new function is always added. I do not mention this explicitly in the following.

[administrator/components/com_foos/ foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/b837e9cf7a93301ce6fd2e6f56b922ebae7e6738/src/administrator/components/com_foos/foos.xml)

```php {diff}
 	<authorUrl>[AUTHOR_URL]</authorUrl>
 	<copyright>[COPYRIGHT]</copyright>
 	<license>GNU General Public License version 2 or later;</license>
-	<version>1.0.0</version>
+	<version>1.0.1</version>
 	<description>COM_FOOS_XML_DESCRIPTION</description>
 	<namespace path="src">FooNamespace\Component\Foos</namespace>
 	<scriptfile>script.php</scriptfile>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from part 1.

2. Next, create another version of the example extension. To do this, change the version number in the manifest. Before that, it is not possible to test the update server. Because, there is no update yet. I mention this here anyway, what exactly happens after the creation of the next versions. 3.

3. if everything works, you will see these displays in front of you after the installation, if you click on the menu `System` on the left and then select `Extension` in the section `Updates` on the right. The image shows the status after version 23.0.0 was released.

![Joomla Update Server](/images/j4x2x1.png)

4. so open `System | Update | Extension`. Here you will be offered the update for your component. If this is not the case, click on the button `Find Updates`.

5. When you open it for the first time you will see the message `The Download Key is missing` because you have entered the element `dlid` in the manifest.

6. Add a download key via `System | Update Sites`. Click on the name of your component. Then you will see the text field in which you can enter any value. At the moment, this value is not checked when the update is retrieved. Save the value.

![Joomla Update Sites](/images/j4x2x2.png)

![Joomla Update Sites](/images/j4x2x2_2.png)

7. if you navigate back to `System | Update | Extension`, you will be able to initiate an update or view the changelog.

> The update was not possible before because the `Download Key` was not configured.

> Click the `Find Updates` button in the toolbar if the update is no longer displayed.

![Joomla Update Server](/images/j4x2x3.png)

## Links

[Deploying an Update Server](https://docs.joomla.org/Deploying_an_Update_Server/de)[^docs.joomla.org/deploying_an_update_server/en]
<img src="https://vg08.met.vgwort.de/na/5331f5a98d6044558c130ef1d3a1e4f5" width="1" height="1" alt="">
