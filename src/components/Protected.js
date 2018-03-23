import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import authLoader from '../actions/auth-action';

export default (ComposedComponent) => {
  const Protected = ({ auth }) => {
    if (!auth) {
      this.props.history.push('/login');
    }
    return <ComposedComponent {...this.props} />;
  };

  const mapStateToProps = state => ({
    auth: state.authentication.auth
  });

  Protected.propTypes = {
    auth: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps, { authLoader })(Protected));
};
