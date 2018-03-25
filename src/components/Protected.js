import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../config';

export default (ComposedComponent) => {
  class Protected extends Component {
    componentWillMount() {
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);
      const { auth, history } = this.props;
      if (!auth.status && !token) {
        history.push('/login');
      }
    }

    componentWillReceiveProps({ auth, history }) {
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);
      if (!auth.status && !token) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.authentication.auth
  });

  Protected.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
