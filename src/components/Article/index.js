import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import { ArticleContainer, ArticleH1 } from './ArticleElements';
import Footer from '../../components/Footer';

import { FilterContainer, SelectDiv, GroupHeader, GroupItems, MapElement, SearchContainer, ColSearchContainer} from './ArticleElements';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Map from '../Map';
import MapInfo from '../MapInfo';
import MapFilter from '../MapFilter';
import natural from 'natural';

// article component
const Article = () => {

  // useEffect
  useEffect(() => {
    document.title = 'Home';
  }, []);

  // useState hooks
  const [values, setValues] = useState({
    prgm_type: 'All Program Types',
    group_name: 'All Groups'
  })

  const [searchValues, setSearchValues] = useState({
    value: ' --All Program Types & Group--',
    type: 'All',
  })

  const [sites, setSites] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [serviceStreamList, setServiceStreamList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [filteredSites, setFilteredSites] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [site, setSite] = useState(null);

  const [advancefilteredSites, setAdvanceFilteredSites] = useState([]);
  const [advanceFilteredPrograms, setAdvanceFilteredPrograms] = useState([]);

  const [searchOptions, setSearchOptions] = useState([]);
  const [searchFilteredOptions, setSearchFilteredOptions] = useState([]);

  const mapRef = useRef();

  // styles
  const textFieldStyle = { minWidth: "400px"};
  const buttonFieldStyle = {minWidth: '150px'};

  const searchTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '0.5px solid grey',
        borderRadius: '5px',
      },
      '&.Mui-focused fieldset': {
        borderColor: "#A20066", // Change the outline color on focus to black
      },
    },
  };

  

  const getAllData = async () => {

    try {
      const [programTypes, groups, programs, sites, serviceStreams, serviceTypes, divisions] = await Promise.all ([
        getProgramTypes(),
        getGroups(),
        getPrograms(),
        getSites(),
        getServiceStreams(),
        getServiceTypes(),
        getDivisions(),
      ]);

      setProgramTypeList(programTypes);
      setGroupList(groups);
      setProgramList(programs);
      setFilteredPrograms(programs);

      const distinctSites = sites.filter((site, index, self) => {
        return index === self.findIndex((obj) => obj.site_id === site.site_id);
      });

      setSites(distinctSites);
      setFilteredSites(distinctSites);
      setAdvanceFilteredSites(distinctSites);

      setServiceStreamList(serviceStreams);
      setServiceTypeList(serviceTypes);
      setDivisionList(divisions);

      const programTypesOptions = programTypes.map((programType, index) => ({
        value: programType.prgm_type,
        type: 'Program Types'
      }));
    
      const groupsOptions = groups.map((group, index) => ({
        value: group.group_name,
        type: 'Group'
      }));

      const filteredOptions = [];
    
      filteredOptions.push(...programTypesOptions, ...groupsOptions);
      filteredOptions.unshift({ value: ' --All Program Types & Group--',type: 'All'});

      setSearchOptions(filteredOptions);
      setSearchValues({value: ' --All Program Types & Group--', type: 'All'});

      setIsLoading(false);


    } catch (error) {

      console.log(error);
    }
    

  }

  useEffect(() => {

    getAllData();

  }, [])

  useEffect(() => {
    setAdvanceFilteredPrograms([]);
  }, [filteredSites])

  // useEffect(() => {

  //   if(programTypeList.length > 0 && searchOptions.length <= 0)
  //   {
  //     const programTypeOptions = programTypeList.map((programType) => {
  //       return {
  //         value: programType.prgm_type,
  //         type: 'Program Types'
  //       }
  //     })
  //     programTypeOptions.unshift({ value: ' --All Program Types & Group--',type: 'All'});
  //     setSearchOptions(programTypeOptions);
  //   }

  // }, [programTypeList])
  
  // =============================Data Collect Method From Database====================================

  /* get a list of sites from the backend and display it */
  const getSites = async () => {
    const BASE_URL = "http://localhost:8888";

    const result = await axios.get(BASE_URL+ '/site');
    return result.data;
  }

  /* get list of programs from the backend and display them */
  const getPrograms = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/program');
    return result.data[0];
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'http://localhost:8888';

    let result = await axios.get(BASE_URL + '/programtype');
    result = result.data[0];
    result.sort ((a, b) => a.prgm_type.localeCompare(b.prgm_type));
    return result;
  }

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'http://localhost:8888';

    let result =  await axios.get(BASE_URL + '/group');
    result = result.data[0];
    result.sort ((a, b) => a.group_name.localeCompare(b.group_name));
    return result;
  }

  const getServiceStreams = async() => {
    const BASE_URL = 'http://localhost:8888';

    let result = await axios.get(BASE_URL + '/servicestream');
    result = result.data;
    result.sort((a, b) => a.ser_stream.localeCompare(b.ser_stream));
    return result;
  }

  const getDivisions = async() => {
      const BASE_URL = 'http://localhost:8888';

      let result = await axios.get(BASE_URL + '/division');
      result = result.data;
      result.sort((a, b) => a.division_name.localeCompare(b.division_name));
      return result;

  }

  const getServiceTypes = async() => {
      const BASE_URL = 'http://localhost:8888';

      let result = await axios.get(BASE_URL + '/servicetype');
      result = result.data[0];
      return result;
  }

  //============================Data Collect Method in App====================================

  const getSitesWithProgramType = (matchedProgramTypes) => {

    // get the program type id from the match result 
    const programTypeIds = []
    for (let i=0; i < matchedProgramTypes.length; i++) {
      programTypeIds.push(matchedProgramTypes[i].prgm_type_id)
    }

    // get the full detail program from the program list 
    const filteredProgramList = programList.filter((program) => {
      return programTypeIds.includes(program.prgm_type_id);
    });

    setFilteredPrograms(filteredProgramList);

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
    
    // //delete duplicates
    // result = result.filter((site, index, self) => {
    //   return index === self.findIndex((obj) => obj.site_id === site.site_id);
    // });

    return result;

  };

  const getSitesWithGroup = (matchedGroups) => {

    const groupIds = []
    for (let i=0; i < matchedGroups.length; i++) {
      groupIds.push(matchedGroups[i].group_id)
    }

    const filteredProgramList = programList.filter((program) => {
      return groupIds.includes(program.group_id);
    });

    setFilteredPrograms(filteredProgramList);

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

    return result;
  };


  // handle the change for the search
  const onChangeSearch = (event, value) => {

    if(value)
    {
      setSearchValues({value: value, type: ''});

      if(typeof value === 'string') {

        const filteringValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
        const filteredPattern = new RegExp(filteringValue.trim(), 'i');

        // upper table
        const filteringServiceStreams = serviceStreamList.filter(serviceStream => filteredPattern.test(serviceStream.ser_stream));
        const serviceStreamIds = filteringServiceStreams.map(serviceStream => serviceStream.ser_stream_id);

        const filteringServiceTypes = serviceTypeList.filter(serviceType => filteredPattern.test(serviceType.ser_stream) || serviceStreamIds.includes(serviceType.ser_stream_id));
        const serviceTypeIds = filteringServiceTypes.map(serviceType => serviceType.ser_type_id);

        const filteringProgramTypes = programTypeList.filter(programType => filteredPattern.test(programType.prgm_type || serviceTypeIds.includes(programType.ser_type_id)));
        const programTypeIds = filteringProgramTypes.map(programType => programType.prgm_type_id);

        //lower table
        const filteringDivisions = divisionList.filter(division => filteredPattern.test(division.division_name));
        const divisionIds = filteringDivisions.map(division => division.division_id);

        const filteringGroups = groupList.filter(group => filteredPattern.test(group.group_name) || divisionIds.includes(group.division_id));
        const groupsIds = filteringGroups.map(group => group.group_id);

        // Program Filtering
        const filteringPrograms = programList.filter(program => 
          filteredPattern.test(program.program_nme) ||
          (program.service_desc && filteredPattern.test(program.service_desc)) ||
          programTypeIds.includes(program.prgm_type_id) ||
          groupsIds.includes(program.group_id)
        );

        const siteIds = filteringPrograms.map(program => program.site_id);

        const filteringSites = sites.filter(site => siteIds.includes(site.site_id));

        setFilteredPrograms(filteringPrograms);
        setFilteredSites(filteringSites);
        setAdvanceFilteredSites(filteringSites);
      }
      else if (typeof value === 'object') 
      {

        setSearchValues(value);

        if(value.type === 'All')
        {
          setFilteredPrograms(programList);
          setFilteredSites(sites);
          setAdvanceFilteredSites(sites);
        }

        if (value.type === 'Group') {

          const groups = groupList.filter((group) => {
            return group.group_name === value.value;
          });
          
          const filteredSites = getSitesWithGroup(groups);
          setFilteredSites(filteredSites);
          setAdvanceFilteredSites(filteredSites);
        }
    
        if (value.type === 'Program Types') {
    
          const programTypes = programTypeList.filter((programType) => {
            return programType.prgm_type === value.value;
          }); // return program types in the program type list that match with the selected value
      

          const filteredSites = getSitesWithProgramType(programTypes);
          setFilteredSites(filteredSites);
          setAdvanceFilteredSites(filteredSites);
        }
        
      }

    }
 
  }

  const searchFilterOptions = (options, state) => {

    const value = state.inputValue;
    const filteringValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const splitValue = filteringValue.trim().split(/\s+/);

    const stopwords = new Set(natural.stopwords);

    const filteredWords = splitValue.filter((word) => !stopwords.has(word));
    const filteredValue = filteredWords.join(' ');

    const filteredPattern = new RegExp(filteredValue, 'i');

    const filteredProgram = programList.filter((program) => {
      const programDesc = program.service_desc;
      if(programDesc)
      {
        return filteredPattern.test(program.service_desc);
      }
      return false;
    });

    const programTypeIds = [];
    const groupIds = [];

    for(let i = 0; i < filteredProgram.length; i++) {
      programTypeIds.push(filteredProgram[i].prgm_type_id);
      groupIds.push(filteredProgram[i].group_id);
    }

    const filteredProgramType = programTypeList.map((type) => {
      if(programTypeIds.includes(type.prgm_type_id)) { 
        return type.prgm_type;
      }
    });

    const filteredGroups = groupList.map((group) => {
      if(groupIds.includes(group.group_id)) {
        return group.group_name;
      }
    });

    const availableOptions = options.filter((option) => (filteredProgramType.includes(option.value) || filteredGroups.includes(option.value)));
    const filterTypeGroup = options.filter((option) => filteredPattern.test(option.value));

    const filteredOptions = options.filter((option) => availableOptions.includes(option) || filterTypeGroup.includes(option));


    return filteredOptions;

  }

  // reset the filters
  // const clear = () => {
  //   setFilteredSites(sites);
  //   setValues({
  //     prgm_type: '',
  //     group_name: ''
  //   });
  // }

  const FreeTextSearch = () => {
    return (
      <ColSearchContainer>
        <InputLabel>
            Search
        </InputLabel>
        <SearchContainer>
          <SelectDiv>
            <Autocomplete
              disablePortal
              id="search-test"
              options={searchOptions}
              groupBy={(option) => option.type}
              getOptionLabel={(option)=> (option.value)? option.value : ''} // Use the label property as the option label
              isOptionEqualToValue={(option) => option.value === searchValues.value}
              filterOptions={searchFilterOptions}
              onChange={onChangeSearch}
              value={searchValues}
              style={textFieldStyle}
              popupIcon={<SearchIcon />}
              sx={{"& .MuiAutocomplete-popupIndicator": { transform: "none", pointerEvents: "none"}}}
              size='small'
              selectOnFocus
              clearOnBlur
              freeSolo
              forcePopupIcon 
              renderInput={(params) => <TextField {...params}  sx={searchTextFieldStyle}/>}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
            />
          </SelectDiv>
        </SearchContainer>
      </ColSearchContainer>
    );
  }

  //===================== Export Function ===========================================
  const selectedSite = (site) => {
    setSite(site);
  }

  const applyFilter = (advanceFilteredSites) => {
    setAdvanceFilteredSites(advanceFilteredSites);
  }

  const sendAdvanceFilteredPrograms = (programs) => {
    setAdvanceFilteredPrograms(programs);
  }


  
  return (
    <ArticleContainer>
      <ArticleH1>Find a Uniting service near you</ArticleH1>
        <FilterContainer>
          <FreeTextSearch />
        </FilterContainer>
        <MapElement>
          <MapFilter 
            filteredPrograms={filteredPrograms} 
            filteredSites={filteredSites}
            programTypeList={programTypeList}
            groupList={groupList}
            exportAdvanceFilteredSites={applyFilter}
            importRef={mapRef}
            exportSite={selectedSite}
            exportAdvanceFilteredPrograms = {sendAdvanceFilteredPrograms}
          />
          <Map 
            sites={advancefilteredSites} exportSite={selectedSite} exportRef={mapRef} importSite={site}
          />
          <MapInfo site={site} advanceFilteredPrograms = {(advanceFilteredPrograms.length > 0) ? advanceFilteredPrograms : filteredPrograms }/>
        </MapElement>
      <Footer />
    </ArticleContainer>
  )
}

export default Article