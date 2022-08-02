---
description: 'desc'
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'React Anwendungen testen'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-maintenance-testen
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## React Anwendungen testen 

Das Testen des Quellcodes wird oft vernachlässigt. Dabei ist es wesentlich und zwingend erforderlich. Es ist unentbehrlich, die Qualität und Funktionalität des Codes automatisch zu überprüfen, bevor dieser im Echtsystem angewendet wird. Automatisierte Tests sind schneller durchführbar, fehlerfreier und kostengünstiger. Maschinen sind hier dem Menschen überlegen. Die [Testpyramide](https://martinfowler.com/articles/practical-test-pyramid.html) dient als Grundregel.

Die Testpyramide umfasst End-to-End-Tests (E2E), Integrationstests und Komponententests (Unit-Tests). Letztere werden für kleine, isolierte Codeblöcke verwendet, zum Beispiel eine einzelne Funktion oder Komponente. Man betrachtet hierbei einen Teilaspekt herausgelöst. Integrationstests helfen uns, herauszufinden, ob diese Einheiten fehlerfrei zusammenarbeiten. Ein End-to-End-Test simuliert ein reales Szenario, beispielsweise den Anmeldevorgang einer Webanwendung. 
Unit-Tests laufen schnell ab, sind isolierte Einheiten und somit unkompliziert zu schreiben und zu warten. Auf End-to-End-Tests trifft das Gegenteil zu. 
Deshalb sind die Unit-Tests die Basis der Pyramide --- der breitere Teil, der suggeriert, dass diese mengenmäßig überwiegen. Nur der Vollständigkeit halber: Es gibt Entwickler, die die Pyramide auf den Kopf stellen. Je nach Anwendung ist das in Ordnung so. In der Regel ist die breite Basis erwiesenermaßen die passende Wahl.

![](../images/testing-pyramid.png)

Scheiben wir zuerst Unit-Tests, die unsere Funktionen und Komponenten abdecken. Danach verwenden wir Integrationstests, um sicherzustellen, dass die einzelnen --- mit Unit-Tests unabhängig geprüften --- Einheiten, wie erwartet zusammenarbeiten. Am Ende benötigen wir End-to-End-Tests, um kritische Szenarien zu simulieren. In diesem Kapitel behandeln wir **Unit und Integrationstests** sowie eine komponentenspezifische Testtechnik namens **Schnappschusstest oder Snapshot Test**. **End-to-End-Tests** werden Teil der Übungen sein.

Da es viele Test-Bibliotheken gibt, ist es als Anfänger schwierig, die passende auszuwählen. Wir werden [Jest](https://jestjs.io/) und die [React Testing Library](https://testing-library.com/) (RTL) verwenden. Während Jest ein umfassendes Testframework mit Testrunner, Testsuiten, Testfällen und Assertions (Behauptungen) ist, wird die *React Testing Library* zum Rendern von Komponenten, Auslösen von Ereignissen wie Mausklicks und Auswählen von HTML-Elementen aus dem DOM verwendet. In den nächsten Abschnitten werden wir beide Tools erkunden.

### Testsuiten, Testfälle und Assertions (Behauptungen)

Jest bietet dir alles, was du von einem Test-Framework erwartest. In JavaScript, und in vielen anderen Programmiersprachen, werden häufig Testsuiten und Testfälle verwendet. Während eine Suite mehrere inhaltlich zusammengehörende Fälle vereint, besteht ein Testfall aus einem einzelnen Szenario. Sehen wir uns das mit Jest anhand der Datei *src/App.test.js* praktisch an. So sieht es aus:

{title="src/App.test.js",lang="javascript"}
```
describe('something truthy and falsy', () => {
  test('true to be true', () => {
    expect(true).toBe(true);
  });

  test('false to be false', () => {
    expect(false).toBe(false);
  });
});
```

Während der "describe"-Block für die *Testsuite* steht, sind die "test"-Blöcke die *Testfälle*. Beachte, dass es möglich ist, Fälle ohne Suite zu verwenden. Für unser Beispiel ist das nicht relevant, mir ist es aber wichtig, es mit einem Codebeispiel zu erwähnen:

{title="src/App.test.js",lang="javascript"}
```
test('true to be true', () => {
  expect(true).toBe(true);
});

test('false to be false', () => {
  expect(false).toBe(false);
});
```

Warum nutzen wir Testsuiten und Testfälle? Es kommt häufig vor, dass beispielsweise eine Funktion oder eine Komponente mehrere Fälle aufweist --- jeder ist Teil eines Szenarios. Eine Testsuite ist in der Regel eine Sammlung der Testfälle, die zusammen einen Vorgang simulieren. Zur Testausführung werden diese in einer Gruppe zusammengefasst aufgerufen. So wird das gesamte Vorgehen getestet. Daher ist es sinnvoll, Testsuiten und Testfälle in Kombination zu verwenden. Manchmal testet man eine aufeinander abgestimmte Abfolge, beispielsweise:

- Testfall 1: Anmeldung 
- Testfall 2: Anzeige einer Liste 
- Testfall 3: Löschung eines Eintrags 
- Testfall 4: Abmeldung 

Nachfolgend testen wir Teile der App-Komponente zusammenhängend in einer Testsuite:

{title="src/App.test.js",lang="javascript"}
```
describe('App component', () => {
  test('removes an item when clicking the Dismiss button', () => {

  });

  test('requests some initial stories from an API', () => {

  });
});
```

Hast du schon einmal mit Tests gearbeitet und kennst "it"-Blocks? Ein "it"-Block ist das gleiche wie ein "test"-Block. Warum gibt es beide Varianten? In der Vergangenheit wurde "it" genutzt. "test" ist neuer und gibt dem Ganzen einen passenderen Namen. Nenne deinen Block so, wie es dir am liebsten ist. 

{title="src/App.test.js",lang="javascript"}
```
describe('something truthy and falsy', () => {
# start-insert
  it('true to be true', () => {
# end-insert
    expect(true).toBe(true);
  });

# start-insert
  it('false to be false', () => {
# end-insert
    expect(false).toBe(false);
  });
});
```

Glücklicherweise beinhaltet die *Create React App* Jest, sodass alle wichtigen Werkzeuge installiert und konfiguriert sind. Führe die Tests mit dem Skript aus der Datei *package.json* direkt in der Befehlszeile aus. Verwendet dazu den Befehl `npm test`. Du siehst die folgende Ausgabe:

{title="Command Line",lang="text"}
```
 PASS  src/App.test.js
  something truthy and falsy
    ✓ true to be true (3ms)
    ✓ false to be false (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.78s, estimated 4s
Ran all test suites related to changed files.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Jest vergleicht alle Dateien mit dem Suffix *test.js* im Dateinamen, wenn der Befehl aufgerufen wird. Erfolgreiche Tests werden grün, fehlgeschlagene rot markiert. Das interaktive Test-Skript überwacht den Code und führt die Tests jedes Mal aus, wenn sich etwas im Code ändert. Es bietet dir zusätzliche Befehle wie das Drücken von "f", um nur fehlgeschlagene, und "a", um alle Tests erneut auszuführen. Probiere das mit einem absichtlich fehlerhaften Test praktisch aus:

{title="src/App.test.js",lang="javascript"}
```
describe('something truthy and falsy', () => {
  test('true to be true', () => {
    expect(true).toBe(true);
  });

  test('false to be false', () => {
# start-insert
    expect(false).toBe(true);
# end-insert
  });
});
```

Wenn du die Ausführung von `npm test` nicht beendet hast, sie somit bei dir weiterhin aktiv ist, werden deine Tests nach der Änderung im Quellcode automatisch erneut aufgerufen. Du siehst über die Befehlszeilenausgabe einen roten Hinweis bezüglich des fehlgeschlagenen Tests:

{title="Command Line",lang="text"}
```
 FAIL  src/App.test.js
  something truthy and falsy
    ✓ true to be true (2ms)
    ✕ false to be false (4ms)

  ● something truthy and falsy › false to be false

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

       5 |
       6 |   test('false to be false', () => {
    >  7 |     expect(false).toBe(true);
         |                   ^
       8 |   });
       9 | });
      10 |

      at Object.<anonymous> (src/App.test.js:7:19)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        3.385s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

