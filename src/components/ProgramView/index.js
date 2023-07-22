import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProgramViewContainer, ProgramViewH1, ProgramViewP, ActionsButtonLink } from './ProgramViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProgramView = () => {
  // useState hooks
  const [program, setProgram] = useState({});
  const [sites, setSites] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getProgram();
  }, []);

  /* get a program from the backend based on the id and display it */
  const getProgram = async () => {
    const BASE_URL = "http://localhost:8888";
    await axios.get(BASE_URL + '/program/' + id).then(async (res) => {
      const data = res.data[0];
      data['prgm_type'] = res.data[1];
      data['group_name'] = res.data[2];
      setProgram(data);
      await axios.get(BASE_URL + '/program/sites/' + data.program_id).then(res => {
        const sites = res.data;
        setSites(sites);
      })
    })
  }

  /* Handle going to edit page */
  const edit = () => {
    window.location = '/program/' + id + '/edit';
  }

  /* delete the program */
  const deleteProgram = () => {
    const BASE_URL = 'http://localhost:8888';
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to delete this program?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showClass: {
        icon: ''
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(BASE_URL + "/program/" + id).then(() => {
          Swal.fire({
            title: "Success!",
            text: "Program has been successfully deleted!",
            icon: "success",
            showClass: {
              icon: ''
            }
          });
          setTimeout(() => {
            window.location = '/program';
          }, 1500);
        })
      }
    })
  }

  // related sites table element
  const RelatedSitesTable = () => {
    return (
      <TableContainer component={Paper} style={{ width: '95%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Site ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site, index) => (
              <TableRow
                key={index}
              >
                <TableCell>{site.site_id}</TableCell>
                <TableCell>{site.street_name}</TableCell>
                <TableCell>{site.site_contact_name}</TableCell>
                <TableCell>
                <Button variant="contained" style={{textTransform: "none", marginRight: "5%"}}>
                  <ActionsButtonLink to={`/site/${site.id}`}>View</ActionsButtonLink>
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
    <ProgramViewContainer>
      <ProgramViewH1>{program.program_nme}</ProgramViewH1>
      <ProgramViewP>Program manager: {program.prgm_mgr}</ProgramViewP>
      <ProgramViewP>Program type: {program.prgm_type}</ProgramViewP>
      <ProgramViewP>Group: {program.group_name}</ProgramViewP>
      <ProgramViewP>Status: {program.prgm_status}</ProgramViewP>
      <Button variant="contained" color="primary" onClick={edit}>Edit</Button>&nbsp;
      <Button variant="contained" color="error" onClick={deleteProgram}>Delete</Button>
      <ProgramViewP style={{ fontWeight: "bold", marginTop: "2rem", color: "#A60A6C", fontSize: "24px" }}>Related Sites</ProgramViewP>
      <RelatedSitesTable />
    </ProgramViewContainer>
  )
}

export default ProgramView;