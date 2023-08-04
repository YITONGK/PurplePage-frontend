import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { InfoContainer, InfoH1, InfoH2, InfoP, ProgramInfoContainer, ProgramInfoItem, InfoDetail, SiteTitle} from './MapInfoElements';

const MapInfo = ({site, advanceFilteredPrograms}) => {
    
    const [relatedPrograms, setRelatedPrograms] = useState([]);

    useEffect (() => {

        if(advanceFilteredPrograms && site) {
           
            const tmpFilteredProgram = advanceFilteredPrograms.filter((program) => {
                return program.site_id === site.site_id;
            })
            setRelatedPrograms(tmpFilteredProgram);
            console.log(relatedPrograms);
        }

    }, [advanceFilteredPrograms, site]);

    const ProgramInfo = () => {

        return (
            <ProgramInfoContainer>
                {
                    relatedPrograms.map((program) =>{
                        return (
                            <ProgramInfoItem>
                                <InfoP><strong>Program Name:</strong> {program.program_nme}</InfoP>
                                <InfoP><strong>Program Manager:</strong>  {(program.prgm_mgr)? program.prgm_mgr : ` -`}</InfoP>
                                <InfoP><strong>Program Contact:</strong>{(program.prgm_cont_no)? program.prgm_cont_no: ` -`}</InfoP>
                            </ProgramInfoItem>
                            
                        )
                    })
                }
            </ProgramInfoContainer>
        )
        
        
    }


    // styles
    const gridStyle = { display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "-1rem", color: "#A20066"};

    return (
        <InfoContainer>
            <Grid style={gridStyle}>
                <InfoIcon fontSize="large" /> 
                <InfoH1>Site Information</InfoH1>
            </Grid>
            <InfoDetail>
                {site ? (
                <>
                    <SiteTitle>
                        <InfoH2>{site.site_id}</InfoH2>
                    </SiteTitle>
                    {site.site_contact_name ? (
                        <InfoP><strong>Contact Name:</strong> {site.site_contact_name.replace(".", " ")}</InfoP>
                    ) : (
                        <InfoP><strong>Contact Name:</strong>  -</InfoP>
                    )}
                    <InfoP><strong>Address:</strong> {site.street_nbr} {site.street_name}, {site.suburb}, {site.state} {site.postcode}</InfoP>
                    <ProgramInfo></ProgramInfo>
                    <InfoP><strong>Local Government Area:</strong> {site.lga}</InfoP>
                    <InfoP><strong>Department of Families, Fairness and Housing:</strong> {site.dffh_area}</InfoP>
                </>
                ) : (
                    <SiteTitle>
                        <InfoH2>No selected site.</InfoH2>
                    </SiteTitle>
                )}
            </InfoDetail>
        </InfoContainer>
    );
}

export default MapInfo;
