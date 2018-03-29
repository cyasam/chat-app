import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MessageScreen from './MessageScreen';
import SenderForm from './SenderForm';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      connected: false,
      messageList: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.socket = io('http://192.168.1.13:4567');
    this.socket.on('connect', () => {
      this.setState({ connected: true });
      this.startSocket();
    });
  }

  onSubmit(text) {
    this.socket.emit('new message', text);
    const messageObj = {
      id: this.state.messageList.length,
      email: null,
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

  startSocket() {
    this.socket.emit('add user', { email: this.props.email, nickname: this.props.nickname });
    this.socket.on('new message', (message) => {
      const { messageList } = this.state;
      const newMessage = messageList.find(item =>
        item.email === message.email && item.typing);

      if (newMessage) {
        const index = messageList.indexOf(newMessage);

        messageList[index].text = message.text;
        messageList[index].typing = false;

        this.setState({ messageList });
      } else {
        const newMessageObj = { ...message };
        newMessageObj.id = messageList.length;
        newMessageObj.typing = false;

        this.setState({ messageList: [...this.state.messageList, newMessageObj] });
      }
    });

    this.socket.on('typing', (typingObj) => {
      const data = { ...typingObj };
      const message = this.state.messageList.find(item =>
        item.email === typingObj.email && item.typing);

      if (!message) {
        data.id = this.state.messageList.length;
        data.text = 'typing';
        data.typing = true;
        this.setState({ messageList: [...this.state.messageList, data] });
      }
    });

    this.socket.on('stop typing', (typingObj) => {
      const messageList = [...this.state.messageList];
      const message = this.state.messageList.filter(item =>
        item.email === typingObj.email && item.typing);

      if (message.length) {
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

    if (!this.state.connected) {
      return <div>Chat is not connected.</div>;
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
  email: state.authentication.auth.email
});

Chat.defaultProps = {
  nickname: ''
};

Chat.propTypes = {
  nickname: PropTypes.string,
  email: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Chat);
