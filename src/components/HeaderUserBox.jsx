import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logoutAction from '../actions/logout-action';

class UserBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleUserClick = this.handleUserClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleUserClick() {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  handleLinkClick() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    const { auth, logout } = this.props;

    return (
      <div className="user-box">
        <button
          type="button"
          className="user-box-detail"
          onClick={this.handleUserClick}
        >
          <img
            className="thumb-img"
            src={auth.profileImage.thumb}
            alt={auth.name}
          />
          <span>{auth.nickname}</span>
        </button>
        <ul
          className="user-box-popup"
          style={{ display: open ? 'block' : 'none' }}
        >
          <li>
            <Link onClick={this.handleLinkClick} to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authentication.auth,
});

UserBox.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { logout: logoutAction },
)(UserBox);
