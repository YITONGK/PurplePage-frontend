import React from 'react';
import Register from '../components/Register';
import { RegisterBackground, RegisterContainer, RegisterFormContentLeft, RegisterImage } from '../components/Register/RegisterElements';

// register page
const RegisterPage = () => {
  const imgLink = 'http://rev.u22s2101.monash-ie.me/img/church.png'

  return (
    <RegisterBackground>
      <RegisterContainer>
        <RegisterFormContentLeft>
          <RegisterImage src={imgLink} alt="welcome" />
        </RegisterFormContentLeft>
        <Register />
      </RegisterContainer>
    </RegisterBackground>
  )
}

export default RegisterPage
