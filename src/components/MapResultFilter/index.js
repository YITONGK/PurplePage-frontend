import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
    BreakingLine2,
    LabelContainer, MapFilterRowContainer,
    TitleH1,
    OptionContainer,
    OptionDetail,
    OptionIcon,
    OptionP,
    ResultContainer,
    SearchContainer,
    SearchInputContainer,
    SiteOption,
    SiteOptionRoutingContainer,
    SitesContainer,
    OriginalToolTips,
    ClickedToolTips,
    SearchAutocomplete,
    SearchTextField,
    SMSitesContainer,
    AnimatedModalContent,
    SiteCardContainer,
    SiteCardHeader,
    SiteCardHeaderLeft,
    SiteCardHeaderRight,
    SitePopupMapContainer,
    SitePopupContentContainer,
    SiteInfoDetailContainer,
    SiteInfoH2,
    SiteInfoP2,
    SiteInfoP,
    SiteInfoDetailRowContainer,
    ListItemButton,
    OfferedProgramsContainer,
    AnimatedModalContent2,

} from "./MapResultFilterElements";
import InputLabel from "@mui/material/InputLabel";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ReactLoading from "react-loading";
import {debounce} from "@mui/material/utils";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Map from '../Map';
import {
    CustomClearIcon,
    ProgramCardHeader,
    ProgramCardHeaderLeft,
    ProgramCardHeaderRight
} from "../MapInfo/MapInfoElements";
import Button from "@mui/material/Button";
import mapboxgl from "mapbox-gl";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import List from "@mui/material/List";
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import CodeIcon from '@mui/icons-material/Code';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoIcon from '@mui/icons-material/Info';



