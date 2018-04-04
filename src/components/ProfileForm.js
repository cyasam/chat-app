import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { MdWarning, MdDone } from 'react-icons/lib/md';
import helpers from '../helpers';
import profileFormLoader from '../actions/profile-form-action';
import Loading from '../components/Loading';

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minStringLength: 3,
      minPasswordLength: 5,
      profileImage: null,
      status: false,
      formChanged: false,
      message: '',
      nickname: '',
      name: '',
      oldPassword: '',
      password: '',
      confirmPassword: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.status && !this.state.formChanged) {
      this.setState({ ...nextProps.data, message: '' });
    } else {
      if (nextProps.status) {
        this.setState({
          ...nextProps.data
        });
      }
      this.setState({
        status: nextProps.status,
        message: nextProps.serverMessage
      });
      this.resetForm(nextProps);
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ formChanged: true, [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    const {
      nickname,
      name,
      oldPassword,
      password
    } = this.state;

    const formData = helpers.formDataValTrim({
      nickname,
      name,
      oldPassword,
      password
    });

    this.setState({ status: false });

    if (this.onValidate()) {
      if (formData) {
        const data = new FormData();
        data.append('nickname', formData.nickname);
        data.append('name', formData.name);
        data.append('oldPassword', formData.oldPassword);

        if (!validator.isEmpty(formData.password)) {
          data.append('password', formData.password);
        }

        this.props.profileFormLoader(data);
      }
    }
  }

  onValidate() {
    const {
      minStringLength,
      minPasswordLength,
      nickname,
      name,
      oldPassword,
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

    if (validator.isEmpty(oldPassword)) {
      this.setState({ message: 'Provide old password.' });
      return false;
    }

    if (validator.isLength(password, { min: 1, max: minPasswordLength - 1 })) {
      this.setState({ message: `Password length must be at least ${minPasswordLength}.` });
      return false;
    }

    if (validator.isLength(password, { min: 1 }) && password !== confirmPassword) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
  }

  onChangeProfileImage(event) {
    this.setState({ profileImage: event.target.files[0] });
  }

  resetForm(props) {
    if (props.status) {
      const resetObj = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      };
      this.setState({ ...resetObj });
    }
  }

  emailActiveStatus() {
    const { data } = this.props;

    return (
      <span>
        { data.activated ?
          (
            <Fragment>
              <MdDone />Activated
            </Fragment>
          ) :
          (
            <Fragment>
              <MdWarning />Not activated
            </Fragment>
          )
        }
      </span>
    );
  }

  renderMessage() {
    const {
      message,
      status,
    } = this.state;

    return (
      <Fragment>
        { message && <div className={status ? 'success' : 'error'}>{message}</div> }
      </Fragment>
    );
  }

  render() {
    const {
      isFetching,
      data
    } = this.props;

    const {
      profileImage,
      nickname,
      name,
      oldPassword,
      password,
      confirmPassword
    } = this.state;

    console.log(profileImage);

    return (
      <div className="form-wrapper">
        { this.renderMessage() }
        <form className="profile-form" onSubmit={this.onSubmit} encType="multipart/form-data">
          { isFetching && <Loading /> }
          <div className="profile-image-container">
            <label htmlFor="profile-image">
              <input id="profile-image" name="profileImage" type="file" accept=".png, .jpg, .jpeg" onChange={this.onChangeProfileImage} />
            </label>
          </div>
          <div className="form-inner">
            <label htmlFor="email">
              <span>Email</span>
              <div className="value">{ data.email } { this.emailActiveStatus() }</div>
            </label>
            <label htmlFor="nickname">
              <span>Nickname</span>
              <div className="value">{nickname}</div>
            </label>
            <label htmlFor="name">
              <span>Name</span>
              <input id="name" name="name" type="text" value={name} onChange={this.onChange} />
            </label>
            <label htmlFor="old-password">
              <span>Old Password</span>
              <input id="old-password" name="oldPassword" type="password" value={oldPassword} onChange={this.onChange} />
            </label>
            <label htmlFor="password">
              <span>Password</span>
              <input id="password" name="password" type="password" value={password} onChange={this.onChange} />
            </label>
            <label htmlFor="confirm-password">
              <span>Confirm password</span>
              <input id="confirm-password" name="confirmPassword" type="password" value={confirmPassword} onChange={this.onChange} />
            </label>
            <button type="submit" disabled={isFetching}>Save Profile</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.profileForm.isFetching,
  status: state.profileForm.status,
  serverMessage: state.profileForm.message
});

ProfileForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  serverMessage: PropTypes.string.isRequired,
  profileFormLoader: PropTypes.func.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  { profileFormLoader }
)(ProfileForm));
