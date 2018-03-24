import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileLoader from '../actions/profile-action';
import Loading from '../components/Loading';

class User extends Component {
  componentWillMount() {
    this.props.profileLoader();
  }

  render() {
    const {
      isFetching,
      message,
      data
    } = this.props;
    return (
      <div style={{ position: 'relative', minHeight: 50 }}>
        { message && <div className="error">{message}</div> }
        { isFetching && <Loading /> }
        <p>Name: { data.name }</p>
        <p>Email: { data.email }</p>
        <p>Account activated?: { data.activated ? '✔' : 'X' }</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.profile.isFetching,
  data: state.profile.data,
  message: state.profile.message
});

User.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  profileLoader: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, { profileLoader })(User));
