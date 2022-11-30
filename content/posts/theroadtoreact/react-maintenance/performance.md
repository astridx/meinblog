---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'Wartung in React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-maintenance-wartung
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

# Wartung in React

Ist die Anwendung fertig eingerichtet und kommen mehr und mehr Nutzer hinzu, spielt die Wartung eine immer größere Rolle. Um den laufenden Aufwand so klein wie möglich zu halten, werden wir uns mit Leistungsoptimierung, Typensicherheit, Tests und Projektstruktur befassen. Lese in diesem Kapitel, wie du die Grundlagen für eine pflegeleichte Anwendung legst, ohne dabei Qualitätseinbußen in Kauf zu nehmen.

* Die *Leistungsoptimierung* verhindert, dass Anwendungen langsamer werden, indem eine effiziente Nutzung der verfügbaren Ressourcen sichergestellt wird. 
* *Typisierte Programmiersprachen* wie TypeScript erkennen Fehler früherzeitig. 
* Automatische *Tests* geben uns bei Änderungen Sicherheit, dass der ursprüngliche Code weiterhin funktioniert. 
* Und, last but not least unterstützt die *Projektstruktur* eine organisierte Verwaltung, was in Szenarien nützlich ist, in denen unterschiedliche Teams aus verschiedenen Bereichen zusammen arbeiten.

## Performanz in React (fortgeschrittene Anleitung)

In diesem Abschnitt zeige ich dir, wie du dir einen Überblick über die Performance deiner Applikation verschaffst. Du wirst feststellen: React-Anwendungen sind von Hause aus leistungsstark. Es gibt eine Vielzahl unterschiedlicher Monitoring und Reporting-Tools. Ich habe mich dazu entschieden, dir ein grundlegendendes Werkzeug zu zeigen: `console.log()` in Verbindung mit den Entwicklertools deines Browsers.

### Das erste Rendern

Wir haben uns mit Reacts useEffect Hook befasst, der für Seiten-Effekte verwendet wird. Dieser wird beim ersten Rendern einer Komponente und dann bei jedem Aktualisieren aufgerufen. Indem wir ihm als zweites Argument ein leeres Abhängigkeitsarray übergeben, wird der Hook nur beim ersten Rendern ausgelöst. Standardmäßig gibt es keine Möglichkeit, den Hook so einzustellen, dass er bei jedem Aktualisieren aber nicht beim ersten Rendern aufgerufen wird. Sieh dir dies beispielsweise für die Statusverwaltung an. Wir verwalten den Status mit dem `useState`-Hook. Indem wir mithilfe des `useEffect`-Hook den aktuellen Wert im lokalen Speicher des Browsers ablegen, erreichen wir dessen Semi-Persistenz:

```js
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
# start-insert
    console.log('A');
# end-insert
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
```

Nutze die Anweisung `console.log(‚A‘);` um dir über die Konsole der Entwicklertools des Browsers anzusehen, wann der Status in den lokalen Speicher geschrieben wird. Erstmals geschieht dies, wenn die Komponente das erste Mal gerendert wird. Das hört sich logisch an, ist aber nicht sinnvoll, da zu diesem Zeitpunkt der hartcodierte Anfangswert aktiv ist. Erforderlich ist das Speichern nur bei einem erneuten Rendern der Komponente --- nur dann ist es möglich, dass der Wert sich geändert hat.

Wie erwähnt, gibt es keinen React-Hook, der bei jedem Rendern aufgerufen wird, den ersten Aufruf aber auslässt. Durch die Verwendung des `useRef`-Hooks, bei dem die Eigenschaft `ref.current` beim erneuten Rendern erhalten bleibt, erstellen wir uns diese Lösung selbst.

```js
const useSemiPersistentState = (key, initialState) => {
# start-insert
  const isMounted = React.useRef(false);
# end-insert

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
# start-insert
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
# end-insert
      console.log('A');
      localStorage.setItem(key, value);
# start-insert
    }
# end-insert
  }, [value, key]);

  return [value, setValue];
};
```

