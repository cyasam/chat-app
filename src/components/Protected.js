import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Protected extends Component {
    componentWillMount() {
      const { authStatus, history } = this.props;
      if (!authStatus) {
        history.push('/login');
      }
    }

    componentWillReceiveProps({ authStatus, history }) {
      if (!authStatus) {
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
