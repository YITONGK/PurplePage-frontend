import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    UsersContainer,
    UsersH1,
    ActionsButtonLink,
    ActionsColumnWrapper,
    DataGridWrapper,
    ButtonWrapper,
    UsersButtonLink
} from './UsersElements';
import {DataGrid} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";

const Users = () => {
    // useState hooks
    const [users, setUsers] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // useEffect
    useEffect(() => {
        getUsers();
    });

    // get the current user
    const getUsers = async () => {
        const BASE_URL = "https://purplepagesbackend.vt.uniting.org";
        await axios.get(BASE_URL + '/users', {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data;
            setUsers(data);
            setIsLoading(false);
        })
    }

    const ActionsColumn = {
        headerClassName: 'header',
        maxWidth: 200,
        flex: 1,
        field: 'actions',
        headerName: 'Actions',
        filterable: false,
        renderCell: (cellValues) => {
            const viewLink = '/users/' + cellValues.id;

            return (
                <ActionsColumnWrapper>
                    <Button variant="contained"
                            style={{textTransform: "none", marginRight: "5%", backgroundColor: "#a20066"}}>
                        <ActionsButtonLink to={viewLink}>View</ActionsButtonLink>
                    </Button>
                </ActionsColumnWrapper>
            );
        }
    }

    // columns for datagrid
    const columns = [
        {field: 'id', headerName: 'User ID', headerClassName: 'header', maxWidth: 200, flex: 1},
        {field: 'name', headerName: 'Name', headerClassName: 'header', minWidth: 200, flex: 1},
        {field: 'email', headerName: 'Email', headerClassName: 'header', maxWidth: 360, flex: 1},
        ActionsColumn
    ];

    // links
    const addUserLink = '/users/create';

    return (
        <UsersContainer>
            {isLoading &&
                <UsersH1>Users</UsersH1>
            }
            {!isLoading &&
                <>
                    <UsersH1>Users</UsersH1>
                    <ButtonWrapper>
                        <Button variant="contained" style={{backgroundColor: '#a20066'}}>
                            <UsersButtonLink to={addUserLink}>Add User</UsersButtonLink>
                        </Button>
                    </ButtonWrapper>
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
                            onPaginationModelChange={(newPaginationModel => {
                                setPaginationModel(newPaginationModel)
                            })}
                            columns={columns}
                            rows={users}
                            getRowId={row => row.id}
                            autoHeight
                        />
                    </DataGridWrapper>
                </>
            }
        </UsersContainer>
    )
}

export default Users