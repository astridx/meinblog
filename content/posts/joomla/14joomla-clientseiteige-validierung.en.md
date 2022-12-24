---
description: 'desc'
set: 'en/der-weg-zu-joomla4-erweiterungen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-developing-extensions'
syndication:
shortTitle: 'short'
date: 2022-08-01
title: 'Client Side Validation'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-clientseiteige-validierung
langKey: em
categories:
  - Joomla English
tags:
  - CMS
  - Joomla
---











Our goal in this part: when we enter a number in the name field, an error message is displayed immediately after we leave the field. In server-side validation, the message was not issued until after the form was sent to the server via the `Save` button.<!-- \index{validation (client-side)} -->

In client-side validation, we provide a better user experience by responding quickly at the browser level. Here, all inputs in the user's browser are validated immediately. Client-side validation does not require a query to the server, thus reducing the load on the server and the network. This type of validation works on the browser side using scripting languages such as JavaScript or with HTML5 attributes.

For example, if the user enters an invalid email format, we issue an error message immediately after the user moves to the next field. This allows a correction to be made in a timely manner.

Most of the time, client-side validation depends on JavaScript being enabled in the browser. If JavaScript is disabled, user input is sent to the server unchecked. It is possible that this is malicious data! Therefore, client-side validation does not protect your component's users from malicious attacks.

> Again: Since both validation methods (server and client) have their own importance, it is recommended to use them side by side. Server-side validation is more secure - client-side validation is more user-friendly!

This part covers the client-side validation in Joomla 4.

> For impatient people: Look at the changed program code in the [Diff View](https://codeberg.org/astrid/j4examplecode/compare/t11a...t11b)[^codeberg.org/astrid/j4examplecode/compare/t11a...t11b] and apply these changes to your development version.

## Step by step

### New files

Client-side validation is done via a JavaScript file.

#### media/com_foos/js/admin-foos-letter.js

Again, it is about the principle, just like in the previous chapter. The quality of the validation is in this tutorial secondary and I choose a simple example. Numbers are forbidden in the text field for the name. _Astrid_ is allowed. _Astrid9_ is not allowed.

> In the example I use a [regular expression](https://en.wikipedia.org/wiki/Regular_expression)[^en.wikipedia.org/wiki/regular_expression]. `regex.test(value)` returns `true` if `regex` is equal to `/^([a-z]+)$/i` and `value` does not contain a number. For more information on the test method, see [developer.mozilla.org](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)[^developer.mozilla.org/en/docs/web/javascript/reference/global_objects/regexp/test]. It is not mandatory to use a regular expression. It is only important that `true` is returned for a pass and `false` for a fail.

[media/com_foos/js/admin-foos-letter.js](https://codeberg.org/astrid/j4examplecode/src/branch/t11b/src/media/com_foos/js/admin-foos-letter.js)

```js {numberLines: -2}
// https://codeberg.org/astrid/j4examplecode/raw/branch/t11b/src/media/com_foos/js/admin-foos-letter.js

document.addEventListener('DOMContentLoaded', function(){
	"use strict";
	setTimeout(function() {
		if (document.formvalidator) {
			document.formvalidator.setHandler('letter', function (value) {

				var returnedValue = false;

				var regex = /^([a-z]+)$/i;

				if (regex.test(value))
					returnedValue = true;

				return returnedValue;
			});
			//console.log(document.formvalidator);
		}
	}, (1000));
});

```

> Note: The variable name `returnedValue` is only meant as an example. The name of a variable should explain in real code why it exists, what it does and how it is used.

### Modified files

<!-- prettier-ignore -->
#### administrator/components/com\_foos/foos.xml

In the installation manifest we add `<filename>joomla.asset.json</filename>` so that Joomla knows that the file `joomla.asset.json` belongs to the extension and is copied to the `media/com_foos` directory. We create this file later in this part.

[administrator/components/com_foos/foos.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t11b/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		<folder>tmpl</folder>
 	</files>
     <media folder="media/com_foos" destination="com_foos">
+		<filename>joomla.asset.json</filename>
 		<folder>js</folder>
     </media>
 	<!-- Back-end files -->

```

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ tmpl/foo/edit.php

The entry `->useScript('com_foos.admin-foos-letter');` ensures that the JavaScript file `media/com_foos/js/admin-foos-letter.js`, which is responsible for checking, is applicable via the [webasset manager](https://docs.joomla.org/J4.x:Web_Assets). For this purpose, we will register it later in this chapter via the file `joomla.asset.json`.

```php {diff}

 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
-	->useScript('form.validate');
+	->useScript('form.validate')
+	->useScript('com_foos.admin-foos-letter');

 $layout  = 'edit';
 $tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';

```

<!-- prettier-ignore -->
#### administrator/components/com\_foos/ forms/foo.xml

We add `class="validate-letter"`, so Joomla knows which CSS class should be checked. Joomla sets this class when creating the field. See for yourself by opening the form in the backend and checking out the source code.

[administrator/components/com_foos/forms/foo.xml](https://codeberg.org/astrid/j4examplecode/src/branch/t11b/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			name="name"
 			type="text"
 			validate="Letter"
+			class="validate-letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
 			size="40"
 			required="true"

```

#### media/com_foos/joomla.asset.json

Last but not least, we register the new file under the name `com_foos.admin-foos-letter` in the webasset manager.

[media/com_foos/joomla.asset.json](https://codeberg.org/astrid/j4examplecode/src/branch/t11b/src/media/com_foos/joomla.asset.json)

```json {diff}

"description": "Joomla CMS",
   "license": "GPL-2.0-or-later",
   "assets": [
+    {
+      "name": "com_foos.admin-foos-letter",
+      "type": "script",
+      "uri": "com_foos/admin-foos-letter.js",
+      "dependencies": [
+        "core"
+      ],
+      "attributes": {
+        "defer": true
+      }
+    },
     {
       "name": "com_foos.admin-foos-modal",
       "type": "script",

```

## Test your Joomla component

1. install your component in Joomla version 4 to test it: Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation. Copy the files in the `media` folder into the `media` folder of your Joomla 4 installation. A new installation is not necessary. Continue using the files from the previous part. 2.

2. Open the view of your component in the administration area and create a new item or edit an existing one. Enter a number in the text field for the title. 3.

3. Then edit another field, for example set the access to `Registered`.

4. Make sure that at this point **a** warning is displayed.

![Joomla Validation](/images/j4x14x1.png)
<img src="https://vg08.met.vgwort.de/na/7a3504bcb94d409aa8b6bb9ae797110d" width="1" height="1" alt="">
