---
date: 2020-09-25
title: 'Erste Schritte mit Barrierefreiheit'
template: post
thumbnail: '../thumbnails/css.png'
slug: erste-schritte-a11y
categories:
  - Code
  - Popular
tags:
  - Grundlagen
  - CSS
  - HTML
  - a11y
  - Barrierefreiheit
---

Barrierefreiheit bedeutet im Allgemeinen, über Webinhalte und eine
Benutzeroberfläche zu verfügen, die von einem breiten Publikum verstanden,
navigiert und interagiert werden. Dies schließt Menschen
mit Seh-, Hör-, Mobilitäts- oder kognitiven Behinderungen ein – und Maschinen.

Websites sind für alle zugänglich, unabhängig von den Fähigkeiten oder
Ressourcen eines Benutzers. Einige verlassen sich auf unterstützende Technologien
wie einen Bildschirmleser oder eine Spracherkennungssoftware.
Andere navigieren nur mit einer Tastatur durch eine Site.
Die Berücksichtigung der Bedürfnisse verschiedener Benutzer bei der Entwicklung Ihres Projekts leistet einen großen Beitrag zur Schaffung eines offenen Webs.

Unter anderem sind folgende drei Fragen zu beachten:

1. Verfügt man über organisierten Code, der das Markup korrekt verwendet?
2. Stellt man sicher, dass Textalternativen für Nicht-Text- und visuelle Inhalte vorhanden sind?
3. Erstellt man eine unkompliziert zu navigierende Seite, die für die Tastatur geeignet ist?

Zugängliche Webinhalte sind eine ständige Herausforderung.
Eine Ressource sind die Web Content Accessibility Guidelines (WCAG) des
W3-Konsortiums. Sie setzen den internationalen Standard für
Barrierefreiheit und bieten eine Reihe von Kriterien, anhand derer man
seine Arbeit überprüft.

#### Voraussetzungen

Interesse an meiner Sammlung.

#### Ziel

Ein Überblick.

## Zugänglichkeit - Barrierefreiheit - a11y

### Textalternative für Bilder

Alternativtext beschreibt den Inhalt des Bildes und bietet eine Textalternative dafür.
Dies hilft in Fällen, in denen das Bild nicht geladen wird oder von einem Benutzer nicht gesehen wird. Es wird von Suchmaschinen verwendet, um zu verstehen, was ein Bild enthält, um es in die Suchergebnisse aufzunehmen. Hier ist ein Beispiel:

```
<img src="logo.jpeg" alt="Firmenlogo">
```

Menschen mit Sehbehinderungen verlassen sich auf Screenreader.
Sie erhalten keine Informationen, wenn Inhalte nur visuell dargestellt werden.
Bei Bildern greifen Bildschirmleser auf das `alt`-Attribut und dessen Inhalt zu.

Sinnvoller Alternativtext bietet dem Leser eine kurze Beschreibung des Bildes.
Ein Bild enthält idealerweise immer ein alt-Attribut. Gemäß der HTML5-Spezifikation wird dies als obligatorisch angesehen.

### Leerer Alt-Text

Manchmal werden Bilder mit einer Beschriftung gruppiert, die sie bereits beschreibt, oder sie werden nur zur Dekoration verwendet.
In diesen Fällen kann alternativer Text überflüssig oder unnötig erscheinen.

In Situationen, in denen ein Bild bereits mit Textinhalt erklärt wurde oder einer Seite keine Bedeutung hinzufügt,
benötigt das img weiterhin ein alt-Attribut, kann jedoch auf eine leere Zeichenfolge gesetzt werden. Hier ist ein Beispiel:

```
<img src="dekoration.jpeg" alt="">

```

Hintergrundbilder fallen normalerweise auch unter das Etikett "dekorativ".
Sie werden jedoch normalerweise mit CSS-Regeln angewendet und sind daher nicht Teil des Markup-Screenreader-Prozesses.

> Bei Bildern mit einer Beschriftung möchten Sie möglicherweise weiterhin Alternativtext einfügen,
> da Suchmaschinen den Inhalt des Bildes katalogisieren können.

