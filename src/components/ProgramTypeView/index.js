import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramTypeViewContainer, ProgramTypeViewH1, ProgramTypeViewP, ActionsButtonLink, ProgramTypeViewH2, LoadingContainer, LoadingCircle, LoadingText, ProgramsContainer, ProgramTypeViewP2, PContainer } from './ProgramTypeViewElements';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProgramTypeView = () => {
  // useState hooks
  const [programType, setProgramType] = useState({});
  const [programs, setPrograms] = useState([]);
  const [relatedPrograms, setRelatedPrograms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const TableTitleStyle = {fontWeight: 'bold', fontSize: '18px', color: '#A60A6C'};
  const TableContentStyle = {fontSize: '16px', color: 'black'};

  useEffect(() => {
    getProgramType();
    getPrograms();
  }, []);

  useEffect(() => {

    if(programs.length > 0) {
      const tmpProgram = programs.filter((program => {
        return program.prgm_type_id === programType.prgm_type_id;
      }));

      setRelatedPrograms(tmpProgram);
    }

  }, [programs]);


  /* get a program type from the backend based on the id and display it */
  const getProgramType = async () => {
    const BASE_URL = "https://purplepage-uniting.azurewebsites.net";
    await axios.get(BASE_URL + '/programtype/' + id).then(res => {
      console.log(res);
      const data = res.data[0];
      data['ser_type'] = res.data[1];
      setProgramType(data);
    })
  }

  const getPrograms = async () => {
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    const result = await axios.get(BASE_URL + '/program');
    setPrograms(result.data[0]);
    setIsLoading(false);

  }

  /* Handle going to edit page */
  // const edit = () => {
  //   window.location = '/programtype/' + id + '/edit';
  // }

  /* delete the program type */
  // const deleteProgramType = () => {
  //   const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
  //   Swal.fire({
  //     title: "Warning!",
  //     text: "Are you sure you want to delete this program type?",
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
  //       await axios.delete(BASE_URL + "/programtype/" + id).then(() => {
  //         Swal.fire({
  //           title: "Success!",
  //           text: "Program type has been successfully deleted!",
  //           icon: "success",
  //           showClass: {
  //             icon: ''
  //           }
  //         });
  //         setTimeout(() => {
  //           window.location = '/programtype';
  //         }, 1500);
  //       })
  //     }
  //   })
  // }

  // related sites table element
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

  return (
    <ProgramTypeViewContainer>
      <ProgramTypeViewH1>{programType.prgm_type}</ProgramTypeViewH1>
      <ProgramTypeViewP>Service type: {programType.ser_type}</ProgramTypeViewP>
      <PContainer>
        <ProgramTypeViewP>Status:</ProgramTypeViewP>
        <ProgramTypeViewP2 style={{color: 'green'}}> {programType.pgm_type_status}</ProgramTypeViewP2>
      </PContainer>
      <ProgramTypeViewH2>Related Programs</ProgramTypeViewH2>
      
      <ProgramsContainer>
      {
        (isLoading) ? 
        <LoadingContainer>
          <LoadingCircle> </LoadingCircle>
          <LoadingText>Loading...</LoadingText>
        </LoadingContainer>
        : <RelatedProgramsTable></RelatedProgramsTable>
      }
      </ProgramsContainer>

    </ProgramTypeViewContainer>
  )
}

export default ProgramTypeView;