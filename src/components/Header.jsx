import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import logout from '../actions/logout-action';
import clickMenu from '../actions/menu-click-action';

const Header = props => (
  <header className="main-header">
    <div className="header-inner">
      <h1 className="logo">
        <Link to="/">ChatApp</Link>
      </h1>
      <nav>
        {props.auth.status && (
          <button
            className="menu-btn"
            onClick={() => {
              props.clickMenu();
            }}
          >
            <MdMenu />
          </button>
        )}
        {props.auth.status ? (
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
      {props.auth.status && (
        <button className="logout-btn" onClick={props.logout}>
          Logout
        </button>
      )}
    </div>
  </header>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clickMenu: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout, clickMenu }
  )(Header)
);
