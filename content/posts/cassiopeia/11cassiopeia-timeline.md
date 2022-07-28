---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-03-11
title: 'Timeline für neuesten Beiträgen'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-timeline
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Auf einer Website veröffentlichst du Artikel. Du wünschst dir, dass in der Seitenleiste eine Timeline mit den neuesten Beiträgen ausgegeben wird.

Wie die Timeline am Ende aussieht, zeigt das nächste Bild.

![Joomla 4 und Cassiopeia - Timeline mit den neuesten Beiträgen](/images/timeline2.png)

## Timeline in Cassiopeia für die neuesten Beiträge im Modul mod_articles_latest

### Beiträge erstellen

Du hast sicherlich schon einige Beiträge veröffentlicht. Falls nicht legst du zur Demonstration am besten jetzt Beispielbeiträge an.

![Joomla 4 und Cassiopeia - Beiträge anlegen](/images/timeline3.png)

### Modul veröffentlichen

Um das Override sofort zu testen, erstellen wir es. Dazu öffnen wir den Modul Manager.

![Joomla 4 und Cassiopeia - Modul erstellen - Modul Manager öffnen](/images/timeline4a.png)

Wir erstellen das Modul für die rechte Seitenleiste.

![Joomla 4 und Cassiopeia - Modul erstellen - Modul anlegen](/images/timeline4b.png)

Außerdem vergewissern wir uns, dass das Modul unter dem Menüpunkt angezeigt wird, welchen wir später öffnen. Zum Testen veröffentliche ich das Mdoul meist auf allen Menüpositionen.

![Joomla 4 und Cassiopeia - Modul erstellen - Menüzuweiseung](/images/timeline4c.png)

### Template Override

Damit die Timeline so wie wir uns das vorstellen in der rechten Seitenleiste erscheint, erstellen wir ein Override. Dazu klicken wir in der linken Seitenleiste auf _System_ und dann rechts im Bereich _Tempaltes_ auf _Site Template_.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Template Manager öffnen](/images/aut5a.png)

Wir wählen _Cassiopeia_.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Override erstellen](/images/aut5aa.png)

Im Tablulator _Overrides_ erstellen wir nun das _Override_ für die Anzeige der neuesten Beiträge. Dies ist nicht anderes als eine Kopie der bisherigen Ansicht. Diese neu erstellte Kopie können wir abändern. Sie bleibt bei einer Aktualisierung von Joomla erhalten.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - Editor](/images/timeline1.png)

Im Tabulator _Editor_ ist das abändern des Overrides möglich.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - ](/images/aut5c.png)

Kopiere den nachfolgenden Code in die Datei.

```php {numberLines}
<?php
defined('_JEXEC') or die;
?>

<style>
.row-alternating {
  display:flex;
}

.row-alternating:nth-child(2n){
  flex-direction:row-reverse;
}

.row-content, .row-date{
  padding: 0.5em 2em;
  width: 50%;
  display: flex;
  align-items: center;
}

.row-title{
  margin:0;
}

.row-alternating:nth-child(2n) .row-content {
	justify-content: flex-end;
	text-align: right;
}

.row-alternating:nth-child(2n+1) .row-date {
	justify-content: flex-end;
}

.row-alternating:nth-child(2n) .row-date, .row-alternating:nth-child(2n + 1) .row-content{
    position:relative;
    border-left: 1px solid lightgray;
}
.row-alternating:nth-child(2n) .row-date:before, .row-alternating:nth-child(2n + 1) .row-content:before {
    background: lightgray none repeat scroll 0 0;
    border: 4px solid white;
    border-radius: 50%;
    content: "";
    height: 21px;
    width: 21px;
    left: -15px;
    position: absolute;
    top: calc(50% - 10px);
  }

.alternating-container-timeline {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.alternating-category-timeline {
    font-size: 0.7em;
    font-weight: 500;
    text-transform: uppercase;
}
.alternating-day-timeline {
    font-size: 3em;
    margin: 5px 0 10px;
}
.alternating-month-year-timeline {
    font-size: 1.1em;
}
</style>

<div class="latestnews<?php echo $moduleclass_sfx; ?>">
<?php foreach ($list as $item) :  ?>
	<div class="row-alternating">
		<div class="row-date">
		  <div class="alternating-container-timeline">
			<span class="alternating-category-timeline">
			  <?php echo $item->category_title; ?>
			</span>
			<span class="alternating-day-timeline">
			 <?php echo JHtml::_('date', $item->publish_up, "F Y"); ?>
			</span>
			<span class="alternating-month-year-timeline">
			  <?php echo JHtml::_('date', $item->publish_up, "d"); ?>
			</span>
		  </div>
		</div>

		<div class="row-content">
		  <h4 class="row-title" itemprop="name">
			<a href="<?php echo $item->link; ?>" itemprop="url"><?php echo $item->title; ?></a>
		  </h4>
		</div>
	</div>
<?php endforeach; ?>
</div>
```

Die Ansicht der Differenzen<!-- \index{Override!Differenzanzeige} --> unterstützt dich. Hier kannst du dir jederzeit die Unterschiede zur Ansicht im Joomla Core ansehen.

![Joomla 4 und Cassiopeia - Tempalte Override anlegen - ](/images/aut5d.png)

> Das Beispiel habe ich für Joomla Version 3 auf der Website [j-over](https://www.j-over.de/de/template-overrides/timeline-mit-flexbox)[^j-over.de/de/template-overrides/timeline-mit-flexbox] endeckt.

<img src="https://vg04.met.vgwort.de/na/7592a75afe3c499e874eb1cd9bac2e7f" width="1" height="1" alt="">
