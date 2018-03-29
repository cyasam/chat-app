import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SenderForm extends Component {
  constructor() {
    super();

    this.state = {
      message: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.message.length) {
      this.props.onSubmit(this.state.message);
      this.setState({ message: '' });
    }
  }

  onChange(event) {
    this.setState({ message: event.target.value });
    this.props.onInputChange(event);
  }

  render() {
    return (
      <form className="form-wrapper chat" onSubmit={this.onSubmit} autoComplete="off">
        <label htmlFor="message">
          <input id="message" name="message" value={this.state.message} type="text" onChange={this.onChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    );
  }
}

SenderForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SenderForm;
