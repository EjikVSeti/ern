import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} autoComplete="on"/>
      {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

let LoginForm = ({ handleSubmit, username = '', password = '' }) => {
  return (
    <form
      onSubmit={(e) => handleSubmit(e, { username, password })}
    >
      <div className="row">
        <label>Username</label>
        <Field
          name="username"
          component={renderField}
          type="text"
        />
      </div>
      <div className="row">
        <label>Password</label>
        <Field
          name="password"
          component={renderField}
          type="password"
        />
      </div>

      <div className="container">
        <button
          type="submit"
          className="btn waves-effect waves-light"
          disabled={!(username.length && password.length)}
        >
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    </form>
  );
}

const validate = values => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Username is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

LoginForm = reduxForm({
  validate,
  form: 'loginForm',
})(LoginForm)

const selector = formValueSelector('loginForm');

LoginForm = connect(state => {
  const username = selector(state, 'username');
  const password = selector(state, 'password');
  return {
    username,
    password,
  };
})(LoginForm);

export default LoginForm;
