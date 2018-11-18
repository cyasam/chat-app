import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import registerFormLoadAction from '../../actions/register-form-action';
import Loading from '../../components/Loading';
import NicknameInput from '../../components/NicknameInput';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      minStringLength: 3,
      minPasswordLength: 5,
      message: '',
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { auth, status, serverMessage, history } = nextProps;

    if (auth.status) {
      history.push('/');
    }

    if (status) {
      const { match } = nextProps;
      history.push({
        pathname: `${match.url}/complete`,
        state: { activated: status, message: serverMessage }
      });
    }

    return { message: serverMessage };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.onValidate()) this.createUser();
  }

  onValidate() {
    const {
      minStringLength,
      minPasswordLength,
      name,
      nickname,
      email,
      password,
      confirmPassword
    } = this.state;
    const { nicknameStatus } = this.props;

    if (!validator.isLength(nickname, { min: minStringLength })) {
      this.setState({ message: 'Provide your nickname.' });
      return false;
    }

    if (!nicknameStatus) {
      this.setState({ message: 'Provide different nickname.' });
      return false;
    }

    if (validator.isEmpty(email)) {
      this.setState({ message: 'Provide your email.' });
      return false;
    }

    if (!validator.isEmail(email)) {
      this.setState({ message: 'Provide valid email.' });
      return false;
    }

    if (!validator.isLength(name, { min: minStringLength })) {
      this.setState({ message: 'Provide your name.' });
      return false;
    }

    if (validator.isEmpty(password)) {
      this.setState({ message: 'Provide your password.' });
      return false;
    }

    if (!validator.isLength(password, { min: minPasswordLength })) {
      this.setState({
        message: `Password length must be at least ${minPasswordLength}.`
      });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
  }

  createUser() {
    const { name, nickname, email, password } = this.state;

    const fetchData = {
      name,
      nickname,
      email,
      password
    };

    const { registerFormLoad } = this.props;
    registerFormLoad(fetchData);
  }

  render() {
    const { isFetching, status } = this.props;

    const {
      minStringLength,
      message,
      name,
      nickname,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <Fragment>
        <div className="register-form">
          <h2>Join Us Now</h2>
          {isFetching && <Loading className="app" />}
          {message && (
            <div className={status ? 'success' : 'error'}>{message}</div>
          )}
          <form className="form-wrapper" onSubmit={this.onSubmit}>
            <div className="form-row">
              <NicknameInput
                value={nickname}
                minLength={minStringLength}
                onChange={this.onChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">
                <span>Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={this.onChange}
              />
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
              SignUp
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  status: state.register.status,
  serverMessage: state.register.message,
  isFetching: state.register.isFetching,
  nicknameStatus: state.checkNickname.status
});

Register.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  nicknameStatus: PropTypes.bool.isRequired,
  registerFormLoad: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { registerFormLoad: registerFormLoadAction }
  )(Register)
);
