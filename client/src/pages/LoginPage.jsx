import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { login } from '../libs/auth/actions';

const LoginPage = ({ login, error }) => {
  const submit = (e, values) => {
    e.preventDefault();

    login({ login: values.username, password: values.password });
  }

  return (
    <div className="row" style={{ marginTop: '25%' }}>
      {error && <div className="card-panel red lighten-2 white-text center"><span>{error}</span></div>}
      <div className="col s6 offset-s3">
        <LoginForm handleSubmit={submit}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  error: state.authentication.error
});

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginPage)
);
