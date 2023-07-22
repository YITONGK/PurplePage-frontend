import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceStreamViewContainer, ServiceStreamViewH1, ServiceStreamViewP } from './ServiceStreamViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ServiceStreamView = () => {
  // useState hooks
  const [serviceStream, setServiceStream] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getServiceStream();
  }, []);

  /* get a service stream from the backend based on the id and display it */
  const getServiceStream = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/servicestream/' + id).then(res => {
      const data = res.data;
      setServiceStream(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/servicestream/' + id + '/edit';
  }

  /* delete the service stream */
  const deleteServiceStream = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this service stream?",
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
        await axios.delete(BASE_URL + "/servicestream/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Service stream has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/servicestream';
          }, 1500);
        })
      }
    })
  }

  return (
    <ServiceStreamViewContainer>
      <ServiceStreamViewH1>{serviceStream.ser_stream}</ServiceStreamViewH1>
      <ServiceStreamViewP>Status: {serviceStream.status}</ServiceStreamViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteServiceStream}>Delete</Button>
    </ServiceStreamViewContainer>
  )
}

export default ServiceStreamView;