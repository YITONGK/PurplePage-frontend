import axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import { MapFilterContainer, FilterContainer, SelectDiv, ButtonContainer, ResultContainer, SearchContainer, SitesContainer, SiteOption, ProgramDropDownContainer, GroupDropDownContainer, BreakingLine, SearchInputContainer, BreakingLine2, LabelContainer, CollapseButtonContainer, CollapseButton, ApplyButton, ResetButton, ButtonLabel} from './MapFilterElements';
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

import CardTravelIcon from '@mui/icons-material/CardTravel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import { Clear } from '@mui/icons-material';

const MapFilter = ({filteredPrograms, filteredSites, programTypeList, groupList, serviceStreamList, serviceTypeList, divisionList ,exportAdvanceFilteredSites, importRef, exportSite, exportAdvanceFilteredPrograms}) => {


    const [serviceStreamValue, setServiceStreamValue] = useState('');
    const [serviceTypeValue, setServiceTypeValue] = useState('');
    const [programTypeValue, setProgramTypeValue] = useState('');
    const [programNameValue, setProgramNameValue] = useState('');

    const [divisionValue, setDivisionValue] = useState('');
    const [groupValue, setGroupValue] = useState('');

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
    const [isCollapse, setIsCollapse] = useState(false);

    const dropDownStyle = { minWidth: '13vw', maxWidth: '13vw', fontSize: '14px'};

    const ApplyButtonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "#A20066", width: 'fit-content'};
    const ResetButtonStyle = { textTransform: "none", color: "#FFF", backgroundColor: "transparent", border: '1px solid #A20066',width: 'fit-content'};
    const textFieldStyle = { minWidth: "16vw", fontSize: '15px', borderRadius: '5px'};
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

    useEffect(() => {
        if (serviceStreamList && serviceStreamList.length > 0) {
            setServiceStreams(serviceStreamList);
        }
        
        if (serviceTypeList && serviceTypeList.length > 0) {
            setServiceTypes(serviceTypeList);
        }
        
        if (divisionList && divisionList.length > 0) {
            setDivisions(divisionList);
        }
        
    }, [serviceStreamList, serviceTypeList, divisionList]);

    useEffect(() => {

        if(serviceStreams.length > 0 && serviceTypes.length > 0 && divisions.length > 0) {
            setIsLoading(false);
        }

    }, [serviceStreams, serviceTypes, divisions])

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
                            title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</Typography>} 
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

    const collapseRequest = () => {
        setIsCollapse(!isCollapse);
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
                        <ServiceStreamDropdown></ServiceStreamDropdown>
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program Type</InputLabel>
                        <ServiceStreamDropdown></ServiceStreamDropdown>
                    </SelectDiv>
                    <SelectDiv>
                        <InputLabel style={{fontSize: '16px'}}>Program</InputLabel>
                        <ServiceStreamDropdown></ServiceStreamDropdown>
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
                        <DivisionDropdown></DivisionDropdown>
                    </SelectDiv> 
                </GroupDropDownContainer>
                <ButtonContainer>
                    <ApplyButton onClick={applyingFilter}>
                        <SendIcon style= {{fontSize: '16px', marginRight: '5px'}}></SendIcon>
                        <ButtonLabel>Apply Filter</ButtonLabel>
                    </ApplyButton>
                    <ResetButton>
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
                        <InputLabel style={{fontSize: '16px'}}>Routing Address</InputLabel>
                        <OutlinedInput style={textFieldStyle} size='small' placeholder='Customer Address...'
                            startAdornment= {
                                <InputAdornment position="start">
                                    <CardTravelIcon></CardTravelIcon>
                                </InputAdornment>
                            }
                        ></OutlinedInput>
                    </SearchInputContainer>
                    <BreakingLine2></BreakingLine2>
                    <SearchInputContainer>
                        <InputLabel style={{fontSize: '16px'}}>Search</InputLabel>
                        <OutlinedInput style={textFieldStyle} size='small' placeholder='Search Sites...' onChange={onChangeSiteSearch}
                            startAdornment= {
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        ></OutlinedInput>
                    </SearchInputContainer>
                </SearchContainer>
                <SitesContainer>
                    <List sx={listStyle}>
                        <AvailableSites></AvailableSites>
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