Wir nutzen `ref` und seine veränderbare `current`-Eigenschaft für die imperative Zustandsverwaltung, die kein erneutes Rendern auslöst. Sobald der Hook zum ersten Mal von seiner Komponente aufgerufen wird, wird `current` mit einem booleschen Wert namens `isMounted` initialisiert, der mit `false` belegt ist. So wird der Seiten-Effekt in `useEffect` nicht ausgelöst. Nur das boolesche Flag für `isMounted` wird auf `true` umgeschaltet. Bei jedem erneuten Aufruf wird das Flag im Seiten-Effekt ausgewertet. Da es `true` ist, wird der Status im lokalen Speicher gespeichert. Während der Lebensdauer der Komponente bleibt `isMounted` mit `true` belegt. So wird vermieden, dass der Seiten-Effekt ausgelöst wird, wenn unser benutzerdefinierter Hook verwendet wird.

Dieses Beispiel ist nicht verhältnismäßig. Der Aufwand lohnt sich nicht, für die kleine Optimierung. Bedenke aber: Es gibt React-Anwendungen, mit komplizierten Berechnungen, in ihren Seiten-Effekten. Dann ist es praktischer, diese Technik einzusetzen, um unnötige Funktionsaufrufe zu vermeiden.

*Hinweis: Diese Technik wird nicht nur zur Leistungsoptimierung verwendet, sondern, um einen Seiten-Effekt nur dann auszuführen, wenn eine Komponente erneut gerendert wird. Ich habe die Taktik mehrmals benutzt und ich bin sicher, dass du irgendwann auf einen Anwendungsfall stoßen wirst, in dem sie ebenfalls verwendest.*

### Nicht erneut rendern, wenn nicht nötig

Zuvor haben wir den Re-Rendering-Mechanismus mithilfe der Anweisung `console.log();` untersucht. Erweitere dies für die Komponenten App und List. Füge für beide eine Protokollierungsanweisung hinzu, um in der Browser-Konsole die Ausführung mitzuverfolgen:

```js
const App = () => {
  ...

# start-insert
  console.log('B:App');
# end-insert

  return ( ... );
};

const List = ({ list, onRemoveItem }) =>
# start-insert
  console.log('B:List') ||
# end-insert
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));
```

Da die List-Komponente keinen Funktionskörper hat, verwendet sie stattdessen den Operator `||`. Dies ist ein Trick, um einer Funktionskomponente ohne Funktionskörper eine Protokollierungsanweisung hinzuzufügen. Da `console.log()` auf der linken Seite des Operators als falsch ausgewertet wird, wird die rechte immer aufgerufen:

```
function getTheTruth() {
  if (console.log('B:List')) {
    return true;
  } else {
    return false;
  }
}

console.log(getTheTruth());
// B:List
// false
```

Konzentrieren wir uns auf die Protokollierung in den Entwicklertools des Browsers. Zuerst wird App gerendert, gefolgt von ihren untergeordneten Komponenten (beispielsweise List).

{title="Visualization",lang="text"}
```
B:App
B:List
B:App
B:App
B:List
```

Da ein Seiten-Effekt das Abrufen von Daten nach dem ersten Rendern auslöst, wird nur App gerendert, da List in einem bedingten Rendering durch einen Ladeindikator ersetzt wird. Sobald die Daten eintreffen, werden beide erneut gerendert.

{title="Visualization",lang="text"}
```
// initial render
B:App
B:List

// data fetching with loading
B:App

// re-rendering with data
B:App
B:List
```

Soweit ist dieses Verhalten in Ordnung. Alles wird zum passenden Zeitpunkt gerendert. Jetzt erweitern wir unseren Test, indem wir Zeichen in das Suchfeld eingeben. Wenn du mir in diesem Beispiel folgst, dann siehst du in der Konsole neue Einträge, wann immer du etwas im Feld einfügst:

{title="Visualization",lang="text"}
```
B:App
B:List
```

Das erneute Rendern der List-Komponente ist bei genauerem Überlegen nicht erforderlich. Die Suchfunktion wird nicht beim Ändern des Suchwortes aufgerufen, sondern über die Schaltfläche. Daher ist es unnötige, dass die an die List-Komponente übergebene `list` neu gerendert wird --- sie bleibt gleich. Hier erlebst du das Standardverhalten in React, über das viele Entwickler stolpern.

