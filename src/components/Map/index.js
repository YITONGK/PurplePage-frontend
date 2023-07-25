import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, MapP, InfoWindowContainer, InfoWindowH1, InfoWindowP} from './MapElements';
import ReactMapGl, { Marker, Popup} from "react-map-gl";
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'pk.eyJ1IjoidmhhcnRvbm8iLCJhIjoiY2xoc2l1Z2VzMDd0dTNlcGtwbXYwaGx2cyJ9.C77GVU3YPPgscvXrTGHWfg';

const Map = ({sites, exportSite}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useState hooks
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [markersInView, setMarkersInView] = useState([]);

  const debounceDelay = 100; //delay amount

  const [viewPort, setViewPort] = useState({
    latitude: -37.80995133438894,
    longitude: 144.96871464972733,
    zoom: 10,
    width: (20 * window.innerWidth) /100,
    height: (20 * window.innerWidth) /100,
    transitionDuration: 200
  });

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
          site.lat >= viewPort.latitude - latitudeDelta / 1.5 &&
          site.lat <= viewPort.latitude + latitudeDelta / 1.5 &&
          site.lng >= viewPort.longitude - longitudeDelta / 1.5 &&
          site.lng <= viewPort.longitude + longitudeDelta / 1.5
        );
      });

      // Update the markersInView state with the filtered markers
      setMarkersInView(markersWithinViewport);
    }, debounceDelay);

    return () => clearTimeout(timerId);

  }, [sites, viewPort]);


  // close popup
  const closePopup = () => {
    setSelectedMarker(null);
  }

  //performance increase only show marker that in the viewport if needed...

  const markersClick = useCallback (
    (e, site) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedMarker(site);
      exportSite(site);
    },[sites]
  );

  // display all the markers based on lat and lng of each site
  const Markers = () => {
    return (
      <>
        {markersInView.map((site, index) => (
          <Marker
            key={index}
            latitude={site.lat}
            longitude={site.lng}
          >
            <button
              onClick={(e) => markersClick(e, site)}
              style={{background: "none", border: "none", cursor: "pointer"}}
            >
              <img src={require('../../images/marker.png')} style= {{width: "20px", height: "auto"}} alt="Marker Icon" />
            </button>
          </Marker>
        ))}
        {selectedMarker ? (
          <Popup
            latitude={selectedMarker.lat}
            longitude={selectedMarker.lng}
            onClose={closePopup}
          >
             <InfoWindowContainer>
                <InfoWindowH1>{selectedMarker.site_id}</InfoWindowH1>
                <InfoWindowP><strong>Address:</strong> {selectedMarker.street_nbr} {selectedMarker.street_name}, {selectedMarker.suburb}, {selectedMarker.state} {selectedMarker.postcode}</InfoWindowP>
                <InfoWindowP><strong>Latitude:</strong> {selectedMarker.lat}</InfoWindowP>
                <InfoWindowP><strong>Langitude:</strong> {selectedMarker.lng}</InfoWindowP>
              </InfoWindowContainer>
          </Popup>
        ) : null}
      </>
    )
  }

  return (
    <>
      <MapContainer>
        <ReactMapGl
          {...viewPort}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/vhartono/clhsoimq200o901q1ffkjg8ky?optimize=true"
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
          }}
        >
          <Markers />
        </ReactMapGl>
      </MapContainer>
    </>
  )
}

export default Map;