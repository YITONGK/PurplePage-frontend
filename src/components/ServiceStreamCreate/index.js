import axios from "axios";
import React, { useState } from 'react';
import { ServiceStreamCreateContainer, ServiceStreamCreateH1, ServiceStreamCreateForm, ServiceStreamCreateDiv } from "./ServiceStreamCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ServiceStreamCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    ser_stream: '',
    status: ''
  });

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
    const BASE_URL = 'https://pueplepagebackend.azurewebsites.net';
    const url = BASE_URL + '/servicestream';
    const { ser_stream, status } = values;
    await axios.post(url, {ser_stream, status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Service stream has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/servicestream';
      }, 1500);
    })
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <ServiceStreamCreateContainer>
      <ServiceStreamCreateH1>
        Add Service Stream
      </ServiceStreamCreateH1>
      <ServiceStreamCreateForm onSubmit={onSubmit}>
        <ServiceStreamCreateDiv>
          Service stream:
          <TextField
            name="ser_stream"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.ser_stream}
            onChange={onChange}
            required
          />
        </ServiceStreamCreateDiv>
        <ServiceStreamCreateDiv>
          Status:
          <Select
            name='status'
            size='small'
            style={textFieldStyle}
            value={values.status}
            onChange={onChange}
            required
          >
            <MenuItem value={'active'}>active</MenuItem>
            <MenuItem value={'inactive'}>inactive</MenuItem>
          </Select>
        </ServiceStreamCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </ServiceStreamCreateForm>
    </ServiceStreamCreateContainer>
  )
}

export default ServiceStreamCreate;