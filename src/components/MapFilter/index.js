import axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import { MapFilterContainer, FilterContainer, SelectDiv, ButtonContainer, ResultContainer, SearchContainer, SitesContainer, SiteOption, ToolTips} from './MapFilterElements';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { debounce } from '@mui/material/utils';

const MapFilter = ({filteredPrograms, filteredSites, programTypeList, groupList, exportAdvanceFilteredSites, importRef, exportSite, exportAdvanceFilteredPrograms}) => {


    const [divisionValue, setDivisionValue] = useState('');
    const [serviceStreamValue, setServiceStreamValue] = useState('');

    const [serviceStreams, setServiceStreams] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredServiceStreams, setFilteredServiceStreams] = useState([]);
    const [filteredDivisions, setFilteredDivisions] = useState([]);

    const [advanceFilteredSites, setAdvanceFilteredSites] = useState([]);
    const [availableSearchSites, setAvailableSearchSites] = useState([]);

    const [selectedProgramTypeIds, setSelectedProgramTypeIds] = useState([]);
    const [selectedGroupIds, setSelectedGroupIds] = useState([]);

    const [clickedSite, setClickedSite] = useState(null);

    const dropDownStyle = { minWidth: '16vw', maxWidth: '16vw', position: 'absolute'};

    const buttonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", width: 'fit-content', marginBottom: '0.5rem', marginTop: '0.5rem', marginLeft: '0.5rem'};
    const textFieldStyle = { minWidth: "16vw", marginTop: '0.5rem', fontSize: '15px', borderRadius: '20px'};
    const textStyle = { fontSize: '18px', fontWeight: 'bold', color: '#A20066'};
    const toolTipsStyle = {backgroundColor: 'white',  color: 'rgba(0, 0, 0, 0.87)', minWidth: '13.5vw', maxWidth: '13.5vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};
    const toolTipsStyleClicked = {backgroundColor: '#A20066',  color: 'white', minWidth: '13.5vw', maxWidth: '13.5vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};

    const listStyle = { marginTop: '0'};
    const captionStyle = {
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    useEffect(() => {
        getFilterData();

    },[]);

    useEffect(()=> {

        if(isLoading) return;
        setServiceStreamValue ('All Service Stream');
        setDivisionValue('All Divisions');

        setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
        setFilteredDivisions(filteringDivisions(filteredPrograms));

    },[filteredPrograms])

    useEffect(() => {

        if(isLoading) return;

        setAdvanceFilteredSites(filteredSites);

        setAvailableSearchSites(filteredSites);
        
    },[filteredSites])

    const getFilterData = async () => {

        try {
          const [serviceTypes, serviceStreams, divisions, ] = await Promise.all ([
            getServiceTypes(),
            getServiceStreams(),
            getDivisions(),
          ]);

          setServiceTypes(serviceTypes);
          setServiceStreams(serviceStreams);
          setDivisions(divisions);
    
    
          setIsLoading(false);
    
    
        } catch (error) {
    
          console.log(error);
        } 
    
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

    const filteringServiceStreams= (programList) => {

        const programTypeIds = []
        for(let i=0; i< programList.length; i++) {
            programTypeIds.push(programList[i].prgm_type_id)
        }

        const filteredProgramTypes = programTypeList.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

        const filteredServiceTypeIds = [];
        for(let i = 0; i < filteredProgramTypes.length; i++)
        {
            filteredServiceTypeIds.push(filteredProgramTypes[i].ser_type_id);
        }

        const filteredServiceTypes = serviceTypes.filter((type) => {
            return filteredServiceTypeIds.includes(type.ser_type_id);
        })

        const filteredServiceStreamIds = [];

        for(let i = 0; i < filteredServiceTypes.length; i++){
            filteredServiceStreamIds.push(filteredServiceTypes[i].ser_stream_id);
        }

        const filteredServiceStreams = serviceStreams.filter((stream) => {
            return filteredServiceStreamIds.includes(stream.ser_stream_id);
        });

        return filteredServiceStreams;
    }

    const filteringDivisions = (programList) => {

        const groupIds = [];
        for(let i=0; i< programList.length; i++) {
            groupIds.push(programList[i].group_id);
        }
        // console.log("groupIds: " + groupIds)

       const filteredGroups = groupList.filter((group) => {
            return groupIds.includes(group.group_id);
       });


       const divisionIds = [];
       for(let i=0; i< filteredGroups.length; i++) {
            divisionIds.push(filteredGroups[i].division_id);
       }

       const filteredDivisions = divisions.filter((division) => {
            return divisionIds.includes(division.division_id);
       })


       
       return filteredDivisions;

    }

    const filteringSites = (selectedGroupIds, selectedProgramTypeIds) => {

        const tmpFilteredPrograms = filteredPrograms.filter((program) => 
                selectedGroupIds.includes(program.group_id) && selectedProgramTypeIds.includes(program.prgm_type_id)
        );

        exportAdvanceFilteredPrograms(tmpFilteredPrograms);

        const sitesIds = [];
        for(let i = 0; i < tmpFilteredPrograms.length; i++) {
            sitesIds.push(tmpFilteredPrograms[i].site_id);
        }

        const advanceFilteredSites = filteredSites.filter((site) => sitesIds.includes(site.site_id));
        return advanceFilteredSites;
    }

    const ServiceStreamDropdown = () => {
        return ( 
        
            <Select 
                name="Service Stream"
                size='small'
                style={dropDownStyle}
                value={serviceStreamValue}
                onChange={onChangeServiceStream}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 2,
                        horizontal: 0,
                    },
                    transformOrigin: {
                        vertical: -40,
                        horizontal: 0,
                    },
                }}
            >
                <MenuItem key={-1} value={'All Service Stream'}> --All Service Stream-- </MenuItem>
                {
                    filteredServiceStreams && filteredServiceStreams.map((serviceStream, index) => {
                    return <MenuItem key={index} value={serviceStream.ser_stream}>{serviceStream.ser_stream} </MenuItem>
                    })
                }

            </Select>
        )

    }

    const DivisionDropdown = () => {

        return (

            <Select 
                name="Division"
                size='small'
                style={dropDownStyle}
                value={divisionValue}
                onChange={onChangeDivision}
                MenuProps={{
                    anchorOrigin: {
                        vertical: 2,
                        horizontal: 0,
                    },
                    transformOrigin: {
                        vertical: -40,
                        horizontal: 0,
                    },
                }}
            >
                <MenuItem key={-1} value={'All Divisions'}> --All Divisions-- </MenuItem>
                {
                    filteredDivisions && filteredDivisions.map((division, index) => {
                    return <MenuItem key={index} value={division.division_name}> {division.division_name} </MenuItem>
                    })
                }

            </Select>
        )

    }

    

    const AvailableSites = () => {
        return (
            availableSearchSites && availableSearchSites.map((site, index) => {
                return (
                    <ListItem key={index}>
                        <Tooltip 
                            title= {<Typography variant= 'body2' color="inherit">{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</Typography>} 
                            style={(clickedSite && site.site_id === clickedSite.site_id)? toolTipsStyleClicked: toolTipsStyle}
                        >
                            <SiteOption onClick={() => onClickSite(site)}>
                                <Typography variant='body1'>
                                    {site.site_id}
                                </Typography>
                                <Typography variant='caption' style={captionStyle}>{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</Typography>
                            </SiteOption>
                        </Tooltip>
                    </ListItem>
                )
            })
        )
    }

    const flyingToLocation = (lat, lng) => {
        if(importRef.current) {
            importRef.current.getMap().flyTo({ center: [lng, lat], zoom: 16, essential: true });
        }
    }

    const onClickSite = (site) => {
        setClickedSite(site); 
        flyingToLocation(site.lat, site.lng);
        exportSite(site);
    }

    const onChangeServiceStream = (e) => {

        setServiceStreamValue(e.target.value);

        if(e.target.value === 'All Service Stream') {

            setFilteredDivisions(filteringDivisions(filteredPrograms));
            return;
        }

        const serviceStreamIds = [];
        for(let i = 0; i < serviceStreams.length; i++) {
            if(serviceStreams[i].ser_stream === e.target.value)
            {
                serviceStreamIds.push(serviceStreams[i].ser_stream_id);
            }
        }

        const tmpFilteredServiceType = serviceTypes.filter((serviceType) => serviceStreamIds.includes(serviceType.ser_stream_id));

        const serviceTypeIds = [];
        for(let i = 0; i < tmpFilteredServiceType.length; i++) {
            serviceTypeIds.push(tmpFilteredServiceType[i].ser_type_id);
        }

        const tmpFilteredProgramType = programTypeList.filter((programType) => serviceTypeIds.includes(programType.ser_type_id));

        const programTypeIds = [];
        for(let i = 0; i < tmpFilteredProgramType.length; i++) {
            programTypeIds.push(tmpFilteredProgramType[i].prgm_type_id);
        }

        setSelectedProgramTypeIds(programTypeIds);

        const tmpFilteredPrograms = filteredPrograms.filter((program) => programTypeIds.includes(program.prgm_type_id));

        const tmpFilteredDivisions = filteringDivisions(tmpFilteredPrograms);

        if(divisionValue) {

            const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
            if(tmpDivision.length <= 0) {
                setDivisionValue('All Divisions');
            }

        }
        setFilteredDivisions(tmpFilteredDivisions);
    }



    const onChangeDivision = (e) => {

        setDivisionValue(e.target.value);

        if(e.target.value === 'All Divisions') {
           setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
           return;
        }

        const divisionIds = [];
        for(let i = 0; i < divisions.length; i++) {

            if(divisions[i].division_name === e.target.value)
            {
                divisionIds.push(divisions[i].division_id);
            }
        }

        const tmpFilteredGroup = groupList.filter((group) => divisionIds.includes(group.division_id));

        const groupIds = [];
        for(let i = 0; i < tmpFilteredGroup.length; i++) {
            groupIds.push(tmpFilteredGroup[i].group_id);
        }

        setSelectedGroupIds(groupIds);

        const tmpFilteredPrograms = filteredPrograms.filter((program) =>groupIds.includes(program.group_id));

        const tmpFilteredServiceStream = filteringServiceStreams(tmpFilteredPrograms);

        if(serviceStreamValue) {
            const tmpServiceStream = tmpFilteredServiceStream.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue);

            if(tmpServiceStream.length <= 0) {

                setServiceStreamValue('All Service Stream');
            }
        }

        setFilteredServiceStreams(tmpFilteredServiceStream);
    };

    const onChangeSiteSearch = debounce((e) => {
        const inputValue = e.target.value.trim();

        if(!inputValue) {
            if(availableSearchSites.length !== advanceFilteredSites.length) {
                setAvailableSearchSites(advanceFilteredSites);
                return;
            }
        }

        const pattern = new RegExp(inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); // pattern to search more accurately
        const filterSearchSite = availableSearchSites.filter((site) => {
            const fullAddress = `${site.site_id} ${site.street_nbr} ${site.street_name} ${site.suburb} ${site.state} ${site.postcode}`;
            return pattern.test(fullAddress);
        })

        setAvailableSearchSites(filterSearchSite);

    },300);


    const applyingFilter = () => {

        // In the case of both is all we just return empty and the article will track
        if(divisionValue === 'All Divisions' && serviceStreamValue === 'All Service Stream') {

            setAvailableSearchSites(filteredSites);
            exportAdvanceFilteredSites([]);            

        }

        if((divisionValue === 'All Divisions' && serviceStreamValue !== 'All Service Stream')
            || (divisionValue !== 'All Divivsions' && serviceStreamValue === 'All Service Stream')) {

                let groupIds = [];
                let programTypeIds = [];

                if(divisionValue === 'All Divisions') {
                    const divisionIds = [];
                    for(let i = 0; i < filteredDivisions.length; i++) {
                            divisionIds.push(filteredDivisions[i].division_id);
                    }

                    const tmpFilteredGroup = groupList.filter((group) => divisionIds.includes(group.division_id));

                    for(let i = 0; i < tmpFilteredGroup.length; i++) {
                        groupIds.push(tmpFilteredGroup[i].group_id);
                    }
                }

                if(serviceStreamValue === 'All Service Stream') {

                    const serviceStreamIds = [];
                    for(let i = 0; i < filteredServiceStreams.length; i++) {
                    
                        serviceStreamIds.push(filteredServiceStreams[i].ser_stream_id);
                    }
        
                    const tmpFilteredServiceType = serviceTypes.filter((serviceType) => serviceStreamIds.includes(serviceType.ser_stream_id));
        
                    const serviceTypeIds = [];
                    for(let i = 0; i < tmpFilteredServiceType.length; i++) {
                        serviceTypeIds.push(tmpFilteredServiceType[i].ser_type_id);
                    }
        
                    const tmpFilteredProgramType = programTypeList.filter((programType) => serviceTypeIds.includes(programType.ser_type_id));
        
                    for(let i = 0; i < tmpFilteredProgramType.length; i++) {
                        programTypeIds.push(tmpFilteredProgramType[i].prgm_type_id);
                    }

                }

                if(!groupIds.length > 0) {
                    groupIds = selectedGroupIds;
                }

                if(!programTypeIds.length > 0) {
                    programTypeIds = selectedProgramTypeIds;
                }
                
                const advanceFilteredSites = filteringSites(groupIds, programTypeIds);
                console.log(advanceFilteredSites);


                setAvailableSearchSites(advanceFilteredSites);
                exportAdvanceFilteredSites(advanceFilteredSites);

        }

        if(divisionValue !== 'All Divisions' && serviceStreamValue !== 'All Service Stream') {

            const advanceFilteredSites = filteringSites(selectedGroupIds, selectedProgramTypeIds);

            setAvailableSearchSites(advanceFilteredSites);
            exportAdvanceFilteredSites(advanceFilteredSites);

        }
        // If one of them are selected for example we need to run through filtered list of eithers and d or ss.
        // if both of them are selected we just need to run through selected groupids and programtypes ids.

    }


    return (
         <MapFilterContainer>
            <FilterContainer>
                <SelectDiv>
                    <InputLabel>Service Stream</InputLabel>
                    <ServiceStreamDropdown></ServiceStreamDropdown>
                </SelectDiv> 
                <SelectDiv>
                    <InputLabel>Division</InputLabel>
                    <DivisionDropdown></DivisionDropdown>
                </SelectDiv> 
                <ButtonContainer>
                    <Button variant="contained" style={buttonStyle} onClick={applyingFilter}>Apply Filter</Button>
                </ButtonContainer>
            </FilterContainer>
            <ResultContainer>
                <SearchContainer>
                    <InputLabel style={textStyle}>Available Sites</InputLabel>
                    <OutlinedInput style={textFieldStyle} size='small' placeholder='Search Sites...' onChange={onChangeSiteSearch}
                        startAdornment= {
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    ></OutlinedInput>
                </SearchContainer>
                <SitesContainer>
                    <List sx={listStyle}>
                        <AvailableSites></AvailableSites>
                    </List>
                </SitesContainer>      
            </ResultContainer>
        
        </MapFilterContainer>


       
    )
}

export default MapFilter;