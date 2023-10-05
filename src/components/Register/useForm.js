import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import validateInfo from './validateInfo';

const useFormRegister = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
       ...values,
       [name]: value
    })
  };

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
      url: 'https://pueplepagebackend.azurewebsites.net/register'
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
          window.location = '/login';
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

  return { handleChange, values, onSubmit, errors };
};

export default useFormRegister;