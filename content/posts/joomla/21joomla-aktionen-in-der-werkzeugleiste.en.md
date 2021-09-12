---
date: 2020-12-21
title: 'Joomla 4.x Tutorial - Extension Development - Toolbar Actions'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-aktionen-in-der-werkzeugleiste
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

You don't develop the extension as an end in itself. It helps with the completion of tasks. In order for the people working with the component to always have an overview of the possible work steps, it makes sense to have a toolbar. In this part of the tutorial we will extend the already existing toolbar with the standard actions. Here we will access a variety of ready-made methods. Again, for the standard, it is not necessary to invent the wheel yourself. Later on, for special tasks, it makes sense to use the standard as an example.<!-- \index{actions} --><!-- \index{toolbar} -->

![Joomla actions in the toolbar](/images/j4x21x1.png)

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t16...t17)[^github.com/astridx/boilerplate/compare/t16...t17] and copy these changes into your development version.

## Step by step

I'll show you here how to integrate the standard functions into the toolbar. Each component has its own functions. Just like the standard ones in Joomla, you add the special ones via buttons in the toolbar. Look here at the standard functions.

### New files

We only change files in this chapter, no new ones are added.

### Modified files

#### [administrator/components/ com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

The following code shows you which functions you use when creating or editing an element. The [ToolbarHelper](https://github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/Toolbar/ToolbarHelper.php) class provides a lot of helpful functions. For example

- [`ToolbarHelper::title`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L26) to position a title appropriately,
- [`ToolbarHelper::apply`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L474) to add buttons with the default save function
- and [`ToolbarHelper::saveGroup`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L653) to add a dropdown with the standard save commands.

> See how to use [`ToolbarHelper::custom`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L88) for custom tasks.

We add permission checking here. A button is displayed only if the user is authorized to use it. The [`ContentHelper::getActions`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Helper/ContentHelper.php#L152) function collects the permissions implemented in the `access.xml` file, which are allowed to the currently logged in user. If this is the case, then `$canDo->get('...')` equals `true`. A concrete example: `$canDo->get('core.create')` is `true` if the user is allowed to create content.

[administrator/components/com_foos/ src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/991ca5fcfb55590fa6589d8c7a8b74fae2628d28/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 	{
 		Factory::getApplication()->input->set('hidemainmenu', true);

+		$user = Factory::getUser();
+		$userId = $user->id;
+
 		$isNew = ($this->item->id == 0);

 		ToolbarHelper::title($isNew ? Text::_('COM_FOOS_MANAGER_FOO_NEW') : Text::_('COM_FOOS_MANAGER_FOO_EDIT'), 'address foo');

-		ToolbarHelper::apply('foo.apply');
-		ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
+		// Since we don't track these assets at the item level, use the category id.
+		$canDo = ContentHelper::getActions('com_foos', 'category', $this->item->catid);
+
+		// Build the actions for new and existing records.
+		if ($isNew)
+		{
+			// For new records, check the create permission.
+			if ($isNew && (count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0))
+			{
+				ToolbarHelper::apply('foo.apply');
+				ToolbarHelper::saveGroup(
+					[
+						['save', 'foo.save'],
+						['save2new', 'foo.save2new']
+					],
+					'btn-success'
+				);
+			}
+
+			ToolbarHelper::cancel('foo.cancel');
+		}
+		else
+		{
+			// Since it's an existing record, check the edit permission, or fall back to edit own if the owner.
+			$itemEditable = $canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == $userId);
+			$toolbarButtons = [];
+
+			// Can't save the record if it's not editable
+			if ($itemEditable)
+			{
+				ToolbarHelper::apply('foo.apply');
+				$toolbarButtons[] = ['save', 'foo.save'];
+
+				// We can save this record, but check the create permission to see if we can return to make a new one.
+				if ($canDo->get('core.create'))
+				{
+					$toolbarButtons[] = ['save2new', 'foo.save2new'];
+				}
+			}
+
+			// If checked out, we can still save
+			if ($canDo->get('core.create'))
+			{
+				$toolbarButtons[] = ['save2copy', 'foo.save2copy'];
+			}
+
+			ToolbarHelper::saveGroup(
+				$toolbarButtons,
+				'btn-success'
+			);
+
+			if (Associations::isEnabled() && ComponentHelper::isEnabled('com_associations'))
+			{
+				ToolbarHelper::custom('foo.editAssociations', 'contract', 'contract', 'JTOOLBAR_ASSOCIATIONS', false, false);
+			}
+
+			ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
+		}
 	}
 }

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-8e3d37bbd99544f976bf8fd323eb5250)

Here you can see an example of the List View toolbar - the view that gives you an overview of your items. Permission checking has also been added here.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/991ca5fcfb55590fa6589d8c7a8b74fae2628d28/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 	protected function addToolbar()
 	{
-		$canDo = ContentHelper::getActions('com_foos');
+		$this->sidebar = \JHtmlSidebar::render();
+
+		$canDo = ContentHelper::getActions('com_foos', 'category', $this->state->get('filter.category_id'));
+		$user  = Factory::getUser();

 		// Get the toolbar object instance
 		$toolbar = Toolbar::getInstance('toolbar');

 		ToolbarHelper::title(Text::_('COM_FOOS_MANAGER_FOOS'), 'address foo');

-		if ($canDo->get('core.create'))
+		if ($canDo->get('core.create') || count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0)
 		{
 			$toolbar->addNew('foo.add');
 		}

-		if ($canDo->get('core.options'))
+		if ($canDo->get('core.edit.state'))
+		{
+			$dropdown = $toolbar->dropdownButton('status-group')
+				->text('JTOOLBAR_CHANGE_STATUS')
+				->toggleSplit(false)
+				->icon('fa fa-ellipsis-h')
+				->buttonClass('btn btn-action')
+				->listCheck(true);
+			$childBar = $dropdown->getChildToolbar();
+			$childBar->publish('foos.publish')->listCheck(true);
+			$childBar->unpublish('foos.unpublish')->listCheck(true);
+			$childBar->archive('foos.archive')->listCheck(true);
+
+			if ($user->authorise('core.admin'))
+			{
+				$childBar->checkin('foos.checkin')->listCheck(true);
+			}
+
+			if ($this->state->get('filter.published') != -2)
+			{
+				$childBar->trash('foos.trash')->listCheck(true);
+			}
+		}
+
+		if ($this->state->get('filter.published') == -2 && $canDo->get('core.delete'))
+		{
+			$toolbar->delete('foos.delete')
+				->text('JTOOLBAR_EMPTY_TRASH')
+				->message('JGLOBAL_CONFIRM_DELETE')
+				->listCheck(true);
+		}
+
+		if ($user->authorise('core.admin', 'com_foos') || $user->authorise('core.options', 'com_foos'))
 		{
 			$toolbar->preferences('com_foos');
 		}

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

Open the view of your component in the administration area. In the toolbar you will see a dropdown list to trigger different actions.

![Joomla Actions in the Toolbar](/images/j4x21x1.png)

![Joomla actions in the toolbar](/images/j4x21x2.png)
