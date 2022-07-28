---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-01-29
title: 'Pagination'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-pagination
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---

Schnell ist eine Menge Inhalt vorhanden. Die Anzeige aller Elemente auf einer Seite ist nicht sinnvoll. Es wirkt sich negativ auf die Übersicht und die Performance aus. Deshalb teilen wir die Elemente auf Unterseiten auf und fügen eine Paginierung oder Seitennummerierung hinzu. Mit dieser ist die Navigation durch die Seiten möglich. Hierzu werden Links eingefügt. In der Regel befinden diese sich am unteren Seitenende.<!-- \index{Paginierung} --><!-- \index{Seitennummerierung} -->

> Für Ungeduldige: Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://codeberg.org/astrid/j4examplecode/compare/t18...t19)[^github.com/astridx/boilerplate/compare/t18...t19] an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Es kommt keine neue Dateien hinzu.

### Geänderte Dateien

<!-- prettier-ignore -->
#### administrator/components/ com\_foos/ src/View/Foos/HtmlView.php

Wir haben keine speziellen Wünsche. Um die Standard Paginierung anzuzeigen, reichen mehr oder weniger zwei Zeilen. In der View rufst du
`$this->pagination = $this->get('Pagination');` auf, um die Variable `$this->pagination` zu setzen.

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
#### administrator/components/ com\_foos/ tmpl/foos/default.php

Im Template nutzen wir die Methode `getListFooter` der Variable `$this->pagination`. Das war alles!

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

In der globalen Konfiguration kannst du die Anzahl an Elementen bestimmen, die standardmäßig angezeigt wird. Normalerweise ist dies auf 20 Elemente eingestellt.

![Joomla Pagination in der globalen Konfiguration](/images/j4x23x2.png)

> Hast du das Gefühl, dass in diesem Kapitel etwas fehlt? Fragst du dich, wo die ganzen Berechnungen stecken, welche die Seitenlinks erstellen? Dann wirf ein einen Blick in die zwei Dateien: [libraries/src/Pagination/Pagination.php](https://github.com/joomla/joomla-cms/blob/65aaacc28cddfed55804306eb02b407d28884159/libraries/src/Pagination/Pagination.php#L437)[^github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/pagination/pagination.php] und [libraries/src/MVC/Model/ListModel.php](https://github.com/joomla/joomla-cms/blob/b84fc74c882b0b86d220bf6c5b9999e9c1a17958/libraries/src/MVC/Model/ListModel.php#L496)[^github.com/joomla/joomla-cms/blob/4.0-dev/libraries/src/mvc/model/listmodel.php#l496]. Joomla erledigt all die Arbeit für dich, wenn du den Standard nutzt, wenn also konkret in unserem Fall das Model die Datei `libraries/src/MVC/Model/ListModel.php` erweitert.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle so viele Items, dass diese nicht mehr auf einer Seite angezeigt werden. Im unteren Bereich siehst du eine Navigation, welche es dir ermöglicht, durch die Inhalte zu blättern.

![Joomla Pagination](/images/j4x23x1.png)
<img src="https://vg08.met.vgwort.de/na/77029cee191b4fbc9a01f511eb0e65cf" width="1" height="1" alt="">
