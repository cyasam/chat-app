import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import clickMenu from '../actions/menu-click-action';

import UserBox from './HeaderUserBox';

const Header = props => {
  const { auth } = props;

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
          {!auth.status && (
            <Fragment>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </Fragment>
          )}
        </nav>
        {auth.status && <UserBox />}
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.authentication.auth,
});

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  clickMenu: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { clickMenu },
)(Header);
