import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DivisionEditContainer, DivisionEditH1, DivisionEditForm, DivisionEditDiv } from './DivisionEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const DivisionEdit = (props) => {
  // initial values
  const initialValues = {
    division_id: '',
    division_name: '',
    gm: '',
    status: ''
  }

  // useState hooks
  const [values, setValues] = useState(initialValues);

  const { id } = useParams();

  useEffect(() => {
    getDivision();
  }, []);

  /* get a division from the backend based on the id and display it */
  const getDivision = async () => {
    const BASE_URL = "https://purplepage-uniting.azurewebsites.net";
    await axios.get(BASE_URL + '/division/' + id).then(res => {
      const data = res.data;
      setValues({
        division_id: data.division_id,
        division_name: data.division_name,
        gm: data.gm,
        status: data.status
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
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    const url = BASE_URL + '/division/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Division has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/division/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/division/' + id;
  }

  // styles
  const textFieldStyle = { minWidth: "200px", marginLeft: "1%" };

  return (
    <DivisionEditContainer>
      <DivisionEditH1>Edit Division</DivisionEditH1>
      <DivisionEditForm onSubmit={onSubmit}>
      <DivisionEditDiv>
          Name:
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
        </DivisionEditDiv>
        <DivisionEditDiv>
          General Manager:
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
        </DivisionEditDiv>
        <DivisionEditDiv>
          Status:
          <Select
            name='status'
            size='small'
            style={textFieldStyle}
            value={values.status}
            onChange={onChange}
            required
          >
            <MenuItem value={'active'}>Active</MenuItem>
            <MenuItem value={'inactive'}>Inactive</MenuItem>
          </Select>
        </DivisionEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </DivisionEditForm>
    </DivisionEditContainer>
  )
}

export default DivisionEdit;