Mach dich mit der Ausgabe vertraut. Die Texte enthalten alle Informationen, um fehlgeschlagene Tests zu erkennen und so die Ursache zu beheben. Korrigiere den problematischen Test und überprüfe in der Befehlszeile, ob die Ausgabe grün ist.

Ich habe bisher nichts zu Behauptung (Assertion) geschrieben, obwohl diese ebenfalls wichtig sind. Du hast im Beispiel zwei Test-Assertions mit der Funktion `expect` verwendet. `expect` ist von Hause aus in Jest enthalten. Eine Behauptung funktioniert wie folgt: Es wird erwartet, dass die linke Seite (`expect`) mit der rechten (`toBe`) übereinstimmt. `toBe` ist dabei eine von vielen Funktionen, die mit Jest verfügbar sind:

{title="src/App.test.js",lang="javascript"}
```
describe('something truthy and falsy', () => {
  test('true to be true', () => {
    expect(true).toBeTruthy();
  });

  test('false to be false', () => {
    expect(false).toBeFalsy();
  });
});
```

Tipp: Nutze gleichzeitig zwei Befehlszeilen: eine zum Überwachen deiner Tests (`npm test`) und eine zum Entwickeln der Anwendung (`npm start`). Wenn du eine Versionsverwaltung wie [Git](https://de.wikipedia.org/wiki/Git) nutzt, benötigst du unter Umständen eine weitere offene Befehlszeile, um deinen Code zu einem Repository hinzuzufügen.

#### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-testing-setup).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des ersten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/react-testing-setup?expand=1).
* Lese mehr über [Jest](https://jestjs.io/).

### Unit-Tests: Funktionen

Als Erstes schreiben wir einen Unit-Test. Dieser testet eine Komponente oder eine Funktion isoliert. Dies bedeutet, dass wir im Falle einer Funktion nur die Ein- und die Ausgabe testen. Bei einer Komponente testen wir die Eigenschaften (Props) und die Callback-Handler.

Bevor wir etwas in der Datei *src/App.js* testen ist es erforderlich, dass wir Komponenten und Funktionen exportieren:

```js
...

export default App;

# start-insert
export { storiesReducer, SearchForm, InputWithLabel, List, Item };
# end-insert
```

Ich liste dir hier im Abschnitt nicht die Tests für sämtliche Szenarien auf. Vielmehr zeige ich die Implementierung beispielhaft und überlasse es dir, diese zu vervollständigen. Importieren wir als Erstes alles Erforderliche in die Datei *src/App.test.js*. Wie du siehst, ist React ebenfalls notwendig!

{title="src/App.test.js",lang="javascript"}
```
import React from 'react';

import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel,
} from './App';
```

Bevor wir den ersten Unit-Test schreiben, zeige ich dir, wie du eine einzelne JavaScript-Funktion testest. Der beste Kandidat für diesen Testanwendungsfall ist `storiesReducer`. Zunächst definieren wir einige Testdaten und die Testsuite:

{title="src/App.test.js",lang="javascript"}
```
import React from 'react';

...

# start-insert
const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: 'Redux',
  url: 'https://redux.js.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
  test('removes a story from all stories', () => {

  });
});
# end-insert
```

Wenn du dir ansiehst, was zu testen ist, kommst du auf mindestens einen Testfall pro Aktion. Wir werden uns auf einen Test konzentrieren. `storiesReducer` akzeptiert einen Zustand und eine Aktion und gibt einen neuen Zustand zurück. Jeder Test der Reduzierungsfunktion folgt dem gleichen Muster:

{title="src/App.test.js",lang="javascript"}
```
...

describe('storiesReducer', () => {
  test('removes a story from all stories', () => {
# start-insert
    const action = // TODO: eine Aktion
    const state = // TODO: ein Status

    const newState = storiesReducer(state, action);

    const expectedState = // TODO: der erwartete Status

    expect(newState).toBe(expectedState);
# end-insert
  });
});
```

Für unseren speziellen Fall definieren wir eine Aktion `action`, einen Zustand `state` und ein erwartetes Ergebnis `newState`. Letzteres ist im Beispiel wie folgt: Die Liste enthält einen Eintrag weniger, da das Item entfernt wird, welches mit er Aktion an `storiesReducer` übergeben wurde:

{title="src/App.test.js",lang="javascript"}
```
describe('storiesReducer', () => {
  test('removes a story from all stories', () => {
# start-insert
    const action = { type: 'REMOVE_STORY', payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };
# end-insert

    const newState = storiesReducer(state, action);

# start-insert
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };
# end-insert

    expect(newState).toBe(expectedState);
  });
});
```

Auf den ersten Blick sieht es so aus, als ob der Test erfolgreich sein wird. Aber: Er schlägt fehl. Das liegt daran, dass wir hier `toBe` anstelle von `toStrictEqual` verwenden. Die Funktion `toBe` führt einen [strengen Vergleich](https://developer.mozilla.org/de/docs/Web/JavaScript/Vergleiche_auf_Gleichheit_und_deren_Verwendung) wie `newState === expectedState` durch. Die Objektreferenz ist nicht dieselbe. Nur der Inhalt des Objekts ist gleich. Daher vergleichen wir in diesem Fall besser mit `toStrictEqual` anstelle von `toBe`:

{title="src/App.test.js",lang="javascript"}
```
describe('storiesReducer', () => {
  test('removes a story from all stories', () => {
    const action = { type: 'REMOVE_STORY', payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

# start-insert
    expect(newState).toStrictEqual(expectedState);
# end-insert
  });
});
```

Im Falle von JavaScript-Objekte ist es wichtig, zu unterscheiden, ob du einen strengen Vergleich oder nur einen Inhaltsvergleich beabsichtigst. Meistens ist der Inhalt relevant, verwende daher `toStrictEqual`. Für Strings oder boolesche Werte nutzt du weiterhin `toBe`. Beachte, dass es eine `toEqual`-Funktion gibt, die [etwas anders funktioniert](https://twitter.com/rwieruch/status/1260866850080067584) als `toStrictEqual`. `toStrictEqual` überprüft zusätzlich, ob zwei Objekte denselben Typ haben.

Kommen wir zurück auf unser Beispiel: Der Test der Funktion `storiesReducer` schließt jetzt erfolgreich ab. Wir geben Werte in diese ein und erwarten eine vordefinierte Ausgabe. Wie erwähnt, folgt eine Reduzierungsfunktion normalerweise demselben Testmuster: Wenn ein Zustand und eine Aktion gegeben sind, erwarten wir ein Ergebnis. Jede Aktion ist ein weiterer Testfall in der Testsuite unseres Reduzierers. Das Testen der verbleibenden Fälle überlasse ich dir als Übung. Du weißt jetzt alles, was dazu notwendig ist.

#### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-testing-unit-function).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des letzten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-testing-setup...hs/react-testing-unit-function?expand=1).
* Lese mehr über Jests Funktionen wie `toBe` und `toStrictEqual`.

### Unit-Tests: Komponenten

Nachdem wir eine Funktion in JavaScript mit Jest getestet haben, testen wir jetzt isoliert eine Komponente. Wir nutzen die *React Testing Library (RTL)*. Diese ist, ebenso wie zuvor Jest, in der *Create React App* integriert. Wenn du die *Create React App* nutzt, ist alles schon fertig installiert und konfiguriert. Falls du ein benutzerdefiniertes React-Setup verwendest, beispielsweise React mit Webpack, installierst du die Bibliothek bitte selbst.

Wir nutzen die folgenden RTL-Funktionen für den Komponententest. Ich werde diese Schritt für Schritt erklären. Als Erstes importieren wir sie:

{title="src/App.test.js",lang="javascript"}
```
import React from 'react';
# start-insert
import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react';
# start-insert

...
```

Testen wir als Erstes die Item-Komponente. Wichtig ist, dass alle Eigenschaften (Props) entsprechend der Eingabe gerendert werden. Mit anderen Worten: Ist die Ausgabe im HTML korrekt. Wir verwenden im Test die `render`-Funktion, um eine Komponente im HTML anzuzeigen. In diesem Fall rendern wir die Item-Komponente und übergeben ihr als Eigenschaft (Prop) ein `item`-Objekt --- `storyOne` gehört zu den Daten, die wir zuvor extra für die Tests angelegt hatten:

{title="src/App.test.js",lang="javascript"}
```
# start-insert
describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);
  });
});
# end-insert
```

Nach dem Rendern verwenden wir die `debug`-Funktion des `screen`-Objekt:

{title="src/App.test.js",lang="javascript"}
```
describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);

# start-insert
    screen.debug();
# end-insert
  });
});
```

Sobald du den Tests mit `npm test` aufrufst, siehst du die Ausgabe der `debug`-Funktion. Alle HTML-Elemente der Komponente (und der untergeordneten) werden ausgegeben. Hinweis: Aktualisiere die [Versionen von RTL](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-testing-unit-function...hs/react-testing-unit-component?expand=1) in der Datei `package.json` und führe `npm install` erneut aus, falls du auf ein Problem stößt. Nachfolgend siehst du die konkrete Ausgabe:

{title="src/App.test.js",lang="javascript"}
```
<body>
  <div>
    <div>
      <span>
        <a
          href="https://reactjs.org/"
        >
          React
        </a>
      </span>
      <span>
        Jordan Walke
      </span>
      <span>
        3
      </span>
      <span>
        4
      </span>
      <span>
        <button
          type="button"
        >
          Dismiss
        </button>
      </span>
    </div>
  </div>
</body>
```

Es ist hilfreich, die `debug`-Funktion zu verwenden, bevor und während du die ersten Tests für eine Komponente schreibst. Dies gibt dir den perfekten Überblick über das, was gerendert wird. Hierauf aufbauend integrierst du die Tests. Erstelle weitere Behauptungen (Assertions). Das `screen`-Objekt bietet dir eine Funktion namens `getByText`. Dies ist eine von vielen, die dich bei der Testentwicklung unterstützen:

{title="src/App.test.js",lang="javascript"}
```
describe('Item', () => {
  test('renders all properties', () => {
    render(<Item item={storyOne} />);

# start-insert
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
# end-insert
  });
});
```

Für die beiden Behauptungen (Assertions) verwenden wir zwei neue Funktionen: `toBeInTheDocument` und `toHaveAttribute`. Um zu überprüfen, ob ein Element mit dem Text "Jordan Walke" und ob eines mit dem Text "React" inklusive `href` Attribut im Dokument vorhanden ist.

Die Funktion `getByText` findet die Elemente mit den --- in der Ausgabe sichtbaren --- Texten "Jordan Walke" und "React". Verwende das Äquivalent `getAllByText`, wenn du nach mehr als einem suchst. RTL ist intuitiv aufgebaut. Für viele Funktionen ist diese Namenswahl für die Anwendung auf ein oder alle Elemente entsprechend implementiert.

`getByText` gibt das Element mit einem Text zurück, den Benutzer beim Aufruf der Anwendung sehen. Andererseits ist es bedeutsam, wie Nutzer die App verwenden. So ist `getByText` nicht die einzige Suchfunktion. Weitere häufig verwendete sind `getByRole` oder `getAllByRole`:

{title="src/App.test.js",lang="javascript"}
```
describe('Item', () => {
  test('renders all properties', () => {
    ...
  });

# start-insert
  test('renders a clickable dismiss button', () => {
    render(<Item item={storyOne} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
# end-insert
});
```

Die Funktion `getByRole` wird zum Abrufen von Elementen anhand von [Aria-Label-Attributen](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) verwendet. Es gibt [implizite Rollen für HTML-Elemente](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Roles) --- ähnliche Schaltflächen für ein Schaltflächenelement. So wählst du Elemente nicht nur nach sichtbarem Text aus, sondern nach ihrer Barrierefreiheit. Eine erwähnenswerte Funktion von `getRoleBy` ist, dass [Rollen vorgeschlagen werden](https://twitter.com/rwieruch/status/1260912349978013696). `getByText` und `getByRole` sind die am häufigsten verwendeten Suchfunktionen von RTL.

Der nächste Schritt ist, nicht nur zu behaupten, dass ein Text *im Dokument* vorhanden ist, sondern zusätzlich zu überprüfen, dass Ereignisse wie erwartet funktionieren. Klicke beispielsweise auf das Schaltflächenelement der Item-Komponente, und prüfe, ob der Callback-Handler `handleRemoveItem` aufgerufen wird. Hierfür verwenden wir Jest. Wir erstellen die Funktion `handleRemoveItem` mit `const handleRemoveItem = jest.fn();`. Nachdem du ein Klickereignis mit RTL auf der Schaltfläche ausgelöst hast, prüfen wir, ob `handleRemoveItem` aufgerufen wurde.  
`fireEvent.click(screen.getByRole('button'));` ist eine unkomplizierte Variante, die wir einsetzen, wenn wir nur eine Schaltfläche auf der Site haben, da `screen.getByRole('button')` andernfalls mehr als ein Element zurückgibt:

{title="src/App.test.js",lang="javascript"}
```
describe('Item', () => {
  test('renders all properties', () => {
    ...
  });

  test('renders a clickable dismiss button', () => {
    ...
  });

# start-insert
  test('clicking the dismiss button calls the callback handler', () => {
    const handleRemoveItem = jest.fn();

    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
# end-insert
});
```

Mit Jest übergeben wir testspezifische Funktionen als Eigenschaft (Props). Diese heißen **spy**, **stub**, oder **mock**; Jedes wird für verschiedene Testszenarien verwendet. `jest.fn()` gibt uns ein *mock* für die eigentliche Funktion zurück, aus dem wir auslesen, wann und wie sie aufgerufen wird. So verwenden wir Jest-Assertions wie `toHaveBeenCalledTimes`, um die Anzahl der Aufrufe der Funktion zu bestätigen, oder `toHaveBeenCalledWith`, um die übergebenen Argumente zu überprüfen.

Immer wenn wir eine JavaScript-Funktion prüfen, verwenden wir Jest, um eine Funktion zu erstellen --- unabhängig davon, ob wir testen wie oft oder mit welchen Argumenten sie aufgerufen wurde. Nachdem diese implizit mit `fireEvent` ausgelöst wurde, behaupten wir, dass der bereitgestellte Callback-Handler --- welche die Mock-Funktion ist --- einmal aufgerufen wurde.

Bei den letzten Tests haben wir die Eingabe und Ausgabe der Item-Komponente über Rendering und Assertions getestet. Wir untersuchen keine realen Statusänderungen, da nach dem Klick auf die Schaltfläche "Dismiss" kein tatsächliches Element aus dem DOM entfernt wird. Die Logik zum Entfernen aus der Liste ist in der App-Komponente und wir prüfen Item hier isoliert. Später beim Testen der App werden wir die eigentliche Implementierungslogik zum Entfernen eines Elements überprüfen.

Fahren wir mit der SearchForm-Komponente fort, unter der InputWithLabel angeordnet ist. Zunächst Rendern wir diese mithilfe ihrer Eigenschaften (Props):

{title="src/App.test.js",lang="javascript"}
```
# start-insert
describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  test('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />);

    screen.debug();
  });
});
# end-insert
```

Wir verschaffen uns wieder mithilfe des Debuggens einen Überblick. Danach stellen wir die erste Behauptung (Assertion) für das Suchformular auf. Im Falle von Eingabefeldern ist die Funktion `getByDisplayValue` der perfekte Kandidat. Diese gibt das Feld als Element zurückzugeben. Mit folgendem Test stellen wir sicher, dass das Suchformular beim ersten Aufruf der Anwendung gerendert wird und das Eingabefeld den Text "React" enthält:

{title="src/App.test.js",lang="javascript"}
```
describe('SearchForm', () => {
  const searchFormProps = { ... };

  test('renders the input field with its value', () => {
    render(<SearchForm {...searchFormProps} />);

# start-insert
    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
# end-insert
  });
});
```

Da das Eingabefeld mit einem Standardwert gerendert wird, verwenden wir diesen in unserer Testbehauptung. Wäre dies nicht der Fall, zeigte das Feld unter Umständen einen Platzhalter mit dem HTML-Attribut `placeholder` an. Dann könnten wir eine andere Funktion von RTL namens `getByPlaceholderText` verwenden, um ein Element mit einem Platzhaltertext zu suchen.

Die Debug-Informationen bietet uns viele Optionen zum Abfragen unseres HTML-Codes. Wir fahren mit einem weiteren Test fort, um das gerenderte Label zu testen:

{title="src/App.test.js",lang="javascript"}
```
describe('SearchForm', () => {
  const searchFormProps = { ... };

  test('renders the input field with its value', () => {
    ...
  });

# start-insert
  test('renders the correct label', () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });
# end-insert
});
```

Mit der Funktion `getByLabelText` finden wir ein Element anhand einer Bezeichnung in einem Formular. Dies ist praktisch für Komponenten, die über mehrere Labels und HTML-Steuerelemente verfügen. Hast du bemerkt, wie wir hier den [regulären Ausdruck](https://developer.mozilla.org/de/docs/Web/JavaScript/Guide/Regular_Expressions) `/Search/` nutzen? Wenn wir stattdessen eine normale Zeichenfolge verwendet hätten, müssten wir den Doppelpunkt für "Suche:" einfügen. Durch die Verwendung dieses regulären Ausdrucks werden Strings abgeglichen, die die Zeichenfolge "Search" enthalten. Das macht das Auffinden von Elementen wesentlich komfortabler. Falls du bisher keine regulären Ausdrücke verwendest, sieh dir diese einmal an. Sie erleichtern nach einer Einarbeitungszeit in der Regel das Programmieren enorm.

Auf jeden Fall testen wir die interaktiven Teile von SearchForm. Der Callback-Handler  
`searchFormProps.onSearchSubmit`, der als Eigenschaften (Props) an die SearchForm-Komponente übergeben wird, ist mit Jest durch eine Mock-Funktion ersetzt (`onSearchSubmit: jest.fn()`). Wir prüfen, ob `searchFormProps.onSearchSubmit` aufgerufen wird --- `toHaveBeenCalledTimes` kennst du schon:

{title="src/App.test.js",lang="javascript"}
```
describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  ...

# start-insert
  test('calls onSearchInput on input field change', () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue('React'), {
      target: { value: 'Redux' },
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  test('calls onSearchSubmit on button submit click', () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.submit(screen.getByRole('button'));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
# end-insert
});
```

Ähnlich wie bei der Item-Komponente haben wir die Eingabe (Props) und die Ausgabe (Callback-Handler) für SearchForm getestet. Der Unterschied besteht darin, dass SearchForm eine untergeordnete Komponente namens InputWithLabel rendert. Wenn du die Debug-Ausgabe erneut überprüfst, wirst du feststellen, dass RTL sich nicht für diese untergeordnete Komponente interessiert. Dies liegt daran, dass sich ein Benutzer an der Stelle ebenfalls nicht für sie interessiert. Daher gibt RTL nur den HTML-Code für uns aus.

Wir haben gesehen, dass alle Callback-Handler-Tests für Item- und SearchForm nur prüfen, ob die Funktionen aufgerufen wurden. Hier findet kein React-Re-Rendering statt, da alle Komponenten isoliert ohne Statusverwaltung getestet werden. Daher setzt der eigentliche Test mit RTL weiter oben im Komponentenbaum an, wo Zustandsänderungen und Seiten-Effekte stattfinden.

#### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-testing-unit-component).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des ersten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-testing-unit-function...hs/react-testing-unit-component?expand=1).
* Lese mehr über die [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).
  * Lese mehr über [Suchfunktionen](https://testing-library.com/docs/guide-which-query).
* Füge Tests für Ihre List- und InputWithLabel-Komponenten hinzu.

### Integrationstests: Komponenten

Die React Testing Library basiert auf einer Kernphilosophie: Anstatt die Implementierungsdetails der React-Komponenten zu prüfen, testen wir, wie ein Benutzer mit unserer Anwendung interagieren würde und ob bei der Interaktion alles wie erwartet funktioniert. Dies ist effektiv und gilt insbesondere für Integrationstests.

Um die App-Komponente zu testen, sind Daten erforderlich. Deshalb importieren wir Axios und erstellen eine Mock-Funktion, die wir in der App für unsere Datenanforderung verwenden:

{title="src/App.test.js",lang="javascript"}
```
...

# start-insert
import axios from 'axios';
# end-insert

...

# start-insert
jest.mock('axios');
# end-insert

...
```

Implementiere dann die Daten, die du von einer vorgetäuschten (mock) API-Anforderung zurückgibst, mit einem Promis-Objekt und verwende diese für das Axios-Mock. Danach rendern wir unsere Komponente. Probiere es aus aber sei nicht enttäuscht: Du wirst auf einen Fehler stoßen. Diesen beheben wir im nächsten Schritt:

{title="src/App.test.js",lang="javascript"}
```
# start-insert
describe('App', () => {
  test('succeeds fetching data', () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    screen.debug();
  });
});
# end-insert
```

Jetzt verwenden wir die `act`-Funktion, um darauf zu warten, dass unser Versprechen (Promise) nach dem ersten Rendern der Komponente aufgelöst wird. Mit await implementieren wir dies. Das Tolle an der `debug`-Funktion ist, dass sie die Elemente der App-Komponente vor und nach der Anfrage für uns ausgibt. Sieh es dir praktisch an! Nachfolgend findest du den Code dazu:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {
# start-insert
  test('succeeds fetching data', async () => {
# end-insert
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    screen.debug();

# start-insert
    await act(() => promise);

    screen.debug();
# end-insert
  });
});
```

Wenn wir die `debug`-Ausgabe auswerten, sehen wir, dass der Ladeindikator `Loading ...` für den ersten Aufruf gerendert wird, für den zweiten aber nicht. Dies liegt daran, dass das Abrufen der Daten --- und das erneute Rendern der Komponente --- abgeschlossen ist, nachdem wir das Versprechen in unserem Test mit `act` gelöst haben. Testen wir den Ladeindikator für den zweiten Fall:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {
  test('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

# start-insert
    expect(screen.queryByText(/Loading/)).toBeInTheDocument();
# end-insert

    await act(() => promise);

# start-insert
    expect(screen.queryByText(/Loading/)).toBeNull();
# end-insert
  });
});
```

Wir verwenden dieses Mal `queryByText` anstelle von `getByText`, da wir testen, ob ein zurückgegebenes Element nicht mehr vorhanden ist. Wenn wir `getByText` verwendeten, sähen wir eine Fehlermeldung, da nichts gefunden wird. Aber mit `queryByText` erhalten wir nur einen Fehler, wenn kein Element vorhanden ist.

Wieder verwenden wir einen regulären Ausdruck `/Loading/` anstelle eines Strings `'Loading'`. Wenn wir eine Zeichenfolge verwendeten, wäre es erforderlich, dass wir explizit `'Loading ...'` anstelle von `'Loading'` einsetzen. So ist es unkomplizierter.

Als Nächstes prüfen wir, ob die abgerufenen Daten wie erwartet gerendert werden:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {
  test('succeeds fetching data', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.queryByText(/Loading/)).toBeInTheDocument();

    await act(() => promise);

    expect(screen.queryByText(/Loading/)).toBeNull();

# start-insert
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
    expect(screen.getAllByText('Dismiss').length).toBe(2);
# end-insert
  });
});
```

So, wie wir es gerne hätten, haben wir es jetzt getestet. Auf ähnliche Art und Weise testen wir den Fehlerfall --- eine fehlgeschlagene API-Anfrage. Das einzige, was wir ändern, ist, dass das Versprechen (Promise) abgelehnt wird und dass der Fehler mit einem Try/Catch-Block abgefangen wird:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {
  test('succeeds fetching data', async () => {
    ...
  });

# start-insert
  test('fails fetching data', async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    try {
      await act(() => promise);
    } catch (error) {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
    }
  });
# end-insert
});
```

Stellst du dir die Frage, wann du `getBy` und wann `queryBy` verwendest? Als Faustregel: Gebrauche `getBy` für einzelne und `getAllBy` für mehrere Elemente. Wenn du nach etwas suchst, das unter Umständen nicht vorhanden ist, nutze `queryBy` (oder `queryAllBy`). Der Einfachheit halber habe ich in diesem Beispiel ausschließlich `queryBy` verwendet.

Wir wissen, dass das anfängliche Abrufen von Daten jetzt für unsere App-Komponente funktioniert. Als Nächstes testen wir die Benutzerinteraktionen, die wir zuvor nur in den untergeordneten Komponenten getestet haben, indem wir Ereignisse ohne Status und Seiten-Effekte ausgelöst haben. Wir entfernen ein Element aus der Liste, nachdem die Daten erfolgreich abgerufen wurden. Da "Jordan Walke" unser erste Eintrag ist, wird er entfernt, wenn wir auf die oberste "Dismiss"-Schaltfläche klicken:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {

  ...

# start-insert
  test('removes a story', async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await act(() => promise);

    expect(screen.getAllByText('Dismiss').length).toBe(2);
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Dismiss')[0]);

    expect(screen.getAllByText('Dismiss').length).toBe(1);
    expect(screen.queryByText('Jordan Walke')).toBeNull();
  });
# end-insert
});
```

Als Nächstes werden wir die Suchfunktion testen. Wir richten das Mock etwas anders als zuvor ein, weil wir nicht nur die anfängliche Suchanfrage beachten. Wir decken zusätzlich potentielle zukünftige Suchen ab:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {

  ...

# start-insert
  test('searches for specific stories', async () => {
    const reactPromise = Promise.resolve({
      data: {
        hits: stories,
      },
    });

    const anotherStory = {
      title: 'JavaScript',
      url: 'https://en.wikipedia.org/wiki/JavaScript',
      author: 'Brendan Eich',
      num_comments: 15,
      points: 10,
      objectID: 3,
    };

    const javascriptPromise = Promise.resolve({
      data: {
        hits: [anotherStory],
      },
    });

    axios.get.mockImplementation(url => {
      if (url.includes('React')) {
        return reactPromise;
      }

      if (url.includes('JavaScript')) {
        return javascriptPromise;
      }

      throw Error();
    });
  });
# end-insert
});
```

Anstatt die Anfrage einmal mit Jest (`mockImplementationOnce`) zu simulieren, täuschen wir jetzt mehrere Anfragen (` mockImplementation`) vor. Abhängig von der eingehenden URL gibt die Anforderung entweder die ursprüngliche ("React") oder die neue Liste ("JavaScript") zurück. Für den Fall, dass wir eine falsche URL für die Anfrage angeben, wird beim Test ein Fehler ausgegeben. Dies ist gleichzeitig ein Hinweis, dass wir den Test nicht korrekt eingerichtet haben. Lasse uns wie zuvor die App-Komponente rendern:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {

  ...

  test('searches for specific stories', async () => {
    const reactPromise = Promise.resolve({ ... });

    const anotherStory = { ... };

    const javascriptPromise = Promise.resolve({ ... });

    axios.get.mockImplementation((url) => {
      ...
    });

# start-insert
    // Initial Render

    render(<App />);

    // First Data Fetching

    await act(() => reactPromise);

    expect(screen.queryByDisplayValue('React')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('JavaScript')).toBeNull();

    expect(screen.queryByText('Jordan Walke')).toBeInTheDocument();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeInTheDocument();
    expect(screen.queryByText('Brendan Eich')).toBeNull();
# end-insert
  });
});
```

Wir lösen das erste Versprechen für das anfängliche Rendern und erwarten, dass das Eingabefeld "React" und die beiden Elemente in der Liste die Ersteller von React und Redux rendert. Wir stellen außerdem sicher, dass kein JavaScript bezogener Eintrag angezeigt wird. Als Nächstes ändern wir den Wert des Eingabefelds mittels `fireEvent.change(...)`:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {

  ...

  test('searches for specific stories', async () => {

    ...

    expect(screen.queryByText('Jordan Walke')).toBeInTheDocument();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeInTheDocument();
    expect(screen.queryByText('Brendan Eich')).toBeNull();

# start-insert
    // User Interaction -> Search

    fireEvent.change(screen.queryByDisplayValue('React'), {
      target: {
        value: 'JavaScript',
      },
    });

    expect(screen.queryByDisplayValue('React')).toBeNull();
    expect(
      screen.queryByDisplayValue('JavaScript')
    ).toBeInTheDocument();
# end-insert
  });
});
```

