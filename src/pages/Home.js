import React, { Fragment } from 'react';
import config from '../config';

const Home = () => {
  const activated = localStorage.getItem('activatedAccount') === 'true';
  const token = localStorage.getItem(config.TOKEN_KEY_NAME);
  let auth = false;
  if (token) {
    auth = true;
  }

  return (
    <Fragment>
      { (!activated && auth) ? <div className="success">Please activate your account.</div> : null }
      <div>Welcome to my humble in</div>
    </Fragment>
  );
};

export default Home;
