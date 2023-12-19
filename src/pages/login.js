import React from 'react';
import Login from '../components/Login';
import { LoginBackground, LoginContainer, LoginFormContentLeft, LoginImage } from '../components/Login/LoginElements';

// login page
const LoginPage = () => {

  return (
    <LoginBackground>
      <LoginContainer>
        <LoginFormContentLeft>
          <LoginImage src={require('../images/uniting-icon.png')} alt="welcome" />
        </LoginFormContentLeft>
        <Login />
      </LoginContainer>
    </LoginBackground>
  )
}

export default LoginPage