Zuletzt senden wir diese Suchanforderung, indem wir die Schaltfläche klicken. Der neue Suchbegriff wird aus dem Status der App-Komponente verwendet. Daher wird jetzt nach JavaScript bezogenen Einträgen gesucht, die wir zuvor "gemocked" haben:

{title="src/App.test.js",lang="javascript"}
```
describe('App', () => {

  ...

  test('searches for specific stories', async () => {

    ...

    expect(screen.queryByDisplayValue('React')).toBeNull();
    expect(
      screen.queryByDisplayValue('JavaScript')
    ).toBeInTheDocument();

# start-insert
    fireEvent.submit(screen.queryByText('Submit'));

    // Zweiter Datenabruf

    await act(() => javascriptPromise);

    expect(screen.queryByText('Jordan Walke')).toBeNull();
    expect(
      screen.queryByText('Dan Abramov, Andrew Clark')
    ).toBeNull();
    expect(screen.queryByText('Brendan Eich')).toBeInTheDocument();
# end-insert
  });
});
```

Jetzt wird Brendan Eich als Schöpfer von JavaScript gerendert, während die anderen nicht mehr angezeigt werden. Der letzte Test hat gezeigt, wie du ein Testszenario in einem Testfall darstellst. Mit unseren Tools durchlaufen wir jeden Schritt --- das anfängliche Abrufen, das Ändern des Werts des Eingabefelds, das Senden des Formulars und das Anfragen neuer Daten von der API.

