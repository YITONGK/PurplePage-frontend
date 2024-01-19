import React, {useState, useEffect} from 'react';
import {
    MapContainer,
    InfoWindowContainer,
    InfoWindowH1,
    InfoWindowP,
    MarkerAnimation,
    BasicMarker,
    InterContainer,
    InfoWindowContainerRow,
    AnimatedModalContent,
    MapPopupContainer,
    ModalContentContainer,
    ModalContentHeader,
    ModalContentHeaderLeft,
    ModalContentHeaderRight,
    EMMapContainer,
    ModalContentBodyContainerRow,
    ModalContentBodyContainerColumn,
    ModalContentInfoH2,
    ModalContentInfoContainer,
    ModalContentInfoP,
    ModalContentInfoP2,
    ModalContentInfoRow,
    ModalContentListItemButton,
    CustomClearIcon,
    ModalInfoOfferedProgramsContainer,
    AnimatedModalContent2
} from './MapElements';
import ReactMapGl, {Marker, Popup} from "react-map-gl";
import mapboxgl from 'mapbox-gl';

import List from "@mui/material/List";
import ListItemText from '@mui/material/ListItemText';

import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import Button from "@mui/material/Button";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Map = ({
                 sites,
                 advanceFilteredPrograms,
                 programTypeList,
                 exportSite,
                 exportRef,
                 importSite,
                 mapWidth,
                 mapHeight,
                 mapZoom,
                 centerLat,
                 centerLng,
                 departureLocation,
                 mapFilterUsed
             }) => {
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

    // useState hooks variable initialise
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [popUpMarker, setPopUpMarker] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    const [departureLocationMarker, setDepartureLocationMarker] = useState(null);

    const [markersInView, setMarkersInView] = useState([]);

    const debounceDelay = 300; //delay amount
    const [mapInfoPopup, setMapInfoPopup] = useState(false);
    const [programInfoPopup, setProgramInfoPopup] = useState(false);

    const [viewPort, setViewPort] = useState({
        latitude: centerLat || -37.80995133438894,
        longitude: centerLng || 144.96871464972733,
        zoom: mapZoom || 10,
        width: (15 * window.innerWidth) / 100, //vw ro px
        height: (15 * window.innerWidth) / 100, //vw to px
        transitionDuration: 200
    });

    // Set the marker to null when the sites refresh
    useEffect(() => {

        setPopUpMarker(null);
        setSelectedMarker(null);

        //focus view
        if (sites.length > 0 && sites[0] && sites[0].lat && sites[0].lng) {
            const bounds = new mapboxgl.LngLatBounds();

            sites.map((site) =>
                bounds.extend(new mapboxgl.LngLat(site.lng, site.lat))
            )

            if (departureLocation) {
                bounds.extend(new mapboxgl.LngLat(departureLocation.lng, departureLocation.lat));
            }

            // need to fix 250... not a good practice
            if (exportRef && exportRef.current && sites.length <= 250) {
                exportRef.current.getMap().fitBounds(bounds, {
                    padding: 30, // or your preferred padding
                    maxZoom: 15, // or your preferred max zoom
                });
            }

        }

    }, [sites]);

    //performance increase only show marker that in the viewport if needed...
    useEffect(() => {
        const timerId = setTimeout(() => {
            const zoom = viewPort.zoom;
            const width = viewPort.width;
            const height = viewPort.height;

            const latitudeDelta = (height / width) * (360 / (2 ** zoom));
            const longitudeDelta = (360 / width) * (360 / (2 ** zoom));

            // Filter the markers that are within the current viewport
            const markersWithinViewport = sites.filter((site) => {
                return (
                    site.lat >= viewPort.latitude - latitudeDelta / 1.1 && // left edge to center
                    site.lat <= viewPort.latitude + latitudeDelta / 1.1 && // right edge to center
                    site.lng >= viewPort.longitude - longitudeDelta / 1.1 && // bottom edge to center
                    site.lng <= viewPort.longitude + longitudeDelta / 1.1 // top edge to center
                );
            });

            // Update the markersInView state with the filtered markers
            setMarkersInView(markersWithinViewport);
            setDepartureLocationMarker(departureLocation);
        }, debounceDelay);

        return () => clearTimeout(timerId);

    }, [sites, viewPort]);

    // If site is selected outside the map, the map should show the same result
    useEffect(() => {
        if (importSite) {
            setSelectedMarker(importSite);
            setPopUpMarker(importSite);
        }

    }, [importSite])

    // Add marker to user current location
    useEffect(() => {
        setDepartureLocationMarker(departureLocation);
    }, [departureLocation]);


    // close popup
    const closePopup = () => {
        setPopUpMarker(null);
    }

    const closeModalPopup = () => {
        setMapInfoPopup(false);
        document.body.style.overflow = 'auto';
    }

    const closeProgramModalPopup = () => {
        setProgramInfoPopup(null);
        setProgramInfoPopup(false);
    }

    const onClickProgram = (program) => {

        let program_type_name = '';

        if (program) {
            if (program.prgm_type_id) {

                const tmpFilteredProgramType = programTypeList.filter((programType) => programType.prgm_type_id === program.prgm_type_id);
                program_type_name = tmpFilteredProgramType[0].prgm_type;
            }
        }

        const newProgram = {...program, prgm_type: program_type_name};
        setSelectedProgram(newProgram);

        setProgramInfoPopup(true);
    }


    // event on click handle marker on click
    const markersClick =
        (e, site) => {
            e.stopPropagation();
            e.preventDefault();

            if (exportSite) {
                exportSite(site);
            }

            setSelectedMarker(site);
            setPopUpMarker(site);


            try {
                if (site.geojson) {
                    console.log("in")
                    if (exportRef.current) {
                        console.log("in2")
                        const map = exportRef.current.getMap();
                        // if the route already exists on the map, we'll reset it using setData adding routing path to map
                        if (map.getSource('route')) {
                            map.getSource('route').setData(site.geojson);
                        }
                        // otherwise, we'll make a new request
                        else {
                            console.log("in3")
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

            } catch (error) {

                console.log(error);

            }

        };

    const EMMarkersClick =
        (e, site) => {
            e.stopPropagation();
            e.preventDefault();


            setSelectedMarker(site);
            setPopUpMarker(site);

            // animated modal true
            setMapInfoPopup(true);
            document.body.style.overflow = 'hidden';

            if (exportSite) {
                exportSite(site);
            }

            if (site.geojson) {
                if (exportRef.current) {
                    const map = exportRef.current.getMap();
                    // if the route already exists on the map, we'll reset it using setData adding routing path to map
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
        };

    // display all the markers based on lat and lng of each site
    const Markers = () => {
        return (
            <>
                {
                    markersInView.map((site, index) => (
                        <Marker
                            key={index}
                            latitude={site.lat}
                            longitude={site.lng}
                        >
                            {

                                (selectedMarker) ?

                                    (site.site_id === selectedMarker.site_id) ? (
                                            <MarkerAnimation
                                                onClick={(e) => markersClick(e, site)}
                                            >
                                                <img src={require('../../images/marker_2.png')}
                                                     style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                            </MarkerAnimation>)
                                        : (
                                            <BasicMarker
                                                onClick={(e) => markersClick(e, site)}
                                            >
                                                <img src={require('../../images/marker_2.png')}
                                                     style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                            </BasicMarker>

                                        ) : (

                                        <BasicMarker
                                            onClick={(e) => markersClick(e, site)}
                                        >
                                            <img src={require('../../images/marker_2.png')}
                                                 style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                        </BasicMarker>
                                    )

                            }
                        </Marker>
                    ))
                }
                {
                    (departureLocationMarker) ? (
                        <Marker
                            latitude={departureLocationMarker.lat}
                            longitude={departureLocationMarker.lng}
                        >
                            <MarkerAnimation>
                                <img src={require('../../images/userLocation_2.png')}
                                     style={{width: "40px", height: "auto"}} alt="Marker Icon"/>
                            </MarkerAnimation>

                        </Marker>
                    ) : null
                }
                {popUpMarker ? (
                    <Popup
                        latitude={popUpMarker.lat}
                        longitude={popUpMarker.lng}
                        onClose={closePopup}
                        anchor={"bottom"}
                        offset={22}
                    >
                        <InfoWindowContainer>
                            <InfoWindowH1>{popUpMarker.site_id}</InfoWindowH1>
                            <InfoWindowContainerRow>
                                <RoomIcon style={{margin: '0', padding: '0'}}></RoomIcon>
                                <InfoWindowP>
                                    <strong>
                                        {popUpMarker.street_nbr && popUpMarker.street_name && popUpMarker.suburb && popUpMarker.state && popUpMarker.postcode ?
                                            `${popUpMarker.street_nbr} ${popUpMarker.street_name}, ${popUpMarker.suburb}, ${popUpMarker.state}, ${popUpMarker.postcode}` : 'None'
                                        }
                                    </strong>
                                </InfoWindowP>
                            </InfoWindowContainerRow>
                            {
                                (popUpMarker.geojson) ?

                                    <>
                                        <InfoWindowContainerRow>
                                            <LocalTaxiIcon></LocalTaxiIcon>
                                            <InfoWindowP>
                                                <strong>{`${Math.round((popUpMarker.distance / 1000) * 10) / 10} km`}</strong> Away.
                                            </InfoWindowP>
                                        </InfoWindowContainerRow>
                                        <InfoWindowContainerRow>
                                            <AccessTimeIcon></AccessTimeIcon>
                                            <InfoWindowP>
                                                May
                                                Take <strong>{`${timeCalculation(popUpMarker.duration)}`}</strong> To
                                                Get There.
                                            </InfoWindowP>
                                        </InfoWindowContainerRow>
                                    </> : null

                            }

                        </InfoWindowContainer>
                    </Popup>
                ) : null}
            </>
        )
    }

    const EMMarkers = () => {
        return (
            <>
                {
                    markersInView.map((site, index) => (
                        <Marker
                            key={index}
                            latitude={site.lat}
                            longitude={site.lng}
                        >
                            {

                                (selectedMarker) ?

                                    (site.site_id === selectedMarker.site_id) ? (
                                            <MarkerAnimation
                                                onClick={(e) => EMMarkersClick(e, site)}
                                            >
                                                <img src={require('../../images/marker_2.png')}
                                                     style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                            </MarkerAnimation>)
                                        : (
                                            <BasicMarker
                                                onClick={(e) => EMMarkersClick(e, site)}
                                            >
                                                <img src={require('../../images/marker_2.png')}
                                                     style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                            </BasicMarker>

                                        ) : (

                                        <BasicMarker
                                            onClick={(e) => EMMarkersClick(e, site)}
                                        >
                                            <img src={require('../../images/marker_2.png')}
                                                 style={{width: "30px", height: "auto"}} alt="Marker Icon"/>
                                        </BasicMarker>
                                    )

                            }
                        </Marker>
                    ))
                }
                {
                    (departureLocationMarker) ? (
                        <Marker
                            latitude={departureLocationMarker.lat}
                            longitude={departureLocationMarker.lng}
                        >
                            <MarkerAnimation>
                                <img src={require('../../images/userLocation_2.png')}
                                     style={{width: "40px", height: "auto"}} alt="Marker Icon"/>
                            </MarkerAnimation>

                        </Marker>
                    ) : null
                }
                {popUpMarker ? (
                    <Popup
                        latitude={popUpMarker.lat}
                        longitude={popUpMarker.lng}
                        onClose={closePopup}
                        anchor={"bottom"}
                        offset={22}
                    >
                        <InfoWindowContainer>
                            <InfoWindowH1>{popUpMarker.site_id}</InfoWindowH1>
                            <InfoWindowContainerRow>
                                <RoomIcon style={{margin: '0', padding: '0'}}></RoomIcon>
                                <InfoWindowP>
                                    <strong>
                                        {popUpMarker.street_nbr && popUpMarker.street_name && popUpMarker.suburb && popUpMarker.state && popUpMarker.postcode ?
                                            `${popUpMarker.street_nbr} ${popUpMarker.street_name}, ${popUpMarker.suburb}, ${popUpMarker.state}, ${popUpMarker.postcode}` : 'None'
                                        }
                                    </strong>
                                </InfoWindowP>
                            </InfoWindowContainerRow>
                            {
                                (popUpMarker.geojson) ?

                                    <>
                                        <InfoWindowContainerRow>
                                            <LocalTaxiIcon></LocalTaxiIcon>
                                            <InfoWindowP>
                                                <strong>{`${Math.round((popUpMarker.distance / 1000) * 10) / 10} km`}</strong> Away.
                                            </InfoWindowP>
                                        </InfoWindowContainerRow>
                                        <InfoWindowContainerRow>
                                            <AccessTimeIcon></AccessTimeIcon>
                                            <InfoWindowP>
                                                May
                                                Take <strong>{`${timeCalculation(popUpMarker.duration)}`}</strong> To
                                                Get There.
                                            </InfoWindowP>
                                        </InfoWindowContainerRow>
                                    </> : null

                            }

                        </InfoWindowContainer>
                    </Popup>
                ) : null}
            </>
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

    const stringFilterPrefix = (string) => {

        if (!string) return 'None';

        // Extract the local part of the email (before '@')
        const localPart = string.split('@')[0];

        // Replace all '.' with spaces in the local part
        const result = localPart.replace(/\./g, ' ');

        return result.trim(); // trim() to remove any leading/trailing spaces
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

    const filterProgramBasedOnSite = (site) => {


        if (advanceFilteredPrograms && site) {

            const tmpFilteredProgram = advanceFilteredPrograms.filter((program) => {
                return program.site_id === site.site_id;
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
        } else {
            return [];
        }

    }

    const OfferedPrograms = ({relatedPrograms}) => {

        return (
            <ModalInfoOfferedProgramsContainer>
                {
                    (relatedPrograms && relatedPrograms.length > 0) ?
                        relatedPrograms.map((program, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ModalContentListItemButton key={index} onClick={() => onClickProgram(program)}>
                                        <ListItemText primary={programNameProcess(program.program_nme)}/>
                                        <ExpandMore style={{transform: 'rotate(-90deg)'}}></ExpandMore>
                                    </ModalContentListItemButton>
                                </React.Fragment>

                            )
                        })
                        :
                        <React.Fragment>
                            <ModalContentListItemButton>
                                <ListItemText primary={'No Program'}/>
                            </ModalContentListItemButton>
                        </React.Fragment>

                }
            </ModalInfoOfferedProgramsContainer>
        )

    }

    // Return UI
    return (
        <InterContainer>
            <MapContainer style={{
                width: (mapWidth && mapWidth > 0) ? `${mapWidth}vw` : `55vw`,
                height: (mapHeight && mapHeight > 0) ? `${mapHeight}vh` : `64.5vh`
            }}>
                <ReactMapGl
                    attributionControl={false}
                    style={{zIndex: '0'}}
                    ref={exportRef}
                    {...viewPort}
                    width={'100%'}
                    height={'100%'}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={(evt) => {
                        setViewPort({
                            latitude: evt.viewState.latitude,
                            longitude: evt.viewState.longitude,
                            zoom: evt.viewState.zoom,
                            width: (15 * window.innerWidth) / 100, //vw ro px
                            height: (15 * window.innerWidth) / 100, //vw to px
                            transitionDuration: 200
                        });
                        setMarkersInView([]); // increase the performance when moving the map
                        setDepartureLocationMarker(null);
                    }}
                >
                    <Markers/>
                </ReactMapGl>
            </MapContainer>
            <EMMapContainer style={{
                width: (mapWidth && mapWidth > 0) ? `${mapWidth}vw` : `55vw`,
                height: (mapHeight && mapHeight > 0) ? `${mapHeight}vh` : `64.5vh`
            }}>
                <ReactMapGl
                    attributionControl={false}
                    style={{zIndex: '0'}}
                    {...viewPort}
                    width={'100%'}
                    height={'100%'}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    onMove={(evt) => {
                        setViewPort({
                            latitude: evt.viewState.latitude,
                            longitude: evt.viewState.longitude,
                            zoom: evt.viewState.zoom,
                            width: (15 * window.innerWidth) / 100, //vw ro px
                            height: (15 * window.innerWidth) / 100, //vw to px
                            transitionDuration: 200
                        });
                        setMarkersInView([]); // increase the performance when moving the map
                        setDepartureLocationMarker(null);
                    }}
                >
                    <EMMarkers/>
                </ReactMapGl>
            </EMMapContainer>
            {
                (popUpMarker) ?
                    <MapPopupContainer>
                        <AnimatedModalContent
                            appElement={document.getElementById('root')}
                            isOpen={mapInfoPopup}
                            contentLabel="Map PopUp Modal"
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(91,91,91,0.28)', // Set the desired overlay background color
                                },
                                content: {
                                    width: '90vw', // Set the desired width
                                    height: '70vh', // Set the desired height
                                    maxHeight: '80vh',
                                    margin: 'auto', // Center the modal horizontally
                                    borderRadius: '15px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                },
                            }}
                        >
                            <ModalContentContainer>
                                <ModalContentHeader>
                                    <ModalContentHeaderLeft>
                                        <h2 style={{margin: '0', padding: '0', color: 'white'}}>Site Info</h2>
                                    </ModalContentHeaderLeft>
                                    <ModalContentHeaderRight>
                                        <Button style={{
                                            minWidth: 'unset',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }} disableRipple onClick={closeModalPopup}>
                                            <CustomClearIcon style={{fontSize: '30px'}}></CustomClearIcon>
                                        </Button>
                                    </ModalContentHeaderRight>
                                </ModalContentHeader>
                                <ModalContentInfoH2 style={{alignSelf: "center"}}>Site ID
                                    - {stringFilterPrefix(popUpMarker.site_id)}</ModalContentInfoH2>
                                <ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerColumn style={{width: '60%'}}>
                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Address: </ModalContentInfoP>
                                            <ModalContentInfoP2>
                                                {popUpMarker.street_nbr && popUpMarker.street_name && popUpMarker.suburb && popUpMarker.state && popUpMarker.postcode ? (
                                                    <>
                                                        {popUpMarker.street_nbr} {popUpMarker.street_name},{' '}
                                                        {popUpMarker.suburb},{' '}
                                                        {popUpMarker.state} {popUpMarker.postcode}
                                                    </>
                                                ) : (
                                                    'None'
                                                )}
                                            </ModalContentInfoP2>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Hours (Holiday Open Hours in
                                                Brackets): </ModalContentInfoP>
                                            <ModalContentInfoRow>
                                                <AccessTimeIcon></AccessTimeIcon>
                                                <ModalContentInfoP2>
                                                    Opens {(stringFilterPrefix(popUpMarker.site_open) === 'None') ? 'TBA' : stringFilterPrefix(popUpMarker.site_open)}
                                                    - {(stringFilterPrefix(popUpMarker.site_close) === 'None') ? 'TBA' : stringFilterPrefix(popUpMarker.site_close)}
                                                </ModalContentInfoP2>
                                            </ModalContentInfoRow>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Contact Name: </ModalContentInfoP>
                                            <ModalContentInfoP2>{stringFilterPrefix(popUpMarker.site_contact_name)}</ModalContentInfoP2>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Contact Number: </ModalContentInfoP>
                                            <ModalContentInfoP2>{stringFilterPrefix(popUpMarker.site_contact_nbr)}</ModalContentInfoP2>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Accessibility: </ModalContentInfoP>
                                            <ModalContentInfoP2>
                                                {(popUpMarker.accessibility && popUpMarker.accessibility.length > 0)
                                                    ? popUpMarker.accessibility.map(site => site.accessibility).join(', ')
                                                    : 'None'}
                                            </ModalContentInfoP2>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Local Government Area: </ModalContentInfoP>
                                            <ModalContentInfoP2>{stringFilterPrefix(popUpMarker.lga)}</ModalContentInfoP2>
                                        </ModalContentInfoContainer>

                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Department of Families, <br/>Fairness and Housing:
                                            </ModalContentInfoP>
                                            <ModalContentInfoP2>{stringFilterPrefix(popUpMarker.dffh_area)}</ModalContentInfoP2>
                                        </ModalContentInfoContainer>
                                    </ModalContentBodyContainerColumn>

                                    <ModalContentBodyContainerColumn style={{
                                        width: '40%',
                                        backgroundColor: 'rgb(227,227,227)',
                                        paddingLeft: '0.3rem',
                                        paddingTop: '0.3rem',
                                        borderRadius: '10px'
                                    }}>
                                        <ModalContentInfoContainer>
                                            <ModalContentInfoP>Offered Programs: </ModalContentInfoP>
                                            <List>
                                                <OfferedPrograms
                                                    relatedPrograms={filterProgramBasedOnSite(popUpMarker)}></OfferedPrograms>
                                            </List>
                                        </ModalContentInfoContainer>

                                    </ModalContentBodyContainerColumn>


                                </ModalContentBodyContainerRow>

                            </ModalContentContainer>


                        </AnimatedModalContent>

                    </MapPopupContainer> : <></>
            }
            {
                (selectedProgram) ?
                    <MapPopupContainer>
                        <AnimatedModalContent2
                            appElement={document.getElementById('root')}
                            isOpen={programInfoPopup}
                            contentLabel="Program PopUp Modal"
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(91,91,91,0.28)', // Set the desired overlay background color
                                },
                                content: {
                                    width: '75vw', // Set the desired width
                                    height: '60vh', // Set the desired height
                                    maxHeight: '70vh',
                                    margin: 'auto', // Center the modal horizontally
                                    borderRadius: '15px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                },
                            }}
                        >
                            <ModalContentContainer>
                                <ModalContentHeader>
                                    <ModalContentHeaderLeft>
                                        <h2 style={{margin: '0', padding: '0', color: 'white'}}>Program Info</h2>
                                    </ModalContentHeaderLeft>
                                    <ModalContentHeaderRight>
                                        <Button style={{
                                            minWidth: 'unset',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }} disableRipple onClick={closeProgramModalPopup}>
                                            <CustomClearIcon style={{fontSize: '30px'}}></CustomClearIcon>
                                        </Button>
                                    </ModalContentHeaderRight>
                                </ModalContentHeader>
                                <ModalContentInfoH2 style={{alignSelf: "center"}}>Program ID
                                    - {stringFilterPrefix(selectedProgram.title)}</ModalContentInfoH2>
                                <ModalContentBodyContainerColumn>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <CodeIcon style={{fontSize: '40px', margin: '0'}}></CodeIcon>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Program Name: </ModalContentInfoP>
                                            <ModalContentInfoP2>{stringFilterPrefix(selectedProgram.program_nme)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <DescriptionIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Program Description: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}>{stringFilterPrefix(selectedProgram.service_desc)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Program Manager: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}>{stringFilterPrefix(selectedProgram.prgm_mgr)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <CallIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Program Contact: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}> {stringFilterPrefix(selectedProgram.prgm_cont_no)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>General Manager: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}>{stringFilterPrefix(selectedProgram.gm)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <PersonIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Executive Officer: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}>{stringFilterPrefix(selectedProgram.eo)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <CategoryIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Program Type: </ModalContentInfoP>
                                            <ModalContentInfoP2
                                                style={{textAlign: 'justify'}}> {stringFilterPrefix(selectedProgram.prgm_type)}</ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <VpnKeyIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Access Type: </ModalContentInfoP>
                                            <ModalContentInfoP2 style={{textAlign: 'justify'}}>
                                                {(selectedProgram.at && selectedProgram.at.length > 0)
                                                    ? selectedProgram.at.map(program => program.at).join(', ')
                                                    : 'None'}
                                            </ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                    <ModalContentBodyContainerRow style={{alignItems: 'center'}}>
                                        <LocalShippingIcon style={{fontSize: '40px', margin: '0'}}/>
                                        <ModalContentBodyContainerColumn style={{gap: '5px'}}>
                                            <ModalContentInfoP>Delivery Method: </ModalContentInfoP>
                                            <ModalContentInfoP2 style={{textAlign: 'justify'}}>
                                                {(selectedProgram.sdm && selectedProgram.sdm.length > 0)
                                                    ? selectedProgram.sdm.map(program => program.sdm).join(', ')
                                                    : 'None'}
                                            </ModalContentInfoP2>
                                        </ModalContentBodyContainerColumn>
                                    </ModalContentBodyContainerRow>

                                </ModalContentBodyContainerColumn>

                            </ModalContentContainer>

                        </AnimatedModalContent2>

                    </MapPopupContainer> : <></>
            }


        </InterContainer>
    )
}

export default Map;