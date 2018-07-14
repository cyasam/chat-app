import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

// Components
import Loading from './components/Loading';
import Header from './components/Header';
import Protected from './components/Protected';

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
});

const RegisterIndex = Loadable({
  loader: () => import('./pages/register'),
  loading: Loading
});

const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import('./pages/Profile'),
  loading: Loading
});

const ActiveUsers = Loadable({
  loader: () => import('./components/Chat/ActiveUsers'),
  loading() {
    return null;
  }
});

const ActivateAccount = Loadable({
  loader: () => import('./components/ActivateAccount'),
  loading() {
    return null;
  }
});

const AppContainer = props => (
  <Router>
    <div className="wrapper">
      <Header />
      { props.auth.status && <ActivateAccount /> }
      <div className="container">
        { props.auth.status && <ActiveUsers /> }
        <Switch>
          <Route path="/" exact component={Protected(Home)} />
          <Route path="/register" component={RegisterIndex} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Protected(Profile)} />
          <Route component={Home} />
        </Switch>
      </div>
    </div>
  </Router>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

AppContainer.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AppContainer);