### Überschriften

Überschriften (Elemente h1 bis h6) sind Tags, mit denen Inhalten Struktur und Beschriftung verleihen wird.
Screenreader können so eingestellt werden, dass nur die Überschriften auf einer Seite gelesen werden,
sodass der Benutzer eine Zusammenfassung erhält. Dies bedeutet, dass es wichtig ist, dass die Überschriften-Tags
in Ihrem Markup eine semantische Bedeutung haben und sich aufeinander beziehen, und nicht nur aufgrund
ihrer Größe ausgewählt werden.

Semantische Bedeutung bedeutet, dass das Tag, das wir für Inhalte verwenden, die Art der darin enthaltenen Informationen angibt.

Wenn wir einen Text schreiben, ist es nicht sinnvoll, die Schlussfolgerung als Unterabschnitt des Körpers in
dir Gliederung aufzunehmen. Es sollte ein eigener Abschnitt sein.
Ebenso müssen die Überschriften-Tags auf einer Webseite in der richtigen Reihenfolge angeordnet sein und die
hierarchischen Beziehungen Ihres Inhalts angeben.

Überschriften mit gleichem (oder höherem) Rang beginnen neue implizite Abschnitte,
Überschriften mit niedrigerem Rang beginnen Unterabschnitte des vorherigen.

Beispielsweise würde eine Seite mit einem h2-Element, gefolgt von mehreren mit h4-Tags gekennzeichneten Unterabschnitten,
einen Benutzer eines Bildschirmlesegeräts verwirren. Mit sechs Auswahlmöglichkeiten ist es verlockend,
ein Tag zu verwenden, da es in einem Browser besser aussieht. Wir können jedoch die relative Größe mithilfe von CSS bearbeiten.

Ein letzter Punkt: Jede Seite sollte immer ein (und nur ein) h1-Element enthalten,
das das Hauptthema Ihres Inhalts ist. Diese und die anderen Überschriften werden teilweise von Suchmaschinen verwendet,
um das Thema der Seite zu verstehen.

### Hauptelement <main>

HTML5 führte eine Reihe neuer Elemente ein, die Entwicklern mehr Optionen bieten und gleichzeitig Eingabehilfen enthalten.
Diese Tags umfassen unter anderem `main`, `header`, `footer`, `nav`, `article` und `section`.

Standardmäßig rendert ein Browser diese Elemente ähnlich wie das bescheidene `div`.
Wenn Sie sie jedoch gegebenenfalls verwenden, erhalten Sie in Ihrem Markup eine zusätzliche Bedeutung.
Der Tag-Name allein kann die Art der darin enthaltenen Informationen angeben, wodurch dieser Inhalt eine
semantische Bedeutung erhält. Assistive Technologien können auf diese Informationen zugreifen,
um ihren Benutzern eine bessere Seitenübersicht oder Navigationsoptionen zu bieten.

Das Hauptelement wird verwendet, um den Hauptinhalt zu verpacken, und es sollte nur einen pro Seite geben.
Es soll die Informationen umgeben, die sich auf das zentrale Thema Ihrer Seite beziehen. Es ist nicht dazu gedacht,
Elemente einzuschließen, die sich über Seiten hinweg wiederholen, wie z. B. Navigationslinks oder Banner.

Das `main`-Tag verfügt außerdem über eine eingebettete Orientierungspunktfunktion, mit deren Hilfe die Hilfstechnologie
schnell zum Hauptinhalt navigieren kann. Wenn Sie oben auf einer Seite jemals einen Link "Zum Hauptinhalt springen" gesehen
haben, bietet die Verwendung eines Haupt-Tags den unterstützenden Geräten automatisch diese Funktionalität.

### Artikel Element <article>

Artikel ist ein weiteres neues HTML5-Element, das Ihrem Markup eine semantische Bedeutung verleiht.
Artikel ist ein Abschnittselement und wird verwendet, um unabhängige, in sich geschlossene Inhalte zu verpacken.
Das Tag eignet sich gut für Blogeinträge, Forenbeiträge oder Nachrichtenartikel.

