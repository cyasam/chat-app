import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import profileFormLoader from '../actions/profile-form-action';
import Loading from '../components/Loading';

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      formChanged: false,
      message: '',
      name: '',
      oldPassword: '',
      password: '',
      confirmPassword: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.status && !this.state.formChanged) {
      this.setState({ ...nextProps.data, message: '' });
    } else {
      this.setState({ status: nextProps.status, message: nextProps.serverMessage });
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
      name,
      oldPassword,
      password
    } = this.state;

    const formData = {
      name,
      oldPassword,
      password
    };

    this.setState({ status: false });

    if (this.onValidate()) {
      if (validator.isEmpty(password)) {
        delete formData.password;
      }

      if (formData) this.props.profileFormLoader(formData);
    }
  }

  onValidate() {
    const {
      name,
      oldPassword,
      password,
      confirmPassword
    } = this.state;

    if (!validator.isLength(name, { min: 2 })) {
      this.setState({ message: 'Provide your name.' });
      return false;
    }

    if (validator.isEmpty(oldPassword)) {
      this.setState({ message: 'Provide old password.' });
      return false;
    }

    if (validator.isLength(password, { min: 1, max: 4 })) {
      this.setState({ message: 'Password length must be at least 5.' });
      return false;
    }

    if (validator.isLength(password, { min: 1 }) && password !== confirmPassword) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
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
      name,
      oldPassword,
      password,
      confirmPassword
    } = this.state;

    return (
      <div className="form-wrapper">
        { this.renderMessage() }
        <form onSubmit={this.onSubmit}>
          { isFetching && <Loading /> }
          <label htmlFor="email">
            <span>Email</span>
            <p>{ data.email }</p>
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
          <button type="submit" disabled={isFetching}>Save</button>
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
