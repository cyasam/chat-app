import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logout from '../actions/logout-action';

const Header = props => (
  <header className="main-header">
    <nav>
      <Link to="/">Home</Link>
      { props.auth.status ? (
        <Fragment>
          <Link to="/profile">Profile</Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </Fragment>
      )}
    </nav>
    { props.auth.status && (
      <button onClick={props.logout}>
        Logout
      </button>
    )}
  </header>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, { logout })(Header));
