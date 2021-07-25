---
date: 2020-12-06
title: 'Joomla 4.x-Tutorial - Entwicklung von Erweiterungen - Den Menüpunkt mit einer Variablen erweitern'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: den-menupunkt-mit-einer-variablen-versehen
langKey: de
categories:
  - JoomlaDe
  - Code
tags:
  - CMS
  - Joomla
---

Es kommt vor, dass du die Ausgabe im Frontend für einen Menüpunkt individuell gestaltest. Hierzu benötigst du eine Variable. In diesem Teil des Tutorials fügen wir eine Textvariable zum Menüpunkt hinzu und nutzen diese für die Anzeige im Frontend.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t4...t5)[^github.com/astridx/boilerplate/compare/t4...t5] an und übernimm diese Änderungen in deine Entwicklungsversion.

In der nachfolgenden Übersicht sind die geänderten Dateien hervorgehoben.

![Übersicht über die in diesem Kapitel bearbeiteten Dateien](/images/tree5.png)

## Schritt für Schritt

### Neue Dateien

In diesem Kapitel kommt keine neue Datei hinzu. Wir ändern ausschließlich Dateien.

### Geänderte Dateien

<!-- prettier-ignore -->
#### [components/com\_foos/ src/Model/ FooModel.php](https://github.com/astridx/boilerplate/compare/t4...t5#diff-599caddf64a6ed0c335bc9c9f828f029)

Im Model änderst du die Methode, in welcher der Text für die Ausgabe berechnet wird. Lösche den folgenden Eintrag:

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

```php
...
		if (!isset($this->message))
		{
			$this->message = 'Hello Foo!';
		}
...
```

Füge die nachfolgenden Zeilen an der Stelle hinzu:

```php
...
		$app = Factory::getApplication();
		$this->message = $app->input->get('show_text', "Hi");
...
```

> Du kannst bei der neuen Variante auf die Überprüfung `if (!isset($this->message))` verzichten, weil die Anweisung `get('show_text', "Hi");` den Fehler abfängt, der auftritt, wenn der Parameter `show_text` nicht gesetzt ist. Immer dann, wenn der Wert `show_text` nicht gesetzt ist, wird der zweite Parameter `"Hi"` als Standard verwendet.

Zusammen sieht die Datei in der Diff-Ansicht wie folgt aus:

[components/com_foos/ src/Model/FooModel.php](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/src/Model/FooModel.php)

```php {diff}
\defined('_JEXEC') or die;

+use Joomla\CMS\Factory;
 use Joomla\CMS\MVC\Model\BaseDatabaseModel;

 /**

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

Soweit, so gut. Es fehlt noch die Möglichkeit, den Wert für `show_text` beim Menüpunkt im Backend zu konfigurieren. Diese implementieren wir jetzt in der Datei `default.xml`.

<!-- prettier-ignore -->
#### [components/com\_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t4...t5#diff-35fa310ee8efa91ecb0e9f7c604d413f)

Du bietest in deiner Erweiterung die Möglichkeit einen Wert beim Menüpunkt zu speichern, indem du die XML-Datei um ein Inputelement erweiterst. Der nachfolgende Code zeigt dir, wie du ein Eingabefeld für Text hinzufügst.

[components/com_foos/ tmpl/foo/default.xml](https://github.com/astridx/boilerplate/blob/56a9f22f960df214695b4719046f9573fa354451/src/components/com_foos/tmpl/foo/default.xml)

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

Den XML Eintrag

```xml
<field
	name="show_text"
	type="text"
	label="COM_FOOS_FIELD_TEXT_SHOW_LABEL"
	default="Hi"
/>
```

wandelt Joomla für die Ausgabe im Backendformular in den folgenden HTML-Code.

```html
<div class="control-label">
  <label id="jform_request_show_text-lbl" for="jform_request_show_text">
    COM_FOOS_FIELD_TEXT_SHOW_LABEL</label
  >
</div>
<div class="controls has-success">
  <input
    type="text"
    name="jform[request][show_text]"
    id="jform_request_show_text"
    value="Hi"
    class="form-control valid form-control-success"
    aria-invalid="false"
  />
</div>
```

> Wir nutzen mit `type="text"` eines der einfachsten Formularfelder, nämlich das vom Typ `text`. Zahlreiche Typen von Formularfeldern sind in Joomla eingebaut. Die Joomla Dokumentation listet diese Standardtypen auf. Sieh dir die Tabelle auf der Website [docs.joomla.org/Form_field/de](https://docs.joomla.org/Form_field/de) an. Oft kannst du mit einem speziellen Feld eine besondere Anforderung umsetzen.

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla Version 4, um sie zu testen: Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla 4 Installation. Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Wechsele in den Menü Manager und öffne einen Menüpunkt oder erstelle einen neuen. Hier siehst du jetzt ein Textfeld, in das du einen beliebigen Text einfügst.

![Joomla Request Variable beim Joomla Menü Item - Backend](/images/j4x6x1.png)

3. Wechsele jetzt in die Frontendansicht. Überzeuge dich davon, dass der von dir beim Menüpunkt eingegebene Text im Frontend in der richtigen Variante ausgegeben wird.

![Joomla Request Variable beim Joomla Menü Item - Frontend](/images/j4x6x2.png)

Dir fallen sicher praktischere Beispiele ein. Der Sinn und die Funktion der Variablen werden im Beispiel klar.

4. Erstelle mehrere Menüpunkte, die jeweils einen anderen Text oder Typ enthalten. Gibt nicht lediglich den Text im Frontend aus, gestalte die Ausgabe mithilfe von [bedingten Anweisungen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/if...else)[^developer.mozilla.org/de/docs/web/javascript/reference/statements/if...else]. Ein beliebter Anwendungsfall ist es, das Design der Ausgabe mithilfe von Variablen zu beeinflussen. Über die Variable fragst du beispielsweise ab, ob der Inhalt in einer Liste oder in einer Tabelle auszugeben ist.
