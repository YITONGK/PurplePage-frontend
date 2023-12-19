import axios from "axios";
import React, { useState } from 'react';
import { UserCreateContainer, UserCreateH1, UserCreateForm, UserCreateDiv, UserCreateError } from "./UserCreateElements";
import validateInfo from "../Register/validateInfo";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const UserCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});

  // handle the change for the states
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }
  
  // handle submitting the data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();

    setErrors(validateInfo(values));
    
    await axios({
      method: "POST",
      data: {
        name: values.name,
        email: values.email,
        password: values.password
      },
      withCredentials:  true,
      url: 'https://purplepagesbackend.vt.uniting.org/users'
    }).then((res) => {
      if (Object.keys(res.data).length !== 0) {
        Swal.fire({
          title: "Account has been successfully created!",
          icon: "success",
          showClass: {
            icon: ''
          },
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location = '/users';
        })
      } else {
        Swal.fire({
          title: "Please fill in all fields correctly!",
          text: "Please try again.",
          icon: "warning",
          showClass: {
            icon: ''
          }
        });
      }
    })
  };

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <UserCreateContainer>
      <UserCreateH1>
        Add User
      </UserCreateH1>
      <UserCreateForm onSubmit={onSubmit}>
        <UserCreateDiv>
          Name:
          <TextField
            name="name"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.name}
            onChange={onChange}
          />
          {errors.name && <UserCreateError>{errors.name}</UserCreateError>}
        </UserCreateDiv>
        <UserCreateDiv>
          Email:
          <TextField
            name="email"
            type="email"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.email}
            onChange={onChange}
          />
          {errors.email && <UserCreateError>{errors.email}</UserCreateError>}
        </UserCreateDiv>
        <UserCreateDiv>
          Password:
          <TextField
            name="password"
            type="password"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.password}
            onChange={onChange}
          />
          {errors.password && <UserCreateError>{errors.password}</UserCreateError>}
        </UserCreateDiv>
        <UserCreateDiv>
          Confirm Password:
          <TextField
            name="password2"
            type="password"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.password2}
            onChange={onChange}
          />
          {errors.password2 && <UserCreateError>{errors.password2}</UserCreateError>}
        </UserCreateDiv>
        <Button type="submit" variant="contained" color="primary">Create</Button>
      </UserCreateForm>
    </UserCreateContainer>
  )
}

export default UserCreate;