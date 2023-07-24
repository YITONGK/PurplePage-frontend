import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { FilterContainer, MapElement, MapContainer, MapP, InfoContainer, InfoH1, InfoH2, InfoP, InfoWindowContainer, InfoWindowH1, InfoWindowP, SelectDiv, GroupHeader, GroupItems  } from './MapElements';
import InfoIcon from '@mui/icons-material/Info';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import mapboxgl from 'mapbox-gl';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'pk.eyJ1IjoidmhhcnRvbm8iLCJhIjoiY2xoc2l1Z2VzMDd0dTNlcGtwbXYwaGx2cyJ9.C77GVU3YPPgscvXrTGHWfg';

const Map = ({sites}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useState hooks
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [viewPort, setViewPort] = useState({
    latitude: -37.80995133438894,
    longitude: 144.96871464972733,
    zoom: 10,
    width: '100vw',
    height: '100vh',
    transitionDuration: 200
  });

  // styles
  const textFieldStyle = { minWidth: "400px" };
  const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066" }
  const buttonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", marginTop: "1.5rem" }

  // close popup
  const closePopup = () => {
    setSelectedMarker(null);
  }

  const markersClick  = useCallback(
    (e, site) => {
      e.stopPropagation();
      setSelectedMarker(site);
    },
    []
  );

  // display all the markers based on lat and lng of each site
  const Markers = () => {
    return (
      <>
        {sites.map((site) => (
          <Marker
            key={site.site_id}
            latitude={site.lat}
            longitude={site.lng}
          >
            <button
              onClick={markersClick}
              style={{background: "none", border: "none", cursor: "pointer"}}
            >
              <img src={require('../../images/marker.png')} style= {{width: "20px", height: "auto"}} alt="Marker Icon" />
            </button>
          </Marker>
        ))}
        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.lat}
            longitude={selectedMarker.lng}
            onClose={closePopup}
          >
             <InfoWindowContainer>
                <InfoWindowH1>{selectedMarker.site_id}</InfoWindowH1>
                <InfoWindowP><strong>Address:</strong> {selectedMarker.street_nbr} {selectedMarker.street_name}, {selectedMarker.suburb}, {selectedMarker.state} {selectedMarker.postcode}</InfoWindowP>
                <InfoWindowP><strong>Latitude:</strong> {selectedMarker.lat}</InfoWindowP>
                <InfoWindowP><strong>Langitude:</strong> {selectedMarker.lng}</InfoWindowP>
              </InfoWindowContainer>
          </Popup>
        ) : null}
      </>
    )
  }

  return (
    <>
      <MapElement>
        <MapContainer>
          <ReactMapGl
            {...viewPort}
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/vhartono/clhsoimq200o901q1ffkjg8ky?optimize=true"
            onMove={(evt) => {
              setViewPort(evt.viewport);
            }}
          >
            <Markers />
          </ReactMapGl>
        </MapContainer>
        <InfoContainer>
          <Grid style={gridStyle}>
            <InfoIcon fontSize="large" /> 
            <InfoH1>Site Information</InfoH1>
          </Grid>
          {selectedMarker ? (
            <>
            <InfoH2>{selectedMarker.site_id}</InfoH2>
            {selectedMarker.site_contact_name ? (
              <InfoP><strong>Contact Name:</strong> {selectedMarker.site_contact_name.replace(".", " ")}</InfoP>
            ) : (
              <InfoP><strong>Contact Name:</strong>  -</InfoP>
            )}
            <InfoP><strong>Address:</strong> {selectedMarker.street_nbr} {selectedMarker.street_name}, {selectedMarker.suburb}, {selectedMarker.state} {selectedMarker.postcode}</InfoP>
            <InfoP><strong>Latitude:</strong> {selectedMarker.lat}</InfoP>
            <InfoP><strong>Langitude:</strong> {selectedMarker.lng}</InfoP>
            <InfoP><strong>Local Government Area:</strong> {selectedMarker.lga}</InfoP>
            <InfoP><strong>Department of Families, Fairness and Housing:</strong> {selectedMarker.dffh_area}</InfoP>
            </>
          ) : (
            <InfoH2>No selected site.</InfoH2>
          )}
        </InfoContainer>
      </MapElement>
    </>
  )
}

export default Map;