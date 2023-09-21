import axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import { 
    MapFilterContainer, 
    FilterContainer, 
    SelectDiv,
    ButtonContainer, 
    ResultContainer, 
    SearchContainer, 
    SitesContainer, 
    SiteOption, 
    SiteOptionRoutingContainer,
    ProgramDropDownContainer, 
    GroupDropDownContainer, 
    BreakingLine, 
    SearchInputContainer,
    BreakingLine2, 
    LabelContainer, 
    CollapseButtonContainer, 
    CollapseButton, 
    ApplyButton, 
    ResetButton, 
    ButtonLabel, 
    OptionContainer, 
    OptionDetail, 
    OptionIcon, 
    OptionP,
} from './MapFilterElements';
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
import Autocomplete from '@mui/material/Autocomplete';

import CardTravelIcon from '@mui/icons-material/CardTravel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

import ReactLoading from 'react-loading';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MapFilter = ({filteredPrograms, 
    filteredSites, 
    programTypeList, 
    serviceTypeList, 
    serviceStreamList, 
    groupList, 
    divisionList, 
    exportAdvanceFilteredSites, 
    importRef, 
    exportSite, 
    exportAdvanceFilteredPrograms,
    exportDepartureAddress,
    importSite}) => {

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

    const [serviceStreamValue, setServiceStreamValue] = useState('');
    const [serviceTypeValue, setServiceTypeValue] = useState('');
    const [programTypeValue, setProgramTypeValue] = useState('');
    const [programValue, setProgramValue] = useState('');

    const [divisionValue, setDivisionValue] = useState('');
    const [groupValue, setGroupValue] = useState('');

    const [suggestAddressOptions, setSuggestAddressOptions] = useState([]);
    const [routingAddressValue, setRoutingAddressValue] = useState({});
    const [tmpAddressValue, setTmpAddressValue] = useState(null);
    const [onChangeAddressValue, setOnChangeAddressValue] = useState('');

    const [serviceStreams, setServiceStreams] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [programTypes, setProgramTypes] = useState([]);

    const [divisions, setDivisions] = useState([]);
    const [groups, setGroups] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [addressIsLoading, setAddressIsLoading] = useState(true);

    const [filteredServiceStreams, setFilteredServiceStreams] = useState([]);
    const [filteredServiceTypes, setFilteredServiceTypes] = useState([]);
    const [filteredProgramTypes, setFilteredProgramTypes] = useState([]);
    const [localFilteredProgram, setLocalFilteredProgram] = useState([]);

    const [filteredDivisions, setFilteredDivisions] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);

    const [advanceFilteredSites, setAdvanceFilteredSites] = useState([]);
    const [availableSearchSites, setAvailableSearchSites] = useState([]);

    const [advancedFilteredPrograms, setAdvancedFilteredPrograms] = useState([]);

    const [clickedSite, setClickedSite] = useState(null);
    const [isCollapse, setIsCollapse] = useState(false);

    const dropDownStyle = { minWidth: '13vw', maxWidth: '13vw', fontSize: '14px'};

    const textFieldStyle = { 
        minWidth: "16vw", 
        fontSize: '15px', 
        borderRadius: '5px'
    };

    const textStyle = { fontSize: '20px', fontWeight: 'bold', color: '#A20066'};
    const toolTipsStyle = {backgroundColor: 'white',  color: 'rgba(0, 0, 0, 0.87)', minWidth: '13.5vw', maxWidth: '13.5vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};
    const toolTipsStyleClicked = {backgroundColor: '#A20066',  color: 'white', minWidth: '13.5vw', maxWidth: '13.5vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};

    const listStyle = { marginTop: '0'};
    const captionStyle = {
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

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

    useEffect(()=> {

        if(isLoading) return;

        setServiceStreamValue ('All Service Stream');
        setServiceTypeValue('All Service Type');
        setProgramTypeValue('All Program Type');
        setProgramValue('All Program');
        setDivisionValue('All Divisions');
        setGroupValue('All Group');

        setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
        setFilteredServiceTypes(filteringServiceTypes(filteredPrograms));
        setFilteredProgramTypes(filteringProgramTypes(filteredPrograms));
        setLocalFilteredProgram(filteredPrograms);

        setFilteredDivisions(filteringDivisions(filteredPrograms));
        setFilteredGroups(filteringGroups(filteredPrograms));

    },[filteredPrograms])

    useEffect(() => {

        if(isLoading) return;

        if(filteredSites && filteredSites[0] && !filteredSites[0].distance) {
            setTmpAddressValue("");
        }

        setAdvanceFilteredSites(filteredSites);

        if(availableSearchSites.length <= 0) {
            setAvailableSearchSites(filteredSites);
        }
        else {
            const tmpAvailableSiteIds = availableSearchSites.map(site => site.site_id);
            const tmpAvailableSites = filteredSites.filter((site) => tmpAvailableSiteIds.includes(site.site_id));
            setAvailableSearchSites(tmpAvailableSites);
        }

        setAddressIsLoading(false);
        setClickedSite(null);

    },[filteredSites])


    useEffect(() => {

        if(programTypeList && programTypeList.length > 0) {
            setProgramTypes(programTypeList);
        }

        if (serviceTypeList && serviceTypeList.length > 0) {
            setServiceTypes(serviceTypeList);
        }

        if (serviceStreamList && serviceStreamList.length > 0) {
            setServiceStreams(serviceStreamList);
        }

        if(groupList && groupList.length > 0) {
            setGroups(groupList);
        }
        
        if (divisionList && divisionList.length > 0) {
            setDivisions(divisionList);
        }
        
    }, [programTypeList, serviceTypeList,serviceStreamList, groupList, divisionList ]);

    useEffect(() => {

        if(programTypes.length > 0 
            && serviceStreams.length > 0 
            && serviceTypes.length > 0 
            && groups.length > 0
            && divisions.length > 0 ) {

            setIsLoading(false);
        }

    }, [programTypes, serviceTypes, serviceStreams, groups, divisions])

    useEffect(() => {
        if(importSite && importSite.site_id){
            if(clickedSite && clickedSite.site_id === importSite.site_id){
                return;
            }
            setClickedSite(importSite);
        }
    },[importSite]);

    useEffect(() => {

        if( serviceStreamValue === '' || serviceTypeValue === '' || programTypeValue === '' || divisionValue === '' || groupValue === '' ) {
            return;
        }

        // Upper
        const selectedServiceStreamIds = [];
        for(let i = 0; i <serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if(serviceStreamValue !== 'All Service Stream') {
                if(serviceStream.ser_stream === serviceStreamValue){
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }
            else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for(let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if(serviceTypeValue !== 'All Service Type') {
                if(serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }
            else if(serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for(let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if(programTypeValue !== 'All Program Type') {
                if(programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            }
            else if(programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        // Lower

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
          const division = divisions[i];
          if (divisionValue !== 'All Divisions') {
            if (division.division_name === divisionValue) {
              selectedDivisionIds.push(division.division_id);
            }
          } else {
            selectedDivisionIds.push(division.division_id);
          }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (groupValue !== 'All Group') {
            if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
              selectedGroupIds.push(group.group_id);
            }
          } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
            selectedGroupIds.push(group.group_id);
          }
        }

        // Combination

        const finalFilteredPrograms = filteredPrograms.filter((program) => 
            selectedProgramTypeIds.includes(program.prgm_type_id) && 
            selectedGroupIds.includes(program.group_id)
        );

        setAdvancedFilteredPrograms(finalFilteredPrograms);

        if(programValue !== 'All Program') {
            const tmpProgram = filteredPrograms.filter((program) => program.program_nme === programValue);
            if(tmpProgram.length <= 0) {
                setProgramValue('All Program');
            }
        }

        //remove redundent
        const distinctPrograms = finalFilteredPrograms.filter((program, index, self) => {
            return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
        });


        setLocalFilteredProgram(distinctPrograms);

    },[serviceStreamValue, serviceTypeValue, programTypeValue, divisionValue, groupValue])

    useEffect(() => {

        if(!onChangeAddressValue) return setSuggestAddressOptions([]);

        let cancel = false;

        const geocoding_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

        axios.get(geocoding_url + onChangeAddressValue.split(' ').join('%20') + `.json?proximity=ip&&country=au&&language=en&access_token=${MAPBOX_TOKEN}`).then((res) =>{
            if(cancel) return;
            const addressSuggestions = res.data.features.map((feature) => {
                return {
                    address: feature.place_name,
                    lng: feature.geometry.coordinates[0],
                    lat: feature.geometry.coordinates[1],
                }
            });
            setSuggestAddressOptions(addressSuggestions);
        })

        return () => (cancel = true);

    },[onChangeAddressValue])

    useEffect(()=> {
        if(routingAddressValue.address && tmpAddressValue === routingAddressValue.address) {
            exportDepartureAddress(routingAddressValue);
            setAddressIsLoading(true);
        }
        else {
            exportDepartureAddress(null);
        }

    }, [routingAddressValue]);

    useEffect(() => {

        if(addressIsLoading) return;

        if(routingAddressValue && routingAddressValue.lat && routingAddressValue.lng) {
            
            flyingToLocation(routingAddressValue.lat, routingAddressValue.lng);
        }

    },[addressIsLoading]);

    const filteringServiceStreams= (programList) => {

        const tmpProgramTypeIds = []
        for(let i=0; i< programList.length; i++) {
            tmpProgramTypeIds.push(programList[i].prgm_type_id)
        }

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return tmpProgramTypeIds.includes(type.prgm_type_id);
        });

        const tmpFilteredServiceTypeIds = [];
        for(let i = 0; i < tmpFilteredProgramTypes.length; i++)
        {
            tmpFilteredServiceTypeIds.push(tmpFilteredProgramTypes[i].ser_type_id);
        }

        const tmpFilteredServiceTypes = serviceTypes.filter((type) => {
            return tmpFilteredServiceTypeIds.includes(type.ser_type_id);
        })

        const tmpFilteredServiceStreamIds = [];
        for(let i = 0; i < tmpFilteredServiceTypes.length; i++){
            tmpFilteredServiceStreamIds.push(tmpFilteredServiceTypes[i].ser_stream_id);
        }

        const tmpFilteredServiceStreams = serviceStreams.filter((stream) => {
            return tmpFilteredServiceStreamIds.includes(stream.ser_stream_id);
        });

        return tmpFilteredServiceStreams;
    }

    const filteringServiceTypes = (programsList) => {

        const programTypeIds = programsList.map((program) => program.prgm_type_id);

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

        const tmpFilteredServiceTypeIds = tmpFilteredProgramTypes.map((type) => type.ser_type_id);
        
        const tmpFilteredServiceTypes = serviceTypes.filter((type) => {
            return tmpFilteredServiceTypeIds.includes(type.ser_type_id);
        })

        return tmpFilteredServiceTypes;
    }

    const filteringProgramTypes = (programsList) =>{

        const programTypeIds = programsList.map((program) => program.prgm_type_id);

        const tmpFilteredProgramTypes = programTypes.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });
        
        return tmpFilteredProgramTypes;
    }

    const filteringDivisions = (programList) => {

        const groupIds = [];
        for(let i=0; i< programList.length; i++) {
            groupIds.push(programList[i].group_id);
        }
        // console.log("groupIds: " + groupIds)

       const filteredGroups = groups.filter((group) => {
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

    const filteringGroups = (programList) => { 
        const groupIds = programList.map((program) => program.group_id);

        const tmpFilteredGroups = groups.filter((group) => {
            return groupIds.includes(group.group_id);
        });

        return tmpFilteredGroups;
    }

    //==============================Related Dropdown==============================================
    const ServiceStreamDropdown = () => {
        return ( 

            (filteredServiceStreams && filteredServiceStreams.length > 0)?
        
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

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30}/>
                </SkeletonTheme>
            </div>


        )

    }

    const ServiceTypeDropdown = () => {
        return ( 

            (filteredServiceTypes && filteredServiceTypes.length > 0) ?
            
            <Select 
                name="Service Type"
                size='small'
                style={dropDownStyle}
                value={serviceTypeValue}
                onChange={onChangeServiceType}
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
                <MenuItem key={-1} value={'All Service Type'}> --All Service Type-- </MenuItem>
                {
                    filteredServiceTypes && filteredServiceTypes.map((serviceType, index) => {
                        return <MenuItem key={index} value={serviceType.ser_type}>{serviceType.ser_type} </MenuItem>
                    })
                }

            </Select>

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30}/>
                </SkeletonTheme>
            </div>
        )
    }

    const ProgramTypeDropdown = () => {
        return ( 

            (filteredProgramTypes && filteredProgramTypes.length > 0) ?

            <Select 
                name="Program Type"
                size='small'
                style={dropDownStyle}
                value={programTypeValue}
                onChange={onChangeProgramType}
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
                <MenuItem key={-1} value={'All Program Type'}> --All Program Type-- </MenuItem>
                {
                    filteredProgramTypes && filteredProgramTypes.map((programType, index) => {
                        return <MenuItem key={index} value={programType.prgm_type}>{programType.prgm_type} </MenuItem>
                    })
                }

            </Select>

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30}/>
                </SkeletonTheme>
            </div>
        )
    }

    const ProgramDropdown = () => {
        return ( 

            (localFilteredProgram && localFilteredProgram.length > 0) ?

            <Select 
                name="Program"
                size='small'
                style={dropDownStyle}
                value={programValue}
                onChange={onChangeProgram}
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
                <MenuItem key={-1} value={'All Program'}> --All Program-- </MenuItem>
                {
                    localFilteredProgram && localFilteredProgram.map((program, index) => {
                        return <MenuItem key={index} value={program.program_nme}>{program.program_nme} </MenuItem>
                    })
                }

            </Select>

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30}/>
                </SkeletonTheme>
            </div>
        )
    }

    const DivisionDropdown = () => {

        return (
            (filteredDivisions && filteredDivisions.length > 0) ?

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

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30}/>
                </SkeletonTheme>
            </div>
        )

    }

    const GroupDropdown = () => {

        return (

            (filteredGroups && filteredGroups.length > 0) ?

            <Select 
                name="Group"
                size='small'
                style={dropDownStyle}
                value={groupValue}
                onChange={onChangeGroup}
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
                <MenuItem key={-1} value={'All Group'}> --All Group-- </MenuItem>
                {
                    filteredGroups && filteredGroups.map((group, index) => {
                    return <MenuItem key={index} value={group.group_name}> {group.group_name} </MenuItem>
                    })
                }

            </Select>

            :

            <div>
                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                    <Skeleton style={dropDownStyle} height={30} />
                </SkeletonTheme>
            </div>
        )

    }

    //=============================End Dropdown===================================
    
    //Hours Diplay
    const timeCalculation = (seconds) => {

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.round(seconds % 60);

        let formattedTime = '';

        if (hours > 0) {
            formattedTime += `${hours}h `;
        }

        if (minutes > 0 || (hours === 0 && seconds < 60)) {
            formattedTime += `${minutes}m `;
        }

        formattedTime += `${remainingSeconds}s`;

        return formattedTime.trim(); // Trim any leading or trailing spaces

    }
    
    //Sites Results
    const AvailableSites = () => {
        return (
            availableSearchSites && availableSearchSites.map((site, index) => {
                return (
                    <ListItem key={index}>
                        <Tooltip 
                            title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</Typography>} 
                            style={(clickedSite && site.site_id === clickedSite.site_id)? toolTipsStyleClicked: toolTipsStyle}
                        >
                            <SiteOption onClick={() => onClickSite(site)}>
                                <SiteOptionRoutingContainer>
                                    <Typography variant='body1'>
                                        {site.site_id}
                                    </Typography>

                                    {
                                        (site.distance) ? 
                                            <Typography variant='caption' style={{...captionStyle, fontWeight: 'bold'}}>
                                            {
                                                `${Math.round((site.distance / 1000) * 10) / 10} km`
                                            }
                                            </Typography> 
                                        : null
                                    }

                                </SiteOptionRoutingContainer>

                                <SiteOptionRoutingContainer>
                                {

                                    (site.duration) ? 
                                    <Typography variant='caption' style={captionStyle}>
                                        {
                                            `Duration: `
                                        }
                                        <Typography variant='caption' style={{...captionStyle, fontWeight: 'bold'}}>
                                        {
                                            `${timeCalculation(site.duration)}`
                                        }
                                        </Typography> 
                                    </Typography> 
                                    : null
                                }

                                </SiteOptionRoutingContainer>
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

    //================================= Assistance Method ====================================

    const currentDToPG = (DValue) => {

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
          const division = divisions[i];
          if (DValue !== 'All Divisions') {
            if (division.division_name === DValue) {
              selectedDivisionIds.push(division.division_id);
            }
          } else {
            selectedDivisionIds.push(division.division_id);
          }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (groupValue !== 'All Group') {
            if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
              selectedGroupIds.push(group.group_id);
            }
          } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
            selectedGroupIds.push(group.group_id);
          }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;


    }

    const currentGToPG = (GValue) => { 

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
          const division = divisions[i];
          if (divisionValue !== 'All Divisions') {
            if (division.division_name === divisionValue) {
              selectedDivisionIds.push(division.division_id);
            }
          } else {
            selectedDivisionIds.push(division.division_id);
          }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (GValue !== 'All Group') {
            if (group.group_name === GValue && selectedDivisionIds.includes(group.division_id)) {
              selectedGroupIds.push(group.group_id);
            }
          } else if (GValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
            selectedGroupIds.push(group.group_id);
          }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;
    }

    const currentDGToPG = () => {

        const selectedDivisionIds = [];
        for (let i = 0; i < divisions.length; i++) {
          const division = divisions[i];
          if (divisionValue !== 'All Divisions') {
            if (division.division_name === divisionValue) {
              selectedDivisionIds.push(division.division_id);
            }
          } else {
            selectedDivisionIds.push(division.division_id);
          }
        }

        const selectedGroupIds = [];
        for (let i = 0; i < groups.length; i++) {
          const group = groups[i];
          if (groupValue !== 'All Group') {
            if (group.group_name === groupValue && selectedDivisionIds.includes(group.division_id)) {
              selectedGroupIds.push(group.group_id);
            }
          } else if (groupValue === 'All Group' && selectedDivisionIds.includes(group.division_id)) {
            selectedGroupIds.push(group.group_id);
          }
        }

        const DGFilteredProgram = filteredPrograms.filter((program) => {
            return selectedGroupIds.includes(program.group_id);
        })

        return DGFilteredProgram;
    }

    const currentSSToPG = (SSValue) => {

        const selectedServiceStreamIds = [];
        for(let i = 0; i <serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if(SSValue !== 'All Service Stream') {
                if(serviceStream.ser_stream === SSValue){
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }
            else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for(let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if(serviceTypeValue !== 'All Service Type') {
                if(serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }
            else if(serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for(let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if(programTypeValue !== 'All Program Type') {
                if(programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            }
            else if(programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const ssToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return ssToPG;
    }

    const currentSTToPG = (STValue) => {
        const selectedServiceStreamIds = [];
        for(let i = 0; i <serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if(serviceStreamValue !== 'All Service Stream') {
                if(serviceStream.ser_stream === serviceStreamValue){
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }
            else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for(let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if(STValue !== 'All Service Type') {
                if(serviceType.ser_type === STValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }
            else if(STValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for(let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if(programTypeValue !== 'All Program Type') {
                if(programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            }
            else if(programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const stToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return stToPG;
    }

    const currentPTToPG = (PTValue) => {
        const selectedServiceStreamIds = [];
        for(let i = 0; i <serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if(serviceStreamValue !== 'All Service Stream') {
                if(serviceStream.ser_stream === serviceStreamValue){
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }
            else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for(let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if(serviceTypeValue !== 'All Service Type') {
                if(serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }
            else if(serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for(let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if(PTValue !== 'All Program Type') {
                if(programType.prgm_type === PTValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            }
            else if(PTValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const ptToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return ptToPG;
    }

    const currentPSToPG = () => {
        const selectedServiceStreamIds = [];
        for(let i = 0; i <serviceStreams.length; i++) {
            const serviceStream = serviceStreams[i];
            if(serviceStreamValue !== 'All Service Stream') {
                if(serviceStream.ser_stream === serviceStreamValue){
                    selectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }
            else {
                selectedServiceStreamIds.push(serviceStream.ser_stream_id);
            }
        }

        const selectedServiceTypeIds = [];
        for(let i = 0; i < serviceTypes.length; i++) {
            const serviceType = serviceTypes[i];
            if(serviceTypeValue !== 'All Service Type') {
                if(serviceType.ser_type === serviceTypeValue && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                }
            }
            else if(serviceTypeValue === 'All Service Type' && selectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
            }
        }

        const selectedProgramTypeIds = [];
        for(let i = 0; i < programTypes.length; i++) {
            const programType = programTypes[i];
            if(programTypeValue !== 'All Program Type') {
                if(programType.prgm_type === programTypeValue && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                    selectedProgramTypeIds.push(programType.prgm_type_id);
                }
            }
            else if(programTypeValue === 'All Program Type' && selectedServiceTypeIds.includes(programType.ser_type_id)) {
                selectedProgramTypeIds.push(programType.prgm_type_id);
            }
        }

        const psToPG = filteredPrograms.filter((program) => {
            return selectedProgramTypeIds.includes(program.prgm_type_id);
        })

        return psToPG;
    }
    

    //============================== Event Trigger Section ==================================

    // reset the filters
    const clear = () => {
        setServiceStreamValue ('All Service Stream');
        setServiceTypeValue('All Service Type');
        setProgramTypeValue('All Program Type');
        setProgramValue('All Program');
        setDivisionValue('All Divisions');
        setGroupValue('All Group');

        setFilteredServiceStreams(filteringServiceStreams(filteredPrograms));
        setFilteredServiceTypes(filteringServiceTypes(filteredPrograms));
        setFilteredProgramTypes(filteringProgramTypes(filteredPrograms));
        setLocalFilteredProgram(filteredPrograms);

        setFilteredDivisions(filteringDivisions(filteredPrograms));
        setFilteredGroups(filteringGroups(filteredPrograms));

        exportAdvanceFilteredPrograms(filteredPrograms);
        setAvailableSearchSites(filteredSites);
        exportAdvanceFilteredSites(filteredSites);
        
    }

    const onClickSite = (site) => {
        setClickedSite(site); 
        flyingToLocation(site.lat, site.lng);
        exportSite(site);

        if(site.geojson) {
            if(importRef.current) {
                const map = importRef.current.getMap();
                // if the route already exists on the map, we'll reset it using setData
                if (map.getSource('route')) {
                    map.getSource('route').setData(site.geojson);
                }
                // otherwise, we'll make a new request
                else {
                    map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: site.geojson
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'square',
                    },
                    paint: {
                        'line-color': '#A20066',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                    });
                }
            }
        }
    }

    const onChangeServiceStream = (e) => {

        setServiceStreamValue(e.target.value);
       

        const tmpDGFilteredProgram = currentDGToPG();
        const tmpPSFilteredProgram = currentSSToPG(e.target.value);

        if(e.target.value === 'All Service Stream') {


            const tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            const tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if(serviceTypeValue !== 'All Service Type') {

                const selectedServiceTypeIds = [];

                for (let i = 0; i < serviceTypes.length; i++) {
                  const serviceType = serviceTypes[i];
                  if (serviceType.ser_type === serviceTypeValue) {
                    selectedServiceTypeIds.push(serviceType.ser_type_id);
                  }
                }

                setFilteredProgramTypes(tmpFilteredProgramTypes.filter((programType)=> selectedServiceTypeIds.includes(programType.ser_type_id)));

            }

            if(serviceTypeValue === 'All Service Type') {

                setFilteredProgramTypes(tmpFilteredProgramTypes);
            }

           
            const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
            let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);


            if(divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if(tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);           
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });
    
                }
    
            }
            
            if(groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if(tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);

        }

        if(e.target.value !== 'All Service Stream') {


            const tmpSelectedServiceStreamIds = [];
            for (let i = 0; i < serviceStreams.length; i++) {
                const serviceStream = serviceStreams[i];
                if (serviceStream.ser_stream === e.target.value) {
                    tmpSelectedServiceStreamIds.push(serviceStream.ser_stream_id);
                }
            }

            const tmpFilteredServiceTypeIds = [];
            for (let i = 0; i < serviceTypes.length; i++) {
                const serviceType = serviceTypes[i];
                if (tmpSelectedServiceStreamIds.includes(serviceType.ser_stream_id)) {
                    tmpFilteredServiceTypeIds.push(serviceType.ser_type_id);
                }
            }

            const tmpFilteredProgramTypeIds = [];
            for (let i = 0; i < programTypes.length; i++) {
                const programType = programTypes[i];
                if (tmpFilteredServiceTypeIds.includes(programType.ser_type_id)) {
                    tmpFilteredProgramTypeIds.push(programType.prgm_type_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpFilteredProgramTypeIds.includes(program.prgm_type_id));

            const tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);

            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if(serviceTypeValue !== 'All Service Type')
            {
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if(tmpServiceType.length <= 0) {
                    setServiceTypeValue('All Service Type'); // IF THERE IS NO RESULT THEN SET IT TO ALL...
                }
                else { 
                    // NO RESULT FILGTERING THE PT
                    const tmpServiceTypeIds = tmpServiceType.map((serviceType) =>  serviceType.ser_type_id); 
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => tmpServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            if(programTypeValue !== 'All Program Type') // SETTING THE THE PT
            {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);
            setFilteredProgramTypes(tmpFilteredProgramTypes);

            // division and group

            // cannot set the division or group back to all since there are filtered... so no need to worry about all

            
            const tmpFilteredDivisions = filteringDivisions(tmpFilteredPrograms);
            let tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);


            if(divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if(tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);           
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });
    
                }
    
            }
            
            if(groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if(tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);
        }

    }

    const onChangeServiceType = (e) => {

        setServiceTypeValue(e.target.value);

        // checking for the division adn group first.... 

        // if divisions and group are exist then filtering program... 

        const tmpDGFilteredProgram = currentDGToPG();
        const tmpPSFilteredProgram = currentSTToPG(e.target.value);

        // else if division and group are not exist then 

        if(e.target.value === 'All Service Type') {

            //checking whether the division or group is selected...if selected the program should be additional filtered....

            if(serviceStreamValue === 'All Service Stream') {

                // setFilteredServiceStreams(filteringServiceStreams(tmpDGFilteredProgram));
                // setFilteredServiceTypes(filteringServiceTypes(tmpDGFilteredProgram));
                setFilteredProgramTypes(filteringProgramTypes(tmpDGFilteredProgram));
            }

            if(serviceStreamValue !== 'All Service Stream') {

                const serviceStreamIds = [];
                for (let i = 0; i < serviceStreams.length; i++) {
                    const serviceStream = serviceStreams[i];
                    if (serviceStream.ser_stream === serviceStreamValue) {
                        serviceStreamIds.push(serviceStream.ser_stream_id);
                    }
                }


                const tmpFilteredServiceTypes = serviceTypes.filter((serviceType) => serviceStreamIds.includes(serviceType.ser_stream_id));

                const serviceTypeIds = tmpFilteredServiceTypes.map((serviceType) => serviceType.ser_type_id);

                const tmpFilteredProgramTypes = programTypes.filter((programType) => serviceTypeIds.includes(programType.ser_type_id));

                const programTypeIds = tmpFilteredProgramTypes.map((programType) =>  programType.prgm_type_id);
    
                const tmpFilteredPrograms = tmpDGFilteredProgram.filter((program) => programTypeIds.includes(program.prgm_type_id));

                // setFilteredServiceTypes(filteringServiceTypes(tmpFilteredPrograms));
                setFilteredProgramTypes(filteringProgramTypes(tmpFilteredPrograms));
            }

            
            const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
            let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);

            if(divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if(tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);           
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });
    
                }
    
            }
            
            if(groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if(tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);
    
        }

        if(e.target.value !== 'All Service Type') {

            //change happen
            // the provided options should already be filtered by the division adn group
            // the service stream will need to change at here...
            // just need to set the reset of the program type & program
            // because the stream will only provided the available service type

            const selectedServiceTypeIds = [];
            for (let i = 0; i < serviceTypes.length; i++) {
              const serviceType = serviceTypes[i];
              if (serviceType.ser_type === e.target.value) {
                selectedServiceTypeIds.push(serviceType.ser_type_id);
              }
            }
            
            const tmpFilteredProgramTypeIds = [];
            for (let i = 0; i < programTypes.length; i++) {
              const programType = programTypes[i];
              if (selectedServiceTypeIds.includes(programType.ser_type_id)) {
                tmpFilteredProgramTypeIds.push(programType.prgm_type_id);
              }
            }
            

            const tmpFilteredPrograms = filteredPrograms.filter((program) => {
                return tmpFilteredProgramTypeIds.includes(program.prgm_type_id);
            })

            // setServiceStreams(filteringServiceStreams(tmpFilteredPrograms)); // more restriction...
            const tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if(programTypeValue !== 'All Program Type')
            {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);

            // need to check for both...

            const tmpFilteredDivisions = filteringDivisions(tmpFilteredPrograms);
            let tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);


            if(divisionValue !== 'All Divisions') {

                const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
                if(tmpDivision.length <= 0) {
                    setDivisionValue('All Divisions');
                } else {
                    const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);           
                    tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                        return tmpSelectedDivisionIds.includes(group.division_id);
                    });
    
                }
    
            }
            
            if(groupValue !== 'All Group') {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if(tmpGroup.length <= 0) {
                    setGroupValue('All Group');
                }
            }

            setFilteredDivisions(tmpFilteredDivisions);
            setFilteredGroups(tmpFilteredGroups);

        }

    }

    const onChangeProgramType = (e) => {

        setProgramTypeValue(e.target.value);

        const tmpPSFilteredProgram = currentPTToPG(e.target.value);

        
        const tmpFilteredDivisions = filteringDivisions(tmpPSFilteredProgram);
        let tmpFilteredGroups = filteringGroups(tmpPSFilteredProgram);


        if(divisionValue !== 'All Divisions') {

            const tmpDivision = tmpFilteredDivisions.filter((division) => division.division_name === divisionValue);
            if(tmpDivision.length <= 0) {
                setDivisionValue('All Divisions');
            } else {
                const tmpSelectedDivisionIds = tmpDivision.map((division) => division.division_id);           
                tmpFilteredGroups = tmpFilteredGroups.filter((group) => {
                    return tmpSelectedDivisionIds.includes(group.division_id);
                });

            }

        }
        
        if(groupValue !== 'All Group') {
            const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
            if(tmpGroup.length <= 0) {
                setGroupValue('All Group');
            }
        }

        setFilteredDivisions(tmpFilteredDivisions);
        setFilteredGroups(tmpFilteredGroups);
    }

    const onChangeProgram = (e) => {
        setProgramValue(e.target.value);
    }

    const onChangeDivision = (e) => {

        setDivisionValue(e.target.value);

        // need to use both use the data of the upper table to set division and group
        // use the data that seted on the down table to set the upper table (program type and ....)

        const tmpPSFilteredProgram = currentPSToPG();
        const tmpDGFilteredProgram = currentDToPG(e.target.value);

        if(e.target.value === 'All Divisions') {
            const tmpFilteringGroups = filteringGroups(tmpPSFilteredProgram);
            setFilteredGroups(tmpFilteringGroups);

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpDGFilteredProgram);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            if(serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if(tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if(serviceTypeValue !== 'All Service Type' ){
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if(tmpServiceType.length <=0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if(programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);

        }

        if(e.target.value !== 'All Divisions') {
            
            const tmpSelectedDivisionIds = [];
            for(let i = 0; i < divisions.length; i++) {
                const division = divisions[i];
                if(division.division_name === e.target.value) {
                    tmpSelectedDivisionIds.push(division.division_id); 
                }   
            }

            const tmpSelectedGroupIds = [];
            for(let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if(tmpSelectedDivisionIds.includes(group.division_id))  {
                    tmpSelectedGroupIds.push(group.group_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpSelectedGroupIds.includes(program.group_id));

            const tmpFilteredGroups = filteringGroups(tmpFilteredPrograms);

            if(groupValue === 'All Group' ) {
                const tmpGroup = tmpFilteredGroups.filter((group) => group.group_name === groupValue);
                if(tmpGroup.length <= 0) { 
                    setGroupValue('All Group');
                }
            }

            setFilteredGroups(tmpFilteredGroups);

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpFilteredPrograms);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if(serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if(tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if(serviceTypeValue !== 'All Service Type' ){
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if(tmpServiceType.length <=0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if(programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);
        }
    };

    const onChangeGroup = (e) => {

        setGroupValue(e.target.value);

        const tmpDGFilteredProgram = currentGToPG(e.target.value);

        if(e.target.value === 'All Group') {

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpDGFilteredProgram);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpDGFilteredProgram);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpDGFilteredProgram);

            if(serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if(tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if(serviceTypeValue !== 'All Service Type' ){
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if(tmpServiceType.length <=0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if(programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);
        }

        if(e.target.value !== 'All Group') {


            const tmpSelectedGroupIds = [];
            for(let i = 0; i < groups.length; i++) {
                const group = groups[i];
                if(group.group_name === e.target.value)  {
                    tmpSelectedGroupIds.push(group.group_id);
                }
            }

            const tmpFilteredPrograms = filteredPrograms.filter((program) => tmpSelectedGroupIds.includes(program.group_id));

            const tmpFilteredServiceStreams = filteringServiceStreams(tmpFilteredPrograms);
            let tmpFilteredServiceTypes = filteringServiceTypes(tmpFilteredPrograms);
            let tmpFilteredProgramTypes = filteringProgramTypes(tmpFilteredPrograms);

            if(serviceStreamValue !== 'All Service Stream') {

                const tmpServiceStream = tmpFilteredServiceStreams.filter((serviceStream) => serviceStream.ser_stream === serviceStreamValue)
                if(tmpServiceStream.length <= 0) {
                    setServiceStreamValue('All Service Stream');
                } else {
                    const selectedServiceStreamIds = tmpServiceStream.map((serviceStream) => serviceStream.ser_stream_id);
                    tmpFilteredServiceTypes = tmpFilteredServiceTypes.filter((serviceType) => selectedServiceStreamIds.includes(serviceType.ser_stream_id));
                }
            }

            setFilteredServiceStreams(tmpFilteredServiceStreams);

            if(serviceTypeValue !== 'All Service Type' ){
                const tmpServiceType = tmpFilteredServiceTypes.filter((serviceType) => serviceType.ser_type === serviceTypeValue);
                if(tmpServiceType.length <=0) {
                    setServiceTypeValue('All Service Type');
                } else {
                    const selectedServiceTypeIds = tmpServiceType.map((serviceType) => serviceType.ser_type_id);
                    tmpFilteredProgramTypes = tmpFilteredProgramTypes.filter((programType) => selectedServiceTypeIds.includes(programType.ser_type_id));
                }
            }

            setFilteredServiceTypes(tmpFilteredServiceTypes);

            if(programTypeValue !== 'All Program Type') {
                const tmpProgramType = tmpFilteredProgramTypes.filter((programType) => programType.prgm_type === programTypeValue);
                if(tmpProgramType.length <= 0) {
                    setProgramTypeValue('All Program Type');
                }
            }

            setFilteredProgramTypes(tmpFilteredProgramTypes);



        }

    }

      
    const onChangeDepartureAddress = (e, v) => {
        e.preventDefault();

        if(v) {
            setTmpAddressValue(v);
        }
        else {
            setTmpAddressValue("");
        }

        const addressDetail = suggestAddressOptions.filter((address) => address.address === v);

        if(addressDetail.length > 0) {
            setRoutingAddressValue(addressDetail[0]);
        }
        else {
            setRoutingAddressValue({});
        }

    };

    const onInputDepartureValue = debounce((e, v) => {
        let value = v;
        if(!value) {
            value = null;
        }
        setOnChangeAddressValue(value);
    }, 500)

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

    //============================Apply Filter====================================
    const applyingFilter = () => {

        let tmpAdvancedFilteredPrograms = advancedFilteredPrograms;

        if(programValue !== 'All Program') {
            tmpAdvancedFilteredPrograms = tmpAdvancedFilteredPrograms.filter((program) => program.program_nme === programValue);
        }

        const sitesIds = [];
        for(let i = 0; i < tmpAdvancedFilteredPrograms.length; i++) {
            sitesIds.push(tmpAdvancedFilteredPrograms[i].site_id);
        }

        const tmpAdvanceFilteredSites = filteredSites.filter((site) => sitesIds.includes(site.site_id));

        
        exportAdvanceFilteredPrograms(tmpAdvancedFilteredPrograms);
        setAvailableSearchSites(tmpAdvanceFilteredSites);
        exportAdvanceFilteredSites(tmpAdvanceFilteredSites);
    

    }

    const collapseRequest = () => {
        setIsCollapse(!isCollapse);
    }

    //=============================Render of the Options===================================
    const renderOptions = (option) => {
        return (
            <OptionContainer {...option} className=''>
                <OptionIcon>
                    <img src={require('../../images/optionMarker.png')} style= {{width: "35px", height: "auto"}} alt="Marker Icon" />
                </OptionIcon>
                <OptionDetail>
                    <OptionP>{option.key}</OptionP>
                </OptionDetail>
            </OptionContainer>
        )
    }



    return (
         <MapFilterContainer>
            <FilterContainer>
                <LabelContainer>
                    <InputLabel style={textStyle}>Map Filter</InputLabel>
                </LabelContainer>
                <ProgramDropDownContainer>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Service Stream</InputLabel>
                        <ServiceStreamDropdown></ServiceStreamDropdown>
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Service Type</InputLabel>
                        <ServiceTypeDropdown></ServiceTypeDropdown>
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program Type</InputLabel>
                        <ProgramTypeDropdown></ProgramTypeDropdown>
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program</InputLabel>
                        <ProgramDropdown></ProgramDropdown>
                    </SelectDiv>
                </ProgramDropDownContainer>

                <BreakingLine></BreakingLine>

                <GroupDropDownContainer>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}} >Division</InputLabel>
                        <DivisionDropdown></DivisionDropdown>
                    </SelectDiv> 
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Group</InputLabel>
                        <GroupDropdown></GroupDropdown>
                    </SelectDiv> 
                </GroupDropDownContainer>
                <ButtonContainer>
                    <ApplyButton onClick={applyingFilter}>
                        <SendIcon style= {{fontSize: '16px', marginRight: '5px'}}></SendIcon>
                        <ButtonLabel>Apply Filter</ButtonLabel>
                    </ApplyButton>
                    <ResetButton onClick={clear}>
                        <ClearIcon style= {{fontSize: '16px', marginRight: '5px', color: '#A20066' }}></ClearIcon>
                        <ButtonLabel style={{color: '#A20066'}}>Clear</ButtonLabel>
                    </ResetButton>
                </ButtonContainer>
            </FilterContainer>
            <ResultContainer style={{width: isCollapse ? '0' : 'auto', overflow: isCollapse ? 'hidden' : '', display: isCollapse ? 'none' : ''}}>
                <LabelContainer>
                    <InputLabel style={textStyle}>Available Sites</InputLabel>
                </LabelContainer>
                <SearchContainer>
                    <SearchInputContainer>
                        <InputLabel style={{fontSize: '16px'}}>Search Address</InputLabel>
                        {
                            (addressIsLoading) ? 

                            <div>
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={textFieldStyle} height={35} />
                                </SkeletonTheme>
                            </div>

                            :

                            <Autocomplete
                                disablePortal
                                id="departureAddress"
                                className=''
                                options={suggestAddressOptions.map((address) => address.address)}
                                onChange={onChangeDepartureAddress}
                                isOptionEqualToValue={(option, value) => {if(value === "") {return false;} else { return (option === value);}}}
                                onInputChange={onInputDepartureValue}
                                value={tmpAddressValue}
                                style={textFieldStyle}
                                popupIcon={ <SearchIcon />}
                                sx={{
                                    "& .MuiAutocomplete-popupIndicator": { transform: "none", pointerEvents: "none"}, 
                                    "& .MuiAutocomplete-paper": { overflowX: "hidden"}
                                    }}
                                size='small'
                                selectOnFocus
                                clearOnBlur
                                forcePopupIcon 
                                renderInput={(params) => <TextField {...params} placeholder='E.g., Harris Street' sx={searchTextFieldStyle}/>}
                                renderOption={renderOptions}
                            />
                        }
                    </SearchInputContainer>
                    <BreakingLine2></BreakingLine2>
                    <SearchInputContainer>
                        <InputLabel style={{fontSize: '16px'}}>Search Uniting Sites</InputLabel>
                        {
                            (addressIsLoading) ? 

                            <div>
                                <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                    <Skeleton style={textFieldStyle} height={35} />
                                </SkeletonTheme>
                            </div>
                            :
                            <TextField sx={{...searchTextFieldStyle, ...textFieldStyle}} id="searchSite" size='small' placeholder='E.g., Harris Street' onChange={onChangeSiteSearch} 
                                InputProps={{
                                    endAdornment : (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            ></TextField>
                        }
                        
                    </SearchInputContainer>
                </SearchContainer>
                <SitesContainer style={addressIsLoading ? { flex:'1', justifyContent: 'center', alignItems: 'center' } : {}}>
                    <List sx={listStyle}>
                    {
                        (addressIsLoading) ? 
                        <ReactLoading type={'spin'} color={'#A20066'} height={80} width={60}></ReactLoading> 
                        : 
                        <AvailableSites></AvailableSites>
                    }
                    </List>
                </SitesContainer>      
            </ResultContainer>
            <CollapseButtonContainer>
                <CollapseButton 
                    onClick={collapseRequest}
                >
                    <ArrowBackIosNewIcon style={{padding: '0', margin: '0', color: 'white', transform: isCollapse? 'rotate(180deg)' : ''}}></ArrowBackIosNewIcon>
                </CollapseButton>
            </CollapseButtonContainer>
        
        </MapFilterContainer>


       
    )
}

export default MapFilter;