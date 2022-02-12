---
date: 2020-12-01
title: 'Joomla 4.x Tutorial - Extension Development - The First View in the Backend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/die-erste-ansicht-im-backend
langKey: en
categories:
  - Code
  - JoomlaEn
tags:
  - CMS
  - Joomla
---

We'll start with the basics. For this we create the _View_ in the administration area rudimentary. At the end of this text you know how to insert a menu item in the menu of the administration area<!-- \index{menu item!backend} -->. Via the menu item you open the view to your component. Don't be disappointed: This view contains nothing more than a short text. You have a good basis for the next steps.

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t0...t1)[^github.com/astridx/boilerplate/compare/t0...t1] and copy these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ foos.xml](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-1ff20be1dacde6c4c8e68e90161e0578)

`foos.xml` tells Joomla how to install our component. Just like modules and plugins, components have an XML installation<!-- \index{installation manifest} --> file that informs Joomla about the extension to be installed. This file is called a manifest and contains details such as

- the version number,
- all files and folders used by the component,
- details of the database,
- and component parameters.

Create a new file and name it `foos.xml`. This is the name of the extension without the prefix `com_`. We will then go through each line and see what it does.

The first line is not specific to Joomla. It tells us that this is an XML file

```xml
<?xml version="1.0" encoding="utf-8" ?>
```

Then we tell Joomla that this is a component. And we want the upgrade installation method to be used. So it is possible to use this package not only for installation but also for an upgrade

```xml
<extension type="component" method="upgrade">
```