Die Entscheidung, ob Inhalte für sich allein stehen können, ist normalerweise eine Entscheidung,
aber es gibt ein paar einfache Tests, die wir verwenden können. Fragen Sie sich, ob Sie den gesamten umgebenden
Kontext entfernt haben. Wäre dieser Inhalt noch sinnvoll? Würde der Inhalt für Text auch in einem RSS-Feed Bestand haben?

Denken Sie daran, dass Menschen, die unterstützende Technologien verwenden, auf organisierte, semantisch bedeutsame Markups angewiesen sind, um Ihre Arbeit besser zu verstehen.

#### Hinweis zu section und div

Das <section>-Element ist ebenfalls neu in HTML5 und hat eine etwas andere semantische Bedeutung als der Artikel.
Ein Artikel dient zum eigenständigen Inhalt und ein Abschnitt zum Gruppieren thematisch verwandter Inhalte.
Sie können je nach Bedarf ineinander verwendet werden. Wenn beispielsweise ein Buch der Artikel ist, ist jedes Kapitel ein Abschnitt.
Wenn zwischen Inhaltsgruppen keine Beziehung besteht, verwenden wir ein div.

- <div> - gruppiert Inhalte
- <section> - gruppiert verwandte Inhalte
- <article> - gruppiert unabhängige, in sich geschlossene Inhalte

### Header

Das nächste HTML5-Element, das semantische Bedeutung hinzufügt und die Zugänglichkeit verbessert, ist das Header-Tag.
Es wird verwendet, um einführende Informationen oder Navigationslinks für das übergeordnete Tag zu verpacken,
und funktioniert gut bei Inhalten, die oben auf mehreren Seiten wiederholt werden.

Der Header teilt die eingebettete Landmark-Funktion, die Sie gesehen haben, mit main, sodass unterstützende Technologien
schnell zu diesem Inhalt navigieren können.

> Der Header ist für die Verwendung im Body-Tag unseres HTML-Dokuments vorgesehen.
> Dies unterscheidet sich von dem head-Element, das den Titel der Seite, Metainformationen usw. enthält.

### Nav

Das nav-Element ist ein weiteres HTML5-Element mit der eingebetteten Orientierungspunktfunktion
für die einfache Navigation auf dem Bildschirmleser. Dieses Tag soll die Hauptnavigationslinks auf unserer Seite umschließen.

Wenn sich am Ende der Seite wiederholt Site-Links befinden, müssen diese nicht ebenfalls mit einem Navi-Tag markiert werden.
Die Verwendung einer Fußzeile ist ausreichend.

### Footer

Ähnlich wie bei Kopf- und Navigationselementen verfügt das Fußzeilenelement über eine integrierte Orientierungspunktfunktion,
mit der Hilfsgeräte schnell dorthin navigieren können. Es wird hauptsächlich verwendet, um Copyright-Informationen
oder Links zu verwandten Dokumenten zu enthalten, die normalerweise am Ende einer Seite stehen.

### Audio-Inhalte

Das Audioelement von HTML5 gibt eine semantische Bedeutung, wenn es Sound- oder Audio-Stream-Inhalte in Ihr Markup einbindet.
Audioinhalte benötigen auch eine Textalternative, um für gehörlose oder schwerhörige Menschen zugänglich zu sein.
Dies kann mit einem Text in der Nähe auf der Seite oder einem Link zu einem Transkript erfolgen.

Das Audio-Tag unterstützt das Steuerelementattribut. Dies zeigt die Standardeinstellungen für Wiedergabe,
Pause und andere Steuerelemente des Browsers an und unterstützt Tastaturfunktionen.
Dies ist ein boolesches Attribut, d.h. es benötigt keinen Wert. Durch das Vorhandensein auf dem Tag wird die Einstellung aktiviert.

Hier ist ein Beispiel:

```
<audio id="tonClip" controls>
  <source src="audio/ton.mp3" type="audio/mpeg" />
  <source src="audio/ton.ogg" type="audio/ogg" />
</audio>
```

