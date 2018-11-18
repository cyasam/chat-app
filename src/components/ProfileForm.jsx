import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { MdWarning, MdDone } from 'react-icons/md';

import getUsersList from '../actions/get-users-list-action';
import helpers from '../helpers';
import profileFormLoader from '../actions/profile-form-action';
import ProfileImage from './ProfileImage';

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minStringLength: 3,
      minPasswordLength: 5,
      profileImageOld: null,
      profileImage: null,
      firstLoad: true,
      formStatus: false,
      message: '',
      nickname: '',
      name: '',
      password: '',
      confirmPassword: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
    this.resetImage = this.resetImage.bind(this);
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { formStatus, firstLoad } = state;
    const { data } = nextProps;

    if (!formStatus && firstLoad) {
      if (Object.keys(data).length) {
        return {
          ...data,
          profileImageOld: data.profileImage,
          firstLoad: false,
          message: ''
        };
      }
    }

    if (nextProps.formStatus) {
      let resetObj = {};

      if (data.status) {
        resetObj = { password: '', confirmPassword: '' };
      }

      nextProps.getUsersList();
      return {
        ...data,
        profileImageOld: data.profileImage,
        ...resetObj
      };
    }

    return {
      formStatus: nextProps.formStatus,
      message: nextProps.serverMessage
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onChangeProfileImage(name, image) {
    this.setState({ [name]: image });
  }

  onSubmit(e) {
    e.preventDefault();

    const { nickname, name, password, profileImage } = this.state;

    const formData = helpers.formDataValTrim({
      nickname,
      name,
      password
    });

    this.setState({ formStatus: false });

    if (this.onValidate()) {
      if (formData) {
        const data = new FormData();
        data.append('nickname', formData.nickname);
        data.append('name', formData.name);

        if (profileImage) {
          data.append('profileImage', profileImage);
        }

        if (!validator.isEmpty(formData.password)) {
          data.append('password', formData.password);
        }

        const { profileFormLoader: profileFormLoad } = this.props;
        profileFormLoad(data);
      }
    }
  }

  onValidate() {
    const {
      minStringLength,
      minPasswordLength,
      nickname,
      name,
      password,
      confirmPassword
    } = this.state;

    if (!validator.isLength(nickname, { min: minStringLength })) {
      this.setState({ message: 'Provide your nickname.' });
      return false;
    }

    if (!validator.isLength(name, { min: minStringLength })) {
      this.setState({ message: 'Provide your name.' });
      return false;
    }

    if (validator.isLength(password, { min: 1, max: minPasswordLength - 1 })) {
      this.setState({
        message: `Password length must be at least ${minPasswordLength}.`
      });
      return false;
    }

    if (
      validator.isLength(password, { min: 1 }) &&
      password !== confirmPassword
    ) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
  }

  resetImage(name) {
    this.setState(prevState => ({ [name]: prevState[`${name}Old`] }));
  }

  emailActiveStatus() {
    const { data } = this.props;
    const emailBoxClassName = `email-active-box ${
      data.activated ? 'active' : 'not-active'
    }`;

    return (
      <div className={emailBoxClassName}>
        {data.activated ? (
          <Fragment>
            <div className="icon">
              <MdDone />
            </div>
            Activated
          </Fragment>
        ) : (
          <Fragment>
            <div className="icon">
              <MdWarning />
            </div>
            Not activated
          </Fragment>
        )}
      </div>
    );
  }

  renderMessage() {
    const { message, formStatus } = this.state;

    return (
      <Fragment>
        {message && (
          <div className={formStatus ? 'success' : 'error'}>{message}</div>
        )}
      </Fragment>
    );
  }

  render() {
    const { isFetching, data } = this.props;

    const { nickname, name, password, confirmPassword } = this.state;

    const { profileImageOld } = this.state;

    return (
      <Fragment>
        {this.renderMessage()}
        <div className="profile-form-wrapper">
          <div className="profile-image-container">
            <ProfileImage
              oldImage={profileImageOld}
              onSubmit={this.onSubmit}
              onChange={this.onChangeProfileImage}
              resetImage={this.resetImage}
            />
          </div>
          <form className="form-wrapper" onSubmit={this.onSubmit}>
            <div className="form-inner">
              <div className="form-row">
                <div className="label">
                  <span>Email</span>
                </div>
                <div className="value">
                  <span>{data.email}</span>
                  <span>{this.emailActiveStatus()}</span>
                </div>
              </div>

              <div className="form-row">
                <div className="label">
                  <span>Nickname</span>
                </div>
                <div className="value">{nickname}</div>
              </div>

              <div className="form-row">
                <label htmlFor="name">
                  <span>Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="password">
                  <span>Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="confirm-password">
                  <span>Confirm password</span>
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" disabled={isFetching}>
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.profileForm.isFetching,
  formStatus: state.profileForm.status,
  serverMessage: state.profileForm.message
});

ProfileForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  profileFormLoader: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { profileFormLoader, getUsersList }
  )(ProfileForm)
);
