import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, MapP, InfoWindowContainer, InfoWindowH1, InfoWindowP, MarkerAnimation, BasicMarker, InterContainer} from './MapElements';
import ReactMapGl, { Marker, Popup} from "react-map-gl";
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'pk.eyJ1IjoidmhhcnRvbm8iLCJhIjoiY2xoc2l1Z2VzMDd0dTNlcGtwbXYwaGx2cyJ9.C77GVU3YPPgscvXrTGHWfg';

const Map = ({sites, exportSite, exportRef, importSite, mapWidth, mapHeight, mapZoom, departureLocation}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // const address = '247 Peel Street, North Melbourne, Australia'; 

  // const geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

  // axios.get(geocoding)
  //   .then(response => {
  //     const coordinates = response.data.features[0].center; // [longitude, latitude]
  //     console.log('Coordinates:', coordinates);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });

  // useState hooks
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);

  const [departureLocationMarker, setDepartureLocationMarker] = useState(null);

  const [markersInView, setMarkersInView] = useState([]);

  const debounceDelay = 300; //delay amount

  const [viewPort, setViewPort] = useState({
    latitude: -37.80995133438894,
    longitude: 144.96871464972733,
    zoom: 10,
    width: (20 * window.innerWidth) /100,
    height: (20 * window.innerWidth) /100,
    transitionDuration: 200
  });

  useEffect(() => {

    if(mapZoom > 0) {
      setViewPort((prevViewPort) => ({
        ...prevViewPort,
        zoom: mapZoom
      }));
    }

  }, [mapZoom]);

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

      // console.log('Latitude Delta:', latitudeDelta);
      // console.log('Longitude Delta:', longitudeDelta);

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

  useEffect(() => {
    if(importSite) {
      setSelectedMarker(importSite);
      setPopUpMarker(importSite);
    }
    
  },[importSite])

  useEffect(() => {
    setDepartureLocationMarker(departureLocation);
  },[departureLocation]);


  // close popup
  const closePopup = () => {
    setPopUpMarker(null);
  }



  const markersClick = useCallback (
    (e, site) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedMarker(site);
      setPopUpMarker(site);

      if(exportSite) {
        exportSite(site);
      }

      if(site.geojson) {
          if(exportRef.current) {
              const map = exportRef.current.getMap();
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
      
    },[sites]
  );

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
          >
             <InfoWindowContainer>
                <InfoWindowH1>{popUpMarker.site_id}</InfoWindowH1>
                <InfoWindowP><strong>Address:</strong> <br/>{popUpMarker.street_nbr} {popUpMarker.street_name}, {popUpMarker.suburb}, {popUpMarker.state} {popUpMarker.postcode}</InfoWindowP>
              </InfoWindowContainer>
          </Popup>
        ) : null}
      </>
    )
  }

  return (
    <InterContainer>
      <MapContainer style={{width: (mapWidth && mapWidth > 0)? `${mapWidth}vw`: `55vw`, height: (mapHeight && mapHeight > 0)? `${mapHeight}vh` : `64.5vh`}}>
        <ReactMapGl
          ref={exportRef}
          {...viewPort}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onMove={(evt) => {
            setViewPort({
              latitude: evt.viewState.latitude,
              longitude: evt.viewState.longitude,
              zoom: evt.viewState.zoom,
              width: (20 * window.innerWidth) /100, //vh to px = (Viewport height unit (vh) * Viewport height) / 100
              height: (20 * window.innerHeight) /100, //vh to px = (Viewport
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