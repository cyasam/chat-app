import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from '../config';

const Header = (props) => {
  const token = localStorage.getItem(config.TOKEN_KEY_NAME);
  return (
    <header className="main-header">
      <nav>
        <Link to="/">Home</Link>
        { token ? (
          <Fragment>
            <Link to="/users">Users</Link>
            <button
              onClick={() => {
                props.history.push('/');
                localStorage.removeItem(config.TOKEN_KEY_NAME);
              }}
            >
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </Fragment>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
