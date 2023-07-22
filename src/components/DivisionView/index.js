import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DivisionViewContainer, DivisionViewH1, DivisionViewP } from './DivisionViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const DivisionView = () => {
  // useState hooks
  const [division, setDivision] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getDivision();
  }, []);

  /* get a division from the backend based on the id and display it */
  const getDivision = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/division/' + id).then(res => {
      const data = res.data;
      setDivision(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/division/' + id + '/edit';
  }

  /* delete the division */
  const deleteDivision = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this division?",
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
        await axios.delete(BASE_URL + "/division/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Division has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/division';
          }, 1500);
        })
      }
    })
  }

  return (
    <DivisionViewContainer>
      <DivisionViewH1>{division.division_name}</DivisionViewH1>
      <DivisionViewP>General Manager: {division.gm}</DivisionViewP>
      <DivisionViewP>Status: {division.status}</DivisionViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteDivision}>Delete</Button>
    </DivisionViewContainer>
  )
}

export default DivisionView;