import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import authLoader from '../actions/auth-action';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      email: '',
      password: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.status) {
      const { history } = nextProps;
      history.push('/');
    }

    return { message: nextProps.serverMessage };
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
    const { email, password } = this.state;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      this.setState({ message: 'Provide email and password.' });
      return false;
    }

    if (!validator.isEmail(email)) {
      this.setState({ message: 'Provide valid email.' });
      return false;
    }

    return true;
  }

  createUser() {
    const { email, password } = this.state;
    const { authLoader: authLoad } = this.props;

    authLoad(email, password);
  }

  render() {
    const { isFetching, auth } = this.props;
    const { message, email, password } = this.state;

    return (
      <div className="page-container login-form">
        <h2>Connect to Our Chat.</h2>
        {message && (
          <div className={auth.status ? 'success' : 'error'}>{message}</div>
        )}
        <form className="form-wrapper" onSubmit={this.onSubmit}>
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
          <button type="submit" disabled={isFetching}>
            {isFetching ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  serverMessage: state.authentication.message,
  isFetching: state.authentication.isFetching
});

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authLoader: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { authLoader }
  )(Login)
);
