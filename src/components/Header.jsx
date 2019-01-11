import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import logoutAction from '../actions/logout-action';
import clickMenu from '../actions/menu-click-action';

const Header = props => {
  const { auth, logout } = props;

  if (!Object.keys(auth).length) {
    return false;
  }

  return (
    <header className="main-header">
      <div className="header-inner">
        <h1 className="logo">
          <Link to="/">ChatApp</Link>
        </h1>
        <nav>
          {auth.status && (
            <button
              type="button"
              className="menu-btn"
              onClick={() => {
                props.clickMenu();
              }}
            >
              <MdMenu />
            </button>
          )}
          {auth.status ? (
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
        {auth.status && (
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.authentication.auth,
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clickMenu: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout: logoutAction, clickMenu },
  )(Header),
);
