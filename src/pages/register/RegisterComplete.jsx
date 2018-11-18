import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import registerAction from '../../actions/register-action';
import Loading from '../../components/Loading';

class RegisterComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activated: false,
      message: ''
    };
  }

  componentDidMount() {
    const {
      history,
      location: { search, state },
      registerAction: register
    } = this.props;
    const params = new URLSearchParams(search);
    const key = params.get('key');

    if (!state) {
      history.push('/');
    }
    if (key) {
      const fetchData = { key };
      register(fetchData);
    }
    if (state) {
      const { activated, message } = state;
      this.setState({ activated, message });
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { activated, message } = nextProps;
    return { activated, message };
  }

  render() {
    const { activated, message } = this.state;
    const { isFetching } = this.props;

    return (
      <Fragment>
        <div style={{ position: 'relative', minHeight: 50 }}>
          {isFetching && <Loading />}
          <div className={activated ? 'success' : 'error'}>{message}</div>
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
  registerAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { registerAction }
  )(RegisterComplete)
);
