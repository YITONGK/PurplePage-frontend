import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserEditContainer, UserEditH1, UserEditForm, UserEditDiv } from './UserEditElements';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const UserEdit = () => {
  // initial values
  const initialValues = {
    id: '',
    name: '',
    email: ''
  }

  // useState hooks
  const [user, setUser] = useState({});
  const [values, setValues] = useState(initialValues);

  // get id from param
  const { id } = useParams();

  // useEffect
  useEffect(() => {
    getUser();
  }, []);

  /* get a user from the backend based on the id and display it */
  const getUser = async () => {
    const BASE_URL = "https://purplepagesbackend.vt.uniting.org";
    await axios.get(BASE_URL + '/users/' + id, {
      headers : {
        'authorization': `Bearer ${Cookies.get('accessToken')}`
      }
    }).then(res => {
      const data = res.data;
      setUser(data);
      setValues({
        id: data.id,
        name: data.name,
        email: data.email
      })
    })
  }

  /* Handle any changes to the input text fields
   *
   * @param e Event
   */
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  /* Handle saving the changes to text field and sending it to the Backend
   *
   * @param e Event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
    const url = BASE_URL + '/users/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'User has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/users/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/users/' + id;
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <UserEditContainer>
      <UserEditH1>User {user.id}</UserEditH1>
      <UserEditForm onSubmit={onSubmit}>
        <UserEditDiv>
          Name:
          <TextField
            name="name"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.name}
            onChange={onChange}
            required
          />
        </UserEditDiv>
        <UserEditDiv>
          Email:
          <TextField
            name="email"
            type="email"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.email}
            onChange={onChange}
            required
          />
        </UserEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </UserEditForm>
    </UserEditContainer>
  )
}

export default UserEdit