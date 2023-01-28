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
slug: en/joomla-exkurs-form-fields
langKey: de
categories:
  - Joomla
tags:
  - CMS
  - Joomla
---











Numerous types of form fields are built into Joomla! The following describes the common standard types and their parameters.<!-- \index{form fields} -->

## Form Field Type Subform<!-- \index{form fields!subform} -->

The form field type subform provides a method for using XML forms within another or for reusing forms within an existing form. When the `multiple` attribute is set to `true`, the contained form is repeatable.

The field has two `predefined` layouts for displaying the subform as either a table or a div container, as well as support for custom layouts.

I show an example of an XML field definition for repeatable mode below. Fundamental is the line `multiple="true"`.

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

I have not found an example for `multiple="false"` in Joomla. A use case might be if the number of subforms depends on a condition. Then `multiple="false"` can be useful. 

[Link](https://docs.joomla.org/Subform_form_field_type)[docs.joomla.org/Subform_form_field_type]
