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

Durch die Checkout-Funktion werden unerwartete Ergebnisse vermieden, die auftreten, wenn zwei Benutzer denselben Datensatz gleichzeitig editieren. Das Auschecken sperrt ein Item, wenn ein Anwender es zur Bearbeitung öffnet. Beim Speichern und Schließen wird es dann wieder freigegeben. Eine sinnvolle Funktion, die wir in diesem Teil der Artikelserie unsere Beispielerweiterung integrieren.

> Manchmal kommt es vor, dass ein Element als ausgecheckt markiert ist, obwohl es niemand zeitgleich zur Bearbeitung geöffnet hat. Dies passiert in der Regel, wenn ein vorheriges Öffnen nicht korrekt beendet wurde. Beispielsweise wurde der Webbrowser geschlossen, obwohl der Beitrag zur Bearbeitung offen war oder man hat im Menü des Browsers die Zurück-Schaltfläche geklickt.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t20...t21) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/21.0.0.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-5646e047332531426be00a18128422a6)

Wie alle Eigenschaften eines Foo-Elementes, wird der Zustand in der Datenbank gespeichert. Wir legen zwei Spalten an. Nachfolgend siehst du das Skript, welches bei einer Aktualisierung aufgerufen wird.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {numberLines: -2}
<!-- https://raw.githubusercontent.com/astridx/boilerplate/22ad20c84235564c78a59ebe5ca346017870cb43/src/administrator/components/com_foos/sql/updates/mysql/21.0.0.sql -->

ALTER TABLE `#__foos_details` ADD COLUMN `checked_out` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alias`;
ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);
```

### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t20...t21#diff-262e27353fbe755d3813ea2df19cd0ed)

Im Formular fügen wir die Felder für das Speichern des Zustands hinzu. Wir verstecken sie mit dem Attribut hidden, da sie hier nicht vom Benutzer geändert werden. Joomla setzt die Werte automatisch im Hintergrund.

[src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/forms/foo.xml)

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

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t20...t21#diff-896f245bc8e493f91277fd33913ef974)

Die Datenbankänderungen, die wir oben für die Aktualisierung in der separaten Datei eingetragen haben, ergänzen wir im Skript, welches bei einer neuen Installation aufgerufen wird.

[src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/sql/install.mysql.utf8.sql)

```sql {diff}
 ALTER TABLE `#__foos_details` ADD COLUMN  `ordering` int(11) NOT NULL DEFAULT 0 AFTER `alias`;

 ALTER TABLE `#__foos_details` ADD COLUMN  `params` text NOT NULL AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN `checked_out` int(10) unsigned NOT NULL DEFAULT 0 AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD COLUMN `checked_out_time` datetime AFTER `alias`;
+
+ALTER TABLE `#__foos_details` ADD KEY `idx_checkout` (`checked_out`);

```

#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-2daf62ad6c51630353e31eaa3cc28626)

Im Model passen wir alles so an, dass die beiden neuen Spalten korrekt geladen werden.

> Beachte die Änderung `array(...)` in `explode(', ',$this->getState(...)...)`. Wir nutzen nun die PHP-Funktion [`explode`](https://www.php.net/manual/de/function.explode.php) zusammen mit `getState` um das Array für die Datenbankabfrage zu erstellen. Dies ist sicherer und fehlertoleranter.

[src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/src/Model/FoosModel.php)

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
@@ -124,6 +134,13 @@ protected function getListQuery()
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

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t20...t21#diff-3186af99ea4e3321b497b86fcd1cd757)

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/cf5374b964e155e82d4afbeb30362486e6a02227/src/administrator/components/com_foos/tmpl/foos/default.php)

In die Listenansicht fügen wir keine separate Zeile ein. Beim Namen wird ein Symbol angezeigt, wenn das Element gesperrt ist. Für die Anzeige von diesem wähle ich die Funktion, die Joomla in eigenen Erweiterungen einsetzt: `echo HTMLHelper::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'foos.', true)`. Die übernimmt gleichzeitig die Prüfung, ob der Beitrag freigegeben ist oder nicht.

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

> Ich habe es hier unkompliziert gehalten. Ich prüfe nicht, ob jemand berechtigt ist, einen ausgecheckten Beitrag wieder freizugeben. Die Komponenten in Joomla gestalten dies restriktiver. In `com_contact` sieht die betreffende Zeile beispielsweise so aus: `<?php echo HTMLHelper::*('jgrid.checkedout', $i, $item->editor, $item->checked_out_time, 'contacts.', $canCheckin); ?>`. Wenn du ebenfalls nicht jedem das Freigeben erlaubst und dies implementieren möchtest, sieh dir die Implementierung in `com_contact` an - sprich: den Code, der`$canCheckin` berechnet.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

2. The database has been changed, so it is necessary to update it. Open the 'System | Information | Database' area as described in part 16. Select your component and click `Update Structure`.

![Joomla Published](/images/j4x16x1.png)

3. Öffne ein Item in der Bearbeitungsansicht.

4. Wechsele in einen anderen Browser und versuche, das Item erneut zu bearbeiten.

5. Vergewissere dich, dass du ein Symbol siehst, dass dich darauf hinweist, dass dieses Item gesperrt ist und dass ein berechtigter Benutzer die Sperrung aufheben kann.

![Joomla Sperren/Freigeben](/images/j4x25x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
// github.com/astridx/boilerplate/compare/t20...t21.diff

```

## Links
