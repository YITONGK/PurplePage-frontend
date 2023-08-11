import axios from "axios";
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { ProgramViewContainer, ProgramViewH1, ProgramViewP, ActionsButtonLink, ProgramViewGreenP, MapAndInfoContainer, ProgramViewInfo, ProgramViewMapContainer, InfoDetail, IconContainer, ProgramViewCaption, IconDescription, ProgramViewP2, Icon, InfoDetailContainer} from './ProgramViewElements';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Map from '../Map';

import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const ProgramView = () => {
  // useState hooks
  const [program, setProgram] = useState({});
  const [sites, setSites] = useState([]);

  const { id } = useParams();

  const mapRef = useRef();

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
      <TableContainer component={Paper} style={{ width: '95%',  border: '1px solid transparent', boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)'}}>
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
      <MapAndInfoContainer>
        <ProgramViewInfo>
          <ProgramViewH1>{program.program_nme}</ProgramViewH1>
          <InfoDetailContainer>
            <InfoDetail>
              <Icon style={{maxWidth:'100%'}}>
                <IconContainer>
                  <DescriptionIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Program</ProgramViewCaption>
                  <ProgramViewCaption>Description</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2>{program.service_desc}</ProgramViewP2>
                </IconDescription>
              </Icon>
            </InfoDetail>

            <InfoDetail>
              <Icon>
                <IconContainer style={{minWidth: '70px'}}>
                  <PersonIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Program</ProgramViewCaption>
                  <ProgramViewCaption>Manager</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2>{program.prgm_mgr}</ProgramViewP2>
                </IconDescription>
              </Icon>

              <Icon>
                <IconContainer style={{minWidth: '70px'}}>
                  <CallIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Manager</ProgramViewCaption>
                  <ProgramViewCaption>Contact</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2>{program.prgm_cont_no}</ProgramViewP2>
                </IconDescription>
              </Icon>
            </InfoDetail>

            <InfoDetail>
              <Icon>
                <IconContainer style={{minWidth: '70px'}}>
                  <CategoryIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Program</ProgramViewCaption>
                  <ProgramViewCaption>Type</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2>{program.prgm_type}</ProgramViewP2>
                </IconDescription>
              </Icon>

              <Icon>
                <IconContainer style={{minWidth: '70px', minHeight: '55px'}}>
                  <WorkIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Group</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2>{program.group_name}</ProgramViewP2>
                </IconDescription>
              </Icon>
            </InfoDetail>
            <InfoDetail>
              <Icon style={{minWidth:'100%'}}>
                <IconContainer style={{minWidth: '70px'}}>
                  <QueryStatsIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Status</ProgramViewCaption>
                </IconContainer>
                <IconDescription>
                  <ProgramViewP2><ProgramViewGreenP><strong>{program.prgm_status}</strong></ProgramViewGreenP></ProgramViewP2>
                </IconDescription>
              </Icon>
            </InfoDetail>
          </InfoDetailContainer>
        </ProgramViewInfo>
        <ProgramViewMapContainer>
          <Map sites = {sites} exportRef={mapRef} mapZoom={6} mapWidth={50} mapHeight={70}/>
        </ProgramViewMapContainer>
      </MapAndInfoContainer>
      <ProgramViewP style={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem", color: "#A60A6C", fontSize: "24px" }}>Related Sites</ProgramViewP>
      <RelatedSitesTable />
    </ProgramViewContainer>
  )
}

export default ProgramView;