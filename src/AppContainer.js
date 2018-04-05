import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Loading from './components/Loading';
import Header from './components/Header';
import Protected from './components/Protected';
import ActivateAccount from './components/ActivateAccount';
import Home from './pages/Home';
import RegisterIndex from './pages/register';
import Login from './pages/Login';
import Profile from './pages/Profile';

const AppContainer = props => (
  <Router>
    <div className="wrapper">
      { !Object.keys(props.auth).length && <Loading className="app" /> }
      <Header />
      <ActivateAccount />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
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
