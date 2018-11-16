import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import customMiddlewares from './middlewares';
import authChecker from './actions/auth-check-action';

// Components
import AppContainer from './AppContainer';

const store = createStore(rootReducer, applyMiddleware(...customMiddlewares));

store.dispatch(authChecker());

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App;
