---
date: 2019-12-19
title: 'Mehrsprachigkeit'
template: post
thumbnail: '../../thumbnails/joomla.png'
slug: joomla-mehrsprachigkeit
categories:
  - Code
tags:
  - CMS
  - Joomla
---

Mit Joomla! ist es möglich, eine mehrsprachige Website einzurichten, ohne Erweiterungen von Dritten zu installieren. In diesem Tutorial zeige ich dir, wie du deine Komponente so programmierst, dass sie Sprachverknüpfungen unterstützt.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Für Ungeduldige

Sieh dir den geänderten Programmcode in der [Diff-Ansicht](https://github.com/astridx/boilerplate/compare/t14b...t15a) an und übernimm diese Änderungen in deine Entwicklungsversion.


## Schritt für Schritt

### Neue Dateien

#### [src/administrator/components/com_foos/sql/updates/mysql/15.0.0.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-fa2e66efed41380705fb9f91c257ea9c)

#### [src/administrator/components/com_foos/src/Helper/AssociationsHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-89e05e395916539c641802f3bb6165c5)

#### [src/administrator/components/com_foos/tmpl/foo/edit_associations.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-00a681faa92b56a5268be6268afbe52f)

#### [src/components/com_foos/src/Helper/AssociationHelper.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2c4c9f6ac9ee1dafc30e300dc667f323)


#### [src/components/com_foos/src/Helper/Route.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-80bf53de6eba8ceb28ebfb1069c0c304)


### Geänderte Dateien

#### [src/administrator/components/com_foos/forms/foo.xml](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-262e27353fbe755d3813ea2df19cd0ed)

#### [src/administrator/components/com_foos/services/provider.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-6f6a8e05c359293ccc2ab0a2046bce7f)

#### [src/administrator/components/com_foos/sql/install.mysql.utf8.sql](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-896f245bc8e493f91277fd33913ef974)


#### [src/administrator/components/com_foos/src/Extension/FoosComponent.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-38764f2b1343234561c0d02cd2991ea1)


#### [src/administrator/components/com_foos/src/Field/Modal/FooField.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-aa20a48089379605365184314b6cc950)


#### [src/administrator/components/com_foos/src/Model/FooModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-c1b8160bef2d2b36367dc59381d6bcb7)


#### [src/administrator/components/com_foos/src/Model/FoosModel.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-2daf62ad6c51630353e31eaa3cc28626)


#### [src/administrator/components/com_foos/src/Service/HTML/AdministratorService.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-66f0a18f94a16b0a790b4c8f20a4dd6e)


#### [src/administrator/components/com_foos/src/View/Foo/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-d25fe4d29c25ccf10e0ba6ecaf837294)

#### [src/administrator/components/com_foos/src/View/Foos/HtmlView.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-8e3d37bbd99544f976bf8fd323eb5250)

#### [src/administrator/components/com_foos/tmpl/foo/edit.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-1637778e5f7d1d56dd1751af1970f01b)

#### [src/administrator/components/com_foos/tmpl/foos/default.php](https://github.com/astridx/boilerplate/compare/t14b...t15a#diff-3186af99ea4e3321b497b86fcd1cd757)


## Teste deine Joomla-Komponente

1. Installiere deine Komponente in Joomla! Version 4, um sie zu testen:

Kopiere die Dateien im `administrator` Ordner in den `administrator` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `components` Ordner in den `components` Ordner deiner Joomla! 4 Installation.  
Kopiere die Dateien im `media` Ordner in den `media` Ordner deiner Joomla! 4 Installation.

2. Die Datenbank ist geändert worden, so dass es erforderlich ist, sie zu aktualisieren. Öffne den Bereich `System | Information | Database`, wie in Teil 16 beschrieben. Wähle deine Komponente aus und klicke auf `Update Structure`.

![Joomla! Published](/images/j4x16x1.png)

3. Installiere über `System | Install | Languages` mindestens eine weitere Sprache.

4. Stelle über `System | Manage | Plugins` sicher, dass das Plugin `Sample Data - Multilingual` veröffentlicht ist.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x1.png)

5. Wechsele zurück zum `Home Dashboard` und installiere die Beispieldateien `Multilinguale Sample Data`.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x3.png)

6. Öffne die Ansicht eines Items deiner Komponente im Administrationsbereich und überzeuge dich davon, dass der Status `Language` änderbar ist. Ändere diesen von `All` in eine beliebige Sprache.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x2.png)

7. Spiele mit den Sprachverknüpfungen und überzeuge dich davon, dass alles korrekt verknüpft wird.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x4.png)

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x5.png)

8. Erweitere die Tests auf die Komponente `Multilingual Associations`. Diese unterstützt deine Erweiterung ebenfalls.

![Joomla! Sprachverknüpfungen – Multilinguale Associations in deiner Erweiterung](/images/j4x19x6.png)

## Geänderte Dateien

### Übersicht