const MapResultFilter = ({importRef,importSite ,exportSite, exportDepartureAddress, advanceFilteredSites, departureLocation, advanceFilteredPrograms}) => {

    // Variable Declaration
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
    const mapRef = useRef();

    const textFieldStyle = {
        minWidth: "16vw",
        fontSize: '15px',
        borderRadius: '5px'
    };

    const textStyle = { fontSize: '24px', fontWeight: 'bold', color: '#A20066'};
    const toolTipsStyle = {backgroundColor: 'white',  color: 'rgba(0, 0, 0, 0.87)', minWidth: '13vw', maxWidth: '13vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};
    const toolTipsStyleClicked = {backgroundColor: '#A20066',  color: 'white', minWidth: '13vw', maxWidth: '13vw', fontSize: '12rem', border: '1px solid #A20066', borderRadius: '15px', paddingLeft: '0.5rem', paddingRight: '0.5rem'};
    const captionStyle = {
        margin: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    const listStyle = { marginTop: '0'};
    const searchTextFieldStyle = {
        '& .MuiOutlinedInput-root': {
            minWidth: '14vw',
            maxWidth: '14vw',
            '& .MuiOutlinedInput-input' : {
                fontSize: '15px'
            },
            '& fieldset': {
                border: '0.5px solid grey',
                borderRadius: '5px',
            },
            '&.Mui-focused fieldset': {
                borderColor: "#A20066", // Change the outline color on focus to black
            },
        },
    };

    const [availableSearchSites, setAvailableSearchSites] = useState([]);

    const [addressIsLoading, setAddressIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tmpAddressValue, setTmpAddressValue] = useState(null);
    const [onChangeAddressValue, setOnChangeAddressValue] = useState('');
    const [suggestAddressOptions, setSuggestAddressOptions] = useState([]);

    const [routingAddressValue, setRoutingAddressValue] = useState({});

    const [clickedSite, setClickedSite] = useState(null);
    const [clickedProgram, setClickedProgram] = useState(null);

    const [popUpSite, setPopUpSite] = useState(false);
    const [popUpProgram, setPopUpProgram] = useState(false);
    const [popUpMapCenter, setPopUpMapCenter] = useState(null);

    useEffect(() => {

        if(advanceFilteredSites && advanceFilteredSites.length > 0 && !advanceFilteredSites[0].distance) {
            setTmpAddressValue("");
        }

        setAvailableSearchSites(advanceFilteredSites);

        setAddressIsLoading(false);
        setClickedSite(null);
    },[advanceFilteredSites])



    // Geting the relevant address drop down base on the user current address
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

    // Getting the map routing and distance from Article
    useEffect(()=> {
        if(routingAddressValue.address && tmpAddressValue === routingAddressValue.address) {
            exportDepartureAddress(routingAddressValue);
            setAddressIsLoading(true);
        }
        else {
            exportDepartureAddress(null);
        }

    }, [routingAddressValue]);

    // Zoom to the current user location after getting they current address
    useEffect(() => {

        if(addressIsLoading) return;

        if(routingAddressValue && routingAddressValue.lat && routingAddressValue.lng) {

            flyingToLocation(routingAddressValue.lat, routingAddressValue.lng);
        }

    },[addressIsLoading]);

    // Setting the clicked site
    useEffect(() => {
        if(importSite && importSite.site_id){
            if(clickedSite && clickedSite.site_id === importSite.site_id){
                return;
            }
            setClickedSite(importSite);
        }
    },[importSite]);



    const onInputDepartureValue = debounce((e, v) => {
        let value = v;
        if(!value) {
            value = null;
        }
        setOnChangeAddressValue(value);
    }, 500)

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

    const flyingToLocation = (lat, lng) => {
        if(importRef.current) {
            importRef.current.getMap().flyTo({ center: [lng, lat], zoom: 16, essential: true });
        }
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

    const smOnClickSite = (site) => {
        setClickedSite(site);
        setPopUpSite(true);

        const bounds = new mapboxgl.LngLatBounds();

        bounds.extend(new mapboxgl.LngLat(site.lng, site.lat));

        if(departureLocation) {
            bounds.extend(new mapboxgl.LngLat(departureLocation.lng, departureLocation.lat));
        }

        setPopUpMapCenter(bounds.getCenter());
        document.body.style.overflow = 'hidden';

    }

    const smOnClickProgram = (program) => {
        setClickedProgram(program);
        setPopUpProgram(true);
    }

    const closeSiteModal = () => {
        setClickedSite(null);
        setPopUpSite(false);
        document.body.style.overflow = 'auto';
    }

    const closeProgramModal = () => {
        setPopUpProgram(false);
        setClickedProgram(null);
    }

    const stringFilterPrefix = (string) => {

        if(!string) return 'None';

        // Extract the local part of the email (before '@')
        const localPart = string.split('@')[0];

        // Replace all '.' with spaces in the local part
        const result = localPart.replace(/\./g, ' ');

        return result.trim(); // trim() to remove any leading/trailing spaces
    }

    const stringShiftingLength = (value, stringMaxLength1, stringMaxLength2) => {

        const maxLength = Math.max(stringMaxLength1.length, stringMaxLength2.length);
        return value.padEnd(maxLength, '\u00A0');
    }


    const AvailableSites = () => {
        return (
            availableSearchSites && availableSearchSites.map((site, index) => {
                return (
                    <ListItem key={index}>
                        {
                            (clickedSite && site.site_id === clickedSite.site_id)?

                            <ClickedToolTips
                                title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>
                                    {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                        `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                    }
                                </Typography>}
                            >
                                <SiteOption onClick={(e) => { e.preventDefault(); onClickSite(site); }}>
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
                                    <Typography variant='caption' style={captionStyle}>
                                        {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                            `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                        }
                                    </Typography>
                                </SiteOption>
                            </ClickedToolTips>

                            :

                            <OriginalToolTips
                                title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>
                                {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                    `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                }
                            </Typography>}
                                >
                                <SiteOption onClick={(e) => { e.preventDefault(); onClickSite(site); }}>
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
                                    <Typography variant='caption' style={captionStyle}>
                                        {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                            `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                        }
                                    </Typography>
                                </SiteOption>
                            </OriginalToolTips>
                        }
                    </ListItem>
                )
            })
        )
    }

    const SMAvailableSites = () => {
        return (
            availableSearchSites && availableSearchSites.map((site, index) => {
                return (
                    <ListItem key={index}>
                        {
                            (clickedSite && site.site_id === clickedSite.site_id)?

                                <ClickedToolTips
                                    title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>
                                        {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                            `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                        }
                                    </Typography>}
                                >
                                    <SiteOption onClick={(e) => { e.preventDefault(); smOnClickSite(site); }}>
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
                                        <Typography variant='caption' style={captionStyle}>
                                            {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                                `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                            }
                                        </Typography>
                                    </SiteOption>
                                </ClickedToolTips>

                                :

                                <OriginalToolTips
                                    title= {<Typography variant= 'body2' color="inherit" style= {{zIndex: 0}}>
                                        {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                            `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                        }
                                    </Typography>}
                                >
                                    <SiteOption onClick={(e) => { e.preventDefault(); smOnClickSite(site); }}>
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
                                        <Typography variant='caption' style={captionStyle}>
                                            {site.street_nbr && site.street_name && site.suburb && site.state && site.postcode ?
                                                `${site.street_nbr} ${site.street_name}, ${site.suburb}, ${site.state}, ${site.postcode}` : 'None'
                                            }
                                        </Typography>
                                    </SiteOption>
                                </OriginalToolTips>
                        }
                    </ListItem>
                )
            })
        )
    }

    const programNameProcess = (program_nme) => {
        let nameString = program_nme.split('-');
        if (nameString.length > 1) {
            return (
                <>
                    {nameString.map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < nameString.length - 1 && <>-<br/></>}
                        </React.Fragment>
                    ))}
                </>
            );
        } else {
            return program_nme;
        }
    }


    const OfferedPrograms = ({relatedPrograms}) => {

        return (
            <OfferedProgramsContainer>
                {
                    (relatedPrograms && relatedPrograms.length > 0) ?
                        relatedPrograms.map((program, index) =>{
                            return (
                                <React.Fragment key={index}>
                                    <ListItemButton key={index} onClick= {() => smOnClickProgram(program)} >
                                        <ListItemText primary= {programNameProcess(program.program_nme)}/>
                                        <ExpandMore style={{transform: 'rotate(-90deg)'}}></ExpandMore>
                                    </ListItemButton>
                                </React.Fragment>

                            )
                        })
                        :
                        <React.Fragment>
                            <ListItemButton>
                                <ListItemText primary= {'No Program'}/>
                            </ListItemButton>
                        </React.Fragment>

                }
            </OfferedProgramsContainer>
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

        const pattern = new RegExp(inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'); // pattern to search more accurately
        const filterSearchSite = availableSearchSites.filter((site) => {
            const fullAddress = `${site.site_id} ${site.street_nbr} ${site.street_name} ${site.suburb} ${site.state} ${site.postcode}`;
            return pattern.test(fullAddress);
        })

        setAvailableSearchSites(filterSearchSite);

    },300);

    const filterProgramBasedOnSite = (site) => {

        if(advanceFilteredPrograms && site) {

            const tmpFilteredProgram = advanceFilteredPrograms.filter((program) => {
                return program.site_id === site.site_id ;
            })

            const distinctProgram = tmpFilteredProgram.filter((program, index, self) => {
                return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
            });

            if (distinctProgram[0] && distinctProgram[0].program_nme !== null) {
                distinctProgram.sort((a, b) => {
                    if (a.program_nme === null && b.program_nme === null) return 0; // both are null, they are equal
                    if (a.program_nme === null) return -1; // a comes first
                    if (b.program_nme === null) return 1;  // b comes first
                    return a.program_nme.localeCompare(b.program_nme);
                });
            }

            return distinctProgram;
        }

    }


    return (
        <MapFilterRowContainer>
            <ResultContainer>
                <LabelContainer>
                    <TitleH1>Available Sites</TitleH1>
                </LabelContainer>
                <SearchContainer>
                    <InputLabel style={{fontSize: '16px'}}>Search Address</InputLabel>
                    <SearchInputContainer>
                        {
                            (addressIsLoading || isLoading)?
                            // (true)?
                                <div>
                                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                        <Skeleton style={{width: '14vw'}} height={35} />
                                    </SkeletonTheme>
                                </div>

                                :

                                <SearchAutocomplete
                                    disablePortal
                                    id="departureAddress"
                                    className=''
                                    options={suggestAddressOptions.map((address) => address.address)}
                                    onChange={onChangeDepartureAddress}
                                    isOptionEqualToValue={(option, value) => {if(value === "") {return false;} else { return (option === value);}}}
                                    onInputChange={onInputDepartureValue}
                                    value={tmpAddressValue}
                                    popupIcon={ <SearchIcon />}
                                    sx={{
                                        "& .MuiAutocomplete-popupIndicator": { transform: "none", pointerEvents: "none"},
                                        "& .MuiAutocomplete-paper": { overflowX: "hidden"}
                                    }}
                                    size='small'
                                    selectOnFocus
                                    clearOnBlur
                                    forcePopupIcon
                                    renderInput={(params) => <SearchTextField {...params} size='small' placeholder='E.g., Your Current Address'/>}
                                    renderOption={renderOptions}
                                />
                        }
                    </SearchInputContainer>
                    <BreakingLine2></BreakingLine2>
                    <InputLabel style={{fontSize: '16px'}}>Search Uniting Sites</InputLabel>
                    <SearchInputContainer>
                        {
                            (addressIsLoading || isLoading)?
                            // (true)?
                                <div>
                                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                        <Skeleton style={{width: '14vw'}} height={35} />
                                    </SkeletonTheme>
                                </div>
                                :
                                <SearchTextField id="searchSite" size='small' placeholder='E.g., Harris Street' onChange={onChangeSiteSearch}
                                           InputProps={{
                                               endAdornment : (
                                                   <InputAdornment position="end">
                                                       <SearchIcon />
                                                   </InputAdornment>
                                               )
                                           }}
                                ></SearchTextField>
                        }

                    </SearchInputContainer>
                </SearchContainer>
                <SitesContainer style={ addressIsLoading || isLoading ? { flex:'1', justifyContent: 'center', alignItems: 'center', width: '100%' } : {}}>
                    <List sx={listStyle}>
                        {
                            (addressIsLoading || isLoading)?
                            // (true) ?
                                <ReactLoading type={'spin'} color={'#A20066'} height={80} width={60}></ReactLoading>
                                :
                                <AvailableSites></AvailableSites>
                        }
                    </List>
                </SitesContainer>

                <SMSitesContainer style={ addressIsLoading || isLoading ? { flex:'1', justifyContent: 'center', alignItems: 'center', width: '100%' } : {}}>
                    <List sx={listStyle}>
                        {
                            (addressIsLoading || isLoading)?
                                // (true) ?
                                <ReactLoading type={'spin'} color={'#A20066'} height={80} width={60}></ReactLoading>
                                :
                                <SMAvailableSites></SMAvailableSites>
                        }
                    </List>
                </SMSitesContainer>
            </ResultContainer>

            {
                (clickedSite) ?
                <AnimatedModalContent
                    appElement={document.getElementById('root')}
                    isOpen={popUpSite}
                    contentLabel="Site Information Modal"
                    style={{
                        content: {
                            width: '90vw', // Set the desired width
                            height: 'fit-content', // Set the desired height
                            maxHeight: '80vh',
                            margin: 'auto', // Center the modal horizontally
                            borderRadius: '15px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        },
                    }}
                >
                    <SiteCardContainer>
                        <SiteCardHeader>
                            <SiteCardHeaderLeft>
                                <h2 style={{margin: '0', padding: '0', color: 'white'}}>Site Info</h2>
                            </SiteCardHeaderLeft>
                            <SiteCardHeaderRight>
                                <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeSiteModal}>
                                    <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                                </Button>
                            </SiteCardHeaderRight>
                        </SiteCardHeader>
                        <SitePopupContentContainer>

                            <SiteInfoH2 style={{alignSelf:"center"}}>Site ID - {stringFilterPrefix(clickedSite.site_id)}</SiteInfoH2>

                            <SitePopupMapContainer>
                                <Map sites={[clickedSite]} exportRef={mapRef} departureLocation={departureLocation} mapWidth={90} mapHeight={30} centerLng={(popUpMapCenter) ? popUpMapCenter.lng : 0} centerLat={(popUpMapCenter) ? popUpMapCenter.lat : 0}></Map>
                            </SitePopupMapContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Address: </SiteInfoP>
                                <SiteInfoP2>
                                    {clickedSite.street_nbr && clickedSite.street_name && clickedSite.suburb && clickedSite.state && clickedSite.postcode ? (
                                        <>
                                            {clickedSite.street_nbr} {clickedSite.street_name},
                                            {clickedSite.suburb},
                                            {clickedSite.state} {clickedSite.postcode}
                                        </>
                                    ) : (
                                        'None'
                                    )}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Hours: </SiteInfoP>
                                <SiteInfoDetailRowContainer>
                                    <AccessTimeIcon></AccessTimeIcon>
                                    <SiteInfoP2>
                                        Opens {(stringFilterPrefix(clickedSite.site_open) === 'None') ? 'TBA' : stringFilterPrefix(clickedSite.site_open)}
                                        - {(stringFilterPrefix(clickedSite.site_close) === 'None') ? 'TBA' : stringFilterPrefix(clickedSite.site_close)}
                                    </SiteInfoP2>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>


                            <SiteInfoDetailContainer>
                                <SiteInfoP>Contact Name: </SiteInfoP>
                                <SiteInfoP2>
                                    {stringFilterPrefix(clickedSite.site_contact_name)}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Contact Number: </SiteInfoP>
                                <SiteInfoP2>
                                    {stringFilterPrefix(clickedSite.site_contact_nbr)}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Accessibility: </SiteInfoP>
                                <SiteInfoP2>
                                    {(clickedSite.accessibility && clickedSite.accessibility.length > 0)
                                        ? clickedSite.accessibility.map(site => site.accessibility).join(', ')
                                        : 'None'}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Offered Programs: </SiteInfoP>
                                <List>
                                    <OfferedPrograms relatedPrograms={filterProgramBasedOnSite(clickedSite)}></OfferedPrograms>

                                </List>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Local Government Area: </SiteInfoP>
                                <SiteInfoP2>
                                    {stringFilterPrefix(clickedSite.lga)}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoP>Department of Families, <br/>Fairness and Housing: </SiteInfoP>
                                <SiteInfoP2>
                                    {stringFilterPrefix(clickedSite.dffh_area)}
                                </SiteInfoP2>
                            </SiteInfoDetailContainer>

                        </SitePopupContentContainer>

                    </SiteCardContainer>
                </AnimatedModalContent> : <></>

            }
            {

                // Program Side
                (clickedProgram) ?

                <AnimatedModalContent2
                    appElement={document.getElementById('root')}
                    isOpen={popUpProgram}
                    contentLabel="Program Information Modal"
                    style={{
                        content: {
                            width: '90vw', // Set the desired width
                            height: 'fit-content', // Set the desired height
                            maxHeight: '60vh',
                            margin: 'auto', // Center the modal horizontally
                            borderRadius: '15px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        },
                    }}
                >
                    <SiteCardContainer>
                        <SiteCardHeader>
                            <SiteCardHeaderLeft>
                                <h2 style={{margin: '0', padding: '0', color: 'white'}}>Program Info</h2>
                            </SiteCardHeaderLeft>
                            <SiteCardHeaderRight>
                                <Button style={{minWidth: 'unset', background: 'none', border: 'none', cursor: 'pointer'}}  disableRipple onClick={closeProgramModal}>
                                    <CustomClearIcon style={{ fontSize: '30px'}}></CustomClearIcon>
                                </Button>
                            </SiteCardHeaderRight>
                        </SiteCardHeader>

                        <SitePopupContentContainer>

                            <SiteInfoH2 style={{alignSelf:"center"}}>Program ID - {stringFilterPrefix(clickedProgram.title)}</SiteInfoH2>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <CodeIcon style={{fontSize: '40px', margin: '0'}}></CodeIcon>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Program Name: </SiteInfoP>
                                        <SiteInfoP2>
                                            {stringFilterPrefix(clickedProgram.program_nme)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <DescriptionIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Program Description: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.service_desc)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Program Manager: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.prgm_mgr)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <CallIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Program Contact: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.prgm_cont_no)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>General Manager: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.gm)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Executive Officer: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.eo)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <CategoryIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Program Type: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {stringFilterPrefix(clickedProgram.prgm_type)}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <VpnKeyIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Access Type: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {(clickedProgram.at && clickedProgram.at.length > 0)
                                                ? clickedProgram.at.map(program => program.at).join(', ')
                                                : 'None'}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                            <SiteInfoDetailContainer>
                                <SiteInfoDetailRowContainer>
                                    <LocalShippingIcon style={{fontSize: '40px', margin: '0'}}/>
                                    <SiteInfoDetailContainer>
                                        <SiteInfoP>Delivery Method: </SiteInfoP>
                                        <SiteInfoP2 style={{textAlign: 'justify'}}>
                                            {(clickedProgram.sdm && clickedProgram.sdm.length > 0)
                                                ? clickedProgram.sdm.map(program => program.sdm).join(', ')
                                                : 'None'}
                                        </SiteInfoP2>
                                    </SiteInfoDetailContainer>
                                </SiteInfoDetailRowContainer>
                            </SiteInfoDetailContainer>

                        </SitePopupContentContainer>

                    </SiteCardContainer>
                </AnimatedModalContent2> : <></>

            }

        </MapFilterRowContainer>
    )



}

export default MapResultFilter;