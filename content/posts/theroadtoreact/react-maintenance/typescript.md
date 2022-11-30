---
description: 'desc'
set: ''
booklink: ''
syndication:
shortTitle: 'short'
date: 2021-08-03
title: 'TypeScript und React'
template: post
thumbnail: '../../thumbnails/react.png'
slug: react-lernen-react-maintenance-react-und-typescript
langKey: de
categories:
  - React
tags:
  - JavaScript
  - React
---

## TypeScript und React

TypeScript für JavaScript und React bietet dir viele Vorteile. Du entwickelst mit diesem Werkzeug robustere Anwendungen. Anstatt erst zur Laufzeit Typfehler in der Befehlszeile oder im Browser zu erhalten, wirst du mit TypeScript schon vorher von einer Entwicklungsumgebung auf diese hingewiesen. Nebenbei wird der Code lesbarer, da jede Variable mit einem Typ definiert ist. Das Verschieben von Codeblöcken oder das Überarbeiten des Programmcodes ist effizienter möglich. Statisch typisierte Sprachen wie TypeScript sind aufgrund dieser Vorteile gegenüber dynamischen, wie purem JavaScript, beliebt. Es ist sinnvoll, [TypeScript](https://www.typescriptlang.org/index.html) genauer anzusehen.

Um TypeScript in React zu verwenden, installiere das Framework und seine Abhängigkeiten über die Befehlszeile. Wenn du auf Probleme stößt, befolge die offiziellen Installationsanweisungen auf der Website der [*Create React App*](https://create-react-app.dev/docs/adding-typescript/):

{title="Command Line",lang="text"}
```
npm install --save typescript @types/node @types/react
npm install --save typescript @types/react-dom @types/jest
```

Benenne anschließend alle JavaScript-Dateien (*.js*) in TypeScript-Dateien (*.tsx*) um.

{title="Command Line",lang="text"}
```
mv src/index.js src/index.tsx
mv src/App.js src/App.tsx
```

Nach dem Umbenennen ist ein Neustart des Entwicklungsservers notwendig: Jetzt treten Kompilierungsfehler im Browser und in der Entwicklungsumgebung (IDE) auf. Wenn Letzteres der Fall ist, installiere ein TypeScript-Plugin oder eine TypeScript-Erweiterung für deine IDE. An Ersterem arbeiten wir nachfolgend. Wir sorgen für eine [Typsicherheit](https://de.wikipedia.org/wiki/Typsicherheit) in der Datei *src/App.tsx*. Fangen wir mit `useSemiPersistentState` an:

{title="src/App.tsx",lang="javascript"}
```
const useSemiPersistentState = (
# start-insert
  key: string,
  initialState: string
# end-insert
) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
```

Nachfolgend stellen wir sicher, dass `useSemiPersistentState` zwei Argumente vom Typ String erwartet. Wir könnten der Funktion mitteilen, dass sie ein Array (`[]`) mit einem `string` (state) zurückgibt. Der *Statusaktualisierungsfunktion* teilen wir mit, dass sie ein `value` annimmt und nichts (`void`) erwidert:

{title="src/App.tsx",lang="javascript"}
```
const useSemiPersistentState = (
  key: string,
  initialState: string
# start-insert
): [string, (newValue: string) => void] => {
# end-insert
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
```

Aufgrund der vorherigen Verbesserungen ist es nicht notwendig, Typen in den Funktionskörpern hinzufügen. Das liegt daran, dass [**Typinferenz**](https://de.wikipedia.org/wiki/Typinferenz) standardmäßig in React-Hooks funktioniert. Wenn der *Anfangszustand* eines `useState`-Hook ein JavaScript-String-Grundelement ist, wird der zurückgegebene *aktuelle Zustand* als String abgeleitet und die zurückgegebene *Statusaktualisierungsfunktion* nimmt nur einen String als Argument und gibt nichts zurück:

```
const [value, setValue] = React.useState('React');
// Es wird davon ausgegangen, dass value eine Zeichenfolge ist
// setValue verwendet nur eine Zeichenfolge als Argument
```

Beim Umarbeiten/Refactoring einer React-Anwendung hin zu Typensicherheit, hast du die Wahl zwischen unterschiedlichen Vorgehensweisen. Ich arbeite als Erstes an den Eigenschaften (Props) und dem Status der Blattkomponenten im Komponentenbaum. Beispielsweise erhält die Item-Komponente ein Element (hier `item`) und eine Callback-Handler-Funktion (hier `onRemoveItem`). Füge die Inline-Typen für beide Funktionsargumente wie zuvor hinzu:

{title="src/App.tsx",lang="javascript"}
```
const Item = ({
  item,
  onRemoveItem,
# start-insert
}: {
  item: {
    objectID: string;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
  };
  onRemoveItem: (item: {
    objectID: string;
    url: string;
    title: string;
    author: string;
    num_comments: number;
    points: number;
  }) => void;
}) => (
# end-insert
  <div>
    ...
  </div>
);
```

Es gibt zwei Probleme: Der Code ist ausführlich und enthält Wiederholgungen. Wir beheben beide Mängel auf einen Schlag, indem wir einen eigenen `Story`-Typ außerhalb der Komponenten oben in der Datei *src/App.js* definieren:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};
# end-insert

...

const Item = ({
  item,
  onRemoveItem,
# start-insert
}: {
  item: Story;
  onRemoveItem: (item: Story) => void;
}) => (
# end-insert
  <div>
    ...
  </div>
);
```

Das `item` ist vom Typ `Story`; Die Funktion `onRemoveItem` verwendet ein `item` vom Typ `Story` als Argument und gibt nichts zurück. Bereinige als Nächstes den Code, indem du die Eigenschaften der Item-Komponente außerhalb definierst:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};
# end-insert

# start-insert
const Item = ({ item, onRemoveItem }: ItemProps) => (
# end-insert
  <div>
    ...
  </div>
);
```

Dies ist die beliebteste Methode, um Eigenschaften (Props) für TypeScript umzuarbeiten. Wechseln wir in die List-Komponente und wenden dies hier ebenfalls an:

{title="src/App.tsx",lang="javascript"}
```
type Story = {
  ...
};

# start-insert
type Stories = Array<Story>;
# end-insert

...

# start-insert
type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};
# end-insert

# start-insert
const List = ({ list, onRemoveItem }: ListProps) =>
# end-insert
  list.map(item => (
    <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));
```

Die Funktion `onRemoveItem` wird zweimal eingegeben, jeweils einmal für `ItemProps` und `ListProps`. Erledigen *könnten* wir dies mit einem eigenständigen TypScript-Typ `OnRemoveItem`. Diesen verwendeten wir an beiden Stellen. Beachte, dass die Entwicklung zunehmend komplexer wird, da Komponenten in verschiedene Dateien aufgeteilt werden. Deshalb behalten wir die doppelten Texte hier bei.

Da wir die Typen `Story` und `stories` haben, verwenden wir sie für andere Komponenten. Füge den Typ `Story` zum Callback-Handler in der `App` hinzu:

{title="src/App.tsx",lang="javascript"}
```
const App = () => {
  ...

# start-insert
  const handleRemoveStory = (item: Story) => {
# end-insert
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  ...
};
```

`storiesReducer` verwaltet den Typ `Story`, ohne die Typen `state` und `action` festzulegen. Als Entwickler der Anwendung kennen wir beide Objekte, inklusive ihre Eigenschaften und Typen. Deshalb vervollständigen wir dies:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};
# end-insert

# start-insert
type StoriesAction = {
  type: string;
  payload: any;
};
# end-insert

# start-insert
const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
# end-insert
  ...
};
```

Der Typ `Action` mit seinen Typdefinitionen `string` und `any` (TypeScript **Wildcard**) ist zu weit gefasst. Wir gewinnen dadurch keine echte Typensicherheit, weil Aktionen nicht unterscheidbar sind. Indem wir jeden TypeScript-Aktionstyp als **Schnittstelle** angeben und einen **Vereinigungstyp** (hier `StoriesAction`) für die endgültige Typensicherheit verwenden, verbessern wir dieses Manko:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}
# end-insert

# start-insert
interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}
# end-insert

# start-insert
interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}
# end-insert

# start-insert
interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}
# end-insert

# start-insert
type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;
# end-insert

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  ...
};
```

Der Status der `stories`, der aktuelle Status und die Aktion sind Typen; Der zurückgegebene neue Status ist jetzt [typsicher](https://de.wikipedia.org/wiki/Typsicherheit). Wenn du beispielsweise eine Aktion mit einem nicht definierten Aktionstyp an `useReducer` sendest, wird ein Typfehler angezeigt. Wenn du der Funktion `handleRemoveStory`, die ein `item` entfernt, etwas anderes als ein Objekt vom Typ `Story` übergibst, erhältst du ebenfalls einen Fehlerhinweis bezüglich des falschen Typs.

In der `return`-Anweisung der App für die zurückgegebene List-Komponente gibt es weiterhin ein Typensicherheitsproblem. 

Laut einem [TypeScript mit React-Issue auf GitHub](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/issues/57): *"Dies liegt daran, dass Funktionskomponenten aufgrund von Einschränkungen im Compiler nur einen JSX-Ausdruck oder null zurückgeben. Andernfalls wird eine kryptische Fehlermeldung angezeigt, die besagt, dass der Typ nicht zugewiesen werden kann."*

Wir beheben dies, indem wir der List-Komponente ein umgebendes `div`-Element oder ein React-Fragment zuweisen:

{title="src/App.tsx",lang="javascript"}
```
const List = ({ list, onRemoveItem }: ListProps) => (
# start-insert
  <>
    {list.map(item => (
# end-insert
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
# start-insert
    ))}
  </>
# end-insert
);
```

Konzentrieren wir uns auf die SearchForm-Komponente, welche Callback-Handler mit Ereignissen beinhaltet:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
# end-insert

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
# start-insert
}: SearchFormProps) => (
# end-insert
  ...
);
```

Oft reicht es aus, `React.SyntheticEvent` anstelle von `React.ChangeEvent` oder `React.FormEvent`  zu verwenden. Die Eventhandler stellen eine Instanz von [SyntheticEvent](https://de.reactjs.org/docs/events.html) dar. Wechseln wir zur App-Komponente und wenden trotzdem `React.ChangeEvent` und `React.FormEvent` an:

{title="src/App.tsx",lang="javascript"}
```
const App = () => {
  ...

  const handleSearchInput = (
# start-insert
    event: React.ChangeEvent<HTMLInputElement>
# end-insert
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (
# start-insert
    event: React.FormEvent<HTMLFormElement>
# end-insert
  ) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  ...
};
```

Übrig bleibt die InputWithLabel-Komponente. Bevor wir uns mit deren Eigenschaften (Props) befassen, werfen wir einen Blick auf `ref`. Leider wird der Rückgabewert nicht festgelegt. Korrigieren wir dies:

{title="src/App.tsx",lang="javascript"}
```
const InputWithLabel = ({ ... }) => {
# start-insert
  const inputRef = React.useRef<HTMLInputElement>(null!);
# end-insert

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);
```

Wir haben den Typ für `ref` festgelegt. Außerdem haben wir den Typ vor dem Überschreiben geschützt. Wir greifen nur lesend auf ihn zu, in der Methode `focus`. Dort übernimmt React für uns die Arbeit und setzt das DOM-Element auf die Eigenschaft `current`.

Zuletzt werden wir Typensicherheitsprüfungen für die Eigenschaften (Props) der InputWithLabel-Komponente anwenden. Beachte die `children`-Eigenschaft mit ihrem spezifischen Typ und den **optionalen Typen**, die mit einem Fragezeichen gekennzeichnet sind:

{title="src/App.tsx",lang="javascript"}
```
# start-insert
type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};
# end-insert

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
# start-insert
}: InputWithLabelProps) => {
# end-insert
  ...
};
```

Die Eigenschaften `type` und `isFocused` sind optional. Mit TypeScript hast du die Möglichkeit, dem Compiler mitzuteilen, dass diese nicht an die Komponente übergeben werden. Die `childen`-Eigenschaft enthält viele TypeScript-Typdefinitionen, die auf dieses Konzept anwendbar sind. Die universellste davon ist` React.ReactNode`.

Unsere gesamte React-Anwendung wird von TypeScript geprüft, sodass Tippfehler bei der Kompilierung auffallen --- und nicht erst zur Laufzeit im Browser. Wenn du deine React-Anwendung mit TypeScript nutzt, ergänze als erstes bei allen Argumenten die Typdefinitionen. Hierzu bearbeitest du JavaScript-Funktionen, benutzerdefinierte React-Hooks oder React-Funktionskomponenten. Bei der Verwendung von React ist es wichtig, das du dich mit Typen für Formularelemente, Ereignisse und JSX auskennst.

### Übungen:

* Begutachte den [Quellcode dieses Abschnitts](https://codesandbox.io/s/github/the-road-to-learn-react/hacker-stories/tree/hs/TypeScript-in-React).
  * Reflektiere die [Änderungen gegenüber dem Stand der Anwendung am Ende des ersten Kapitels](https://github.com/the-road-to-learn-react/hacker-stories/compare/hs/react-modern-final...hs/TypeScript-in-React?expand=1).
* Stöbere im [React + TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets). Dort findest du viele Anwendungsfälle und deren Lösung. Es ist nicht nötig, alles auswendig zu wissen, wenn du weißt, wo es nachlesbar ist.
* Entscheide dich, ob du beim Weiterlesen TypeScript nutzt oder nicht. Lösche die hier vorgenommen Ergänzungen, wenn du dich dagegen entscheidest. Andernfalls füge beim Weiterarbeiten neue Typen hinzu, wenn du auf einen Kompilierungsfehler stößt.
<img src="https://vg07.met.vgwort.de/na/ad06c85b801b4c8ca792e75cc579c28a" width="1" height="1" alt="">
