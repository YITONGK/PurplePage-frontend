import React from 'react';
import useFormLogin from './useForm';
import validateInfo from './validateInfo';
import TextField from '@mui/material/TextField';
import { LoginFormContentRight, LoginForm, LoginLogo, LoginHr, LoginH1, LoginFormInputs, LoginLabel, LoginError, LoginFormButton, LoginFormRegister, RegisterLink } from './LoginElements';

const Login = () => {
  const { handleChange, values, onSubmit, errors } = useFormLogin(validateInfo);

  const logo = 'http://rev.u22s2101.monash-ie.me/img/uniting-logo.png';

  const home = () => {
    window.location = '/';
  }

  const textFieldStyle = { width: '100%' };

  return (
    <LoginFormContentRight>
      <LoginForm onSubmit={onSubmit}>
        <LoginLogo src={logo} onClick={home} />
        <LoginHr />
        <LoginH1>Welcome back! Please login to your account.</LoginH1>
        <LoginFormInputs>
          <LoginLabel htmlFor='email'>Email</LoginLabel>
          <TextField
            type="text"
            id="email"
            name="email"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <LoginError>{errors.email}</LoginError>}
        </LoginFormInputs>
        <LoginFormInputs>
          <LoginLabel htmlFor='password'>Password</LoginLabel>
          <TextField
            type="password"
            id="password"
            name="password"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <LoginError>{errors.password}</LoginError>}
        </LoginFormInputs>
        <LoginFormButton type="submit">
          Login
        </LoginFormButton>
        <LoginFormRegister>
          Don't have an account? Register <RegisterLink to="/register">here</RegisterLink>
        </LoginFormRegister>
      </LoginForm>
    </LoginFormContentRight>
  )
}

export default Login
