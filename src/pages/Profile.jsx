import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileLoader from '../actions/profile-action';
import ProfileForm from '../components/ProfileForm';

class Profile extends Component {
  componentDidMount() {
    this.props.profileLoader();
  }

  render() {
    const { message, data } = this.props;

    return (
      <div className="page-container">
        {message && <div className="error"> {message} </div>}{' '}
        <ProfileForm data={data} />{' '}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.profile.isFetching,
  data: state.profile.data,
  message: state.profile.message
});

Profile.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  profileLoader: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      profileLoader
    }
  )(Profile)
);
