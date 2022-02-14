---
description: 'desc'
shortTitle: 'short'
date: 2022-02-14
title: 'Allgemeines zu Joomla und Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: allgemeines-zur-arbeit-mit-cassiopeia-und-joomla4
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Jeder Mensch hat seine Vorlieben. Ein Content Management System wie Joomla, kann nicht jede dieser Vorlieben erfüllen. Viele Funktionen werden so angeboten, wie es für die meisten Menschen gut ist. Bei der Arbeit mit Cassiopeia und Joomla gibt es Dinge, die man individuell für sich erweitern oder einstellen kann.

## Praxistipps

## Editor Switcher<!-- \index{Editor!Switcher} -->

Joomal bietet von Hause aus eine Reihe unterschiedlicher Editoren. Jeder Editor bietet Vorteile, hat gleichzeitig allerdings auch Nachteile. Unter Umständen möchte man gar keinen Edtor verwenden.

Wenn ich im Joomla Backend Artikel Texte schreibe, dann verwende ich gerne den [TinyMCE](https://www.tiny.cloud/), weil dieser eine Werkzeugleiste bietet, mit deren Hilfe ich einfache Formatierungen vornehmen kann. Gleichzeitig möchte ich mir gerne den HTML-Quellcode mit Syntax-Highlighting ansehen. Syntax-Highlighting ist im [Codemirror](https://codemirror.net/)[^https://codemirror.net/] umgesetzt. Der TinyMCE bietet dies unter Joomla Anfang 2022 nicht.

Den Editor kann man in der globalen Konfiguration einstellen. Alternativ kann man ihn für einen Benutzer im Benutzer Manager individuell festlegen. Während der Eingabe eines Artikeltextes ist der Wechsel in die globale Konfiguration oder den Benutzermanager umständlich. Deshalb liebe ich das Plugin [Editor Switcher von Bakual](https://github.com/Bakual/editors_switcher)[^https://github.com/bakual/editors_switcher].

Nach der Installation und Aktivierung, stelle ich bei meinem Benutzer den Switcher als Standard-Editior ein.

![Editor Switcher | Edit Style im Joomla Administrationsbereich](/images/switcher_backend_user.png)

Daraufhin ist es während des Schreibens eines Textes im Artikel Manager möglich, den Editor zu wechseln. Ein wechseln in einen anderen Konfigurationsbereich ist nicht erforderlich. Lediglich ein Zwischenspeichern ist notwendig.

![Editor Switcher | Edit Style im Joomla Administrationsbereich](/images/switcher_backend_article.png)
