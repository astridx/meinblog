---
date: 2020-12-18
title: 'Joomla 4.x Tutorial - Extension Development - Integrate Custom Fields in Frontend'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-custom-fields-im-frontend-integrieren
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Very few use custom fields in the administration area alone. As a rule, output is required in the frontend. We will address this question in the current part of the article series. How and where are user-defined fields in Joomla output in the frontend?

![Joomla Custom Fields in eine eigene Komponente integrieren](/images/j4x18x1.png)

## For impatient people

View the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t14a...t14b)[^github.com/astridx/boilerplate/compare/t14a...t14b] and incorporate these changes into your development version.

## Step by step

In the following overview, the newly added files are marked with a background and the changed ones are outlined.

![Overview of the files edited in this chapter](/images/tree14b.png)

### New files

No new files are added in this chapter.

### Modified files

<!-- prettier-ignore -->
#### [components/com\_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-02a4c6dd3e5ef61740a32d58e2b6a7fbcbeb430b6b03e3f740934fa296fc0c82)

Custom Fields display data in the frontend using events. The custom fields are displayed in three different places on the website. By default, the data is displayed before the content. This setting can be changed. Therefore we save the results of `onContentAfterTitle`, `onContentBeforeDisplay` and `onContentAfterDisplay`. We do this in the `View`.

Specifically, we make sure that the events

- [onContentAfterTitle](https://docs.joomla.org/Plugin/Events/Content#onContentAfterTitle),
- [onContentBeforeDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentBeforeDisplay) and
- [onContentAfterDisplay](https://docs.joomla.org/Plugin/Events/Content#onContentAfterDisplay)
  are triggered and the result is stored in a variable.

[components/com_foos/ src/View/Foo/HtmlView.php ](https://github.com/astridx/boilerplate/blob/54b05b97d53ba27cb0a07f1c3f6ba5aa344e2750/src/components/com_foos/src/View/Foo/HtmlView.php)

```php {diff}
 \defined('_JEXEC') or die;

 use Joomla\CMS\MVC\View\HtmlView as BaseHtmlView;
+use Joomla\CMS\Factory;

 /**
  * HTML Foos View class for the Foo component

 	 */
 	public function display($tpl = null)
 	{
-		$this->item = $this->get('Item');
+		$item = $this->item = $this->get('Item');
+
+		Factory::getApplication()->triggerEvent('onContentPrepare', array ('com_foos.foo', &$item));
+
+		// Store the events for later
+		$item->event = new \stdClass;
+		$results = Factory::getApplication()->triggerEvent('onContentAfterTitle', array('com_foos.foo', &$item, &$item->params));
+		$item->event->afterDisplayTitle = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentBeforeDisplay', array('com_foos.foo', &$item, &$item->params));
+		$item->event->beforeDisplayContent = trim(implode("\n", $results));
+
+		$results = Factory::getApplication()->triggerEvent('onContentAfterDisplay', array('com_foos.foo', &$item, &$item->params));
+		$item->event->afterDisplayContent = trim(implode("\n", $results));

 		return parent::display($tpl);
 	}

```

> Via `onContentAfterTitle`, `onContentBeforeDisplay`, `onContentAfterDisplay` in addition to the user-defined fields, other elements are output that are assigned to the respective event.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t14a...t14b#diff-11c9422cefaceff18372b720bf0e2f8fb05cda454054cd3bc38faf6a39e4f7d6)

In the template we output the user-defined fields. In our case, this is not extensive, so we write all the stored texts one after the other. In a more complex file we insert the statement in the appropriate place.

[components/com_foos/ tmpl/foo/default.php](https://github.com/astridx/boilerplate/blob/6f52944757be5b7839c787338dc81932d7d25b59/src/components/com_foos/tmpl/foo/default.php)

```php {diff}
 }

 echo $this->item->name;
+
+echo $this->item->event->afterDisplayTitle;
+echo $this->item->event->beforeDisplayContent;
+echo $this->item->event->afterDisplayContent;

```

## Teste deine Joomla-Komponente

1. install your component in Joomla version 4 to test it:

Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part.

2. open the view of your component in the administration area. Click on the menu item 'Fields' in this new menu.

![Integrate Joomla Custom Fields into a custom component](/images/j4x17x1.png)

3. after that create a custom field of type 'text', if you didn't do it in the previous chapter.

4. edit a published foo item. Make sure you add a value to the custom field.

![Integrate Joomla Custom Fields into a custom component](/images/j4x18x1.png)

5. at the end open the detail view of the just edited Foo item. You will see next to the previously existing values now additionally the text you entered in the custom field.

![Integrate Joomla Custom Fields into a custom component](/images/j4x18x2.png)
