import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import checkNickname from '../actions/check-nickname-action';

class NicknameInput extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.checkNicknameDebounced = debounce(this.checkNickname, 600);
  }

  componentDidMount() {}

  onChange(e) {
    const { onChange } = this.props;

    onChange(e);
    this.checkNicknameDebounced();
  }

  checkNickname() {
    const { checkNickname: checkNick, value, minLength } = this.props;

    if (value.length >= minLength) {
      checkNick(value);
    }
  }

  renderMessage() {
    const { isFetching, value, minLength, message } = this.props;

    if (isFetching) {
      return 'Loading';
    }

    return (
      value.length >= minLength && (
        <span className="nick-result">{message}</span>
      )
    );
  }

  render() {
    const { value } = this.props;
    return (
      <div className="form-row">
        <label htmlFor="nickname">
          <span>
            Nickname
            <span>{this.renderMessage()}</span>
          </span>
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.checkNickname.isFetching,
  message: state.checkNickname.message
});

NicknameInput.defaultProps = {
  minLength: 3
};

NicknameInput.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  checkNickname: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { checkNickname }
)(NicknameInput);
