import React from 'react';
import SignUpForm from './SignupForm';

function Signup({ onSubmit }) {
  return (
    <div className="ui container">
      <h3 className="ui top attached header" style={{ marginTop: '10px' }}>
        #Signup
      </h3>
      <div className="ui attached header">
        <SignUpForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Signup;
