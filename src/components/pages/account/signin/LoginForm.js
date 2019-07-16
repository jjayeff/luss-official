import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import luss from '../../../../apis/luss';

export class LoginForm extends Component {
  state = {
    isSubmit: false
  };
  renderInput = ({ input, label, placeholder, type, icon, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div className="ui left icon input">
          <input {...input} type={type} placeholder={placeholder} />
          <i className={`${icon} icon`} />
        </div>
      </div>
    );
  };

  onSubmit = async formValues => {
    this.setState({ isSubmit: true });
    await luss
      .post('/api/luss/users/login', formValues)
      .then(res => this.props.onSubmit(res.data))
      .catch(e => {
        this.setState({ isSubmit: false });
        throw new SubmissionError({
          email: 'email does not exist',
          password: 'Wrong password',
          _error: e
        });
      });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="email"
          component={this.renderInput}
          label="Email"
          placeholder="Email"
          icon="user"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
          icon="lock"
        />
        <button
          type="submit"
          className={`ui button primary ${
            this.state.isSubmit ? 'loading' : ''
          }`}
        >
          Login
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'You must enter a email';
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password';
  }

  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);
