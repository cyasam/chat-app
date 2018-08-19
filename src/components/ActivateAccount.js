import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ActivateAccount = props => {
  const { auth } = props;
  return (
    <Fragment>
      {!auth.activated ? <div className="activation-warning error">Please activate your account.</div> : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

ActivateAccount.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ActivateAccount);
