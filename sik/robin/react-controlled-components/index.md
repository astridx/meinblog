---
title: "What are Controlled Components in React?"
description: "A brief explanation for uncontrolled vs controlled components in React. The example shows an input field which we will transition from a uncontrolled to controlled input field ..."
date: "2019-04-10T07:52:46+02:00"
categories: ["React"]
keywords: ["react controlled components", "react uncontrolled components", "react controlled vs components", "react controlled input"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

There are quite a lot of articles about React out there speaking about controlled and uncontrolled components without explaining them. It has been quite similar for my articles, whereas I always tried to add at least one or two sentences explaining them, but in the end, I thought it would be great to have a brief tutorial just showing a simple example for controlled components in React.

Let's take the following input field element which is rendered within our [function component](/react-function-component/). Even though the input field is the uncontrolled input element here, we are often referring to the enclosing App component being the uncontrolled component:

```javascript
import React from 'react';

const App = () => (
  <div>
    <label>
      My uncontrolled Input: <input type="text" />
    </label>
  </div>
);

export default App;
```

*Note: It doesn't matter for controlled or uncontrolled elements whether the component itself is a [function or class component](/react-component-types/). Uncontrolled elements -- such as text inputs, checkboxes, radio buttons, and entire forms with inputs -- can always be uncontrolled or controlled.*

It's an uncontrolled input field, because once you start the application, you can type something into the field and see changes even though we are not giving any instructions in our source code. There is no line written to display the value in the input field and no line written to change the value when we type something into it. After all, that's because we deal with HTML here and it's the native behavior of the input field, because it manages its own internal state.

# Uncontrolled vs. Controlled Component

Let's see another case where it isn't clear whether we are dealing with an uncontrolled or controlled component. The next example adds [state management](/react-state-usereducer-usestate-usecontext) with [React Hooks](/react-hooks/) to our function component:

```javascript{1,4,6,11,12,15,16,17}
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('');

  const handleChange = event => setValue(event.target.value);

  return (
    <div>
      <label>
        My still uncontrolled Input:
        <input type="text" onChange={handleChange} />
      </label>

      <p>
        <strong>Output:</strong> {value}
      </p>
    </div>
  );
};

export default App;
```

We also show the current value as output. Ask yourself: Why is this component (element) still uncontrolled? When you start the application, the input field shows the same value as the output paragraph. That should be alright, shouldn't it? Let's see why it isn't. Try the following initial state instead:

```javascript{4}
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('Hello React');

  const handleChange = event => setValue(event.target.value);

  return (
    <div>
      <label>
        My still uncontrolled Input:
        <input type="text" onChange={handleChange} />
      </label>

      <p>
        <strong>Output:</strong> {value}
      </p>
    </div>
  );
};

export default App;
```

Now you can see the difference. While the input field shows an empty field, the output paragraph shows the initial state. Only when you start typing into the input field, both elements *seem* to synchronize, but they don't, because the input field still tracks its own internal state while the output paragraph is driven by the actual React state coming from the handler function. So even though they output the same when you start typing, the underlying source of the value is different:

* input field receives its value from internal DOM node state
* output paragraph receives its value from React's state

Having an uncontrolled element/component in your React application can lead to unwanted behavior and therefore bugs. You want to drive your UI from one source of truth instead; which in React should be props and state. Given the same props and state to a component, it should always render the same output: `(props, state) => view`.

# From Uncontrolled to Controlled Component

You can change the input from uncontrolled to controlled by controlling its value yourself. For instance, in this case the input field offers a value attribute:

```javascript{11,12}
import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState('Hello React');

  const handleChange = event => setValue(event.target.value);

  return (
    <div>
      <label>
        My controlled Input:
        <input type="text" value={value} onChange={handleChange} />
      </label>

      <p>
        <strong>Output:</strong> {value}
      </p>
    </div>
  );
};

export default App;
```

By giving the input the value from React's state, it doesn't use anymore its internal state, but the state you provided from React. Now the initial state should be seen for the input field and for the output paragraph once you start the application. Also when you type something in the input field, both input field and output paragraph are synchronized by React's state. The input field has become a controlled element and the App component a controlled component. You are in charge what is displayed in your UI. You can see different input elements implemented as controlled components in this [GitHub repository](https://github.com/the-road-to-learn-react/react-controlled-components-examples).
