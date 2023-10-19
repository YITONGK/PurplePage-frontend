import axios from "axios";
import React, { useState } from 'react';
import { DivisionCreateContainer, DivisionCreateH1, DivisionCreateForm, DivisionCreateDiv } from "./DivisionCreateElements";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const DivisionCreate = () => {
  // useState hooks
  const [values, setValues] = useState({
    division_name: '',
    gm: '',
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
    const BASE_URL = 'https://api.wernmachine.art';
    const url = BASE_URL + '/division';
    const { division_name, gm, status } = values;
    await axios.post(url, {division_name, gm, status}).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Division has been successfully created!',
        icon: 'success',
        showClass: {
            icon: ''
        }
        });
        setTimeout(() => {
        window.location = '/division';
      }, 1500);
    })
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <DivisionCreateContainer>
      <DivisionCreateH1>
        Add Division
      </DivisionCreateH1>
      <DivisionCreateForm onSubmit={onSubmit}>
        <DivisionCreateDiv>
          Division name:
          <TextField
            name="division_name"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.division_name}
            onChange={onChange}
            required
          />
        </DivisionCreateDiv>
        <DivisionCreateDiv>
          General manager:
          <TextField
            name="gm"
            type="text"
            variant="outlined"
            size="small"
            style={textFieldStyle}
            value={values.gm}
            onChange={onChange}
            required
          />
        </DivisionCreateDiv>
        <DivisionCreateDiv>
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
        </DivisionCreateDiv>
        <Button type="submit" variant="contained" style={{backgroundColor: '#a20066'}}>Create</Button>
      </DivisionCreateForm>
    </DivisionCreateContainer>
  )
}

export default DivisionCreate;