import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import registerLoader from '../../actions/register-action';
import Loading from '../../components/Loading';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ message: nextProps.serverMessage });

    if (nextProps.status) {
      this.props.history.push({
        pathname: `${this.props.match.url}/complete`,
        state: { status: nextProps.status, message: nextProps.serverMessage }
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
      name,
      email,
      password,
      confirmPassword
    } = this.state;

    if (!validator.isLength(name, { min: 2 })) {
      this.setState({ message: 'Provide your name.' });
      return false;
    }

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      this.setState({ message: 'Provide email and password.' });
      return false;
    }

    if (!validator.isEmail(email)) {
      this.setState({ message: 'Provide valid email.' });
      return false;
    }

    if (!validator.isLength(password, { min: 5 })) {
      this.setState({ message: 'Password length must be at least 5.' });
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
      email,
      password
    } = this.state;

    const fetchData = {
      name,
      email,
      password
    };

    this.props.registerLoader(fetchData);
  }

  render() {
    const {
      isFetching,
      status
    } = this.props;

    const {
      message,
      name,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <div className="form-wrapper">
        { message && <div className={status ? 'success' : 'error'}>{message}</div> }
        <form onSubmit={this.onSubmit}>
          { isFetching && <Loading /> }
          <label htmlFor="name">
            <span>Name</span>
            <input id="name" name="name" type="text" defaultValue={name} onChange={this.onChange} />
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <input id="email" name="email" type="email" defaultValue={email} onChange={this.onChange} />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <input id="password" name="password" type="password" defaultValue={password} onChange={this.onChange} />
          </label>
          <label htmlFor="confirm-password">
            <span>Confirm password</span>
            <input id="confirm-password" name="confirmPassword" type="password" defaultValue={confirmPassword} onChange={this.onChange} />
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
});

Register.propTypes = {
  auth: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired,
  serverMessage: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  registerLoader: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, { registerLoader })(Register));
