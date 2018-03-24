import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ActivateAccount = props => (
  <Fragment>
    { !props.auth.activated && props.auth.status ? <div className="success">Please activate your account.</div> : null }
  </Fragment>
);

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

ActivateAccount.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ActivateAccount);
