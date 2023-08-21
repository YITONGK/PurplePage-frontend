import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { SiteContainer, SiteH1, ButtonWrapper, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink, SiteButtonLink } from './SiteElements';

const Site = () => {
  // useState hooks
  const [siteList, setSiteList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    getSites();
    document.title = 'Site';
  }, []);

  /* get list of sites from the backend and display them */
  const getSites = async () => {
    const BASE_URL = 'http://localhost:8888';
    await axios.get(BASE_URL + '/site').then(res => {
      const list = res.data;
      setSiteList(list);
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
      const viewLink = '/site/' + cellValues.id;

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
    { field: 'site_id', headerName: 'Site ID', headerClassName: 'header', minWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'street_nbr', headerName: 'Number', headerClassName: 'header', maxWidth: 100, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'street_name', headerName: 'Street Name', headerClassName: 'header', minWidth: 240, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'suburb', headerName: 'Suburb', headerClassName: 'header', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'state', headerName: 'State', headerClassName: 'header', maxWidth: 100, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'postcode', headerName: 'Postcode', headerClassName: 'header', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },
    { field: 'status', headerName: 'Status', headerClassName: 'header', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        <span style={{color: 'green', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px' }}>{params.value}</span>
      )
    },
    ActionsColumn
  ];

  // links
  const addSiteLink = '/site/create';

  return (
    <SiteContainer>
      {isLoading &&
        <>
          <SiteH1>Site</SiteH1>
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
          <SiteH1>Site</SiteH1>
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
              rows={siteList}
              getRowId={row => row.id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </SiteContainer>
  )
}

export default Site;