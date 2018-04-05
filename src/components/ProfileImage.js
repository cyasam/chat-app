import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileImage extends Component {
  constructor() {
    super();

    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
  }

  onChangeProfileImage(event) {
    this.props.onChange(event);
  }

  render() {
    return (
      <label htmlFor="profile-image">
        <input id="profile-image" name="profileImage" type="file" accept=".png, .jpg, .jpeg" onChange={this.onChangeProfileImage} />
      </label>
    );
  }
}

ProfileImage.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default ProfileImage;
