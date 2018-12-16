import React, { Component } from "react";
import PropTypes from "prop-types";

class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0
    };
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const { percent } = this.state;
    const percentage = percent + 10;
    if (percentage >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: percentage });
    this.tm = setTimeout(() => this.increase, 10);
  }

  render() {
    const { className } = this.props;
    const { percent } = this.state;
    return (
      <div className={`loading ${className}`}>
        <p>{percent}</p>
      </div>
    );
  }
}

Loading.defaultProps = {
  className: ""
};

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;
