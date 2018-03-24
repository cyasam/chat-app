import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Protected extends Component {
    componentWillMount() {
      const { auth, history } = this.props;
      if (!auth) {
        history.push('/login');
      }
    }

    componentWillReceiveProps({ auth, history }) {
      if (!auth) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.authentication.auth.status
  });

  Protected.propTypes = {
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
