import React from 'react';
import Register from '../components/Register';
import { RegisterBackground, RegisterContainer, RegisterFormContentLeft, RegisterImage } from '../components/Register/RegisterElements';

// register page
const RegisterPage = () => {

  return (
    <RegisterBackground>
      <RegisterContainer>
        <RegisterFormContentLeft>
          <RegisterImage src={require('../images/uniting-icon.png')} alt="welcome" />
        </RegisterFormContentLeft>
        <Register />
      </RegisterContainer>
    </RegisterBackground>
  )
}

export default RegisterPage
