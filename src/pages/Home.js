import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../components/Chat';

const Home = ({ auth }) => (
  <Fragment>
    { auth.status ? (
      <Chat />
    ) : (
      <div className="page-container">Welcome to my humble in</div>
    )}
  </Fragment>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Home);
