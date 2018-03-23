import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class RegisterComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };
  }

  componentWillMount() {
    const { search, state } = this.props.location;
    const params = new URLSearchParams(search);
    const key = params.get('key');

    if (!state && !key) {
      this.props.history.push('/');
    } else if (key) {
      const fetchData = { key };

      fetch('http://192.168.1.13:4567/auth/register/complete', {
        method: 'put',
        body: JSON.stringify(fetchData),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(response => response.json())
        .then((result) => {
          this.setState({ message: result.message });
        }).catch((error) => {
          this.setState({ message: error.message });
          throw error;
        });
    } else {
      const { message } = this.props.location.state;
      this.setState({ message });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="success">{this.state.message}</div>
      </Fragment>
    );
  }
}

RegisterComplete.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(RegisterComplete);
