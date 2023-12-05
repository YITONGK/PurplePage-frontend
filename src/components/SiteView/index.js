import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SiteViewContainer, SiteViewH1, SiteViewP, SiteViewMapAndInfoContainer, SiteViewInfoContainer, SiteViewMapContainer, SiteViewIconContainer, SiteViewInfoDetailColumn, SiteViewInfoDetailContainer, SiteViewInfoDetailRow, SiteViewH2, SiteViewP2, SperateLine} from './SiteViewElements';
import Map from '../Map';

import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';

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

  const stringFilterPrefix = (string) => {

    if(!string) return 'None';

    // Extract the local part of the email (before '@')
    const localPart = string.split('@')[0];

    // Replace all '.' with spaces in the local part
    const result = localPart.replace(/\./g, ' ');

    return result.trim(); // trim() to remove any leading/trailing spaces
  }

  return (
    <SiteViewContainer>
      <SiteViewMapAndInfoContainer>
        <SiteViewInfoContainer>
          <SiteViewH1>{site.site_id}</SiteViewH1>
          <SiteViewInfoDetailContainer style={{ width:'45rem', backgroundColor: '#f5f5f5', marginRight: '-10px', justifyContent: '20px'}}>
          
            <SiteViewInfoDetailRow style={{maxWidth: '50%'}}>

              <SiteViewIconContainer>
                <PersonIcon style={{fontSize: '55px'}}></PersonIcon>
              </SiteViewIconContainer>

              <SiteViewInfoDetailColumn>
                <SiteViewP><strong>Site Manager:</strong></SiteViewP>
                <SiteViewP>{stringFilterPrefix(site.site_contact_name)}</SiteViewP>
              </SiteViewInfoDetailColumn>

            </SiteViewInfoDetailRow>

            <SiteViewInfoDetailRow style={{maxWidth:'50%'}}>

              <SiteViewIconContainer>
                <CallIcon style={{fontSize: '55px'}}></CallIcon>
              </SiteViewIconContainer>

              <SiteViewInfoDetailColumn>
                <SiteViewP><strong>Contact Number:</strong></SiteViewP>
                <SiteViewP>
                  {
                    <SiteViewP>{stringFilterPrefix(site.site_contact_nbr)}</SiteViewP>
                  }
                </SiteViewP>
              </SiteViewInfoDetailColumn>

            </SiteViewInfoDetailRow>

          </SiteViewInfoDetailContainer>
          
          <SiteViewH2>National Address:</SiteViewH2>

          <SiteViewInfoDetailContainer>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>STREET NUMBER</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.street_nbr)}</SiteViewP>
            </SiteViewInfoDetailColumn>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>STREET NAME</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.street_name)}</SiteViewP>
            </SiteViewInfoDetailColumn>

          </SiteViewInfoDetailContainer>

          <SiteViewInfoDetailContainer>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>SUBURB</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.suburb)}</SiteViewP>
            </SiteViewInfoDetailColumn>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>STATE</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.state)}</SiteViewP>
            </SiteViewInfoDetailColumn>

          </SiteViewInfoDetailContainer>

          <SiteViewInfoDetailContainer>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>POSTCODE</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.postcode+'')}</SiteViewP>
            </SiteViewInfoDetailColumn>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>LOCAL GOVERNMENT AREA</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.lga)}</SiteViewP>
            </SiteViewInfoDetailColumn>

          </SiteViewInfoDetailContainer>

          <SiteViewInfoDetailContainer>

            <SiteViewInfoDetailColumn>
              <SiteViewP2>DEPARTMENT OF FAMILIES,FAIRNESS AND HOUSING</SiteViewP2>
              <SiteViewP>{stringFilterPrefix(site.dffh_area)}</SiteViewP>
            </SiteViewInfoDetailColumn>

          </SiteViewInfoDetailContainer>

          <SperateLine></SperateLine>

          <SiteViewH2>Full Address:</SiteViewH2>

          <SiteViewP style={{paddingLeft: '0.8rem'}}>{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</SiteViewP>
        </SiteViewInfoContainer>
        <SiteViewMapContainer>
          <Map sites={[site]} exportSite={null} exportRef={mapRef} mapWidth={60} mapHeight={80}/>
        </SiteViewMapContainer>
      </SiteViewMapAndInfoContainer>
    </SiteViewContainer>
  )
}

export default SiteView;