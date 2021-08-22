---
date: 2020-12-25
title: 'Joomla 4.x Tutorial - Extension Development - Checkin and Checkout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-checkin-checkout
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

The checkout function avoids unexpected results that occur when two users edit the same item at the same time. Checking out locks an item when a user opens it for editing. It is then unlocked again when saved or closed. This is a useful function that we are integrating into our sample extension in this part of the article series.<!-- \index{checkin and checkout} -->

> Sometimes it happens that an item is marked as checked out, although no one has opened it for editing at the same time. This usually happens when a previous opening was not finished correctly. For example, the web browser was closed even though the item was open for editing, or the back button in the browser menu was clicked instead of closing the item properly.

> For impatient people: Look at the changed programme code in the [Diff View](https://github.com/astridx/boilerplate/compare/t20...t21)[^github.com/astridx/boilerplate/compare/t20...t21] and incorporate these changes into your development version.

## Step by step

### New files

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ sql/updates/mysql/21.0.0.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-5646e047332531426be00a18128422a6)

Like all properties of a Foo element, the checkout state is stored in the database. We create two columns. Below you can see the script that is called during a Joomla update.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/t21/src/administrator/components/com_foos/sql/updates/mysql/21.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN `checked_out` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);

```

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/compare/t20...t21#diff-262e27353fbe755d3813ea2df19cd0ed)

In the form we add the fields for saving the state. We hide them with the attribute `hidden`, as they are not changed by the user here. Joomla sets the values automatically in the background.

[administrator/components/com_foos/ forms/foo.xml](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			size="1"
 		/>

+		<field
+			name="checked_out"
+			type="hidden"
+			filter="unset"
+		/>
+
+		<field
+			name="checked_out_time"
+			type="hidden"
+			filter="unset"
+		/>
+
 		<field
 			name="ordering"
 			type="ordering"

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-896f245bc8e493f91277fd33913ef974)

We add the database changes that we entered above for the update in the separate SQL file to the SQL script that is called during a new installation.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN `checked_out` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-2daf62ad6c51630353e31eaa3cc28626)

In the model, we adjust everything so that the two new columns are loaded correctly.

> Note the change `array(...)` to `explode(', ',$this->getState(...)...)`. We now use the PHP function [`explode`](https://www.php.net/manual/de/function.explode.php) together with `getState` to create the array for the database query. This is safer and more error-tolerant.

[administrator/components/com_foos/ src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/src/Model/FoosModel.php)

```php {diff}
 		// Select the required fields from the table.
 		$query->select(
 			$db->quoteName(
-				array(
-					'a.id', 'a.name', 'a.alias', 'a.access',
-					'a.catid', 'a.published', 'a.publish_up', 'a.publish_down',
-					'a.language', 'a.ordering', 'a.state'
+				explode(
+					', ',
+					$this->getState(
+						'list.select',
+						'a.id, a.name, a.catid' .
+						', a.access' .
+						', a.checked_out' .
+						', a.checked_out_time' .
+						', a.language' .
+						', a.ordering' .
+						', a.state' .
+						', a.published' .
+						', a.publish_up, a.publish_down'
+					)
 				)
 			)
 		);

 			$query->select('(' . $subQuery . ') AS ' . $db->quoteName('association'));
 		}

+		// Join over the users for the checked out user.
+		$query->select($db->quoteName('uc.name', 'editor'))
+			->join(
+				'LEFT',
+				$db->quoteName('#__users', 'uc') . ' ON ' . $db->quoteName('uc.id') . ' = ' . $db->quoteName('a.checked_out')
+			);
+
 		// Filter on the language.
 		if ($language = $this->getState('filter.language'))
 		{

```

<!-- prettier-ignore -->
#### [administrator/components/ com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-3186af99ea4e3321b497b86fcd1cd757)

In the list view we do not insert a separate column. A symbol is displayed by the name if the element is locked. To display this, I choose the function that Joomla uses in its own extensions: `echo HTMLHelper::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'foos.', true)`. At the same time, this takes over the check whether the contribution is released or not.

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 									<?php echo HTMLHelper::_('grid.id', $i, $item->id); ?>
 								</td>
 								<th scope="row" class="has-context">
+									<?php if ($item->checked_out) : ?>
+										<?php echo HTMLHelper::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'foos.', true); ?>
+									<?php endif; ?>
 									<div>
 										<?php echo $this->escape($item->name); ?>
 									</div>

```

> I have kept it uncomplicated here. I do not check whether someone is authorised to release a checked-out post again. The components in Joomla make this more restrictive. In `com_contact`, for example, the relevant line looks like this: `<?php echo HTMLHelper::*('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'contacts.', $canCheckin); ?>`. If you also don't allow everyone to unlock and want to implement this, look at the implementation in `com_contact` - there you find the code that computes`$canCheckin`.

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.

2. The database has been changed, so it is necessary to update it. Open the 'System | Information | Database' area as described in part 16. Select your component and click 'Update Structure'.

![Joomla Published](/images/j4x16x1.png)

3. Open an item in the edit view.

4. Switch to another browser window and try to edit the item again.

5. Make sure you see an icon that tells you that the item is locked and that an authorised user can unlock it.

![Joomla checkin/checkout](/images/j4x25x1.png)
