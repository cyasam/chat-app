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

  componentDidMount() {
    const { chatSocket } = this.props;
    this.socket = chatSocket;

    if (Object.keys(this.socket).length) {
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
      self: true
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
    const { messageList } = this.state;
    const { email } = this.props;

    this.socket.on('new message', message => {
      const newMessage = messageList.find(
        item => item.email === message.email && item.typing
      );

      if (newMessage) {
        const index = messageList.indexOf(newMessage);
        messageList[index].text = message.text;
        messageList[index].typing = false;
        messageList[index].profileImage = this.getProfileImage(message.email);
        messageList[index].self = message.email === email;

        this.setState({ messageList });
      } else {
        const newMessageObj = { ...message };
        newMessageObj.id = messageList.length;
        newMessageObj.typing = false;
        newMessageObj.profileImage = this.getProfileImage(message.email);
        newMessageObj.self = message.email === email;

        this.setState({
          messageList: [...messageList, newMessageObj]
        });
      }
    });

    this.socket.on('typing', typingObj => {
      const data = { ...typingObj };
      const message = messageList.find(
        item => item.email === typingObj.email && item.typing
      );

      if (!message && typingObj.email !== email) {
        data.id = messageList.length;
        data.text = 'typing';
        data.typing = true;
        data.profileImage = this.getProfileImage(typingObj.email);
        this.setState({ messageList: [...messageList, data] });
      }
    });

    this.socket.on('stop typing', typingObj => {
      const messageListClone = [...messageList];
      const message = messageList.filter(
        item => item.email === typingObj.email && item.typing
      );

      if (message.length && typingObj.email !== email) {
        const index = messageList.indexOf(message);
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
      <div className="chat-screen">
        <MessageScreen messageList={messageList} />
        <SenderForm
          onSubmit={this.onSubmit}
          onInputChange={this.onInputChange}
        />
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
