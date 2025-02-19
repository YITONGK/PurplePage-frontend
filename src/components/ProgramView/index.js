import axios from "axios";
import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { ProgramViewContainer, ProgramViewH1, ProgramViewP, ActionsButtonLink, ProgramViewGreenP, MapAndInfoContainer, ProgramViewInfo, ProgramViewMapContainer, InfoDetail, IconContainer, ProgramViewCaption, IconDescription, ProgramViewP2, Icon, InfoDetailContainer, TitleContainer, AnimatedRoomIcon, AnimatedTableCell } from './ProgramViewElements';
import Button from '@mui/material/Button';
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

  const [selectedSite, setSelectedSite] = useState(null);

  const { id } = useParams();

  const mapRef = useRef();

  useEffect(() => {
    getProgram();
  }, []);

  const TableTitleStyle = {fontWeight: 'bold', fontSize: '18px', color: '#A60A6C'};
  const TableContentStyle = {fontSize: '16px', color: 'black'};

  /* get a program from the backend based on the id and display it */
  const getProgram = async () => {
    const BASE_URL = "https://api.wernmachine.art";
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

  const stringFilterPrefix = (string) => {

    if(!string) return 'None';

    // Extract the local part of the email (before '@')
    const localPart = string.split('@')[0];

    // Replace all '.' with spaces in the local part
    const result = localPart.replace(/\./g, ' ');

    return result.trim(); // trim() to remove any leading/trailing spaces
  }

  const ExportSite = (site) => {
    setSelectedSite(site);

  };

  // related sites table element
  const RelatedSitesTable = () => {
    return (
      <TableContainer component={Paper} style={{ width: '95%',  border: '1px solid transparent', boxShadow: '0 0 6px rgba(0, 0, 0, 0.4)'}}>
        <Table>
          <TableHead style={{backgroundColor: '#FCF0F5', position: 'sticky', top: 0 , zIndex: 1}}>
            <TableRow>
              <TableCell style={TableTitleStyle}>Site ID</TableCell>
              <TableCell style={TableTitleStyle}>Address</TableCell>
              <TableCell style={TableTitleStyle}>Hours</TableCell>
              <TableCell style={TableTitleStyle}>Accessibility</TableCell>
              <TableCell style={TableTitleStyle}>Contact</TableCell>
              <TableCell style={TableTitleStyle}>Actions</TableCell>
              <TableCell style={TableTitleStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site, index) => (
              <TableRow
                key={index}
              >
                <TableCell style={TableContentStyle}>{site.site_id}</TableCell>
                <TableCell style={TableContentStyle}>{site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</TableCell>
                <TableCell style={TableContentStyle}>
                  {(stringFilterPrefix(site.site_open) === 'None') ? 'TBA' : stringFilterPrefix(site.site_open)} -
                  {(stringFilterPrefix(site.site_close) === 'None') ? 'TBA' : stringFilterPrefix(site.site_close)}
                </TableCell>
                <TableCell style={TableContentStyle}> {(site.accessibility && site.accessibility.accessibility) ? stringFilterPrefix(site.accessibility.accessibility) : 'None'}</TableCell>
                <TableCell style={TableContentStyle}>{stringFilterPrefix(site.site_contact_name)}</TableCell>
                <TableCell style={{width: '10px'}}>
                  <Button variant="contained" style={{textTransform: "none", marginRight: "5%", backgroundColor: '#A60A6C' }}>
                    <ActionsButtonLink to={`/site/${site.id}`}>View</ActionsButtonLink>
                  </Button>
                </TableCell>
                {
                  (selectedSite && selectedSite.site_id === site.site_id) ? 
                  <AnimatedTableCell>
                    <AnimatedRoomIcon style={{fontSize: '30px'}}></AnimatedRoomIcon>
                  </AnimatedTableCell> : <TableCell></TableCell>
                }
                
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
          <TitleContainer>
            <ProgramViewH1>{program.program_nme}</ProgramViewH1>
          </TitleContainer>
          <InfoDetailContainer>
            <InfoDetail>
              <Icon style={{minWidth:'100%'}}>
                <IconContainer>
                  <DescriptionIcon style={{fontSize: '25px', margin: '0'}}/>
                  <ProgramViewCaption>Program</ProgramViewCaption>
                  <ProgramViewCaption>Description</ProgramViewCaption>
                </IconContainer>
                <IconDescription style={{padding: "1rem", textAlign: 'justify'}}>
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
          <Map sites = {sites} exportRef={mapRef} exportSite={ExportSite} mapZoom={6} mapWidth={53} mapHeight={50}/>
        </ProgramViewMapContainer>
      </MapAndInfoContainer>
      <ProgramViewP style={{ fontWeight: "bold", marginTop: "2rem", marginBottom: "2rem", color: "#A60A6C", fontSize: "28px" }}>Related Sites</ProgramViewP>
      <RelatedSitesTable />
    </ProgramViewContainer>
  )
}

export default ProgramView;