> Multimedia-Inhalte haben visuelle als auch akustische Komponenten.
> Es benötigt synchronisierte Untertitel und ein Transkript, damit Benutzer mit visuellen
> und/oder akustischen Beeinträchtigungen darauf zugreifen können.
> Ein ist Webentwickler nicht für die Erstellung der Untertitel oder des Transkripts verantwortlich, sondern muss wissen,
> dass diese enthalten sind.

### figure-Element

HTML5 führte das figure-Element zusammen mit der zugehörigen figcaption ein.
Zusammengenommen umschließen diese Elemente eine visuelle Darstellung zusammen mit ihrer Beschriftung.
Dies erhöht die Zugänglichkeit um das Doppelte, indem sowohl verwandte Inhalte semantisch gruppiert
als auch eine Textalternative bereitgestellt werden, die die Abbildung erklärt.

Bei Datenvisualisierungen wie Diagrammen kann die Beschriftung verwendet werden,
um die Trends oder Schlussfolgerungen für Benutzer mit Sehbehinderungen kurz zu notieren.
Eine weitere Herausforderung besteht darin, eine Tabellenversion der Diagrammdaten für Benutzer von
Bildschirmleseprogrammen außerhalb des Bildschirms (mithilfe von CSS) zu verschieben.

Hier ein Beispiel:

```
<figure>
  <img src="haus.jpeg" alt="Foto eines runden Hauses">
  <br>
  <figcaption>
    Das runde Haus in Köln.
  </figcaption>
</figure>
```

### Formularfeldern

Die Verbesserung der Zugänglichkeit mit semantischem HTML-Markup gilt sowohl für die Verwendung geeigneter Tag-Namen als auch für Attribute. Die nächsten Herausforderungen decken einige wichtige Szenarien ab, bei denen Attribute in Formularen verwendet werden.

Das Beschriftungs-Tag umschließt den Text für ein bestimmtes Formularsteuerelement, normalerweise den Namen oder die Beschriftung für eine Auswahl. Dies bindet die Bedeutung an das Element und macht das Formular besser lesbar. Das for-Attribut auf einem Label-Tag verknüpft dieses Label explizit mit dem Formularsteuerelement und wird von Bildschirmleseprogrammen verwendet.

In einer Lektion im Abschnitt "Grundlegendes HTML" haben Sie Informationen zu Optionsfeldern und deren Beschriftungen erhalten. In dieser Lektion haben wir das Optionsfeld-Eingabeelement zusammen mit dem Beschriftungstext in ein Beschriftungselement eingeschlossen, um den Text anklickbar zu machen. Eine andere Möglichkeit, dies zu erreichen, ist die Verwendung des for-Attributs, wie in dieser Lektion erläutert.

Der Wert des for-Attributs muss mit dem Wert des id-Attributs des Formularsteuerelements übereinstimmen. Hier ist ein Beispiel:

```
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
</form>
```

### Optionsfelder

Das nächste Formularthema behandelt die Zugänglichkeit von Optionsfeldern. Jede Auswahl erhält ein Etikett mit einem for-Attribut, das an die ID des entsprechenden Elements gebunden ist, wie in der letzten Herausforderung behandelt. Da Optionsfelder häufig in einer Gruppe enthalten sind, in der der Benutzer eine auswählen muss, gibt es eine Möglichkeit, semantisch anzuzeigen, dass die Auswahlmöglichkeiten Teil eines Satzes sind.

Das Fieldset-Tag umgibt die gesamte Gruppierung von Optionsfeldern, um dies zu erreichen. Oft wird ein Legenden-Tag verwendet, um eine Beschreibung für die Gruppierung bereitzustellen, die von Bildschirmleseprogrammen für jede Auswahl im Feldsatzelement gelesen wird.

Der Fieldset-Wrapper und das Legenden-Tag sind nicht erforderlich, wenn die Auswahlmöglichkeiten selbsterklärend sind, z. B. bei einer Geschlechtsauswahl. Die Verwendung einer Beschriftung mit dem Attribut for für jedes Optionsfeld ist ausreichend.

