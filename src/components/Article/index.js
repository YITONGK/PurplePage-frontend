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

  //search type
  const searchTypesEnum = {
    ProgramType: 'PT',
    Group: 'G',
    ProgramDescription: 'PD',

  }

  // useState hooks
  const [values, setValues] = useState({
    prgm_type: 'All Program Types',
    group_name: 'All Groups'
  })

  const [searchValues, setSearchValues] = useState({
    value: ' --All Program Types & Group--',
    type: 'All',
  })

  const [searchTypeValue, setSearchTypeValue] = useState(searchTypesEnum.ProgramType);


  const [sites, setSites] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredSites, setFilteredSites] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [site, setSite] = useState(null);

  const [advancefilteredSites, setAdvanceFilteredSites] = useState([]);
  const [advanceFilteredPrograms, setAdvanceFilteredPrograms] = useState([]);

  const [searchOptions, setSearchOptions] = useState([]);

  const mapRef = useRef();

  // styles
  const textFieldStyle = { minWidth: "400px"};
  const buttonFieldStyle = {minWidth: '150px'};
  const buttonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", marginTop: "1.5rem", display: "inline-flex"};

  const searchTextFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
        borderLeft: '0.5px solid',
        borderRadius: '0',
      },
      '&.Mui-focused fieldset': {
        borderColor: "#A20066", // Change the outline color on focus to black
      },
    },
  };

  

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
      setFilteredPrograms(programs);

      const distinctSites = sites.filter((site, index, self) => {
        return index === self.findIndex((obj) => obj.site_id === site.site_id);
      });

      setSites(distinctSites);
      setFilteredSites(distinctSites);

      setIsLoading(false);


    } catch (error) {

      console.log(error);
    }
    

  }

  useEffect(() => {

    getAllData();

  }, [])

  useEffect(() => {
    setAdvanceFilteredSites([]);
    setAdvanceFilteredPrograms([]);
  }, [filteredSites])

  useEffect(() => {

    if(programTypeList.length > 0 && searchOptions.length <= 0)
    {
      const programTypeOptions = programTypeList.map((programType) => {
        return {
          value: programType.prgm_type,
          type: 'Program Types'
        }
      })
      programTypeOptions.unshift({ value: ' --All Program Types & Group--',type: 'All'});
      setSearchOptions(programTypeOptions);
    }

  }, [programTypeList])

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

  //================================================================

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

  //================================================================

  // handle the change for program type dropdown
  const onChangeProgramType = (e) => {

    if(e.target.value === 'All Program Types') {
      setFilteredSites(sites); 
      setFilteredPrograms(programList); 
      setValues({
        prgm_type: 'All Program Types',
        group_name: ''
      });
      setSearchValues ({value: '', type: ''});
      return;
    }

    const programTypes = programTypeList.filter((programType) => {
      return programType.prgm_type === e.target.value;
    }); // return program types in the program type list that match with the selected value

    setFilteredSites(getSitesWithProgramType(programTypes));

    setValues({
      prgm_type: e.target.value,
      group_name: ''
    });
    setSearchValues ({value: '', type: ''});
  }

  // handle the change for group dropdown
  const onChangeGroup = (e) => {

    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

    if(e.target.value === 'All Groups') {
      setFilteredSites(sites); 
      setFilteredPrograms(programList);
      setValues({
        prgm_type: '',
        group_name: 'All Groups'
      }) 
      setSearchValues ({value: '', type: ''});
      return;
    }

    const groups = groupList.filter((group) => {
      return group.group_name === e.target.value;
    });

    setFilteredSites(getSitesWithGroup(groups));

    setValues({
      prgm_type: '',
      group_name: e.target.value
    });
    setSearchValues ({value: '', type: ''});
  }

  const onChangeSearchType = (e) => {

    setSearchTypeValue(e.target.value);
    const value = e.target.value;
    let filteredOptions = [];

    if(value === searchTypesEnum.ProgramType) {
      filteredOptions = programTypeList.map((programType, index) => {
        return {
          value: programType.prgm_type,
          type: 'Program Types'
        }
      })
    }

    if(value === searchTypesEnum.Group) {
      filteredOptions = groupList.map((group, index) => {
        return {
          value: group.group_name,
          type: 'Group'
        }
      })


    }

    if(value === searchTypesEnum.ProgramDescription) {

      const programTypesOptions = programTypeList.map((programType, index) => ({
        value: programType.prgm_type,
        type: 'Program Types'
      }));
    
      const groupsOptions = groupList.map((group, index) => ({
        value: group.group_name,
        type: 'Group'
      }));
    
      filteredOptions.push(...programTypesOptions, ...groupsOptions);

    }

    filteredOptions.unshift({ value: ' --All Program Types & Group--',type: 'All'});

    setSearchOptions(filteredOptions);

    //reset All
    setSearchValues({value: ' --All Program Types & Group--', type: 'All'});
    setFilteredPrograms(programList);
    setFilteredSites(sites);

  };

  // handle the change for the search
  const onChangeSearch = (event, value) => {

    if(value)
    {
      if(value.type === 'All')
      {
        setFilteredPrograms(programList);
        setFilteredSites(sites);
        setSearchValues(value);
      }

      if (value.type === 'Group') {

        const groups = groupList.filter((group) => {
          return group.group_name === value.value;
        });
  
        setFilteredSites(getSitesWithGroup(groups));
        setSearchValues(value);
      }
  
      if (value.type === 'Program Types') {
  
        const programTypes = programTypeList.filter((programType) => {
          return programType.prgm_type === value.value;
        }); // return program types in the program type list that match with the selected value
    
        setFilteredSites(getSitesWithProgramType(programTypes));
        setSearchValues(value);
      }

      setValues({
        prgm_type: '',
        group_name: ''
      });

    }
 
  }

  const searchFilterOptions = (options, state) => {

    const value = state.inputValue;
    const filteringValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(filteringValue, 'i'); // pattern to search more accurately
    const filterTypeGroup = options.filter((option) => pattern.test(option.value));

    if(searchTypeValue === searchTypesEnum.ProgramType || searchTypeValue === searchTypesEnum.Group)
    {
      return filterTypeGroup;
    }
    
    if(searchTypeValue === searchTypesEnum.ProgramDescription)
    {

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
        return;
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

      return availableOptions;

    }

  }

  // reset the filters
  const clear = () => {
    setFilteredSites(sites);
    setValues({
      prgm_type: '',
      group_name: ''
    });
  }


  const SearchTypes = () => {
    return (
      <SelectDiv>
        <Select
            name='searchType'
            size='small'
            sx={{"& fieldset": { border: 'none' }}}
            style={buttonFieldStyle}
            onChange={onChangeSearchType}
            value={searchTypeValue}
            required
          >
            <MenuItem key={0} value={searchTypesEnum.ProgramType}> ProgramType </MenuItem>
            <MenuItem key={1} value={searchTypesEnum.Group}>Group</MenuItem>
            <MenuItem key={2} value={searchTypesEnum.ProgramDescription}> ProgramDesc </MenuItem>
            
          </Select>
      </SelectDiv>
    )
  };

  // const renderOption = (props, option) => (
  //   <div key={option.key} {...props}>
  //     <span style={{ marginRight: '10px' }}>{option.value}</span>
  //     <span style={{ color: 'gray' }}>{option.type}</span>
  //   </div>
  // );

  const FreeTextSearch = () => {
    return (
      <ColSearchContainer>
        <InputLabel>
            Search
        </InputLabel>
        <SearchContainer>
          <SearchTypes></SearchTypes>
          <SelectDiv>
            <Autocomplete
              disablePortal
              id="search-test"
              options={searchOptions}
              groupBy={(option) => option.type}
              getOptionLabel={(option)=> option.value} // Use the label property as the option label
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
          defaultValue='All Program Types'
          onChange={onChangeProgramType}
          required
        >
          <MenuItem key={-1} value={'All Program Types'}> --All Programs Type-- </MenuItem>
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
          defaultValue='All Groups'
          onChange={onChangeGroup}
          required
        >
          <MenuItem key={-1} value={'All Groups'}> --All Group-- </MenuItem>
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
            sites={(advancefilteredSites.length > 0)? advancefilteredSites : filteredSites} exportSite={selectedSite} exportRef={mapRef} importSite={site}
          />
          <MapInfo site={site} advanceFilteredPrograms = {(advanceFilteredPrograms.length > 0) ? advanceFilteredPrograms : filteredPrograms }/>
        </MapElement>
      <Footer />
    </ArticleContainer>
  )
}

export default Article