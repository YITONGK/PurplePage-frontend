import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import {
    DivisionContainer,
    DivisionH1,
    DataGridWrapper,
    ActionsColumnWrapper,
    ActionsButtonLink
} from './DivisionElements';
import Cookies from "js-cookie";
import LinearProgress from "@mui/material/LinearProgress";

const Division = () => {
    // useState hooks
    const [divisionList, setDivisionList] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    // load data from the backend when loading the page
    useEffect(() => {
        getDivisions();
        document.title = 'Division';
    }, []);

    /* get list of divisions from the backend and display them */
    const getDivisions = async () => {
        const BASE_URL = 'https://purplepagesbackend.vt.uniting.org';
        await axios.get(BASE_URL + '/division', {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const list = res.data;
            setDivisionList(list);
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
            const viewLink = '/division/' + cellValues.id;

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
        {
            field: 'division_id', headerName: 'Division ID', headerClassName: 'header', maxWidth: 200, flex: 1,
            renderCell: (params) => (
                <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
            )
        },
        {
            field: 'division_name', headerName: 'Division Name', headerClassName: 'header', minWidth: 200, flex: 1,
            renderCell: (params) => (
                <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
            )
        },
        {
            field: 'gm', headerName: 'General Manager', headerClassName: 'header', maxWidth: 360, flex: 1,
            renderCell: (params) => (
                <span style={{fontSize: '16px', color: '#5A5A5A'}}>{params.value}</span>
            )
        },
        {
            field: 'status', headerName: 'Status', headerClassName: 'header', maxWidth: 240, flex: 1,
            renderCell: (params) => (
                <span style={{
                    color: 'green',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    fontSize: '16px'
                }}>{params.value}</span>
            )
        },
        ActionsColumn
    ];

    return (
        <DivisionContainer>
            {isLoading &&
                <>
                    <DivisionH1>Division</DivisionH1>
                    <LinearProgress
                        color="primary"

                        variant="indeterminate"
                        sx={{width: '95%', height: '8px'}} // Adjust width and height as needed
                    />
                </>
            }
            {!isLoading &&
                <>
                    <DivisionH1>Division</DivisionH1>
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
                            rows={divisionList}
                            getRowId={row => row.division_id}
                            autoHeight
                        />
                    </DataGridWrapper>
                </>
            }
        </DivisionContainer>
    )
}

export default Division;