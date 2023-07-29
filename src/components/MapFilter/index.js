import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { MapFilterContainer, FilterContainer, SelectDiv, ButtonContainer, ResultContainer, SearchContainer, SitesContainer, SiteOption} from './MapFilterElements';
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
import { debounce } from '@mui/material';

const MapFilter = ({filteredPrograms, filteredSites, programTypeList, groupList}) => {

    // useState hooks
    const [values, setValues] = useState({
        ser_stream: '',
        division_name: ''
    })

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

    const dropDownStyle = { minWidth: '16vw', maxWidth: '16vw', position: 'absolute'};

    const buttonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", width: 'fit-content', marginBottom: '0.5rem', marginTop: '0.5rem', marginLeft: '0.5rem'};
    const textFieldStyle = { minWidth: "16vw", marginTop: '0.5rem', fontSize: '15px', borderRadius: '20px'};
    const textStyle = { fontSize: '18px', fontWeight: 'bold', color: '#A20066'};
    const toolTipsStyle = {backgroundColor: 'white',  color: 'rgba(0, 0, 0, 0.87)', maxWidth: '15vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};

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

        setFilteredServiceStreams(filteringServiceStreams());
        setFilteredDivisions(filteringDivisions());

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

    const filteringServiceStreams= () => {

        const programTypeIds = []
        for(let i=0; i< filteredPrograms.length; i++) {
            programTypeIds.push(filteredPrograms[i].prgm_type_id)
        }

        const filteredProgramTypes = programTypeList.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

        const filteredServicTypeIds = [];
        for(let i = 0; i < filteredProgramTypes.length; i++)
        {
            filteredServicTypeIds.push(filteredProgramTypes[i].ser_type_id);
        }

        const filteredServiceTypes = serviceTypes.filter((type) => {
            return filteredServicTypeIds.includes(type.ser_type_id);
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

    const filteringDivisions = () => {

        const groupIds = [];
        for(let i=0; i< filteredPrograms.length; i++) {
            groupIds.push(filteredPrograms[i].group_id);
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

    const ServiceStreamDropdown = () => {
        return ( 
        
            <Select 
                name="Service Stream"
                size='small'
                style={dropDownStyle}
                value={serviceStreamValue}
                onChange={(e) => {setServiceStreamValue(e.target.value)}}
                required
            >
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
                onChange={(e) => {setDivisionValue(e.target.value)}}
                required
            >
                {
                    filteredDivisions && filteredDivisions.map((division, index) => {
                    return <MenuItem key={index} value={division.division_name}>{division.division_name} </MenuItem>
                    })
                }

            </Select>
        )

    }

    const AvailableSites = () => {
        console.log(advanceFilteredSites)
        return (
            availableSearchSites && availableSearchSites.map((site, index) => {
                return (
                    <ListItem key= {index}>
                        <Tooltip 
                            title= {<Typography variant= 'body2' color="inherit">{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</Typography>} 
                            style={toolTipsStyle}
                        >
                            <SiteOption>
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

    const onChangeSiteSearch = debounce((e) => {
        const inputValue = e.target.value.trim();

        if(!inputValue) {
            if(availableSearchSites.length !== advanceFilteredSites.length) {
                setAvailableSearchSites(advanceFilteredSites);
                return;
            }
        }

        const pattern = new RegExp(inputValue, 'i'); // pattern to search more accurately
        const filterSearchSite = availableSearchSites.filter((site) => pattern.test(site.site_id) 
        || pattern.test(site.street_nbr) 
        || pattern.test(site.street_name) 
        || pattern.test(site.suburb) 
        || pattern.test(site.state) 
        || pattern.test(site.postcode));

        setAvailableSearchSites(filterSearchSite);

    },300);


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
                    <Button variant="contained" style={buttonStyle}>Apply Filter</Button>
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