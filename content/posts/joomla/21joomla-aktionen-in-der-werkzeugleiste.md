---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-05-17
title: 'Aktionen in der Werkzeugleiste'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-aktionen-in-der-werkzeugleiste
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Du entwickelst die Erweiterung nicht als Selbstzweck. Sie hilft bei der Erledigung von Aufgaben. Damit die Menschen, die mit der Komponente arbeiten, immer einen Überblick über die möglichen Arbeitsschritte haben, ist es sinnvoll, eine Werkzeugleiste zu haben. In diesem Teil des Tutorials werden wir die bereits vorhandene Werkzeugleiste um die Standardaktionen erweitern. Hierbei greifen wir auf eine Vielzahl von vorgefertigten Methoden zu. Auch hier gilt: Beim Standard ist es nicht notwendig, das Rad selbst zu erfinden. Bei zukünftigen speziellen Aufgaben ist es sinnvoll, den Standard als Beispiel zu verwenden.<!-- \index{Aktionen} --><!-- \index{Werzeugleiste} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t16...t17)[^codeberg.org/astrid/j4examplecode/compare/t16...t17] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

Ich zeige dir hier, wie du die Standardfunktionen in die Werkzeugleiste integrierst. Jede Komponente hat eigene Funktionen. Genau wie die in Joomla üblichen fügst du die speziellen über Schaltflächen in der Werkzeugleiste hinzu. Gucke hier bei den Standardfunktionen ab.

### Neue Dateien

Wir ändern in diesem Kapitel lediglich Dateien, es kommt keine neue hinzu.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/com_foos/src/View/Foo/HtmlView.php

Der nachfolgende Code zeigt dir, welche Funktionen du beim Erstellen oder Editieren eines Elementes nutzt. Die Klasse ToolbarHelper[^libraries/src/Toolbar/ToolbarHelper.php] bietet eine Menge hilfreicher Funktionen. Beispielweise

- [`ToolbarHelper::title`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L26) um einen Titel passend zu positionieren,
- [`ToolbarHelper::apply`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L474) um Schaltfäche mit der Standardfunktion zum Speichern hinzuzufügen
- und [`ToolbarHelper::saveGroup`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L653) um ein Dropdown mit den üblichen Speicherbefehlen zu integrieren.

> Sieh dir an, wie du [`ToolbarHelper::custom`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Toolbar/ToolbarHelper.php#L88) für eigene Tasks verwendest.

Wir ergänzen hier die Prüfung von Berechtigungen. Eine Schaltfläche wird nur angezeigt, wenn der Betrachter berechtigt ist, sie zu nutzen. Die Funktion [`ContentHelper::getActions`](https://github.com/joomla/joomla-cms/blob/4c4fef0f4510c1b5d4c6f3db30e39826813b7e13/libraries/src/Helper/ContentHelper.php#L152) sammelt die in der Datei `access.xml` implementierten Rechte, welche dem gerade angemeldeten Benutzer erlaubt sind. Ist dies der Fall, dann ist `$canDo->get('...')` gleich `true`. Ein konkretes Beispiel: `$canDo->get('core.create')` ist `true`, wenn der Benutzer Inhalte erstellen darf.

[administrator/components/com_foos/src/View/Foo/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t17/src/administrator/components/com_foos/src/View/Foo/HtmlView.php)

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
#### administrator/components/com_foos/src/View/Foos/HtmlView.php

Hier siehst du beispielhaft die Werkzeugleiste der Listenansicht - die Ansicht, die dir eine Übersicht über deine Elemente bietet. Die Prüfung von Berechtigungen ist hier ebenfalls hinzugekommen.

[administrator/components/com_foos/src/View/Foos/HtmlView.php](https://codeberg.org/astrid/j4examplecode/src/branch/t17/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 	protected function addToolbar()
 	{
-		$canDo = ContentHelper::getActions('com_foos');
+		FooHelper::addSubmenu('foos');
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

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich. In der Werkzeugleiste siehst du eine Auswahlliste zum Anstoßen von verschiedenen Aktionen.

![Joomla Aktionen in der Werkzeugleiste](/images/j4x21x1.png)

3. Öffne die Detailansicht zu einem Element. Auch hier findest du eine Werkzeugleiste vor.

![Joomla Aktionen in der Werkzeugleiste](/images/j4x21x2.png)
<img src="https://vg08.met.vgwort.de/na/b2afc8f31a3e418aa387ccf1b7bcd391" width="1" height="1" alt="">
