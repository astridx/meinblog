---
description: 'desc'
shortTitle: 'short'
date: 2021-02-03
title: 'Integrate Custom Fields in Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-custom-fields-im-frontend-integrieren
langKey: en
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---

Very few use custom fields only in the administration area. As usual, an output in the frontend is required. We will address this question in the current part of the article series. How and where are custom fields in Joomla displayed in the frontend?<!-- \index{custom fields!frontend} -->

> For impatient people: View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t14a...t14b)[^github.com/astridx/boilerplate/compare/t14a...t14b] and copy these changes into your development version.

## Step by step

### New files

No new files are added in this chapter.

### Modified files

<!-- prettier-ignore -->
#### [components/com\_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-02a4c6dd3e5ef61740a32d58e2b6a7fbcbeb430b6b03e3f740934fa296fc0c82)

Custom Fields display data in the frontend using events. The custom fields are displayed in three different places on the website. By default, the data is displayed before the content. This setting can be changed. Therefore we save the results of `onContentAfterTitle`, `onContentBeforeDisplay` and `onContentAfterDisplay`. We do this in the `View`.

Specifically, we make sure that the events<!-- \index{Event!onContentAfterDisplay} --><!-- \index{Event!onContentBeforeDisplay} --><!-- \index{Event!onContentAfterTitle} -->

- [onContentAfterTitle](https://docs.joomla.org/Plugin/Events/Content#onContentAfterTitle)[^docs.joomla.org/plugin/events/content#oncontentaftertitle],
- [onContentBeforeDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay)[^docs.joomla.org/plugin/events/content#oncontentbeforedisplay] and
- [onContentAfterDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay)[^docs.joomla.org/plugin/events/content#oncontentafterdisplay]
  are triggered and the result is stored in a variable.

> Joomla uses the [observer design pattern](https://en.wikipedia.org/wiki/Observer_pattern)[^en.wikipedia.org/wiki/observer_pattern] for event handling. This is a software design pattern where an object maintains a list of its dependents called observers and automatically notifies them of state changes, usually by calling one of their methods.<!-- \index{design pattern!observer} -->

[components/com_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/blob/54b05b97d53ba27cb0a07f1c3f6ba5aa344e2750/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Factory;

 /**
  * HTML Foos View class for the Foo component
 class HtmlView extends BaseHtmlView
 	 */
 	public function display($tpl = null)
 	{
-		$this->item = $this->get('Item');
+		$item = $this->item = $this->get('Item');
+
+		Factory::getApplication()->triggerEvent('onContentPrepare', ['com_foos.foo', &$item, &$item->params]);
+
+		// Store the events for later
+		$item->event = new \stdClass;
+		$results = Factory::getApplication()->triggerEvent('onContentAfterTitle', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->afterDisplayTitle = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentBeforeDisplay', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->beforeDisplayContent = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentAfterDisplay', ['com_foos.foo', &$item, &$item->params]);
+		$item->event->afterDisplayContent = trim(implode("\n", $results));

 		return parent::display($tpl);
 	}
```

Are you wondering why we set `&$item->params` as parameters for the event methods 

- `onContentPrepare`, 
- `onContentAfterTitle`, 
- `onContentBeforeDisplay` and 
- `onContentAfterDisplay`, 

although we have not yet explicitly implemented `&$item->params` in the Foo extension? Implicitly, the `populateState` method of the file `/components/com_foos/src/Model/FooModel.php` ensures that `&$item->params` is available. For our example, we do not need this third parameter so far. However, it is possible that errors may occur in combination with other extensions if this parameter is not set. Therefore, we set the three mandatory parameters `['com_foos.foo', &$item, &$item->params]` for all event methods.

> Via `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay`, in addition to the custom fields, other elements are displayed that are mapped to the related event.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-11c9422cefaceff18372b720bf0e2f8fb05cda454054cd3bc38faf6a39e4f7d6)

IIn the template we display our custom fields. In our case, this is not complex, so we write all the stored texts one after the other. In a more complex file, the events are inserted at the correct place.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/6f52944757be5b7839c787338dc81932d7d25b59/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 }

 echo $this->item->name;
+
+echo $this->item->event->afterDisplayTitle;
+echo $this->item->event->beforeDisplayContent;
+echo $this->item->event->afterDisplayContent;

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part.

2. open the view of your component in the administration area. Click on the menu item 'Fields' in this new menu.

![Integrate Joomla Custom Fields into a custom component | Create field in backend.](/images/j4x17x1.png)

3. after that create a custom field of type 'text', if you didn't do it in the previous chapter.

4. edit a published foo item. Make sure you add a value to the custom field.

![Integrate Joomla Custom Fields into a custom component | Assign a value to the field in the backend.](/images/j4x18x1.png)

5. at the end open the detail view of the just edited Foo item. You will see next to the previously existing values now additionally the text you entered in the custom field.

![Integrate Joomla Custom Fields into a custom component | Display value of the field in the frontend.](/images/j4x18x2.png)
<img src="https://vg08.met.vgwort.de/na/f1c914654a9a44ddb7f8d78ec2f89fe8" width="1" height="1" alt="">
