---
title: "How to use Redux in React Firebase"
description: "The tutorial shows you how to migrate a React with Firebase application, which uses only React's local state, to Redux for its state management. Also React's Context API is replaced with Redux ..."
date: "2019-02-10T07:52:46+02:00"
categories: ["React", "Firebase", "Redux"]
keywords: ["react firebase redux tutorial"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ReactFirebaseBook />

<LinkCollection
  label="This tutorial is part 10 of 10 in this series."
  links={[
    {
      prefix: "Part 1:",
      label: "A Firebase in React Tutorial for Beginners",
      url: "/complete-firebase-authentication-react-tutorial"
    },
    {
      prefix: "Part 2:",
      label: "React Firebase Authorization with Roles",
      url: "/react-firebase-authorization-roles-permissions"
    },
    {
      prefix: "Part 3:",
      label: "React Firebase Auth Persistence with Local Storage",
      url: "/react-firebase-auth-persistence"
    },
    {
      prefix: "Part 4:",
      label: "React Firebase Social Login: Google, Facebook, Twitter",
      url: "/react-firebase-social-login"
    },
    {
      prefix: "Part 5:",
      label: "React Firebase: Link Social Logins",
      url: "/react-firebase-link-social-logins"
    },
    {
      prefix: "Part 6:",
      label: "React Firebase: Email Verification",
      url: "/react-firebase-email-verification"
    },
    {
      prefix: "Part 7:",
      label: "How to use React Router with Firebase",
      url: "/react-firebase-router"
    },
    {
      prefix: "Part 8:",
      label: "How to use Firebase Realtime Database in React",
      url: "/react-firebase-realtime-database"
    },
    {
      prefix: "Part 9:",
      label: "How to deploy a React application to Firebase",
      url: "/firebase-deploy-react-js"
    }
  ]}
/>

The previous tutorial series covered a lot of ground for Firebase in React. So far, it was fine to rely only on React's local state and React's Context API. This tutorial dives into using Redux on top of React and Firebase for state management. You will exchange React's local state (e.g. users on admin page, messages on home page) and React's context (e.g. session management for authenticated user) with Redux. It will show you how to accomplish the same thing with Redux in case you want to integrate it into a tech stack.

This section is divided into two parts, the first of which will set up Redux. You will add the state layer separately from the view layer. Afterward, you will connect Redux with React by providing the Redux store with React's Context API to your React components. The second part exchanges the current React state layer with the Redux state layer:

* Authenticated User in React Local State + React Context -> Authenticated User in Redux Store.
* Users in React Local State -> Users in Redux Store.
* Messages in React Local State -> Messages in Redux Store.

If you are not familiar with Redux, I recommend to check out [The Road to Redux](http://roadtoredux.com). Most of the Redux knowledge about Actions, Reducers, and the Store are required for the following migration from only using React to Redux.

# Redux Setup in React Firebase Application

Let's get started by installing [redux](https://redux.js.org/) and [react-redux](https://github.com/reactjs/react-redux) on the command line:

```javascript
npm install redux react-redux
```

We focus on the Redux setup without worrying about Firebase or React. First is the Redux store implementation.  Create a folder and file for it using the *src/* folder type:

```javascript
mkdir store
cd store
touch index.js
```

Second, add the store in the new file as singleton instance, because there should be only one Redux store. The store creation takes a root reducer which isn't defined.

```javascript
import { createStore } from 'redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;
```

Third, create a dedicated module for the reducers. There's a reducer for the session state (e.g. authenticated user) and reducers for the user and message states (e.g. list of users and messages from the Firebase realtime database). There's an entry point file to the module to combine those reducers as root reducer to pass it to the Redux store, like the previous step. Again, from your *src/* folder type:

```javascript
mkdir reducers
cd reducers
touch index.js session.js user.js message.js
```

First, add the session reducer which manages the `authUser` object. The authenticated user represents the session in the application. The reducer deals only with one incoming action which either sets the `authUser` to the actual authenticated user or `null`:

```javascript
const INITIAL_STATE = {
  authUser: null,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER_SET': {
      return applySetAuthUser(state, action);
    }
    default:
      return state;
  }
}

export default sessionReducer;
```

The user reducer deals with the list of users from the Firebase realtime database. It sets either the whole object of users as dictionary, or a single user identified by a unique identifier:

```javascript
const INITIAL_STATE = {
  users: null,
};

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users,
});

const applySetUser = (state, action) => ({
  ...state,
  users: {
    ...state.users,
    [action.uid]: action.user,
  },
});

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_SET': {
      return applySetUsers(state, action);
    }
    case 'USER_SET': {
      return applySetUser(state, action);
    }
    default:
      return state;
  }
}

export default userReducer;
```

The message reducer deals with the list of messages from the Firebase realtime database. Again, it sets the whole object of messages as dictionary, but also a limit for the pagination feature we implemented earlier:

```javascript
const INITIAL_STATE = {
  messages: null,
  limit: 5,
};

const applySetMessages = (state, action) => ({
  ...state,
  messages: action.messages,
});

const applySetMessagesLimit = (state, action) => ({
  ...state,
  limit: action.limit,
});

function messageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'MESSAGES_SET': {
      return applySetMessages(state, action);
    }
    case 'MESSAGES_LIMIT_SET': {
      return applySetMessagesLimit(state, action);
    }
    default:
      return state;
  }
}

export default messageReducer;
```

Finally, combine all reducers into a root reducer in the *src/reducers/index.js* file to make it accessible for the store creation:

```javascript
import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import messageReducer from './message';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
});

export default rootReducer;
```

You have passed the root reducer with all its reducers to the Redux store creation, so the Redux setup is done. Now you can connect your state layer with your view layer. The Redux store can be provided for the component hierarchy using Redux's Provider component. This time, the Provider component from the Redux library passes down the whole store instead of only the authenticated user. In *src/index.js* file:

```javascript{3,5,10,14}
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root'),
);
```

That's it for connecting both worlds, so we'll refactor almost everything from React's local state to Redux. We want to have everything in the Redux store that should be persisted when we navigate from route to route. This includes users, messages, and the authenticated user, but maybe not the loading states.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VplHuW).

# Manage Firebase's authenticated User in Redux Store

We are managing the authenticated user with React's Context API. We provide the authenticated user in a Provider component and consume it wherever we want with a Consumer component. Let's change this by storing the authenticated user in the Redux store instead and connecting all components that are interested in it to the Redux store. In the authentication higher-order component, we make the dispatchable action that stores the authenticated user in the Redux store, which is available as function in the props of the connected component:

```javascript{2,3,12,13,14,15,17,19,20,21,22,23}
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    ...
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({ type: 'AUTH_USER_SET', authUser }),
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;
```

Next, use the function to set the authenticated user in the Redux store by setting it to React's local state like before. We don't need to provide the authenticated user anymore with React's Context Provider component, because it will be available for every component that connects to the store:

```javascript{6,7,8,15,19,29}
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.onSetAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.props.onSetAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          this.props.onSetAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  ...
};

export default withAuthentication;
```

That's it for storing and providing the authenticated user for the Redux store. Let's see how we can consume it in the Navigation component for the conditional rendering of the routes without React's Context, and with the Redux store instead:

```javascript{3,9,18,19,20,22}
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = ({ authUser }) =>
  authUser ? (
    <NavigationAuth authUser={authUser} />
  ) : (
    <NavigationNonAuth />
  );

...

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
```

We can do the same in our other components that are interested in the authenticated user. For instance, the authorization higher-order component can rely on the Redux store as well:

```javascript{3,14,15,16,20,21,22,27}
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    ...

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;
```

Also, our other authorization component for the email verification can make use of it:

```javascript{2,3,14,15,16,20,21,22,24,26,27}
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

...

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    ...

    render() {
      return needsEmailVerification(this.props.authUser) ? ( ... ) : (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  });

  return compose(
    withFirebase,
    connect(mapStateToProps),
  )(WithEmailVerification);
};

export default withEmailVerification;
```

And last but not least, the AccountPage component which displays the authenticated user but also renders the component that manages all the sign in methods for the user:

```javascript{2,12,23,24,25,30}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { withFirebase } from '../Firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

...

const AccountPage = ({ authUser }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
    <LoginManagement authUser={authUser} />
  </div>
);

...

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
```

Now you can remove the React Context for providing and consuming the authenticated user in the *src/components/Session/context.js* and *src/components/Session/index.js* files:

```javascript
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';
import withEmailVerification from './withEmailVerification';

export {
  withAuthentication,
  withAuthorization,
  withEmailVerification,
};
```

That's it for storing the authenticated user in the Redux store, which takes place in the authentication higher-order component and for consuming the authenticated user in every component which is interested in it by connecting the Redux store.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VpQLL8).

# Manage Firebase's Users in Redux Store

We implemented the session management with the authenticated user with Redux instead of React's local state and context API. Next, we will migrate the user management over to Redux. The users are mainly used in the AdminPage component's UserList and UserItem components. Our goal here is to navigate from UserList to UserItem and back with React Router without losing the state of the users. The UserList component fetches and shows a list of users, while the UserItem component fetches and shows a single user entity. If the data is already available in the Redux store, we only keep track of new data with the realtime feature of the Firebase database, starting with the UserList component:

```javascript{3,4,13,14,15,16,17,18,20,21,22,24,26,27,28,29,30}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class UserList extends Component {
  ...
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserList);
```

React Redux's connect higher-order component is used to marry React with Redux. We can tell what state of Redux should be mapped to props for the React component in the `mapStateToProps` function, and we can pass dispatchable Redux actions as functions to the React component as props with the `mapDispatchToProps` function. In our case, we are interested in a user object that encapsulates all users in the Redux store. We transform this user object--which is the Firebase representation of all users--into an array, to make it easier for us to render them. The point is to dispatch an action that sets the user object as state in the Redux store. Check t he *src/reducers/user.js* to see how our reducer deals with this action. Both `users` and `onSetUsers` are received as props in the UserList component.

Next, make sure the users are fetched from Firebase's realtime database and persisted in the Redux store with our new dispatchable action:

```javascript{4}
class UserList extends Component {
  componentDidMount() {
    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  ...
}
```

Each time the Firebase listener is called, or when a user was added, edited, or removed from the list, the most recent user object that has all users from Firebase is stored with the `onSetUsers()` function to the Redux store. Another UX improvement is the loading indicator when there are no users in the Redux store. Every other time, when there are users in the store but the Firebase listener is updating the Redux store with a new user object, no loading indicator is shown:

```javascript{2,3,4,5,6,7,8,11,12,13,18}
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }

    this.props.firebase.users().on('value', snapshot => {
      this.props.onSetUsers(snapshot.val());

      this.setState({ loading: false });
    });
  }

  ...
}
```

The users are no longer managed in the local state of the component, but are now handled in Redux. You set the users with a dispatchable action from `mapDispatchToProps` and access them again in `mapStateToProps`. Both state and actions are passed as props to your component.

The users and loading indicator are rendered as before, but only the loading state comes from the local state. The Link component only navigates to the UserItem component, but it doesn't send any user objects. We wanted the user at our disposal via the Link component, and we want to let Redux handle it.

```javascript{3,23}
class UserList extends Component {
  render() {
    const { users } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

The UserList component renders a list of users as before, fetches the recent user object, which has all users, from Firebase with a realtime connection, but stores the result into the Redux store this time instead of React's local state. Let's continue with the UserItem component that shall be connected to the Redux store too:

```javascript{2,3,11,12,13,15,16,17,19,21,22,23,24,25}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

class UserItem extends Component {
  ...
}

const mapStateToProps = (state, props) => ({
  user: (state.userState.users || {})[props.match.params.id],
});

const mapDispatchToProps = dispatch => ({
  onSetUser: (user, uid) => dispatch({ type: 'USER_SET', user, uid }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UserItem);
```

Similar to the UserList component, it receives a function that is a dispatchable action that sets a user instead of users. Check the user reducer to see what's happening when this action is dispatched. The component receives a single user from the Redux store. Because the initial state of users in the Redux store is null, we have to conditionally choose an empty object for not running into null pointer exceptions.

Let's make sure the user is fetched from Firebase's realtime database and persisted in the Redux store with our new dispatchable action.

```javascript{6,7,8,9}
class UserItem extends Component {
  componentDidMount() {
    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.props.onSetUser(
          snapshot.val(),
          this.props.match.params.id,
        );
      });
  }

  ...
}
```

When the component mounts, we register Firebase's listener to the realtime database. Every time the user changes, we update it in the Redux store. If there is already a user, we don't show a loading indicator. If there is no user, we show it:

```javascript{2,3,4,5,6,7,8,11,12,13,23}
class UserItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.setState({ loading: true });
    }

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.props.onSetUser(
          snapshot.val(),
          this.props.match.params.id,
        );

        this.setState({ loading: false });
      });
  }

  ...
}
```

We render the user and loading state as before, except the user comes from the props:

```javascript{3,7}
class UserItem extends Component {
  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.props.user.email);
  };

  render() {
    const { user } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && ( ... )}
      </div>
    );
  }
}
```

That's it for the UserItem component. It renders a user, fetches the recent user from Firebase with a realtime connection, but stores the result into the Redux store. The advantage of using Redux instead of React's local state is a persistent state of users between routes. That means you don't need to fetch the users every time you navigate from UserItem to UserList or any other route, because they remain in Redux's global state.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VqXuVc).

# Manage Message Entities in Redux Store

We migrated the users and session management from React's local state and React's Context as well, which is why we have refactored the session management. What's missing is connecting the Messages component to the Redux store too in order to store and get messages in and from the Redux state:

```javascript{2,3,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,30,32,33,34,35,36}
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import MessageList from './MessageList';

class Messages extends Component {
  ...
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  messages: Object.keys(state.messageState.messages || {}).map(
    key => ({
      ...state.messageState.messages[key],
      uid: key,
    }),
  ),
  limit: state.messageState.limit,
});

const mapDispatchToProps = dispatch => ({
  onSetMessages: messages =>
    dispatch({ type: 'MESSAGES_SET', messages }),
  onSetMessagesLimit: limit =>
    dispatch({ type: 'MESSAGES_LIMIT_SET', limit }),
});

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Messages);
```

The Messages component has access to the authenticated user, which is used for associating the user to the written message, the transformed list of messages and the limit integer for the pagination feature. Also it receives functions for dispatching actions that set messages and the limit. Check the *src/reducers/message.js* file again to see how the state and the actions are used there. Because we are using lots of things from the Redux store, only a couple of properties are left in the local state of the component:

```javascript
class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
    };
  }

  ...
}
```

The Messages component only deals with the loading indicator and the text for the message that can be written from within the component as local state. Everything else will be managed with Redux.

```javascript{5,6,7,16,18,20}
class Messages extends Component {
  ...

  componentDidMount() {
    if (!this.props.messages.length) {
      this.setState({ loading: true });
    }

    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.props.firebase
      .messages()
      .orderByChild('createdAt')
      .limitToLast(this.props.limit)
      .on('value', snapshot => {
        this.props.onSetMessages(snapshot.val());

        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  ...
}
```

The other logic for creating, updating, and removing a message stays the same, because it only uses the Firebase API. The listener of the Firebase database makes sure to update all messages in the Redux store again. Only the class method to update the limit uses the function provided by the Redux store:

```javascript{5}
class Messages extends Component {
  ...

  onNextPage = () => {
    this.props.onSetMessagesLimit(this.props.limit + 5);
  };

  ...
}
```

Every time this state in the Redux store changes, we receive the new limit in the Messages component as props due to the connect higher-order component. If the limit changes, we register a new Firebase listener with the new limit:

```javascript{4,5,6,7,8}
class Messages extends Component {
  ...

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit) {
      this.onListenForMessages();
    }
  }

  ...
}
```

The rendering of the component didn't change a lot. It only receives the messages from the props instead of the local state.

```javascript{5,6,26}
class Messages extends Component {
  ...

  render() {
    const { messages } = this.props;
    const { text, loading } = this.state;

    return (
      <div>
        {!loading && messages && (
          <button type="button" onClick={this.onNextPage}>
            More
          </button>
        )}

        {loading && <div>Loading ...</div>}

        {messages && (
          <MessageList ... />
        )}

        {!messages && <div>There are no messages ...</div>}

        <form
          onSubmit={event =>
            this.onCreateMessage(event, this.props.authUser)
          }
        >
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}
```

The MessageList and MessageItem components didn't change at all, and only the HomePage and the Messages components were connected to the Redux store. They receive the necessary functions to update the state in the Redux store, but also the state as props such as users, messages, and limit. Every time a Firebase listener that receives the latest entities from the Firebase database is called, it stores the result in the Redux store. It happens as well when a user creates, edits, or deletes a message. If the limit for the pagination feature changes, the listener is registered with this new limit again. Everything else, such as the text of the new message or the loading indicator, is still managed in the local state of React.

### Exercises:

* Confirm your [source code for the last section](http://bit.ly/2VoS0dt)

<Divider />

That's it for the React Firebase with Redux tutorial. You have introduced Redux as state management library to manage your session, user, and message state. Instead of relying on React's context API for the authenticated user object and React's local state for the list of users and messages from the Firebase database, you are storing these objects in the Redux store. You can find the project in this [GitHub repository](https://github.com/the-road-to-react-with-firebase/react-redux-firebase-authentication).

