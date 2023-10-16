import React, { useState, useEffect } from 'react';
import { MapContainer, InfoWindowContainer, InfoWindowH1, InfoWindowP, MarkerAnimation, BasicMarker, InterContainer, InfoWindowContainerRow} from './MapElements';
import ReactMapGl, { Marker, Popup} from "react-map-gl";
import mapboxgl from 'mapbox-gl';

import RoomIcon from '@mui/icons-material/Room';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'pk.eyJ1IjoidmhhcnRvbm8iLCJhIjoiY2xoc2l1Z2VzMDd0dTNlcGtwbXYwaGx2cyJ9.C77GVU3YPPgscvXrTGHWfg';

const Map = ({sites, exportSite, exportRef, importSite, mapWidth, mapHeight, mapZoom, centerLat, centerLng, departureLocation}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useState hooks variable initialise
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);

  const [departureLocationMarker, setDepartureLocationMarker] = useState(null);

  const [markersInView, setMarkersInView] = useState([]);

  const debounceDelay = 300; //delay amount

  const [viewPort, setViewPort] = useState({
    latitude: centerLat || -37.80995133438894,
    longitude: centerLng || 144.96871464972733,
    zoom: mapZoom || 10,
    width:  (15 * window.innerWidth) / 100, //vw ro px
    height:  (15 * window.innerWidth) / 100, //vw to px
    transitionDuration: 200
  });

  // Set the marker to null when the sites refresh
  useEffect(() => {

    setPopUpMarker(null);
    setSelectedMarker(null);

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
    if(importSite) {
      setSelectedMarker(importSite);
      setPopUpMarker(importSite);
    }
    
  },[importSite])

  // Add marker to user current location
  useEffect(() => {
    setDepartureLocationMarker(departureLocation);
  },[departureLocation]);


  // close popup
  const closePopup = () => {
    setPopUpMarker(null);
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
                    <img src={require('../../images/marker_2.png')} style= {{width: "30px", height: "auto"}} alt="Marker Icon" />
                  </MarkerAnimation> )    
                  : (
                  <BasicMarker
                    onClick={(e) => markersClick(e, site)}
                  >
                    <img src={require('../../images/marker_2.png')} style= {{width: "30px", height: "auto"}} alt="Marker Icon" />
                  </BasicMarker>

                ) : (

                  <BasicMarker
                    onClick={(e) => markersClick(e, site)}
                  >
                    <img src={require('../../images/marker_2.png')} style= {{width: "30px", height: "auto"}} alt="Marker Icon" />
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
                  <img src={require('../../images/userLocation_2.png')} style= {{width: "40px", height: "auto"}} alt="Marker Icon" />
              </MarkerAnimation>

            </Marker>
          ) : null
        }
        {popUpMarker? (
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
                            {popUpMarker.street_nbr} {popUpMarker.street_name}, {popUpMarker.suburb}, {popUpMarker.state} {popUpMarker.postcode}
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
                                 May Take <strong>{`${timeCalculation(popUpMarker.duration)}`}</strong> To Get There.
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

  // Return UI
  return (
    <InterContainer>
      <MapContainer style={{width: (mapWidth && mapWidth > 0)? `${mapWidth}vw`: `55vw`, height: (mapHeight && mapHeight > 0)? `${mapHeight}vh` : `64.5vh`}}>
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
          <Markers />
        </ReactMapGl>
      </MapContainer>
    </InterContainer>
  )
}

export default Map;