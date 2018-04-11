import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Croppie } from 'croppie';

class ProfileImage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      previewImage: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
    this.resetImage = this.resetImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.oldImage !== nextProps.oldImage) {
      this.setState({ previewImage: false });
    }
  }

  onChangeProfileImage(event) {
    this.previewImage(event);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(event);
  }

  croppingInit(image) {
    const width = 200;
    const height = 200;

    if (this.croppie) {
      this.croppie.destroy();
    }

    this.croppie = new Croppie(this.profileImageBox, {
      viewport: {
        width,
        height,
        type: 'square'
      },
      boundary: {
        width,
        height
      }
    });

    this.croppie.bind({
      url: image.src
    });

    this.profileImageBox.addEventListener('update', () => {
      this.croppie.result({ type: 'blob', format: 'png' }).then((result) => {
        this.props.onChange(this.state.name, result);
      });
    });
  }

  previewImage(event) {
    this.setState({ name: event.target.name });
    const image = event.target.files[0];
    if (image) {
      const URL = window.URL || window.webkitURL;
      const blobImage = new Image();

      blobImage.onload = () => {
        this.setState({ previewImage: true }, () => {
          this.croppingInit(blobImage);
        });
      };

      blobImage.src = URL.createObjectURL(image);
    }
  }

  resetImage() {
    this.props.resetImage(this.state.name);
    this.setState({ previewImage: false });
  }

  changeImageNameStr() {
    return this.props.oldImage ?
      this.props.oldImage.replace('-thumb', '') : this.props.oldImage;
  }

  render() {
    return (
      <form className="profile-image-box" onSubmit={this.onSubmit} encType="multipart/form-data">
        { this.state.previewImage ? (
          <div className="preview-box-container">
            <div className="preview-box" ref={(profileImageBox) => { this.profileImageBox = profileImageBox; }} />
            <button className="button">Save</button>
            <div className="button" role="link" onClick={this.resetImage} onKeyDown={this.resetImage} tabIndex={0}>Cancel</div>
          </div>
        ) : (
          <label htmlFor="profile-image-input">
            { this.props.oldImage ? (
              <img src={this.changeImageNameStr()} className="profile-placeholder" alt="" />
            ) : (
              <div className="profile-placeholder" />
            )}
            <input id="profile-image-input" name="profileImage" type="file" accept=".png, .jpg, .jpeg" onChange={this.onChangeProfileImage} />
          </label>
        )}
      </form>
    );
  }
}

ProfileImage.defaultProps = {
  oldImage: ''
};

ProfileImage.propTypes = {
  oldImage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired
};

export default ProfileImage;
