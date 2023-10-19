import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { ServiceStreamContainer, ServiceStreamH1, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink } from './ServiceStreamElements';

const ServiceStream = () => {
  // useState hooks
  const [serviceStreamList, setServiceStreamList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    getServiceStreams();
    document.title = 'Service Stream';
  }, []);

  /* get list of service streams from the backend and display them */
  const getServiceStreams = async () => {
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    await axios.get(BASE_URL + '/servicestream').then(res => {
      const list = res.data;
      setServiceStreamList(list);
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
      const viewLink = '/servicestream/' + cellValues.id;

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
    { field: 'ser_stream_id', headerName: 'Service Stream ID', headerClassName: 'header', maxWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'ser_stream', headerName: 'Service Stream', headerClassName: 'header', minWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'status', headerName: 'Status', headerClassName: 'header', maxWidth: 240, flex: 1,
      renderCell: (params) => (
        <span style={{color: 'green', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px' }}>{params.value}</span>
      )
    },
    ActionsColumn
  ];


  return (
    <ServiceStreamContainer>
      {isLoading &&
        <>
          <ServiceStreamH1>Service Stream</ServiceStreamH1>
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
          <ServiceStreamH1>Service Stream</ServiceStreamH1>
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
              rows={serviceStreamList}
              getRowId={row => row.ser_stream_id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </ServiceStreamContainer>
  )
}

export default ServiceStream;