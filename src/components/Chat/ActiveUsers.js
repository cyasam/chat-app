import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../Loading';
import getUsersList from '../../actions/get-users-list-action';

class ActiveUsers extends Component {
  componentWillMount() {
    this.props.getUsersList();
  }

  renderUsers(user) {
    const { activeUsers } = this.props;
    const activeUser = Object.keys(activeUsers).find(id => activeUsers[id].email === user.email);
    return <li key={user.id}><span className={`status ${activeUser ? 'online' : 'offline'}`} />{ user.nickname }</li>;
  }

  render() {
    const { isFetching, users } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        { isFetching && <Loading /> }
        <ul className="user-list">
          { users.map(user => this.renderUsers(user)) }
        </ul>
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
