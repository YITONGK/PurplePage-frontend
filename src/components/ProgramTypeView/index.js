import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramTypeViewContainer, ProgramTypeViewH1, ProgramTypeViewP } from './ProgramTypeViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const ProgramTypeView = () => {
  // useState hooks
  const [programType, setProgramType] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getProgramType();
  }, []);

  /* get a program type from the backend based on the id and display it */
  const getProgramType = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/programtype/' + id).then(res => {
      const data = res.data[0];
      data['ser_type'] = res.data[1];
      setProgramType(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/programtype/' + id + '/edit';
  }

  /* delete the program type */
  const deleteProgramType = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this program type?",
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
        await axios.delete(BASE_URL + "/programtype/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Program type has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/programtype';
          }, 1500);
        })
      }
    })
  }

  return (
    <ProgramTypeViewContainer>
      <ProgramTypeViewH1>{programType.prgm_type}</ProgramTypeViewH1>
      <ProgramTypeViewP>Service type: {programType.ser_type}</ProgramTypeViewP>
      <ProgramTypeViewP>Status: {programType.pgm_type_status}</ProgramTypeViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteProgramType}>Delete</Button>
    </ProgramTypeViewContainer>
  )
}

export default ProgramTypeView;