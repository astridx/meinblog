---
date: 2020-12-28
title: 'Joomla 4.x Tutorial - Extension Development - Featured'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-featured
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Some items are special and for them there is a special attribute in Joomla: `featured` or `main entry`. This part of the article series adds `featured` to our component.<!-- \index{featured} -->

> In Joomla, elements marked with `featured` are displayed when the home page menu item is linked to the `featured` layout. In this way, it is possible to show or hide an element only by changing the 'featured' property on a page - for example the start page. This has no effect on other display properties - for example, displaying in a category blog.

> For impatient people: Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t23...t24)[^github.com/astridx/boilerplate/compare/t23...t24] and incorporate these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ sql/updates/mysql/24.0.0.sql](https://github.com/astridx/boilerplate/compare/t23...t24#diff-adb53beac2e127edac496abfa3c7bb0c)

You already know this. We store the property `featured` in the database, so we extend the database table by one column. We do this in the file `24.0.0.sql`.

[administrator/components/com_foos/ sql/updates/mysql/24.0.0.sql](https://github.com/astridx/boilerplate/blob/da918651e9c576e78a9d9f2faf84b738aea181d1/src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t24/src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN  `featured` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT 'Set if foo is featured.';

ALTER TABLE `#__foos_details` ADD KEY `idx_featured_catid` (`featured`,`catid`);

```

<!-- prettier-ignore -->
#### [components/com\_foos/ src/Model/FeaturedModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-37eef9f609bf1f517dc937af031f8641)

To process the data that is `featured`, we create our own model.

[components/com_foos/ src/Model/FeaturedModel.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/components/com_foos/src/Model/FeaturedModel.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/src/Model/FeaturedModel.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\Model;

\defined('_JEXEC') or die;

use Joomla\CMS\Component\ComponentHelper;
use Joomla\CMS\Factory;
use Joomla\CMS\Language\Multilanguage;
use Joomla\CMS\MVC\Model\ListModel;
use Joomla\Database\ParameterType;
use Joomla\Registry\Registry;

/**
 * Featured foos model class.
 *
 * @since  __BUMP_VERSION__
 */
class FeaturedModel extends ListModel
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function __construct($config = [])
	{
		if (empty($config['filter_fields'])) {
			$config['filter_fields'] = [
				'id', 'a.id',
				'name', 'a.name',
				'ordering', 'a.ordering',
			];
		}

		parent::__construct($config);
	}

	/**
	 * Method to get a list of items.
	 *
	 * @return  mixed  An array of objects on success, false on failure.
	 */
	public function getItems()
	{
		// Invoke the parent getItems method to get the main list
		$items = parent::getItems();

		// Convert the params field into an object, saving original in _params
		for ($i = 0, $n = count($items); $i < $n; $i++) {
			$item = &$items[$i];

			if (!isset($this->_params)) {
				$item->params = new Registry($item->params);
			}
		}

		return $items;
	}

	/**
	 * Method to build an SQL query to load the list data.
	 *
	 * @return  string    An SQL query
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function getListQuery()
	{
		$user = Factory::getUser();
		$groups = $user->getAuthorisedViewLevels();

		// Create a new query object.
		$db    = $this->getDbo();
		$query = $db->getQuery(true);

		// Select required fields from the categories.
		$query->select($this->getState('list.select', 'a.*'))
			->from($db->quoteName('#__foos_details', 'a'))
			->where($db->quoteName('a.featured') . ' = 1')
			->whereIn($db->quoteName('a.access'), $groups)
			->innerJoin($db->quoteName('#__categories', 'c') . ' ON c.id = a.catid')
			->whereIn($db->quoteName('c.access'), $groups);

		// Filter by category.
		if ($categoryId = $this->getState('category.id')) {
			$query->where($db->quoteName('a.catid') . ' = :catid');
			$query->bind(':catid', $categoryId, ParameterType::INTEGER);
		}

		$query->select('c.published as cat_published, c.published AS parents_published')
			->where('c.published = 1');

		// Filter by state
		$state = $this->getState('filter.published');

		if (is_numeric($state)) {
			$query->where($db->quoteName('a.published') . ' = :published');
			$query->bind(':published', $state, ParameterType::INTEGER);

			// Filter by start and end dates.
			$nowDate = Factory::getDate()->toSql();

			$query->where('(' . $db->quoteName('a.publish_up') .
				' IS NULL OR ' . $db->quoteName('a.publish_up') . ' <= :publish_up)')
				->where('(' . $db->quoteName('a.publish_down') .
					' IS NULL OR ' . $db->quoteName('a.publish_down') . ' >= :publish_down)')
				->bind(':publish_up', $nowDate)
				->bind(':publish_down', $nowDate);
		}

		// Filter by language
		if ($this->getState('filter.language')) {
			$language = [Factory::getLanguage()->getTag(), '*'];
			$query->whereIn($db->quoteName('a.language'), $language, ParameterType::STRING);
		}

		// Add the list ordering clause.
		$query->order($db->escape($this->getState('list.ordering', 'a.ordering')) . ' ' . $db->escape($this->getState('list.direction', 'ASC')));

		return $query;
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   An optional ordering field.
	 * @param   string  $direction  An optional direction (asc|desc).
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		$app = Factory::getApplication();
		$params = ComponentHelper::getParams('com_foos');

		// List state information
		$limit = $app->getUserStateFromRequest('global.list.limit', 'limit', $app->get('list_limit'), 'uint');
		$this->setState('list.limit', $limit);

		$limitstart = $app->input->get('limitstart', 0, 'uint');
		$this->setState('list.start', $limitstart);

		$orderCol = $app->input->get('filter_order', 'ordering');

		if (!in_array($orderCol, $this->filter_fields)) {
			$orderCol = 'ordering';
		}

		$this->setState('list.ordering', $orderCol);

		$listOrder = $app->input->get('filter_order_Dir', 'ASC');

		if (!in_array(strtoupper($listOrder), ['ASC', 'DESC', ''])) {
			$listOrder = 'ASC';
		}

		$this->setState('list.direction', $listOrder);

		$user = Factory::getUser();

		if ((!$user->authorise('core.edit.state', 'com_foos')) && (!$user->authorise('core.edit', 'com_foos'))) {
			// Limit to published for people who can't edit or edit.state.
			$this->setState('filter.published', 1);

			// Filter by start and end dates.
			$this->setState('filter.publish_date', true);
		}

		$this->setState('filter.language', Multilanguage::isEnabled());

		// Load the parameters.
		$this->setState('params', $params);
	}
}

```

<!-- prettier-ignore -->
#### [components/com\_foos/ src/View/Featured/HtmlView.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-3b300f4a420f00b560f4d6563e755204)

`featured` gets its own file to manage the display in the frontend.

[components/com_foos/ src/View/Featured/HtmlView.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/components/com_foos/src/View/Featured/HtmlView.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/src/View/Featured/HtmlView.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace FooNamespace\Component\Foos\Site\View\Featured;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Mail\MailHelper;
use Joomla\CMS\MVC\View\GenericDataException;
use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;

/**
 * Featured View class
 *
 * @since  __BUMP_VERSION__
 */
class HtmlView extends BaseHtmlView
{
	/**
	 * The item model state
	 *
	 * @var    \Joomla\Registry\Registry
	 * @since  __BUMP_VERSION__
	 */
	protected $state;

	/**
	 * The item details
	 *
	 * @var    \JObject
	 * @since  __BUMP_VERSION__
	 */
	protected $items;

	/**
	 * The pagination object
	 *
	 * @var    \JPagination
	 * @since  __BUMP_VERSION__
	 */
	protected $pagination;

	/**
	 * The page parameters
	 *
	 * @var    \Joomla\Registry\Registry|null
	 * @since  __BUMP_VERSION__
	 */
	protected $params = null;

	/**
	 * The page class suffix
	 *
	 * @var    string
	 * @since  __BUMP_VERSION__
	 */
	protected $pageclass_sfx = '';

	/**
	 * Method to display the view.
	 *
	 * @param   string  $tpl  The name of the template file to parse; automatically searches through the template paths.
	 *
	 * @return  mixed  \Exception on failure, void on success.
	 *
	 * @since   __BUMP_VERSION__
	 */
	public function display($tpl = null)
	{
		$app    = Factory::getApplication();
		$params = $app->getParams();

		// Get some data from the models
		$state      = $this->get('State');
		$items      = $this->get('Items');
		$category   = $this->get('Category');
		$children   = $this->get('Children');
		$parent     = $this->get('Parent');
		$pagination = $this->get('Pagination');

		// Flag indicates to not add limitstart=0 to URL
		$pagination->hideEmptyLimitstart = true;

		// Check for errors.
		if (count($errors = $this->get('Errors'))) {
			throw new GenericDataException(implode("\n", $errors), 500);
		}

		// Prepare the data.
		// Compute the foos slug.
		for ($i = 0, $n = count($items); $i < $n; $i++) {
			$item       = &$items[$i];
			$item->slug = $item->alias ? ($item->id . ':' . $item->alias) : $item->id;
			$temp       = $item->params;
			$item->params = clone $params;
			$item->params->merge($temp);

			if ($item->params->get('show_email', 0) == 1) {
				$item->email_to = trim($item->email_to);

				if (!empty($item->email_to) && MailHelper::isEmailAddress($item->email_to)) {
					$item->email_to = HTMLHelper::_('email.cloak', $item->email_to);
				} else {
					$item->email_to = '';
				}
			}
		}

		// Escape strings for HTML output
		$this->pageclass_sfx = htmlspecialchars($params->get('pageclass_sfx'), ENT_COMPAT, 'UTF-8');

		$maxLevel         = $params->get('maxLevel', -1);
		$this->maxLevel   = &$maxLevel;
		$this->state      = &$state;
		$this->items      = &$items;
		$this->category   = &$category;
		$this->children   = &$children;
		$this->params     = &$params;
		$this->parent     = &$parent;
		$this->pagination = &$pagination;

		$this->_prepareDocument();

		return parent::display($tpl);
	}

	/**
	 * Prepares the document
	 *
	 * @return  void
	 *
	 * @since   __BUMP_VERSION__
	 */
	protected function _prepareDocument()
	{
		$app   = Factory::getApplication();
		$menus = $app->getMenu();
		$title = null;

		// Because the application sets a default page title,
		// we need to get it from the menu item itself
		$menu = $menus->getActive();

		if ($menu) {
			$this->params->def('page_heading', $this->params->get('page_title', $menu->title));
		} else {
			$this->params->def('page_heading', Text::_('COM_FOOS_DEFAULT_PAGE_TITLE'));
		}

		$title = $this->params->get('page_title', '');

		if (empty($title)) {
			$title = $app->get('sitename');
		} else if ($app->get('sitename_pagetitles', 0) == 1) {
			$title = Text::sprintf('JPAGETITLE', $app->get('sitename'), $title);
		} else if ($app->get('sitename_pagetitles', 0) == 2) {
			$title = Text::sprintf('JPAGETITLE', $title, $app->get('sitename'));
		}

		$this->document->setTitle($title);

		if ($this->params->get('menu-meta_description')) {
			$this->document->setDescription($this->params->get('menu-meta_description'));
		}

		if ($this->params->get('menu-meta_keywords')) {
			$this->document->setMetaData('keywords', $this->params->get('menu-meta_keywords'));
		}

		if ($this->params->get('robots')) {
			$this->document->setMetaData('robots', $this->params->get('robots'));
		}
	}
}

```

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/featured/default.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-12fc2f2fbc661ff6c184bde121707548)

The display in the frontend is done as before via a template, which we implement in the file `default.php`.

[components/com_foos/ tmpl/featured/default.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/components/com_foos/tmpl/featured/default.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/featured/default.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

?>
<div class="com-foos-featured blog-featured">
<?php if ($this->params->get('show_page_headings') != 0) : ?>
	<h1>
		<?php echo $this->escape($this->params->get('page_heading')); ?>
	</h1>
<?php endif; ?>

<?php echo $this->loadTemplate('items'); ?>

<?php if ($this->params->def('show_pagination', 2) == 1  || ($this->params->get('show_pagination') == 2 && $this->pagination->pagesTotal > 1)) : ?>
	<div class="com-foos-featured__pagination w-100">
		<?php if ($this->params->def('show_pagination_results', 1)) : ?>
			<p class="counter float-right pt-3 pr-2">
				<?php echo $this->pagination->getPagesCounter(); ?>
			</p>
		<?php endif; ?>

		<?php echo $this->pagination->getPagesLinks(); ?>
	</div>
<?php endif; ?>
</div>

```

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/featured/default.xml](https://github.com/astridx/boilerplate/compare/t23...t24#diff-ed5a4e7e95701b93a85d2bb4a6cd0829)

We need the file `components/com_foos/ tmpl/featured/default.xml` to enable the display of `featured` elements via a menu item in the frontend.

[components/com_foos/ tmpl/featured/default.xml](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/components/com_foos/tmpl/featured/default.xml)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/featured/default.xml -->

<?xml version="1.0" encoding="utf-8"?>

<metadata>
	<layout title="COM_FOOS_FEATURED_VIEW_DEFAULT_TITLE">
		<help
			key = "JHELP_MENUS_MENU_ITEM_FOOS_FEATURED"
		/>
		<message>
			<![CDATA[COM_FOOS_FEATURED_VIEW_DEFAULT_DESC]]>
		</message>
	</layout>

	<!-- Add fields to the parameters object for the layout. -->
	<fields name="params">
		<fieldset name="advanced" label="JGLOBAL_LIST_LAYOUT_OPTIONS">

				<field
					name="spacer"
					type="spacer"
					label="JGLOBAL_SUBSLIDER_DRILL_CATEGORIES_LABEL"
					class="text"
				/>

				<field
					name="show_headings"
					type="list"
					label="JGLOBAL_SHOW_HEADINGS_LABEL"
					useglobal="true"
					class="custom-select-color-state"
					>
					<option value="0">JHIDE</option>
					<option value="1">JSHOW</option>
				</field>

				<field
					name="show_pagination"
					type="list"
					label="JGLOBAL_PAGINATION_LABEL"
					useglobal="true"
					class="custom-select-color-state"
					>
					<option value="0">JHIDE</option>
					<option value="1">JSHOW</option>
					<option value="2">JGLOBAL_AUTO</option>
				</field>
		</fieldset>
	</fields>
</metadata>

```

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/featured/default_items.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-e50432f32d93661fd61575d3789b75a4)

In the file `default.php` we use the statement `<?php echo $this->loadTemplate('items'); ?>`. This way we keep the template clear. Everything concerning an item is inserted into `default.php` via the subtemplate `default_items.php`.

> When using subtemplates, it is important that they are located in the same directory as the actual template and that their names match:  
> The call `<?php echo $this->loadTemplate('NAME'); ?>` loads the file  
> `default_NAME.php`
> if it is in the file
> `default.php`
> is executed.

[components/com_foos/ tmpl/featured/default_items.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/components/com_foos/tmpl/featured/default_items.php)

```php {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/t24/src/components/com_foos/tmpl/featured/default_items.php

<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_foos
 *
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

\defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Uri\Uri;

HTMLHelper::_('behavior.core');

$listOrder = $this->escape($this->state->get('list.ordering'));
$listDirn  = $this->escape($this->state->get('list.direction'));

?>

<div class="com-foos-featured__items">
	<?php if (empty($this->items)) : ?>
		<p class="com-foos-featured__message"> <?php echo Text::_('COM_FOO_NO_FOOS'); ?>	 </p>
	<?php else : ?>
	<form action="<?php echo htmlspecialchars(Uri::getInstance()->toString()); ?>" method="post" name="adminForm" id="adminForm">
		<table class="com-foos-featured__table table">
			<?php if ($this->params->get('show_headings')) : ?>
			<thead class="thead-default">
				<tr>
					<th class="item-num">
						<?php echo Text::_('JGLOBAL_NUM'); ?>
					</th>

					<th class="item-title">
						<?php echo HTMLHelper::_('grid.sort', 'COM_FOO_FOO_EMAIL_NAME_LABEL', 'a.name', $listDirn, $listOrder); ?>
					</th>
				</tr>
			</thead>
			<?php endif; ?>

			<tbody>
				<?php foreach ($this->items as $i => $item) : ?>
					<tr class="<?php echo ($i % 2) ? 'odd' : 'even'; ?>" itemscope itemtype="https://schema.org/Person">
						<td class="item-num">
							<?php echo $i; ?>
						</td>

						<td class="item-title">
							<?php if ($this->items[$i]->published == 0) : ?>
								<span class="badge badge-warning"><?php echo Text::_('JUNPUBLISHED'); ?></span>
							<?php endif; ?>
								<span itemprop="name"><?php echo $item->name; ?></span>
						</td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>

	</form>
	<?php endif; ?>
</div>

```

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t23...t24#diff-262e27353fbe755d3813ea2df19cd0ed)

We extend the form with which an element is created or changed by the field for setting the property `featured`.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t23...t24#diff-0fd342035ef43e19c8125b266d1711166311789c2be7ff5dbee2b5d131268f8f)

```xml {diff}
 			<option value="*">JALL</option>
 		</field>

+		<field
+			name="featured"
+			type="radio"
+			class="switcher"
+			label="JFEATURED"
+			default="0"
+			>
+			<option value="0">JNO</option>
+			<option value="1">JYES</option>
+		</field>
+
 		<field
 			name="published"
 			type="list"

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t23...t24#diff-896f245bc8e493f91277fd33913ef974)

In the case of a new installation, the script in the file `install.mysql.utf8.sql` creates the database. Here we add a column to store the property `featured`.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/da918651e9c576e78a9d9f2faf84b738aea181d1/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}
 ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);

+ALTER TABLE `#__foos_details` ADD COLUMN  `featured` tinyint(3) unsigned NOT NULL DEFAULT 0 COMMENT 'Set if foo is featured.';
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_featured_catid` (`featured`,`catid`);

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Controller/FoosController.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-83275f4e46bde5a95cd61ce239609370)

We implement the logic with which we set the `featured` property in the `featured()` function in the `FoosController`.

[administrator/components/com_foos/ src/Controller/FoosController.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/src/Controller/FoosController.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Language\Text;
+use Joomla\Utilities\ArrayHelper;
 use Joomla\CMS\Application\CMSApplication;
 use Joomla\CMS\MVC\Controller\AdminController;
 use Joomla\CMS\MVC\Factory\MVCFactoryInterface;

 	public function __construct($config = array(), MVCFactoryInterface $factory = null, $app = null, $input = null)
 	{
 		parent::__construct($config, $factory, $app, $input);
+
+		$this->registerTask('unfeatured', 'featured');
+	}
+
+	public function featured()
+	{
+		// Check for request forgeries
+		$this->checkToken();
+
+		$ids    = $this->input->get('cid', array(), 'array');
+		$values = array('featured' => 1, 'unfeatured' => 0);
+		$task   = $this->getTask();
+		$value  = ArrayHelper::getValue($values, $task, 0, 'int');
+
+		$model  = $this->getModel();
+
+		// Access checks.
+		foreach ($ids as $i => $id)
+		{
+			$item = $model->getItem($id);
+
+			if (!$this->app->getIdentity()->authorise('core.edit.state', 'com_foos.category.' . (int) $item->catid))
+			{
+				// Prune items that you can't change.
+				unset($ids[$i]);
+				$this->app->enqueueMessage(Text::_('JLIB_APPLICATION_ERROR_EDITSTATE_NOT_PERMITTED'), 'notice');
+			}
+		}
+
+		if (empty($ids))
+		{
+			$this->app->enqueueMessage(Text::_('COM_FOOS_NO_ITEM_SELECTED'), 'warning');
+		}
+		else
+		{
+			// Publish the items.
+			if (!$model->featured($ids, $value))
+			{
+				$this->app->enqueueMessage($model->getError(), 'warning');
+			}
+
+			if ($value == 1)
+			{
+				$message = Text::plural('COM_FOOS_N_ITEMS_FEATURED', count($ids));
+			}
+			else
+			{
+				$message = Text::plural('COM_FOOS_N_ITEMS_UNFEATURED', count($ids));
+			}
+		}
+
+		$this->setRedirect('index.php?option=com_foos&view=foos', $message);
 	}

 	/**

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-c1b8160bef2d2b36367dc59381d6bcb7)

In the model of an element we implement the method with which the assignment of the property (data) `featured` is saved and changed.

[administrator/components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/src/Model/FooModel.php)

```php {diff}
 use Joomla\CMS\Language\Associations;
 use Joomla\CMS\MVC\Model\AdminModel;
 use Joomla\CMS\Language\LanguageHelper;
+use Joomla\Database\ParameterType;
+use Joomla\Utilities\ArrayHelper;

 /**
  * Item Model for a Foo.

 		return $item;
 	}

+	public function featured($pks, $value = 0)
+	{
+		// Sanitize the ids.
+		$pks = ArrayHelper::toInteger((array) $pks);
+
+		if (empty($pks))
+		{
+			$this->setError(Text::_('COM_FOOS_NO_ITEM_SELECTED'));
+
+			return false;
+		}
+
+		$table = $this->getTable();
+
+		try
+		{
+			$db = $this->getDbo();
+
+			$query = $db->getQuery(true);
+			$query->update($db->quoteName('#__foos_details'));
+			$query->set($db->quoteName('featured') . ' = :featured');
+			$query->whereIn($db->quoteName('id'), $pks);
+			$query->bind(':featured', $value, ParameterType::INTEGER);
+
+			$db->setQuery($query);
+
+			$db->execute();
+		}
+		catch (\Exception $e)
+		{
+			$this->setError($e->getMessage());
+
+			return false;
+		}
+
+		$table->reorder();
+
+		// Clean component's cache
+		$this->cleanCache();
+
+		return true;
+	}
+
 	/**
 	 * Preprocess the form.
 	 *
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-2daf62ad6c51630353e31eaa3cc28626)

In the list view model, we make the necessary adjustments to the database query.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 				'published', 'a.published',
 				'access', 'a.access', 'access_level',
 				'ordering', 'a.ordering',
+				'featured', 'a.featured',
 				'language', 'a.language', 'language_title',
 				'publish_up', 'a.publish_up',
 				'publish_down', 'a.publish_down',


 		parent::__construct($config);
 	}
+
 	/**
 	 * Build an SQL query to load the list data.
 	 *

 						', a.checked_out_time' .
 						', a.language' .
 						', a.ordering' .
+						', a.featured' .
 						', a.state' .
 						', a.published' .
 						', a.publish_up, a.publish_down'

 			}
 		}

+		// Filter by featured.
+		$featured = (string) $this->getState('filter.featured');
+
+		if (in_array($featured, ['0','1']))
+		{
+			$query->where($db->quoteName('a.featured') . ' = ' . (int) $featured);
+		}
+
 		// Add the list ordering clause.
 		$orderCol = $this->state->get('list.ordering', 'a.name');
 		$orderDirn = $this->state->get('list.direction', 'asc');

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)

In `AdministratorService.php` we make it possible to change the assignment of the property also in the overview list. A click on the star symbol toggles the value.<!-- \index{service!administrator} -->

[administrator/components/com_foos/ src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php)

```php {diff}
 use Joomla\CMS\Language\Text;
 use Joomla\CMS\Layout\LayoutHelper;
 use Joomla\CMS\Router\Route;
+use Joomla\Utilities\ArrayHelper;

 /**
  * Foo HTML class.

 			$html = LayoutHelper::render('joomla.content.associations', $items);
 		}

+		return $html;
+	}
+	public function featured($value, $i, $canChange = true)
+	{
+		// Array of image, task, title, action
+		$states = array(
+			0 => array('unfeatured', 'foos.featured', 'COM_CONTACT_UNFEATURED', 'JGLOBAL_ITEM_FEATURE'),
+			1 => array('featured', 'foos.unfeatured', 'JFEATURED', 'JGLOBAL_ITEM_UNFEATURE'),
+		);
+		$state = ArrayHelper::getValue($states, (int) $value, $states[1]);
+		$icon = $state[0] === 'featured' ? 'star featured' : 'star';
+
+		if ($canChange)
+		{
+			$html = '<a href="#" onclick="return Joomla.listItemTask(\'cb' . $i . '\',\'' . $state[1] . '\')" class="tbody-icon'
+				. ($value == 1 ? ' active' : '') . '" aria-labelledby="cb' . $i . '-desc">'
+				. '<span class="fas fa-' . $icon . '" aria-hidden="true"></span></a>'
+				. '<div role="tooltip" id="cb' . $i . '-desc">' . Text::_($state[3]);
+		}
+		else
+		{
+			$html = '<a class="tbody-icon disabled' . ($value == 1 ? ' active' : '')
+				. '" title="' . Text::_($state[2]) . '"><span class="fas fa-' . $icon . '" aria-hidden="true"></span></a>';
+		}
+
 		return $html;
 	}
 }

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-8e3d37bbd99544f976bf8fd323eb5250)

We add to the toolbar. `featured` should also be editable here via an action.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 			$childBar = $dropdown->getChildToolbar();
 			$childBar->publish('foos.publish')->listCheck(true);
 			$childBar->unpublish('foos.unpublish')->listCheck(true);
+
+			$childBar->standardButton('featured')
+				->text('JFEATURE')
+				->task('foos.featured')
+				->listCheck(true);
+			$childBar->standardButton('unfeatured')
+				->text('JUNFEATURE')
+				->task('foos.unfeatured')
+				->listCheck(true);
+
 			$childBar->archive('foos.archive')->listCheck(true);

 			if ($user->authorise('core.admin'))
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-1637778e5f7d1d56dd1751af1970f01b)

In the form for creating or editing an element, we insert the command that creates a field using the XML file.

[administrator/components/com_foos/ tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}
 						<?php echo $this->getForm()->renderField('publish_down'); ?>
 						<?php echo $this->getForm()->renderField('catid'); ?>
 						<?php echo $this->getForm()->renderField('language'); ?>
+						<?php echo $this->getForm()->renderField('featured'); ?>
 					</div>
 				</div>
 			</div>
```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t23...t24#diff-3186af99ea4e3321b497b86fcd1cd757)

In the overview of all elements in the backend in the file `administrator/components/com_foos/ tmpl/foos/default.php` we add a column in which the state is displayed with a filled or empty star and can be changed by clicking. The file `HTMLHelper` does the master work for us.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/3fd0e4d60c63c61c35c8f58040f55e1a38059c66/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 								<th scope="col" style="width:1%" class="text-center d-none d-md-table-cell">
 									<?php echo HTMLHelper::_('searchtools.sort', 'COM_FOOS_TABLE_TABLEHEAD_NAME', 'a.name', $listDirn, $listOrder); ?>
 								</th>
+								<th scope="col" style="width:1%" class="text-center">
+									<?php echo HTMLHelper::_('searchtools.sort', 'JFEATURED', 'a.featured', $listDirn, $listOrder); ?>
+								</th>
 								<th scope="col" style="width:10%" class="d-none d-md-table-cell">
 									<?php echo HTMLHelper::_('searchtools.sort', 'JGRID_HEADING_ACCESS', 'access_level', $listDirn, $listOrder); ?>
 								</th>

 									</div>
 								</th>
 								<td class="text-center">
-									<?php
-									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', $canChange, 'cb', $item->publish_up, $item->publish_down);
-									?>
+									<?php echo HTMLHelper::_('foosadministrator.featured', $item->featured, $i, $canChange); ?>
 								</td>
 								<td class="small d-none d-md-table-cell">
 									<?php echo $item->access_level; ?>
 								</td>
+								<td class="text-center">
+									<?php
+									echo HTMLHelper::_('jgrid.published', $item->published, $i, 'foos.', $canChange, 'cb', $item->publish_up, $item->publish_down);
+									?>

+								</td>
 								<?php if ($assoc) : ?>
 								<td class="d-none d-md-table-cell">
 									<?php if ($item->association) : ?>

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

2, The database has been changed, so it is necessary to update it. Open the 'System | Information | Database' area as described in part 16. Select your component and click 'Update Structure'.

![Joomla Published](/images/j4x16x1.png)

3. Open the view of your component in the administration area. The list contains a column that is overwritten with `featured`.

![Joomla Featured](/images/j4x28x1.png)

Open an item in the edit view and make sure that you are offered the attribute `featured` for editing.

![Joomla Featured](/images/j4x28x2.png)

4. create a menu item of the type `featured`.

![Joomla Featured](/images/j4x28x3.png)

5. switch to the frontend and make sure that only items are displayed under the menu item '`featured` for which the attribute is set and for which the item and the corresponding category is also published.

![Joomla Featured elements in the backend](/images/j4x28x4a.png)

![Joomla Featured elements in the frontend](/images/j4x28x4.png)
