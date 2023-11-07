import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceStreamViewContainer, ServiceStreamViewH1, ServiceStreamViewP, ServiceStreamViewH2, ActionsButtonLink, LoadingContainer, LoadingCircle, LoadingText, ServiceStreamProgramsContainer } from './ServiceStreamViewElements';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ServiceStreamView = () => {
  // useState hooks
  const [serviceStream, setServiceStream] = useState({});
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const TableTitleStyle = {fontWeight: 'bold', fontSize: '18px', color: '#A60A6C'};
  const TableContentStyle = {fontSize: '16px', color: 'black'};

  useEffect(() => {

    getAllData();
    
  }, []);

  const getAllData = async () => {

    try {
      const [serviceStream, serviceTypes, programTypes, programs] = await Promise.all ([
        getServiceStream(),
        getServiceTypes(),
        getProgramTypes(),
        getPrograms(),
      ]);

      setServiceStream(serviceStream);

      const filteringServiceTypes = serviceTypes.filter((type) => {
        return type.ser_stream === serviceStream.ser_stream;
      });

      const serviceTypesIds = filteringServiceTypes.map((type) => type.ser_type_id);

      const filteringProgramTypes = programTypes.filter((type) => {
        return serviceTypesIds.includes(type.ser_type_id);
      });

      const programTypesIds = filteringProgramTypes.map((type) => type.prgm_type_id);

      const filteringPrograms = programs.filter((program) => {
        return programTypesIds.includes(program.prgm_type_id);
      });

      setRelatedPrograms(filteringPrograms);

      setIsLoading(false);

    } catch (error) {

      console.log(error);
    }
    

  }

  /* get a service stream from the backend based on the id and display it */
  const getServiceStream = async () => {
    const BASE_URL = "https://myapi.hhzhu.art";
    const result = await axios.get(BASE_URL + '/servicestream/' + id).then(res => {
      const data = res.data;
      return data;
    })

    setServiceStream(result);

    return result;
  }

  const getServiceTypes = async () => {
    const BASE_URL = "https://myapi.hhzhu.art";
    let result = await axios.get(BASE_URL + '/servicetype/');
    result = result.data[1]; // type id - service stream name
    return result;
  }

  const getProgramTypes = async () => {
    const BASE_URL = "https://myapi.hhzhu.art";
    let result = await axios.get(BASE_URL + '/programtype');
    result = result.data[0];
    return result;
  }

  const getPrograms = async () => {
    const BASE_URL = 'https://myapi.hhzhu.art';
    let result = await axios.get(BASE_URL + '/program');
    result = result.data[0];
    return result;
  }

   // related programs table element
   const RelatedProgramsTable = () => {
    return (
      <TableContainer component={Paper} style={{ width: '95%',  border: '1px solid transparent', boxShadow: '0 0 6px rgba(0, 0, 0, 0.4)'}}>
        <Table>
          <TableHead style={{backgroundColor: '#FCF0F5', position: 'sticky', top: 0, zIndex: 1}}>
            <TableRow>
              <TableCell style={TableTitleStyle}>Program ID</TableCell>
              <TableCell style={TableTitleStyle}>Program Title</TableCell>
              <TableCell style={TableTitleStyle}>Program Description</TableCell>
              <TableCell style={TableTitleStyle}>Program Manager</TableCell>
              <TableCell style={TableTitleStyle}>Status</TableCell>
              <TableCell style={TableTitleStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatedPrograms.map((program, index) => (
              <TableRow
                key={index}
              >
                <TableCell style={{...TableContentStyle, width: '15%', }}>{(program.title === null)? `None` : program.title}</TableCell>
                <TableCell style={{...TableContentStyle, width: '20%', }}>{(program.program_nme === null)? `None` : program.program_nme}</TableCell>
                <TableCell style={{...TableContentStyle, width: '40%', textAlign: 'justify'}}>{(program.service_desc === null)? `None` : program.service_desc}</TableCell>
                <TableCell style={{...TableContentStyle, width: '20%'}}>{(program.prgm_mgr === null) ? `None` : program.prgm_mgr}</TableCell>
                <TableCell style={{...TableContentStyle, width: '10%', color: 'green', fontWeight: 'bold', textTransform: 'capitalize' }}>{(program.prgm_status === null) ? `None` : program.prgm_status}</TableCell>
                <TableCell style={{width: '5%'}}>
                  <Button variant="contained" style={{textTransform: "none", marginRight: "5%"}}>
                    <ActionsButtonLink to={`/program/${program.program_id}`}>View</ActionsButtonLink>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  // /* Handle going to edit page */
  // const edit = () => {
  //   window.location = '/servicestream/' + id + '/edit';
  // }

  // /* delete the service stream */
  // const deleteServiceStream = () => {
  //   const BASE_URL = 'https://myapi.hhzhu.art';
  //   Swal.fire({
  //     title: "Warning!",
  //     text: "Are you sure you want to delete this service stream?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //     showClass: {
  //       icon: ''
  //     }
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       await axios.delete(BASE_URL + "/servicestream/" + id).then(() => {
  //         Swal.fire({
  //           title: "Success!",
  //           text: "Service stream has been successfully deleted!",
  //           icon: "success",
  //           showClass: {
  //             icon: ''
  //           }
  //         });
  //         setTimeout(() => {
  //           window.location = '/servicestream';
  //         }, 1500);
  //       })
  //     }
  //   })
  // }

  return (
    <ServiceStreamViewContainer>
      <ServiceStreamViewH1>{serviceStream.ser_stream}</ServiceStreamViewH1>
      <ServiceStreamViewP>Status: {serviceStream.status}</ServiceStreamViewP>
      <ServiceStreamViewH2>Related Programs</ServiceStreamViewH2>
      <ServiceStreamProgramsContainer>
      {
        (isLoading) ? 
        <LoadingContainer>
          <LoadingCircle> </LoadingCircle>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
        : <RelatedProgramsTable></RelatedProgramsTable>
      }
      </ServiceStreamProgramsContainer>
    </ServiceStreamViewContainer>
  )
}

export default ServiceStreamView;