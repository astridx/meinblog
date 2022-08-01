---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2022-08-02
title: 'Pagination'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-pagination
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

There is a lot of content soon. Displaying all elements on one page is not useful. It has a negative effect on the layout and performance. Therefore, we divide the elements into sub-pages and add pagination or page numbering. With this, navigation through the pages is possible. Links are inserted for this purpose. Usually, these are located at the bottom of the page.<!-- \index{pagination} -->

> For impatient people: View the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t18...t19)[^codeberg.org/astrid/j4examplecode/compare/t18...t19] and copy these changes into your development version.

## Step by step

### New files

No new files are added.

### Modified files

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

We do not have any special requests. To display the default pagination, more or less two lines are enough. In the view you call
`$this->pagination = $this->get('Pagination');` to set the variable `$this->pagination`.

[administrator/components/com_foos/ src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t19/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

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
#### administrator/components/ com\_foos/ tmpl/foos/default.php

In the template we use the `getListFooter` method of the variable `$this->pagination`. That was all!

[administrator/components/com_foos/ tmpl/foos/default.php](https://codeberg.org/astrid/j4examplecode/src/branch/t19/src/administrator/components/com_foos/tmpl/foos/default.php)

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

Do you feel that something is missing in this chapter? Are you wondering where all the calculations are that create the page links? Then take a look at the two files: [libraries/src/Pagination/Pagination.php](https://github.com/joomla/joomla-cms/blob/65aaacc28cddfed55804306eb02b407d28884159/libraries/src/Pagination/Pagination.php#L437)[^github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/pagination/pagination.php] and [libraries/src/MVC/Model/ListModel.php](https://github.com/joomla/joomla-cms/blob/b84fc74c882b0b86d220bf6c5b9999e9c1a17958/libraries/src/MVC/Model/ListModel.php#L496)[^github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/mvc/model/listmodel.php#l496]. Joomla does all the work for you if you use the default, so if specifically in our case the model extends the file `libraries/src/MVC/Model/ListModel.php`.

## Test your Joomla component

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder to the `administrator` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the ones from the previous part.

2. open the view of your component in the administration area and create so many items that they are no longer displayed on one page. In the lower part you will see a navigation to browse through the contents.

![Joomla Pagination](/images/j4x23x1.png)
<img src="https://vg08.met.vgwort.de/na/5061650d6c764e02bb5f0b909fdc258d" width="1" height="1" alt="">
