import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { GroupContainer, GroupH1, DataGridWrapper, ActionsColumnWrapper, ActionsButtonLink } from './GroupElements';

const Group = () => {
  // useState hooks
  const [groupList, setGroupList] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10, 
    page: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // load data from the backend when loading the page
  useEffect(() => {
    getGroups();
    document.title = 'Group';
  }, []);

  /* get list of groups from the backend and display them */
  const getGroups = async () => {
    const BASE_URL = 'https://purplepage-uniting.azurewebsites.net';
    await axios.get(BASE_URL + '/group').then(res => {
      const groupList = res.data[0];
      const divisionList = res.data[1];
      for (let i=0; i < groupList.length; i++) {
        groupList[i] = Object.assign(groupList[i], divisionList[i]);
      }
      setGroupList(groupList);
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
      const viewLink = '/group/' + cellValues.id;

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
    { field: 'group_id', headerName: 'Group ID', headerClassName: 'header', maxWidth: 120, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },

    { field: 'group_name', headerName: 'Group Name', headerClassName: 'header', minWidth: 280, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },

    { field: 'eo', headerName: 'Executive Officer', headerClassName: 'header', maxWidth: 200, flex: 1 ,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },

    { field: 'division_name', headerName: 'Division Name', headerClassName: 'header', minWidth: 200, flex: 1,
      renderCell: (params) => (
        <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
      )
    },

    { field: 'status', headerName: 'Status', headerClassName: 'header', maxWidth: 120, flex: 1 , 
      renderCell: (params) => (
        <span style={{color: 'green', fontWeight: 'bold', textTransform: 'capitalize', fontSize: '16px' }}>{params.value}</span>
      )
    },
    ActionsColumn
  ];

  return (
    <GroupContainer>
      {isLoading &&
        <>
          <GroupH1>Group</GroupH1>
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
          <GroupH1>Group</GroupH1>
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
              rows={groupList}
              getRowId={row => row.group_id}
              autoHeight
            />
          </DataGridWrapper>
        </>
      }
    </GroupContainer>
  )
}

export default Group;