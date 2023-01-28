---
description: 'desc'
set: 'der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/buecher/joomla-4-erweiterungen-programmieren'
syndication:
shortTitle: 'short'
date: 2023-01-28
title: 'Exkurs - Formularfelder in Joomla'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-exkurs-form-fields
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Zahlreiche Typen von Formularfeldern sind in Joomla! eingebaut. Im Folgenden werden die gängigen Standardtypen und ihre Parameter beschrieben.<!-- \index{Formularfelder} -->

## Feldtyp für das Unterformular (Subform form field type)<!-- \index{Formularfelder!Unterformular} --><!-- \index{Formularfelder!Subform} -->

Der Formularfeldtyp Unterformular bietet eine Methode zur Verwendung von XML-Formularen innerhalb eines anderen oder zur Wiederverwendung von Formularen innerhalb eines bestehenden Formulars. Wenn das Attribut `multiple` auf `true` gesetzt ist, ist das enthaltene Formular wiederholbar.

Das Feld verfügt über zwei "vordefinierte" Layouts für die Anzeige des Unterformulars entweder als Tabelle oder als Div-Container sowie über Unterstützung für benutzerdefinierte Layouts.

Ein Beispiel für eine XML-Felddefinition für den wiederholbaren Modus zeige ich nachfolgend. Wesentlich ist die Zeile `multiple="true"`.

```xml
<field
  name="domains"
  type="subform"
  label="COM_USERS_CONFIG_FIELD_DOMAINS_LABEL"
  hiddenLabel="true"
  multiple="true"
  layout="joomla.form.field.subform.repeatable-table"
  formsource="administrator/components/com_users/forms/config_domain.xml"
/>
```

Ich habe in Joomla kein Beispiel für `multiple="false"` gefunden. Ein Anwendungsfall wäre vielleicht, wenn die Anzahl der Unterformular von einer Bedingung abhängt. Dann kann `multiple="false"` sinnvoll sein. 

[Link](https://docs.joomla.org/Subform_form_field_type)[docs.joomla.org/Subform_form_field_type]



