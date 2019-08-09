import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import luss from '../../../../apis/luss';
import { province_th } from '../signup/data';

export class AddressForm extends Component {
  state = {
    loading: false,
    address: '',
    province: '',
    district: '',
    postalcode: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.setState({
        address: this.props.user.address,
        province: this.props.user.province,
        district: this.props.user.district,
        postalcode: this.props.user.postalcode
      });
      this.props.initialize({
        address: this.props.user.address,
        province: this.props.user.province,
        district: this.props.user.district,
        postalcode: this.props.user.postalcode
      });
    }
  }

  componentDidUpdate(previousProps) {
    if (previousProps.user !== this.props.user && this.props.user) {
      this.setState({
        address: this.props.user.address,
        province: this.props.user.province,
        district: this.props.user.district,
        postalcode: this.props.user.postalcode
      });
      this.props.initialize({
        address: this.props.user.address,
        province: this.props.user.province,
        district: this.props.user.district,
        postalcode: this.props.user.postalcode
      });
    }
  }

  renderError({ error, touched }) {
    if (touched && error)
      return <div className="ui pointing red basic label">{error}</div>;
  }

  renderInput = ({
    input,
    label,
    placeholder,
    type,
    meta,
    defaultValue,
    keyState
  }) => {
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
            onChange={e => this.setState({ [keyState]: e.target.value })}
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
    stateValue,
    keyStateChild
  }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select
          {...input}
          onChange={e => {
            this.setState({ [keyState]: e.target.value });
            if (keyStateChild) {
              keyStateChild.forEach(value => {
                this.setState({ [value]: '' });
              });
              if (keyStateChild.length > 1)
                this.props.initialize({
                  address: this.state.address,
                  province: this.state.province,
                  district: '',
                  postalcode: ''
                });
              else if (keyStateChild.length > 0)
                this.props.initialize({
                  address: this.state.address,
                  province: this.state.province,
                  district: this.state.district,
                  postalcode: ''
                });
            }
          }}
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
      .put(`/api/luss/user/address/${this.props.user.email}`, formValues)
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
            name="address"
            component={this.renderInput}
            placeholder="อาคาร , ถนน  และอื่น ๆ"
            label="Address"
            keyState="address"
            defaultValue={this.state.address}
          />
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
              keyStateChild={['district', 'postalcode']}
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
              keyStateChild={['postalcode']}
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

  if (!formValues.address) {
    errors.address = 'This is a required field.';
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

  return errors;
};

export default reduxForm({
  form: 'addressForm',
  validate
})(AddressForm);
