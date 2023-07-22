import React from 'react';
import Login from '../components/Login';
import { LoginBackground, LoginContainer, LoginFormContentLeft, LoginImage } from '../components/Login/LoginElements';

// login page
const LoginPage = () => {
  const imgLink = 'http://rev.u22s2101.monash-ie.me/img/church.png'

  return (
    <LoginBackground>
      <LoginContainer>
        <LoginFormContentLeft>
          <LoginImage src={imgLink} alt="welcome" />
        </LoginFormContentLeft>
        <Login />
      </LoginContainer>
    </LoginBackground>
  )
}

export default LoginPage
