import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import luss from '../../../../apis/luss';
import moment from 'moment';
import DatePicker from './DatePicker';

export class ProfileForm extends Component {
  state = {
    loading: false,
    isUpdate: null,
    massage: '',
    gender: '',
    emailLoading: false,
    emailCheck: true,
    editCheck: false,
    email: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.setState({ email: this.props.user.email });
      this.setState({ gender: this.props.user.gender });
      this.props.initialize({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        gender: this.props.user.gender,
        email: this.props.user.email,
        tel: this.props.user.tel,
        dob: this.props.user.dob
      });
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.user !== this.props.user && this.props.user) {
      this.setState({ email: this.props.user.email });
      this.setState({ gender: this.props.user.gender });
      this.props.initialize({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        gender: this.props.user.gender,
        email: this.props.user.email,
        tel: this.props.user.tel,
        dob: this.props.user.dob
      });
    }
  }

  async onCheckEmail(keyState, keyState1, stateValue2) {
    this.setState({ [keyState]: true });
    const response = await luss.get(`/api/luss/user/check/${stateValue2}`);
    this.setState({ [keyState]: false });
    if (!response.data.isUnique)
      this.setState({ [keyState1]: true, editCheck: false });
    else this.setState({ [keyState1]: false });
  }

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui pointing red basic label">{error}</div>;
  }

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
            onClick={() =>
              stateValue1
                ? this.setState({ editCheck: true, emailCheck: false })
                : this.onCheckEmail(keyState, keyState1, stateValue2)
            }
          >
            <i
              className={`${
                this.state.editCheck ? 'search' : 'edit outline'
              } icon`}
            />
            {this.state.editCheck ? 'Check' : 'Edit'}
          </div>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

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
      .put(`/api/luss/user/profile/${this.props.user.email}`, formValues)
      .then(res => {
        this.setState({ loading: false, isUpdate: true, massage: '' });
        this.props.onSubmit(formValues);
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
          <div className="two fields">
            <Field
              name="firstName"
              component={this.renderInput}
              label="Firstname"
              placeholder="ชื่อ ภาษาไทย"
              defaultValue={this.props.user ? this.props.user.firstName : ''}
            />
            <Field
              name="lastName"
              component={this.renderInput}
              label="Lastname"
              placeholder="นามสกุล ภาษาไทย"
              defaultValue={this.props.user ? this.props.user.lastName : ''}
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
              defaultValue={this.props.user ? this.props.user.tel : ''}
            />
          </div>
          {this.renderMessage()}
          <button
            className={`ui button primary ${
              this.state.emailCheck ? '' : 'disabled'
            } ${this.state.loading ? 'disabled loading' : ''}`}
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
  if (!formValues.email) {
    errors.email = 'This is a required field.';
  } else if (formValues.email.indexOf('@') < 0) {
    errors.email =
      'Please enter a valid email address. For example john@domain.com';
  }

  if (!formValues.firstName) {
    errors.firstName = 'This is a required field.';
  }

  if (!formValues.lastName) {
    errors.lastName = 'This is a required field.';
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
  form: 'profileForm',
  validate
})(ProfileForm);
