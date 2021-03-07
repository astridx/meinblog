---
date: 2020-12-06
title: 'Joomla 4.x Tutorial - Extension Development - Extend the Menu Item with a Variable'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: en/den-menupunkt-mit-einer-variablen-versehen
langKey: en
categories:
  - JoomlaEn
  - Code
tags:
  - CMS
  - Joomla
---

Es kommt vor, dass du die Ausgabe im Frontend für einen Menüpunkt individuell gestaltest. Hierzu benötigst du eine Variable. In diesem Teil des Tutorials fügen wir eine Textvariable zum Menüpunkt hinzu und nutzen diese für die Anzeige im Frontend.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t4...t5) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommt keine neue Datei hinzu. Wir ändern ausschließlich.

### Geänderte Dateien

#### [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t4...t5#diff-599caddf64a6ed0c335bc9c9f828f029)

Im Model änderst du die Methode, in der Text für die Ausgabe berechnet wird. Lösche den folgenden Eintrag:

[src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

```php
...
		if (!isset($this->message))
		{
			$this->message = 'Hello Foo!';
		}
...
```

Füge die nachfolgenden Zeilen an der Stelle hinzu:

[src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;

 /**
@@ -33,10 +34,8 @@ class FooModel extends BaseDatabaseModel
 	 */
 	public function getMsg()
 	{
-		if (!isset($this->message))
-		{
-			$this->message = 'Hello Foo!';
-		}
+		$app = Factory::getApplication();
+		$this->message = $app->input->get('show_text', "Hi");

 		return $this->message;
 	}

```

#### [src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t4...t5#diff-35fa310ee8efa91ecb0e9f7c604d413f)

Du speicherst einen Wert über den Menüpunkt im Inputelement, indem du die XML-Datei erweiterst:

[src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/tmpl/foo/default.xml)

```php {diff}
 			<![CDATA[COM_FOOS_FOO_VIEW_DEFAULT_DESC]]>
 		</message>
 	</layout>
+	<!-- Add fields to the request variables for the layout. -->
+	<fields name="request">
+		<fieldset name="request">
+			<field
+				name="show_text"
+				type="text"
+				label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
+				default="Hi"
+			/>
+		</fieldset>
+	</fields>
 </metadata>

```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Wechsele wieder in den Menü Manager und öffne den in Teil 4 erstellen Menüpunkt. Hier siehst du jetzt ein Textfeld, in das du einen beliebigen Text einfügst.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x1.png)

3. Welche jetzt in die Frontendansicht. Überzeuge dich davon, dass der von dir beim Menüpunkt eingegebene Text im Frontend an der richtigen Stelle ausgegeben wird.

![Joomla Request Variable beim Joomla Menü Item](/images/j4x6x2.png)

Ich entschuldige mich für meine Einfallslosigkeit. Dir fallen sicher lustigere oder sinnvollere Beispiele ein. Der Sinn und die Funktion der Variablen werden aber klar, oder?

So erstellst du mehrere Menüpunkte, die jeweils einen anderen Text enthalten. Ein beliebter Anwendungsfall ist es, das Design der Ausgabe mithilfe von Variablen zu beeinflussen. Über die Variable fragst du beispielsweise ab, ob der Inhalt in einer Liste oder in einer Tabelle auszugeben ist.

## Geänderte Dateien

### Übersicht

### Alle Änderungen

```php {diff}
github.com/astridx/boilerplate/compare/t4...t5.diff

```

## Links
