import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { ServiceTypeContainer, ServiceTypeH1, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink } from './ServiceTypeElements';
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";

const ServiceType = () => {
  // useState hooks
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    getServiceTypes();
    document.title = 'Service Type';
  }, []);

  /* get list of service types from the backend and display them */
  const getServiceTypes = async () => {
    const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
    await axios.get(BASE_URL + '/servicetype', {
      headers : {
        'authorization': `Bearer ${Cookies.get('accessToken')}`
      }
    }).then(res => {
      const serviceTypeList = res.data[0];
      const serviceStreamList = res.data[1];
      for (let i=0; i < serviceTypeList.length; i++) {
        serviceTypeList[i] = Object.assign(serviceTypeList[i], serviceStreamList[i]);
      }
      setServiceTypeList(serviceTypeList);
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
      const viewLink = '/servicetype/' + cellValues.id;

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
    { field: 'ser_type_id', headerName: 'Service Type ID', headerClassName: 'header', maxWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'ser_type', headerName: 'Service Type', headerClassName: 'header', minWidth: 200, flex: 1,
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
    <ServiceTypeContainer>
      {isLoading &&
        <>
          <ServiceTypeH1>Service Type</ServiceTypeH1>
          <LinearProgress
              color="primary"
              fourColor
              variant="indeterminate"
              sx={{ width: '95%', height: '8px'}} // Adjust width and height as needed
          />
        </>
      }
      {!isLoading &&
        <>
          <ServiceTypeH1>Service Type</ServiceTypeH1>
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
              rows={serviceTypeList}
              getRowId={row => row.ser_type_id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </ServiceTypeContainer>
  )
}

export default ServiceType;