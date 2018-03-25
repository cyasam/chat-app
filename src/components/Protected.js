import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../config';

export default (ComposedComponent) => {
  class Protected extends Component {
    componentWillMount() {
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);
      const { authStatus, history } = this.props;
      if (!authStatus && !token) {
        history.push('/login');
      }
    }

    componentWillReceiveProps({ authStatus, history }) {
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);
      if (!authStatus && !token) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authStatus: state.authentication.auth.status
  });

  Protected.propTypes = {
    authStatus: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
