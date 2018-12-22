import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageScreen from './MessageScreen';
import SenderForm from './SenderForm';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messageList: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    const { chatSocket } = this.props;
    this.socket = chatSocket;

    if (this.socket) {
      this.startSocket();
    }
  }

  onSubmit(text) {
    const { messageList } = this.state;
    const { nickname, profileImage } = this.props;

    this.socket.emit('new message', text);
    const messageObj = {
      id: messageList.length,
      email: null,
      nickname,
      profileImage,
      text,
      typing: false,
      self: true,
    };

    this.setState({ messageList: [...messageList, messageObj] });
  }

  onInputChange() {
    let lastTypingTime;
    this.socket.emit('typing');

    if (this.typeTimeout) {
      lastTypingTime = new Date().getTime();
      clearTimeout(this.typeTimeout);
    }

    this.typeTimeout = setTimeout(() => {
      const typingTimer = new Date().getTime();
      if (typingTimer - lastTypingTime >= 600) {
        this.socket.emit('stop typing');
        this.typeTimeout = null;
      }
    }, 600);
  }

  getProfileImage(email) {
    const { users } = this.props;
    return users.find(user => user.email === email).profileImage;
  }

  startSocket() {
    const { email } = this.props;

    this.socket.on('new message', message => {
      const { messageList } = this.state;
      const messageListClone = [...messageList];

      const newMessage = messageListClone.find(
        item => item.email === message.email && item.typing,
      );

      if (newMessage) {
        const index = messageListClone.indexOf(newMessage);
        messageListClone[index].text = message.text;
        messageListClone[index].typing = false;
        messageListClone[index].profileImage = this.getProfileImage(
          message.email,
        );
        messageListClone[index].self = message.email === email;

        this.setState({ messageList: messageListClone });
      } else {
        const newMessageObj = { ...message };
        newMessageObj.id = messageListClone.length;
        newMessageObj.typing = false;
        newMessageObj.profileImage = this.getProfileImage(message.email);
        newMessageObj.self = message.email === email;

        this.setState({
          messageList: [...messageListClone, newMessageObj],
        });
      }
    });

    this.socket.on('typing', typingObj => {
      const { messageList } = this.state;
      const messageListClone = [...messageList];

      const data = { ...typingObj };
      const message = messageListClone.find(
        item => item.email === typingObj.email && item.typing,
      );

      if (!message && typingObj.email !== email) {
        data.id = messageListClone.length;
        data.text = 'typing';
        data.typing = true;
        data.profileImage = this.getProfileImage(typingObj.email);
        this.setState({ messageList: [...messageListClone, data] });
      }
    });

    this.socket.on('stop typing', typingObj => {
      const { messageList } = this.state;
      const messageListClone = [...messageList];

      const message = messageListClone.filter(
        item => item.email === typingObj.email && item.typing,
      );

      if (message.length && typingObj.email !== email) {
        const index = messageListClone.indexOf(message);
        messageListClone.splice(index, 1);
      }

      this.setState({ messageList: messageListClone });
    });
  }

  render() {
    const { messageList } = this.state;
    const { email } = this.props;

    if (!email) {
      return null;
    }

    return (
      <Fragment>
        <MessageScreen messageList={messageList} />
        <SenderForm
          onSubmit={this.onSubmit}
          onInputChange={this.onInputChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.authentication.auth.nickname,
  email: state.authentication.auth.email,
  profileImage: state.authentication.auth.profileImage,
  chatSocket: state.chatSocket,
  users: state.usersList.users,
});

Chat.defaultProps = {
  nickname: '',
};

Chat.propTypes = {
  nickname: PropTypes.string,
  email: PropTypes.string.isRequired,
  profileImage: PropTypes.object.isRequired,
  chatSocket: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Chat);
