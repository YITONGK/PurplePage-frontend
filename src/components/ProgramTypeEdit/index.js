import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramTypeEditContainer, ProgramTypeEditH1, ProgramTypeEditForm, ProgramTypeEditDiv } from './ProgramTypeEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ProgramTypeEdit = (props) => {
  // initial values
  const initialValues = {
    prgm_type_id: '',
    prgm_type: '',
    ser_type: '',
    pgm_type_status: ''
  }

  // useState hooks
  const [values, setValues] = useState(initialValues);
  const [serviceTypeList, setServiceTypeList] = useState([]);

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    getProgramType();
    getServiceTypes();
  }, []);

  /* get a program type from the backend based on the id and display it */
  const getProgramType = async () => {
    const BASE_URL = "https://pueplepagebackend.azurewebsites.net";
    await axios.get(BASE_URL + '/programtype/' + id).then(res => {
      const data = res.data[0];
      const ser_type = res.data[1];
      setValues({
        prgm_type_id: data.prgm_type_id,
        prgm_type: data.prgm_type,
        ser_type: ser_type,
        pgm_type_status: data.pgm_type_status
      });
    })
  }

  /* get list of service types from the backend and display them */
  const getServiceTypes = async () => {
    const BASE_URL = 'https://pueplepagebackend.azurewebsites.net';
    await axios.get(BASE_URL + '/servicetype').then(res => {
      const list = res.data[0];
      setServiceTypeList(list);
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
    const BASE_URL = 'https://pueplepagebackend.azurewebsites.net';
    const url = BASE_URL + '/programtype/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Program type has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/programtype/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/programtype/' + id;
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
    <ProgramTypeEditContainer>
      <ProgramTypeEditH1>Edit Program Type</ProgramTypeEditH1>
      <ProgramTypeEditForm onSubmit={onSubmit}>
        <ProgramTypeEditDiv>
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
        </ProgramTypeEditDiv>
        <ProgramTypeEditDiv>
          Service type:
          <ServiceTypeSelect />
        </ProgramTypeEditDiv>
        <ProgramTypeEditDiv>
          Status:
          <Select
            name='pgm_type_status'
            size='small'
            style={textFieldStyle}
            value={values.pgm_type_status}
            onChange={onChange}
            required
          >
            <MenuItem value={'active'}>active</MenuItem>
            <MenuItem value={'inactive'}>inactive</MenuItem>
          </Select>
        </ProgramTypeEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </ProgramTypeEditForm>
    </ProgramTypeEditContainer>
  )
}

export default ProgramTypeEdit;