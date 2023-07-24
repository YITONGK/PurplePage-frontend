import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ArticleContainer, ArticleH1 } from './ArticleElements';
import Footer from '../../components/Footer';

import { FilterContainer, MapElement, MapContainer, MapP, InfoContainer, InfoH1, InfoH2, InfoP, InfoWindowContainer, InfoWindowH1, InfoWindowP, SelectDiv, GroupHeader, GroupItems  } from './ArticleElements';
import InfoIcon from '@mui/icons-material/Info';
import { Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Map from '../Map';

// article component
const Article = () => {
  // useEffect
  useEffect(() => {
    document.title = 'Home';
  }, []);

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

  // styles
  const textFieldStyle = { minWidth: "400px" };
  const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066" }
  const buttonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", marginTop: "1.5rem" }

  const getAllData = async () => {

    try {
      const [programTypes, groups, programs, sites] = await Promise.all ([
        getProgramTypes(),
        getGroups(),
        getPrograms(),
        getSites(),
      ]);

      setProgramTypeList(programTypes);
      setGroupList(groups);
      setProgramList(programs);
      setSites(sites);
      setFilteredSites(sites);

      setIsLoading(false);


    } catch (error) {

      console.log(error);
    }
    

  }

  useEffect(() => {

    getAllData();

  }, [])

  /* get a list of sites from the backend and display it */
  const getSites = async () => {
    const BASE_URL = "http://localhost:8888";

    const result = await axios.get(BASE_URL+ '/site');
    return result.data;
    // await axios.get(BASE_URL + '/site').then((res) => {
    //   const data = res.data;
    //   return (data);
    //   // setSites(data);
    //   // setFilteredSites(data);
    //   // setIsLoading(false);
    // });
  }

  /* get list of programs from the backend and display them */
  const getPrograms = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/program');
    return result.data[0];
    // await axios.get(BASE_URL + '/program').then(res => {
    //   const list = res.data[0];
    //   return (list);
    //   // setProgramList(list);
    // })
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'http://localhost:8888';

    let result = await axios.get(BASE_URL + '/programtype');
    result = result.data[0];
    result.sort ((a, b) => a.prgm_type.localeCompare(b.prgm_type));
    return result;
    // await axios.get(BASE_URL + '/programtype').then(res => {
    //   const list = res.data[0];
    //   list.sort ((a, b) => a.prgm_type.localeCompare(b.prgm_type));
    //   return (list);
    //   // setProgramTypeList(list);
    // })
  }

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'http://localhost:8888';

    let result =  await axios.get(BASE_URL + '/group');
    result = result.data[0];
    result.sort ((a, b) => a.group_name.localeCompare(b.group_name));
    return result;
    // await axios.get(BASE_URL + '/group').then(res => {
    //   const list = res.data[0];
    //   list.sort ((a, b) => a.group_name.localeCompare(b.group_name));
    //   // setGroupList(list);
    //   return (list);
    // })
  }

   // handle the change for program type dropdown
   const onChangeProgramType = (e) => {
    const programTypes = programTypeList.filter((programType) => {
      return programType.prgm_type === e.target.value;
    }); // return program types in the program type list that match with the selected value

    // get the program type id from the match result 
    const programTypeIds = []
    for (let i=0; i < programTypes.length; i++) {
      programTypeIds.push(programTypes[i].prgm_type_id)
    }

    // get the full detail program from the program list 
    const filteredProgramList = programList.filter((program) => {
      return programTypeIds.includes(program.prgm_type_id);
    });

    // get the site ids from the filtered program list
    const siteIds = [];
    for (let i=0; i < filteredProgramList.length; i++) {
      siteIds.push(filteredProgramList[i].site_id)
    };

    // generate all site that match the results
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
          size='small'
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
  
  return (
    <ArticleContainer>
      <ArticleH1>Find a Uniting service near you</ArticleH1>
        <FilterContainer>
          <FreeTextSearch />
          <ProgramTypeSelect />
          <GroupSelect />
          <Button variant="Contained" style={buttonStyle} onClick={clear}>Clear</Button>
        </FilterContainer>
      <Map sites={filteredSites}/>
      <Footer />
    </ArticleContainer>
  )
}

export default Article