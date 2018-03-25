import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import authLoader from '../actions/auth-action';
import Loading from '../components/Loading';

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

  componentDidMount() {
    if (this.props.authStatus) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ message: nextProps.serverMessage });

    if (nextProps.authStatus) {
      this.props.history.push('/');
    }
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
      email,
      password
    } = this.state;

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
    const {
      email,
      password
    } = this.state;

    this.props.authLoader(email, password);
  }

  render() {
    const { isFetching, authStatus } = this.props;

    const {
      message,
      email,
      password
    } = this.state;

    return (
      <div className="form-wrapper">
        { message && <div className={authStatus ? 'success' : 'error'}>{message}</div> }
        <form onSubmit={this.onSubmit}>
          { isFetching && <Loading /> }
          <label htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" value={email} onChange={this.onChange} />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <input id="password" name="password" type="password" value={password} onChange={this.onChange} />
          </label>
          <button type="submit" disabled={isFetching}>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: state.authentication.auth.status,
  serverMessage: state.authentication.message,
  isFetching: state.authentication.isFetching,
});

Login.propTypes = {
  authStatus: PropTypes.bool.isRequired,
  serverMessage: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authLoader: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, { authLoader })(Login));
