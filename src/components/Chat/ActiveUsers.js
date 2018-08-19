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

  async componentWillMount() {
    await this.props.getUsersList();

    this.socket = this.props.chatSocket;

    if (Object.keys(this.socket).length) {
      this.socket.on('active users', activeUsers => {
        this.setState({ activeUsers });
      });
    }
  }

  renderUsers(user) {
    const { activeUsers } = this.state;
    const activeUser = Object.keys(activeUsers).find(id => activeUsers[id].email === user.email);
    const nicknameClass = `status ${activeUser ? 'online' : 'offline'}`;

    return (
      <li key={user.id}>
        {user.profileImage ? (
          <img className="thumb-img" src={user.profileImage} alt={user.nickname} />
        ) : (
          <div className="anonymous-thumb" />
        )}
        {user.nickname} <span className={nicknameClass} />
      </li>
    );
  }

  render() {
    const { auth, isFetching, users, menuOpen } = this.props;

    if (!auth.status) {
      return null;
    }

    return (
      <div className={`users-list-wrapper${menuOpen ? ' open' : ''}`}>
        <ul className="user-list">{isFetching ? <li>Loading...</li> : users.map(user => this.renderUsers(user))}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
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

export default connect(
  mapStateToProps,
  { getUsersList }
)(ActiveUsers);
