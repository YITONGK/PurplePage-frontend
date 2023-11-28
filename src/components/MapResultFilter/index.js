import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
    BreakingLine2,
    LabelContainer, MapFilterRowContainer,
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
    ClickedToolTips
} from "./MapResultFilterElements";
import InputLabel from "@mui/material/InputLabel";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ReactLoading from "react-loading";
import {debounce} from "@mui/material/utils";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {preventDefault} from "leaflet/src/dom/DomEvent";


const MapResultFilter = ({importRef,importSite ,exportSite, exportDepartureAddress, advanceFilteredSites}) => {

    // Variable Declaration
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

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


    return (
        <MapFilterRowContainer>
            <ResultContainer>
                <LabelContainer>
                    <InputLabel style={textStyle}>Available Sites</InputLabel>
                </LabelContainer>
                <SearchContainer>
                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', width: '91%'}}>
                        <InputLabel style={{fontSize: '16px'}}>Search Address</InputLabel>
                    </div>
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
                                    renderInput={(params) => <TextField {...params} size='small' placeholder='E.g., Your Current Address' sx={{...searchTextFieldStyle, alignItems: 'center'}}/>}
                                    renderOption={renderOptions}
                                />
                        }
                    </SearchInputContainer>
                    <BreakingLine2></BreakingLine2>
                    <SearchInputContainer>
                        <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', width: '91%'}}>
                            <InputLabel style={{fontSize: '16px'}}>Search Uniting Sites</InputLabel>
                        </div>
                        {
                            (addressIsLoading || isLoading)?
                            // (true)?
                                <div>
                                    <SkeletonTheme baseColor="#d3d3d3" highlightColor="#e8e8e8">
                                        <Skeleton style={{width: '14vw'}} height={35} />
                                    </SkeletonTheme>
                                </div>
                                :
                                <TextField sx={{...searchTextFieldStyle, alignItems: 'center'}} id="searchSite" size='small' placeholder='E.g., Harris Street' onChange={onChangeSiteSearch}
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
            </ResultContainer>
        </MapFilterRowContainer>
    )



}

export default MapResultFilter;