Hier ist ein Beispiel:

```
<form>
  <fieldset>
    <legend>Choose one of these three items:</legend>
    <input id="one" type="radio" name="items" value="one">
    <label for="one">Choice One</label><br>
    <input id="two" type="radio" name="items" value="two">
    <label for="two">Choice Two</label><br>
    <input id="three" type="radio" name="items" value="three">
    <label for="three">Choice Three</label>
  </fieldset>
</form>
```

### Datumsauswahl

Formulare enthalten häufig das Eingabefeld, mit dem verschiedene Formularsteuerelemente erstellt werden können. Das type-Attribut für dieses Element gibt an, welche Art von Eingabe erstellt wird.

Möglicherweise haben Sie den Text und die Übermittlung von Eingabetypen bei früheren Herausforderungen bemerkt, und HTML5 hat eine Option zum Angeben eines Datumsfelds eingeführt. Abhängig von der Browserunterstützung wird im Eingabefeld eine Datumsauswahl angezeigt, wenn diese scharfgestellt ist. Dies erleichtert allen Benutzern das Ausfüllen eines Formulars.

Bei älteren Browsern wird standardmäßig Text verwendet, sodass Benutzer das erwartete Datumsformat in der Beschriftung oder für alle Fälle als Platzhaltertext anzeigen können.

Hier ist ein Beispiel:

```
<label for="input1">Enter a date:</label>
<input type="date" id="input1" name="input1">
```

### Standardisieren Sie die Zeiten mit dem HTML5-Datum / Uhrzeit-Attribut

In Fortsetzung des Datumsthemas führte HTML5 das Zeitelement zusammen mit einem Datum / Uhrzeit-Attribut ein, um die Zeiten zu standardisieren. Dies ist ein Inline-Element, das ein Datum oder eine Uhrzeit auf einer Seite umschließen kann. Ein gültiges Format dieses Datums wird vom Attribut datetime gespeichert. Dies ist der Wert, auf den Hilfsmittel zugreifen. Es hilft, Verwirrung zu vermeiden, indem eine standardisierte Version einer Zeit angegeben wird, selbst wenn diese im Text informell oder umgangssprachlich geschrieben ist.

Hier ist ein Beispiel:

```
<p>Nina hatte <time datetime="2013-02-13">letzten Mittwoch</time> ihren letzten Schultag.</p>
```

### Benutzerdefiniertes CSS

Haben Sie bemerkt, dass bei allen angewandten Eingabehilfen bisher kein CSS verwendet wurde? Dies soll die Wichtigkeit einer logischen Dokumentskizze und die Verwendung semantisch aussagekräftiger Tags um Ihren Inhalt zeigen, bevor der Aspekt des visuellen Designs eingeführt wird.

Die Magie von CSS kann jedoch auch die Zugänglichkeit Ihrer Seite verbessern, wenn Sie Inhalte visuell ausblenden möchten, die nur für Bildschirmleser bestimmt sind. Dies geschieht, wenn Informationen in einem visuellen Format vorliegen (wie ein Diagramm), Benutzer von Bildschirmleseprogrammen jedoch eine alternative Präsentation (wie eine Tabelle) benötigen, um auf die Daten zugreifen zu können. CSS wird verwendet, um die Nur-Bildschirmleser-Elemente außerhalb des visuellen Bereichs des Browserfensters zu positionieren.

Hier ist ein Beispiel für die CSS-Regeln, mit denen dies erreicht wird:

```
.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  top: auto;
  overflow: hidden;
}

```

> Hinweis: Die folgenden CSS-Ansätze bewirken NICHT dasselbe: Anzeige: keine; oder Sichtbarkeit: versteckt; versteckt Inhalte für alle, einschließlich Benutzer von Bildschirmleseprogrammen

     Nullwerte für Pixelgrößen, z. B. Breite: 0px; Höhe: 0px; Entfernt dieses Element aus dem Fluss Ihres Dokuments, was bedeutet, dass Bildschirmleser es ignorieren

### Verbessern Sie die Lesbarkeit mit kontrastreichem Text

