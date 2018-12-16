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
      const { history, chatSocket, nickname, email } = this.props;

      const token = localStorage.getItem(config.TOKEN_KEY_NAME);

      if (!token) {
        history.push('/login');
      } else {
        this.socket = chatSocket;

        if (Object.keys(this.socket).length && email && nickname) {
          setTimeout(() => this.socket.emit('add user', { email, nickname }));
        }
      }
    }

    render() {
      const token = localStorage.getItem(config.TOKEN_KEY_NAME);

      if (!token) {
        return null;
      }

      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
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
    history: PropTypes.object.isRequired,
    chatSocket: PropTypes.object.isRequired
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
