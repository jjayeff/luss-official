import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

export default function Login({ onSubmit }) {
  return (
    <div className="ui container">
      <h3 className="ui top attached header" style={{ marginTop: '10px' }}>
        #Signin or Signup
      </h3>
      <div className="ui attached header">
        <div className="ui placeholder segment">
          <div className="ui two column very relaxed grid">
            <div className="column">
              <LoginForm onSubmit={onSubmit} />
            </div>
            <div className="middle aligned column">
              <Link to="/account/signup" className="ui big button">
                <i className="signup icon" />
                Sign Up
              </Link>
            </div>
          </div>
          <div className="ui vertical divider">Or</div>
        </div>
      </div>
    </div>
  );
}
