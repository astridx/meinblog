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

Eine ausführlichere Erklärung des geänderten Programmcodes findest du weiter unten.

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
