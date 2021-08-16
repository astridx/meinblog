---
date: 2020-12-23
title: 'Joomla 4.x Tutorial - Extension Development - Pagination'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-pagination
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Quickly there is a lot of content. Displaying all elements on one page is not useful. It has a negative impact on the overview and performance. That's why we split the items on subpages and add pagination for navigation at the bottom.<!-- \index{pagination} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t18...t19)[^github.com/astridx/boilerplate/compare/t18...t19] and incorporate these changes into your development version.

## Step by step

### New files

No new files are added.

### Modified files

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t18...t19#diff-8e3d37bbd99544f976bf8fd323eb5250)

We do not have any special requests. To display the default pagination, more or less two lines are enough. In the view you call
`$this->pagination = $this->get('Pagination');` to set the variable `$this->pagination`.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/23dfac84a81f5e050ba474e80f04a8ddf19c4658/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 	protected $items;

+	protected $pagination;
+
 	/**
 	 * The model state
 	 *

 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
-
+		$this->pagination = $this->get('Pagination');
 		$this->filterForm = $this->get('FilterForm');
 		$this->activeFilters = $this->get('ActiveFilters');
 		$this->state = $this->get('State');

```

<!-- prettier-ignore -->
#### [administrator/components/com\_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t18...t19#diff-3186af99ea4e3321b497b86fcd1cd757)

In the template we use the `getListFooter` method of the variable `$this->pagination`. That was all!

[administrator/components/com_foos/ tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/23dfac84a81f5e050ba474e80f04a8ddf19c4658/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 						</tbody>
 					</table>

+					<?php echo $this->pagination->getListFooter(); ?>
+
 				<?php endif; ?>
 				<input type="hidden" name="task" value="">
 				<input type="hidden" name="boxchecked" value="0">

```

In the global configuration you can set the number of elements that will be displayed by default. Normally this is set to 20 elements. 

![Joomla Pagination in global configuration](/images/j4x23x2.png)

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

2. open the view of your component in the administration area and create so many items that they are no longer displayed on one page. In the lower part you will see a navigation to browse through the contents.

![Joomla Pagination](/images/j4x23x1.png)
