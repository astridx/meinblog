---
title: "How to use React Router with Firebase"
description: "A React tutorial on how to combine React Router and Firebase to navigate a user through the application while fetching data from the Firebase database or even passing data through React Router ..."
date: "2019-01-01T07:52:46+02:00"
categories: ["React", "Firebase"]
keywords: ["react firebase router", "react router firebase"]
hashtags: ["#100DaysOfCode", "#ReactJs"]
banner: "./images/banner.jpg"
contribute: ""
author: ""
---

<Sponsorship />

<ReactFirebaseBook />

<LinkCollection
  label="This tutorial is part 7 of 7 in this series."
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
    }
  ]}
/>

Before we dive deeper into Firebase's realtime database and the domain-related business logic of our application, it makes sense to invest more time into React Router. So far, we have split up our application into top-level routes to manage our whole authentication flow with login, logout, and registration. Additionally, we protected top-level routes with authorization that checks for authenticated users, confirmed email addresses, and admin users.

In this section, we'll implement more specific routing for the admin page. So far, this page only shows a list of users, retrieved from the Firebase realtime database. Basically, it is the overview of our users. However, a list of users alone doesn't help that much, and a detail page would be much more useful. Then, it would be possible to trigger further actions for the user on the detail page instead of the overview page. To start, define a new child route in the *src/constants/routes.js* file:

```javascript{8}
export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
export const ADMIN = '/admin';
export const ADMIN_DETAILS = '/admin/:id';
```

The `:id` is a placeholder for a user identifier to be used later. If you want to be more specific, you could have used `/admin/users/:id` as well. Perhaps later you'll want to manage other entities on this admin page. For instance, the admin page could have a list of users and a list of books written by them, where it would make sense to have detail pages for users (`/admin/users/:userId`) and books (`/admin/books/:bookId`).

Next, extract all the functionality from the AdminPage component. You will lift this business logic down to another component in the next step. In this step, introduce two sub routes for the admin page and match the UserList and UserItem components to it. The former component is already there, the latter component will be implemented soon.

```javascript{2,8,10,15,16,17,18,20}
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);
```

The UserList component receives all the business logic that was in the AdminPage. Also, it receives the `Base` suffix because we enhance it in the next step with a higher-order component to make the Firebase instance available.

```javascript{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,31}
class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    ...
  }
}
```

Further, the UserList component renders a Link component from the React Router package, which is used to navigate users from the user list (overview) to the user item (detail) route. The mapping for the route and the component was completed in the AdminPage component.

```javascript{4,5,7,9,10,23,24,25,26,27,32,33}
class UserListBase extends Component {
  ...

  render() {
    const { users, loading } = this.state;

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

Remember, the UserList receives access to the Firebase instance, and the AdminPage doesn't need it anymore.

```javascript{6}
...

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);
```

Last but not least, render a basic UserItem component.

```javascript{3,4,5,6,7}
...

const UserItem = ({ match }) => (
  <div>
    <h2>User ({match.params.id})</h2>
  </div>
);
```

You should be able to navigate from the user list (overview) to the user item (detail) component on the admin page now. We are fetching the user list on the admin page, without specific user data for a single user for the UserItem component on the detail perspective. The identifier for the user is available from the browser's URL through the React Router. You can extract it from the component's props to fetch a user from Firebase's realtime database:

```javascript{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31}
class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  render() {
    ...
  }
}
```

Don't forget to make Firebase accessible in the props of the UserItem component again via our higher-order component:

```javascript{4}
...

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

...
```

Last but not least, render again the user information. This time it's not a whole list of users, but only a single user entity:

```javascript{5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26}
class UserItemBase extends Component {
  ...

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
          </div>
        )}
      </div>
    );
  }
}
```

When you navigate to a user detail perspective, you can see the id from the props is rendered immediately, because it's available from React Router to fetch user details from the Firebase database. However, since you already have the information about the user in the UserList component that links to your UserItem component, you can pass this information through React Router's Link:

```javascript{17,18,19,20}
class UserListBase extends Component {
  ...

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              ...
              <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user },
                  }}
                >
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

Then use it in the UserItem component as default local state:

```javascript{8,13,14,15}
class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  ...
}
```

If users navigate from the UserList to the UserItem component, they should arrive immediately. If they enter the URL by hand in the browser or with a Link component that doesn't pass them to the UserItem component, the user needs to be fetched from the Firebase database. Since you have a page for each individual user on your admin dashboard now, you can add more specific actions. For instance, sometimes a user can't login and isn't sure how to proceed, which is the perfect time to send a reset password email to them as admin. Let's add a button to send a password reset email to a user.

```javascript{4,5,6,22,23,24,25,26,27,28,29}
class UserItemBase extends Component {
  ...

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            ...
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}
```

Note: If you want to dig deeper into deleting users from Firebase's authentication, how to resend verification emails, or how to change email addresses, study Firebase's Admin SDK.

This section has shown you how to implement more specific routes with React Router and how to interact with the Firebase database on each individual route. You can also use React Router's advanced features to pass information as props to the other components like we did for the user.

### Exercises:

* Learn more about [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
* Read more about [Firebase's Admin SDK](https://firebase.google.com/docs/auth/admin/)
* Confirm your [source code for the last section](http://bit.ly/2VnfIqw)
