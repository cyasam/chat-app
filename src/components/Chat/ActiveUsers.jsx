import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersListAction from '../../actions/get-users-list-action';

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

    if (Object.keys(this.socket).length) {
      this.socket.on('active users', activeUsers => {
        this.setState({ activeUsers });
      });
    }
  }

  componentWillUnmount() {
    if (Object.keys(this.socket).length) {
      this.socket.disconnect();
    }
  }

  renderActiveUsers() {
    const { activeUsers } = this.state;
    const nicknameClass = 'status online';

    return (
      <Fragment>
        {Object.keys(activeUsers).map(id => {
          const user = activeUsers[id];
          return (
            <li key={id}>
              {user.profileImage ? (
                <img
                  className="thumb-img"
                  src={user.profileImage}
                  alt={user.nickname}
                />
              ) : (
                <div className="anonymous-thumb" />
              )}
              {user.nickname} <span className={nicknameClass} />
            </li>
          );
        })}
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
        <ul className="user-list">
          {isFetching ? <li>Loading...</li> : this.renderActiveUsers()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  isFetching: state.usersList.isFetching,
  users: state.usersList.users,
  menuOpen: state.menuOpen.status,
  chatSocket: state.chatSocket,
});

ActiveUsers.propTypes = {
  auth: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  getUsersList: PropTypes.func.isRequired,
  chatSocket: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { getUsersList: getUsersListAction },
)(ActiveUsers);
