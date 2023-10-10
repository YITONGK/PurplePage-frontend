import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { ProgramContainer, ProgramH1, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink } from './ProgramElements';

const Program = () => {
  // useState hooks
  const [programList, setProgramList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    document.title = 'Program';
    getPrograms();
  }, []);

  /* get list of programs from the backend and display them */
  const getPrograms = async () => {
    const BASE_URL = 'https://pueplepagebackend.azurewebsites.net';
    await axios.get(BASE_URL + '/program').then(res => {
      const list = res.data[0];
      const programTypeList = res.data[1];
      const groupList = res.data[2];
      const siteList = res.data[3];
      for (let i=0; i < list.length; i++) {
        list[i] = Object.assign(list[i], programTypeList[i], groupList[i], siteList[i]);
      }

      const distinctPrograms = list.filter((program, index, self) => {
        return index === self.findIndex((obj) => obj.program_nme === program.program_nme);
      });

      setProgramList(distinctPrograms);
      setIsLoading(false);
    })
  }

  const ActionsColumn = {
    headerClassName: 'header',
    maxWidth: 120,
    flex: 1,
    field:'actions',
    headerName: 'Actions',
    filterable: false,
    renderCell: (cellValues) => {
      const viewLink = '/program/' + cellValues.id;

      return (
        <ActionsColumnWrapper>
          <Button variant="contained" style={{textTransform: "none", marginRight: "5%", backgroundColor: "#a20066"}}>
            <ActionsButtonLink to={viewLink}>View</ActionsButtonLink>
          </Button>
        </ActionsColumnWrapper>
      );
    }
  }

  // columns for datagrid
  const columns = [
    { field: 'title', headerName: 'Title', headerClassName: 'header', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'program_nme', headerName: 'Program Name', headerClassName: 'header', minWidth: 280, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'prgm_mgr', headerName: 'Program Manager', headerClassName: 'header', maxWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'prgm_type', headerName: 'Program Type', headerClassName: 'header', maxWidth: 300, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'group_name', headerName: 'Group', headerClassName: 'header', minWidth: 250, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'prgm_status', headerName: 'Status', headerClassName: 'header', maxWidth: 80, flex: 1, 
      renderCell: (params) => (
      <span style={{color: 'green', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px'}}>{params.value}</span>
      )
    },
    ActionsColumn
  ];

  return (
    <ProgramContainer>
      {isLoading &&
        <>
          <ProgramH1>Program</ProgramH1>
          <CircularProgress
            sx={{
              color: "#90929f",
              marginTop: "3rem"
            }}
          ></CircularProgress>
        </>
      }
      {!isLoading &&
        <>
          <ProgramH1>Program</ProgramH1>
          <DataGridWrapper>
            <DataGrid
              sx={{
                fontFamily: 'Montserrat',
                color: '#90929f',
                '& .header': {
                  color: '#A60A6C',
                  backgroundColor: '#FCF0F5',
                  fontSize: '18px'
                }
              }}
              paginationModel={paginationModel}
              pageSizeOptions={[10, 25, 50]}
              onPaginationModelChange={(newPaginationModel => {setPaginationModel(newPaginationModel)})}
              columns={columns}
              rows={programList}
              getRowId={row => row.program_id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </ProgramContainer>
  )
}

export default Program;