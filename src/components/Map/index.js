import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, MapP, InfoWindowContainer, InfoWindowH1, InfoWindowP, MarkerAnimation, BasicMarker} from './MapElements';
import ReactMapGl, { Marker, Popup} from "react-map-gl";
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'pk.eyJ1IjoidmhhcnRvbm8iLCJhIjoiY2xoc2l1Z2VzMDd0dTNlcGtwbXYwaGx2cyJ9.C77GVU3YPPgscvXrTGHWfg';

const Map = ({sites, exportSite, exportRef, importSite, mapWidth, mapHeight, mapZoom}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

  // useState hooks
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popUpMarker, setPopUpMarker] = useState(null);

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
          site.lat >= viewPort.latitude - latitudeDelta / 1.5 && // left edge to center
          site.lat <= viewPort.latitude + latitudeDelta / 1.5 && // right edge to center
          site.lng >= viewPort.longitude - longitudeDelta / 1.5 && // bottom edge to center
          site.lng <= viewPort.longitude + longitudeDelta / 1.5 // top edge to center
        );
      });

      // Update the markersInView state with the filtered markers
      setMarkersInView(markersWithinViewport);
    }, debounceDelay);

    return () => clearTimeout(timerId);

  }, [sites, viewPort]);

  useEffect(() => {

    setPopUpMarker(null);
    setSelectedMarker(null);

  }, [sites]);

  useEffect(() => {
    if(importSite) {
      setSelectedMarker(importSite);
      setPopUpMarker(importSite);
    }
    
  },[importSite])


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
          {

            (selectedMarker) ?

              (site.site_id === selectedMarker.site_id) ? (
                <MarkerAnimation
                  onClick={(e) => markersClick(e, site)}
                >
                  <img src={require('../../images/marker.png')} style= {{width: "20px", height: "auto"}} alt="Marker Icon" />
                </MarkerAnimation> )    
                : (
                <BasicMarker
                  onClick={(e) => markersClick(e, site)}
                >
                  <img src={require('../../images/marker.png')} style= {{width: "20px", height: "auto"}} alt="Marker Icon" />
                </BasicMarker>

              ) : (

                <BasicMarker
                  onClick={(e) => markersClick(e, site)}
                >
                  <img src={require('../../images/marker.png')} style= {{width: "20px", height: "auto"}} alt="Marker Icon" />
                </BasicMarker>
              )

          }
          </Marker>
        ))}
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
    <>
      <MapContainer style={{width: (mapWidth && mapWidth > 0)? `${mapWidth}vw`: `55vw`, height: (mapHeight && mapHeight > 0)? `${mapHeight}vh` : `60vh`}}>
        <ReactMapGl
          ref={exportRef}
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