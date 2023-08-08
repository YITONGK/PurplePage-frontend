import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SiteViewContainer, SiteViewH1, SiteViewP } from './SiteViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Map from '../Map';

const SiteView = () => {
  // useState hooks
  const [site, setSite] = useState({});

  const { id } = useParams();

  const mapRef = useRef();

  useEffect(() => {
    getSite();
  }, []);

  useEffect(() => {

    if(mapRef.current && site) {
        mapRef.current.getMap().flyTo({ center: [site.lng, site.lat], zoom: 14, essential: true });
    }

  },[mapRef.current, site]);

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
      <SiteViewP>Address: {site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</SiteViewP>
      <Map sites={[site]} exportSite={null} exportRef={mapRef}/>
    </SiteViewContainer>
  )
}

export default SiteView;