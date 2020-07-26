---
date: 2019-12-30
title: 'Frontend Editing'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-frontend-editing
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Es gibt mehrere Gründe dafür, einem Anwender das Editieren im Frontend zu ermöglichen. Zum einen finden Nutzer das benutzerfreundlicher. Oder, einem Administrator ist es wichtig, den Zugriff auf den Administrationsbereich nicht freigeben. Deshalb statten wir unsere Komponente im nächsten Schritt mit der Möglichkeit aus, Items im Frontend zu bearbeiten.

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t24b...t25) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/src/Service/HTML/Icon.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-df719aabca9dd99f45c5a7cf44a85697)

#### [src/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-2c4ef4fe24ac0395496baf9af77926a1)

#### [src/components/com_foos/forms/form.xml](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-25cdf185a10fb87362dd1ac8c2e820bf)

#### [src/components/com_foos/src/Controller/FooController.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-10b4c546e88438ff045b3399d8c287bd)

#### [src/components/com_foos/src/Helper/{Route.php → RouteHelper.php}](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-34c084d2fd21617d91f1dc34b50afe26)

#### [src/components/com_foos/src/Model/FormModel.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-9ddd88cf1e09823f0afae63e91b84e1e)

#### [src/components/com_foos/src/Service/Router.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-6e8e84b1a865c4d53d5a754fe6331601)

#### [src/components/com_foos/src/View/Form/HtmlView.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-a5001e438f2980f6d0c0fa7c774c1849)

#### [src/components/com_foos/tmpl/form/edit.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-043586bc19ba70b8a901bfbf6d75da3e)

#### [src/components/com_foos/tmpl/form/edit.xml](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-541bddf91fcdf3140a8a108f82fa7ab9)

### Geänderte Dateien

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-896f245bc8e493f91277fd33913ef974)

#### [src/administrator/components/com_foos/sql/updates/mysql/24.0.0.sql](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-adb53beac2e127edac496abfa3c7bb0c)

#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-38764f2b1343234561c0d02cd2991ea1)

#### [src/components/com_foos/src/Controller/DisplayController.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-6eec124cbd4d68394d1ef4a09898e702)

#### [src/components/com_foos/tmpl/foo/default.php](https://github.com/astridx/boilerplate/compare/t24b...t25#diff-a33732ebd6992540b8adca5615b51a1f)


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

Installiere deine Komponenten wie in Teil eins beschrieben, nachdem du alle Dateien kopiert hast. Joomla! aktualisiert bei der Installation die Namespaces für dich. Da eine neue Datei hinzugekommen ist, ist dies erforderlich.

2. Erstelle einen Menüpunkt

![Joomla! Frontend Bearbeitung](/images/j4x30x1.png)

3. Öffne den Menüpunkt im Frontend

![Joomla! Frontend Bearbeitung](/images/j4x30x2.png)

4. Stelle sicher, dass du das Icon zum Editieren bei der Detailanszeige eines Elements siehst.

![Joomla! Frontend Bearbeitung](/images/j4x30x3.png)

## Geänderte Dateien

### Übersicht

https://github.com/joomla/joomla-cms/pull/24311/files
