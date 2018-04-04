import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import registerFormLoader from '../../actions/register-form-action';
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

  componentDidMount() {
    if (this.props.auth.status) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ message: nextProps.serverMessage });

    if (nextProps.status) {
      this.props.history.push({
        pathname: `${this.props.match.url}/complete`,
        state: { activated: nextProps.status, message: nextProps.serverMessage }
      });
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
      minStringLength,
      minPasswordLength,
      name,
      nickname,
      email,
      password,
      confirmPassword
    } = this.state;

    if (!validator.isLength(nickname, { min: minStringLength })) {
      this.setState({ message: 'Provide your nickname.' });
      return false;
    }

    if (!this.props.nicknameStatus) {
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
      this.setState({ message: `Password length must be at least ${minPasswordLength}.` });
      return false;
    }

    if (password !== confirmPassword) {
      this.setState({ message: 'Password and Confirm password not matched.' });
      return false;
    }

    return true;
  }

  createUser() {
    const {
      name,
      nickname,
      email,
      password
    } = this.state;

    const fetchData = {
      name,
      nickname,
      email,
      password
    };

    this.props.registerFormLoader(fetchData);
  }

  render() {
    const {
      isFetching,
      status
    } = this.props;

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
      <div className="form-wrapper">
        { message && <div className={status ? 'success' : 'error'}>{message}</div> }
        <form onSubmit={this.onSubmit}>
          { isFetching && <Loading /> }
          <NicknameInput value={nickname} minLength={minStringLength} onChange={this.onChange} />
          <label htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" value={email} onChange={this.onChange} />
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
          <button type="submit" disabled={isFetching}>SignUp</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
  status: state.registerForm.status,
  serverMessage: state.registerForm.message,
  isFetching: state.registerForm.isFetching,
  nicknameStatus: state.checkNickname.status
});

Register.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  status: PropTypes.bool.isRequired,
  serverMessage: PropTypes.string.isRequired,
  nicknameStatus: PropTypes.bool.isRequired,
  registerFormLoader: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, { registerFormLoader })(Register));
