import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersList from '../../actions/get-users-list-action';

class ActiveUsers extends Component {
  constructor() {
    super();
    
    this.state = {
      activeUsers: {}
    };
  }

  componentWillMount() {
    this.props.getUsersList();

    this.socket = this.props.chatSocket;
    this.socket.on('active users', (activeUsers) => {
      this.setState({ activeUsers });
    });
  }

  renderUsers(user) {
    const { activeUsers } = this.state;
    const activeUser = Object.keys(activeUsers).find(id => activeUsers[id].email === user.email);

    return (
      <li key={user.id}>
        { user.profileImage ? <img className="thumb-img" src={user.profileImage} alt={user.nickname} /> : <div className="anonymous-thumb" /> }
        { user.nickname } <span className={`status ${activeUser ? 'online' : 'offline'}`} />
      </li>
    );
  }

  render() {
    const { isFetching, users, menuOpen } = this.props;

    return (
      <div className={`users-list-wrapper${menuOpen ? ' open': ''}`}>
        { isFetching ? (
          <p>Loading...</p>
        ) : (
          <ul className="user-list">
            { users.map(user => this.renderUsers(user)) }
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.usersList.isFetching,
  users: state.usersList.users,
  menuOpen: state.menuOpen.status,
  chatSocket: state.chatSocket
});

ActiveUsers.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  getUsersList: PropTypes.func.isRequired,
  chatSocket: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getUsersList })(ActiveUsers);
