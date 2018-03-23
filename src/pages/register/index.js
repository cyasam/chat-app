import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Register from './Register';
import RegisterComplete from './RegisterComplete';

const RegisterIndex = ({ match }) => (
  <Fragment>
    <Switch>
      <Route path={`${match.url}/`} exact component={Register} />
      <Route path={`${match.url}/complete`} component={RegisterComplete} />
    </Switch>
  </Fragment>
);

RegisterIndex.propTypes = {
  match: PropTypes.object.isRequired
};

export default RegisterIndex;
