---
description: 'desc'
set: 'en/eine-anleitung-zur-verwendung-des-cassiopeia-templates-fuer-joomla-4-themen'
booklink: 'https://astrid-guenther.de/en/buecher/joomla-4-using-cassiopeia'
syndication:
shortTitle: 'short'
date: 2022-07-10
title: 'Joomla Override Manager in Cassiopeia'
template: post
thumbnail: '../../thumbnails/cassiopeia.png'
slug: en/cassiopeia-overridemanager
langKey: de
categories:
  - Cassiopeia
tags:
  - Template
  - Joomla
  - Cassiopeia
---


Seit Joomla 4 gibt es den Override Manager[^docs.joomla.org/J4.x:Improved_Override_Management]. Meiner Meinung nach stellt dieser nützliche Werkzeuge zur Verfügung, wenn man sie wie vorgesehen verwendet. 

Bei den Werkzeugen handelt es sich konkret um zwei Plugins:
- Installer - Überschreiben
- Quick Icon - Joomla! Überschreibt Update-Benachrichtigung

![Override Manager | Zwei Plugins](/images/overridemanger/0_.png)


Schauen wir uns den Ablauf der Arbeit des Override Managers im Detail an. 


## Wie benutzt man den Override Manager in Joomla 4?

Ich werde dies anhand eines Templates eines Drittanbieters sowie an Cassiopeia betrachten.

### Ausgangssituation

Die folgende Abbildung zeigt meine Beispielinstallation. Die rechte Spalte enthält grüne Symbole: Alles ist auf dem neuesten Stand!

![Override Manager | ](/images/overridemanger/1.png)

Der Override Manager kommt ins Spiel, wenn du im Administrationsbereich auf eine Aktualisierung hingewiesen wirst und diese ausführst. Entweder du aktualisierst Joomla selbst oder eine Erweiterung eines Drittanbieters. 


![Override Manager | ](/images/overridemanger/0.png)


### Was passiert während der Aktualisierung?


Ich aktualisiere Joomla Core in dieser Beispielbeschreibung. Aber die Installation einer Drittanbietererweiterung, erfolgt analog. Während des Updates prüft das Plugin Installer - Override, ob sich eine Template-Datei geändert hat. 

> Zum Beispiel wurde von Joomla 4.1.4 auf Joomla 4.1.5 die Datei `components/com_content/tmpl/article/default.php` via PR 37861[^github.com/joomla/joomla-cms/pull/37861] geändert. 

Wenn eine geänderte Template-Datei gefunden wird, prüft die Installationsroutine, ob in einem installierten Template ein Override dazu vorhanden ist. Template-Dateien sind Dateien, die sich im Verzeichnis `tmpl` befinden. Dabei ist es egal, ob es sich um eine Joomla-Core-Datei oder die eines Drittanbieters handelt. Wird eine solche Datei geändert, wird ein Eintrag in der Datenbank gespeichert, welcher später im Template Manager im Tabulator `Aktualisierte Dateien` angezeigt wird.

### Endzustand

#### Übersicht

Nach einem erfolgreichen Update wird im Joomla-Dashboard eine per Quick Icon eine Übersicht der betroffenen Overrides im Tabulator `Aktualisierte Dateien` angezeigt. 

Die Datei `components/com_content/tmpl/article/default.php` wurde in der Beispielinstallation im Template Cassiopeia überschrieben. Das Drittanbieter-Template hat keinen Override für die Standardansicht eines Artikels. Wenn es nur diese Datei gäbe, würde mir im Dashboard über das Quick Icon 1 Override zur Überprüfung vorgeschlagen. In meiner Beispielinstallation wurden 105 Dateien verändert. So viele Dateien werden in der Regel selten geändert.

![Override Manager | ](/images/overridemanger/2.png)

#### Detaillierte Ansicht

Um mir die Dateien genauer anzuschauen, 
- klicke ich auf das Quick Icon oder 
- öffne über die Navigation auf der linken Seite 
den Template-Manager. 

Der Template-Manager zeigt mir eine Tabelle, in der ich sehen kann, wie viele Overrides in welchem Template betroffen sind.

![Override Manager | ](/images/overridemanger/3.png)

