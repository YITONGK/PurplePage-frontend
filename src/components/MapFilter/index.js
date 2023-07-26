import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { MapFilterContainer, FilterContainer, SelectDiv} from './MapFilterElements';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";

const MapFilter = ({filteredPrograms, filteredSites, programTypeList, groupList}) => {

    // useState hooks
    const [values, setValues] = useState({
        ser_stream: '',
        division_name: ''
    })

    const [serviceStreams, setServiceStreams] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filteredServiceStreams, setFilteredServiceStreams] = useState([]);
    const [filteredDivisions, setFilteredDivisions] = useState([]);

    const dropDownStyle = { minWidth: '16vw', maxWidth: '16vw', position: 'absolute'};



    useEffect(() => {
        getFilterData();

    },[]);

    useEffect(()=> {

        if(isLoading) return;

        setFilteredServiceStreams(filteringServiceStreams());
        setFilteredDivisions(filteringDivisions());

        console.log(filteredServiceStreams);
        console.log(filteredDivisions);

    },[filteredPrograms])

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

    const filteringServiceStreams= () => {

        const programTypeIds = []
        for(let i=0; i< filteredPrograms.length; i++) {
            programTypeIds.push(filteredPrograms[i].prgm_type_id)
        }

        const filteredProgramTypes = programTypeList.filter((type) => {
            return programTypeIds.includes(type.prgm_type_id);
        });

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

        return filteredServiceStreams;
    }

    const filteringDivisions = () => {

        const groupIds = [];
        for(let i=0; i< filteredPrograms.length; i++) {
            groupIds.push(filteredPrograms[i].group_id);
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

    const ServiceStreamDropdown = () => {
        return ( 
        
        <Select 
            name="Service Stream"
            size='small'
            style={dropDownStyle}
            value={values.ser_stream}
            onChange={(e) => {setValues({ser_stream: e.target.value, division_name: ''})}}
            required
        >
            {
                filteredServiceStreams && filteredServiceStreams.map((serviceStream, index) => {
                   return <MenuItem key={index} value={serviceStream.ser_stream}>{serviceStream.ser_stream} </MenuItem>
                })
            }

        </Select>
        )

    }

    const divisionDropdown = () => {

    }


    return (
        <MapFilterContainer>
            <FilterContainer>
                <SelectDiv>
                    <InputLabel>Service Stream</InputLabel>
                    <ServiceStreamDropdown></ServiceStreamDropdown>
                </SelectDiv> 

            </FilterContainer>
        
        </MapFilterContainer>
    )
}

export default MapFilter;