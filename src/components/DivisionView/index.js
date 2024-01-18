import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    DivisionViewContainer,
    DivisionViewH1,
    DivisionViewH2,
    DivisionViewP,
    ActionsButtonLink,
    LoadingContainer,
    LoadingCircle,
    LoadingText,
    DivisionProgramsContainer
} from './DivisionViewElements';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie";

const DivisionView = () => {
    // useState hooks
    const [division, setDivision] = useState({});
    const [relatedPrograms, setRelatedPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    const TableTitleStyle = {fontWeight: 'bold', fontSize: '18px', color: '#A60A6C'};
    const TableContentStyle = {fontSize: '16px', color: 'black'};

    // react hook to get division
    useEffect(() => {
        getDivision();
    }, []);

    useEffect(() => {
        if (Object.values(division).length > 0) {
            getAllData();
        }
    }, [division]);

    const getAllData = async () => {

        try {
            const [groups, programs] = await Promise.all([
                getGroups(),
                getPrograms(),
            ]);

            const filteringsGroups = groups.filter((group) => {
                return group.division_id === division.division_id;
            })

            const groupIds = filteringsGroups.map((group) => group.group_id);

            const filteringsPrograms = programs.filter((program) => {
                return groupIds.includes(program.group_id);
            })

            setRelatedPrograms(filteringsPrograms);

            setIsLoading(false);

        } catch (error) {

            console.log(error);
        }

    }

    /* get a division from the backend based on the id and display it */
    const getDivision = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        await axios.get(BASE_URL + '/division/' + id, {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data;
            setDivision(data);
        })
    }

    /* get list of groups from the backend and display them */
    const getGroups = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        let result = await axios.get(BASE_URL + '/group', {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        });
        result = result.data[0];
        return result;
    }

    const getPrograms = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        let result = await axios.get(BASE_URL + '/program', {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        });
        result = result.data[0];
        return result;
    }

    // related programs table element
    const RelatedProgramsTable = () => {
        return (
            <TableContainer component={Paper} style={{
                width: '95%',
                border: '1px solid transparent',
                boxShadow: '0 0 6px rgba(0, 0, 0, 0.4)'
            }}>
                <Table>
                    <TableHead style={{backgroundColor: '#FCF0F5', position: 'sticky', top: 0, zIndex: 1}}>
                        <TableRow>
                            <TableCell style={TableTitleStyle}>Program ID</TableCell>
                            <TableCell style={TableTitleStyle}>Program Title</TableCell>
                            <TableCell style={TableTitleStyle}>Program Description</TableCell>
                            <TableCell style={TableTitleStyle}>Program Manager</TableCell>
                            <TableCell style={TableTitleStyle}>Status</TableCell>
                            <TableCell style={TableTitleStyle}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {relatedPrograms.map((program, index) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell style={{
                                    ...TableContentStyle,
                                    width: '15%',
                                }}>{(program.title === null) ? `None` : program.title}</TableCell>
                                <TableCell style={{
                                    ...TableContentStyle,
                                    width: '20%',
                                }}>{(program.program_nme === null) ? `None` : program.program_nme}</TableCell>
                                <TableCell style={{
                                    ...TableContentStyle,
                                    width: '40%',
                                    textAlign: 'justify'
                                }}>{(program.service_desc === null) ? `None` : program.service_desc}</TableCell>
                                <TableCell style={{
                                    ...TableContentStyle,
                                    width: '20%'
                                }}>{(program.prgm_mgr === null) ? `None` : program.prgm_mgr}</TableCell>
                                <TableCell style={{
                                    ...TableContentStyle,
                                    width: '10%',
                                    color: 'green',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize'
                                }}>{(program.prgm_status === null) ? `None` : program.prgm_status}</TableCell>
                                <TableCell style={{width: '5%'}}>
                                    <Button variant="contained" style={{textTransform: "none", marginRight: "5%"}}>
                                        <ActionsButtonLink
                                            to={`/program/${program.program_id}`}>View</ActionsButtonLink>
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
        <DivisionViewContainer>
            <DivisionViewH1>{division.division_name}</DivisionViewH1>
            <DivisionViewP>General Manager: {division.gm}</DivisionViewP>
            <DivisionViewP>Status: {division.status}</DivisionViewP>
            <DivisionViewH2>Related Programs</DivisionViewH2>
            <DivisionProgramsContainer>
                {
                    (isLoading) ?
                        <LoadingContainer>
                            <LoadingCircle> </LoadingCircle>
                            <LoadingText>Loading...</LoadingText>
                        </LoadingContainer>
                        : <RelatedProgramsTable></RelatedProgramsTable>
                }
            </DivisionProgramsContainer>
        </DivisionViewContainer>
    )
}

export default DivisionView;