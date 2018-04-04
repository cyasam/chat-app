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
    this.props.onChange(e);
    this.checkNicknameDebounced();
  }

  checkNickname() {
    if (this.props.value.length >= this.props.minLength) {
      this.props.checkNickname(this.props.value);
    }
  }

  renderMessage() {
    if (this.props.isFetching) {
      return 'Loading';
    }

    return (this.props.value.length >= this.props.minLength) ? <span className="nick-result">{ this.props.message }</span> : null;
  }

  render() {
    return (
      <label htmlFor="nickname">
        <span>Nickname { this.renderMessage() }</span>
        <input id="nickname" name="nickname" type="text" value={this.props.value} onChange={this.onChange} />
      </label>
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

export default connect(mapStateToProps, { checkNickname })(NicknameInput);
