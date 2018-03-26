import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import register from '../../actions/register-action';
import Loading from '../../components/Loading';

class RegisterComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: false,
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
      this.props.register(fetchData);
    } else if (state) {
      const { activated, message } = this.props.location.state;
      this.setState({ activated, message });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activated, message } = nextProps;
    this.setState({ activated, message });
  }

  render() {
    return (
      <Fragment>
        <div style={{ position: 'relative', minHeight: 50 }}>
          { this.props.isFetching && <Loading /> }
          <div className={this.state.activated ? 'success' : 'error'}>{this.state.message}</div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.register.isFetching,
  activated: state.register.activated,
  message: state.register.message
});

RegisterComplete.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  activated: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, { register })(RegisterComplete));
