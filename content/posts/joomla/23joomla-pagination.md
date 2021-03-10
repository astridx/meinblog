---
date: 2020-12-23
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Pagination'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-pagination
langKey: de
categories:
  - Code
tags:
  - CMS
  - Joomla
---



Schnell gibt eine Menge Inhalte. Alle Elemente auf einer Seite anzuzeigen ist nicht sinnvoll. Es schadet der Übersicht und der Performance. Deshalb teilen wir die Items auf Unterseiten auf und fügen eine Paginierung zum Navigieren im unteren Bereich hinzu.

![Joomla Pagination](/images/j4x23x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t18...t19) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

Es kommt keine neue Datei hinzu.

### Geänderte Dateien

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t18...t19#diff-8e3d37bbd99544f976bf8fd323eb5250)

Wenn du keine speziellen Wünsche hast, greifst du wieder auf Joomla Funktionen zu. Um die Standard Paginierung angezeigt zu bekommen, reichen mehr oder weniger zwei Zeilen. In der View rufst du
`$this->pagination = $this->get('Pagination');` auf, um die Variable `$this->pagination` zu setzen.

[src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/blob/23dfac84a81f5e050ba474e80f04a8ddf19c4658/src/administrator/components/com_foos/src/View/Foos/HtmlView.php)

```php {diff}
 	protected $items;

+	/**
+	 * The pagination object
+	 *
+	 * @var  \JPagination
+	 */
+	protected $pagination;
+
 	/**
 	 * The model state
 	 *
@@ -75,7 +82,7 @@ class HtmlView extends BaseHtmlView
 	public function display($tpl = null): void
 	{
 		$this->items = $this->get('Items');
-
+		$this->pagination = $this->get('Pagination');
 		$this->filterForm = $this->get('FilterForm');
 		$this->activeFilters = $this->get('ActiveFilters');
 		$this->state = $this->get('State');

```

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t18...t19#diff-3186af99ea4e3321b497b86fcd1cd757)

Im Template nutzen wir die Methode `getListFooter` der Variable `$this->pagination`. Das war alles!

[src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/blob/23dfac84a81f5e050ba474e80f04a8ddf19c4658/src/administrator/components/com_foos/tmpl/foos/default.php)

```php {diff}
 						</tbody>
 					</table>

+					<?php echo $this->pagination->getListFooter(); ?>
+
 				<?php endif; ?>
 				<input type="hidden" name="task" value="">
 				<input type="hidden" name="boxchecked" value="0">

```

> Unter Globale Konfiguration kannst du Anzahl bestimmen, die Standardmäßig angezeigt wird. Üblicherweise steht diese auf 20 Elemente.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne die Ansicht deiner Komponente im Administrationsbereich und erstelle so viele Items, dass diese nicht mehr auf einer Seite angezeigt werden. Im unteren Bereich siehst du eine Navigation, um durch die Inhalte zu blättern.

![Joomla Pagination](/images/j4x23x1.png)

## Geänderte Dateien

### Übersicht

### Alle Änderungen

github.com/astridx/boilerplate/compare/t18...t19.diff

## Links