Wenn ich auf mein Drittanbieter-Template klicke, finde ich im Tabulator `Aktualisierte Dateien` keinen Eintrag für die Datei `components/com_content/tmpl/article/default.php`. Das ist korrekt, denn es gibt kein Override für diese Datei in diesem Template.

![Override Manager | ](/images/overridemanger/3a.png)

In Cassiopeia finde ich einen Eintrag zu dieser Datei und klicke ihn an, um mir den Inhalt der Datei genauer anzusehen.

![Override Manager | ](/images/overridemanger/3b.png)


Standardmäßig wird nach dem Klick auf den Namen der Code angezeigt, welcher im Template gespeichert ist. Dieser überschreibt den original Code von Joomla. Der original Code von Joomla wird somit nicht ausgeführt. Auch dann nicht, wenn er aktueller ist und neue Funktionen oder Fehlerbehebungen enthält. Der standardmäßig angezeigt Codeausschnitt ist somit die Version, die von Joomla Core abweicht und deshalb überprüft werden sollte.

![Override Manager | ](/images/overridemanger/4.png)


Ich interessiere mich für die Unterschiede im Code. Ich öffne die Differenzanzeige. Hier sind die Stellen, die sich unterscheiden, markiert.

Die nachfolgende Abbildung zeigt das Folgende: Die - weil zweifach vorhanden - unnötige Prüfung im Codeabschnitt

```
if (!empty($this->item->pagination) && $this->item->pagination && !$this->item->paginationposition && !$this->item->paginationrelative) :
```

wurde in Joomla Core durch 

```
if (!empty($this->item->pagination) && !$this->item->paginationposition && !$this->item->paginationrelative) :
```

ersetzt. Letzter ist rot dargestellt. Der Override im Template wird weiterhin den grünen redundanten Code verwenden, wenn dies nicht korrigiert wird.

![Override Manager | ](/images/overridemanger/4a.png)


> Es ist wichtig zu erkennen, dass der rot markierte Text derjenige ist, der neu zu Joomla Core hinzugefügt wurde. Dieser wird nicht aufgerufen, da er mit dem grün markierten Text überschrieben wird.

#### Der Prüfungvorgang

Ich entscheide, ob ich die Änderung in meine Version übernehmen möchte.

1. Um den Code zu übernehmen, kopiere ich den rot markierten aus dem unteren Fenster mit der Differenzanzeige und füge ihn anstelle des grünen in das obere Editorfeld ein. 
2. Wenn ich alles richtig eingefügt habe, ist die Differenzanzeige nach dem Speichern leer.
3. Zum Schluss klicke ich auf `Schließen` und lösche den Listeneintrag in der Tabelle, die mir alle zu prüfenden Dateien anzeigt.

Wenn ich die Änderung nicht möchte, reicht die letzte der vorherigen Aktionen. Ich schließe das Fenster und lösche den Listeneintrag.

Voilà! Das war alles.

## Über den Tellerrang geblickt

### Für wen ist der Override Manager gedacht?

Im Zusammenhang mit dem Override Manager lese ich oft aus Fragen in Foren, dass die Fragesteller die Overrides nicht selbst erstellt haben. Zum Beispiel:

> "Ich lese nach dem Update auf 4.0.5 die Meldung "2 Override(s) sollte(n) überprüft werden!". Ich habe noch keine Overrides in den Template-Dateien erstellt. Ist dies ein Fehler?"

oder 

> "Meine Joomla 4.1.4 Seite meldet "2 Override(s) sollte(n) überprüft werden!". Ich weiß nicht, wie ich das machen soll?"

In der Regel handelt es sich bei diesen Overrides um Code in Templates von Drittanbietern. Im Idealfall überprüft die Person ein Override, die dieses erstellt hat. In diesem Fall ist es der Entwickler des Templates. In meinen Augen sind in diesem Fall die Template-Entwickler gefragt. Wenn sie es nach der Überprüfung für notwendig erachten etwas zu ändern, dann sollte ein Update des Templates erstellt und über den Joomla-Updater angeboten werden.

