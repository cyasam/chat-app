import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersListAction from '../../actions/get-users-list-action';
import ActiveUser from './ActiveUser';

class ActiveUsers extends Component {
  constructor() {
    super();

    this.state = {
      activeUsers: {},
    };
  }

  componentDidMount() {
    const { getUsersList, chatSocket } = this.props;
    getUsersList();

    this.socket = chatSocket;

    if (this.socket) {
      this.socket.on('active users', activeUsers => {
        this.setState({
          activeUsers,
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  setUserStatusClassName(user) {
    const { activeUsers } = this.state;
    let className = 'status';

    if (
      Object.keys(activeUsers).find(id => activeUsers[id].email === user.email)
    ) {
      className = `${className} online`;
    }

    return className;
  }

  renderOtherActiveUsers() {
    const { users, auth } = this.props;
    const otherAciveUsers = users.filter(user => user.email !== auth.email);

    return (
      <Fragment>
        {otherAciveUsers.map(user => (
          <li key={user.id}>
            {user.profileImage ? (
              <img
                className="thumb-img"
                src={user.profileImage.thumb}
                alt={user.nickname}
              />
            ) : (
              <div className="anonymous-thumb" />
            )}
            {user.nickname}{' '}
            <span className={this.setUserStatusClassName(user)} />
          </li>
        ))}
      </Fragment>
    );
  }

  render() {
    const { auth, isFetching, menuOpen } = this.props;

    if (!auth.status) {
      return null;
    }

    return (
      <div className={`users-list-wrapper${menuOpen ? ' open' : ''}`}>
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <div className="self">
              <ActiveUser user={auth} />
            </div>
            <ul className="user-list">{this.renderOtherActiveUsers()}</ul>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  users: state.usersList.users,
  isFetching: state.usersList.isFetching,
  menuOpen: state.menuOpen.status,
  chatSocket: state.chatSocket,
});

ActiveUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  getUsersList: PropTypes.func.isRequired,
  chatSocket: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { getUsersList: getUsersListAction },
)(ActiveUsers);
