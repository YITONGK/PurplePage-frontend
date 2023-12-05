import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { ProgramTypeContainer, ProgramTypeH1, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink } from './ProgramTypeElements';

const ProgramType = () => {
  // useState hooks
  const [programTypeList, setProgramTypeList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    getProgramTypes();
    document.title = 'Program Type';
  }, []);

  /* get list of program types from the backend and display them */
  const getProgramTypes = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/programtype').then(res => {
      const programTypeList = res.data[0];
      const serviceTypeList = res.data[1];
      for (let i=0; i < programTypeList.length; i++) {
        programTypeList[i] = Object.assign(programTypeList[i], serviceTypeList[i]);
      }
      setProgramTypeList(programTypeList);
      setIsLoading(false);
    })
  }

  const ActionsColumn = {
    headerClassName: 'header',
    maxWidth: 200,
    flex: 1,
    field:'actions',
    headerName: 'Actions',
    filterable: false,
    renderCell: (cellValues) => {
      const viewLink = '/programtype/' + cellValues.id;

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
    { field: 'prgm_type_id', headerName: 'Program Type ID', headerClassName: 'header', maxWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      ) 
    },
    { field: 'prgm_type', headerName: 'Program Type', headerClassName: 'header', minWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'ser_type', headerName: 'Service Type', headerClassName: 'header', minWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'pgm_type_status', headerName: 'Status', headerClassName: 'header', maxWidth: 240, flex: 1, 
      renderCell: (params) => (
        <span style={{color: 'green', fontWeight: 'bold', textTransform: 'capitalize' }}>{params.value}</span>
        )
    },
    ActionsColumn
  ];

  return (
    <ProgramTypeContainer>
      {isLoading &&
        <>
          <ProgramTypeH1>Program Type</ProgramTypeH1>
          <CircularProgress
            sx={{
              color: "#90929f",
              marginTop: "3rem"
            }}
          />
        </>
      }
      {!isLoading &&
        <>
          <ProgramTypeH1>Program Type</ProgramTypeH1>
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
              rows={programTypeList}
              getRowId={row => row.prgm_type_id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </ProgramTypeContainer>
  )
}

export default ProgramType;