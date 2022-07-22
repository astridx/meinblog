---
description: 'desc'
shortTitle: 'short'
date: 2021-01-27
title: 'Checkin und Checkout'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-checkin-checkout
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Mithilfe der Checkout-Funktion werden unerwartete Ergebnisse vermieden, die auftreten, wenn zwei Benutzer denselben Datensatz gleichzeitig editieren. Das Auschecken sperrt ein Item, wenn ein Anwender es zur Bearbeitung öffnet. Beim Speichern und Schließen wird es dann wieder freigegeben. Eine sinnvolle Funktion, die wir in diesem Teil der Artikelserie unsere Beispielerweiterung integrieren.<!-- \index{Checkin und Checkout} -->

> Manchmal kommt es vor, dass ein Element als aus gecheckt markiert ist, obwohl es niemand zeitgleich zur Bearbeitung geöffnet hat. Dies passiert in der Regel, wenn ein vorheriges Öffnen nicht korrekt beendet wurde. Beispielsweise wurde der Webbrowser geschlossen, obwohl der Beitrag zur Bearbeitung offen war oder man hat im Menü des Browsers die Zurück-Schaltfläche geklickt anstelle den Beitrag ordnungsgemäß zu schließen.

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t20...t21)[^github.com/astridx/boilerplate/compare/t20...t21] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ sql/updates/mysql/21.0.0.sql

Wie alle Eigenschaften eines Foo-Elementes, wird der Checkout-Zustand in der Datenbank gespeichert. Wir legen zwei Spalten an. Nachfolgend siehst du das Skript, welches bei einer Joomla-Aktualisierung aufgerufen wird.

[administrator/components/com_foos/ sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```xml {numberLines: -2}
<!-- https://codeberg.org/astrid/j4examplecode/raw/branch/t21/src/administrator/components/com_foos/sql/updates/mysql/21.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN `checked_out` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;

ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alias`;

ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);

```

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ forms/foo.xml

Im Formular fügen wir die Felder für das Speichern des Zustands hinzu. Wir verstecken sie mit dem Attribut `hidden`, da sie hier nicht vom Benutzer geändert werden. Joomla setzt die Werte automatisch im Hintergrund.

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
#### administrator/components/ com\_foos/ sql/install.mysql.utf8.sql

Die Datenbankänderungen, die wir oben für die Aktualisierung in der separaten SQL-Datei eingetragen haben, ergänzen wir im SQL-Skript, welches bei einer neuen Installation aufgerufen wird.

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
#### administrator/components/ com\_foos/ src/Model/FoosModel.php

Im Model passen wir alles so an, dass die beiden neuen Spalten korrekt geladen werden.

> Beachte die Änderung `array(...)` in `explode(', ',$this->getState(...)...)`. Wir nutzen nun die PHP-Funktion [`explode`](https://www.php.net/manual/de/function.explode.php) zusammen mit `getState` um das Array für die Datenbankabfrage zu erstellen. Dies ist sicherer und fehlertoleranter.

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
#### administrator/components/ com\_foos/ tmpl/foos/default.php

In die Listenansicht fügen wir keine separate Spalte ein. Beim Namen wird ein Symbol angezeigt, wenn das Element gesperrt ist. Für die Anzeige von diesem wähle ich die Funktion, die Joomla in eigenen Erweiterungen einsetzt: `echo HTMLHelper::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'foos.', true)`. Die übernimmt gleichzeitig die Prüfung, ob der Beitrag freigegeben ist oder nicht.

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

> Ich habe es hier unkompliziert gehalten. Ich prüfe nicht, ob jemand berechtigt ist, einen ausgecheckten Beitrag wieder freizugeben. Die Komponenten in Joomla gestalten dies restriktiver. In `com_contact` sieht die betreffende Zeile beispielsweise so aus: `<?php echo HTMLHelper::*('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'contacts.', $canCheckin); ?>`. Wenn du ebenfalls nicht jedem das Freigeben erlaubst und dies implementieren möchtest, sieh dir die Implementierung in `com_contact` an. Hier findest du den Code, der`$canCheckin` berechnet.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla Published](/images/j4x16x1.png)

3. Öffne ein Item in der Bearbeitungsansicht.

4. Wechsele in ein anderes Browser-Fenster und versuche, das Item erneut zu bearbeiten.

5. Vergewissere dich, dass du ein Symbol siehst, dass dich darauf hinweist, dass dieses Item gesperrt ist und dass ein berechtigter Benutzer die Sperrung aufheben kann.

![Joomla Sperren/Freigeben](/images/j4x25x1.png)
<img src="https://vg08.met.vgwort.de/na/00a7246f50d2452bab7eb21e0c1cde42" width="1" height="1" alt="">