Ein geringer Kontrast zwischen den Vordergrund- und Hintergrundfarben kann das Lesen von Text erschweren. Ausreichender Kontrast verbessert die Lesbarkeit Ihrer Inhalte, aber was genau bedeutet "ausreichend"?

Die Richtlinien für die Barrierefreiheit von Webinhalten (WCAG) empfehlen ein Kontrastverhältnis von mindestens 4,5 zu 1 für normalen Text. Das Verhältnis wird berechnet, indem die relativen Luminanzwerte zweier Farben verglichen werden. Dies reicht von 1: 1 für dieselbe Farbe oder ohne Kontrast bis 21: 1 für Weiß gegen Schwarz, den stärksten Kontrast. Es gibt viele online verfügbare Tools zur Kontrastprüfung, die dieses Verhältnis für Sie berechnen.

### Vermeiden Sie Probleme mit Farbenblindheit, indem Sie ausreichend Kontrast verwenden

Farbe ist ein großer Teil des visuellen Designs, aber ihre Verwendung führt zu zwei Zugänglichkeitsproblemen. Erstens sollte Farbe allein nicht als einzige Möglichkeit verwendet werden, wichtige Informationen zu übermitteln, da Benutzer von Bildschirmleseprogrammen diese nicht sehen. Zweitens benötigen Vordergrund- und Hintergrundfarben einen ausreichenden Kontrast, damit farbenblinde Benutzer sie unterscheiden können.

Frühere Herausforderungen betrafen Textalternativen zur Lösung des ersten Problems. Bei der letzten Herausforderung wurden Tools zur Kontrastprüfung eingeführt, um bei der zweiten zu helfen. Das von der WCAG empfohlene Kontrastverhältnis von 4,5: 1 gilt sowohl für die Verwendung von Farben als auch für Graustufenkombinationen.

Benutzer von Farbenblindheit haben Probleme, einige Farben von anderen zu unterscheiden - normalerweise in Farbton, manchmal aber auch in Helligkeit. Sie können sich daran erinnern, dass das Kontrastverhältnis anhand der relativen Luminanzwerte (oder Helligkeitswerte) der Vordergrund- und Hintergrundfarben berechnet wird.

In der Praxis kann das Kontrastverhältnis von 4,5: 1 erreicht werden, indem die dunklere Farbe schattiert (Schwarz hinzugefügt) und die hellere Farbe getönt (Weiß hinzugefügt) wird. Dunkle Farbtöne im Farbkreis gelten als Blautöne, Violett-, Magenta- und Rottöne, während hellere Farbtöne Orangen, Gelb, Grün und Blaugrün sind.

### Vermeiden Sie Probleme mit Farbenblindheit, indem Sie sorgfältig Farben auswählen, die Informationen vermitteln

Es gibt verschiedene Formen der Farbenblindheit. Diese können von einer verringerten Empfindlichkeit über eine bestimmte Lichtwellenlänge bis hin zur Unfähigkeit, überhaupt Farbe zu sehen, reichen. Die häufigste Form ist eine verringerte Empfindlichkeit zur Erkennung von Grüns.

Wenn beispielsweise zwei ähnliche grüne Farben die Vordergrund- und Hintergrundfarbe Ihres Inhalts sind, kann ein farbenblinder Benutzer diese möglicherweise nicht unterscheiden. Nahe Farben können als Nachbarn im Farbkreis betrachtet werden, und diese Kombinationen sollten vermieden werden, wenn wichtige Informationen übermittelt werden.

Hinweis: Einige Online-Farbauswahlwerkzeuge enthalten visuelle Simulationen, wie Farben für verschiedene Arten von Farbenblindheit angezeigt werden. Dies sind großartige Ressourcen zusätzlich zu Online-Taschenrechnern für die Kontrastprüfung.

### Geben Sie Links Bedeutung, indem Sie beschreibenden Linktext verwenden

