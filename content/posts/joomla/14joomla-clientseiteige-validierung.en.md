---
date: 2020-12-14
title: 'Joomla 4.x Tutorial - Extension Development - Client Side Validation'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/joomla-clientseiteige-validierung
langKey: em
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---


Our goal in this part: when we enter a number in the name field, an error message is displayed immediately after we leave the field. In server-side validation, the message was not issued until after the form was sent to the server via the `Save` button.

In client-side validation, we provide a better user experience by responding quickly at the browser level. Here, all inputs in the user's browser are validated immediately. Client-side validation does not require a query to the server, thus reducing the load on the server and the network. This type of validation works on the browser side using scripting languages such as JavaScript or with HTML5 attributes.

For example, if the user enters an invalid email format, we issue an error message immediately after the user moves to the next field. This allows a correction to be made in a timely manner.

Most of the time, client-side validation depends on JavaScript being enabled in the browser. If JavaScript is disabled, user input is sent to the server unchecked. It is possible that this is malicious data! Therefore, client-side validation does not safely protect your component's users from malicious attacks.

> Since both validation methods (server and client) have their own importance, it is recommended to use them side by side. Server-side validation is more secure - client-side validation is more user-friendly!

This part covers the client-side validation in Joomla 4.

## For the impatient

Look at the changed program code in the [Diff View](https://github.com/astridx/boilerplate/compare/t11a...t11b) and apply these changes to your development version.

## Step by step

### New files

Client-side validation is done via a class using a JavaScript file.

#### [src/media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-68de4c4edca27f9e89ecedeef62c11bb)

Here, too, it is a matter of principle. The quality of the validation is secondary. Again, numbers are forbidden in the text field for the name.

[src/media/com_foos/js/admin-foos-letter.js](https://github.com/astridx/boilerplate/blob/562ceedf45834ae7632a38d701c446da682d49fc/src/media/com_foos/js/admin-foos-letter.js)

```js  {numberLines: -2}
// https://raw.githubusercontent.com/astridx/boilerplate/b4078c00700f28ba31229246bd941b24fabf8dbb/src/media/com_foos/js/admin-foos-letter.js

document.addEventListener('DOMContentLoaded', function () {
  'use strict'
  setTimeout(function () {
    if (document.formvalidator) {
      document.formvalidator.setHandler('letter', function (value) {
        var returnedValue = false

        var regex = /^([a-z]+)$/i

        if (regex.test(value)) returnedValue = true

        return returnedValue
      })
      //console.log(document.formvalidator);
    }
  }, 1000)
})
```

### Modified files

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/b4078c00700f28ba31229246bd941b24fabf8dbb/src/administrator/components/com_foos/foos.xml)

In the installation manifest we add `<filename>joomla.asset.json</filename>` so that Joomla knows that the file `joomla.asset.json` belongs to the extension and is copied to the `media/com_foos` directory.

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/b4078c00700f28ba31229246bd941b24fabf8dbb/src/administrator/components/com_foos/foos.xml)

```xml {diff}
 		<folder>tmpl</folder>
 	</files>
     <media folder="media/com_foos" destination="com_foos">
+		<filename>joomla.asset.json</filename>
 		<folder>js</folder>
     </media>
 	<!-- Back-end files -->

```

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-1637778e5f7d1d56dd1751af1970f01b)

The `->useScript('com_foos.admin-foos-letter');` entry adds the JavaScript file responsible for checking to the [Webasset Manager](https://docs.joomla.org/J4.x:Web_Assets/de).

[src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/administrator/components/com_foos/tmpl/foo/edit.php)

```php {diff}

 $wa = $this->document->getWebAssetManager();
 $wa->useScript('keepalive')
-	->useScript('form.validate');
+	->useScript('form.validate')
+	->useScript('com_foos.admin-foos-letter');

 $layout  = 'edit';
 $tmpl = $input->get('tmpl', '', 'cmd') === 'component' ? '&tmpl=component' : '';

```

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-262e27353fbe755d3813ea2df19cd0ed)

We add `class="validate-letter"`, so Joomla knows which CSS class should be checked.

[https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/administrator/components/com_foos/forms/foo.xml)

```xml {diff}
 			name="name"
 			type="text"
 			validate="Letter"
+			class="validate-letter"
 			label="COM_FOOS_FIELD_NAME_LABEL"
 			size="40"
 			required="true"

```

#### [src/media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/compare/t11a...t11b#diff-a0586cff274e553e62750bbea954e91d)

Last but not least, we register the new file under the name `com_foos.admin-foos-letter` in the webasset manager.

[src/media/com_foos/joomla.asset.json](https://github.com/astridx/boilerplate/blob/baea984ae9f1e1ddb7d9f63b78dad48d2c77c525/src/media/com_foos/joomla.asset.json)

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

1. install your component in Joomla version 4 to test it:

Copy the files in the `administrator` folder into the `administrator` folder of your Joomla 4 installation.  
Copy the files in the `components` folder into the `components` folder of your Joomla 4 installation.  
Copy the files in the `media` folder into the `media` folder of your Joomla 4 installation.

A new installation is not necessary. Continue using the files from the previous part. 2.

2. Open the view of your component in the administration area and create a new item or edit an existing one. Enter a number in the text field for the title. 3.

3. Then edit another field, for example set the access to `Registered`.

4. Make sure that at this point **a** warning is displayed.

![Joomla Validation](/images/j4x14x1.png)

## Changed files

### Overview

### All changes

```php {diff}
// github.com/astridx/boilerplate/compare/t11a...t11b.diff

```

## Links
