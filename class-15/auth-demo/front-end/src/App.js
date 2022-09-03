import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Can of Books - Auth Demo</h1>
        {this.props.auth0.isAuthenticated ?
          <>
            <Profile />
            <Content />
            <Logout />
          </>
          :
          <Login />
        }
      </>
    )
  }
}
export default withAuth0(App);
