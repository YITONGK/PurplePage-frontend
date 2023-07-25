import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { MapFilterContainer } from './MapFilterElements';
import { NativeSelect } from '@mui/material';

const MapFilter = ({filteredProgramTypes, filteredSites}) => {

    const [serviceStreams, setServiceStreams] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [availableServiceStreams, setAvailableServiceStreams] = useState([]);



    useEffect(() => {
        getFilterData();

    },[]);

    useEffect(()=> {

        if(isLoading) return;

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

        setAvailableServiceStreams(filteredServiceStreams);

        console.log(filteredServiceStreams);



    },[filteredProgramTypes, filteredSites])

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

    

    return (
        <MapFilterContainer>

        </MapFilterContainer>
    )
}

export default MapFilter;