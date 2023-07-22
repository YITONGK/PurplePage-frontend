import React from 'react';
import useFormRegister from './useForm';
import TextField from '@mui/material/TextField';
import { RegisterFormContentRight, RegisterForm, RegisterLogo, RegisterHr, RegisterH1, RegisterFormInputs, RegisterLabel, RegisterError, RegisterFormButton, RegisterFormLogin, LoginLink } from './RegisterElements';

const Register = () => {
  const { handleChange, values, onSubmit, errors } = useFormRegister();

  const logo = 'http://rev.u22s2101.monash-ie.me/img/uniting-logo.png';

  const home = () => {
    window.location = '/';
  }

  const textFieldStyle = { width: '100%' };

  return (
    <RegisterFormContentRight>
      <RegisterForm onSubmit={onSubmit}>
        <RegisterLogo src={logo} onClick={home} />
        <RegisterHr />
        <RegisterH1>Welcome! Create your account by filling out the information below.</RegisterH1>
        <RegisterFormInputs>
          <RegisterLabel htmlFor='name'>Name</RegisterLabel>
          <TextField
            type="text"
            id="name"
            name="name"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            placeholder="Enter your name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <RegisterError>{errors.name}</RegisterError>}
        </RegisterFormInputs>
        <RegisterFormInputs>
          <RegisterLabel htmlFor='email'>Email</RegisterLabel>
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
          {errors.email && <RegisterError>{errors.email}</RegisterError>}
        </RegisterFormInputs>
        <RegisterFormInputs>
          <RegisterLabel htmlFor='password'>Password</RegisterLabel>
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
          {errors.password && <RegisterError>{errors.password}</RegisterError>}
        </RegisterFormInputs>
        <RegisterFormInputs>
          <RegisterLabel htmlFor='password'>Confirm Password</RegisterLabel>
          <TextField
            type="password"
            id="password2"
            name="password2"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            placeholder="Enter your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <RegisterError>{errors.password2}</RegisterError>}
        </RegisterFormInputs>
        <RegisterFormButton type="submit">
          Register
        </RegisterFormButton>
        <RegisterFormLogin>
          Already have an account? Login <LoginLink to="/login">here</LoginLink>
        </RegisterFormLogin>
      </RegisterForm>
    </RegisterFormContentRight>
  )
}

export default Register
