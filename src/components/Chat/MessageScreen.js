import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessageScreen extends Component {
  componentDidUpdate() {
    this.messagesEl.scrollTop = this.messagesEl.offsetHeight;
  }

  render() {
    return (
      <ul className="messages" ref={(messagesEl) => { this.messagesEl = messagesEl; }}>
        { this.props.messageList.map(message => (
          <li className={message.self ? 'self' : 'others'} key={message.id}>
            <div className="message-content">
              { message.profileImage ? <img className="thumb-img" src={message.profileImage} alt={message.nickname} /> : <div className="anonymous-thumb" /> }
              <div className="detail">
                <div className="info">{ message.nickname }</div>
                <p className="text">{ message.text }</p>
              </div>
            </div>
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
