import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logout from '../actions/logout-action';

const Header = props => (
  <header className="main-header">
    <nav>
      <Link to="/">Home</Link>
      { props.authStatus ? (
        <Fragment>
          <Link to="/profile">Profile</Link>
          <button
            onClick={props.logout}
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

const mapStateToProps = state => ({
  authStatus: state.authentication.auth.status
});

Header.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, { logout })(Header));
