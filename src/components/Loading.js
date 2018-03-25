import React from 'react';
import PropTypes from 'prop-types';

const Loading = props => (
  <div className={`loading ${props.className}`}>
    <p>Loading...</p>
  </div>
);

Loading.defaultProps = {
  className: ''
};

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;
