import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import { ArticleContainer, ArticleH1 } from './ArticleElements';

import { FilterContainer, SelectDiv, GroupHeader, GroupItems, MapElement, SearchContainer, ColSearchContainer, MapInfoContainer, LoadindContainer} from './ArticleElements';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Map from '../Map';
import MapInfo from '../MapInfo';
import MapFilter from '../MapFilter';
import natural from 'natural';

import ReactLoading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../App.css';

// article component
const Article = ({sites, programs, programTypes, groups, serviceStreams, serviceTypes, divisions}) => {

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
  const [searchValues, setSearchValues] = useState({
    value: '--Search Anything--',
    type: 'All',
  })

  const [siteList, setSiteList] = useState([]);
  const [programList, setProgramList] = useState([]);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [serviceStreamList, setServiceStreamList] = useState([]);
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [divisionList, setDivisionList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [addressIsLoading, setAddressIsLoading] = useState(false);
  const [mapFilterIsLoading, setMapFilterIsLoading] = useState(true);
  const [searchError, setSearchError] = useState(false);

  const [filteredSites, setFilteredSites] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [selectedSite, setSelectedSite] = useState(null);

  const [departureAddress, setDepartureAddress] = useState(null);

  const [advancefilteredSites, setAdvanceFilteredSites] = useState([]);
  const [advanceFilteredPrograms, setAdvanceFilteredPrograms] = useState([]);

  const [searchOptions, setSearchOptions] = useState([]);

  const mapRef = useRef();

  // Style
  const textFieldStyle = { minWidth: "400px"};

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


  // Declare page title
  useEffect(() => {
    document.title = 'Home';
  }, []);

  // Retrieve All data
  useEffect(() => {
    getAllData();
  // when it run second time it will not run any more it will keep the old one...
  }, [])

  // Finding Program Access Type Based On Title
  const findMatchInProgramAtAndSdm = (list, findingTitle) => {
    if (list && findingTitle) {
      const tmpValue = list.find((v) => v && v.title === findingTitle);
      return tmpValue || null;
    }
    return null;
  };

  // Finding The Match Site Access According to the title
  const findMatchInSiteAccess = (list, findingId) => {
    if (list && findingId) {

      const tmpValue = list.find((v) => v && v.site_id === findingId);

      return tmpValue || null;
    }
    return null;
  };

  // Finding General Manager in Division
  const findGmInDivision = (list, findingId) => {
    if (list && findingId) {

      let tmpValue = list.find((v) => v && v.division_id === findingId);

      if(tmpValue) {
        tmpValue = tmpValue.gm;
      }

      return tmpValue || null;
    }
    return null;
  };

  //
  const findOEInGroup = (list, findingId) => {
    if (list && findingId) {

      let tmpValue = list.find((v) => v && v.group_id === findingId);

      if(tmpValue) {
        tmpValue = tmpValue.eo;
      }

      return tmpValue || null;
    }
    return null;
  };

  const getAllData = async () => {

    setIsLoading(true);
    try {

      // const [programTypes, groups, programs, programAts, programSdms, sites, siteAccessibilities ,serviceStreams, serviceTypes, divisions] = await Promise.all ([
      //   getProgramTypes(),
      //   getGroups(),
      //   getPrograms(),
      //   getProgramAts(),
      //   getProgramSdms(),
      //   getSites(),
      //   getSiteAccessibilities(),
      //   getServiceStreams(),
      //   getServiceTypes(),
      //   getDivisions(),
      // ]);

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
      setFilteredPrograms(programs); //keeps in artical only

      // const tmpProgramList = programs.map((program) => {
      //   const programTitle = program.title;
      //
      //   let programDivisionId = groups.find((group) => group && group.group_id === program.group_id);
      //   programDivisionId = (programDivisionId)? programDivisionId.division_id : null;
      //   return {
      //     ...program,
      //     at: findMatchInProgramAtAndSdm(programAts, programTitle),
      //     sdm: findMatchInProgramAtAndSdm(programSdms, programTitle),
      //     eo: findOEInGroup(groups, program.group_id),
      //     gm: (programDivisionId) ? findGmInDivision(divisions, programDivisionId) : null
      //   }
      // })
      //
      // setProgramList(tmpProgramList);
      // setFilteredPrograms(tmpProgramList); //keeps in artical only

      const distinctSites = sites.filter((site, index, self) => {
        return index === self.findIndex((obj) => obj.site_id === site.site_id);
      });

      distinctSites.sort ((s1, s2) => s1.site_id.localeCompare(s2.site_id));

      // const tmpSites = distinctSites.map((site) => {
      //   let siteId = site.site_id;
      //   return {
      //     ...site,
      //     accessibility: findMatchInSiteAccess(siteAccessibilities, siteId),
      //   }
      // });
      //
      // setSiteList(tmpSites);
      // setFilteredSites(tmpSites); //keeps in artical only
      // setAdvanceFilteredSites(tmpSites); //keeps in artical only

      setSiteList(distinctSites);
      setFilteredSites(distinctSites); //keeps in artical only
      setAdvanceFilteredSites(distinctSites); //keeps in artical only

      setServiceStreamList(serviceStreams);
      setServiceTypeList(serviceTypes);
      setDivisionList(divisions);

      const programTypesOptions = programTypes
        .filter((programType, index, self) =>
          programType.prgm_type !== null && 
          index === self.findIndex((pt) => pt.prgm_type === programType.prgm_type)
        )
        .map((programType) => ({
          value: programType.prgm_type,
          type: 'Program Types'
        }));

    
      const groupsOptions = groups
        .filter((group, index, self) => 
          group.group_name !== null &&
          index === self.findIndex((g) => g.group_name === group.group_name)
        )
        .map((group) => ({
          value: group.group_name,
          type: 'Group'
        }));
      

      const filteredOptions = [];
    
      filteredOptions.push(...programTypesOptions, ...groupsOptions);
      filteredOptions.unshift({ value: ' --Search Anything--',type: 'All'});

      setSearchOptions(filteredOptions);
      setSearchValues({value: ' --Search Anything--', type: 'All'});

      setIsLoading(false);


    } catch (error) {

      console.log(error);
    }

  }

  // =============================Data Collect Method From Database====================================

  /* get a list of sites from the backend and display it */
  const getSites = async () => {
    const BASE_URL = "http://localhost:8888";

    const result = await axios.get(BASE_URL+ '/site');

    // swap lat and lng
    // const filteredResult = result.data.map(site => ({
    //   ...site,
    //   lat: site.lng,
    //   lng: site.lat,
    // }));

    // origin
    const filteredResult = result.data.map(site => ({
      ...site,
      lat: site.lat,
      lng: site.lng,
    }));

    return filteredResult.filter(site => site.lng !== null && site.lat != null);
  }

  /* get list of site accessibility from the db */
  const getSiteAccessibilities = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/siteaccess');
    return result.data;
  }

  /* get list of programs from the backend and display them */
  const getPrograms = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/program');
    return result.data[0];
  }

  /* get list of programs Access Type from the db */
  const getProgramAts = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/programat');
    return result.data;
  }

  /* get list of programs delivery method from the db */
  const getProgramSdms = async () => {
    const BASE_URL = 'http://localhost:8888';

    const result = await axios.get(BASE_URL + '/programsdm');
    return result.data;
  }

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'http://localhost:8888';

    let result = await axios.get(BASE_URL + '/programtype');
    result = result.data[0];

    result.sort((a, b) => {
      if (a.prgm_type === null && b.prgm_type === null) return 0;
      if (a.prgm_type === null) return -1;
      if (b.prgm_type === null) return 1;
      return a.prgm_type.localeCompare(b.prgm_type);
    });

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

  //-------------------------------------------------------------

  useEffect(() => {
    setAdvanceFilteredPrograms([]);
  }, [filteredSites])

  const fetchRouteData = async (site) => {
    try {
          const direction_url = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
          const response = await axios.get(
          direction_url +
              `${departureAddress.lng},${departureAddress.lat};${site.lng},${site.lat}` +
              `?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MAPBOX_TOKEN}`
          );
      
          const routes = response.data.routes;
          let pickedRoute = routes[0];
      
          for (let i = 1; i < routes.length; i++) {
              if (routes[i].distance < pickedRoute.distance) {
                  pickedRoute = routes[i]; // pick the quickest
              }
          }

          const coordinates = pickedRoute.geometry.coordinates;
          const geojson = {
              type: 'Feature',
              properties: {},
              geometry: {
                  type: 'LineString',
                  coordinates: coordinates
              }
          }
      
          return {
              ...site,
              duration: pickedRoute.duration,
              distance: pickedRoute.distance,
              geojson

          };

        } catch (error) {

          console.error(error);
          return null; // Handle the error as needed

        }
  };


  useEffect(() => {

    let cancel = false;

    if(departureAddress === null) {

      const newFilteredSitesData = filteredSites.map((site) => {

        const tmpSite = {...site};

        delete tmpSite.distance;
        delete tmpSite.duration;
        delete tmpSite.geojson;

        return tmpSite;

      })

      if(mapRef.current) {
        const map = mapRef.current.getMap();
        if (map.getLayer('route')) {
          map.removeLayer('route');
        }
        if (map.getSource('route')) {
          map.removeSource('route');
        }
      }

      newFilteredSitesData.sort ((s1, s2) => s1.site_id.localeCompare(s2.site_id));

      setFilteredSites(newFilteredSitesData);

      const tmpFilteredSiteIds = advancefilteredSites.map((site) => site.site_id);
      const newAvailableSite = newFilteredSitesData.filter((site) => tmpFilteredSiteIds.includes(site.site_id));

      setAdvanceFilteredSites(newAvailableSite);


    } else {

      if(filteredSites.length <=0) return;

        const fetchData = async () => {
            setAddressIsLoading(true);

            const newFilteredSitesData = await Promise.all(
              filteredSites.map(async (site) => {
                const routeData = await fetchRouteData(site);
                return routeData;
              })
            );

            setAddressIsLoading(false);

            if(cancel === false && newFilteredSitesData.length === filteredSites.length) {

              newFilteredSitesData.sort((s1, s2) => s1.distance - s2.distance);
              setFilteredSites(newFilteredSitesData);

              const tmpFilteredSiteIds = advancefilteredSites.map((site) => site.site_id);
              const newAvailableSite = newFilteredSitesData.filter((site) => tmpFilteredSiteIds.includes(site.site_id));

              setAdvanceFilteredSites(newAvailableSite);
            }

        };
        
        fetchData();
      //departure not equal to null

    }

    return () => (cancel = true);

  }, [departureAddress]);

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
    for (let i=0; i < siteList.length; i++) {
      if (siteIds.includes(siteList[i].site_id)) {
        result.push(siteList[i]);
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
    for (let i=0; i < siteList.length; i++) {
      if (siteIds.includes(siteList[i].site_id)) {
        result.push(siteList[i]);
      }
    }

    return result;
  };


  // handle the change for the search
  const onChangeSearch = (event, value, reason) => {


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

        const filteringSites = siteList.filter(site => siteIds.includes(site.site_id));

        if(filteringSites.length > 0) {
          setFilteredPrograms(filteringPrograms);
          setFilteredSites(filteringSites);
          setAdvanceFilteredSites(filteringSites);
          setSearchError(false);

        } else {
          setSearchError(true);
        }

      }
      else if (typeof value === 'object') 
      {

        setSearchValues(value);
        setSearchError(false);

        if(value.type === 'All')
        {
          setFilteredPrograms(programList);
          setFilteredSites(siteList);
          setAdvanceFilteredSites(siteList);
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

      if(mapRef.current) {
        const map = mapRef.current.getMap();
        if (map.getLayer('route')) {
          map.removeLayer('route');
        }
        if (map.getSource('route')) {
          map.removeSource('route');
        }
      }

      setDepartureAddress(null);
      setSelectedSite(null);

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

  const searchClearOnClick = (e) => {
    e.preventDefault();

    setSearchError(false);
    setFilteredPrograms(programList);
    setFilteredSites(siteList);
    setAdvanceFilteredSites(siteList);

    setSearchValues({value: ' --Search Anything--', type: 'All'});

  }
  
  const FreeTextSearch = () => {
    return (
      <ColSearchContainer>
        <InputLabel>
            Search
        </InputLabel>
        <SearchContainer>
        {
          (!(mapFilterIsLoading || addressIsLoading)) ?
          <>
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
                  disableClearable={true}
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
            <Button variant='contained' onClick={searchClearOnClick} sx={{
              backgroundColor: '#A20066',
              color: 'white',
              textTransform: 'capitalize',
              fontSize: '15px',
              borderRadius: '10px',
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)', // Add your desired boxShadow value here
              ':hover': {
                boxShadow: '5px 0 10px rgba(0, 0, 0, 0.8)', // Add your desired boxShadow value here
                backgroundColor: '#A20066',
                color: 'white'
              }
            }}>
              Clear
            </Button>
          </>
          :
          <div>
            <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
              <Skeleton style={{minWidth: '300px', minHeight: '2rem'}} />
            </SkeletonTheme>
          </div>
        }
        </SearchContainer>
      </ColSearchContainer>
    );
  }

  //===================== Export Function ===========================================
  const selectingSite = (site) => {

    setSelectedSite(site);
  }

  const applyFilter = (advanceFilteredSites) => {

    if(mapRef.current) {
      const map = mapRef.current.getMap();
      if (map.getLayer('route')) {
        map.removeLayer('route');
      }
      if (map.getSource('route')) {
        map.removeSource('route');
      }
    }

    setAdvanceFilteredSites(advanceFilteredSites);
    setSelectedSite(null);
  }

  const sendAdvanceFilteredPrograms = (programs) => {
    setAdvanceFilteredPrograms(programs);
  }

  const transferDepartureAddress = (address) => {
    setDepartureAddress(address);
    setSelectedSite(null);
  }

  const mapFilterLoadingCheck = (bool) => {
    setMapFilterIsLoading(bool)
  }

  
  return (

    (isLoading) ?

    <div className="loading-overlay">
      <div className="loading-container">
        <span className="loading-text"><img src='http://rev.u22s2101.monash-ie.me/img/uniting-logo-white.png' style={{width: '150px', height: 'auto', marginBottom: '10px'}} /> </span>
        <ReactLoading type={'spin'} color={'#A20066'} height={150} width={110}></ReactLoading>
        <span className="loading-text">Loading...</span>
      </div>
    </div>
    :
    <ArticleContainer>
      <ArticleH1>Find a Uniting service near you</ArticleH1>
        <FilterContainer>
          <FreeTextSearch />
          {
            (searchError) ?
              <Typography variant="subtitle" sx={{color: 'red', marginBottom: '-0.8rem'}}>--Search No Result--</Typography> : null
          }
        </FilterContainer>
        <MapElement>
          <MapFilter 
            filteredPrograms={filteredPrograms} 
            filteredSites={filteredSites}
            programTypeList={programTypeList}
            serviceTypeList = {serviceTypeList}
            serviceStreamList = {serviceStreamList} 
            groupList={groupList}
            divisionList = {divisionList}
            exportAdvanceFilteredSites={applyFilter}
            importRef={mapRef}
            exportSite={selectingSite}
            exportAdvanceFilteredPrograms = {sendAdvanceFilteredPrograms}
            exportDepartureAddress={transferDepartureAddress}
            importSite={selectedSite}
            loadingChecking={mapFilterLoadingCheck}
          />
          {
            (addressIsLoading || mapFilterIsLoading) ?
              <LoadindContainer>
                <ReactLoading type={'bars'} color={'white'} height={130} width={130}></ReactLoading>
              </LoadindContainer>
              : 
              <Map 
                sites={advancefilteredSites} exportSite={selectingSite} exportRef={mapRef} importSite={selectedSite} departureLocation={departureAddress}
              />
          }

          <MapInfoContainer>
            <MapInfo site={selectedSite} advanceFilteredPrograms = {(advanceFilteredPrograms.length > 0) ? advanceFilteredPrograms : filteredPrograms } groupList= {groupList} programTypeList={programTypeList}/>
          </MapInfoContainer>
        </MapElement>
    </ArticleContainer>
  )
}

export default Article