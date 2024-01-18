import axios from "axios";
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
    ServiceTypeViewContainer,
    ServiceTypeViewH1,
    ServiceTypeViewP,
    ActionsButtonLink,
    LoadingContainer,
    LoadingCircle,
    LoadingText,
    ServiceTypeProgramsContainer,
    ServiceTypeViewH2
} from './ServiceTypeViewElements';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Cookies from "js-cookie";

const ServiceTypeView = () => {
    // useState hooks
    const [serviceType, setServiceType] = useState({});
    const [relatedPrograms, setRelatedPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams();

    const TableTitleStyle = {fontWeight: 'bold', fontSize: '18px', color: '#A60A6C'};
    const TableContentStyle = {fontSize: '16px', color: 'black'};

    useEffect(() => {
        getServiceType();
    }, []);

    useEffect(() => {
        if (Object.values(serviceType).length > 0) {
            getAllData();
        }
    }, [serviceType]);

    const getAllData = async () => {

        try {
            const [programTypes, programs] = await Promise.all([
                getProgramTypes(),
                getPrograms(),
            ]);

            const filteringProgramTypes = programTypes.filter((type) => {
                return type.ser_type_id === serviceType.ser_type_id;
            });

            const programTypesIds = filteringProgramTypes.map((type) => type.prgm_type_id);

            const filteringPrograms = programs.filter((program) => {
                return programTypesIds.includes(program.prgm_type_id);
            });

            setRelatedPrograms(filteringPrograms);

            setIsLoading(false);

        } catch (error) {

            console.log(error);
        }


    }

    /* get a service type from the backend based on the id and display it */
    const getServiceType = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        await axios.get(BASE_URL + '/servicetype/' + id, {
            headers: {
                'authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        }).then(res => {
            const data = res.data[0];
            data['ser_stream'] = res.data[1];
            setServiceType(data);
        })
    }

    const getProgramTypes = async () => {
        const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
        let result = await axios.get(BASE_URL + '/programtype', {
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

    // /* Handle going to edit page */
    // const edit = () => {
    //   window.location = '/servicetype/' + id + '/edit';
    // }

    // /* delete the service type */
    // const deleteServiceType = () => {
    //   const BASE_URL = process.env.REACT_APP_PURPLEPAGE_BACKEND_URL;
    //   Swal.fire({
    //     title: "Warning!",
    //     text: "Are you sure you want to delete this service type?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!',
    //     showClass: {
    //       icon: ''
    //     }
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       await axios.delete(BASE_URL + "/servicetype/" + id).then(() => {
    //         Swal.fire({
    //           title: "Success!",
    //           text: "Service type has been successfully deleted!",
    //           icon: "success",
    //           showClass: {
    //             icon: ''
    //           }
    //         });
    //         setTimeout(() => {
    //           window.location = '/servicetype';
    //         }, 1500);
    //       })
    //     }
    //   })
    // }

    return (
        <ServiceTypeViewContainer>
            <ServiceTypeViewH1>{serviceType.ser_type}</ServiceTypeViewH1>
            <ServiceTypeViewP>Service stream: {serviceType.ser_stream}</ServiceTypeViewP>
            <ServiceTypeViewP>Status: {serviceType.status}</ServiceTypeViewP>

            <ServiceTypeViewH2>Related Programs</ServiceTypeViewH2>
            <ServiceTypeProgramsContainer>
                {
                    (isLoading) ?
                        <LoadingContainer>
                            <LoadingCircle> </LoadingCircle>
                            <LoadingText>Loading...</LoadingText>
                        </LoadingContainer>
                        : <RelatedProgramsTable></RelatedProgramsTable>
                }
            </ServiceTypeProgramsContainer>

        </ServiceTypeViewContainer>
    )
}

export default ServiceTypeView;