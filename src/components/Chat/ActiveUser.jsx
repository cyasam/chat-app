import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ActiveUser = props => {
  const { user } = props;
  const nicknameClass = 'status online';
  return (
    <Fragment>
      {user.profileImage ? (
        <img
          className="thumb-img"
          src={user.profileImage.thumb}
          alt={user.nickname}
        />
      ) : (
        <div className="anonymous-thumb" />
      )}
      {user.nickname} <span className={nicknameClass} />
    </Fragment>
  );
};

ActiveUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ActiveUser;
