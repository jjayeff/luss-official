import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

export class SignUpForm extends Component {
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

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
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
        <button className="ui button primary">Login</button>
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
  form: 'signupForm',
  validate
})(SignUpForm);
