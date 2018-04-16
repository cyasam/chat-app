import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageScreen from './MessageScreen';
import SenderForm from './SenderForm';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      messageList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillMount() {
    this.socket = this.props.chatSocket;

    if (Object.keys(this.socket).length) {
      this.startSocket();
    }
  }

  onSubmit(text) {
    this.socket.emit('new message', text);
    const messageObj = {
      id: this.state.messageList.length,
      email: null,
      nickname: this.props.nickname,
      profileImage: this.props.profileImage,
      text,
      typing: false,
      self: true
    };

    const messageList = [...this.state.messageList, messageObj];
    this.setState({ messageList });
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
    return this.props.users.find(user => user.email === email).profileImage;
  }

  startSocket() {
    this.socket.on('new message', (message) => {
      const { messageList } = this.state;
      const newMessage = messageList.find(item =>
        item.email === message.email && item.typing);

      if (newMessage) {
        const index = messageList.indexOf(newMessage);
        messageList[index].text = message.text;
        messageList[index].typing = false;
        messageList[index].profileImage = this.getProfileImage(message.email);
        messageList[index].self = message.email === this.props.email;

        this.setState({ messageList });
      } else {
        const newMessageObj = { ...message };
        newMessageObj.id = messageList.length;
        newMessageObj.typing = false;
        newMessageObj.profileImage = this.getProfileImage(message.email);
        newMessageObj.self = message.email === this.props.email;

        this.setState({ messageList: [...this.state.messageList, newMessageObj] });
      }
    });

    this.socket.on('typing', (typingObj) => {
      const data = { ...typingObj };
      const message = this.state.messageList.find(item =>
        item.email === typingObj.email && item.typing);

      if (!message && typingObj.email !== this.props.email) {
        data.id = this.state.messageList.length;
        data.text = 'typing';
        data.typing = true;
        data.profileImage = this.getProfileImage(typingObj.email);
        this.setState({ messageList: [...this.state.messageList, data] });
      }
    });

    this.socket.on('stop typing', (typingObj) => {
      const messageList = [...this.state.messageList];
      const message = this.state.messageList.filter(item =>
        item.email === typingObj.email && item.typing);

      if (message.length && typingObj.email !== this.props.email) {
        const index = messageList.indexOf(message);
        messageList.splice(index, 1);
      }

      this.setState({ messageList });
    });
  }

  render() {
    if (!this.props.email) {
      return null;
    }

    return (
      <div className="chat-screen">
        <MessageScreen messageList={this.state.messageList} />
        <SenderForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.authentication.auth.nickname,
  email: state.authentication.auth.email || '',
  profileImage: state.authentication.auth.profileImage || '',
  chatSocket: state.chatSocket,
  users: state.usersList.users
});

Chat.defaultProps = {
  nickname: ''
};

Chat.propTypes = {
  nickname: PropTypes.string,
  email: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  chatSocket: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Chat);
