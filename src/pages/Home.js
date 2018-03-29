import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from '../components/Chat';

const Home = ({ auth }) => (
  <div className="home-page">
    { auth.status ? (
      <Chat />
    ) : (
      <div>Welcome to my humble in</div>
    )}
  </div>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Home);
