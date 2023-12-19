import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ServiceTypeCreateContainer, ServiceTypeCreateH1, ServiceTypeCreateForm, ServiceTypeCreateDiv } from "./ServiceTypeCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const ServiceTypeCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    prgm_type: '',
    ser_type: '',
    pgm_type_status: ''
  });
  const [serviceStreamList, setServiceStreamList] = useState([]);

  // useEffect
  useEffect(() => {
    getServiceStreams();
  }, []);

  // handle the change for the states
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  /* get list of service streams from the backend and display them */
  const getServiceStreams = async () => {
    const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
    await axios.get(BASE_URL + '/servicestream', {
      headers : {
        'authorization': `Bearer ${Cookies.get('accessToken')}`
      }
    }).then(res => {
      const list = res.data;
      setServiceStreamList(list);
    })
  }

  // handle submitting the data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
    const url = BASE_URL + '/servicetype';
    const { ser_type, ser_stream, status } = values;
    await axios.post(url, {ser_type, ser_stream, status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Service type has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/servicetype';
      }, 1500);
    })
  }

  // service stream dropdown
  const ServiceStreamSelect = () => {
    return (
      <Select
        name='ser_stream'
        size='small'
        style={textFieldStyle}
        value={values.ser_stream}
        onChange={onChange}
        required
      >
        {serviceStreamList.map((serviceStream, index) => (
          <MenuItem
            key={index}
            value={serviceStream.ser_stream}
          >
            {serviceStream.ser_stream}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <ServiceTypeCreateContainer>
      <ServiceTypeCreateH1>
        Add Service Type
      </ServiceTypeCreateH1>
      <ServiceTypeCreateForm onSubmit={onSubmit}>
        <ServiceTypeCreateDiv>
          Service type:
          <TextField
            name="ser_type"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.ser_type}
            onChange={onChange}
            required
          />
        </ServiceTypeCreateDiv>
        <ServiceTypeCreateDiv>
          Service stream:
          <ServiceStreamSelect />
        </ServiceTypeCreateDiv>
        <ServiceTypeCreateDiv>
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
        </ServiceTypeCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </ServiceTypeCreateForm>
    </ServiceTypeCreateContainer>
  )
}

export default ServiceTypeCreate;