> Jemand, der nicht in der Lage ist, PHP-Code zu lesen und anzupassen, nutzt den Override Manager nicht sinnvoll. In diesem Fall empfehle ich, die beiden Plug-ins zu deaktivieren. Ich habe die Erfahrung gemacht, dass die Anzeige verunsichert. Es ist in diesem Fall wichtig, der Person zu vertrauen, die das Template erstellt oder Overrides dafür programmiert hat. Im Falle des Standard-Templates Cassiopeia sind das die Core-Entwickler. Jemand, der Joomla benutzt, vertraut ihnen.

### Die Code Ansichten im Override Manager

Mitunter kommt es vor, dass die Code-Ansicht verwirrend ist. Das liegt meist daran, dass ein Override in vielen Zeilen vom Original abweicht. Hast du das Override selbst erstellt? Prüfe in diesem Fall, ob es sinnvoll ist, dass die Abweichungen angezeigt werden. Ein Override, welches einen neuartigen Entwurf darstellt, wird von der Prüfung ausgenommen, indem ein alternatives Override erstellt wird. Konkret geschieht dies durch die Vergabe eines abweichenden Dateinamens.

Ich habe zum Beispiel eine Ansicht für Vorstandsmitglieder in com_contact, bei der eine Differenzanzeige keinen Sinn macht. Ich weiß: Es werden alle Dateien vom Override-Manager  geprüft, die im Namen mit dem Original übereinstimmen oder lediglich das Datum als Anhängsel haben. Deshalb gebe ich dem Override für die Vorstandsmitglieder einen abweichenden Namen. 

> Bei Dateien mit abweichenden Namen ist es Aufgabe des Entwicklers, diese zu prüfen und auf dem neuesten Stand zu halten. Der Joomla Override Manager ignoriert diese.

![Override Manager | ](/images/overridemanger/5.png)

> Das Prüfen von Änderungen im Templatemanager ist in der aktuellen Version nicht benutzerfreundlich möglich, wenn viele Codezeilen betroffen sind. Meiner Meinung nach können die Ansichten trotzdem als Hinweis genutzt werden. Für die Bearbeitung ist ein Code-Editor[^docs.joomla.org/Setting_up_your_workstation_for_Joomla_development] das geeignetere Werkzeug, wenn viele Zeilen geänderten wurden. 

### Warum ist die Prüfung mittles Override Manager sinnvoll?

#### Sicherheit

Wenn bei einer Aktualisierung eine bösartige Funktion beseitigt wird, erkennst man dies, wenn man den Override Manager verwendet. In meinen Augen ist es nicht abwegig, dass Programmcode korrigiert wird, welcher ein Sicherheitsrisiko beinhaltet. Das Internet entwickelt sich rasant und es gibt immer häufiger Fälle, in denen sich eine Funktion, die als sicher integriert war, später als Sicherheitsrisiko entpuppt. 

#### Fehler

Fehlerkorrekturen und Verbesserungen sind das Tagesgeschäft. Wer dieses nicht verfolgen möchte, sollte folgendes bedenken: 

Eine Website steht nicht still, wenn man den PR "Google wieder über Breadcrumbs glücklich machen"[^github.com/joomla/joomla-cms/pull/37679] nicht in einen möglicherweise vorhandenen eigenen Override integriert. Wenn man es angepasst, behebt man Fehler in den strukturierten Daten, die dazu führen, dass Google Breadcrumbs als ungültig einstufte. 

Oder man wundert sich über fehlende automatische Vorschläge im Finder, der Erweiterung für die Suche. PR 36877[^github.com/joomla/joomla-cms/pull/36877] bietet die Lösung, falls es daran liegt, dass man einen veralteten Override in der eigenen Website integriert.

#### Neue Funktionen

Neben den wichtigeren Punkten wie Fehlerkorrektur und Sicherheit merkt man zeitnah, wenn neue Funktionen hinzu kommen. In Foren wird oft gefragt, warum eine Option auf der eigenen Website nicht angezeigt wird, obwohl sie im Backend aktiviert ist. Nicht selten liegt es am Override, welcher diese Funktion nicht bietet.

<img src="https://vg05.met.vgwort.de/na/19dba80bad8a4e0eb99ca3b941b54939" width="1" height="1" alt="">
