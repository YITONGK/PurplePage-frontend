import axios from 'axios';
import React, { useState, useEffect } from 'react';
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

const Map = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useState hooks
  const [values, setValues] = useState({
    prgm_type: '',
    group_name: ''
  })
  const [sites, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  // useEffect
  useEffect(() => {
    getSites();
    getPrograms();
    getProgramTypes();
    getGroups();
  }, []);

  // handle the change for program type dropdown
  const onChangeProgramType = (e) => {
    const programTypes = programTypeList.filter((programType) => {
      return programType.prgm_type === e.target.value;
    });

    console.log(programTypes);
    const programTypeIds = []
    for (let i=0; i < programTypes.length; i++) {
      programTypeIds.push(programTypes[i].prgm_type_id)
    }
    const filteredProgramList = programList.filter((program) => {
      return programTypeIds.includes(program.prgm_type_id);
    });
    const siteIds = [];
    for (let i=0; i < filteredProgramList.length; i++) {
      siteIds.push(filteredProgramList[i].site_id)
    };
    const result = [];
    for (let i=0; i < sites.length; i++) {
      if (siteIds.includes(sites[i].site_id)) {
        result.push(sites[i]);
      }
    }
    setFilteredSites(result);
    setValues({
      prgm_type: e.target.value,
      group_name: ''
    });
  }

  // handle the change for group dropdown
  const onChangeGroup = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    const groups = groupList.filter((group) => {
      return group.group_name === e.target.value;
    });
    const groupIds = []
    for (let i=0; i < groups.length; i++) {
      groupIds.push(groups[i].group_id)
    }
    const filteredProgramList = programList.filter((program) => {
      return groupIds.includes(program.group_id);
    });
    const siteIds = [];
    for (let i=0; i < filteredProgramList.length; i++) {
      siteIds.push(filteredProgramList[i].site_id)
    };
    const result = [];
    for (let i=0; i < sites.length; i++) {
      if (siteIds.includes(sites[i].site_id)) {
        result.push(sites[i]);
      }
    }
    setFilteredSites(result);
    setValues({
      prgm_type: '',
      group_name: e.target.value
    });
  }

  // reset the filters
  const clear = () => {
    setFilteredSites(sites);
    setValues({
      prgm_type: '',
      group_name: ''
    });
  }

  /* get a list of sites from the backend and display it */
  const getSites = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/site').then((res) => {
      const data = res.data;
      setSites(data);
      setFilteredSites(data);
      setIsLoading(false);
    });
  }

  /* get list of programs from the backend and display them */
  const getPrograms = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/program').then(res => {
      const list = res.data[0];
      setProgramList(list);
    })
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/programtype').then(res => {
      const list = res.data[0];
      console.log(list);
      setProgramTypeList(list);
    })
  }

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/group').then(res => {
      const list = res.data[0];
      setGroupList(list);
    })
  }

  /* Option Available for the search */
  const groupedOptions = [
    {
      options: programTypeList.map((program) => ({
        value: program.prgm_type,
        type: 'Program Types'
      })),
    }, 

    {
      options: groupList.map((group) => ({
        value: group.group_name,
        type: 'Group'
      })),
    }

  ]

  const allOptions = groupedOptions.flatMap((group) => group.options);

  const FreeTextSearch = () => {
    return (
      <SelectDiv>
        <InputLabel>Search</InputLabel>
        <Autocomplete
          disablePortal
          id="search-test"
          options={allOptions}
          groupBy={(option) => option.type}
          getOptionLabel={(option)=> option.value} // Use the label property as the option label
          style={textFieldStyle}
          renderInput={(params) => <TextField {...params} />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />
      </SelectDiv>
    );
  }

  // program type dropdown
  const ProgramTypeSelect = () => {
    return (
      <SelectDiv>
        <InputLabel>Program Type</InputLabel>
        <Select
          name='prgm_type'
          size='small'
          style={textFieldStyle}
          value={values.prgm_type}
          onChange={onChangeProgramType}
          required
        >
          {programTypeList.map((programType, index) => (
            <MenuItem
              key={index}
              value={programType.prgm_type}
            >
              {programType.prgm_type}
            </MenuItem>
          ))}
        </Select>
      </SelectDiv>
    )
  }

  // group dropdown
  const GroupSelect = () => {
    return (
      <SelectDiv>
        <InputLabel>Group</InputLabel>
        <Select
          name='group_name'
          size='small'
          style={textFieldStyle}
          value={values.group_name}
          onChange={onChangeGroup}
          required
        >
          {groupList.map((group, index) => (
            <MenuItem
              key={index}
              value={group.group_name}
            >
              {group.group_name}
            </MenuItem>
          ))}
        </Select>
      </SelectDiv>
    )
  }

  // close popup
  const closePopup = () => {
    setSelectedMarker(null);
  }

  // display all the markers based on lat and lng of each site
  const Markers = () => {
    return (
      <>
        {filteredSites.map((site, index) => (
          <Marker
            key={index}
            latitude={site.lat}
            longitude={site.lng}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(site);
              }}
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
      <FilterContainer>
        <FreeTextSearch />
        <ProgramTypeSelect />
        <GroupSelect />
        <Button variant="Contained" style={buttonStyle} onClick={clear}>Clear</Button>
      </FilterContainer>
      <MapElement>
        {isLoading &&
          <>
            <MapP>Loading...</MapP>
          </>
        }
        {!isLoading &&
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
        }
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