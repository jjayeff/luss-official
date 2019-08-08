import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { province_th } from './data';
import luss from '../../../../apis/luss';
import moment from 'moment';
import DatePicker from './DatePicker';

export class SignUpForm extends Component {
  state = {
    province: '',
    district: '',
    postalcode: '',
    gender: '',
    emailLoading: false,
    emailCheck: null,
    email: ''
  };

  async onCheckEmail(keyState, keyState1, stateValue2) {
    this.setState({ [keyState]: true });
    const response = await luss.get(`/api/luss/user/check/${stateValue2}`);
    this.setState({ [keyState]: false });
    if (!response.data.isUnique) this.setState({ [keyState1]: true });
    else this.setState({ [keyState1]: false });
  }

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui pointing red basic label">{error}</div>;
  }

  renderInputIcon = ({ input, label, placeholder, type, icon, meta }) => {
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

  renderInputButton = ({
    input,
    label,
    placeholder,
    type,
    meta,
    keyState,
    stateValue,
    keyState1,
    stateValue1,
    keyState2,
    stateValue2
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div
          className={`ui action left icon input ${stateValue ? 'loading' : ''}`}
        >
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            value={stateValue2}
            onChange={e => this.setState({ [keyState2]: e.target.value })}
            disabled={stateValue1}
          />
          <i
            className={`${
              stateValue1 != null
                ? stateValue1
                  ? 'green check'
                  : 'red close icon'
                : 'question circle outline'
            } icon`}
          />
          <div
            className={`ui ${
              stateValue2.indexOf('@') < 0 ? 'disabled' : ''
            } button`}
            onClick={() => this.onCheckEmail(keyState, keyState1, stateValue2)}
          >
            <i className="search icon" />
            Check
          </div>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderInput = ({ input, label, placeholder, type, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div className="ui left input">
          <input {...input} type={type} placeholder={placeholder} />
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
          component={this.renderInputButton}
          label="Email"
          placeholder="Email"
          keyState="emailLoading"
          keyState1="emailCheck"
          keyState2="email"
          stateValue={this.state.emailLoading}
          stateValue1={this.state.emailCheck}
          stateValue2={this.state.email}
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
          placeholder="Paddword"
        />
        <Field
          name="confirmPassword"
          type="password"
          component={this.renderInput}
          placeholder="Confirm Password"
        />
        <Field
          name="address"
          component={this.renderInput}
          placeholder="อาคาร , ถนน  และอื่น ๆ"
          label="Address"
        />
        <div className="two fields">
          <Field
            name="firstName"
            component={this.renderInput}
            label="Firstname"
            placeholder="ชื่อ ภาษาไทย"
          />
          <Field
            name="lastName"
            component={this.renderInput}
            label="Lastname"
            placeholder="นามสกุล ภาษาไทย"
          />
        </div>
        <div className="three fields">
          <Field
            label="Birthday"
            name="dob"
            normalize={value =>
              value ? moment(value).format('YYYY-MM-DD') : null
            }
            component={DatePicker}
          />
          <Field
            label="Gender"
            name="gender"
            component={this.renderSelect}
            option={['ชาย', 'หญิง', 'ไม่ระบุ']}
            placeholder="เพศ"
            keyState="gender"
            stateValue={this.state.gender}
          />
          <Field
            name="tel"
            component={this.renderInput}
            placeholder="หมายเลขโทรศัพท์"
            label="Tel"
          />
        </div>
        <div className="three fields">
          <Field
            name="province"
            component={this.renderSelect}
            option={province_th
              .map(value => value.province)
              .filter((value, index, self) => self.indexOf(value) === index)}
            placeholder="จังหวัด"
            keyState="province"
            stateValue={this.state.province}
          />
          <Field
            name="district"
            component={this.renderSelect}
            option={
              this.state.province
                ? province_th
                    .filter(value => value.province === this.state.province)
                    .map(value => value.district)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                : []
            }
            placeholder="เขต/อำเภอ"
            keyState="district"
            stateValue={this.state.district}
          />
          <Field
            name="postalcode"
            component={this.renderSelect}
            option={
              this.state.district
                ? province_th
                    .filter(value => value.district === this.state.district)
                    .map(value => value.postalcode)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                : []
            }
            placeholder="รหัสไปรษณีย์"
            keyState="postalcode"
            stateValue={this.state.postalcode}
          />
        </div>
        <button
          className={`ui button primary ${
            this.state.emailCheck ? '' : 'disabled'
          }`}
        >
          Sigh up
        </button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'This is a required field.';
  } else if (formValues.email.indexOf('@') < 0) {
    errors.email =
      'Please enter a valid email address. For example john@domain.com';
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

  if (!formValues.address) {
    errors.address = 'This is a required field.';
  }

  if (!formValues.firstName) {
    errors.firstName = 'This is a required field.';
  }

  if (!formValues.lastName) {
    errors.lastName = 'This is a required field.';
  }

  if (!formValues.province) {
    errors.province = 'This is a required field.';
  }

  if (!formValues.district) {
    errors.district = 'This is a required field.';
  }

  if (!formValues.postalcode) {
    errors.postalcode = 'This is a required field.';
  }

  if (!formValues.gender) {
    errors.gender = 'This is a required field.';
  }

  if (!formValues.dob) {
    errors.dob = 'This is a required field.';
  }

  if (!formValues.tel) {
    errors.tel = 'This is a required field.';
  } else if (isNaN(formValues.tel) || formValues.tel.length !== 10) {
    errors.tel = 'Invalid phone number.';
  }

  return errors;
};

export default reduxForm({
  form: 'signupForm',
  validate
})(SignUpForm);