> Sometimes you will find a parameter with a version number in the `<extension>` tag of the manifest. This is not used anywhere, so it is unnecessary. For more information, see [github.com/joomla/joomla-cms/pull/25820](https://github.com/joomla/joomla-cms/pull/25820).

Then we define the name of the component. In this case `COM_FOOS`.

```xml
<name>COM_FOOS</name>
```

> Read more about the name at [github.com/joomla/joomla-cms/issues/26221](https://github.com/joomla/joomla-cms/issues/26221).

The next lines are self-explanatory. Add your data.

```xml
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
```

This is the first version of the component. We will give it the version number `1.0.0`: `<version>1.0.0</version>`. If we fix a small bug, the next number would be `1.0.1`. If we introduce a new feature, we choose `1.1.0`. If we made major changes that alter implementations in earlier versions, the next version would be `2.0.0`. It is important that you use the three-part version numbering, as this makes it easier to create updates later using semantic versioning.

> Joomla follows [semantic versioning](https://developer.joomla.org/news/586-joomla-development-strategy.html#version_numbering)[^developer.joomla.org/news/586-joomla-development-strategy.html#version_numbering]. I recommend this as well.

In the description field we use a language string.

```xml
<description>COM_FOOS_ XML_DESCRIPTION</description>
```

At the moment, this has no effect. Later, this text will change based on the language files we introduce in one of the next chapters.
The description of the component will be shown during installation and when you click the menu `System` and open the submenu `Manage | Extensions`.

Next we set the HTML tag for the namespace. In the preface I explained why we use namespaces. Now we create it practically. How do you name your namespace?

- The first element of the namespace is your _CompanyName_. For this tutorial I have used `FooNamespace`. It is used to distinguish the code from the code in other extensions. This makes it possible to use identical class names without conflicts. The namespace is also used to register a service provider. A service provider is a PHP class that provides services.

- The second element is the type of extension: component, module, plugin, language or template.

- The third element is the name of the extension without the preceding `com_`, `mod_`, `plg_` or `tpl_`, in our case `Foos`.

```xml
<namespace>FooNamespace\Component\Foos</namespace>
```

With the `script` file you call code when your component is installed, uninstalled or updated.

```xml
<scriptfile>script.php </scriptfile>
```

Like Joomla itself, components have a frontend and an administration area. The folder `administrator/components/ com_foos` contains all files used by the backend. You add individual files with the tag 'filename'. For a complete directory it is better to use the tag `folder`. The files for the administration area of your component are all inside the tag `administration`. Here is also a `menu` tag. This is the menu item that is displayed in the sidebar in the backend. We use the language string `COM_FOOS`, which we will replace later with text from a language file.

```xml
	<administration>
		<!-- Menu entries -->
		<menu view="foos">COM_FOOS</menu>
		<submenu>
			<menu link="option=com_foos">COM_FOOS</menu>
		</submenu>
		<files folder="administrator/components/com_foos">
			<filename>foos.xml</filename>
			<folder>services</folder>
			<folder>src</folder>
			<folder>tmpl</folder>
		</files>
	</administration>
```

We will look at the `changelogurl` and `updateservers` tags in more detail in the next chapter.

```xml
<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
<updateservers>
	<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
</updateservers>
```

Let's move on to the _dlid_-tag.

```xml
<dlid prefix="dlid=" suffix="" />
```

You need this if you use the _Download Key Manager_. In general, this is only the case for commercial extensions<!-- \index{commercial extensions} -->. You can find more information on Github at [github.com/joomla/joomla-cms/pull/25553](https://github.com/joomla/joomla-cms/pull/25553).

Finally, we close the `</extension>` tag. Here is the complete code:

[administrator/components/com_foos/ foos.xml](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/foos.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/foos.xml -->

<?xml version="1.0" encoding="utf-8" ?>
<extension type="component" method="upgrade">
	<name>COM_FOOS</name>
	<creationDate>[DATE]</creationDate>
	<author>[AUTHOR]</author>
	<authorEmail>[AUTHOR_EMAIL]</authorEmail>
	<authorUrl>[AUTHOR_URL]</authorUrl>
	<copyright>[COPYRIGHT]</copyright>
	<license>GNU General Public License version 2 or later;</license>
	<version>1.0.0</version>
	<description>COM_FOOS_XML_DESCRIPTION</description>
	<namespace path="src">FooNamespace\Component\Foos</namespace>
	<scriptfile>script.php</scriptfile>
	<!-- Back-end files -->
	<administration>
		<!-- Menu entries -->
		<menu view="foos">COM_FOOS</menu>
		<submenu>
			<menu link="option=com_foos">COM_FOOS</menu>
		</submenu>
		<files folder="administrator/components/com_foos">
			<filename>foos.xml</filename>
			<folder>services</folder>
			<folder>src</folder>
			<folder>tmpl</folder>
		</files>
	</administration>
	<changelogurl>https://raw.githubusercontent.com/astridx/boilerplate/tutorial/changelog.xml</changelogurl>
	<updateservers>
		<server type="extension" name="Foo Updates">https://raw.githubusercontent.com/astridx/boilerplate/tutorial/foo_update.xml</server>
	</updateservers>
	<dlid prefix="dlid=" suffix="" />
</extension>

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ script.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-7aceee287e50092f4d9e6caaec3b8b40)

With the installation script<!-- \index{installation script} --> file you call code

- when your component is installed,
- before your component is installed,
- when your component is uninstalled,
- before your component is uninstalled,
- or when your component is updated.

Create the file `script.php` with the following content:

[administrator/components/com_foos/ script.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/script.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/script.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;
use Joomla\CMS\Installer\InstallerAdapter;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Log\Log;

/**
 * Script file of Foo Component
 *
 * @since  1.0.0
 */
class Com_FoosInstallerScript
{
	/**
	 * Minimum Joomla version to check
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	private $minimumJoomlaVersion = '4.0';

	/**
	 * Minimum PHP version to check
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	private $minimumPHPVersion = JOOMLA_MINIMUM_PHP;

	/**
	 * Method to install the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 */
	public function install($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_INSTALL');

		return true;
	}

	/**
	 * Method to uninstall the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 */
	public function uninstall($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UNINSTALL');

		return true;
	}

	/**
	 * Method to update the extension
	 *
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 */
	public function update($parent): bool
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_UPDATE');

		return true;
	}

	/**
	 * Function called before extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 * @throws Exception
	 */
	public function preflight($type, $parent): bool
	{
		if ($type !== 'uninstall') {
			// Check for the minimum PHP version before continuing
			if (!empty($this->minimumPHPVersion) && version_compare(PHP_VERSION, $this->minimumPHPVersion, '<')) {
				Log::add(
					Text::sprintf('JLIB_INSTALLER_MINIMUM_PHP', $this->minimumPHPVersion),
					Log::WARNING,
					'jerror'
				);

				return false;
			}

			// Check for the minimum Joomla version before continuing
			if (!empty($this->minimumJoomlaVersion) && version_compare(JVERSION, $this->minimumJoomlaVersion, '<')) {
				Log::add(
					Text::sprintf('JLIB_INSTALLER_MINIMUM_JOOMLA', $this->minimumJoomlaVersion),
					Log::WARNING,
					'jerror'
				);

				return false;
			}
		}

		echo Text::_('COM_FOOS_INSTALLERSCRIPT_PREFLIGHT');

		return true;
	}

	/**
	 * Function called after extension installation/update/removal procedure commences
	 *
	 * @param   string            $type    The type of change (install, update or discover_install, not uninstall)
	 * @param   InstallerAdapter  $parent  The class calling this method
	 *
	 * @return  boolean  True on success
	 *
	 * @since  1.0.0
	 *
	 */
	public function postflight($type, $parent)
	{
		echo Text::_('COM_FOOS_INSTALLERSCRIPT_POSTFLIGHT');

		return true;
	}
}

```

The `install` function, as the name suggests, is called when the component is installed. At the moment, text is output. It is possible to install sample data.

`uninstall` is called when someone uninstalls the component. At the moment, only text is displayed.

The update function `update` is called whenever you update the component.

The `preflight` function is called before the component is installed, discover_installed, updated or uninstalled. You can add code here to check the prerequisites like the PHP version or to check if another extension is installed or not.

The `postflight` function is called after the component has been installed, discover_installed, updated or uninstalled. This function is used to set default values for component parameters.

> Note: In Joomla 3, only plugins called the Preflight method during the uninstall process and Postflight was never used during uninstall. As of version 4.0, these two hooks are available during the uninstall for all extension types.

> Do you want to know exactly when which method is called? Then have a look at the file `/libraries/src/Installer/InstallerAdapter.php`. The commands `$this->triggerManifestScript('');` will start the execution of the related method. For example, the `postflight` function is triggered via `$this->triggerManifestScript('postflight');`. See [Potential backward compatibility issues in Joomla 4](https://docs.joomla.org/Potential_backward_compatibility_issues_in_Joomla_4#CMS_Libraries)[^docs.joomla.org/potential_backward_compatibility_issues_in_joomla_4#cms_libraries].

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ services/provider.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

`provider.php` is used to implement the component services. Via an interface, the component class defines which services it provides. A dependency injection container or DI container is used for this. To register, `ComponentDispatcherFactory` and `MVCFactory` are mandatory for each component. Registering `CategoryFactory` is at this place optional, we need `CategoryFactory` when we integrate categories later. Using `provider.php` it is possible to introduce new services without breaking backwards compatibility (BC). If you are not familiar with the concept of DI Container but would like to learn more, you can find explanations and some examples in the following links:<!-- \index{DI Container} -->

- [joomla-framework/di](https://github.com/joomla-framework/di)[^github.com/joomla-framework/di].
- [docs/why-dependency-injection.md](https://github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md)[^github.com/joomla-framework/di/blob/master/docs/why-dependency-injection.md].

More information about the implementation can be found on [Github](https://github.com/joomla/joomla-cms/pull/20217)[^github.com/joomla/joomla-cms/pull/20217].

You often see the word 'factory' in Joomla. This is because Joomla uses the [factory design pattern](https://en.wikipedia.org/wiki/Factory_method_pattern)[^en.wikipedia.org/wiki/factory_method_pattern]. The factory method is a pattern where the interface to create an object is an abstract method of an inheriting class. However, the concrete implementation of the creation of new objects does not take place in the superclass, but in subclasses derived from it. The latter implement the said abstract method. To program extensions for Joomla it is not mandatory that you know the design patterns. However, it can be worthwhile to think outside the box. In software engineering, a [design pattern](https://en.wikipedia.org/wiki/Software_design_pattern)[^en.wikipedia.org/wiki/software_design_pattern] is a general, reusable solution to a common problem. Someone else had the same problem and found a solution. We don't have to solve the same problem, but can build on it.<!-- \index{design pattern!factory method} --><!-- \index{design pattern} -->

[administrator/components/com_foos/ services/provider.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/services/provider.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/services/provider.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\Dispatcher\ComponentDispatcherFactoryInterface;
use Joomla\CMS\Extension\ComponentInterface;
use Joomla\CMS\Extension\Service\Provider\CategoryFactory;
use Joomla\CMS\Extension\Service\Provider\ComponentDispatcherFactory;
use Joomla\CMS\Extension\Service\Provider\MVCFactory;
use Joomla\CMS\HTML\Registry;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use FooNamespace\Component\Foos\Administrator\Extension\FoosComponent;

/**
 * The foos service provider.
 * https://github.com/joomla/joomla-cms/pull/20217
 *
 * @since  1.0.0
 */
return new class implements ServiceProviderInterface
{
	/**
	 * Registers the service provider with a DI container.
	 *
	 * @param   Container  $container  The DI container.
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function register(Container $container)
	{
		$container->registerServiceProvider(new CategoryFactory('\\FooNamespace\\Component\\Foos'));
		$container->registerServiceProvider(new MVCFactory('\\FooNamespace\\Component\\Foos'));
		$container->registerServiceProvider(new ComponentDispatcherFactory('\\FooNamespace\\Component\\Foos'));

		$container->set(
			ComponentInterface::class,
			function (Container $container) {
				$component = new FoosComponent($container->get(ComponentDispatcherFactoryInterface::class));

				$component->setRegistry($container->get(Registry::class));

				return $component;
			}
		);
	}
};
```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-7b7a67cba037a3dcac6cccb6d456cc19)

The file `DisplayController.php`<!-- \index{DisplayController (Backend)} --> is the entry point for the Model View Controller part in the administration area of the Foo component. Name the class _DisplayController_. Joomla expects it like this. Extend _BaseController_ to use many things out-of-the-box.

The main task of this controller is to prepare the display. Therefore the default controller is called DisplayController. It calls the method `display()` of the parent class `BaseController` in the namespace `Joomla\CMS\MVC\Controller` - exactly this is the file `libraries/src/MVC/Controller/ BaseController.php`. In the Model-View-Controller model, controllers are often used to set up the start environment.

Let's create the _DisplayController_. As always, we first create the _DocBlock_<!-- \index{DocBlock} -->. Here is an example of a typical document block.

![An example of a typical docblock in Joomla](/images/dockblock.png)

> What does `__BUMP_VERSION__` or `__DEPLOY_VERSION__` stand for? Sometimes you see strange text like this in a _DocBlock_. For example in [PR 27712](https://github.com/joomla/joomla-cms/pull/27712/files)[^github.com/joomla/joomla-cms/pull/27712/files]. In Joomla, we put `__DEPLOY_VERSION__` in place of the version number of a new method we create. Since we don't know in which version this new code will be accepted in Joomla, we can't use a real version number. When the new code is added to the core, this strange string is automatically replaced with the current version number. In other systems `__BUMP_VERSION__` is common. I use `__BUMP_VERSION__` here as well.<!-- \index{DEPLOY VERSION} --><!-- \index{BUMP VERSION} -->

How to create DocBlocks for Joomla is explained in the Joomla coding standards<!-- \index{coding standards} --> at [developer.joomla.org/ coding-standards/docblocks.html](https://developer.joomla.org/coding-standards/docblocks.html) and the pull request [github.com/joomla/joomla-cms/ pull/31504](https://github.com/joomla/joomla-cms/pull/31504).

> A DocBlock is displayed before each class and before each function. All code contains DocBlock comments, which make it easier for automated tools to generate documentation. In addition it helps some IDEs to provide code completion. And sometimes the comment is helpful for programmers. I don't print the documentary blocks further here. In the code examples on Github, the DocBlocks are still present.

After the DocBlock you add the _namespace_.

```php
namespace FooNamespace\Component\Foos\Administrator\Controller;
```

You declare this with the corresponding keyword. Namespaces were introduced in Joomla 4. If this concept is new to you, read the overview of namespaces at [php.net](https://www.php.net/manual/en/language.namespaces.php)[^php.net/manual/en/language.namespaces.php]. It is important that it is in the file before any other code.

After the namespace we add

```php
\defined('_JEXEC') or die;`
```

so that this PHP file is not directly callable.

Next, we import the namespace of the parent class `BaseController` with the keyword `use` to be able to use this class.

```php
use Joomla\CMS\MVC\Controller\BaseController;
```

Then we create the class for the controller. I already wrote that you should call this DisplayController and extend the class BaseController. Then define the variable `$default_view` in which you set the default view with `foos`. You choose `foos` as the view because the name of the component is `foos` and for this reason you will also created the directory `/administrator/components/ com_foos/src/View/Foos`. If nothing is defined, the Foos view with the default layout is used by default. Setting this variable is not necessary. But I think it is always better to insert this line.

If you take a closer look at the URL while using a component in the administration area, you may notice the view and layout variables. For example, the URL `index.php ?option=com_foos &view=foos &layout=default` loads the `foos` view with the default layout `default`. Thus, the file `components/` + `com_foos/tmpl/foos/` + `default.php` is called when you are in the frontend. If you are working in the backend, `administrator/components/` + `com_foos/tmpl/foos/` + `default.php` is used.

> The visibility is defined in PHP with `public`, `private` or `protected`. When to use which is explained in the [PHP manual](https://www.php.net/manual/en/language.oop5.visibility.php)[^php.net/manual/en/language.oop5.visibility.php].

Create everything as it is intended in Joomla. This will bring you advantages. For many frequently used functions, you do not reinvent the wheel. You can see this in practice with the `display` method. You do not implement any action in your code. All the work is done by `parent::display()`.

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/src/Controller/DisplayController.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Controller;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\Controller\BaseController;

/**
 * Foos master display controller.
 *
 * @since  1.0.0
 */
class DisplayController extends BaseController
{
	/**
	 * The default view.
	 *
	 * @var    string
	 * @since  1.0.0
	 */
	protected $default_view = 'foos';

	/**
	 * Method to display a view.
	 *
	 * @param   boolean  $cachable   If true, the view output will be cached
	 * @param   array    $urlparams  An array of safe URL parameters and their variable types, for valid values see {@link \JFilterInput::clean()}.
	 *
	 * @return  BaseController|bool  This object to support chaining.
	 *
	 * @since   1.0.0
	 *
	 * @throws  \Exception
	 */
	public function display($cachable = false, $urlparams = [])
	{
		return parent::display();
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-38764f2b1343234561c0d02cd2991ea1)

`FoosComponent.php` is the code for booting the extension. It is the first file that is called when Joomla loads the component. Boot' is the function to set up the environment of the extension, such as registering new classes. For more information, see the pull request [github.com/joomla/joomla-cms/pull/20217](https://github.com/joomla/joomla-cms/pull/20217). In the following we will expand the file `FoosComponent.php`.

[administrator/components/com_foos/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/Extension/FoosComponent.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/src/Extension/FoosComponent.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Extension;

defined('JPATH_PLATFORM') or die;

use Joomla\CMS\Categories\CategoryServiceInterface;
use Joomla\CMS\Categories\CategoryServiceTrait;
use Joomla\CMS\Extension\BootableExtensionInterface;
use Joomla\CMS\Extension\MVCComponent;
use Joomla\CMS\HTML\HTMLRegistryAwareTrait;
use FooNamespace\Component\Foos\Administrator\Service\HTML\AdministratorService;
use Psr\Container\ContainerInterface;

/**
 * Component class for com_foos
 *
 * @since  1.0.0
 */
class FoosComponent extends MVCComponent implements BootableExtensionInterface, CategoryServiceInterface
{
	use CategoryServiceTrait;
	use HTMLRegistryAwareTrait;

	/**
	 * Booting the extension. This is the function to set up the environment of the extension like
	 * registering new class loaders, etc.
	 *
	 * If required, some initial set up can be done from services of the container, eg.
	 * registering HTML services.
	 *
	 * @param   ContainerInterface  $container  The container
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function boot(ContainerInterface $container)
	{
		$this->getRegistry()->register('foosadministrator', new AdministratorService);
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)

Although we are developing the code for a minimal component, some administrator files are needed. The file `AdministratorService.php` will be used later to add functions like multilingualism or main entries/featured. At the moment we do not need these functions. But we are already preparing everything here.

[administrator/components/com_foos/ service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/Service/HTML/AdministratorService.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\Service\HTML;

defined('JPATH_BASE') or die;

/**
 * Foo HTML class.
 *
 * @since  1.0.0
 */
class AdministratorService
{
}

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-8e3d37bbd99544f976bf8fd323eb5250)

The view `administrator/components/com_foos/ src/View/Foos/HtmlView.php` defines objects (toolbar, title) and calls the model (data). At the moment our component has a primitive view. Only a static text is shown. This will change soon! There are several files that work together to generate the view in the frontend. For example, the controller that calls the view is involved. We created the controller earlier in the current chapter. Later, we will add the model, which prepares the data.

In the file `HtmlView.php` all buttons and titles of the toolbar are defined. The model is called to prepare the data for the view. At the moment we only call the function of the parent class to display the default template: `parent::display($tpl);`. Why do it yourself when there are functions in Joomla to do it?

> When naming a view, it is best to use only a capital letter as the initial letter. I had a problem with the name of an additional `View`. I used `FOOPlaces`. The view was not found under this name. After I renamed the view folder and namespace to `Fooplaces`, everything works fine. I found an explanation of naming conventions on [Github](https://docs.joomla.org/J4.x:File_Structure_and_Naming_Conventions)[^docs.joomla.org/j4.x:file_structure_and_naming_conventions]. According to this page, the folder name for the template should be written in lower case. It does not say that in addition the view is allowed to use an uppercase letter only for initial letters. According to a [discussion](https://github.com/joomla/joomla-cms/discussions/36679)[^github.com/joomla/joomla-cms/discussions/36679] this is nevertheless the case.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/src/View/Foos/HtmlView.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Administrator\View\Foos;

\defined('_JEXEC') or die;

use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

/**
 * View class for a list of foos.
 *
 * @since  1.0.0
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * Method to display the view.
	 *
	 * @param   string  $tpl  A template file to load. [optional]
	 *
	 * @return  void
	 *
	 * @since   1.0.0
	 */
	public function display($tpl = null): void
	{
		parent::display($tpl);
	}
}

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-3186af99ea4e3321b497b86fcd1cd757)

The file `default.php` is the template for rendering the view. In it is the text that we display. At the moment we are putting all the effort into the output of the text "Hello Foos".

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/t1/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t1/src/administrator/components/com_foos/tmpl/foos/default.php

<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2020 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
\defined('_JEXEC') or die;
?>
Hello Foos

```

<!-- prettier-ignore -->
#### [components/com\_foos/index.html](https://github.com/astridx/boilerplate/compare/astridx:t0...t1#diff-c39948fdaabc9d988523b05f98585e15)

I wrote in the preface that the file `index.html`<!-- \index{index.html} --> is not needed. That is correct! Here I only added it because I am putting together an installation package, but Joomla reports an error during the installation if there is no folder for the frontend or if an empty directory is passed in the installation package. At the moment we have no content for the frontend. The temporary insertion of the file is therefore only a help at this point to avoid error messages during the installation.

[components/com_foos/index.html](https://github.com/astridx/boilerplate/blob/t1/src/components/com_foos/index.html)

```html {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t1/src/components/com_foos/index.html -- >

<!DOCTYPE html><title></title>
```

### Changed files

Everything is new. There are no changed files yet.

## Test your Joomla component

1. install your component in Joomla version 4 to test it: In the beginning, the easiest thing to do is to copy the files manually in place. Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

2. open the menu `System | Install | Discover`. Here you will see an entry for the component you just copied. Select it and click on the button '`Install`.

![View that allows you to find extensions that were not installed via the normal Joomla installation](/images/j4x1x1.png)

3. if everything works, you will see these displays in front of you after the installation.

![View after installation](/images/j4x1x2.png)

4. next test if you get the view for your component without errors.

![The first view in the backend](/images/j4x1x3.png)

> In previous Joomla versions, the text was output in the backend at the end of the installation, which is inserted into the installation script with the command `echo Text::_('...')`. Since Joomla 4, this no longer happens without further ado. More information is available on [Github](https://github.com/joomla/joomla-cms/issues/36343)[^github.com/joomla/joomla-cms/issues/36343].

Up to this point, it wasn't rocket science. We have a solid basis for the next steps.
<img src="https://vg08.met.vgwort.de/na/91a964b14e904ded9ad45011c0ad492c" width="1" height="1" alt="">
