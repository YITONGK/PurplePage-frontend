import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceTypeEditContainer, ServiceTypeEditH1, ServiceTypeEditForm, ServiceTypeEditDiv } from './ServiceTypeEditElements';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ServiceTypeEdit = (props) => {
  // initial values
  const initialValues = {
    ser_type_id: '',
    ser_type: '',
    ser_stream: '',
    status: ''
  }

  // useState hooks
  const [values, setValues] = useState(initialValues);
  const [serviceStreamList, setServiceStreamList] = useState([]);

  const { id } = useParams();

  // useEffect
  useEffect(() => {
    getServiceType();
    getServiceStreams();
  }, []);

  /* get a service type from the backend based on the id and display it */
  const getServiceType = async () => {
    const BASE_URL = "https://myapi.hhzhu.art";
    await axios.get(BASE_URL + '/servicetype/' + id).then(res => {
      const data = res.data[0];
      const ser_stream = res.data[1];
      setValues({
        ser_type_id: data.ser_type_id,
        ser_type: data.ser_type,
        ser_stream: ser_stream,
        status: data.status
      });
    })
  }

  /* get list of service streams from the backend and display them */
  const getServiceStreams = async () => {
    const BASE_URL = 'https://myapi.hhzhu.art';
    await axios.get(BASE_URL + '/servicestream').then(res => {
      const list = res.data;
      setServiceStreamList(list);
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
    const BASE_URL = 'https://myapi.hhzhu.art';
    const url = BASE_URL + '/servicetype/edit';
    await axios.post(url, { ...values }).then(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Service type has been successfully updated!',
        icon: 'success',
        showClass: {
          icon: ''
        }
      });
      setTimeout(() => {
        window.location = '/servicetype/' + id;
      }, 1500);
    })
  }

  /* Handle cancelling the edit */
  const onCancel = () => {
    window.location = '/servicetype/' + id;
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
    <ServiceTypeEditContainer>
      <ServiceTypeEditH1>Edit Service Type</ServiceTypeEditH1>
      <ServiceTypeEditForm onSubmit={onSubmit}>
        <ServiceTypeEditDiv>
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
        </ServiceTypeEditDiv>
        <ServiceTypeEditDiv>
          Service stream:
          <ServiceStreamSelect />
        </ServiceTypeEditDiv>
        <ServiceTypeEditDiv>
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
        </ServiceTypeEditDiv>
        <Button type="submit" variant="contained" color="primary">Save</Button>&nbsp;
        <Button variant="contained" color="error" onClick={onCancel}>Cancel</Button>
      </ServiceTypeEditForm>
    </ServiceTypeEditContainer>
  )
}

export default ServiceTypeEdit;