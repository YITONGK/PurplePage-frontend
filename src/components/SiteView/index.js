import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SiteViewContainer, SiteViewH1, SiteViewP } from './SiteViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

const SiteView = () => {
  // useState hooks
  const [site, setSite] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getSite();
  }, []);

  /* get a site from the backend based on the id and display it */
  const getSite = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/site/' + id).then(res => {
      const data = res.data;
      setSite(data);
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/site/' + id + '/edit';
  }

  /* delete the site */
  const deleteSite = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this site?",
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
        await axios.delete(BASE_URL + "/site/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Site has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/site';
          }, 1500);
        })
      }
    })
  }

  return (
    <SiteViewContainer>
      <SiteViewH1>{site.site_id}</SiteViewH1>
      <SiteViewP>Latitude: {site.lat}</SiteViewP>
      <SiteViewP>Langitude: {site.lng}</SiteViewP>
      <SiteViewP>Address: {site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</SiteViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteSite}>Delete</Button>
    </SiteViewContainer>
  )
}

export default SiteView;