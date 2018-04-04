import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageScreen extends Component {
  componentDidUpdate() {
    if (this.messagesEl.scrollTop < this.messagesEl.offsetHeight) {
      this.messagesEl.scrollTop = this.messagesEl.offsetHeight;
    }
  }

  render() {
    return (
      <ul className="messages" ref={(messagesEl) => { this.messagesEl = messagesEl; }}>
        { this.props.messageList.map(message => (
          <li className={message.self ? 'self' : 'others'} key={message.id}>
            { message.nickname }: { message.text }
          </li>
          ))
        }
      </ul>
    );
  }
}

MessageScreen.propTypes = {
  messageList: PropTypes.array.isRequired
};

export default MessageScreen;
