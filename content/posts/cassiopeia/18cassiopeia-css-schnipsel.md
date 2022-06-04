---
description: 'desc'
shortTitle: 'short'
date: 2022-03-02
title: 'Joomla Standardtemplate Cassiopeia - CSS Schnipsel'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: cassiopeia-css-schnipsel
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---

Du möchtest das Cassiopeia Templates in Joomla in der Darstellung geringfügig abändern? Dieses Ziel kann mithilfe der Datei `user.css` erreicht werden. In diesem Beitrag findest du Codeschnipsel für unkomplizierte Anwendungsfälle. 

### Den Nach-oben-Link in Cassiopeia so konfigurieren, dass dieser immer sichtbar ist

Füge den nachfolgenden Code in die Datei `user.css` ein, weenn es dein Ziel ist, den `Nach-oben-Link` in Cassiopeia so zu konfigurieren, dass dieser immer sichtbar ist und nicht erst am Ende der Seite.

```
#back-top { position: fixed; }
```