Die React Testing Library und Jest sind in Kombination der Status quo, beim Testen von React-Anwendungen. Während RTL dir alle relevanten Testtools für React bietet, wird Jest mit dem allgemeinen Testframework für Testsuiten, Testfälle, Assertions und Mock-Funktionen geliefert. Der Vollständigkeit halber: Eine beliebte Alternative zu RTL ist [Enzyme] (https://www.robinwieruch.de/react-testing-jest-enzyme) von Airbnb.

#### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-testing-integration).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des vorherigen Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-testing-unit-component...hs/react-testing-integration?expand=1).
* Lese mehr zu [E2E-Tests in React](https://www.robinwieruch.de/react-testing-cypress).
* Halten deine Tests grün und füge neue hinzu während du weiter im Buch arbeitetst.

### Schnappschuss-Tests

Facebook kam unabhängig von der Testpyramide auf die Idee, Schnappschuss-Tests in React durchzuführen. Ziel war eine unkompliziertere Vorgehensweise. Grundsätzlich ist ein "Snapshot-Test" eine Momentaufnahme. Diese wird verwendet, um sie mit anderen zu vergleichen. Wenn sich die Ausgabe der Komponente geändert hat, wird die Differenz angezeigt und der Schnappschuss-Test schlägt fehl. Ergo: Du siehst einen Fehler, wenn sich die Ausgabe der Komponente bei gleichen Testvoraussetzungen ändert. Falls ein Schnappschuss-Test fehlschlägt, hast du zwei Möglichkeiten: Du akzeptierst das Ergebnis oder du lehnst es ab. Bei Ersterem bestätigst du die Abweichung als korrekt. Bei Letzterem gibt es de facto einen Fehler und du korrigierst die Implementierung der Komponente.

Durch die Verwendung von Schnappschüssen hältst du deine Tests leichtgewichtig. Du prüfst, ohne die Implementierungsdetails der Komponente zu kennen. Sehen wir uns das praktisch an:

{title="src/App.test.js",lang="javascript"}
```
describe('SearchForm', () => {

  ...

# start-insert
  test('renders snapshot', () => {
    const { container } = render(<SearchForm {...searchFormProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
# end-insert
});
```

Nachdem du den Tests mit `npm test` aufgerufen hast, ist in deinem Projekt ein neuer Ordner namens *src/__snapshots__* vorhanden. Navigiere in diesen und überprüfen die Datei, die gespeichert wurde. Ähnlich wie bei der `debug`-Funktion ist es eine Momentaufnahme in HTML. In unserem Fall wurde SearchForm aufgenommen. Navigiere jetzt zu *src/App.js* und ändere etwas. Entferne beispielsweise in SearchForm den fett gedruckten Text:

```js
const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
# start-insert
      Search:
# end-insert
    </InputWithLabel>

    <button type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);
```

Nachdem du den Tests erneut aufgerufen hast, siehst du in der Befehlszeile unter anderem Folgendes:

{title="Command Line",lang="text"}
```
- Snapshot
+ Received

    <label
      for="search"
    >
-     <strong>
-       Search:
-     </strong>
+     Search:
    </label>
```

Dies ist der typische Fall für einen Schnappschuss-Test. Wann immer sich die HTML-Struktur einer Komponente ändert, wirst du in darüber informiert. Entweder du akzeptierst den Hinweis: Korrigiere in diesem Fall die Datei *src/App.js*. Wenn du den Korrekturhinweis nicht annimmst, drücke "u" eine neue korrigierter Momentaufnahme wird erstellt. Probiere es selbst aus und sieh, wie die Datei im Ordner *src/__snapshots__* die Änderungen anwendet.

Jest speichert Momentaufnahmen in einem Ordner, damit der Unterschied zu zukünftigen Tests überprüft wird. Benutzer geben diese für die Versionskontrolle (z. B. Git) teamübergreifend frei. Wenn du zum ersten Mal einen Schnappschuss-Test aufrufst, wird die Datei mit der Momentaufnahme im Ordner deines Projekts erstellt. Wenn der Test erneut aufgerufen wird, wird erwartet, dass die Momentaufnahme mit der aus dem letzten Testlauf übereinstimmt. So stellen wir sicher, dass das DOM gleich bleibt --- beziehungsweise unerwartete Änderungen überprüft werden.

Schnappschuss-Tests eignen sich, um Tests in React schnell zum Laufen zu bringen. Erstelle aber nicht für jede Komponente Momentaufnahmen. Allgemein wird empfohlen, Schnappschuss-Tests für Elemente zu verwenden, die nicht häufig aktualisiert werden und nicht zu komplex sind.

#### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/react-snapshot).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des vorherigen Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-testing-integration...hs/react-snapshot?expand=1).
* Ergänze für jede Komponente einen Snapshot-Test und überprüfe den Inhalt des Ordners *__snapshots__*.
<img src="https://vg07.met.vgwort.de/na/f4321aa66ddb4aae841a6c8c9e26a072" width="1" height="1" alt="">
