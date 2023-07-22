import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceTypeViewContainer, ServiceTypeViewH1, ServiceTypeViewP } from './ServiceTypeViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ServiceTypeView = () => {
  // useState hooks
  const [serviceType, setServiceType] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getServiceType();
  }, []);

  /* get a service type from the backend based on the id and display it */
  const getServiceType = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/servicetype/' + id).then(res => {
      const data = res.data[0];
      data['ser_stream'] = res.data[1];
      setServiceType(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/servicetype/' + id + '/edit';
  }

  /* delete the service type */
  const deleteServiceType = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this service type?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        icon: ''
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(BASE_URL + "/servicetype/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Service type has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/servicetype';
          }, 1500);
        })
      }
    })
  }

  return (
    <ServiceTypeViewContainer>
      <ServiceTypeViewH1>{serviceType.ser_type}</ServiceTypeViewH1>
      <ServiceTypeViewP>Service stream: {serviceType.ser_stream}</ServiceTypeViewP>
      <ServiceTypeViewP>Status: {serviceType.status}</ServiceTypeViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteServiceType}>Delete</Button>
    </ServiceTypeViewContainer>
  )
}

export default ServiceTypeView;