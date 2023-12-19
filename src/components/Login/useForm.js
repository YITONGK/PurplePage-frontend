import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useFormLogin = (validate) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  // submit login form
  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(values);
    setErrors(errors);

    // Don't submit the form if there are validation errors
    if (Object.keys(errors).length > 0) return;

    axios({
      method: "POST",
      data: {
        email: values.email,
        password: values.password
      },
      withCredentials:  true,
      url: 'http://purplepagesbackend.vt.uniting.org/login'
    }).then((res) => {
      console.log('Server response:', res); // print out the server response
      if (Object.keys(res.data).length !== 0) {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("email", values.email);
        Swal.fire({
          title: "You have been successfully logged in!",
          icon: "success",
          showClass: {
            icon: ''
          },
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location = '/';
        })
      } else {
        Swal.fire({
          title: "Incorrect email or password!",
          text: "Please try again.",
          icon: "warning",
          showClass: {
            icon: ''
          }
        });
      }
    }).catch((error) => {
      console.log('Request error:', error); // print out the error
    });
  }

  return { handleChange, values, onSubmit, errors };
};

export default useFormLogin;