Wenn eine übergeordnete Komponente erneut gerendert wird, werden die untergeordneten ebenfalls aktualisiert. React hat hierbei Gutes im Sinne: Es ist die Regel, dass nachfolgende Komponenten neu gerendert werden, weil sich Dinge ändern. Wird dies vergessen, führt dies zu Fehlern. Demzufolge unterstützt Reacts Standardverhalten Entwickler bei Ihrer Arbeit.

Diese Unterstützung ist nicht immer zweckmäßig. Manchmal ist es besser, dass ein erneutes Rendern von untergeordneten Komponenten verhindert wird. Beispielsweise wenn große Datenmengen in einer Tabelle angezeigt werden und die Daten sich nicht ändern. In dem Fall ist es effizienter, vorher zu prüfen, ob sich etwas geändert hat. Für diesen Zweck biete React die Memo-API, welche wir im nächsten Codebeispiel integrieren:

```js
# start-insert
const List = React.memo(
# end-insert
  ({ list, onRemoveItem }) =>
    console.log('B:List') ||
    list.map(item => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))
# start-insert
);
# end-insert
```

Das war nicht ausreichend. Die Ausgabe in der Konsole bleibt gleich, wenn du den Text im Eingabefeld des Suchformulares veränderst:

{title="Visualization",lang="text"}
```
B:App
B:List
```

Sehen wir uns dies genauer an: Die an die List-Komponente übergebene `list` ist dieselbe, der `onRemoveItem`-Callback-Handler aber nicht. Wenn die App erneut gerendert wird, wird immer eine neue Version des Handlers erstellt. Zuvor haben wir den [`useCallback`-Hook](https://de.reactjs.org/docs/hooks-reference.html#usecallback) und `memoized`-Funktionen verwendet, um dieses Verhalten zu verhindern, indem wir eine Funktion nur bei einem erneuten Rendern erstellten (wenn sich eine ihrer Abhängigkeiten geändert hat). Ergänzen wir dies jetzt bei `handleRemoveStory`:

```js
const App = () => {
  ...

# start-insert
  const handleRemoveStory = React.useCallback(item => {
# end-insert
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
# start-insert
  }, []);
# end-insert

  ...

  console.log('B:App');

  return (... );
};
```

Das passt jetzt! Der Callback-Handler hat keinerlei Abhängigkeiten und wird nur einmal deklariert, wenn die App zum ersten Mal gerendert wird. Keine der an die List-Komponente übergebenen Eigenschaften (Props) ändert sich. Erweitere deine Anwendung um die Kombination von `memo` und `useCallback`, wie hier beschrieben. Die Ausgabe "B:List" ist nicht weiter in deiner Konsole zu sehen, wenn du im Suchfeld etwas änderst. Nur die App-Komponente wird neu gerendert, deshalb siehst du die Ausgabe "B:App" weiterhin bei Änderungen des Suchworts.

![](../images/memo.png)

Während alle an eine Komponente übergebenen Eigenschaften (Props) gleich bleiben, wird diese erneut gerendert, wenn eine ihr übergeordnete aktualisiert wird. Dies ist das Standardverhalten von React, welches die meiste Zeit gewollt ist. Der Mechanismus ist schnell und vermeidet Fehler. Wenn das erneute Rendern die Leistung einer React-Anwendung verringert, ist `memo` hilfreich.

Manchmal hilft `memo` allein nicht. Callback-Handler werden jedes Mal in der übergeordneten Komponente neu definiert und als *geänderte* Eigenschaften (Props) übergeben, was zu einem erneuten Rendern führt. In diesem Fall verwenden wir `useCallback`, um den Callback-Handler nur dann neu aufzurufen, wenn sich seine Abhängigkeiten ändern.

### Verhindere den erneuten Aufruf von aufwendigen Berechnungen

Manchmal kommen leistungsintensive Berechnungen in einer React-Komponenten vor --- zwischen der Funktionssignatur einer Komponente und dem Rückgabeblock. Diese werden bei jedem Rendering aufgerufen. Erstellen wir ein Szenario, um den Fall praktisch nachzuvollziehen.

```js
# start-insert
const getSumComments = stories => {
  console.log('C');

  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  );
};
# end-insert

const App = () => {
  ...

# start-insert
  const sumComments = getSumComments(stories);
# end-insert

  return (
    <div>
# start-insert
      <h1>My Hacker Stories with {sumComments} comments.</h1>
# end-insert

      ...
    </div>
  );
};
```

Wenn alle Argumente an eine Funktion übergeben werden, ist es akzeptabel, sie außerhalb der Komponente zu platzieren. Es verhindert, dass diese bei jedem Rendern erstellt werden, sodass der Hook `useCallback` nicht mehr erforderlich ist. Die Funktion berechnet weiterhin den Wert der summierten Kommentare für jedes Rendering, was bei aufwendigen Berechnungen zu einem Problem wird.

![](../images/usememo-1.png)

Jedes Mal, wenn du Text in das Eingabefeld der SearchForm-Komponente eingibst, wird diese Berechnung erneut aufgerufen und du siehst "C" in der Konsole deines Browsers. Dies ist für eine kleine Aufgabe in Ordnung. Im Falle von aufwendigen Berechnungen ist es wichtig, dass du dich darum kümmerst. Denn, dies verzögert das erneute Rendern. Deshalb ist es sinnvoll, eine Funktion nur auszuführen, wenn sich eine ihrer Abhängigkeiten geändert hat. Wenn sich keine ändert, bleibt das Ergebnis der Funktion gleich. Der `useMemo`-Hook hilft dir:

```js
const App = () => {
  ...

# start-insert
  const sumComments = React.useMemo(() => getSumComments(stories), [
    stories,
  ]);
# end-insert

  return ( ... );
};
```

Es ist nicht erforderlich die Liste bei jedem Ändern des Suchwortes neu zu berechnen. Dies ist nur wichtig, wenn sich das Abhängigkeitsarray, hier `stories`, ändert. Solchen Szenarien führen im Falle von aufwenigen Berechnungen zu Problemen.

![](../images/usememo-2.png)

Nachdem du `useMemo`, `useCallback`, und `memo` kennengelernt hast, optimiere deine Anwendung mit bedacht. Verwende die Funktionen nicht nach dem Gießkannenprinzip. Eine Leistungsoptimierung ist sinnvoll, wenn du auf Leistungsengpässe störst. In React wird dir das nicht oft passieren, da der Rendering-Mechanismus von Hause aus effizient ist. In manchen Fällen ist eine Optimierung aufwendiger als das erneute Rendern selbst.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/Performance-in-React).
  * Reflektiere die [Änderungen](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/Performance-in-React?expand=1).