Benutzer von Bildschirmleseprogrammen haben verschiedene Optionen für die Art des Inhalts, den ihr Gerät liest. Dies umfasst das Überspringen zu (oder über) wichtigen Elementen, das Springen zum Hauptinhalt oder das Abrufen einer Seitenübersicht aus den Überschriften. Eine andere Möglichkeit besteht darin, nur die auf einer Seite verfügbaren Links zu hören.

Screenreader lesen dazu den Linktext oder was sich zwischen den Anker-Tags (a) befindet. Es ist nicht hilfreich, eine Liste mit Links "Hier klicken" oder "Mehr lesen" zu haben. Stattdessen sollten Sie kurzen, aber beschreibenden Text innerhalb der a-Tags verwenden, um diesen Benutzern mehr Bedeutung zu verleihen.

### Machen Sie Links mit HTML-Zugriffsschlüsseln navigierbar

HTML bietet das Attribut accesskey, um eine Tastenkombination anzugeben, mit der ein Element aktiviert oder fokussiert werden soll. Dies kann die Navigation für Benutzer nur mit Tastatur effizienter machen.

HTML5 ermöglicht die Verwendung dieses Attributs für jedes Element, ist jedoch besonders nützlich, wenn es mit interaktiven Elementen verwendet wird. Dies umfasst Links, Schaltflächen und Formularsteuerelemente.

Hier ist ein Beispiel:

```
<button accesskey="b">Wichtige Schaltflächen</button>
```

### Verwenden Sie tabindex, um einem Element einen Tastaturfokus hinzuzufügen

Das HTML-Attribut tabindex verfügt über drei unterschiedliche Funktionen, die sich auf den Tastaturfokus eines Elements beziehen. Wenn es sich auf einem Tag befindet, zeigt es an, dass das Element fokussiert werden kann. Der Wert (eine Ganzzahl, die positiv, negativ oder null ist) bestimmt das Verhalten.

Bestimmte Elemente wie Links und Formularsteuerelemente erhalten automatisch den Tastaturfokus, wenn ein Benutzer eine Seite durchblättert. Es befindet sich in derselben Reihenfolge wie die Elemente im HTML-Quell-Markup. Dieselbe Funktionalität kann anderen Elementen wie div, span und p zugewiesen werden, indem ihnen ein tabindex = "0" -Attribut zugewiesen wird. Hier ist ein Beispiel:

```
<div tabindex="0">Ich hätte gerne den Fokus!</div>
```

> Hinweis: Ein negativer Tabindex-Wert (normalerweise -1) zeigt an, dass ein Element fokussierbar ist, aber nicht über die Tastatur erreichbar ist. Diese Methode wird im Allgemeinen verwendet, um den Fokus programmgesteuert auf Inhalte zu richten (z. B. wenn ein für ein Popup-Fenster verwendetes Div aktiviert ist) und geht über den Rahmen dieser Herausforderungen hinaus.

### Verwenden Sie tabindex, um die Reihenfolge des Tastaturfokus für mehrere Elemente festzulegen

Das tabindex-Attribut gibt auch die genaue Tabulatorreihenfolge der Elemente an. Dies wird erreicht, wenn der Wert des Attributs auf eine positive Zahl von 1 oder höher gesetzt wird.

Wenn Sie einen tabindex = "1" setzen, wird zuerst der Tastaturfokus auf dieses Element gelegt. Anschließend wird die Sequenz der angegebenen Tabindex-Werte (2, 3 usw.) durchlaufen, bevor die Standardeinstellungen und tabindex = "0" verwendet werden.

Es ist wichtig zu beachten, dass wenn die Tab-Reihenfolge auf diese Weise festgelegt wird, die Standardreihenfolge (die die HTML-Quelle verwendet) überschrieben wird. Dies kann Benutzer verwirren, die erwarten, die Navigation oben auf der Seite zu starten. Diese Technik kann unter bestimmten Umständen erforderlich sein. Achten Sie jedoch im Hinblick auf die Zugänglichkeit darauf, bevor Sie sie anwenden.

Hier ist ein Beispiel:

```
<div tabindex="1">I get keyboard focus, and I get it first!</div>

<div tabindex="2">I get keyboard focus, and I get it second!</div>
```

Fertig!

## Fazit

x
