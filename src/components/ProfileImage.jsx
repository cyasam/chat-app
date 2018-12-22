import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Croppie } from 'croppie';

class ProfileImage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      previewImage: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeProfileImage = this.onChangeProfileImage.bind(this);
    this.resetImage = this.resetImage.bind(this);

    this.profileImageBox = React.createRef();
  }

  onChangeProfileImage(event) {
    this.previewImage(event);
  }

  onSubmit(event) {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit(event);
  }

  croppingInit(image) {
    const width = 200;
    const height = 200;

    if (this.croppie) {
      this.croppie.destroy();
    }

    const profileImageBox = this.profileImageBox.current;

    this.croppie = new Croppie(profileImageBox, {
      viewport: {
        width,
        height,
        type: 'square',
      },
      boundary: {
        width,
        height,
      },
    });

    this.croppie.bind({
      url: image.src,
    });

    profileImageBox.addEventListener('update', () => {
      const { name } = this.state;
      const { onChange } = this.props;

      this.croppie.result({ type: 'blob', format: 'png' }).then(result => {
        onChange(name, result);
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
    const { name } = this.state;
    const { resetImage } = this.props;

    resetImage(name);
    this.setState({ previewImage: false });
  }

  render() {
    const { previewImage } = this.state;
    const { oldImage } = this.props;

    return (
      <form
        className="profile-image-box"
        onSubmit={this.onSubmit}
        encType="multipart/form-data"
      >
        {previewImage ? (
          <div className="preview-box-container">
            <div className="preview-box" ref={this.profileImageBox} />
            <button type="submit" className="button">
              Save
            </button>
            <div
              className="button"
              role="link"
              onClick={this.resetImage}
              onKeyDown={this.resetImage}
              tabIndex={0}
            >
              Cancel
            </div>
          </div>
        ) : (
          <label htmlFor="profile-image-input">
            {oldImage ? (
              <img src={oldImage} className="profile-placeholder" alt="" />
            ) : (
              <div className="profile-placeholder" />
            )}
            <input
              id="profile-image-input"
              name="profileImage"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={this.onChangeProfileImage}
            />
          </label>
        )}
      </form>
    );
  }
}

ProfileImage.defaultProps = {
  oldImage: '',
};

ProfileImage.propTypes = {
  oldImage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  resetImage: PropTypes.func.isRequired,
};

export default ProfileImage;
