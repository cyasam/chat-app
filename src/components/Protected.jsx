import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../config';

export default ComposedComponent => {
  class Protected extends Component {
    componentDidMount() {
      this.runComponent();
    }

    componentDidUpdate() {
      this.runComponent();
    }

    runComponent() {
      const { auth, history, chatSocket } = this.props;
      const { email, nickname } = auth;

      const token = localStorage.getItem(config.TOKEN_KEY_NAME);

      if (!auth.status && !token) {
        history.push('/login');
      } else {
        this.socket = chatSocket;

        if (Object.keys(this.socket).length && email && nickname) {
          setTimeout(() => this.socket.emit('add user', { email, nickname }));
        }
      }
    }

    render() {
      const { auth } = this.props;
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);

      if (!auth.status && !token) {
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.authentication.auth,
    nickname: state.authentication.auth.nickname,
    email: state.authentication.auth.email,
    chatSocket: state.chatSocket
  });

  Protected.defaultProps = {
    nickname: '',
    email: ''
  };

  Protected.propTypes = {
    nickname: PropTypes.string,
    email: PropTypes.string,
    auth: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    chatSocket: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
