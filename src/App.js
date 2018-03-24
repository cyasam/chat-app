import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import config from './config';

// Components
import Header from './components/Header';
import Protected from './components/Protected';
import ActivateAccount from './components/ActivateAccount';
import Home from './pages/Home';
import RegisterIndex from './pages/register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import authChecker from './actions/auth-check-action';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

const token = localStorage.getItem(config.TOKEN_KEY_NAME);
if (token) {
  store.dispatch(authChecker());
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Header />
        <div className="container">
          <ActivateAccount />
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
  </Provider>
);

export default App;
