---
date: 2019-12-21
title: 'Aktionen in der Werkzeugleiste'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-aktionen-in-der-werkzeugleiste
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Du entwickelst die Erweiterung nicht zum Selbstzweck. Sie hilft dabei, Aufgaben zu erledigen. Damit die Menschen, die mit der Komponente arbeiten, immer den Überblick über die möglichen Arbeitsschritte haben, empfiehlt sich eine Werkzeugleiste. In diesem Teil der Tutorialserie ergänzen wir die Standardaktionen. Hierbei greifen wir auf eine Vielzahl vorgefertigter Methoden zu. Wieder ist es nicht nötig, das Rad selbst zu erfinden.

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t16...t17) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

Ich zeige dir hier, wie du die Standardfunktionen in die Werkzeugleiste integrierst. Jede Komponente hat eigenen Funktionen. Genau wie die in Joomla üblichen fügst du die speziellen über Schaltflächen in der Werkzeugleiste hinzu. Gucke hier bei den Standardfunktionen ab.

### Neue Dateien

Wir ändern in diesem Kapitel lediglich Dateien, es kommt keine neue hinzu.

### Geänderte Dateien

Der nachfolgende Code zeigt dir, welche Funktionen du beim Editieren eines Elementes nutzt. Wir ergänzen hier ebenfalls die Prüfung von Berechtigungen. Eine Schaltfläche wird nur angezeigt, wenn der Betrachter berechtigt ist, sie zu nutzen.

#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

[src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/blob/991ca5fcfb55590fa6589d8c7a8b74fae2628d28/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

```php
...    
    $user = Factory::getUser();
		$userId = $user->id;
...
...
		$canDo = ContentHelper::getActions('com_foos', 'category', $this->item->catid);

		if ($isNew)
		{
			if ($isNew && (count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0))
			{
				ToolbarHelper::apply('foo.apply');
				ToolbarHelper::saveGroup(
					[
						['save', 'foo.save'],
						['save2new', 'foo.save2new']
					],
					'btn-success'
				);
			}

			ToolbarHelper::cancel('foo.cancel');
		}
		else
		{
			$itemEditable = $canDo->get('core.edit') || ($canDo->get('core.edit.own') && $this->item->created_by == $userId);
			$toolbarButtons = [];

			if ($itemEditable)
			{
				ToolbarHelper::apply('foo.apply');
				$toolbarButtons[] = ['save', 'foo.save'];

				if ($canDo->get('core.create'))
				{
					$toolbarButtons[] = ['save2new', 'foo.save2new'];
				}
			}

			if ($canDo->get('core.create'))
			{
				$toolbarButtons[] = ['save2copy', 'foo.save2copy'];
			}

			ToolbarHelper::saveGroup(
				$toolbarButtons,
				'btn-success'
			);

			if (Associations::isEnabled() && ComponentHelper::isEnabled('com_associations'))
			{
				ToolbarHelper::custom('foo.editAssociations', 'contract', 'contract', 'JTOOLBAR_ASSOCIATIONS', false, false);
			}

			ToolbarHelper::cancel('foo.cancel', 'JTOOLBAR_CLOSE');
		}
...
```

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t16...t17#diff-8e3d37bbd99544f976bf8fd323eb5250)

Hier siehst du beispielhaft, wie die Werkzeugleiste der Listenansicht ergänzt – die Ansicht, die dir eine Übersicht über deine Elemente bietet. Die Prüfung von Berechtigungen ist hier gleichfalls hinzugekommen.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/991ca5fcfb55590fa6589d8c7a8b74fae2628d28/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php
...
  	if ($canDo->get('core.create') || count($user->getAuthorisedCategories('com_foos', 'core.create')) > 0)
		{
			$toolbar->addNew('foo.add');
		}

		if ($canDo->get('core.options'))
		if ($canDo->get('core.edit.state'))
		{
			$dropdown = $toolbar->dropdownButton('status-group')
				->text('JTOOLBAR_CHANGE_STATUS')
				->toggleSplit(false)
				->icon('fa fa-ellipsis-h')
				->buttonClass('btn btn-action')
				->listCheck(true);
			$childBar = $dropdown->getChildToolbar();
			$childBar->publish('foos.publish')->listCheck(true);
			$childBar->unpublish('foos.unpublish')->listCheck(true);
			$childBar->archive('foos.archive')->listCheck(true);

			if ($user->authorise('core.admin'))
			{
				$childBar->checkin('foos.checkin')->listCheck(true);
			}

			if ($this->state->get('filter.published') != -2)
			{
				$childBar->trash('foos.trash')->listCheck(true);
			}
		}

		if ($this->state->get('filter.published') == -2 && $canDo->get('core.delete'))
		{
			$toolbar->delete('foos.delete')
				->text('JTOOLBAR_EMPTY_TRASH')
				->message('JGLOBAL_CONFIRM_DELETE')
				->listCheck(true);
		}
...

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen.

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x1.png)

![Joomla! Aktionen in der Werkzeugleiste](/images/j4x21x.png)

## Geänderte Dateien

### Übersicht
