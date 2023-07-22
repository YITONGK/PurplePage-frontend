import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ProgramTypeCreateContainer, ProgramTypeCreateH1, ProgramTypeCreateForm, ProgramTypeCreateDiv } from "./ProgramTypeCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ProgramTypeCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    prgm_type: '',
    ser_type: '',
    pgm_type_status: ''
  });
  const [serviceTypeList, setServiceTypeList] = useState([]);

  // useEffect
  useEffect(() => {
    getServiceTypes();
  }, []);

  // handle the change for the states
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  }

  /* get list of service types from the backend and display them */
  const getServiceTypes = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/servicetype').then(res => {
      const list = res.data[0];
      setServiceTypeList(list);
    })
  }

  // handle submitting the data to the backend
  const onSubmit = async (e) => {
    e.preventDefault();
    const BASE_URL = 'http://localhost:8888';
    const url = BASE_URL + '/programtype';
    const { prgm_type, ser_type, pgm_type_status } = values;
    await axios.post(url, {prgm_type, ser_type, pgm_type_status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Program type has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/programtype';
      }, 1500);
    })
  }

  // service type dropdown
  const ServiceTypeSelect = () => {
    return (
      <Select
        name='ser_type'
        size='small'
        style={textFieldStyle}
        value={values.ser_type}
        onChange={onChange}
        required
      >
        {serviceTypeList.map((serviceType, index) => (
          <MenuItem
            key={index}
            value={serviceType.ser_type}
          >
            {serviceType.ser_type}
          </MenuItem>
        ))}
      </Select>
    )
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <ProgramTypeCreateContainer>
      <ProgramTypeCreateH1>
        Add Program Type
      </ProgramTypeCreateH1>
      <ProgramTypeCreateForm onSubmit={onSubmit}>
        <ProgramTypeCreateDiv>
          Program type:
          <TextField
            name="prgm_type"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.prgm_type}
            onChange={onChange}
            required
          />
        </ProgramTypeCreateDiv>
        <ProgramTypeCreateDiv>
          Service type:
          <ServiceTypeSelect />
        </ProgramTypeCreateDiv>
        <ProgramTypeCreateDiv>
          Status:
          <Select
            name='pgm_type_status'
            size='small'
            style={textFieldStyle}
            value={values.pgm_type_status}
            onChange={onChange}
            required
          >
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'Inactive'}>Inactive</MenuItem>
          </Select>
        </ProgramTypeCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </ProgramTypeCreateForm>
    </ProgramTypeCreateContainer>
  )
}

export default ProgramTypeCreate;