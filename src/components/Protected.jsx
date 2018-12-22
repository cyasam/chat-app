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
      const { history, chatSocket, nickname, email, profileImage } = this.props;

      const token = localStorage.getItem(config.TOKEN_KEY_NAME);

      if (!token) {
        history.push('/login');
      } else {
        this.socket = chatSocket;

        if (this.socket && email && nickname) {
          setTimeout(() =>
            this.socket.emit('add user', { email, nickname, profileImage }),
          );
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
    chatSocket: state.chatSocket,
    nickname: state.authentication.auth.nickname,
    email: state.authentication.auth.email,
    profileImage: state.authentication.auth.profileImage,
  });

  Protected.defaultProps = {
    chatSocket: null,
    nickname: '',
    email: '',
    profileImage: null,
  };

  Protected.propTypes = {
    nickname: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.object,
    history: PropTypes.object.isRequired,
    chatSocket: PropTypes.object,
  };

  return withRouter(connect(mapStateToProps)(Protected));
};
