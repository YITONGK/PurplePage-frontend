import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import { ArticleContainer, ArticleH1 } from './ArticleElements';
import Footer from '../../components/Footer';

import { FilterContainer, SelectDiv, GroupHeader, GroupItems, MapElement, SearchContainer, ColSearchContainer, MapInfoContainer, LoadindContainer} from './ArticleElements';
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

import ReactLoading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// article component
const Article = ({sites, programs, programTypes, groups, serviceStreams, serviceTypes, divisions}) => {

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useEffect
  useEffect(() => {
    document.title = 'Home';
  }, []);

  const [searchValues, setSearchValues] = useState({
    value: ' --Anythings--',
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

  const [filteredSites, setFilteredSites] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  const [site, setSite] = useState(null);

  const [departureAddress, setDepartureAddress] = useState(null);

  const [advancefilteredSites, setAdvanceFilteredSites] = useState([]);
  const [advanceFilteredPrograms, setAdvanceFilteredPrograms] = useState([]);

  const [searchOptions, setSearchOptions] = useState([]);

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

  useEffect(() => {

    getAllData();

  }, [sites, programs, programTypes, groups, serviceStreams, serviceTypes, divisions])


  const getAllData = async () => {

    setIsLoading(true);

    try {

      setProgramTypeList(programTypes);
      setGroupList(groups);
      setProgramList(programs);
      setFilteredPrograms(programs); //keeps in artical only

      const distinctSites = sites.filter((site, index, self) => {
        return index === self.findIndex((obj) => obj.site_id === site.site_id);
      });

      distinctSites.sort ((s1, s2) => s1.site_id.localeCompare(s2.site_id));

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
      filteredOptions.unshift({ value: ' --Anythings--',type: 'All'});

      setSearchOptions(filteredOptions);
      setSearchValues({value: ' --Anythings--', type: 'All'});

      setIsLoading(false);


    } catch (error) {

      console.log(error);
    }

  }


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

    console.log(reason);

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
      setSite(null);

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

    setFilteredPrograms(programList);
    setFilteredSites(siteList);
    setAdvanceFilteredSites(siteList);

    setSearchValues({value: ' --Anythings--', type: 'All'});

  }
  
  const FreeTextSearch = () => {
    return (
      <ColSearchContainer>
        <InputLabel>
            Search
        </InputLabel>
        <SearchContainer>
        {
          (programTypeList.length > 0 && groupList.length > 0 && filteredPrograms.length >0 && filteredSites.length > 0) ?
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
            <Button variant='contained' onClick={searchClearOnClick}>Clear</Button>
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
  const selectedSite = (site) => {
    setSite(site);
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
    setSite(null);
  }

  const sendAdvanceFilteredPrograms = (programs) => {
    setAdvanceFilteredPrograms(programs);
  }

  const transferDepartureAddress = (address) => {
    setDepartureAddress(address);
    setSite(null);
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
            serviceTypeList = {serviceTypeList}
            serviceStreamList = {serviceStreamList} 
            groupList={groupList}
            divisionList = {divisionList}
            exportAdvanceFilteredSites={applyFilter}
            importRef={mapRef}
            exportSite={selectedSite}
            exportAdvanceFilteredPrograms = {sendAdvanceFilteredPrograms}
            exportDepartureAddress={transferDepartureAddress}
            importSite={site}
          />
          {
            (addressIsLoading || isLoading) ? 
              <LoadindContainer>
                <ReactLoading type={'bars'} color={'white'} height={130} width={130}></ReactLoading>
              </LoadindContainer>
              : 
              <Map 
                sites={advancefilteredSites} exportSite={selectedSite} exportRef={mapRef} importSite={site} departureLocation={departureAddress}
              />
          }

          <MapInfoContainer>
            <MapInfo site={site} advanceFilteredPrograms = {(advanceFilteredPrograms.length > 0) ? advanceFilteredPrograms : filteredPrograms } groupList= {groupList} programTypeList={programTypeList}/>
          </MapInfoContainer>
        </MapElement>
    </ArticleContainer>
  )
}

export default Article