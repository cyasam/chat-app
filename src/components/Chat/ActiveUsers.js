import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getUsersList from '../../actions/get-users-list-action';

class ActiveUsers extends Component {
  componentWillMount() {
    this.props.getUsersList();
  }

  renderUsers(user) {
    const { activeUsers } = this.props;
    const activeUser = Object.keys(activeUsers).find(id => activeUsers[id].email === user.email);
    return (
      <li key={user.id}>
        { user.profileImage ? <img className="thumb-img" src={user.profileImage} alt={user.nickname} /> : <div className="anonymous-thumb" /> }
        { user.nickname } <span className={`status ${activeUser ? 'online' : 'offline'}`} />
      </li>
    );
  }

  render() {
    const { isFetching, users } = this.props;

    return (
      <div className="users-list-wrapper">
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
  users: state.usersList.users
});

ActiveUsers.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  activeUsers: PropTypes.object.isRequired,
  getUsersList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getUsersList })(ActiveUsers);
