import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { MdWarning, MdDone } from 'react-icons/lib/md';
import helpers from '../helpers';
import profileFormLoader from '../actions/profile-form-action';
import Loading from '../components/Loading';
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

  componentWillReceiveProps(nextProps) {
    if (!this.state.formStatus && this.state.firstLoad) {
      this.setState({
        ...nextProps.data,
        profileImageOld: nextProps.data.profileImage,
        firstLoad: false,
        message: ''
      });
    } else {
      if (nextProps.formStatus) {
        this.setState({
          ...nextProps.data,
          profileImageOld: nextProps.data.profileImage
        });
      }
      this.resetForm(nextProps);
    }

    this.setState({
      formStatus: nextProps.formStatus,
      message: nextProps.serverMessage
    });
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

    const {
      nickname,
      name,
      password,
      profileImage
    } = this.state;

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
      this.setState({ message: `Password length must be at least ${minPasswordLength}.` });
      return false;
    }

    if (validator.isLength(password, { min: 1 }) && password !== confirmPassword) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
  }

  resetImage(name) {
    this.setState({ [name]: this.state[`${name}Old`] });
  }

  resetForm(props) {
    if (props.data.status) {
      const resetObj = {
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
      formStatus,
    } = this.state;

    return (
      <Fragment>
        { message && <div className={formStatus ? 'success' : 'error'}>{message}</div> }
      </Fragment>
    );
  }

  render() {
    const {
      isFetching,
      data
    } = this.props;

    const {
      nickname,
      name,
      password,
      confirmPassword
    } = this.state;

    return (
      <Fragment>
        { this.renderMessage() }
        { isFetching && <Loading /> }
        <div className="profile-form-wrapper">
          <div className="profile-image-container">
            <ProfileImage
              oldImage={this.state.profileImageOld}
              onSubmit={this.onSubmit}
              onChange={this.onChangeProfileImage}
              resetImage={this.resetImage}
            />
          </div>
          <form className="form-wrapper" onSubmit={this.onSubmit}>
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
  formStatus: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  serverMessage: PropTypes.string.isRequired,
  profileFormLoader: PropTypes.func.isRequired
};

export default withRouter(connect(
  mapStateToProps,
  { profileFormLoader }
)(ProfileForm));
