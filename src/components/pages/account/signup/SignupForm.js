import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { province, district } from './data';

export class SignUpForm extends Component {
  state = {
    province: '',
    district: '',
    postalcode: ''
  };

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

  renderInput = ({ input, label, placeholder, type, icon, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <div className="ui left input">
          <input {...input} type={type} placeholder={placeholder} />
        </div>
      </div>
    );
  };
  renderSelect = ({ keyState, label, meta, option, placeholder }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select
          onChange={e => this.setState({ [keyState]: e.target.value })}
          disabled={option.length ? false : true}
        >
          <option value="" disabled selected>
            {placeholder}
          </option>
          {option.sort().map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
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
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
          placeholder="Paddword"
        />
        <Field
          name="confirm-password"
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
            name="province"
            component={this.renderSelect}
            option={province}
            placeholder="จังหวัด"
            keyState="province"
          />
          <Field
            name="district"
            component={this.renderSelect}
            option={
              this.state.province
                ? district
                    .filter(value => value.province === this.state.province)
                    .map(value => value.district)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                : []
            }
            placeholder="เขต/อำเภอ"
            keyState="district"
          />
          <Field
            name="postalcode"
            component={this.renderSelect}
            option={
              this.state.district
                ? district
                    .filter(value => value.district === this.state.district)
                    .map(value => value.postalcode)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                : []
            }
            placeholder="รหัสไปรษณีย์"
            keyState="postalcode"
          />
        </div>
        <Field
          name="tel"
          component={this.renderInput}
          placeholder="หมายเลขโทรศัพท์"
          label="Tel"
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