* Lese mehr zu [Reacts Memo API](https://de.reactjs.org/docs/react-api.html#reactmemo).
* Lese mehr zum Thema [Reacts useCallback-Hook](https://de.reactjs.org/docs/hooks-reference.html#usecallback).
* Lade die *React Developer Tools* als Erweiterung für deinen Browser herunter. Öffne das Werkzeug über die Entwicklertools und probiere die verschiedenen Funktionen aus. Visualisiere beispielsweise den Komponentenbaum deiner Anwendung.
* Wird das Suchformular erneut gerendert, wenn ein Element mit der Schaltfläche "Dismiss" aus der Liste entfernt wird? Wende in diesem Fall Techniken zur Leistungsoptimierung an, um ein erneutes Rendern zu verhindern.
* Wird jedes Item neu gerendert, wenn ein Element mit der Schaltfläche "Dismiss" aus der Liste entfernt wird? Wende in diesem Fall Techniken zur Leistungsoptimierung an, um ein erneutes Rendern zu verhindern.
* Unsere aktuelle Anwendung weist keine Leistungsengpässe auf. Entferne deshalb alle Maßnahmen zur Leistungsoptimierung. Vermeide [vorzeitige Optimierungen](https://en.wikipedia.org/wiki/Program_optimization). Verwende diesen Abschnitt als Referenz zum Nachschlagen, falls du einmal auf Leistungsprobleme stößt.
<img src="https://vg07.met.vgwort.de/na/912c3d1078544a93afd0375c49a56d46" width="1" height="1" alt="">
