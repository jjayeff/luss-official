import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import DatePicker from './DatePicker';

export class PaymentForm extends Component {
  renderError({ error, touched }) {
    if (touched && error)
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderSelector = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select {...input}>
          <option value="">Please Select Bank To Transfer</option>
          <option value="Bangkok Bank">Bangkok Bank</option>
          <option value="Kasikorn Bank">Kasikorn Bank</option>
        </select>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className="ui container">
        <h3 className="ui attached header" style={{ marginTop: '10px' }}>
          #Payment Confirmation From
        </h3>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="order" component={this.renderInput} label="Order Name" />
          <div className="fields three">
            <Field name="name" component={this.renderInput} label="Name" />
            <Field name="email" component={this.renderInput} label="Email" />
            <Field
              name="telephone"
              component={this.renderInput}
              label="Telephone"
            />
          </div>
          <div className="fields two">
            <Field
              name="amount"
              component={this.renderInput}
              label="Baht Amount"
            />
            <Field
              name="bank"
              component={this.renderSelector}
              label="Transferred to Bank"
            />
            <Field
              label="Date Time"
              name="date"
              normalize={value =>
                value ? moment(value).format('YYYY-MM-DD hh:mm:ss') : null
              }
              component={DatePicker}
            />
          </div>
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.order) {
    errors.order = 'You must enter a order';
  }

  if (!formValues.name) {
    errors.name = 'You must enter a name';
  }

  if (!formValues.email) {
    errors.email = 'You must enter a email';
  }

  if (!formValues.telephone) {
    errors.telephone = 'You must enter a telephone';
  }

  if (!formValues.amount) {
    errors.amount = 'You must enter a amount';
  }

  if (!formValues.bank) {
    errors.bank = 'You must enter a bank';
  }

  if (!formValues.date) {
    errors.date = 'You must enter a date';
  }

  return errors;
};

export default reduxForm({
  form: 'paymentForm',
  validate
})(PaymentForm);
