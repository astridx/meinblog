---
date: 2019-12-09
title: 'Die Daten der Datenbank im Frontend nutzen'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: die-daten-der-datenbank-im-frontend-nutzen
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Wir haben mittlerweile eine Datenbank, in der die Daten zur Komponente gespeichert werden. Der nächste Schritt ist, die dynamischen Inhalte im Frontend anzuzeigen. In diesem Teil zeige ich dir, wie du den Content zu einem Element per Menüpunkt ausgibst.

![Joomla Componente Menüpunkt für das Frontend](/images/j4x9x1.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t6b...t7) an und übernimm diese Änderungen in deine Entwicklungsversion.

## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-aa20a48089379605365184314b6cc950)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foo/modal.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-a28edea128d439c54b0508bb61d58f12)

[]()
```

```

#### [src/administrator/components/com_foos/tmpl/foos/modal.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-aeba8d42de72372f42f890d454bf928e)

[]()
```

```

#### [src/media/com_foos/js/admin-foos-modal.js](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-4edb4212d7ab2a7cb25312a4799b1c95)

[]()
```

```

### Geänderte Dateien

#### [src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-1ff20be1dacde6c4c8e68e90161e0578)

[]()
```

```

#### [src/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-599caddf64a6ed0c335bc9c9f828f029)

[]()
```

```

#### [src/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-c77adeff4ff9e321c996e0e12c54b656)

[]()
```

```

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-a33732ebd6992540b8adca5615b51a1f)

[]()
```

```

#### [src/components/com_foos/tmpl/foo/default.xml](https://github.com/astridx/boilerplate/compare/t6b...t7#diff-35fa310ee8efa91ecb0e9f7c604d413f)

[src/administrator/components/com_foos/foos.xml](https://github.com/astridx/boilerplate/blob/ae04129fb1b65a0939d9f968c3658843ddc7292d/src/administrator/components/com_foos/foos.xml)
```
...
    <media folder="media/com_foos" destination="com_foos">
	  	<folder>js</folder>
    </media>
...
```

## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Eine neue Installation ist nicht erforderlich. Verwende die aus dem vorhergehenden Teil weiter.

2. Öffne den Menümanager, um einen Menüpunkt anzulegen. Klicke dazu auf `Menü` und dann auf `All Menu Items`.

Klicke danach auf die Schaltfläche `New` und fülle alle notwendigen Felder aus. Den passenden `Menu Item Typ` findest du über die `Select` Schaltfläche. Überzeuge dich davon, dass du, anstelle des Textfeldes zur Eingabe eines statischen Textes ein Auswahlfeld siehst. Das Auswahlfeld enthält ebenfalls eine Schaltfläche `Select`.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x1.png)

3. Klicke auf das zweite `Select` und wähle ein Item aus.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x2.png)

4. Speichere den Menüpunkt.

5. Wechsele anschließend ins Frontend und überzeuge dich davon, dass der Menüpunkt korrekt angelegt ist und dir den Titel des Elements anzeigt, welches du im Administrationsbereich ausgewählt hattest.

![Joomla Einen Menüpunkt erstellen](/images/j4x9x3.png)

## Geänderte Dateien

### Übersicht
