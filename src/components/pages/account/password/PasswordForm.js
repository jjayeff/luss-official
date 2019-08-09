import React, { Component } from 'react';
import md5 from 'md5';
import luss from '../../../../apis/luss';
import { Field, reduxForm } from 'redux-form';

export class PasswordForm extends Component {
  state = {
    loading: false,
    isUpdate: null,
    massage: ''
  };

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui pointing red basic label">{error}</div>;
  }

  renderInput = ({ input, label, placeholder, type, meta, defaultValue }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div className="ui left input">
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            value={defaultValue}
          />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelect = ({
    keyState,
    input,
    label,
    meta,
    option,
    placeholder,
    stateValue
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select
          {...input}
          onChange={e => this.setState({ [keyState]: e.target.value })}
          disabled={option.length ? false : true}
          value={stateValue}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {option.sort().map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = async formValues => {
    this.setState({ loading: true });
    await luss
      .get(
        `/api/luss/user/check/${this.props.user.email}/${md5(
          formValues.oldPassword
        )}`
      )
      .then(async res => {
        if (res.data.isCorrect) {
          formValues.password = md5(formValues.password);
          await luss
            .put(`/api/luss/user/password/${this.props.user.email}`, formValues)
            .then(res => {
              this.setState({ loading: false, isUpdate: true, massage: '' });
            })
            .catch(e => {
              this.setState({ loading: false, isUpdate: false, massage: '' });
            });
        } else {
          this.setState({
            loading: false,
            isUpdate: false,
            massage: 'Old password is wrong.'
          });
        }
      })
      .catch(e => {
        this.setState({ loading: false, isUpdate: false, massage: '' });
      });
    setTimeout(() => this.setState({ isUpdate: null }), 10000);
  };

  renderMessage() {
    if (this.state.isUpdate != null) {
      if (this.state.isUpdate)
        return (
          <div className="ui positive message">
            <i
              className="close icon"
              onClick={() => this.setState({ isUpdate: null })}
            />
            <div className="header">Your update is successful.</div>
            <p>{this.state.massage}</p>
          </div>
        );
      else
        return (
          <div className="ui negative message">
            <i
              className="close icon"
              onClick={() => this.setState({ isUpdate: null })}
            />
            <div className="header">Your update was unsuccessful.</div>
            <p>{this.state.massage}</p>
          </div>
        );
    }
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <div style={{ marginTop: '20px' }}>
          <Field
            name="oldPassword"
            component={this.renderInput}
            placeholder="Old Password"
            label="Old Password"
            type="password"
          />
          <Field
            name="password"
            component={this.renderInput}
            placeholder="New Password"
            label="New Password"
            type="password"
          />
          <Field
            name="confirmPassword"
            component={this.renderInput}
            placeholder="Confirm New Password"
            type="password"
          />
          {this.renderMessage()}
          <button
            className={`ui button ${
              this.state.loading ? 'disabled loading' : ''
            } primary`}
            style={{ margin: '10px 0' }}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.oldPassword) {
    errors.oldPassword = 'This is a required field.';
  }

  if (!formValues.password) {
    errors.password = 'This is a required field.';
  }

  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'This is a required field.';
  } else if (
    formValues.password &&
    formValues.password !== formValues.confirmPassword
  ) {
    errors.confirmPassword = 'Please make sure your passwords match.';
  }

  return errors;
};

export default reduxForm({
  form: 'passwordForm',
  validate
})(PasswordForm);
