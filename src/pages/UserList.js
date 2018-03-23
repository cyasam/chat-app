import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../config';
import Loading from '../components/Loading';

class UserList extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
      message: '',
      list: []
    };
  }

  componentWillMount() {
    this.setState({ isFetching: true });

    const token = localStorage.getItem(config.TOKEN_KEY_NAME);

    fetch('http://192.168.1.13:4567/api/users', {
      headers: new Headers({
        Authorization: `Bearer ${token}`
      })
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }

      return Promise.reject(response);
    }).then((result) => {
      this.setState({ isFetching: false });
      if (result.status) {
        this.setState({ list: result.list });
      } else {
        this.setState({ message: 'Data not loaded.' });
      }
    }).catch((error) => {
      if (error.status === 401) {
        localStorage.removeItem(config.TOKEN_KEY_NAME);
        this.props.history.push('/login');
      } else {
        this.setState({ isFetching: false, message: 'Data not loaded.' });
        throw error;
      }
    });
  }

  render() {
    const {
      isFetching,
      message,
      list
    } = this.state;
    return (
      <div style={{ position: 'relative', minHeight: 50 }}>
        { message && <div className="error">{message}</div> }
        { isFetching && <Loading /> }
        <ul>
          { list.map(user => (
            <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
          ))}
        </ul>
      </div>
    );
  }
}

UserList.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(UserList);
